<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { currentLang, dir, t } from '$lib/i18n';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{$t.name} - {$t.title}</title>
	<meta name="description" content={$t.aboutText} />
</svelte:head>

<div dir={$dir} lang={$currentLang} class="min-h-screen">
	{@render children()}
</div>
