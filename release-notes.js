/* ===========================================================
   TSCHAKKA // VERSION & RELEASE NOTES
   -----------------------------------------------------------
   Neue Version veröffentlichen:
     1. APP_VERSION erhöhen
     2. Oben in RELEASE_NOTES einen Eintrag ergänzen
   Das "What's New"-Fenster erscheint dann jedem einmal beim
   nächsten Login (gespeichert als state.seenVersion).
   Die Fußzeile zeigt APP_VERSION automatisch an.
   =========================================================== */

const APP_VERSION = "1.3";

const RELEASE_NOTES = [
  {
    version: "1.3",
    intro: "Frisch geupdatet für die Zielgerade bis zur Prüfung:",
    items: [
      { icon: "✍", title: "Neu: Prüfungsfragen",
        text: "Offene Fragen wie in der schriftlichen Prüfung – mit Operatoren (Nennen, Erläutern, Beurteilen …), Fallsituationen und einem <strong>Erwartungshorizont</strong>, mit dem du deine Antwort selbst bewertest. Zu finden unter <strong>Spiele → Prüfungstraining</strong> und direkt in vielen Themen." },
      { icon: "📅", title: "Wochenplan bis Juni 2027",
        text: "Jede Woche hat jetzt ein echtes Datum, die <strong>aktuelle Woche ist markiert</strong>. Dazu: Weihnachtspause, drei Wiederholungswochen nach Fachbereichen und zwei Wochen <strong>Generalprobe</strong> im Mai." },
      { icon: "🎲", title: "Fairere Quizze",
        text: "Die Antworten werden jetzt bei jeder Frage neu gemischt. „Immer B“ klappt also nicht mehr 😉" },
      { icon: "🩺", title: "Inhalte geprüft",
        text: "Über 30 fachliche Korrekturen – u. a. die neuen BGB-Paragrafen nach der Betreuungsrechtsreform 2023, aktuelle Screening-Altersgrenzen und mehrere überarbeitete Quizfragen." },
      { icon: "🎄", title: "19 neue Achievements",
        text: "<strong>64 statt 45</strong>: sieben Weihnachts-Specials, Ostern, Tag der Pflegenden, Prüfungsfragen und Wochenziele. Außerdem zählt jetzt <strong>jeder Lerntag</strong> für deine Streak – auch wenn du nur Karteikarten machst." }
    ]
  },
  {
    version: "1.2",
    intro: "Während du weg warst, hat sich was getan:",
    items: [
      { icon: "☁", title: "Cross-Device Sync aktiv",
        text: "Dein Fortschritt liegt jetzt in der <strong>Cloud</strong> – du kannst dich auf Handy, Tablet und Laptop einloggen und überall weitermachen." },
      { icon: "★", title: "23 neue Achievements",
        text: "<strong>45 statt 22</strong> Achievements, darunter Kategorie-Master und Feiertags-Specials für den 1. Mai und Christi Himmelfahrt." }
    ]
  }
];
