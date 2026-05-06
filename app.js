/* ===========================================================
   PFF32 // APP LOGIC
   State-Management, Gamification, Views, Spiele
   =========================================================== */

/* data.js declares TOPICS, WEEKS, CATEGORIES, ACHIEVEMENTS, categoryComplete
   at global scope — they're available here without re-declaring. */

/* ---------- STATE ---------- */
const DEFAULT_STATE = {
  xp: 0,
  level: 1,
  streak: 0,
  lastStudyDate: null,
  completed: [],        // topic IDs
  topicScores: {},      // topicId -> best % in quiz
  studyLog: {},         // 'YYYY-MM-DD' -> count
  correctAnswers: 0,
  perfectQuizzes: 0,
  bossWins: 0,
  flashcardsStudied: 0,
  matchBestTime: null,
  maxPerDay: 0,
  lateNight: false,
  earlyBird: false,
  weekendWarrior: false,
  unlockedAchievements: [],
  examDate: null
};

let state = loadState();

function loadState() {
  /* Auth.loadState liest user-genamespaced aus pff32_state_<user>.
     Ohne eingeloggten User → Defaults (Landing blockiert die App ohnehin). */
  if (window.Auth) return Auth.loadState(DEFAULT_STATE);
  try {
    const raw = localStorage.getItem("pff32_state");
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState() {
  if (window.Auth) { Auth.saveState(state); return; }
  localStorage.setItem("pff32_state", JSON.stringify(state));
}

/* ---------- XP / LEVEL ---------- */
function xpNeededForLevel(lvl) {
  return Math.floor(100 * Math.pow(1.25, lvl - 1));
}

function addXP(amount, reason = "") {
  state.xp += amount;
  let leveled = false;
  while (state.xp >= xpNeededForLevel(state.level)) {
    state.xp -= xpNeededForLevel(state.level);
    state.level++;
    leveled = true;
  }
  saveState();
  toast(`+${amount} XP`, reason, "cyan");
  if (leveled) showLevelUp();
  updateHeader();
}

function showLevelUp() {
  const banner = document.createElement("div");
  banner.className = "level-up-banner";
  banner.textContent = `LEVEL ${state.level}!`;
  document.body.appendChild(banner);
  setTimeout(() => banner.remove(), 2500);
  checkAchievements();
}

/* ---------- STREAK ---------- */
function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastStudyDate === today) return; // bereits heute gezählt

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (state.lastStudyDate === yesterday) {
    state.streak++;
  } else {
    state.streak = 1;
  }
  state.lastStudyDate = today;

  // study log
  state.studyLog[today] = (state.studyLog[today] || 0);

  // time-based achievements
  const h = new Date().getHours();
  if (h >= 22) state.lateNight = true;
  if (h < 7) state.earlyBird = true;
  const d = new Date().getDay();
  if (d === 0 || d === 6) state.weekendWarrior = true;

  saveState();
}

/* ---------- COMPLETE TOPIC ---------- */
function markTopicCompleted(topicId, score = null) {
  updateStreak();
  const isNew = !state.completed.includes(topicId);
  if (isNew) {
    state.completed.push(topicId);
    addXP(50, `Thema: ${TOPICS[topicId].title}`);
  }
  if (score !== null) {
    const prev = state.topicScores[topicId] || 0;
    state.topicScores[topicId] = Math.max(prev, score);
  }
  const today = new Date().toISOString().slice(0, 10);
  state.studyLog[today] = (state.studyLog[today] || 0) + 1;
  state.maxPerDay = Math.max(state.maxPerDay, state.studyLog[today]);
  saveState();
  checkAchievements();
}

/* ---------- ACHIEVEMENTS ---------- */
function checkAchievements() {
  ACHIEVEMENTS.forEach(a => {
    if (state.unlockedAchievements.includes(a.id)) return;
    try {
      if (a.check(state)) {
        state.unlockedAchievements.push(a.id);
        saveState();
        toast(`${a.icon} ${a.name}`, a.desc, "green");
      }
    } catch (e) {}
  });
}

/* ---------- TOASTS ---------- */
function toast(title, msg, variant = "") {
  const c = document.getElementById("toast-container");
  const el = document.createElement("div");
  el.className = "toast " + variant;
  el.innerHTML = `<div class="toast-icon">▶</div>
    <div><div class="toast-title">${title}</div><div class="toast-msg">${msg || ""}</div></div>`;
  c.appendChild(el);
  setTimeout(() => { el.classList.add("exit"); setTimeout(() => el.remove(), 300); }, 3200);
}

/* ---------- HEADER ---------- */
function updateHeader() {
  document.getElementById("stat-level").textContent = state.level;
  document.getElementById("stat-streak").innerHTML = state.streak + ' <span class="flame">🔥</span>';
  const need = xpNeededForLevel(state.level);
  const pct = Math.min(100, (state.xp / need) * 100);
  document.getElementById("xp-bar").style.width = pct + "%";
  document.getElementById("xp-text").textContent = `${state.xp} / ${need}`;

  // Countdown
  if (state.examDate) {
    const days = Math.ceil((new Date(state.examDate) - new Date()) / 86400000);
    document.getElementById("stat-countdown").textContent = days >= 0 ? days + "d" : "--";
  }
}

/* ---------- NAV ---------- */
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderView(btn.dataset.view);
  });
});

/* ---------- MODAL ---------- */
const modalOverlay = document.getElementById("modal-overlay");
/* WICHTIG: closeModal wird später noch gewrapped (Music-Mode-Reset).
   Wir verpacken in eine Arrow-Function, damit beim Klick die AKTUELLE
   closeModal-Variable nachgeschaut wird, nicht die ursprüngliche
   Funktions-Referenz von vor dem Wrap. */
document.getElementById("modal-close").addEventListener("click", () => closeModal());
modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });

function openModal(html) {
  // Modal-Variant-Klassen (z.B. boss-cinematic) zurücksetzen,
  // damit jedes neue Modal mit cleanem State startet
  document.getElementById("modal").className = "modal";
  document.getElementById("modal-content").innerHTML = html;
  modalOverlay.classList.remove("hidden");
}
function closeModal() {
  modalOverlay.classList.add("hidden");
  document.getElementById("modal-content").innerHTML = "";
  // on close, refresh current view
  const active = document.querySelector(".nav-btn.active");
  if (active) renderView(active.dataset.view);
  updateHeader();
}

/* ---------- VIEWS ---------- */
function renderView(view) {
  const root = document.getElementById("view-container");
  switch (view) {
    case "dashboard": return renderDashboard(root);
    case "wochen":    return renderWeeks(root);
    case "themen":    return renderThemen(root);
    case "spiele":    return renderSpiele(root);
    case "achievements": return renderAchievements(root);
    case "stats":     return renderStats(root);
  }
}

function renderDashboard(root) {
  const totalTopics = Object.keys(TOPICS).length;
  const done = state.completed.length;
  const pct = Math.round((done / totalTopics) * 100);

  // kategorien
  const catHtml = Object.entries(CATEGORIES).map(([key, c]) => {
    const ids = Object.keys(TOPICS).filter(id => TOPICS[id].category === key);
    const doneIds = ids.filter(id => state.completed.includes(id));
    if (ids.length === 0) return "";
    const p = ids.length > 0 ? Math.round(doneIds.length / ids.length * 100) : 0;
    return `
      <div class="category-card" data-cat="${key}">
        <div class="ring-wrapper">
          ${progressRing(p)}
        </div>
        <div class="category-name">${c.icon} ${c.name}</div>
        <div class="big-number-sub" style="text-align:center">${doneIds.length} / ${ids.length}</div>
      </div>`;
  }).join("");

  root.innerHTML = `
    <h1 class="view-title">Hirn-Leistungs-Training</h1>
    <p class="view-subtitle">Willkommen im Prüfungstraining · ${done} von ${totalTopics} Themen (${pct}%)</p>

    <div class="dashboard-grid">
      <div class="panel">
        <div class="panel-title">Gesamtfortschritt</div>
        <div class="big-number">${pct}<span style="font-size:1.5rem">%</span></div>
        <div class="big-number-sub">${done} / ${totalTopics} Themen</div>
        <div class="xp-bar-wrapper" style="margin-top:1rem;height:10px">
          <div class="xp-bar" style="width:${pct}%"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title">Aktuelle Streak</div>
        <div class="big-number">${state.streak} <span style="font-size:2rem">🔥</span></div>
        <div class="big-number-sub">Tage in Folge</div>
      </div>
      <div class="panel">
        <div class="panel-title">Level</div>
        <div class="big-number">${state.level}</div>
        <div class="big-number-sub">${state.xp} / ${xpNeededForLevel(state.level)} XP</div>
      </div>
      <div class="panel">
        <div class="panel-title">Prüfungs-Countdown</div>
        ${state.examDate
          ? `<div class="big-number">${Math.max(0, Math.ceil((new Date(state.examDate) - new Date())/86400000))}</div>
             <div class="big-number-sub">Tage bis zur Prüfung</div>
             <button class="btn btn-small" style="margin-top:.8rem" onclick="setExamDate()">Datum ändern</button>`
          : `<div class="big-number" style="font-size:1.3rem">Datum setzen</div>
             <button class="btn btn-primary btn-small" style="margin-top:.8rem" onclick="setExamDate()">Prüfungsdatum eingeben</button>`
        }
      </div>
    </div>

    <h2 class="view-title" style="font-size:1.3rem;margin-top:2rem">Themen-Kategorien</h2>
    <div class="category-grid">${catHtml}</div>

    <h2 class="view-title" style="font-size:1.3rem;margin-top:2rem">Schnell-Aktionen</h2>
    <div style="display:flex;gap:.8rem;flex-wrap:wrap;margin-top:.5rem">
      <button class="btn btn-primary" onclick="startRandomTopic()">▶ Zufälliges Thema</button>
      <button class="btn btn-cyan" onclick="startDailyQuiz()">▷ Tages-Quiz (10 Fragen)</button>
      <button class="btn btn-magenta" onclick="startBossBattle()">💀 Boss-Battle</button>
    </div>
  `;

  root.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      const cat = card.dataset.cat;
      document.querySelector('[data-view="themen"]').click();
      setTimeout(() => {
        const input = document.getElementById("cat-filter-" + cat);
        if (input) input.click();
      }, 60);
    });
  });
}

function progressRing(pct) {
  const r = 42, c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return `<div class="progress-ring">
    <svg viewBox="0 0 100 100">
      <circle class="ring-bg" cx="50" cy="50" r="${r}"></circle>
      <circle class="ring-fg" cx="50" cy="50" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${off}"></circle>
    </svg>
    <div class="ring-label">
      <div class="ring-percent">${pct}%</div>
    </div>
  </div>`;
}

function renderWeeks(root) {
  const html = WEEKS.map(w => {
    const days = [["Mo", w.mo], ["Di", w.di], ["Mi", w.mi], ["Do", w.do], ["Fr", w.fr]];
    const validDays = days.filter(d => d[1]);
    const doneCount = validDays.filter(d => state.completed.includes(d[1])).length;
    const daysHtml = days.map(([label, id]) => {
      if (!id) return `<div class="day-item" style="opacity:.3"><span class="day-label">${label}</span><span class="day-title">– frei –</span></div>`;
      const t = TOPICS[id];
      const done = state.completed.includes(id);
      return `<div class="day-item ${done ? 'completed' : ''}" data-id="${id}">
        <span class="day-label">${label}</span>
        <span class="day-title">${t.title}</span>
        <span class="day-status">${done ? '✓' : '▸'}</span>
      </div>`;
    }).join("");

    return `<div class="week-card">
      <div class="week-header">
        <span class="week-number">SW ${String(w.n).padStart(2,"0")}</span>
        <span class="week-progress">${doneCount} / ${validDays.length}</span>
      </div>
      ${daysHtml}
    </div>`;
  }).join("");

  root.innerHTML = `
    <h1 class="view-title">Wochenplan</h1>
    <p class="view-subtitle">28 Unterrichtswochen · ${Object.keys(TOPICS).length} Themen</p>
    <div class="weeks-container">${html}</div>
  `;

  root.querySelectorAll(".day-item[data-id]").forEach(el => {
    el.addEventListener("click", () => openTopic(el.dataset.id));
  });
}

function renderThemen(root) {
  const allCats = Object.entries(CATEGORIES);
  const catFilters = `<button class="cat-filter active" data-cat="all">Alle</button>` +
    allCats.map(([k, c]) => `<button class="cat-filter" id="cat-filter-${k}" data-cat="${k}">${c.icon} ${c.name}</button>`).join("");

  root.innerHTML = `
    <h1 class="view-title">Themen-Übersicht</h1>
    <p class="view-subtitle">${Object.keys(TOPICS).length} Lerneinheiten · durchsuchen & filtern</p>
    <input class="themen-search" id="themen-search" placeholder="Thema suchen...">
    <div class="themen-categories">${catFilters}</div>
    <div class="topic-list" id="topic-list"></div>
  `;

  function refresh() {
    const q = document.getElementById("themen-search").value.toLowerCase();
    const activeCat = root.querySelector(".cat-filter.active").dataset.cat;
    const list = Object.entries(TOPICS)
      .filter(([id, t]) => (activeCat === "all" || t.category === activeCat) &&
                          (t.title.toLowerCase().includes(q) || t.intro.toLowerCase().includes(q)))
      .map(([id, t]) => {
        const done = state.completed.includes(id);
        const score = state.topicScores[id] || 0;
        return `<div class="topic-list-item ${done ? 'completed' : ''}" data-id="${id}">
          <div>
            <div class="topic-list-name">${t.title}</div>
            <div class="topic-list-meta">${CATEGORIES[t.category]?.icon || ""} ${CATEGORIES[t.category]?.name || ""}${score ? " · Best: " + score + "%" : ""}</div>
          </div>
          <div>${done ? '<span style="color:var(--c-green)">✓</span>' : '▸'}</div>
        </div>`;
      }).join("");
    document.getElementById("topic-list").innerHTML = list || `<p style="color:var(--c-text-dim);grid-column:1/-1">Keine Treffer.</p>`;
    document.querySelectorAll(".topic-list-item").forEach(el => el.addEventListener("click", () => openTopic(el.dataset.id)));
  }

  document.getElementById("themen-search").addEventListener("input", refresh);
  root.querySelectorAll(".cat-filter").forEach(btn => btn.addEventListener("click", () => {
    root.querySelectorAll(".cat-filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active"); refresh();
  }));
  refresh();
}

/* ---------- TOPIC DETAIL ---------- */
function openTopic(id) {
  const t = TOPICS[id];
  if (!t) return;
  const done = state.completed.includes(id);
  const score = state.topicScores[id] || 0;
  openModal(`
    <div class="topic-header">
      <div class="topic-category">${CATEGORIES[t.category]?.icon || ""} ${CATEGORIES[t.category]?.name || ""}</div>
      <div class="topic-title">${t.title}</div>
      ${done ? '<div style="color:var(--c-green);font-family:var(--font-mono);font-size:.85rem">✓ Abgeschlossen' + (score ? ' · Best: ' + score + '%' : '') + '</div>' : ''}
    </div>
    <div class="topic-section">
      <h3>Intro</h3>
      <div class="topic-content">${t.intro}</div>
    </div>
    <div class="topic-section">
      <h3>Lerninhalt</h3>
      <div class="topic-content">${t.content}</div>
    </div>
    <div class="topic-actions">
      <button class="btn btn-primary" onclick="startQuiz('${id}')">▶ Quiz starten (${t.questions.length} Fragen)</button>
      <button class="btn btn-cyan" onclick="startFlashcards('${id}')">🗂️ Karteikarten</button>
      <button class="btn btn-green" onclick="markRead('${id}')">✓ Als gelesen markieren</button>
    </div>
  `);
}

function markRead(id) {
  markTopicCompleted(id);
  closeModal();
  toast("Thema erfasst", TOPICS[id].title, "green");
}

window.markRead = markRead;
window.openTopic = openTopic;

/* ===========================================================
   QUIZ
   =========================================================== */
function startQuiz(topicId, opts = {}) {
  const t = TOPICS[topicId];
  if (!t || !t.questions || !t.questions.length) {
    toast("Keine Fragen", "Für dieses Thema gibt es keine Quiz-Fragen.", "");
    return;
  }
  runQuiz({
    title: t.title,
    questions: t.questions.map(q => ({ ...q, _topic: topicId })),
    onFinish: (score, correct, total) => {
      markTopicCompleted(topicId, score);
      if (score === 100) {
        state.perfectQuizzes = (state.perfectQuizzes || 0) + 1;
        saveState();
      }
      addXP(20 + Math.round(score / 10), `Quiz: ${t.title}`);
      checkAchievements();
    },
    ...opts
  });
}

function runQuiz({ title, questions, onFinish, bossMode = false }) {
  let idx = 0, correct = 0;
  const total = questions.length;
  let hp = bossMode ? 3 : null; // Boss: 3 Leben

  function render() {
    if (idx >= total || (bossMode && hp <= 0)) return finish();
    const q = questions[idx];
    const progress = ((idx) / total) * 100;

    openModal(`
      ${bossMode ? `<div class="boss-banner"><h2>💀 BOSS BATTLE</h2>
        <div style="font-family:var(--font-mono);color:var(--c-text-dim);margin-top:.4rem">Leben: ${"❤️".repeat(hp)}${"🖤".repeat(3 - hp)}</div>
        <div class="hp-bar-wrapper"><div class="hp-bar" style="width:${(hp/3)*100}%"></div></div>
      </div>` : ""}
      <div class="topic-header">
        <div class="topic-category">${bossMode ? "Boss-Quiz" : "Quiz"}</div>
        <div class="topic-title">${title}</div>
      </div>
      <div class="quiz-progress"><span>Frage ${idx + 1} / ${total}</span><span>✓ ${correct}</span></div>
      <div class="quiz-bar"><div class="quiz-bar-fill" style="width:${progress}%"></div></div>
      <div class="question-text">${q.q}</div>
      <div class="answers" id="answers">
        ${q.a.map((ans, i) => `<button class="answer-btn" data-i="${i}">${String.fromCharCode(65 + i)}) ${ans}</button>`).join("")}
      </div>
      <div id="explain-slot"></div>
      <div id="next-slot" style="margin-top:1.2rem"></div>
    `);

    document.querySelectorAll("#answers .answer-btn").forEach(btn => {
      btn.addEventListener("click", () => pickAnswer(parseInt(btn.dataset.i)));
    });
  }

  function pickAnswer(i) {
    const q = questions[idx];
    const btns = document.querySelectorAll("#answers .answer-btn");
    btns.forEach(b => b.disabled = true);
    btns[q.correct].classList.add("correct");
    const isCorrect = i === q.correct;
    if (!isCorrect) {
      btns[i].classList.add("wrong");
      if (bossMode) hp--;
    } else {
      correct++;
      state.correctAnswers = (state.correctAnswers || 0) + 1;
      saveState();
    }
    document.getElementById("explain-slot").innerHTML = `
      <div class="explanation"><strong>${isCorrect ? "✓ Richtig" : "✗ Falsch"}:</strong> ${q.explain || ""}</div>`;
    document.getElementById("next-slot").innerHTML =
      `<button class="btn btn-primary" id="next-btn">${idx + 1 === total ? "Ergebnis anzeigen" : "Nächste Frage ▸"}</button>`;
    document.getElementById("next-btn").addEventListener("click", () => { idx++; render(); });
  }

  function finish() {
    const score = Math.round((correct / total) * 100);
    const won = bossMode ? (hp > 0 && correct >= Math.ceil(total * 0.7)) : true;
    if (bossMode && won) {
      state.bossWins = (state.bossWins || 0) + 1;
      saveState();
    }
    /* Boss-Kampf vorbei → zurück zur normalen Musik. Result-Screen
       läuft schon mit Drive-Musik, nicht mehr mit Boss-Track. */
    if (bossMode && window.setMusicMode) setMusicMode("drive");
    openModal(`
      <div class="quiz-result">
        <div style="font-family:var(--font-display);letter-spacing:3px;color:var(--c-text-dim);text-transform:uppercase">${bossMode ? (won ? "Boss besiegt!" : "Boss hat gewonnen") : "Quiz beendet"}</div>
        <div class="big-score">${score}%</div>
        <div style="font-family:var(--font-mono);color:var(--c-text-dim)">${correct} von ${total} richtig</div>
        ${bossMode ? `<div style="margin-top:.8rem;font-size:1.1rem;color:${won ? 'var(--c-green)' : 'var(--c-red)'}">${won ? "🏆 +100 XP Bonus" : "Nochmal versuchen!"}</div>` : ""}
        <div style="margin-top:2rem;display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" id="q-close">Schließen</button>
          <button class="btn btn-cyan" id="q-retry">Nochmal</button>
        </div>
      </div>
    `);
    document.getElementById("q-close").addEventListener("click", closeModal);
    document.getElementById("q-retry").addEventListener("click", () => {
      idx = 0; correct = 0; hp = bossMode ? 3 : null;
      /* Bei "Nochmal" im Boss-Modus wieder Boss-Musik einblenden. */
      if (bossMode && window.setMusicMode) setMusicMode("boss");
      render();
    });
    if (bossMode && won) addXP(100, "Boss-Sieg");
    if (typeof onFinish === "function") onFinish(score, correct, total);
  }

  render();
}

/* ===========================================================
   FLASHCARDS
   =========================================================== */
function startFlashcards(topicId) {
  const t = TOPICS[topicId];
  if (!t || !t.flashcards || !t.flashcards.length) {
    toast("Keine Karteikarten", "Für dieses Thema nicht verfügbar.", "");
    return;
  }
  let idx = 0, flipped = false;
  const cards = [...t.flashcards];

  function render() {
    if (idx >= cards.length) return finish();
    const c = cards[idx];
    openModal(`
      <div class="topic-header">
        <div class="topic-category">🗂️ Karteikarten</div>
        <div class="topic-title">${t.title}</div>
      </div>
      <div class="quiz-progress"><span>Karte ${idx + 1} / ${cards.length}</span></div>
      <div class="quiz-bar"><div class="quiz-bar-fill" style="width:${(idx/cards.length)*100}%"></div></div>
      <div class="flashcard ${flipped ? 'flipped' : ''}" id="fc">
        <div class="flashcard-inner">
          <div class="flashcard-face flashcard-front">
            ${c.front}
            <div class="hint">[ Klick zum Umdrehen ]</div>
          </div>
          <div class="flashcard-face flashcard-back">${c.back}</div>
        </div>
      </div>
      <div style="display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-primary" id="fc-next">${idx + 1 === cards.length ? "Fertig" : "Nächste ▸"}</button>
        <button class="btn btn-cyan" id="fc-flip">${flipped ? "Vorne zeigen" : "Umdrehen"}</button>
      </div>
    `);
    document.getElementById("fc").addEventListener("click", flip);
    document.getElementById("fc-flip").addEventListener("click", flip);
    document.getElementById("fc-next").addEventListener("click", () => {
      state.flashcardsStudied = (state.flashcardsStudied || 0) + 1;
      saveState();
      idx++; flipped = false; render();
    });
  }

  function flip() { flipped = !flipped; render(); }

  function finish() {
    addXP(15, `Karteikarten: ${t.title}`);
    checkAchievements();
    openModal(`
      <div class="quiz-result">
        <div class="big-score" style="font-size:2.5rem">✓ Fertig!</div>
        <div style="font-family:var(--font-mono);color:var(--c-text-dim)">${cards.length} Karten studiert · +15 XP</div>
        <div style="margin-top:2rem;display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" id="fc-close">Schließen</button>
          <button class="btn btn-cyan" id="fc-redo">Nochmal</button>
        </div>
      </div>
    `);
    document.getElementById("fc-close").addEventListener("click", closeModal);
    document.getElementById("fc-redo").addEventListener("click", () => { idx = 0; flipped = false; render(); });
  }

  render();
}

window.startQuiz = startQuiz;
window.startFlashcards = startFlashcards;

/* ===========================================================
   SHORTCUTS: RANDOM TOPIC, DAILY QUIZ, BOSS BATTLE, EXAM DATE
   =========================================================== */
function startRandomTopic() {
  const allIds = Object.keys(TOPICS);
  const unfinished = allIds.filter(id => !state.completed.includes(id));
  const pool = unfinished.length ? unfinished : allIds;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  openTopic(pick);
}

function startDailyQuiz() {
  // 10 zufällige Fragen aus allen Themen
  const pool = [];
  Object.entries(TOPICS).forEach(([id, t]) => {
    (t.questions || []).forEach(q => pool.push({ ...q, _topic: id, _topicTitle: t.title }));
  });
  if (pool.length < 5) {
    toast("Zu wenig Fragen", "Es sind nicht genug Quiz-Fragen verfügbar.", "");
    return;
  }
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const picked = pool.slice(0, Math.min(10, pool.length));
  runQuiz({
    title: "Tages-Quiz",
    questions: picked,
    onFinish: (score, c, tot) => {
      addXP(30 + Math.round(score / 5), `Tages-Quiz: ${score}%`);
      if (score === 100) {
        state.perfectQuizzes = (state.perfectQuizzes || 0) + 1;
        saveState();
      }
      checkAchievements();
    }
  });
}

/* ============================================================
   BOSS BATTLE — Cinematic mit 25 Fragen, 3 Leben, Boss-HP,
   getipptem Dialog und sequenzierten Bild-Crossfades.
   Boss-Name "3,1415" in roter Schrift.
   ============================================================ */
async function startBossBattle() {
  // 1. Voraussetzung: ein paar Themen müssen abgeschlossen sein
  if (state.completed.length < 3) {
    toast("Zu früh", "Schließe erst mindestens 3 Themen ab, bevor du gegen 3,1415 antrittst.", "");
    return;
  }

  // 2. Frage-Pool aus den abgeschlossenen Themen + Backup
  const doneTopics = state.completed.length ? state.completed : Object.keys(TOPICS);
  const pool = [];
  doneTopics.forEach(id => {
    const t = TOPICS[id];
    if (t && t.questions) t.questions.forEach(q => pool.push({ ...q, _topic: id }));
  });
  if (pool.length < 25) {
    // Fallback: nimm aus dem ganzen TOPICS-Set
    Object.keys(TOPICS).forEach(id => {
      if (!doneTopics.includes(id) && pool.length < 50) {
        const t = TOPICS[id];
        if (t && t.questions) t.questions.forEach(q => pool.push({ ...q, _topic: id }));
      }
    });
  }
  if (pool.length < 25) {
    toast("Hmmm", "Es sind aktuell zu wenig Quiz-Fragen verfügbar.", "");
    return;
  }
  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  // Boss-Battle startet IMMER mit dieser Insider-Frage als Frage 1.
  // Die restlichen 24 Fragen werden zufällig aus dem Pool gezogen.
  const introQuestion = {
    q: "Wie heißt der beste Lehrer am RBB mit Vornamen?",
    a: ["Philipp", "Philip", "Phillip", "Phillipp"],
    correct: 0,
    explain: "Philipp — mit einem L und zwei P."
  };
  const questions = [introQuestion, ...pool.slice(0, 24)];

  // 3. Cinematic-Modal öffnen
  const playerName = (window.Auth && Auth.displayName && Auth.displayName()) || "—";
  openModal(`
    <div class="boss-cinematic-header">
      <div class="boss-villain-section">
        <div class="boss-name-pill">3,1415</div>
        <div class="boss-hp-section">
          <div class="boss-hp-bar"><div class="boss-hp-fill" id="boss-hp-fill" style="width: 100%"></div></div>
        </div>
      </div>
      <div class="boss-player-section">
        <div class="boss-lives" id="boss-lives"></div>
        <div class="boss-player-name">${playerName}</div>
      </div>
    </div>
    <div class="boss-cinematic-body">
      <div class="boss-image-frame" id="boss-image-frame"></div>
      <div class="boss-chat-panel" id="boss-chat-panel"></div>
    </div>
    <div class="boss-quiz-area" id="boss-quiz-area" style="display:none"></div>
  `);
  document.getElementById("modal").classList.add("boss-cinematic");

  // Bilder vorladen (parallel, asynchron) — verhindert Lade-Glitches
  ["ganz_ernst","nase","ernst","schmunzeln","wow","trinken","saja","stolz","ciao"]
    .forEach(n => { const i = new Image(); i.src = `assets/${n}.png`; });

  // Audio-Engine warm machen, damit SFX später sofort spielen
  if (window.Music && Music.start) Music.start();

  /* ---------- State ---------- */
  let lives = 3;
  let correct = 0;
  let wrongAnswers = 0;
  let bossHP = 100;
  const total = questions.length;

  /* ---------- Helpers ---------- */
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const isOpen = () => document.getElementById("boss-image-frame") !== null;

  function setBossImage(name) {
    return new Promise(resolve => {
      const frame = document.getElementById("boss-image-frame");
      if (!frame) { resolve(); return; }
      const img = new Image();
      const finalize = () => {
        if (!document.getElementById("boss-image-frame")) { resolve(); return; }
        const layer = document.createElement("div");
        layer.className = "boss-image-layer";
        layer.appendChild(img);
        frame.appendChild(layer);
        requestAnimationFrame(() => {
          frame.querySelectorAll(".boss-image-layer").forEach(l => {
            if (l !== layer) l.classList.remove("active");
          });
          layer.classList.add("active");
          resolve();
          setTimeout(() => {
            const f = document.getElementById("boss-image-frame");
            if (f) f.querySelectorAll(".boss-image-layer:not(.active)").forEach(l => l.remove());
          }, 900);
        });
      };
      if (img.complete && img.naturalWidth) finalize();
      else { img.onload = finalize; img.onerror = () => resolve(); }
      img.src = `assets/${name}.png`;
    });
  }

  async function addBossMessage(text, speed = 28) {
    if (!isOpen()) return;
    const panel = document.getElementById("boss-chat-panel");
    if (!panel) return;
    const msg = document.createElement("div");
    msg.className = "boss-chat-msg";
    msg.innerHTML = '<div class="boss-chat-name">3,1415</div><div class="boss-chat-text typing"></div>';
    panel.appendChild(msg);

    // Nur die letzten 3 Nachrichten sichtbar lassen — ältere fade-out + entfernen
    const allMsgs = Array.from(panel.querySelectorAll(".boss-chat-msg"));
    if (allMsgs.length > 3) {
      allMsgs.slice(0, allMsgs.length - 3).forEach(m => {
        if (!m.classList.contains("fading-out")) {
          m.classList.add("fading-out");
          setTimeout(() => m.remove(), 320);
        }
      });
    }

    panel.scrollTop = panel.scrollHeight;
    const textEl = msg.querySelector(".boss-chat-text");
    let skip = false;
    const skipHandler = () => { skip = true; };
    panel.addEventListener("click", skipHandler, { once: true });
    for (let i = 0; i < text.length; i++) {
      if (!isOpen()) return;
      if (skip) {
        textEl.textContent = text;
        panel.scrollTop = panel.scrollHeight;
        break;
      }
      textEl.textContent += text[i];
      panel.scrollTop = panel.scrollHeight;
      const ch = text[i];
      let delay = speed;
      if (ch === '.' || ch === '!' || ch === '?') delay = 240;
      else if (ch === ',') delay = 110;
      else if (ch === '…') delay = 380;
      await sleep(delay);
    }
    if (textEl) textEl.classList.remove("typing");
  }

  function updateBossHP(percent) {
    const fill = document.getElementById("boss-hp-fill");
    if (fill) fill.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  }
  function updateLives() {
    const el = document.getElementById("boss-lives");
    if (!el) return;
    const hearts = [];
    for (let i = 0; i < 3; i++) {
      hearts.push(`<span class="life ${i < lives ? 'full' : 'empty'}">${i < lives ? '♥' : '♡'}</span>`);
    }
    el.innerHTML = hearts.join('');
  }
  // Initial render
  updateLives();

  function askBossQuestion(q, num) {
    return new Promise(resolve => {
      const area = document.getElementById("boss-quiz-area");
      if (!area) { resolve({ correct: false, aborted: true }); return; }

      // Letzte 5 Fragen: 10 Sek; sonst 15 Sek
      const timeLimit = num > 20 ? 10 : 15;
      let timeLeft = timeLimit;
      let answered = false;
      let timerInterval = null;

      area.style.display = "block";
      area.innerHTML = `
        <div class="boss-quiz-progress">
          <span>Frage ${num} / ${total}</span>
          <span class="boss-quiz-timer" id="boss-quiz-timer">⏱ ${timeLimit}s</span>
          <span>${correct} richtig &middot; ${wrongAnswers} falsch</span>
        </div>
        <div class="boss-quiz-question">${q.q}</div>
        <div class="boss-quiz-answers" id="boss-answers">
          ${q.a.map((ans, i) => `<button class="answer-btn" data-i="${i}">${String.fromCharCode(65 + i)}) ${ans}</button>`).join("")}
        </div>
        <div class="boss-quiz-next" id="boss-next-slot"></div>
      `;
      area.scrollTop = 0;

      function finalizeAnswer(chosenIdx, timedOut) {
        if (answered) return;
        answered = true;
        if (timerInterval) clearInterval(timerInterval);
        const all = document.querySelectorAll("#boss-answers .answer-btn");
        all.forEach(b => b.disabled = true);
        all[q.correct].classList.add("correct");
        const isCorrect = !timedOut && chosenIdx === q.correct;
        if (!isCorrect && chosenIdx !== null && chosenIdx !== undefined && all[chosenIdx]) {
          all[chosenIdx].classList.add("wrong");
        }
        if (isCorrect) {
          state.correctAnswers = (state.correctAnswers || 0) + 1;
          saveState();
        }
        const nextSlot = document.getElementById("boss-next-slot");
        if (nextSlot) {
          const timeoutMsg = timedOut
            ? '<div style="color:var(--c-red);font-weight:bold;margin-bottom:.6rem;font-family:var(--font-mono);letter-spacing:1px">⏱ ZEIT ABGELAUFEN</div>'
            : '';
          nextSlot.innerHTML = timeoutMsg +
            '<button class="btn btn-primary" id="boss-next-btn">Weiter ▸</button>';
          const nextBtn = document.getElementById("boss-next-btn");
          nextBtn.addEventListener("click", () => {
            resolve({ correct: isCorrect, timedOut });
          });
          // Sicherstellen, dass der Button im Viewport ist (Modal-Scroll)
          requestAnimationFrame(() => {
            try { nextBtn.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch {}
          });
        } else {
          resolve({ correct: isCorrect, timedOut });
        }
      }

      // Countdown-Timer
      timerInterval = setInterval(() => {
        timeLeft--;
        const t = document.getElementById("boss-quiz-timer");
        if (t) {
          t.textContent = `⏱ ${timeLeft}s`;
          if (timeLeft <= 5) t.classList.add("timer-warning");
        }
        if (timeLeft <= 0) {
          finalizeAnswer(null, true);
        }
      }, 1000);

      document.querySelectorAll("#boss-answers .answer-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          finalizeAnswer(parseInt(btn.dataset.i), false);
        });
      });
    });
  }

  function hideQuizArea() {
    const a = document.getElementById("boss-quiz-area");
    if (a) a.style.display = "none";
  }

  function showCloseButtons() {
    const a = document.getElementById("boss-quiz-area");
    if (!a) return;
    a.style.display = "block";
    a.innerHTML = '<div style="display:flex;justify-content:center;gap:.8rem;flex-wrap:wrap">' +
      '<button class="btn btn-primary" id="boss-out-close">Schließen</button>' +
      '<button class="btn btn-magenta" id="boss-out-retry">Nochmal kämpfen</button>' +
    '</div>';
    document.getElementById("boss-out-close").addEventListener("click", () => closeModal());
    document.getElementById("boss-out-retry").addEventListener("click", () => {
      closeModal();
      setTimeout(() => startBossBattle(), 200);
    });
  }

  /* ============== CINEMATIC INTRO ============== */
  /* Boss-Musik spielt schon (über setMusicMode-Wrapper).
     Wir warten 2.5 Sek, damit der Track sich aufbaut, bevor der
     Boss erscheint. Tension-Builder ohne Sound-Effekte. */
  await sleep(2500);
  if (!isOpen()) return;

  // Boss tritt auf
  await setBossImage("ganz_ernst");
  await addBossMessage("Guten Tag... Sie wollen geprüft werden?");
  await sleep(1300);
  if (!isOpen()) return;

  await setBossImage("nase");
  await addBossMessage("Was rieche ich denn hier? Ist das Angst?");
  await sleep(1300);
  if (!isOpen()) return;

  await setBossImage("ernst");
  await addBossMessage("Sie haben doch immer aufgepasst bei mir...");
  await sleep(1500);
  if (!isOpen()) return;

  await setBossImage("schmunzeln");
  await addBossMessage("...dann sollte das hier doch kein Problem sein.");
  await sleep(1500);
  if (!isOpen()) return;

  /* ============== QUIZ ============== */
  for (let qi = 0; qi < total; qi++) {
    if (!isOpen()) return;
    const r = await askBossQuestion(questions[qi], qi + 1);
    if (r.aborted) return;
    if (r.correct) {
      correct++;
      bossHP = 100 - (correct * (100 / total));
      updateBossHP(bossHP);
    } else {
      wrongAnswers++;
      lives--;
      updateLives();
      if (lives <= 0) break;
    }

    // Mid-Quiz Interludes
    if (qi === 4 && lives > 0) {
      await addBossMessage("Tja ja, manche Menschen möchte man vor dem Ertrinken retten — aber sie zappeln so sehr, dass sie einen mit runter ziehen.");
      await sleep(2000);
    }
    if (qi === 19 && lives > 0) {
      await setBossImage("wow");
      await addBossMessage("Sie sind ein eigenständig denkendes Individuum… offensichtlich.");
      await sleep(1500);
      if (!isOpen()) return;
      await setBossImage("trinken");
      await addBossMessage("Lassen Sie mich etwas Kraft tanken — und dann legen wir mal eine Schippe drauf!");
      await sleep(1700);
      if (!isOpen()) return;
      await setBossImage("saja");
    }
  }

  hideQuizArea();
  if (!isOpen()) return;

  /* ============== OUTRO ============== */
  if (lives <= 0) {
    // Boss hat gewonnen — Spieler hat alle 3 Leben verloren
    await setBossImage("ganz_ernst");
    await addBossMessage("Das war nichts. Bereiten Sie sich besser vor — und versuchen Sie's nochmal.");
    checkAchievements();
  } else {
    // Spieler hat alle 25 Fragen mit mindestens 1 Leben übrig
    // beendet → Boss besiegt (Win-Sequence). HP-Bar zur Optik
    // auf 0 ziehen, auch wenn nicht jede Frage richtig war.
    bossHP = 0;
    updateBossHP(0);
    await setBossImage("stolz");
    await addBossMessage("Ich hab doch gewusst, dass Sie was drauf haben — ich bin stolz auf Sie!");
    await sleep(4000);
    if (!isOpen()) return;
    await setBossImage("ciao");
    await addBossMessage("Ziehen Sie durch, Sie schaffen das!");
    state.bossWins = (state.bossWins || 0) + 1;
    saveState();
    // Volle 250 XP bei perfektem Run, sonst 200 XP — kleine
    // Differenzierung damit Perfektion noch belohnt wird.
    const xpReward = (correct === total) ? 250 : 200;
    addXP(xpReward, correct === total ? "Boss-Sieg (perfekt)" : "Boss-Sieg");
    checkAchievements();
  }

  showCloseButtons();
}

function setExamDate() {
  const current = state.examDate || "";
  openModal(`
    <div class="topic-header">
      <div class="topic-category">📅 Prüfungsdatum</div>
      <div class="topic-title">Countdown setzen</div>
    </div>
    <p style="color:var(--c-text-dim);margin-bottom:1rem">Wann findest deine schriftliche Prüfung statt? Der Countdown wird im Header angezeigt.</p>
    <input type="date" id="exam-date-input" value="${current}" class="themen-search" style="max-width:300px">
    <div style="margin-top:1.5rem;display:flex;gap:.8rem;flex-wrap:wrap">
      <button class="btn btn-primary" id="ed-save">Speichern</button>
      <button class="btn btn-cyan" id="ed-clear">Löschen</button>
      <button class="btn btn-small" id="ed-cancel">Abbrechen</button>
    </div>
  `);
  document.getElementById("ed-save").addEventListener("click", () => {
    const v = document.getElementById("exam-date-input").value;
    if (!v) { toast("Kein Datum", "Bitte Datum wählen.", ""); return; }
    state.examDate = v;
    saveState();
    toast("Gespeichert", `Countdown: ${new Date(v).toLocaleDateString("de-DE")}`, "green");
    closeModal();
  });
  document.getElementById("ed-clear").addEventListener("click", () => {
    state.examDate = null;
    saveState();
    document.getElementById("stat-countdown").textContent = "--";
    closeModal();
  });
  document.getElementById("ed-cancel").addEventListener("click", closeModal);
}

window.startRandomTopic = startRandomTopic;
window.startDailyQuiz = startDailyQuiz;
window.startBossBattle = startBossBattle;
window.setExamDate = setExamDate;

/* ===========================================================
   SPIELE-VIEW
   =========================================================== */
function renderSpiele(root) {
  root.innerHTML = `
    <h1 class="view-title">Lernspiele</h1>
    <p class="view-subtitle">Wähle einen Modus · jede Runde gibt XP</p>
    <div class="games-grid">
      <div class="game-card" data-g="daily">
        <div class="game-icon">▷</div>
        <div class="game-title">Tages-Quiz</div>
        <div class="game-desc">10 zufällige Fragen aus allen Themen. Perfekt zum täglichen Warmlaufen.</div>
      </div>
      <div class="game-card" data-g="boss">
        <div class="game-icon">💀</div>
        <div class="game-title">Boss Battle</div>
        <div class="game-desc">3 Leben. Du verlierst eins pro Fehler. Gewinne mit ≥ 70 % und +100 XP.</div>
      </div>
      <div class="game-card" data-g="random">
        <div class="game-icon">🎲</div>
        <div class="game-title">Zufalls-Thema</div>
        <div class="game-desc">Öffnet ein zufälliges, noch nicht abgeschlossenes Thema.</div>
      </div>
      <div class="game-card" data-g="match">
        <div class="game-icon">🧩</div>
        <div class="game-title">Begriffe-Matching</div>
        <div class="game-desc">Paare Begriff mit Definition – auf Zeit. Unter 30 Sek = Achievement.</div>
      </div>
      <div class="game-card" data-g="category">
        <div class="game-icon">🎯</div>
        <div class="game-title">Kategorie-Drill</div>
        <div class="game-desc">Alle Fragen einer Kategorie als ein grosses Quiz. Wähle deinen Schwerpunkt.</div>
      </div>
      <div class="game-card" data-g="flashall">
        <div class="game-icon">🗂️</div>
        <div class="game-title">Karteikarten-Marathon</div>
        <div class="game-desc">30 zufällige Karteikarten quer durch alle Themen.</div>
      </div>
    </div>
  `;
  root.querySelector('[data-g="daily"]').addEventListener("click", startDailyQuiz);
  root.querySelector('[data-g="boss"]').addEventListener("click", startBossBattle);
  root.querySelector('[data-g="random"]').addEventListener("click", startRandomTopic);
  root.querySelector('[data-g="match"]').addEventListener("click", startMatchGame);
  root.querySelector('[data-g="category"]').addEventListener("click", openCategoryDrill);
  root.querySelector('[data-g="flashall"]').addEventListener("click", startFlashcardMarathon);
}

/* ---------- MATCH GAME ---------- */
function startMatchGame() {
  // Sammle alle Flashcards (front=Begriff, back=Definition)
  const allCards = [];
  Object.values(TOPICS).forEach(t => (t.flashcards || []).forEach(c => {
    if (c.front && c.back) allCards.push(c);
  }));
  if (allCards.length < 6) {
    toast("Zu wenig Karten", "Es sind nicht genug Karteikarten im System.", "");
    return;
  }
  // 6 zufällige Paare
  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
  }
  const picks = allCards.slice(0, 6);
  const items = [];
  picks.forEach((c, i) => {
    items.push({ id: i, text: c.front, pair: i });
    items.push({ id: i + 100, text: c.back, pair: i });
  });
  // shuffle items
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  let selected = null;
  let matched = 0;
  const startTs = Date.now();
  let timerInt = null;

  function render() {
    const secs = Math.floor((Date.now() - startTs) / 1000);
    openModal(`
      <div class="topic-header">
        <div class="topic-category">🧩 Matching-Spiel</div>
        <div class="topic-title">Begriff + Definition</div>
      </div>
      <div class="quiz-progress">
        <span>Paare: ${matched} / 6</span>
        <span>⏱ ${secs}s${state.matchBestTime ? " · Best: " + state.matchBestTime + "s" : ""}</span>
      </div>
      <div class="match-board" id="match-board">
        ${items.map(it => `
          <div class="match-card ${it._matched ? 'matched' : ''} ${it._selected ? 'selected' : ''}"
               data-id="${it.id}">${it.text}</div>
        `).join("")}
      </div>
    `);
    document.querySelectorAll(".match-card").forEach(el => {
      el.addEventListener("click", () => click(parseInt(el.dataset.id)));
    });
  }

  function click(id) {
    const it = items.find(x => x.id === id);
    if (!it || it._matched || (selected && selected.id === id)) return;
    if (!selected) {
      selected = it;
      it._selected = true;
      render();
      return;
    }
    if (selected.pair === it.pair) {
      // match!
      it._matched = true;
      selected._matched = true;
      selected._selected = false;
      selected = null;
      matched++;
      if (matched === 6) {
        clearInterval(timerInt);
        const secs = Math.floor((Date.now() - startTs) / 1000);
        if (!state.matchBestTime || secs < state.matchBestTime) {
          state.matchBestTime = secs;
          saveState();
        }
        addXP(40, `Match: ${secs}s`);
        checkAchievements();
        setTimeout(() => {
          openModal(`
            <div class="quiz-result">
              <div class="big-score">✓ ${secs}s</div>
              <div style="font-family:var(--font-mono);color:var(--c-text-dim)">Alle 6 Paare gefunden${secs < 30 ? " · 💎 Rekord-Zone" : ""}</div>
              <div style="margin-top:2rem;display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap">
                <button class="btn btn-primary" id="m-close">Schließen</button>
                <button class="btn btn-cyan" id="m-again">Noch eine Runde</button>
              </div>
            </div>
          `);
          document.getElementById("m-close").addEventListener("click", closeModal);
          document.getElementById("m-again").addEventListener("click", startMatchGame);
        }, 400);
        return;
      }
      render();
    } else {
      // falsch
      const selId = selected.id;
      it._selected = false;
      render();
      const cards = document.querySelectorAll(".match-card");
      cards.forEach(c => {
        const cid = parseInt(c.dataset.id);
        if (cid === id || cid === selId) c.classList.add("flash-wrong");
      });
      setTimeout(() => {
        if (selected) selected._selected = false;
        selected = null;
        render();
      }, 500);
    }
  }

  render();
  timerInt = setInterval(() => {
    const timerEl = document.querySelector(".quiz-progress span:last-child");
    if (!timerEl) { clearInterval(timerInt); return; }
    const secs = Math.floor((Date.now() - startTs) / 1000);
    timerEl.innerHTML = `⏱ ${secs}s${state.matchBestTime ? " · Best: " + state.matchBestTime + "s" : ""}`;
  }, 1000);
}

/* ---------- KATEGORIE-DRILL ---------- */
function openCategoryDrill() {
  const html = Object.entries(CATEGORIES).map(([k, c]) => {
    const qCount = Object.values(TOPICS).filter(t => t.category === k)
      .reduce((sum, t) => sum + (t.questions?.length || 0), 0);
    return `<button class="game-card" data-cat="${k}" style="text-align:left">
      <div class="game-icon">${c.icon}</div>
      <div class="game-title">${c.name}</div>
      <div class="game-desc">${qCount} Fragen verfügbar</div>
    </button>`;
  }).join("");
  openModal(`
    <div class="topic-header">
      <div class="topic-category">🎯 Kategorie-Drill</div>
      <div class="topic-title">Schwerpunkt wählen</div>
    </div>
    <div class="games-grid">${html}</div>
  `);
  document.querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.cat;
      const questions = [];
      Object.entries(TOPICS).forEach(([id, t]) => {
        if (t.category !== cat) return;
        (t.questions || []).forEach(q => questions.push({ ...q, _topic: id }));
      });
      if (questions.length === 0) {
        toast("Keine Fragen", "Diese Kategorie hat keine Fragen.", "");
        return;
      }
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
      const pool = questions.slice(0, Math.min(15, questions.length));
      runQuiz({
        title: `Drill: ${CATEGORIES[cat].name}`,
        questions: pool,
        onFinish: (score) => {
          addXP(25 + Math.round(score / 4), `Drill ${CATEGORIES[cat].name}: ${score}%`);
          if (score === 100) {
            state.perfectQuizzes = (state.perfectQuizzes || 0) + 1;
            saveState();
          }
          checkAchievements();
        }
      });
    });
  });
}

/* ---------- KARTEIKARTEN-MARATHON ---------- */
function startFlashcardMarathon() {
  const pool = [];
  Object.entries(TOPICS).forEach(([id, t]) => {
    (t.flashcards || []).forEach(c => pool.push({ ...c, _topicId: id, _topicTitle: t.title }));
  });
  if (pool.length < 5) {
    toast("Zu wenig Karten", "Es sind nicht genug Karteikarten vorhanden.", "");
    return;
  }
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const cards = pool.slice(0, Math.min(30, pool.length));
  let idx = 0, flipped = false;

  function render() {
    if (idx >= cards.length) return finish();
    const c = cards[idx];
    openModal(`
      <div class="topic-header">
        <div class="topic-category">🗂️ Marathon</div>
        <div class="topic-title">${c._topicTitle}</div>
      </div>
      <div class="quiz-progress"><span>Karte ${idx + 1} / ${cards.length}</span></div>
      <div class="quiz-bar"><div class="quiz-bar-fill" style="width:${(idx/cards.length)*100}%"></div></div>
      <div class="flashcard ${flipped ? 'flipped' : ''}" id="fc">
        <div class="flashcard-inner">
          <div class="flashcard-face flashcard-front">${c.front}
            <div class="hint">[ Klick zum Umdrehen ]</div>
          </div>
          <div class="flashcard-face flashcard-back">${c.back}</div>
        </div>
      </div>
      <div style="display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-primary" id="fc-next">${idx + 1 === cards.length ? "Fertig" : "Nächste ▸"}</button>
        <button class="btn btn-cyan" id="fc-flip">${flipped ? "Vorne zeigen" : "Umdrehen"}</button>
      </div>
    `);
    document.getElementById("fc").addEventListener("click", () => { flipped = !flipped; render(); });
    document.getElementById("fc-flip").addEventListener("click", () => { flipped = !flipped; render(); });
    document.getElementById("fc-next").addEventListener("click", () => {
      state.flashcardsStudied = (state.flashcardsStudied || 0) + 1;
      saveState();
      idx++; flipped = false; render();
    });
  }

  function finish() {
    addXP(60, `Karteikarten-Marathon: ${cards.length}`);
    checkAchievements();
    openModal(`
      <div class="quiz-result">
        <div class="big-score" style="font-size:2.5rem">🏁 Marathon!</div>
        <div style="font-family:var(--font-mono);color:var(--c-text-dim)">${cards.length} Karten durch · +60 XP</div>
        <div style="margin-top:2rem"><button class="btn btn-primary" id="fm-close">Schließen</button></div>
      </div>
    `);
    document.getElementById("fm-close").addEventListener("click", closeModal);
  }

  render();
}

/* ===========================================================
   ACHIEVEMENTS VIEW
   =========================================================== */
function renderAchievements(root) {
  const total = ACHIEVEMENTS.length;
  const unlocked = state.unlockedAchievements?.length || 0;
  const pct = Math.round((unlocked / total) * 100);

  const cards = ACHIEVEMENTS.map(a => {
    const isUnlocked = state.unlockedAchievements.includes(a.id);
    return `<div class="achievement-card ${isUnlocked ? 'unlocked' : ''}">
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-info">
        <h4>${a.name}</h4>
        <p>${a.desc}</p>
      </div>
    </div>`;
  }).join("");

  root.innerHTML = `
    <h1 class="view-title">Achievements</h1>
    <p class="view-subtitle">${unlocked} / ${total} freigeschaltet · ${pct}%</p>
    <div class="xp-bar-wrapper" style="height:10px;margin-bottom:2rem;max-width:400px">
      <div class="xp-bar" style="width:${pct}%"></div>
    </div>
    <div class="achievements-grid">${cards}</div>
  `;
}

/* ===========================================================
   STATS VIEW (Heatmap, Kategorien-Fortschritt)
   =========================================================== */
function renderStats(root) {
  // Heatmap: letzte 140 Tage
  const today = new Date();
  const cells = [];
  for (let i = 139; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const count = state.studyLog[key] || 0;
    let lvl = 0;
    if (count >= 1) lvl = 1;
    if (count >= 3) lvl = 2;
    if (count >= 6) lvl = 3;
    if (count >= 10) lvl = 4;
    cells.push(`<div class="heat-cell level-${lvl}" title="${key}: ${count} Themen"></div>`);
  }

  // Kategorien-Fortschritt
  const catStats = Object.entries(CATEGORIES).map(([k, c]) => {
    const ids = Object.keys(TOPICS).filter(id => TOPICS[id].category === k);
    if (!ids.length) return "";
    const doneIds = ids.filter(id => state.completed.includes(id));
    const p = Math.round(doneIds.length / ids.length * 100);
    return `<div class="panel" style="display:flex;align-items:center;gap:1rem">
      ${progressRing(p)}
      <div>
        <div class="panel-title" style="margin-bottom:.3rem">${c.icon} ${c.name}</div>
        <div style="font-family:var(--font-mono);color:var(--c-text-dim);font-size:.85rem">${doneIds.length} / ${ids.length} Themen</div>
      </div>
    </div>`;
  }).join("");

  // Quiz-Statistik
  const scoreEntries = Object.entries(state.topicScores || {});
  const avgScore = scoreEntries.length
    ? Math.round(scoreEntries.reduce((s, [, v]) => s + v, 0) / scoreEntries.length)
    : 0;

  // Aktiv-Tage
  const activeDays = Object.keys(state.studyLog || {}).filter(d => state.studyLog[d] > 0).length;

  root.innerHTML = `
    <h1 class="view-title">Statistiken</h1>
    <p class="view-subtitle">Dein Lernverhalten im Überblick</p>

    <div class="dashboard-grid">
      <div class="panel">
        <div class="panel-title">Richtige Antworten</div>
        <div class="big-number">${state.correctAnswers || 0}</div>
        <div class="big-number-sub">Gesamt im Quiz</div>
      </div>
      <div class="panel">
        <div class="panel-title">Perfekte Quizze</div>
        <div class="big-number">${state.perfectQuizzes || 0}</div>
        <div class="big-number-sub">100 % erreicht</div>
      </div>
      <div class="panel">
        <div class="panel-title">Ø Quiz-Score</div>
        <div class="big-number">${avgScore}<span style="font-size:1.5rem">%</span></div>
        <div class="big-number-sub">Aus ${scoreEntries.length} Themen</div>
      </div>
      <div class="panel">
        <div class="panel-title">Karteikarten</div>
        <div class="big-number">${state.flashcardsStudied || 0}</div>
        <div class="big-number-sub">studiert</div>
      </div>
      <div class="panel">
        <div class="panel-title">Aktive Tage</div>
        <div class="big-number">${activeDays}</div>
        <div class="big-number-sub">mit Lern-Aktivität</div>
      </div>
      <div class="panel">
        <div class="panel-title">Match-Bestzeit</div>
        <div class="big-number">${state.matchBestTime ? state.matchBestTime + "s" : "--"}</div>
        <div class="big-number-sub">Matching-Spiel</div>
      </div>
      <div class="panel">
        <div class="panel-title">Boss-Siege</div>
        <div class="big-number">${state.bossWins || 0}</div>
        <div class="big-number-sub">💀 Boss-Battle</div>
      </div>
      <div class="panel">
        <div class="panel-title">Max. Themen / Tag</div>
        <div class="big-number">${state.maxPerDay || 0}</div>
        <div class="big-number-sub">Tagesrekord</div>
      </div>
    </div>

    <h2 class="view-title" style="font-size:1.3rem;margin-top:2rem">Lern-Heatmap · letzte 140 Tage</h2>
    <div class="panel">
      <div class="heatmap">${cells.join("")}</div>
      <div style="display:flex;gap:.6rem;align-items:center;font-family:var(--font-mono);font-size:.75rem;color:var(--c-text-dim);margin-top:.6rem">
        Weniger
        <div class="heat-cell" style="width:14px;height:14px;aspect-ratio:auto"></div>
        <div class="heat-cell level-1" style="width:14px;height:14px;aspect-ratio:auto"></div>
        <div class="heat-cell level-2" style="width:14px;height:14px;aspect-ratio:auto"></div>
        <div class="heat-cell level-3" style="width:14px;height:14px;aspect-ratio:auto"></div>
        <div class="heat-cell level-4" style="width:14px;height:14px;aspect-ratio:auto"></div>
        Mehr
      </div>
    </div>

    <h2 class="view-title" style="font-size:1.3rem;margin-top:2rem">Fortschritt je Kategorie</h2>
    <div class="dashboard-grid">${catStats}</div>

    <h2 class="view-title" style="font-size:1.3rem;margin-top:2rem">Daten</h2>
    <div style="display:flex;gap:.8rem;flex-wrap:wrap">
      <button class="btn btn-cyan" id="btn-export">⬇ Fortschritt exportieren</button>
      <button class="btn btn-small" id="btn-reset" style="border-color:var(--c-red);color:var(--c-red)">⚠ Alles zurücksetzen</button>
    </div>
  `;

  document.getElementById("btn-export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pff32_fortschritt_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Export", "Datei heruntergeladen.", "green");
  });

  document.getElementById("btn-reset").addEventListener("click", () => {
    if (!confirm("Wirklich allen Fortschritt zurücksetzen? Dies kann nicht rückgängig gemacht werden.")) return;
    if (window.Auth) Auth.clearState();
    else localStorage.removeItem("pff32_state");
    state = { ...DEFAULT_STATE };
    updateHeader();
    renderView("dashboard");
    toast("Zurückgesetzt", "Alle Daten gelöscht.", "");
  });
}

/* ===========================================================
   MUSIC CONTROL WIRING
   =========================================================== */
(function initMusicUI() {
  const btn = document.getElementById("music-toggle");
  const mode = document.getElementById("music-mode");
  const vol = document.getElementById("music-vol");
  if (!btn || !window.Music) return;

  function refresh() {
    const on = Music.isEnabled();
    btn.classList.toggle("active", on);
    btn.textContent = on ? "♫" : "♪";
    btn.title = on ? "Musik aus" : "Musik an";
    mode.classList.toggle("off", !on);
    // mode-text wird durch setMusicMode gesetzt
    if (!on) mode.textContent = "OFF";
    vol.value = Math.round(Music.getVolume() * 100);
  }

  btn.addEventListener("click", () => {
    const nowOn = Music.toggle();
    if (nowOn) {
      // Modus an aktuellen View/Modal-Status anpassen
      setMusicMode(isModalOpen() ? "focus" : "drive");
    }
    refresh();
  });

  vol.addEventListener("input", (e) => {
    Music.setVolume(e.target.value / 100);
  });

  refresh();
})();

function isModalOpen() {
  const o = document.getElementById("modal-overlay");
  return o && !o.classList.contains("hidden");
}

function setMusicMode(m) {
  if (!window.Music || !Music.isEnabled()) return;
  Music.setMode(m);
  const el = document.getElementById("music-mode");
  if (el) {
    el.textContent = m === "focus" ? "FOCUS" : (m === "boss" ? "BOSS" : "DRIVE");
    el.classList.toggle("focus-active", m === "focus");
    el.classList.toggle("boss-active",  m === "boss");
    el.classList.remove("off");
  }
}
window.setMusicMode = setMusicMode;

/* Modal open/close: Focus-Musik im Modal NUR bei echten Aufgaben,
   nicht beim reinen Lesen eines Themas (openTopic). */
const _origOpenModal  = openModal;
const _origCloseModal = closeModal;
openModal = function(html) {
  _origOpenModal(html);
  // Modus-Switch übernehmen die Task-Funktionen (startQuiz etc.).
};
closeModal = function() {
  _origCloseModal();
  setMusicMode("drive");
};

/* Jeder Start einer Aufgabe schaltet auf Focus. */
["startQuiz","startFlashcards","startDailyQuiz",
 "startMatchGame","openCategoryDrill","startFlashcardMarathon"].forEach(name => {
  const orig = window[name];
  if (typeof orig !== "function") return;
  window[name] = function(...args) {
    setMusicMode("focus");
    return orig.apply(this, args);
  };
});

/* Boss-Battle bekommt eigenen "boss"-Modus mit Boss-Track. */
const _origStartBossBattle = window.startBossBattle;
if (typeof _origStartBossBattle === "function") {
  window.startBossBattle = function(...args) {
    setMusicMode("boss");
    return _origStartBossBattle.apply(this, args);
  };
}

/* ===========================================================
   AUTH-GATE + HEADER-USER-CONTROL  (Stufe B — Cloud-Auth)
   -----------------------------------------------------------
   Ablauf beim Boot:
     1. Landing erstmal sichtbar (kein FOUC).
     2. Auth.init() prüft Supabase-Session, holt Cloud-State,
        legt ihn im localStorage ab.
     3. Wenn User → state neu aus localStorage laden, App rendern.
        Wenn kein User → Landing bleibt, Forms warten auf Eingabe.

   Form-Handler sind async — Login/Register hashen Passwörter
   in der Cloud, das dauert ein paar Hundert ms. Solange ist der
   Submit-Button disabled (siehe setBusy).
   =========================================================== */
(async function wireAuth() {
  const landing = document.getElementById("landing");
  const appChrome = [
    document.querySelector("header.app-header"),
    document.querySelector("nav.main-nav"),
    document.getElementById("view-container"),
    document.querySelector("footer.app-footer")
  ];

  function showLanding() {
    landing.classList.remove("hidden");
    appChrome.forEach(el => el && (el.style.display = "none"));
  }
  function hideLanding() {
    landing.classList.add("hidden");
    appChrome.forEach(el => el && (el.style.display = ""));
  }

  function setError(msg) {
    const el = document.getElementById("landing-error");
    if (!msg) { el.classList.add("hidden"); el.textContent = ""; return; }
    el.textContent = msg;
    el.classList.remove("hidden");
  }
  function setBusy(form, busy) {
    if (!form) return;
    const btn = form.querySelector("button[type=submit]");
    if (btn) btn.disabled = !!busy;
    form.classList.toggle("is-busy", !!busy);
  }

  /* Bis Auth bereit ist: Landing erstmal verstecken (kein Flash). */
  showLanding();
  setError(null);

  /* Tab-Umschaltung Anmelden ↔ Registrieren */
  document.querySelectorAll(".landing-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".landing-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const mode = tab.dataset.mode;
      document.getElementById("login-form").classList.toggle("hidden", mode !== "login");
      document.getElementById("register-form").classList.toggle("hidden", mode !== "register");
      setError(null);
    });
  });

  /* Login-Formular */
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    setError(null);
    setBusy(loginForm, true);
    const data = new FormData(e.target);
    try {
      await Auth.login({
        username: data.get("username"),
        password: data.get("password")
      });
      location.reload();
    } catch (err) {
      setError(err.message);
      setBusy(loginForm, false);
    }
  });

  /* Registrier-Formular */
  const registerForm = document.getElementById("register-form");
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    setError(null);
    setBusy(registerForm, true);
    const data = new FormData(e.target);
    try {
      await Auth.register({
        username:      data.get("username"),
        password:      data.get("password"),
        passwordAgain: data.get("passwordAgain"),
        initialCode:   data.get("initialCode")
      });
      location.reload();
    } catch (err) {
      setError(err.message);
      setBusy(registerForm, false);
    }
  });

  /* Logout-Button */
  const logoutBtn = document.getElementById("btn-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      if (!confirm("Wirklich abmelden? Dein Fortschritt bleibt natürlich gespeichert.")) return;
      try { await Auth.logout(); } catch (e) { console.warn(e); }
      location.reload();
    });
  }

  /* ---------- Auth bootstrappen: Session prüfen + Cloud-State holen ---------- */
  try {
    if (Auth.init) await Auth.init();
  } catch (e) {
    console.warn("[wireAuth] Auth.init:", e);
  }

  if (!Auth.currentUser()) {
    showLanding();
    return;   // App gar nicht erst booten
  }

  /* Eingeloggt → State aus dem (jetzt cloud-hydratisierten) Cache neu laden */
  state = loadState();

  /* Username im Header anzeigen */
  const nameEl = document.getElementById("user-name");
  if (nameEl) nameEl.textContent = Auth.displayName();
  hideLanding();

  /* ---------- init ---------- */
  updateHeader();
  renderView("dashboard");

  /* Hintergrundmusik nach erfolgreichem Login.
     Wegen Browser-Autoplay-Policy darf der AudioContext erst
     nach einer User-Geste laufen — direkter Music.start()-Aufruf
     scheitert nach einem Page-Reload still (suspended state).
     Lösung: auf den nächsten Klick/Keydown warten. */
  if (window.Music) {
    let _musicKicked = false;
    const _kickMusic = () => {
      if (_musicKicked) return;
      _musicKicked = true;
      Music.start();
      document.removeEventListener("click",      _kickMusic);
      document.removeEventListener("keydown",    _kickMusic);
      document.removeEventListener("touchstart", _kickMusic);
    };
    document.addEventListener("click",      _kickMusic);
    document.addEventListener("keydown",    _kickMusic);
    document.addEventListener("touchstart", _kickMusic);
  }

  /* Migration-Bestätigung + What's-New-Modal */
  const migratedXp = Auth.consumeMigrationFlag?.();
  if (state.seenWhatsNewV12) {
    // Modal schon mal gesehen → Migration als Toast bestätigen (falls relevant)
    if (migratedXp !== null && migratedXp !== undefined) {
      toast(
        "✓ Fortschritt übernommen",
        `${migratedXp} XP von deinem alten Account migriert — willkommen zurück!`,
        "green",
      );
    }
  } else {
    // Erstes Mal v1.2 → Modal zeigen, Migration ggf. integriert
    maybeShowWhatsNew(migratedXp);
  }
})();

/* ===========================================================
   WHAT'S NEW — einmalige Info-Anzeige nach v1.2-Update
   =========================================================== */
function maybeShowWhatsNew(migratedXp) {
  if (state.seenWhatsNewV12) return;

  const migrationBlock = (migratedXp !== null && migratedXp !== undefined)
    ? `
      <div class="whatsnew-item whatsnew-success">
        <div class="whatsnew-icon">✓</div>
        <div class="whatsnew-text">
          <h3>Fortschritt übernommen</h3>
          <p>Wir haben deinen alten Lernstand auf diesem Gerät gefunden und in dein neues Cloud-Konto übertragen — <strong>${migratedXp} XP</strong>, Streaks und freigeschaltete Achievements sind alle wieder da. Willkommen zurück!</p>
        </div>
      </div>`
    : "";

  const html = `
    <h2 class="modal-title">// SYSTEM-UPDATE v1.2</h2>
    <p class="whatsnew-sub">Während du weg warst, hat sich was getan:</p>

    <div class="whatsnew">
      ${migrationBlock}
      <div class="whatsnew-item">
        <div class="whatsnew-icon">☁</div>
        <div class="whatsnew-text">
          <h3>Cross-Device Sync aktiv</h3>
          <p>Dein Fortschritt liegt jetzt in der <strong>Cloud</strong> — nicht mehr nur lokal. Du kannst dich auf Handy, Tablet und Laptop einloggen und überall dort weitermachen, wo du aufgehört hast. XP, Streaks und Achievements wandern automatisch mit.</p>
        </div>
      </div>

      <div class="whatsnew-item">
        <div class="whatsnew-icon">★</div>
        <div class="whatsnew-text">
          <h3>23 neue Achievements</h3>
          <p>Es gibt jetzt <strong>45 statt 22</strong> Achievements zu freischalten: neue Kategorie-Master (Innere, Onko, Notfall, Hygiene, Wunde, Päd u.a.), höhere Streak-, Level- und Boss-Stufen — und zwei Feiertags-Specials für den <strong>1. Mai</strong> und <strong>Christi Himmelfahrt</strong>. Schau mal im Achievements-Tab vorbei.</p>
        </div>
      </div>
    </div>

    <button class="btn btn-primary" id="whatsnew-ack" style="width:100%;margin-top:1.5rem">Verstanden ▸</button>
  `;

  openModal(html);
  document.getElementById("whatsnew-ack")?.addEventListener("click", () => {
    state.seenWhatsNewV12 = true;
    saveState();
    closeModal();
  });
}
