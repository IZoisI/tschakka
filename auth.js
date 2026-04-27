/* ===========================================================
   PFF32 // AUTH
   Account-Verwaltung.
   Aktueller Backend-Treiber: LOCAL (localStorage).
   Der gesamte API-Vertrag ist 1:1 kompatibel mit dem geplanten
   Supabase-Edge-Function-Backend. Ein Wechsel erfordert nur
   den Austausch der Treiber-Implementierung unten.

   Öffentliche API:
     Auth.currentUser()            → string | null
     Auth.register({username, password, passwordAgain, initialCode})
     Auth.login({username, password})
     Auth.logout()
     Auth.loadState(defaults)      → state-Objekt (user-genamespaced)
     Auth.saveState(state)
     Auth.clearState()             → nur aktuellen User
     Auth.deleteAccount()          → löscht Account + State
   =========================================================== */
(() => {
  /* WICHTIG: In Stufe A (lokal) lebt der Code im Client und ist
     per DevTools sichtbar. Dies ist eine Höflichkeitshürde, keine
     Sicherheit. In Stufe B (Supabase) validiert eine Edge-Function
     das Initial-Passwort serverseitig; dann ist der Code hier weg. */
  const INITIAL_CODE = "Laars";

  const LS_USERS    = "pff32_users";
  const LS_SESSION  = "pff32_session";
  const LS_STATE    = u => `pff32_state_${u}`;

  /* PBKDF2-Parameter: 100 000 Iterationen SHA-256, 16-Byte Salt.
     Entspricht OWASP-Empfehlung für Browser-basiertes Hashing. */
  const PBKDF2_ITER = 100000;
  const SALT_BYTES  = 16;

  /* ---------- storage ---------- */
  const readUsers = () => {
    try { return JSON.parse(localStorage.getItem(LS_USERS) || "{}"); }
    catch { return {}; }
  };
  const writeUsers = (u) => localStorage.setItem(LS_USERS, JSON.stringify(u));

  const readSession = () => {
    try { return JSON.parse(localStorage.getItem(LS_SESSION) || "null"); }
    catch { return null; }
  };
  const writeSession = (s) => {
    if (s) localStorage.setItem(LS_SESSION, JSON.stringify(s));
    else   localStorage.removeItem(LS_SESSION);
  };

  /* ---------- crypto helpers ---------- */
  const toHex = (buf) =>
    [...new Uint8Array(buf)]
      .map(b => b.toString(16).padStart(2, "0")).join("");
  const fromHex = (hex) =>
    new Uint8Array(hex.match(/.{1,2}/g).map(b => parseInt(b, 16)));

  async function hashPassword(password, saltBytes) {
    if (!crypto.subtle)
      throw new Error("Dein Browser unterstützt kein WebCrypto. Bitte aktuellen Browser verwenden.");
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw", enc.encode(password),
      { name: "PBKDF2" }, false, ["deriveBits"]
    );
    const bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: saltBytes, iterations: PBKDF2_ITER, hash: "SHA-256" },
      key, 256
    );
    return toHex(bits);
  }

  /* ---------- validators ---------- */
  const USERNAME_RE = /^[a-zA-Z0-9_\-]{3,20}$/;
  function validateUsername(u) {
    if (!u) return "Benutzername fehlt.";
    if (!USERNAME_RE.test(u))
      return "Benutzername: 3–20 Zeichen, nur Buchstaben, Ziffern, „-\" und „_\".";
    return null;
  }
  function validatePassword(p) {
    if (!p) return "Passwort fehlt.";
    if (p.length < 6) return "Passwort muss mindestens 6 Zeichen haben.";
    return null;
  }

  /* ---------- API ---------- */
  function currentUser() {
    return readSession()?.username || null;
  }

  async function register({ username, password, passwordAgain, initialCode }) {
    username = (username || "").trim();
    const uErr = validateUsername(username);
    if (uErr) throw new Error(uErr);
    const pErr = validatePassword(password);
    if (pErr) throw new Error(pErr);
    if (password !== passwordAgain)
      throw new Error("Die beiden Passwörter stimmen nicht überein.");
    if ((initialCode || "") !== INITIAL_CODE)
      throw new Error("Initial-Passwort ist falsch.");

    const users = readUsers();
    const key = username.toLowerCase();
    if (users[key])
      throw new Error("Dieser Benutzername ist schon vergeben.");

    const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
    const hash = await hashPassword(password, salt);
    users[key] = {
      username,                       // original spelling für Anzeige
      salt: toHex(salt),
      hash,
      created: new Date().toISOString()
    };
    writeUsers(users);
    writeSession({ username: key, since: new Date().toISOString() });
    migrateLegacyIfPossible();
    return { username: key };
  }

  async function login({ username, password }) {
    username = (username || "").trim().toLowerCase();
    const pErr = validatePassword(password);
    if (pErr) throw new Error(pErr);
    const users = readUsers();
    const u = users[username];
    if (!u)
      throw new Error("Benutzername oder Passwort falsch.");
    const hash = await hashPassword(password, fromHex(u.salt));
    if (hash !== u.hash)
      throw new Error("Benutzername oder Passwort falsch.");
    writeSession({ username, since: new Date().toISOString() });
    migrateLegacyIfPossible();
    return { username };
  }

  function logout() {
    writeSession(null);
  }

  /* ---------- namespaced state ---------- */
  function loadState(defaults) {
    const u = currentUser();
    if (!u) return { ...(defaults || {}) };
    try {
      const raw = localStorage.getItem(LS_STATE(u));
      if (!raw) return { ...(defaults || {}) };
      return { ...(defaults || {}), ...JSON.parse(raw) };
    } catch { return { ...(defaults || {}) }; }
  }

  function saveState(state) {
    const u = currentUser();
    if (!u) return;
    localStorage.setItem(LS_STATE(u), JSON.stringify(state));
  }

  function clearState() {
    const u = currentUser();
    if (!u) return;
    localStorage.removeItem(LS_STATE(u));
  }

  function deleteAccount() {
    const u = currentUser();
    if (!u) return;
    localStorage.removeItem(LS_STATE(u));
    const users = readUsers();
    delete users[u];
    writeUsers(users);
    writeSession(null);
  }

  /* ---------- Migration von Legacy-State (vor Auth) ----------
     Beim Upgrade existiert evtl. alter Fortschritt unter dem globalen
     Key pff32_state. Nach erfolgreichem Login/Register wird er einmalig
     in den User-Namespace kopiert und danach entfernt, wenn dort noch
     nichts liegt. So gehen Daten bei der Umstellung nicht verloren. */
  const LEGACY_KEY = "pff32_state";
  function migrateLegacyIfPossible() {
    const u = currentUser();
    if (!u) return false;
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (!legacy) return false;
    const existing = localStorage.getItem(LS_STATE(u));
    if (existing) return false;              // User hat schon eigenen State
    localStorage.setItem(LS_STATE(u), legacy);
    localStorage.removeItem(LEGACY_KEY);
    return true;
  }

  /* ---------- Anzeige-Helper ---------- */
  function displayName() {
    const u = currentUser();
    if (!u) return null;
    const users = readUsers();
    return users[u]?.username || u;
  }

  window.Auth = {
    currentUser, displayName,
    register, login, logout,
    loadState, saveState, clearState,
    deleteAccount,
    validateUsername, validatePassword
  };
})();
