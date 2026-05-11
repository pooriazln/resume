<script lang="ts">
  import { t, dir, toggleLanguage } from '$lib/i18n';
  import { TorusWidget } from '$lib/components/torus-widget';
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
      <TorusWidget />
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
    font-size: clamp(2rem, 5.5vw, 3.75rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.05;
    margin-bottom: 1rem;
    white-space: nowrap;
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
