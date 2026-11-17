/* ===========================================================
   TSCHAKKA // PRÜFUNGSFRAGEN (offene Fragen mit Selbstbewertung)
   -----------------------------------------------------------
   Ablauf je Frage:
     1. Frage mit Operator lesen, Antwort frei formulieren
     2. Erwartungshorizont aufdecken, Erfülltes selbst abhaken
     3. Punkte → XP, bester Prozentwert je Frage wird gespeichert
   Inhalte: open-data.js (OPEN_QUESTIONS, OPERATORS)
   =========================================================== */

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function openQuestionsFor(topicId) {
  return (OPEN_QUESTIONS[topicId] || []).map((q, i) => ({ ...q, _id: `${topicId}#${i}`, _topic: topicId }));
}

function allOpenQuestions() {
  return Object.keys(OPEN_QUESTIONS).flatMap(openQuestionsFor);
}

function openMaxPoints(q) {
  const sum = q.rubric.reduce((s, r) => s + r.p, 0);
  return q.max ? Math.min(q.max, sum) : sum;
}

function startOpenQuestions(topicId) {
  const qs = openQuestionsFor(topicId);
  if (!qs.length) { toast("Keine Prüfungsfragen", "Für dieses Thema gibt es noch keine.", ""); return; }
  runOpenQuestions({ title: TOPICS[topicId]?.title || "Prüfungsfragen", questions: qs });
}

/* Prüfungstraining: 5 Fragen, bevorzugt noch nicht bearbeitete
   oder schwach bewertete. */
function startExamTraining() {
  const scores = state.openScores || {};
  const pool = allOpenQuestions();
  if (!pool.length) return;
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  pool.sort((a, b) => (scores[a._id] ?? -1) - (scores[b._id] ?? -1));
  runOpenQuestions({ title: "Prüfungstraining", questions: pool.slice(0, 5) });
}

function runOpenQuestions({ title, questions }) {
  let idx = 0, earned = 0, possible = 0;
  const total = questions.length;

  function renderQuestion() {
    if (idx >= total) return finish();
    const q = questions[idx];
    const op = OPERATORS[q.op] || { afb: "", text: "" };
    const topic = TOPICS[q._topic];
    openModal(`
      <div class="topic-header">
        <div class="topic-category">✍ Prüfungsfrage · ${escapeHtml(topic?.title || "")}</div>
        <div class="topic-title">${escapeHtml(title)}</div>
      </div>
      <div class="quiz-progress"><span>Frage ${idx + 1} / ${total}</span><span>${openMaxPoints(q)} Punkte</span></div>
      <div class="quiz-bar"><div class="quiz-bar-fill" style="width:${(idx / total) * 100}%"></div></div>
      <div class="op-badge">
        <span class="op-name">${escapeHtml(q.op)}</span>
        <span class="op-afb">${escapeHtml(op.afb)}</span>
        <span class="op-text">${escapeHtml(op.text)}</span>
      </div>
      ${q.case ? `<div class="open-case">${q.case}</div>` : ""}
      <div class="question-text">${q.q}</div>
      <textarea class="open-answer" id="open-answer" rows="7" placeholder="Deine Antwort – in ganzen Sätzen oder Stichpunkten, so wie in der Prüfung."></textarea>
      <div style="margin-top:1rem;display:flex;gap:.6rem;flex-wrap:wrap">
        <button class="btn btn-primary" id="open-reveal">Erwartungshorizont zeigen ▸</button>
      </div>
    `);
    const ta = document.getElementById("open-answer");
    const btn = document.getElementById("open-reveal");
    setTimeout(() => ta && ta.focus(), 50);
    let warned = false;
    btn.addEventListener("click", () => {
      if (!ta.value.trim() && !warned) {
        warned = true;
        btn.textContent = "Trotzdem ohne Antwort zeigen ▸";
        toast("Erst selbst antworten", "Du lernst am meisten, wenn du vorher etwas aufschreibst.", "");
        return;
      }
      renderRubric(q, ta.value);
    });
  }

  function renderRubric(q, answer) {
    const max = openMaxPoints(q);
    openModal(`
      <div class="topic-header">
        <div class="topic-category">✍ Selbstbewertung</div>
        <div class="topic-title">${escapeHtml(title)}</div>
      </div>
      <div class="quiz-progress"><span>Frage ${idx + 1} / ${total}</span><span id="open-score">0 / ${max} Punkte</span></div>
      <div class="question-text">${q.q}</div>
      <div class="open-own">
        <div class="open-label">Deine Antwort</div>
        <div class="open-own-text">${answer.trim() ? escapeHtml(answer).replace(/\n/g, "<br>") : "<em>(keine Antwort)</em>"}</div>
      </div>
      <div class="open-label">Erwartungshorizont – hake ab, was in deiner Antwort sinngemäß vorkommt${q.max ? ` (max. ${q.max} Punkte)` : ""}</div>
      <div class="open-rubric">
        ${q.rubric.map((r, i) => `
          <label class="rubric-item">
            <input type="checkbox" data-i="${i}">
            <span class="rubric-text">${r.t}</span>
            <span class="rubric-pts">${r.p} P</span>
          </label>`).join("")}
      </div>
      ${q.note ? `<div class="explanation"><strong>Hinweis:</strong> ${q.note}</div>` : ""}
      <div style="margin-top:1.2rem">
        <button class="btn btn-primary" id="open-next">${idx + 1 === total ? "Ergebnis anzeigen" : "Nächste Frage ▸"}</button>
      </div>
    `);
    const boxes = [...document.querySelectorAll(".open-rubric input")];
    const scoreEl = document.getElementById("open-score");
    const calc = () => Math.min(max, boxes.reduce((s, b) => s + (b.checked ? q.rubric[+b.dataset.i].p : 0), 0));
    boxes.forEach(b => b.addEventListener("change", () => {
      b.closest(".rubric-item").classList.toggle("checked", b.checked);
      scoreEl.textContent = `${calc()} / ${max} Punkte`;
    }));
    document.getElementById("open-next").addEventListener("click", () => {
      const got = calc();
      earned += got; possible += max;
      state.openScores = state.openScores || {};
      const pct = Math.round((got / max) * 100);
      state.openScores[q._id] = Math.max(state.openScores[q._id] || 0, pct);
      state.openAnswered = (state.openAnswered || 0) + 1;
      saveState();
      idx++;
      renderQuestion();
    });
  }

  function finish() {
    const pct = possible ? Math.round((earned / possible) * 100) : 0;
    const xp = 5 + earned * 2;
    openModal(`
      <div class="topic-header">
        <div class="topic-category">✍ Prüfungsfragen</div>
        <div class="topic-title">${escapeHtml(title)}</div>
      </div>
      <div style="text-align:center;margin:1.5rem 0">
        <div class="big-number">${earned} / ${possible}</div>
        <div style="font-family:var(--font-mono);color:var(--c-text-dim)">Punkte · ${pct} %</div>
      </div>
      <div class="explanation">${pct >= 80 ? "Stark – das wäre in der Prüfung eine sehr gute Leistung." :
        pct >= 50 ? "Solide Basis. Schau dir die nicht abgehakten Punkte im Lerninhalt noch einmal an." :
        "Hier lohnt sich Wiederholung: Lerninhalt lesen und die Fragen später erneut beantworten."}</div>
      <div style="margin-top:1.2rem"><button class="btn btn-primary" onclick="closeModal()">Schließen</button></div>
    `);
    addXP(xp, `Prüfungsfragen: ${earned}/${possible} Punkte`);
    checkAchievements();
  }

  renderQuestion();
}

window.startOpenQuestions = startOpenQuestions;
window.startExamTraining = startExamTraining;
