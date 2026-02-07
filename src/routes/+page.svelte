<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { ThemeToggle } from '$lib/components/ui/theme-toggle';
	import { t, dir, toggleLanguage, currentLang } from '$lib/i18n';
	import { SnakeGame } from '$lib/components/snake-game';

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

<!-- Controls -->
<div
	class="fixed top-4 z-50 flex items-center gap-2"
	class:right-4={$dir === 'ltr'}
	class:left-4={$dir === 'rtl'}
>
	<!-- Theme Toggle -->
	<ThemeToggle />

	<!-- Language Switcher -->
	<button
		onclick={toggleLanguage}
		class="h-12 px-4 rounded-full bg-card border border-border hover:border-primary transition-colors text-sm font-medium"
	>
		{$t.switchLang}
	</button>
</div>

<!-- Hero Section -->
<header class="hero" class:visible>
	<!-- Background effects -->
	<div class="hero-bg">
		<div class="hero-grid"></div>
		<div class="hero-glow hero-glow-1"></div>
		<div class="hero-glow hero-glow-2"></div>
	</div>

	<div class="hero-columns">
		<div class="hero-text">
			<div class="hero-intro animate-fade-up">
				{#if $t.greeting}
					<span class="hero-greeting">{$t.greeting}</span>
				{/if}
				<h1 class="hero-name">{$t.name}</h1>
			</div>
			<div class="hero-title-wrapper animate-fade-up-delay-2">
				<span class="hero-title-item">{$t.titleParts[0]}</span>
				<span class="hero-title-divider"></span>
				<span class="hero-title-item">{$t.titleParts[1]}</span>
				<span class="hero-title-divider"></span>
				<span class="hero-title-item">{$t.titleParts[2]}</span>
			</div>
			<div class="hero-links animate-fade-up-delay-3">
				<a href="mailto:pooria.zln83@gmail.com" class="hero-link">
					<span class="hero-link-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<rect x="2" y="4" width="20" height="16" rx="2"></rect>
							<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
						</svg>
					</span>
					<span>pooria.zln83@gmail.com</span>
				</a>
				<a href="https://github.com/pooriazln" target="_blank" rel="noopener" class="hero-link">
					<span class="hero-link-icon">
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
						</svg>
					</span>
					<span>github.com/pooriazln</span>
				</a>
				<span class="hero-link hero-location">
					<span class="hero-link-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
							<circle cx="12" cy="10" r="3"></circle>
						</svg>
					</span>
					<span>{$t.location}</span>
				</span>
			</div>
		</div>
		<div class="hero-game animate-fade-up-delay-3">
			<SnakeGame />
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="scroll-indicator">
		<div class="scroll-mouse">
			<div class="scroll-wheel"></div>
		</div>
	</div>
</header>

<!-- Main Content -->
<main class="main-container" class:visible>
	<!-- Stats -->
	<section class="stats-section mb-12">
		<div class="stats-grid">
			<div class="stat-card" style="--delay: 0s">
				<div class="stat-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
						<line x1="8" y1="21" x2="16" y2="21"></line>
						<line x1="12" y1="17" x2="12" y2="21"></line>
					</svg>
				</div>
				<div class="stat-content">
					<span class="stat-value">{$t.stats.yearsFullStack.value}</span>
					<span class="stat-label">{$t.stats.yearsFullStack.label}</span>
				</div>
				<div class="stat-glow"></div>
			</div>
			<div class="stat-card" style="--delay: 0.1s">
				<div class="stat-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M10.5 20.5L10 17l-2.5-1.5L5 12V8.5L7 6l3-1h4l3 1 2 2.5V12l-2.5 3.5L14 17l-.5 3.5"></path>
						<path d="M12 12l-2-1v-2l2-1 2 1v2l-2 1z"></path>
					</svg>
				</div>
				<div class="stat-content">
					<span class="stat-value">{$t.stats.yearsWeb3.value}</span>
					<span class="stat-label">{$t.stats.yearsWeb3.label}</span>
				</div>
				<div class="stat-glow"></div>
			</div>
			<div class="stat-card" style="--delay: 0.2s">
				<div class="stat-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
					</svg>
				</div>
				<div class="stat-content">
					<span class="stat-value">{$t.stats.chainsDeployed.value}</span>
					<span class="stat-label">{$t.stats.chainsDeployed.label}</span>
				</div>
				<div class="stat-glow"></div>
			</div>
			<div class="stat-card" style="--delay: 0.3s">
				<div class="stat-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
					</svg>
				</div>
				<div class="stat-content">
					<span class="stat-value">{$t.stats.projects.value}</span>
					<span class="stat-label">{$t.stats.projects.label}</span>
				</div>
				<div class="stat-glow"></div>
			</div>
		</div>
	</section>

	<!-- About -->
	<section class="mb-12">
		<h2 class="section-title">{$t.sections.about}</h2>
		<div class="about-container">
			<p class="about-text">
				{$t.aboutText}
			</p>
		</div>
	</section>

	<!-- Skills -->
	<section class="mb-12">
		<h2 class="section-title">{$t.sections.skills}</h2>
		<div class="skills-grid">
			{#each Object.entries($t.skills) as [category, items], catIdx}
				<div class="skill-group" style="--cat-delay: {catIdx * 0.08}s">
					<div class="skill-group-header">
						<span class="skill-group-icon">
							{#if catIdx === 0}
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
							{:else if catIdx === 1}
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="8" rx="2"></rect><rect x="2" y="14" width="20" height="8" rx="2"></rect><circle cx="6" cy="6" r="1"></circle><circle cx="6" cy="18" r="1"></circle></svg>
							{:else if catIdx === 2}
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
							{:else if catIdx === 3}
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4"></path></svg>
							{:else if catIdx === 4}
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
							{:else}
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
							{/if}
						</span>
						<span class="skill-group-name">{category}</span>
					</div>
					<div class="skill-tags">
						{#each items as skill, skillIdx}
							<span class="skill-tag" style="--skill-delay: {catIdx * 0.08 + skillIdx * 0.04}s">
								{skill}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Experience Timeline -->
	<section class="mb-12">
		<h2 class="section-title">{$t.sections.experience}</h2>

		<div class="relative">
			<!-- Timeline line -->
			<div
				class="absolute top-2 bottom-2 w-[2px] bg-border"
				class:left-[7px]={$dir === 'ltr'}
				class:right-[7px]={$dir === 'rtl'}
			></div>

			<!-- Current date marker -->
			<div class="relative flex items-center gap-4 mb-8">
				<div class="relative z-10 w-4 h-4 rounded-full bg-primary shadow-[0_0_12px_rgba(56,189,248,0.5)]"></div>
				<span class="text-sm font-medium text-primary">{$t.now} - {$t.currentDate}</span>
			</div>

			<!-- Timeline items -->
			{#each $t.experiences as exp, i}
				<div
					class="relative pb-8 last:pb-0"
					class:pl-10={$dir === 'ltr'}
					class:pr-10={$dir === 'rtl'}
				>
					<!-- Timeline dot -->
					<div
						class="absolute top-1 w-4 h-4 rounded-full border-2 border-primary bg-background z-10"
						class:left-0={$dir === 'ltr'}
						class:right-0={$dir === 'rtl'}
					></div>

					<Card class="hover:border-primary/50 transition-colors duration-200">
						<CardHeader class="pb-3">
							<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
								<div>
									<CardTitle class="text-base">{exp.company}</CardTitle>
									<CardDescription class="text-primary">{exp.role}</CardDescription>
								</div>
								<div class:text-right={$dir === 'ltr'} class:text-left={$dir === 'rtl'}>
									<span class="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</span>
									<Badge variant="secondary" class="mx-2 text-xs">{exp.duration}</Badge>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<ul class="highlights-list">
								{#each exp.highlights as highlight, idx}
									<li
										class="highlight-item"
										class:highlight-ltr={$dir === 'ltr'}
										class:highlight-rtl={$dir === 'rtl'}
										style="--delay: {idx * 0.1}s"
									>
										<span class="highlight-icon">
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<polyline points="9 11 12 14 22 4"></polyline>
												<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
											</svg>
										</span>
										<span class="highlight-text">{highlight}</span>
									</li>
								{/each}
							</ul>
						</CardContent>
					</Card>
				</div>
			{/each}

			<!-- Start marker -->
			<div
				class="relative flex items-center gap-4"
				class:pl-10={$dir === 'ltr'}
				class:pr-10={$dir === 'rtl'}
			>
				<div
					class="absolute w-4 h-4 rounded-full border-2 border-muted-foreground bg-background z-10"
					class:left-0={$dir === 'ltr'}
					class:right-0={$dir === 'rtl'}
				></div>
				<span class="text-xs text-muted-foreground">{$t.started}</span>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<Separator class="mb-8" />
	<footer class="text-center text-muted-foreground text-sm pb-8">
		<p>{$t.footer}</p>
	</footer>
</main>

<style>
	/* Hero Section */
	.hero {
		position: relative;
		min-height: 85vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 1.5rem;
		overflow: hidden;
		opacity: 0;
		transition: opacity 0.8s ease;
	}

	.hero.visible {
		opacity: 1;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.hero-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(color-mix(in srgb, var(--theme-primary) 5%, transparent) 1px, transparent 1px),
			linear-gradient(90deg, color-mix(in srgb, var(--theme-primary) 5%, transparent) 1px, transparent 1px);
		background-size: 60px 60px;
		mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
		-webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
	}

	.hero-glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
	}

	.hero-glow-1 {
		width: 500px;
		height: 500px;
		top: 10%;
		left: 20%;
		background: var(--theme-primary);
		opacity: 0.15;
		animation: heroFloat 12s ease-in-out infinite;
	}

	.hero-glow-2 {
		width: 400px;
		height: 400px;
		bottom: 10%;
		right: 15%;
		background: var(--theme-accent);
		opacity: 0.12;
		animation: heroFloat 15s ease-in-out infinite reverse;
	}

	@keyframes heroFloat {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -20px) scale(1.05);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.95);
		}
	}

	.hero-columns {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		gap: 3rem;
		max-width: 1100px;
		width: 100%;
	}

	.hero-text {
		flex: 1;
		text-align: start;
	}

	.hero-game {
		width: 400px;
		height: 300px;
		flex-shrink: 0;
	}

	.hero-intro {
		margin-bottom: 1.5rem;
	}

	.hero-greeting {
		display: block;
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		color: var(--theme-muted-foreground);
		margin-bottom: 0.25rem;
	}

	.hero-name {
		font-size: clamp(2.75rem, 8vw, 4.5rem);
		font-weight: 700;
		color: var(--theme-foreground);
		line-height: 1.15;
		letter-spacing: -0.02em;
		position: relative;
		display: inline-block;
	}

	.hero-name::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background: linear-gradient(90deg, var(--theme-primary), var(--theme-accent));
		border-radius: 2px;
		transform: scaleX(0);
		transform-origin: left;
		animation: underlineGrow 0.8s ease 0.6s forwards;
	}

	@keyframes underlineGrow {
		to {
			transform: scaleX(1);
		}
	}

	.hero-title-wrapper {
		display: flex;
		align-items: center;
		justify-content: start;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 2.5rem;
	}

	.hero-title-item {
		font-size: 1.125rem;
		color: var(--theme-muted-foreground);
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.hero-title-item:hover {
		color: var(--theme-primary);
	}

	.hero-title-divider {
		width: 6px;
		height: 6px;
		background: var(--theme-primary);
		border-radius: 50%;
		opacity: 0.6;
	}

	.hero-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		gap: 1rem;
	}

	.hero-link {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.625rem 1rem;
		background: color-mix(in srgb, var(--theme-card) 80%, transparent);
		border: 1px solid var(--theme-border);
		border-radius: 0.5rem;
		color: var(--theme-muted-foreground);
		font-size: 0.875rem;
		transition: all 0.2s ease;
	}

	.hero-link:hover {
		border-color: var(--theme-primary);
		color: var(--theme-primary);
		transform: translateY(-2px);
	}

	.hero-link-icon {
		width: 1.125rem;
		height: 1.125rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-link-icon svg {
		width: 100%;
		height: 100%;
	}

	/* Scroll Indicator */
	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0;
		animation: fadeIn 1s ease 1.2s forwards;
	}

	.scroll-mouse {
		width: 24px;
		height: 40px;
		border: 2px solid var(--theme-muted-foreground);
		border-radius: 12px;
		position: relative;
		opacity: 0.5;
	}

	.scroll-wheel {
		width: 4px;
		height: 8px;
		background: var(--theme-primary);
		border-radius: 2px;
		position: absolute;
		top: 8px;
		left: 50%;
		transform: translateX(-50%);
		animation: scrollWheel 1.5s ease-in-out infinite;
	}

	@keyframes scrollWheel {
		0%, 100% {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
		50% {
			opacity: 0.3;
			transform: translateX(-50%) translateY(12px);
		}
	}

	:global(.animate-fade-up-delay-3) {
		animation: fadeUp 0.8s ease 0.6s forwards;
		opacity: 0;
	}

	/* Stats Section */
	.stats-section {
		position: relative;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.stats-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.stat-card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 1.5rem;
		background: color-mix(in srgb, var(--theme-card) 60%, transparent);
		border: 1px solid var(--theme-border);
		border-radius: 1rem;
		overflow: hidden;
		opacity: 0;
		transform: translateY(20px);
		animation: statSlideIn 0.6s ease forwards;
		animation-delay: var(--delay);
		transition: all 0.3s ease;
	}

	.stat-card:hover {
		border-color: var(--theme-primary);
		transform: translateY(-4px);
	}

	.stat-card:hover .stat-glow {
		opacity: 1;
	}

	.stat-card:hover .stat-icon {
		transform: scale(1.1);
		color: var(--theme-primary);
	}

	@keyframes statSlideIn {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.stat-icon {
		width: 2.5rem;
		height: 2.5rem;
		color: var(--theme-muted-foreground);
		transition: all 0.3s ease;
	}

	.stat-icon svg {
		width: 100%;
		height: 100%;
	}

	.stat-content {
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 2rem;
		font-weight: 700;
		color: var(--theme-foreground);
		line-height: 1;
		margin-bottom: 0.5rem;
		background: linear-gradient(135deg, var(--theme-primary), var(--theme-accent));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.stat-label {
		font-size: 0.75rem;
		color: var(--theme-muted-foreground);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle at center,
			color-mix(in srgb, var(--theme-primary) 10%, transparent) 0%,
			transparent 70%
		);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}

	/* Animations */
	:global(.animate-fade-up) {
		animation: fadeUp 0.8s ease forwards;
	}

	:global(.animate-fade-up-delay-1) {
		animation: fadeUp 0.8s ease 0.2s forwards;
		opacity: 0;
	}

	:global(.animate-fade-up-delay-2) {
		animation: fadeUp 0.8s ease 0.4s forwards;
		opacity: 0;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Main Container */
	.main-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s;
	}

	.main-container.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.section-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.section-title::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--theme-border);
	}

	@media (max-width: 768px) {
		.hero {
			min-height: auto;
			padding: 5rem 1rem 3rem;
		}

		.hero-columns {
			flex-direction: column;
			gap: 2rem;
		}

		.hero-text {
			text-align: center;
		}

		.hero-title-wrapper {
			justify-content: center;
			gap: 0.5rem;
		}

		.hero-links {
			justify-content: center;
			flex-direction: column;
			gap: 0.625rem;
		}

		.hero-link {
			width: 100%;
			justify-content: center;
		}

		.hero-game {
			width: 100%;
			height: 220px;
		}

		.hero-glow-1 {
			width: 300px;
			height: 300px;
			top: 5%;
			left: 10%;
		}

		.hero-glow-2 {
			width: 250px;
			height: 250px;
			bottom: 5%;
			right: 5%;
		}

		.hero-greeting {
			font-size: 1.125rem;
		}

		.hero-title-item {
			font-size: 0.9375rem;
		}

		.hero-title-divider {
			width: 4px;
			height: 4px;
		}

		.scroll-indicator {
			display: none;
		}

		.stat-card {
			padding: 1.25rem;
		}

		.stat-icon {
			width: 2rem;
			height: 2rem;
		}

		.stat-value {
			font-size: 1.5rem;
		}

		.stat-label {
			font-size: 0.6875rem;
		}

		.main-container {
			padding: 2rem 1rem;
		}
	}

	/* About Section */
	.about-container {
		position: relative;
		padding-inline-start: 1.5rem;
		border-inline-start: 2px solid var(--theme-primary);
	}

	.about-text {
		font-size: 1.0625rem;
		line-height: 1.9;
		color: var(--theme-muted-foreground);
	}

	@media (max-width: 768px) {
		.about-container {
			padding-inline-start: 1rem;
		}

		.about-text {
			font-size: 0.9375rem;
			line-height: 1.7;
		}
	}

	/* Skills Section */
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
	}

	.skill-group {
		padding: 1.25rem;
		background: color-mix(in srgb, var(--theme-card) 60%, transparent);
		border: 1px solid var(--theme-border);
		border-radius: 0.75rem;
		opacity: 0;
		transform: translateY(12px);
		animation: skillGroupIn 0.5s ease forwards;
		animation-delay: var(--cat-delay);
		transition: border-color 0.25s ease;
	}

	.skill-group:hover {
		border-color: color-mix(in srgb, var(--theme-primary) 40%, var(--theme-border));
	}

	/* Last group (if odd count) spans full width */
	.skill-group:last-child:nth-child(odd) {
		grid-column: 1 / -1;
	}

	@keyframes skillGroupIn {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.skill-group-header {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		margin-bottom: 0.875rem;
	}

	.skill-group-icon {
		width: 1.5rem;
		height: 1.5rem;
		color: var(--theme-primary);
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.skill-group-icon svg {
		width: 100%;
		height: 100%;
	}

	.skill-group-name {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--theme-foreground);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.skill-tag {
		padding: 0.375rem 0.75rem;
		font-size: 0.8125rem;
		color: var(--theme-muted-foreground);
		background: color-mix(in srgb, var(--theme-primary) 6%, transparent);
		border: 1px solid color-mix(in srgb, var(--theme-primary) 12%, transparent);
		border-radius: 9999px;
		cursor: default;
		opacity: 0;
		animation: skillTagIn 0.35s ease forwards;
		animation-delay: var(--skill-delay);
		transition: all 0.2s ease;
	}

	.skill-tag:hover {
		color: var(--theme-primary-foreground);
		background: var(--theme-primary);
		border-color: var(--theme-primary);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px color-mix(in srgb, var(--theme-primary) 30%, transparent);
	}

	@keyframes skillTagIn {
		to {
			opacity: 1;
		}
	}

	@media (max-width: 768px) {
		.skills-grid {
			grid-template-columns: 1fr;
		}

		.skill-group {
			padding: 1rem;
		}

		.skill-group-name {
			font-size: 0.75rem;
		}

		.skill-tag {
			padding: 0.3125rem 0.625rem;
			font-size: 0.75rem;
		}
	}

	/* Enhanced Highlights */
	.highlights-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.highlight-item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		background: color-mix(in srgb, var(--theme-primary) 3%, transparent);
		border: 1px solid transparent;
		position: relative;
		overflow: hidden;
		opacity: 0;
		transform: translateY(10px);
		animation: highlightSlideIn 0.5s ease forwards;
		animation-delay: var(--delay);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.highlight-item::before {
		content: '';
		position: absolute;
		top: 0;
		width: 3px;
		height: 100%;
		background: linear-gradient(to bottom, var(--theme-primary), var(--theme-accent));
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.highlight-ltr::before {
		left: 0;
		border-radius: 0.5rem 0 0 0.5rem;
	}

	.highlight-rtl::before {
		right: 0;
		border-radius: 0 0.5rem 0.5rem 0;
	}

	.highlight-ltr {
		padding-left: 1.25rem;
	}

	.highlight-rtl {
		padding-right: 1.25rem;
	}

	.highlight-item:hover {
		background: color-mix(in srgb, var(--theme-primary) 8%, transparent);
		border-color: color-mix(in srgb, var(--theme-primary) 20%, transparent);
		transform: translateX(4px);
	}

	.highlight-rtl:hover {
		transform: translateX(-4px);
	}

	.highlight-item:hover::before {
		opacity: 1;
	}

	.highlight-icon {
		flex-shrink: 0;
		width: 1.25rem;
		height: 1.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--theme-primary);
		opacity: 0.7;
		transition: all 0.3s ease;
	}

	.highlight-icon svg {
		width: 100%;
		height: 100%;
		stroke-dasharray: 50;
		stroke-dashoffset: 50;
		animation: checkDraw 0.6s ease forwards;
		animation-delay: calc(var(--delay) + 0.3s);
	}

	.highlight-item:hover .highlight-icon {
		opacity: 1;
		transform: scale(1.1);
		color: var(--theme-accent);
	}

	.highlight-text {
		font-size: 0.875rem;
		color: var(--theme-muted-foreground);
		line-height: 1.6;
		transition: color 0.3s ease;
	}

	.highlight-item:hover .highlight-text {
		color: var(--theme-foreground);
	}

	@keyframes highlightSlideIn {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes checkDraw {
		to {
			stroke-dashoffset: 0;
		}
	}

	/* Mobile adjustments for highlights */
	@media (max-width: 768px) {
		.highlight-item {
			padding: 0.625rem 0.875rem;
			gap: 0.625rem;
		}

		.highlight-ltr {
			padding-left: 1rem;
		}

		.highlight-rtl {
			padding-right: 1rem;
		}

		.highlight-icon {
			width: 1rem;
			height: 1rem;
			margin-top: 0.125rem;
		}

		.highlight-text {
			font-size: 0.8125rem;
		}

		.highlight-item:hover {
			transform: translateX(2px);
		}

		.highlight-rtl:hover {
			transform: translateX(-2px);
		}
	}

	/* Touch-friendly hover states for mobile */
	@media (hover: none) {
		.highlight-item {
			background: color-mix(in srgb, var(--theme-primary) 5%, transparent);
			border-color: color-mix(in srgb, var(--theme-primary) 10%, transparent);
		}

		.highlight-item::before {
			opacity: 0.5;
		}

		.highlight-item:hover {
			transform: none;
		}

		.highlight-rtl:hover {
			transform: none;
		}
	}
</style>
