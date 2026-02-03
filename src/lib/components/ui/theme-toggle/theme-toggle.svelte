<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';
	import { theme, toggleTheme } from '$lib/theme';
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<button
	onclick={(e) => toggleTheme(e)}
	class={cn(
		"relative w-12 h-12 rounded-full bg-card border border-border hover:border-primary transition-all duration-300 flex items-center justify-center overflow-hidden group",
		className
	)}
	aria-label="Toggle theme"
>
	<!-- Sun icon -->
	<div
		class={cn(
			"absolute transition-all duration-500 ease-out",
			$theme === 'light'
				? "translate-y-0 opacity-100 rotate-0"
				: "-translate-y-10 opacity-0 rotate-90"
		)}
	>
		<Sun class="w-5 h-5 text-amber-500" />
	</div>

	<!-- Moon icon -->
	<div
		class={cn(
			"absolute transition-all duration-500 ease-out",
			$theme === 'dark'
				? "translate-y-0 opacity-100 rotate-0"
				: "translate-y-10 opacity-0 -rotate-90"
		)}
	>
		<Moon class="w-5 h-5 text-primary" />
	</div>

	<!-- Glow effect -->
	<div
		class={cn(
			"absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
			$theme === 'light' ? "bg-amber-500/10" : "bg-primary/10"
		)}
	></div>
</button>
