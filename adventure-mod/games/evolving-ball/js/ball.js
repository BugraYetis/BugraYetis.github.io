/* =============================================
   EVOLVING BALL — Ball Class
   ============================================= */

class Ball {
  constructor(x, y) {
    this.x          = x;
    this.y          = y;
    this.radius     = 20;
    this.baseRadius = 20;
    this.shrinkCount = 0;

    /* Skin — set by Game after construction */
    this.color   = '#00d4ff';
    this.skinGfx = null;   // full skin object { gradient, glow, color }

    /* Upgrades / status */
    this.shield       = 0;
    this.hasMagnet    = false;
    this.magnetTimer  = 0;
    this.ghostMode    = false;
    this.ghostTimer   = 0;
    this.ghostCooldown = 0;

    /* Orbit companion (Split upgrade) */
    this.orbitBall  = null;
    this.orbitAngle = 0;

    /* Visual */
    this.trail       = [];
    this.wobble      = 0;
    this.wobbleTimer = 0;
  }

  /* ── Per-frame update ── */
  update(dt) {
    /* Trail */
    this.trail.push({ x: this.x, y: this.y, r: this.radius });
    if (this.trail.length > 18) this.trail.shift();

    /* Ghost */
    if (this.ghostMode) {
      this.ghostTimer -= dt;
      if (this.ghostTimer <= 0) { this.ghostMode = false; this.ghostCooldown = 240; }
    } else if (this.ghostCooldown > 0) {
      this.ghostCooldown -= dt;
    }

    /* Magnet */
    if (this.hasMagnet) {
      this.magnetTimer -= dt;
      if (this.magnetTimer <= 0) { this.hasMagnet = false; this.magnetTimer = 0; }
    }

    /* Orbit */
    if (this.orbitBall) {
      this.orbitAngle += 0.065 * dt;
      this.orbitBall.x = this.x + Math.cos(this.orbitAngle) * 38;
      this.orbitBall.y = this.y + Math.sin(this.orbitAngle) * 22;
    }

    /* Wobble decay */
    if (this.wobbleTimer > 0) {
      this.wobbleTimer -= dt;
      this.wobble = Math.sin(this.wobbleTimer * 0.4) * 0.18 * (this.wobbleTimer / 10);
    } else {
      this.wobble = 0;
    }
  }

  bump() { this.wobbleTimer = 10; }

  activateGhost() {
    if (this.ghostCooldown > 0) return false;
    this.ghostMode = true; this.ghostTimer = 240;
    return true;
  }

  /* ── Draw ── */
  draw(ctx) {
    const { x, y, radius } = this;

    /* Trail */
    for (let i = 0; i < this.trail.length; i++) {
      const t     = this.trail[i];
      const frac  = i / this.trail.length;
      const r     = t.r * frac * 0.75;
      if (r < 1) continue;
      ctx.save();
      ctx.globalAlpha = frac * 0.3;
      ctx.beginPath();
      ctx.arc(t.x, t.y, r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }

    /* Ghost transparency */
    if (this.ghostMode) ctx.globalAlpha = 0.4;

    /* Outer glow ring */
    const glowR = radius * 1.8;
    const glow  = ctx.createRadialGradient(x, y, 0, x, y, glowR);
    glow.addColorStop(0,   this.color + '55');
    glow.addColorStop(1,   'transparent');
    ctx.beginPath();
    ctx.arc(x, y, glowR, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    /* Ball body — use skin gradient if available */
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1 + this.wobble, 1 - this.wobble);

    const body = ctx.createRadialGradient(-radius * 0.3, -radius * 0.3, 0, 0, 0, radius);
    if (this.skinGfx && this.skinGfx.gradient) {
      const [c0, c1, c2] = this.skinGfx.gradient;
      body.addColorStop(0,    c0);
      body.addColorStop(0.35, c1);
      body.addColorStop(1,    c2);
    } else {
      body.addColorStop(0,    '#ffffff');
      body.addColorStop(0.35, this.color);
      body.addColorStop(1,    _darken(this.color, 60));
    }

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = body;
    ctx.fill();

    /* Shine highlight */
    ctx.beginPath();
    ctx.arc(-radius * 0.28, -radius * 0.28, radius * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.38)';
    ctx.fill();

    ctx.restore();

    /* Shield ring */
    if (this.shield > 0) {
      ctx.save();
      ctx.shadowBlur  = 14;
      ctx.shadowColor = '#4499ff';
      ctx.beginPath();
      ctx.arc(x, y, radius + 7, 0, Math.PI * 2);
      ctx.strokeStyle = '#4499ff';
      ctx.lineWidth   = 3;
      ctx.stroke();
      ctx.restore();
      if (this.shield > 1) {
        ctx.fillStyle    = '#4499ff';
        ctx.font         = 'bold 11px Arial';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText('×' + this.shield, x, y - radius - 8);
        ctx.textBaseline = 'alphabetic';
      }
    }

    /* Magnet ring (dashed) */
    if (this.hasMagnet) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius + 5, 0, Math.PI * 2);
      ctx.strokeStyle = '#ff88ff';
      ctx.lineWidth   = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    /* Orbit companion */
    if (this.orbitBall) {
      const or  = radius * 0.6;
      const og  = ctx.createRadialGradient(
        this.orbitBall.x - or * 0.3, this.orbitBall.y - or * 0.3, 0,
        this.orbitBall.x, this.orbitBall.y, or
      );
      og.addColorStop(0, '#ffffff');
      og.addColorStop(0.4, '#ffaa00');
      og.addColorStop(1,   '#cc5500');
      ctx.beginPath();
      ctx.arc(this.orbitBall.x, this.orbitBall.y, or, 0, Math.PI * 2);
      ctx.fillStyle = og;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }
}

/* Darken a hex color by `amount` */
function _darken(hex, amount) {
  if (!hex || hex.length < 7) return '#001133';
  const r = clamp(parseInt(hex.slice(1, 3), 16) - amount, 0, 255);
  const g = clamp(parseInt(hex.slice(3, 5), 16) - amount, 0, 255);
  const b = clamp(parseInt(hex.slice(5, 7), 16) - amount, 0, 255);
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

/* Legacy alias used in older code paths */
function adjustColor(hex, amount) { return _darken(hex, -amount); }
