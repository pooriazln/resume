<script lang="ts">
  import { content } from '$lib/content';
  import { Particles } from '$lib/components/particles';
  import { ArrowDown, ArrowUpRight, FileDown, Github, Mail, MapPin, Menu, X } from 'lucide-svelte';

  const EMAIL = 'pooria.zln83@gmail.com';
  const GITHUB = 'https://github.com/pooriazln';
  const RESUME = '/cv.pdf';

  let menuOpen = $state(false);

  const navItems = [
    { href: '#about', label: content.nav.about },
    { href: '#build', label: content.nav.build },
    { href: '#work', label: content.nav.work },
    { href: '#contact', label: content.nav.contact },
  ];

  // Reveal-on-scroll: add `.in` when the element enters the viewport, once.
  function reveal(node: HTMLElement, params: { delay?: number } = {}) {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    node.classList.add('reveal');
    if (reduce) {
      node.classList.add('in');
      return;
    }
    if (params.delay) node.style.transitionDelay = `${params.delay}ms`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('in');
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(node);
    return { destroy: () => io.disconnect() };
  }
</script>

<svelte:head>
  <meta name="theme-color" content="#16110D" />
</svelte:head>

<div class="grain" aria-hidden="true"></div>

<main class="shell">
  <header class="topbar">
    <a href="#home" class="brand" aria-label={content.name}>
      <span class="disc" aria-hidden="true"></span>
      <strong>{content.firstName}</strong>
    </a>

    <nav class="nav" aria-label="Primary">
      {#each navItems as item}
        <a href={item.href}>{item.label}</a>
      {/each}
    </nav>

    <div class="top-actions">
      <a href="mailto:{EMAIL}" class="hire">{content.nav.hire}</a>
      <button
        class="menu-btn"
        onclick={() => (menuOpen = !menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {#if menuOpen}<X size={20} strokeWidth={1.9} />{:else}<Menu size={20} strokeWidth={1.9} />{/if}
      </button>
    </div>

    {#if menuOpen}
      <nav class="mobile-menu" aria-label="Mobile">
        {#each navItems as item}
          <a href={item.href} onclick={() => (menuOpen = false)}>{item.label}</a>
        {/each}
        <a href="mailto:{EMAIL}" class="m-hire" onclick={() => (menuOpen = false)}>
          {content.nav.hire}
        </a>
      </nav>
    {/if}
  </header>

  <!-- HERO -->
  <section id="home" class="hero">
    <div class="embers" aria-hidden="true"><Particles /></div>

    <div class="hero-copy">
      <p class="eyebrow"><span class="ping" aria-hidden="true"></span>{content.availability}</p>

      <h1 class="hero-name serif">
        <span>{content.firstName}</span>
        <span class="ln2">{content.lastName}</span>
      </h1>

      <span class="accent-rule" aria-hidden="true"></span>

      <p class="positioning">{content.positioning}</p>
      <p class="proof">{content.proof}</p>

      <div class="cta">
        <a href="mailto:{EMAIL}" class="btn btn-solid">
          <Mail size={17} strokeWidth={1.9} />
          {content.contact.emailLabel}
        </a>
        <a href={GITHUB} target="_blank" rel="noopener" class="btn btn-ghost">
          <Github size={17} strokeWidth={1.9} />
          GitHub
        </a>
        <a href={RESUME} download class="btn btn-ghost">
          <FileDown size={17} strokeWidth={1.9} />
          Résumé
        </a>
        <span class="loc"><MapPin size={16} strokeWidth={1.8} />{content.location}</span>
      </div>
    </div>

    <a class="scroll-cue" href="#about">
      <span>{content.scroll}</span>
      <ArrowDown size={16} strokeWidth={1.8} />
    </a>
  </section>

  <!-- ABOUT -->
  <section id="about" class="section about">
    <p class="kicker" use:reveal>{content.sections.about}</p>
    <div class="about-grid">
      <h2 class="serif" use:reveal>{content.about.title}</h2>
      <div class="about-side">
        <p class="lede" use:reveal={{ delay: 90 }}>{content.about.body}</p>
        <p class="current" use:reveal={{ delay: 150 }}>
          {content.about.current.pre}<a
            href={content.about.current.href}
            target="_blank"
            rel="noopener">{content.about.current.label}</a
          >{content.about.current.post}
        </p>
      </div>
    </div>
  </section>

  <!-- WHAT I BUILD -->
  <section id="build" class="section build">
    <p class="kicker" use:reveal>{content.sections.build}</p>
    <div class="build-grid">
      {#each content.build as item, i}
        <article class="build-card" use:reveal={{ delay: i * 70 }}>
          <span class="num">{String(i + 1).padStart(2, '0')}</span>
          <h3 class="serif">{item.title}</h3>
          <p>{item.body}</p>
        </article>
      {/each}
    </div>
  </section>

  <!-- WHERE I'VE WORKED -->
  <section id="work" class="section work">
    <p class="kicker" use:reveal>{content.sections.work}</p>
    <ol class="work-list">
      {#each content.work as job, i}
        <li class="work-row" use:reveal={{ delay: i * 45 }}>
          <span class="w-index">{String(i + 1).padStart(2, '0')}</span>
          <div class="w-head">
            {#if job.href}
              <h3 class="w-name serif">
                <a class="w-link" href={job.href} target="_blank" rel="noopener"
                  >{job.name}<ArrowUpRight size={17} strokeWidth={2} /></a
                >
              </h3>
            {:else}
              <h3 class="w-name serif">{job.name}</h3>
            {/if}
            <span class="w-tag">{job.tag}</span>
          </div>
          <p class="w-body">{job.body}</p>
        </li>
      {/each}
    </ol>
  </section>

  <!-- CONTACT -->
  <footer id="contact" class="section contact">
    <p class="kicker" use:reveal>{content.sections.contact}</p>
    <div class="contact-grid">
      <div>
        <h2 class="serif" use:reveal>{content.contact.title}</h2>
        <p class="lede" use:reveal={{ delay: 80 }}>{content.contact.line}</p>
      </div>
      <div class="contact-side" use:reveal={{ delay: 120 }}>
        <a href="mailto:{EMAIL}" class="btn btn-solid btn-lg">
          <Mail size={18} strokeWidth={1.9} />
          {content.contact.emailLabel}
        </a>
        <p class="note">{content.contact.note}</p>
        <a href={GITHUB} target="_blank" rel="noopener" class="ghost-link">
          <Github size={16} strokeWidth={1.8} /> github.com/pooriazln
        </a>
      </div>
    </div>

    <div class="footer-bar">
      <span>{content.name}</span>
      <span>© 2026 — {content.location}</span>
    </div>
  </footer>
</main>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  /* Visible keyboard focus for everything interactive */
  :global(a:focus-visible),
  :global(button:focus-visible) {
    outline: 2px solid var(--theme-accent);
    outline-offset: 3px;
    border-radius: 3px;
  }

  .serif {
    font-family: var(--font-serif);
    font-optical-sizing: auto;
    font-weight: 540;
    letter-spacing: -0.012em;
  }

  /* ---- Atmosphere: fixed film grain over a warm radial wash ---- */
  .grain {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.22;
    mix-blend-mode: soft-light;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .shell {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    color: var(--theme-foreground);
    background:
      radial-gradient(120% 80% at 78% -10%, color-mix(in srgb, var(--theme-primary) 18%, transparent), transparent 55%),
      radial-gradient(90% 60% at 0% 8%, color-mix(in srgb, #7c3a1f 14%, transparent), transparent 60%),
      var(--theme-background);
  }

  /* ---- Top bar ---- */
  .topbar {
    position: sticky;
    top: 0;
    z-index: 30;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1rem;
    width: min(1180px, 100%);
    margin: 0 auto;
    padding: 1.1rem clamp(1.1rem, 4vw, 2rem);
    background: color-mix(in srgb, var(--theme-background) 72%, transparent);
    backdrop-filter: blur(14px) saturate(1.1);
    border-bottom: 1px solid color-mix(in srgb, var(--theme-border) 70%, transparent);
  }

  .brand,
  .nav,
  .top-actions,
  .cta,
  .eyebrow,
  .scroll-cue {
    display: flex;
    align-items: center;
  }

  .brand {
    gap: 0.6rem;
    color: var(--theme-foreground);
    text-decoration: none;
    font-weight: 600;
  }
  .disc {
    width: 1.05rem;
    height: 1.05rem;
    border-radius: 50%;
    background: var(--theme-primary);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--theme-primary) 16%, transparent);
  }
  .brand strong {
    font-size: 0.98rem;
    letter-spacing: 0.01em;
  }

  .nav {
    justify-content: center;
    gap: clamp(1rem, 2.4vw, 2.2rem);
  }
  .nav a,
  .hire {
    color: var(--theme-muted-foreground);
    text-decoration: none;
    font-size: 0.88rem;
    transition: color 160ms ease;
  }
  .nav a {
    position: relative;
  }
  .nav a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.35rem;
    width: 100%;
    height: 1px;
    background: var(--theme-accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 220ms ease;
  }
  .nav a:hover {
    color: var(--theme-foreground);
  }
  .nav a:hover::after {
    transform: scaleX(1);
  }

  .top-actions {
    justify-content: flex-end;
    gap: 0.55rem;
  }
  .hire {
    padding: 0.55rem 1rem;
    border-radius: var(--radius);
    background: var(--theme-foreground);
    color: var(--theme-background);
    font-weight: 600;
    transition: background 160ms ease, color 160ms ease;
  }
  .hire:hover {
    background: var(--theme-primary);
    color: var(--theme-primary-foreground);
  }

  .menu-btn {
    display: none;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid var(--theme-border);
    border-radius: var(--radius);
    background: transparent;
    color: var(--theme-foreground);
    cursor: pointer;
  }

  .mobile-menu {
    display: none;
    position: absolute;
    top: calc(100% + 0.5rem);
    inset-inline: clamp(1.1rem, 4vw, 2rem);
    flex-direction: column;
    padding: 0.6rem;
    border: 1px solid var(--theme-border);
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--theme-card) 96%, transparent);
    backdrop-filter: blur(14px);
    box-shadow: 0 1.5rem 3rem color-mix(in srgb, #000 45%, transparent);
  }
  .mobile-menu a {
    padding: 0.8rem 0.7rem;
    color: var(--theme-foreground);
    text-decoration: none;
    font-size: 0.95rem;
    border-radius: calc(var(--radius) - 1px);
  }
  .mobile-menu a:hover {
    background: var(--theme-secondary);
  }
  .mobile-menu .m-hire {
    margin-top: 0.3rem;
    background: var(--theme-primary);
    color: var(--theme-primary-foreground);
    font-weight: 600;
    text-align: center;
  }

  /* ---- Layout container for sections ---- */
  .hero,
  .section {
    width: min(1180px, 100%);
    margin: 0 auto;
    padding-inline: clamp(1.1rem, 4vw, 2rem);
  }

  /* ---- Hero ---- */
  .hero {
    position: relative;
    min-height: min(820px, calc(100svh - 4rem));
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: clamp(3rem, 8vh, 5rem);
    padding-bottom: clamp(3.5rem, 8vh, 5.5rem);
  }
  .embers {
    position: absolute;
    inset: -4rem 0 0 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.9;
    -webkit-mask-image: radial-gradient(120% 90% at 70% 30%, black, transparent 78%);
    mask-image: radial-gradient(120% 90% at 70% 30%, black, transparent 78%);
  }
  .hero-copy {
    position: relative;
    z-index: 1;
    max-width: 60rem;
  }

  .eyebrow {
    gap: 0.6rem;
    margin: 0 0 1.6rem;
    color: var(--theme-muted-foreground);
    font-size: 0.84rem;
    letter-spacing: 0.02em;
  }
  .ping {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--theme-primary);
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--theme-primary) 70%, transparent);
    animation: ping 2.4s ease-out infinite;
  }
  @keyframes ping {
    0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--theme-primary) 55%, transparent); }
    70%, 100% { box-shadow: 0 0 0 0.7rem transparent; }
  }

  .hero-name {
    margin: 0;
    font-size: clamp(3.6rem, 12vw, 9.5rem);
    line-height: 0.96;
    display: flex;
    flex-direction: column;
  }
  .hero-name .ln2 {
    /* faint fill as a fallback if -webkit-text-stroke is unsupported */
    color: color-mix(in srgb, var(--theme-foreground) 13%, transparent);
    -webkit-text-stroke: clamp(1.1px, 0.14vw, 2px) var(--theme-foreground);
  }

  .accent-rule {
    display: block;
    width: 4.5rem;
    height: 3px;
    margin: 1.8rem 0 1.6rem;
    background: var(--theme-primary);
  }

  .positioning {
    max-width: 42rem;
    margin: 0 0 0.9rem;
    color: var(--theme-foreground);
    font-size: clamp(1.1rem, 2vw, 1.45rem);
    line-height: 1.5;
  }
  .proof {
    margin: 0 0 2.2rem;
    color: var(--theme-muted-foreground);
    font-size: 0.92rem;
    letter-spacing: 0.01em;
    font-variant-numeric: tabular-nums;
  }

  .cta {
    gap: 0.7rem 0.9rem;
    flex-wrap: wrap;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.2rem;
    border-radius: var(--radius);
    font-size: 0.92rem;
    font-weight: 600;
    text-decoration: none;
    transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, color 160ms ease;
  }
  .btn-lg {
    padding: 0.95rem 1.5rem;
    font-size: 0.98rem;
  }
  .btn-solid {
    background: var(--theme-primary);
    color: var(--theme-primary-foreground);
    border: 1px solid var(--theme-primary);
  }
  .btn-solid:hover {
    background: var(--theme-accent);
    border-color: var(--theme-accent);
    transform: translateY(-2px);
  }
  .btn-ghost {
    border: 1px solid var(--theme-border);
    color: var(--theme-foreground);
    background: color-mix(in srgb, var(--theme-card) 50%, transparent);
  }
  .btn-ghost:hover {
    border-color: var(--theme-accent);
    color: var(--theme-accent);
    transform: translateY(-2px);
  }
  .loc {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-inline-start: 0.3rem;
    color: var(--theme-muted-foreground);
    font-size: 0.86rem;
  }

  .scroll-cue {
    position: absolute;
    bottom: 1.6rem;
    inset-inline-start: clamp(1.1rem, 4vw, 2rem);
    z-index: 1;
    gap: 0.45rem;
    color: var(--theme-muted-foreground);
    text-decoration: none;
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .scroll-cue :global(svg) {
    animation: nudge 1.8s ease-in-out infinite;
  }
  @keyframes nudge {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(4px); }
  }

  /* ---- Generic section scaffolding ---- */
  .section {
    padding-top: clamp(4.5rem, 9vw, 7.5rem);
    padding-bottom: clamp(1rem, 2vw, 2rem);
  }
  .kicker {
    margin: 0 0 2.4rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--theme-border);
    color: var(--theme-accent);
    font-size: 0.74rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  /* ---- About ---- */
  .about-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
    gap: clamp(2rem, 6vw, 5rem);
    align-items: start;
  }
  .about h2 {
    margin: 0;
    font-size: clamp(1.9rem, 4vw, 3.4rem);
    line-height: 1.08;
  }
  .lede {
    margin: 0;
    color: var(--theme-muted-foreground);
    font-size: 1.05rem;
    line-height: 1.85;
  }
  .about-side {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .current {
    margin: 0;
    color: var(--theme-muted-foreground);
    font-size: 0.92rem;
  }
  .current a {
    color: var(--theme-accent);
    text-decoration: none;
    border-bottom: 1px solid color-mix(in srgb, var(--theme-accent) 35%, transparent);
    transition: border-color 160ms ease;
  }
  .current a:hover {
    border-bottom-color: var(--theme-accent);
  }

  /* ---- What I build ---- */
  .build-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    background: var(--theme-border);
    border: 1px solid var(--theme-border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .build-card {
    display: flex;
    flex-direction: column;
    min-height: 13.5rem;
    padding: clamp(1.6rem, 3vw, 2.6rem);
    background: var(--theme-background);
    transition: background 200ms ease;
  }
  .build-card:hover {
    background: var(--theme-card);
  }
  .build-card .num {
    color: var(--theme-accent);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
  }
  .build-card h3 {
    margin: 1rem 0 0.7rem;
    font-size: clamp(1.3rem, 2.4vw, 1.75rem);
    line-height: 1.15;
  }
  .build-card p {
    margin: 0;
    max-width: 30rem;
    color: var(--theme-muted-foreground);
    line-height: 1.7;
    font-size: 0.96rem;
  }

  /* ---- Where I've worked (editorial contents list) ---- */
  .work-list {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--theme-border);
    counter-reset: none;
  }
  .work-row {
    display: grid;
    grid-template-columns: 3.5rem minmax(11rem, 20rem) 1fr;
    gap: clamp(1rem, 3vw, 2.5rem);
    align-items: baseline;
    padding: clamp(1.4rem, 2.6vw, 2.1rem) 0.6rem;
    border-bottom: 1px solid var(--theme-border);
  }
  .w-index {
    color: var(--theme-muted-foreground);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    font-variant-numeric: tabular-nums;
  }
  .w-head {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .w-name {
    margin: 0;
    font-size: clamp(1.5rem, 2.8vw, 2.3rem);
    line-height: 1;
  }
  .w-tag {
    width: fit-content;
    color: var(--theme-accent);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .w-body {
    margin: 0;
    color: var(--theme-muted-foreground);
    line-height: 1.7;
    font-size: 0.98rem;
    max-width: 40rem;
  }
  .w-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: inherit;
    text-decoration: none;
    transition: color 160ms ease;
  }
  .w-link :global(svg) {
    color: var(--theme-accent);
    transition: transform 180ms ease;
  }
  .w-link:hover {
    color: var(--theme-accent);
  }
  .w-link:hover :global(svg) {
    transform: translate(2px, -2px);
  }

  /* ---- Contact ---- */
  .contact {
    padding-bottom: 3rem;
  }
  .contact-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
    gap: clamp(2rem, 6vw, 5rem);
    align-items: end;
  }
  .contact h2 {
    margin: 0 0 1.3rem;
    font-size: clamp(2.4rem, 6vw, 5rem);
    line-height: 1;
  }
  .contact-side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .note {
    margin: 0;
    color: var(--theme-muted-foreground);
    font-size: 0.9rem;
  }
  .ghost-link {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--theme-muted-foreground);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 160ms ease;
  }
  .ghost-link:hover {
    color: var(--theme-accent);
  }
  .footer-bar {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: clamp(3rem, 7vw, 5.5rem);
    padding-top: 1.4rem;
    border-top: 1px solid var(--theme-border);
    color: var(--theme-muted-foreground);
    font-size: 0.82rem;
  }

  /* ---- Reveal-on-scroll ---- */
  :global(.reveal) {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 620ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  :global(.reveal.in) {
    opacity: 1;
    transform: none;
  }

  /* ---- Hero staggered load ---- */
  .hero-copy > * {
    animation: rise 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .hero-copy > :nth-child(1) { animation-delay: 0.05s; }
  .hero-copy > :nth-child(2) { animation-delay: 0.13s; }
  .hero-copy > :nth-child(3) { animation-delay: 0.22s; }
  .hero-copy > :nth-child(4) { animation-delay: 0.3s; }
  .hero-copy > :nth-child(5) { animation-delay: 0.38s; }
  .hero-copy > :nth-child(6) { animation-delay: 0.46s; }
  @keyframes rise {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: none; }
  }

  /* ---- Responsive ---- */
  @media (max-width: 880px) {
    .nav { display: none; }
    .menu-btn { display: inline-flex; }
    .mobile-menu { display: flex; }
    .about-grid,
    .contact-grid { grid-template-columns: 1fr; }
    .build-grid { grid-template-columns: 1fr; }
    .contact-grid { align-items: start; }
    .work-row {
      grid-template-columns: 2.6rem 1fr;
      row-gap: 0.7rem;
    }
    .w-body { grid-column: 1 / -1; }
  }

  @media (max-width: 560px) {
    .hero-name { font-size: clamp(3rem, 17vw, 4.6rem); }
    .cta { width: 100%; }
    .btn { flex: 1 1 auto; justify-content: center; }
    .loc { width: 100%; margin-top: 0.3rem; }
    .scroll-cue { display: none; }
    .hire { padding: 0.5rem 0.8rem; font-size: 0.82rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(html) { scroll-behavior: auto; }
    :global(.reveal),
    .hero-copy > *,
    .ping,
    .scroll-cue :global(svg),
    .btn,
    .work-row,
    .build-card {
      animation: none !important;
      transition: none !important;
    }
    .btn:hover { transform: none; }
  }
</style>
