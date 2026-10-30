// PC ekranındaki mini oyunlar: Yılan, 2048 ve Tuğla Kırma
(() => {
  const $ = s => document.querySelector(s);
  const box = $('#arcade');
  const win = $('#arcadeWin');
  const stage = $('#arcadeStage');
  const canvas = $('#arcadeCanvas');
  const ctx = canvas.getContext('2d');
  const titleEl = $('#arcadeTitle');
  const scoreEl = $('#arcadeScore');
  const hintEl = $('#arcadeHint');
  const tabs = [...box.querySelectorAll('[data-game]')];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sfx = name => window.BYTE?.sfx?.[name]?.();
  const rand = n => Math.floor(Math.random() * n);

  const C = {
    bg: '#0e1424', grid: 'rgba(255,255,255,.035)', cream: '#f5ecdc', muted: '#9b8fb0',
    amber: '#ffcf6b', coral: '#ff6b5b', mint: '#7ee081', sky: '#5ec8ff', purple: '#b18cff', pink: '#ff8fd1'
  };
  const FONT = '"Pixelify Sans", monospace';

  const best = {
    get(id)    { try { return +localStorage.getItem('arcadeBest_' + id) || 0; } catch (e) { return 0; } },
    save(g)    { try { if (g.score > best.get(g.id)) localStorage.setItem('arcadeBest_' + g.id, g.score); } catch (e) {} }
  };

  function rr(c, x, y, w, h, r) {
    c.beginPath();
    if (c.roundRect) c.roundRect(x, y, w, h, r); else c.rect(x, y, w, h);
  }

  // oyunun üstüne yarı saydam bir mesaj kutusu
  function banner(c, g, title, sub) {
    c.fillStyle = 'rgba(14,20,36,.78)';
    c.fillRect(0, 0, g.W, g.H);
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillStyle = C.amber;
    c.font = `700 ${Math.round(g.W / 14)}px ${FONT}`;
    c.fillText(title, g.W / 2, g.H / 2 - 14);
    c.fillStyle = C.cream;
    c.font = `500 ${Math.round(g.W / 30)}px ${FONT}`;
    c.fillText(sub, g.W / 2, g.H / 2 + 20);
  }

  const DIRS = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };

  /* ================= YILAN ================= */
  function Snake() {
    const COLS = 24, ROWS = 16, S = 20;
    let body, dir, queue, food, acc, speed, state;
    const g = { id: 'snake', title: 'YILAN', W: COLS * S, H: ROWS * S, score: 0,
      hint: 'Yön tuşları / WASD ya da ekranı kaydır · yemi ye, duvara ve kendine çarpma' };

    function placeFood() {
      do { food = { x: rand(COLS), y: rand(ROWS) }; }
      while (body.some(p => p.x === food.x && p.y === food.y));
    }

    g.reset = () => {
      body = [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }];
      dir = DIRS.right; queue = []; acc = 0; speed = .13; g.score = 0; state = 'ready';
      placeFood();
    };

    g.dir = d => {
      if (state === 'over') return;
      const v = DIRS[d];
      const lastDir = queue.length ? queue[queue.length - 1] : dir;
      if (v === lastDir || (v.x === -lastDir.x && v.y === -lastDir.y)) { if (state === 'ready') state = 'play'; return; }
      if (queue.length < 3) queue.push(v);
      state = 'play';
    };

    g.action = () => { if (state === 'over') g.reset(); else state = 'play'; };

    function tick() {
      if (queue.length) dir = queue.shift();
      const h = { x: body[0].x + dir.x, y: body[0].y + dir.y };
      const hitSelf = body.some((p, i) => i < body.length - 1 && p.x === h.x && p.y === h.y);
      if (h.x < 0 || h.y < 0 || h.x >= COLS || h.y >= ROWS || hitSelf) {
        state = 'over';
        best.save(g);
        sfx('lose');
        return;
      }
      body.unshift(h);
      if (h.x === food.x && h.y === food.y) {
        g.score += 10;
        speed = Math.max(.06, speed - .004);
        sfx('blip');
        placeFood();
      } else body.pop();
    }

    g.update = dt => {
      if (state !== 'play') return;
      acc += dt;
      while (acc >= speed && state === 'play') { acc -= speed; tick(); }
    };

    g.draw = c => {
      c.fillStyle = C.bg;
      c.fillRect(0, 0, g.W, g.H);
      c.fillStyle = C.grid;
      for (let y = 0; y < ROWS; y++) for (let x = (y % 2); x < COLS; x += 2) c.fillRect(x * S, y * S, S, S);

      c.fillStyle = C.coral;
      rr(c, food.x * S + 3, food.y * S + 3, S - 6, S - 6, 4); c.fill();
      c.fillStyle = 'rgba(255,255,255,.5)';
      c.fillRect(food.x * S + 6, food.y * S + 6, 3, 3);

      body.forEach((p, i) => {
        c.fillStyle = i === 0 ? '#b6f5b8' : C.mint;
        rr(c, p.x * S + 1, p.y * S + 1, S - 2, S - 2, i === 0 ? 6 : 4); c.fill();
      });
      // gözler
      const h = body[0];
      c.fillStyle = C.bg;
      const ex = dir.y ? [6, 12] : [dir.x > 0 ? 12 : 6, dir.x > 0 ? 12 : 6];
      const ey = dir.x ? [6, 12] : [dir.y > 0 ? 12 : 6, dir.y > 0 ? 12 : 6];
      c.fillRect(h.x * S + ex[0], h.y * S + ey[0], 3, 3);
      c.fillRect(h.x * S + ex[1], h.y * S + ey[1], 3, 3);

      if (state === 'ready') banner(c, g, 'YILAN', 'Başlamak için bir yön tuşuna bas');
      if (state === 'over')  banner(c, g, 'OYUN BİTTİ', `Skor ${g.score} · Tekrar için Boşluk / dokun`);
    };
    return g;
  }

  /* ================= 2048 ================= */
  function Merge() {
    const N = 4, S = 400, GAP = 12, T = (S - GAP * (N + 1)) / N;
    const COLORS = {
      2: ['#3a3150', C.cream], 4: ['#4a3a5a', C.cream], 8: ['#ff8a5b', '#2a120a'], 16: [C.coral, '#2a0d0a'],
      32: [C.pink, '#3a1030'], 64: [C.purple, '#1c1035'], 128: [C.sky, '#0a2433'], 256: [C.mint, '#0c2a12'],
      512: ['#f2c14e', '#2a1f05'], 1024: ['#ffb547', '#2a1a05'], 2048: [C.amber, '#2a1a05']
    };
    let grid, pops, state, won;
    const g = { id: '2048', title: '2048', W: S, H: S, score: 0,
      hint: 'Yön tuşları ya da kaydır · aynı sayıları birleştirip 2048\'e ulaş' };

    function add() {
      const empty = grid.map((v, i) => v ? -1 : i).filter(i => i >= 0);
      if (!empty.length) return;
      const i = empty[rand(empty.length)];
      grid[i] = Math.random() < .9 ? 2 : 4;
      pops[i] = 0;
    }

    function canMove() {
      for (let i = 0; i < 16; i++) {
        if (!grid[i]) return true;
        if (i % 4 < 3 && grid[i] === grid[i + 1]) return true;
        if (i < 12 && grid[i] === grid[i + 4]) return true;
      }
      return false;
    }

    g.reset = () => {
      grid = Array(16).fill(0); pops = {}; g.score = 0; state = 'play'; won = false;
      add(); add();
    };

    g.dir = d => {
      if (state === 'over') return;
      if (state === 'won') state = 'play';
      let moved = false;
      for (let k = 0; k < 4; k++) {
        let idx = [0, 1, 2, 3].map(j =>
          d === 'left' || d === 'right' ? k * 4 + j : j * 4 + k);
        if (d === 'right' || d === 'down') idx = idx.reverse();
        const vals = idx.map(i => grid[i]).filter(Boolean);
        const out = [];
        for (let j = 0; j < vals.length; j++) {
          if (vals[j] === vals[j + 1]) {
            out.push(vals[j] * 2);
            g.score += vals[j] * 2;
            pops[idx[out.length - 1]] = 0;
            if (vals[j] * 2 === 2048 && !won) { won = true; state = 'won'; sfx('win'); }
            j++;
          } else out.push(vals[j]);
        }
        idx.forEach((i, j) => {
          const v = out[j] || 0;
          if (grid[i] !== v) moved = true;
          grid[i] = v;
        });
      }
      if (!moved) return;
      sfx('blip');
      add();
      if (!canMove()) { state = 'over'; best.save(g); sfx('lose'); }
    };

    g.action = () => { if (state === 'over') g.reset(); else if (state === 'won') state = 'play'; };

    g.update = dt => { for (const i in pops) { pops[i] += dt; if (pops[i] > .2) delete pops[i]; } };

    g.draw = c => {
      c.fillStyle = '#1b2340';
      c.fillRect(0, 0, S, S);
      for (let i = 0; i < 16; i++) {
        const x = GAP + (i % 4) * (T + GAP), y = GAP + Math.floor(i / 4) * (T + GAP);
        c.fillStyle = 'rgba(255,255,255,.06)';
        rr(c, x, y, T, T, 8); c.fill();
        const v = grid[i];
        if (!v) continue;
        const [bg, fg] = COLORS[v] || ['#ffffff', '#14101c'];
        const s = i in pops ? .6 + .4 * Math.min(1, pops[i] / .2) : 1;
        const o = (T - T * s) / 2;
        c.fillStyle = bg;
        rr(c, x + o, y + o, T * s, T * s, 8); c.fill();
        c.fillStyle = fg;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        const digits = String(v).length;
        c.font = `700 ${Math.round((digits < 3 ? 40 : digits < 4 ? 32 : 26) * s)}px ${FONT}`;
        c.fillText(v, x + T / 2, y + T / 2 + 2);
      }
      if (state === 'won')  banner(c, g, '2048!', 'Harika! Devam etmek için bir yöne kaydır');
      if (state === 'over') banner(c, g, 'HAMLE KALMADI', `Skor ${g.score} · Tekrar için Boşluk / dokun`);
    };
    return g;
  }

  /* ================= TUĞLA KIRMA ================= */
  function Bricks() {
    const W = 480, H = 320, COLS = 8, ROWS = 5, BW = 52, BH = 14, GAP = 4, TOP = 44;
    const LEFT = (W - (COLS * BW + (COLS - 1) * GAP)) / 2;
    const ROW_COLORS = [C.coral, '#ff8a5b', C.amber, C.mint, C.sky];
    const paddle = { x: W / 2, w: 74, y: H - 22, h: 8 };
    const ball = { x: 0, y: 0, vx: 0, vy: 0, r: 5, stuck: true };
    let bricks, lives, level, state;
    const g = { id: 'bricks', title: 'TUĞLA KIRMA', W, H, score: 0, held: {},
      hint: 'Fare / parmak ya da ◀ ▶ ile raketi oynat · Boşluk ya da tıkla: topu at' };

    function build() {
      bricks = [];
      for (let r = 0; r < ROWS; r++) for (let k = 0; k < COLS; k++)
        bricks.push({ x: LEFT + k * (BW + GAP), y: TOP + r * (BH + GAP), alive: true, color: ROW_COLORS[r], pts: (ROWS - r) * 10 });
    }

    g.reset = () => { lives = 3; level = 1; g.score = 0; state = 'ready'; build(); ball.stuck = true; paddle.x = W / 2; };

    function launch() {
      if (!ball.stuck) return;
      const speed = 250 + level * 35;
      const a = (-90 + (Math.random() * 50 - 25)) * Math.PI / 180;
      ball.vx = Math.cos(a) * speed;
      ball.vy = Math.sin(a) * speed;
      ball.stuck = false;
      state = 'play';
    }

    g.action = () => { if (state === 'over') g.reset(); else launch(); };
    g.dir = d => { if (d === 'up') g.action(); };
    g.pointer = x => { if (state !== 'over') paddle.x = x; };

    g.update = dt => {
      if (state === 'over') return;
      const dx = (g.held.right ? 1 : 0) - (g.held.left ? 1 : 0);
      paddle.x += dx * 460 * dt;
      paddle.x = Math.max(paddle.w / 2, Math.min(W - paddle.w / 2, paddle.x));

      if (ball.stuck) {
        ball.x = paddle.x;
        ball.y = paddle.y - ball.r - 1;
        return;
      }

      const steps = Math.ceil(Math.hypot(ball.vx, ball.vy) * dt / 3);
      const h = dt / steps;
      for (let s = 0; s < steps; s++) {
        ball.x += ball.vx * h;
        ball.y += ball.vy * h;
        if (ball.x < ball.r)     { ball.x = ball.r;     ball.vx = Math.abs(ball.vx); }
        if (ball.x > W - ball.r) { ball.x = W - ball.r; ball.vx = -Math.abs(ball.vx); }
        if (ball.y < ball.r)     { ball.y = ball.r;     ball.vy = Math.abs(ball.vy); }

        // raket: çarpma noktasına göre açı
        if (ball.vy > 0 && ball.y + ball.r >= paddle.y && ball.y + ball.r <= paddle.y + paddle.h + 6 &&
            Math.abs(ball.x - paddle.x) <= paddle.w / 2 + ball.r) {
          const speed = Math.hypot(ball.vx, ball.vy);
          const t = (ball.x - paddle.x) / (paddle.w / 2);
          const a = (-90 + t * 60) * Math.PI / 180;
          ball.vx = Math.cos(a) * speed;
          ball.vy = Math.sin(a) * speed;
          ball.y = paddle.y - ball.r;
          sfx('blip');
        }

        for (const b of bricks) {
          if (!b.alive) continue;
          if (ball.x + ball.r < b.x || ball.x - ball.r > b.x + BW || ball.y + ball.r < b.y || ball.y - ball.r > b.y + BH) continue;
          b.alive = false;
          g.score += b.pts;
          const ox = Math.min(ball.x + ball.r - b.x, b.x + BW - (ball.x - ball.r));
          const oy = Math.min(ball.y + ball.r - b.y, b.y + BH - (ball.y - ball.r));
          if (ox < oy) ball.vx = -ball.vx; else ball.vy = -ball.vy;
          sfx('blip');
          break;
        }

        if (ball.y - ball.r > H) {
          lives--;
          ball.stuck = true;
          if (lives <= 0) { state = 'over'; best.save(g); sfx('lose'); }
          else sfx('eject');
          return;
        }
      }

      if (bricks.every(b => !b.alive)) {
        level++;
        build();
        ball.stuck = true;
        state = 'ready';
        sfx('win');
      }
    };

    g.draw = c => {
      c.fillStyle = C.bg;
      c.fillRect(0, 0, W, H);
      bricks.forEach(b => {
        if (!b.alive) return;
        c.fillStyle = b.color;
        rr(c, b.x, b.y, BW, BH, 3); c.fill();
        c.fillStyle = 'rgba(255,255,255,.25)';
        c.fillRect(b.x + 3, b.y + 2, BW - 6, 2);
      });
      c.fillStyle = C.sky;
      rr(c, paddle.x - paddle.w / 2, paddle.y, paddle.w, paddle.h, 4); c.fill();
      c.fillStyle = C.cream;
      c.beginPath(); c.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2); c.fill();

      c.textBaseline = 'top';
      c.font = `500 14px ${FONT}`;
      c.textAlign = 'left';
      c.fillStyle = C.coral;
      c.fillText('♥'.repeat(Math.max(0, lives)), 10, 12);
      c.textAlign = 'right';
      c.fillStyle = C.muted;
      c.fillText(`SEVİYE ${level}`, W - 10, 12);

      if (state === 'ready' && ball.stuck) {
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillStyle = C.cream;
        c.font = `500 15px ${FONT}`;
        c.fillText(level > 1 ? `Seviye ${level}! Topu atmak için tıkla` : 'Topu atmak için Boşluk ya da tıkla', W / 2, H / 2 + 40);
      }
      if (state === 'over') banner(c, g, 'OYUN BİTTİ', `Skor ${g.score} · Tekrar için Boşluk / dokun`);
    };
    return g;
  }

  /* ================= PENCERE ================= */
  const GAMES = { snake: Snake(), 2048: Merge(), bricks: Bricks() };
  let cur = null, isOpen = false, raf = 0, last = 0, scale = 1, source = null;

  function fit() {
    if (!cur) return;
    const cs = getComputedStyle(stage);
    const aw = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const ah = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const s = Math.max(.1, Math.min(aw / cur.W, ah / cur.H));
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = cur.W * s + 'px';
    canvas.style.height = cur.H * s + 'px';
    canvas.width = Math.round(cur.W * s * dpr);
    canvas.height = Math.round(cur.H * s * dpr);
    scale = s * dpr;
  }

  function hud() {
    scoreEl.textContent = `SKOR ${cur.score} · EN İYİ ${Math.max(best.get(cur.id), cur.score)}`;
  }

  function frame(t) {
    const dt = Math.min(.05, (t - last) / 1000);
    last = t;
    cur.update(dt);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    cur.draw(ctx);
    hud();
    raf = requestAnimationFrame(frame);
  }

  function choose(id) {
    if (cur) best.save(cur);
    cur = GAMES[id];
    cur.reset();
    if (cur.held) cur.held = {};
    titleEl.textContent = cur.title;
    hintEl.textContent = cur.hint;
    tabs.forEach(b => b.setAttribute('aria-pressed', b.dataset.game === id));
    fit();
  }

  // kaynak öğenin (PC ekranındaki oyun kutusu) bulunduğu yerden pencerenin boyutuna
  function flip(from, reverse) {
    const r1 = win.getBoundingClientRect();
    const start = `translate(${from.left - r1.left}px, ${from.top - r1.top}px) scale(${from.width / r1.width}, ${from.height / r1.height})`;
    const frames = [{ transform: start, opacity: .3 }, { transform: 'none', opacity: 1 }];
    return win.animate(reverse ? frames.reverse() : frames, {
      duration: reduceMotion ? 1 : reverse ? 340 : 480,
      easing: reverse ? 'cubic-bezier(.6,0,.8,.3)' : 'cubic-bezier(.2,.8,.2,1)',
      fill: 'forwards'
    });
  }

  function open(id, fromEl) {
    if (isOpen) return choose(id);
    isOpen = true;
    source = fromEl;
    box.hidden = false;
    box.classList.remove('is-closing');
    document.body.classList.add('arcade-open');
    choose(id);
    flip(fromEl.getBoundingClientRect(), false);
    sfx('boot');
    last = performance.now();
    raf = requestAnimationFrame(frame);
    win.focus({ preventScroll: true });
  }

  async function close() {
    if (!isOpen) return;
    isOpen = false;
    best.save(cur);
    box.classList.add('is-closing');
    sfx('eject');
    await flip(source.getBoundingClientRect(), true).finished;
    cancelAnimationFrame(raf);
    win.getAnimations().forEach(a => a.cancel());
    box.hidden = true;
    document.body.classList.remove('arcade-open');
    source.focus?.({ preventScroll: true });
  }

  /* ---- PC ekranındaki oyunlar ve mobil buton ---- */
  document.querySelectorAll('.pc-game').forEach(el => {
    el.addEventListener('click', () => open(el.dataset.game, el));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el.dataset.game, el); }
    });
  });
  const arcadeBtn = $('#arcadeBtn');
  arcadeBtn.addEventListener('click', () => open('snake', arcadeBtn));

  box.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) return close();
    const tab = e.target.closest('[data-game]');
    if (e.target.closest('[data-restart]')) { best.save(cur); cur.reset(); }
    else if (tab) choose(tab.dataset.game);
    else return;
    // odak butonda kalırsa Boşluk/Enter oyuna değil butona gider
    win.focus({ preventScroll: true });
  });

  /* ---- klavye ---- */
  const KEYS = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right' };

  document.addEventListener('keydown', e => {
    if (!isOpen || e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === 'Escape') { e.preventDefault(); return close(); }
    if (e.target.closest('button') && (k === 'Enter' || k === ' ')) return;
    if (k === ' ' || k === 'Enter') { e.preventDefault(); return cur.action(); }
    if (k === 'r') return cur.reset();
    const d = KEYS[k];
    if (!d) return;
    e.preventDefault();
    if (cur.held) cur.held[d] = true;
    cur.dir?.(d);
  });

  document.addEventListener('keyup', e => {
    if (!isOpen || !cur.held) return;
    const d = KEYS[e.key.length === 1 ? e.key.toLowerCase() : e.key];
    if (d) cur.held[d] = false;
  });

  /* ---- fare / dokunma: kaydırma, dokunma, raket ---- */
  let touch = null;
  const gameX = e => {
    const r = canvas.getBoundingClientRect();
    return (e.clientX - r.left) / r.width * cur.W;
  };

  canvas.addEventListener('pointerdown', e => {
    touch = { x: e.clientX, y: e.clientY, id: e.pointerId };
    canvas.setPointerCapture(e.pointerId);
    cur.pointer?.(gameX(e));
  });
  canvas.addEventListener('pointermove', e => { cur.pointer?.(gameX(e)); });
  canvas.addEventListener('pointerup', e => {
    if (!touch || touch.id !== e.pointerId) return;
    const dx = e.clientX - touch.x, dy = e.clientY - touch.y;
    touch = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24 || cur.pointer) return cur.action();
    cur.dir?.(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  });

  addEventListener('resize', () => { if (isOpen) fit(); });
})();
