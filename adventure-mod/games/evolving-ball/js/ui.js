/* =============================================
   EVOLVING BALL — UI Manager  (full rewrite)
   ============================================= */

const UI = (() => {

  /* ── helpers ── */
  const el   = id => document.getElementById(id);
  const fxEl = () => el('fx-layer');

  /* ── current visible screen id ── */
  let _current = null;

  /* ── vibration preference ── */
  let _vibrateOn = localStorage.getItem('evb_vibrate') !== 'off';
  function setVibratePref(on) { _vibrateOn = on; localStorage.setItem('evb_vibrate', on ? 'on' : 'off'); }
  function vibrate(ms) { if (_vibrateOn && navigator.vibrate) navigator.vibrate(ms); }

  /* ══════════════════════════════════════════
     SCREEN TRANSITIONS
     ══════════════════════════════════════════ */

  function showScreen(id) {
    /* hide outgoing */
    if (_current) {
      const old = el(_current);
      if (old) old.classList.remove('visible');
    }
    _current = id;
    if (!id) return;

    /* tiny rAF delay so CSS transition fires cleanly */
    requestAnimationFrame(() => {
      const target = el(id);
      if (target) target.classList.add('visible');
    });
  }

  function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('visible'));
    _current = null;
  }

  /* ══════════════════════════════════════════
     MAIN MENU
     ══════════════════════════════════════════ */

  function showMenu() {
    _refreshMenuCoins();
    el('menu-player-level').textContent = 'Lv.' + getPlayerLevel();
    const best = getBestScore();
    el('menu-best').textContent = best > 0 ? '🏆 En İyi: ' + best + 'm' : '';
    _buildQuickBuy();
    _refreshBadges();
    _refreshPrerunRow();
    showScreen('screen-menu');
    el('hud').classList.add('hidden');
    el('status-bar').classList.add('hidden');

    /* Daily reward — show once per session */
    if (!showMenu._dailyShown) {
      showMenu._dailyShown = true;
      const reward = checkDailyReward();
      if (reward) setTimeout(() => _showDailyReward(reward), 600);
    }
  }
  showMenu._dailyShown = false;

  function _showDailyReward({ streak, amount }) {
    /* Build the 7-day strip */
    const row = el('daily-days-row');
    row.innerHTML = '';
    for (let d = 1; d <= 7; d++) {
      const chip = document.createElement('div');
      chip.className = 'daily-day-chip' + (d < streak ? ' past' : '') + (d === streak ? ' today' : '');
      chip.innerHTML = `<span class="ddc-day">Gün ${d}</span><span class="ddc-coins">💰${DAILY_REWARDS[d-1]}</span>`;
      row.appendChild(chip);
    }
    el('daily-streak-text').textContent = streak > 1 ? streak + ' günlük seri! 🔥' : 'Gün 1';
    el('daily-amount').textContent = amount;
    el('daily-claim-btn').onclick = () => {
      addCoins(amount);
      _refreshMenuCoins();
      Audio.play('levelup');
      el('screen-daily').classList.remove('visible');
      setTimeout(() => showScreen('screen-menu'), 300);
    };
    showScreen('screen-daily');
  }

  function _refreshMenuCoins() {
    el('menu-coins').textContent = getCoins();
    const sc = el('skins-coins');   if (sc) sc.textContent = getCoins();
    const sh = el('shop-coins');    if (sh) sh.textContent = getCoins();
    const mc = el('missions-coins');if (mc) mc.textContent = getCoins();
    const ac = el('achievements-coins'); if (ac) ac.textContent = getCoins();
  }

  /* Quick-buy strip — consumables in main menu footer */
  function _buildQuickBuy() {
    const row     = el('quick-buy-row');
    if (!row) return;
    row.innerHTML = '';
    const pending = getPendingConsumables();

    CONSUMABLES.forEach(item => {
      const btn = document.createElement('div');
      btn.className = 'qb-item';
      const isPending = pending.includes(item.id);

      btn.innerHTML = `
        <div class="qb-icon">${item.icon}</div>
        <div class="qb-name">${item.name}</div>
        <div class="qb-price">💰${item.price}</div>
        ${isPending ? '<div class="qb-pending">✓</div>' : ''}`;

      if (isPending) btn.classList.add('owned');

      btn.addEventListener('click', () => {
        if (getCoins() < item.price) { _shakeEl(el('menu-coins')); return; }
        if (spendCoins(item.price)) {
          addConsumable(item.id);
          _refreshMenuCoins();
          _buildQuickBuy();
          _refreshPrerunRow();
          Audio.play('collect');
          vibrate(20);
        }
      });
      row.appendChild(btn);
    });
  }

  function _refreshPrerunRow() {
    const row   = el('prerun-row');
    const items = el('prerun-items');
    if (!row || !items) return;
    const pending = getPendingConsumables();
    if (pending.length === 0) {
      row.classList.add('hidden');
    } else {
      row.classList.remove('hidden');
      items.textContent = pending.map(id => {
        const c = CONSUMABLES.find(c => c.id === id);
        return c ? c.icon : '';
      }).join(' ');
    }
  }

  function _refreshBadges() {
    const mb = el('badge-missions');
    const ab = el('badge-achievements');
    if (mb) mb.classList.toggle('hidden', getUnclaimedMissionCount() === 0);
    if (ab) ab.classList.toggle('hidden', getUnclaimedAchievementCount() === 0);
  }

  /* ══════════════════════════════════════════
     HUD  (in-game overlay)
     ══════════════════════════════════════════ */

  function showHUD() {
    el('hud').classList.remove('hidden');
    el('status-bar').classList.remove('hidden');
  }

  function updateHUD(score, level, xpFrac, coinsRun, ball) {
    el('hud-score').textContent = score + 'm';
    el('hud-level-tag').textContent = 'Lv.' + level;
    el('hud-xp-bar').style.width = (Math.min(xpFrac, 1) * 100).toFixed(1) + '%';
    el('hud-coins-val').textContent = coinsRun;

    /* rebuild power-up badges */
    const bar = el('status-bar');
    bar.innerHTML = '';

    if (ball.shield > 0)
      bar.appendChild(_badge('🛡️' + (ball.shield > 1 ? ' ×' + ball.shield : ''), '#4488ff'));
    if (ball.ghostMode) {
      const s = Math.ceil(ball.ghostTimer / 60);
      bar.appendChild(_badge('👻 ' + s + 's', '#88ffee'));
    }
    if (ball.hasMagnet) {
      const s = Math.ceil(ball.magnetTimer / 60);
      bar.appendChild(_badge('🧲 ' + s + 's', '#ff44ff'));
    }
    if (ball.orbitBall)
      bar.appendChild(_badge('✨', '#ff8800'));
  }

  function _badge(text, color) {
    const d = document.createElement('div');
    d.className = 'status-badge';
    d.style.borderColor = color;
    d.style.color = color;
    d.textContent = text;
    return d;
  }

  /* ══════════════════════════════════════════
     PAUSE SCREEN
     ══════════════════════════════════════════ */

  function showPause(score) {
    el('pause-score-val').textContent = score + 'm';
    _syncPauseSoundToggle();
    showScreen('screen-pause');
  }

  function _syncPauseSoundToggle() {
    const tog = el('pause-toggle-sound');
    tog.classList.toggle('on', isSoundOn());
  }

  /* ══════════════════════════════════════════
     UPGRADE SCREEN
     ══════════════════════════════════════════ */

  function showUpgrade(level, ball) {
    el('upgrade-level-chip').textContent = 'LEVEL ' + level;
    const cards  = el('upgrade-cards');
    cards.innerHTML = '';
    const options = getRandomUpgrades(ball, 3);

    options.forEach((upg, i) => {
      const card = document.createElement('div');
      card.className = 'upgrade-card';
      card.style.borderColor = upg.color;
      card.style.boxShadow   = `0 0 18px ${upg.color}33`;

      card.innerHTML = `
        <div class="card-icon">${upg.icon}</div>
        <div>
          <div class="card-name" style="color:${upg.color}">${upg.name}</div>
          <div class="card-desc">${upg.desc}</div>
        </div>`;

      /* Staggered entrance animation */
      setTimeout(() => card.classList.add('card-in'), 60 + i * 90);

      card.addEventListener('click', () => {
        card.classList.add('selected');
        vibrate(30);
        Audio.play('upgrade');
        setTimeout(() => Game.applyUpgrade(upg), 180);
      });

      cards.appendChild(card);
    });

    showScreen('screen-upgrade');
  }

  /* ══════════════════════════════════════════
     GAME OVER SCREEN
     ══════════════════════════════════════════ */

  function showGameOver(score, coinsEarned, survivalSecs) {
    const best    = getBestScore();
    const newBest = score >= best && score > 0;

    el('go-dist').textContent  = score + 'm';
    el('go-best').textContent  = (newBest ? score : best) + 'm';
    el('go-coins').textContent = '+' + coinsEarned + ' 💰';
    el('go-time').textContent  = Math.floor(survivalSecs || 0) + 's';

    el('go-best-label').className = newBest ? 'go-score-label new-best' : 'go-score-label';
    el('go-best').className       = newBest ? 'go-score-val new-best'   : 'go-score-val';
    if (newBest) el('go-best-label').textContent = '🏆 New Best';
    else          el('go-best-label').textContent = 'Best';

    /* Mission mini-progress */
    const missions = getTodayMissions();
    const goM = el('go-missions');
    if (goM) {
      goM.innerHTML = missions.map(m =>
        `<div class="go-mission-row ${m.completed ? 'done' : ''}">
          ${m.icon} ${m.name}
          <span class="go-mission-prog">${Math.min(m.progress, m.goal)}/${m.goal}</span>
         </div>`
      ).join('');
    }

    showScreen('screen-gameover');
    if (newBest) setTimeout(() => spawnBurst(200, 350, 28), 300);
  }

  /* ══════════════════════════════════════════
     SKINS SCREEN
     ══════════════════════════════════════════ */

  function showSkins() {
    el('skins-coins').textContent = getCoins();
    _buildSkinsGrid();
    showScreen('screen-skins');
  }

  function _buildSkinsGrid() {
    const grid   = el('skins-grid');
    grid.innerHTML = '';
    const active = getActiveSkinId();
    const owned  = getOwnedSkins();

    SKINS.forEach(skin => {
      const isOwned  = owned.includes(skin.id);
      const isActive = skin.id === active;
      const card     = document.createElement('div');
      card.className = 'skin-card' + (isActive ? ' active' : '') + (!isOwned ? ' locked' : '');

      /* Ball preview — CSS radial gradient */
      const preview = document.createElement('div');
      preview.className = 'skin-ball';
      preview.style.background = `radial-gradient(circle at 35% 32%, ${skin.gradient.join(', ')})`;
      preview.style.setProperty('--skin-glow', skin.glow);
      preview.style.boxShadow  = `0 0 18px ${skin.glow}`;

      const nameEl   = document.createElement('div');
      nameEl.className = 'skin-name';
      nameEl.textContent = skin.name.toUpperCase();

      const statusEl = document.createElement('div');
      statusEl.className = 'skin-status';
      if (isActive) {
        statusEl.classList.add('skin-status--active');
        statusEl.textContent = '✓ Active';
      } else if (isOwned) {
        statusEl.classList.add('skin-status--owned');
        statusEl.textContent = 'Owned';
      } else {
        statusEl.classList.add('skin-status--price');
        statusEl.textContent = '💰 ' + skin.price;
      }

      card.appendChild(preview);
      card.appendChild(nameEl);
      card.appendChild(statusEl);
      card.addEventListener('click', () => _onSkinCardClick(skin, isOwned, isActive));
      grid.appendChild(card);
    });
  }

  function _onSkinCardClick(skin, isOwned, isActive) {
    if (isActive) return;
    if (isOwned) {
      setActiveSkin(skin.id);
      _buildSkinsGrid();
      vibrate(20);
    } else {
      /* Try to purchase */
      if (getCoins() < skin.price) {
        _shakeEl(el('skins-coins'));
        return;
      }
      if (spendCoins(skin.price)) {
        unlockSkin(skin.id);
        setActiveSkin(skin.id);
        el('skins-coins').textContent = getCoins();
        _buildSkinsGrid();
        vibrate([20, 30, 20]);
        Audio.play('levelup');
      }
    }
  }

  /* ══════════════════════════════════════════
     SHOP SCREEN
     ══════════════════════════════════════════ */

  function showShop() {
    el('shop-coins').textContent = getCoins();
    _buildShopList();
    showScreen('screen-shop');
  }

  /* Tab switching */
  let _shopTab = 'permanent';

  function _buildShopList() {
    const list = el('shop-list');
    list.innerHTML = '';
    const items = _shopTab === 'permanent' ? SHOP_ITEMS : CONSUMABLES;

    items.forEach(item => {
      const purchased = _shopTab === 'permanent' ? hasShopItem(item.id) : false;
      const row       = document.createElement('div');
      row.className   = 'shop-item' + (purchased ? ' purchased' : '');

      const canAfford = getCoins() >= item.price;
      row.innerHTML = `
        <div class="shop-item-icon">${item.icon}</div>
        <div class="shop-item-text">
          <div class="shop-item-name">${item.name}</div>
          <div class="shop-item-desc">${item.desc}</div>
        </div>
        <div class="${purchased ? 'shop-item-owned' : 'shop-item-price'}" style="${!canAfford && !purchased ? 'opacity:.5' : ''}">
          ${purchased ? '✓ Sahip' : '💰 ' + item.price}
        </div>`;

      if (!purchased) {
        row.addEventListener('click', () => _shopTab === 'permanent'
          ? _onShopItemClick(item)
          : _onConsumableBuy(item));
      }
      list.appendChild(row);
    });
  }

  function _onShopItemClick(item) {
    if (hasShopItem(item.id)) return;
    if (getCoins() < item.price) { _shakeEl(el('shop-coins')); return; }
    if (spendCoins(item.price)) {
      buyShopItem(item.id);
      _refreshMenuCoins();
      _buildShopList();
      vibrate([20, 30, 20]);
      Audio.play('levelup');
    }
  }

  function _onConsumableBuy(item) {
    if (getCoins() < item.price) { _shakeEl(el('shop-coins')); return; }
    if (spendCoins(item.price)) {
      addConsumable(item.id);
      _refreshMenuCoins();
      _buildShopList();
      vibrate(25);
      Audio.play('collect');
    }
  }

  /* ══════════════════════════════════════════
     MISSIONS SCREEN
     ══════════════════════════════════════════ */

  function showMissions() {
    el('missions-coins').textContent = getCoins();
    const missions = getTodayMissions();
    const list = el('missions-list');
    list.innerHTML = '';

    missions.forEach((m, i) => {
      const pct = Math.min(100, Math.floor((m.progress / m.goal) * 100));
      const row = document.createElement('div');
      row.className = 'mission-row' + (m.completed ? ' completed' : '') + (m.claimed ? ' claimed' : '');
      row.innerHTML = `
        <div class="mission-icon">${m.icon}</div>
        <div class="mission-body">
          <div class="mission-name">${m.name}</div>
          <div class="mission-desc">${m.desc}</div>
          <div class="mission-prog-bar"><div class="mission-prog-fill" style="width:${pct}%"></div></div>
          <div class="mission-prog-text">${Math.min(m.progress, m.goal)} / ${m.goal}</div>
        </div>
        <div class="mission-reward-col">
          ${m.claimed
            ? '<span class="reward-claimed">✓</span>'
            : m.completed
              ? `<button class="btn btn--gold mission-claim-btn">+${m.reward} 💰</button>`
              : `<span class="reward-val">💰${m.reward}</span>`}
        </div>`;

      if (m.completed && !m.claimed) {
        row.querySelector('.mission-claim-btn').addEventListener('click', () => {
          claimMission(i);
          _refreshMenuCoins();
          Audio.play('collect');
          showMissions();
          _refreshBadges();
        });
      }
      list.appendChild(row);
    });

    showScreen('screen-missions');
  }

  /* ══════════════════════════════════════════
     ACHIEVEMENTS SCREEN
     ══════════════════════════════════════════ */

  function showAchievements() {
    el('achievements-coins').textContent = getCoins();
    const achState = getAchievementState();
    const list = el('achievements-list');
    list.innerHTML = '';

    ACHIEVEMENTS.forEach(a => {
      const st       = achState[a.id] || {};
      const unlocked = !!st.unlocked;
      const claimed  = !!st.claimed;
      const row = document.createElement('div');
      row.className = 'ach-row' + (unlocked ? ' unlocked' : ' locked') + (claimed ? ' claimed' : '');
      row.innerHTML = `
        <div class="ach-icon">${unlocked ? a.icon : '🔒'}</div>
        <div class="ach-body">
          <div class="ach-name">${a.name}</div>
          <div class="ach-desc">${a.desc}</div>
        </div>
        <div class="ach-reward-col">
          ${claimed
            ? '<span class="reward-claimed">✓</span>'
            : unlocked
              ? `<button class="btn btn--gold ach-claim-btn">+${a.reward} 💰</button>`
              : `<span class="reward-val">💰${a.reward}</span>`}
        </div>`;

      if (unlocked && !claimed) {
        row.querySelector('.ach-claim-btn').addEventListener('click', () => {
          claimAchievement(a.id);
          _refreshMenuCoins();
          Audio.play('levelup');
          showAchievements();
          _refreshBadges();
        });
      }
      list.appendChild(row);
    });

    showScreen('screen-achievements');
  }

  /* Achievement unlock toast */
  function showAchToast(ach) {
    const t = el('ach-toast');
    t.innerHTML = `<span class="ach-toast-icon">${ach.icon}</span>
      <div><div class="ach-toast-title">Achievement Unlocked!</div>
      <div class="ach-toast-name">${ach.name}</div></div>
      <span class="ach-toast-reward">+${ach.reward} 💰</span>`;
    t.classList.remove('hidden', 'ach-toast-out');
    t.classList.add('ach-toast-in');
    setTimeout(() => {
      t.classList.remove('ach-toast-in');
      t.classList.add('ach-toast-out');
      setTimeout(() => t.classList.add('hidden'), 500);
    }, 2800);
  }

  /* ══════════════════════════════════════════
     SETTINGS SCREEN
     ══════════════════════════════════════════ */

  function showSettings() {
    _syncToggles();
    showScreen('screen-settings');
  }

  function _syncToggles() {
    el('toggle-sound').classList.toggle('on', isSoundOn());
    el('toggle-vibrate').classList.toggle('on', _vibrateOn);
  }

  /* ══════════════════════════════════════════
     REWARDED AD SIMULATION
     ══════════════════════════════════════════ */

  function showAdAndContinue() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed; inset:0; background:#000; z-index:9999;
      display:flex; flex-direction:column; align-items:center;
      justify-content:center; color:#fff; font-family:Arial; gap:18px;`;
    overlay.innerHTML = `
      <div style="font-size:1.3em;font-weight:bold;letter-spacing:2px">📺 ADVERTISEMENT</div>
      <div style="color:#666;font-size:.85em">Your run will continue after the ad</div>
      <div id="_ad_cd" style="font-size:3.5em;font-weight:900;color:#ffd700;
           font-family:'Arial Black'">5</div>
      <div style="color:#333;font-size:.72em">Simulated rewarded ad</div>`;
    document.body.appendChild(overlay);

    let t = 5;
    const tick = setInterval(() => {
      t--;
      const cd = overlay.querySelector('#_ad_cd');
      if (cd) cd.textContent = t;
      if (t <= 0) {
        clearInterval(tick);
        document.body.removeChild(overlay);
        Game.continueAfterAd();
      }
    }, 1000);
  }

  /* ══════════════════════════════════════════
     VISUAL FX
     ══════════════════════════════════════════ */

  /** White flash on level-up. */
  function flash() {
    const o = el('flash-overlay');
    o.classList.remove('flash-active');
    void o.offsetWidth;          /* force reflow */
    o.classList.add('flash-active');
  }

  /** Floating "+N" text at canvas coords (cx, cy). */
  function floatText(cx, cy, text, color) {
    const t = document.createElement('div');
    t.className   = 'float-text';
    t.textContent = text;
    t.style.color = color;
    t.style.left  = cx + 'px';
    t.style.top   = cy + 'px';
    fxEl().appendChild(t);
    setTimeout(() => t.remove(), 900);
  }

  /** Burst of particles at canvas coords (cx, cy). */
  function spawnBurst(cx, cy, count = 20) {
    const layer = fxEl();
    for (let i = 0; i < count; i++) {
      const angle  = (i / count) * Math.PI * 2 + Math.random() * .4;
      const dist   = 55 + Math.random() * 65;
      const hue    = Math.random() * 80 + 160; /* cyan→purple range */
      const p      = document.createElement('div');
      p.className  = 'burst-particle';
      p.style.setProperty('--p-color', `hsl(${hue},100%,60%)`);
      p.style.setProperty('--px', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--py', Math.sin(angle) * dist + 'px');
      p.style.left = cx + 'px';
      p.style.top  = cy + 'px';
      layer.appendChild(p);
      setTimeout(() => p.remove(), 800);
    }
  }

  /** Screen shake. */
  function shake() {
    const c = el('game-container');
    c.classList.remove('shake');
    void c.offsetWidth;
    c.classList.add('shake');
    setTimeout(() => c.classList.remove('shake'), 400);
  }

  /* Briefly scale-bounce an element (e.g. coin counter when can't afford) */
  function _shakeEl(elem) {
    if (!elem) return;
    elem.style.transition = 'transform .08s';
    elem.style.transform  = 'scale(1.35)';
    setTimeout(() => { elem.style.transform = 'scale(1)'; }, 160);
  }

  /* ══════════════════════════════════════════
     INIT — wire up all static button events
     ══════════════════════════════════════════ */

  function init() {
    /* Main menu */
    el('play-btn')       .addEventListener('click', () => { Audio.play('upgrade'); Game.start(); });
    el('btn-skins')      .addEventListener('click', () => showSkins());
    el('btn-shop')       .addEventListener('click', () => showShop());
    el('btn-missions')   .addEventListener('click', () => showMissions());
    el('btn-achievements').addEventListener('click', () => showAchievements());
    el('btn-settings')   .addEventListener('click', () => showSettings());

    /* Pre-run clear */
    el('prerun-clear').addEventListener('click', () => {
      localStorage.removeItem('evb_pending_cons');
      _buildQuickBuy();
      _refreshPrerunRow();
    });

    /* Sub-screen back buttons */
    el('skins-back')        .addEventListener('click', () => showMenu());
    el('shop-back')         .addEventListener('click', () => showMenu());
    el('settings-back')     .addEventListener('click', () => showMenu());
    el('missions-back')     .addEventListener('click', () => showMenu());
    el('achievements-back') .addEventListener('click', () => showMenu());

    /* Shop tabs */
    el('tab-permanent').addEventListener('click', () => {
      _shopTab = 'permanent';
      el('tab-permanent').classList.add('active');
      el('tab-consumable').classList.remove('active');
      _buildShopList();
    });
    el('tab-consumable').addEventListener('click', () => {
      _shopTab = 'consumable';
      el('tab-consumable').classList.add('active');
      el('tab-permanent').classList.remove('active');
      _buildShopList();
    });

    /* In-game pause button */
    el('hud-pause').addEventListener('click', () => Game.pause());

    /* Pause screen */
    el('pause-resume') .addEventListener('click', () => { Audio.play('upgrade'); Game.resume(); });
    el('pause-restart').addEventListener('click', () => { Audio.play('upgrade'); Game.start();  });
    el('pause-menu')   .addEventListener('click', () => { Game.toMenu();                        });

    /* Settings toggles */
    el('toggle-sound').addEventListener('click', () => {
      const on = !isSoundOn(); setSoundPref(on);
      el('toggle-sound').classList.toggle('on', on);
    });
    el('toggle-vibrate').addEventListener('click', () => {
      const on = !_vibrateOn; setVibratePref(on);
      el('toggle-vibrate').classList.toggle('on', on);
    });
    el('pause-toggle-sound').addEventListener('click', () => {
      const on = !isSoundOn(); setSoundPref(on);
      el('pause-toggle-sound').classList.toggle('on', on);
    });

    /* Game over buttons */
    el('go-continue').addEventListener('click', () => showAdAndContinue());
    el('go-retry')   .addEventListener('click', () => { Audio.play('upgrade'); Game.start(); });
    el('go-menu')    .addEventListener('click', () => Game.toMenu());
    /* Watch ad for coins */
    const goWatchAd = el('go-watchad');
    if (goWatchAd) goWatchAd.addEventListener('click', () => _watchAdForCoins());
  }

  function _watchAdForCoins() {
    showAdAndContinue._coinMode = true;
    const overlay = document.createElement('div');
    overlay.style.cssText = `position:fixed;inset:0;background:#000;z-index:9999;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      color:#fff;font-family:Arial;gap:18px;`;
    overlay.innerHTML = `
      <div style="font-size:1.3em;font-weight:bold;letter-spacing:2px">📺 REKLAM</div>
      <div style="color:#888;font-size:.85em">Reklam sonunda 50 coin kazanacaksın</div>
      <div id="_ad_cd2" style="font-size:3.5em;font-weight:900;color:#ffd700;font-family:'Arial Black'">5</div>`;
    document.body.appendChild(overlay);
    let t = 5;
    const tick = setInterval(() => {
      t--; const cd = overlay.querySelector('#_ad_cd2'); if (cd) cd.textContent = t;
      if (t <= 0) {
        clearInterval(tick); document.body.removeChild(overlay);
        addCoins(50); _refreshMenuCoins();
        floatText(200, 300, '+50 💰', '#ffd700');
        Audio.play('collect');
      }
    }, 1000);
  }

  /* ══════════════════════════════════════════
     PUBLIC API
     ══════════════════════════════════════════ */
  return {
    init,
    showMenu,
    showHUD,
    hideAllScreens,
    updateHUD,
    showPause,
    showUpgrade,
    showGameOver,
    showSkins,
    showShop,
    showSettings,
    showMissions,
    showAchievements,
    showAchToast,
    flash,
    floatText,
    spawnBurst,
    shake,
  };

})();
