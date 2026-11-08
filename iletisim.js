// Ziyaret kaydı ve "Benimle İletişime Geç" formu. [data-iletisim] olan her öğe formu açar.
(function () {
  const script = document.currentScript;
  const page = script.dataset.page || 'giris';
  const cfg = window.PORTFOY_BACKEND || {};
  const CONTACT_MAIL = cfg.adminEmail || '';
  const KVKK_URL = page === 'adventure' ? '../kvkk' : 'kvkk';

  function store(key, value) {
    try {
      if (value !== undefined) localStorage.setItem(key, value);
      return localStorage.getItem(key);
    } catch (e) { return value || null; }
  }

  function visitorId() {
    let id = store('portfoy-ziyaretci');
    if (!id) {
      id = (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
      id = store('portfoy-ziyaretci', id) || id;
    }
    return id;
  }

  function post(table, body) {
    return fetch(cfg.url + '/rest/v1/' + table, {
      method: 'POST',
      keepalive: true,
      headers: { apikey: cfg.key, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(body)
    }).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); });
  }

  /* --- Ziyaret kaydı --- */
  function deviceInfo() {
    const ua = navigator.userAgent;
    const tablet = /iPad|Tablet/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) || (/Android/i.test(ua) && !/Mobile/i.test(ua));
    const mobile = /Mobi|iPhone|Android/i.test(ua);
    const browser = /Edg\//.test(ua) ? 'Edge' : /OPR\//.test(ua) ? 'Opera' : /SamsungBrowser/.test(ua) ? 'Samsung' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Diğer';
    const os = /Windows/.test(ua) ? 'Windows' : /iPhone|iPad/.test(ua) || tablet && /Macintosh/.test(ua) ? 'iOS' : /Android/.test(ua) ? 'Android' : /Mac OS/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'Diğer';
    return { device: tablet ? 'Tablet' : mobile ? 'Mobil' : 'Masaüstü', browser, os };
  }

  function externalReferrer() {
    try {
      const host = new URL(document.referrer).host;
      return host && host !== location.host ? host.slice(0, 200) : null;
    } catch (e) { return null; }
  }

  function track() {
    if (!cfg.url || !cfg.key || location.hostname !== 'bugrayetis.github.io') return;
    if (store('portfoy-sahibi') === '1') return; // panele giriş yapılan tarayıcı sayılmaz
    post('visits', Object.assign({
      visitor_id: visitorId(),
      page,
      referrer: externalReferrer(),
      language: (navigator.language || '').slice(0, 20),
      screen: screen.width + 'x' + screen.height,
      timezone: (Intl.DateTimeFormat().resolvedOptions().timeZone || '').slice(0, 60)
    }, deviceInfo())).catch(() => {});
  }

  /* --- Form --- */
  const CSS = `
    .ilt-back { position: fixed; inset: 0; z-index: 100000; display: flex; align-items: center; justify-content: center; padding: 16px;
      background: rgba(5,5,8,.72); backdrop-filter: blur(8px); opacity: 0; transition: opacity .2s; overflow-y: auto; }
    .ilt-back.is-open { opacity: 1; }
    .ilt-modal { --a: #6c63ff; --a2: #ff6584; --ink: #e8e8f0; --mut: #9a9ab8; --bd: rgba(108,99,255,.28); --sf: #11111f; --fld: #0b0b14; --r: 18px;
      font-family: 'Space Grotesk', sans-serif; position: relative; width: 100%; max-width: 480px; margin: auto; padding: 32px; color: var(--ink);
      background: var(--sf); border: 1px solid var(--bd); border-radius: var(--r); box-shadow: 0 40px 100px rgba(0,0,0,.55); transform: translateY(14px); transition: transform .25s; }
    .ilt-back.is-open .ilt-modal { transform: none; }
    .ilt-modal[data-tema="adventure"] { --a: #ffb547; --a2: #ff6b5b; --ink: #f5ecdc; --mut: #b6a9c9; --bd: rgba(255,181,71,.35); --sf: #1b1526; --fld: #14101c; --r: 8px; font-family: 'JetBrains Mono', monospace; }
    .ilt-modal h2 { font-size: 1.5rem; font-weight: 700; margin: 0 0 6px; font-family: inherit; }
    .ilt-modal > p { color: var(--mut); font-size: .92rem; line-height: 1.5; margin: 0 0 22px; }
    .ilt-x { position: absolute; top: 14px; right: 14px; width: 36px; height: 36px; border: 0; border-radius: 8px; background: transparent; color: var(--mut); font-size: 1.3rem; line-height: 1; cursor: pointer; }
    .ilt-x:hover { color: var(--ink); background: rgba(255,255,255,.06); }
    .ilt-f { display: block; margin-bottom: 14px; font-size: .8rem; color: var(--mut); }
    .ilt-f span { display: block; margin-bottom: 6px; }
    .ilt-f input, .ilt-f textarea { width: 100%; box-sizing: border-box; padding: 12px 14px; font: inherit; font-size: 16px; color: var(--ink); background: var(--fld); border: 1px solid var(--bd); border-radius: 10px; outline: none; }
    .ilt-f textarea { min-height: 120px; resize: vertical; }
    .ilt-f input:focus, .ilt-f textarea:focus { border-color: var(--a); box-shadow: 0 0 0 3px rgba(108,99,255,.2); }
    .ilt-hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
    .ilt-send { width: 100%; padding: 14px; border: 0; border-radius: 10px; font: inherit; font-weight: 600; color: #fff; background: linear-gradient(135deg, var(--a), var(--a2)); cursor: pointer; }
    .ilt-modal[data-tema="adventure"] .ilt-send { color: #14101c; }
    .ilt-send:disabled { opacity: .6; cursor: wait; }
    .ilt-note { margin: 10px 0 0; font-size: .75rem; line-height: 1.45; color: var(--mut); text-align: center; }
    .ilt-note a { color: inherit; }
    .ilt-kvkk { position: fixed; left: 12px; bottom: max(8px, env(safe-area-inset-bottom)); z-index: 9000; font: 11px/1.4 'Space Grotesk', sans-serif; color: rgba(232,232,240,.6); text-decoration: underline; }
    .ilt-kvkk:hover { color: #fff; }
    .ilt-err { margin: 12px 0 0; font-size: .85rem; color: #ff8fa3; }
    .ilt-err a { color: inherit; }
    .ilt-ok { text-align: center; padding: 24px 0 8px; }
    .ilt-ok b { display: block; font-size: 1.25rem; margin-bottom: 8px; }
    .ilt-ok p { color: var(--mut); margin: 0; }
  `;

  let back = null, lastFocus = null;

  function injectCss() {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function addKvkkLink() {
    const a = document.createElement('a');
    a.className = 'ilt-kvkk';
    a.href = KVKK_URL;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'KVKK Aydınlatma Metni';
    document.body.appendChild(a);
  }

  function build() {

    back = document.createElement('div');
    back.className = 'ilt-back';
    back.hidden = true;
    back.innerHTML = `
      <div class="ilt-modal" role="dialog" aria-modal="true" aria-labelledby="iltTitle" data-tema="${page === 'adventure' ? 'adventure' : 'normal'}">
        <button type="button" class="ilt-x" aria-label="Kapat">×</button>
        <h2 id="iltTitle">Benimle iletişime geç</h2>
        <p>Formu doldur, sana en kısa sürede dönüş yapayım.</p>
        <form novalidate>
          <label class="ilt-f"><span>Ad Soyad</span><input name="name" required minlength="2" maxlength="100" autocomplete="name"></label>
          <label class="ilt-f"><span>E-posta</span><input name="email" type="email" required maxlength="200" autocomplete="email"></label>
          <label class="ilt-f"><span>Telefon (isteğe bağlı)</span><input name="phone" type="tel" maxlength="30" autocomplete="tel"></label>
          <label class="ilt-f"><span>Mesajın</span><textarea name="message" required minlength="5" maxlength="5000"></textarea></label>
          <label class="ilt-hp" aria-hidden="true">Web sitesi<input name="website" tabindex="-1" autocomplete="off"></label>
          <button type="submit" class="ilt-send">Gönder</button>
          <p class="ilt-note">Göndererek bilgilerinin <a href="${KVKK_URL}" target="_blank" rel="noopener">KVKK Aydınlatma Metni</a> kapsamında işleneceğini bilirsin.</p>
          <p class="ilt-err" role="alert" hidden></p>
        </form>
      </div>`;
    document.body.appendChild(back);

    const modal = back.firstElementChild;
    modal.querySelector('.ilt-x').addEventListener('click', close);
    back.addEventListener('mousedown', e => { if (e.target === back) close(); });
    // sayfanın klavye kısayolları (Adventure Mode) form yazılırken çalışmasın
    ['keydown', 'keyup', 'keypress'].forEach(t => back.addEventListener(t, e => {
      e.stopPropagation();
      if (t === 'keydown' && e.key === 'Escape') close();
    }));
    modal.querySelector('form').addEventListener('submit', submit);
  }

  function open(e) {
    e.preventDefault();
    if (!back) build();
    lastFocus = document.activeElement;
    back.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      back.classList.add('is-open');
      back.querySelector('input[name="name"]').focus();
    });
  }

  function close() {
    back.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    const closing = back;
    setTimeout(() => {
      closing.hidden = true;
      if (closing.querySelector('.ilt-ok')) { closing.remove(); if (back === closing) back = null; } // sonraki açılışta boş form gelsin
    }, 220);
    if (lastFocus) lastFocus.focus();
  }

  function showError(form, html) {
    const el = form.querySelector('.ilt-err');
    el.innerHTML = html;
    el.hidden = false;
  }

  function success(form) {
    const modal = form.parentElement;
    form.remove();
    modal.querySelector('p').remove();
    modal.querySelector('h2').hidden = true;
    modal.insertAdjacentHTML('beforeend', '<div class="ilt-ok"><b>Mesajın ulaştı, teşekkürler!</b><p>En kısa sürede sana dönüş yapacağım.</p></div>');
  }

  function submit(e) {
    e.preventDefault();
    const form = e.target;
    const f = form.elements;
    if (!form.checkValidity()) {
      const bad = form.querySelector(':invalid');
      const msg = bad.name === 'email' ? 'Geçerli bir e-posta adresi yaz.' : bad.name === 'name' ? 'Adını yaz.' : 'Mesajını yaz (en az 5 karakter).';
      showError(form, msg);
      bad.focus();
      return;
    }
    if (f.website.value) { success(form); return; } // bot tuzağı

    const btn = form.querySelector('.ilt-send');
    btn.disabled = true;
    btn.textContent = 'Gönderiliyor…';
    form.querySelector('.ilt-err').hidden = true;

    const fail = () => {
      btn.disabled = false;
      btn.textContent = 'Gönder';
      showError(form, `Mesaj gönderilemedi. Tekrar dene ya da <a href="mailto:${CONTACT_MAIL}">${CONTACT_MAIL}</a> adresine yaz.`);
    };
    if (!cfg.url || !cfg.key) { fail(); return; }

    post('messages', {
      visitor_id: visitorId(),
      page,
      name: f.name.value.trim(),
      email: f.email.value.trim(),
      phone: f.phone.value.trim() || null,
      message: f.message.value.trim()
    }).then(() => success(form), fail);
  }

  document.addEventListener('click', e => {
    const trigger = e.target.closest && e.target.closest('[data-iletisim]');
    if (trigger) open(e);
  });

  injectCss();
  addKvkkLink();
  track();
})();
