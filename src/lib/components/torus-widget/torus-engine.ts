import * as THREE from 'three';

export interface TorusEngine {
  start(): void;
  stop(): void;
  destroy(): void;
  setPointer(x: number, y: number): void;
}

export function createTorusEngine(canvas: HTMLCanvasElement): TorusEngine {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new THREE.TorusKnotGeometry(0.9, 0.28, 200, 32);
  const material = new THREE.MeshBasicMaterial({
    color: 0x1e3a5f,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let animationId = 0;
  let running = false;
  let pointerX = 0;
  let pointerY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;
  const startTime = performance.now();

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  function tick() {
    if (!running) return;
    const t = (performance.now() - startTime) / 1000;

    // breathing scale: 1.0 → 1.05 over ~3s
    const scale = 1 + Math.sin((t * Math.PI * 2) / 3) * 0.025;
    mesh.scale.setScalar(scale);

    // base rotation
    mesh.rotation.y = t * 0.1;
    mesh.rotation.x = t * 0.05;

    // mouse parallax — lerp toward target tilt (~±8° = ~0.14 rad)
    const targetTiltX = pointerY * 0.14;
    const targetTiltY = pointerX * 0.14;
    currentTiltX += (targetTiltX - currentTiltX) * 0.08;
    currentTiltY += (targetTiltY - currentTiltY) * 0.08;
    mesh.rotation.x += currentTiltX;
    mesh.rotation.y += currentTiltY;

    renderer.render(scene, camera);
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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
    setPointer(x, y) {
      pointerX = x;
      pointerY = y;
    },
  };
}
