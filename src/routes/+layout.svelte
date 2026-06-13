<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { content } from '$lib/content';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{content.name} — Full-stack & on-chain engineer</title>
	<meta name="description" content={content.positioning} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://pooriazln.ir/" />
	<meta property="og:title" content="{content.name} — Full-stack & on-chain engineer" />
	<meta property="og:description" content={content.positioning} />
	<meta property="og:image" content="https://pooriazln.ir/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="{content.name} — Full-stack & on-chain engineer" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{content.name} — Full-stack & on-chain engineer" />
	<meta name="twitter:description" content={content.positioning} />
	<meta name="twitter:image" content="https://pooriazln.ir/og.png" />
</svelte:head>

<div dir="ltr" lang="en" class="min-h-screen">
	{@render children()}
</div>
