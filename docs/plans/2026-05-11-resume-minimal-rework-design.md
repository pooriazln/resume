# Resume Minimal Rework — Design Doc

**Date:** 2026-05-11
**Author:** Pooria + Claude (brainstorming session)
**Status:** Approved, ready for implementation planning

## Goal

Rebuild the personal resume site as a minimal, freelance-focused landing page. The current site has too many sections, too much ornament, and a job-history timeline that adds no signal beyond "5+ years." The new site should answer four questions in order — *Who? What do you do? Have you done it for real? How do I reach you?* — and nothing else.

## Audience & purpose

- **Primary audience:** freelance and contract clients (founders, CTOs, agencies) landing from a DM, a GitHub link, or a referral
- **Conversion goal:** get the visitor to email
- **Not optimizing for:** full-time recruiters, ATS systems, generic skim-and-stack ranking

## Constraints

- All real client work is under NDA. Demos are dead or non-public. No project links, no screenshots.
- Solo build, no 3D artist, no design partner. Procedural-only for any 3D content.
- Bilingual: Persian (default) and English. Both translations get rewritten.
- Tech stack stays: SvelteKit 2 + Svelte 5 runes + Tailwind 4. Bun.

## Page structure

Five sections, top to bottom. Roughly 1.5 viewports total scroll height.

### 1. Hero

Two columns on desktop, stacked on mobile.

**Left:**
- Name (large, the dominant element on the page)
- One-line positioning, e.g. *"Full-stack & web3 developer. I ship the hard stuff."* — replaces the current 3-pill title cluster
- Two action buttons: email + GitHub
- Location moves to the footer (or drops entirely)

**Right:**
- 3D widget — see "3D widget" section below

### 2. What I do

Three short lines or tiles, one per specialty. Numbers baked into the prose, no separate stats grid.

- *Web3 — multi-chain payments, token launches, NFTs. Solidity, Tact, 5+ years.*
- *Full-stack — production apps with React / Next / NestJS that survive real load.*
- *Interactive 3D — Three.js / WebGL for product explorers and immersive interfaces.*

Final copy gets wordsmithed at implementation time.

### 3. Selected work (anonymized case studies)

Three plain-prose paragraphs, ~2 sentences each, problem → outcome shape. NDA-friendly. No cards, no badges, no icons.

Drafts (refine at implementation):

- *Designed a multi-chain crypto payment gateway supporting 14+ blockchains for a fintech client (under NDA). Owned the chain abstraction, fee logic, and confirmation pipeline.*
- *Built a full token launch platform on TON in Tact — private sale, minting, mining mechanics. Live, processed real volume.*
- *Led the v2 relaunch of a multi-vendor NFT marketplace on Polygon — reward logic, smart contracts, end-to-end.*

The restraint *is* the design. The text is the only element.

### 4. Tech

Single row of ~12 pills. No category headers. No "Learning: Go" line.

`React · Next.js · Three.js · Svelte · Node · NestJS · Solidity · Tact · TON · Polygon · PostgreSQL · Docker`

### 5. Contact / footer

One sentence + email button.

*"Open to freelance, contract, and full-time collaborations — Web3, interactive web, and creative full-stack."*

## 3D widget

Replaces the snake game in the hero's right column.

**Geometry:** `TorusKnotGeometry` — wireframe rendering in ink blue on the milky background.

**Motion:**
- Slow Y-axis rotation, ~0.1 rad/sec
- Sine-wave breathing scale, 1.0 → 1.05 over ~3 seconds
- Mouse parallax tilts the whole object up to ±8° from cursor position

**Implementation:**
- Three.js (already a listed skill, no new conceptual surface)
- Lazy-loaded — same dynamic-import pattern the snake game uses today
- IntersectionObserver pause when off-screen — reuse the snake game's pattern
- ~300×300 in the hero on desktop, ~200×200 on mobile, full-width fallback if needed
- DPR clamped to 2 for perf on retina

**Visual targets:** Bruno Simon / Lusion teaser feel without being one. Calm, premium, alive but not busy. Reads as "I can ship interactive 3D" within 2 seconds of page load.

**Failure mode:** if the widget feels wrong once built, geometry is a one-line swap. The framework around it (lazy load, parallax, breathing, parallax-to-rotation mapping) is the actual work.

## Visual system

```
Background        #FAF6EE   warm bone
Surface           #F2EDE2   used sparingly for any depth
Text              #1C1A16   warm near-black
Muted text        #6B6358   warm gray
Hairline border   #E5DECF   barely visible
Accent (ink)      #1E3A5F   links, 3D widget, hover states
```

- Light-only. No dark mode toggle. Removes the `ThemeToggle` component and the dark CSS branch.
- Typography stays Inter (en) + Vazirmatn (fa), self-hosted variable WOFF2 (already done in commit `a83a44f`). Bigger headings, more leading, more whitespace. The text *is* the design.
- Burn down all decorative effects: hero glows, animated grid, hover-transform-everything, gradient text, stat-card halos, timeline rail dots, scroll-mouse indicator.
- Keep one micro-interaction layer: links get a quiet color shift on hover, the 3D widget responds to cursor. That's it.

## What gets deleted

- `experiences` array + the entire timeline section in `+page.svelte`
- `aboutFeatures` array (already unused on the page; clean it from translations)
- Stats grid (4 stat cards) — the years numbers move into "What I do" prose
- 6-category skills grid → flat pill row
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `Badge`, `Separator` — none used after the rework. Component files stay (cheap), just unimported.
- `ThemeToggle` component + dark theme CSS in `app.css`
- `SnakeGame` component and `src/lib/components/snake-game/` folder
- `pixi.js` dependency from `package.json` (used only by the snake game)

## What gets kept

- SvelteKit 2 + Svelte 5 runes + Tailwind 4 + Bun
- Self-hosted variable WOFF2 fonts + preload (commit `a83a44f`)
- i18n stores: `currentLang`, `t`, `dir` — both fa and en translations rewritten to match leaner copy
- Language toggle button (restyled to match new palette)
- `cn()` utility, lazy-load + IntersectionObserver pattern
- Custom favicon (commit `580cef1`)

## What gets added

- `three` dependency
- New widget component: `src/lib/components/torus-widget/` (engine + Svelte wrapper, mirrors snake-game structure)

## Out of scope

- Scroll-driven 3D portfolio (deferred — fights the minimal brief)
- Dark mode (deferred — light-only ships first)
- ATS-friendly version / printable PDF
- Blog / writing section
- Testimonials section (no public testimonials available)
- Analytics

## Success criteria

- Page loads to first paint under 1.5s on a fast connection
- 3D widget gracefully degrades / lazy-loads — page is fully usable before it appears
- No section feels skippable; each earns its place
- A first-time visitor can identify *what Pooria does* and *how to reach him* within 5 seconds

## Next step

Invoke `superpowers:writing-plans` skill to produce the implementation plan.
