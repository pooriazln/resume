# CLAUDE.md

## Project Overview

Personal resume/portfolio website for Pooria Zoloorian. Single-page SvelteKit app, **English
only**, dark "burnt orange editorial" theme, with an animated ember canvas behind the hero,
smooth scrolling, and reveal-on-scroll. Sections: Hero → About → What I build → Where I've
worked → Contact.

## Tech Stack

- **SvelteKit 2** with **Svelte 5** (runes: `$state`, `$props`, `{@render}`)
- **TypeScript** (strict mode)
- **Tailwind CSS 4** via Vite plugin (`@theme` block in `app.css`)
- Hero backdrop is a hand-written **Canvas 2D** particle engine — no PixiJS, no Three.js here
- `lucide-svelte` icons; `cn()` (clsx + tailwind-merge) in `$lib/utils`
- **Bun** as package manager (`bun.lock`)

## Commands

- `bun run dev` — Start dev server
- `bun run build` — Production build
- `bun run preview` — Preview production build
- `bun run check` — Type-check with svelte-check

## Project Structure

```
src/
├── lib/
│   ├── assets/favicon.svg          # burnt-orange disc (brand mark)
│   ├── components/particles/       # Particles.svelte + particles-engine.ts (ember canvas)
│   ├── content.ts                  # ALL site copy (single English `content` object)
│   └── utils/index.ts              # cn()
├── routes/
│   ├── +layout.svelte              # imports app.css, sets <title>/meta, lang/dir
│   └── +page.svelte                # the entire page: markup + scoped styles
├── app.css                         # @font-face, theme CSS variables, @theme tokens
└── app.html                        # HTML template (font preloads)
static/fonts/                       # self-hosted variable WOFF2 (inter, fraunces)
```

## Content

- **All copy lives in `src/lib/content.ts`** as one `content` object, imported directly (no
  i18n, no stores). The site is English only.
- **Copy voice (important):** terse and factual. A project's *role* is carried by its short
  `tag` (e.g. `Backend`, `Solo build`, `Frontend`); the `body` states **what the project is**,
  in the third person — never "I built it myself" and no marketing adjectives ("feel alive",
  "remarkable", "high-performance"). Prefer a real metric over an adjective.

## Design System (dark only)

- Palette in `app.css` `:root`: espresso `#16110D` bg, bone `#ECE3D2` text, burnt-orange
  primary `#C2603A` (fills/rules), brighter accent `#D2774B` (small text/links), warm-grey
  muted `#9A8F7E`, hairline border `#2C241B`. Favicon disc matches the primary.
- Fonts (self-hosted variable WOFF2, no external requests): **Fraunces** serif for display
  headings (`--font-serif`, Latin only), **Inter** for body (`--font-sans`). Near-sharp
  corners (`--radius: 0.25rem`).
- Hero name: first name solid bone, surname rendered with `-webkit-text-stroke` (faint fill
  fallback).

## Motion

- `scroll-behavior: smooth`. Hero loads with a one-shot staggered CSS animation; sections use
  a `use:reveal` IntersectionObserver action (adds `.in`, then disconnects).
- `particles-engine.ts`: warm ember field, additive `lighter` compositing, mouse repulsion;
  `Particles.svelte` lazy-runs it and pauses via IntersectionObserver when off-screen.
- All motion is gated behind `prefers-reduced-motion: reduce` (reveals show instantly, embers
  render a single static frame).

## Conventions

- Svelte 5 runes. Scoped `<style>` in `+page.svelte`; global rules via `:global(...)`.
- Visible keyboard focus is provided globally (`a:focus-visible`, `button:focus-visible`).
- No ESLint/Prettier. Type-check with `bun run check` before claiming done.

## Deployment

`@sveltejs/adapter-auto` — auto-detects target (Vercel, Netlify, Node, …). The "could not
detect environment" message on local `bun run build` is expected.
