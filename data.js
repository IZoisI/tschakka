/* ===========================================================
   PFF32 // LEARNING DATA
   Alle Lerninhalte für die Abschlussprüfung Pflegefachfrau/-mann
   Basis: Planungsraster RBB Müritz, 28 Unterrichtswochen
   =========================================================== */

const CATEGORIES = {
  kommunikation: { name: "Kommunikation", icon: "💬" },
  ethik:         { name: "Ethik",        icon: "⚖️"  },
  anatomie:      { name: "Anatomie",     icon: "🫀" },
  innere:        { name: "Innere Medizin", icon: "🩺" },
  pflegewiss:    { name: "Pflegewissenschaft", icon: "📚" },
  psychiatrie:   { name: "Psychiatrie",  icon: "🧠" },
  notfall:       { name: "Notfall",      icon: "🚨" },
  sozialrecht:   { name: "Recht & Sozialsys.", icon: "📋" },
  pflegeprozess: { name: "Pflegeprozess", icon: "🔄" },
  wunde:         { name: "Wundmanagement", icon: "🩹" },
  hygiene:       { name: "Hygiene",      icon: "🧼" },
  onko:          { name: "Onkologie",    icon: "🎗️" },
  paed:          { name: "Pädiatrie/Gyn", icon: "👶" }
};

const TOPICS = {

  /* ===================== KOMMUNIKATION ===================== */
  paraphrasieren: {
    title: "Paraphrasieren", category: "kommunikation",
    intro: "Paraphrasieren ist das sinngemäße Wiedergeben einer Aussage mit eigenen Worten. Es ist eine der zentralen Techniken des aktiven Zuhörens nach Carl Rogers.",
    content: `<p><strong>Ziel:</strong> Verständnis signalisieren und überprüfen, Missverständnisse vermeiden, dem Gegenüber zeigen, dass man wirklich zuhört.</p>
    <ul>
      <li>Inhalt wird in <em>eigenen Worten</em> zurückgespiegelt</li>
      <li>Keine Bewertung, keine Interpretation</li>
      <li>Beispiel: Pat: "Ich habe Angst vor der OP." – PFK: "Sie sind beunruhigt wegen des Eingriffs."</li>
      <li>Abgrenzung: <em>Spiegeln</em> = wortwörtlich, <em>Verbalisieren</em> = Gefühle benennen</li>
      <li>Typische Einstiege: "Habe ich richtig verstanden, dass…", "Sie meinen also…"</li>
    </ul>`,
    questions: [
      { q: "Was beschreibt Paraphrasieren am treffendsten?", a: ["Wörtliche Wiederholung","Sinngemäße Wiedergabe in eigenen Worten","Benennung von Gefühlen","Bewertung der Aussage"], correct: 1, explain: "Paraphrasieren = sinngemäße Wiedergabe mit eigenen Worten, nicht wörtlich (das wäre Spiegeln)." },
      { q: "Paraphrasieren ist eine Technik aus:", a: ["Der Konfrontationstherapie","Dem aktiven Zuhören","Dem Bobath-Konzept","Der Biografiearbeit"], correct: 1, explain: "Paraphrasieren ist zentraler Baustein des aktiven Zuhörens nach Rogers." },
      { q: "Welche Aussage paraphrasiert korrekt: 'Ich kann nachts nicht schlafen'?", a: ["Sie sind müde.","Sie sollten Baldrian nehmen.","Der Schlaf fällt Ihnen nachts schwer.","Das ist nicht schlimm."], correct: 2, explain: "Sinngemäße Wiedergabe ohne Bewertung oder Ratschlag." }
    ],
    flashcards: [
      { front: "Paraphrasieren", back: "Sinngemäße Wiedergabe einer Aussage in eigenen Worten – zentrale Technik des aktiven Zuhörens" },
      { front: "Unterschied Spiegeln vs. Paraphrasieren", back: "Spiegeln = wörtlich wiederholen; Paraphrasieren = mit eigenen Worten sinngemäß" },
      { front: "Typischer Einstieg zum Paraphrasieren", back: "'Habe ich richtig verstanden...' / 'Sie meinen also...'" }
    ]
  },

  verbalisieren: {
    title: "Verbalisieren emotionaler Erlebnisinhalte", category: "kommunikation",
    intro: "Verbalisieren (VEE) bedeutet, die nicht ausgesprochenen Gefühle des Gegenübers in Worte zu fassen. Es geht einen Schritt weiter als Paraphrasieren.",
    content: `<p><strong>Ziel:</strong> Dem Patienten helfen, eigene Gefühle wahrzunehmen und zu akzeptieren.</p>
    <ul>
      <li>Fokus auf <strong>Gefühle</strong>, nicht auf Inhalt</li>
      <li>Empathie wird spürbar</li>
      <li>Beispiel: Pat: "Keiner besucht mich." – PFK: "Sie fühlen sich einsam und enttäuscht."</li>
      <li>Vorsicht: Nicht interpretieren, keine Ferndiagnose, Raum zur Korrektur lassen</li>
      <li>Fragen wie "Fühlen Sie sich …?" eröffnen Raum</li>
    </ul>`,
    questions: [
      { q: "Verbalisieren zielt auf:", a: ["Den sachlichen Inhalt","Die emotionale Ebene","Die Körpersprache","Die Beziehungsebene nach Watzlawick"], correct: 1, explain: "VEE = Verbalisieren emotionaler Erlebnisinhalte → Gefühle ansprechen." },
      { q: "Welcher Satz verbalisiert?", a: ["Sie haben heute keinen Besuch bekommen.","Sie wirken traurig und verlassen.","Es kommt sicher noch jemand.","Das tut mir leid für Sie."], correct: 1, explain: "Gefühle werden benannt (traurig, verlassen), ohne zu interpretieren oder zu vertrösten." },
      { q: "Welches Modell gehört zum Hintergrund des VEE?", a: ["Watzlawick","Rogers (klientenzentrierte Gesprächsführung)","Maslow","Kohlberg"], correct: 1, explain: "Das Verbalisieren stammt aus der Gesprächstherapie nach Carl Rogers." }
    ],
    flashcards: [
      { front: "VEE", back: "Verbalisieren emotionaler Erlebnisinhalte – Gefühle in Worte fassen" },
      { front: "Zielsetzung des Verbalisierens", back: "Empathie zeigen, Patient hilft Gefühle wahrzunehmen und zu akzeptieren" },
      { front: "Begründer der klientenzentrierten Gesprächsführung", back: "Carl Rogers" }
    ]
  },

  gewaltfreie_kommun: {
    title: "Gewaltfreie Kommunikation (GFK)", category: "kommunikation",
    intro: "Die Gewaltfreie Kommunikation nach Marshall B. Rosenberg ist ein Vier-Schritte-Modell, das Konflikte durch wertschätzende Sprache auflösen soll.",
    content: `<p><strong>Die 4 Schritte (BBWB):</strong></p>
    <ol>
      <li><strong>Beobachtung</strong> – ohne Bewertung beschreiben, was passiert ist</li>
      <li><strong>Gefühl</strong> – eigenes Gefühl benennen</li>
      <li><strong>Bedürfnis</strong> – das dahinterliegende Bedürfnis ausdrücken</li>
      <li><strong>Bitte</strong> – konkrete, erfüllbare Bitte formulieren</li>
    </ol>
    <p>Beispiel: "Wenn die Klingel dreimal ungehört bleibt (B), bin ich besorgt (G), weil mir Sicherheit wichtig ist (Be). Könntest du künftig innerhalb von 5 Min reagieren? (Bitte)"</p>
    <p><strong>Wolfs- vs. Giraffensprache:</strong> Wolf = urteilend, bewertend; Giraffe = empathisch, bedürfnisorientiert.</p>`,
    questions: [
      { q: "Wer begründete die GFK?", a: ["Rogers","Rosenberg","Watzlawick","Schulz von Thun"], correct: 1, explain: "Marshall B. Rosenberg, US-amerikanischer Psychologe." },
      { q: "Reihenfolge der 4 Schritte der GFK:", a: ["Bitte–Gefühl–Beobachtung–Bedürfnis","Beobachtung–Gefühl–Bedürfnis–Bitte","Gefühl–Bitte–Bedürfnis–Beobachtung","Bedürfnis–Beobachtung–Gefühl–Bitte"], correct: 1, explain: "B-G-B-B: Beobachtung, Gefühl, Bedürfnis, Bitte." },
      { q: "Die 'Giraffensprache' steht für:", a: ["Angriff","Bewertung","Empathische, bedürfnisorientierte Kommunikation","Anweisung"], correct: 2, explain: "Giraffe (großes Herz) = wertschätzend, Wolf = urteilend." }
    ],
    flashcards: [
      { front: "4 Schritte der GFK", back: "Beobachtung → Gefühl → Bedürfnis → Bitte" },
      { front: "Begründer GFK", back: "Marshall B. Rosenberg" },
      { front: "Giraffe vs. Wolf", back: "Giraffe: empathisch, Bedürfnis im Blick. Wolf: urteilend, bewertend." }
    ]
  },

  watzlawick: {
    title: "Kommunikation nach Watzlawick", category: "kommunikation",
    intro: "Paul Watzlawick formulierte 5 pragmatische Axiome der Kommunikation. Zentrale Einsicht: 'Man kann nicht nicht kommunizieren.'",
    content: `<p><strong>Die 5 Axiome:</strong></p>
    <ol>
      <li>Man kann nicht <em>nicht</em> kommunizieren.</li>
      <li>Jede Kommunikation hat einen Inhalts- und Beziehungsaspekt (Beziehung bestimmt Inhalt).</li>
      <li>Kommunikation ist Ursache und Wirkung zugleich – die <em>Interpunktion</em> ist subjektiv.</li>
      <li>Kommunikation ist digital (Worte) und analog (Mimik, Gestik, Tonfall).</li>
      <li>Kommunikation ist symmetrisch (gleich) oder komplementär (ungleich, z. B. Arzt–Patient).</li>
    </ol>
    <p>Für die Pflege: Non-verbale Signale bewusst wahrnehmen (schweigender Pat. kommuniziert trotzdem!).</p>`,
    questions: [
      { q: "Wie viele Axiome stellte Watzlawick auf?", a: ["3","4","5","7"], correct: 2, explain: "5 pragmatische Axiome." },
      { q: "Das 1. Axiom lautet:", a: ["Jede Kommunikation ist symmetrisch.","Man kann nicht nicht kommunizieren.","Kommunikation ist immer digital.","Der Sender bestimmt die Botschaft."], correct: 1, explain: "Das bekannteste Axiom – auch Schweigen und Wegschauen sind Kommunikation." },
      { q: "Analoge Kommunikation ist:", a: ["Sprachlich","Nicht-sprachlich (Mimik, Gestik)","Schriftlich","Formell"], correct: 1, explain: "Digital = sprachlich/Worte; analog = Mimik, Gestik, Tonfall." }
    ],
    flashcards: [
      { front: "Watzlawick – 1. Axiom", back: "Man kann nicht nicht kommunizieren." },
      { front: "Axiome gesamt", back: "1. nicht-nicht / 2. Inhalt & Beziehung / 3. Interpunktion / 4. digital & analog / 5. symmetrisch & komplementär" },
      { front: "Digital vs. analog", back: "Digital = verbal, analog = non-verbal (Mimik, Gestik)" }
    ]
  },

  schulz_von_thun: {
    title: "4-Seiten-Modell (Schulz von Thun)", category: "kommunikation",
    intro: "Friedemann Schulz von Thun beschreibt 4 Seiten, die in jeder Nachricht mitschwingen: Sachinhalt, Selbstoffenbarung, Beziehung und Appell.",
    content: `<p><strong>Die 4 Seiten einer Nachricht:</strong></p>
    <ul>
      <li><strong>Sachebene</strong> – Worüber informiere ich?</li>
      <li><strong>Selbstoffenbarung</strong> – Was gebe ich von mir preis?</li>
      <li><strong>Beziehung</strong> – Wie stehe ich zum Gegenüber?</li>
      <li><strong>Appell</strong> – Was will ich erreichen?</li>
    </ul>
    <p>Jeder Sender sendet mit 4 Schnäbeln, der Empfänger hört mit 4 Ohren. Missverständnisse entstehen, wenn auf einem anderen Ohr gehört wird als gesendet.</p>
    <p>Beispiel: "Das Bett ist nicht gemacht." – Sache: Zustand, Appell: Mach es bitte, Beziehung: Du bist nachlässig, SO: Mich nervt Unordnung.</p>`,
    questions: [
      { q: "Wie viele 'Seiten' hat eine Nachricht nach Schulz von Thun?", a: ["2","3","4","5"], correct: 2, explain: "4: Sache, Selbstoffenbarung, Beziehung, Appell." },
      { q: "Welche Seite fehlt? Sache, Selbstoffenbarung, Appell und …?", a: ["Information","Bedürfnis","Beziehung","Wahrnehmung"], correct: 2, explain: "Beziehungsseite." },
      { q: "'Die Ampel ist grün' sagt der Beifahrer. Welche Seite ist vermutlich gemeint?", a: ["Sache","Appell","Beziehung","Selbstoffenbarung"], correct: 1, explain: "Klassisches Beispiel: Der Appell 'Fahr los!' dominiert." }
    ],
    flashcards: [
      { front: "4 Seiten einer Nachricht", back: "Sachinhalt · Selbstoffenbarung · Beziehung · Appell" },
      { front: "Begründer 4-Ohren-Modell", back: "Friedemann Schulz von Thun" },
      { front: "Warum entstehen Missverständnisse?", back: "Sender sendet auf einer, Empfänger hört auf anderer Seite/Ohr" }
    ]
  },

  /* ===================== ANATOMIE / ORGANSYSTEME ===================== */
  nervensystem: {
    title: "Nervensystem", category: "anatomie",
    intro: "Das Nervensystem steuert und koordiniert alle Körperfunktionen. Gliederung in ZNS und PNS, funktionell in somatisch und vegetativ.",
    content: `<p><strong>Gliederung:</strong></p>
    <ul>
      <li><strong>ZNS</strong>: Gehirn + Rückenmark</li>
      <li><strong>PNS</strong>: 12 Hirnnerven + 31 Spinalnervenpaare</li>
      <li><strong>Somatisch</strong>: Willkürliche Motorik, Sensibilität</li>
      <li><strong>Vegetativ (autonom)</strong>: Sympathikus (Fight/Flight) ↔ Parasympathikus (Ruhe/Verdauung)</li>
    </ul>
    <p><strong>Neuron</strong>: Zellkörper (Soma), Dendriten (Eingang), Axon (Ausgang), Synapsen. Reizleitung über Aktionspotenzial (Na⁺/K⁺-Pumpe).</p>
    <p><strong>Neurotransmitter</strong>: Acetylcholin, Dopamin, Serotonin, GABA, Noradrenalin.</p>`,
    questions: [
      { q: "Wie viele Spinalnervenpaare besitzt der Mensch?", a: ["12","24","31","33"], correct: 2, explain: "31 Spinalnervenpaare (8 C, 12 Th, 5 L, 5 S, 1 Co)." },
      { q: "Der Parasympathikus bewirkt:", a: ["Pupillenerweiterung","Bronchienerweiterung","Herzfrequenzsenkung","Blutdruckanstieg"], correct: 2, explain: "Parasympathikus = Ruhe/Verdauung, senkt HF." },
      { q: "Zum ZNS gehören:", a: ["Gehirn und Hirnnerven","Gehirn und Rückenmark","Rückenmark und Spinalnerven","Hirnnerven und Spinalnerven"], correct: 1, explain: "ZNS = Gehirn + Rückenmark." }
    ],
    flashcards: [
      { front: "ZNS", back: "Gehirn + Rückenmark" },
      { front: "Sympathikus", back: "Fight or flight: HF↑, BD↑, Bronchien weit, Pupillen weit, Verdauung↓" },
      { front: "Parasympathikus", back: "Ruhe/Verdauung: HF↓, BD↓, Bronchien eng, Pupillen eng, Verdauung↑" },
      { front: "12 Hirnnerven (Eselsbrücke)", back: "Onkel Otto orgelt … (Olfactorius, Opticus, Oculomotorius …)" }
    ]
  },

  gefaesssystem: {
    title: "Gefäßsystem", category: "anatomie",
    intro: "Das Gefäßsystem transportiert Blut durch den Körper. Unterteilt in Hochdrucksystem (Arterien) und Niederdrucksystem (Venen, Kapillaren).",
    content: `<ul>
      <li><strong>Arterien</strong>: Vom Herz weg, sauerstoffreich (Ausnahme: A. pulmonalis). Dicke, elastische Wand (3 Schichten: Intima, Media, Adventitia).</li>
      <li><strong>Venen</strong>: Zum Herz hin, sauerstoffarm (Ausnahme: V. pulmonalis). Venenklappen verhindern Rückfluss.</li>
      <li><strong>Kapillaren</strong>: Stoffaustausch (Diffusion).</li>
      <li><strong>Großer Kreislauf</strong>: Linkes Herz → Aorta → Körper → obere/untere Hohlvene → Rechter Vorhof.</li>
      <li><strong>Kleiner Kreislauf</strong>: Rechtes Herz → A. pulmonalis → Lunge → V. pulmonalis → Linker Vorhof.</li>
    </ul>
    <p>Pulsstellen: A. radialis, A. carotis, A. femoralis, A. dorsalis pedis.</p>`,
    questions: [
      { q: "Welches Gefäß führt sauerstoffarmes Blut?", a: ["Aorta","A. pulmonalis","V. pulmonalis","A. carotis"], correct: 1, explain: "Die Lungenarterie führt O2-armes Blut zur Lunge (Ausnahme unter den Arterien)." },
      { q: "Venenklappen verhindern:", a: ["Thrombose","Rückfluss des Blutes","Blutdruck","Entzündungen"], correct: 1, explain: "Sie sichern den Blutfluss Richtung Herz." },
      { q: "Welche Schicht ist die innerste der Gefäßwand?", a: ["Adventitia","Media","Intima","Serosa"], correct: 2, explain: "Intima (innen) – Media (Muskel) – Adventitia (außen)." }
    ],
    flashcards: [
      { front: "Arterie", back: "Vom Herz weg, meist O2-reich, 3-schichtige Wand" },
      { front: "Ausnahme: arterielles O2-armes Gefäß", back: "A. pulmonalis (führt zur Lunge)" },
      { front: "Körperkreislauf (großer Kreislauf)", back: "Linker Ventrikel → Aorta → Körper → V. cava → rechter Vorhof" }
    ]
  },

  apoplex: {
    title: "Apoplex / Schlaganfall", category: "innere",
    intro: "Plötzliche Durchblutungsstörung des Gehirns. 85% ischämisch (Infarkt), 15% hämorrhagisch (Blutung). Notfall – 'Time is brain!'",
    content: `<p><strong>FAST-Test</strong>: Face (hängender Mundwinkel) – Arms (Armhalteversuch) – Speech (Sprachstörung) – Time (Notruf 112).</p>
    <p><strong>Risikofaktoren</strong>: Hypertonie, Diabetes, VHF, Rauchen, Adipositas, Hypercholesterinämie.</p>
    <p><strong>Symptome</strong>: Halbseitenlähmung (Hemiparese), Aphasie, Fazialisparese, Gesichtsfeldausfall, Schwindel, Bewusstseinsstörung.</p>
    <p><strong>Therapie</strong>: Lyse (rtPA) innerhalb 4,5 h bei Ischämie, Thrombektomie, OP bei Blutung. Stroke Unit!</p>
    <p><strong>Pflege</strong>: Bobath-konzeptorientierte Lagerung (betroffene Seite aktivieren), Aspirationsprophylaxe, 30°-Oberkörperhochlagerung, ggf. PEG bei Dysphagie.</p>`,
    questions: [
      { q: "Welche Form des Apoplex ist häufiger?", a: ["Hämorrhagisch","Ischämisch","TIA","SAB"], correct: 1, explain: "Ca. 85% ischämisch." },
      { q: "FAST steht für:", a: ["Face-Arms-Speech-Time","Fast-Action-Stroke-Team","Face-Acute-Seizure-Therapy","Function-Assessment-Speech-Training"], correct: 0, explain: "Face, Arms, Speech, Time." },
      { q: "Zeitfenster für systemische Lyse (rtPA):", a: ["60 Min.","4,5 Stunden","12 Stunden","24 Stunden"], correct: 1, explain: "Bis 4,5 h nach Symptombeginn." },
      { q: "Welche Lagerung ist typisch für Bobath in der Akutphase?", a: ["Bauchlage","V-Lage","30° OK-Hoch, betroffene Seite aktivieren","Flach mit Kopf tief"], correct: 2, explain: "30°, betroffene Seite wird einbezogen, keine Spannungs-/Zugreize." }
    ],
    flashcards: [
      { front: "FAST", back: "Face · Arms · Speech · Time (Notruf)" },
      { front: "Ischämischer Apoplex – %", back: "Ca. 85% aller Schlaganfälle" },
      { front: "Lyse-Zeitfenster", back: "4,5 h nach Symptombeginn (rtPA)" },
      { front: "Hauptkonzept in der Pflege", back: "Bobath – betroffene Seite aktivieren, 24h-Konzept" }
    ]
  },

  hirnareale: {
    title: "Hirnareale", category: "anatomie",
    intro: "Das Gehirn gliedert sich in Großhirn (Telencephalon), Zwischenhirn, Kleinhirn, Hirnstamm. Jedes Areal hat spezifische Funktionen.",
    content: `<p><strong>Großhirnlappen:</strong></p>
    <ul>
      <li><strong>Frontallappen</strong>: Motorik, Persönlichkeit, Planung, Broca-Areal (Sprachproduktion)</li>
      <li><strong>Parietallappen</strong>: Somatosensorik, Orientierung im Raum</li>
      <li><strong>Temporallappen</strong>: Hören, Wernicke-Areal (Sprachverständnis), Gedächtnis</li>
      <li><strong>Okzipitallappen</strong>: Sehen</li>
    </ul>
    <p><strong>Weitere wichtige Strukturen:</strong> Thalamus (Tor zum Bewusstsein), Hypothalamus (Hormone, Homöostase), Hypophyse, Hippocampus (Gedächtnis), Amygdala (Emotion), Cerebellum (Koordination), Medulla oblongata (Atmung, Kreislauf).</p>`,
    questions: [
      { q: "Das Broca-Areal liegt im:", a: ["Frontallappen","Temporallappen","Okzipitallappen","Parietallappen"], correct: 0, explain: "Broca = motorisches Sprachzentrum, Frontallappen." },
      { q: "Sehen wird verarbeitet im:", a: ["Frontallappen","Okzipitallappen","Hippocampus","Thalamus"], correct: 1, explain: "Sehrinde im Okzipitallappen." },
      { q: "Welche Struktur ist für das Gedächtnis zentral?", a: ["Hypothalamus","Amygdala","Hippocampus","Pons"], correct: 2, explain: "Hippocampus – Überführung Kurz- → Langzeitgedächtnis." }
    ],
    flashcards: [
      { front: "Broca-Areal", back: "Frontallappen · motorische Sprachproduktion" },
      { front: "Wernicke-Areal", back: "Temporallappen · Sprachverständnis" },
      { front: "Kleinhirn", back: "Cerebellum – Koordination und Feinmotorik" },
      { front: "Medulla oblongata", back: "Verlängertes Mark – Atem- und Kreislaufzentrum" }
    ]
  },

  herz_anatomie: {
    title: "Herz – Anatomie", category: "anatomie",
    intro: "Das Herz ist ein muskuläres Hohlorgan, etwa faustgroß, wiegt ca. 300 g. Es pumpt täglich ca. 7.000 l Blut.",
    content: `<ul>
      <li><strong>Lage</strong>: Mediastinum, hinter dem Sternum, zu 2/3 links der Mittellinie.</li>
      <li><strong>Wandschichten</strong>: Endokard (innen) – Myokard (Muskel) – Epikard – Perikard (Herzbeutel)</li>
      <li><strong>4 Kammern</strong>: Rechter und linker Vorhof (Atrium), rechte und linke Kammer (Ventrikel)</li>
      <li><strong>4 Herzklappen</strong>:
        <ul>
          <li>Trikuspidalklappe (RA→RV)</li>
          <li>Pulmonalklappe (RV→Lunge)</li>
          <li>Mitralklappe/Bikuspidalklappe (LA→LV)</li>
          <li>Aortenklappe (LV→Aorta)</li>
        </ul>
      </li>
      <li><strong>Koronarien</strong>: RCA (rechts), LCA mit RIVA und RCX (links)</li>
      <li><strong>Erregungsbildung</strong>: Sinusknoten → AV-Knoten → His-Bündel → Tawara-Schenkel → Purkinje-Fasern</li>
    </ul>`,
    questions: [
      { q: "Welche Klappe liegt zwischen linkem Vorhof und linker Kammer?", a: ["Trikuspidalklappe","Aortenklappe","Mitralklappe","Pulmonalklappe"], correct: 2, explain: "Mitral-/Bikuspidalklappe links." },
      { q: "Wo liegt der Sinusknoten?", a: ["Im linken Vorhof","Im rechten Vorhof","Im linken Ventrikel","Im His-Bündel"], correct: 1, explain: "Sinusknoten = primärer Schrittmacher im rechten Vorhof." },
      { q: "Die innerste Herzwand-Schicht heißt:", a: ["Epikard","Myokard","Endokard","Perikard"], correct: 2, explain: "Endokard (innen) – Myokard – Epikard – Perikard." }
    ],
    flashcards: [
      { front: "4 Herzklappen", back: "Trikuspidal · Pulmonal · Mitral · Aorten" },
      { front: "Primärer Schrittmacher", back: "Sinusknoten (60–80/min)" },
      { front: "Herzwandschichten (innen→außen)", back: "Endokard → Myokard → Epikard → Perikard" },
      { front: "Koronararterien", back: "RCA (re) · LCA mit RIVA + RCX (li)" }
    ]
  },

  lunge_anatomie: {
    title: "Lunge – Anatomie", category: "anatomie",
    intro: "Die Lunge besteht aus rechts 3 und links 2 Lappen (Platz für das Herz). Über ca. 300 Mio. Alveolen erfolgt der Gasaustausch (~90 m² Fläche).",
    content: `<ul>
      <li><strong>Atemwege</strong>: Nase → Rachen → Larynx → Trachea → Bronchien → Bronchiolen → Alveolen</li>
      <li><strong>Pleura</strong>: Pleura visceralis (Lunge) + Pleura parietalis (Thoraxwand), Pleuraspalt mit Flüssigkeit</li>
      <li><strong>Atmung</strong>: Inspiration aktiv (Zwerchfell, Interkostalmuskeln), Exspiration passiv</li>
      <li><strong>Atemzentren</strong>: Medulla oblongata – reagiert auf pCO₂</li>
      <li><strong>Surfactant</strong>: Senkt Oberflächenspannung, verhindert Alveolen-Kollaps</li>
      <li><strong>Werte</strong>: AF normal 12–20/min, SpO₂ ≥ 95%</li>
    </ul>`,
    questions: [
      { q: "Wie viele Lungenlappen hat der rechte Lungenflügel?", a: ["2","3","4","5"], correct: 1, explain: "Rechts 3, links 2 Lappen." },
      { q: "Wo erfolgt der Gasaustausch?", a: ["In den Bronchien","In den Bronchiolen","In den Alveolen","In der Trachea"], correct: 2, explain: "Alveolen – dünne Wände, große Fläche." },
      { q: "Das Atemzentrum reagiert primär auf:", a: ["O2-Mangel","CO2-Anstieg","pH-Anstieg","HF-Anstieg"], correct: 1, explain: "pCO₂ ist der wichtigste Atemantrieb beim Gesunden." }
    ],
    flashcards: [
      { front: "Lungenlappen", back: "Rechts 3, links 2 (Herzplatz)" },
      { front: "Ort des Gasaustauschs", back: "Alveolen (~300 Mio., ~90 m²)" },
      { front: "Surfactant", back: "Oberflächenaktive Substanz, verhindert Alveolenkollaps" },
      { front: "Normale AF Erwachsener", back: "12–20 Atemzüge/min" }
    ]
  },

  niere_anatomie: {
    title: "Niere – Anatomie", category: "anatomie",
    intro: "Paariges Organ retroperitoneal, ca. 150 g, bohnenförmig. Produziert täglich ~180 l Primärharn → ~1,5 l Endharn.",
    content: `<ul>
      <li><strong>Aufbau</strong>: Nierenrinde, Nierenmark, Nierenbecken, Ureter</li>
      <li><strong>Funktionseinheit</strong>: Nephron (ca. 1 Mio. pro Niere) – Glomerulus + Tubulussystem + Sammelrohr</li>
      <li><strong>Funktionen</strong>:
        <ul>
          <li>Ausscheidung harnpflichtiger Substanzen</li>
          <li>Wasser-/Elektrolyt-Haushalt</li>
          <li>Säure-Basen-Regulation</li>
          <li>Hormonproduktion: <em>Renin</em> (BD), <em>Erythropoetin</em> (Blutbildung), <em>Calcitriol</em> (Vit. D)</li>
          <li>Blutdruckregulation (RAAS)</li>
        </ul>
      </li>
      <li><strong>Labor</strong>: Kreatinin, GFR, Harnstoff</li>
    </ul>`,
    questions: [
      { q: "Wie viele Nephrone enthält eine Niere ca.?", a: ["100.000","500.000","1 Million","10 Millionen"], correct: 2, explain: "~1 Mio. Nephrone pro Niere." },
      { q: "Welches Hormon stimuliert die Erythropoese?", a: ["Renin","ADH","Erythropoetin","Calcitonin"], correct: 2, explain: "EPO – in der Niere gebildet, regt Blutbildung an." },
      { q: "Wie viel Primärharn wird täglich gebildet?", a: ["~1,5 l","~18 l","~180 l","~1800 l"], correct: 2, explain: "180 l Primärharn → 99% Rückresorption → 1,5 l Endharn." }
    ],
    flashcards: [
      { front: "Funktionseinheit Niere", back: "Nephron (Glomerulus + Tubulus)" },
      { front: "Renale Hormone", back: "Renin · Erythropoetin · Calcitriol (aktives Vit. D)" },
      { front: "Primär- vs. Endharn", back: "180 l → 1,5 l täglich (99% Rückresorption)" }
    ]
  },

  urinbeobachtung: {
    title: "Urinbeobachtung", category: "pflegeprozess",
    intro: "Urin ist ein wichtiger Indikator für Flüssigkeitshaushalt, Nierenfunktion und Stoffwechsel. Pflegerische Beobachtung umfasst Menge, Farbe, Geruch, Beimengungen.",
    content: `<ul>
      <li><strong>Menge</strong>: normal 1–2 l/d. <em>Anurie</em> &lt;100 ml, <em>Oligurie</em> &lt;500 ml, <em>Polyurie</em> &gt;2,5 l</li>
      <li><strong>Farbe</strong>: hellgelb (normal). Dunkel → Konzentration/Bilirubin, rot → Hämaturie/Rote Beete, trüb → Infekt</li>
      <li><strong>Geruch</strong>: stechend (Infekt), fruchtig/obstartig (Azeton/Ketoazidose), fäkal (Fistel)</li>
      <li><strong>Beimengungen</strong>: Blut, Eiter, Schleim, Sediment</li>
      <li><strong>Spezifisches Gewicht</strong>: 1015–1025 g/l</li>
      <li><strong>Miktionsstörungen</strong>: Dysurie, Pollakisurie, Nykturie, Inkontinenz</li>
    </ul>`,
    questions: [
      { q: "Wie heißt eine Urinausscheidung &lt; 100 ml/24 h?", a: ["Oligurie","Anurie","Polyurie","Nykturie"], correct: 1, explain: "Anurie = quasi Versiegen der Ausscheidung (<100 ml)." },
      { q: "Obstartiger Uringeruch deutet auf:", a: ["Harnwegsinfekt","Diabetische Ketoazidose","Niereninsuffizienz","Dehydration"], correct: 1, explain: "Azetongeruch durch Ketonkörper." },
      { q: "Nächtliches Wasserlassen nennt man:", a: ["Dysurie","Polyurie","Nykturie","Enuresis"], correct: 2, explain: "Nykturie." }
    ],
    flashcards: [
      { front: "Oligurie / Anurie", back: "Oligurie <500 ml/d · Anurie <100 ml/d" },
      { front: "Pollakisurie", back: "Häufiges Wasserlassen bei kleiner Urinmenge" },
      { front: "Azetongeruch", back: "Hinweis auf diabetische Ketoazidose" }
    ]
  },

  zystitis: {
    title: "Zystitis (Harnwegsinfekt)", category: "innere",
    intro: "Entzündung der Harnblase, meist bakteriell (80% E. coli). Frauen häufiger (kurze Urethra).",
    content: `<p><strong>Symptome</strong>: Dysurie (Brennen), Pollakisurie, Harndrang, suprapubischer Schmerz, trüber/blutiger Urin. Fieber selten (bei Fieber → V. a. Pyelonephritis!).</p>
    <p><strong>Diagnostik</strong>: U-Stix (Nitrit, Leukos, Ery), Urinkultur bei kompliziert.</p>
    <p><strong>Therapie</strong>: Antibiotikum (z. B. Fosfomycin, Nitrofurantoin), viel trinken (2–3 l), Blase entleeren.</p>
    <p><strong>Prävention</strong>: Von vorne nach hinten wischen, nach GV Miktion, ausreichend trinken, Unterkühlung vermeiden, Cranberrysaft (umstritten).</p>
    <p><strong>Risiko</strong>: Dauerkatheter → Katheterassoziierte HWI (geschlossenes System, Hygiene!)</p>`,
    questions: [
      { q: "Häufigster Erreger der Zystitis:", a: ["Staphylococcus aureus","E. coli","Pseudomonas","Klebsiellen"], correct: 1, explain: "E. coli verursacht ca. 80% der HWI." },
      { q: "Warum sind Frauen häufiger betroffen?", a: ["Hormonstatus","Kürzere Harnröhre","Geringeres Trinkverhalten","Immunschwäche"], correct: 1, explain: "Kurze Urethra (~4 cm) – schneller aszendierend." },
      { q: "Fieber bei HWI deutet auf:", a: ["Unkomplizierte Zystitis","Pyelonephritis","Urethritis","Harnretention"], correct: 1, explain: "Fieber → V.a. aufsteigende Entzündung (Nierenbeckenentzündung)." }
    ],
    flashcards: [
      { front: "Häufigster HWI-Erreger", back: "E. coli (~80%)" },
      { front: "Zystitis-Trias", back: "Dysurie · Pollakisurie · Harndrang" },
      { front: "Unterschied Zystitis/Pyelonephritis", back: "Zystitis: unkompliziert, kein Fieber. Pyelonephritis: Fieber, Flankenschmerz" }
    ]
  },

  dialyse: {
    title: "Dialyse", category: "innere",
    intro: "Nierenersatzverfahren bei terminaler Niereninsuffizienz. Zwei Hauptverfahren: Hämodialyse und Peritonealdialyse.",
    content: `<p><strong>Hämodialyse (HD)</strong>:
    <ul>
      <li>Blutreinigung über künstliche Membran (Dialysator)</li>
      <li>Shunt (Cimino-Brescia-Fistel) oder Dialysekatheter</li>
      <li>3× wöchentlich je 4–5 h im Zentrum</li>
      <li>Pflege: Shuntarm <em>nicht</em> für BD/Blutentnahme, täglich auf Schwirren/Fremissement prüfen</li>
    </ul></p>
    <p><strong>Peritonealdialyse (PD)</strong>:
    <ul>
      <li>Eigenes Bauchfell als Membran</li>
      <li>Dialysat über Katheter in Bauchhöhle – Austausch 4× tägl. (CAPD) oder nachts (APD)</li>
      <li>Risiko: Peritonitis (trübes Dialysat!)</li>
    </ul></p>
    <p><strong>Indikationen</strong>: GFR &lt; 15 ml/min, urämisches Syndrom, Hyperkaliämie, Überwässerung, metabolische Azidose.</p>`,
    questions: [
      { q: "Was ist typisch für den Cimino-Shunt?", a: ["Dauerkatheter in der V. jugularis","Anastomose von Arterie und Vene","Künstliche Niere im Bauchraum","Nasse Nadel im Peritoneum"], correct: 1, explain: "Operativ angelegte AV-Fistel, meist am Unterarm." },
      { q: "Ein Frühzeichen der Peritonitis bei PD ist:", a: ["Blutiger Urin","Trübes Dialysat","Shunt-Schmerz","Hypertonie"], correct: 1, explain: "Trübung des Dialysats = Peritonitis bis zum Gegenbeweis." },
      { q: "Was darf am Shuntarm NICHT erfolgen?", a: ["Waschen","Blutdruckmessung","Bewegungsübungen","Abhorchen"], correct: 1, explain: "Keine BD-Messung, keine Blutentnahme, kein Heben, keine einengenden Kleidung." }
    ],
    flashcards: [
      { front: "HD-Frequenz", back: "3×/Woche á 4–5 h" },
      { front: "Shuntkontrolle", back: "Schwirren tasten, Strömungsgeräusch hören" },
      { front: "PD – CAPD", back: "Continuous Ambulatory Peritoneal Dialysis, 4×/Tag manuell" },
      { front: "Warnzeichen Peritonitis (PD)", back: "Trübes Dialysat, Bauchschmerz, Fieber" }
    ]
  },

  nierenerkrankungen: {
    title: "Nierenerkrankungen (Übersicht)", category: "innere",
    intro: "Wichtige Krankheitsbilder: Pyelonephritis, Glomerulonephritis, Nephrolithiasis, chronische Niereninsuffizienz.",
    content: `<ul>
      <li><strong>Pyelonephritis</strong>: aufsteigende bakterielle Nierenbecken-Entzündung. Symptome: Fieber, Flankenschmerz, Dysurie. Th: Antibiose.</li>
      <li><strong>Glomerulonephritis</strong>: immunologische Glomerulus-Entzündung. Klinik: Hämaturie, Proteinurie, Hypertonie, Ödeme.</li>
      <li><strong>Nephrolithiasis (Nierensteine)</strong>: kolikartige Flankenschmerzen, oft mit Übelkeit. Th: Analgesie, Flüssigkeit, ggf. Stoßwelle.</li>
      <li><strong>Chronische Niereninsuffizienz</strong> (5 Stadien nach GFR): Urämie, Anämie, Hyperkaliämie, metabolische Azidose. Therapie: Konservativ → Dialyse → Transplantation.</li>
    </ul>
    <p><strong>Urämie-Symptome</strong>: Juckreiz, Foetor uraemicus, Müdigkeit, Übelkeit, Perikarditis.</p>`,
    questions: [
      { q: "Typisches Symptom bei Nierenkolik:", a: ["Oberbauchschmerz","Wellenförmiger Flankenschmerz","Dauerschmerz epigastrisch","Kopfschmerz"], correct: 1, explain: "Kolik = wellenförmig, mit Übelkeit, Bewegungsdrang." },
      { q: "Niereninsuffizienz Stadium V bedeutet:", a: ["GFR > 90","GFR 60–89","GFR 30–59","GFR < 15"], correct: 3, explain: "Stadium V = terminal, GFR < 15 → Dialysepflicht." },
      { q: "Typisch für Urämie ist:", a: ["Metallgeschmack","Süßlicher Atem","Azetongeruch","Fischartiger Geruch"], correct: 0, explain: "Metallgeschmack, Foetor uraemicus, Juckreiz." }
    ],
    flashcards: [
      { front: "Pyelonephritis – Leitsymptome", back: "Fieber, Flankenschmerz, Dysurie" },
      { front: "Nephrotisches Syndrom", back: "Proteinurie, Ödeme, Hypoalbuminämie, Hyperlipidämie" },
      { front: "GFR < 15 ml/min", back: "Stadium V – Dialysepflicht" }
    ]
  },

  bewegungsapp_anat: {
    title: "Bewegungsapparat – Anatomie", category: "anatomie",
    intro: "Aktiver (Muskulatur) und passiver (Knochen, Gelenke, Bänder) Bewegungsapparat. Ca. 200 Knochen, >650 Muskeln.",
    content: `<ul>
      <li><strong>Knochen</strong>: Kompakta (außen), Spongiosa (innen), Knochenmark (Blutbildung). Diaphyse (Schaft), Epiphyse (Enden).</li>
      <li><strong>Gelenktypen</strong>: Kugelgelenk (Schulter, Hüfte), Scharnier (Knie, Ellenbogen), Sattel (Daumen), Dreh (Radius/Ulna)</li>
      <li><strong>Wirbelsäule</strong>: 7 HWS, 12 BWS, 5 LWS, Os sacrum (5 verschmolzen), Os coccygis</li>
      <li><strong>Muskelarten</strong>: quergestreift (Skelett, willkürlich), glatt (Organe, unwillkürlich), Herzmuskel (quergestr. + unwillkürlich)</li>
      <li><strong>Bänder (Ligamente)</strong>: Verbinden Knochen. Sehnen: Muskel an Knochen.</li>
    </ul>`,
    questions: [
      { q: "Wie viele Halswirbel hat der Mensch?", a: ["5","7","12","24"], correct: 1, explain: "7 HWS (auch bei der Giraffe)." },
      { q: "Welches Gelenk ist ein Sattelgelenk?", a: ["Schulter","Knie","Daumengrundgelenk","Hüfte"], correct: 2, explain: "Daumensattelgelenk (Carpometacarpal I)." },
      { q: "Wo liegt das rote Knochenmark beim Erwachsenen hauptsächlich?", a: ["Röhrenknochenschaft","Platte Knochen (Becken, Sternum)","Schädelknochen","Zehen"], correct: 1, explain: "Im Erwachsenenalter v.a. in platten Knochen und Wirbeln." }
    ],
    flashcards: [
      { front: "Wirbelsäule – Aufbau", back: "7 HWS · 12 BWS · 5 LWS · Sacrum · Coccyx" },
      { front: "Gelenktypen", back: "Kugel · Scharnier · Sattel · Dreh · Ei · planes Gelenk" },
      { front: "Muskelarten", back: "Quergestreift (willkürlich) · glatt (unwillkürlich) · Herz (Mischform)" }
    ]
  },

  osteoporose: {
    title: "Osteoporose", category: "innere",
    intro: "Systemische Skeletterkrankung mit verminderter Knochendichte und -qualität → erhöhtes Frakturrisiko. Häufig postmenopausal oder senil.",
    content: `<p><strong>Risikofaktoren</strong>: weiblich, Alter, Östrogenmangel, Bewegungsmangel, Kalzium-/Vit-D-Mangel, Rauchen, Alkohol, Steroide (Glukokortikoide!), Untergewicht.</p>
    <p><strong>Symptome</strong>: oft lange symptomlos – dann Frakturen bei Bagatelltrauma (Wirbelkörper, Schenkelhals, Radius = "Trias"), Rundrücken, Größenabnahme, Rückenschmerz.</p>
    <p><strong>Diagnostik</strong>: DXA (T-Wert ≤ –2,5 = Osteoporose), Röntgen, Labor (Kalzium, Vit. D).</p>
    <p><strong>Therapie</strong>: Kalzium 1000 mg + Vit. D 800 IE tgl., Bisphosphonate, Denosumab, Bewegung, Sturzprophylaxe, ausgewogene Ernährung.</p>
    <p><strong>Pflegefokus</strong>: Sturzprophylaxe (!!), ausreichend Licht, festes Schuhwerk, Hilfsmittel, Hüftprotektoren.</p>`,
    questions: [
      { q: "Welcher T-Wert definiert Osteoporose?", a: ["≤ -1,0","≤ -2,0","≤ -2,5","≤ -3,5"], correct: 2, explain: "DXA: T-Score ≤ –2,5 SD = Osteoporose." },
      { q: "Welche Medikation fördert Osteoporose?", a: ["Betablocker","Glukokortikoide","ACE-Hemmer","PPI allein"], correct: 1, explain: "Steroide (Kortisontherapie) sind ein wichtiger Risikofaktor." },
      { q: "Wichtigste pflegerische Maßnahme:", a: ["Bettruhe","Sturzprophylaxe","Flüssigkeitsrestriktion","Wärmeanwendung"], correct: 1, explain: "Frakturen entstehen meist durch Stürze → Sturzprophylaxe zentral." }
    ],
    flashcards: [
      { front: "Osteoporose T-Wert", back: "≤ −2,5 SD (DXA)" },
      { front: "Typische Frakturen", back: "Wirbelkörper · Schenkelhals · distaler Radius" },
      { front: "Basistherapie", back: "Kalzium 1000 mg + Vit. D3 800 IE + Bisphosphonate" }
    ]
  },

  bechterew: {
    title: "Morbus Bechterew (Spondylitis ankylosans)", category: "innere",
    intro: "Chronisch-entzündliche Erkrankung der Wirbelsäule und Sakroiliakalgelenke. HLA-B27 positiv. Führt zur Versteifung (Ankylose).",
    content: `<p><strong>Symptome</strong>: tiefsitzender Kreuzschmerz (nachts, morgens), Morgensteifigkeit >30 Min, Besserung durch Bewegung, eingeschränkte Thoraxatmung, Kyphose, "Bambusstab-Wirbelsäule" im Röntgen.</p>
    <p><strong>Diagnostik</strong>: HLA-B27, BSG/CRP, MRT (Frühzeichen: Sakroiliitis), Schober-Zeichen.</p>
    <p><strong>Therapie</strong>: NSAR, Biologika (TNF-α-Blocker), Physiotherapie, Atemgymnastik, Ergotherapie.</p>
    <p><strong>Pflege</strong>: Haltungsschulung, flach liegen (keine hohen Kissen!), Bewegung fördern, Schmerzmanagement, Selbsthilfegruppen.</p>`,
    questions: [
      { q: "Typisches Labor bei Morbus Bechterew:", a: ["Rheumafaktor positiv","HLA-B27 positiv","ANA positiv","Anti-CCP positiv"], correct: 1, explain: "HLA-B27 ist bei ~90% positiv." },
      { q: "Wann sind die Schmerzen typischerweise am stärksten?", a: ["Nachts und morgens","Am Nachmittag","Nach Bewegung","Nach Belastung"], correct: 0, explain: "Entzündlicher Rückenschmerz: nachts/morgens, bessert sich bei Bewegung." },
      { q: "Welche Liegeposition wird empfohlen?", a: ["Kissenberg","Flach ohne Kissen","Seitlich gebeugt","Sitzend"], correct: 1, explain: "Flach liegen, um einer Kyphose entgegenzuwirken." }
    ],
    flashcards: [
      { front: "Bechterew = ", back: "Spondylitis ankylosans – chronisch-entz. Wirbelsäulenerkr." },
      { front: "Labor-Marker", back: "HLA-B27 (ca. 90% positiv)" },
      { front: "Bambusstab-WS", back: "Radiologisches Bild durch Ankylose" }
    ]
  },

  bandscheibenvorfall: {
    title: "Bandscheibenvorfall", category: "innere",
    intro: "Vorwölbung oder Austritt des Nucleus pulposus durch Riss im Anulus fibrosus. Häufig L4/L5, L5/S1, HWS C5/6.",
    content: `<p><strong>Symptome</strong>: Schmerz, ausstrahlend ins Bein (Ischialgie) oder Arm, Sensibilitätsstörungen, ggf. Parese.</p>
    <p><strong>Red Flags (Cauda-equina-Syndrom, Notfall!)</strong>: Reithosenanästhesie, Blasen-/Mastdarmstörung, beidseitige Parese → sofortige OP!</p>
    <p><strong>Diagnostik</strong>: Anamnese, neurologische Untersuchung (Lasègue-Zeichen), MRT.</p>
    <p><strong>Therapie</strong>: primär konservativ (90%!) – Schmerztherapie (NSAR, Opioide), Physiotherapie, Wärme, Stufenlagerung. OP nur bei neurol. Ausfällen oder therapierefraktär.</p>
    <p><strong>Pflege</strong>: Stufenlagerung (90°/90°), rückenschonende Mobilisation, Prophylaxen.</p>`,
    questions: [
      { q: "Welches Zeichen weist auf ein Cauda-equina-Syndrom hin?", a: ["Einseitige Schmerzen","Reithosenanästhesie + Blasenstörung","Morgensteifigkeit","Schwellung"], correct: 1, explain: "Notfall! Sofortige OP-Indikation." },
      { q: "Welches Lagerungsprinzip entlastet bei LWS-Bandscheibenvorfall?", a: ["Bauchlage","Stufenlagerung (Hüft-/Knie-Flexion 90°)","Trendelenburg","Fowler"], correct: 1, explain: "Stufenlagerung entlastet LWS." },
      { q: "Lasègue-Zeichen prüft:", a: ["HWS-Mobilität","Nervenwurzelreizung L4-S1","Koordination","Durchblutung"], correct: 1, explain: "Gestrecktes Bein anheben, Schmerz → Nervendehnung." }
    ],
    flashcards: [
      { front: "Häufigste Lokalisation", back: "LWS L4/5 und L5/S1" },
      { front: "Cauda-equina-Syndrom", back: "Notfall: Reithose, Blasen-/Mastdarmstörung, Paresen – OP!" },
      { front: "Konservativ vs. OP", back: "~90% konservativ: Physio, Schmerzth., Stufenlagerung" }
    ]
  },

  rheumatoider_formenk: {
    title: "Rheumatischer Formenkreis", category: "innere",
    intro: "Sammelbegriff für ca. 400 entzündliche und degenerative Erkrankungen des Bewegungssystems. Wichtigste: rheumatoide Arthritis, Arthrose, Spondyloarthritiden, Kollagenosen, Gicht.",
    content: `<p><strong>Rheumatoide Arthritis (RA)</strong>: chron.-entzündlich, Autoimmun. Symmetrisch, Finger- und Zehengrundgelenke, Morgensteifigkeit >1h, RF/anti-CCP positiv. Th: Methotrexat, Biologika.</p>
    <p><strong>Arthrose</strong>: degenerativer Knorpelverschleiß. Mono-/oligoartikulär (Knie, Hüfte). Anlaufschmerz, Besserung in Ruhe. Th: Bewegung, Gewichtsreduktion, Analgesie, Endoprothese.</p>
    <p><strong>Gicht</strong>: Harnsäurekristalle → akute Monoarthritis (Großzehe = Podagra). Purinarme Kost, Allopurinol.</p>
    <p><strong>Fibromyalgie</strong>: chron. Schmerzsyndrom, Tender Points, keine Entzündung.</p>
    <p><strong>Pflege bei RA</strong>: Gelenkschutz, Wärme/Kälte, Hilfsmittel, rheumagerechte Kleidung (Klett!), Ergotherapie, Schmerzmanagement.</p>`,
    questions: [
      { q: "Was unterscheidet RA von Arthrose?", a: ["RA = degenerativ, Arthrose = entzündlich","RA = entzündlich, symmetrisch, morgensteif; Arthrose = degenerativ, Anlaufschmerz","Beide gleich","RA betrifft nur Kinder"], correct: 1, explain: "RA: entzündlich-symmetrisch; Arthrose: Verschleiß, asymmetrisch." },
      { q: "Podagra bezeichnet:", a: ["Gicht im Kniegelenk","Gicht im Großzehengrundgelenk","Rheuma im Daumen","Arthrose im Fuß"], correct: 1, explain: "Akuter Gichtanfall am Großzehengrundgelenk." },
      { q: "Basistherapeutikum der RA:", a: ["Ibuprofen","Methotrexat (MTX)","Paracetamol","Cortisontabletten dauerhaft"], correct: 1, explain: "MTX ist Mittel der 1. Wahl (DMARD)." }
    ],
    flashcards: [
      { front: "RA – Labor", back: "RF positiv, anti-CCP positiv, BSG/CRP↑" },
      { front: "Arthrose-Schmerz", back: "Anlaufschmerz, bei Belastung, bessert sich bei Ruhe" },
      { front: "Basistherapie RA", back: "Methotrexat + ggf. Biologika (TNF-α)" }
    ]
  },

  herzerkrankungen: {
    title: "Herzerkrankungen", category: "innere",
    intro: "Wichtige Herzkrankheiten: KHK, Herzinsuffizienz, Herzrhythmusstörungen, Endokarditis, Klappenvitien.",
    content: `<p><strong>KHK</strong>: Koronararteriensklerose → Angina pectoris, Myokardinfarkt.</p>
    <p><strong>Herzinsuffizienz</strong>: NYHA I–IV. Links: Lungenstauung, Dyspnoe, Orthopnoe, Asthma cardiale. Rechts: Ödeme, Halsvenenstauung, Aszites, Hepatomegalie. Th: ACE-Hemmer, Betablocker, Diuretika, SGLT2-Hemmer.</p>
    <p><strong>Vorhofflimmern (VHF)</strong>: häufigste Rhythmusstörung, absolute Arrhythmie, Thromboembolie-Risiko → Antikoagulation (CHA₂DS₂-VASc-Score).</p>
    <p><strong>Endokarditis</strong>: Herzinnenhautentzündung, Fieber, neue Herzgeräusche, Embolien. Duke-Kriterien, Blutkultur, Antibiose 4–6 Wochen.</p>
    <p><strong>Pflege</strong>: Gewicht täglich, Ein-/Ausfuhrkontrolle, OK-Hochlagerung, O₂-Gabe, Schonung.</p>`,
    questions: [
      { q: "NYHA IV bedeutet:", a: ["Keine Beschwerden","Beschwerden bei starker Belastung","Beschwerden bei leichter Belastung","Beschwerden in Ruhe"], correct: 3, explain: "NYHA IV = Dyspnoe/Symptome in Ruhe." },
      { q: "Welches Symptom ist typisch für Rechtsherzinsuffizienz?", a: ["Lungenödem","Beinödeme und Halsvenenstauung","Asthma cardiale","Blutiger Auswurf"], correct: 1, explain: "Rückstau in den Körperkreislauf → Ödeme." },
      { q: "Bei Vorhofflimmern wird meist verordnet:", a: ["ASS 100","Orale Antikoagulanzien (NOAK/VKA)","Tamsulosin","Insulin"], correct: 1, explain: "Antikoagulation je nach CHA2DS2-VASc-Score." }
    ],
    flashcards: [
      { front: "NYHA-Stadien", back: "I: keine · II: starke Belastung · III: leichte Belastung · IV: Ruhe" },
      { front: "Asthma cardiale", back: "Nächtl. Atemnot bei Linksherzinsuffizienz" },
      { front: "Basispflege Herzinsuff.", back: "Gewicht tägl., Bilanz, OK hoch, Kochsalzreduktion" }
    ]
  },

  blutdruck: {
    title: "Blutdruck", category: "anatomie",
    intro: "Druck, den das Blut auf die Gefäßwände ausübt. Systolisch (Auswurf) / diastolisch (Füllung). Einheit: mmHg.",
    content: `<ul>
      <li><strong>Normal</strong>: &lt; 120/80 mmHg (WHO)</li>
      <li><strong>Hypertonie</strong>: ≥ 140/90 mmHg (Praxis), ≥ 135/85 (Selbstmessung)</li>
      <li><strong>Hypotonie</strong>: &lt; 100/60 mmHg</li>
      <li><strong>Regulation</strong>: RAAS, Baroreflex, Sympathikus</li>
      <li><strong>Symptome Hypertonie</strong>: oft symptomlos ("stiller Killer"), Kopfschmerzen, Schwindel, Nasenbluten</li>
      <li><strong>Hypertensive Krise</strong>: &gt;230/120 mmHg – Notfall, besonders bei Endorganschäden</li>
    </ul>
    <p><strong>Messtechnik</strong>: Ruheposition, entspannter Arm auf Herzhöhe, richtige Manschettengröße, keine Kaffee/Zigarette 30 Min vorher.</p>
    <p><strong>Medikamente</strong>: ACE-Hemmer, AT1-Blocker, Betablocker, Ca-Antagonisten, Diuretika (die "großen Fünf").</p>`,
    questions: [
      { q: "Ab welchem Wert spricht man von arterieller Hypertonie (Praxismessung)?", a: ["≥ 130/80","≥ 140/90","≥ 160/100","≥ 180/110"], correct: 1, explain: "140/90 mmHg Grenze nach ESC/ESH-Leitlinien." },
      { q: "Was bedeutet die diastolische RR-Komponente?", a: ["Druck bei Systole","Druck bei Diastole (Herzfüllung)","Pulsdruck","Mittlerer Druck"], correct: 1, explain: "Diastolisch = Druck in der Füllungsphase des Herzens." },
      { q: "Welches Medikament ist ein Ca-Antagonist?", a: ["Ramipril","Amlodipin","Bisoprolol","HCT"], correct: 1, explain: "Amlodipin = Dihydropyridin-Ca-Antagonist." }
    ],
    flashcards: [
      { front: "Normotoniewert", back: "< 120/80 mmHg (optimal)" },
      { front: "Hypertensive Krise", back: "> 230/120 mmHg – Notfall bei Endorganschäden" },
      { front: "Die großen 5 Antihypertensiva", back: "ACE-H, AT1-B, Betablocker, Ca-Antagonisten, Diuretika" }
    ]
  },

  thrombose: {
    title: "Thrombose", back: "", category: "innere",
    intro: "Blutgerinnsel (Thrombus) in einem Gefäß, meistens tiefe Beinvenen (TVT). Gefahr: Embolie (Lungenembolie).",
    content: `<p><strong>Virchow-Trias (Ursache-Trias)</strong>:
    <ol>
      <li>Endothelschaden (Gefäßwandverletzung)</li>
      <li>Strömungsverlangsamung (Immobilität)</li>
      <li>Hyperkoagulabilität (Gerinnungsneigung, z. B. Pille, Rauchen, Exsikkose)</li>
    </ol></p>
    <p><strong>Symptome TVT</strong>: einseitige Beinschwellung, Spannungsschmerz, Überwärmung, Rötung, Wadenschmerz (Homans-Zeichen), Payr, Meyer-Druckpunkte.</p>
    <p><strong>Diagnostik</strong>: D-Dimer, Dopplersonographie, Phlebographie.</p>
    <p><strong>Therapie</strong>: Antikoagulation (NMH → DOAK/VKA), Kompressionstherapie, Mobilisation.</p>
    <p><strong>Prophylaxe</strong>: Bewegung, MTPS/Thrombosestrümpfe, LMWH (Clexane), ausreichend trinken, Frühmobilisation.</p>`,
    questions: [
      { q: "Die Virchow-Trias umfasst:", a: ["Hypertonie, Diabetes, Rauchen","Endothelschaden, Strömungsverlangsamung, Hyperkoagulabilität","Fieber, Schmerz, Rötung","Dyspnoe, Zyanose, Tachykardie"], correct: 1, explain: "Die 3 Faktoren, die eine Thromboseentstehung begünstigen." },
      { q: "Leitsymptom der tiefen Beinvenenthrombose:", a: ["Beidseitige Schwellung","Einseitige Beinschwellung mit Schmerz","Fieber","Kopfschmerz"], correct: 1, explain: "Charakteristisch: einseitige Schwellung, livide Verfärbung, Schmerz." },
      { q: "Welches Medikament gehört zur Prophylaxe?", a: ["Vitamin D","NMH (z. B. Enoxaparin)","Metformin","PPI"], correct: 1, explain: "Niedermolekulares Heparin zur perioperativen Prophylaxe." }
    ],
    flashcards: [
      { front: "Virchow-Trias", back: "1. Endothelschaden · 2. Strömungsverlangsamung · 3. Hyperkoagulabilität" },
      { front: "Klinisches Zeichen Wadenschmerz", back: "Homans-Zeichen (dorsale Extension des Fußes)" },
      { front: "Prophylaxe-Ecken", back: "Bewegung · Strümpfe · Heparin · Hydration" }
    ]
  },

  virchow_trias: {
    title: "Virchow-Trias (!)", category: "innere",
    intro: "Rudolf Virchow beschrieb 1856 die drei Faktoren, die zur Thrombosebildung führen. Fundament jeder Thrombose-Prophylaxe.",
    content: `<p><strong>Die 3 Säulen:</strong></p>
    <ol>
      <li><strong>Endothelschaden</strong>: OP, Trauma, Venenpunktion, Arteriosklerose</li>
      <li><strong>Strömungsverlangsamung</strong>: Immobilität, Bettlägerigkeit, Herzinsuffizienz, Krampfadern</li>
      <li><strong>Hyperkoagulabilität</strong>: Exsikkose, Pille, Malignom, Thrombophilie (Faktor-V-Leiden), Schwangerschaft, Rauchen</li>
    </ol>
    <p><strong>Pflegerische Konsequenz</strong> – an jeder Säule ansetzen:</p>
    <ul>
      <li>Endothel schonen (sorgfältige Punktion)</li>
      <li>Frühmobilisation, ATS, Bewegungsübungen</li>
      <li>Flüssigkeit, Heparin, Risikofaktoren reduzieren</li>
    </ul>`,
    questions: [
      { q: "Nenne die 3 Faktoren der Virchow-Trias:", a: ["Fieber, Schmerz, Rötung","Endothelschaden, Strömungsverlangsamung, Hyperkoagulabilität","Dyspnoe, Tachykardie, Zyanose","Exsikkose, Sepsis, Immobilität"], correct: 1, explain: "Basis jeder Thrombose-Pathogenese." },
      { q: "Welches gehört NICHT zur Virchow-Trias?", a: ["Endothelschaden","Strömungsverlangsamung","Hyperkoagulabilität","Hypertonie"], correct: 3, explain: "Hypertonie ist kein Bestandteil der Trias." },
      { q: "Pille + Rauchen wirkt über welche Säule?", a: ["Endothelschaden","Hyperkoagulabilität","Strömungsverlangsamung","Immunsystem"], correct: 1, explain: "Erhöhung der Gerinnungsneigung." }
    ],
    flashcards: [
      { front: "Virchow-Trias (1856)", back: "Endothelschaden · Strömungsverlangsamung · Hyperkoagulabilität" },
      { front: "Prophylaxe-Ansatz", back: "An allen 3 Säulen ansetzen: Bewegung, Hydration, Heparin, Strümpfe" }
    ]
  },

  /* ===================== LUNGE / ATMUNG ===================== */
  lungenembolie: {
    title: "Lungenembolie", category: "notfall",
    intro: "Lebensbedrohlicher Verschluss einer Pulmonalarterie durch verschleppten Thrombus (meist aus TVT). Notfall!",
    content: `<p><strong>Symptome</strong>: plötzliche Dyspnoe, Thoraxschmerz atemabhängig, Tachykardie, Tachypnoe, Zyanose, Husten, Hämoptoe, Synkope.</p>
    <p><strong>Diagnostik</strong>: D-Dimere, BGA, EKG (S1Q3-Typ), Echo (Rechtsherzbelastung), CT-Angiographie.</p>
    <p><strong>Therapie</strong>: O₂, Heparin, bei massiver LE Lyse (rtPA), ggf. Thrombektomie. Kreislauf stabilisieren.</p>
    <p><strong>Pflege-Notfall</strong>: Oberkörperhochlagerung, O₂ 6–10 l, engmaschige Vitalzeichen, Arzt rufen, kontinuierliche Beobachtung, Schock-Prophylaxe.</p>
    <p><strong>Wells-Score</strong>: prä-test-Wahrscheinlichkeit einer LE.</p>`,
    questions: [
      { q: "Häufigster Ursprung einer LE:", a: ["Herzklappe","Tiefe Beinvenenthrombose","Luftembolie","Fett-Embolie"], correct: 1, explain: ">90% aus TVT der Becken-/Beinvenen." },
      { q: "Erste Maßnahme bei V. a. LE auf Station:", a: ["Hinlegen flach","Oberkörper hoch, O2, Arzt rufen, Monitoring","Patient mobilisieren","Kalten Umschlag"], correct: 1, explain: "OK-hoch, O2, Notfall-Kette." },
      { q: "Typisches EKG-Bild:", a: ["ST-Hebung V1-V3","S1Q3-Typ","Sinusbradykardie","Rechtsschenkelblock obligat"], correct: 1, explain: "S-Zacke in I und Q-Zacke in III – klassisch bei akuter Rechtsherzbelastung." }
    ],
    flashcards: [
      { front: "LE-Symptomtrias", back: "Plötzliche Dyspnoe · Thoraxschmerz · Tachykardie" },
      { front: "S1Q3-Typ", back: "EKG-Zeichen der akuten Rechtsherzbelastung bei LE" },
      { front: "Wells-Score", back: "Klinische Wahrscheinlichkeit einer LE" }
    ]
  },

  pneumonie: {
    title: "Pneumonie", category: "innere",
    intro: "Entzündung des Lungenparenchyms, meist bakteriell (Pneumokokken). Unterscheidung ambulant (CAP) vs. nosokomial (HAP).",
    content: `<p><strong>Symptome</strong>: Fieber, Schüttelfrost, Husten mit eitrigem Auswurf, Dyspnoe, Thoraxschmerz, Rasselgeräusche, Tachypnoe.</p>
    <p><strong>Atypische Pneumonie</strong>: schleichend, trockener Husten, Kopf-/Gliederschmerzen (Mykoplasmen, Chlamydien).</p>
    <p><strong>Diagnostik</strong>: Auskultation (feuchte RGs), Röntgen-Thorax (Infiltrat), CRP, Leukos, Sputum-Kultur, BGA.</p>
    <p><strong>Therapie</strong>: Antibiose (CAP: Amoxicillin, bei schwerer Cefuroxim), O₂, Inhalation, Sekretmobilisation (VRP1, Kochsalzinhalation), ausreichend Flüssigkeit, Atemtherapie.</p>
    <p><strong>Pflege/Prophylaxe</strong>: Oberkörperhochlagerung, Atemübungen (Triflo, Kontaktatmung), Lagerungswechsel, Impfung (Pneumokokken, Influenza), Mundpflege.</p>`,
    questions: [
      { q: "Häufigster Erreger der CAP:", a: ["E. coli","Streptococcus pneumoniae","Staph. aureus","Legionella"], correct: 1, explain: "Pneumokokken sind Haupterreger." },
      { q: "Typisches Zeichen bei Auskultation:", a: ["Giemen","Feuchte Rasselgeräusche","Stridor","Stille Lunge"], correct: 1, explain: "Feuchte RGs über dem betroffenen Lappen." },
      { q: "Pneumonie-Prophylaxe beinhaltet NICHT:", a: ["Oberkörperhochlagerung","Bettruhe ohne Lagerungswechsel","Atemübungen","Pneumokokken-Impfung"], correct: 1, explain: "Bettruhe ohne Lagerung ist Risikofaktor, nicht Prophylaxe." }
    ],
    flashcards: [
      { front: "Typ. CAP-Erreger", back: "Streptococcus pneumoniae (Pneumokokken)" },
      { front: "Atypische Pneumonie", back: "Mykoplasmen, Chlamydien: schleichend, trockener Husten" },
      { front: "Pneumonie-Prophylaxe Top 3", back: "OK-hoch, Atemübungen, Mobilisation/Mundpflege" }
    ]
  },

  copd: {
    title: "COPD", category: "innere",
    intro: "Chronisch obstruktive Lungenerkrankung: fortschreitende, nicht vollständig reversible Atemwegsobstruktion. Hauptursache: Rauchen.",
    content: `<p><strong>Komponenten</strong>: chronische Bronchitis + Emphysem.</p>
    <p><strong>Symptome (AHA-Regel)</strong>: <em>Auswurf · Husten · Atemnot</em> (zunächst bei Belastung, später in Ruhe).</p>
    <p><strong>Diagnostik</strong>: Spirometrie (FEV1/FVC &lt; 0,7), GOLD-Klassifikation.</p>
    <p><strong>Therapie</strong>: Rauchstopp (!!), Bronchodilatatoren (LABA, LAMA), ICS bei Exazerbation, Sauerstoff-Langzeittherapie, Rehabilitation.</p>
    <p><strong>Exazerbation</strong>: AB, Kortison, O2 vorsichtig (Atemantrieb über pO2!), nicht-invasive Beatmung (NIV).</p>
    <p><strong>Pflege</strong>: Lippenbremse, Kutschersitz, Inhalationstechnik schulen, Raucherentwöhnung, Atemtherapie.</p>`,
    questions: [
      { q: "Welche Lippenbremse wird COPD-Patienten empfohlen?", a: ["Schnelles Ausatmen","Dosierte Lippenbremse – Ausatmen gegen leichten Lippendruck","Druckvolles Ausatmen","Atem anhalten"], correct: 1, explain: "Dosierte Lippenbremse verhindert Bronchienkollaps." },
      { q: "Wichtigster Risikofaktor:", a: ["Fettreiche Ernährung","Rauchen","Bewegungsmangel","Alter"], correct: 1, explain: ">80% aller COPD durch Rauchen." },
      { q: "Warum O2 bei COPD vorsichtig dosieren?", a: ["Weil er zur Sucht führt","Weil der Atemantrieb bei CO2-Retenern hypoxisch getriggert ist","Weil er teuer ist","Weil er die Lunge schädigt"], correct: 1, explain: "Bei CO2-Retenern hängt der Atemantrieb am pO2 – zu viel O2 unterdrückt die Atmung." }
    ],
    flashcards: [
      { front: "COPD-AHA-Symptome", back: "Auswurf · Husten · Atemnot" },
      { front: "GOLD-Spirometrie", back: "FEV1/FVC < 70% = Obstruktion" },
      { front: "Atemerleichternde Position", back: "Kutschersitz / Torwartstellung mit Lippenbremse" }
    ]
  },

  asthma_b: {
    title: "Asthma bronchiale", category: "innere",
    intro: "Chronisch-entzündliche Atemwegserkrankung mit anfallsartiger, <em>reversibler</em> Obstruktion. Allergisch oder nicht-allergisch.",
    content: `<p><strong>Symptome</strong>: Atemnot, exspiratorisches Giemen, trockener Husten, Brustenge, Tachypnoe, v.a. nachts/morgens.</p>
    <p><strong>Auslöser</strong>: Allergene, Infekt, Kälte, Belastung, Stress, Rauch.</p>
    <p><strong>Stufentherapie</strong>:
    <ol>
      <li>Kurzwirksames β2-Sympathomimetikum (SABA, z. B. Salbutamol) bedarfsweise</li>
      <li>+ niedrigdos. ICS</li>
      <li>ICS + LABA</li>
      <li>Höhere ICS-Dosis</li>
      <li>+ Omalizumab, Kortison, LAMA</li>
    </ol></p>
    <p><strong>Status asthmaticus</strong>: schwerer Anfall > 24h, kein Ansprechen auf Inhalativa – Notfall!</p>
    <p><strong>Pflege</strong>: Kutschersitz, Inhalation anleiten, beruhigen, O2, PEF-Messung, Auslöser meiden.</p>`,
    questions: [
      { q: "Welches Atemgeräusch ist typisch?", a: ["Inspiratorischer Stridor","Exspiratorisches Giemen","Feuchte Rasselgeräusche","Reibegeräusch"], correct: 1, explain: "Giemen v.a. in Exspiration bei Asthma." },
      { q: "Welches Medikament wirkt schnell bei Anfall?", a: ["ICS","Salbutamol (SABA)","Omalizumab","Montelukast"], correct: 1, explain: "Kurzwirksames β2-Mimetikum bei akuter Atemnot." },
      { q: "Unterschied Asthma ↔ COPD:", a: ["Asthma irreversibel, COPD reversibel","Asthma reversibel, COPD nicht vollständig reversibel","Asthma betrifft nur Kinder","Beides ist identisch"], correct: 1, explain: "Asthma: reversibel. COPD: dauerhafte Obstruktion." }
    ],
    flashcards: [
      { front: "Asthma-Leitsymptom Auskultation", back: "Exspiratorisches Giemen" },
      { front: "SABA", back: "Short-acting Beta-Agonist, z.B. Salbutamol – Bedarfsspray" },
      { front: "Status asthmaticus", back: "Schwerer Anfall, refraktär gegen SABA – Notfall" }
    ]
  },

  /* ===================== VERDAUUNG ===================== */
  verdauungssystem: {
    title: "Verdauungssystem – Anatomie", category: "anatomie",
    intro: "Der Gastrointestinaltrakt verläuft von der Mundhöhle bis zum Anus. Ca. 8 m lang. Aufgabe: Nahrung zerlegen, Nährstoffe aufnehmen, Unverdauliches ausscheiden.",
    content: `<p><strong>Stationen</strong>:
    <ol>
      <li>Mund (Kauen, Speichel: Amylase)</li>
      <li>Ösophagus (Transport)</li>
      <li>Magen (HCl, Pepsin, Schleim)</li>
      <li>Dünndarm: Duodenum – Jejunum – Ileum (Hauptresorption)</li>
      <li>Dickdarm: Caecum, Colon asc./trans./desc./sig., Rectum</li>
    </ol></p>
    <p><strong>Akzessorische Organe</strong>: Leber (Galle), Gallenblase, Pankreas (Enzyme + Insulin/Glukagon).</p>
    <p><strong>Resorption</strong>: Dünndarmzotten und Mikrovilli vergrößern Oberfläche auf ~200 m².</p>`,
    questions: [
      { q: "Wo findet die Hauptresorption statt?", a: ["Magen","Dünndarm","Dickdarm","Rektum"], correct: 1, explain: "Jejunum/Ileum – Zotten/Mikrovilli." },
      { q: "Welche Enzyme liefert der Pankreas?", a: ["Amylase, Lipase, Protease","Pepsin","Gallensäuren","HCl"], correct: 0, explain: "Exokrine Pankreas-Enzyme zur Verdauung." },
      { q: "Länge des Darms ca.:", a: ["1 m","4 m","8 m","16 m"], correct: 2, explain: "Dünn- + Dickdarm ca. 7–8 m beim Erwachsenen." }
    ],
    flashcards: [
      { front: "Dünndarm-Abschnitte", back: "Duodenum → Jejunum → Ileum" },
      { front: "Pankreas-Exokrin", back: "Amylase, Lipase, Trypsinogen (→ Trypsin)" },
      { front: "Leberfunktion (kurz)", back: "Entgiftung, Galle, Eiweiß-/Gerinnungs-Synthese, Glukosespeicher" }
    ]
  },

  morbus_crohn: {
    title: "Morbus Crohn", category: "innere",
    intro: "Chronisch-entzündliche Darmerkrankung (CED) mit <em>diskontinuierlichem</em>, segmentalem Befall des gesamten GI-Trakts. Alle Wandschichten.",
    content: `<p><strong>Lokalisation</strong>: Häufig terminales Ileum, aber „von Mund bis After". Skip lesions.</p>
    <p><strong>Symptome</strong>: krampfartige Bauchschmerzen (rechter Unterbauch), unblutige Durchfälle, Gewichtsverlust, Fieber, Fisteln, Stenosen, extraintestinal (Arthritis, Uveitis).</p>
    <p><strong>Diagnostik</strong>: Ileokoloskopie + Biopsie (Granulome), MRT-Sellink.</p>
    <p><strong>Therapie</strong>: Kortison (akut), Immunsuppressiva, Biologika (Infliximab), OP bei Komplikationen.</p>
    <p><strong>Ernährung</strong>: leichte Kost, ballaststoffarm im Schub.</p>`,
    questions: [
      { q: "Befallsmuster bei M. Crohn:", a: ["Kontinuierlich, nur Rektum","Diskontinuierlich, 'Skip lesions'","Nur Colon","Nur Ösophagus"], correct: 1, explain: "Segmentaler, diskontinuierlicher Befall im ganzen GI-Trakt." },
      { q: "Welches Zeichen ist typisch für Crohn (vs. Colitis)?", a: ["Blutige Durchfälle","Fisteln und Stenosen","Befall nur im Kolon","Rektumbefall obligat"], correct: 1, explain: "Fisteln, Stenosen, Granulome sind typisch Crohn." },
      { q: "Welche Medikation wird bei akutem Schub eingesetzt?", a: ["Antibiotika primär","Kortikosteroide","Metformin","Protonenpumpenhemmer"], correct: 1, explain: "Systemisches oder topisches Kortison im Schub." }
    ],
    flashcards: [
      { front: "Crohn-Befall", back: "Gesamter GIT, diskontinuierlich, transmural, Ileum-Fokus" },
      { front: "Crohn-Komplikationen", back: "Fisteln · Stenosen · Abszesse · Malabsorption" },
      { front: "Crohn-Biopsie-Merkmal", back: "Epitheloidzellgranulome (nicht verkäsend)" }
    ]
  },

  colitis_ulcerosa: {
    title: "Colitis Ulcerosa", category: "innere",
    intro: "CED mit <em>kontinuierlichem</em>, auf Rektum und Kolon begrenztem Befall, beschränkt auf Mukosa/Submukosa.",
    content: `<p><strong>Symptome</strong>: <em>blutig-schleimige</em> Durchfälle (bis 20×/Tag!), Tenesmen, Bauchschmerz links, Anämie, Gewichtsverlust.</p>
    <p><strong>Diagnostik</strong>: Koloskopie (kontinuierliche Entzündung, Ulzerationen, Pseudopolypen), Biopsie.</p>
    <p><strong>Therapie</strong>: 5-ASA (Mesalazin), Kortison, Immunsuppressiva, Biologika. <em>Heilung durch Proktokolektomie möglich.</em></p>
    <p><strong>Komplikationen</strong>: toxisches Megakolon, Perforation, <em>Kolonkarzinom-Risiko</em> erhöht → regelm. Koloskopie.</p>
    <p><strong>Pflege</strong>: Bilanzierung, Haut um Anus schützen, Ernährung anpassen, psychische Begleitung.</p>`,
    questions: [
      { q: "Typischer Stuhl bei Colitis ulcerosa:", a: ["Unblutig-wässrig","Blutig-schleimig","Fettig","Schwarz-teerig"], correct: 1, explain: "Blutig-schleimig, bis zu 20× täglich." },
      { q: "Welche Aussage stimmt?", a: ["CU befällt Dünndarm","CU befällt Kolon kontinuierlich vom Rektum aufwärts","CU ist nicht heilbar durch OP","CU befällt transmural"], correct: 1, explain: "Kontinuierlich vom Rektum aufsteigend, nur Mukosa/Submukosa." },
      { q: "CU-Risiko langfristig:", a: ["Magenkarzinom","Kolonkarzinom","Lebermetastasen","Thrombose"], correct: 1, explain: "Deutlich erhöhtes Kolonkarzinomrisiko." }
    ],
    flashcards: [
      { front: "CU-Befall", back: "Kontinuierlich, Rektum → proximal, nur Mukosa/Submukosa" },
      { front: "Basistherapie CU", back: "5-ASA (Mesalazin) · Kortison im Schub" },
      { front: "CU vs. Crohn Stichwort", back: "CU: blutig, kontinuierlich · Crohn: Fisteln, Skip lesions" }
    ]
  },

  darmkrebs: {
    title: "Kolorektales Karzinom", category: "onko",
    intro: "Zweithäufigster bösartiger Tumor in Deutschland. Meist Adenokarzinom aus Adenom-Karzinom-Sequenz.",
    content: `<p><strong>Risikofaktoren</strong>: Alter, fleisch-/fettreiche Ernährung, ballaststoffarm, Rauchen, Alkohol, Adipositas, Bewegungsmangel, CED, familiäre Belastung (Lynch-Syndrom, FAP).</p>
    <p><strong>Symptome</strong>: <em>spät</em>! Blut im Stuhl, Stuhlunregelmäßigkeiten, Bleistiftstuhl, Gewichtsverlust, Anämie, Ileus.</p>
    <p><strong>Screening</strong>: iFOBT ab 50, Koloskopie ab 50 (Frauen) bzw. 50 (Männer), alle 10 Jahre.</p>
    <p><strong>Therapie</strong>: OP (Hemikolektomie, Rektumresektion), Chemo (FOLFOX), ggf. Radiatio, ggf. Stoma.</p>
    <p><strong>Pflege</strong>: Stomapflege, Ernährungsberatung, psychoonkologische Begleitung.</p>`,
    questions: [
      { q: "Ab welchem Alter Darmkrebs-Screening (Koloskopie)?", a: ["40","45","50","60"], correct: 2, explain: "Ab 50 Jahren, alle 10 Jahre." },
      { q: "Alarmsymptom ist:", a: ["Gelegentliches Sodbrennen","Sichtbares Blut im Stuhl","Kopfschmerzen","Husten"], correct: 1, explain: "Blut ist immer abklärungsbedürftig." },
      { q: "Adenom-Karzinom-Sequenz bedeutet:", a: ["Aus Polypen kann Krebs entstehen","Krebs kommt plötzlich","Chemotherapie muss sequenziell erfolgen","Nur bei Diabetikern"], correct: 0, explain: "Adenome sind Vorstufen – rechtzeitig entfernen!" }
    ],
    flashcards: [
      { front: "Darmkrebs-Screening", back: "iFOBT ab 50; Koloskopie ab 50, alle 10 Jahre" },
      { front: "Alarmsymptom", back: "Sichtbares Blut im Stuhl" },
      { front: "Adenom-Karzinom-Sequenz", back: "Adenom → Dysplasie → Karzinom" }
    ]
  },

  obstipation: {
    title: "Obstipation & Stuhlprobleme", category: "pflegeprozess",
    intro: "Obstipation: Stuhlfrequenz < 3/Woche, harter Stuhl, starkes Pressen, Gefühl unvollständiger Entleerung.",
    content: `<p><strong>Ursachen</strong>: Bewegungsmangel, zu wenig Flüssigkeit/Ballaststoffe, Medikamente (Opioide, Eisen, Anticholinergika), Alter, Darmerkrankung, psychisch.</p>
    <p><strong>Pflegerische Prophylaxe</strong>: Bewegung, Ballaststoffe, Flüssigkeit (≥ 1,5–2 l), feste Zeiten, Intimsphäre, Bauchmassage (im Uhrzeigersinn).</p>
    <p><strong>Stufenplan (WHO)</strong>:
    <ol>
      <li>Lebensstil, Quellmittel (Leinsamen, Flohsamen)</li>
      <li>Osmotische Laxantien (Macrogol, Laktulose)</li>
      <li>Stimulanzien (Bisacodyl, Senna)</li>
      <li>Prokinetika</li>
    </ol></p>
    <p><strong>Diarrhoe</strong>: >3 Stühle/Tag, wässrig. Gefahr Dehydratation, Exsikkose, Elektrolytentgleisung. Pflege: Flüssigkeit, Hautpflege, Isolation bei Noro/Clostridien.</p>
    <p><strong>Bristol-Stuhlskala</strong>: 1 (Kotballen) – 7 (flüssig).</p>`,
    questions: [
      { q: "Opioide verursachen typischerweise:", a: ["Diarrhoe","Obstipation","Blähungen","Nichts"], correct: 1, explain: "Opioide verlangsamen die Darmpassage → Obstipation." },
      { q: "Erste Stufe Obstipationstherapie:", a: ["Bisacodyl","Lebensstil + Quellmittel","Einlauf","OP"], correct: 1, explain: "Bewegung, Trinken, Ballaststoffe + Quellmittel." },
      { q: "Bristol-Stuhlskala Typ 1 bedeutet:", a: ["Wässrig","Harte Ballen","Weich-breiig","Glatt-wurstförmig"], correct: 1, explain: "Typ 1 = harte Kotballen (Obstipation)." }
    ],
    flashcards: [
      { front: "Obstipation", back: "< 3 Stühle/Woche, hart, Pressen" },
      { front: "WHO-Stufe 1", back: "Lebensstil + Quellmittel (Flohsamen, Leinsamen)" },
      { front: "Bauchmassage", back: "Im Uhrzeigersinn – folgt Dickdarmverlauf" }
    ]
  }

  ,

  /* ===================== PÄDIATRIE / GYN ===================== */
  vers_neugeborener: {
    title: "Versorgung des Neugeborenen", category: "paed",
    intro: "Direkt nach der Geburt: Wärmeerhalt, Atmung sichern, APGAR, U1, Vitamin-K-Prophylaxe, Nabelpflege, Bonding.",
    content: `<p><strong>Erste Maßnahmen (goldenes Stündchen)</strong>:
    <ul>
      <li>Abtrocknen, auf nackte Brust der Mutter (Bonding, Wärme)</li>
      <li>Absaugen nur bei Notwendigkeit</li>
      <li>APGAR 1./5./10. Min.</li>
      <li>Nabelabklemmung (spätes Abnabeln empfohlen)</li>
      <li>U1 nach Geburt, U2 3.–10. LT</li>
      <li>Vitamin-K-Prophylaxe (U1, U2, U3) – Blutungsprophylaxe</li>
      <li>Credé-Prophylaxe (Augensalbe, umstritten)</li>
    </ul></p>
    <p><strong>Reifezeichen</strong>: Geburtsgewicht 2500–4500 g, Länge 48–54 cm, KU 33–37 cm, Haut rosig, Hoden beidseits deszendiert, Fingernägel bis Fingerspitzen, Brustdrüsenknospe.</p>
    <p><strong>Wärmeerhalt</strong>: Neugeborene kühlen schnell aus (große Körperoberfläche, wenig Fett)!</p>`,
    questions: [
      { q: "Wann wird die U1 durchgeführt?", a: ["Erste Lebensstunde","3.–10. Lebenstag","4.–6. Woche","3. Monat"], correct: 0, explain: "U1 direkt nach der Geburt im Kreißsaal." },
      { q: "Warum Vitamin-K-Prophylaxe?", a: ["Gegen Infektion","Zur Blutungsprophylaxe","Gegen Gelbsucht","Gegen Rachitis"], correct: 1, explain: "Vorbeugung Morbus haemorrhagicus neonatorum." },
      { q: "Warum ist Wärmeerhalt zentral?", a: ["Neugeborene sind überhitzt","Große KOF + wenig Fett → rasche Auskühlung","Sie schwitzen stark","Nicht wichtig"], correct: 1, explain: "Verhältnis Oberfläche/Masse hoch + wenig subkutanes Fett." }
    ],
    flashcards: [
      { front: "U1–U3 Zeitpunkte", back: "U1 post partum · U2 3.–10. LT · U3 4.–6. LW" },
      { front: "Vit. K – wozu?", back: "Vorbeugung M. haemorrhagicus (Blutungen)" },
      { front: "Normales Geburtsgewicht", back: "2500–4500 g" }
    ]
  },

  apgar: {
    title: "APGAR & U-Untersuchungen", category: "paed",
    intro: "APGAR-Score von Virginia Apgar: Vitalitätseinschätzung des Neugeborenen in Minute 1, 5 und 10. Je 0–2 Punkte pro Kriterium, max. 10.",
    content: `<p><strong>APGAR-Kriterien (A-P-G-A-R):</strong></p>
    <ul>
      <li><strong>A – Atmung</strong>: 0 keine / 1 unregelmäßig / 2 regelmäßig, kräftig</li>
      <li><strong>P – Puls</strong>: 0 kein / 1 &lt;100 / 2 &gt;100</li>
      <li><strong>G – Grundtonus</strong>: 0 schlaff / 1 wenig / 2 gut</li>
      <li><strong>A – Aussehen</strong>: 0 blau/blass / 1 Stamm rosig, Akren blau / 2 rosig</li>
      <li><strong>R – Reflexe</strong>: 0 keine / 1 Grimassieren / 2 Schreien</li>
    </ul>
    <p><strong>Bewertung</strong>: 9–10 optimal · 7–8 gut · 4–6 Überwachung · &lt;4 Notfall.</p>
    <p><strong>Vorsorgeuntersuchungen U1–U9</strong>: U1 (Geburt), U2 (3.–10. LT), U3 (4.–6. LW), U4 (3.–4. LM), U5 (6.–7. LM), U6 (10.–12. LM), U7 (21.–24. LM), U7a (34.–36. LM), U8 (46.–48. LM), U9 (5 J.), J1 (12–14 J.).</p>`,
    questions: [
      { q: "Was bedeutet 'A' bei APGAR?", a: ["Alter","Atmung und Aussehen","Aktivität","Augen"], correct: 1, explain: "2× A: Atmung und Aussehen (Hautkolorit)." },
      { q: "Wann wird der APGAR gemessen?", a: ["Sofort, nach 5, 10 Min","Nur 1 mal","Nach 1 Stunde","Täglich"], correct: 0, explain: "Standardmäßig 1., 5. und 10. Lebensminute." },
      { q: "Maximale Punktzahl:", a: ["6","8","10","12"], correct: 2, explain: "5 Kriterien × 2 Punkte = 10." }
    ],
    flashcards: [
      { front: "APGAR", back: "Atmung · Puls · Grundtonus · Aussehen · Reflexe" },
      { front: "Messzeitpunkte", back: "1., 5., 10. Lebensminute" },
      { front: "U3", back: "4.–6. Lebenswoche" }
    ]
  },

  neurodermitis: {
    title: "Neurodermitis (atopische Dermatitis)", category: "innere",
    intro: "Chronische, schubförmige Hauterkrankung mit starkem Juckreiz. Teil des atopischen Formenkreises (mit Asthma, Heuschnupfen).",
    content: `<p><strong>Symptome</strong>: trockene Haut, Ekzeme, Juckreiz, Kratzspuren, Beugen (Ellbeugen, Kniekehlen), bei Säuglingen Gesicht/Kopf ("Milchschorf").</p>
    <p><strong>Auslöser</strong>: Allergene, Stress, Wolle, Schwitzen, Infekte, Waschmittel.</p>
    <p><strong>Therapie</strong>: Basistherapie mit rückfettenden Salben (auch im beschwerdefreien Intervall), im Schub topische Kortikoide oder Calcineurininhibitoren, Antihistaminika, UV-Therapie.</p>
    <p><strong>Pflege/Eltern-Beratung</strong>: lauwarm duschen, rückfetten direkt nach dem Bad, Baumwollkleidung, Fingernägel kurz, Kratzalternativen anbieten, Schlafhygiene.</p>`,
    questions: [
      { q: "Neurodermitis gehört zum Formenkreis:", a: ["Kollagenosen","Atopisch","Vaskulitiden","Gewebstumoren"], correct: 1, explain: "Atopischer Formenkreis: Ekzem, Heuschnupfen, Asthma." },
      { q: "Säuglinge zeigen oft:", a: ["Nur Juckreiz","Milchschorf im Gesicht","Hautblasen am Rücken","Pigmentstörungen"], correct: 1, explain: "Milchschorf im Gesicht/Kopf im Säuglingsalter." },
      { q: "Basistherapie besteht aus:", a: ["Ständiger Kortisongabe","Rückfettenden Salben, auch ohne Schub","Antibiotikacreme","Nur homöopathisch"], correct: 1, explain: "Rückfettende Pflege ist Grundlage der Behandlung." }
    ],
    flashcards: [
      { front: "Atopische Trias", back: "Neurodermitis · Heuschnupfen · Asthma" },
      { front: "Basistherapie", back: "Rückfettende Pflege – auch im Intervall!" },
      { front: "Prädilektionsstellen Kind", back: "Beugen (Ellbeugen, Kniekehlen), Gesicht im Säuglingsalter" }
    ]
  },

  perzentile: {
    title: "Perzentile (!)", category: "paed",
    intro: "Perzentilenkurven zeigen, wo sich ein Kind im Vergleich zur Normbevölkerung bei Gewicht, Länge, Kopfumfang befindet.",
    content: `<p><strong>Grundlagen</strong>:
    <ul>
      <li>Die <em>n-te Perzentile</em> = n% der Kinder liegen darunter.</li>
      <li>50. Perzentile = Median (50% darunter, 50% darüber).</li>
      <li>Normbereich: 3. bis 97. Perzentile.</li>
      <li>Wichtig ist vor allem der <em>Verlauf</em>, nicht der einzelne Wert.</li>
    </ul></p>
    <p><strong>Auffälligkeiten</strong>:
    <ul>
      <li>Unter 3. Perzentile → Dystrophie/Mangel/Kleinwuchs</li>
      <li>Über 97. → Makrosomie/Adipositas</li>
      <li>Sprung über 2 Hauptperzentilen → weitere Abklärung</li>
    </ul></p>
    <p><strong>Dokumentation</strong>: U-Heft – bei jeder Vorsorge eintragen.</p>`,
    questions: [
      { q: "Was bedeutet 'Kind liegt auf der 10. Perzentile'?", a: ["10% der Kinder sind größer","10% der Kinder sind gleich/kleiner","10% aller Werte sind normal","Das Kind ist krank"], correct: 1, explain: "10% liegen darunter (oder gleich), 90% darüber." },
      { q: "Welcher Bereich gilt als normal?", a: ["10.–90.","3.–97.","25.–75.","0.–100."], correct: 1, explain: "Konvention: 3.–97. Perzentile." },
      { q: "Wichtiger als einzelner Wert ist:", a: ["Der Verlauf über Zeit","Nur die Größe","Nur das Gewicht","Das Alter der Eltern"], correct: 0, explain: "Trend/Verlauf über mehrere Messungen ist entscheidend." }
    ],
    flashcards: [
      { front: "Normbereich Perzentile", back: "3. bis 97. Perzentile" },
      { front: "50. Perzentile", back: "Median – 50% liegen darüber, 50% darunter" },
      { front: "Warnzeichen", back: "Abweichen um mehr als 2 Perzentilen" }
    ]
  },

  frakturen: {
    title: "Frakturen", category: "innere",
    intro: "Knochenbruch – vollständige oder unvollständige Unterbrechung der Knochenkontinuität. Traumatisch oder pathologisch.",
    content: `<p><strong>Einteilung</strong>:
    <ul>
      <li>geschlossen / offen (Kontakt zur Haut)</li>
      <li>Grünholz (Kind), Trümmer, Spiral, Quer, Schräg</li>
      <li>disloziert / nicht disloziert</li>
    </ul></p>
    <p><strong>Sichere Frakturzeichen</strong>: abnorme Beweglichkeit, Fehlstellung, Krepitation, sichtbare Knochenenden.</p>
    <p><strong>Unsichere Zeichen</strong>: Schmerz, Schwellung, Hämatom, Funktionsverlust.</p>
    <p><strong>Therapie</strong>: Ruhigstellen, Analgesie, Schockprophylaxe, konservativ (Gips) oder OP (Osteosynthese).</p>
    <p><strong>Schenkelhalsfraktur</strong>: typisch alte Frau nach Sturz, Bein verkürzt und außenrotiert. Schnell-OP (TEP/DHS) wg. Immobilitätsfolgen. </p>
    <p><strong>Komplikationen</strong>: Thrombose, Pneumonie, Dekubitus, Kompartmentsyndrom, Pseudarthrose, Osteomyelitis.</p>`,
    questions: [
      { q: "Sicheres Frakturzeichen:", a: ["Schmerz","Schwellung","Krepitation","Hämatom"], correct: 2, explain: "Sichere Zeichen: Fehlstellung, abnorme Beweglichkeit, Krepitation, sichtbare Knochenteile." },
      { q: "Schenkelhalsfraktur – Beinhaltung:", a: ["Gestreckt, Innenrotation","Verkürzt und außenrotiert","Verlängert und innenrotiert","Normal"], correct: 1, explain: "Klassisch: verkürzt und nach außen rotiert." },
      { q: "Welche Komplikation ist am häufigsten bei älteren Patienten nach Fraktur?", a: ["Hyperthyreose","Thrombose, Pneumonie durch Immobilität","Kleinwuchs","Katarakt"], correct: 1, explain: "Immobilitätsfolgen sind Hauptrisiko." }
    ],
    flashcards: [
      { front: "Sichere Frakturzeichen", back: "Fehlstellung · abnorme Beweglichkeit · Krepitation · sichtbarer Knochen" },
      { front: "Schenkelhals-Zeichen", back: "Bein verkürzt + außenrotiert" },
      { front: "Schnell-OP wegen", back: "Immobilität → Thrombose, Pneumonie, Dekubitus" }
    ]
  },

  schwangerschaft: {
    title: "Schwangerschaft", category: "paed",
    intro: "Dauer: 40 SSW (280 Tage post menstruationem) oder 38 Wochen post conceptionem. Einteilung in 3 Trimena.",
    content: `<p><strong>Sichere Zeichen</strong>: fetale Herzaktion (Doppler ab 10. SSW), Kindsbewegungen, sichtbare Kindsteile.</p>
    <p><strong>Unsichere</strong>: Ausbleiben der Regel, Übelkeit, Brustspannen, Müdigkeit.</p>
    <p><strong>Vorsorge (Mutterschutzrichtlinien)</strong>: alle 4 Wochen, ab 32. SSW alle 2 Wo. Inhalt: Gewicht, RR, Urin, Herztöne, Fundusstand, Ultraschall (3×).</p>
    <p><strong>Risikoschwangerschaften</strong>: &lt;18 oder &gt;35 J, Diabetes, Hypertonie, Mehrlinge, Präeklampsie-Symptome.</p>
    <p><strong>Mutterpass</strong>: Dokumentation aller Befunde, ist immer mitzuführen.</p>
    <p><strong>Präeklampsie (Gestose)</strong>: RR&gt;140/90, Proteinurie, Ödeme – Notfall: Eklampsie (Krampfanfall). HELLP-Syndrom: Hämolyse, Enzymanstieg, Thrombopenie.</p>`,
    questions: [
      { q: "Wie viele SSW hat eine reguläre Schwangerschaft?", a: ["36","40","42","44"], correct: 1, explain: "40 SSW post menstruationem = 280 Tage." },
      { q: "HELLP-Syndrom ist:", a: ["Hormonelle Störung","Schwere Form der Gestose mit Hämolyse, Leberenzymen, Thrombopenie","Schwangerschafts-Diabetes","Dauerübelkeit"], correct: 1, explain: "Hemolysis, Elevated Liver enzymes, Low Platelets – Notfall." },
      { q: "Wie viele Ultraschalluntersuchungen sind Standard?", a: ["1","3","5","10"], correct: 1, explain: "3 Basis-US in 9., 20., 30. SSW." }
    ],
    flashcards: [
      { front: "SSW-Dauer", back: "40 SSW = 280 Tage (post menstruationem)" },
      { front: "Gestose-Trias (Präeklampsie)", back: "Hypertonie + Proteinurie + (Ödeme)" },
      { front: "HELLP", back: "Hämolyse, erhöhte Leberenzyme, Thrombopenie" }
    ]
  },

  wochenbett: {
    title: "Wochenbett", category: "paed",
    intro: "Zeitraum von der Geburt bis ca. 6–8 Wochen danach. Rückbildung, Stillbeginn, psychische Anpassung.",
    content: `<p><strong>Frühwochenbett</strong>: Tag 1–10. <strong>Spätwochenbett</strong>: bis 6.–8. Woche.</p>
    <p><strong>Lochien</strong> (Wochenfluss):
    <ul>
      <li>Tag 1–4: Lochia rubra (blutig)</li>
      <li>Tag 5–9: Lochia fusca (bräunlich)</li>
      <li>Ab Tag 10: Lochia flava (gelblich)</li>
      <li>Ab 3. Woche: Lochia alba (weißlich), Ende ca. 6. Woche</li>
    </ul></p>
    <p><strong>Uterusrückbildung</strong>: Fundus nach Geburt auf Nabelhöhe, sinkt täglich ca. 1 QF.</p>
    <p><strong>Stillen</strong>: Prolaktin (Bildung), Oxytocin (Ausstoß). Kolostrum → Übergangsmilch → reife Milch.</p>
    <p><strong>Gefahren</strong>: Wochenbettdepression („Baby Blues" bei 50–80%, Wochenbettdepression bis 20%), Endomyometritis (Fieber, übelriechende Lochien), Thrombose.</p>`,
    questions: [
      { q: "Lochia rubra bedeutet:", a: ["Weißer Wochenfluss","Blutiger Wochenfluss Tag 1–4","Gelber Wochenfluss","Eiter"], correct: 1, explain: "Rubra = blutig, erste Tage." },
      { q: "Welches Hormon sorgt für Milchbildung?", a: ["Östrogen","Progesteron","Prolaktin","Oxytocin"], correct: 2, explain: "Prolaktin bildet Milch, Oxytocin treibt sie aus." },
      { q: "Nach wie vielen Wochen endet das Wochenbett?", a: ["2","6–8","12","26"], correct: 1, explain: "Ca. 6–8 Wochen bis zur Rückbildung." }
    ],
    flashcards: [
      { front: "Lochien-Farben", back: "Rubra → Fusca → Flava → Alba" },
      { front: "Milchbildung-Hormon", back: "Prolaktin" },
      { front: "Milchspende-Hormon", back: "Oxytocin" }
    ]
  },

  zyklus: {
    title: "Menstruationszyklus", category: "paed",
    intro: "Durchschnittliche Dauer 28 Tage (21–35 normal). Gesteuert durch Hypothalamus–Hypophyse–Ovar-Achse.",
    content: `<p><strong>Phasen</strong>:
    <ol>
      <li><strong>Menstruation</strong> (Tag 1–5): Abstoßen der Schleimhaut</li>
      <li><strong>Proliferationsphase / Follikelphase</strong> (bis ~14. Tag): Östrogen↑, Follikelreifung</li>
      <li><strong>Ovulation</strong> (ca. 14. Tag): LH-Peak → Eisprung</li>
      <li><strong>Sekretionsphase / Lutealphase</strong> (14.–28. Tag): Gelbkörper → Progesteron↑</li>
    </ol></p>
    <p><strong>Hormone</strong>: GnRH → FSH / LH → Östrogen / Progesteron.</p>
    <p><strong>Zyklusstörungen</strong>: Amenorrhoe, Oligomenorrhoe, Menorrhagie (stark/lang), Dysmenorrhoe (schmerzhaft).</p>`,
    questions: [
      { q: "Wann findet der Eisprung typischerweise statt?", a: ["Tag 1","Tag 7","Tag 14","Tag 28"], correct: 2, explain: "Beim 28-Tage-Zyklus ca. Tag 14." },
      { q: "Welches Hormon ist in der Lutealphase dominant?", a: ["Östrogen","Progesteron","FSH","LH"], correct: 1, explain: "Gelbkörper bildet Progesteron." },
      { q: "Menorrhagie bedeutet:", a: ["Ausbleibende Regel","Verstärkte/verlängerte Regel","Schmerzhafte Regel","Zwischenblutung"], correct: 1, explain: "Menorrhagie = zu stark und/oder zu lang." }
    ],
    flashcards: [
      { front: "Zyklus-Dauer normal", back: "21–35 Tage, Mittel 28" },
      { front: "LH-Peak", back: "Ca. Tag 14 → Ovulation" },
      { front: "Progesteron-Quelle", back: "Corpus luteum (Gelbkörper)" }
    ]
  }

  ,

  /* ===================== PFLEGEWISSENSCHAFT / QM ===================== */
  beratung: {
    title: "Beratung in der Pflege", category: "pflegewiss",
    intro: "Strukturierter, lösungsorientierter Kommunikationsprozess zur Unterstützung von Patienten/Angehörigen bei Entscheidungen und Selbstmanagement.",
    content: `<p><strong>Ziel</strong>: Empowerment, Adhärenz, Selbstpflegefähigkeit stärken.</p>
    <p><strong>Beratungsarten</strong>:
    <ul>
      <li><em>Informations-Beratung</em>: Sachinfos (z. B. Insulininjektion)</li>
      <li><em>Schulung</em>: Wissensvermittlung mit Übung (z. B. Diabetesschulung)</li>
      <li><em>Anleitung</em>: Handlungsschritte zeigen, begleiten</li>
      <li><em>Psychosoziale Beratung</em>: Krankheitsbewältigung</li>
    </ul></p>
    <p><strong>Phasen nach WHO/SDM</strong>: Auftragsklärung – Informationssammlung – Zieldefinition – Maßnahmenplan – Evaluation.</p>
    <p><strong>§ 37 SGB V</strong>: Pflegeberatung ist eigenständige Leistung. Expertenstandard "Entlassungsmanagement" fordert strukturierte Beratung.</p>`,
    questions: [
      { q: "Beratung ≠ Anleitung. Anleitung umfasst:", a: ["Nur Informationsweitergabe","Handlungsschritte zeigen und üben","Therapieentscheidung","Medikamentenverordnung"], correct: 1, explain: "Anleitung = Vormachen, Üben, Evaluieren." },
      { q: "Zielrichtung pflegerischer Beratung:", a: ["Autoritäre Anweisung","Empowerment / Selbstpflegefähigkeit","Verordnen","Diagnose stellen"], correct: 1, explain: "Ziel ist Stärkung der Selbständigkeit." },
      { q: "Welche Phase steht am Anfang?", a: ["Evaluation","Auftragsklärung","Maßnahmenplan","Dokumentation"], correct: 1, explain: "Zuerst: Anliegen/Ziel klären." }
    ],
    flashcards: [
      { front: "Beratungsarten", back: "Info · Schulung · Anleitung · psychosoz. Beratung" },
      { front: "Beratungs-Ziel", back: "Empowerment – Selbstpflegefähigkeit stärken" },
      { front: "Gesetzl. Grundlage", back: "§ 37 SGB V (Pflegeberatung), Expertenstandard Entlassungsmanagement" }
    ]
  },

  beobachtungsprozess: {
    title: "Beobachtungsprozess", category: "pflegeprozess",
    intro: "Systematische, zielgerichtete Wahrnehmung von Pflegebedürftigen. Grundlage für Pflegeanamnese, Diagnostik und Therapie.",
    content: `<p><strong>Arten der Beobachtung</strong>:
    <ul>
      <li>direkt vs. indirekt</li>
      <li>gezielt vs. spontan</li>
      <li>strukturiert vs. unstrukturiert</li>
    </ul></p>
    <p><strong>Beobachtungskriterien</strong>: Haut, Atmung, Puls, BD, Bewusstsein, Ernährung, Ausscheidung, Schmerz, Mobilität, Psyche.</p>
    <p><strong>Fehlerquellen</strong>: Halo-Effekt, Primacy/Recency, Voreingenommenheit, Tagesform, Selektive Wahrnehmung.</p>
    <p><strong>Dokumentation</strong>: sachlich, objektiv, zeitnah, wertfrei – unterscheiden zwischen <em>Beobachtung</em> (was sehe ich?) und <em>Interpretation</em> (was bedeutet das?).</p>`,
    questions: [
      { q: "Halo-Effekt bedeutet:", a: ["Licht-Artefakt","Ein Gesamteindruck überstrahlt Einzelmerkmale","Sturzrisiko","Fehldiagnose"], correct: 1, explain: "Erster Eindruck beeinflusst weitere Wahrnehmung." },
      { q: "Welche Dokumentation ist angemessen?", a: ["'Patient ist launisch'","'Patient antwortet einsilbig, wendet sich ab'","'Typisch Montag'","'Nervig'"], correct: 1, explain: "Sachliche Beobachtung ohne Wertung." },
      { q: "Unterschied Beobachtung vs. Interpretation:", a: ["Gleich","Beobachtung = Fakt, Interpretation = Deutung","Beobachtung = Deutung","Gibt es nicht"], correct: 1, explain: "Erst beobachten, dann interpretieren – getrennt!" }
    ],
    flashcards: [
      { front: "Halo-Effekt", back: "Ein Merkmal überstrahlt andere Wahrnehmungen" },
      { front: "Doku-Prinzip", back: "Sachlich · objektiv · wertfrei · zeitnah" },
      { front: "Fehlerquelle Primacy", back: "Erster Eindruck wirkt überproportional" }
    ]
  },

  anleitung: {
    title: "Anleitung", category: "pflegewiss",
    intro: "Zielgerichteter Lehr-/Lernprozess, bei dem der Lernende selbst aktiv handelt. Methode der Wahl für handlungsbezogene Fertigkeiten (z. B. Insulingabe).",
    content: `<p><strong>4-Stufen-Methode (nach Peyton)</strong>:
    <ol>
      <li><em>Vormachen</em> in Echtzeit</li>
      <li><em>Erklären</em> – Schritte kommentieren</li>
      <li><em>Nachmachen lassen</em> – Lernender erklärt, Anleiter macht</li>
      <li><em>Selbst durchführen</em> – Lernender macht und erklärt</li>
    </ol></p>
    <p><strong>Grundsätze</strong>: Lernziel klar, individuelle Voraussetzungen berücksichtigen, Feedback, Wiederholung, positive Verstärkung.</p>`,
    questions: [
      { q: "Welche Stufe kommt in Peytons Modell zuletzt?", a: ["Erklären","Vormachen","Selbst durchführen und erklären","Nachmachen lassen"], correct: 2, explain: "Stufe 4: Lernender führt selbst aus und erklärt." },
      { q: "Anleitung ≠ Schulung weil…", a: ["…Anleitung praktisch ist","…Schulung schriftlich","…Schulung keinen Praxisteil hat","…Anleitung nur Ärztlich"], correct: 0, explain: "Anleitung fokussiert auf praktisches Tun." },
      { q: "Wichtig ist:", a: ["Zeitdruck","Feedback geben und wiederholen","Alles in 1 Sitzung","Nur schriftlich"], correct: 1, explain: "Feedback + Wiederholung sind zentral." }
    ],
    flashcards: [
      { front: "Peyton-4-Schritt", back: "Vormachen · Erklären · Lernender erklärt/Anleiter macht · Lernender macht & erklärt" },
      { front: "Anleitungs-Prinzip", back: "Lernender aktiv · individuelle Ziele · Feedback · Wiederholung" }
    ]
  },

  qm: {
    title: "Qualitätsmanagement (QM)", category: "pflegewiss",
    intro: "Systematisches Vorgehen zur Sicherung und Steigerung der Pflegequalität. Gesetzlich verankert: § 113 SGB XI, § 135a SGB V.",
    content: `<p><strong>Qualitätsdimensionen (Donabedian)</strong>:
    <ul>
      <li><strong>Strukturqualität</strong>: Rahmenbedingungen (Personal, Räume, Material)</li>
      <li><strong>Prozessqualität</strong>: Ablauf der Leistungserbringung (Standards, Doku)</li>
      <li><strong>Ergebnisqualität</strong>: Ergebnis (Outcome: Dekubitus-Rate, Zufriedenheit)</li>
    </ul></p>
    <p><strong>PDCA-Zyklus (Deming)</strong>: Plan – Do – Check – Act (KVP).</p>
    <p><strong>Instrumente</strong>: Audits, Standards, Fehlermeldung (CIRS), Kundenbefragungen, Kennzahlen, MDK-Prüfungen, Expertenstandards.</p>`,
    questions: [
      { q: "Das Bett ist schlecht erreichbar. Welche Qualitätsdimension?", a: ["Struktur","Prozess","Ergebnis","Outcome"], correct: 0, explain: "Räumliche Ausstattung = Struktur." },
      { q: "PDCA steht für:", a: ["Plan-Do-Check-Act","Prüfen-Dokumentieren-Controlling-Analyse","Patient-Doktor-Care-Act","Planung-Durchführung-Checkliste-Abschluss"], correct: 0, explain: "Deming-Zyklus Plan-Do-Check-Act." },
      { q: "Dekubitusrate ist eine Kennzahl der …", a: ["Strukturqualität","Prozessqualität","Ergebnisqualität","Kommunikation"], correct: 2, explain: "Ergebnisqualität – Outcome." }
    ],
    flashcards: [
      { front: "3 Q-Dimensionen", back: "Struktur · Prozess · Ergebnis (Donabedian)" },
      { front: "PDCA-Zyklus", back: "Plan – Do – Check – Act" },
      { front: "CIRS", back: "Critical Incident Reporting System – Fehlermeldesystem" }
    ]
  },

  pflegestuetzpunkt: {
    title: "Pflegestützpunkt", category: "sozialrecht",
    intro: "Anlaufstelle nach § 7c SGB XI: kostenfreie, trägerneutrale Beratung zu allem rund um Pflege. Eingerichtet durch Pflege- und Krankenkassen.",
    content: `<p><strong>Aufgaben</strong>:
    <ul>
      <li>Information zu Leistungen der Pflege- und Krankenversicherung</li>
      <li>Beratung zu Hilfsmitteln, Wohnraumanpassung</li>
      <li>Koordination der Hilfen im Einzelfall (Case Management)</li>
      <li>Unterstützung beim Antragsverfahren</li>
    </ul></p>
    <p><strong>Zielgruppe</strong>: Pflegebedürftige, Angehörige, Interessierte – unabhängig vom Kostenträger.</p>
    <p><strong>Abgrenzung zu § 7a SGB XI</strong>: Pflegeberatung ist <em>individuelle</em> Beratung durch die Pflegekasse.</p>`,
    questions: [
      { q: "Rechtliche Grundlage Pflegestützpunkt:", a: ["§ 37 SGB V","§ 7c SGB XI","§ 14 SGB XI","§ 113 SGB XI"], correct: 1, explain: "Pflegestützpunkt in § 7c SGB XI." },
      { q: "Was ist der Pflegestützpunkt?", a: ["Kostenpflichtige Beratung","Kostenfreie, trägerneutrale Anlaufstelle","Pflegeheim","Klinik"], correct: 1, explain: "Kostenlos, neutral." },
      { q: "Welche Aufgabe gehört NICHT dazu?", a: ["Beratung","Leistungen bewilligen (MD macht die Begutachtung)","Vermittlung","Koordination"], correct: 1, explain: "Bewilligung erfolgt durch die Pflegekasse nach MD-Begutachtung." }
    ],
    flashcards: [
      { front: "§ 7c SGB XI", back: "Pflegestützpunkt – kostenfreie Beratung" },
      { front: "§ 7a SGB XI", back: "Individueller Pflegeberatungsanspruch" },
      { front: "Zielgruppe", back: "Alle – unabhängig vom Kostenträger" }
    ]
  },

  solidaritaetsprinzip: {
    title: "Solidaritätsprinzip", category: "sozialrecht",
    intro: "Grundprinzip der deutschen Sozialversicherung: Gesunde zahlen für Kranke, Junge für Alte, Starke für Schwache. Gegenprinzip: Äquivalenzprinzip (privat).",
    content: `<p><strong>Umsetzung</strong>: einkommensabhängige Beiträge, gleiches Leistungsrecht unabhängig vom Beitrag. Bedarfsprinzip: Leistung nach Notwendigkeit.</p>
    <p><strong>Sozialversicherungszweige</strong>:
    <ol>
      <li>GKV (Kranken)</li>
      <li>SPV (Pflege)</li>
      <li>GRV (Rente)</li>
      <li>ALV (Arbeitslosen)</li>
      <li>GUV (Unfall)</li>
    </ol></p>
    <p><strong>Weitere Prinzipien</strong>: Selbstverwaltung, Sachleistungsprinzip, Umlagefinanzierung, Versicherungspflicht.</p>`,
    questions: [
      { q: "Gegenstück zum Solidaritätsprinzip:", a: ["Subsidiarität","Äquivalenzprinzip","Föderalismus","Kausalprinzip"], correct: 1, explain: "Äquivalenzprinzip: Beitrag entspricht Risiko (privat)." },
      { q: "Wie viele Sozialversicherungszweige gibt es in D?", a: ["3","4","5","6"], correct: 2, explain: "GKV, SPV, GRV, ALV, GUV." },
      { q: "Umlagefinanzierung bedeutet:", a: ["Jeder spart selbst an","Heutige Beiträge finanzieren heutige Leistungen","Staat zahlt alles","Nur Unternehmen zahlen"], correct: 1, explain: "Generationsvertrag." }
    ],
    flashcards: [
      { front: "Solidaritätsprinzip", back: "Alle füreinander – Beitrag nach Einkommen, Leistung nach Bedarf" },
      { front: "5 SV-Zweige", back: "Kranken · Pflege · Rente · Arbeitslosen · Unfall" },
      { front: "Äquivalenzprinzip", back: "Private Versicherung – Beitrag = Risiko" }
    ]
  },

  krankenhausfinanzierung: {
    title: "Krankenhausfinanzierung", category: "sozialrecht",
    intro: "Duale Finanzierung in Deutschland: Investitionskosten = Länder, Betriebskosten = Krankenkassen (über DRG-Fallpauschalen).",
    content: `<p><strong>Duale Finanzierung (KHG)</strong>:
    <ul>
      <li><em>Investitionen</em> (Bau, Großgeräte) – Bundesländer</li>
      <li><em>Betriebskosten</em> (Personal, Sachkosten) – Krankenkassen über DRG</li>
    </ul></p>
    <p><strong>DRG (Diagnosis Related Groups)</strong>: Fallpauschalen seit 2004. Eine Pauschale pro Fall, unabhängig von Verweildauer.</p>
    <p><strong>Pflegebudget seit 2020</strong>: Pflegepersonalkosten aus DRG ausgegliedert, getrennt verhandelt (Pflegepersonaluntergrenzen PpUGV).</p>`,
    questions: [
      { q: "Wer zahlt Krankenhaus-Investitionen?", a: ["Bund","Bundesländer","Krankenkassen","Patienten"], correct: 1, explain: "Länder zahlen Investitionen (KHG)." },
      { q: "DRG steht für:", a: ["Dauerhafte Regelversorgung","Diagnosis Related Groups","Deutsche Regelverordnung","Diagnose-Register"], correct: 1, explain: "Fallpauschalen nach Diagnosegruppen." },
      { q: "Seit wann gibt es das Pflegebudget?", a: ["2004","2012","2020","1990"], correct: 2, explain: "Pflegepersonal aus DRG ausgegliedert seit 2020." }
    ],
    flashcards: [
      { front: "Duale Finanzierung", back: "Länder: Investitionen · Kassen: Betrieb (DRG)" },
      { front: "DRG", back: "Diagnosis Related Groups – Fallpauschalen" },
      { front: "Pflegebudget", back: "Seit 2020: Pflegepersonal aus DRG ausgegliedert" }
    ]
  },

  leistungstraeger: {
    title: "Leistungsträger (SGB)", category: "sozialrecht",
    intro: "Verschiedene Sozialleistungsträger sind je nach Lebenslage zuständig. Wichtig für Vermittlung & Beratung.",
    content: `<ul>
      <li><strong>SGB I</strong>: Allgemeiner Teil</li>
      <li><strong>SGB II</strong>: Grundsicherung („Bürgergeld") – Jobcenter</li>
      <li><strong>SGB III</strong>: Arbeitsförderung – Agentur für Arbeit</li>
      <li><strong>SGB V</strong>: Gesetzliche Krankenversicherung – Krankenkasse</li>
      <li><strong>SGB VI</strong>: Rentenversicherung</li>
      <li><strong>SGB VII</strong>: Unfallversicherung – Berufsgenossenschaft</li>
      <li><strong>SGB VIII</strong>: Kinder- und Jugendhilfe</li>
      <li><strong>SGB IX</strong>: Reha und Teilhabe</li>
      <li><strong>SGB XI</strong>: Pflegeversicherung</li>
      <li><strong>SGB XII</strong>: Sozialhilfe (Hilfe zur Pflege, wenn SGB XI nicht reicht)</li>
    </ul>`,
    questions: [
      { q: "Pflegeversicherung ist in welchem SGB geregelt?", a: ["V","IX","XI","XII"], correct: 2, explain: "SGB XI = Pflegeversicherung." },
      { q: "Reha und Teilhabe regelt:", a: ["SGB V","SGB VI","SGB IX","SGB XI"], correct: 2, explain: "SGB IX." },
      { q: "Hilfe zur Pflege (wenn Kasse nicht reicht):", a: ["SGB V","SGB XI","SGB XII","SGB VIII"], correct: 2, explain: "Sozialhilfe = SGB XII." }
    ],
    flashcards: [
      { front: "SGB V / XI / IX / XII", back: "V Kranken · XI Pflege · IX Reha · XII Sozialhilfe" },
      { front: "SGB II vs. III", back: "II Bürgergeld (Jobcenter) · III Arbeitsförderung (BfA)" }
    ]
  },

  gesundheitsfoerderung: {
    title: "Gesundheitsförderung & Prävention", category: "pflegewiss",
    intro: "Ottawa-Charta (WHO 1986): Gesundheit ist ein lebensweltlicher Prozess. Ziel: mehr Kontrolle über die eigene Gesundheit.",
    content: `<p><strong>Präventionsstufen</strong>:
    <ul>
      <li><strong>Primär</strong>: vor Krankheit (Impfen, Aufklärung, Bewegung)</li>
      <li><strong>Sekundär</strong>: Früherkennung (Screening, U-Untersuchungen)</li>
      <li><strong>Tertiär</strong>: Rehabilitation, Rezidivvermeidung</li>
    </ul></p>
    <p><strong>Salutogenese (Antonovsky)</strong>: Was hält gesund? Kohärenzgefühl = Verstehbarkeit + Handhabbarkeit + Sinnhaftigkeit.</p>
    <p><strong>Setting-Ansatz</strong>: Gesundheit in Lebenswelten (Kita, Schule, Betrieb).</p>
    <p><strong>Gesetzlich</strong>: Präventionsgesetz 2015, Handlungsfelder (Bewegung, Ernährung, Stress, Sucht).</p>`,
    questions: [
      { q: "Impfen ist:", a: ["Primärprävention","Sekundärprävention","Tertiärprävention","Rehabilitation"], correct: 0, explain: "Primär: verhindert Krankheit." },
      { q: "Antonovsky entwickelte das Konzept:", a: ["Pathogenese","Salutogenese","Pflegediagnose","ICF"], correct: 1, explain: "Salutogenese – was hält gesund?" },
      { q: "Krebsfrüherkennung ist:", a: ["Primär","Sekundär","Tertiär","Kein Präv."], correct: 1, explain: "Früherkennung = Sekundärprävention." }
    ],
    flashcards: [
      { front: "Präventionsstufen", back: "Primär (Impfen) · Sekundär (Screening) · Tertiär (Reha)" },
      { front: "Salutogenese", back: "Antonovsky – Kohärenzgefühl: Verstehbar · Handhabbar · Sinnhaft" },
      { front: "Ottawa-Charta", back: "WHO 1986 – Gesundheitsförderung" }
    ]
  },

  rehabilitation: {
    title: "Rehabilitation", category: "pflegewiss",
    intro: "„Reha vor Pflege.“ Ziel: Wiederherstellung der Teilhabe (nicht nur medizinisch, sondern beruflich/sozial).",
    content: `<p><strong>Arten</strong>:
    <ul>
      <li>Medizinische Reha (SGB V/VI/IX)</li>
      <li>Berufliche Reha („Leistungen zur Teilhabe am Arbeitsleben")</li>
      <li>Soziale Reha</li>
      <li>Pädagogische Reha</li>
    </ul></p>
    <p><strong>Formen</strong>: stationär, teilstationär, ambulant, mobil.</p>
    <p><strong>AHB</strong> (Anschlussheilbehandlung): Innerhalb 14 Tagen nach Klinik.</p>
    <p><strong>ICF</strong>: Klassifikation der Funktionsfähigkeit (Körperfunktion, Aktivität, Teilhabe, Umwelt).</p>`,
    questions: [
      { q: "AHB muss beginnen innerhalb:", a: ["24 h","14 Tagen","3 Monaten","6 Wochen"], correct: 1, explain: "Anschlussheilbehandlung – innerhalb von 14 Tagen." },
      { q: "ICF steht für:", a: ["Internationale Classifikation of Functioning","International Cardiac Failure","Intensive Care Function","Inklusions-Check-Faktor"], correct: 0, explain: "WHO-Modell zur Teilhabe." },
      { q: "Grundsatz:", a: ["Pflege vor Reha","Reha vor Pflege","Nur ambulant","Nur stationär"], correct: 1, explain: "§ 5 SGB XI: Reha vor Pflege." }
    ],
    flashcards: [
      { front: "Reha-Arten", back: "Medizinisch · beruflich · sozial · pädagogisch" },
      { front: "AHB", back: "Anschlussheilbehandlung – innerhalb 14 Tagen" },
      { front: "ICF", back: "WHO-Klassifikation Funktionsfähigkeit & Teilhabe" }
    ]
  },

  pflegeforschung: {
    title: "Pflegeforschung", category: "pflegewiss",
    intro: "Systematische Untersuchung pflegerischer Fragestellungen. Ziel: Evidence-based Nursing.",
    content: `<p><strong>Forschungsarten</strong>:
    <ul>
      <li><em>Quantitativ</em>: Zahlen, Statistik (RCT, Kohorte, Querschnitt)</li>
      <li><em>Qualitativ</em>: Verstehen, Interviews, Grounded Theory</li>
      <li><em>Mixed Methods</em></li>
    </ul></p>
    <p><strong>Evidenzhierarchie</strong> (von hoch nach niedrig):
    <ol>
      <li>Systematische Reviews / Metaanalysen</li>
      <li>RCT (randomisiert kontrolliert)</li>
      <li>Kohortenstudien</li>
      <li>Fall-Kontroll-Studien</li>
      <li>Fallserien, Experten-Meinung</li>
    </ol></p>
    <p><strong>Forschungsprozess</strong>: Fragestellung → Literatur → Hypothese → Design → Ethikvotum → Datenerhebung → Analyse → Publikation.</p>`,
    questions: [
      { q: "Höchste Evidenzstufe:", a: ["Expertenmeinung","RCT","Systematischer Review","Fallbeschreibung"], correct: 2, explain: "Metaanalyse / systematischer Review." },
      { q: "Qualitative Forschung zielt auf:", a: ["Zahlen","Verstehen von Sichtweisen","Labormessungen","Kosten"], correct: 1, explain: "Qualitativ = tiefes Verstehen von Erfahrungen." },
      { q: "RCT bedeutet:", a: ["Routine-Care-Treatment","Randomised Controlled Trial","Real Case Type","Risk Control Test"], correct: 1, explain: "Randomisierte kontrollierte Studie." }
    ],
    flashcards: [
      { front: "Evidenzstufe 1", back: "Systematische Reviews / Metaanalysen" },
      { front: "RCT", back: "Randomised Controlled Trial – Goldstandard" },
      { front: "Quali vs. Quanti", back: "Quali: Verstehen · Quanti: Messen/Zahlen" }
    ]
  },

  fallbesprechungen: {
    title: "Fallbesprechungen", category: "pflegewiss",
    intro: "Strukturierte Besprechung eines konkreten Pflegefalls im multiprofessionellen Team. Ziel: Qualität sichern, Handlungsstrategien entwickeln, Lernen.",
    content: `<p><strong>Formen</strong>:
    <ul>
      <li>Ethische Fallbesprechung</li>
      <li>Kollegiale Fallbesprechung</li>
      <li>Fallbesprechung in der Palliativpflege</li>
    </ul></p>
    <p><strong>Struktur (6-Schritte)</strong>:
    <ol>
      <li>Fallvorstellung</li>
      <li>Zieldefinition</li>
      <li>Analyse (Biografie, aktuelle Situation)</li>
      <li>Hypothesenbildung</li>
      <li>Maßnahmenplan</li>
      <li>Evaluation</li>
    </ol></p>
    <p><strong>Regeln</strong>: Moderation, zeitlicher Rahmen, Dokumentation, Schweigepflicht.</p>`,
    questions: [
      { q: "Ziel einer Fallbesprechung ist NICHT:", a: ["Lernen","Einen Mitarbeiter abmahnen","Qualität sichern","Handlungsstrategien finden"], correct: 1, explain: "Keine Disziplinierungs-Plattform." },
      { q: "Wer leitet klassischerweise:", a: ["Der Arzt","Der Moderator","Der Patient","Die Heimleitung"], correct: 1, explain: "Ein Moderator strukturiert den Ablauf." },
      { q: "Zentraler Schritt am Ende:", a: ["Essen","Evaluation","Urlaubsplanung","Pause"], correct: 1, explain: "Evaluation – was wurde erreicht, was bleibt?" }
    ],
    flashcards: [
      { front: "Fallbesprechung", back: "Strukturierte, multiprof. Besprechung eines Einzelfalls" },
      { front: "Phasen (kurz)", back: "Vorstellung → Ziel → Analyse → Hypothese → Plan → Evaluation" }
    ]
  },

  casemanagement: {
    title: "Casemanagement", category: "pflegewiss",
    intro: "Einzelfallbezogenes Koordinationskonzept: ein Fallmanager begleitet Patienten durch das Versorgungsnetz. Wichtig bei komplexen Fällen.",
    content: `<p><strong>6 Phasen</strong>:
    <ol>
      <li><em>Case Finding</em> (Identifikation geeigneter Fälle)</li>
      <li><em>Assessment</em> (Bedarfsermittlung)</li>
      <li><em>Planning</em> (Hilfeplan)</li>
      <li><em>Linking</em> (Vermitteln)</li>
      <li><em>Monitoring</em> (Überwachung)</li>
      <li><em>Evaluation</em></li>
    </ol></p>
    <p><strong>Prinzipien</strong>: Klientenorientierung, Ressourcenorientierung, Empowerment, Transparenz.</p>`,
    questions: [
      { q: "Was ist NICHT Teil des Casemanagements?", a: ["Assessment","Planning","Linking","Operieren"], correct: 3, explain: "Keine medizinische Intervention." },
      { q: "Case Finding bedeutet:", a: ["Fälle aussuchen","Fälle dokumentieren","Maßnahmen planen","Evaluieren"], correct: 0, explain: "Geeignete Fälle identifizieren." }
    ],
    flashcards: [
      { front: "Casemanagement 6 Phasen", back: "Finding · Assessment · Planning · Linking · Monitoring · Evaluation" },
      { front: "Ziel CM", back: "Koordinierte, lückenlose Versorgung komplexer Fälle" }
    ]
  },

  sdm: {
    title: "Shared Decision Making (SDM)", category: "pflegewiss",
    intro: "Partizipative Entscheidungsfindung: Patient und Behandler entscheiden gemeinsam auf Basis von Evidenz und Präferenzen.",
    content: `<p><strong>3-Talk-Modell</strong>:
    <ol>
      <li><em>Team Talk</em>: "Wir entscheiden gemeinsam."</li>
      <li><em>Option Talk</em>: Alternativen mit Nutzen/Risiken</li>
      <li><em>Decision Talk</em>: Präferenzen klären, Entscheidung treffen</li>
    </ol></p>
    <p><strong>Voraussetzungen</strong>: Zeit, verständliche Infos, Entscheidungshilfen (Decision Aids), keine Hierarchie.</p>
    <p><strong>Nutzen</strong>: Zufriedenheit, Adhärenz, realistische Erwartungen.</p>`,
    questions: [
      { q: "SDM bedeutet:", a: ["Arzt entscheidet allein","Patient entscheidet allein","Gemeinsame Entscheidung","Angehörige entscheiden"], correct: 2, explain: "Partizipative Entscheidung Behandler + Patient." },
      { q: "3-Talk umfasst NICHT:", a: ["Team Talk","Option Talk","Decision Talk","Medication Talk"], correct: 3, explain: "Team · Option · Decision Talk." }
    ],
    flashcards: [
      { front: "SDM", back: "Shared Decision Making – gemeinsame Entscheidung" },
      { front: "3-Talk-Modell", back: "Team Talk · Option Talk · Decision Talk" }
    ]
  },

  pflegebeduerftigkeit: {
    title: "Pflegebedürftigkeit (§ 14 SGB XI)", category: "sozialrecht",
    intro: "Seit 2017 neuer Pflegebedürftigkeitsbegriff: gemessen an der Selbstständigkeit in 6 Modulen (NBA).",
    content: `<p><strong>6 Module</strong> (gewichtet):
    <ol>
      <li>Mobilität (10%)</li>
      <li>Kognitive und kommunikative Fähigkeiten (7,5%)</li>
      <li>Verhaltensweisen und psychische Problemlagen (7,5% – Modul 2 und 3 zusammen)</li>
      <li>Selbstversorgung (40%)</li>
      <li>Bewältigung krankheitsbedingter Anforderungen (20%)</li>
      <li>Gestaltung des Alltagslebens und soziale Kontakte (15%)</li>
    </ol></p>
    <p><strong>Pflegegrade 1–5</strong>: Punktwerte 12,5 bis 100. PG 1 ≥ 12,5, PG 5 ≥ 90.</p>
    <p><strong>Begutachtung</strong>: MD (ehemals MDK) für GKV, Medicproof für PKV.</p>`,
    questions: [
      { q: "Wie viele Module hat das NBA?", a: ["3","6","8","10"], correct: 1, explain: "6 Module, 2 und 3 werden zusammen gewertet." },
      { q: "Welches Modul hat die höchste Gewichtung?", a: ["Mobilität","Selbstversorgung","Kognition","Alltag"], correct: 1, explain: "Selbstversorgung 40%." },
      { q: "Wer begutachtet gesetzlich Versicherte?", a: ["TÜV","MD","Pflegedienst","Hausarzt"], correct: 1, explain: "Der Medizinische Dienst (MD)." }
    ],
    flashcards: [
      { front: "NBA 6 Module", back: "Mobilität · Kognition · Verhalten · Selbstversorgung · Krankheitsbewältigung · Alltag" },
      { front: "Pflegegrade", back: "PG 1–5 (12,5 bis ≥ 90 Punkte)" },
      { front: "Gewichtung Selbstversorgung", back: "40% – höchster Anteil" }
    ]
  },

  pflegesysteme: {
    title: "Pflegesysteme / Pflegeorganisationsformen", category: "pflegewiss",
    intro: "Verschiedene Modelle, wie Pflege in der Einrichtung organisiert wird. Beeinflussen Kontinuität, Verantwortung, Zufriedenheit.",
    content: `<ul>
      <li><strong>Funktionspflege</strong>: Aufgabenorientiert (A misst BD, B gibt Med), Fließband – wenig Beziehung.</li>
      <li><strong>Gruppenpflege</strong>: Kleingruppe betreut feste Zimmergruppe.</li>
      <li><strong>Zimmerpflege</strong>: eine PFK versorgt alle Bewohner eines Zimmers komplett.</li>
      <li><strong>Bereichspflege</strong>: Verantwortung für einen Stationsbereich.</li>
      <li><strong>Bezugspflege / Primary Nursing</strong>: Eine PFK (Primary Nurse) ist 24/7 verantwortlich – höchste Kontinuität.</li>
    </ul>
    <p><strong>Trend</strong>: Weg von Funktionspflege → Bereichspflege/Bezugspflege.</p>`,
    questions: [
      { q: "Höchste Kontinuität bietet:", a: ["Funktionspflege","Gruppenpflege","Primary Nursing","Zimmerpflege"], correct: 2, explain: "Primary Nursing = Bezugspflege." },
      { q: "Welches System ist am aufgabenorientiertesten?", a: ["Funktionspflege","Bereichspflege","Primary Nursing","Gruppenpflege"], correct: 0, explain: "Funktionspflege: Aufgaben verteilt." },
      { q: "Bezugspflege fördert:", a: ["Fluktuation","Beziehung, Kontinuität, Verantwortung","Anonymität","Zeiteinsparung"], correct: 1, explain: "Beziehungspflege mit klarer Zuordnung." }
    ],
    flashcards: [
      { front: "Funktionspflege", back: "Aufgabenorientiert, geringe Beziehung" },
      { front: "Primary Nursing", back: "Bezugspflege – eine PFK ganzheitlich verantwortlich" },
      { front: "Bereichspflege", back: "PFK verantwortet festen Stationsbereich" }
    ]
  }

  ,

  /* ===================== ENDOKRINOLOGIE / STOFFWECHSEL ===================== */
  diabetes_m: {
    title: "Diabetes mellitus", category: "innere",
    intro: "Chronische Stoffwechselstörung mit Hyperglykämie durch Insulinmangel (Typ 1) oder Insulinresistenz (Typ 2).",
    content: `<p><strong>Typ 1</strong>: Autoimmun, absoluter Insulinmangel, oft junge Menschen, lebenslang Insulin. Entgleisung → Ketoazidose.</p>
    <p><strong>Typ 2</strong>: Relatives Insulinmangel + Resistenz, meist >40 Jahre, Adipositas-assoziiert. Therapie: Lebensstil → Metformin → weitere OAD → Insulin. Entgleisung: hyperosmolares Koma.</p>
    <p><strong>Symptome (Hyperglykämie)</strong>: Polyurie, Polydipsie, Gewichtsverlust, Müdigkeit, Sehstörungen, Wundheilungsstörung.</p>
    <p><strong>Diagnostik</strong>: Nü-BZ ≥ 126 mg/dl, Gelegenheits-BZ ≥ 200 mg/dl, HbA1c ≥ 6,5%.</p>
    <p><strong>Therapieziele</strong>: HbA1c individuell (meist 6,5–7,5%), BD &lt;140/85, LDL niedrig, Nichtraucher.</p>`,
    questions: [
      { q: "Welcher Diabetes-Typ ist Autoimmunerkrankung?", a: ["Typ 1","Typ 2","Gestationsdiabetes","MODY"], correct: 0, explain: "Typ 1 ist Autoimmun (ß-Zell-Zerstörung)." },
      { q: "HbA1c-Ziel bei vielen Typ-2-Diabetikern:", a: ["< 4,5%","6,5–7,5%","9–10%","~12%"], correct: 1, explain: "Individualisiert, typisch 6,5–7,5%." },
      { q: "Typische 4-P-Symptomatik:", a: ["Polyurie, Polydipsie, Polyphagie, Pruritus","Polyurie, Pollakisurie, Parese, Paranoia","Pruritus, Parese, Parkinson, Paranoia","Polyurie, Pyurie, Polyphagie, Paranoia"], correct: 0, explain: "4 P: Polyurie, Polydipsie, Polyphagie, Pruritus." }
    ],
    flashcards: [
      { front: "Diabetes-Diagnose", back: "Nü-BZ ≥ 126 · HbA1c ≥ 6,5% · Gelegenheits ≥ 200 mg/dl" },
      { front: "Typ 1 vs. Typ 2", back: "T1 autoimmun, absolut · T2 Resistenz, relativ" },
      { front: "Entgleisungen", back: "T1: Ketoazidose · T2: hyperosmolares Koma" }
    ]
  },

  stoffwechsel: {
    title: "Stoffwechsel (Basics)", category: "innere",
    intro: "Gesamtheit chemischer Prozesse zur Energie- und Baustoffgewinnung. Katabolismus (Abbau) + Anabolismus (Aufbau).",
    content: `<p><strong>Grundstoffe</strong>:
    <ul>
      <li>Kohlenhydrate → Glukose (4 kcal/g)</li>
      <li>Fette → Fettsäuren (9 kcal/g)</li>
      <li>Eiweiße → Aminosäuren (4 kcal/g)</li>
    </ul></p>
    <p><strong>Hormonelle Steuerung BZ</strong>:
    <ul>
      <li>Insulin (senkt BZ)</li>
      <li>Glukagon (hebt BZ)</li>
      <li>Cortisol, Adrenalin, GH, Schilddrüse (Gegenregulation)</li>
    </ul></p>
    <p><strong>Grundumsatz</strong>: ca. 1 kcal/kg/h (♂ ~1700, ♀ ~1400 kcal/Tag).</p>
    <p><strong>Stoffwechselstörungen</strong>: Diabetes, Gicht, Hyperlipidämie, Adipositas, Schilddrüsenerkrankungen.</p>`,
    questions: [
      { q: "Wie viele kcal liefert 1 g Fett?", a: ["4","7","9","11"], correct: 2, explain: "Fett: 9 kcal/g. Alkohol 7, KH und EW je 4." },
      { q: "Welches Hormon senkt den BZ?", a: ["Glukagon","Cortisol","Insulin","Adrenalin"], correct: 2, explain: "Nur Insulin senkt, alle anderen erhöhen BZ." },
      { q: "Grundumsatz ca. bei ♂:", a: ["700 kcal","1700 kcal","3000 kcal","5000 kcal"], correct: 1, explain: "~1700 kcal/Tag." }
    ],
    flashcards: [
      { front: "kcal-Werte", back: "KH 4 · EW 4 · Fett 9 · Alkohol 7 kcal/g" },
      { front: "BZ-senkend", back: "Nur Insulin" },
      { front: "BZ-erhöhend", back: "Glukagon, Cortisol, Adrenalin, GH, Schilddrüse" }
    ]
  },

  pavk: {
    title: "PAVK – Periphere arterielle Verschlusskrankheit", category: "innere",
    intro: "Chronische Arterienverengung meist der Beine durch Arteriosklerose. „Schaufensterkrankheit.“",
    content: `<p><strong>Stadien nach Fontaine</strong>:
    <ol>
      <li>I – asymptomatisch</li>
      <li>II – Claudicatio intermittens (IIa &gt;200 m, IIb &lt;200 m)</li>
      <li>III – Ruheschmerz</li>
      <li>IV – Nekrose / Gangrän</li>
    </ol></p>
    <p><strong>Diagnostik</strong>: Pulsstatus, ABI (Knöchel-Arm-Index), Doppler, Angio.</p>
    <p><strong>Therapie</strong>: Risikofaktoren (Rauchstopp!), Gehtraining, ASS/Clopidogrel, Statine, PTA, Bypass.</p>
    <p><strong>Pflege</strong>: <em>Beine tief lagern</em> (Gegensatz zur Venen-Erkrankung!), Druckstellen vermeiden, engmaschige Hautkontrolle, Wärme/Kälte vermeiden.</p>`,
    questions: [
      { q: "Fontaine IV bedeutet:", a: ["Symptomfrei","Schmerzfreie Gehstrecke < 200 m","Ruheschmerz","Nekrose/Gangrän"], correct: 3, explain: "Stadium IV: trophische Hautschäden." },
      { q: "Wie sollen Beine bei PAVK gelagert werden?", a: ["Hochlagerung","Tieflagerung","Bettruhe","Kaltpackung"], correct: 1, explain: "Tieflagerung fördert arterielle Perfusion." },
      { q: "Bekannter Spitzname:", a: ["Witwenmacher","Schaufensterkrankheit","Raucherbein (korrekt)","A & B"], correct: 2, explain: "Beides stimmt: 'Schaufensterkrankheit' (IIb) bzw. 'Raucherbein'." }
    ],
    flashcards: [
      { front: "Fontaine-Stadien", back: "I asymp · II Claudicatio · III Ruheschmerz · IV Nekrose" },
      { front: "Lagerung bei PAVK", back: "Beine tief (arterielle Durchblutung fördern)" },
      { front: "ABI-Wert normal", back: "0,9–1,3 (< 0,9 → PAVK)" }
    ]
  },

  funktion_insulin: {
    title: "Funktion des Insulins", category: "anatomie",
    intro: "Insulin ist ein anaboles Peptidhormon aus den β-Zellen der Langerhans-Inseln. Senkt den Blutzucker.",
    content: `<p><strong>Wirkungen</strong>:
    <ul>
      <li>Glukoseaufnahme in Zellen (v.a. Muskel, Fettgewebe) über GLUT4</li>
      <li>Glykogensynthese in Leber und Muskel</li>
      <li>Hemmung der Glukoneogenese und Lipolyse</li>
      <li>Proteinaufbau (anabol)</li>
      <li>Kalium-Einstrom in Zellen</li>
    </ul></p>
    <p><strong>Insulinarten (Therapie)</strong>: schnell (Humaninsulin, Analoga wie Lispro), verzögert (NPH), lang (Glargin, Degludec), Mischinsuline.</p>
    <p><strong>Injektion</strong>: subkutan in Bauch/Oberschenkel, Einstichstellen wechseln (Lipohypertrophien vermeiden).</p>
    <p><strong>Spritz-Ess-Abstand</strong>: Humaninsulin 15–30 Min, Analoga 0 Min.</p>`,
    questions: [
      { q: "Wo wird Insulin gebildet?", a: ["α-Zellen","β-Zellen des Pankreas","γ-Zellen der Niere","Leber"], correct: 1, explain: "β-Zellen in den Langerhans-Inseln." },
      { q: "Welche Wirkung hat Insulin NICHT?", a: ["Senkt BZ","Fördert Lipolyse","Fördert Glykogensynthese","Hemmt Glukoneogenese"], correct: 1, explain: "Insulin HEMMT Lipolyse (anabol)." },
      { q: "Typische Injektionsstelle:", a: ["Intramuskulär Gesäß","Subkutan Bauch/Oberschenkel","Intravenös","Intradermal"], correct: 1, explain: "s.c. Bauch (schnell) oder Oberschenkel (langsam)." }
    ],
    flashcards: [
      { front: "Insulin – Quelle", back: "β-Zellen der Langerhans-Inseln im Pankreas" },
      { front: "Insulin-Wirkung", back: "BZ senken · Glykogen aufbauen · Fett/Protein aufbauen · K⁺ intrazellulär" },
      { front: "Spritz-Ess-Abstand Humaninsulin", back: "15–30 Min; Analoga 0 Min" }
    ]
  },

  folgeerkrankungen: {
    title: "Diabetes – Folgeerkrankungen", category: "innere",
    intro: "Schlecht eingestellter Diabetes schädigt Gefäße (Makro- und Mikroangiopathie) und Nerven.",
    content: `<p><strong>Makroangiopathie</strong>: KHK / Herzinfarkt, Apoplex, PAVK.</p>
    <p><strong>Mikroangiopathie</strong>:
    <ul>
      <li><em>Retinopathie</em> (Erblindung, häufigste Ursache)</li>
      <li><em>Nephropathie</em> (Dialysepflicht)</li>
      <li><em>Neuropathie</em> (Polyneuropathie, diabetisches Fußsyndrom)</li>
    </ul></p>
    <p><strong>Diabetischer Fuß</strong>: Sensibilitätsverlust + Durchblutungsstörung → Wunden bleiben unbemerkt → Gangrän, Amputation. Tägliche Fußinspektion! Keine Wärmflaschen!</p>
    <p><strong>Prävention</strong>: HbA1c-Optimierung, BD-Einstellung, Lipide, Rauchstopp, Vorsorgeuntersuchungen (Auge, Niere, Füße).</p>`,
    questions: [
      { q: "Was gehört NICHT zur Mikroangiopathie?", a: ["Retinopathie","Nephropathie","KHK","Neuropathie"], correct: 2, explain: "KHK = Makroangiopathie." },
      { q: "Was ist beim diabetischen Fuß tabu?", a: ["Eincremen","Wärmflasche","Inspektion","Bequeme Schuhe"], correct: 1, explain: "Kein Wärme-/Hitzekontakt (Verbrennungsgefahr bei Sensibilitätsverlust)." },
      { q: "Häufigste Erblindungsursache jüngerer Erwachsener in D:", a: ["Grauer Star","Glaukom","Diabetische Retinopathie","Makuladegeneration"], correct: 2, explain: "Diabetische Retinopathie." }
    ],
    flashcards: [
      { front: "Makroangiopathie", back: "KHK · Apoplex · PAVK" },
      { front: "Mikroangiopathie", back: "Retinopathie · Nephropathie · Neuropathie" },
      { front: "Diabetischer Fuß – goldene Regel", back: "Tägliche Fußinspektion · keine Wärme · gutes Schuhwerk" }
    ]
  },

  /* ===================== PSYCHIATRIE ===================== */
  depressionen: {
    title: "Depression", category: "psychiatrie",
    intro: "Häufigste psychische Erkrankung. Leitsymptome: gedrückte Stimmung, Antriebsmangel, Interessenverlust.",
    content: `<p><strong>Hauptsymptome (≥2 von 3, ≥2 Wochen)</strong>:
    <ol>
      <li>Depressive Stimmung</li>
      <li>Interessen-/Freudverlust</li>
      <li>Antriebsmangel</li>
    </ol></p>
    <p><strong>Zusatzsymptome (≥2)</strong>: Konzentration↓, Selbstwert↓, Schuld, Pessimismus, Suizidgedanken, Schlafstörung, Appetitveränderung.</p>
    <p><strong>Schweregrade</strong>: leicht (2+2), mittel (2+3-4), schwer (3+≥4).</p>
    <p><strong>Therapie</strong>: Psychotherapie (KVT, IPT), Antidepressiva (SSRI, SNRI, Mirtazapin), EKT bei therapieresistent, Lichttherapie bei Winterdepression.</p>
    <p><strong>Pflege</strong>: Antriebssituation beachten (!! erhöhtes Suizidrisiko bei wiederkehrendem Antrieb), Struktur, aktivierende Pflege, keine Floskeln ("Kopf hoch!"), Suizidalität offen ansprechen.</p>`,
    questions: [
      { q: "Hauptsymptom der Depression ist NICHT:", a: ["Depressive Stimmung","Antriebsmangel","Freudverlust","Halluzinationen"], correct: 3, explain: "Halluzinationen gehören nicht zum Kernbild (ggf. schwer psychotisch, selten)." },
      { q: "Wann ist die Suizidgefahr besonders hoch?", a: ["Nachts","Zu Beginn der Antidepressiva-Wirkung, wenn Antrieb zurückkommt","Nie","Nach Entlassung nie"], correct: 1, explain: "Wenn Antrieb vor Stimmung bessert → Suizidgefahr steigt." },
      { q: "SSRI bedeutet:", a: ["Selective Sleep Reducing Inhibitor","Selective Serotonin Reuptake Inhibitor","Serotonin Sympathomimetic","Slow Release SSRI"], correct: 1, explain: "Selective Serotonin Reuptake Inhibitor (z. B. Citalopram)." }
    ],
    flashcards: [
      { front: "Depression – 3 Hauptsymptome", back: "Gedrückte Stimmung · Interessenverlust · Antriebsmangel" },
      { front: "Zeitkriterium", back: "≥ 2 Wochen" },
      { front: "Gefährlicher Zeitpunkt", back: "Wiederkehrender Antrieb vor Stimmungsbesserung (Suizidrisiko ↑)" }
    ]
  },

  ptbs: {
    title: "PTBS – Posttraumatische Belastungsstörung", category: "psychiatrie",
    intro: "Verzögerte Reaktion auf ein überwältigendes Trauma (Katastrophen, Unfall, Gewalt, Krieg). Beginn typischerweise nach Latenz von Wochen bis Monaten.",
    content: `<p><strong>Symptomtrias</strong>:
    <ol>
      <li><strong>Intrusionen</strong>: Flashbacks, Albträume, aufdrängende Erinnerungen</li>
      <li><strong>Vermeidung</strong>: Orte, Menschen, Gespräche, die ans Trauma erinnern</li>
      <li><strong>Hyperarousal</strong>: Schlafstörung, Schreckhaftigkeit, Reizbarkeit</li>
    </ol></p>
    <p><strong>Therapie</strong>: traumafokussierte Psychotherapie (KVT, EMDR), SSRI, Stabilisierung zuerst, keine Konfrontation ohne Vorbereitung.</p>
    <p><strong>Pflege</strong>: Sicherheit schaffen, Reize reduzieren, Trigger erkennen, keine Retraumatisierung.</p>`,
    questions: [
      { q: "PTBS-Symptomtrias umfasst NICHT:", a: ["Intrusionen","Vermeidung","Hyperarousal","Halluzinationen"], correct: 3, explain: "Halluzinationen sind nicht Kern – aber Flashbacks (sensorisch)." },
      { q: "Typisches Therapieverfahren:", a: ["Schocktherapie","EMDR","Elektrokrampftherapie","Hypnose als erstes"], correct: 1, explain: "EMDR = Eye Movement Desensitization and Reprocessing." },
      { q: "Beginn PTBS typischerweise:", a: ["Sofort nach Trauma","Mit Latenz Wochen–Monate","Jahre","Gar nicht"], correct: 1, explain: "Verzögerte Reaktion nach Latenz." }
    ],
    flashcards: [
      { front: "PTBS-Trias", back: "Intrusion · Vermeidung · Hyperarousal" },
      { front: "EMDR", back: "Eye Movement Desensitization & Reprocessing – Traumatherapie" },
      { front: "Pflege-Fokus", back: "Sicherheit · Trigger erkennen · Reizreduktion · keine Retraumatisierung" }
    ]
  },

  essstoerungen: {
    title: "Essstörungen", category: "psychiatrie",
    intro: "Gestörtes Essverhalten mit starkem Einfluss auf Körperbild und Psyche. Wichtigste: Anorexia nervosa, Bulimia nervosa, Binge-Eating-Störung.",
    content: `<p><strong>Anorexia nervosa</strong>: BMI &lt; 17,5, gewollt herbeigeführt, gestörtes Körperschema, Amenorrhoe. Sehr hohe Mortalität.</p>
    <p><strong>Bulimia nervosa</strong>: Heißhungerattacken + kompensatorisches Verhalten (Erbrechen, Laxantien), Gewicht meist normal, Zahnerosionen, Chvostek-Zeichen durch Elektrolytstörung.</p>
    <p><strong>Binge-Eating</strong>: Essanfälle ohne Kompensation → Übergewicht/Adipositas.</p>
    <p><strong>Therapie</strong>: multimodal – Psychotherapie (KVT), Ernährungstherapie, Ggf. stationär bei lebensbedrohlichem Untergewicht. Bei Anorexie Refeeding-Syndrom beachten!</p>
    <p><strong>Pflege</strong>: Gewicht in Absprache dokumentieren, gemeinsame Mahlzeiten, Vertrauen aufbauen, Alarm bei heimlichem Erbrechen, Bilanzierung.</p>`,
    questions: [
      { q: "Anorexia nervosa – BMI-Kriterium:", a: ["< 14","< 17,5","< 19","< 22"], correct: 1, explain: "ICD-Kriterium BMI < 17,5 kg/m²." },
      { q: "Typisch für Bulimia nervosa:", a: ["Hohes Gewicht","Heißhungerattacken + Kompensation","Nichtessen","Untergewicht"], correct: 1, explain: "Essanfälle + Erbrechen/Laxantien, Gewicht oft normal." },
      { q: "Refeeding-Syndrom entsteht bei:", a: ["Zu schneller Nahrungsaufnahme nach Mangelernährung","Infektion","Diabetes","Allergien"], correct: 0, explain: "Zu schnelles Wiederanfüttern → Phosphat, Kalium, Magnesium fallen → lebensbedrohlich." }
    ],
    flashcards: [
      { front: "Anorexie – Kernmerkmale", back: "BMI < 17,5 · gewollt · Körperbildstörung · Amenorrhoe" },
      { front: "Bulimie – Kernmerkmale", back: "Essanfälle + Kompensation · meist normales Gewicht" },
      { front: "Refeeding-Syndrom", back: "Elektrolytverschiebungen bei zu schnellem Wiederanfüttern" }
    ]
  },

  morbus_parkinson: {
    title: "Morbus Parkinson", category: "psychiatrie",
    intro: "Neurodegenerative Erkrankung mit Untergang dopaminerger Neurone in der Substantia nigra. Betrifft meist > 60-Jährige.",
    content: `<p><strong>Kardinalsymptome (TRAP)</strong>:
    <ul>
      <li><strong>T</strong>remor (Ruhetremor, Pillendreher)</li>
      <li><strong>R</strong>igor (wächserner Tonuserhöhung, Zahnradphänomen)</li>
      <li><strong>A</strong>kinese (Bewegungsarmut, Starthemmung, kleine Schritte)</li>
      <li><strong>P</strong>osturale Instabilität (Sturzneigung)</li>
    </ul></p>
    <p><strong>Weitere Symptome</strong>: Maskengesicht, Mikrografie, Hypophonie, Depression, autonome Störungen.</p>
    <p><strong>Therapie</strong>: L-Dopa (mit Decarboxylase-Hemmer), Dopaminagonisten, MAO-B-Hemmer, Physiotherapie, DBS (tiefe Hirnstimulation) in Spätstadium.</p>
    <p><strong>Pflege</strong>: Medikamentengabe <em>exakt nach Zeitplan</em>, Sturzprophylaxe, Essen kleinteilig (Aspirationsgefahr!), Bewegung fördern, Logopädie, Ergotherapie.</p>`,
    questions: [
      { q: "Kardinalsymptome TRAP sind:", a: ["Tremor, Reflexsteigerung, Ataxie, Parese","Tremor, Rigor, Akinese, Posturale Instab.","Tachykardie, Reflux, Akne, Panik","Trauma, Rigor, Atmung, Puls"], correct: 1, explain: "TRAP = Tremor, Rigor, Akinese, Posturale Instab." },
      { q: "Hauptmedikament:", a: ["Metformin","L-Dopa","Haloperidol","Paracetamol"], correct: 1, explain: "L-Dopa = Vorstufe von Dopamin." },
      { q: "Was ist bei L-Dopa-Therapie wichtig?", a: ["Pünktliche Einnahme","Nur nach Bedarf","Mit proteinreicher Mahlzeit","Mit Milch"], correct: 0, explain: "Strenge Zeitintervalle, protein-arm rund um die Einnahme." }
    ],
    flashcards: [
      { front: "Parkinson TRAP", back: "Tremor · Rigor · Akinese · Posturale Instabilität" },
      { front: "Hauptmedikament", back: "L-Dopa (mit Decarboxylasehemmer)" },
      { front: "Pflege-Kernpunkt", back: "Medikamente zeitgenau! Sturzprophylaxe. Sprach-/Schlucktherapie." }
    ]
  },

  demenz: {
    title: "Demenz (Grundlagen)", category: "psychiatrie",
    intro: "Erworbene, fortschreitende Beeinträchtigung höherer Hirnleistungen (Gedächtnis, Orientierung, Sprache, Urteilsvermögen) mit Alltagsrelevanz.",
    content: `<p><strong>Kriterien</strong>: > 6 Monate, mehrere kognitive Bereiche betroffen, Alltagskompetenz beeinträchtigt, ohne Bewusstseinstrübung (≠ Delir).</p>
    <p><strong>Ursachen</strong>:
    <ul>
      <li>Alzheimer (60–70%)</li>
      <li>Vaskuläre Demenz (15%)</li>
      <li>Lewy-Body-Demenz</li>
      <li>Frontotemporale Demenz (Pick)</li>
      <li>Sekundär (B12, Schilddrüse, Alkohol, NPH)</li>
    </ul></p>
    <p><strong>Diagnostik</strong>: MMST, Uhrentest, DemTect, MRT, Labor.</p>
    <p><strong>Therapie</strong>: Acetylcholinesterase-Hemmer (Donepezil), Memantin (bei schwerer Demenz), nicht-medikamentös: Validation, Erinnerungsarbeit, Milieugestaltung.</p>`,
    questions: [
      { q: "Häufigste Demenzform:", a: ["Vaskulär","Lewy-Body","Alzheimer","Pick"], correct: 2, explain: "Alzheimer ca. 60–70%." },
      { q: "Wesentliches Unterscheidungsmerkmal Demenz ↔ Delir:", a: ["Alter","Bewusstseinstrübung beim Delir","Geschlecht","Sprache"], correct: 1, explain: "Delir: akut, schwankend, Bewusstseinstrübung. Demenz: chronisch, klares Bewusstsein." },
      { q: "MMST prüft:", a: ["Motorik","Kognition","Stimmung","Schlaf"], correct: 1, explain: "Mini Mental Status Test – kognitiver Screening-Test." }
    ],
    flashcards: [
      { front: "Demenz-Zeitkriterium", back: "Symptome > 6 Monate, progredient" },
      { front: "Häufigste Form", back: "Alzheimer-Demenz" },
      { front: "Delir vs. Demenz", back: "Delir: akut, schwankend, trübes Bewusstsein · Demenz: chronisch, klar" }
    ]
  },

  demenz_formen: {
    title: "Demenz – Formen im Detail", category: "psychiatrie",
    intro: "Die 4 wichtigsten Demenzformen unterscheiden sich in Ursache, Verlauf und Klinik.",
    content: `<ul>
      <li><strong>Alzheimer</strong>: schleichend, Kurzzeitgedächtnis↓, Orientierung↓, Wortfindung↓, Amyloid-Plaques, Tau-Proteine.</li>
      <li><strong>Vaskuläre Demenz</strong>: stufenweise (nach Ereignissen), Gangunsicherheit, Affektinkontinenz, fokale Zeichen.</li>
      <li><strong>Lewy-Body</strong>: Fluktuierende Kognition, visuelle Halluzinationen, Parkinson-Symptome, REM-Schlafstörung.</li>
      <li><strong>Frontotemporal (Pick)</strong>: Persönlichkeitsveränderung, enthemmtes Verhalten, Sprache gestört – Gedächtnis lange erhalten.</li>
    </ul>`,
    questions: [
      { q: "Welche Demenzform beginnt oft mit Persönlichkeitsveränderung?", a: ["Alzheimer","Vaskulär","Lewy-Body","Frontotemporal"], correct: 3, explain: "Pick-Demenz: enthemmtes Verhalten, Apathie, Gedächtnis erst spät." },
      { q: "Stufenweiser Verlauf weist auf:", a: ["Alzheimer","Vaskulär","Lewy","Pick"], correct: 1, explain: "Vaskulär: schubweise nach Durchblutungsereignissen." },
      { q: "Halluzinationen + Parkinsonoid:", a: ["Alzheimer","Vaskulär","Lewy-Body","Pick"], correct: 2, explain: "Lewy-Körperchen-Demenz." }
    ],
    flashcards: [
      { front: "Alzheimer – Biomarker", back: "Amyloid-Plaques · Tau-Protein" },
      { front: "Vaskuläre Demenz", back: "Stufenweiser Verlauf nach Schlaganfällen" },
      { front: "Pick-Demenz", back: "Frontotemporal – Persönlichkeitsänderung, enthemmt" }
    ]
  },

  umgang_dementen: {
    title: "Umgang mit Demenzkranken", category: "psychiatrie",
    intro: "Zentrale Haltung: Validation statt Korrektur – dem Menschen dort begegnen, wo er emotional ist.",
    content: `<p><strong>Kommunikationsprinzipien</strong>:
    <ul>
      <li>Kurze, einfache Sätze</li>
      <li>Augenkontakt, Berührung (falls erwünscht)</li>
      <li>Nicht korrigieren → Validation (Naomi Feil)</li>
      <li>Biografiearbeit einbeziehen</li>
      <li>Rituale, feste Tagesstruktur</li>
    </ul></p>
    <p><strong>Konzepte</strong>:
    <ul>
      <li><em>Validation</em> – Gefühle anerkennen</li>
      <li><em>Mäeutik</em> (Cora van der Kooij) – beziehungsorientierte Pflege</li>
      <li><em>Milieutherapie</em> – Umgebung an den Menschen anpassen</li>
      <li><em>Snoezelen</em> – Sinnesstimulation</li>
    </ul></p>
    <p><strong>Herausforderndes Verhalten</strong>: Ursache suchen (Schmerz, Hunger, Durst, Harndrang, Langeweile, Angst) statt sofort sedieren.</p>`,
    questions: [
      { q: "Validation nach Feil bedeutet:", a: ["Korrektur der Realität","Anerkennung der emotionalen Welt","Sedierung","Fixierung"], correct: 1, explain: "Die Gefühlswirklichkeit wird validiert." },
      { q: "Bei Unruhe zuerst:", a: ["Neuroleptikum","Ursache suchen (Schmerz, Harndrang, Angst)","Fixierung","Ignorieren"], correct: 1, explain: "Bedarfsanalyse vor Medikation." },
      { q: "Snoezelen nutzt:", a: ["Sinnesstimulation","Medikamente","Fixierung","Lautstärke"], correct: 0, explain: "Licht, Klang, Berührung – multisensorisch." }
    ],
    flashcards: [
      { front: "Validation (Feil)", back: "Gefühle anerkennen, nicht korrigieren" },
      { front: "Mäeutik", back: "Beziehungsorientierte Pflege n. Cora van der Kooij" },
      { front: "Snoezelen", back: "Multisensorische Stimulation" }
    ]
  },

  /* ===================== BLUT / HÄMATOLOGIE ===================== */
  blut_anatomie: {
    title: "Blut – Anatomie", category: "anatomie",
    intro: "Flüssiges Organ. Menge: ca. 7% des Körpergewichts (4,5–5 l). Zusammensetzung: 55% Plasma + 45% Blutzellen.",
    content: `<p><strong>Plasma</strong>: 90% Wasser, Eiweiße (Albumin, Globuline, Fibrinogen), Elektrolyte, Hormone.</p>
    <p><strong>Zellen (Hämatokrit)</strong>:
    <ul>
      <li><strong>Erythrozyten</strong> (4–5 Mio./µl): O2-Transport via Hämoglobin</li>
      <li><strong>Leukozyten</strong> (4.000–10.000/µl): Abwehr (Granulo, Lympho, Mono)</li>
      <li><strong>Thrombozyten</strong> (150–400 Tsd/µl): Blutgerinnung</li>
    </ul></p>
    <p><strong>Hb-Wert</strong>: ♀ 12–16 g/dl, ♂ 14–18 g/dl.</p>
    <p><strong>Blutgruppen</strong>: AB0 + Rhesus (D). Universalspender 0 Rh-, Universalempfänger AB Rh+.</p>
    <p><strong>Funktionen</strong>: Transport · Abwehr · Regulation (Temperatur, pH, H₂O) · Hämostase.</p>`,
    questions: [
      { q: "Normale Ery-Zahl (Mio./µl):", a: ["1–2","4–5","10–12","0,5–1"], correct: 1, explain: "4–5 Mio./µl." },
      { q: "Wer ist Universalspender für Erys?", a: ["A Rh+","AB Rh+","0 Rh-","B Rh-"], correct: 2, explain: "Keine AB0- und keine Rh-Antigene." },
      { q: "Welche Zellen sorgen für Blutgerinnung?", a: ["Erythrozyten","Leukozyten","Thrombozyten","Makrophagen"], correct: 2, explain: "Thrombozyten + Plasmafaktoren." }
    ],
    flashcards: [
      { front: "Blutbestandteile", back: "55% Plasma · 45% Zellen (Ery, Leuko, Thrombo)" },
      { front: "Hb-Wert ♂/♀", back: "♂ 14–18 · ♀ 12–16 g/dl" },
      { front: "Universalspender", back: "0 Rh-negativ" }
    ]
  },

  leukaemie: {
    title: "Leukämie", category: "onko",
    intro: "Bösartige Erkrankung des blutbildenden Systems: unkontrollierte Vermehrung unreifer Leukozyten, verdrängt gesunde Blutbildung.",
    content: `<p><strong>Formen</strong>:
    <ul>
      <li>Akute lymphatische Leukämie (ALL) – v.a. Kinder</li>
      <li>Akute myeloische Leukämie (AML) – v.a. Erwachsene</li>
      <li>Chronische lymphatische Leukämie (CLL) – ältere Pat.</li>
      <li>Chronische myeloische Leukämie (CML) – Philadelphia-Chromosom</li>
    </ul></p>
    <p><strong>Symptome (durch Knochenmarksverdrängung)</strong>: Anämie (Müdigkeit), Thrombopenie (Blutungen, Petechien), Leukopenie (Infekte), B-Symptome (Fieber, Nachtschweiß, Gewichtsverlust), Lymphknotenschwellung.</p>
    <p><strong>Therapie</strong>: Chemotherapie, Knochenmarktransplantation, zielgerichtet (TKI bei CML: Imatinib).</p>
    <p><strong>Pflege</strong>: Infektionsschutz (Umkehrisolation), Mundpflege, Blutungsprophylaxe, psychische Begleitung, Ernährung.</p>`,
    questions: [
      { q: "Welche Leukämie ist bei Kindern am häufigsten?", a: ["ALL","AML","CLL","CML"], correct: 0, explain: "Akute lymphatische Leukämie." },
      { q: "B-Symptome sind:", a: ["Fieber, Nachtschweiß, Gewichtsverlust","Brustschmerz, Beinödem","Blutungen","Nierenversagen"], correct: 0, explain: "Klassische B-Symptomatik." },
      { q: "Typisch für CML:", a: ["Philadelphia-Chromosom (t(9;22))","Trisomie 21","BRCA","HLA-B27"], correct: 0, explain: "BCR-ABL-Fusion durch Translokation (9;22)." }
    ],
    flashcards: [
      { front: "B-Symptomatik", back: "Fieber (>38°) · Nachtschweiß · Gewichtsverlust (>10% in 6 Mo)" },
      { front: "CML-Markergen", back: "Philadelphia-Chromosom (BCR-ABL)" },
      { front: "Knochenmarkssymptome", back: "Anämie · Infekte · Blutungsneigung" }
    ]
  },

  anaemie: {
    title: "Anämie", category: "innere",
    intro: "Verminderte Hb-Konzentration (♀ <12 g/dl, ♂ <13 g/dl). Symptome: Müdigkeit, Blässe, Tachykardie, Atemnot, Kopfschmerz.",
    content: `<p><strong>Einteilung nach MCV</strong>:
    <ul>
      <li><em>Mikrozytär</em> (MCV ↓): Eisenmangel (häufigste!), Thalassämie</li>
      <li><em>Normozytär</em>: Blutverlust, chron. Erkrankung, Hämolyse, renal</li>
      <li><em>Makrozytär</em> (MCV ↑): Vit-B12-Mangel (perniziös), Folsäuremangel</li>
    </ul></p>
    <p><strong>Eisenmangelanämie</strong>: häufigste weltweit. Ursachen: Menstruation, GI-Blutung, Schwangerschaft, Ernährung. Therapie: orales Eisen (nü, mit Vit C), bei Resorptionsstörung i.v.</p>
    <p><strong>Perniziöse Anämie</strong>: Vit-B12-Mangel, oft Intrinsic-Factor-Mangel (Autoimmun), Hunter-Glossitis, neurologische Symptome. Therapie: Vit-B12 i.m.</p>`,
    questions: [
      { q: "Häufigste Anämie weltweit:", a: ["Perniziös","Eisenmangelanämie","Hämolytisch","Renal"], correct: 1, explain: "Eisenmangel, v. a. bei Frauen." },
      { q: "Makrozytäre Anämie entsteht typischerweise durch:", a: ["Eisenmangel","Thalassämie","Vit-B12-Mangel","Blutverlust"], correct: 2, explain: "Vit B12 oder Folsäure → DNA-Synthese gestört → große Erys." },
      { q: "Eisen wird besser resorbiert mit:", a: ["Milch","Vitamin C","Kaffee","Tee"], correct: 1, explain: "Vit C fördert, Kaffee/Tee/Milch hemmen Resorption." }
    ],
    flashcards: [
      { front: "Anämie-Grenze Hb ♂/♀", back: "♂ < 13 · ♀ < 12 g/dl" },
      { front: "MCV-Einteilung", back: "mikro / normo / makro zytär" },
      { front: "Perniziöse Anämie", back: "Vit-B12-Mangel, makrozytär, oft Autoimmun" }
    ]
  },

  /* ===================== HYGIENE ===================== */
  nosokomiale: {
    title: "Nosokomiale Infektion", category: "hygiene",
    intro: "Infektion, die im zeitlichen Zusammenhang mit einer stationären Maßnahme erworben wird (nicht bei Aufnahme bestehend). Häufig: HWI, Pneumonie, Wundinfektion, CLABSI.",
    content: `<p><strong>Übertragungswege</strong>: Kontakt (häufigste!), aerogen, Tröpfchen, parenteral, fäkal-oral.</p>
    <p><strong>5 Momente der Händehygiene (WHO)</strong>:
    <ol>
      <li>Vor Patientenkontakt</li>
      <li>Vor aseptischen Tätigkeiten</li>
      <li>Nach Kontakt mit potenziell infektiösem Material</li>
      <li>Nach Patientenkontakt</li>
      <li>Nach Kontakt mit Patientenumgebung</li>
    </ol></p>
    <p><strong>Hygienische Händedesinfektion</strong>: 3 ml auf trockenen Händen verreiben, 30 Sek Einwirkzeit.</p>
    <p><strong>Gesetzliche Grundlage</strong>: Infektionsschutzgesetz (IfSG), Empfehlungen KRINKO (RKI).</p>`,
    questions: [
      { q: "Wie viele WHO-Momente der Händehygiene gibt es?", a: ["3","5","7","10"], correct: 1, explain: "Die bekannten '5 Moments'." },
      { q: "Häufigste Übertragung im Krankenhaus:", a: ["Luft","Kontakt","Wasser","Nahrung"], correct: 1, explain: "Kontaktübertragung über Hände/Flächen." },
      { q: "Einwirkzeit der Händedesinfektion:", a: ["10 s","30 s","2 min","5 min"], correct: 1, explain: "Mindestens 30 Sekunden." }
    ],
    flashcards: [
      { front: "Nosokomiale Infektion", back: "Im Zusammenhang mit stationärem Aufenthalt erworben" },
      { front: "5 Moments", back: "Vor Pat./vor aseptisch/nach Exposition/nach Pat./nach Umgebung" },
      { front: "Gesetzliche Basis", back: "IfSG + KRINKO-Empfehlungen (RKI)" }
    ]
  },

  noro_rota: {
    title: "Norovirus & Rotavirus", category: "hygiene",
    intro: "Hochansteckende Magen-Darm-Viren. Gastroenteritis mit schwallartigem Erbrechen und Durchfall. Meldepflicht nach IfSG.",
    content: `<p><strong>Noro</strong>: Hauptursache viraler Gastroenteritis bei Erwachsenen. Minimaler Infektionsdosis (ca. 10 Viren), Übertragung fäkal-oral und über Erbrochenes (aerogen!).</p>
    <p><strong>Rota</strong>: v.a. Kinder &lt;5 J., Impfung empfohlen.</p>
    <p><strong>Inkubation</strong>: 6–48 h. <strong>Ansteckungsfähigkeit</strong>: bis 48 h nach Symptomende.</p>
    <p><strong>Hygiene</strong>: <em>Einzelzimmer</em>, Kittel, Handschuhe, Mund-Nasen-Schutz bei Erbrechen, <em>Händewaschen</em> (Noro ist teils unempfindlich gegen Alkohol – viruzid wirksames Präparat verwenden), Schutzkittel, Flächendesinfektion mit viruziden Mitteln.</p>
    <p><strong>Meldung</strong>: Verdacht, Erkrankung und Tod nach § 6 IfSG; Nachweis nach § 7.</p>`,
    questions: [
      { q: "Welche Viren sind beim Erbrechen aerogen relevant?", a: ["Rota","Noro","Influenza","Adenoviren"], correct: 1, explain: "Norovirus: Aerosole beim Erbrechen sind relevant." },
      { q: "Ansteckungsfähig bis:", a: ["Bei Beschwerdebeginn","24 h nach Ende","48 h nach Symptomende","Dauerhaft"], correct: 2, explain: "48 h nach Ende der Symptome." },
      { q: "Welche Desinfektion nötig?", a: ["Bakterizid","Viruzid / begrenzt viruzid PLUS","Fungizid","Keine"], correct: 1, explain: "Noro ist unbehüllt – viruzid wirksames Präparat." }
    ],
    flashcards: [
      { front: "Noro – Infektionsdosis", back: "Sehr gering (~10 Viruspartikel)" },
      { front: "Noro Hygiene", back: "Einzelzimmer, viruzid, Händewaschen, MNS bei Erbrechen" },
      { front: "Meldepflicht", back: "§ 6 IfSG (Erkrankung/Verdacht), § 7 (Erregernachweis)" }
    ]
  },

  mrsa: {
    title: "MRSA", category: "hygiene",
    intro: "Methicillin-resistenter Staphylococcus aureus. Resistent gegen Beta-Lactam-Antibiotika. Multiresistenter Erreger (MRE).",
    content: `<p><strong>Übertragung</strong>: überwiegend Kontakt (Hände, Nasenabstriche zur Sanierung).</p>
    <p><strong>Kolonisation vs. Infektion</strong>: viele sind nur besiedelt (nasal, Leiste, Wunde), ohne krank zu sein.</p>
    <p><strong>Risikopatienten</strong>: Antibiotika-Dauertherapie, Wunden, Katheter, häufige Klinikaufenthalte, Dialyse, Pflegeheim.</p>
    <p><strong>Hygienemaßnahmen</strong>: Einzelzimmer oder Kohortenisolierung, Kittel, Handschuhe, MNS, gründliche Flächendesinfektion, eigener Dienstplan.</p>
    <p><strong>Sanierung</strong>: Mupirocin-Nasensalbe (3×/Tag 5 Tage), antiseptische Waschungen (Octenidin), Gurgeln, Wäsche-/Umfeldhygiene.</p>
    <p><strong>Therapie bei Infektion</strong>: Vancomycin, Linezolid.</p>`,
    questions: [
      { q: "MRSA ist resistent gegen:", a: ["Penicilline / Beta-Lactame","Aminoglykoside","Tetrazykline","Alle Antibiotika"], correct: 0, explain: "Methicillin-/Beta-Lactam-Resistenz." },
      { q: "Welches Medikament zur Nasensanierung?", a: ["Vancomycin","Mupirocin","Ciprofloxacin","Metronidazol"], correct: 1, explain: "Mupirocin-Nasensalbe 3×/Tag für 5 Tage." },
      { q: "Besiedelt vs. infiziert – was stimmt?", a: ["Besiedelt = krank","Besiedelt = Erreger nachweisbar ohne Symptome","Infiziert ohne Symptome","Kein Unterschied"], correct: 1, explain: "Kolonisation: keine Krankheit, Infektion: Symptome/Entzündung." }
    ],
    flashcards: [
      { front: "MRSA", back: "Methicillin-resistenter S. aureus (β-Lactam-resistent)" },
      { front: "Sanierung", back: "Mupirocin-Nase + Octenidin-Waschungen + Gurgeln, 5 Tage" },
      { front: "Therapie bei Infektion", back: "Vancomycin / Linezolid" }
    ]
  }

  ,

  /* ===================== ONKOLOGIE ===================== */
  onko_erkrankungen: {
    title: "Onkologische Erkrankungen – Überblick", category: "onko",
    intro: "Bösartige Neubildungen entstehen durch unkontrollierte Zellteilung und Entdifferenzierung. Zweithäufigste Todesursache in D.",
    content: `<p><strong>Kategorien</strong>:
    <ul>
      <li><em>Karzinome</em> – epithelial (Lunge, Darm, Brust)</li>
      <li><em>Sarkome</em> – mesenchymal (Knochen, Weichteile)</li>
      <li><em>Leukämien/Lymphome</em> – hämatologisch</li>
      <li><em>Blastome</em> – embryonal (Retinoblastom, Nephroblastom)</li>
    </ul></p>
    <p><strong>TNM-Klassifikation</strong>: T (Tumorgröße), N (Lymphknoten), M (Metastasen).</p>
    <p><strong>Prävention</strong>: Nichtrauchen, UV-Schutz, Impfung (HPV, HBV), Ernährung, Bewegung, Vorsorgeuntersuchungen.</p>
    <p><strong>Screening in D</strong>: Darmkrebs (ab 50), Mamma-MG (50–69), Zervix (ab 20), Hautkrebs (ab 35), PSA (Männer ab 45).</p>`,
    questions: [
      { q: "Ein Tumor der Epithelzellen heißt:", a: ["Sarkom","Karzinom","Myelom","Lymphom"], correct: 1, explain: "Karzinome = epithelialen Ursprungs." },
      { q: "TNM-Klassifikation umfasst:", a: ["Typ, Nekrose, Malignität","Tumor, Nodus, Metastase","Total, Nerve, Muscle","Time, Number, Mortality"], correct: 1, explain: "T-N-M." },
      { q: "Darmkrebsvorsorge ab:", a: ["30","40","50","65"], correct: 2, explain: "Ab 50 (Koloskopie alle 10 Jahre)." }
    ],
    flashcards: [
      { front: "Karzinom vs. Sarkom", back: "Karzinom: epithelial · Sarkom: mesenchymal" },
      { front: "TNM", back: "T – Tumor · N – Nodus · M – Metastase" }
    ]
  },

  tumorklassen: {
    title: "Tumorklassifikation", category: "onko",
    intro: "Systematische Einteilung von Tumoren nach Ursprung, Verhalten und Ausbreitung.",
    content: `<p><strong>Gutartig (benigne)</strong>: verdrängendes Wachstum, kein Einbruch, keine Metastasen. Beispiele: Adenom, Lipom, Myom.</p>
    <p><strong>Bösartig (maligne)</strong>: infiltratives Wachstum, Metastasen. Beispiele: Karzinom, Sarkom.</p>
    <p><strong>Semimaligne</strong>: lokal aggressiv, keine Fernmetastasen (Basaliom).</p>
    <p><strong>Grading (G1–G4)</strong>: Differenzierungsgrad – G1 gut differenziert, G4 undifferenziert (aggressiv).</p>
    <p><strong>Staging (UICC I–IV)</strong>: basiert auf TNM, beschreibt Ausbreitung.</p>`,
    questions: [
      { q: "Welcher Tumor metastasiert NICHT?", a: ["Adenokarzinom","Basaliom","Osteosarkom","Melanom"], correct: 1, explain: "Basaliom ist semimaligne – infiltriert, metastasiert aber i. d. R. nicht." },
      { q: "G4 bedeutet:", a: ["Gut differenziert","Undifferenziert – aggressiv","Nicht bestimmbar","Metastasenfrei"], correct: 1, explain: "G4 = entdifferenziert, schlechte Prognose." },
      { q: "UICC beschreibt:", a: ["Grading","Staging (Ausbreitung)","Therapie","Alter"], correct: 1, explain: "Stadium I–IV nach TNM." }
    ],
    flashcards: [
      { front: "Benigne Tumoren", back: "Verdrängend · kapseliert · nicht metastasierend" },
      { front: "Grading G1–G4", back: "G1 gut differenziert → G4 undifferenziert" },
      { front: "UICC-Staging", back: "Stadium I–IV, basiert auf TNM" }
    ]
  },

  metastasierung: {
    title: "Metastasierung", category: "onko",
    intro: "Ausbreitung von Tumorzellen in andere Organe/Gewebe. Hauptursache für Tumor-assoziierte Sterblichkeit.",
    content: `<p><strong>Ausbreitungswege</strong>:
    <ul>
      <li><em>Hämatogen</em> (Blutweg) – z. B. Lunge, Leber, Knochen, Gehirn</li>
      <li><em>Lymphogen</em> (Lymphbahnen) – regionale LK zuerst</li>
      <li><em>Per continuitatem</em> – Einbruch in Nachbargewebe</li>
      <li><em>Kavitär</em> (über Körperhöhlen, z. B. Peritoneum)</li>
    </ul></p>
    <p><strong>Prädilektionsstellen</strong>:
    <ul>
      <li>Lungenkrebs → Gehirn, Knochen, Leber</li>
      <li>Mammakarzinom → Knochen, Leber, Lunge, Gehirn</li>
      <li>Kolonkarzinom → Leber (via V. portae)</li>
      <li>Prostatakarzinom → Knochen (osteoplastisch)</li>
    </ul></p>
    <p><strong>Diagnostik</strong>: CT, MRT, PET-CT, Knochenszintigraphie, Tumormarker.</p>`,
    questions: [
      { q: "Kolonkarzinom metastasiert häufig in die:", a: ["Niere","Leber","Milz","Schilddrüse"], correct: 1, explain: "Über Pfortadersystem → Leber." },
      { q: "Typisch lymphogene Metastasierung:", a: ["Lungen-Ca","Mamma-Ca","Sarkom","Glioblastom"], correct: 1, explain: "Mamma-Ca geht zuerst axillär lymphogen." },
      { q: "Prostatakarzinom-Metastasen sind oft:", a: ["Hirn","Leber","Knochen (osteoplastisch)","Haut"], correct: 2, explain: "Osteoplastische Knochenmetastasen typisch." }
    ],
    flashcards: [
      { front: "4 Metastasierungswege", back: "Hämatogen · lymphogen · per continuitatem · kavitär" },
      { front: "Kolon-Ca → Leber", back: "Über V. portae (hepatogener Pfad)" },
      { front: "Mamma-Ca – Typ.", back: "Zuerst axilläre LK, dann Knochen/Leber/Lunge/Gehirn" }
    ]
  },

  risikofaktoren: {
    title: "Onkologische Risikofaktoren", category: "onko",
    intro: "Krebs entsteht multifaktoriell. Prävention = Meiden modifizierbarer Risikofaktoren.",
    content: `<p><strong>Modifizierbare Faktoren</strong>:
    <ul>
      <li>Rauchen (Lunge, Blase, Mund, Ösophagus, Pankreas)</li>
      <li>Alkohol (Leber, Ösophagus, Mamma, Kolon)</li>
      <li>Adipositas (Endometrium, Kolon, Mamma postmenop.)</li>
      <li>UV-Strahlung (Haut)</li>
      <li>Ernährung (rotes/verarbeitetes Fleisch → Kolon)</li>
      <li>Bewegungsmangel</li>
      <li>Infektionen: HPV (Zervix), HBV/HCV (Leber), Helicobacter (Magen), EBV</li>
      <li>Berufliche Noxen (Asbest → Mesotheliom)</li>
    </ul></p>
    <p><strong>Nicht-modifizierbare Faktoren</strong>: Alter, Geschlecht, Genetik (BRCA1/2, Lynch-Syndrom, FAP).</p>`,
    questions: [
      { q: "Welcher Erreger verursacht Zervixkarzinom?", a: ["HIV","HPV","HCV","EBV"], correct: 1, explain: "Humane Papillomviren → Impfung ab 9 J." },
      { q: "Asbest ist Hauptursache für:", a: ["Melanom","Mesotheliom","Leukämie","Glioblastom"], correct: 1, explain: "Asbest-induziertes Pleura-Mesotheliom." },
      { q: "Welche Genmutation erhöht Brustkrebsrisiko stark?", a: ["BRCA1/2","HLA-B27","APOE4","MTHFR"], correct: 0, explain: "BRCA1/2 – bis zu 70% Lebenszeitrisiko." }
    ],
    flashcards: [
      { front: "HPV-Impfung", back: "Ab 9 J, schützt v. a. gegen Zervixkarzinom" },
      { front: "BRCA1/2", back: "Hereditäres Mamma- und Ovarialkarzinomsyndrom" },
      { front: "Helicobacter pylori", back: "Magenkarzinom und MALT-Lymphom" }
    ]
  },

  therapieformen: {
    title: "Onkologische Therapieformen", category: "onko",
    intro: "Multimodal: Operation, Strahlentherapie, Chemotherapie, zielgerichtete Therapie, Immuntherapie.",
    content: `<ul>
      <li><strong>OP</strong>: primär, kurativ wenn resektabel.</li>
      <li><strong>Chemotherapie</strong>: Zytostatika (hemmen Zellteilung). Häufige NW: Übelkeit, Mukositis, Alopezie, Myelosuppression (Leuko/Thrombo/Ery↓), Polyneuropathie, Organtoxizität.</li>
      <li><strong>Strahlentherapie</strong>: ionisierende Strahlung, lokal. NW: Hautrötung, Fatigue, Organ-spezifisch.</li>
      <li><strong>Zielgerichtete Therapie</strong>: Antikörper (Trastuzumab), TKI (Imatinib), wirkt auf spezielle Moleküle.</li>
      <li><strong>Immuntherapie</strong>: Checkpoint-Inhibitoren (Pembrolizumab) – Immunsystem gegen Tumor aktivieren.</li>
      <li><strong>Hormontherapie</strong>: bei hormonabhängigen Tumoren (Mamma, Prostata).</li>
      <li><strong>Palliativ</strong>: symptomatisch, lebensqualitätsorientiert.</li>
    </ul>
    <p><strong>Pflege bei Chemo</strong>: Infektionsschutz, Mundpflege (Mukositis), Antiemese, Extravasat-Protokoll bei Zytostatika (Notfall!), Haut-/Haarberatung.</p>`,
    questions: [
      { q: "Typische NW von Zytostatika:", a: ["Hyperglykämie","Myelosuppression, Übelkeit, Alopezie","Hyperthyreose","Hypertonie"], correct: 1, explain: "Knochenmark- und Epithel-Toxizität." },
      { q: "Trastuzumab ist:", a: ["Zytostatikum","Monoklonaler AK gegen HER2","Steroid","Antibiotikum"], correct: 1, explain: "Anti-HER2-Antikörper bei Mamma-Ca." },
      { q: "Was ist ein Extravasat?", a: ["Austritt von Chemo ins Gewebe – Notfall","Allergie","Infekt","Blutung"], correct: 0, explain: "Paravasat → Gewebsnekrose, spezifisches Notfallprotokoll." }
    ],
    flashcards: [
      { front: "Wichtigste Chemo-NW", back: "Myelosuppression · Mukositis · Alopezie · Übelkeit · PNP" },
      { front: "Extravasat", back: "Austritt ins Gewebe → Notfall-Protokoll" },
      { front: "Immuntherapie-Beispiel", back: "Checkpoint-Inhibitoren (Pembrolizumab)" }
    ]
  },

  /* ===================== PFLEGEPROZESS ===================== */
  pflegeprozess: {
    title: "Pflegeprozess (6-Phasen-Modell)", category: "pflegeprozess",
    intro: "Systematische, zielgerichtete Vorgehensweise in der Pflege nach Fiechter & Meier bzw. WHO (4–6 Phasen).",
    content: `<p><strong>6 Phasen</strong>:
    <ol>
      <li><strong>Informationssammlung</strong> (Pflegeanamnese)</li>
      <li><strong>Probleme & Ressourcen erkennen</strong> (Pflegediagnosen)</li>
      <li><strong>Pflegeziele</strong> festlegen (SMART)</li>
      <li><strong>Pflegemaßnahmen</strong> planen</li>
      <li><strong>Durchführung</strong></li>
      <li><strong>Evaluation</strong></li>
    </ol></p>
    <p><strong>Ziele</strong>: Individualität, Kontinuität, Transparenz, Qualität, rechtliche Absicherung.</p>
    <p><strong>Dokumentation</strong>: jede Phase nachvollziehbar. SIS oder klassische Pflegedoku.</p>`,
    questions: [
      { q: "Welche Phase ist zuerst?", a: ["Evaluation","Informationssammlung","Maßnahmenplanung","Durchführung"], correct: 1, explain: "Pflegeanamnese startet den Prozess." },
      { q: "SMART-Kriterien dienen der…", a: ["Informationssammlung","Zielformulierung","Maßnahmenplanung","Evaluation"], correct: 1, explain: "Ziele SMART formulieren." },
      { q: "Welche Phase schließt den Kreis?", a: ["Durchführung","Evaluation","Pflegeplan","Anamnese"], correct: 1, explain: "Evaluation → Anpassung → neuer Kreislauf." }
    ],
    flashcards: [
      { front: "6 Phasen des Pflegeprozesses", back: "Info – Probleme/Ressourcen – Ziele – Maßnahmen – Durchführung – Evaluation" },
      { front: "Entwickler", back: "Fiechter & Meier (Schweiz) / WHO" },
      { front: "Zweck", back: "Individualität · Kontinuität · Transparenz · Qualität" }
    ]
  },

  atl_abedl: {
    title: "ATL / ABEDL", category: "pflegeprozess",
    intro: "Strukturierungsmodelle für Pflegeanamnese: Liliane Juchlis ATL (13) und Monika Krohwinkels ABEDL (13).",
    content: `<p><strong>ATLs (Juchli, 1973)</strong>: Aktivitäten des täglichen Lebens – 12 Bereiche (atmen, essen, trinken, ausscheiden, schlafen, sich bewegen, sich waschen und kleiden, Körpertemperatur regulieren, für Sicherheit sorgen, sich beschäftigen, kommunizieren, Sinn finden in Werden-Sein-Vergehen).</p>
    <p><strong>ABEDL (Krohwinkel, 1993)</strong>: Aktivitäten, Beziehungen und Existenzielle Erfahrungen des Lebens – 13 Bereiche, ganzheitlicher Ansatz mit Beziehungsgestaltung und existenziellen Erfahrungen.</p>
    <p><strong>Zweck</strong>: strukturierte Anamnese, keine wichtigen Bereiche vergessen, Pflegediagnosen ableiten.</p>`,
    questions: [
      { q: "Wer entwickelte die ATLs?", a: ["Orem","Juchli","Krohwinkel","Roper"], correct: 1, explain: "Liliane Juchli (CH), 1973." },
      { q: "ABEDL steht für:", a: ["Aktivitäten, Beziehungen, Existenzielle Erfahrungen des Lebens","Allgemeines Betreuungs-Ebenen-Diagnostik-Leitfaden","Alltagsbewältigung der Lebensbegleitung","Allgemeine Betreuungs-Entwicklungs-Leistungen"], correct: 0, explain: "Modell nach Krohwinkel." },
      { q: "Wie viele Bereiche hat ABEDL?", a: ["10","12","13","15"], correct: 2, explain: "13 Bereiche." }
    ],
    flashcards: [
      { front: "ATL – Urheber", back: "Liliane Juchli (CH)" },
      { front: "ABEDL – Urheber", back: "Monika Krohwinkel" },
      { front: "Zweck beider Modelle", back: "Strukturierte Pflegeanamnese" }
    ]
  },

  pesr_smart: {
    title: "PESR & SMART", category: "pflegeprozess",
    intro: "PESR: Pflegediagnosen strukturiert formulieren. SMART: Pflegeziele strukturiert formulieren.",
    content: `<p><strong>PESR-Struktur</strong>:
    <ul>
      <li><strong>P</strong>roblem (Pflegediagnose)</li>
      <li><strong>Ä</strong>tiologie (Ursache)</li>
      <li><strong>S</strong>ymptome/Kennzeichen</li>
      <li><strong>R</strong>essourcen</li>
    </ul></p>
    <p><em>Beispiel:</em> P: Sturzgefahr, Ä: Osteoporose und Schwindel, S: Gangunsicherheit, R: Einsichtsfähigkeit, benutzt Rollator.</p>
    <p><strong>SMART-Ziele</strong>:
    <ul>
      <li><strong>S</strong>pezifisch</li>
      <li><strong>M</strong>essbar</li>
      <li><strong>A</strong>ttraktiv / Akzeptiert</li>
      <li><strong>R</strong>ealistisch</li>
      <li><strong>T</strong>erminiert</li>
    </ul></p>
    <em>Beispiel:</em> "Frau M. geht bis 10.10. 20 m mit Rollator ohne Hilfe."`,
    questions: [
      { q: "Was bedeutet 'R' in PESR?", a: ["Risiko","Ressourcen","Reserve","Rehabilitation"], correct: 1, explain: "Ressourcen ergänzen das Problem (stärkenorientiert)." },
      { q: "Welches Ziel ist SMART?", a: ["Patient soll wieder gehen","Patient macht mehr","Pat. geht bis Freitag 20m m. Rollator ohne Hilfe","Patient lernt laufen"], correct: 2, explain: "Spezifisch, messbar, terminiert, realistisch." },
      { q: "PESR dient der Formulierung von:", a: ["Dienstplänen","Pflegediagnosen","Röntgenaufnahmen","Rezepten"], correct: 1, explain: "Strukturierung von Pflegediagnosen." }
    ],
    flashcards: [
      { front: "PESR", back: "Problem · Ätiologie · Symptom · Ressourcen" },
      { front: "SMART", back: "Spezifisch · Messbar · Attraktiv · Realistisch · Terminiert" }
    ]
  },

  sis: {
    title: "SIS – Strukturierte Informationssammlung", category: "pflegeprozess",
    intro: "Entbürokratisierungsmaßnahme (Ein-STEP, 2015). Ersetzt klassische Pflegeplanung durch 6 Themenfelder und vereinfachte Dokumentation.",
    content: `<p><strong>6 Themenfelder (ST in SIS-Feld C)</strong>:
    <ol>
      <li>Kognitive & kommunikative Fähigkeiten</li>
      <li>Mobilität & Beweglichkeit</li>
      <li>Krankheitsbezogene Anforderungen & Belastungen</li>
      <li>Selbstversorgung</li>
      <li>Leben in sozialen Beziehungen</li>
      <li>Haushaltsführung (ambulant) bzw. Wohnen/Häuslichkeit (stationär)</li>
    </ol></p>
    <p><strong>4 Felder der SIS</strong>:
    <ol>
      <li>A: Stammdaten</li>
      <li>B: „Was bewegt Sie?" (Sicht des Pflegebedürftigen)</li>
      <li>C: Pflegefachliche Einschätzung (6 Themenfelder)</li>
      <li>D: Risikomatrix (Sturz, Dekubitus, Schmerz, Inkontinenz, Ernährung)</li>
    </ol></p>
    <p><strong>Danach</strong>: Maßnahmenplan und Berichteblatt (nur bei Abweichungen).</p>`,
    questions: [
      { q: "Wie viele Themenfelder hat die pflegefachliche Einschätzung in der SIS?", a: ["4","5","6","8"], correct: 2, explain: "6 Themenfelder in Feld C." },
      { q: "Was beschreibt Feld B der SIS?", a: ["Risikomatrix","Sicht des Pflegebedürftigen ('Was bewegt Sie?')","Stammdaten","Hilfsmittel"], correct: 1, explain: "Feld B: Eigenperspektive des Pat." },
      { q: "Was wird ins Berichteblatt geschrieben?", a: ["Alles","Nur Abweichungen","Nur Vitalzeichen","Nichts"], correct: 1, explain: "Fokussierte Doku nur bei Abweichungen." }
    ],
    flashcards: [
      { front: "SIS-Felder", back: "A Stammdaten · B 'Was bewegt Sie?' · C 6 Themenfelder · D Risikomatrix" },
      { front: "Zweck SIS", back: "Entbürokratisierung, Fokus auf wesentliche Info" }
    ]
  },

  expertenstandard: {
    title: "Expertenstandards", category: "pflegeprozess",
    intro: "Vom DNQP (Deutsches Netzwerk für Qualitätsentwicklung in der Pflege) entwickelte, evidenzbasierte Standards zu zentralen Pflegethemen.",
    content: `<p><strong>Aktuelle Expertenstandards</strong>:
    <ol>
      <li>Dekubitusprophylaxe</li>
      <li>Entlassungsmanagement</li>
      <li>Schmerzmanagement (akut/chronisch)</li>
      <li>Sturzprophylaxe</li>
      <li>Kontinenzförderung</li>
      <li>Pflege von Menschen mit chronischen Wunden</li>
      <li>Ernährungsmanagement</li>
      <li>Beziehungsgestaltung bei Menschen mit Demenz</li>
      <li>Erhaltung und Förderung der Mobilität</li>
    </ol></p>
    <p><strong>Struktur</strong>: jede Ebene hat Struktur-, Prozess- und Ergebniskriterien.</p>
    <p><strong>Verbindlichkeit</strong>: Stand der Pflegewissenschaft, rechtlich relevant (§ 113a SGB XI).</p>`,
    questions: [
      { q: "Wer entwickelt Expertenstandards?", a: ["MDK","DNQP","BMG","GKV"], correct: 1, explain: "DNQP an der Hochschule Osnabrück." },
      { q: "Welcher ist KEIN aktueller Expertenstandard?", a: ["Dekubitusprophylaxe","Schmerzmanagement","Reanimation","Entlassungsmanagement"], correct: 2, explain: "Reanimation ist kein DNQP-Expertenstandard." },
      { q: "Wie werden sie strukturiert?", a: ["Prolog/Epilog","Struktur-, Prozess-, Ergebniskriterien","Nur Maßnahmenliste","Algorithmen"], correct: 1, explain: "Donabedian-Struktur." }
    ],
    flashcards: [
      { front: "DNQP", back: "Deutsches Netzwerk Qualitätsentwicklung in der Pflege (Osnabrück)" },
      { front: "Struktur", back: "Struktur- / Prozess- / Ergebniskriterien pro Ebene" },
      { front: "Rechtsgrundlage", back: "§ 113a SGB XI – Expertenstandards sind verbindlich" }
    ]
  },

  pflegediagnosen: {
    title: "Pflegediagnosen", category: "pflegeprozess",
    intro: "Klinische Urteile über Reaktionen auf Gesundheitsprobleme. Abgrenzung zu medizinischen Diagnosen: pflegerisch beeinflussbar.",
    content: `<p><strong>Klassifikationen</strong>: NANDA-I (weltweit verbreitet), POP (Pflegeorientierte Klassifikation), ICNP (WHO).</p>
    <p><strong>Arten</strong>:
    <ul>
      <li><em>Aktuell</em>: bereits bestehend</li>
      <li><em>Risiko</em>: potenziell</li>
      <li><em>Gesundheitsförderung</em>: Motivation zu mehr Wohlbefinden</li>
      <li><em>Syndrom</em>: Cluster mehrerer PDs</li>
    </ul></p>
    <p><strong>Formulierung nach PESR</strong> (siehe dort).</p>
    <p><em>Beispiel NANDA</em>: „Beeinträchtigte Gehfähigkeit im Zusammenhang mit Schmerzen und Muskelschwäche, erkennbar an unsicherem Gangbild."</p>`,
    questions: [
      { q: "Welches System ist weltweit verbreitet?", a: ["ICD","NANDA-I","DSM","HCG"], correct: 1, explain: "NANDA-International (USA)." },
      { q: "Pflegediagnosen unterscheiden sich von med. Diagnosen, weil:", a: ["Sie ärztlich sind","Sie pflegerisch beeinflussbar sind","Sie nur im Heim","Unwichtiger"], correct: 1, explain: "Pflegerische Reaktion/Bewältigung im Fokus." },
      { q: "Risiko-Pflegediagnose heißt:", a: ["Bereits vorhanden","Möglicherweise entstehend","Ausgeschlossen","Unbewiesen"], correct: 1, explain: "Risiko = potenziell, prophylaxeorientiert." }
    ],
    flashcards: [
      { front: "NANDA-I", back: "International verbreitete Pflegediagnosen-Klassifikation" },
      { front: "4 Arten von Pflegediagnosen", back: "Aktuell · Risiko · Gesundheitsförderung · Syndrom" },
      { front: "Formulierung", back: "PESR: Problem · Ätiologie · Symptome · Ressourcen" }
    ]
  },

  leitlinien_standards: {
    title: "Leitlinien & Standards", category: "pflegewiss",
    intro: "Unterschied: Leitlinien sind wissenschaftlich fundierte, orientierende Empfehlungen. Standards sind verbindliche interne Vorgaben.",
    content: `<p><strong>Leitlinien</strong>: AWMF (ärztliche), DNQP (Expertenstandards Pflege). Evidenzbasiert, Bewertung S1/S2/S3.</p>
    <p><strong>Standards</strong>: einrichtungsintern, regeln Abläufe verbindlich (z. B. Injektionsstandard). Ableitung aus Leitlinien.</p>
    <p><strong>Verfahrensanweisungen (VA)</strong>: präziser Ablauf für einen Schritt (z. B. ZVK-Verbandswechsel).</p>
    <p><strong>SOPs</strong>: Standard Operating Procedure – Arbeitsanweisungen.</p>`,
    questions: [
      { q: "S3-Leitlinie bedeutet:", a: ["Laienempfehlung","Höchste Evidenzstufe, konsens-basiert","Keine Evidenz","Meinung eines Arztes"], correct: 1, explain: "S3 = höchste Methodenstufe bei AWMF." },
      { q: "Wer erstellt Expertenstandards in der Pflege?", a: ["AWMF","DNQP","GKV","MDS"], correct: 1, explain: "DNQP." },
      { q: "Standards sind in der Einrichtung:", a: ["Optional","Verbindlich","Nur Vorschläge","Nur schriftlich"], correct: 1, explain: "Verbindlich – dienen Rechtssicherheit." }
    ],
    flashcards: [
      { front: "Leitlinie vs. Standard", back: "Leitlinie: orientierend, überregional · Standard: verbindlich, intern" },
      { front: "AWMF", back: "Arbeitsgemeinschaft der Wissenschaftl. Medizin. Fachgesellschaften" },
      { front: "S3", back: "Höchste Methodenstufe bei Leitlinien" }
    ]
  }

  ,

  /* ===================== ETHIK ===================== */
  ethik: {
    title: "Ethik – Grundlagen", category: "ethik",
    intro: "Ethik fragt nach dem Guten und Richtigen im Handeln. In der Pflege zentral: Autonomie, Fürsorge, Gerechtigkeit, Nicht-Schadens-Prinzip.",
    content: `<p><strong>4 bioethische Prinzipien (Beauchamp & Childress)</strong>:
    <ol>
      <li><strong>Autonomie</strong> – Selbstbestimmung</li>
      <li><strong>Benefizienz</strong> – Gutes tun</li>
      <li><strong>Non-Malefizienz</strong> – nicht schaden</li>
      <li><strong>Justice</strong> – Gerechtigkeit</li>
    </ol></p>
    <p><strong>Ethische Konfliktfelder</strong>: Zwang vs. Fürsorge, Wahrheit am Krankenbett, Ressourcenzuteilung, Lebensende, Fixierung.</p>
    <p><strong>Ethische Fallbesprechung</strong>: Nimwegener Modell – Analyse, Bewertung, Entscheidungsfindung.</p>`,
    questions: [
      { q: "Welches Prinzip bedeutet 'Nicht-Schaden'?", a: ["Autonomie","Benefizienz","Non-Malefizienz","Justice"], correct: 2, explain: "Primum nihil nocere." },
      { q: "Wer formulierte die 4 Prinzipien?", a: ["Kant","Rawls","Beauchamp & Childress","Aristoteles"], correct: 2, explain: "Tom Beauchamp und James Childress." },
      { q: "Autonomie heißt:", a: ["Selbst-Bestimmung","Unabhängigkeit","Unfreiheit","Isolation"], correct: 0, explain: "Selbstbestimmung des Patienten." }
    ],
    flashcards: [
      { front: "4 Prinzipien (Beauchamp & Childress)", back: "Autonomie · Benefizienz · Non-Malefizienz · Justice" },
      { front: "Nimwegener Modell", back: "Modell der ethischen Fallbesprechung" }
    ]
  },

  icn: {
    title: "ICN-Ethikkodex", category: "ethik",
    intro: "International Council of Nurses: weltweit anerkannter Ethikkodex für Pflegende (1953, aktuelle Version 2021).",
    content: `<p><strong>Vier Grundverantwortlichkeiten der Pflegenden</strong>:
    <ol>
      <li>Gesundheit <em>fördern</em></li>
      <li>Krankheit <em>verhüten</em></li>
      <li>Gesundheit <em>wiederherstellen</em></li>
      <li>Leiden <em>lindern</em> und ein würdevolles Sterben ermöglichen</li>
    </ol></p>
    <p><strong>4 Elemente des Kodex</strong>:
    <ul>
      <li>Pflegende und Patienten / Menschen mit Pflegebedarf</li>
      <li>Pflegende und berufliche Praxis</li>
      <li>Pflegende und die Profession</li>
      <li>Pflegende und Globale Gesundheit</li>
    </ul></p>`,
    questions: [
      { q: "Wer gibt den ICN-Ethikkodex heraus?", a: ["WHO","ICN","DBfK","BGM"], correct: 1, explain: "International Council of Nurses." },
      { q: "Welche Verantwortung gehört NICHT dazu?", a: ["Gesundheit fördern","Krankheit verhüten","Diagnose stellen","Leiden lindern"], correct: 2, explain: "Diagnose ist ärztliche Aufgabe." },
      { q: "Wann wurde der Kodex erstmals verabschiedet?", a: ["1900","1953","1990","2015"], correct: 1, explain: "1953 ICN-Kodex." }
    ],
    flashcards: [
      { front: "ICN-Kodex – 4 Aufgaben", back: "Fördern · Verhüten · Wiederherstellen · Lindern" },
      { front: "ICN", back: "International Council of Nurses (Sitz: Genf)" }
    ]
  },

  wuerde_respekt: {
    title: "Würde & Respekt", category: "ethik",
    intro: "Menschenwürde ist unantastbar (GG Art. 1). In der Pflege: achtsamer Umgang, Intimsphäre, Selbstbestimmung.",
    content: `<p><strong>Praktische Umsetzung</strong>:
    <ul>
      <li>Anklopfen vor Betreten, Anrede mit Nachnamen</li>
      <li>Intimsphäre: Sichtschutz, abgedeckt pflegen</li>
      <li>Patient einbeziehen, erklären, fragen</li>
      <li>Sprache wertschätzend, keine Verkleinerung</li>
      <li>Entscheidungen akzeptieren – auch wenn anders als gewünscht</li>
    </ul></p>
    <p><strong>Würdeverletzung</strong>: Kommunikation über den Kopf hinweg, fehlende Intimsphäre, Infantilisierung, Zwang ohne Grundlage.</p>`,
    questions: [
      { q: "Würde ist in Deutschland verankert in:", a: ["SGB V","Grundgesetz Art. 1","BGB","StGB"], correct: 1, explain: "'Die Würde des Menschen ist unantastbar.'" },
      { q: "Welche Handlung wahrt die Würde NICHT?", a: ["Anklopfen","Kommunikation über den Kopf hinweg","Abdecken beim Waschen","Nach Wünschen fragen"], correct: 1, explain: "Würdeverletzung: Nicht-Einbeziehen." }
    ],
    flashcards: [
      { front: "Grundgesetz Art. 1", back: "Die Würde des Menschen ist unantastbar." },
      { front: "Respekt in der Praxis", back: "Anklopfen · Sichtschutz · Ansprache mit Namen · Einbeziehen" }
    ]
  },

  pflegecharta: {
    title: "Pflegecharta", category: "ethik",
    intro: "Charta der Rechte hilfe- und pflegebedürftiger Menschen (2005, BMFSFJ). 8 Artikel zu Selbstbestimmung, Pflege, Sicherheit, Teilhabe.",
    content: `<p><strong>Die 8 Artikel</strong>:
    <ol>
      <li>Selbstbestimmung und Hilfe zur Selbsthilfe</li>
      <li>Körperliche und seelische Unversehrtheit, Freiheit und Sicherheit</li>
      <li>Privatheit</li>
      <li>Pflege, Betreuung und Behandlung</li>
      <li>Information, Beratung und Aufklärung</li>
      <li>Kommunikation, Wertschätzung und Teilhabe</li>
      <li>Religion, Kultur und Weltanschauung</li>
      <li>Sterben und Tod</li>
    </ol></p>
    <p><strong>Rechtlich</strong>: nicht bindend, aber Orientierungsrahmen.</p>`,
    questions: [
      { q: "Wie viele Artikel hat die Pflegecharta?", a: ["5","8","10","12"], correct: 1, explain: "8 Artikel." },
      { q: "Artikel 1 regelt:", a: ["Selbstbestimmung","Religion","Sterben","Sicherheit"], correct: 0, explain: "Artikel 1: Selbstbestimmung und Hilfe zur Selbsthilfe." },
      { q: "Pflegecharta ist:", a: ["Gesetz","Orientierungsrahmen/Empfehlung","EU-Verordnung","Pflegevertrag"], correct: 1, explain: "Nicht bindend, aber orientierend." }
    ],
    flashcards: [
      { front: "Pflegecharta – Jahr", back: "2005 (BMFSFJ)" },
      { front: "Artikel 1", back: "Selbstbestimmung und Hilfe zur Selbsthilfe" },
      { front: "Verbindlichkeit", back: "Nicht bindend, aber wertvoller Orientierungsrahmen" }
    ]
  },

  utilitarismus_kant: {
    title: "Utilitarismus & Kant", category: "ethik",
    intro: "Zwei klassische ethische Denkrichtungen: teleologisch (Utilitarismus) vs. deontologisch (Kant).",
    content: `<p><strong>Utilitarismus</strong> (Bentham, Mill): Handlungen werden nach ihren <em>Folgen</em> beurteilt. Ziel: „Größtes Glück für die größte Zahl." Nutzen maximieren.</p>
    <p><strong>Kant – Pflichtethik</strong>: Gesinnungsethik, Kategorischer Imperativ: „Handle nur nach der Maxime, von der du zugleich wollen kannst, dass sie ein allgemeines Gesetz werde." Der Mensch darf nie nur Mittel, sondern immer auch Zweck sein.</p>
    <p><strong>Pflege-Relevanz</strong>: Utilitarismus begründet Ressourcen-Abwägung (Triage); Kant schützt die Würde der Einzelperson.</p>`,
    questions: [
      { q: "Kategorischer Imperativ – Herkunft:", a: ["Mill","Kant","Bentham","Aristoteles"], correct: 1, explain: "Immanuel Kant." },
      { q: "Utilitarismus fragt nach:", a: ["Pflicht","Folgen/Nutzen","Tugend","Götterwillen"], correct: 1, explain: "Teleologisch – Folgenorientiert." },
      { q: "Utilitaristischer Satz:", a: ["Handle so, dass deine Maxime allgemeines Gesetz wird","Das größte Glück der größten Zahl","Behandle andere wie dich selbst","Folge deiner Tugend"], correct: 1, explain: "Bentham/Mill: Glückskalkül." }
    ],
    flashcards: [
      { front: "Utilitarismus – Kern", back: "Folgenorientiert · größtes Glück für größte Zahl" },
      { front: "Kant – Kern", back: "Deontologisch · Kategorischer Imperativ · Mensch als Zweck" },
      { front: "Begründer Utilitarismus", back: "Jeremy Bentham · John Stuart Mill" }
    ]
  },

  /* ===================== NOTFALL ===================== */
  notfall_vergiftung: {
    title: "Notfall: Vergiftung", category: "notfall",
    intro: "Jede Aufnahme einer toxischen Substanz. Akut: Bewusstseinsstörung, Atem-/Kreislaufprobleme möglich.",
    content: `<p><strong>Basismaßnahmen</strong>: Eigenschutz, Bewusstsein prüfen, Atmung, Kreislauf, 112 rufen, stabile Seitenlage bei Bewusstlosigkeit.</p>
    <p><strong>Giftinformationszentrum</strong>: Telefonnummer regional, Infos zur Substanz sammeln (Packung aufheben!).</p>
    <p><strong>Maßnahmen nach Art</strong>:
    <ul>
      <li>Oral: nicht zum Erbrechen bringen (außer ärztlich angeordnet), kein Erbrechen bei ätzenden Stoffen oder Benommenen</li>
      <li>Inhalativ: Frischluft</li>
      <li>Haut: Kleidung entfernen, abwaschen</li>
      <li>Augen: mindestens 15 Min spülen</li>
    </ul></p>
    <p><strong>Aktivkohle</strong>: binnen 1 h nach oraler Aufnahme vieler Gifte (außer Säuren, Laugen, Eisen, Lithium).</p>
    <p><strong>Antidote</strong>: Naloxon (Opiate), Flumazenil (Benzos), N-Acetylcystein (Paracetamol), Atropin (Organophosphate).</p>`,
    questions: [
      { q: "Was NICHT tun?", a: ["Erbrechen herbeiführen bei ätzenden Stoffen","112 rufen","Packung sichern","Frischluft zuführen"], correct: 0, explain: "Kein Erbrechen bei ätzenden Stoffen oder Bewusstseinsstörung." },
      { q: "Antidot bei Paracetamol-Intox:", a: ["N-Acetylcystein","Flumazenil","Naloxon","Vitamin K"], correct: 0, explain: "NAC bindet toxische Metaboliten." },
      { q: "Naloxon ist Antidot bei:", a: ["Benzodiazepinen","Opioiden","Paracetamol","Alkohol"], correct: 1, explain: "Opioid-Antagonist." }
    ],
    flashcards: [
      { front: "Antidot Opiate", back: "Naloxon" },
      { front: "Antidot Benzodiazepine", back: "Flumazenil" },
      { front: "Antidot Paracetamol", back: "N-Acetylcystein (NAC)" },
      { front: "Aktivkohle", back: "Bis 1 h oral, NICHT bei Säuren/Laugen/Eisen/Lithium" }
    ]
  },

  herzinfarkt: {
    title: "Notfall: Herzinfarkt", category: "notfall",
    intro: "Akuter Verschluss einer Koronararterie, Myokardzellen sterben ab. Zeit = Muskel!",
    content: `<p><strong>Symptome</strong>: plötzlich einsetzender retrosternaler Vernichtungsschmerz (&gt;20 Min), ausstrahlend (li. Arm, Kiefer, Oberbauch), Todesangst, Kaltschweiß, Übelkeit, Dyspnoe. Bei Frauen/Diabetes/Älteren oft atypisch.</p>
    <p><strong>Sofortmaßnahmen</strong>:
    <ul>
      <li>112 rufen</li>
      <li>Oberkörper hoch lagern</li>
      <li>Beruhigen, beengende Kleidung öffnen</li>
      <li>O2 bei SpO2 &lt;90%</li>
      <li>ASS 250 mg, Nitrolingual (ärztlich), Heparin, ggf. Morphin</li>
    </ul></p>
    <p><strong>Diagnostik</strong>: 12-Kanal-EKG (ST-Hebung = STEMI), Troponin, CK-MB, Echo.</p>
    <p><strong>Therapie</strong>: PCI (perkutane Koronarintervention mit Stent), innerhalb 90 Min.</p>`,
    questions: [
      { q: "Leitsymptom Herzinfarkt:", a: ["Druckschmerz im Bauch","Retrosternaler Vernichtungsschmerz > 20 Min","Juckreiz","Pulsieren im Ohr"], correct: 1, explain: "Retrosternaler Schmerz mit Ausstrahlung." },
      { q: "ASS-Gabe in der Erstversorgung:", a: ["500 mg","250 mg","10 mg","100 mg"], correct: 1, explain: "250 mg ASS als Initial-Gerinnungshemmung." },
      { q: "STEMI bedeutet:", a: ["Stent-Thrombose","ST-Elevation Myokardinfarkt","Schmerzen Temporal","Statine"], correct: 1, explain: "ST-Strecken-Hebungs-Infarkt." }
    ],
    flashcards: [
      { front: "Herzinfarkt – Leitsymptom", back: "Retrosternaler Vernichtungsschmerz > 20 Min, ausstrahlend" },
      { front: "STEMI", back: "ST-Elevation Myokardinfarkt – PCI binnen 90 Min" },
      { front: "ASS-Dosis Notfall", back: "250 mg einmalig" }
    ]
  },

  atemnot: {
    title: "Notfall: Atemnot", category: "notfall",
    intro: "Dyspnoe kann lebensbedrohlich sein. Ursachen breit: pulmonal, kardial, psychogen, metabolisch.",
    content: `<p><strong>Sofortmaßnahmen</strong>:
    <ul>
      <li>Aufrechte Position / Kutschersitz</li>
      <li>Beengende Kleidung öffnen, Fenster auf</li>
      <li>Beruhigen, langsames Atmen anleiten</li>
      <li>SpO2 messen, O2-Gabe titriert (Vorsicht COPD: niedrige Flussrate)</li>
      <li>Notruf bei akuter Verschlechterung</li>
    </ul></p>
    <p><strong>Häufige Ursachen</strong>:
    <ul>
      <li>Asthma-Anfall → SABA inhalieren</li>
      <li>Lungenödem (Linksherz) → OK hoch, Diuretika, Nitrate</li>
      <li>Lungenembolie → s. gesondert</li>
      <li>Pneumothorax → einseitige Dyspnoe, Thoraxschmerz, abgeschwächtes AG</li>
      <li>Hyperventilation (Angst) → Beruhigen, Tüte NICHT mehr empfohlen (Hypoxie!), CO2-Rückatmung allenfalls kurz</li>
    </ul></p>`,
    questions: [
      { q: "Asthma-Anfall – 1. Maßnahme:", a: ["Sauerstoff 10 l","Kutschersitz + Bedarfsspray (Salbutamol)","Flach legen","Psychopharmaka"], correct: 1, explain: "SABA + atemerleichternde Position." },
      { q: "Wieso Tütenatmung bei Hyperventilation kritisch?", a: ["Zu aufwändig","Hypoxie-Gefahr","Keine Wirkung","Zu teuer"], correct: 1, explain: "Gefahr der Hypoxie – nicht mehr routinemäßig empfohlen." },
      { q: "O2-Gabe bei COPD:", a: ["Immer 15 l","Titriert, z. B. 1–2 l/min","Kontraindiziert","Nur nachts"], correct: 1, explain: "Niedrige Flussrate wegen Atemantrieb." }
    ],
    flashcards: [
      { front: "Atemerleichternde Position", back: "Kutschersitz, aufrecht, Arme abstützen, Lippenbremse" },
      { front: "O2 bei COPD", back: "Niedrig dosiert (1–2 l), Ziel SpO2 88–92%" }
    ]
  },

  /* ===================== TOD & STERBEN / RECHT ===================== */
  tod_sterben: {
    title: "Tod & Sterben", category: "ethik",
    intro: "Pflegerische Begleitung am Lebensende (Palliativpflege). Ziel: Lebensqualität und Würde in der letzten Lebensphase.",
    content: `<p><strong>Sterbephasen nach Kübler-Ross</strong>:
    <ol>
      <li>Nicht-wahrhaben-Wollen</li>
      <li>Zorn</li>
      <li>Verhandeln</li>
      <li>Depression</li>
      <li>Annehmen</li>
    </ol></p>
    <p><strong>Sichere Todeszeichen</strong>: Totenflecke (Livores), Totenstarre (Rigor), Autolyse/Fäulnis. (Unsicher: Bewusstlosigkeit, Atemstillstand, Pupillenstarre.)</p>
    <p><strong>Hospiz / Palliativ</strong>: ambulant und stationär. SAPV = Spezialisierte Ambulante Palliativversorgung.</p>
    <p><strong>Pflege</strong>: Symptomkontrolle (Schmerz, Atemnot, Übelkeit, Angst), Mundpflege, Lagerung, Kommunikation, Angehörige begleiten, nach Tod: Versorgung des Verstorbenen (Abschiedsritual, Dokumentation, kein Wegdrücken der Augen mit Gewicht).</p>`,
    questions: [
      { q: "Wie viele Sterbephasen beschreibt Kübler-Ross?", a: ["3","4","5","7"], correct: 2, explain: "5 Phasen." },
      { q: "Sicheres Todeszeichen:", a: ["Atemstillstand","Totenflecke","Pupillenstarre","Bewusstlosigkeit"], correct: 1, explain: "Erst Livores/Rigor/Autolyse sind sicher." },
      { q: "SAPV steht für:", a: ["Spezialisierte Ambulante PalliativVersorgung","Sozialamt-Pflegeverband","Stationäre Akute Pflege","Sonder-AP"], correct: 0, explain: "Spezialisierte ambulante palliative Versorgung." }
    ],
    flashcards: [
      { front: "Kübler-Ross", back: "Nicht-wahrhaben · Zorn · Verhandeln · Depression · Annehmen" },
      { front: "Sichere Todeszeichen", back: "Livores · Rigor mortis · Autolyse/Fäulnis" },
      { front: "SAPV", back: "Spez. Ambulante Palliativversorgung" }
    ]
  },

  sterbehilfe: {
    title: "Sterbehilfe", category: "ethik",
    intro: "Begriff umfasst verschiedene Formen der Hilfe beim/am Sterben. In Deutschland rechtlich differenziert.",
    content: `<ul>
      <li><strong>Passive Sterbehilfe</strong>: Verzicht auf lebensverlängernde Maßnahmen (legal, bei Patientenwunsch).</li>
      <li><strong>Indirekte Sterbehilfe</strong>: Schmerztherapie mit möglicher, aber nicht beabsichtigter Lebensverkürzung (legal).</li>
      <li><strong>Assistierter Suizid</strong>: Bereitstellung tödlicher Mittel, Patient wendet selbst an. In D seit BVerfG-Urteil 2020 grundsätzlich erlaubt, Neuregelung noch in Arbeit.</li>
      <li><strong>Aktive Sterbehilfe</strong>: Tötung auf Verlangen – in D <em>verboten</em> (§ 216 StGB).</li>
    </ul>
    <p><strong>Ethik</strong>: Autonomie vs. Lebensschutz, Doppeleffekt-Prinzip bei Schmerztherapie.</p>`,
    questions: [
      { q: "In Deutschland verboten ist:", a: ["Passive Sterbehilfe","Indirekte Sterbehilfe","Aktive Sterbehilfe (Tötung auf Verlangen)","Schmerztherapie"], correct: 2, explain: "§ 216 StGB: Tötung auf Verlangen verboten." },
      { q: "Passive Sterbehilfe bedeutet:", a: ["Tötung","Verzicht auf lebenserhaltende Maßnahmen","Aktive Euthanasie","Reanimation"], correct: 1, explain: "Therapiebegrenzung/-verzicht." },
      { q: "Assistierter Suizid ist aktuell:", a: ["Nicht regelbar","Grundsätzlich erlaubt (BVerfG 2020)","Verboten","Nur ärztlich"], correct: 1, explain: "BVerfG 2020: Recht auf selbstbestimmtes Sterben, Neuregelung in Arbeit." }
    ],
    flashcards: [
      { front: "§ 216 StGB", back: "Tötung auf Verlangen – aktive Sterbehilfe verboten" },
      { front: "Indirekte Sterbehilfe", back: "Symptomlinderung mit Risiko Lebensverkürzung – legal" },
      { front: "BVerfG 2020", back: "Recht auf selbstbestimmtes Sterben – Assistenz möglich" }
    ]
  },

  patientenverfuegung: {
    title: "Patientenverfügung", category: "sozialrecht",
    intro: "Schriftliche Vorausverfügung, welche medizinischen Maßnahmen bei Einwilligungsunfähigkeit erwünscht/abgelehnt werden. § 1901a BGB.",
    content: `<p><strong>Voraussetzungen</strong>:
    <ul>
      <li>Volljährig, einwilligungsfähig bei Errichtung</li>
      <li>Schriftform mit Unterschrift</li>
      <li>konkrete, auf aktuelle Situation bezogene Regelungen</li>
      <li>jederzeit formlos widerrufbar</li>
    </ul></p>
    <p><strong>Abgrenzung</strong>:
    <ul>
      <li>Vorsorgevollmacht: benennt Person, die im Notfall entscheidet</li>
      <li>Betreuungsverfügung: Wunsch nach bestimmter Betreuungsperson, falls Gericht einen Betreuer bestellt</li>
    </ul></p>
    <p><strong>Praxis</strong>: Patientenverfügung ist bindend – der mutmaßliche Wille ist umzusetzen (§ 1901b BGB). Bei Unklarheit Ermittlung durch Betreuer/Bevollmächtigten und Arzt.</p>`,
    questions: [
      { q: "Rechtsgrundlage Patientenverfügung:", a: ["§ 37 SGB V","§ 1901a BGB","§ 216 StGB","§ 7 SGB XI"], correct: 1, explain: "§ 1901a BGB." },
      { q: "Welche Form ist vorgeschrieben?", a: ["Notariell beglaubigt","Schriftform mit Unterschrift","Mündlich","Video"], correct: 1, explain: "Schriftform reicht." },
      { q: "Vorsorgevollmacht ≠ Patientenverfügung, weil:", a: ["Sie benennt eine entscheidende Person, PV regelt Maßnahmen","Sie ist teurer","Sie ist nicht bindend","Sie ist für Kinder"], correct: 0, explain: "Vollmacht = Person · Verfügung = Inhalte." }
    ],
    flashcards: [
      { front: "Patientenverfügung – § ?", back: "§ 1901a BGB" },
      { front: "Form", back: "Schriftlich, eigenhändig unterschrieben" },
      { front: "Vorsorgevollmacht", back: "Bevollmächtigt eine Person zur Entscheidung (< Patientenverfügung)" }
    ]
  },

  betreuungsrecht: {
    title: "Betreuungsrecht", category: "sozialrecht",
    intro: "Rechtliche Betreuung (seit 1992) – ersetzt die Entmündigung. Ziel: Unterstützung bei Entscheidungen, nicht Bevormundung.",
    content: `<p><strong>Grundsätze</strong>:
    <ul>
      <li>Erforderlichkeitsprinzip (§ 1896 BGB): nur soweit nötig</li>
      <li>Subsidiarität: andere Hilfe (Vollmacht) geht vor</li>
      <li>Wohl und Wünsche des Betreuten stehen im Vordergrund</li>
    </ul></p>
    <p><strong>Aufgabenkreise</strong>: Gesundheitssorge, Vermögenssorge, Aufenthaltsbestimmung, Behördenangelegenheiten, Post.</p>
    <p><strong>Verfahren</strong>: Antrag/Anregung → Gutachten → Anhörung → Betreuungsgericht entscheidet. Überprüfung nach 7 Jahren.</p>
    <p><strong>Reform 2023</strong>: Stärkere Wünsche-Orientierung, digitale Register, Ehegatten-Notvertretungsrecht (§ 1358 BGB).</p>`,
    questions: [
      { q: "Wer bestellt Betreuer?", a: ["Hausarzt","Betreuungsgericht","Pflegekasse","Sozialamt"], correct: 1, explain: "Gericht." },
      { q: "Grundprinzip ist:", a: ["Bevormundung","Erforderlichkeit","Alternativlosigkeit","Schnelligkeit"], correct: 1, explain: "Nur so viel Betreuung wie nötig." },
      { q: "Ehegatten-Notvertretung (seit 2023) regelt:", a: ["Erbfragen","Gesundheitsentscheidungen bis 6 Monate bei Einwilligungsunfähigkeit","Scheidung","Kinderunterhalt"], correct: 1, explain: "§ 1358 BGB, max. 6 Monate Gesundheitsentscheidungen." }
    ],
    flashcards: [
      { front: "Betreuungsrecht seit", back: "1992 (ersetzt die Entmündigung)" },
      { front: "Zuständig", back: "Betreuungsgericht (Amtsgericht)" },
      { front: "§ 1358 BGB", back: "Ehegatten-Notvertretungsrecht seit 2023" }
    ]
  },

  freiheitsentziehende: {
    title: "Freiheitsentziehende Maßnahmen (FEM)", category: "sozialrecht",
    intro: "Jede Einschränkung der Bewegungsfreiheit gegen den Willen oder bei nicht einwilligungsfähigen Personen. Nur als Ultima Ratio!",
    content: `<p><strong>Beispiele</strong>: Bettgitter, Bauch-/Hüftgurte, Vorsatztische, Sedierung zur Bewegungseinschränkung, Stecknadeln, verschlossene Türen.</p>
    <p><strong>Rechtliche Grundlage</strong>: Nur zulässig bei
    <ol>
      <li>Einwilligung des einwilligungsfähigen Patienten, oder</li>
      <li>Richterlicher Genehmigung (§ 1906 BGB) auf Antrag des Betreuers</li>
      <li>Rechtfertigender Notstand (akute Eigen-/Fremdgefährdung, § 34 StGB)</li>
    </ol></p>
    <p><strong>Alternativen (Werdenfelser Weg)</strong>: Niedrigflurbetten, Sensormatten, Hüftprotektoren, Bewegungsförderung, Beleuchtung, Biografiearbeit.</p>
    <p><strong>Dokumentation</strong>: Anlass, Art, Dauer, Genehmigung, Kontrolle, Evaluation.</p>`,
    questions: [
      { q: "Bettgitter ohne Einverständnis bei einwilligungsfähigem Patienten:", a: ["Erlaubt","FEM, nur mit Einwilligung/Genehmigung","Pflegerischer Standard","Kein Problem"], correct: 1, explain: "Ist eine freiheitsentziehende Maßnahme." },
      { q: "Werdenfelser Weg zielt auf:", a: ["Mehr FEM","Reduktion von FEM","Verschärfung","Sedierung"], correct: 1, explain: "Alternative Konzepte statt FEM." },
      { q: "Rechtsgrundlage:", a: ["§ 37 SGB V","§ 1906 BGB","§ 216 StGB","§ 113 SGB XI"], correct: 1, explain: "Richterliche Genehmigung nach § 1906 BGB." }
    ],
    flashcards: [
      { front: "FEM", back: "Freiheitsentziehende Maßnahme – nur mit Einwilligung oder richterlicher Genehmigung" },
      { front: "§ 1906 BGB", back: "Rechtsgrundlage der FEM" },
      { front: "Werdenfelser Weg", back: "Vermeidung von FEM durch Alternativen" }
    ]
  },

  /* ===================== WUNDMANAGEMENT ===================== */
  wundmanagement: {
    title: "Wundmanagement – Grundlagen", category: "wunde",
    intro: "Wunde = Gewebeunterbrechung. Phasen der Wundheilung: Exsudation – Granulation – Epithelisierung.",
    content: `<p><strong>Wundarten</strong>: akute vs. chronische (≥ 8 Wochen). Primäre Heilung (glatte Ränder, z. B. OP-Wunde) vs. sekundäre Heilung (klaffende Wunde, granuliert von unten).</p>
    <p><strong>Wundheilungsphasen</strong>:
    <ol>
      <li>Exsudative Phase (1–4 Tage): Blutstillung, Reinigung</li>
      <li>Granulationsphase (3.–14. Tag): Gewebeaufbau</li>
      <li>Epithelisierungsphase (ab 7.–24. Tag): Hautschluss</li>
    </ol></p>
    <p><strong>Phasenorientierter Verbandswechsel</strong>:
    <ul>
      <li>Exsudativ: saugender Verband (Alginat, Schaum)</li>
      <li>Granulativ: feuchtes Milieu (Hydrokolloid, Schaumstoff)</li>
      <li>Epithelisierend: Schutz, dünne Folie</li>
    </ul></p>
    <p><strong>Heilungshemmung</strong>: Diabetes, Durchblutungsstörung, Immunsuppression, Rauchen, Alter, Mangelernährung.</p>`,
    questions: [
      { q: "Eine chronische Wunde besteht länger als:", a: ["2 Tage","2 Wochen","8 Wochen","6 Monate"], correct: 2, explain: "≥ 8 Wochen = chronisch." },
      { q: "In der Granulationsphase empfiehlt sich:", a: ["Trockener Verband","Feuchtes Wundmilieu","Puder","Offene Wundbehandlung"], correct: 1, explain: "Feucht = ideal für Granulation." },
      { q: "Welche Phase fehlt? Exsudation – … – Epithelisierung", a: ["Granulation","Reinigung","Narbe","Wundrand"], correct: 0, explain: "3 Phasen: Exsudation → Granulation → Epithelisierung." }
    ],
    flashcards: [
      { front: "3 Wundheilungsphasen", back: "Exsudation · Granulation · Epithelisierung" },
      { front: "Akut vs. chronisch", back: "Chronisch ≥ 8 Wochen" },
      { front: "Feuchte Wundbehandlung", back: "Förderung Granulation/Epithelisierung; kein Austrocknen" }
    ]
  },

  dekubitus: {
    title: "Dekubitus", category: "wunde",
    intro: "Druckbedingte Schädigung von Haut und Gewebe. Entsteht durch anhaltenden Druck, meist über Knochenvorsprüngen. Expertenstandard Dekubitusprophylaxe.",
    content: `<p><strong>Ursachen</strong>: Druck × Zeit + Scherkräfte + Reibung. Prädilektionsstellen: Sacrum, Fersen, Trochanter, Malleolen, Okziput.</p>
    <p><strong>Stadien (EPUAP)</strong>:
    <ul>
      <li>I – nicht wegdrückbare Rötung bei intakter Haut</li>
      <li>II – Teilverlust der Haut (Blase/Abschürfung)</li>
      <li>III – Vollhautdefekt, Subkutangewebe sichtbar</li>
      <li>IV – bis Muskel/Sehne/Knochen</li>
    </ul></p>
    <p><strong>Risikoeinschätzung</strong>: Braden-, Norton-, Waterlow-Skala; DNQP empfiehlt klinisches Urteil.</p>
    <p><strong>Prophylaxe</strong>: Bewegungsförderung, Druckentlastung (Positionswechsel alle 2h, Mikrolagerung, Weichlagerung), Hautpflege, Ernährung (EW, Flüssigkeit), Inkontinenz-Management. <em>Keine</em> Massage, <em>keine</em> eisgekühlten Umschläge!</p>`,
    questions: [
      { q: "Stadium II Dekubitus:", a: ["Rötung ohne Hautdefekt","Teilverlust der Haut (Blase)","Muskelsichtbar","Knochen"], correct: 1, explain: "II = Hautteilverlust." },
      { q: "Welche Prädilektionsstelle fehlt? Sacrum – Fersen – Trochanter – …", a: ["Schulterblatt","Okziput","Ellbogen","alle"], correct: 3, explain: "Weitere sind Okziput, Schulterblatt, Malleolen – Liste ist länger." },
      { q: "Was ist KEINE Prophylaxe?", a: ["Druckentlastung","Hautpflege","Massieren von Hautrötungen","Mobilisation"], correct: 2, explain: "Massieren verstärkt Gewebsschaden!" }
    ],
    flashcards: [
      { front: "Dekubitus = ", back: "Druck × Zeit + Scherkräfte → Gewebsschaden" },
      { front: "EPUAP-Stadien", back: "I Rötung · II Hautteilverlust · III Vollhaut · IV bis Muskel/Knochen" },
      { front: "Risiko-Skalen", back: "Braden · Norton · Waterlow" }
    ]
  },

  chronische_wunden: {
    title: "Chronische Wunden", category: "wunde",
    intro: "Wunden, die nach 8 Wochen nicht abgeheilt sind. Hauptgruppen: Ulcus cruris venosum/arteriosum, Dekubitus, diabetisches Fußsyndrom (DFS).",
    content: `<p><strong>Ulcus cruris venosum</strong>: chronisch-venöse Insuffizienz → meist Innenknöchel. Th: Kompressionstherapie (!!), Bewegung, Hochlagerung.</p>
    <p><strong>Ulcus cruris arteriosum</strong>: PAVK → oft an Zehen, tief, schmerzhaft. Kompression <em>kontraindiziert</em>! Durchblutung verbessern.</p>
    <p><strong>Diabetisches Fußsyndrom</strong>: Polyneuropathie + Durchblutungsstörung → Druckulcera, oft schmerzlos. Entlastung, Wundmanagement, Schuhversorgung.</p>
    <p><strong>Expertenstandard</strong>: „Pflege von Menschen mit chronischen Wunden" – Assessment, Wundanamnese, Lebensqualität.</p>
    <p><strong>T.I.M.E.-Prinzip</strong>: Tissue (Gewebe) · Infection/Inflammation · Moisture (Feuchtigkeit) · Edge (Wundrand).</p>`,
    questions: [
      { q: "Bei Ulcus cruris venosum ist Therapie der Wahl:", a: ["Bettruhe","Kompressionstherapie","Kortison","Wärme"], correct: 1, explain: "Kompression zur Reduktion des venösen Stauungsdrucks." },
      { q: "Bei arteriellem Ulcus ist KONTRAINDIZIERT:", a: ["Durchblutungsfördernd","Kompressionstherapie","Schmerztherapie","Wundauflage"], correct: 1, explain: "Kompression verstärkt arterielle Minderdurchblutung!" },
      { q: "T.I.M.E. steht für:", a: ["Tissue, Infection, Moisture, Edge","Time, Impact, Mass, Energy","Therapy, Insulin, Mobility, Exercise","Tissue, Immune, Mobility, Edge"], correct: 0, explain: "Wundbettvorbereitung-Prinzip." }
    ],
    flashcards: [
      { front: "Ulcus cruris venosum", back: "Kompressionstherapie + Bewegung + Hochlagerung" },
      { front: "Ulcus cruris arteriosum", back: "KEINE Kompression, Durchblutung verbessern" },
      { front: "T.I.M.E.-Prinzip", back: "Tissue · Infection · Moisture · Edge" }
    ]
  },

  akute_wunden: {
    title: "Akute Wunden", category: "wunde",
    intro: "Neu entstandene Wunden: Schnitt-, Stich-, Riss-, Quetsch-, Biss-, Schürf-, Schuss-, Brand- und OP-Wunden.",
    content: `<p><strong>Wundversorgung</strong>:
    <ol>
      <li>Eigenschutz (Handschuhe)</li>
      <li>Blutstillung (Druckverband)</li>
      <li>Reinigung (NaCl, Ringer)</li>
      <li>Desinfektion (Octenidin, Polyhexanid)</li>
      <li>Adäquater Wundverband</li>
      <li>Tetanus-Check!</li>
    </ol></p>
    <p><strong>Bisswunden</strong>: hohe Infektionsgefahr – meist offen lassen, AB-Prophylaxe.</p>
    <p><strong>Verbrennungen</strong>:
    <ul>
      <li>Grad 1: Rötung (wie Sonnenbrand)</li>
      <li>Grad 2a: Blasen, schmerzhaft</li>
      <li>Grad 2b: tiefe Dermis</li>
      <li>Grad 3: Koagulationsnekrose, schmerzlos</li>
      <li>Grad 4: Verkohlung</li>
    </ul>
    Neuner-Regel (Erw.): Arm 9%, Bein 18%, Rumpf vorn 18%, hinten 18%, Kopf 9%, Genitale 1%. Kühlen mit lauwarmem Wasser, nicht eiskalt.</p>`,
    questions: [
      { q: "Eine Verbrennung 2a zeigt:", a: ["Rötung ohne Blasen","Blasen, schmerzhaft","Koagulation, schmerzlos","Verkohlung"], correct: 1, explain: "2a: Blasen, feucht, schmerzhaft." },
      { q: "Armanteil nach Neuner-Regel (Erw.):", a: ["5%","9%","18%","36%"], correct: 1, explain: "9% pro Arm." },
      { q: "Bei Bisswunden gilt:", a: ["Sofort zunähen","Offen lassen, AB-Prophylaxe","Pflaster reicht","Nur spülen"], correct: 1, explain: "Hohe Infektionsgefahr, nicht primär verschließen." }
    ],
    flashcards: [
      { front: "Neuner-Regel Erw.", back: "Arm 9 · Bein 18 · Rumpf je 18 · Kopf 9 · Genitale 1" },
      { front: "Kühlen bei Verbrennung", back: "Lauwarmes Wasser, nicht Eiswasser – Hypothermie-Gefahr" },
      { front: "Bisswunde", back: "Offen lassen + AB-Prophylaxe (infektionsträchtig)" }
    ]
  }

}; // END OF TOPICS

/* ===========================================================
   WOCHENPLAN (28 Lernwochen) – nach Planung RBB Müritz
   =========================================================== */

const WEEKS = [
  { n: 1,  mo: "paraphrasieren",       di: "nervensystem",         mi: "beratung",             do: "herz_anatomie",       fr: "lunge_anatomie" },
  { n: 2,  mo: "verbalisieren",        di: "gefaesssystem",        mi: "beobachtungsprozess",  do: "blutdruck",           fr: "lungenembolie" },
  { n: 3,  mo: "gewaltfreie_kommun",   di: "apoplex",              mi: "anleitung",            do: "thrombose",           fr: "pneumonie" },
  { n: 4,  mo: "watzlawick",           di: "hirnareale",           mi: null,                    do: "virchow_trias",       fr: "copd" },
  { n: 5,  mo: "schulz_von_thun",      di: null,                   mi: null,                    do: "herzerkrankungen",    fr: "asthma_b" },
  { n: 6,  mo: "niere_anatomie",       di: "qm",                   mi: "verdauungssystem",     do: "vers_neugeborener",   fr: "diabetes_m" },
  { n: 7,  mo: "urinbeobachtung",      di: "pflegestuetzpunkt",    mi: "morbus_crohn",         do: "apgar",               fr: "stoffwechsel" },
  { n: 8,  mo: "zystitis",             di: "solidaritaetsprinzip", mi: "colitis_ulcerosa",     do: "neurodermitis",       fr: "pavk" },
  { n: 9,  mo: "dialyse",              di: "krankenhausfinanzierung", mi: "darmkrebs",         do: "perzentile",          fr: "funktion_insulin" },
  { n: 10, mo: "nierenerkrankungen",   di: "leistungstraeger",     mi: "obstipation",          do: "frakturen",           fr: "folgeerkrankungen" },
  { n: 11, mo: "bewegungsapp_anat",    di: "gesundheitsfoerderung", mi: "depressionen",        do: "qm",                  fr: "nosokomiale" },
  { n: 12, mo: "osteoporose",          di: "rehabilitation",       mi: "ptbs",                 do: "leitlinien_standards", fr: "noro_rota" },
  { n: 13, mo: "bechterew",            di: "pflegeforschung",      mi: "essstoerungen",        do: "fallbesprechungen",   fr: "mrsa" },
  { n: 14, mo: "bandscheibenvorfall",  di: null,                   mi: null,                    do: "casemanagement",      fr: null },
  { n: 15, mo: null,                   di: null,                   mi: null,                    do: "sdm",                 fr: null },
  { n: 16, mo: "rheumatoider_formenk", di: "pflegebeduerftigkeit", mi: "morbus_parkinson",     do: "onko_erkrankungen",   fr: "pflegeprozess" },
  { n: 17, mo: null,                   di: "pflegesysteme",        mi: null,                    do: "tumorklassen",        fr: "atl_abedl" },
  { n: 18, mo: null,                   di: null,                   mi: null,                    do: "metastasierung",      fr: "pesr_smart" },
  { n: 19, mo: null,                   di: null,                   mi: null,                    do: "risikofaktoren",      fr: "sis" },
  { n: 20, mo: null,                   di: null,                   mi: null,                    do: "therapieformen",      fr: "expertenstandard" },
  { n: 21, mo: "ethik",                di: "notfall_vergiftung",   mi: "tod_sterben",          do: "betreuungsrecht",     fr: "wundmanagement" },
  { n: 22, mo: "icn",                  di: "lungenembolie",        mi: null,                    do: "sterbehilfe",         fr: "dekubitus" },
  { n: 23, mo: "wuerde_respekt",       di: "herzinfarkt",          mi: null,                    do: "patientenverfuegung", fr: "chronische_wunden" },
  { n: 24, mo: "pflegecharta",         di: "apoplex",              mi: null,                    do: "freiheitsentziehende", fr: "akute_wunden" },
  { n: 25, mo: "utilitarismus_kant",   di: "atemnot",              mi: null,                    do: null,                  fr: null },
  { n: 26, mo: "demenz",               di: "blut_anatomie",        mi: "schwangerschaft",      do: "pflegediagnosen",     fr: null },
  { n: 27, mo: "demenz_formen",        di: "leukaemie",            mi: "wochenbett",           do: null,                  fr: null },
  { n: 28, mo: "umgang_dementen",      di: "anaemie",              mi: "zyklus",               do: null,                  fr: null }
];

/* ===========================================================
   ACHIEVEMENTS
   =========================================================== */
const ACHIEVEMENTS = [
  { id: "first_steps",   icon: "🚀", name: "Erste Schritte",        desc: "1. Thema abgeschlossen",                  check: s => s.completed.length >= 1 },
  { id: "ten_topics",    icon: "📚", name: "Fleißig gelernt",       desc: "10 Themen abgeschlossen",                 check: s => s.completed.length >= 10 },
  { id: "half_way",      icon: "⚡", name: "Halbzeit",              desc: "50 Themen abgeschlossen",                 check: s => s.completed.length >= 50 },
  { id: "all_done",      icon: "🏆", name: "Examen-Ready",          desc: "Alle Themen abgeschlossen",               check: s => s.completed.length >= Object.keys(TOPICS).length },
  { id: "anatomy_ace",   icon: "🫀", name: "Anatomie-Ass",          desc: "Alle Anatomie-Themen geschafft",          check: s => categoryComplete(s, "anatomie") },
  { id: "ethics_expert", icon: "⚖️",  name: "Ethik-Experte",         desc: "Alle Ethik-Themen geschafft",             check: s => categoryComplete(s, "ethik") },
  { id: "psych_pro",     icon: "🧠", name: "Psych-Profi",           desc: "Alle Psychiatrie-Themen geschafft",       check: s => categoryComplete(s, "psychiatrie") },
  { id: "streak_3",      icon: "🔥", name: "3-Tage-Streak",         desc: "3 Tage in Folge gelernt",                 check: s => s.streak >= 3 },
  { id: "streak_7",      icon: "🔥", name: "Wochen-Streak",         desc: "7 Tage in Folge gelernt",                 check: s => s.streak >= 7 },
  { id: "streak_30",     icon: "🌋", name: "Unaufhaltsam",          desc: "30 Tage Streak",                           check: s => s.streak >= 30 },
  { id: "quiz_king",     icon: "👑", name: "Quiz-König",            desc: "100 richtige Antworten",                  check: s => s.correctAnswers >= 100 },
  { id: "perfect",       icon: "💯", name: "Perfektionist",         desc: "Quiz mit 100% abgeschlossen",              check: s => s.perfectQuizzes >= 1 },
  { id: "night_owl",     icon: "🦉", name: "Nachteule",             desc: "Nach 22 Uhr gelernt",                      check: s => s.lateNight },
  { id: "early_bird",    icon: "🌅", name: "Frühaufsteher",         desc: "Vor 7 Uhr gelernt",                        check: s => s.earlyBird },
  { id: "weekend",       icon: "🎮", name: "Wochenendkrieger",       desc: "Am Wochenende gelernt",                    check: s => s.weekendWarrior },
  { id: "marathon",      icon: "🏃", name: "Marathon",              desc: "10 Themen an einem Tag",                   check: s => s.maxPerDay >= 10 },
  { id: "level_5",       icon: "⭐", name: "Level 5",                desc: "Level 5 erreicht",                         check: s => s.level >= 5 },
  { id: "level_10",      icon: "🌟", name: "Level 10",               desc: "Level 10 erreicht",                        check: s => s.level >= 10 },
  { id: "level_20",      icon: "✨", name: "Level 20",               desc: "Level 20 erreicht",                        check: s => s.level >= 20 },
  { id: "boss_win",      icon: "💀", name: "Boss besiegt",           desc: "Boss-Battle gewonnen",                      check: s => s.bossWins >= 1 },
  { id: "flashcard_fan", icon: "🗂️", name: "Karteikarten-König",   desc: "100 Karteikarten studiert",                check: s => s.flashcardsStudied >= 100 },
  { id: "match_master",  icon: "🧩", name: "Matching-Meister",      desc: "Matching-Spiel in < 30 Sek",               check: s => s.matchBestTime && s.matchBestTime < 30 }
];

function categoryComplete(state, cat) {
  const ids = Object.keys(TOPICS).filter(id => TOPICS[id].category === cat);
  return ids.every(id => state.completed.includes(id));
}

/* Expose to app.js */
window.APP_DATA = { TOPICS, WEEKS, CATEGORIES, ACHIEVEMENTS, categoryComplete };






