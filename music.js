/* ===========================================================
   PFF32 // MUSIC ENGINE (Track-based, v2)
   -----------------------------------------------------------
   Spielt eine M4A-Datei nahtlos im Loop.
   Crossfade beim Loop-Wechsel über zwei AudioBufferSources.
   Kompatible Public-API zur prozeduralen Vorgängerversion:
     start, toggle, setMode, setEnabled, setVolume,
     isEnabled, getVolume.
   Modi:
     - "drive": volle Lautstärke, kein Filter (Default)
     - "focus": Lowpass-Filter (1.2 kHz) + leichter Volume-Duck
       → simuliert das "leiser/im Hintergrund"-Gefühl, das
         die alte Procedural-Engine durch Track-Reduktion hatte.
   WICHTIG: Auto-Start beim ersten Klick wurde entfernt —
   `Music.start()` wird explizit nach erfolgreichem Login
   aus app.js aufgerufen.
   =========================================================== */
(() => {
  if (!(window.AudioContext || window.webkitAudioContext)) {
    window.Music = {
      start(){}, toggle(){return false;}, setMode(){},
      setEnabled(){}, setVolume(){},
      isEnabled(){return false;}, getVolume(){return 0;}
    };
    return;
  }

  /* ---------- Konfig ---------- */
  const TRACK_URL  = "Musik.m4a";
  const CROSSFADE  = 4.0;        // sek Overlap beim Loop-Wechsel
  const FADE_IN    = 0.6;        // sek erstes Einblenden nach start()
  const MODE_FADE  = 1.2;        // sek Crossfade drive/focus
  const FOCUS_CUT  = 1200;       // Hz Lowpass-Cutoff in "focus"
  const DRIVE_CUT  = 22000;      // praktisch bypass
  const FOCUS_DUCK = 0.65;       // Lautstärke-Multi in "focus"

  const LS_ENABLED = "pff32_music";
  const LS_VOLUME  = "pff32_music_vol";

  let enabled = localStorage.getItem(LS_ENABLED) !== "off";
  let volume  = parseFloat(localStorage.getItem(LS_VOLUME));
  if (!Number.isFinite(volume)) volume = 0.25;

  /* ---------- Audio-Graph ---------- */
  let ctx = null;
  let master = null;            // Master-Volume (enabled × volume)
  let focusFilter = null;       // Lowpass für focus-Mode
  let focusGain = null;         // zusätzlicher Duck für focus-Mode
  let buffer = null;            // dekodierter AudioBuffer
  let loadingPromise = null;    // verhindert doppelten Fetch
  let activeSources = [];       // gerade laufende Sources (für stop)
  let nextScheduleTimer = null; // setTimeout-Handle für nächstes Loop-Segment
  let currentMode = "drive";

  /* ---------- File-Loading ---------- */
  async function loadTrack() {
    if (buffer) return true;
    if (loadingPromise) return loadingPromise;
    loadingPromise = (async () => {
      try {
        const r = await fetch(TRACK_URL);
        if (!r.ok) throw new Error("HTTP " + r.status);
        const ab = await r.arrayBuffer();
        buffer = await ctx.decodeAudioData(ab);
        return true;
      } catch (e) {
        console.warn("[Music] Track konnte nicht geladen werden:", e);
        return false;
      } finally {
        loadingPromise = null;
      }
    })();
    return loadingPromise;
  }

  /* ---------- Audio-Graph init ---------- */
  function initGraph() {
    master = ctx.createGain();
    master.gain.value = enabled ? volume : 0;

    focusFilter = ctx.createBiquadFilter();
    focusFilter.type = "lowpass";
    focusFilter.frequency.value = DRIVE_CUT;
    focusFilter.Q.value = 0.7;

    focusGain = ctx.createGain();
    focusGain.gain.value = 1;

    // Sources → focusFilter → focusGain → master → destination
    focusFilter.connect(focusGain).connect(master).connect(ctx.destination);
  }

  /* ---------- Loop-Scheduling mit Crossfade ----------
     Jedes Segment ist eine Instanz des AudioBuffers, mit eigenem
     Gain-Envelope für Fade-In/-Out. Vor Ende jedes Segments wird
     das nächste eingeplant, sodass sich Ende und Anfang
     CROSSFADE Sekunden überlappen → keine Loop-Naht hörbar. */
  function scheduleSegment(startTime, isLoopContinuation) {
    if (!buffer || !ctx) return;
    const dur = buffer.duration;
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const segGain = ctx.createGain();
    // Fade-In: bei Loop-Anschluss CROSSFADE-lang, beim Allerersten kürzer
    const fadeInDur = isLoopContinuation ? CROSSFADE : FADE_IN;
    segGain.gain.setValueAtTime(0, startTime);
    segGain.gain.linearRampToValueAtTime(1, startTime + fadeInDur);
    // Halte-Phase
    const fadeOutStart = startTime + dur - CROSSFADE;
    segGain.gain.setValueAtTime(1, fadeOutStart);
    // Fade-Out am Ende → die nächste Instanz blendet gleichzeitig ein
    segGain.gain.linearRampToValueAtTime(0, startTime + dur);

    source.connect(segGain).connect(focusFilter);
    source.start(startTime);
    source.stop(startTime + dur + 0.1);
    activeSources.push(source);
    source.onended = () => {
      activeSources = activeSources.filter(s => s !== source);
    };

    // Nächstes Segment einplanen: startet CROSSFADE Sekunden vor Ende des aktuellen
    const nextStart = startTime + dur - CROSSFADE;
    const delayMs = (nextStart - ctx.currentTime - 0.5) * 1000;
    nextScheduleTimer = setTimeout(
      () => scheduleSegment(nextStart, true),
      Math.max(50, delayMs)
    );
  }

  function stopAllSources() {
    if (nextScheduleTimer) {
      clearTimeout(nextScheduleTimer);
      nextScheduleTimer = null;
    }
    for (const s of activeSources) {
      try { s.stop(); } catch {}
    }
    activeSources = [];
  }

  /* ---------- Public API ---------- */
  async function start() {
    if (!enabled) return;
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      initGraph();
    }
    if (ctx.state === "suspended") {
      try { await ctx.resume(); } catch {}
    }
    const ok = await loadTrack();
    if (!ok) return;
    if (activeSources.length > 0) return; // läuft schon
    scheduleSegment(ctx.currentTime + 0.1, false);
  }

  function setEnabled(on) {
    enabled = !!on;
    localStorage.setItem(LS_ENABLED, enabled ? "on" : "off");
    if (!ctx) {
      if (enabled) start();
      return;
    }
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(enabled ? volume : 0, t + 0.5);
    if (enabled) {
      if (ctx.state === "suspended") ctx.resume();
      if (activeSources.length === 0) start();
    } else {
      // soft mute via master; sources weiter scheduled lassen,
      // damit nach Re-Enable nahtlos weitergespielt wird
    }
  }

  function toggle() {
    setEnabled(!enabled);
    return enabled;
  }

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

  function setMode(mode) {
    if (!ctx || mode === currentMode) return;
    currentMode = mode;
    const t = ctx.currentTime;

    const cutTarget  = mode === "focus" ? FOCUS_CUT  : DRIVE_CUT;
    const duckTarget = mode === "focus" ? FOCUS_DUCK : 1;

    focusFilter.frequency.cancelScheduledValues(t);
    focusFilter.frequency.setValueAtTime(focusFilter.frequency.value, t);
    focusFilter.frequency.exponentialRampToValueAtTime(cutTarget, t + MODE_FADE);

    focusGain.gain.cancelScheduledValues(t);
    focusGain.gain.setValueAtTime(focusGain.gain.value, t);
    focusGain.gain.linearRampToValueAtTime(duckTarget, t + MODE_FADE);
  }

  window.Music = {
    start, toggle, setMode, setEnabled, setVolume,
    isEnabled: () => enabled,
    getVolume: () => volume,
  };
})();
