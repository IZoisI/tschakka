/* ===========================================================
   TSCHAKKA // PRÜFUNGSFRAGEN – INHALTE
   -----------------------------------------------------------
   Offene Fragen im Stil der schriftlichen Abschlussprüfung.
   Schlüssel = Themen-ID aus data.js.
     op     Operator (siehe OPERATORS)
     case   optional: Fallsituation (HTML)
     q      Aufgabenstellung (HTML)
     rubric Erwartungshorizont: [{ t: Text, p: Punkte }]
     max    optional: Höchstpunktzahl, wenn mehr richtige
            Antworten aufgeführt sind als verlangt
     note   optional: Hinweis nach der Bewertung
   =========================================================== */

const OPERATORS = {
  "Nennen":      { afb: "AFB I",      text: "Begriffe oder Fakten ohne Erläuterung aufzählen." },
  "Beschreiben": { afb: "AFB I–II",   text: "Sachverhalt strukturiert und in eigenen Worten wiedergeben." },
  "Erklären":    { afb: "AFB II",     text: "Ursachen und Zusammenhänge nachvollziehbar darstellen." },
  "Erläutern":   { afb: "AFB II",     text: "Erklären und mit Beispielen oder Zusatzinformationen veranschaulichen." },
  "Vergleichen": { afb: "AFB II",     text: "Gemeinsamkeiten und Unterschiede gegenüberstellen." },
  "Ableiten":    { afb: "AFB II–III", text: "Aus der Situation begründete Schlussfolgerungen und Maßnahmen entwickeln." },
  "Begründen":   { afb: "AFB II–III", text: "Aussagen oder Maßnahmen mit fachlichen Argumenten stützen." },
  "Beurteilen":  { afb: "AFB III",    text: "Zu einem Sachverhalt ein fachlich begründetes Urteil fällen." },
  "Formulieren": { afb: "AFB II–III", text: "Fachgerecht und nach vorgegebener Struktur schriftlich ausarbeiten." }
};

const OPEN_QUESTIONS = {

  /* ---------- Pflegeprozess ---------- */
  pesr_smart: [
    { op: "Formulieren",
      case: "Frau M., 82 Jahre, wurde vor 5 Tagen an einer Schenkelhalsfraktur operiert. Sie geht mit dem Rollator, hält sich aber unsicher an Möbeln fest. Sie ist orientiert und sagt: „Ich will unbedingt wieder allein zur Toilette.“",
      q: "Formulieren Sie für Frau M. eine Pflegediagnose nach dem PESR-Schema und ein dazu passendes SMART-Ziel.",
      rubric: [
        { t: "<strong>P</strong>: passendes Pflegeproblem, z. B. Sturzgefahr oder beeinträchtigte Gehfähigkeit", p: 1 },
        { t: "<strong>E</strong>: Ursache benannt, z. B. Z. n. Schenkelhals-OP, Muskelschwäche, Schmerzen", p: 1 },
        { t: "<strong>S</strong>: beobachtbare Zeichen, z. B. unsicheres Gangbild, hält sich an Möbeln fest", p: 1 },
        { t: "<strong>R</strong>: Ressourcen, z. B. orientiert, motiviert, nutzt Rollator", p: 1 },
        { t: "Ziel ist spezifisch und messbar (z. B. Strecke, Hilfsmittel, ohne personelle Hilfe)", p: 1 },
        { t: "Ziel ist realistisch und terminiert (konkretes Datum/Zeitraum)", p: 1 }
      ],
      note: "Beispielziel: „Frau M. geht bis zum [Datum] mit dem Rollator ohne personelle Hilfe sicher vom Bett zur Toilette (ca. 8 m).“"
    }
  ],

  pflegeprozess: [
    { op: "Beschreiben",
      q: "Beschreiben Sie, wie die Evaluation als Phase des Pflegeprozesses abläuft.",
      rubric: [
        { t: "Zielerreichung wird anhand der festgelegten (messbaren) Zielkriterien überprüft", p: 1 },
        { t: "Wirksamkeit der Maßnahmen wird beurteilt, die pflegebedürftige Person wird einbezogen", p: 1 },
        { t: "Konsequenz: Ziele und/oder Maßnahmen anpassen, Prozess beginnt erneut (Regelkreis)", p: 1 },
        { t: "Erfolgt zu geplanten Zeitpunkten und bei Zustandsveränderung; wird dokumentiert", p: 1 }
      ]
    }
  ],

  /* ---------- Prophylaxen ---------- */
  dekubitus: [
    { op: "Erläutern",
      q: "Erläutern Sie vier Maßnahmen der Dekubitusprophylaxe bei einer immobilen Bewohnerin und begründen Sie jeweils die Wirkung.",
      max: 8,
      rubric: [
        { t: "Bewegungsförderung / Positionswechsel nach individuellem Plan (inkl. Mikropositionierung) – verkürzt die Druckeinwirkzeit", p: 2 },
        { t: "Druckverteilende Hilfsmittel (z. B. Weichlagerungs- oder Wechseldruckmatratze) – senken den Auflagedruck", p: 2 },
        { t: "Regelmäßige Hautinspektion mit Fingertest – erkennt Kategorie 1 frühzeitig", p: 2 },
        { t: "Hautpflege und Schutz vor Feuchtigkeit (Inkontinenzversorgung) – verhindert Mazeration", p: 2 },
        { t: "Scher- und Reibekräfte vermeiden (Transfertechnik, Kopfteil möglichst ≤ 30°, Gleithilfen)", p: 2 },
        { t: "Ausreichende Ernährung und Flüssigkeit – Gewebetoleranz und Heilung", p: 2 }
      ]
    },
    { op: "Beschreiben",
      q: "Beschreiben Sie die Durchführung und Bewertung des Fingertests.",
      rubric: [
        { t: "Mit dem Finger kurz auf die gerötete Hautstelle drücken", p: 1 },
        { t: "Stelle wird beim Loslassen weiß (wegdrückbar) → keine Kategorie 1", p: 1 },
        { t: "Rötung bleibt bestehen (nicht wegdrückbar) → Dekubitus Kategorie 1", p: 1 },
        { t: "Konsequenz: sofort vollständig druckentlasten, dokumentieren, nicht massieren", p: 1 }
      ]
    }
  ],

  pneumonie: [
    { op: "Erläutern",
      q: "Erläutern Sie drei Maßnahmen der Pneumonieprophylaxe und begründen Sie diese.",
      max: 6,
      rubric: [
        { t: "Oberkörperhochlagerung / Mobilisation – bessere Belüftung, Zwerchfell kann sich frei bewegen", p: 2 },
        { t: "Atemübungen / Atemtrainer (z. B. Triflo) – vertiefte Inspiration, Belüftung der Lungenbasis", p: 2 },
        { t: "Mundpflege – reduziert Keime, die aspiriert werden könnten", p: 2 },
        { t: "Sekretmobilisation (Flüssigkeit, Inhalation, Abhusten anleiten) – Sekret kann abtransportiert werden", p: 2 },
        { t: "Aspirationsprophylaxe beim Essen (aufrecht sitzen, Schlucken beobachten)", p: 2 }
      ]
    }
  ],

  thrombose: [
    { op: "Erläutern",
      case: "Frau S., 71 Jahre, hat gestern eine Hüft-TEP erhalten. Sie liegt überwiegend im Bett und trinkt wenig.",
      q: "Erläutern Sie das Thromboserisiko von Frau S. anhand der Virchow-Trias.",
      rubric: [
        { t: "Endothelschaden: Gefäßverletzung durch die Operation", p: 2 },
        { t: "Strömungsverlangsamung: Immobilität, fehlende Muskelpumpe", p: 2 },
        { t: "Hyperkoagulabilität: postoperativ gesteigerte Gerinnung, Flüssigkeitsmangel (Bluteindickung)", p: 2 }
      ]
    },
    { op: "Nennen",
      q: "Nennen Sie vier Maßnahmen der Thromboseprophylaxe.",
      max: 4,
      rubric: [
        { t: "Frühmobilisation", p: 1 },
        { t: "Bewegungsübungen (Fußpumpe, Sprunggelenk, Beine anspannen)", p: 1 },
        { t: "Medizinische Thromboseprophylaxestrümpfe / Kompression nach Anordnung", p: 1 },
        { t: "Medikamentöse Prophylaxe (z. B. NMH) nach Anordnung", p: 1 },
        { t: "Ausreichende Flüssigkeitszufuhr", p: 1 },
        { t: "Atemübungen (Sog im Thorax fördert venösen Rückstrom)", p: 1 }
      ]
    }
  ],

  /* ---------- Neurologie ---------- */
  apoplex: [
    { op: "Ableiten",
      case: "Herr B., 68 Jahre, sitzt beim Frühstück. Plötzlich hängt sein rechter Mundwinkel, die Sprache ist verwaschen, die Tasse fällt ihm aus der Hand.",
      q: "Leiten Sie Ihr pflegerisches Vorgehen ab und begründen Sie es.",
      rubric: [
        { t: "FAST-Test durchführen und Uhrzeit des Symptombeginns festhalten – Lyse nur bis 4,5 h möglich", p: 2 },
        { t: "Sofort Arzt/Notruf verständigen – Ziel Stroke Unit („Time is brain“)", p: 1 },
        { t: "Vitalzeichen und Blutzucker messen – Hypoglykämie als Ursache ausschließen", p: 1 },
        { t: "Nichts essen oder trinken lassen, Oberkörper ca. 30° – Aspirationsgefahr bei Schluckstörung", p: 1 },
        { t: "Beim Patienten bleiben, beruhigen; bei Bewusstseinsstörung stabile Seitenlage", p: 1 }
      ]
    },
    { op: "Begründen",
      q: "Begründen Sie, warum nach einem Schlaganfall vor der ersten Nahrungsaufnahme ein Schluckscreening erfolgen muss.",
      rubric: [
        { t: "Schluckstörungen (Dysphagie) sind nach Schlaganfall häufig", p: 1 },
        { t: "Gefahr der Aspiration mit Aspirationspneumonie", p: 1 },
        { t: "Aspiration kann „still“ ohne Husten verlaufen und wird sonst übersehen; Kostform wird nach Ergebnis angepasst", p: 1 }
      ]
    }
  ],

  morbus_parkinson: [
    { op: "Begründen",
      q: "Begründen Sie, warum L-Dopa zeitgenau und mit Abstand zu eiweißreichen Mahlzeiten verabreicht wird.",
      rubric: [
        { t: "Kurze Halbwertszeit → schwankender Wirkspiegel, Off-Phasen mit Akinese und Sturzgefahr", p: 2 },
        { t: "Aminosäuren aus Eiweiß konkurrieren mit L-Dopa um die Aufnahme im Darm und ins Gehirn", p: 1 },
        { t: "Daher ca. 30 Min vor oder 60–90 Min nach eiweißreichen Mahlzeiten geben", p: 1 }
      ]
    }
  ],

  /* ---------- Herz, Kreislauf, Atmung ---------- */
  herzerkrankungen: [
    { op: "Begründen",
      q: "Begründen Sie die tägliche Gewichtskontrolle bei Herzinsuffizienz und beschreiben Sie die korrekte Durchführung.",
      rubric: [
        { t: "Gewichtszunahme zeigt Wassereinlagerung früher als sichtbare Ödeme", p: 1 },
        { t: "Drohende Dekompensation wird früh erkannt", p: 1 },
        { t: "Morgens, nüchtern, nach dem Toilettengang, gleiche Waage und Kleidung", p: 1 },
        { t: "Arzt informieren bei Zunahme von mehr als ca. 1 kg über Nacht bzw. 2 kg in 3 Tagen", p: 1 }
      ]
    }
  ],

  herzinfarkt: [
    { op: "Ableiten",
      q: "Ein Patient klagt auf Station über starke Brustschmerzen mit Ausstrahlung in den linken Arm. Leiten Sie Sofortmaßnahmen ab.",
      max: 6,
      rubric: [
        { t: "Sofort Arzt/Notfallteam rufen, Patient nicht allein lassen", p: 1 },
        { t: "Oberkörper hochlagern, strenge Bettruhe – Herz entlasten", p: 1 },
        { t: "Vitalzeichen, Monitoring, 12-Kanal-EKG vorbereiten", p: 1 },
        { t: "Sauerstoff nur bei SpO₂ < 90 %", p: 1 },
        { t: "Venösen Zugang und Medikamente nach Anordnung vorbereiten (z. B. ASS, Nitro nur bei ausreichendem RR)", p: 1 },
        { t: "Reanimationsbereitschaft herstellen (Defibrillator bereit)", p: 1 },
        { t: "Beengende Kleidung öffnen, beruhigen", p: 1 }
      ]
    }
  ],

  copd: [
    { op: "Ableiten",
      case: "Herr K., 74 Jahre, COPD, ist seit gestern zunehmend kurzatmig. Er sitzt vornübergebeugt im Bett, SpO₂ 85 %.",
      q: "Leiten Sie Pflegemaßnahmen ab und begründen Sie, wie Sauerstoff verabreicht werden soll.",
      rubric: [
        { t: "Atemerleichternde Position (Kutschersitz, Arme abstützen, Oberkörper hoch)", p: 1 },
        { t: "Lippenbremse anleiten – verhindert Kollaps der Bronchiolen", p: 1 },
        { t: "Beruhigen, Ruhe vermitteln – Angst verstärkt Atemnot", p: 1 },
        { t: "Arzt informieren, Bedarfsmedikation/O₂ nach Anordnung", p: 1 },
        { t: "O₂ niedrig dosiert und titriert, Ziel-SpO₂ 88–92 %", p: 1 },
        { t: "Begründung: Gefahr von CO₂-Anstieg (Hyperkapnie) bis zur CO₂-Narkose bei zu viel O₂", p: 1 }
      ]
    }
  ],

  /* ---------- Stoffwechsel ---------- */
  diabetes_m: [
    { op: "Beschreiben",
      q: "Beschreiben Sie typische Zeichen einer Hypoglykämie und Ihr Vorgehen bei einem wachen Patienten.",
      rubric: [
        { t: "Vegetative Zeichen: Zittern, Schwitzen, Heißhunger, Herzklopfen, Unruhe", p: 2 },
        { t: "Neurologische Zeichen: Verwirrtheit, Sprach-/Sehstörung bis Bewusstseinsstörung", p: 1 },
        { t: "Blutzucker messen", p: 1 },
        { t: "Schnell wirksame Kohlenhydrate geben (z. B. Traubenzucker, Saft)", p: 1 },
        { t: "Nach ca. 15 Min nachmessen, dann langsam wirksame KH; Arzt informieren, Ursache klären, dokumentieren", p: 1 }
      ]
    }
  ],

  folgeerkrankungen: [
    { op: "Erläutern",
      q: "Erläutern Sie Inhalte einer Beratung zur Fußpflege bei Diabetes mellitus.",
      max: 6,
      rubric: [
        { t: "Tägliche Fußinspektion (auch Fußsohle, Spiegel/Angehörige) – Verletzungen werden wegen Neuropathie nicht gespürt", p: 2 },
        { t: "Kein Barfußlaufen, passendes Schuhwerk, Schuhe vor dem Anziehen innen abtasten", p: 1 },
        { t: "Keine Wärmflasche/Heizkissen, Badewasser mit Thermometer prüfen – Verbrennungsgefahr", p: 1 },
        { t: "Nägel feilen statt schneiden, keine spitzen Instrumente; Podologie nutzen", p: 1 },
        { t: "Haut rückfetten, aber nicht zwischen den Zehen; gut abtrocknen", p: 1 },
        { t: "Jede Verletzung umgehend ärztlich abklären lassen", p: 1 }
      ]
    }
  ],

  /* ---------- Psychiatrie & Demenz ---------- */
  depressionen: [
    { op: "Beschreiben",
      q: "Ein Patient mit Depression sagt zu Ihnen: „Es hat doch alles keinen Sinn mehr.“ Beschreiben Sie Ihr Vorgehen.",
      rubric: [
        { t: "Aussage ernst nehmen, nicht bagatellisieren (kein „Kopf hoch“)", p: 1 },
        { t: "Suizidgedanken direkt und offen ansprechen (Gedanken, Pläne, Mittel) – das erhöht das Risiko nicht", p: 2 },
        { t: "Sofort Arzt und Team informieren, dokumentieren", p: 1 },
        { t: "Sicherheit herstellen: engmaschige Begleitung, gefährliche Gegenstände entfernen", p: 1 },
        { t: "Gesprächsangebot und verbindliche Absprachen, Hoffnung vermitteln", p: 1 }
      ]
    }
  ],

  umgang_dementen: [
    { op: "Beurteilen",
      case: "Frau L., 86 Jahre, Alzheimer-Demenz, steht abends an der Tür: „Ich muss nach Hause, meine Kinder kommen gleich aus der Schule!“<br>Pflegekraft A: „Ihre Kinder sind doch längst erwachsen, Sie wohnen jetzt hier.“<br>Pflegekraft B: „Sie machen sich Sorgen um Ihre Kinder?“",
      q: "Beurteilen Sie beide Reaktionen.",
      rubric: [
        { t: "A: Korrektur/Realitätsorientierung → Frau L. fühlt sich nicht verstanden, Angst und Unruhe steigen", p: 2 },
        { t: "B: Validation – greift das Gefühl (Sorge, Verantwortung) auf und nimmt es ernst", p: 2 },
        { t: "Urteil: B ist angemessen; weiterführend erzählen lassen, Biografie nutzen, beruhigendes Abendritual", p: 2 }
      ]
    },
    { op: "Nennen",
      q: "Nennen Sie fünf mögliche Ursachen nächtlicher Unruhe bei Menschen mit Demenz.",
      max: 5,
      rubric: [
        { t: "Schmerzen", p: 1 },
        { t: "Harndrang / nasse Inkontinenzversorgung", p: 1 },
        { t: "Hunger oder Durst", p: 1 },
        { t: "Angst / Desorientierung im Dunkeln", p: 1 },
        { t: "Gestörter Schlaf-Wach-Rhythmus (tagsüber viel geschlafen)", p: 1 },
        { t: "Delir, z. B. durch Infekt oder Exsikkose", p: 1 },
        { t: "Nebenwirkungen von Medikamenten", p: 1 },
        { t: "Lärm, Licht, ungewohnte Umgebung", p: 1 }
      ]
    }
  ],

  essstoerungen: [
    { op: "Begründen",
      q: "Begründen Sie, warum Menschen mit schwerer Anorexie nur langsam wieder angefüttert werden, und nennen Sie zu überwachende Parameter.",
      rubric: [
        { t: "Refeeding-Syndrom: Insulinanstieg verschiebt Phosphat, Kalium und Magnesium in die Zellen", p: 2 },
        { t: "Folgen: Herzrhythmusstörungen, Herzinsuffizienz, Ödeme, Krampfanfälle – lebensbedrohlich", p: 1 },
        { t: "Überwachung: Elektrolyte (v. a. Phosphat), Vitalzeichen/EKG, Gewicht und Ödeme", p: 1 },
        { t: "Kalorien schrittweise steigern, Thiamin nach Anordnung", p: 1 }
      ]
    }
  ],

  /* ---------- Hygiene ---------- */
  nosokomiale: [
    { op: "Nennen",
      q: "Nennen Sie die fünf Indikationen der Händedesinfektion und jeweils ein Beispiel aus der Praxis.",
      rubric: [
        { t: "Vor Patientenkontakt (z. B. vor dem Pulsmessen)", p: 1 },
        { t: "Vor aseptischen Tätigkeiten (z. B. vor Verbandswechsel, vor Manipulation am Zugang)", p: 1 },
        { t: "Nach Kontakt mit potenziell infektiösem Material (z. B. nach Leeren des Urinbeutels)", p: 1 },
        { t: "Nach Patientenkontakt (z. B. nach der Mobilisation)", p: 1 },
        { t: "Nach Kontakt mit der unmittelbaren Patientenumgebung (z. B. nach Berühren des Nachttischs)", p: 1 }
      ]
    }
  ],

  mrsa: [
    { op: "Beurteilen",
      case: "Herr T. lebt im Pflegeheim. Im Nasenabstrich wurde MRSA nachgewiesen, er hat keine Wunden und keinen Infekt. Er möchte weiter am gemeinsamen Mittagessen teilnehmen.",
      q: "Beurteilen Sie, ob Herr T. teilnehmen kann.",
      rubric: [
        { t: "Besiedlung (Kolonisation) ist keine Erkrankung", p: 1 },
        { t: "Übertragung erfolgt überwiegend über Kontakt, v. a. die Hände", p: 1 },
        { t: "Im Pflegeheim keine generelle Isolierung – soziale Teilhabe hat hohen Stellenwert (risikoadaptiertes Vorgehen)", p: 2 },
        { t: "Voraussetzungen: Händedesinfektion vor Verlassen des Zimmers, ggf. Wunden abdecken, kein akuter Infekt", p: 1 },
        { t: "Urteil: Teilnahme möglich; Sanierung nach Anordnung, Team informieren", p: 1 }
      ]
    }
  ],

  /* ---------- Wunden ---------- */
  chronische_wunden: [
    { op: "Erklären",
      q: "Erklären Sie, warum beim Ulcus cruris venosum Kompression angezeigt, beim Ulcus cruris arteriosum aber kontraindiziert ist.",
      rubric: [
        { t: "Venös: Klappeninsuffizienz → Rückstau, Ödem, erhöhter Gewebedruck", p: 1 },
        { t: "Kompression verengt die Venen, Klappen schließen wieder, Rückfluss verbessert, Ödem sinkt", p: 2 },
        { t: "Arteriell: zu geringer Bluteinstrom bei pAVK", p: 1 },
        { t: "Kompression würde die Durchblutung weiter drosseln → Nekrosegefahr", p: 1 },
        { t: "Vor Kompression immer arterielle Durchblutung prüfen (Pulse, ABI)", p: 1 }
      ]
    }
  ],

  /* ---------- Kommunikation & Beratung ---------- */
  schulz_von_thun: [
    { op: "Erläutern",
      q: "Eine Patientin sagt, als Sie das Zimmer betreten: „Die Klingel funktioniert wohl nicht.“ Erläutern Sie die Aussage anhand des Vier-Seiten-Modells.",
      rubric: [
        { t: "Sachinhalt: Die Klingel geht nicht / es kam lange niemand", p: 1 },
        { t: "Selbstoffenbarung: Ich bin verärgert, fühle mich allein gelassen", p: 1 },
        { t: "Beziehung: Ihr kümmert euch nicht ausreichend um mich", p: 1 },
        { t: "Appell: Kommt schneller, wenn ich klingle", p: 1 }
      ]
    }
  ],

  anleitung: [
    { op: "Beschreiben",
      q: "Beschreiben Sie die Anleitung eines Patienten zur subkutanen Insulininjektion mit dem Pen nach der Vier-Stufen-Methode.",
      rubric: [
        { t: "Vorbereitung: Lernziel und Vorwissen klären, ruhige Umgebung, Material bereitlegen", p: 1 },
        { t: "Stufe 1: Anleitende führt die Injektion zügig vor", p: 1 },
        { t: "Stufe 2: Vormachen mit Erklärung der Schritte (Funktionskontrolle, Dosis einstellen, Hautfalte, Einstich, ca. 10 Sek. warten)", p: 1 },
        { t: "Stufe 3: Patient erklärt die Schritte, Anleitende führt aus", p: 1 },
        { t: "Stufe 4: Patient führt selbst durch und erklärt dabei", p: 1 },
        { t: "Feedback, Wiederholung bis zur Sicherheit, Dokumentation und Evaluation", p: 1 }
      ]
    }
  ],

  /* ---------- Ethik & Recht ---------- */
  ethik: [
    { op: "Beurteilen",
      case: "Herr P., 79 Jahre, hat eine Pneumonie. Er ist einwilligungsfähig und lehnt die Antibiotikatherapie ab: „Ich habe genug von Medikamenten.“",
      q: "Beurteilen Sie die Situation anhand der vier Prinzipien nach Beauchamp &amp; Childress.",
      rubric: [
        { t: "Autonomie: Sein Wille ist maßgeblich; Behandlung gegen seinen Willen wäre Körperverletzung", p: 2 },
        { t: "Benefizienz (Fürsorge): Therapie nützt ihm – Gründe erfragen, umfassend aufklären", p: 2 },
        { t: "Nicht-Schaden: Schaden droht durch Nichtbehandlung, aber auch durch Druck oder Zwang", p: 2 },
        { t: "Gerechtigkeit: Er hat denselben Anspruch auf Respekt und Versorgung wie alle", p: 1 },
        { t: "Urteil: Ablehnung nach Aufklärung respektieren, dokumentieren, Gesprächs- und Alternativangebote (z. B. Symptomlinderung)", p: 1 }
      ]
    }
  ],

  sterbehilfe: [
    { op: "Beurteilen",
      q: "Ordnen Sie die Situationen rechtlich ein:<br>a) Die Beatmung wird gemäß Patientenverfügung beendet.<br>b) Eine Patientin erhält Morphin zur Schmerzlinderung, eine Lebensverkürzung ist möglich.<br>c) Eine Pflegekraft verabreicht auf ausdrücklichen Wunsch eine tödliche Injektion.",
      rubric: [
        { t: "a) Behandlungsabbruch (sog. passive Sterbehilfe) – zulässig, wenn es dem Patientenwillen entspricht", p: 2 },
        { t: "b) Indirekte Sterbehilfe – zulässig, Ziel ist die Symptomlinderung", p: 2 },
        { t: "c) Tötung auf Verlangen (aktive Sterbehilfe) – strafbar nach § 216 StGB", p: 2 }
      ]
    }
  ],

  patientenverfuegung: [
    { op: "Vergleichen",
      q: "Vergleichen Sie Patientenverfügung und Vorsorgevollmacht.",
      rubric: [
        { t: "Patientenverfügung legt fest, welche medizinischen Maßnahmen bei Einwilligungsunfähigkeit gewünscht oder abgelehnt werden", p: 1 },
        { t: "Patientenverfügung: volljährig, schriftlich, § 1827 BGB", p: 1 },
        { t: "Vorsorgevollmacht bestimmt eine Person, die im Namen der Vollmachtgeberin entscheidet", p: 1 },
        { t: "Gemeinsam: Vorsorge für Einwilligungsunfähigkeit; ergänzen sich, können eine gerichtliche Betreuung vermeiden", p: 1 }
      ]
    }
  ],

  freiheitsentziehende: [
    { op: "Beurteilen",
      case: "Der Sohn von Frau H. (88 J., Demenz) verlangt ein Bettgitter, weil seine Mutter nachts allein aufsteht. Frau H. lehnt Bettgitter ab, kann die Tragweite aber nicht mehr sicher einschätzen.",
      q: "Beurteilen Sie die Situation rechtlich und pflegefachlich.",
      rubric: [
        { t: "Bettgitter ist hier eine freiheitsentziehende Maßnahme", p: 1 },
        { t: "Der Sohn kann nicht allein entscheiden; nur Betreuer/Bevollmächtigter mit Genehmigung des Betreuungsgerichts (§ 1831 BGB)", p: 2 },
        { t: "Risiken: Übersteigen erhöht Sturzhöhe und Verletzungsgefahr, Unruhe, Würdeverletzung", p: 2 },
        { t: "Alternativen: Niedrigflurbett, Sensormatte, Hüftprotektoren, Nachtlicht, Toilettengänge", p: 2 },
        { t: "Fazit: Ursache klären, Alternativen zuerst (Werdenfelser Weg), Fallbesprechung, Dokumentation", p: 1 }
      ]
    }
  ],

  pflegebeduerftigkeit: [
    { op: "Beschreiben",
      q: "Beschreiben Sie das Verfahren zur Feststellung eines Pflegegrades.",
      rubric: [
        { t: "Antrag bei der Pflegekasse", p: 1 },
        { t: "Begutachtung durch den Medizinischen Dienst (privat: Medicproof), meist im Wohnumfeld", p: 1 },
        { t: "Bewertung der Selbstständigkeit in sechs Modulen", p: 1 },
        { t: "Gewichtete Gesamtpunkte ergeben Pflegegrad 1–5 (ab 12,5 bzw. ab 90 Punkten)", p: 1 },
        { t: "Bescheid durch die Pflegekasse, Widerspruch möglich", p: 1 }
      ]
    }
  ],

  /* ---------- Weitere ---------- */
  obstipation: [
    { op: "Ableiten",
      q: "Ein Patient erhält neu eine dauerhafte Opioidtherapie. Leiten Sie Maßnahmen zur Obstipationsprophylaxe ab.",
      rubric: [
        { t: "Laxans nach Anordnung von Beginn an – gegen opioidbedingte Obstipation entwickelt sich keine Gewöhnung", p: 2 },
        { t: "Ausreichend trinken, ballaststoffreich essen (Quellmittel nur mit genügend Flüssigkeit)", p: 1 },
        { t: "Bewegung und Mobilisation fördern", p: 1 },
        { t: "Stuhlgang beobachten/dokumentieren, Intimsphäre und feste Toilettenzeiten ermöglichen", p: 1 }
      ]
    }
  ],

  dialyse: [
    { op: "Begründen",
      q: "Begründen Sie drei Verhaltensregeln für den Shuntarm eines Dialysepatienten.",
      rubric: [
        { t: "Keine Blutdruckmessung, Blutentnahme oder Infusion – Gefahr von Shuntverschluss und Infektion", p: 2 },
        { t: "Nicht abschnüren: keine engen Ärmel, Uhr, Schmuck; nicht darauf liegen, nicht schwer heben", p: 1 },
        { t: "Täglich Schwirren tasten bzw. Strömungsgeräusch prüfen – Durchgängigkeit kontrollieren", p: 1 }
      ]
    }
  ],

  tod_sterben: [
    { op: "Beschreiben",
      q: "Beschreiben Sie pflegerische Maßnahmen in der Finalphase bei Mundtrockenheit und Rasselatmung.",
      rubric: [
        { t: "Regelmäßige Mundpflege, Mund befeuchten (auch mit Lieblingsgetränk), Lippenpflege", p: 2 },
        { t: "Keine forcierte Flüssigkeitsgabe – verstärkt Rasseln und Ödeme", p: 1 },
        { t: "Bei Rasselatmung Seitenlage bzw. Oberkörper leicht erhöht", p: 1 },
        { t: "Kein routinemäßiges Absaugen – belastend und regt Sekretbildung an", p: 1 },
        { t: "Angehörige aufklären (belastet Sterbende meist nicht); Medikamente nach Anordnung", p: 1 }
      ]
    }
  ],

  vers_neugeborener: [
    { op: "Erläutern",
      q: "Erläutern Sie Maßnahmen zum Wärmeerhalt beim Neugeborenen und begründen Sie deren Bedeutung.",
      rubric: [
        { t: "Begründung: große Körperoberfläche, wenig Unterhautfett, kein Kältezittern → kühlt schnell aus", p: 1 },
        { t: "Sofort abtrocknen, nasse Tücher entfernen – Verdunstungskälte", p: 1 },
        { t: "Haut-zu-Haut-Kontakt mit der Mutter", p: 1 },
        { t: "Mütze, vorgewärmte Tücher, Wärmequelle, Zugluft vermeiden", p: 1 },
        { t: "Körpertemperatur kontrollieren", p: 1 }
      ]
    }
  ],

  schwangerschaft: [
    { op: "Nennen",
      q: "Nennen Sie fünf Warnzeichen einer Präeklampsie, bei denen eine Schwangere sofort ärztlich vorgestellt werden muss.",
      max: 5,
      rubric: [
        { t: "Blutdruck ≥ 140/90 mmHg", p: 1 },
        { t: "Starke Kopfschmerzen", p: 1 },
        { t: "Sehstörungen (Augenflimmern)", p: 1 },
        { t: "Oberbauchschmerzen rechts (Hinweis auf HELLP)", p: 1 },
        { t: "Plötzliche starke Ödeme bzw. rasche Gewichtszunahme", p: 1 },
        { t: "Übelkeit/Erbrechen in der zweiten Schwangerschaftshälfte", p: 1 },
        { t: "Krampfanfall (Eklampsie) – Notfall", p: 1 }
      ]
    }
  ]
};
