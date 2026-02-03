<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	type Variant = "default" | "secondary" | "destructive" | "outline";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: Variant;
	}

	let { class: className, variant = "default", children, ...restProps }: Props = $props();

	const variants: Record<Variant, string> = {
		default: "border-transparent bg-primary text-primary-foreground",
		secondary: "border-transparent bg-secondary text-secondary-foreground",
		destructive: "border-transparent bg-destructive text-destructive-foreground",
		outline: "text-foreground border-border",
	};
</script>

<div
	class={cn(
		"inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
		variants[variant],
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
