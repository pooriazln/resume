<script lang="ts">
  import { onMount } from 'svelte';
  import type { TorusEngine } from './torus-engine';

  let canvas: HTMLCanvasElement;
  let container: HTMLDivElement;
  let engine: TorusEngine | null = null;
  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    let cleanup: (() => void) | null = null;

    (async () => {
      const { createTorusEngine } = await import('./torus-engine');
      if (!canvas) return;
      engine = createTorusEngine(canvas);
      if (visible) engine.start();

      const onMove = (e: MouseEvent) => {
        if (!engine || !canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        engine.setPointer(
          Math.max(-1, Math.min(1, x)),
          Math.max(-1, Math.min(1, y))
        );
      };
      window.addEventListener('mousemove', onMove);

      cleanup = () => {
        window.removeEventListener('mousemove', onMove);
      };
    })();

    return () => {
      observer.disconnect();
      cleanup?.();
      engine?.destroy();
      engine = null;
    };
  });

  $effect(() => {
    if (!engine) return;
    if (visible) engine.start();
    else engine.stop();
  });
</script>

<div bind:this={container} class="torus-widget">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .torus-widget {
    width: 100%;
    height: 100%;
  }
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
