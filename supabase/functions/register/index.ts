// ============================================================
// PFF32 // Tschakka! — Edge Function: register
// ============================================================
// Validiert das Initial-Passwort SERVERSEITIG (Env-Var INITIAL_CODE),
// legt einen Auth-User mit synthetischer Pseudo-Email an
// (`username@tschakka.local`) und ein passendes profiles-Row.
//
// Aufruf vom Client:
//   POST https://<project>.supabase.co/functions/v1/register
//   { "username": "...", "password": "...", "initial_code": "..." }
//
// Antwort:
//   200 { ok: true, username: "..." }      → Client kann nun signIn ausführen
//   400 { ok: false, error: "..." }
// ============================================================

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const SYNTHETIC_DOMAIN = "tschakka.local";
const USERNAME_RE = /^[a-zA-Z0-9_\-]{3,20}$/;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const fail = (msg: string, status = 400) => json({ ok: false, error: msg }, status);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return fail("Methode nicht erlaubt.", 405);
  }

  let payload: { username?: string; password?: string; initial_code?: string };
  try {
    payload = await req.json();
  } catch {
    return fail("Ungültiges JSON.");
  }

  const username = (payload.username ?? "").trim();
  const password = payload.password ?? "";
  const initialCode = payload.initial_code ?? "";

  // ---------- Initial-Code prüfen (server-seitig!) ----------
  const expected = Deno.env.get("INITIAL_CODE");
  if (!expected) {
    return fail("Server-Konfiguration unvollständig (INITIAL_CODE fehlt).", 500);
  }
  if (initialCode !== expected) {
    return fail("Initial-Passwort ist falsch.");
  }

  // ---------- Username / Passwort validieren ----------
  if (!USERNAME_RE.test(username)) {
    return fail(
      'Benutzername: 3–20 Zeichen, nur Buchstaben, Ziffern, „-" und „_".',
    );
  }
  if (typeof password !== "string" || password.length < 6) {
    return fail("Passwort muss mindestens 6 Zeichen haben.");
  }

  const usernameKey = username.toLowerCase();
  const syntheticEmail = `${usernameKey}@${SYNTHETIC_DOMAIN}`;

  // ---------- Service-Role-Client (nur hier auf dem Server) ----------
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRole) {
    return fail("Server-Konfiguration unvollständig.", 500);
  }
  const admin = createClient(supabaseUrl, serviceRole, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // ---------- Username-Eindeutigkeit prüfen ----------
  const { data: existing, error: lookupErr } = await admin
    .from("profiles")
    .select("username")
    .eq("username", usernameKey)
    .maybeSingle();

  if (lookupErr) {
    return fail("Lookup-Fehler: " + lookupErr.message, 500);
  }
  if (existing) {
    return fail("Dieser Benutzername ist schon vergeben.");
  }

  // ---------- Auth-User anlegen ----------
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email: syntheticEmail,
    password,
    email_confirm: true,                 // wir verifizieren nicht per Mail
    user_metadata: { username },         // original-Schreibweise erhalten
  });

  if (createErr || !created.user) {
    // Häufigster Fall: Email schon vergeben (Race Condition)
    return fail(
      "Konto konnte nicht angelegt werden: " +
        (createErr?.message ?? "unbekannt"),
    );
  }

  // ---------- Profile-Row anlegen ----------
  const { error: profileErr } = await admin.from("profiles").insert({
    id: created.user.id,
    username: usernameKey,
  });

  if (profileErr) {
    // Rollback: Auth-User wieder entfernen, sonst hängt er ohne Profil rum.
    await admin.auth.admin.deleteUser(created.user.id);
    return fail("Profil-Anlage fehlgeschlagen: " + profileErr.message, 500);
  }

  return json({ ok: true, username: usernameKey });
});
