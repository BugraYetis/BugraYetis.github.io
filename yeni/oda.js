// Oda etkileşimleri: Türkiye saatini gösteren dijital saat ve sürüklenebilir eşyalar
(() => {
  const svg = document.querySelector('.room');
  const byteEl = document.getElementById('byte');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================= DİJİTAL SAAT ================= */
  const TZ = 'Europe/Istanbul';
  const fTime = new Intl.DateTimeFormat('tr-TR', { timeZone: TZ, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const fDate = new Intl.DateTimeFormat('tr-TR', { timeZone: TZ, day: 'numeric', month: 'long', year: 'numeric' });
  const fDay  = new Intl.DateTimeFormat('tr-TR', { timeZone: TZ, weekday: 'long' });
  const fMini = new Intl.DateTimeFormat('tr-TR', { timeZone: TZ, hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
  const upper = s => s.toLocaleUpperCase('tr-TR');
  const clk = ['clkTime', 'clkDate', 'clkDay', 'miniClock'].map(id => document.getElementById(id));

  function tickClock() {
    const now = new Date();
    clk[0].textContent = fTime.format(now);
    clk[1].textContent = upper(fDate.format(now));
    clk[2].textContent = upper(fDay.format(now)) + ' · TÜRKİYE';
    clk[3].textContent = fMini.format(now);
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ================= EŞYALAR ================= */
  // eşyaların konabileceği yüzeyler (oda SVG koordinatları)
  const SURFACES = [
    { x1: 1110, x2: 1490, y: 290 },   // üst raf
    { x1: 1110, x2: 1490, y: 440 },   // alt raf
    { x1: 40,   x2: 500,  y: 676 }    // masa
  ];
  const FLOOR_MIN = 790, FLOOR_MAX = 985;
  const GRAVITY = 2600;

  const toSvg = (x, y) => new DOMPoint(x, y).matrixTransform(svg.getScreenCTM().inverse());

  const props = [...svg.querySelectorAll('.prop')].map(el => {
    // bbox'u oda koordinatlarına çevir (raftakiler kaydırılmış bir grubun içinde)
    const m = svg.getScreenCTM().inverse().multiply(el.parentNode.getScreenCTM());
    const bb = el.getBBox();
    return {
      el, name: el.dataset.name,
      b: { x: bb.x + m.e, y: bb.y + m.f, w: bb.width, h: bb.height, cx: bb.x + bb.width / 2, cy: bb.y + bb.height / 2 },
      x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0,
      state: 'rest', floorY: FLOOR_MIN, hitDone: false
    };
  });

  const bottom = p => p.b.y + p.b.h + p.y;
  const centerX = p => p.b.x + p.b.w / 2 + p.x;

  function render(p) {
    p.el.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.r.toFixed(1)} ${p.b.cx} ${p.b.cy})`);
  }

  // BYTE'ın gövdesine denk gelen ekran alanı
  function overlapsByte(p) {
    const a = p.el.getBoundingClientRect();
    const r = byteEl.getBoundingClientRect();
    const l = r.left + r.width * .17, rt = r.right - r.width * .17;
    const t = r.top + r.height * .1, b = r.top + r.height * .88;
    return a.right > l && a.left < rt && a.bottom > t && a.top < b;
  }

  /* ---- fizik döngüsü ---- */
  let raf = 0, last = 0;

  function wake() {
    if (raf) return;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  }

  function land(p, y) {
    p.y = y - (p.b.y + p.b.h);
    if (p.vy > 380) {           // sekme
      p.vy = -p.vy * .3;
      p.vx *= .5;
      p.vr *= .4;
    } else {
      p.vy = p.vx = p.vr = 0;
      p.state = 'settle';
    }
  }

  function step(p, dt) {
    if (p.state === 'fall') {
      const prevBottom = bottom(p);
      p.vy += GRAVITY * dt;
      p.vx *= 1 - Math.min(1, 1.4 * dt);
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.r += p.vr * dt;

      // duvarlar
      const left = p.b.x + p.x, right = left + p.b.w;
      if (left < 0)       { p.x = -p.b.x;              p.vx = Math.abs(p.vx) * .5; }
      if (right > 1600)   { p.x = 1600 - p.b.x - p.b.w; p.vx = -Math.abs(p.vx) * .5; }

      // BYTE'ın kafasına düştü mü?
      if (!p.hitDone && overlapsByte(p)) {
        p.hitDone = true;
        if (window.BYTE && window.BYTE.crash(`bir ${p.name}`)) {
          const r = byteEl.getBoundingClientRect();
          const side = p.el.getBoundingClientRect().left + p.el.getBoundingClientRect().width / 2 < r.left + r.width / 2 ? -1 : 1;
          p.vy = -Math.max(520, Math.abs(p.vy) * .45);
          p.vx = side * 460;
          p.vr = side * 420;
        }
      }

      // yüzeylere ve zemine iniş
      const now = bottom(p), cx = centerX(p);
      if (p.vy > 0) {
        // eğik duran kitabın bbox'u raftan biraz taşıyor, o yüzden küçük bir tolerans
        const s = SURFACES.find(s => prevBottom <= s.y + 12 && now >= s.y && cx > s.x1 && cx < s.x2);
        if (s) land(p, s.y);
        else if (now >= p.floorY) land(p, p.floorY);
      }
    } else if (p.state === 'settle') {
      p.r *= Math.pow(.0005, dt);
      if (Math.abs(p.r) < .4) { p.r = 0; p.state = 'rest'; }
    } else if (p.state === 'home') {
      p.t = Math.min(1, p.t + dt / .7);
      const e = 1 - Math.pow(1 - p.t, 3);
      p.x = p.from.x * (1 - e);
      p.y = p.from.y * (1 - e);
      p.r = p.from.r * (1 - e);
      if (p.t >= 1) { p.x = p.y = p.r = 0; p.state = 'rest'; }
    }
    render(p);
  }

  function loop(t) {
    const dt = Math.min(.033, (t - last) / 1000);
    last = t;
    let active = false;
    props.forEach(p => {
      if (p.state === 'rest' || p.state === 'drag') return;
      step(p, dt);
      if (p.state !== 'rest') active = true;
    });
    raf = active ? requestAnimationFrame(loop) : 0;
  }

  /* ---- sürükleme ---- */
  let drag = null;

  svg.addEventListener('pointerdown', e => {
    const el = e.target.closest('.prop');
    if (!el || e.button > 0) return;
    const p = props.find(q => q.el === el);
    e.preventDefault();
    el.parentNode.appendChild(el);   // sürüklenen en üstte görünsün
    const pt = toSvg(e.clientX, e.clientY);
    drag = { p, id: e.pointerId, dx: pt.x - p.x, dy: pt.y - p.y, lx: pt.x, ly: pt.y, lt: e.timeStamp, vx: 0, vy: 0, moved: 0 };
    p.state = 'drag';
    p.hitDone = false;
    el.classList.add('is-dragging');
    document.body.classList.add('is-grabbing');
  });

  addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    const { p } = drag;
    const pt = toSvg(e.clientX, e.clientY);
    const dt = Math.max(1, e.timeStamp - drag.lt) / 1000;
    drag.vx = drag.vx * .6 + ((pt.x - drag.lx) / dt) * .4;
    drag.vy = drag.vy * .6 + ((pt.y - drag.ly) / dt) * .4;
    drag.moved += Math.hypot(pt.x - drag.lx, pt.y - drag.ly);
    drag.lx = pt.x; drag.ly = pt.y; drag.lt = e.timeStamp;
    p.x = pt.x - drag.dx;
    p.y = pt.y - drag.dy;
    p.r = Math.max(-25, Math.min(25, drag.vx * .012));
    render(p);
  });

  function release(e) {
    if (!drag || e.pointerId !== drag.id) return;
    const { p } = drag;
    p.el.classList.remove('is-dragging');
    document.body.classList.remove('is-grabbing');
    if (drag.moved < 6) {
      // sadece tıklandı: küçük bir zıplama
      p.vx = (Math.random() - .5) * 160;
      p.vy = -620;
      p.vr = (Math.random() - .5) * 260;
    } else {
      p.vx = Math.max(-1600, Math.min(1600, drag.vx));
      p.vy = Math.max(-1600, Math.min(1600, drag.vy));
      p.vr = p.vx * .15;
    }
    // zemindeyse olduğu derinlikte kalsın, havadaysa zemine düşsün
    p.floorY = Math.min(FLOOR_MAX, Math.max(FLOOR_MIN, bottom(p)));
    p.state = reduceMotion ? 'settle' : 'fall';
    drag = null;
    wake();
  }
  addEventListener('pointerup', release);
  addEventListener('pointercancel', release);

  /* ---- BYTE yeniden başlayınca her şey yerine ---- */
  document.addEventListener('byte:restart', () => {
    if (drag) { drag.p.el.classList.remove('is-dragging'); drag = null; }
    props.forEach(p => {
      if (!p.x && !p.y && !p.r) return;
      p.from = { x: p.x, y: p.y, r: p.r };
      p.t = 0;
      p.vx = p.vy = p.vr = 0;
      p.state = 'home';
    });
    wake();
  });
})();
