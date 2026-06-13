export interface ParticlesEngine {
  start(): void;
  stop(): void;
  destroy(): void;
  setPointer(x: number, y: number): void;
}

interface Ember {
  x: number;
  baseX: number;
  y: number;
  vx: number;
  vy: number;
  rise: number;
  size: number;
  alpha: number;
  phase: number;
  swayFreq: number;
  swayAmp: number;
  twinkleFreq: number;
  tone: string;
}

// Warm ember tones (rgb triplets) — mostly burnt orange, a few bone sparks.
const TONES = ['210, 119, 75', '194, 96, 58', '226, 138, 92', '236, 227, 210'];
const TONE_WEIGHTS = [0.4, 0.34, 0.18, 0.08];

const REPULSE_RADIUS = 130;
const REPULSE_STRENGTH = 0.45;
const DAMPING = 0.9;

function pickTone(): string {
  let r = Math.random();
  for (let i = 0; i < TONES.length; i++) {
    r -= TONE_WEIGHTS[i];
    if (r <= 0) return TONES[i];
  }
  return TONES[0];
}

export function createParticlesEngine(canvas: HTMLCanvasElement): ParticlesEngine {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return { start() {}, stop() {}, destroy() {}, setPointer() {} };
  }

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let embers: Ember[] = [];
  let animationId = 0;
  let running = false;
  let startTime = 0;
  let pointerX = -9999;
  let pointerY = -9999;

  function makeEmber(seeded: boolean): Ember {
    const baseX = Math.random() * width;
    // When seeded at init, scatter across height; when recycled, start below the frame.
    const y = seeded ? Math.random() * height : height + Math.random() * 40 + 10;
    return {
      x: baseX,
      baseX,
      y,
      vx: 0,
      vy: 0,
      rise: 0.12 + Math.random() * 0.28,
      size: 0.8 + Math.random() * 1.7,
      alpha: 0.1 + Math.random() * 0.26,
      phase: Math.random() * Math.PI * 2,
      swayFreq: 0.18 + Math.random() * 0.4,
      swayAmp: 6 + Math.random() * 22,
      twinkleFreq: 0.5 + Math.random() * 1.4,
      tone: pickTone(),
    };
  }

  function seed() {
    const area = width * height;
    const count = Math.max(28, Math.min(80, Math.round(area / 9000)));
    embers = [];
    for (let i = 0; i < count; i++) embers.push(makeEmber(true));
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function drawEmber(e: Ember, alpha: number) {
    const r = e.size * 4.5;
    const grad = ctx!.createRadialGradient(e.x, e.y, 0, e.x, e.y, r);
    grad.addColorStop(0, `rgba(${e.tone}, ${alpha})`);
    grad.addColorStop(1, `rgba(${e.tone}, 0)`);
    ctx!.fillStyle = grad;
    ctx!.beginPath();
    ctx!.arc(e.x, e.y, r, 0, Math.PI * 2);
    ctx!.fill();
    // bright core
    ctx!.fillStyle = `rgba(${e.tone}, ${Math.min(1, alpha * 1.6)})`;
    ctx!.beginPath();
    ctx!.arc(e.x, e.y, e.size * 0.7, 0, Math.PI * 2);
    ctx!.fill();
  }

  function render(time: number) {
    ctx!.clearRect(0, 0, width, height);
    ctx!.globalCompositeOperation = 'lighter';

    for (const e of embers) {
      // mouse repulsion
      const dx = e.x - pointerX;
      const dy = e.y - pointerY;
      const distSq = dx * dx + dy * dy;
      if (distSq < REPULSE_RADIUS * REPULSE_RADIUS && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / REPULSE_RADIUS) * REPULSE_STRENGTH;
        e.vx += (dx / dist) * force;
        e.vy += (dy / dist) * force;
      }
      e.vx *= DAMPING;
      e.vy *= DAMPING;

      const sway = Math.sin(time * e.swayFreq + e.phase) * e.swayAmp;
      e.baseX += e.vx;
      e.x = e.baseX + sway * 0.4;
      e.y += e.vy - e.rise;

      // recycle when it floats off the top (or drifts far out the sides)
      if (e.y < -20 || e.x < -60 || e.x > width + 60) {
        Object.assign(e, makeEmber(false));
        continue;
      }

      const twinkle = 0.55 + 0.45 * Math.sin(time * e.twinkleFreq + e.phase);
      drawEmber(e, e.alpha * twinkle);
    }

    ctx!.globalCompositeOperation = 'source-over';
  }

  function tick() {
    if (!running) return;
    render((performance.now() - startTime) * 0.001);
    animationId = requestAnimationFrame(tick);
  }

  return {
    start() {
      if (running) return;
      resize();
      window.addEventListener('resize', resize);
      if (reducedMotion) {
        // single static frame, no animation loop
        render(0);
        return;
      }
      running = true;
      startTime = performance.now();
      animationId = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    },
    destroy() {
      this.stop();
      embers = [];
    },
    setPointer(x, y) {
      pointerX = x;
      pointerY = y;
    },
  };
}
