/* ===========================================================
   PFF32 // MUSIC ENGINE (Multi-Track, v3)
   -----------------------------------------------------------
   Spielt einen Haupt-Track im Loop, wechselt bei Boss-Battle
   nahtlos auf einen zweiten Boss-Track. Crossfade zwischen
   Loop-Iterationen UND zwischen den beiden Tracks.

   Modi:
     - "drive" (default): Haupt-Track, voller Klang
     - "focus" (Quiz/Aufgaben):    Haupt-Track + Lowpass + Duck
     - "boss"  (Boss-Battle):      Boss-Track, voller Klang

   Public API: start, toggle, setMode, setEnabled, setVolume,
               isEnabled, getVolume.

   Boss.m4a wird lazy geladen — erst wenn der erste Boss-Battle
   startet, sonst gar nicht.
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
  const TRACKS = {
    main: { url: "Musik.m4a" },
    boss: { url: "Boss.m4a"  }
  };
  const CROSSFADE   = 4.0;       // sek Overlap beim Loop-Wechsel
  const FADE_IN     = 0.6;       // sek erstes Einblenden nach start()
  const MODE_FADE   = 1.5;       // sek Crossfade zwischen Modi/Tracks
  const FOCUS_CUT   = 1200;      // Hz Lowpass-Cutoff in "focus"
  const DRIVE_CUT   = 22000;     // praktisch bypass
  const FOCUS_DUCK  = 0.65;      // Lautstärke-Multi in "focus"

  const LS_ENABLED  = "pff32_music";
  const LS_VOLUME   = "pff32_music_vol";

  let enabled = localStorage.getItem(LS_ENABLED) !== "off";
  let volume  = parseFloat(localStorage.getItem(LS_VOLUME));
  if (!Number.isFinite(volume)) volume = 0.25;

  /* ---------- Audio-Graph ---------- */
  let ctx = null;
  let master = null;            // Master (enabled × volume)
  let mainModeFilter = null;    // Lowpass für "focus"-Mode (nur main-Track)

  // Pro-Track-State
  // mainPath: source → segGain → mainModeFilter → mainGain → master
  // bossPath: source → segGain → bossGain → master
  const state = {
    main: { buffer: null, gainNode: null, sources: [], timer: null,
            isPlaying: false, loadingPromise: null },
    boss: { buffer: null, gainNode: null, sources: [], timer: null,
            isPlaying: false, loadingPromise: null }
  };

  let currentMode = "drive";

  /* ---------- File-Loading ---------- */
  async function loadTrack(name) {
    const t = state[name];
    if (t.buffer) return true;
    if (t.loadingPromise) return t.loadingPromise;
    t.loadingPromise = (async () => {
      try {
        const r = await fetch(TRACKS[name].url);
        if (!r.ok) throw new Error("HTTP " + r.status);
        const ab = await r.arrayBuffer();
        t.buffer = await ctx.decodeAudioData(ab);
        return true;
      } catch (e) {
        console.warn(`[Music] Track "${name}" konnte nicht geladen werden:`, e);
        return false;
      } finally {
        t.loadingPromise = null;
      }
    })();
    return t.loadingPromise;
  }

  /* ---------- Audio-Graph init ---------- */
  function initGraph() {
    master = ctx.createGain();
    master.gain.value = enabled ? volume : 0;
    master.connect(ctx.destination);

    // main-Pfad
    mainModeFilter = ctx.createBiquadFilter();
    mainModeFilter.type = "lowpass";
    mainModeFilter.frequency.value = DRIVE_CUT;
    mainModeFilter.Q.value = 0.7;

    state.main.gainNode = ctx.createGain();
    state.main.gainNode.gain.value = 1;
    mainModeFilter.connect(state.main.gainNode).connect(master);

    // boss-Pfad (parallel, ohne Filter)
    state.boss.gainNode = ctx.createGain();
    state.boss.gainNode.gain.value = 0;
    state.boss.gainNode.connect(master);
  }

  function destinationFor(name) {
    return name === "main" ? mainModeFilter : state.boss.gainNode;
  }

  /* ---------- Loop-Scheduling mit Crossfade ----------
     Pro Track. Jedes Segment ist eine Buffer-Source mit eigenem
     Gain-Envelope. Vor Ende jedes Segments wird das nächste
     eingeplant, sodass sich Ende und Anfang CROSSFADE Sek
     überlappen → keine Loop-Naht hörbar. */
  function scheduleSegmentFor(name, startTime, isLoopContinuation) {
    const t = state[name];
    if (!t.buffer || !ctx) return;
    const dur = t.buffer.duration;
    const source = ctx.createBufferSource();
    source.buffer = t.buffer;

    const segGain = ctx.createGain();
    const fadeInDur = isLoopContinuation ? CROSSFADE : FADE_IN;
    segGain.gain.setValueAtTime(0, startTime);
    segGain.gain.linearRampToValueAtTime(1, startTime + fadeInDur);
    const fadeOutStart = startTime + dur - CROSSFADE;
    segGain.gain.setValueAtTime(1, fadeOutStart);
    segGain.gain.linearRampToValueAtTime(0, startTime + dur);

    source.connect(segGain).connect(destinationFor(name));
    source.start(startTime);
    source.stop(startTime + dur + 0.1);
    t.sources.push(source);
    source.onended = () => {
      t.sources = t.sources.filter(s => s !== source);
    };

    const nextStart = startTime + dur - CROSSFADE;
    const delayMs = (nextStart - ctx.currentTime - 0.5) * 1000;
    t.timer = setTimeout(
      () => {
        if (t.isPlaying) scheduleSegmentFor(name, nextStart, true);
      },
      Math.max(50, delayMs)
    );
  }

  async function playTrack(name) {
    const t = state[name];
    if (t.isPlaying) return;
    const ok = await loadTrack(name);
    if (!ok) return;
    if (t.isPlaying) return; // Race-Schutz: zweiter playTrack während load
    t.isPlaying = true;
    scheduleSegmentFor(name, ctx.currentTime + 0.1, false);
  }

  function stopTrack(name) {
    const t = state[name];
    t.isPlaying = false;
    if (t.timer) {
      clearTimeout(t.timer);
      t.timer = null;
    }
    for (const s of t.sources) {
      try { s.stop(); } catch {}
    }
    t.sources = [];
  }

  /* ---------- Mode-Crossfade ---------- */
  function setMode(mode) {
    if (mode === currentMode) return;
    if (!ctx) {
      currentMode = mode;
      return;
    }
    const t = ctx.currentTime;
    const wasBoss = currentMode === "boss";
    const goingBoss = mode === "boss";

    // 1. Boss-Track ein-/ausblenden
    if (goingBoss && !wasBoss) {
      // Boss laden + abspielen, parallel zu main
      playTrack("boss"); // async, läuft im Hintergrund
      const g = state.boss.gainNode.gain;
      g.cancelScheduledValues(t);
      g.setValueAtTime(g.value, t);
      g.linearRampToValueAtTime(1, t + MODE_FADE);
    }
    if (wasBoss && !goingBoss) {
      // Boss ausblenden, dann anhalten
      const g = state.boss.gainNode.gain;
      g.cancelScheduledValues(t);
      g.setValueAtTime(g.value, t);
      g.linearRampToValueAtTime(0, t + MODE_FADE);
      setTimeout(() => stopTrack("boss"), (MODE_FADE + 0.3) * 1000);
    }

    // 2. Main-Gain anpassen (drive=1, focus=duck, boss=0)
    let mainGainTarget;
    if (mode === "drive")      mainGainTarget = 1;
    else if (mode === "focus") mainGainTarget = FOCUS_DUCK;
    else /* boss */            mainGainTarget = 0;

    const mg = state.main.gainNode.gain;
    mg.cancelScheduledValues(t);
    mg.setValueAtTime(mg.value, t);
    mg.linearRampToValueAtTime(mainGainTarget, t + MODE_FADE);

    // 3. Lowpass-Filter — nur in focus aktiv (drive/boss = bypass)
    const cutTarget = mode === "focus" ? FOCUS_CUT : DRIVE_CUT;
    const cf = mainModeFilter.frequency;
    cf.cancelScheduledValues(t);
    cf.setValueAtTime(cf.value, t);
    cf.exponentialRampToValueAtTime(cutTarget, t + MODE_FADE);

    currentMode = mode;
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
    if (!state.main.isPlaying) {
      await playTrack("main");
    }
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
      if (!state.main.isPlaying) start();
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

  window.Music = {
    start, toggle, setMode, setEnabled, setVolume,
    isEnabled: () => enabled,
    getVolume: () => volume,
  };
})();
