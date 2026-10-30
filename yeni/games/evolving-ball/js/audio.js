/* =============================================
   EVOLVING BALL — Audio Engine (Web Audio API)
   No external files — all sounds are synthesized.
   ============================================= */

const Audio = (() => {
  let ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  /** Play a short synthesized sound by type. */
  function play(type) {
    try {
      const c = getCtx();
      if (c.state === 'suspended') c.resume();

      const osc  = c.createOscillator();
      const gain = c.createGain();
      const now  = c.currentTime;

      osc.connect(gain);
      gain.connect(c.destination);

      switch (type) {
        /* Level up — rising chord */
        case 'levelup': {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(330, now);
          osc.frequency.linearRampToValueAtTime(660, now + 0.25);
          osc.frequency.linearRampToValueAtTime(990, now + 0.45);
          gain.gain.setValueAtTime(0.28, now);
          gain.gain.linearRampToValueAtTime(0, now + 0.55);
          osc.start(now);
          osc.stop(now + 0.56);
          break;
        }
        /* Death — descending buzz */
        case 'death': {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(380, now);
          osc.frequency.exponentialRampToValueAtTime(60, now + 0.5);
          gain.gain.setValueAtTime(0.22, now);
          gain.gain.linearRampToValueAtTime(0, now + 0.55);
          osc.start(now);
          osc.stop(now + 0.56);
          break;
        }
        /* Gem collect — bright ping */
        case 'collect': {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.linearRampToValueAtTime(1320, now + 0.08);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
          osc.start(now);
          osc.stop(now + 0.19);
          break;
        }
        /* Shield absorb — thud */
        case 'shield': {
          osc.type = 'square';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.linearRampToValueAtTime(90, now + 0.18);
          gain.gain.setValueAtTime(0.20, now);
          gain.gain.linearRampToValueAtTime(0, now + 0.22);
          osc.start(now);
          osc.stop(now + 0.23);
          break;
        }
        /* Ghost mode activate — whoosh sweep */
        case 'ghost': {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(200, now);
          osc.frequency.linearRampToValueAtTime(800, now + 0.3);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.linearRampToValueAtTime(0, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.36);
          break;
        }
        /* Upgrade select — soft confirm */
        case 'upgrade': {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.setValueAtTime(650, now + 0.1);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.linearRampToValueAtTime(0, now + 0.22);
          osc.start(now);
          osc.stop(now + 0.23);
          break;
        }
        default: break;
      }
    } catch (_) {
      // Audio errors are non-fatal
    }
  }

  return { play };
})();
