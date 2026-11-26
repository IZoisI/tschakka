/* ===========================================================
   TSCHAKKA // BOSS II – Ton der Pfützen-Szene
   -----------------------------------------------------------
   Schritte  : „Walking fast on Concrete“ (YouTube Audio Library)
   Platscher : „Water Splashing“ – nur der erste Platscher (1,14–1,62 s)

   Ablauf:
   - Die Aufnahme wird in einzelne Schritte geschnitten und im Abstand
     `stepInterval` neu gesetzt (Tempo frei wählbar, Tonhöhe bleibt).
   - Die Schritte setzen ein, wenn der Van ins Schwarz abblendet, und
     werden lauter (er kommt näher).
   - Ein Schritt fällt genau auf den Tritt im Video (1,1 s), darauf liegt
     der Platscher.
   - Danach entfernen sich die Schritte und werden leiser.
   Von boss2.js und vorschau-intro.html gemeinsam genutzt.
   =========================================================== */
(function () {
  const DIR = "assets/boss2/";
  const CFG = {
    stepsFile: "YouTube Audio Library - Walking fast on Concrete.mp3",
    splashFile: "YouTube Audio Library - Water Splashing.mp3",
    rainFile: "boss2_regen.mp3", // 25 s aus „Rain Heavy Loud“, läuft unter dem ganzen Intro
    rainGain: 0.9,
    vanVolume: 0.55,         // eigener Ton des Van-Videos (0–1)
    stepsGain: 3,
    splashGain: 0.6,
    splashFrom: 1.14,      // erster Platscher in der Wasser-Datei
    splashTo: 1.62,
    stepInterval: 0.75,    // Abstand zwischen zwei Schritten (Original ~0,58 s)
    stepOnsets: [0, 0.58, 1.17, 2.28, 2.82, 4.51, 5.58, 7.88, 8.97, 9.99], // einzelne Schritte in der Datei
    stepLen: 0.45,         // Länge eines ausgeschnittenen Schritts
    impactVideo: 1.1,      // Tritt im Pfützen-Video
    splashOffset: 0,       // Feinjustierung des Platschers (s)
    walkAwayAfter: 0.6,    // ab hier (nach dem Tritt) werden die Schritte leiser …
    walkAwayFade: 2.5      // … über diese Dauer bis zur Stille
  };

  let ac = null, out = null, stepsBuf = null, splashBuf = null, rainBuf = null, rainSrc = null, rainGainNode = null;
  let loading = null, scheduled = [], impactAt = null, approachSpan = 0, splashSrc = null;

  async function decode(file) {
    const r = await fetch(DIR + encodeURIComponent(file));
    if (!r.ok) return null;
    return ac.decodeAudioData(await r.arrayBuffer());
  }

  function init() {
    if (loading) return loading;
    try {
      ac = new (window.AudioContext || window.webkitAudioContext)();
      const limiter = ac.createDynamicsCompressor();
      limiter.threshold.value = -3; limiter.knee.value = 0; limiter.ratio.value = 20;
      limiter.attack.value = 0.001; limiter.release.value = 0.1;
      out = ac.createGain(); out.connect(limiter); limiter.connect(ac.destination);
      if (ac.state === "suspended") ac.resume();
    } catch { return (loading = Promise.resolve(false)); }
    loading = Promise.all([decode(CFG.stepsFile), decode(CFG.splashFile), decode(CFG.rainFile)])
      .then(([s, w, r]) => { stepsBuf = s; splashBuf = w; rainBuf = r; return !!(s || w || r); })
      .catch(() => false);
    return loading;
  }

  /* Lautstärke eines Schritts relativ zum Tritt (dt < 0: davor) */
  function stepLevel(dt, approachFrom) {
    if (dt <= 0) return approachFrom > 0 ? 0.35 + 0.65 * (1 + dt / approachFrom) : 1;
    if (dt <= CFG.walkAwayAfter) return 1;
    return Math.max(0, 1 - (dt - CFG.walkAwayAfter) / CFG.walkAwayFade);
  }

  function clearSteps() {
    for (const n of scheduled) { try { n.stop(); } catch {} }
    scheduled = [];
  }

  /* Alle Schritte rund um den Tritt-Zeitpunkt (AudioContext-Zeit) setzen */
  function scheduleSteps(impactAc, approachFrom) {
    clearSteps();
    if (!stepsBuf) return;
    const now = ac.currentTime, iv = CFG.stepInterval;
    const kMin = -Math.floor((impactAc - now) / iv);
    const kMax = Math.ceil((CFG.walkAwayAfter + CFG.walkAwayFade) / iv);
    for (let k = kMin; k <= kMax; k++) {
      const t = impactAc + k * iv, lvl = stepLevel(k * iv, approachFrom);
      if (t < now - 0.001 || lvl <= 0.01) continue;
      const on = CFG.stepOnsets[(k + 1000) % CFG.stepOnsets.length];
      const src = ac.createBufferSource(); src.buffer = stepsBuf;
      const g = ac.createGain(), vol = lvl * CFG.stepsGain;
      g.gain.setValueAtTime(vol, t);
      g.gain.setValueAtTime(vol, t + CFG.stepLen - 0.08);
      g.gain.linearRampToValueAtTime(0.0001, t + CFG.stepLen);
      src.connect(g); g.connect(out);
      src.start(t, on, CFG.stepLen);
      scheduled.push(src);
    }
  }

  /* Schritte starten, `lead` Sekunden bevor das Pfützen-Video beginnt */
  function startApproach(lead) {
    if (!ac) return;
    approachSpan = lead + CFG.impactVideo;
    impactAt = ac.currentTime + approachSpan;
    scheduleSteps(impactAt, approachSpan);
  }

  /* Beim Start des Pfützen-Videos aufrufen (videoTime = aktuelle Position) */
  function syncToVideo(videoTime) {
    if (!ac) return;
    const now = ac.currentTime;
    const impactAc = now + Math.max(0, CFG.impactVideo - videoTime);
    /* Schritte neu anlegen, falls sie davongelaufen sind */
    if (impactAt == null || Math.abs(impactAt - impactAc) > 0.04) {
      impactAt = impactAc;
      scheduleSteps(impactAc, approachSpan);
    }
    if (splashBuf) {
      const src = ac.createBufferSource(); src.buffer = splashBuf;
      const g = ac.createGain();
      const t0 = impactAc + CFG.splashOffset, len = CFG.splashTo - CFG.splashFrom;
      g.gain.setValueAtTime(CFG.splashGain, t0);
      g.gain.setValueAtTime(CFG.splashGain, t0 + len - 0.12);
      g.gain.linearRampToValueAtTime(0.0001, t0 + len);
      src.connect(g); g.connect(out);
      src.start(Math.max(now, t0), CFG.splashFrom, len);
      splashSrc = src;
    }
  }

  /* Regen: läuft in Schleife unter dem ganzen Intro */
  function startRain(fadeIn = 1) {
    if (!ac || !rainBuf || rainSrc) return;
    const now = ac.currentTime;
    rainSrc = ac.createBufferSource(); rainSrc.buffer = rainBuf; rainSrc.loop = true;
    rainSrc.loopStart = 1; rainSrc.loopEnd = rainBuf.duration - 1.2; // ohne die Blenden der Datei
    rainGainNode = ac.createGain();
    rainGainNode.gain.setValueAtTime(0.0001, now);
    rainGainNode.gain.linearRampToValueAtTime(CFG.rainGain, now + fadeIn);
    rainSrc.connect(rainGainNode); rainGainNode.connect(out);
    rainSrc.start(now, 1);
  }
  function setRainGain(v) {
    CFG.rainGain = v;
    if (rainGainNode && ac) rainGainNode.gain.setTargetAtTime(v, ac.currentTime, 0.05);
  }
  function stopRain(fade = 1.5) {
    if (!rainSrc) return;
    const now = ac.currentTime, g = rainGainNode.gain;
    g.cancelScheduledValues(now); g.setValueAtTime(g.value, now); g.linearRampToValueAtTime(0.0001, now + fade);
    try { rainSrc.stop(now + fade + 0.05); } catch {}
    rainSrc = null;
  }

  function stop() {
    clearSteps();
    if (splashSrc) { try { splashSrc.stop(); } catch {} splashSrc = null; }
    impactAt = null;
  }

  window.Boss2Sound = { CFG, init, startApproach, syncToVideo, stop, startRain, setRainGain, stopRain };
})();
