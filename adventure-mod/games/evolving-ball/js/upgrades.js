/* =============================================
   EVOLVING BALL — Upgrade Definitions
   ============================================= */

const UPGRADES = [
  {
    id:   'speed',
    name: 'Speed Boost',
    icon: '⚡',
    desc: 'Move 20% faster — more XP per second!',
    color: '#ffdd00',
    apply(ball, game) {
      game.baseSpeed = Math.min(game.baseSpeed * 1.2, 14);
    }
  },
  {
    id:   'shrink',
    name: 'Shrink',
    icon: '🔵',
    desc: 'Ball shrinks 25% — easier to dodge',
    color: '#00ccff',
    apply(ball /*, game */) {
      if (ball.shrinkCount < 4) {
        ball.radius     = Math.max(ball.radius * 0.75, 7);
        ball.baseRadius = ball.radius;
        ball.shrinkCount++;
      }
    },
    available(ball) { return ball.shrinkCount < 4; }
  },
  {
    id:   'shield',
    name: 'Shield',
    icon: '🛡️',
    desc: 'Absorbs the next hit — stackable',
    color: '#4488ff',
    apply(ball /*, game */) {
      ball.shield = Math.min(ball.shield + 1, 5);
    }
  },
  {
    id:   'split',
    name: 'Orbit Companion',
    icon: '✨',
    desc: 'A companion orbits you and tanks a hit',
    color: '#ff8800',
    apply(ball /*, game */) {
      if (!ball.orbitBall) {
        ball.orbitBall = { x: ball.x + 38, y: ball.y };
      }
      // Also grant a bonus shield to represent it
      ball.shield = Math.min(ball.shield + 1, 5);
    }
  },
  {
    id:   'magnet',
    name: 'Magnet',
    icon: '🧲',
    desc: 'Attract nearby gems for 15 seconds',
    color: '#ff44ff',
    apply(ball /*, game */) {
      ball.hasMagnet    = true;
      ball.magnetTimer += 900; // stack: 15 s @ 60fps
    }
  },
  {
    id:   'ghost',
    name: 'Ghost Mode',
    icon: '👻',
    desc: 'Pass through obstacles for 4 seconds',
    color: '#88ffee',
    apply(ball /*, game */) {
      ball.ghostMode     = true;
      ball.ghostTimer    = 240; // 4 s @ 60fps
      ball.ghostCooldown = 0;
      Audio.play('ghost');
    },
    available(ball) { return !ball.ghostMode; }
  }
];

/**
 * Returns `count` random upgrades from UPGRADES.
 * Filters out upgrades whose `available(ball)` returns false.
 * @param {Ball} ball
 * @param {number} count
 */
function getRandomUpgrades(ball, count = 3) {
  const pool = UPGRADES.filter(u => !u.available || u.available(ball));
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}
