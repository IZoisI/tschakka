/* ===========================================================
   PFF32 // MUSIC ENGINE
   Procedural synth via Web Audio API.
   - mode "drive"  → Dark-Synth (Carpenter-Brut-Style): Kick, Bass, Pad, Lead.
   - mode "focus"  → Ambient: langsame Pads + Bells, kein Beat.
   =========================================================== */
(() => {
  if (!(window.AudioContext || window.webkitAudioContext)) {
    window.Music = { start(){}, toggle(){return false;}, setMode(){}, setVolume(){}, isEnabled(){return false;}, getVolume(){return 0;} };
    return;
  }

  /* ---------- persisted settings ---------- */
  const LS_ENABLED = "pff32_music";
  const LS_VOLUME  = "pff32_music_vol";
  let enabled = localStorage.getItem(LS_ENABLED) !== "off";
  let volume  = parseFloat(localStorage.getItem(LS_VOLUME));
  if (!Number.isFinite(volume)) volume = 0.25;

  /* ---------- audio nodes ---------- */
  let ctx = null;
  let master, convolver, wetSend, drySend;
  let driveGain, focusGain;
  let schedTimer = null;

  /* ---------- transport ---------- */
  const BPM = 100;                // langsamer für doomigeren Feel
  const beat = 60 / BPM;          // quarter note seconds
  const step16 = beat / 4;        // 16th-note seconds
  const LOOK_AHEAD = 0.15;        // seconds the scheduler peeks ahead
  const SCHED_MS = 25;            // scheduler tick
  let nextStepTime = 0;
  let step = 0;
  const PAT_LEN = 64;             // 4 bars × 16 steps = 64

  /* ---------- musical material (A harmonisch-Moll / Phrygisch-Dominant V) ---------- */
  // i - VI - iv - V  →  Am - F - Dm - E (mit G# als Leitton = düsteres Carpenter-Brut-Gerüst)
  const CHORDS = [
    { root: "A1", notes: ["A3",  "C4", "E4"] },   // Am  (i)
    { root: "F1", notes: ["F3",  "A3", "C4"] },   // F   (VI)
    { root: "D1", notes: ["D3",  "F3", "A3"] },   // Dm  (iv)
    { root: "E1", notes: ["E3",  "G#3","B3"] }    // E-Dur (V)  — harmonischer Moll
  ];
  // Lead-Motive in A harmonisch-Moll: A B C D E F G# — betont G# für die düstere Phrygisch-Dominant-Farbe
  const LEAD_PHRASE_A = ["A4", null, "C5", null, "E5", null, null, "D5",
                         "C5", null, "B4", null, "G#4", null, null, null];
  const LEAD_PHRASE_B = ["E5", null, null, "F5", null, "E5", null, "D5",
                         null, "C5", null, "B4", "A4", null, "G#4",null];

  function noteFreq(n) {
    if (!n) return 0;
    const map = { C:0, "C#":1, Db:1, D:2, "D#":3, Eb:3, E:4, F:5, "F#":6,
                  Gb:6, G:7, "G#":8, Ab:8, A:9, "A#":10, Bb:10, B:11 };
    const m = /^([A-G](?:#|b)?)(-?\d)$/.exec(n);
    if (!m) return 0;
    const semi = map[m[1]] + (+m[2] + 1) * 12;
    return 440 * Math.pow(2, (semi - 69) / 12);
  }

  /* ---------- impulse response for reverb (länger + dunkler) ---------- */
  function makeIR(duration = 3.4, decay = 2.2) {
    const r = ctx.sampleRate, len = (r * duration) | 0;
    const buf = ctx.createBuffer(2, len, r);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      // 1-Pol Lowpass auf's Noise → „dunkler Hall" (Höhen gedämpft)
      let prev = 0;
      const a = 0.18;
      for (let i = 0; i < len; i++) {
        const n = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
        prev = prev + a * (n - prev);
        d[i] = prev * 2.2; // Level-Kompensation wegen LPF
      }
    }
    return buf;
  }

  /* ---------- Waveshaper (Overdrive für Bass) ---------- */
  function makeShaperCurve(amount = 18) {
    const n = 1024;
    const curve = new Float32Array(n);
    const k = amount;
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      curve[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
    }
    return curve;
  }

  /* ---------- DRIVE-MODE voices ---------- */
  function kick(t) {
    // längerer Sub-Sweep + mehr Bauch
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(34, t + 0.28);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(1.2, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    o.connect(g).connect(driveGain);
    o.start(t); o.stop(t + 0.6);

    // Sub-Layer, Sinus eine Oktave tiefer, klirrfrei
    const sub = ctx.createOscillator();
    const sg = ctx.createGain();
    sub.type = "sine";
    sub.frequency.setValueAtTime(70, t);
    sub.frequency.exponentialRampToValueAtTime(28, t + 0.32);
    sg.gain.setValueAtTime(0.0001, t);
    sg.gain.exponentialRampToValueAtTime(0.85, t + 0.01);
    sg.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    sub.connect(sg).connect(driveGain);
    sub.start(t); sub.stop(t + 0.6);
  }

  function snare(t) {
    const dur = 0.22;
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++)
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2);
    const s = ctx.createBufferSource(); s.buffer = buf;
    const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 1200;
    const g = ctx.createGain(); g.gain.value = 0.5;
    s.connect(hp).connect(g).connect(driveGain);
    s.start(t); s.stop(t + dur);

    // kurzer 220 Hz Body-Ton für Snap
    const body = ctx.createOscillator();
    const bg = ctx.createGain();
    body.frequency.value = 220;
    bg.gain.setValueAtTime(0.3, t);
    bg.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    body.connect(bg).connect(driveGain);
    body.start(t); body.stop(t + 0.09);
  }

  function hat(t, open = false) {
    const dur = open ? 0.18 : 0.035;
    const buf = ctx.createBuffer(1, (ctx.sampleRate * dur) | 0, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++)
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, open ? 1.6 : 4);
    const s = ctx.createBufferSource(); s.buffer = buf;
    const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 7200;
    const g = ctx.createGain(); g.gain.value = open ? 0.11 : 0.07;
    s.connect(hp).connect(g).connect(driveGain);
    s.start(t);
  }

  function bass(t, freq, dur = step16 * 0.9) {
    if (!freq) return;
    const o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = freq;
    const sub = ctx.createOscillator(); sub.type = "square"; sub.frequency.value = freq / 2;
    const f = ctx.createBiquadFilter(); f.type = "lowpass";
    f.frequency.setValueAtTime(750, t);                        // dunkler Start
    f.frequency.exponentialRampToValueAtTime(140, t + dur * 0.85);
    f.Q.value = 7.5;                                            // mehr Biss
    const shaper = ctx.createWaveShaper();
    shaper.curve = makeShaperCurve(22);
    shaper.oversample = "2x";
    const postLP = ctx.createBiquadFilter();                    // post-distortion Höhen bremsen
    postLP.type = "lowpass"; postLP.frequency.value = 2200;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.38, t + 0.005);
    g.gain.setValueAtTime(0.38, t + dur * 0.75);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(f); sub.connect(f);
    f.connect(shaper).connect(postLP).connect(g).connect(driveGain);
    o.start(t); sub.start(t);
    o.stop(t + dur + 0.05); sub.stop(t + dur + 0.05);
  }

  function pad(t, freqs, dur = beat * 4) {
    freqs.forEach(f => {
      if (!f) return;
      // Saw + leicht verstimmter Saw → dickerer, düsterer Chor
      const o1 = ctx.createOscillator(); o1.type = "sawtooth"; o1.frequency.value = f;
      const o2 = ctx.createOscillator(); o2.type = "sawtooth"; o2.frequency.value = f * 1.011;
      // Oktav-Sub eine Oktave tiefer → Pad bekommt Boden
      const oSub = ctx.createOscillator(); oSub.type = "sawtooth"; oSub.frequency.value = f * 0.5;
      const filt = ctx.createBiquadFilter(); filt.type = "lowpass";
      filt.frequency.value = 1000; filt.Q.value = 1.0;      // dunkler (1600 → 1000)
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.05, t + 0.8);
      g.gain.setValueAtTime(0.05, t + dur - 0.8);
      g.gain.linearRampToValueAtTime(0.001, t + dur);
      o1.connect(filt); o2.connect(filt); oSub.connect(filt);
      filt.connect(g);
      g.connect(drySend); g.connect(wetSend);
      o1.start(t); o2.start(t); oSub.start(t);
      o1.stop(t + dur + 0.1); o2.stop(t + dur + 0.1); oSub.stop(t + dur + 0.1);
    });
  }

  function lead(t, freq, dur = step16 * 2) {
    if (!freq) return;
    // eine Oktave tiefer + dunklerer Filterverlauf → „klagendes" statt „strahlendes" Lead
    const f = freq * 0.5;
    const o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = f;
    // leichter Detune-Layer für „Carpenter Brut"-Breite
    const o2 = ctx.createOscillator(); o2.type = "sawtooth"; o2.frequency.value = f * 1.006;
    const filt = ctx.createBiquadFilter(); filt.type = "lowpass";
    filt.frequency.setValueAtTime(1800, t);
    filt.frequency.exponentialRampToValueAtTime(700, t + dur);
    filt.Q.value = 5.5;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.12, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(filt); o2.connect(filt); filt.connect(g);
    g.connect(drySend); g.connect(wetSend);
    o.start(t); o2.start(t);
    o.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
  }

  /* ---------- FOCUS-MODE voices ---------- */
  function focusPad(t, freqs, dur = beat * 4) {
    freqs.forEach(f => {
      if (!f) return;
      // Eine Oktave tiefer gesamt (0.25 / 0.5 statt 0.5 / 1) → doomig-düsterer Drone
      [0.25, 0.5].forEach(mult => {
        const o = ctx.createOscillator();
        o.type = mult === 0.25 ? "triangle" : "sine";
        o.frequency.value = f * mult;
        const filt = ctx.createBiquadFilter(); filt.type = "lowpass";
        filt.frequency.value = 600;                  // dunkler (900 → 600)
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(mult === 0.25 ? 0.07 : 0.05, t + 1.3);
        g.gain.setValueAtTime(mult === 0.25 ? 0.07 : 0.05, t + dur - 1.3);
        g.gain.linearRampToValueAtTime(0.0001, t + dur);
        o.connect(filt).connect(g).connect(focusGain);
        o.start(t); o.stop(t + dur + 0.1);
      });
    });
  }

  // Bell jetzt mit dissonantem Intervall: kleine Sekunde (Halbton drüber) klingelt kühl/nervös
  function bell(t, freq, semitoneOffset = 1) {
    if (!freq) return;
    const f2 = freq * Math.pow(2, semitoneOffset / 12);
    [freq, f2].forEach((ff, i) => {
      const o = ctx.createOscillator(); o.type = "sine";
      o.frequency.value = ff * 2;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      // zweiter Ton minimal versetzt → „nervöses" Anschlagen
      const start = t + (i ? 0.045 : 0);
      g.gain.linearRampToValueAtTime(i ? 0.028 : 0.042, start + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0005, start + 3.2);
      o.connect(g);
      g.connect(focusGain);
      const wet = ctx.createGain(); wet.gain.value = 0.85;
      g.connect(wet).connect(wetSend);
      o.start(start); o.stop(start + 3.3);
    });
  }

  /* ---------- pattern scheduling ---------- */
  function scheduleDriveStep(s, t) {
    const barStep = s % 16;
    const chordIdx = Math.floor(s / 16) % 4;
    const phraseIdx = Math.floor(s / 64) % 2;       // A/B wechsel alle 4 Takte
    const chord = CHORDS[chordIdx];
    const phrase = phraseIdx === 0 ? LEAD_PHRASE_A : LEAD_PHRASE_B;

    // KICK — four-on-the-floor
    if (barStep % 4 === 0) kick(t);
    // SNARE — 2 & 4
    if (barStep === 4 || barStep === 12) snare(t);
    // HAT — 8th notes, open on "+" of 4
    if (barStep % 2 === 0) hat(t, false);
    if (barStep === 14) hat(t, true);

    // BASS — synkopische Figur
    if ([0, 3, 6, 8, 10, 11, 14].includes(barStep)) {
      bass(t, noteFreq(chord.root) * 2); // eine Oktave höher für mehr „drive"
    }

    // PAD — pro Taktanfang
    if (barStep === 0) {
      pad(t, chord.notes.map(noteFreq));
    }

    // LEAD — nur in der 2. Hälfte des Loops (Takt 3+4), schafft Dynamik
    if (chordIdx >= 2) {
      const leadNote = phrase[barStep];
      if (leadNote) lead(t, noteFreq(leadNote));
    }
  }

  function scheduleFocusStep(s, t) {
    const barStep = s % 16;
    const chordIdx = Math.floor(s / 16) % 4;
    const chord = CHORDS[chordIdx];

    // PAD — langsamer, weicher, gleiche Harmonie
    if (barStep === 0) {
      focusPad(t, chord.notes.map(noteFreq));
    }
    // BELL — in der Taktmitte, kleine Sekunde (Halbton) = kühl/nervös
    if (barStep === 8 && Math.random() < 0.55) {
      const n = chord.notes[(Math.random() * chord.notes.length) | 0];
      bell(t, noteFreq(n), 1);               // kleine Sekunde hoch
    }
    // Selten ein zweiter Bell, große Sekunde runter → herberes Intervall
    if (barStep === 13 && Math.random() < 0.25) {
      bell(t, noteFreq(chord.notes[0]), -2); // große Sekunde tief
    }
  }

  function tick() {
    while (nextStepTime < ctx.currentTime + LOOK_AHEAD) {
      // Beide Modi werden geplant — modusabhängiger Gain blendet
      scheduleDriveStep(step, nextStepTime);
      scheduleFocusStep(step, nextStepTime);
      nextStepTime += step16;
      step = (step + 1) % PAT_LEN;
    }
  }

  /* ---------- init ---------- */
  function init() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = enabled ? volume : 0;
    master.connect(ctx.destination);

    // Reverb-Bus
    convolver = ctx.createConvolver();
    convolver.buffer = makeIR();
    wetSend = ctx.createGain(); wetSend.gain.value = 1;
    const wetOut = ctx.createGain(); wetOut.gain.value = 0.3;
    wetSend.connect(convolver).connect(wetOut).connect(master);
    drySend = ctx.createGain(); drySend.gain.value = 0.9;
    drySend.connect(master);

    // Mode gains (crossfade)
    driveGain = ctx.createGain();
    focusGain = ctx.createGain();
    driveGain.gain.value = 1;   // Start in drive
    focusGain.gain.value = 0;
    driveGain.connect(drySend); driveGain.connect(wetSend);
    focusGain.connect(drySend); focusGain.connect(wetSend);

    nextStepTime = ctx.currentTime + 0.12;
    step = 0;
    schedTimer = setInterval(tick, SCHED_MS);
  }

  /* ---------- API ---------- */
  function start() {
    if (!enabled) return;
    init();
    if (ctx.state === "suspended") ctx.resume();
  }

  function setMode(mode) {
    if (!ctx) return;
    const t = ctx.currentTime;
    const fade = 1.2;
    const dTarget = mode === "drive" ? 1 : 0;
    const fTarget = mode === "focus" ? 1 : 0;
    driveGain.gain.cancelScheduledValues(t);
    focusGain.gain.cancelScheduledValues(t);
    driveGain.gain.setValueAtTime(driveGain.gain.value, t);
    focusGain.gain.setValueAtTime(focusGain.gain.value, t);
    driveGain.gain.linearRampToValueAtTime(dTarget, t + fade);
    focusGain.gain.linearRampToValueAtTime(fTarget, t + fade);
  }

  function setEnabled(on) {
    enabled = !!on;
    localStorage.setItem(LS_ENABLED, enabled ? "on" : "off");
    if (!ctx) {
      if (enabled) init();
      return;
    }
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(enabled ? volume : 0, t + 0.5);
    if (enabled && ctx.state === "suspended") ctx.resume();
  }

  function toggle() { setEnabled(!enabled); return enabled; }

  function setVolume(v) {
    volume = Math.max(0, Math.min(1, v));
    localStorage.setItem(LS_VOLUME, volume.toString());
    if (ctx && enabled) {
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(volume, t + 0.2);
    }
  }

  window.Music = {
    start, setMode, toggle, setEnabled, setVolume,
    isEnabled: () => enabled,
    getVolume: () => volume
  };

  /* ---------- autoplay-policy: erst nach User-Geste starten ---------- */
  const kick1 = () => {
    if (enabled) start();
    document.removeEventListener("click",   kick1);
    document.removeEventListener("keydown", kick1);
  };
  document.addEventListener("click",   kick1);
  document.addEventListener("keydown", kick1);
})();
