# CLAUDE.md

## Project Overview

Personal resume/portfolio website for Pooria Zoloorian. Single-page SvelteKit app with bilingual support (Persian/English), dark/light theme, and an interactive Snake game.

## Tech Stack

- **SvelteKit 2** with **Svelte 5** (runes: `$state`, `$props`, `$derived`, `{@render}`)
- **TypeScript** (strict mode)
- **Tailwind CSS 4** via Vite plugin
- **PixiJS 8** for Snake game rendering (WebGL, lazy-loaded)
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
│   ├── components/
│   │   ├── ui/              # shadcn-svelte style components (card, badge, separator, theme-toggle)
│   │   └── snake-game/      # PixiJS snake game (engine + Svelte wrapper)
│   ├── i18n/                # Translations (fa/en) and language stores
│   ├── theme/               # Dark/light theme with localStorage persistence
│   └── utils/               # cn() utility (clsx + tailwind-merge)
├── routes/
│   ├── +layout.svelte       # Root layout (theme/i18n init)
│   └── +page.svelte         # Main resume page
├── app.css                  # Global styles, CSS variables, font imports
└── app.html                 # HTML template
static/                      # SVG illustrations, robots.txt
```

## Key Patterns

### Component Convention
- Svelte 5 runes syntax: `let { class: className, children, ...restProps }: Props = $props()`
- Props extend `HTMLAttributes<HTMLElement>` for native attribute pass-through
- Class merging via `cn()` from `$lib/utils`
- Render snippets: `{@render children?.()}`
- Barrel exports via `index.ts` in each component directory

### i18n
- Stores in `$lib/i18n`: `currentLang` (writable), `t` (derived translations), `dir` (derived `'rtl'|'ltr'`)
- Default language: Persian (`fa`), toggle to English (`en`)
- All content strings live in `src/lib/i18n/translations.ts`
- RTL handled via `dir={$dir}` on root element and conditional positioning classes

### Theme
- CSS custom properties (`--theme-primary`, `--theme-background`, etc.) defined in `app.css`
- `data-theme` attribute on `<html>` toggled between `dark`/`light`
- View Transitions API for animated theme switch with circular reveal

### Snake Game
- `snake-engine.ts`: Pure logic — state, tick, collision, input queue, interpolation
- `SnakeGame.svelte`: PixiJS renderer, lazy-loaded on first play click
- Frame interpolation with wrap-around handling; conditional easing (cubic for turns, linear for straight)
- Input queue (max 2) + force-early-tick for responsive controls
- IntersectionObserver pauses rendering when off-screen

## Styling

- Tailwind CSS 4 with inline `@theme` block in `app.css`
- Dark theme (default): `#0a0a0f` bg, `#38bdf8` primary, `#818cf8` accent
- Light theme: `#ffffff` bg, `#0284c7` primary, `#4f46e5` accent
- Fonts: Inter (English), Vazirmatn (Persian)

## No Linting/Formatting Config

No ESLint or Prettier configuration exists. Type checking is done via `svelte-check`.

## Deployment

Uses `@sveltejs/adapter-auto` — auto-detects deployment target (Vercel, Netlify, Node, etc.).
