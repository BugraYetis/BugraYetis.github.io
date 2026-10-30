/* =============================================
   EVOLVING BALL — Obstacles, Gems & Particles
   ============================================= */

/* ---- Utility: circle-rectangle collision ---- */
function circleRect(cx, cy, cr, rx, ry, rw, rh) {
  const closestX = clamp(cx, rx, rx + rw);
  const closestY = clamp(cy, ry, ry + rh);
  const dx = cx - closestX;
  const dy = cy - closestY;
  return (dx * dx + dy * dy) < (cr * cr);
}

/* ============================================
   WALL OBSTACLE
   A full-width horizontal bar with one gap.
   ============================================ */
class WallObstacle {
  constructor(level) {
    this.y      = -28;
    this.height = 22;

    // Gap starts wide, narrows gradually with level (min 90px)
    const minGap = Math.max(90, 155 - level * 3);
    this.gapWidth = minGap + Math.random() * 40;
    this.gapX     = 20 + Math.random() * (CANVAS_W - this.gapWidth - 40);

    this.color     = '#ff3355';
    this.shadowCol = '#ff003388';
  }

  update(dt, speed) {
    this.y += speed * dt;
  }

  /** Returns true if ball circle overlaps with the wall solid segments.
   *  Uses radius - 4 for slight forgiveness so near-misses don't feel unfair. */
  collides(ball) {
    const { x, y } = ball;
    const r = Math.max(1, ball.radius - 4);   // 4px forgiveness
    // Left wall segment: [0, gapX]
    if (this.gapX > 0 && circleRect(x, y, r, 0, this.y, this.gapX, this.height)) return true;
    // Right wall segment: [gapX + gapWidth, CANVAS_W]
    const rStart = this.gapX + this.gapWidth;
    if (rStart < CANVAS_W && circleRect(x, y, r, rStart, this.y, CANVAS_W - rStart, this.height)) return true;
    return false;
  }

  draw(ctx) {
    ctx.shadowBlur  = 14;
    ctx.shadowColor = this.shadowCol;
    ctx.fillStyle   = this.color;

    // Left
    if (this.gapX > 0) {
      ctx.fillRect(0, this.y, this.gapX, this.height);
    }
    // Right
    const rStart = this.gapX + this.gapWidth;
    if (rStart < CANVAS_W) {
      ctx.fillRect(rStart, this.y, CANVAS_W - rStart, this.height);
    }

    // Gap highlight
    ctx.shadowBlur = 0;
    ctx.fillStyle  = 'rgba(255,255,255,0.06)';
    ctx.fillRect(this.gapX, this.y, this.gapWidth, this.height);
  }
}

/* ============================================
   MOVING BARRIER
   Like WallObstacle but the gap slides L/R.
   ============================================ */
class MovingBarrier extends WallObstacle {
  constructor(level) {
    super(level);
    this.color     = '#ff8800';
    this.shadowCol = '#ff880088';
    // Gap speed increases with level — starts slow so player can learn
    const speed    = 0.7 + Math.random() * 1.0 + level * 0.12;
    this.gapSpeed  = speed * (Math.random() < 0.5 ? 1 : -1);
  }

  update(dt, speed) {
    super.update(dt, speed);
    this.gapX += this.gapSpeed * dt;

    // Bounce off screen edges
    if (this.gapX < 0) {
      this.gapX     = 0;
      this.gapSpeed *= -1;
    }
    if (this.gapX + this.gapWidth > CANVAS_W) {
      this.gapX     = CANVAS_W - this.gapWidth;
      this.gapSpeed *= -1;
    }
  }

  draw(ctx) {
    super.draw(ctx);
    // Direction arrow inside the gap
    ctx.fillStyle  = 'rgba(255,255,255,0.45)';
    ctx.font       = '13px Arial';
    ctx.textAlign  = 'center';
    ctx.textBaseline = 'middle';
    const arrowStr = this.gapSpeed > 0 ? '→' : '←';
    ctx.fillText(arrowStr, this.gapX + this.gapWidth / 2, this.y + this.height / 2);
    ctx.textBaseline = 'alphabetic';
  }
}

/* ============================================
   HOLE OBSTACLE
   A pulsing circular void to avoid.
   ============================================ */
class HoleObstacle {
  constructor(level) {
    this.x        = 45 + Math.random() * (CANVAS_W - 90);
    this.y        = -50;
    this.radius   = 22 + Math.random() * 16 + level * 0.5;
    this.timer    = Math.random() * 100;
  }

  update(dt, speed) {
    this.y     += speed * dt;
    this.timer += dt;
  }

  collides(ball) {
    const dx   = ball.x - this.x;
    const dy   = ball.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < ball.radius + this.radius - 4; // slight forgiveness
  }

  draw(ctx) {
    const pulse = Math.sin(this.timer * 0.08) * 4;
    const r     = this.radius + pulse;

    // Outer glow ring
    ctx.beginPath();
    ctx.arc(this.x, this.y, r + 6, 0, Math.PI * 2);
    ctx.strokeStyle = '#aa00ff88';
    ctx.lineWidth   = 5;
    ctx.stroke();

    // Dark void gradient
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r);
    grad.addColorStop(0,   '#000000');
    grad.addColorStop(0.65,'#110022');
    grad.addColorStop(1,   '#aa00ff');

    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
}

/* ============================================
   GEM
   Collectible that gives bonus XP.
   ============================================ */
class Gem {
  constructor(x, y) {
    this.x         = x;
    this.y         = y;
    this.radius    = 7;
    this.collected = false;
    this.timer     = Math.random() * 100;
  }

  update(dt, speed, ball) {
    this.y     += speed * dt;
    this.timer += dt;

    // Magnet attraction
    if (ball.hasMagnet) {
      const dx   = ball.x - this.x;
      const dy   = ball.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130 && dist > 1) {
        const pull = (6 / dist) * dt;
        this.x    += dx * pull;
        this.y    += dy * pull;
      }
    }

    // Collect check
    const dx   = ball.x - this.x;
    const dy   = ball.y - this.y;
    if (Math.sqrt(dx * dx + dy * dy) < ball.radius + this.radius) {
      this.collected = true;
    }
  }

  draw(ctx) {
    const scale = 1 + Math.sin(this.timer * 0.12) * 0.18;
    const r     = this.radius * scale;

    // Outer glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, r * 2.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,215,0,0.12)';
    ctx.fill();

    // Gem body
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd700';
    ctx.shadowBlur  = 8;
    ctx.shadowColor = '#ffd700';
    ctx.fill();
    ctx.shadowBlur = 0;

    // Shine dot
    ctx.beginPath();
    ctx.arc(this.x - r * 0.3, this.y - r * 0.3, r * 0.28, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fill();
  }
}

/* ============================================
   PARTICLE
   Used for explosion and collect effects.
   ============================================ */
class Particle {
  constructor(x, y, color) {
    this.x      = x;
    this.y      = y;
    this.color  = color;
    this.vx     = (Math.random() - 0.5) * 9;
    this.vy     = (Math.random() - 0.5) * 9 - 1;
    this.life   = 1.0;
    this.decay  = 0.028 + Math.random() * 0.025;
    this.radius = 2 + Math.random() * 4;
    this.gravity = 0.12;
  }

  update(dt) {
    this.x    += this.vx * dt;
    this.y    += this.vy * dt;
    this.vy   += this.gravity * dt;
    this.life -= this.decay * dt;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * this.life, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
