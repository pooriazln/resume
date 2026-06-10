# Resume Redesign — Burnt Orange Editorial

**Date:** 2026-06-10
**Author:** Pooria + Claude
**Status:** Approved, building

## Goal

Full visual + content rebuild of the single-page resume. New design language ("burnt
orange editorial"), real named project history sourced from a-dev.ir (shared employer)
plus Pooria's own projects, a "What I build for you" capability section in place of a raw
skills wall. Keep smooth scrolling. Dark only. Bilingual (fa default, en) — Farsi crafted
with `codex`, not literal translation.

Hard requirement from the user: get it right this pass — no return trips for bad copy,
weak design, or bugs.

## Visual system

```
bg / espresso        #16110D
surface (cards)      #1E1812
surface raised       #241D15
text / bone          #ECE3D2
muted / warm grey    #9A8F7E
hairline border      #2C241B
accent / burnt orange #C2603A
accent hover         #D4744A
accent soft (glow)   rgba(194, 96, 58, .14)
```

- **Type:** Fraunces (variable, self-hosted WOFF2) for Latin display headings only —
  high-contrast editorial serif, the signature of the look. Inter for Latin body.
  Vazirmatn for all Farsi (display + body; the serif is Latin-only by design, Farsi
  headings stay Vazirmatn).
- **Shapes:** near-sharp corners (2–4px), hairline rules between sections, oversized
  section numerals, generous vertical rhythm. Restraint is the design.
- **Motion:** `scroll-behavior: smooth` stays. One refined generative backdrop in the
  hero — warm drifting "embers" (evolution of the existing canvas particle engine),
  recolored to burnt orange, low density, mouse repulsion, lazy/IO-paused. Elsewhere:
  quiet hover + on-scroll reveals only. Respect `prefers-reduced-motion`.
- **Dark only.** No theme toggle.

## Page structure

`Hero → About → What I build for you → Where I've worked → Contact`

Standalone skills/tech wall is dropped; capability is expressed in "What I build for you"
(each card names its stack). Experience section is labeled **"Where I've worked"** in EN;
in FA it is **never** rendered as «تجارب» — use a natural heading (decided with codex).

## Content (EN canonical; FA via codex per rules below)

### Hero
- Name: **Pooria Zoloorian**
- Positioning: *Full-stack & on-chain engineer. I build the hard parts — backends, smart
  contracts, and the interfaces that sit on top.*
- Proof line: *5+ years · Solidity & Tact · ships end-to-end · Shiraz, Iran*
- CTAs: Email · GitHub

### About
*I build products end to end — from the contract on chain to the screen in your hand. I'm
happiest where the work is genuinely hard: serious backends, smart contracts, realtime
systems, and interfaces that feel alive. I start at the architecture and carry it through
to deploy and polish.*

### What I build for you (4 cards, each names stack)
1. **On-chain systems** — Smart contracts in Solidity & Tact, token launches, tokenomics,
   cross-chain bridges, on-chain payments.
2. **Full-stack products** — APIs, dashboards, CRMs, auth, realtime — built to survive
   real load. NestJS, Go, Next.js, Postgres.
3. **Telegram mini apps & bots** — High-throughput Telegram games and bots with on-chain
   payments on TON.
4. **Interactive web** — Three.js / WebGL interfaces that do more than display data.

### Where I've worked (each: scope tag + one line + stack; framed as Pooria's own role,
never "co-authored")
1. **Arandao** — Current · Web3 — Multilevel-marketing, DAO and tokenomics platform with
   cross-chain bridge functionality. *(TypeScript, Go, Solidity, Ethers.js, Next.js, Postgres)*
2. **tondb** — Solo build · TON — Built entirely solo: the full website, the Telegram mini
   app, and the token contracts in Tact. *(Tact, TON, Telegram Mini App, Next.js)*
3. **Aryosense** — Backend — Social-media metaverse with realtime 3D, AI chatbots and live
   collaboration; owned the backend. *(NestJS, Go, Socket.io, OpenAI API, Postgres)*
4. **Clinify** — Full-stack — CRM and booking system for clinics; appointments and customer
   interactions, end to end. *(NestJS, MongoDB, Socket.io, Next.js)*
5. **Redstart Apply** — Full-stack — Private CRM for consultations, school & university
   listings, and bookings. *(Next.js, Prisma, Postgres)*
6. **Cice** — Full build — Personal style-assistant platform, built fully. *(TypeScript,
   NestJS, GraphQL, Postgres)*
7. **Jiggle** — Frontend · Freelance — High-performance Telegram tap game with on-chain
   payments; built the frontend. *(React, TON Connect, Telegram Mini App)*
8. **Chadko** — Full-stack — Cross-platform Electron auto-posting desktop app (macOS,
   Windows, Linux) plus a full support-chat system, including a reusable chat client
   published to npm for internal use. *(Electron, TypeScript, WebSocket, npm)*

### Contact
*Let's build something remarkable. If your product needs serious backend work, smart
contracts, or an interface that feels alive — let's talk.* + email button.

## Farsi rules (codex)

- Natural, idiomatic Persian — NOT literal translation. Iterate with codex.
- Keep these in their native form: **blockchain → بلاک‌چین**, **on chain → on chain**
  (English, inline), **smart contract / DAO / token / NFT / API / CRM / full-stack /
  backend / frontend / realtime** — keep tech terms English where Persian would read
  awkward. Brand/project names stay Latin.
- **Do not** translate the "Where I've worked" heading to «تجارب». Pick a natural FA
  heading with codex.

## Files

- `static/fonts/fraunces-latin-var.woff2` — add (self-hosted variable serif)
- `src/app.css` — new palette + Fraunces @font-face + `--font-serif`
- `src/lib/i18n/translations.ts` — full rewrite (en + fa)
- `src/routes/+page.svelte` — rebuilt structure + styles
- `src/lib/components/particles/particles-engine.ts` — recolor to embers, tune density
- `src/lib/i18n/index.ts` — check; adjust if section keys change

## Verification

- `bun run check` clean (svelte-check / TS strict).
- `bun run dev` + load both `fa` and `en`, desktop + mobile widths, via headless browser;
  screenshot both. No console errors. Backdrop lazy-loads and pauses off-screen.
- RTL correct in Farsi; Latin tech terms render LTR inside RTL text.

## Out of scope

- Light mode / theme toggle, PDF/ATS export, blog, analytics, project deep-links.
