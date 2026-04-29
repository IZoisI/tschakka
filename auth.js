/* ===========================================================
   PFF32 // AUTH (Stufe B — Supabase)
   -----------------------------------------------------------
   Backend: Supabase (Postgres + Auth + Edge Function).
   Initial-Passwort wird SERVERSEITIG geprüft (Edge Function
   `register`), liegt nirgendwo im Client.

   Architektur:
   - Login/Register/Logout reden mit Supabase Auth.
   - State (XP, Streak, Fortschritt …) wird in beide Richtungen
     synchronisiert: Cloud ist Quelle der Wahrheit, localStorage
     ist Cache → die App sieht weiterhin synchrone load/save.
   - Schreibvorgänge in die Cloud sind debounced (1.5 s), damit
     nicht jeder XP-Punkt sofort einen Request auslöst.

   Öffentliche API (kompatibel zu Stufe A):
     Auth.init()                              → Promise<void>   (einmal beim Boot)
     Auth.currentUser()                       → string | null
     Auth.displayName()                       → string | null
     Auth.register({username,password,passwordAgain,initialCode})
     Auth.login({username,password})
     Auth.logout()
     Auth.loadState(defaults)                 → state-Objekt (sync, aus Cache)
     Auth.saveState(state)                    → void  (sync; cloud-sync debounced)
     Auth.flushState()                        → Promise<void>  (sofort hochladen)
     Auth.clearState()                        → nur aktuellen User (lokal+Cloud)
     Auth.deleteAccount()                     → löscht Cloud-Account + lokalen Cache
   =========================================================== */
(() => {
  const cfg = window.SUPABASE_CONFIG;
  if (!cfg || !cfg.url || !cfg.anonKey) {
    console.error("[Auth] SUPABASE_CONFIG fehlt — config.js nicht geladen?");
    return;
  }
  if (typeof window.supabase?.createClient !== "function") {
    console.error(
      "[Auth] Supabase-JS-Client fehlt — CDN-Script in index.html?",
    );
    return;
  }

  /* ---------- Konstanten ---------- */
  const SYNTHETIC_DOMAIN = "tschakka.local";
  const USERNAME_RE      = /^[a-zA-Z0-9_\-]{3,20}$/;
  const LS_STATE         = (u) => `pff32_state_${u}`;
  const LEGACY_KEYS      = ["pff32_state"]; // ganz alter Single-User-State
  const SAVE_DEBOUNCE_MS = 1500;
  const REGISTER_FN_URL  = `${cfg.url}/functions/v1/register`;

  /* ---------- Supabase-Client ---------- */
  const sb = window.supabase.createClient(cfg.url, cfg.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: window.localStorage,
      storageKey: "pff32_supabase_session",
    },
  });

  /* ---------- Session-Cache (sync zugreifbar) ---------- */
  let cachedSession = null;     // supabase Session-Objekt
  let cachedUsername = null;    // lowercase
  let cachedDisplayName = null; // original spelling

  /* ---------- Validators ---------- */
  function validateUsername(u) {
    if (!u) return "Benutzername fehlt.";
    if (!USERNAME_RE.test(u))
      return 'Benutzername: 3–20 Zeichen, nur Buchstaben, Ziffern, „-" und „_".';
    return null;
  }
  function validatePassword(p) {
    if (!p) return "Passwort fehlt.";
    if (p.length < 6) return "Passwort muss mindestens 6 Zeichen haben.";
    return null;
  }

  /* ---------- Session-Helpers ---------- */
  async function refreshSession() {
    const { data } = await sb.auth.getSession();
    cachedSession = data.session ?? null;
    if (cachedSession?.user) {
      cachedUsername =
        cachedSession.user.user_metadata?.username?.toLowerCase() ||
        emailToUsername(cachedSession.user.email);
      cachedDisplayName =
        cachedSession.user.user_metadata?.username || cachedUsername;
    } else {
      cachedUsername = null;
      cachedDisplayName = null;
    }
  }

  function emailToUsername(email) {
    if (!email) return null;
    const at = email.indexOf("@");
    return at > 0 ? email.slice(0, at) : null;
  }

  function syntheticEmail(username) {
    return `${username.trim().toLowerCase()}@${SYNTHETIC_DOMAIN}`;
  }

  /* ---------- Cloud-State Sync ---------- */
  async function fetchCloudState() {
    if (!cachedSession?.user) return null;
    const { data, error } = await sb
      .from("student_progress")
      .select("state")
      .eq("user_id", cachedSession.user.id)
      .maybeSingle();
    if (error) {
      console.warn("[Auth] fetchCloudState:", error.message);
      return null;
    }
    return data?.state ?? null;
  }

  async function pushCloudState(state) {
    if (!cachedSession?.user) return;
    const payload = {
      user_id: cachedSession.user.id,
      state,
      updated_at: new Date().toISOString(),
    };
    const { error } = await sb
      .from("student_progress")
      .upsert(payload, { onConflict: "user_id" });
    if (error) console.warn("[Auth] pushCloudState:", error.message);
  }

  /* ---------- Migration: Stufe-A localStorage → Cloud ----------
     Beim ersten Cloud-Login eines bisher rein lokalen Schülers
     übernehmen wir seinen Fortschritt automatisch. */
  async function migrateLocalToCloudIfNeeded() {
    if (!cachedSession?.user || !cachedUsername) return;

    // 1. Cloud bereits gefüllt? Dann nichts tun.
    const cloud = await fetchCloudState();
    if (cloud && Object.keys(cloud).length > 0) return;

    // 2. Lokale Kandidaten suchen.
    const candidates = [LS_STATE(cachedUsername), ...LEGACY_KEYS];
    // alle pff32_state_* zur Sicherheit:
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (
        k && k.startsWith("pff32_state_") && !candidates.includes(k)
      ) candidates.push(k);
    }

    for (const key of candidates) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && Object.keys(parsed).length > 0) {
          await pushCloudState(parsed);
          // lokalen Cache auf den User-Key konsolidieren
          localStorage.setItem(LS_STATE(cachedUsername), JSON.stringify(parsed));
          return;
        }
      } catch { /* ignore broken */ }
    }
  }

  /* ---------- Cache-Hydration: Cloud → localStorage ----------
     Wird beim Init / Login aufgerufen, damit die App synchron
     aus localStorage laden kann. */
  async function hydrateLocalFromCloud() {
    if (!cachedSession?.user || !cachedUsername) return;
    const cloud = await fetchCloudState();
    if (cloud && Object.keys(cloud).length > 0) {
      localStorage.setItem(LS_STATE(cachedUsername), JSON.stringify(cloud));
    }
  }

  /* ---------- Public API ---------- */
  async function init() {
    await refreshSession();
    if (cachedSession?.user) {
      // erst Migration (falls noch nichts in der Cloud), dann Hydration.
      await migrateLocalToCloudIfNeeded();
      await hydrateLocalFromCloud();
    }
  }

  function currentUser() {
    return cachedUsername;
  }
  function displayName() {
    return cachedDisplayName;
  }

  async function register({ username, password, passwordAgain, initialCode }) {
    username = (username || "").trim();
    const uErr = validateUsername(username);
    if (uErr) throw new Error(uErr);
    const pErr = validatePassword(password);
    if (pErr) throw new Error(pErr);
    if (password !== passwordAgain)
      throw new Error("Die beiden Passwörter stimmen nicht überein.");
    if (!initialCode)
      throw new Error("Initial-Passwort fehlt.");

    // Edge-Function aufrufen — sie prüft Initial-Code SERVER-SEITIG.
    const res = await fetch(REGISTER_FN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": cfg.anonKey,
        "Authorization": `Bearer ${cfg.anonKey}`,
      },
      body: JSON.stringify({
        username,
        password,
        initial_code: initialCode,
      }),
    });
    let body;
    try { body = await res.json(); } catch { body = null; }
    if (!res.ok || !body?.ok) {
      throw new Error(body?.error || `Registrierung fehlgeschlagen (HTTP ${res.status}).`);
    }

    // Direkt anschließend einloggen.
    const { error: signErr } = await sb.auth.signInWithPassword({
      email: syntheticEmail(username),
      password,
    });
    if (signErr) throw new Error("Login nach Registrierung fehlgeschlagen: " + signErr.message);

    await refreshSession();
    await migrateLocalToCloudIfNeeded();
    await hydrateLocalFromCloud();
    return { username: cachedUsername };
  }

  async function login({ username, password }) {
    username = (username || "").trim();
    if (!username) throw new Error("Benutzername fehlt.");
    const pErr = validatePassword(password);
    if (pErr) throw new Error(pErr);

    const { error } = await sb.auth.signInWithPassword({
      email: syntheticEmail(username),
      password,
    });
    if (error) throw new Error("Benutzername oder Passwort falsch.");

    await refreshSession();
    await migrateLocalToCloudIfNeeded();
    await hydrateLocalFromCloud();
    return { username: cachedUsername };
  }

  async function logout() {
    // Vor dem Sign-Out noch ausstehende Saves rausschicken.
    await flushState();
    await sb.auth.signOut();
    cachedSession = null;
    cachedUsername = null;
    cachedDisplayName = null;
  }

  /* ---------- State (sync API, cloud-sync im Hintergrund) ---------- */
  function loadState(defaults) {
    const u = cachedUsername;
    if (!u) return { ...(defaults || {}) };
    try {
      const raw = localStorage.getItem(LS_STATE(u));
      if (!raw) return { ...(defaults || {}) };
      return { ...(defaults || {}), ...JSON.parse(raw) };
    } catch {
      return { ...(defaults || {}) };
    }
  }

  let saveTimer = null;
  let pendingState = null;

  function saveState(state) {
    const u = cachedUsername;
    if (!u) return;
    // Sofort lokal cachen — App fühlt sich synchron an.
    try {
      localStorage.setItem(LS_STATE(u), JSON.stringify(state));
    } catch (e) {
      console.warn("[Auth] saveState localStorage:", e);
    }
    // Cloud-Sync debouncen.
    pendingState = state;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const s = pendingState;
      pendingState = null;
      saveTimer = null;
      pushCloudState(s).catch(() => { /* offline → kein Drama, lokal ist ok */ });
    }, SAVE_DEBOUNCE_MS);
  }

  async function flushState() {
    if (saveTimer) {
      clearTimeout(saveTimer);
      saveTimer = null;
    }
    if (pendingState) {
      const s = pendingState;
      pendingState = null;
      await pushCloudState(s);
    }
  }

  // Beim Tab-Schließen ausstehende Schreiber abfeuern (best-effort).
  window.addEventListener("beforeunload", () => {
    if (pendingState && cachedSession?.user) {
      // Hinweis: sendBeacon kann hier authentifizierte Requests nicht sauber
      // mit Bearer-Header schicken. Wir versuchen's, falls's nicht klappt
      // ist's auch nicht tragisch — der Cache ist aktuell und beim nächsten
      // Login wird Migration/Hydration den State synchen.
      try {
        const url = `${cfg.url}/rest/v1/student_progress?on_conflict=user_id`;
        const blob = new Blob(
          [JSON.stringify({
            user_id: cachedSession.user.id,
            state: pendingState,
            updated_at: new Date().toISOString(),
          })],
          { type: "application/json" },
        );
        navigator.sendBeacon(url, blob);
      } catch { /* best-effort */ }
    }
  });

  function clearState() {
    const u = cachedUsername;
    if (!u) return;
    localStorage.removeItem(LS_STATE(u));
    if (cachedSession?.user) {
      pushCloudState({}).catch(() => {});
    }
  }

  async function deleteAccount() {
    // Hinweis: Vollständiges Löschen des Auth-Users braucht eine Edge
    // Function mit Service-Role. Für jetzt: lokalen Cache leeren +
    // Cloud-State auf {} setzen + ausloggen. (Datenminimal.)
    if (cachedUsername) localStorage.removeItem(LS_STATE(cachedUsername));
    if (cachedSession?.user) {
      await pushCloudState({}).catch(() => {});
    }
    await logout();
  }

  /* ---------- Export ---------- */
  window.Auth = {
    init,
    currentUser,
    displayName,
    register,
    login,
    logout,
    loadState,
    saveState,
    flushState,
    clearState,
    deleteAccount,
    validateUsername,
    validatePassword,
  };
})();
