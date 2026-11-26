/* ===========================================================
   TSCHAKKA // BOSS BATTLE II – „Kebab action – satisfaction“
   -----------------------------------------------------------
   Ablauf:
     0  Intro (cinematic Videos): Van → Pfütze → Schuh → Wellen
        → Pixel-Übergang
     1  Begegnung im Dönerladen (LaaA schickt den Schüler vor)
     2  Bestellung: 3 Insider-Fragen (keine Leben, Wiederholen)
     3  Smalltalk: Dönermann + Blutdruck, 5 leichte Fragen
     4  LaaA kommt zurück – der Deal
     5  Hauptkampf: 20 Fragen, 3 Leben, Timer
     →  Sieg: Döner geht aufs Haus / Niederlage: selbst zahlen

   Medien liegen in assets/boss2/ (Liste: assets/boss2/LIESMICH.md).
   Fehlt eine Datei, erscheint automatisch ein Platzhalter.
   =========================================================== */

const BOSS2_DIR = "assets/boss2/";
const BOSS2_NAME = "LaaA";
const DOENER_NAME = "Dönermann";

/* Platzhalter-Beschriftungen, bis die echten Bilder da sind */
const BOSS2_PLACEHOLDER = {
  boss2_du_ueberrascht:   ["😮", "LaaA – überrascht"],
  boss2_du_zwinkern:      ["😉", "LaaA – zwinkert, Daumen zur Tür"],
  boss2_du_zurueck:       ["🚪", "LaaA – kommt zurück"],
  boss2_du_deal:          ["🤨", "LaaA – der Deal"],
  boss2_du_zufrieden:     ["😏", "LaaA – zufrieden"],
  boss2_du_kopfschuetteln:["🙄", "LaaA – schüttelt den Kopf"],
  boss2_du_sieg:          ["🥙", "LaaA – spendiert den Döner"],
  boss2_du_niederlage:    ["😋", "LaaA – isst beide Döner"],
  boss2_doener_freundlich:["👨‍🍳", "Dönermann – freundlich"],
  boss2_doener_blutdruck: ["🫀", "Dönermann – Hand auf der Brust"],
  boss2_doener_lachen:    ["😄", "Dönermann – lacht, Daumen hoch"],
  boss2_doener_skeptisch: ["🤨", "Dönermann – skeptisch"]
};

/* Die drei Insider-Fragen – Antworten 1:1 wie vorgegeben, richtige zuerst */
const BOSS2_INSIDER = [
  { q: "Was darf's sein?", a: ["Super Döner", "Döner", "Türkische Pizza", "Dürüm"] },
  { q: "Alle Saucen?",     a: ["Curry & Chili", "komplett", "nur Kräuter", "Kräuter & Chili"] },
  { q: "Salat alles?",     a: ["Ohne Zwiebel mit Käse", "Ohne Zwiebel", "komplett mit Käse", "Ohne Zwiebel & ohne Gurke"] }
];

const BOSS2_INSIDER_WRONG = [
  "Hmm … so bestellt er nie. Überlegen Sie nochmal!",
  "Da würde er mich komisch angucken. Noch ein Versuch?",
  "Nee, nee – ich kenne den Mann. Das ist es nicht!",
  "Mein Gedächtnis ist gut, Chef. Versuchen Sie's nochmal."
];

/* Themen für die leichten Smalltalk-Fragen (Blutdruck-Story) */
const BOSS2_SMALLTALK_TOPICS = ["blutdruck", "herzerkrankungen", "herz_anatomie", "gefaesssystem"];

async function startBossBattle2() {
  if (state.completed.length < 3) {
    toast("Zu früh", "Schließe erst mindestens 3 Themen ab, bevor du den Dönerladen betrittst.", "");
    return;
  }

  /* ---------- Fragen vorbereiten ---------- */
  const shuffle = arr => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; };
  const smalltalkPool = shuffle(BOSS2_SMALLTALK_TOPICS.flatMap(id => (TOPICS[id]?.questions || []).map(q => ({ ...q, _topic: id }))));
  const smalltalk = smalltalkPool.slice(0, 5);
  const usedQ = new Set(smalltalk.map(q => q.q));
  const mainPool = shuffle(Object.keys(TOPICS).flatMap(id => (TOPICS[id].questions || []).map(q => ({ ...q, _topic: id }))))
    .filter(q => !usedQ.has(q.q));
  const mainQuestions = mainPool.slice(0, 20);

  /* ---------- Gerüst ---------- */
  const playerName = (window.Auth && Auth.displayName && Auth.displayName()) || "—";
  openModal(`
    <div class="boss-cinematic-header">
      <div class="boss-villain-section">
        <div class="boss-name-pill">${BOSS2_NAME}</div>
        <div class="boss-hp-section" id="boss2-hp-wrap" style="visibility:hidden">
          <div class="boss-hp-bar"><div class="boss-hp-fill" id="boss-hp-fill" style="width:100%"></div></div>
        </div>
      </div>
      <div class="boss-player-section">
        <div class="boss-lives" id="boss-lives" style="visibility:hidden"></div>
        <div class="boss-player-name">${playerName}</div>
      </div>
    </div>
    <div class="boss-cinematic-body boss2-body" id="boss2-body">
      <div class="boss-image-frame boss2-frame" id="boss-image-frame"></div>
      <div class="boss-chat-panel" id="boss-chat-panel"></div>
    </div>
    <div class="boss-quiz-area" id="boss-quiz-area" style="display:none"></div>
  `);
  document.getElementById("modal").classList.add("boss-cinematic", "boss2");
  if (window.Music && Music.duck) Music.duck(true);

  /* ---------- Zustand ---------- */
  let lives = 3, correct = 0, wrong = 0, hp = 100;
  const total = mainQuestions.length;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const isOpen = () => document.getElementById("boss-image-frame") !== null;

  /* ---------- Medien-Helfer ---------- */
  function loadImage(name) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = `${BOSS2_DIR}${name}.png`;
    });
  }

  async function setBackground(name) {
    const frame = document.getElementById("boss-image-frame");
    if (!frame) return;
    const img = await loadImage(name);
    frame.style.backgroundImage = img ? `url("${img.src}")` : "";
    frame.classList.toggle("boss2-bg-placeholder", !img);
  }

  async function setImage(name) {
    const frame = document.getElementById("boss-image-frame");
    if (!frame) return;
    const img = await loadImage(name);
    if (!isOpen()) return;
    const layer = document.createElement("div");
    layer.className = "boss-image-layer";
    if (img) {
      layer.appendChild(img);
    } else {
      const [icon, label] = BOSS2_PLACEHOLDER[name] || ["🖼", name];
      layer.innerHTML = `<div class="boss2-placeholder"><div class="boss2-ph-icon">${icon}</div><div class="boss2-ph-label">${label}</div><div class="boss2-ph-file">${name}.png</div></div>`;
    }
    frame.appendChild(layer);
    await new Promise(r => requestAnimationFrame(r));
    frame.querySelectorAll(".boss-image-layer").forEach(l => { if (l !== layer) l.classList.remove("active"); });
    layer.classList.add("active");
    setTimeout(() => frame.querySelectorAll(".boss-image-layer:not(.active)").forEach(l => l.remove()), 900);
  }

  function shake() {
    const frame = document.getElementById("boss-image-frame");
    if (!frame) return;
    frame.classList.remove("boss2-shake");
    void frame.offsetWidth;
    frame.classList.add("boss2-shake");
  }

  function playSound(name) {
    try {
      const a = new Audio(`${BOSS2_DIR}${name}.m4a`);
      a.volume = 0.9;
      a.play().catch(() => {});
      return a;
    } catch { return null; }
  }

  /* Video abspielen; fehlt es, erscheint eine Platzhalter-Karte */
  /* Video in einer 16:9-Box abspielen.
     opts: withSound, crop (Ausschnitt 10 % größer, oben fix – entfernt
     Wasserzeichen unten rechts), fadeIn (s), fadeOut (s vor Ende),
     onFadeOut, onStart, onSkip. Fehlt die Datei → Platzhalter. */
  function playVideo(name, label, fallbackMs = 3500, opts = {}) {
    return new Promise(resolve => {
      const frame = document.getElementById("boss-image-frame");
      if (!frame) { resolve(null); return; }
      frame.querySelectorAll(".boss-image-layer").forEach(l => l.remove());
      const layer = document.createElement("div");
      layer.className = "boss-image-layer active boss2-video-layer";
      const box = document.createElement("div");
      box.className = "boss2-vbox" + (opts.crop ? " crop" : "");
      const v = document.createElement("video");
      v.muted = true; v.playsInline = true; v.setAttribute("playsinline", ""); v.preload = "auto";
      v.src = `${BOSS2_DIR}${name}.mp4`;
      if (opts.fadeIn) { v.style.opacity = "0"; v.style.transition = `opacity ${opts.fadeIn}s ease`; }
      box.appendChild(v); layer.appendChild(box); frame.appendChild(layer);
      let done = false, fading = false;
      const startFadeOut = () => {
        if (fading) return; fading = true;
        const d = opts.fadeOut || 0.8;
        v.style.transition = `opacity ${d}s ease`; v.style.opacity = "0";
        const v0 = v.volume, t0 = performance.now();
        const tick = () => { const k = Math.min(1, (performance.now() - t0) / (d * 1000)); try { v.volume = v0 * (1 - k); } catch {} if (k < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
        if (opts.onFadeOut) opts.onFadeOut();
      };
      const finish = (ok) => { if (done) return; done = true; resolve(ok ? v : null); };
      v.onended = () => { if (opts.fadeOut) startFadeOut(); finish(true); };
      v.ontimeupdate = () => { if (opts.fadeOut && v.duration && v.duration - v.currentTime <= opts.fadeOut) startFadeOut(); };
      v.onplaying = () => {
        if (opts.fadeIn) requestAnimationFrame(() => { v.style.opacity = "1"; });
        if (opts.onStart) { const f = opts.onStart; opts.onStart = null; f(v); }
      };
      v.onerror = () => {
        layer.innerHTML = `<div class="boss2-placeholder boss2-cine-ph"><div class="boss2-ph-icon">🎬</div><div class="boss2-ph-label">${label}</div><div class="boss2-ph-file">${name}.mp4 folgt</div></div>`;
        if (opts.onFadeOut) setTimeout(opts.onFadeOut, Math.max(0, fallbackMs - 900));
        setTimeout(() => finish(false), fallbackMs);
      };
      if (opts.withSound) {
        /* Videoton nutzen, wenn der Browser es erlaubt – sonst stumm */
        v.muted = false;
        if (opts.volume != null) v.volume = opts.volume;
        v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
      } else {
        v.play().catch(() => {});
      }
      /* Tippen überspringt die Szene */
      layer.addEventListener("click", () => { try { v.pause(); } catch {} if (opts.onSkip) opts.onSkip(); startFadeOut(); finish(true); }, { once: true });
    });
  }

  /* Pixel-Übergang: letztes Videobild zerfällt in Pixel */
  async function pixelTransition(video) {
    const frame = document.getElementById("boss-image-frame");
    if (!frame) return;
    const w = frame.clientWidth, h = frame.clientHeight;
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    canvas.className = "boss2-pixel-canvas";
    const ctx = canvas.getContext("2d");
    const small = document.createElement("canvas");
    const sctx = small.getContext("2d");
    frame.appendChild(canvas);
    const drawFrom = (src, block) => {
      small.width = Math.max(1, Math.ceil(w / block));
      small.height = Math.max(1, Math.ceil(h / block));
      sctx.imageSmoothingEnabled = false;
      sctx.drawImage(src, 0, 0, small.width, small.height);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(small, 0, 0, w, h);
    };
    if (video && video.videoWidth) {
      /* sichtbaren Videoausschnitt (Box + evtl. Zuschnitt) ermitteln */
      const boxEl = video.parentElement, fr = frame.getBoundingClientRect(), br = boxEl.getBoundingClientRect();
      const crop = boxEl.classList.contains("crop") ? 1.1 : 1;
      const sw = video.videoWidth / crop, sh = video.videoHeight / crop, sx0 = (video.videoWidth - sw) / 2;
      const src = document.createElement("canvas"); src.width = Math.round(sw); src.height = Math.round(sh);
      src.getContext("2d").drawImage(video, sx0, 0, sw, sh, 0, 0, src.width, src.height);
      const bx = br.left - fr.left, by = br.top - fr.top;
      for (const block of [2, 4, 8, 14, 22, 34, 50]) {
        small.width = Math.max(1, Math.ceil(br.width / block)); small.height = Math.max(1, Math.ceil(br.height / block));
        sctx.imageSmoothingEnabled = false; sctx.drawImage(src, 0, 0, small.width, small.height);
        ctx.imageSmoothingEnabled = false; ctx.fillStyle = "#000"; ctx.fillRect(0, 0, w, h);
        ctx.drawImage(small, bx, by, br.width, br.height);
        await sleep(110);
      }
    } else {
      ctx.fillStyle = "#0a0612"; ctx.fillRect(0, 0, w, h);
    }
    frame.querySelectorAll(".boss2-video-layer").forEach(l => l.remove());
    canvas.classList.add("fade-out");
    await sleep(600);
    canvas.remove();
  }

  async function say(who, text, speed = 26) {
    if (!isOpen()) return;
    const panel = document.getElementById("boss-chat-panel");
    if (!panel) return;
    const msg = document.createElement("div");
    msg.className = "boss-chat-msg" + (who === DOENER_NAME ? " boss2-msg-doener" : "");
    msg.innerHTML = `<div class="boss-chat-name">${who}</div><div class="boss-chat-text typing"></div>`;
    panel.appendChild(msg);
    const all = Array.from(panel.querySelectorAll(".boss-chat-msg"));
    if (all.length > 3) all.slice(0, all.length - 3).forEach(m => { if (!m.classList.contains("fading-out")) { m.classList.add("fading-out"); setTimeout(() => m.remove(), 320); } });
    const el = msg.querySelector(".boss-chat-text");
    let skip = false;
    panel.addEventListener("click", () => { skip = true; }, { once: true });
    for (let i = 0; i < text.length; i++) {
      if (!isOpen()) return;
      if (skip) { el.textContent = text; break; }
      el.textContent += text[i];
      panel.scrollTop = panel.scrollHeight;
      const ch = text[i];
      await sleep(ch === "." || ch === "!" || ch === "?" ? 220 : ch === "," ? 100 : ch === "…" ? 360 : speed);
    }
    el.classList.remove("typing");
    panel.scrollTop = panel.scrollHeight;
  }

  /* Weiter-Knopf, damit Schüler das Tempo der Dialoge selbst bestimmen */
  function waitTap(label = "Weiter ▸") {
    return new Promise(resolve => {
      const area = document.getElementById("boss-quiz-area");
      if (!area) { resolve(); return; }
      area.style.display = "block";
      area.innerHTML = `<div style="display:flex;justify-content:center"><button class="btn btn-primary" id="boss2-tap">${label}</button></div>`;
      document.getElementById("boss2-tap").addEventListener("click", () => { area.style.display = "none"; resolve(); }, { once: true });
    });
  }

  function updateLives() {
    const el = document.getElementById("boss-lives");
    if (!el) return;
    el.innerHTML = [0, 1, 2].map(i => `<span class="life ${i < lives ? "full" : "empty"}">${i < lives ? "♥" : "♡"}</span>`).join("");
  }
  function updateHP() {
    const f = document.getElementById("boss-hp-fill");
    if (f) f.style.width = `${Math.max(0, hp)}%`;
  }

  /* Frage anzeigen. opts: { timer, retry, header } */
  function ask(q, opts = {}) {
    q = shuffleAnswers(q);
    return new Promise(resolve => {
      const area = document.getElementById("boss-quiz-area");
      if (!area) { resolve({ aborted: true }); return; }
      const limit = opts.timer || 0;
      let left = limit, answered = false, interval = null;
      area.style.display = "block";
      area.innerHTML = `
        <div class="boss-quiz-progress">
          <span>${opts.header || ""}</span>
          ${limit ? `<span class="boss-quiz-timer" id="boss-quiz-timer">⏱ ${limit}s</span>` : "<span></span>"}
          <span>${opts.status || ""}</span>
        </div>
        <div class="boss-quiz-question">${q.q}</div>
        <div class="boss-quiz-answers" id="boss-answers">
          ${q.a.map((a, i) => `<button class="answer-btn" data-i="${i}">${String.fromCharCode(65 + i)}) ${a}</button>`).join("")}
        </div>
        <div class="boss-quiz-next" id="boss-next-slot"></div>`;
      area.scrollTop = 0;
      const btns = [...area.querySelectorAll("#boss-answers .answer-btn")];

      function done(idx, timedOut) {
        if (answered) return;
        const ok = !timedOut && idx === q.correct;
        /* Insider-Modus: falsche Antwort markieren, Spruch, nochmal versuchen */
        if (!ok && opts.onWrong && !timedOut) {
          btns[idx].classList.add("wrong"); btns[idx].disabled = true;
          opts.onWrong();
          return;
        }
        answered = true;
        if (interval) clearInterval(interval);
        btns.forEach(b => b.disabled = true);
        btns[q.correct].classList.add("correct");
        if (!ok && idx != null && btns[idx]) btns[idx].classList.add("wrong");
        if (ok) { state.correctAnswers = (state.correctAnswers || 0) + 1; saveState(); }
        const slot = document.getElementById("boss-next-slot");
        const explain = q.explain && !opts.noExplain ? `<div class="explanation" style="margin-bottom:.8rem">${q.explain}</div>` : "";
        slot.innerHTML = (timedOut ? '<div style="color:var(--c-red);font-family:var(--font-mono);margin-bottom:.6rem">⏱ ZEIT ABGELAUFEN</div>' : "") +
          explain + '<button class="btn btn-primary" id="boss-next-btn">Weiter ▸</button>';
        document.getElementById("boss-next-btn").addEventListener("click", () => resolve({ correct: ok, timedOut }));
        try { document.getElementById("boss-next-btn").scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch {}
      }
      if (limit) {
        interval = setInterval(() => {
          left--;
          const t = document.getElementById("boss-quiz-timer");
          if (t) { t.textContent = `⏱ ${left}s`; if (left <= 5) t.classList.add("timer-warning"); }
          if (left <= 0) done(null, true);
        }, 1000);
      }
      btns.forEach(b => b.addEventListener("click", () => done(+b.dataset.i, false)));
    });
  }

  function hideArea() { const a = document.getElementById("boss-quiz-area"); if (a) a.style.display = "none"; }

  /* ============== 0 · INTRO (cinematic) ============== */
  const body = document.getElementById("boss2-body");
  body.classList.add("boss2-cine");
  await sleep(1200);
  if (!isOpen()) return;

  /* Intro-Ton (boss2-sound.js): Regen, Schritte, erster Platscher */
  const snd = window.Boss2Sound;
  if (snd) await Promise.race([snd.init(), sleep(4000)]);
  if (!isOpen()) return;
  const stopSteps = () => { try { snd && snd.stop(); } catch {} };
  const stopRain = (fade) => { try { snd && snd.stopRain(fade); } catch {} };
  /* Wird das Fenster während des Intros geschlossen: Ton stoppen, Musik zurück */
  const introGuard = setInterval(() => {
    if (!isOpen()) {
      clearInterval(introGuard); stopSteps(); stopRain(0.3);
      if (window.Music && Music.duck) Music.duck(false);
    }
  }, 300);
  /* Timing (Sekunden):
     Van blendet in den letzten 0,9 s ab → 0,6 s Schwarz → Pfütze blendet
     in 0,7 s auf. Die Schritte setzen schon beim Abblenden ein und laufen
     durch das Schwarz in die Pfützen-Szene; der Platscher liegt auf dem
     Tritt im Bild (~1,1 s). */
  const FADE_OUT = 0.9, BLACK = 0.6, FADE_IN = 0.7;
  const startSteps = () => { try { snd && snd.startApproach(FADE_OUT + BLACK); } catch {} };

  /* Regen läuft unter dem ganzen Intro */
  try { snd && snd.startRain(1); } catch {}

  /* Clip 1: Toaster-Van (Veo, mit eigenem Ton), blendet ins Schwarz ab */
  await playVideo("boss2_s1_van", "Szene 1 · Ein Toaster-Van parkt unter einer Laterne", 3500,
    { withSound: true, volume: snd ? snd.CFG.vanVolume : 0.55, fadeOut: FADE_OUT, onFadeOut: startSteps });
  if (!isOpen()) return;
  await sleep(BLACK * 1000);
  if (!isOpen()) return;

  /* Clip 2: Pfütze (Kling, stumm, Wasserzeichen weggeschnitten), blendet auf */
  const lastVideo = await playVideo("boss2_s2_pfuetze", "Szene 2 · Ein Stiefel mit gelber Naht tritt im Gehen in die Pfütze", 4000, {
    crop: true, fadeIn: FADE_IN,
    onStart: (v) => { try { snd && snd.syncToVideo(v.currentTime); } catch {} },
    onSkip: stopSteps
  });
  stopSteps();
  stopRain(1.5);
  if (!isOpen()) return;
  await pixelTransition(lastVideo);
  if (!isOpen()) return;
  body.classList.remove("boss2-cine");
  clearInterval(introGuard);
  if (window.Music && Music.duck) Music.duck(false);
  if (window.setMusicMode) setMusicMode("boss");

  /* ============== 1 · BEGEGNUNG ============== */
  await setBackground("boss2_laden");
  await setImage("boss2_du_ueberrascht");
  await say(BOSS2_NAME, "Na nu? Was machen Sie denn hier?");
  await sleep(900);
  if (!isOpen()) return;
  await setImage("boss2_du_zwinkern");
  await say(BOSS2_NAME, "Tun Sie mir einen Gefallen, und bestellen Sie schon mal für mich … ich muss noch was im Auto vergessen.");
  await waitTap();
  if (!isOpen()) return;

  /* ============== 2 · BESTELLUNG (Insider) ============== */
  await setImage("boss2_doener_freundlich");
  await say(DOENER_NAME, "Guten Abend! Ah, Sie bestellen für ihn? Dann wollen wir mal sehen, ob Sie ihn kennen …");
  for (let i = 0; i < BOSS2_INSIDER.length; i++) {
    if (!isOpen()) return;
    const iq = BOSS2_INSIDER[i];
    await say(DOENER_NAME, iq.q);
    let tries = 0;
    const r = await ask({ q: iq.q, a: iq.a, correct: 0 }, {
      noExplain: true,
      header: `Bestellung ${i + 1} / 3`,
      onWrong: () => {
        setImage("boss2_doener_skeptisch");
        say(DOENER_NAME, BOSS2_INSIDER_WRONG[tries++ % BOSS2_INSIDER_WRONG.length]);
      }
    });
    if (r.aborted || !isOpen()) return;
    await setImage("boss2_doener_lachen");
    await say(DOENER_NAME, i === 2 ? "Super Döner, Curry & Chili, ohne Zwiebel mit Käse – genau wie immer!" : "Genau so!");
    hideArea();
  }

  /* ============== 3 · SMALLTALK & BLUTDRUCK ============== */
  await setImage("boss2_doener_blutdruck");
  await say(DOENER_NAME, "Puh … entschuldigen Sie. Mein Arzt sagt, mein Blutdruck ist viel zu hoch.");
  await say(DOENER_NAME, "Sie sind doch in der Pflege, oder? Dann können Sie mir bestimmt ein paar Fragen beantworten …");
  for (let i = 0; i < smalltalk.length; i++) {
    if (!isOpen()) return;
    const r = await ask(smalltalk[i], { header: `Smalltalk ${i + 1} / ${smalltalk.length}` });
    if (r.aborted || !isOpen()) return;
    await setImage(r.correct ? "boss2_doener_lachen" : "boss2_doener_skeptisch");
    if (i === 1) await say(DOENER_NAME, "Interessant! Das hat mir mein Hausarzt nie so erklärt.");
    if (i === 3) await say(DOENER_NAME, "Ich glaub, ich lass ab morgen das Salz weg … vielleicht.");
  }
  hideArea();

  /* ============== 4 · DER DEAL ============== */
  playSound("boss2_tuer");
  await setImage("boss2_du_zurueck");
  await say(BOSS2_NAME, "So, da bin ich wieder. Haben Sie bestellt?");
  await say(DOENER_NAME, "Hat er! Aber … ähm … zahlen wollte er wohl nicht. Kein Portemonnaie dabei.");
  await setImage("boss2_du_deal");
  await say(BOSS2_NAME, "Soso. Kein Geld dabei? Na gut – ich gebe Ihnen das Essen aus …");
  await say(BOSS2_NAME, "… wenn Sie sich bewähren.");
  await waitTap("Herausforderung annehmen ⚔");
  if (!isOpen()) return;
  document.getElementById("boss2-hp-wrap").style.visibility = "visible";
  document.getElementById("boss-lives").style.visibility = "visible";
  updateLives(); updateHP();

  /* ============== 5 · HAUPTKAMPF ============== */
  for (let i = 0; i < total; i++) {
    if (!isOpen()) return;
    const r = await ask(mainQuestions[i], {
      timer: i >= total - 5 ? 10 : 15,
      header: `Frage ${i + 1} / ${total}`,
      status: `${correct} richtig · ${wrong} falsch`
    });
    if (r.aborted || !isOpen()) return;
    if (r.correct) {
      correct++; hp = 100 - correct * (100 / total); updateHP();
      if (i % 4 === 0) await setImage("boss2_du_zufrieden");
    } else {
      wrong++; lives--; updateLives(); shake();
      await setImage("boss2_du_kopfschuetteln");
      if (lives <= 0) break;
    }
    if (i === 9 && lives > 0) {
      await say(BOSS2_NAME, "Halbzeit. Der Döner wird kalt – also konzentrieren Sie sich!");
      await sleep(600);
    }
    if (i === total - 6 && lives > 0) {
      await say(DOENER_NAME, "Jetzt wird's ernst – die letzten Fragen gehen schneller!");
      await sleep(600);
    }
  }
  hideArea();
  if (!isOpen()) return;

  /* ============== ENDE ============== */
  if (lives <= 0) {
    await setImage("boss2_du_niederlage");
    await say(BOSS2_NAME, "Tja … dann zahlen Sie wohl selbst. Oder Sie helfen beim Abwasch.");
    await say(DOENER_NAME, "Die Spüle wartet schon, Chef!");
  } else {
    hp = 0; updateHP();
    await setImage("boss2_du_sieg");
    await say(BOSS2_NAME, "Sie haben sich bewährt. Der Döner geht auf mich!");
    await say(DOENER_NAME, "Zwei Super Döner, Curry & Chili, ohne Zwiebel mit Käse – kommt sofort!");
    state.boss2Wins = (state.boss2Wins || 0) + 1;
    saveState();
    addXP(correct === total ? 300 : 220, correct === total ? "Boss II besiegt (perfekt)" : "Boss II besiegt");
  }
  checkAchievements();

  const area = document.getElementById("boss-quiz-area");
  if (!area) return;
  area.style.display = "block";
  area.innerHTML = `<div style="display:flex;justify-content:center;gap:.8rem;flex-wrap:wrap">
    <button class="btn btn-primary" id="boss2-close">Schließen</button>
    <button class="btn btn-magenta" id="boss2-retry">Nochmal bestellen</button></div>`;
  document.getElementById("boss2-close").addEventListener("click", () => closeModal());
  document.getElementById("boss2-retry").addEventListener("click", () => { closeModal(); setTimeout(() => startBossBattle2(), 200); });
}

window.startBossBattle2 = startBossBattle2;
