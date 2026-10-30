(() => {
  const PROJECTS = Object.fromEntries(window.PROJECTS.map(p => [p.id, p]));
  const CARTS = window.CARTRIDGES;
  const P = window.PROFILE;

  const $ = s => document.querySelector(s);
  const rack = $('#rack');
  const byte = $('#byte');
  const dialogText = $('#dialogText');
  const game = $('#game');
  const gameInner = $('#gameInner');
  const crtZoom = $('#crtZoom');
  const soundBtn = $('#soundBtn');

  const isTouch = matchMedia('(hover: none) and (pointer: coarse)').matches;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(r => setTimeout(r, reduceMotion ? Math.min(ms, 50) : ms));

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let idx = 1;
  let phase = 'intro';           // intro | select | busy | game
  let rackShown = false;
  let shotIdx = 0;

  /* ================= SES ================= */
  let audio = null;
  let soundOn = false;
  try { soundOn = localStorage.getItem('byteSound') === '1'; } catch (e) {}

  function tone(freq, dur, { type = 'square', vol = .05, slide, delay = 0 } = {}) {
    if (!soundOn) return;
    if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
    const t = audio.currentTime + delay;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slide) osc.frequency.exponentialRampToValueAtTime(slide, t + dur);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(.0001, t + dur);
    osc.connect(gain).connect(audio.destination);
    osc.start(t);
    osc.stop(t + dur + .02);
  }

  const sfx = {
    blip:   () => tone(420 + Math.random() * 180, .035, { vol: .022 }),
    select: () => { tone(660, .06); tone(990, .08, { delay: .06 }); },
    insert: () => { tone(200, .09, { vol: .08, slide: 90 }); tone(120, .14, { vol: .07, delay: .1 }); },
    boot:   () => [523, 659, 784, 1047].forEach((f, i) => tone(f, .12, { delay: i * .09, vol: .04 })),
    eject:  () => tone(260, .2, { slide: 760, vol: .05 }),
    poke:   () => { tone(800, .05); tone(1250, .06, { delay: .05 }); },
    win:    () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, .1, { delay: i * .1, vol: .04, type: 'triangle' })),
    crash:  () => { tone(520, .5, { type: 'sawtooth', slide: 50, vol: .06 }); tone(90, .3, { vol: .08, delay: .45 }); },
    lose:   () => { tone(330, .15, { slide: 220 }); tone(220, .3, { slide: 110, delay: .15 }); }
  };

  // beyaz gürültü (parazit cızırtısı); durdurmak için dönen fonksiyonu çağır
  function hiss(vol = .018) {
    if (!soundOn) return () => {};
    if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
    const buf = audio.createBuffer(1, audio.sampleRate, audio.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = audio.createBufferSource();
    const gain = audio.createGain();
    src.buffer = buf;
    src.loop = true;
    gain.gain.value = vol;
    src.connect(gain).connect(audio.destination);
    src.start();
    return () => {
      gain.gain.setTargetAtTime(.0001, audio.currentTime, .08);
      src.stop(audio.currentTime + .4);
    };
  }

  function setSound(on) {
    soundOn = on;
    soundBtn.classList.toggle('sound-on', on);
    soundBtn.setAttribute('aria-label', on ? 'Sesi kapat' : 'Sesi aç');
    try { localStorage.setItem('byteSound', on ? '1' : '0'); } catch (e) {}
    if (on) { if (audio && audio.state === 'suspended') audio.resume(); sfx.select(); }
  }
  soundBtn.addEventListener('click', () => setSound(!soundOn));
  setSound(soundOn);

  /* ================= BYTE ================= */
  function face(name) { byte.dataset.face = name; }

  function play(cls, ms) {
    byte.classList.remove(cls);
    void byte.offsetWidth;
    byte.classList.add(cls);
    setTimeout(() => byte.classList.remove(cls), ms);
  }

  /* ================= DİYALOG ================= */
  let typing = null;

  function say(text) {
    if (typing) typing.finish(false);
    return new Promise(resolve => {
      let i = 0;
      let timer;
      byte.classList.add('talking');
      const finish = (complete = true) => {
        clearInterval(timer);
        if (complete) dialogText.textContent = text;
        byte.classList.remove('talking');
        typing = null;
        resolve();
      };
      typing = { finish };
      dialogText.textContent = '';
      if (reduceMotion) return finish();
      timer = setInterval(() => {
        dialogText.textContent = text.slice(0, ++i);
        if (i % 2 === 0 && text[i - 1] !== ' ') sfx.blip();
        if (i >= text.length) finish();
      }, 26);
    });
  }

  /* ================= KARTUŞLAR ================= */
  function cartArt(c) {
    const p = PROJECTS[c.id];
    const cover = c.cover || (p && (p.cover || p.screens?.[0] || p.tablet?.[0] || p.media?.[0]?.img));
    const art = cover
      ? `<img src="${esc(cover)}" alt="" loading="lazy">`
      : `<span class="cart__glyph">${esc(c.glyph)}</span>`;
    return art + (p?.status === 'wip' ? '<span class="cart__wip">YAPIM AŞAMASINDA</span>' : '');
  }

  const cartEls = CARTS.map((c, i) => {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'cart';
    el.style.setProperty('--c', c.color);
    el.setAttribute('role', 'option');
    el.setAttribute('aria-label', c.label);
    el.innerHTML = `
      <span class="cart__body"></span>
      <span class="cart__label">
        <span class="cart__art">${cartArt(c)}</span>
        <span class="cart__name">${esc(c.label)}</span>
      </span>
      <span class="cart__ridges"></span>`;
    el.addEventListener('click', () => {
      if (phase === 'intro') return skipIntro();
      if (phase !== 'select') return;
      i === idx ? insert() : select(i);
    });
    rack.appendChild(el);
    return el;
  });

  function cartWidth() {
    return parseFloat(getComputedStyle(cartEls[0]).width);
  }

  function layout() {
    const n = CARTS.length;
    const cw = cartWidth();
    const maxVis = innerWidth < 760 ? 1 : 2;
    const gap = innerWidth < 760 ? 1.08 : 1.02;

    cartEls.forEach((el, i) => {
      let o = i - idx;
      if (o > n / 2) o -= n;
      if (o < -n / 2) o += n;
      const a = Math.abs(o);
      const x = o * cw * gap;
      const y = a * a * cw * .055 + (o === 0 ? -cw * .1 : 0);
      const r = o * 5;
      const s = o === 0 ? 1.12 : .9;
      const hidden = a > maxVis + (innerWidth < 760 ? .9 : 0);

      el.style.transitionDelay = rackShown ? '0s' : '';
      el.style.transform = rackShown
        ? `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})`
        : `translate(${x}px, ${y - cw}px) rotate(${r}deg) scale(${s * .6})`;
      el.style.opacity = !rackShown || hidden ? 0 : a > maxVis ? .55 : 1;
      el.style.zIndex = 20 - a;
      el.tabIndex = o === 0 ? 0 : -1;
      el.classList.toggle('is-active', o === 0);
      el.setAttribute('aria-selected', o === 0);
      el.style.pointerEvents = hidden ? 'none' : '';
    });
    cartCount.textContent = `${String(idx + 1).padStart(2, '0')} / ${n}`;
  }

  const cartCount = $('#cartCount');

  function showRack() {
    if (rackShown) return;
    rackShown = true;
    cartEls.forEach(el => {
      let o = Math.abs(cartEls.indexOf(el) - idx);
      el.style.transitionDelay = `${Math.min(o, 3) * 90}ms`;
    });
    requestAnimationFrame(() => {
      const delays = cartEls.map(el => el.style.transitionDelay);
      layout();
      cartEls.forEach((el, i) => { el.style.transitionDelay = delays[i]; });
    });
  }

  function select(i) {
    const n = CARTS.length;
    idx = (i + n) % n;
    layout();
    sfx.select();
    face('wow');
    say(CARTS[idx].line).then(() => { if (phase === 'select') face('idle'); });
  }

  /* ================= INTRO ================= */
  const introLines = [
    'Selam! Ben BYTE, Buğra\'nın cep konsolu.',
    'Onun yaptığı projeleri kartuş olarak saklıyorum.',
    isTouch
      ? 'Bir kartuşa dokun, sonra tekrar dokunup bana tak!'
      : '◀ ▶ ile bir kartuş seç, Enter ile bana tak!'
  ];
  let introCancelled = false;

  async function intro() {
    const boot = $('#boot');
    boot.classList.add('on');
    await wait(700);
    sfx.boot();
    await wait(500);
    face('happy');
    play('waving', 2100);
    for (let i = 0; i < introLines.length; i++) {
      if (introCancelled) return;
      await say(introLines[i]);
      if (i === 0) showRack();
      if (introCancelled) return;
      await wait(i === introLines.length - 1 ? 0 : 1100);
    }
    if (!introCancelled) { phase = 'select'; face('idle'); }
  }

  function skipIntro() {
    if (phase !== 'intro') return;
    introCancelled = true;
    showRack();
    phase = 'select';
    face('idle');
    say(introLines[2]);
  }

  /* ================= TAKMA / ÇIKARMA ================= */
  function flyingClone(el) {
    const r = el.getBoundingClientRect();
    const cw = cartWidth();
    const clone = el.cloneNode(true);
    clone.classList.add('is-flying');
    clone.classList.remove('is-active', 'is-gone');
    clone.style.cssText = `--c:${CARTS[idx].color};--cw:${cw}px;left:0;top:0;width:${cw}px;transform:none;opacity:1;`;
    document.body.appendChild(clone);
    const h = clone.offsetHeight;
    return { clone, r, cw, h };
  }

  // kartuşun rafta (dönmüş/ölçekli) durduğu konum
  function rackPose(r, cw, h) {
    const s = r.width / cw;
    return `translate(${r.left + (r.width - cw * s) / 2}px, ${r.top + (r.height - h * s) / 2}px) scale(${s})`;
  }

  function slotGeom(cw, h) {
    const sr = $('#slot').getBoundingClientRect();
    const s = (sr.width * .82) / cw;
    const x = sr.left + sr.width / 2 - (cw * s) / 2;
    const top = sr.top + sr.height * .3;
    return { s, x, top, th: h * s };
  }

  async function insert() {
    if (phase !== 'select') return;
    phase = 'busy';
    const cart = CARTS[idx];
    const el = cartEls[idx];
    const { clone, r, cw, h } = flyingClone(el);
    el.classList.add('is-gone');
    const g = slotGeom(cw, h);
    const above = `translate(${g.x}px, ${g.top - g.th}px) scale(${g.s})`;
    const inside = `translate(${g.x}px, ${g.top}px) scale(${g.s})`;

    face('wow');
    sfx.select();
    say('Nom nom...');

    await clone.animate(
      [{ transform: rackPose(r, cw, h) + ' rotate(0deg)' }, { transform: above + ' rotate(0deg)' }],
      { duration: 520, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' }
    ).finished;

    await clone.animate(
      [
        { transform: above,  clipPath: 'inset(0 0 0 0)' },
        { transform: inside, clipPath: 'inset(0 0 100% 0)' }
      ],
      { duration: 260, easing: 'linear', fill: 'forwards' }
    ).finished;
    clone.remove();

    byte.style.setProperty('--slot-c', cart.color);
    byte.classList.add('has-cart');
    sfx.insert();
    play('jump', 500);
    face('load');
    await say('Yükleniyor!');
    await wait(500);
    await zoomIntoScreen();
    openGame(cart);
  }

  async function zoomIntoScreen() {
    const sr = $('#screen').getBoundingClientRect();
    crtZoom.style.cssText = `left:${sr.left}px;top:${sr.top}px;width:${sr.width}px;height:${sr.height}px;opacity:1;`;
    sfx.boot();
    await crtZoom.animate(
      [
        { left: sr.left + 'px', top: sr.top + 'px', width: sr.width + 'px', height: sr.height + 'px', background: '#ffcf6b', borderRadius: '6px' },
        { offset: .25, background: '#fff' },
        { left: '0px', top: '0px', width: innerWidth + 'px', height: innerHeight + 'px', background: '#17121f', borderRadius: '0px' }
      ],
      { duration: reduceMotion ? 1 : 520, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' }
    ).finished;
  }

  async function eject() {
    if (phase !== 'game') return;
    phase = 'busy';
    sfx.eject();
    game.classList.add('is-closing');
    await wait(380);
    game.hidden = true;
    game.classList.remove('is-closing');
    crtZoom.getAnimations().forEach(a => a.cancel());
    crtZoom.style.opacity = 0;

    const el = cartEls[idx];
    const { clone, r, cw, h } = flyingClone(el);
    const g = slotGeom(cw, h);
    const above = `translate(${g.x}px, ${g.top - g.th}px) scale(${g.s})`;
    const inside = `translate(${g.x}px, ${g.top}px) scale(${g.s})`;
    byte.classList.remove('has-cart');
    face('happy');
    play('jump', 500);

    await clone.animate(
      [
        { transform: inside, clipPath: 'inset(0 0 100% 0)' },
        { transform: above,  clipPath: 'inset(0 0 0 0)' }
      ],
      { duration: 220, easing: 'ease-out', fill: 'forwards' }
    ).finished;
    await clone.animate(
      [{ transform: above }, { transform: rackPose(r, cw, h) }],
      { duration: 480, easing: 'cubic-bezier(.34,1.3,.64,1)', fill: 'forwards' }
    ).finished;
    el.classList.remove('is-gone');
    clone.remove();

    phase = 'select';
    await say(pick(['Tamamdır! Başka bir tane?', 'Güzeldi değil mi? Sıradaki!', 'Kartuş sağ salim çıktı. Bir tane daha?']));
    face('idle');
  }

  /* ================= OYUN EKRANI ================= */
  const btnA = (label, attrs = '') => `<a class="g-btn g-btn--a" ${attrs}><kbd>A</kbd>${esc(label)}</a>`;
  const btnB = `<button type="button" class="g-btn g-btn--b" data-eject><kbd>B</kbd>Çıkar</button>`;
  const tags = list => `<ul class="g-tags">${list.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;

  // iframe içinde açılmayı engelleyen siteler
  const NO_EMBED = ['activetheory.net', 'derinet.com.tr', 'webflow.io'];
  const EMBED_W = 1280;

  function fitPreview() {
    const view = gameInner.querySelector('.g-window__view');
    const frame = view && view.querySelector('iframe');
    if (frame) frame.style.transform = `scale(${view.clientWidth / EMBED_W})`;
  }

  // projenin ekran görüntüsü / medya listesi (◀ ▶ ile gezilir)
  function slidesOf(p) {
    return p ? (p.screens || p.tablet || p.media || null) : null;
  }

  function slideHTML(item, alt) {
    if (typeof item === 'string') return `<img src="${esc(item)}" alt="${esc(alt)}">`;
    if (item.video) return `<video src="${esc(item.video)}" poster="${esc(item.img)}" autoplay muted loop playsinline></video>`;
    return `<img src="${esc(item.img)}" alt="${esc(alt)}">`;
  }

  // innerHTML ile eklenen videolar her tarayıcıda kendiliğinden başlamıyor
  function playVideos() {
    gameInner.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.play().catch(() => {});
    });
  }

  function dots(list) {
    if (list.length < 2) return '';
    return `<div class="g-dots">${list.map((_, i) => `<button type="button" data-shot="${i}" class="${i ? '' : 'on'}" aria-label="Görsel ${i + 1}"></button>`).join('')}</div>`;
  }

  function projectScreen(c, p) {
    // relative URLs point at the local copies in "işler liste yedek"; show the project folder instead of a host
    const u = p.url ? new URL(p.url, location.href) : null;
    const local = !!u && u.origin === location.origin;
    const segs = u ? u.pathname.split('/').map(decodeURIComponent) : [];
    const host = !u ? '' : local ? 'yerel kopya · ' + (segs[segs.indexOf('projeler') + 1] || p.name) : u.host.replace(/^www\./, '');
    const slides = slidesOf(p);
    const alt = `${p.name} ekran görüntüsü`;
    // https sitede http sayfa çerçevede açılmaz (karışık içerik); onlarda sadece görsel gösterilir
    const live = p.url && !p.offline && p.url.startsWith('https:') && !NO_EMBED.some(h => host.endsWith(h));
    let visual;

    if (p.game) {
      visual = `<div><div class="g-phone g-phone--game"><iframe src="${esc(p.game)}" title="${esc(p.name)} oyunu" allow="autoplay"></iframe></div>
        <p class="g-note">Ekrana tıkla ve oyna · sürükle ya da ◀ ▶</p></div>`;
    } else if (p.screens) {
      visual = `<div><div class="g-phone"><div class="g-slide" id="shot">${slideHTML(p.screens[0], alt)}</div></div>${dots(p.screens)}</div>`;
    } else if (p.tablet) {
      visual = `<div class="g-tablet-wrap"><div class="g-tablet"><div class="g-slide" id="shot">${slideHTML(p.tablet[0], alt)}</div></div>${dots(p.tablet)}</div>`;
    } else if (p.media) {
      visual = `<div class="g-tablet-wrap"><div class="g-window">
           <div class="g-window__bar"><i></i><i></i><i></i><span class="g-window__url">${esc(host || p.name)}</span></div>
           <div class="g-window__view g-slide" id="shot">${slideHTML(p.media[0], alt)}</div>
           ${p.status === 'wip' ? '<span class="g-wip">YAPIM AŞAMASINDA</span>' : ''}
         </div>${dots(p.media)}</div>`;
    } else {
      visual = `<div class="g-window">
           <div class="g-window__bar"><i></i><i></i><i></i><span class="g-window__url">${esc(host || p.name)}</span></div>
           <div class="g-window__view">${p.cover ? `<img class="g-poster" src="${esc(p.cover)}" alt="${esc(p.name)} ekran görüntüsü">` : `<b>${esc(c.glyph)}</b>`}<small>${esc(p.offline ? 'Canlı site şu an yayında değil' : p.name + ' — ' + p.subtitle)}</small>
             ${live ? `<iframe src="${esc(p.url)}" title="${esc(p.name)} önizleme" loading="lazy" tabindex="-1" sandbox="allow-scripts allow-same-origin"></iframe>` : ''}
           </div>
         </div>`;
    }

    const primary =
      p.url && !p.offline ? btnA('Siteye git', `href="${esc(p.url)}" target="_blank" rel="noopener"`) :
      p.game              ? btnA('Tam ekran oyna', `href="${esc(p.game)}" target="_blank" rel="noopener"`) :
      slides && slides.length > 1 ? btnA('Sonraki görsel', 'href="#" data-next-shot') : '';

    return `
      <div class="g-visual">${visual}</div>
      <div class="g-info">
        <span class="g-cat">${esc(p.platform || p.category)}</span>
        ${p.status === 'wip' ? '<span class="g-cat g-cat--wip">● Geliştiriliyor</span>' : ''}
        <h2 class="g-title">${esc(p.name)}</h2>
        <p class="g-sub">${esc(p.subtitle)}</p>
        <p class="g-desc">${esc(p.desc)}</p>
        ${p.offline ? '<p class="g-offline">⚠ Bu projenin canlı sitesine şu an ulaşılamıyor.</p>' : ''}
        ${tags(p.tags)}
        <div class="g-actions">${primary}${btnB}</div>
      </div>`;
  }

  function aboutScreen() {
    return `
      <div class="g-visual"><div class="g-photo"><img src="${esc(P.photo)}" alt="${esc(P.name)}"><span>OYUNCU 1</span></div></div>
      <div class="g-info">
        <span class="g-cat">Hakkımda</span>
        <h2 class="g-title">${esc(P.name)}</h2>
        <p class="g-sub">${esc(P.role)} · ${esc(P.location)}</p>
        ${P.about.map(t => `<p class="g-desc">${esc(t)}</p>`).join('')}
        <h3 class="g-h">Deneyim</h3>
        <ul class="g-exp">${P.experience.map(e => `<li><b>${esc(e.title)}</b><span>${esc(e.years)} · ${esc(e.place)}</span><p>${esc(e.text)}</p></li>`).join('')}</ul>
        <h3 class="g-h">Eğitim & Sertifikalar</h3>
        <ul class="g-exp">${P.education.map(e => `<li><b>${esc(e.title)}</b><span>${esc(e.years)} · ${esc(e.place)}</span></li>`).join('')}</ul>
        <div class="g-actions">${btnA('E-posta gönder', `href="mailto:${esc(P.email)}"`)}${btnB}</div>
      </div>`;
  }

  function contactScreen() {
    return `
      <div class="g-visual"><div class="g-mailbox" aria-hidden="true">@</div></div>
      <div class="g-info">
        <span class="g-cat">İletişim</span>
        <h2 class="g-title">Hadi konuşalım!</h2>
        <p class="g-sub">Yeni bir proje, işbirliği ya da sadece bir selam.</p>
        <ul class="g-contact">
          <li><span>E-posta</span><a href="mailto:${esc(P.email)}">${esc(P.email)}</a><button type="button" class="g-copy" data-copy="${esc(P.email)}">Kopyala</button></li>
          <li><span>Telefon</span><a href="${esc(P.phoneHref)}">${esc(P.phone)}</a></li>
          <li><span>GitHub</span><a href="${esc(P.github)}" target="_blank" rel="noopener">github.com/BugraYetis</a></li>
          <li><span>LinkedIn</span><a href="${esc(P.linkedin)}" target="_blank" rel="noopener">Buğra Yetiş</a></li>
        </ul>
        <div class="g-actions">${btnA('E-posta gönder', `href="mailto:${esc(P.email)}"`)}${btnB}</div>
      </div>`;
  }

  // beceriler: oyun karakteri istatistik ekranı gibi
  function skillsScreen() {
    const all = P.skills.flatMap(g => g.items);
    const avg = Math.round(all.reduce((t, [, v]) => t + v, 0) / all.length);
    return `
      <div class="g-visual"><div class="g-level">
        <span>SEVİYE</span><b>${Math.round(avg / 10)}</b><i>${all.length} yetenek · ort. %${avg}</i>
      </div></div>
      <div class="g-info">
        <span class="g-cat">Beceriler</span>
        <h2 class="g-title">Neler yapabilirim?</h2>
        <p class="g-sub">Karakter istatistikleri</p>
        ${P.skills.map(g => `
          <h3 class="g-h">${esc(g.icon)} ${esc(g.title)}</h3>
          <ul class="g-stats">${g.items.map(([n, v]) => `
            <li><span>${esc(n)}</span><i style="--v:${v}%"></i><b>${v}</b></li>`).join('')}
          </ul>`).join('')}
        <div class="g-actions">${btnB}</div>
      </div>`;
  }

  function openGame(c) {
    shotIdx = 0;
    game.style.setProperty('--c', c.color);
    gameInner.innerHTML =
      c.kind === 'about'   ? aboutScreen() :
      c.kind === 'contact' ? contactScreen() :
      c.kind === 'skills'  ? skillsScreen() :
      projectScreen(c, PROJECTS[c.id]);
    game.scrollTop = 0;
    game.hidden = false;
    fitPreview();
    playVideos();
    startStatic();
    const frame = gameInner.querySelector('.g-window__view iframe');
    if (frame) frame.addEventListener('load', () => frame.classList.add('is-loaded'), { once: true });
    phase = 'game';
    face('happy');
    const first = gameInner.querySelector('.g-btn');
    if (first && !isTouch) first.focus({ preventScroll: true });
  }

  /* ================= PARAZİT ================= */
  const STATIC_MS = 1000;

  // görselin üstüne hareketli TV paraziti koyar, süre dolunca titreyerek netleşir
  function addStatic(box) {
    const wrap = document.createElement('div');
    wrap.className = 'g-static';
    wrap.innerHTML = '<canvas width="120" height="90"></canvas><span>SİNYAL ARANIYOR</span><i></i>';
    box.appendChild(wrap);

    const ctx = wrap.firstChild.getContext('2d');
    const img = ctx.createImageData(120, 90);
    let last = 0;
    (function draw(t) {
      if (!wrap.isConnected) return;
      if (t - last > 45) {
        last = t;
        const band = (t / 9) % 110 - 10;
        for (let y = 0; y < 90; y++) {
          const boost = Math.abs(y - band) < 6 ? 70 : 0;
          for (let x = 0; x < 120; x++) {
            const v = Math.min(255, Math.random() * 215 + boost);
            const o = (y * 120 + x) * 4;
            img.data[o] = img.data[o + 1] = img.data[o + 2] = v;
            img.data[o + 3] = 255;
          }
        }
        ctx.putImageData(img, 0, 0);
      }
      requestAnimationFrame(draw);
    })(0);

    return () => {
      wrap.classList.add('is-clearing');
      setTimeout(() => wrap.remove(), 300);
    };
  }

  function startStatic() {
    game.classList.remove('is-clear');
    const boxes = gameInner.querySelectorAll('.g-phone, .g-tablet, .g-window__view, .g-photo');
    const clears = [...boxes].map(addStatic);
    const stopHiss = hiss();
    const opened = gameInner;
    setTimeout(() => {
      stopHiss();
      if (phase !== 'game' || gameInner !== opened) return;
      clears.forEach(c => c());
      game.classList.add('is-clear');   // tarama çizgileri de kalksın, ekran net kalsın
    }, reduceMotion ? 0 : STATIC_MS);
  }

  function showShot(i) {
    const p = PROJECTS[CARTS[idx].id];
    const slides = slidesOf(p);
    if (!slides || slides.length < 2) return;
    shotIdx = (i + slides.length) % slides.length;
    $('#shot').innerHTML = slideHTML(slides[shotIdx], `${p.name} ekran görüntüsü`);
    playVideos();
    gameInner.querySelectorAll('[data-shot]').forEach((d, j) => d.classList.toggle('on', j === shotIdx));
    sfx.blip();
  }

  gameInner.addEventListener('click', e => {
    const t = e.target.closest('[data-eject],[data-shot],[data-next-shot],[data-copy]');
    if (!t) return;
    if (t.hasAttribute('data-eject')) return eject();
    if (t.hasAttribute('data-shot')) return showShot(+t.dataset.shot);
    if (t.hasAttribute('data-next-shot')) { e.preventDefault(); return showShot(shotIdx + 1); }
    if (t.hasAttribute('data-copy')) {
      navigator.clipboard?.writeText(t.dataset.copy).then(() => {
        t.textContent = 'Kopyalandı!';
        sfx.select();
        setTimeout(() => { t.textContent = 'Kopyala'; }, 1600);
      }).catch(() => {});
    }
  });

  /* ================= ÇÖKME / YENİDEN BAŞLATMA ================= */
  const restartBtn = $('#restartBtn');

  // odadaki bir eşya BYTE'ın kafasına düşünce (oda.js çağırır)
  function crash(what = 'bir şey') {
    if (phase !== 'select' && phase !== 'intro') return false;
    if (phase === 'intro') { introCancelled = true; showRack(); }
    phase = 'crashed';
    sfx.crash();
    byte.classList.remove('jump', 'shake', 'dance', 'waving');
    byte.classList.add('is-crashed');
    face('dead');
    restartBtn.hidden = false;
    say(`KRİTİK HATA! Kafama ${what} düştü... Sistem çöktü, yeniden başlatmam gerekiyor.`);
    return true;
  }

  async function restart() {
    if (phase !== 'crashed') return;
    phase = 'busy';
    restartBtn.hidden = true;
    sfx.boot();
    byte.classList.remove('is-crashed');
    byte.classList.add('is-rising');
    document.dispatchEvent(new CustomEvent('byte:restart'));
    face('load');
    await say('Yeniden başlatılıyor...');
    await wait(500);
    byte.classList.remove('is-rising');
    phase = 'select';
    face('happy');
    play('jump', 500);
    await say('Tamamdır, yeniden açıldım! Eşyaları da yerine koydum. Bir daha kafama atma lütfen.');
    if (phase === 'select') face('idle');
  }

  restartBtn.addEventListener('click', restart);

  /* ================= KONTROLLER ================= */
  function press(key) {
    if (phase === 'crashed') {
      if (key === 'a') restart();
      return;
    }
    if (phase === 'intro') {
      if (key === 'left' || key === 'right' || key === 'a') skipIntro();
      return;
    }
    if (phase === 'select') {
      if (key === 'left')  select(idx - 1);
      if (key === 'right') select(idx + 1);
      if (key === 'a')     insert();
      if (key === 'b')     { face('wow'); say('Henüz takılı bir kartuş yok ki!').then(() => face('idle')); }
      return;
    }
    if (phase === 'game') {
      if (key === 'b') eject();
      if (key === 'a') gameInner.querySelector('.g-btn--a')?.click();
      if (key === 'left')  showShot(shotIdx - 1);
      if (key === 'right') showShot(shotIdx + 1);
    }
  }

  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiPos = 0;

  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    // mini oyun açıkken ya da odadaki bir öğe odaktayken tuşlar onlara ait
    if (document.body.classList.contains('arcade-open') || e.target.closest?.('.pc-game')) return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;

    konamiPos = k === konami[konamiPos] ? konamiPos + 1 : (k === konami[0] ? 1 : 0);
    if (konamiPos === konami.length) {
      konamiPos = 0;
      if (phase === 'select') {
        face('happy');
        play('dance', 3300);
        sfx.win();
        say('KONAMI KODU! +30 can kazandın. Buğra bunu bilerek koydu.');
      }
      return;
    }

    const map = { ArrowLeft: 'left', ArrowRight: 'right', Enter: 'a', ' ': 'a', a: 'a', b: 'b', Escape: 'b', Backspace: 'b' };
    const key = map[k];
    if (!key) return;
    // oyun ekranında Enter/Space odaktaki butonu kendisi tetikler
    if (phase === 'game' && (k === 'Enter' || k === ' ') && document.activeElement?.closest('.g-btn,.g-copy,[data-shot]')) return;
    // Konami dizisinin sondaki b/a tuşları kartuşu tetiklemesin
    if ((k === 'b' || k === 'a') && konamiPos >= konami.length - 2) return;
    e.preventDefault();
    press(key);
  });

  document.querySelectorAll('.pad__btn').forEach(b => b.addEventListener('click', () => press(b.dataset.key)));

  // rafta kaydırma (dokunmatik)
  let touchX = null;
  rack.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  rack.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 40 && phase === 'select') select(idx + (dx < 0 ? 1 : -1));
  });

  // BYTE'a dokununca
  const pokes = ['Hey! Gıdıklanıyorum.', 'Pilim %100, seninki?', 'Bir kartuş daha yiyebilirim.', 'Konami kodunu biliyor musun? ↑↑↓↓←→←→BA', 'Bip bop. Bu benim dilimde "merhaba" demek.'];
  let pokeI = 0;
  byte.addEventListener('click', () => {
    if (phase === 'intro') return skipIntro();
    if (phase === 'crashed') return say('Bzzt... Beni ayağa kaldırmak için ↻ Yeniden başlat butonuna bas.');
    if (phase !== 'select') return;
    sfx.poke();
    play(pokeI % 2 ? 'shake' : 'jump', 500);
    face('happy');
    say(pokes[pokeI++ % pokes.length]).then(() => setTimeout(() => { if (phase === 'select') face('idle'); }, 600));
  });

  // geri tuşu / bfcache
  window.addEventListener('pageshow', e => { if (e.persisted && phase === 'busy') location.reload(); });

  /* ================= TOZ ================= */
  const dust = $('#dust');
  for (let i = 0; i < 26; i++) {
    const d = document.createElement('i');
    d.style.left = Math.random() * 100 + '%';
    d.style.top = 30 + Math.random() * 65 + '%';
    d.style.setProperty('--d', 9 + Math.random() * 10 + 's');
    d.style.setProperty('--delay', -Math.random() * 15 + 's');
    d.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
    dust.appendChild(d);
  }

  let resizeT;
  addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(() => { layout(); fitPreview(); }, 80); });

  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  // oda.js ve arcade.js için
  window.BYTE = { crash, sfx, say };

  layout();
  intro();
})();
