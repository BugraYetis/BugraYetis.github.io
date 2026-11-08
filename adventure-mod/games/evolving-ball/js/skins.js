/* =============================================
   EVOLVING BALL — Skins, Shop, Achievements,
   Missions, Daily Reward & Stats
   ============================================= */

/* ══════════════════════════════════════════════
   SKINS  (10 total)
   ══════════════════════════════════════════════ */
const SKINS = [
  { id:'cosmic',   name:'Cosmic',   gradient:['#fff','#00d4ff','#0044cc'], color:'#00d4ff', glow:'rgba(0,212,255,.8)',   price:0   },
  { id:'fire',     name:'Fire',     gradient:['#fff','#ff8800','#cc1100'], color:'#ff6600', glow:'rgba(255,100,0,.8)',   price:150 },
  { id:'emerald',  name:'Emerald',  gradient:['#fff','#00ff88','#006633'], color:'#00ff88', glow:'rgba(0,255,136,.8)',  price:200 },
  { id:'galaxy',   name:'Galaxy',   gradient:['#fff','#cc44ff','#440088'], color:'#cc44ff', glow:'rgba(200,68,255,.8)', price:300 },
  { id:'gold',     name:'Gold',     gradient:['#fff','#ffd700','#886600'], color:'#ffd700', glow:'rgba(255,215,0,.8)',  price:400 },
  { id:'void',     name:'Void',     gradient:['#fff','#ff2d78','#55002a'], color:'#ff2d78', glow:'rgba(255,45,120,.8)', price:500 },
  { id:'ice',      name:'Ice',      gradient:['#fff','#aae4ff','#004488'], color:'#aae4ff', glow:'rgba(170,228,255,.8)',price:250 },
  { id:'lava',     name:'Lava',     gradient:['#fff','#ff4400','#110000'], color:'#ff4400', glow:'rgba(255,60,0,.8)',   price:350 },
  { id:'neon',     name:'Neon',     gradient:['#fff','#39ff14','#004400'], color:'#39ff14', glow:'rgba(57,255,20,.8)',  price:450 },
  { id:'diamond',  name:'Diamond',  gradient:['#fff','#c8ffff','#006688'], color:'#c8ffff', glow:'rgba(200,255,255,.8)',price:700 },
];

/* ══════════════════════════════════════════════
   SHOP — PERMANENT UPGRADES
   ══════════════════════════════════════════════ */
const SHOP_ITEMS = [
  { id:'double_coins',  name:'Çift Coin',       desc:'Her runda 2× coin kazan',               icon:'💰', price:800  },
  { id:'start_shield',  name:'Başlangıç Kalkanı',desc:'Her runda kalkanla başla',              icon:'🛡️', price:350  },
  { id:'start_magnet',  name:'Başlangıç Mıknatıs',desc:'Her runda mıknatısla başla',          icon:'🧲', price:500  },
  { id:'xp_boost',      name:'XP Artışı',       desc:'Her runda 1.5× XP kazan',               icon:'⬆️', price:600  },
  { id:'obstacle_warn', name:'Tehlike Sezgisi',  desc:'Engeller gelmeden önce yanıp söner',   icon:'⚠️', price:450  },
  { id:'auto_revive',   name:'Otomatik Hayat',   desc:'Öldüğünde 1× otomatik can kazan',      icon:'💊', price:900  },
  { id:'head_start',    name:'Erken Çıkış',      desc:'Her runda 100m ileride başla',         icon:'🏁', price:400  },
  { id:'lucky_charm',   name:'Şans Tılsımı',     desc:'%15 ihtimalle engelleri geç',          icon:'🍀', price:700  },
  { id:'coin_trail',    name:'Coin İzi',         desc:'Topladığın yerde coin izi bırak',       icon:'✨', price:1000 },
  { id:'score_boost',   name:'Skor Artışı',      desc:'Mesafe skorunu 1.3× yap',              icon:'📈', price:850  },
];

/* ══════════════════════════════════════════════
   CONSUMABLES — bought per run, used once
   ══════════════════════════════════════════════ */
const CONSUMABLES = [
  { id:'con_shield',  name:'Kalkan',        desc:'2 kalkanla başla (1 rund)',       icon:'🛡️', price:40  },
  { id:'con_ghost',   name:'Hayalet',       desc:'Hayalet modda başla (1 rund)',    icon:'👻', price:65  },
  { id:'con_magnet',  name:'Mıknatıs',      desc:'Tam süreli mıknatıs (1 rund)',   icon:'🧲', price:35  },
  { id:'con_2xcoins', name:'Coin Patlaması',desc:'Bu runda 3× coin kazan',         icon:'💎', price:80  },
  { id:'con_xp',      name:'XP Bombası',    desc:'Bu runda 2× XP kazan',           icon:'⚡', price:50  },
  { id:'con_tiny',    name:'Küçül',         desc:'Topun yarıya küçülür (1 rund)',   icon:'🔬', price:45  },
];

/* ══════════════════════════════════════════════
   ACHIEVEMENTS
   ══════════════════════════════════════════════ */
const ACHIEVEMENTS = [
  { id:'first_run',    icon:'👟', name:'First Steps',    desc:'Complete your first run',             reward:30,  check: s => s.totalRuns >= 1           },
  { id:'dist_100',     icon:'💯', name:'Century',        desc:'Reach 100 meters in one run',         reward:50,  check: s => s.bestScore >= 100          },
  { id:'dist_500',     icon:'🚀', name:'Half-K',         desc:'Reach 500 meters in one run',         reward:150, check: s => s.bestScore >= 500          },
  { id:'dist_1000',    icon:'🏅', name:'Kilometer',      desc:'Reach 1000 meters in one run',        reward:350, check: s => s.bestScore >= 1000         },
  { id:'dist_3000',    icon:'🌟', name:'Legend',         desc:'Reach 3000 meters in one run',        reward:800, check: s => s.bestScore >= 3000         },
  { id:'level5',       icon:'⬆️', name:'Power Player',   desc:'Reach level 5 in a single run',       reward:75,  check: s => s.maxLevelInRun >= 5        },
  { id:'level10',      icon:'🔥', name:'Unstoppable',    desc:'Reach level 10 in a single run',      reward:200, check: s => s.maxLevelInRun >= 10       },
  { id:'survive60',    icon:'⏱️', name:'Survivor',       desc:'Survive 60 seconds in one run',       reward:100, check: s => s.longestSurvival >= 60     },
  { id:'survive120',   icon:'⌛', name:'Iron Will',      desc:'Survive 2 minutes in one run',        reward:250, check: s => s.longestSurvival >= 120    },
  { id:'coins50',      icon:'💰', name:'Coin Hoarder',   desc:'Collect 50 total coins',              reward:40,  check: s => s.totalCoins >= 50          },
  { id:'coins500',     icon:'💳', name:'High Roller',    desc:'Collect 500 total coins',             reward:120, check: s => s.totalCoins >= 500         },
  { id:'runs10',       icon:'🔄', name:'Dedicated',      desc:'Play 10 runs',                        reward:60,  check: s => s.totalRuns >= 10           },
  { id:'runs50',       icon:'🎯', name:'Veteran',        desc:'Play 50 runs',                        reward:180, check: s => s.totalRuns >= 50           },
  { id:'streak3',      icon:'📅', name:'On a Roll',      desc:'Log in 3 days in a row',              reward:80,  check: s => s.maxStreak >= 3            },
  { id:'streak7',      icon:'🗓️', name:'Week Warrior',   desc:'Log in 7 days in a row',              reward:250, check: s => s.maxStreak >= 7            },
];

/* ══════════════════════════════════════════════
   DAILY MISSIONS  (3 random drawn each day)
   ══════════════════════════════════════════════ */
const MISSION_POOL = [
  { id:'m_dist50',   icon:'🏃', name:'Jogger',         desc:'Reach 50m in one run',          goal:50,  reward:20, type:'distance'  },
  { id:'m_dist150',  icon:'🏃', name:'Runner',         desc:'Reach 150m in one run',         goal:150, reward:40, type:'distance'  },
  { id:'m_dist300',  icon:'🚶', name:'Marathoner',     desc:'Reach 300m in one run',         goal:300, reward:70, type:'distance'  },
  { id:'m_coins5',   icon:'💰', name:'Pocket Change',  desc:'Collect 5 coins in a run',      goal:5,   reward:15, type:'coins_run' },
  { id:'m_coins15',  icon:'💰', name:'Good Haul',      desc:'Collect 15 coins in a run',     goal:15,  reward:35, type:'coins_run' },
  { id:'m_survive20',icon:'⏱️', name:'Hold On!',       desc:'Survive 20 seconds',            goal:20,  reward:25, type:'time'      },
  { id:'m_survive45',icon:'⏱️', name:'Tough Cookie',   desc:'Survive 45 seconds',            goal:45,  reward:55, type:'time'      },
  { id:'m_level2',   icon:'⬆️', name:'Level Up',       desc:'Reach level 2 in a run',        goal:2,   reward:30, type:'level'     },
  { id:'m_level4',   icon:'⬆️', name:'Keep Growing',   desc:'Reach level 4 in a run',        goal:4,   reward:65, type:'level'     },
  { id:'m_3runs',    icon:'🔄', name:'Hat Trick',      desc:'Complete 3 runs today',         goal:3,   reward:45, type:'runs_today'},
];

/* ══════════════════════════════════════════════
   PERSISTENCE HELPERS
   ══════════════════════════════════════════════ */

/* -- Coins -- */
function getCoins()    { return parseInt(localStorage.getItem('evb_coins') || '0'); }
function setCoins(n)   { localStorage.setItem('evb_coins', Math.max(0, Math.floor(n))); }
function addCoins(n)   { setCoins(getCoins() + n); }
function spendCoins(n) { if (getCoins() < n) return false; setCoins(getCoins() - n); return true; }

/* -- Skins -- */
function getOwnedSkins() {
  try { return JSON.parse(localStorage.getItem('evb_owned_skins') || '["cosmic"]'); } catch { return ['cosmic']; }
}
function isSkinOwned(id) { return getOwnedSkins().includes(id); }
function unlockSkin(id) {
  const o = getOwnedSkins(); if (!o.includes(id)) { o.push(id); localStorage.setItem('evb_owned_skins', JSON.stringify(o)); }
}
function getActiveSkinId() { return localStorage.getItem('evb_active_skin') || 'cosmic'; }
function setActiveSkin(id) { localStorage.setItem('evb_active_skin', id); }
function getActiveSkin()   { return SKINS.find(s => s.id === getActiveSkinId()) || SKINS[0]; }

/* -- Permanent shop -- */
function getPurchasedItems() {
  try { return JSON.parse(localStorage.getItem('evb_shop_items') || '[]'); } catch { return []; }
}
function hasShopItem(id) { return getPurchasedItems().includes(id); }
function buyShopItem(id) {
  const items = getPurchasedItems(); if (!items.includes(id)) { items.push(id); localStorage.setItem('evb_shop_items', JSON.stringify(items)); }
}

/* -- Consumables -- */
function getPendingConsumables() {
  try { return JSON.parse(localStorage.getItem('evb_pending_cons') || '[]'); } catch { return []; }
}
function addConsumable(id) {
  const c = getPendingConsumables(); c.push(id); localStorage.setItem('evb_pending_cons', JSON.stringify(c));
}
function popConsumables() {
  const c = getPendingConsumables(); localStorage.removeItem('evb_pending_cons'); return c;
}

/* -- Stats -- */
function getStats() {
  try { return JSON.parse(localStorage.getItem('evb_stats') || '{}'); } catch { return {}; }
}
function _saveStats(s) { localStorage.setItem('evb_stats', JSON.stringify(s)); }
function updateStats(run) {
  const s = getStats();
  s.totalRuns     = (s.totalRuns  || 0) + 1;
  s.totalCoins    = (s.totalCoins || 0) + run.coinsEarned;
  s.longestSurvival = Math.max(s.longestSurvival || 0, run.survivalTime);
  s.maxLevelInRun   = Math.max(s.maxLevelInRun   || 0, run.maxLevel);
  s.totalDistance   = (s.totalDistance || 0) + run.distance;
  s.bestScore       = Math.max(s.bestScore || 0, run.distance);
  s.maxStreak       = Math.max(s.maxStreak || 0, run.currentStreak || 0);
  _saveStats(s);
  return s;
}

/* -- Best score -- */
function getBestScore()   { return parseInt(localStorage.getItem('evb_best') || '0'); }
function saveBestScore(s) { if (s > getBestScore()) localStorage.setItem('evb_best', s); }

/* -- Player level (based on cumulative distance) -- */
function getTotalDist()   { return parseInt(localStorage.getItem('evb_total_dist') || '0'); }
function addTotalDist(d)  { localStorage.setItem('evb_total_dist', getTotalDist() + Math.floor(d)); }
function getPlayerLevel() { return Math.max(1, Math.floor(getTotalDist() / 400) + 1); }

/* -- Sound / vibration -- */
function isSoundOn()       { return localStorage.getItem('evb_sound')   !== 'off'; }
function setSoundPref(on)  { localStorage.setItem('evb_sound',   on ? 'on'  : 'off'); }
function isVibrateOn()     { return localStorage.getItem('evb_vibrate') !== 'off'; }
function setVibratePref(on){ localStorage.setItem('evb_vibrate', on ? 'on'  : 'off'); }

/* ══════════════════════════════════════════════
   DAILY REWARD
   ══════════════════════════════════════════════ */
const DAILY_REWARDS = [50, 75, 100, 125, 150, 200, 300]; // coins for streak days 1–7+

function checkDailyReward() {
  const today     = new Date().toDateString();
  const lastPlay  = localStorage.getItem('evb_last_play') || '';
  const streak    = parseInt(localStorage.getItem('evb_streak') || '0');

  if (lastPlay === today) return null; // already claimed today

  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const newStreak = lastPlay === yesterday.toDateString() ? streak + 1 : 1;
  const amount    = DAILY_REWARDS[Math.min(newStreak - 1, 6)];

  localStorage.setItem('evb_last_play', today);
  localStorage.setItem('evb_streak', newStreak);

  // Track max streak for achievements
  const s = getStats();
  s.currentStreak = newStreak;
  s.maxStreak = Math.max(s.maxStreak || 0, newStreak);
  _saveStats(s);

  return { streak: newStreak, amount };
}

function getCurrentStreak() { return parseInt(localStorage.getItem('evb_streak') || '0'); }

/* ══════════════════════════════════════════════
   ACHIEVEMENTS
   ══════════════════════════════════════════════ */
function getAchievementState() {
  try { return JSON.parse(localStorage.getItem('evb_ach') || '{}'); } catch { return {}; }
}
function _saveAchievementState(s) { localStorage.setItem('evb_ach', JSON.stringify(s)); }

/** Check all achievements against stats. Returns array of newly-unlocked ones. */
function checkAchievements(stats) {
  const state    = getAchievementState();
  const unlocked = [];
  ACHIEVEMENTS.forEach(a => {
    if (!state[a.id] && a.check(stats)) {
      state[a.id] = { unlocked: true, claimed: false };
      unlocked.push(a);
    }
  });
  _saveAchievementState(state);
  return unlocked;
}

function claimAchievement(id) {
  const a     = ACHIEVEMENTS.find(a => a.id === id); if (!a) return 0;
  const state = getAchievementState();
  if (!state[id] || state[id].claimed) return 0;
  state[id].claimed = true; _saveAchievementState(state);
  addCoins(a.reward);
  return a.reward;
}

/* ══════════════════════════════════════════════
   DAILY MISSIONS
   ══════════════════════════════════════════════ */
function _todayKey() { return 'evb_missions_' + new Date().toDateString(); }

function getTodayMissions() {
  const key = _todayKey();
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved) return saved;
  } catch { /* fall through */ }
  // Pick 3 random missions for today (seeded by date for consistency)
  const seed   = new Date().toDateString().split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const pool   = [...MISSION_POOL];
  /* simple deterministic shuffle using the date seed */
  for (let i = pool.length - 1; i > 0; i--) {
    const j = (seed * (i + 1)) % (i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const missions = pool.slice(0, 3).map(m => ({ ...m, progress: 0, completed: false, claimed: false }));
  localStorage.setItem(key, JSON.stringify(missions));
  return missions;
}

function updateMissionProgress(type, value) {
  const missions = getTodayMissions();
  let changed = false;
  missions.forEach(m => {
    if (m.completed || m.type !== type) return;
    m.progress = Math.max(m.progress, value); // missions track peak value in a run (not cumulative)
    if (m.progress >= m.goal) { m.completed = true; changed = true; }
  });
  if (changed) localStorage.setItem(_todayKey(), JSON.stringify(missions));
  return missions;
}

function updateCumulativeMission(type, delta) {
  // For cumulative missions like 'runs_today'
  const missions = getTodayMissions();
  let changed = false;
  missions.forEach(m => {
    if (m.completed || m.type !== type) return;
    m.progress += delta;
    if (m.progress >= m.goal) { m.completed = true; changed = true; }
  });
  if (changed) localStorage.setItem(_todayKey(), JSON.stringify(missions));
  return missions;
}

function claimMission(index) {
  const missions = getTodayMissions();
  const m = missions[index];
  if (!m || !m.completed || m.claimed) return 0;
  m.claimed = true;
  localStorage.setItem(_todayKey(), JSON.stringify(missions));
  addCoins(m.reward);
  return m.reward;
}

function getUnclaimedMissionCount() {
  return getTodayMissions().filter(m => m.completed && !m.claimed).length;
}

function getUnclaimedAchievementCount() {
  const state = getAchievementState();
  return ACHIEVEMENTS.filter(a => state[a.id] && !state[a.id].claimed).length;
}
