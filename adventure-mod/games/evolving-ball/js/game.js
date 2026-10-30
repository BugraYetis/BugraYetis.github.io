/* =============================================
   EVOLVING BALL — Main Game Loop & State
   ============================================= */

const Game = (() => {

  /* ── Canvas ── */
  let canvas, ctx;

  /* ── State machine ──
     MENU | PLAYING | PAUSED | UPGRADE | GAMEOVER */
  let state = 'MENU';

  /* ── Run-scoped data ── */
  let score      = 0;
  let distance   = 0;
  let speed      = 3;
  let baseSpeed  = 3;
  let coinsRun   = 0;      // coins earned THIS run
  let survivalTime  = 0;   // seconds alive
  let runMaxLevel   = 1;   // highest level reached this run
  let coinMultRun   = 1;   // coin multiplier (con_2xcoins = 3)
  let xpMultRun     = 1;   // xp multiplier  (con_xp = 2)
  let autoReviveUsed = false; // one-time free revive

  /* ── XP / level ── */
  let xp       = 0;
  let xpToNext = 100;
  let level    = 1;

  /* ── Game objects ── */
  let ball      = null;
  let obstacles = [];
  let gems      = [];
  let particles = [];

  /* ── Input ── */
  const keys     = {};
  let lastTouchX = null;
  let mouseDown  = false;
  let lastMouseX = null;

  /* ── Timing ── */
  let lastTime      = 0;
  let obstacleTimer = 0;
  let gemTimer      = 0;
  let trackOffset   = 0;

  /* ── Static star field ── */
  const STARS = Array.from({ length: 60 }, () => ({
    x: Math.random() * CANVAS_W,
    y: Math.random() * CANVAS_H,
    r: Math.random() * 1.2 + 0.3,
    a: Math.random() * 0.6 + 0.25,
  }));

  /* ══════════════════════════════════════════
     INIT
     ══════════════════════════════════════════ */
  function init() {
    canvas = document.getElementById('gameCanvas');
    ctx    = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize);

    /* Keyboard */
    window.addEventListener('keydown', e => { keys[e.key] = true; });
    window.addEventListener('keyup',   e => { keys[e.key] = false; });

    /* Touch — relative drag */
    canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      lastTouchX = e.touches[0].clientX;
    }, { passive: false });

    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      if (state !== 'PLAYING' || lastTouchX === null) return;
      const dx     = e.touches[0].clientX - lastTouchX;
      const rect   = canvas.getBoundingClientRect();
      if (ball) ball.x = clamp(ball.x + dx * (CANVAS_W / rect.width), ball.radius, CANVAS_W - ball.radius);
      lastTouchX = e.touches[0].clientX;
    }, { passive: false });

    canvas.addEventListener('touchend',    () => { lastTouchX = null; });
    canvas.addEventListener('touchcancel', () => { lastTouchX = null; });

    /* Mouse drag */
    canvas.addEventListener('mousedown', e => { mouseDown = true; lastMouseX = e.clientX; });
    window.addEventListener('mousemove', e => {
      if (!mouseDown || state !== 'PLAYING') return;
      const dx   = e.clientX - lastMouseX;
      const rect = canvas.getBoundingClientRect();
      if (ball) ball.x = clamp(ball.x + dx * (CANVAS_W / rect.width), ball.radius, CANVAS_W - ball.radius);
      lastMouseX = e.clientX;
    });
    window.addEventListener('mouseup', () => { mouseDown = false; lastMouseX = null; });

    UI.init();
    UI.showMenu();
    requestAnimationFrame(loop);
  }

  function resize() {
    const scale = Math.min(
      Math.min(window.innerWidth, 500) / CANVAS_W,
      window.innerHeight / CANVAS_H
    );
    canvas.width  = CANVAS_W;
    canvas.height = CANVAS_H;
    canvas.style.width  = Math.floor(CANVAS_W * scale) + 'px';
    canvas.style.height = Math.floor(CANVAS_H * scale) + 'px';
  }

  /* ══════════════════════════════════════════
     START / RESTART
     ══════════════════════════════════════════ */
  function start() {
    state          = 'PLAYING';
    score          = 0;
    distance       = 0;
    baseSpeed      = 3;
    speed          = 3;
    coinsRun       = 0;
    survivalTime   = 0;
    runMaxLevel    = 1;
    coinMultRun    = 1;
    xpMultRun      = 1;
    autoReviveUsed = false;
    xp             = 0;
    xpToNext       = 200;   // ~42 sn'de ilk level-up
    level          = 1;
    obstacles      = [];
    gems           = [];
    particles      = [];
    obstacleTimer  = 0;
    gemTimer       = 0;
    trackOffset    = 0;

    /* Create ball and apply active skin */
    ball = new Ball(CANVAS_W / 2, CANVAS_H - 110);
    _applySkinToBall();

    /* ── Permanent shop bonuses ── */
    if (hasShopItem('start_shield'))  ball.shield = 1;
    if (hasShopItem('start_magnet')) { ball.hasMagnet = true; ball.magnetTimer = 600; }
    if (hasShopItem('head_start'))    distance = 100;  // 100m head start
    if (hasShopItem('score_boost'))   coinMultRun = Math.max(coinMultRun, 1.3); // score x1.3
    if (hasShopItem('xp_boost'))      xpMultRun   = Math.max(xpMultRun,  1.5); // xp x1.5

    /* ── Consumables (one-run, popped from queue) ── */
    const pending = popConsumables();
    pending.forEach(id => {
      if (id === 'con_shield')  { ball.shield = Math.min((ball.shield || 0) + 2, 3); }
      if (id === 'con_ghost')   { ball.ghostMode = true; ball.ghostTimer = 360; }
      if (id === 'con_magnet')  { ball.hasMagnet = true; ball.magnetTimer = 900; }
      if (id === 'con_2xcoins') { coinMultRun = 3; }
      if (id === 'con_xp')      { xpMultRun  = 2; }
      if (id === 'con_tiny')    { ball.radius = Math.max(10, ball.baseRadius * 0.55); }
    });

    UI.hideAllScreens();
    UI.showHUD();
  }

  function _applySkinToBall() {
    const skin   = getActiveSkin();
    ball.color   = skin.color;
    ball.skinGfx = skin; // full skin object for gradient
  }

  /* ══════════════════════════════════════════
     PAUSE / RESUME
     ══════════════════════════════════════════ */
  function pause() {
    if (state !== 'PLAYING') return;
    state = 'PAUSED';
    Audio.play('upgrade');
    UI.showPause(score);
  }

  function resume() {
    if (state !== 'PAUSED') return;
    state = 'PLAYING';
    UI.hideAllScreens();
    lastTime = performance.now(); // reset dt so no jump
  }

  function toMenu() {
    state = 'MENU';
    ball  = null;
    obstacles = []; gems = []; particles = [];
    UI.showMenu();
    el_hud().classList.add('hidden');
    document.getElementById('status-bar').classList.add('hidden');
  }

  function el_hud() { return document.getElementById('hud'); }

  /* ══════════════════════════════════════════
     DEATH
     ══════════════════════════════════════════ */
  function gameOver() {
    /* Auto-revive: one free life per run from shop */
    if (hasShopItem('auto_revive') && !autoReviveUsed) {
      autoReviveUsed = true;
      ball.shield    = 2;
      ball.bump();
      Audio.play('shield');
      _spawnParticles(ball.x, ball.y, '#ffaa00', 16);
      const rect = canvas.getBoundingClientRect();
      UI.floatText(
        ball.x * (rect.width  / CANVAS_W),
        ball.y * (rect.height / CANVAS_H),
        '💊 Auto Revive!', '#ffaa00'
      );
      state = 'PLAYING';
      return;
    }

    state = 'GAMEOVER';
    Audio.play('death');
    _spawnParticles(ball.x, ball.y, '#ff4444', 24);
    _spawnParticles(ball.x, ball.y, '#ffaa00', 14);

    saveBestScore(score);
    addTotalDist(distance);
    addCoins(coinsRun);

    /* Persist run stats & progress */
    const stats = updateStats({
      coinsEarned:  coinsRun,
      survivalTime: survivalTime,
      maxLevel:     runMaxLevel,
      distance:     score,
      currentStreak: getCurrentStreak(),
    });
    updateMissionProgress('distance',  score);
    updateMissionProgress('coins_run', coinsRun);
    updateMissionProgress('time',      survivalTime);
    updateMissionProgress('level',     runMaxLevel);
    updateCumulativeMission('runs_today', 1);

    const newAch = checkAchievements(stats);
    newAch.forEach((ach, i) => setTimeout(() => UI.showAchToast(ach), i * 1300 + 900));

    UI.showGameOver(score, coinsRun, survivalTime);
    if (navigator.vibrate) navigator.vibrate([40, 20, 40]);
  }

  /* ══════════════════════════════════════════
     CONTINUE AFTER REWARDED AD
     ══════════════════════════════════════════ */
  function continueAfterAd() {
    state       = 'PLAYING';
    ball        = new Ball(CANVAS_W / 2, CANVAS_H - 110);
    _applySkinToBall();
    ball.shield = 2;           // revive protection
    obstacles   = [];
    gems        = [];
    UI.hideAllScreens();
    lastTime = performance.now();
  }

  /* ══════════════════════════════════════════
     LEVEL UP
     ══════════════════════════════════════════ */
  function _levelUp() {
    level++;
    xp       = 0;
    xpToNext = 200 + level * 60;  // her level biraz daha uzun sürer
    state    = 'UPGRADE';
    Audio.play('levelup');
    UI.flash();

    /* Burst at ball position (mapped to canvas coords) */
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width  / CANVAS_W;
    const scaleY = rect.height / CANVAS_H;
    UI.spawnBurst(ball.x * scaleX, ball.y * scaleY, 22);

    setTimeout(() => {
      if (state === 'UPGRADE') UI.showUpgrade(level, ball);
    }, 220);
  }

  function applyUpgrade(upg) {
    const proxy = {
      get baseSpeed()  { return baseSpeed; },
      set baseSpeed(v) { baseSpeed = v; },
    };
    upg.apply(ball, proxy);
    state = 'PLAYING';
    UI.hideAllScreens();
    lastTime = performance.now();
  }

  /* ══════════════════════════════════════════
     MAIN LOOP
     ══════════════════════════════════════════ */
  function loop(timestamp) {
    const dt = Math.min((timestamp - (lastTime || timestamp)) / 16.667, 3.0);
    lastTime = timestamp;

    if (state === 'PLAYING') _update(dt);
    _draw();

    requestAnimationFrame(loop);
  }

  /* ══════════════════════════════════════════
     UPDATE
     ══════════════════════════════════════════ */
  function _update(dt) {
    /* Keyboard movement */
    const kv = 5.5;
    if (keys['ArrowLeft']  || keys['a'] || keys['A'])
      ball.x = clamp(ball.x - kv * dt, ball.radius, CANVAS_W - ball.radius);
    if (keys['ArrowRight'] || keys['d'] || keys['D'])
      ball.x = clamp(ball.x + kv * dt, ball.radius, CANVAS_W - ball.radius);

    /* Score & XP */
    distance     += speed * dt * 0.42;
    score         = Math.floor(distance);
    survivalTime += dt / 60;             // seconds alive
    if (level > runMaxLevel) runMaxLevel = level;
    xp           += dt * 0.08 * xpMultRun;  // ~4.8 XP/sn base → level-up ~42 sn

    if (xp >= xpToNext) { _levelUp(); return; }

    /* Speed ramp */
    speed = baseSpeed + level * 0.25 + distance * 0.0008;

    /* Spawn obstacles */
    obstacleTimer -= dt;
    if (obstacleTimer <= 0) {
      _spawnObstacle();
      obstacleTimer = Math.max(45, 150 - level * 6) / speed;  // başta 0.8 sn arayla
    }

    /* Spawn gems */
    gemTimer -= dt;
    if (gemTimer <= 0) {
      gems.push(new Gem(30 + Math.random() * (CANVAS_W - 60), -20));
      gemTimer = (35 + Math.random() * 20) / speed;
    }

    /* Obstacles */
    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obs = obstacles[i];
      obs.update(dt, speed);
      if (obs.y > CANVAS_H + 60) { obstacles.splice(i, 1); continue; }

      if (!ball.ghostMode && obs.collides(ball)) {
        /* Lucky charm: 15% chance to phase through */
        if (hasShopItem('lucky_charm') && Math.random() < 0.15) {
          _spawnParticles(ball.x, ball.y, '#88ff88', 6);
          obstacles.splice(i, 1); continue;
        }
        if (ball.shield > 0) {
          ball.shield--;
          ball.bump();
          Audio.play('shield');
          _spawnParticles(ball.x, ball.y, '#4488ff', 10);
          UI.shake();       // screen shake on shield absorb
          obstacles.splice(i, 1);
        } else if (ball.orbitBall && _orbitCollides(obs)) {
          const ox = ball.orbitBall.x, oy = ball.orbitBall.y;
          ball.orbitBall = null;
          Audio.play('shield');
          _spawnParticles(ox, oy, '#ff8800', 12);
          UI.shake();
          obstacles.splice(i, 1);
        } else {
          gameOver(); return;
        }
      }
    }

    /* Gems */
    const baseGem = hasShopItem('double_coins') ? 2 : 1;
    for (let i = gems.length - 1; i >= 0; i--) {
      const g = gems[i];
      g.update(dt, speed, ball);
      if (g.y > CANVAS_H + 40) { gems.splice(i, 1); continue; }
      if (g.collected) {
        const earned = Math.round(baseGem * coinMultRun);
        coinsRun    += earned;
        xp          += 12;
        Audio.play('collect');
        _spawnParticles(g.x, g.y, '#ffd700', 6);

        /* Floating coin text on canvas, converted to container coords */
        const rect   = canvas.getBoundingClientRect();
        const scaleX = rect.width  / CANVAS_W;
        const scaleY = rect.height / CANVAS_H;
        UI.floatText(g.x * scaleX, g.y * scaleY, '+' + earned + ' 💰', '#ffd700');

        gems.splice(i, 1);
      }
    }

    /* Particles */
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(dt);
      if (particles[i].life <= 0) particles.splice(i, 1);
    }

    /* Ball */
    ball.update(dt);

    /* HUD */
    UI.updateHUD(score, level, xp / xpToNext, coinsRun, ball);
  }

  function _orbitCollides(obs) {
    if (!ball.orbitBall) return false;
    return obs.collides({ x: ball.orbitBall.x, y: ball.orbitBall.y, radius: ball.radius * 0.6 });
  }

  /* ══════════════════════════════════════════
     SPAWN HELPERS
     ══════════════════════════════════════════ */
  function _spawnObstacle() {
    const r = Math.random();
    obstacles.push(
      r < 0.38 ? new WallObstacle(level) :
      r < 0.72 ? new MovingBarrier(level) :
                 new HoleObstacle(level)
    );
  }

  function _spawnParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) particles.push(new Particle(x, y, color));
  }

  /* ══════════════════════════════════════════
     DRAW
     ══════════════════════════════════════════ */
  function _draw() {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    _drawBackground();

    if (state !== 'MENU') {
      gems.forEach(g => g.draw(ctx));
      obstacles.forEach(o => o.draw(ctx));
      particles.forEach(p => p.draw(ctx));
      if (ball && state !== 'GAMEOVER') ball.draw(ctx);
    }
  }

  function _drawBackground() {
    /* Sky */
    const bg = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    bg.addColorStop(0, '#0d0d1f');
    bg.addColorStop(1, '#060612');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    /* Scrolling grid */
    if (state === 'PLAYING') trackOffset = (trackOffset + speed * 0.65) % 80;
    ctx.strokeStyle = 'rgba(255,255,255,0.032)';
    ctx.lineWidth   = 1;
    for (let y = (trackOffset % 80) - 80; y < CANVAS_H; y += 80) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke();
    }
    for (let x = 0; x < CANVAS_W; x += 80) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_H); ctx.stroke();
    }

    /* Stars */
    STARS.forEach(s => {
      if (state === 'PLAYING') s.y = (s.y + speed * 0.09) % CANVAS_H;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.a * 0.5})`;
      ctx.fill();
    });

    /* Vignette */
    const vig = ctx.createRadialGradient(
      CANVAS_W / 2, CANVAS_H / 2, CANVAS_H * 0.28,
      CANVAS_W / 2, CANVAS_H / 2, CANVAS_H * 0.72
    );
    vig.addColorStop(0, 'transparent');
    vig.addColorStop(1, 'rgba(0,0,0,0.48)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  }

  /* ══════════════════════════════════════════
     PUBLIC API
     ══════════════════════════════════════════ */
  return {
    init,
    start,
    pause,
    resume,
    toMenu,
    gameOver,
    applyUpgrade,
    continueAfterAd,
  };

})();

window.addEventListener('load', () => Game.init());
