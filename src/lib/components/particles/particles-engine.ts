export interface ParticlesEngine {
  start(): void;
  stop(): void;
  destroy(): void;
  setPointer(x: number, y: number): void;
}

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

const COUNT = 90;
const REPULSE_RADIUS = 110;
const REPULSE_STRENGTH = 0.32;
const RETURN_STRENGTH = 0.018;
const DAMPING = 0.93;
const PARTICLE_COLOR = '107, 99, 88'; // warm muted gray (theme-muted-foreground)

export function createParticlesEngine(canvas: HTMLCanvasElement): ParticlesEngine {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      start() {},
      stop() {},
      destroy() {},
      setPointer() {},
    };
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let particles: Particle[] = [];
  let animationId = 0;
  let running = false;
  let pointerX = -9999;
  let pointerY = -9999;

  function seed() {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        homeX: x,
        homeY: y,
        vx: 0,
        vy: 0,
        size: 0.8 + Math.random() * 1.6,
        alpha: 0.12 + Math.random() * 0.22,
      });
    }
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

  function tick() {
    if (!running) return;
    ctx!.clearRect(0, 0, width, height);

    for (const p of particles) {
      const dx = p.x - pointerX;
      const dy = p.y - pointerY;
      const distSq = dx * dx + dy * dy;
      if (distSq < REPULSE_RADIUS * REPULSE_RADIUS && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / REPULSE_RADIUS) * REPULSE_STRENGTH;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      p.vx += (p.homeX - p.x) * RETURN_STRENGTH;
      p.vy += (p.homeY - p.y) * RETURN_STRENGTH;

      p.vx *= DAMPING;
      p.vy *= DAMPING;

      p.x += p.vx;
      p.y += p.vy;

      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(${PARTICLE_COLOR}, ${p.alpha})`;
      ctx!.fill();
    }

    animationId = requestAnimationFrame(tick);
  }

  return {
    start() {
      if (running) return;
      running = true;
      resize();
      window.addEventListener('resize', resize);
      animationId = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    },
    destroy() {
      this.stop();
      particles = [];
    },
    setPointer(x, y) {
      pointerX = x;
      pointerY = y;
    },
  };
}
