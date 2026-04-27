# Tschakka! — PFF32 Neural Training

Cyberpunk-style Lern-App zur Vorbereitung auf die schriftliche Abschlussprüfung
**Pflegefachfrau/-mann** an der RBB Müritz.

## Features

- 105+ Lernthemen über alle Prüfungsbereiche (Anatomie, Innere Medizin, Pflegewissenschaft, Psychiatrie, Ethik …)
- Quiz-, Flashcard- und Match-Spiele pro Thema
- Boss-Battles für vertiefte Wiederholung
- Achievement-System, XP, Level, Streak
- Prüfungs-Countdown
- Procedural Synth-Music (Carpenter-Brut-Style, Drive ↔ Focus Crossfade)
- Lokale Accounts mit PBKDF2-Passwort-Hashing
- (Optional, später) Cloud-Sync via Supabase

## Stack

- Reines HTML/CSS/JavaScript — kein Build-Step
- WebCrypto API für Passwort-Hashing
- Web Audio API für die Musik-Engine
- Daten in `localStorage` (Stufe A) bzw. Supabase (Stufe B, geplant)

## Lokal starten

Statisch ausliefern, z. B. mit Python:

```bash
python3 -m http.server 8765
```

Dann <http://localhost:8765> öffnen.

## Deployment

Das Projekt wird auf **Netlify** gehostet (kostenlos, EU-Edge, automatischer
HTTPS). Auf jeden Push in `main` deployt Netlify die neue Version.

## Zugang

Initial-Passwort für Schüler-Accounts: wird vom Lehrer separat ausgegeben.

## Struktur

```
index.html     — Markup + Landing/Auth
styles.css     — Cyberpunk-Theming
app.js         — State, Views, Spiele, Auth-Gate
auth.js        — Account-Verwaltung (lokal, später Supabase)
music.js       — Procedural Synth-Engine
data.js        — Themen, Wochen, Kategorien, Achievements
```
