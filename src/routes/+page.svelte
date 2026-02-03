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
<div class="hero" class:visible>
	<div class="hero-bg">
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		<div class="orb orb-3"></div>
		<!-- Floating particles -->
		<div class="particle particle-1"></div>
		<div class="particle particle-2"></div>
		<div class="particle particle-3"></div>
		<div class="particle particle-4"></div>
		<div class="particle particle-5"></div>
		<div class="particle particle-6"></div>
	</div>
	<div class="hero-content">
		<h1 class="text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight animate-fade-up">
			{$t.name}
		</h1>
		<p class="text-lg md:text-xl text-muted-foreground mb-6 font-light tracking-wide animate-fade-up-delay-1">
			{$t.titleParts[0]} <span class="text-primary">/</span> {$t.titleParts[1]} <span class="text-primary">/</span> {$t.titleParts[2]}
		</p>
		<div class="flex items-center justify-center flex-wrap gap-4 text-sm animate-fade-up-delay-2">
			<a href="mailto:pooria.zln83@gmail.com" class="text-primary hover:opacity-80 transition-opacity">
				pooria.zln83@gmail.com
			</a>
			<span class="w-1 h-1 rounded-full bg-primary"></span>
			<a href="https://github.com/pooriazln" target="_blank" rel="noopener" class="text-primary hover:opacity-80 transition-opacity">
				github.com/pooriazln
			</a>
			<span class="w-1 h-1 rounded-full bg-primary"></span>
			<span class="text-muted-foreground">{$t.location}</span>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="scroll-indicator">
		<div class="scroll-line"></div>
	</div>
</div>

<!-- Main Content -->
<main class="main-container" class:visible>
	<!-- Stats -->
	<section class="relative grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
		<!-- Subtle glow behind stats -->
		<div class="absolute inset-0 -z-10 blur-3xl opacity-20">
			<div class="absolute top-1/2 left-1/4 w-32 h-32 bg-primary rounded-full"></div>
			<div class="absolute top-1/2 right-1/4 w-24 h-24 bg-accent rounded-full"></div>
		</div>
		<Card class="text-center hover:border-primary transition-colors duration-200 hover:-translate-y-0.5">
			<CardContent class="p-5">
				<span class="block text-2xl font-bold text-primary mb-1">{$t.stats.yearsFullStack.value}</span>
				<span class="text-xs text-muted-foreground uppercase tracking-wider">{$t.stats.yearsFullStack.label}</span>
			</CardContent>
		</Card>
		<Card class="text-center hover:border-primary transition-colors duration-200 hover:-translate-y-0.5">
			<CardContent class="p-5">
				<span class="block text-2xl font-bold text-primary mb-1">{$t.stats.yearsWeb3.value}</span>
				<span class="text-xs text-muted-foreground uppercase tracking-wider">{$t.stats.yearsWeb3.label}</span>
			</CardContent>
		</Card>
		<Card class="text-center hover:border-primary transition-colors duration-200 hover:-translate-y-0.5">
			<CardContent class="p-5">
				<span class="block text-2xl font-bold text-primary mb-1">{$t.stats.chainsDeployed.value}</span>
				<span class="text-xs text-muted-foreground uppercase tracking-wider">{$t.stats.chainsDeployed.label}</span>
			</CardContent>
		</Card>
		<Card class="text-center hover:border-primary transition-colors duration-200 hover:-translate-y-0.5">
			<CardContent class="p-5">
				<span class="block text-2xl font-bold text-primary mb-1">{$t.stats.projects.value}</span>
				<span class="text-xs text-muted-foreground uppercase tracking-wider">{$t.stats.projects.label}</span>
			</CardContent>
		</Card>
	</section>

	<!-- About -->
	<section class="mb-12">
		<h2 class="section-title">{$t.sections.about}</h2>
		<p class="text-muted-foreground leading-relaxed">
			{$t.aboutText}
		</p>
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
							<ul class="space-y-2">
								{#each exp.highlights as highlight}
									<li
										class="relative text-sm text-muted-foreground before:content-[''] before:absolute before:top-2 before:w-1 before:h-1 before:rounded-full before:bg-primary"
										class:pl-4={$dir === 'ltr'}
										class:pr-4={$dir === 'rtl'}
										class:before:left-0={$dir === 'ltr'}
										class:before:right-0={$dir === 'rtl'}
									>
										{highlight}
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

	<!-- Skills -->
	<section class="mb-12">
		<h2 class="section-title">{$t.sections.skills}</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each Object.entries($t.skills) as [category, items]}
				<Card>
					<CardHeader class="pb-3">
						<CardTitle class="text-sm font-semibold text-primary uppercase tracking-wider">{category}</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="flex flex-wrap gap-2">
							{#each items as skill}
								<Badge variant="secondary" class="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
									{skill}
								</Badge>
							{/each}
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
	</section>

	<!-- Snake Game -->
	<section class="mb-12">
		<details class="game-details">
			<summary class="game-summary">
				<span class="game-summary-icon">🎮</span>
				<span class="text-sm font-medium">{$t.snakeGame.sectionTitle}</span>
				<span class="game-chevron"></span>
			</summary>
			<div class="game-content">
				<SnakeGame />
			</div>
		</details>
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
		min-height: 60vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		opacity: 0;
		transition: opacity 1s ease;
	}

	.hero.visible {
		opacity: 1;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: var(--orb-opacity, 0.5);
		animation: float 20s ease-in-out infinite;
		transition: opacity 0.5s ease;
	}

	.orb-1 {
		width: 400px;
		height: 400px;
		background: var(--theme-primary);
		top: -10%;
		left: 20%;
		animation-delay: 0s;
	}

	.orb-2 {
		width: 300px;
		height: 300px;
		background: var(--theme-accent);
		top: 30%;
		right: 10%;
		animation-delay: -7s;
	}

	.orb-3 {
		width: 250px;
		height: 250px;
		background: #06b6d4;
		bottom: -5%;
		left: 40%;
		animation-delay: -14s;
	}

	@keyframes float {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(30px, -30px) scale(1.05);
		}
		50% {
			transform: translate(-20px, 20px) scale(0.95);
		}
		75% {
			transform: translate(-30px, -20px) scale(1.02);
		}
	}

	/* Floating Particles */
	.particle {
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--theme-primary);
		opacity: 0.4;
		animation: floatParticle 15s ease-in-out infinite;
	}

	.particle-1 {
		top: 20%;
		left: 10%;
		animation-delay: 0s;
	}

	.particle-2 {
		top: 60%;
		left: 15%;
		width: 3px;
		height: 3px;
		background: var(--theme-accent);
		animation-delay: -3s;
	}

	.particle-3 {
		top: 30%;
		right: 20%;
		width: 5px;
		height: 5px;
		animation-delay: -6s;
	}

	.particle-4 {
		top: 70%;
		right: 10%;
		width: 3px;
		height: 3px;
		background: #06b6d4;
		animation-delay: -9s;
	}

	.particle-5 {
		top: 15%;
		right: 30%;
		width: 2px;
		height: 2px;
		animation-delay: -12s;
	}

	.particle-6 {
		bottom: 25%;
		left: 25%;
		width: 4px;
		height: 4px;
		background: var(--theme-accent);
		animation-delay: -5s;
	}

	@keyframes floatParticle {
		0%, 100% {
			transform: translate(0, 0);
			opacity: 0.4;
		}
		25% {
			transform: translate(20px, -30px);
			opacity: 0.7;
		}
		50% {
			transform: translate(-15px, -50px);
			opacity: 0.3;
		}
		75% {
			transform: translate(25px, -20px);
			opacity: 0.6;
		}
	}

	.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 2rem;
	}

	/* Scroll Indicator */
	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0;
		animation: fadeIn 1s ease 1s forwards;
	}

	.scroll-line {
		width: 1px;
		height: 40px;
		background: linear-gradient(to bottom, var(--theme-primary), transparent);
		position: relative;
		overflow: hidden;
	}

	.scroll-line::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 10px;
		background: var(--theme-primary);
		animation: scrollDown 1.5s ease-in-out infinite;
	}

	@keyframes scrollDown {
		0% {
			transform: translateY(-10px);
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			transform: translateY(40px);
			opacity: 0;
		}
	}

	/* Collapsible Game Section */
	.game-details {
		border: 1px solid var(--theme-border);
		border-radius: 0.75rem;
		background: color-mix(in srgb, var(--theme-card) 40%, transparent);
		transition: border-color 0.2s ease;
	}

	.game-details[open] {
		border-color: var(--theme-primary);
	}

	.game-summary {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		cursor: pointer;
		color: var(--theme-muted-foreground);
		list-style: none;
		user-select: none;
		transition: color 0.2s ease;
	}

	.game-summary::-webkit-details-marker {
		display: none;
	}

	.game-summary:hover {
		color: var(--theme-foreground);
	}

	.game-summary-icon {
		font-size: 0.9rem;
	}

	.game-chevron {
		margin-inline-start: auto;
		width: 16px;
		height: 16px;
		position: relative;
	}

	.game-chevron::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 6px;
		height: 6px;
		border-right: 1.5px solid currentColor;
		border-bottom: 1.5px solid currentColor;
		transform: translate(-50%, -60%) rotate(45deg);
		transition: transform 0.2s ease;
	}

	.game-details[open] .game-chevron::before {
		transform: translate(-50%, -40%) rotate(-135deg);
	}

	.game-content {
		display: flex;
		justify-content: center;
		padding: 0 1rem 1rem;
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
			min-height: 50vh;
		}

		.orb-1 {
			width: 250px;
			height: 250px;
		}

		.orb-2 {
			width: 200px;
			height: 200px;
		}

		.orb-3 {
			width: 150px;
			height: 150px;
		}

		.main-container {
			padding: 2rem 1rem;
		}
	}

	@media (max-width: 480px) {
		.hero-content h1 {
			font-size: 2rem;
		}
	}
</style>
