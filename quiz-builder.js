/* ===========================================================
   TSCHAKKA // QUIZ-BAUKASTEN
   -----------------------------------------------------------
   Themen frei wählen und kombinieren, Länge 10/20/30/50.
   Fragen aller gewählten Themen werden gemischt.
   Letzte Auswahl wird in state.quizBuilder gemerkt.
   =========================================================== */

const QB_LENGTHS = [10, 20, 30, 50];

function openQuizBuilder() {
  const saved = state.quizBuilder || {};
  const selected = new Set((saved.topics || []).filter(id => TOPICS[id]));
  let length = QB_LENGTHS.includes(saved.length) ? saved.length : 20;

  const cats = Object.entries(CATEGORIES).map(([key, c]) => {
    const ids = Object.keys(TOPICS).filter(id => TOPICS[id].category === key);
    return { key, c, ids };
  }).filter(x => x.ids.length);

  openModal(`
    <div class="topic-header">
      <div class="topic-category">🧪 Quiz-Baukasten</div>
      <div class="topic-title">Themen wählen &amp; kombinieren</div>
    </div>
    <div class="qb-bar">
      <div class="qb-lengths">
        <span class="qb-label">Länge</span>
        ${QB_LENGTHS.map(n => `<button class="qb-len ${n === length ? "active" : ""}" data-len="${n}" type="button">${n}</button>`).join("")}
      </div>
      <div class="qb-quick">
        <button class="btn btn-small" id="qb-all" type="button">Alle</button>
        <button class="btn btn-small" id="qb-done" type="button">Nur gelernte</button>
        <button class="btn btn-small" id="qb-none" type="button">Keine</button>
      </div>
    </div>
    <div class="qb-cats">
      ${cats.map(({ key, c, ids }) => `
        <details class="qb-cat" data-cat="${key}">
          <summary>
            <input type="checkbox" class="qb-cat-box" data-cat="${key}">
            <span class="qb-cat-name">${c.icon} ${c.name}</span>
            <span class="qb-cat-count" data-count="${key}"></span>
          </summary>
          <div class="qb-topics">
            ${ids.map(id => `
              <label class="qb-topic">
                <input type="checkbox" class="qb-topic-box" data-id="${id}" data-cat="${key}">
                <span>${TOPICS[id].title}</span>
                <span class="qb-q">${TOPICS[id].questions.length}</span>
              </label>`).join("")}
          </div>
        </details>`).join("")}
    </div>
    <div class="qb-footer">
      <span id="qb-summary"></span>
      <button class="btn btn-primary" id="qb-start" type="button">Quiz starten ▸</button>
    </div>
  `);

  const topicBoxes = [...document.querySelectorAll(".qb-topic-box")];
  const catBoxes = [...document.querySelectorAll(".qb-cat-box")];

  function refresh() {
    topicBoxes.forEach(b => { b.checked = selected.has(b.dataset.id); });
    cats.forEach(({ key, ids }) => {
      const n = ids.filter(id => selected.has(id)).length;
      const box = catBoxes.find(b => b.dataset.cat === key);
      box.checked = n === ids.length;
      box.indeterminate = n > 0 && n < ids.length;
      document.querySelector(`[data-count="${key}"]`).textContent = `${n} / ${ids.length}`;
    });
    const qCount = [...selected].reduce((s, id) => s + TOPICS[id].questions.length, 0);
    const take = Math.min(length, qCount);
    document.getElementById("qb-summary").textContent = selected.size
      ? `${selected.size} Themen · ${qCount} Fragen verfügbar · Quiz mit ${take} Fragen`
      : "Wähle mindestens ein Thema";
    document.getElementById("qb-start").disabled = !selected.size;
  }

  topicBoxes.forEach(b => b.addEventListener("change", () => {
    b.checked ? selected.add(b.dataset.id) : selected.delete(b.dataset.id);
    refresh();
  }));
  catBoxes.forEach(b => {
    /* Klick auf die Kategorie-Checkbox soll die Liste nicht auf-/zuklappen */
    b.addEventListener("click", e => e.stopPropagation());
    b.addEventListener("change", () => {
      const ids = cats.find(x => x.key === b.dataset.cat).ids;
      ids.forEach(id => b.checked ? selected.add(id) : selected.delete(id));
      refresh();
    });
  });
  document.querySelectorAll(".qb-len").forEach(btn => btn.addEventListener("click", () => {
    length = +btn.dataset.len;
    document.querySelectorAll(".qb-len").forEach(x => x.classList.toggle("active", x === btn));
    refresh();
  }));
  document.getElementById("qb-all").addEventListener("click", () => { Object.keys(TOPICS).forEach(id => selected.add(id)); refresh(); });
  document.getElementById("qb-none").addEventListener("click", () => { selected.clear(); refresh(); });
  document.getElementById("qb-done").addEventListener("click", () => {
    selected.clear();
    (state.completed || []).forEach(id => TOPICS[id] && selected.add(id));
    if (!selected.size) toast("Noch nichts gelernt", "Schließe zuerst ein paar Themen ab.", "");
    refresh();
  });
  document.getElementById("qb-start").addEventListener("click", () => {
    state.quizBuilder = { topics: [...selected], length };
    saveState();
    startBuiltQuiz([...selected], length);
  });

  refresh();
}

function startBuiltQuiz(topicIds, length) {
  const pool = [];
  topicIds.forEach(id => (TOPICS[id]?.questions || []).forEach(q => pool.push({ ...q, _topic: id })));
  if (!pool.length) { toast("Keine Fragen", "Die gewählten Themen haben keine Fragen.", ""); return; }
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const questions = pool.slice(0, Math.min(length, pool.length));
  const title = topicIds.length === 1
    ? TOPICS[topicIds[0]].title
    : `Mix aus ${topicIds.length} Themen`;
  runQuiz({
    title,
    questions,
    onFinish: (score) => {
      addXP(10 + Math.round(questions.length * 1.5 * score / 100), `Quiz-Baukasten (${questions.length} Fragen): ${score}%`);
      if (score === 100) {
        state.perfectQuizzes = (state.perfectQuizzes || 0) + 1;
        saveState();
      }
      checkAchievements();
    }
  });
}

window.openQuizBuilder = openQuizBuilder;
