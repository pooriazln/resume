# Resume Minimal Rework Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the personal resume site as a freelance-focused minimal landing page — 5 tight sections, milky/ink-blue palette, light-only, with a procedural Three.js torus knot replacing the snake game.

**Architecture:** Section-by-section rewrite of `src/routes/+page.svelte` using a strangler approach — palette swaps first (page still renders), then translations get a new shape, then the page is rewritten to consume them, then the 3D widget is added last. The page stays visually working (or at least buildable) at every commit so any step is easy to revert.

**Tech Stack:** SvelteKit 2 + Svelte 5 runes + Tailwind 4 (`@theme` block), Three.js (new dep), Bun.

**Design source:** `docs/plans/2026-05-11-resume-minimal-rework-design.md`

**Verification model:** No unit tests exist in this repo. Each task verifies via `bun run check` (svelte-check), `bun run build` for production sanity, and `bun run dev` + browser inspection for visual changes. Use @superpowers:verification-before-completion before declaring any task done.

---

## Phase 1 — Palette swap (page keeps working)

### Task 1: Replace color tokens in `app.css`

**Files:**
- Modify: `src/app.css` — the `@theme` block and any `:root[data-theme="light"]` / `:root[data-theme="dark"]` blocks

**Step 1: Read the current theme block**

Run: `Read src/app.css` and locate the `@theme` block plus both light and dark `data-theme` blocks. Note every CSS custom property currently defined (`--theme-background`, `--theme-foreground`, `--theme-primary`, `--theme-accent`, `--theme-muted-foreground`, `--theme-border`, `--theme-card`, etc.).

**Step 2: Replace the light theme values**

Edit the `:root[data-theme="light"]` block (or whichever selector currently holds light values) so it sets:

```css
:root[data-theme="light"] {
  --theme-background: #FAF6EE;
  --theme-foreground: #1C1A16;
  --theme-card: #F2EDE2;
  --theme-muted-foreground: #6B6358;
  --theme-border: #E5DECF;
  --theme-primary: #1E3A5F;
  --theme-accent: #1E3A5F;
  --theme-primary-foreground: #FAF6EE;
}
```

Leave the dark theme block alone for now (we delete it in Task 4). Leave the `@theme` block intact.

**Step 3: Force light as default**

If the current `+layout.svelte` initializes theme from `localStorage`, do not touch the logic yet — just make sure that when no preference is stored, `data-theme="light"` is the default. Read `src/lib/theme/` to find the init code if needed.

**Step 4: Type check**

Run: `bun run check`
Expected: zero errors (CSS changes don't affect type-check, but confirms no accidental Svelte breakage).

**Step 5: Visual verify**

Run: `bun run dev`
Open the page in a browser. Confirm:
- Background is warm bone (`#FAF6EE`), not white
- Body text is warm near-black, not pure black
- Links / theme-primary elements are ink blue
- Page is *intentionally weird-looking* — that's fine, we haven't restructured yet

**Step 6: Commit**

```bash
git add src/app.css
git commit -m "Recolor light theme to milky bone + ink blue palette"
```

---

### Task 2: Drop the dark mode toggle from the page

**Files:**
- Modify: `src/routes/+page.svelte` — remove `ThemeToggle` import + usage

**Step 1: Remove the import + JSX**

In `src/routes/+page.svelte`:
- Delete line `import { ThemeToggle } from '$lib/components/ui/theme-toggle';`
- Delete the `<ThemeToggle />` element (around line 24 in the current file)

The language toggle stays.

**Step 2: Type check**

Run: `bun run check`
Expected: zero errors.

**Step 3: Visual verify**

Run: `bun run dev`. Confirm the theme toggle button is gone but the language switcher is still there in the top-right.

**Step 4: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "Remove dark mode toggle from page header"
```

---

### Task 3: Remove dark theme branch from CSS

**Files:**
- Modify: `src/app.css` — delete the dark `data-theme` block
- Modify: `src/routes/+layout.svelte` — remove dark-mode init logic
- Delete: `src/lib/theme/` (whole folder, if it exists)
- Delete: `src/lib/components/ui/theme-toggle/` (whole folder)

**Step 1: Delete the dark theme block**

In `src/app.css`, delete the entire `:root[data-theme="dark"]` block. Also delete any `@media (prefers-color-scheme: dark)` block that switches the data-theme automatically.

**Step 2: Simplify layout init**

Read `src/routes/+layout.svelte`. Remove anything that:
- Reads theme from `localStorage`
- Subscribes to a theme store
- Sets `document.documentElement.dataset.theme` based on dark/light state

Hardcode `data-theme="light"` on the `<html>` element (in `app.html` if simpler) OR just delete the dynamic logic and let the CSS default apply.

**Step 3: Delete unused folders**

Run (carefully — confirm folder contents first with `Glob src/lib/theme/**` and `Glob src/lib/components/ui/theme-toggle/**`):

```bash
rm -rf src/lib/theme src/lib/components/ui/theme-toggle
```

**Step 4: Find and remove orphan imports**

Run: `Grep "from '\\$lib/theme" src/` and `Grep "theme-toggle" src/`
Expected: no results. If anything remains, delete those imports / usages.

**Step 5: Type check + build**

Run: `bun run check`
Run: `bun run build`
Both: zero errors.

**Step 6: Visual verify**

Run: `bun run dev`. Page should look identical to after Task 2.

**Step 7: Commit**

```bash
git add -A
git commit -m "Remove dark theme — light-only going forward"
```

---

## Phase 2 — Translations rewrite

### Task 4: Define new translation shape

**Files:**
- Modify: `src/lib/i18n/translations.ts` — full rewrite

**Step 1: Read the current translations file**

Run: `Read src/lib/i18n/translations.ts`. Note the current shape and confirm both `fa` and `en` have the same keys.

**Step 2: Rewrite the file**

Replace the entire contents with the new shape:

```typescript
export type Language = "fa" | "en";

export const translations = {
  fa: {
    name: "پوریا ذوالوریان",
    tagline: "توسعه‌دهنده فول‌استک و وب۳. کارهای سخت رو تحویل می‌دم.",
    location: "شیراز، ایران",
    sections: {
      whatIDo: "چه کار می‌کنم",
      selectedWork: "نمونه کارها",
      tech: "تکنولوژی‌ها",
    },
    whatIDo: [
      "وب۳ — درگاه پرداخت چندزنجیره‌ای، عرضه توکن، NFT. سالیدیتی و تَکت. بیش از ۵ سال تجربه.",
      "فول‌استک — اپلیکیشن‌های production با React / Next / NestJS که زیر بار واقعی دووم می‌آرن.",
      "وب سه‌بعدی — تجربه‌های Three.js و WebGL برای محصولات تعاملی و رابط‌های immersive.",
    ],
    selectedWork: [
      "درگاه پرداخت کریپتو چندزنجیره‌ای با پشتیبانی از بیش از ۱۴ بلاکچین برای یک کلاینت فین‌تک (تحت NDA). مسئول طراحی abstraction، منطق کارمزد و pipeline تأیید تراکنش.",
      "پلتفرم کامل عرضه توکن روی TON با Tact — فروش خصوصی، مینت و mining. عملیاتی، با حجم تراکنش واقعی.",
      "بازطراحی نسخه دو مارکت‌پلیس NFT چندفروشندگی روی Polygon — منطق پاداش، قراردادهای هوشمند، end-to-end.",
    ],
    tech: [
      "React", "Next.js", "Three.js", "Svelte",
      "Node.js", "NestJS", "Solidity", "Tact",
      "TON", "Polygon", "PostgreSQL", "Docker",
    ],
    contact: {
      line: "آماده همکاری در پروژه‌های فریلنس، قراردادی و تمام‌وقت — به‌خصوص وب۳، وب تعاملی و فول‌استک خلاقانه.",
      emailLabel: "تماس از طریق ایمیل",
    },
    switchLang: "EN",
  },
  en: {
    name: "Pooria Zoloorian",
    tagline: "Full-stack & web3 developer. I ship the hard stuff.",
    location: "Shiraz, Iran",
    sections: {
      whatIDo: "What I do",
      selectedWork: "Selected work",
      tech: "Tech",
    },
    whatIDo: [
      "Web3 — multi-chain payments, token launches, NFTs. Solidity, Tact. 5+ years.",
      "Full-stack — production apps with React / Next / NestJS that survive real load.",
      "Interactive 3D — Three.js / WebGL for product explorers and immersive interfaces.",
    ],
    selectedWork: [
      "Designed a multi-chain crypto payment gateway supporting 14+ blockchains for a fintech client (under NDA). Owned the chain abstraction, fee logic, and confirmation pipeline.",
      "Built a full token launch platform on TON in Tact — private sale, minting, mining mechanics. Live, processed real volume.",
      "Led the v2 relaunch of a multi-vendor NFT marketplace on Polygon — reward logic, smart contracts, end-to-end.",
    ],
    tech: [
      "React", "Next.js", "Three.js", "Svelte",
      "Node.js", "NestJS", "Solidity", "Tact",
      "TON", "Polygon", "PostgreSQL", "Docker",
    ],
    contact: {
      line: "Open to freelance, contract, and full-time collaborations — Web3, interactive web, and creative full-stack.",
      emailLabel: "Email me",
    },
    switchLang: "فا",
  },
} as const;

export type Translations = typeof translations.fa;
```

**Step 3: Type check**

Run: `bun run check`
Expected: this WILL fail because `+page.svelte` still references `$t.experiences`, `$t.aboutText`, `$t.skills`, `$t.stats`, etc. that no longer exist. **That's fine** — we're about to rewrite the page in the next phase. Note the failures so you know what to wire up.

**Step 4: Commit**

```bash
git add src/lib/i18n/translations.ts
git commit -m "Rewrite translations to new minimal shape"
```

---

## Phase 3 — Page rewrite

### Task 5: Rewrite `+page.svelte` to the new 5-section structure

**Files:**
- Modify: `src/routes/+page.svelte` — full rewrite of script + markup + style
- Reference: `docs/plans/2026-05-11-resume-minimal-rework-design.md` for section content

**Step 1: Replace the file**

Replace the entire contents of `src/routes/+page.svelte` with:

```svelte
<script lang="ts">
  import { t, dir, toggleLanguage } from '$lib/i18n';
  // 3D widget gets imported in Task 9
</script>

<!-- Top-right language toggle -->
<div
  class="fixed top-4 z-50"
  class:right-4={$dir === 'ltr'}
  class:left-4={$dir === 'rtl'}
>
  <button
    onclick={toggleLanguage}
    class="lang-toggle"
    aria-label="Toggle language"
  >
    {$t.switchLang}
  </button>
</div>

<main class="page" dir={$dir}>
  <!-- 1. Hero -->
  <section class="hero">
    <div class="hero-text">
      <h1 class="hero-name">{$t.name}</h1>
      <p class="hero-tagline">{$t.tagline}</p>
      <div class="hero-actions">
        <a href="mailto:pooria.zln83@gmail.com" class="btn btn-primary">
          {$t.contact.emailLabel}
        </a>
        <a href="https://github.com/pooriazln" target="_blank" rel="noopener" class="btn btn-ghost">
          GitHub
        </a>
      </div>
    </div>
    <div class="hero-visual">
      <!-- Torus widget mounts here in Task 9 -->
      <div class="hero-visual-placeholder" aria-hidden="true"></div>
    </div>
  </section>

  <!-- 2. What I do -->
  <section class="block">
    <h2 class="section-label">{$t.sections.whatIDo}</h2>
    <ul class="prose-list">
      {#each $t.whatIDo as line}
        <li>{line}</li>
      {/each}
    </ul>
  </section>

  <!-- 3. Selected work -->
  <section class="block">
    <h2 class="section-label">{$t.sections.selectedWork}</h2>
    <div class="prose-stack">
      {#each $t.selectedWork as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
  </section>

  <!-- 4. Tech -->
  <section class="block">
    <h2 class="section-label">{$t.sections.tech}</h2>
    <ul class="tech-pills">
      {#each $t.tech as item}
        <li>{item}</li>
      {/each}
    </ul>
  </section>

  <!-- 5. Contact -->
  <footer class="contact">
    <p>{$t.contact.line}</p>
    <a href="mailto:pooria.zln83@gmail.com" class="btn btn-primary">
      {$t.contact.emailLabel}
    </a>
  </footer>
</main>

<style>
  .page {
    max-width: 720px;
    margin: 0 auto;
    padding: clamp(3rem, 8vw, 6rem) clamp(1.25rem, 4vw, 2rem);
    color: var(--theme-foreground);
    background: var(--theme-background);
    min-height: 100vh;
  }

  /* Hero */
  .hero {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 3rem;
    align-items: center;
    margin-bottom: 6rem;
  }

  .hero-name {
    font-size: clamp(2.5rem, 6vw, 3.75rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.05;
    margin-bottom: 1rem;
  }

  .hero-tagline {
    font-size: 1.125rem;
    color: var(--theme-muted-foreground);
    line-height: 1.5;
    margin-bottom: 2rem;
    max-width: 28ch;
  }

  .hero-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .hero-visual {
    width: 280px;
    aspect-ratio: 1 / 1;
  }

  .hero-visual-placeholder {
    width: 100%;
    height: 100%;
    border: 1px dashed var(--theme-border);
    border-radius: 50%;
  }

  /* Section blocks */
  .block {
    margin-bottom: 4.5rem;
  }

  .section-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--theme-muted-foreground);
    margin-bottom: 1.5rem;
  }

  .prose-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .prose-list li {
    font-size: 1.0625rem;
    line-height: 1.55;
    color: var(--theme-foreground);
  }

  .prose-stack {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .prose-stack p {
    font-size: 1rem;
    line-height: 1.65;
    color: var(--theme-foreground);
    max-width: 64ch;
  }

  .tech-pills {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-pills li {
    padding: 0.4rem 0.85rem;
    border: 1px solid var(--theme-border);
    border-radius: 9999px;
    font-size: 0.8125rem;
    color: var(--theme-muted-foreground);
    background: transparent;
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
    font-size: 0.9375rem;
    font-weight: 500;
    text-decoration: none;
    transition: opacity 0.15s ease, transform 0.15s ease;
  }

  .btn:hover { transform: translateY(-1px); }
  .btn:active { transform: translateY(0); }

  .btn-primary {
    background: var(--theme-primary);
    color: var(--theme-primary-foreground);
  }

  .btn-primary:hover { opacity: 0.9; }

  .btn-ghost {
    background: transparent;
    color: var(--theme-foreground);
    border: 1px solid var(--theme-border);
  }

  .btn-ghost:hover {
    border-color: var(--theme-foreground);
  }

  .lang-toggle {
    padding: 0.5rem 0.875rem;
    border-radius: 9999px;
    background: transparent;
    border: 1px solid var(--theme-border);
    font-size: 0.8125rem;
    color: var(--theme-foreground);
    cursor: pointer;
    transition: border-color 0.15s ease;
  }

  .lang-toggle:hover {
    border-color: var(--theme-foreground);
  }

  /* Contact / footer */
  .contact {
    margin-top: 6rem;
    padding-top: 3rem;
    border-top: 1px solid var(--theme-border);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .contact p {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--theme-muted-foreground);
    max-width: 56ch;
  }

  /* Mobile */
  @media (max-width: 640px) {
    .hero {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .hero-visual {
      width: 200px;
      justify-self: start;
    }
    .hero-actions { flex-direction: column; align-items: stretch; }
    .btn { width: 100%; }
  }
</style>
```

Note: this references `$t.tagline`, `$t.whatIDo`, `$t.selectedWork`, `$t.tech`, `$t.contact.line`, `$t.contact.emailLabel`, `$t.sections.whatIDo`, `$t.sections.selectedWork`, `$t.sections.tech`, `$t.switchLang`, `$t.name`, `$dir`, and `toggleLanguage` — all from the Task 4 translation shape.

**Step 2: Type check**

Run: `bun run check`
Expected: zero errors. If something fails, the most likely cause is i18n — confirm the translation keys match exactly.

**Step 3: Visual verify**

Run: `bun run dev`. Open the page. Confirm:
- All 5 sections render in order: hero / what-i-do / selected-work / tech / contact
- Milky background, ink-blue primary buttons, warm near-black text
- Hero has a dashed circle placeholder where the 3D widget will go
- Language toggle in top-right works (clicking flips fa↔en)
- RTL layout works when fa is selected (text flows right-to-left)
- Mobile: resize browser narrow, hero stacks, buttons go full-width

**Step 4: Build**

Run: `bun run build`
Expected: zero errors.

**Step 5: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "Rewrite page to 5-section minimal structure (placeholder for 3D widget)"
```

---

## Phase 4 — Cleanup unused code

### Task 6: Delete the snake game

**Files:**
- Delete: `src/lib/components/snake-game/` (whole folder)
- Modify: `package.json` — remove `pixi.js` dependency

**Step 1: Confirm no remaining snake imports**

Run: `Grep "snake-game" src/`
Expected: zero results (we already removed the import in Task 5).

**Step 2: Delete folder**

```bash
rm -rf src/lib/components/snake-game
```

**Step 3: Remove pixi.js**

Run: `bun remove pixi.js`

**Step 4: Build to confirm nothing else used pixi**

Run: `bun run build`
Expected: zero errors.

**Step 5: Commit**

```bash
git add -A
git commit -m "Remove snake game and pixi.js dependency"
```

---

### Task 7: Audit and remove unused UI components

**Files:**
- Audit usage of: `src/lib/components/ui/card`, `src/lib/components/ui/badge`, `src/lib/components/ui/separator`
- Possibly delete the above folders

**Step 1: Check what's still used**

Run for each: `Grep "from '\\$lib/components/ui/card" src/`, same for `badge`, `separator`.
Expected: zero results (we removed all usages in Task 5).

**Step 2: Delete unused component folders**

For any folder with zero references, delete it:

```bash
rm -rf src/lib/components/ui/card src/lib/components/ui/badge src/lib/components/ui/separator
```

Keep folders that are still imported (none expected, but verify first).

**Step 3: Build**

Run: `bun run build`
Expected: zero errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "Remove unused UI components (card, badge, separator)"
```

---

## Phase 5 — 3D torus widget

### Task 8: Add Three.js dependency + create the engine

**Files:**
- Modify: `package.json` — add `three`, `@types/three`
- Create: `src/lib/components/torus-widget/torus-engine.ts`

**Step 1: Add deps**

Run: `bun add three` and `bun add -d @types/three`

**Step 2: Create the engine**

Create `src/lib/components/torus-widget/torus-engine.ts` with:

```typescript
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
```

**Step 3: Type check**

Run: `bun run check`
Expected: zero errors. If `@types/three` isn't picked up, restart the TS server.

**Step 4: Commit**

```bash
git add package.json bun.lock src/lib/components/torus-widget/torus-engine.ts
git commit -m "Add Three.js + torus knot engine (geometry, breathing, parallax)"
```

---

### Task 9: Create the Svelte wrapper with lazy load + IntersectionObserver

**Files:**
- Create: `src/lib/components/torus-widget/TorusWidget.svelte`
- Create: `src/lib/components/torus-widget/index.ts`

**Step 1: Create the wrapper component**

Create `src/lib/components/torus-widget/TorusWidget.svelte`:

```svelte
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
```

**Step 2: Create barrel export**

Create `src/lib/components/torus-widget/index.ts`:

```typescript
export { default as TorusWidget } from './TorusWidget.svelte';
```

**Step 3: Type check**

Run: `bun run check`
Expected: zero errors.

**Step 4: Commit**

```bash
git add src/lib/components/torus-widget/
git commit -m "Add TorusWidget Svelte wrapper with lazy load and IO pause"
```

---

### Task 10: Mount the widget in the hero

**Files:**
- Modify: `src/routes/+page.svelte` — replace the placeholder with `<TorusWidget />`

**Step 1: Wire it up**

In `src/routes/+page.svelte`:

Add import at the top of the script block:
```typescript
import { TorusWidget } from '$lib/components/torus-widget';
```

Replace the placeholder:
```html
<div class="hero-visual-placeholder" aria-hidden="true"></div>
```

with:
```html
<TorusWidget />
```

Remove the now-unused `.hero-visual-placeholder` rule from the `<style>` block.

**Step 2: Type check**

Run: `bun run check`
Expected: zero errors.

**Step 3: Visual verify (the important one)**

Run: `bun run dev`. Open the page. Confirm:
- Wireframe torus knot renders in ink blue inside the hero
- Slowly rotates on its own
- Slight breathing scale visible over a few seconds
- Mouse movement near the canvas tilts the knot toward the cursor (subtle)
- Scrolling away and back: animation pauses off-screen, resumes when visible
- Mobile (resize narrow): widget shrinks to 200×200, no overflow
- No console errors

If anything looks janky or wrong: don't fight it here. Note it and fix in Task 11.

**Step 4: Build**

Run: `bun run build`
Expected: zero errors. Note the bundle size — Three.js adds ~150KB gzipped. That's expected and acceptable.

**Step 5: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "Mount torus widget in hero"
```

---

## Phase 6 — Final polish

### Task 11: Visual polish pass

**Files:**
- Modify: `src/routes/+page.svelte` (likely styles), and/or `src/lib/components/torus-widget/torus-engine.ts` if widget tuning is needed

**Step 1: Open the live page and review with fresh eyes**

Run: `bun run dev`. Walk through the page top to bottom and check:
- **Hero name:** is it big enough? Is it the dominant element?
- **Tagline:** does it read naturally? Adjust copy in `translations.ts` if not.
- **Buttons:** ink-blue primary feels right? Hover states feel quiet?
- **What I do:** spacing between lines comfortable? Lines fit on one line on desktop?
- **Selected work:** prose flows well? Each paragraph max 64ch?
- **Tech pills:** wrapping cleanly? Pill density right?
- **Contact footer:** doesn't feel like an afterthought?
- **3D widget:** rotation speed right? Breathing visible but not distracting? Parallax responsive but not jumpy?

**Step 2: Make targeted tweaks**

Adjust whatever feels off. Common tuning knobs:
- Section spacing (`margin-bottom` on `.block`)
- Hero column gap
- Widget rotation speed (`* 0.1` in `torus-engine.ts`)
- Widget parallax sensitivity (`* 0.14` in two places in `torus-engine.ts`)
- Pill border opacity / size

**Step 3: Test fa (Persian) layout**

Toggle to Persian. Confirm:
- All text reads right-to-left
- Hero columns swap correctly (visual on left, text on right) OR stack — whichever the design feels better in. Check `dir={$dir}` propagation.
- Buttons are still readable
- Pills wrap correctly RTL

**Step 4: Test light-only enforcement**

Open DevTools → Application → Local Storage. Delete any keys. Reload. Confirm page loads in light mode by default. Try setting `data-theme="dark"` manually on `<html>` via DevTools — the page should not have any "dark mode" version (text might look weird with no dark CSS, that's fine, point is no toggle exists).

**Step 5: Production build smoke test**

Run: `bun run build && bun run preview`
Open the preview URL. Click through the page. Verify the 3D widget loads (lazy import works in production).

**Step 6: Commit any tweaks**

```bash
git add -A
git commit -m "Visual polish pass — spacing, copy, widget tuning"
```

---

### Task 12: Final cleanup + docs

**Files:**
- Audit: any leftover unused files, exports, or comments
- Possibly modify: `CLAUDE.md` to reflect new structure

**Step 1: Sweep for dead code**

Run: `Grep "aboutFeatures\\|experiences\\|skills\\|stats" src/`
Expected: zero results in `src/` (these were old translation keys; they shouldn't appear anywhere).

Run: `Grep "ThemeToggle\\|SnakeGame" src/`
Expected: zero results.

**Step 2: Update CLAUDE.md**

Open `CLAUDE.md`. Update:
- "Tech Stack" — replace `PixiJS 8` with `Three.js`
- "Project Structure" — replace `snake-game/` with `torus-widget/`
- "Snake Game" subsection — replace with a "Torus Widget" subsection describing engine + Svelte wrapper, lazy-load, IO pause
- "Theme" subsection — note light-only, milky/ink palette
- Anywhere else that references the old structure

Keep the doc roughly the same length.

**Step 3: Run full verification one more time**

Run in sequence:
- `bun run check` — zero errors
- `bun run build` — zero errors
- `bun run dev` — open browser, click around, confirm both languages work, confirm widget animates

**Step 4: Final commit**

```bash
git add -A
git commit -m "Update CLAUDE.md to match new minimal structure"
```

---

## Done criteria

All of the following must hold before declaring the rework complete:

- [ ] Page has exactly 5 sections in order: hero, what-i-do, selected-work, tech, contact
- [ ] Background is `#FAF6EE`, text is `#1C1A16`, primary accent is `#1E3A5F`
- [ ] No dark mode toggle exists; no dark CSS branch exists
- [ ] No snake game; no pixi.js dependency
- [ ] No experiences timeline, no stats grid, no 6-category skills grid, no Card/Badge/Separator usages on the page
- [ ] Three.js torus knot renders, rotates, breathes, parallaxes to mouse, pauses off-screen
- [ ] Both fa and en translations work; RTL layout is correct in fa
- [ ] `bun run check` passes
- [ ] `bun run build` passes
- [ ] No console errors in browser
- [ ] CLAUDE.md updated to match new structure

---

## Out of scope (do NOT do during this rework)

- Scroll-driven 3D portfolio
- Dark mode (deferred)
- ATS-friendly version / printable PDF
- Blog or writing section
- Testimonials
- Analytics
- Refactoring `cn()` utility or other infra

If any of these come up mid-implementation, note them as follow-ups; do not expand scope.
