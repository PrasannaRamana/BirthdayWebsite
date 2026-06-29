/* ============ CONFIG ============ */
window.BIRTHDAY_CONFIG = {
  name: "Bhavana",
  birthday: "2026-07-02T00:00:00",
  forceCelebrationIfPassed: true,
  theme: { navy: "#0B1026", deepNavy: "#06081A", pink: "#FFB6D9", rosePink: "#F6608B", gold: "#E9C46A", cream: "#FFF6EE", white: "#FFFFFF" },
  music: {
    // Put your song file in the assets folder, then set the path here:
    // Supported: .mp3, .wav, .ogg, .m4a
    src: "assets/birthday-song.mp3",
    volume: 0.45,
    loop: true
  },
  video: null,
  photos: [
    "assets/photo1.png", "assets/photo2.png", "assets/photo3.png",
    "assets/photo4.png", "assets/photo5.png", "assets/photo6.png"
  ],
  photoPositions: ["center 20%", "center 15%", "center 20%", "center 15%", "center 20%", "center 15%"],
  unlocks: { envelopesRequired: 8, starsRequired: 12, gameWinScore: 25 }
};

window.BIRTHDAY_MESSAGES = [
  { title: "The moment I met you", body: "There are days that pass quietly and there are days that rewrite everything. Meeting you was the second kind. I didn't know a single conversation could make the world feel softer, brighter, more like home. Happy birthday, my Bhavana." },
  { title: "Your smile", body: "Your smile is a small revolution. It dismantles bad days, rebuilds tired hearts, and somehow makes ordinary mornings feel like a celebration. I hope today gives you a thousand reasons to wear it." },
  { title: "The way you love", body: "You love with patience, with depth, with a quiet kind of bravery. You make people feel seen. I have learnt more about kindness from watching you than from any book I've ever read." },
  { title: "Our little universe", body: "Inside jokes, late-night calls, songs that only mean something to us – these are the constellations of our private sky. Thank you for building this universe with me." },
  { title: "Your mind", body: "I love the way you think. The strange curiosities, the sharp opinions, the soft questions you ask before sleeping. Your mind is one of the most beautiful places I've ever visited." },
  { title: "When you're far", body: "Even on the days the world keeps us apart, you are the warmest thought I carry. Distance never managed to make you smaller in my heart – it only proved how much room you take up there." },
  { title: "My promise", body: "I promise to keep choosing you. On the loud days and the quiet ones. On the chaotic Mondays and the lazy Sundays. You will never have to wonder whether you are loved – I will spend my life answering that question every day." },
  { title: "Happy Birthday, Bhavana", body: "Today the universe gets to celebrate the day you arrived in it – and I get to celebrate the luck of finding you. May this year be tender with you, generous to you, and full of the kind of joy that surprises you when you least expect it. I love you. Always." }
];

window.BIRTHDAY_GIFTS = [
  { label: "A Garden of You", wish: "Every flower I have ever loved looks a little like you. Today, I want to fill your world with petals only.", photo: window.BIRTHDAY_CONFIG.photos[0], accent: "rose" },
  { label: "A Sky for You", wish: "If I could, I'd hand you the entire night sky and tell you it's still not enough to match how I see you.", photo: window.BIRTHDAY_CONFIG.photos[1], accent: "navy" },
  { label: "A Song for You", wish: "A melody that hums softly in my chest whenever your name shows up on my phone. This is yours.", photo: window.BIRTHDAY_CONFIG.photos[2], accent: "gold" },
  { label: "A Memory for You", wish: "There's a memory I keep replaying – your laugh, half-caught between two breaths. Today, I gift it back to you.", photo: window.BIRTHDAY_CONFIG.photos[3], accent: "pink" },
  { label: "A Wish for You", wish: "May the year ahead be loud where you want it to be, and silent where you need it to be. May it be exactly yours.", photo: window.BIRTHDAY_CONFIG.photos[4], accent: "cream" },
  { label: "All of Me", wish: "The most honest gift I have is already yours – my time, my softness, my forever. Happy birthday, my love.", photo: window.BIRTHDAY_CONFIG.photos[5], accent: "rose" }
];

window.BIRTHDAY_SETTINGS = {
  loading: { durationMs: 3200 },
  particles: { backgroundCount: 90, heartsPerBurst: 12, confettiPerBurst: 140, fireworksMax: 6 },
  game: { durationSec: 45, spawnEveryMs: 650, initialLives: 3 },
  stars: { total: 12 },
  starMessages: [
    "You are my favourite hello.", "You taste like soft rain and warm coffee.",
    "Your name still makes me smile in meetings.", "Some days I love you quietly. Most days I love you loudly.",
    "You are the calmest place I know.", "If I had a wish, I'd waste it on hearing you laugh.",
    "I'd rebuild my world around your kindness.", "You are the proof good things still happen.",
    "Every soft thing in me belongs to you.", "You are my home in human form.",
    "I love you in every tense – was, am, will be.", "Forever sounds shorter when it's spent with you."
  ]
};

window.BIRTHDAY_REASONS = [
  "You laugh at your own jokes before anyone else, and it's adorable.",
  "You remember the smallest details about people you love.",
  "You make ordinary days feel like quiet celebrations.",
  "Your handwriting looks like it belongs on the cover of a poem.",
  "You are kind to people who can never repay you.",
  "You light up rooms without trying.",
  "You give the most honest hugs.",
  "You text 'be safe' and you actually mean it.",
  "You can find beauty in the dullest evenings.",
  "You love rain in a way that makes me love it too.",
  "You make playlists like love letters.",
  "Your eyes go soft when you talk about things you love.",
  "You hum when you're happy.",
  "You believe in handwritten letters.",
  "You love hard. You love steady. You love brave. That alone makes you my favourite human."
];

/* ============ UTILS ============ */
window.BD = window.BD || {};
BD.qs = (sel, root) => (root || document).querySelector(sel);
BD.qsa = (sel, root) => Array.from((root || document).querySelectorAll(sel));
BD.pad = (n, len) => String(n).padStart(len, "0");
BD.throttle = (fn, ms) => { let last = 0; return (...args) => { const now = Date.now(); if (now - last >= ms) { last = now; fn(...args); } }; };
BD.easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
BD.shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
BD.emit = (name, detail) => document.dispatchEvent(new CustomEvent(name, { detail }));
BD.on = (name, fn) => document.addEventListener(name, fn);

/* ============ STORAGE ============ */
const KEY = "bhavana_birthday_progress_v1";
const _defaults = () => ({ envelopesOpened: [], giftsOpened: [], starsCollected: [], reasonsShown: [], gameCompleted: false, finalReached: false, musicMuted: false });
let _state = null;
BD.storage = {
  load() { if (_state) return _state; try { const raw = localStorage.getItem(KEY); _state = raw ? Object.assign(_defaults(), JSON.parse(raw)) : _defaults(); } catch (e) { _state = _defaults(); } return _state; },
  save() { try { localStorage.setItem(KEY, JSON.stringify(_state)); } catch (_) {} },
  get(key) { return this.load()[key]; },
  set(key, value) { this.load(); _state[key] = value; this.save(); },
  addUnique(key, value) { this.load(); const arr = _state[key] || []; if (!arr.includes(value)) { arr.push(value); _state[key] = arr; this.save(); } return _state[key]; },
  reset() { _state = _defaults(); this.save(); }
};

/* ============ PARTICLES ============ */
(function () {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const settings = (window.BIRTHDAY_SETTINGS || {}).particles || { backgroundCount: 80 };
  let stars = [], hearts = [], w = 0, h = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let running = true;
  function resize() { w = canvas.clientWidth = window.innerWidth; h = canvas.clientHeight = window.innerHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); initStars(); }
  function initStars() { stars = []; for (let i = 0; i < settings.backgroundCount; i++) stars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + 0.3, a: Math.random() * 0.7 + 0.2, v: Math.random() * 0.018 + 0.004, phase: Math.random() * Math.PI * 2 }); }
  function spawnHeart() { hearts.push({ x: Math.random() * w, y: h + 10, r: Math.random() * 6 + 5, vy: Math.random() * 0.4 + 0.25, drift: Math.random() * 0.5 - 0.25, life: 0, maxLife: 1200 + Math.random() * 600, hue: 340 + Math.random() * 20 }); }
  function drawHeart(x, y, r, alpha, hue) { ctx.save(); ctx.translate(x, y); ctx.scale(r / 16, r / 16); ctx.globalAlpha = alpha; ctx.fillStyle = `hsl(${hue},90%,70%)`; ctx.shadowColor = `hsl(${hue},90%,70%)`; ctx.shadowBlur = 18; ctx.beginPath(); ctx.moveTo(0, 4); ctx.bezierCurveTo(0, -3, -10, -3, -10, 4); ctx.bezierCurveTo(-10, 12, 0, 16, 0, 22); ctx.bezierCurveTo(0, 16, 10, 12, 10, 4); ctx.bezierCurveTo(10, -3, 0, -3, 0, 4); ctx.fill(); ctx.restore(); }
  let lastSpawn = 0;
  function tick(now) { if (!running) return; ctx.clearRect(0, 0, w, h); for (const s of stars) { s.phase += s.v; const a = s.a * (0.6 + 0.4 * Math.sin(s.phase)); ctx.globalAlpha = a; ctx.fillStyle = "#FFF6EE"; ctx.shadowColor = "#FFF6EE"; ctx.shadowBlur = 6; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); } ctx.shadowBlur = 0; if (now - lastSpawn > 1400 && hearts.length < 10) { spawnHeart(); lastSpawn = now; } hearts = hearts.filter((p) => p.life < p.maxLife && p.y > -20); for (const p of hearts) { p.life += 16; p.y -= p.vy; p.x += p.drift; const a = Math.min(1, p.life / 800) * (1 - p.life / p.maxLife); drawHeart(p.x, p.y, p.r, a * 0.6, p.hue); } ctx.globalAlpha = 1; requestAnimationFrame(tick); }
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) requestAnimationFrame(tick); });
  window.addEventListener("resize", BD.throttle(resize, 120));
  resize(); requestAnimationFrame(tick);
})();

/* ============ CONFETTI ============ */
BD.confetti = (function () {
  const COLORS = ["#FFB6D9", "#F6608B", "#E9C46A", "#FFF6EE", "#E0467A"];
  function burst(canvas, opts = {}) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const settings = (window.BIRTHDAY_SETTINGS || {}).particles || {};
    const count = opts.count || settings.confettiPerBurst || 140;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cw = canvas.clientWidth, chh = canvas.clientHeight;
    const ox = opts.x ?? cw / 2, oy = opts.y ?? chh / 3;
    const pieces = [];
    for (let i = 0; i < count; i++) { const angle = Math.random() * Math.PI * 2, speed = Math.random() * 10 + 6; pieces.push({ x: ox, y: oy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 4, gravity: 0.22 + Math.random() * 0.1, rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4, size: Math.random() * 8 + 6, color: COLORS[Math.floor(Math.random() * COLORS.length)], life: 0, ttl: 1800 + Math.random() * 800 }); }
    const start = performance.now();
    function step(now) { ctx.clearRect(0, 0, cw, chh); let alive = 0; for (const p of pieces) { p.life += 16; if (p.life > p.ttl) continue; alive++; p.vy += p.gravity; p.x += p.vx; p.y += p.vy; p.rot += p.vr; const a = 1 - p.life / p.ttl; ctx.save(); ctx.globalAlpha = a; ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size / 2.4); ctx.restore(); } if (alive > 0 && now - start < 4500) requestAnimationFrame(step); else ctx.clearRect(0, 0, cw, chh); }
    requestAnimationFrame(step);
  }
  return { burst };
})();

/* ============ FIREWORKS ============ */
BD.fireworks = (function () {
  const COLORS = ["#FFB6D9", "#F6608B", "#E9C46A", "#FFF6EE", "#E0467A", "#9DD1FF"];
  let raf = null, canvas = null, ctx = null, particles = [], lastLaunch = 0, active = false;
  const settings = (window.BIRTHDAY_SETTINGS || {}).particles || { fireworksMax: 6 };
  function size() { const dpr = window.devicePixelRatio || 1; canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  function launch() { const cw = canvas.clientWidth, chh = canvas.clientHeight; const x = Math.random() * cw * 0.8 + cw * 0.1, y = Math.random() * chh * 0.55 + chh * 0.1; const color = COLORS[Math.floor(Math.random() * COLORS.length)]; const count = 60 + Math.floor(Math.random() * 30); for (let i = 0; i < count; i++) { const angle = (Math.PI * 2 * i) / count + Math.random() * 0.05, speed = Math.random() * 4 + 2.5; particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, color, life: 0, ttl: 900 + Math.random() * 400, size: Math.random() * 2 + 1.4 }); } }
  function step(now) { if (!active) return; const cw = canvas.clientWidth, chh = canvas.clientHeight; ctx.fillStyle = "rgba(6,8,26,0.18)"; ctx.fillRect(0, 0, cw, chh); if (now - lastLaunch > 700 && particles.length < settings.fireworksMax * 80) { launch(); lastLaunch = now; } particles = particles.filter((p) => p.life < p.ttl); for (const p of particles) { p.life += 16; p.vy += 0.04; p.vx *= 0.99; p.vy *= 0.99; p.x += p.vx; p.y += p.vy; const a = 1 - p.life / p.ttl; ctx.globalAlpha = a; ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); } ctx.shadowBlur = 0; ctx.globalAlpha = 1; raf = requestAnimationFrame(step); }
  function start(target) { canvas = target; if (!canvas) return; ctx = canvas.getContext("2d"); active = true; particles = []; size(); window.addEventListener("resize", size); raf = requestAnimationFrame(step); }
  function stop() { active = false; if (raf) cancelAnimationFrame(raf); if (ctx && canvas) ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); }
  return { start, stop };
})();

/* ============ BALLOONS ============ */
BD.balloons = (function () {
  const COLORS = [["#FFB6D9", "#F6608B"], ["#E9C46A", "#D4A94B"], ["#FFE1EA", "#F4ABBD"], ["#FFD1E4", "#E0467A"], ["#FFF6EE", "#FFB6D9"]];
  function release(container, count = 12) {
    if (!container) return;
    container.style.position = container.style.position || "relative";
    for (let i = 0; i < count; i++) {
      const b = document.createElement("div");
      const [c1, c2] = COLORS[Math.floor(Math.random() * COLORS.length)];
      const left = Math.random() * 100, dur = 6 + Math.random() * 4, delay = Math.random() * 1.4, sway = Math.random() * 80 - 40 + "px";
      b.style.cssText = `position:absolute;left:${left}%;bottom:-160px;width:46px;height:60px;border-radius:50% 50% 48% 48%/55% 55% 45% 45%;background:radial-gradient(circle at 30% 30%,${c1},${c2} 70%);box-shadow:inset -6px -8px 14px rgba(0,0,0,0.18),0 6px 14px rgba(0,0,0,0.25);--bx:0;--bsway:${sway};--br:${Math.random() * 8 - 4}deg;animation:balloonRise ${dur}s var(--ease-out) ${delay}s forwards;pointer-events:none;z-index:2;`;
      const str = document.createElement("span");
      str.style.cssText = `position:absolute;left:50%;top:100%;width:1.2px;height:60px;background:rgba(255,246,238,0.5);transform:translateX(-50%);`;
      b.appendChild(str); container.appendChild(b);
      setTimeout(() => b.remove(), (dur + delay) * 1000 + 400);
    }
  }
  return { release };
})();

/* ============ MUSIC ============ */
BD.music = (function () {
  const cfg = (window.BIRTHDAY_CONFIG || {}).music || {};
  const toggle = document.getElementById("musicToggle");
  let started = false;
  let muted = BD.storage.get("musicMuted") || false;
  let audioEl = null;
  let actx = null;
  let masterGain = null;
  let padTimer = null;
  let usingPad = false;

  function ensureAudioElement() {
    if (!cfg.src) return null;
    if (audioEl) return audioEl;
    audioEl = new Audio(cfg.src);
    audioEl.loop = cfg.loop !== false;
    audioEl.volume = cfg.volume ?? 0.45;
    audioEl.preload = "auto";
    return audioEl;
  }

  // Preload song early so it starts faster on button click
  if (cfg.src) ensureAudioElement();

  function startPad() {
    if (actx || muted) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      actx = new Ctx();
      if (actx.state === "suspended") actx.resume();
      masterGain = actx.createGain();
      masterGain.gain.value = (cfg.volume ?? 0.45) * 0.6;
      const filt = actx.createBiquadFilter();
      filt.type = "lowpass";
      filt.frequency.value = 2200;
      masterGain.connect(filt).connect(actx.destination);
      const progressions = [[261.6, 329.6, 392.0], [220.0, 261.6, 329.6], [174.6, 220.0, 261.6], [196.0, 246.9, 293.7]];
      let step = 0;
      function playChord() {
        if (muted || !actx) return;
        const chord = progressions[step % progressions.length];
        step++;
        chord.forEach((freq, idx) => {
          const o = actx.createOscillator();
          const g = actx.createGain();
          o.type = "sine";
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.0001, actx.currentTime);
          g.gain.linearRampToValueAtTime(0.18 - idx * 0.04, actx.currentTime + 1.4);
          g.gain.linearRampToValueAtTime(0.0001, actx.currentTime + 4.6);
          o.connect(g).connect(masterGain);
          o.start();
          o.stop(actx.currentTime + 4.8);
        });
      }
      usingPad = true;
      playChord();
      padTimer = setInterval(playChord, 4200);
    } catch (_) {}
  }

  function stopPad() {
    usingPad = false;
    if (padTimer) clearInterval(padTimer);
    padTimer = null;
    if (actx) {
      try { actx.close(); } catch (_) {}
      actx = null;
    }
  }

  function updateToggle() {
    if (!toggle) return;
    toggle.hidden = false;
    toggle.classList.toggle("is-muted", muted);
    toggle.classList.toggle("is-playing", started && !muted);
    toggle.setAttribute("aria-pressed", String(!muted));
  }

  function playSong() {
    const el = ensureAudioElement();
    if (!el) {
      startPad();
      return Promise.resolve();
    }
    stopPad();
    el.volume = cfg.volume ?? 0.45;
    return el.play().catch(() => {
      startPad();
    });
  }

  function applyMutedState() {
    updateToggle();
    if (muted) {
      if (audioEl) audioEl.pause();
      stopPad();
      return;
    }
    if (!started) return;
    playSong();
  }

  function start(opts = {}) {
    if (opts.forceUnmute) {
      muted = false;
      BD.storage.set("musicMuted", false);
    }
    started = true;
    updateToggle();
    if (muted) return;
    playSong().then(() => updateToggle());
  }

  toggle?.addEventListener("click", () => {
    muted = !muted;
    BD.storage.set("musicMuted", muted);
    if (!started) started = true;
    applyMutedState();
  });

  return { start, get muted() { return muted; }, get usingPad() { return usingPad; } };
})();

/* ============ NAVIGATION ============ */
BD.nav = (function () {
  const screens = BD.qsa("[data-screen]");
  const order = screens.map((s) => s.dataset.screen);
  const rail = document.getElementById("progressDots");
  let currentIdx = 0;
  function buildRail() { rail.innerHTML = ""; order.forEach((name, idx) => { const li = document.createElement("li"); li.dataset.screen = name; li.setAttribute("title", name); li.addEventListener("click", () => goTo(name)); rail.appendChild(li); }); updateRail(); }
  function updateRail() { BD.qsa("#progressDots li").forEach((li, idx) => { li.classList.toggle("is-active", idx === currentIdx); li.classList.toggle("is-done", idx < currentIdx); }); }
  function goTo(name) { const targetIdx = order.indexOf(name); if (targetIdx === -1) return; const current = screens[currentIdx], target = screens[targetIdx]; if (current === target) return; current.classList.remove("is-active"); current.hidden = true; current.scrollTop = 0; target.hidden = false; void target.offsetWidth; target.classList.add("is-active"); target.scrollTop = 0; currentIdx = targetIdx; updateRail(); BD.emit("screen:enter", { name }); }
  function next() { const nextIdx = Math.min(currentIdx + 1, order.length - 1); goTo(order[nextIdx]); }
  document.addEventListener("click", (e) => { const btn = e.target.closest("[data-next]"); if (btn && !btn.disabled) next(); });
  buildRail();
  return { goTo, next, current: () => order[currentIdx], order };
})();

/* ============ LOADING ============ */
(function () {
  const fill = document.getElementById("loadingBarFill");
  const stage = BD.qs(".loading-stage");
  const duration = window.BIRTHDAY_SETTINGS?.loading?.durationMs || 3200;
  for (let i = 0; i < 14; i++) { const s = document.createElement("span"); s.style.cssText = `position:absolute;left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:5px;height:5px;background:var(--gold-400);border-radius:50%;box-shadow:0 0 10px var(--gold-400);animation:sparkle ${1.5 + Math.random() * 1.5}s ease-in-out ${Math.random() * 2}s infinite;`; stage.appendChild(s); }
  const start = performance.now();
  function tick(now) { const t = Math.min(1, (now - start) / duration); fill.style.width = (BD.easeOutCubic(t) * 100).toFixed(2) + "%"; if (t < 1) requestAnimationFrame(tick); else BD.emit("loading:done"); }
  requestAnimationFrame(tick);
})();

/* ============ LANDING ============ */
(function () {
  const root = BD.qs("[data-parallax-root]");
  const floaters = BD.qs(".landing-floaters");
  const btn = document.getElementById("btnBeginJourney");
  if (floaters) { for (let i = 0; i < 12; i++) { const h = document.createElement("div"); const size = 18 + Math.random() * 22; h.style.cssText = `position:absolute;left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${size}px;height:${size}px;background:radial-gradient(circle at 30% 30%,var(--pink-300),var(--rose-500) 60%,transparent 70%);clip-path:path("M12 21s-7-4.4-9.3-9C.6 8 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.4 4 4.3 8C19 16.6 12 21 12 21z");filter:drop-shadow(0 0 10px rgba(246,96,139,.55));opacity:${0.35 + Math.random() * 0.45};animation:floatY ${4 + Math.random() * 5}s ease-in-out ${Math.random() * 4}s infinite;`; floaters.appendChild(h); } }
  if (root) { const els = BD.qsa("[data-parallax]", root); root.addEventListener("mousemove", BD.throttle((e) => { const r = root.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; els.forEach((el) => { const d = parseFloat(el.dataset.parallax || "5"); el.style.transform = `translate3d(${(-x * d).toFixed(2)}px,${(-y * d).toFixed(2)}px,0)`; }); }, 24)); }
  btn?.addEventListener("click", () => {
    BD.music.start({ forceUnmute: true });
    setTimeout(() => BD.nav.next(), 300);
  });
})();

/* ============ COUNTDOWN ============ */
(function () {
  const cfg = window.BIRTHDAY_CONFIG;
  const target = new Date(cfg.birthday).getTime();
  const screen = document.getElementById("screen-countdown");
  const meta = document.getElementById("countdownMeta");
  const nextBtn = document.getElementById("btnCountdownNext");
  const dayDate = new Date(cfg.birthday).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  if (meta) meta.textContent = `${dayDate} · A day the world celebrates you.`;
  function update() { const now = Date.now(); let diff = target - now; if (diff <= 0) { BD.qsa("[data-cd]", screen).forEach((el) => (el.textContent = "00")); if (nextBtn) nextBtn.disabled = false; if (cfg.forceCelebrationIfPassed) { clearInterval(timer); if (BD.nav.current() === "countdown") BD.nav.goTo("celebration"); } return; } const days = Math.floor(diff / 86400000); diff -= days * 86400000; const hours = Math.floor(diff / 3600000); diff -= hours * 3600000; const minutes = Math.floor(diff / 60000); diff -= minutes * 60000; const seconds = Math.floor(diff / 1000); setCell("days", days); setCell("hours", hours); setCell("minutes", minutes); setCell("seconds", seconds); }
  function setCell(key, val) { const el = screen.querySelector(`[data-cd="${key}"]`); if (el) el.textContent = BD.pad(val, key === "days" ? 3 : 2); }
  update(); const timer = setInterval(update, 1000);
})();

/* ============ PASSWORD VERIFICATION ============ */
(function () {
  const cfg = window.BIRTHDAY_CONFIG;
  const passwordInput = document.getElementById("passwordInput");
  const toggleBtn = document.getElementById("togglePasswordVisibility");
  const submitBtn = document.getElementById("btnSubmitPassword");
  const errorEl = document.getElementById("passwordError");
  const screen = document.getElementById("screen-password");
  
  // Extract birthday in DD-MM-YYYY format
  const birthDate = new Date(cfg.birthday);
  const correctPassword = BD.pad(birthDate.getDate(), 2) + "-" + BD.pad(birthDate.getMonth() + 1, 2) + "-" + birthDate.getFullYear();
  
  // Toggle password visibility
  toggleBtn?.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleBtn.querySelector(".toggle-icon").textContent = isPassword ? "🙈" : "👁️";
  });
  
  // Format input as user types (DD-MM-YYYY)
  passwordInput?.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length >= 2) value = value.slice(0, 2) + "-" + value.slice(2);
    if (value.length >= 5) value = value.slice(0, 5) + "-" + value.slice(5);
    e.target.value = value;
  });
  
  // Clear error on input
  passwordInput?.addEventListener("focus", () => {
    if (errorEl) errorEl.hidden = true;
  });
  
  function verifyPassword() {
    const input = (passwordInput.value || "").trim();
    if (!input) {
      showError("Please enter a password.");
      return;
    }
    if (input !== correctPassword) {
      showError("Incorrect password. Try again.");
      return;
    }
    // Success - navigate to celebration
    if (errorEl) errorEl.hidden = true;
    passwordInput.value = "";
    BD.nav.next();
  }
  
  function showError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.hidden = false;
    passwordInput.focus();
  }
  
  // Submit on button click
  submitBtn?.addEventListener("click", verifyPassword);
  
  // Submit on Enter key
  passwordInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") verifyPassword();
  });
  
  // Reset on screen enter
  BD.on("screen:enter", (e) => {
    if (e.detail.name === "password") {
      passwordInput.value = "";
      if (errorEl) errorEl.hidden = true;
      passwordInput.focus();
    }
  });
})();

/* ============ CELEBRATION ============ */
(function () {
  const screen = document.getElementById("screen-celebration");
  const canvas = document.getElementById("celebrationFxCanvas");
  const btn = document.getElementById("btnFire");
  function igniteAll() { BD.fireworks.start(canvas); BD.confetti.burst(canvas, { x: canvas.clientWidth / 2, y: canvas.clientHeight / 3 }); BD.balloons.release(screen, 14); }
  BD.on("screen:enter", (e) => { if (e.detail.name === "celebration") igniteAll(); else BD.fireworks.stop(); });
  btn?.addEventListener("click", igniteAll);
})();

/* ============ ENVELOPES ============ */
(function () {
  const stage = document.getElementById("envelopesStage");
  const progressEl = document.getElementById("envProgress");
  const nextBtn = document.getElementById("btnEnvelopesNext");
  const modal = document.getElementById("letterModal");
  const titleEl = document.getElementById("letterTitle");
  const bodyEl = document.getElementById("letterBody");
  const closeBtn = document.getElementById("letterClose");
  const total = window.BIRTHDAY_CONFIG?.unlocks?.envelopesRequired || 8;
  const messages = (window.BIRTHDAY_MESSAGES || []).slice(0, total);
  const opened = new Set(BD.storage.get("envelopesOpened") || []);
  function render() { stage.innerHTML = ""; messages.forEach((m, idx) => { const env = document.createElement("button"); env.className = "envelope"; env.style.setProperty("--rot", (Math.random() * 12 - 6).toFixed(2) + "deg"); env.setAttribute("data-testid", `envelope-${idx + 1}`); env.setAttribute("aria-label", `Open letter ${idx + 1}: ${m.title}`); env.innerHTML = `<span class="envelope__seal" aria-hidden="true">B</span><span class="envelope__label">${m.title}</span>`; if (opened.has(idx)) env.classList.add("is-opened"); env.addEventListener("click", () => openLetter(idx, env)); stage.appendChild(env); }); updateProgress(); }
  function openLetter(idx, el) { const m = messages[idx]; titleEl.textContent = m.title; bodyEl.textContent = m.body; modal.hidden = false; closeBtn.focus(); if (!opened.has(idx)) { opened.add(idx); BD.storage.addUnique("envelopesOpened", idx); setTimeout(() => el.classList.add("is-opened"), 350); } updateProgress(); }
  function closeModal() { modal.hidden = true; }
  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });
  function updateProgress() { progressEl.textContent = opened.size; if (opened.size >= total) nextBtn.disabled = false; }
  render();
})();

/* ============ GIFTS ============ */
(function () {
  const grid = document.getElementById("giftsGrid");
  if (!grid) return;
  const gifts = window.BIRTHDAY_GIFTS || [];
  const giftColors = ["#F6608B", "#0B1026", "#E9C46A", "#FFB6D9", "#FFF6EE", "#E0467A"];
  const opened = new Set(BD.storage.get("giftsOpened") || []);
  const lightbox = document.createElement("div");
  lightbox.id = "giftLightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Gift reveal");
  lightbox.innerHTML = `<div class="gift-lightbox__inner"><button class="gift-lightbox__close" id="giftLightboxClose" aria-label="Close">&times;</button><div class="gift-lightbox__photo" id="giftLightboxPhoto"></div><div class="gift-lightbox__text"><p class="gift-lightbox__label" id="giftLightboxLabel"></p><p class="gift-lightbox__wish" id="giftLightboxWish"></p></div></div>`;
  lightbox.hidden = true;
  document.body.appendChild(lightbox);
  function openLightbox(g, idx) { const bgPos = window.BIRTHDAY_CONFIG.photoPositions?.[idx] || "center 20%"; document.getElementById("giftLightboxPhoto").style.backgroundImage = `url('${g.photo}')`; document.getElementById("giftLightboxPhoto").style.backgroundPosition = bgPos; document.getElementById("giftLightboxLabel").textContent = g.label; document.getElementById("giftLightboxWish").textContent = g.wish; lightbox.hidden = false; document.body.style.overflow = "hidden"; document.getElementById("giftLightboxClose").focus(); }
  function closeLightbox() { lightbox.hidden = true; document.body.style.overflow = ""; }
  document.getElementById("giftLightboxClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });
  gifts.forEach((g, idx) => {
    const item = document.createElement("button");
    item.className = "gift";
    if (opened.has(idx)) item.classList.add("is-open");
    item.setAttribute("data-testid", `gift-${idx + 1}`);
    item.setAttribute("aria-label", `Open gift ${idx + 1}: ${g.label}`);
    item.innerHTML = `<div class="gift__box" style="background:linear-gradient(135deg,${giftColors[idx]},${giftColors[(idx + 2) % giftColors.length]});"><span class="gift__label">${g.label}</span><span class="gift__hint">${opened.has(idx) ? "Tap to view" : "Tap to open"}</span></div>`;
    item.addEventListener("click", () => { if (!opened.has(idx)) { opened.add(idx); item.classList.add("is-open"); item.querySelector(".gift__hint").textContent = "Tap to view"; BD.storage.addUnique("giftsOpened", idx); } openLightbox(g, idx); });
    grid.appendChild(item);
  });
})();

/* ============ STARS ============ */
(function () {
  const stage = document.getElementById("starsStage");
  const progressEl = document.getElementById("starProgress");
  const totalEl = document.getElementById("starTotal");
  const whisper = document.getElementById("starWhisper");
  const nextBtn = document.getElementById("btnStarsNext");
  const total = window.BIRTHDAY_SETTINGS?.stars?.total || 12;
  const messages = window.BIRTHDAY_SETTINGS?.starMessages || [];
  const collected = new Set(BD.storage.get("starsCollected") || []);
  totalEl.textContent = total;

  function starPositions(count) {
    const positions = [];
    const cols = window.innerWidth < 480 ? 3 : window.innerWidth < 720 ? 4 : 4;
    const rows = Math.ceil(count / cols);
    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const padX = 10, padY = 12;
      const cellW = (100 - padX * 2) / cols;
      const cellH = (100 - padY * 2) / rows;
      positions.push({
        left: padX + col * cellW + cellW * (0.25 + Math.random() * 0.5),
        top: padY + row * cellH + cellH * (0.2 + Math.random() * 0.6)
      });
    }
    return BD.shuffle(positions);
  }

  function placeStars() {
    stage.innerHTML = "";
    const spots = starPositions(total);
    for (let i = 0; i < total; i++) {
      const star = document.createElement("button");
      star.className = "collectible-star";
      star.style.left = spots[i].left + "%";
      star.style.top = spots[i].top + "%";
      star.style.animationDelay = (Math.random() * 2).toFixed(2) + "s";
      star.setAttribute("aria-label", `Star ${i + 1}`);
      star.setAttribute("data-testid", `star-${i + 1}`);
      if (collected.has(i)) star.classList.add("is-collected");
      const tap = (e) => { e.preventDefault(); collect(i, star); };
      star.addEventListener("click", tap);
      star.addEventListener("touchend", tap, { passive: false });
      stage.appendChild(star);
    }
    updateProgress();
  }

  let whisperTimer = null;
  function collect(idx, el) {
    if (el.classList.contains("is-collected")) return;
    el.classList.add("is-collected");
    collected.add(idx);
    BD.storage.addUnique("starsCollected", idx);
    const msg = messages[idx % messages.length] || "A little secret only the stars know.";
    whisper.textContent = msg;
    whisper.hidden = false;
    whisper.style.animation = "none";
    void whisper.offsetWidth;
    whisper.style.animation = "fadeInUp .5s var(--ease-out)";
    clearTimeout(whisperTimer);
    whisperTimer = setTimeout(() => { whisper.hidden = true; }, 3200);
    updateProgress();
  }
  function updateProgress() { progressEl.textContent = collected.size; if (collected.size >= total) nextBtn.disabled = false; }

  placeStars();
  window.addEventListener("resize", BD.throttle(placeStars, 200));
  BD.on("screen:enter", (e) => { if (e.detail.name === "stars") placeStars(); });
})();

/* ============ REASONS ============ */
(function () {
  const card = document.getElementById("reasonCard");
  const numEl = document.getElementById("reasonNum");
  const textEl = document.getElementById("reasonText");
  const meta = document.getElementById("reasonsMeta");
  const btn = document.getElementById("btnNextReason");
  const list = window.BIRTHDAY_REASONS || [];
  let queue = BD.shuffle(list.map((_, idx) => idx));
  let shownIdx = BD.storage.get("reasonsShown") || [];
  queue = queue.filter((i) => !shownIdx.includes(i));
  function update() { meta.textContent = `${shownIdx.length} / ${list.length} revealed`; }
  update();
  function reveal() { if (queue.length === 0) { shownIdx = []; BD.storage.set("reasonsShown", shownIdx); queue = BD.shuffle(list.map((_, idx) => idx)); } const idx = queue.shift(); shownIdx.push(idx); BD.storage.set("reasonsShown", shownIdx); card.classList.remove("is-flipping"); void card.offsetWidth; card.classList.add("is-flipping"); setTimeout(() => { numEl.textContent = "#" + String(idx + 1).padStart(3, "0"); textEl.textContent = list[idx]; }, 200); update(); }
  btn?.addEventListener("click", reveal);
  card?.addEventListener("click", reveal);
})();

/* ============ GAME ============ */
(function () {
  const stage = document.getElementById("gameStage");
  const overlay = document.getElementById("gameOverlay");
  const overlayTitle = document.getElementById("gameOverlayTitle");
  const overlayText = document.getElementById("gameOverlayText");
  const startBtn = document.getElementById("btnGameStart");
  const scoreEl = document.getElementById("gameScore");
  const livesEl = document.getElementById("gameLives");
  const timeEl = document.getElementById("gameTime");
  const nextBtn = document.getElementById("btnGameNext");
  const cfg = window.BIRTHDAY_SETTINGS?.game || { durationSec: 45, spawnEveryMs: 650, initialLives: 3 };
  const winScore = window.BIRTHDAY_CONFIG?.unlocks?.gameWinScore || 25;
  let score = 0, lives = cfg.initialLives, timeLeft = cfg.durationSec;
  let running = false, spawnInt = null, tickInt = null, raf = null;
  const hearts = [];

  const board = document.createElement("div");
  board.className = "game-paddle";
  stage.appendChild(board);

  let boardX = 0, targetX = 0, paddleW = 80, heartSize = 48;

  function measure() {
    const rect = stage.getBoundingClientRect();
    paddleW = board.offsetWidth || Math.min(96, Math.max(64, rect.width * 0.18));
    heartSize = Math.min(52, Math.max(40, rect.width * 0.1));
    boardX = rect.width / 2;
    targetX = boardX;
    board.style.left = boardX + "px";
  }

  function updateTargetX(e) {
    if (!running && e.type !== "touchstart") return;
    const rect = stage.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    targetX = clientX - rect.left;
    const half = paddleW / 2;
    targetX = Math.max(half, Math.min(targetX, rect.width - half));
  }

  stage.addEventListener("mousemove", updateTargetX);
  stage.addEventListener("touchstart", updateTargetX, { passive: true });
  stage.addEventListener("touchmove", updateTargetX, { passive: true });

  function boardTick() {
    boardX += (targetX - boardX) * 0.32;
    board.style.left = boardX + "px";
    requestAnimationFrame(boardTick);
  }
  boardTick();
  measure();
  window.addEventListener("resize", BD.throttle(measure, 120));

  if (BD.storage.get("gameCompleted")) nextBtn.disabled = false;

  function popHeart(h) {
    if (h.dead) return;
    h.dead = true;
    h.el.classList.add("is-popped");
    score++;
    scoreEl.textContent = score;
    setTimeout(() => h.el.remove(), 500);
  }

  function reset() {
    score = 0; lives = cfg.initialLives; timeLeft = cfg.durationSec;
    scoreEl.textContent = score; livesEl.textContent = lives; timeEl.textContent = timeLeft;
    hearts.forEach((h) => h.el.remove()); hearts.length = 0;
    stage.classList.remove("is-playing");
  }

  function start() {
    reset(); measure();
    overlay.hidden = true;
    running = true;
    stage.classList.add("is-playing");
    const spawnRate = window.innerWidth < 720 ? Math.max(480, cfg.spawnEveryMs - 120) : cfg.spawnEveryMs;
    spawnInt = setInterval(spawn, spawnRate);
    tickInt = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) finish();
    }, 1000);
    raf = requestAnimationFrame(tick);
  }

  function finish() {
    running = false;
    stage.classList.remove("is-playing");
    clearInterval(spawnInt); clearInterval(tickInt);
    if (raf) cancelAnimationFrame(raf);
    const won = score >= winScore;
    overlay.hidden = false;
    if (won) {
      overlayTitle.textContent = "You did it ❤";
      overlayText.textContent = `You caught ${score} hearts. The final surprise is now unlocked.`;
      startBtn.querySelector(".btn-luxe__inner").textContent = "Play again";
      BD.storage.set("gameCompleted", true);
      nextBtn.disabled = false;
    } else {
      overlayTitle.textContent = lives <= 0 ? "Out of lives" : "Time's up";
      overlayText.textContent = `You caught ${score} of ${winScore}. Try once more?`;
      startBtn.querySelector(".btn-luxe__inner").textContent = "Try again";
    }
  }

  function spawn() {
    if (!running) return;
    const w = stage.clientWidth;
    const el = document.createElement("div");
    el.className = "game-heart";
    const size = heartSize;
    el.style.width = size + "px";
    el.style.height = size + "px";
    const x = Math.random() * Math.max(20, w - size);
    el.style.left = x + "px";
    const speed = (window.innerWidth < 720 ? 2.2 : 1.6) + Math.random() * 1.6;
    const h = { el, x, y: -size, speed, size, dead: false };
    const tap = (e) => { e.preventDefault(); e.stopPropagation(); popHeart(h); };
    el.addEventListener("click", tap);
    el.addEventListener("touchend", tap, { passive: false });
    hearts.push(h);
    stage.appendChild(el);
  }

  function tick() {
    if (!running) return;
    const stageH = stage.clientHeight;
    const half = paddleW / 2;
    const boardY = stageH - 20;
    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      if (h.dead) { hearts.splice(i, 1); continue; }
      h.y += h.speed;
      h.el.style.transform = `translateY(${h.y}px)`;
      if (h.y + h.size >= boardY - 4 && h.y <= boardY + 14 && h.x + h.size >= boardX - half && h.x <= boardX + half) {
        popHeart(h);
        continue;
      }
      if (h.y > stageH + 20) {
        h.el.remove();
        hearts.splice(i, 1);
        lives--;
        livesEl.textContent = Math.max(0, lives);
        if (lives <= 0) { finish(); break; }
      }
    }
    raf = requestAnimationFrame(tick);
  }

  startBtn?.addEventListener("click", start);
  BD.on("screen:enter", (e) => {
    if (e.detail.name !== "game") {
      if (running) finish();
      reset();
      measure();
      overlayTitle.textContent = "Are you ready?";
      overlayText.textContent = "Catch the falling hearts. Miss too many and lose a life.";
      startBtn.querySelector(".btn-luxe__inner").textContent = "Start";
      overlay.hidden = false;
    } else {
      measure();
    }
  });
})();

/* ============ FINAL ============ */
(function () {
  const screen = document.getElementById("screen-final");
  const canvas = document.getElementById("finalFxCanvas");
  const cake = document.getElementById("cake");
  const blowBtn = document.getElementById("btnBlowCandles");
  const viewGalleryBtn = document.getElementById("btnViewGallery");
  const candlePopup = document.getElementById("candlePopup");
  const candlePopupClose = document.getElementById("candlePopupClose");
  const galleryModal = document.getElementById("galleryModal");
  const galleryModalClose = document.getElementById("galleryModalClose");
  const restartBtn = document.getElementById("btnRestart");
  const gallery = document.getElementById("finalGallery");
  const photos = window.BIRTHDAY_CONFIG.photos || [];
  const positions = window.BIRTHDAY_CONFIG.photoPositions || [];

  photos.forEach((p, idx) => {
    const item = document.createElement("div");
    item.className = "final-gallery__item";
    item.style.backgroundImage = `url('${p}')`;
    if (positions[idx]) item.style.backgroundPosition = positions[idx];
    gallery.appendChild(item);
  });

  BD.on("screen:enter", (e) => {
    if (e.detail.name === "final") {
      BD.fireworks.start(canvas);
      BD.confetti.burst(canvas, { x: canvas.clientWidth / 2, y: canvas.clientHeight / 3 });
      BD.balloons.release(screen, 18);
    } else {
      BD.fireworks.stop();
    }
  });

  function openCandlePopup() {
    if (!candlePopup) return;
    candlePopup.hidden = false;
    candlePopup.classList.add("is-open");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => viewGalleryBtn?.focus());
  }

  function closeCandlePopup() {
    if (!candlePopup) return;
    candlePopup.hidden = true;
    candlePopup.classList.remove("is-open");
    if (!galleryModal || galleryModal.hidden) document.body.classList.remove("modal-open");
  }

  function openGalleryModal() {
    closeCandlePopup();
    if (!galleryModal) return;
    galleryModal.hidden = false;
    galleryModal.classList.add("is-open");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => galleryModalClose?.focus());
    if (canvas) BD.confetti.burst(canvas, { x: canvas.clientWidth / 2, y: canvas.clientHeight / 2, count: 120 });
  }

  function closeGalleryModal() {
    if (!galleryModal) return;
    galleryModal.hidden = true;
    galleryModal.classList.remove("is-open");
    if (!candlePopup || candlePopup.hidden) document.body.classList.remove("modal-open");
  }

  const popupCard = candlePopup?.querySelector(".candle-popup__card");
  popupCard?.addEventListener("click", (e) => e.stopPropagation());
  candlePopup?.addEventListener("click", (e) => { if (e.target === candlePopup) closeCandlePopup(); });

  const galleryInner = galleryModal?.querySelector(".gallery-modal__inner");
  galleryInner?.addEventListener("click", (e) => e.stopPropagation());
  galleryModal?.addEventListener("click", (e) => { if (e.target === galleryModal) closeGalleryModal(); });

  blowBtn?.addEventListener("click", () => {
    if (cake.classList.contains("is-blown")) return;
    cake.classList.add("is-blown");
    blowBtn.disabled = true;
    blowBtn.querySelector(".btn-luxe__inner").textContent = "✨ Candles blown!";
    BD.confetti.burst(canvas, { x: canvas.clientWidth / 2, y: canvas.clientHeight / 2, count: 200 });
    setTimeout(openCandlePopup, 1200);
  });

  viewGalleryBtn?.addEventListener("click", (e) => { e.stopPropagation(); openGalleryModal(); });
  candlePopupClose?.addEventListener("click", closeCandlePopup);
  galleryModalClose?.addEventListener("click", closeGalleryModal);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!galleryModal.hidden) closeGalleryModal();
    else if (!candlePopup.hidden) closeCandlePopup();
  });

  restartBtn?.addEventListener("click", () => {
    closeGalleryModal();
    closeCandlePopup();
    BD.storage.reset();
    BD.nav.goTo("loading");
    setTimeout(() => location.reload(), 500);
  });
})();

/* ============ BOOTSTRAP ============ */
if (!sessionStorage.getItem("bd_session")) { BD.storage.reset(); sessionStorage.setItem("bd_session", "1"); }
BD.on("loading:done", () => { setTimeout(() => { const loading = BD.qs("#screen-loading"); loading.classList.remove("is-active"); loading.hidden = true; BD.nav.goTo("landing"); }, 400); });