<script lang="ts">
  import { onMount } from 'svelte';
  import { createParticlesEngine } from './particles-engine';
  import type { ParticlesEngine } from './particles-engine';

  let canvas: HTMLCanvasElement;
  let container: HTMLDivElement;
  let engine: ParticlesEngine | null = null;
  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    engine = createParticlesEngine(canvas);
    if (visible) engine.start();

    const onMove = (e: MouseEvent) => {
      if (!engine || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      engine.setPointer(e.clientX - rect.left, e.clientY - rect.top);
    };
    const onLeave = () => engine?.setPointer(-9999, -9999);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
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

<div bind:this={container} class="particles">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .particles {
    width: 100%;
    height: 100%;
  }
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
