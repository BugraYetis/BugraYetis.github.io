/* ============================================================
   FIT WEEKEND 2026 — app.js
   Vanilla JS. Bağımlılık yok.
   ============================================================ */
(() => {
'use strict';

/* ---------- 0. UTILS ---------- */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const el = (t, cls, html) => { const e = document.createElement(t); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp  = (a, b, t) => a + (b - a) * t;
const rnd   = (a, b) => a + Math.random() * (b - a);
const esc   = s => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const TOUCH   = matchMedia('(hover:none)').matches || innerWidth < 900;
const initials = n => n.replace(/^(Dyt\.|Dr\.|Prof\.|Uzm\.)\s*/i, '').trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();

let toastT;
function toast(msg) {
  const t = $('#toast'); $('#toastMsg').textContent = msg;
  t.classList.add('on'); clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('on'), 3200);
}

/* ---------- 1. REVEAL / KINETIC TYPE ---------- */
const io = new IntersectionObserver((es) => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    const t = e.target;
    const d = t.dataset.delay ? +t.dataset.delay : 0;
    setTimeout(() => t.classList.add('in'), d);
    io.unobserve(t);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

function watch(root = document) {
  $$('.r,.r-s,.r-blur,.r-clip,.kin,.num,.xp-list li,.story-lines li', root).forEach((n, i) => {
    if (n.dataset.w) return; n.dataset.w = 1;
    io.observe(n);
  });
}
/* auto-stagger siblings */
function stagger(list, step = 70) {
  list.forEach((n, i) => n.dataset.delay = i * step);
}

/* split kinetic words into <i> */
function splitKin(root = document) {
  $$('.kin', root).forEach(k => {
    if (k.dataset.split) return; k.dataset.split = 1;
    if (k.children.length && k.children[0].tagName === 'I') {
      [...k.children].forEach((c, i) => c.style.transitionDelay = (i * 85) + 'ms');
      return;
    }
    const words = k.textContent.trim().split(/\s+/);
    k.textContent = '';
    words.forEach((w, i) => {
      const s = el('i', '', esc(w));
      s.style.transitionDelay = (i * 85) + 'ms';
      k.appendChild(s);
      if (i < words.length - 1) k.appendChild(document.createTextNode(' '));
    });
  });
}

/* ---------- 2. LOADER ---------- */
function loader() {
  const ld = $('#loader'), bar = $('.ld-bar i', ld);
  // decorative leaves
  for (let i = 0; i < 12; i++) {
    const l = el('div', 'ld-leaf');
    const s = rnd(10, 26);
    l.style.cssText = `width:${s}px;height:${s * 1.4}px;left:${rnd(6, 94)}%;top:${rnd(10, 90)}%;
      background:linear-gradient(140deg,${['#B7DE3B','#2F9E56','#F8971D','#FF6B4A'][i % 4]},transparent);
      border-radius:0 100% 0 100%;transform:rotate(${rnd(0, 360)}deg);
      animation:fadeUp .9s ${rnd(.1, .9)}s var(--e-out) forwards`;
    ld.appendChild(l);
  }
  let p = 0;
  const tick = setInterval(() => {
    p = Math.min(100, p + rnd(6, 18));
    bar.style.width = p + '%';
    if (p > 30) ld.classList.add('reveal');
    if (p >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        ld.classList.add('done');
        document.body.classList.remove('lock');
        start();
        setTimeout(() => ld.remove(), 1100);
      }, 620);
    }
  }, 170);
}

/* ---------- 3. CURSOR + PARTICLE TRAIL ---------- */
function cursor() {
  if (TOUCH || REDUCED) return;
  const c = $('#cursor'), d = $('#cursorDot'), cv = $('#trail'), ctx = cv.getContext('2d');
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, dx = mx, dy = my;
  const ps = [], COL = ['#D62E63', '#F8971D', '#B7DE3B', '#2BAE9E', '#FF6B4A'];
  let last = 0, dirty = false;

  const size = () => { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px'; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); };
  size(); addEventListener('resize', size);

  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    const n = performance.now();
    if (n - last > 26 && ps.length < 90) {
      last = n;
      ps.push({ x: mx + rnd(-5, 5), y: my + rnd(-5, 5), vx: rnd(-.35, .35), vy: rnd(-.75, -.15), r: rnd(1.6, 4.4), a: 1, c: COL[(Math.random() * COL.length) | 0] });
    }
  }, { passive: true });

  const hot = 'a,button,.spk,.tl-card,.zone,input,select,label,.sp,.att';
  addEventListener('mouseover', e => { if (e.target.closest(hot)) document.body.classList.add('cur-hot'); }, { passive: true });
  addEventListener('mouseout',  e => { if (e.target.closest(hot)) document.body.classList.remove('cur-hot'); }, { passive: true });

  (function loop() {
    cx = lerp(cx, mx, .16); cy = lerp(cy, my, .16);
    dx = lerp(dx, mx, .38); dy = lerp(dy, my, .38);
    c.style.transform = `translate(${cx}px,${cy}px)`;
    d.style.transform = `translate(${dx}px,${dy}px)`;
    if (ps.length) ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i];
      p.x += p.vx; p.y += p.vy; p.vy -= .008; p.a -= .016; p.r *= .987;
      if (p.a <= 0) { ps.splice(i, 1); continue; }
      ctx.globalAlpha = p.a * .62; ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.284); ctx.fill();
    }
    if (!ps.length && dirty) { ctx.clearRect(0, 0, innerWidth, innerHeight); dirty = false; }
    else if (ps.length) dirty = true;
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  })();
}

/* ---------- 4. MAGNETIC BUTTONS + TILT ---------- */
function magnetic() {
  if (TOUCH || REDUCED) return;
  $$('.mag').forEach(b => {
    let rx = 0, ry = 0, tx = 0, ty = 0, raf = null;
    const run = () => { rx = lerp(rx, tx, .18); ry = lerp(ry, ty, .18); b.style.transform = `translate(${rx}px,${ry}px)`; if (Math.abs(rx - tx) > .1 || Math.abs(ry - ty) > .1) raf = requestAnimationFrame(run); else { b.style.transform = tx || ty ? `translate(${tx}px,${ty}px)` : ''; raf = null; } };
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2) * .28;
      ty = (e.clientY - r.top - r.height / 2) * .4;
      if (!raf) raf = requestAnimationFrame(run);
    });
    b.addEventListener('mouseleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(run); });
  });
}
function tilt(node, str = 7) {
  if (TOUCH || REDUCED) return;
  node.addEventListener('mousemove', e => {
    const r = node.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    node.style.transform = `perspective(1000px) rotateY(${px * str}deg) rotateX(${-py * str}deg) translateZ(0)`;
  });
  node.addEventListener('mouseleave', () => { node.style.transform = ''; });
}

/* ---------- 5. NAV ---------- */
function nav() {
  const n = $('#nav'), pr = $('#prog'), bg = $('#burger'), dr = $('#drawer');
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY;
    const h = document.documentElement.scrollHeight - innerHeight;
    pr.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    n.classList.toggle('solid', y > innerHeight * .78);
    if (!document.body.classList.contains('menu')) n.classList.toggle('hide', y > lastY + 6 && y > innerHeight);
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const close = () => { document.body.classList.remove('menu', 'lock'); bg.setAttribute('aria-expanded', 'false'); };
  bg.addEventListener('click', () => {
    const on = document.body.classList.toggle('menu');
    document.body.classList.toggle('lock', on);
    bg.setAttribute('aria-expanded', on);
    if (on) $$('#drawer nav a').forEach((a, i) => a.style.transitionDelay = (60 + i * 55) + 'ms');
  });
  $$('#drawer a').forEach(a => a.addEventListener('click', close));
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // active link
  const links = $$('.nav-links a');
  const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const so = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { links.forEach(l => l.classList.toggle('act', l.getAttribute('href') === '#' + e.target.id)); } });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(s => so.observe(s));

  // smooth anchor with offset
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const t = $(id); if (!t) return;
    e.preventDefault(); close();
    const top = t.getBoundingClientRect().top + scrollY - (id === '#hero' ? 0 : 58);
    scrollTo({ top, behavior: REDUCED ? 'auto' : 'smooth' });
    history.replaceState(null, '', id);
  }));
}

/* ---------- 6. PARALLAX ENGINE ---------- */
const PX = [];
/* ref = an ancestor that is NOT transformed, so measuring it can't feed back
   into the transform we apply (which would make the loop oscillate forever). */
function px(node, speed, extra = '') {
  if (!node) return;
  PX.push({ node, ref: node.parentElement || node, speed, extra, cur: 0 });
}
function parallaxLoop() {
  if (REDUCED) return;
  let lastY = -1, settleFrames = 0;
  const run = () => {
    const vh = innerHeight, y = scrollY;
    if (y === lastY && settleFrames > 22) { requestAnimationFrame(run); return; }
    settleFrames = (y === lastY) ? settleFrames + 1 : 0;
    lastY = y;
    for (const p of PX) {
      const r = p.ref.getBoundingClientRect();
      if (r.bottom < -260 || r.top > vh + 260) continue;
      const prog = (r.top + r.height / 2 - vh / 2) / vh;   // -1..1
      const target = prog * p.speed * 100;
      p.cur = lerp(p.cur, target, .12);
      if (Math.abs(p.cur - target) < .05) p.cur = target;
      p.node.style.transform = `translate3d(0,${p.cur.toFixed(2)}px,0)` + p.extra;
    }
    requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}

/* ---------- 7. LAZY VIDEO ---------- */
const vio = new IntersectionObserver(es => {
  es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting) {
      if (!v.src && v.dataset.src) { v.src = v.dataset.src; v.load(); }
      const p = v.play(); if (p && p.catch) p.catch(() => {});
    } else if (!v.paused) v.pause();
  });
}, { threshold: 0.12 });
function lazyVideo(v) { if (v) vio.observe(v); }

/* ---------- 8. HERO ---------- */
function hero() {
  // tags
  const TAGS = ['Sağlıklı Beslenme', 'Spor', 'Wellness', 'Longevity', 'Uzman Konuşmaları', 'Workshoplar', 'Markalar', 'Deneyimler', 'Yarışmalar', 'Sağlıklı Yaşam'];
  $('#heroTags').innerHTML = TAGS.map(t => `<span>${t}</span>`).join('');

  // leaves + orbs (hero + final CTA)
  const box = $('#heroLeaves');
  const seedLeaves = (host, count) => {
    if (REDUCED || !host) return;
    for (let i = 0; i < count; i++) {
      const isLeaf = i % 3 !== 2;
      const n = el('div', isLeaf ? 'leaf' : 'orb');
      const s = isLeaf ? rnd(14, 40) : rnd(6, 18);
      const c = ['#B7DE3B', '#2F9E56', '#F8971D', '#FFC9A8', '#FF6B4A'][i % 5];
      n.style.cssText = isLeaf
        ? `width:${s}px;height:${s * 1.5}px;left:${rnd(2, 96)}%;top:${rnd(4, 92)}%;background:linear-gradient(140deg,${c},transparent 85%);border-radius:0 100% 0 100%;opacity:${rnd(.28, .68)}`
        : `width:${s}px;height:${s}px;left:${rnd(2, 96)}%;top:${rnd(4, 92)}%;background:${c};opacity:${rnd(.16, .4)}`;
      host.appendChild(n);
      const dur = rnd(9, 20), delay = rnd(0, 8), amp = rnd(20, 70), rot = rnd(-40, 40);
      n.animate([
        { transform: `translate(0,0) rotate(0deg)` },
        { transform: `translate(${rnd(-30, 30)}px,${-amp}px) rotate(${rot}deg)` },
        { transform: `translate(0,0) rotate(0deg)` }
      ], { duration: dur * 1000, delay: -delay * 1000, iterations: Infinity, easing: 'ease-in-out' });
    }
  };
  seedLeaves(box, TOUCH ? 6 : 10);
  seedLeaves($('#finalLeaves'), TOUCH ? 5 : 9);

  // scroll-driven hero
  const media = $('.hero-media'), inner = $('.hero-inner'), hint = $('.scroll-hint');
  if (!REDUCED) {
    addEventListener('scroll', () => {
      const y = scrollY, vh = innerHeight;
      if (y > vh * 1.25) return;
      const t = clamp(y / vh, 0, 1);
      media.style.transform = `translate3d(0,${y * .32}px,0) scale(${1 + t * .14})`;
      inner.style.transform = `translate3d(0,${y * -.12}px,0)`;
      inner.style.opacity = 1 - t * 1.15;
      hint.style.opacity = 1 - t * 3;
      box.style.transform = `translate3d(0,${y * .5}px,0)`;
    }, { passive: true });
  }
  lazyVideo($('#heroVid'));
  lazyVideo($('#finalVid'));

  // letter hover reaction on H1
  if (!TOUCH && !REDUCED) {
    $$('.hero-t .kin > i').forEach(w => {
      const txt = w.textContent;
      w.innerHTML = [...txt].map(ch => `<span class="ltr">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('');
    });
    const h1 = $('.hero-t');
    h1.addEventListener('mousemove', e => {
      $$('.ltr', h1).forEach(s => {
        const r = s.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy);
        if (d < 150) { const f = (1 - d / 150); s.style.transform = `translate(${-dx * f * .22}px,${-dy * f * .28}px) scale(${1 + f * .16})`; }
        else s.style.transform = '';
      });
    });
    h1.addEventListener('mouseleave', () => $$('.ltr', h1).forEach(s => s.style.transform = ''));
  }

  // countdown
  const TARGET = new Date(2026, 8, 18, 11, 0, 0).getTime();
  const cd = $('#countdown');
  const units = [['Gün', 864e5], ['Saat', 36e5], ['Dakika', 6e4], ['Saniye', 1e3]];
  cd.innerHTML = units.map(u => `<div class="u"><b>--</b><i>${u[0]}</i></div>`).join('');
  const bs = $$('#countdown b');
  const tickCd = () => {
    let diff = TARGET - Date.now();
    if (diff <= 0) { cd.innerHTML = `<div class="u" style="min-width:auto;padding:14px 26px"><b>Festival Başladı!</b></div>`; return; }
    units.forEach((u, i) => { const v = Math.floor(diff / u[1]); diff -= v * u[1]; if (bs[i]) bs[i].textContent = String(v).padStart(2, '0'); });
  };
  tickCd(); setInterval(tickCd, 1000);
}

/* ---------- 9. MARQUEE ---------- */
function marquee() {
  const a = ['Sağlıklı Beslenme', 'Spor', 'Wellness', 'Longevity', 'Workshoplar', 'Uzman Konuşmaları', 'Deneyimler', 'Yarışmalar'];
  const b = ['18 · 19 · 20 Eylül 2026', 'Kanyon', 'Ücretsiz Katılım', 'Şehre Fit Bir Dönüş', 'Diyetisyen Dünyası'];
  const build = (arr) => { const s = arr.map(t => `<span>${t}</span><i></i>`).join(''); return `<div>${s}</div><div>${s}</div>`; };
  $('#mq1').innerHTML = build(a);
  $('#mq2').innerHTML = build(b);
}

/* ---------- 10. NUMBERS ---------- */
function numbers() {
  const g = $('#numGrid');
  g.innerHTML = STATS.map(s => `<div class="num r"><i>${s.i}</i><b><span class="v" data-v="${s.v}">0</span><span class="sfx">${s.sfx}</span></b><span>${s.l}</span></div>`).join('');
  stagger($$('.num', g), 90);
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const n = e.target, target = +n.dataset.v, dur = 1900, t0 = performance.now();
    const fmt = v => v >= 10000 ? v.toLocaleString('tr-TR') : String(v);
    const step = t => {
      const p = clamp((t - t0) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3.4);
      n.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step); co.unobserve(n);
  }), { threshold: .5 });
  $$('.v', g).forEach(n => co.observe(n));
}

/* ---------- 11. EXPERIENCE SECTIONS ---------- */
function sections() {
  const host = $('#xpHost');
  SECTIONS.forEach(s => {
    const sec = el('section', 'xp');
    sec.id = s.id;
    sec.style.setProperty('--amb', s.amb);
    sec.style.setProperty('--acc', s.acc);
    const media = s.media.type === 'video'
      ? `<video muted loop playsinline preload="none" poster="${s.media.poster}" data-src="${s.media.src}" aria-label="${esc(s.title.replace(/<[^>]+>/g, ''))}"></video>`
      : `<img src="${s.media.src}" alt="${esc(s.title.replace(/<[^>]+>/g, ''))} — Fit Weekend 2026" loading="lazy">`;
    sec.innerHTML = `
      <div class="wrap">
        <div class="xp-grid">
          <div class="xp-copy">
            <span class="xp-num" aria-hidden="true">${s.n}</span>
            <span class="eyebrow r">${s.kicker}</span>
            <h3 class="r">${s.title}</h3>
            <p class="lead r">${s.lead}</p>
            <ul class="xp-list">${s.items.map(i => `<li>${i}</li>`).join('')}</ul>
          </div>
          <div class="xp-media r-s">
            <div class="mv">${media}</div>
            <div class="veil"></div>
            <div class="tag"><i></i>${s.tag}</div>
          </div>
        </div>
      </div>`;
    host.appendChild(sec);
    stagger($$('.xp-list li', sec), 55);
    const v = $('video', sec); if (v) lazyVideo(v);
    const m = $('.xp-media', sec); px($('.mv', m), .055);
    tilt(m, 5);
  });
  watch(host);
}

/* ---------- 12. SPEAKERS + MODAL ---------- */
function speakers() {
  const g = $('#spkGrid');
  /* Fotoğraf varsa onu, yoksa baş harflerden avatar. Fotoğraf bulunamazsa
     onerror ile sessizce avatara döner — kart asla boş kalmaz. */
  const avatar = (s, cls) => s.img
    ? `<div class="${cls} has-img" style="background:linear-gradient(150deg,${s.c},${s.c}bb 60%,#241a22)">
         <span class="ini">${initials(s.n)}</span>
         <img src="${s.img}" alt="${esc(s.n)}" loading="lazy" onload="this.classList.add('ok')" onerror="this.remove()">
       </div>`
    : `<div class="${cls}" style="background:linear-gradient(150deg,${s.c},${s.c}bb 60%,#241a22)">${initials(s.n)}</div>`;
  speakers.avatar = avatar;
  g.innerHTML = SPEAKERS.map((s, i) => `
    <article class="spk r-s" data-i="${i}" tabindex="0" role="button" aria-label="${esc(s.n)} detay">
      ${avatar(s, 'av')}
      ${s.pin ? `<span class="pin" style="color:${s.c}">${s.pin}</span>` : ''}
      <div class="ov">
        <b>${esc(s.n)}</b><span>${esc(s.r)}</span>
        <u>Detay
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
        </u>
      </div>
    </article>`).join('');
  stagger($$('.spk', g), 55);

  const modal = $('#modal'), card = $('#modalCard');
  const open = i => {
    const s = SPEAKERS[i];
    card.innerHTML = `
      <button class="x" data-close aria-label="Kapat"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <div class="top">
        ${avatar(s, 'mav')}
        <div><h3>${esc(s.n)}</h3><div class="role">${esc(s.r)}</div></div>
      </div>
      <p class="bio">${esc(s.b)}</p>
      <div class="chips">${s.t.map(t => `<span>${esc(t)}</span>`).join('')}</div>
      ${s.s && s.s.length ? `<div class="ses"><h5 style="font-family:var(--f-display);font-size:.76rem;letter-spacing:.18em;text-transform:uppercase;opacity:.5;margin-bottom:4px">Seansları</h5>
        ${s.s.map(x => { const p = x.split(' — '); return `<div class="s"><b style="color:${s.c}">${esc(p[0] || '')}</b><span>${esc(p[1] || '')}</span></div>`; }).join('')}</div>` : ''}
      <div style="margin-top:26px"><a class="btn btn-p mag" href="#program" data-close><span>Programda Gör</span></a></div>`;
    modal.classList.add('on'); modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lock');
    card.focus?.();
  };
  const close = () => { modal.classList.remove('on'); modal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('lock'); };
  g.addEventListener('click', e => { const c = e.target.closest('.spk'); if (c) open(+c.dataset.i); });
  g.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('spk')) { e.preventDefault(); open(+e.target.dataset.i); } });
  modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('on')) close(); });
}

/* ---------- 13. CALENDAR ---------- */
const pad = n => String(n).padStart(2, '0');
/* Europe/Istanbul = UTC+3 (yıl boyu sabit) */
function utcStamp(y, m, d, hh, mm, addMin = 0) {
  const t = Date.UTC(y, m, d, hh - 3, mm) + addMin * 60000;
  const x = new Date(t);
  return `${x.getUTCFullYear()}${pad(x.getUTCMonth() + 1)}${pad(x.getUTCDate())}T${pad(x.getUTCHours())}${pad(x.getUTCMinutes())}00Z`;
}
const FULL = {
  title: 'Fit Weekend 2026 — Şehre Fit Bir Dönüş',
  start: utcStamp(2026, 8, 18, 11, 0),
  end:   utcStamp(2026, 8, 20, 20, 0),
  loc:   `${EVENT.venue}, ${EVENT.address}`,
  desc:  EVENT.description
};
/* Tek etkinlik ya da etkinlik dizisi kabul eder; hepsini tek .ics dosyasına yazar. */
function icsFile(input, fileName) {
  const evs = Array.isArray(input) ? input : [input];
  if (!evs.length) return;
  const fold = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Fit Weekend 2026//TR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'X-WR-CALNAME:Fit Weekend 2026'];
  evs.forEach((ev, i) => {
    lines.push(
      'BEGIN:VEVENT',
      `UID:fw${ev.start}-${i}-${Math.random().toString(36).slice(2, 8)}@fitweekend`,
      `DTSTAMP:${utcStamp(2026, 0, 1, 12, 0)}`,
      `DTSTART:${ev.start}`, `DTEND:${ev.end}`,
      `SUMMARY:${fold(ev.title)}`, `DESCRIPTION:${fold(ev.desc)}`, `LOCATION:${fold(ev.loc)}`,
      `URL:${EVENT.url}`, 'STATUS:CONFIRMED',
      'BEGIN:VALARM', 'TRIGGER:-PT30M', 'ACTION:DISPLAY', `DESCRIPTION:${fold(ev.title)} birazdan başlıyor`, 'END:VALARM',
      'END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const a = el('a'); a.href = URL.createObjectURL(blob);
  a.download = (fileName || evs[0].title).replace(/[^\wğüşıöçĞÜŞİÖÇ -]+/g, '').trim().replace(/\s+/g, '-').toLowerCase() + '.ics';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
/* PROGRAM içindeki bir seansı takvim etkinliğine çevirir */
function sessionEvent(key, i) {
  const day = EVENT.days.find(d => d.key === key), s = PROGRAM[key] && PROGRAM[key][i];
  if (!day || !s) return null;
  const [hh, mm] = s.h.split(':').map(Number);
  return {
    title: `${s.t} — Fit Weekend`,
    start: utcStamp(day.y, day.m, day.d, hh, mm),
    end:   utcStamp(day.y, day.m, day.d, hh, mm, s.dur || 60),
    loc:   `${EVENT.venue}, ${EVENT.address}`,
    desc:  `${s.p}\n\n${s.w} · ${s.k}\nFit Weekend 2026 — ${EVENT.url}`
  };
}
const isoOf = s => `${s.slice(0,4)}-${s.slice(4,6)}-${s.slice(6,11)}:${s.slice(11,13)}:00Z`;
function googleUrl(ev) {
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    + '&text=' + encodeURIComponent(ev.title)
    + '&dates=' + ev.start + '/' + ev.end
    + '&details=' + encodeURIComponent(ev.desc + '\n\n' + EVENT.url)
    + '&location=' + encodeURIComponent(ev.loc) + '&ctz=Europe/Istanbul';
}
function outlookUrl(ev) {
  return 'https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent'
    + '&subject=' + encodeURIComponent(ev.title)
    + '&startdt=' + isoOf(ev.start) + '&enddt=' + isoOf(ev.end)
    + '&location=' + encodeURIComponent(ev.loc)
    + '&body=' + encodeURIComponent(ev.desc);
}
function calendar() {
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-cal]'); if (!b) return;
    e.preventDefault();
    const k = b.dataset.cal;
    if (k === 'ics')     { icsFile(FULL); toast('Takvim dosyası indiriliyor 📅'); }
    if (k === 'google')  { open(googleUrl(FULL), '_blank', 'noopener'); toast('Google Takvim açılıyor'); }
    if (k === 'outlook') { open(outlookUrl(FULL), '_blank', 'noopener'); toast('Outlook açılıyor'); }
  });
}

/* ---------- 14. PROGRAM TIMELINE ---------- */
function program() {
  const tabs = $('#dayTabs'), tl = $('#tl');
  tabs.innerHTML = EVENT.days.map((d, i) =>
    `<button class="day-tab${i === 0 ? ' on' : ''}" data-d="${d.key}">${d.label}<small>${d.date} ${d.month} · ${d.open}–${d.close}</small></button>`).join('');

  /* ---- kişisel program (favoriler) ---- */
  const FKEY = 'fw2026_favs_v1';
  let favs = [];
  try { favs = JSON.parse(localStorage.getItem(FKEY) || '[]'); } catch (_) {}
  if (!Array.isArray(favs)) favs = [];
  const saveFavs = () => { try { localStorage.setItem(FKEY, JSON.stringify(favs)); } catch (_) {} };
  const bar = $('#myPlan'), cnt = $('#myPlanCount');
  const syncBar = () => {
    cnt.textContent = favs.length;
    bar.classList.toggle('on', favs.length > 0);
    document.body.classList.toggle('plan-open', favs.length > 0);
    $$('.tl-card', tl).forEach(c => {
      const id = c.dataset.d + ':' + c.dataset.i;
      c.classList.toggle('fav', favs.includes(id));
      const st = $('.star', c); if (st) st.setAttribute('aria-pressed', favs.includes(id));
    });
  };

  const starSvg = `<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="1.9" fill="none"><path d="M12 3.6l2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 17l-5.25 2.75 1-5.85L3.5 9.75l5.9-.85z"/></svg>`;
  const calSvg  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>`;

  const render = key => {
    tl.innerHTML = PROGRAM[key].map((s, i) => `
      <article class="tl-card" style="--c:${s.c}" data-d="${key}" data-i="${i}">
        <div class="hh"><span class="hr">${s.h}</span>
          <span style="display:flex;align-items:center;gap:6px">
            <span class="kind">${s.k}</span>
            <button class="star" data-fav="${key}:${i}" aria-pressed="false" aria-label="Programıma ekle" title="Programıma ekle">${starSvg}</button>
          </span>
        </div>
        <h4>${esc(s.t)}</h4>
        <p>${esc(s.p)}</p>
        <div class="who"><em>${initials(s.w)}</em>${esc(s.w)}</div>
        <button class="ics" data-add="${key}:${i}">${calSvg} Takvime Ekle</button>
      </article>`).join('');
    tl.scrollLeft = 0;
    $$('.tl-card', tl).forEach((c, i) => { c.style.opacity = 0; c.style.transform = 'translateY(22px)'; setTimeout(() => { c.style.transition = 'opacity .6s var(--e-out),transform .7s var(--e-out),box-shadow .55s'; c.style.opacity = 1; c.style.transform = ''; }, 40 + i * 55); });
    syncBar();
  };
  render('cu');

  tabs.addEventListener('click', e => {
    const b = e.target.closest('.day-tab'); if (!b) return;
    $$('.day-tab', tabs).forEach(x => x.classList.toggle('on', x === b));
    render(b.dataset.d);
  });

  // yıldız → kişisel programa ekle / çıkar
  tl.addEventListener('click', e => {
    const b = e.target.closest('[data-fav]'); if (!b) return;
    const id = b.dataset.fav, [k, i] = id.split(':');
    const s = PROGRAM[k][+i];
    const at = favs.indexOf(id);
    if (at > -1) { favs.splice(at, 1); toast(`"${s.t}" programından çıkarıldı`); }
    else { favs.push(id); toast(`"${s.t}" programına eklendi ★`); }
    saveFavs(); syncBar();
  });

  // tek seansı takvime ekle
  tl.addEventListener('click', e => {
    const b = e.target.closest('[data-add]'); if (!b) return;
    const [k, i] = b.dataset.add.split(':');
    const ev = sessionEvent(k, +i); if (!ev) return;
    icsFile(ev);
    b.classList.add('ok'); b.innerHTML = '✓ Eklendi';
    setTimeout(() => { b.classList.remove('ok'); b.innerHTML = `${calSvg} Takvime Ekle`; }, 2600);
    toast(`"${PROGRAM[k][+i].t}" takvimine eklendi`);
  });

  // kişisel programı tek dosya olarak indir
  $('#myPlanDl').addEventListener('click', () => {
    const order = { cu: 0, ct: 1, pz: 2 };
    const evs = favs
      .slice()
      .sort((a, b) => {
        const [ka, ia] = a.split(':'), [kb, ib] = b.split(':');
        return (order[ka] - order[kb]) || (+ia - +ib);
      })
      .map(id => { const [k, i] = id.split(':'); return sessionEvent(k, +i); })
      .filter(Boolean);
    if (!evs.length) return;
    icsFile(evs, 'fit-weekend-programim');
    toast(`${evs.length} seans takvimine eklendi 🎉`);
  });
  $('#myPlanClear').addEventListener('click', () => { favs = []; saveFavs(); syncBar(); toast('Programın temizlendi'); });

  // drag to scroll
  let down = false, sx = 0, sl = 0, moved = 0;
  tl.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; down = true; moved = 0; sx = e.clientX; sl = tl.scrollLeft; tl.classList.add('drag'); tl.setPointerCapture(e.pointerId); });
  tl.addEventListener('pointermove', e => { if (!down) return; const d = e.clientX - sx; moved = Math.abs(d); tl.scrollLeft = sl - d; });
  const up = e => { if (!down) return; down = false; tl.classList.remove('drag'); try { tl.releasePointerCapture(e.pointerId); } catch (_) {} };
  tl.addEventListener('pointerup', up); tl.addEventListener('pointercancel', up);
  tl.addEventListener('click', e => { if (moved > 8) { e.preventDefault(); e.stopPropagation(); } }, true);

  const step = () => (($('.tl-card', tl)?.offsetWidth) || 300) + 16;
  $('#tlPrev').onclick = () => tl.scrollBy({ left: -step(), behavior: 'smooth' });
  $('#tlNext').onclick = () => tl.scrollBy({ left:  step(), behavior: 'smooth' });
}

/* ---------- 15. INTERACTIVE MAP ---------- */
function festivalMap() {
  const box = $('#mapBox');
  const P = {
    z1:{x:470,y:210,w:270,h:120,r:34},  z2:{x:80, y:120,w:200,h:250,r:40},
    z3:{x:790,y:150,w:210,h:150,r:38},  z4:{x:830,y:340,w:200,h:120,r:32},
    z5:{x:300,y:400,w:190,h:120,r:32},  z6:{x:530,y:380,w:220,h:130,r:34},
    z7:{x:110,y:405,w:150,h:120,r:34},  z8:{x:490,y:70, w:230,h:80, r:26}
  };
  const svg = [`<svg viewBox="0 0 1120 580" role="img" aria-label="Fit Weekend festival alanı haritası">`,
    `<defs>
      <linearGradient id="gPlaza" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFDF8"/><stop offset="1" stop-color="#F6EFE2"/></linearGradient>
      <linearGradient id="gBld" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EAF1F6"/><stop offset="1" stop-color="#D7E2EA"/></linearGradient>
    </defs>`,
    // plaza
    `<rect x="0" y="0" width="1120" height="580" fill="url(#gPlaza)"/>`,
    // kanyon building (organic curve)
    `<path d="M40 60 Q 320 -10 620 30 T 1080 46 L1080 110 Q 700 76 380 106 T 40 128 Z" fill="url(#gBld)"/>`,
    `<text x="1000" y="86" font-family="Plus Jakarta Sans,sans-serif" font-size="20" font-weight="800" fill="#621B4B" opacity=".8" text-anchor="end">KANYON</text>`,
    // walkway
    `<path d="M120 540 Q 420 470 560 350 T 1010 250" fill="none" stroke="#E7DCC9" stroke-width="26" stroke-linecap="round" stroke-dasharray="2 26" opacity=".9"/>`,
    `<path d="M120 540 Q 420 470 560 350 T 1010 250" fill="none" stroke="#D62E63" stroke-width="3" stroke-linecap="round" stroke-dasharray="10 14" opacity=".45">
       <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="2.4s" repeatCount="indefinite"/></path>`
  ];
  // trees
  const trees = [[40,300],[45,470],[1075,120],[1070,510],[275,545],[760,545],[400,180],[690,470]];
  trees.forEach(([x, y], i) => svg.push(
    `<g opacity=".55"><circle cx="${x}" cy="${y}" r="${20 + (i % 3) * 6}" fill="#8FC44E"/><circle cx="${x + 8}" cy="${y - 8}" r="${13 + (i % 2) * 5}" fill="#B7DE3B"/></g>`));

  ZONES.forEach(z => {
    const p = P[z.id]; if (!p) return;
    const cx = p.x + p.w / 2, cy = p.y + p.h / 2;
    svg.push(`<g class="zone" data-z="${z.id}" style="--zc:${z.c}" tabindex="0" role="button" aria-label="${esc(z.t)}">
      <rect class="bd" x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="${p.r}"
            fill="${z.c}1f" stroke="${z.c}" stroke-width="2.5"/>
      <circle class="pl" cx="${p.x + 26}" cy="${p.y + 26}" r="18" fill="${z.c}" opacity=".35"/>
      <circle cx="${p.x + 26}" cy="${p.y + 26}" r="8" fill="${z.c}"/>
      <text class="lbl" x="${cx}" y="${cy + 5}" text-anchor="middle">${esc(z.t)}</text>
    </g>`);
  });
  svg.push('</svg>');
  box.innerHTML = `<div class="map-scroll">${svg.join('')}</div>`
    + `<div class="map-info" id="mapInfo"><b></b><p></p></div>`;

  const info = $('#mapInfo');
  const legend = $('#mapLegend');
  let pinned = 'z1';
  const show = id => {
    const z = ZONES.find(x => x.id === id); if (!z) return;
    $$('.zone', box).forEach(g => g.classList.toggle('on', g.dataset.z === id));
    $$('[data-z]', legend).forEach(b => b.style.boxShadow = b.dataset.z === id ? `inset 0 0 0 2px ${z.c}` : '');
    info.querySelector('b').textContent = z.t;
    info.querySelector('p').textContent = z.d;
    info.style.borderLeft = `4px solid ${z.c}`;
    info.classList.add('on');
  };
  const pin = id => { pinned = id; show(id); };

  box.addEventListener('click', e => { const g = e.target.closest('.zone'); if (g) pin(g.dataset.z); });
  box.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.zone')) { e.preventDefault(); pin(e.target.closest('.zone').dataset.z); } });
  if (!TOUCH) {
    box.addEventListener('mouseover', e => { const g = e.target.closest('.zone'); if (g) show(g.dataset.z); });
    box.addEventListener('mouseleave', () => show(pinned));
  }

  legend.innerHTML = ZONES.map(z => `<button data-z="${z.id}"><i style="background:${z.c}"></i>${esc(z.t)}</button>`).join('');
  legend.addEventListener('click', e => {
    const b = e.target.closest('[data-z]'); if (!b) return;
    pin(b.dataset.z);
    const r = box.getBoundingClientRect();
    if (r.top < 0 || r.bottom > innerHeight) box.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });
  });
  if (!TOUCH) {
    legend.addEventListener('mouseover', e => { const b = e.target.closest('[data-z]'); if (b) show(b.dataset.z); });
    legend.addEventListener('mouseleave', () => show(pinned));
  }
  setTimeout(() => show('z1'), 900);
}

/* ---------- 17. SPONSOR ORBIT ---------- */
function sponsors() {
  const o = $('#orbit');
  const nodes = SPONSORS.map((s, i) => {
    /* logo varsa görsel, yoksa marka adı yazısı */
    const inner = s.logo
      ? `<img class="sp-logo" src="${s.logo}" alt="${esc(s.n)}" loading="lazy" onerror="this.replaceWith(document.createTextNode('${esc(s.n).replace(/'/g, '')}'))"><small>${esc(s.t)}</small>`
      : `${esc(s.n)}<small>${esc(s.t)}</small>`;
    const n = el('div', 'sp', inner);
    o.appendChild(n); return n;
  });
  const core = $('.core', o);
  let t = 0, vis = false;
  new IntersectionObserver(es => { vis = es[0].isIntersecting; }, { threshold: 0 }).observe(o);
  const run = () => {
    if (!vis) { requestAnimationFrame(run); return; }
    const w = o.clientWidth, h = o.clientHeight;
    const coreR = (core?.offsetWidth || 180) / 2;
    // inner ring must clear the core + card half-height
    const minR = coreR + 72;
    const rx = Math.max(minR, Math.min(w * .42, 440));
    const ry = Math.max(minR, Math.min(h * .42, 230));
    nodes.forEach((n, i) => {
      const ring = i % 2;
      const a = (i / nodes.length) * Math.PI * 2 + t * (ring ? -.28 : .34);
      const kx = ring ? .72 : 1.0, ky = ring ? .78 : 1.0;
      const x = Math.cos(a) * Math.max(rx * kx, minR), y = Math.sin(a) * Math.max(ry * ky, minR * .62);
      n.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
      n.style.zIndex = y > 0 ? 4 : 2;
      n.style.opacity = (.74 + (y / (ry * 2) + .5) * .26).toFixed(2);
    });
    t += REDUCED ? 0 : .0016;
    requestAnimationFrame(run);
  };
  run();
}

/* ---------- 18. COMMUNITY ---------- */
function community() {
  const names = ['Yoga', 'Mall Run', 'Brunch', 'Workshop', 'Analiz', 'Challenge', 'DJ Set', 'Stantlar', 'Morning'];
  const cols = ['#D62E63', '#F8971D', '#B7DE3B', '#2BAE9E', '#FF6B4A', '#2F9E56', '#621B4B', '#E8365F', '#F8971D'];
  $('#stories').innerHTML = names.map((n, i) =>
    `<div class="story-c"><div class="rr"><div style="background:linear-gradient(150deg,${cols[i]},#241a22)">${n[0]}</div></div><small>${n}</small></div>`).join('');
  $('#wall').innerHTML = POSTS.map(p => `
    <article class="post r">
      <div class="ph"><em style="background:linear-gradient(150deg,${p.c},#241a22)">${p.u[1].toUpperCase()}</em>
        <div><b>${esc(p.u)}</b><span>${esc(p.w)}</span></div></div>
      <p>${esc(p.x)}</p>
      <div class="tags">${p.g.map(g => `<i>${esc(g)}</i>`).join('')}</div>
      <div class="lk">
        <span>♥ ${p.l}</span><span>💬 ${p.m}</span>
      </div>
    </article>`).join('');
  stagger($$('#wall .post'), 70);
}

/* ---------- 19. STORE (pluggable) ---------- */
const KEY = 'fw2026_registrations_v1';
const MEKEY = 'fw2026_me_v1';

const Store = {
  cache: null,
  async all() {
    if (this.cache) return this.cache;
    const C = DATA_CONFIG;
    try {
      if (C.MODE === 'api' && C.ENDPOINT) {
        const r = await fetch(C.ENDPOINT, { headers: { 'Accept': 'application/json' } });
        this.cache = await r.json();
      } else if (C.MODE === 'supabase' && C.SUPABASE_URL) {
        const r = await fetch(`${C.SUPABASE_URL}/rest/v1/${C.SUPABASE_TABLE}?select=*&order=ts.desc&limit=${C.WALL_LIMIT}`, {
          headers: { apikey: C.SUPABASE_ANON_KEY, Authorization: 'Bearer ' + C.SUPABASE_ANON_KEY }
        });
        this.cache = await r.json();
      } else if (C.MODE === 'sheets' && C.ENDPOINT) {
        const r = await fetch(C.ENDPOINT);
        this.cache = await r.json();
      } else {
        this.cache = this.local();
      }
    } catch (err) {
      console.warn('[FitWeekend] Uzak veri alınamadı, yerel moda düşüldü.', err);
      this.cache = this.local();
    }
    if (!Array.isArray(this.cache)) this.cache = this.local();
    return this.cache;
  },
  local() {
    let a = [];
    try { a = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (_) {}
    if (!Array.isArray(a) || !a.length) {
      a = SEED.map((s, i) => ({ name: s[0], city: s[1], interest: s[2], days: s[3], ts: Date.now() - (i + 1) * 36e5 * 3 }));
      this.saveLocal(a);
    }
    return a;
  },
  saveLocal(a) { try { localStorage.setItem(KEY, JSON.stringify(a.slice(0, 400))); } catch (_) {} },
  async add(rec) {
    const C = DATA_CONFIG;
    try {
      if (C.MODE === 'api' && C.ENDPOINT)
        await fetch(C.ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rec) });
      else if (C.MODE === 'supabase' && C.SUPABASE_URL)
        await fetch(`${C.SUPABASE_URL}/rest/v1/${C.SUPABASE_TABLE}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: C.SUPABASE_ANON_KEY, Authorization: 'Bearer ' + C.SUPABASE_ANON_KEY, Prefer: 'return=minimal' },
          body: JSON.stringify(rec)
        });
      else if (C.MODE === 'sheets' && C.ENDPOINT)
        await fetch(C.ENDPOINT, { method: 'POST', body: JSON.stringify(rec) });
    } catch (err) { console.warn('[FitWeekend] Kayıt gönderilemedi, yerel olarak saklandı.', err); }
    const a = await this.all();
    a.unshift(rec); this.cache = a;
    if (C.MODE === 'local') this.saveLocal(a);
    return rec;
  },
  async remove(rec) {
    const a = await this.all();
    const i = a.findIndex(x => x.ts === rec.ts && x.name === rec.name);
    if (i > -1) a.splice(i, 1);
    this.cache = a;
    if (DATA_CONFIG.MODE === 'local') this.saveLocal(a);
  }
};

/* ---------- 20. JOIN + WALL ---------- */
function join() {
  const dayPick = $('#dayPick'), intPick = $('#intPick');
  dayPick.innerHTML = EVENT.days.map((d, i) =>
    `<span><input type="checkbox" id="d_${d.key}" value="${d.key}" ${i === 1 ? 'checked' : ''}><label for="d_${d.key}">${d.label} ${d.date}</label></span>`).join('');
  intPick.innerHTML = INTERESTS.map((it, i) =>
    `<span><input type="radio" name="interest" id="i_${it.k}" value="${it.k}" ${i === 0 ? 'checked' : ''}><label for="i_${it.k}">${it.t}</label></span>`).join('');

  const wall = $('#attWall'), countEl = $('#attCount'), filters = $('#attFilters');
  let filter = 'all', me = null;
  try { me = JSON.parse(localStorage.getItem(MEKEY) || 'null'); } catch (_) {}

  filters.innerHTML = `<button class="att-f on" data-f="all">Tümü</button>` +
    EVENT.days.map(d => `<button class="att-f" data-f="${d.key}">${d.label}</button>`).join('');

  const colOf = k => (INTERESTS.find(i => i.k === k) || INTERESTS[0]).c;
  const nameOf = k => (INTERESTS.find(i => i.k === k) || INTERESTS[0]).t;

  let animCount = 0;
  const drawCount = n => {
    const t0 = performance.now(), from = animCount, dur = 900;
    const step = t => {
      const p = clamp((t - t0) / dur, 0, 1), e = 1 - Math.pow(1 - p, 3);
      countEl.textContent = Math.round(lerp(from, n, e)).toLocaleString('tr-TR');
      if (p < 1) requestAnimationFrame(step); else animCount = n;
    };
    requestAnimationFrame(step);
  };

  async function render() {
    const all = await Store.all();
    const list = (filter === 'all' ? all : all.filter(a => (a.days || []).includes(filter)));
    drawCount(DATA_CONFIG.BASE_COUNT + all.length);
    const show = list.slice(0, DATA_CONFIG.WALL_LIMIT);
    if (!show.length) { wall.innerHTML = `<div class="att-empty">Bu gün için henüz kayıt yok — ilk sen ol!</div>`; return; }
    wall.innerHTML = show.map((a, i) => {
      const isMe = me && a.ts === me.ts && a.name === me.name;
      const c = colOf(a.interest);
      return `<div class="att${isMe ? ' me' : ''}" style="animation-delay:${Math.min(i, 24) * 26}ms" title="${esc(a.name)} · ${esc(nameOf(a.interest))}${isMe ? ' · sen' : ''}">
        <em style="background:linear-gradient(150deg,${c},${c}aa)">${initials(a.name)}</em>
        <div class="i"><b>${esc(a.name)}</b><small>${esc(a.city || '')}${isMe ? ' · sen' : ''}</small></div>
      </div>`;
    }).join('');
  }

  filters.addEventListener('click', e => {
    const b = e.target.closest('.att-f'); if (!b) return;
    filter = b.dataset.f;
    $$('.att-f', filters).forEach(x => x.classList.toggle('on', x === b));
    render();
  });

  const form = $('#regForm'), formBox = $('#formBox'), doneBox = $('#doneBox');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = $('#fName').value.trim();
    if (name.length < 2) { $('#fName').classList.add('err'); $('#fName').focus(); toast('Lütfen adını yaz 🙂'); return; }
    $('#fName').classList.remove('err');
    const days = $$('#dayPick input:checked').map(i => i.value);
    if (!days.length) { toast('En az bir gün seç'); return; }
    const rec = {
      name: name.slice(0, 60),
      city: ($('#fCity').value.trim() || 'İstanbul').slice(0, 40),
      interest: ($('input[name=interest]:checked') || {}).value || 'beslenme',
      days, ts: Date.now()
    };
    await Store.add(rec);
    me = rec; try { localStorage.setItem(MEKEY, JSON.stringify(rec)); } catch (_) {}
    formBox.style.display = 'none'; doneBox.classList.add('on');
    $('#doneMsg').textContent = `${rec.name.split(' ')[0]}, katılımcı duvarında yerini aldın. Şimdi festivali takvimine ekle 🎉`;
    filter = 'all'; $$('.att-f', filters).forEach((x, i) => x.classList.toggle('on', i === 0));
    await render();
    confetti();
    toast('Kaydın alındı — festivalde görüşürüz! 🎉');
  });

  $('#undoBtn').addEventListener('click', async () => {
    if (me) { await Store.remove(me); me = null; try { localStorage.removeItem(MEKEY); } catch (_) {} }
    doneBox.classList.remove('on'); formBox.style.display = '';
    form.reset(); $$('#dayPick input')[1] && ($$('#dayPick input')[1].checked = true);
    await render(); toast('Duvardan çıkarıldın.');
  });

  // returning visitor
  if (me) {
    formBox.style.display = 'none'; doneBox.classList.add('on');
    $('#doneMsg').textContent = `Tekrar hoş geldin ${me.name.split(' ')[0]}! Kaydın duruyor — festivali takvimine eklemeyi unutma.`;
  }
  render();
}

/* ---------- 20b. SSS (akordeon) ---------- */
function faq() {
  const host = $('#faqList'); if (!host || typeof FAQ === 'undefined') return;
  host.innerHTML = FAQ.map((f, i) => `
    <div class="faq r" data-i="${i}">
      <button class="faq-q" aria-expanded="false" aria-controls="fa${i}">
        <span>${esc(f.q)}</span>
        <i aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M12 5v14M5 12h14"/></svg></i>
      </button>
      <div class="faq-a" id="fa${i}" role="region"><p>${esc(f.a)}</p></div>
    </div>`).join('');
  stagger($$('.faq', host), 60);
  host.addEventListener('click', e => {
    const btn = e.target.closest('.faq-q'); if (!btn) return;
    const item = btn.parentElement, open = item.classList.contains('on');
    $$('.faq', host).forEach(f => { f.classList.remove('on'); $('.faq-q', f).setAttribute('aria-expanded', 'false'); });
    if (!open) { item.classList.add('on'); btn.setAttribute('aria-expanded', 'true'); }
  });
  // ilk soru açık başlasın
  const first = $('.faq', host);
  if (first) { first.classList.add('on'); $('.faq-q', first).setAttribute('aria-expanded', 'true'); }
}

/* ---------- 20c. PAYLAŞ ---------- */
function share() {
  const box = $('#shareBox'); if (!box) return;
  const url = location.href.split('#')[0];
  const txt = `Fit Weekend 2026 — Şehre Fit Bir Dönüş. 18-19-20 Eylül'de Kanyon'da, katılım ücretsiz!`;
  const ico = {
    wa:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.85c0 1.9.53 3.68 1.45 5.2L2 22l5.1-1.6a9.8 9.8 0 004.94 1.32c5.44 0 9.84-4.4 9.84-9.85S17.48 2 12.04 2zm5.7 13.9c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.07-1.83-.11a16.6 16.6 0 01-1.65-.6c-2.9-1.26-4.8-4.2-4.95-4.4-.14-.2-1.18-1.57-1.18-3s.75-2.12 1.02-2.42c.27-.3.58-.37.78-.37h.56c.18 0 .42-.07.66.5.24.6.83 2.03.9 2.18.07.15.12.32.02.52-.1.2-.15.32-.3.5l-.44.5c-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.3 2.36 1.45.3.15.47.13.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.72-.17 1.4z"/></svg>`,
    x:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1-5.7 6.1H1.6l7.5-8.6L1.2 3h6.6l4.5 5.6L17.5 3zm-1.1 16.1h1.8L7.7 4.8H5.8l10.6 14.3z"/></svg>`,
    li:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 102.5 6 2.48 2.48 0 004.98 3.5zM3 8.98h4v12H3zM14.5 8.7c-2 0-3.1 1.05-3.6 1.9V8.98H7v12h4v-6.6c0-1.6.9-2.5 2.2-2.5s2 .9 2 2.55v6.55h4v-7c0-3.4-1.8-4.98-4.7-4.98z"/></svg>`,
    cp:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M6 15H4.5A1.5 1.5 0 013 13.5v-9A1.5 1.5 0 014.5 3h9A1.5 1.5 0 0115 4.5V6"/></svg>`
  };
  const links = [
    { k: 'wa', t: 'WhatsApp', c: '#25D366', h: `https://wa.me/?text=${encodeURIComponent(txt + ' ' + url)}` },
    { k: 'x',  t: 'X',        c: '#111111', h: `https://twitter.com/intent/tweet?text=${encodeURIComponent(txt)}&url=${encodeURIComponent(url)}` },
    { k: 'li', t: 'LinkedIn', c: '#0A66C2', h: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` }
  ];
  box.innerHTML = links.map(l =>
    `<a class="sh mag" href="${l.h}" target="_blank" rel="noopener" style="--sc:${l.c}" aria-label="${l.t}'te paylaş">${ico[l.k]}<span>${l.t}</span></a>`).join('')
    + `<button class="sh mag" id="shCopy" style="--sc:#D62E63" aria-label="Bağlantıyı kopyala">${ico.cp}<span>Linki kopyala</span></button>`
    + (navigator.share ? `<button class="sh mag" id="shNative" style="--sc:#F8971D" aria-label="Paylaş">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v13M12 3L8 7M12 3l4 4M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6"/></svg><span>Paylaş</span></button>` : '');

  const legacyCopy = () => {
    try {
      const t = el('textarea');
      t.value = url;
      t.setAttribute('readonly', '');
      t.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none';
      document.body.appendChild(t);
      t.focus(); t.select(); t.setSelectionRange(0, url.length);
      const ok = document.execCommand('copy');
      t.remove();
      return ok;
    } catch (_) { return false; }
  };
  $('#shCopy').addEventListener('click', async () => {
    let ok = false;
    if (navigator.clipboard && isSecureContext) {
      try { await navigator.clipboard.writeText(url); ok = true; } catch (_) {}
    }
    if (!ok) ok = legacyCopy();
    toast(ok ? 'Bağlantı kopyalandı ✓' : url);
  });
  const nat = $('#shNative');
  if (nat) nat.addEventListener('click', () => navigator.share({ title: 'Fit Weekend 2026', text: txt, url }).catch(() => {}));
}

/* ---------- 21. CONFETTI ---------- */
function confetti() {
  if (REDUCED) return;
  const cv = el('canvas');
  cv.style.cssText = 'position:fixed;inset:0;z-index:965;pointer-events:none';
  document.body.appendChild(cv);
  const ctx = cv.getContext('2d');
  const W = cv.width = innerWidth, H = cv.height = innerHeight;
  const COL = ['#D62E63', '#F8971D', '#B7DE3B', '#2BAE9E', '#FF6B4A', '#FFC9A8'];
  const ps = Array.from({ length: 130 }, () => ({
    x: W / 2 + rnd(-140, 140), y: H * .62, vx: rnd(-9, 9), vy: rnd(-19, -7),
    w: rnd(5, 11), h: rnd(7, 15), a: rnd(0, 6.3), va: rnd(-.22, .22), c: COL[(Math.random() * COL.length) | 0], l: 1
  }));
  let f = 0;
  (function run() {
    ctx.clearRect(0, 0, W, H); f++;
    ps.forEach(p => {
      p.vy += .38; p.x += p.vx; p.y += p.vy; p.vx *= .992; p.a += p.va; p.l -= .0075;
      if (p.l <= 0) return;
      ctx.save(); ctx.globalAlpha = clamp(p.l, 0, 1); ctx.translate(p.x, p.y); ctx.rotate(p.a);
      ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
    });
    if (f < 190) requestAnimationFrame(run); else cv.remove();
  })();
}

/* ---------- 22. AMBIENT THEME SHIFT ---------- */
function ambient() {
  const secs = $$('.xp,.sec,#hero,#final');
  const ob = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const c = getComputedStyle(e.target).getPropertyValue('--amb').trim();
      const meta = $('meta[name=theme-color]');
      if (c && meta) meta.setAttribute('content', c);
    });
  }, { threshold: .5 });
  secs.forEach(s => ob.observe(s));
}

/* ---------- 23. STORY MEDIA PARALLAX ---------- */
function story() {
  const m = $('#storyMedia'); if (!m) return;
  px($('img', m), .09, ' scale(1.16)');
  $$('.fl', m).forEach(f => px(f, +f.dataset.sp || .2));
  stagger($$('.story-lines li'), 110);
  tilt(m, 4);
}

/* ---------- 24. BOOT ---------- */
function start() {
  splitKin();
  watch();
  // hero kinetic in immediately
  requestAnimationFrame(() => $$('#hero .kin,#hero .r').forEach((n, i) => setTimeout(() => n.classList.add('in'), 120 + i * 90)));
}

function init() {
  document.body.classList.add('lock');
  loader();
  marquee(); numbers(); sections(); speakers(); program();
  festivalMap(); sponsors(); community(); join(); faq(); share();
  hero(); story(); nav(); calendar(); cursor(); parallaxLoop(); ambient();
  magnetic();
  // re-scan for late DOM
  setTimeout(() => { watch(); splitKin(); magnetic(); }, 400);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

/* konsol imzası */
console.log('%c Fit Weekend 2026 %c Şehre Fit Bir Dönüş · 18-19-20 Eylül · Kanyon ',
  'background:#D62E63;color:#fff;font-weight:800;padding:4px 8px;border-radius:6px 0 0 6px',
  'background:#241A22;color:#B7DE3B;padding:4px 8px;border-radius:0 6px 6px 0');
})();
