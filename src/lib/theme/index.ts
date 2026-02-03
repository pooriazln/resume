import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'dark' | 'light';

// Get initial theme from localStorage or default to dark
function getInitialTheme(): Theme {
	if (browser) {
		const stored = localStorage.getItem('theme') as Theme;
		if (stored === 'light' || stored === 'dark') {
			return stored;
		}
	}
	return 'dark';
}

// Create the theme store
export const theme = writable<Theme>(getInitialTheme());

// Subscribe to changes and update localStorage + document
if (browser) {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		document.documentElement.setAttribute('data-theme', value);
	});
}

// Toggle function with circular reveal animation
export async function toggleTheme(event?: MouseEvent | { x: number; y: number }) {
	if (!browser) return;

	const newTheme = get(theme) === 'dark' ? 'light' : 'dark';

	// Get click coordinates for the circle origin
	let x = window.innerWidth / 2;
	let y = window.innerHeight / 2;

	if (event) {
		if (event instanceof MouseEvent) {
			x = event.clientX;
			y = event.clientY;
		} else {
			x = event.x;
			y = event.y;
		}
	}

	// Check for View Transitions API support and reduced motion preference
	const supportsViewTransitions = 'startViewTransition' in document;
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (!supportsViewTransitions || prefersReducedMotion) {
		theme.set(newTheme);
		return;
	}

	// Calculate the radius needed to cover the entire screen
	const endRadius = Math.hypot(
		Math.max(x, window.innerWidth - x),
		Math.max(y, window.innerHeight - y)
	);

	// Start the view transition
	const transition = (document as any).startViewTransition(() => {
		theme.set(newTheme);
	});

	// Wait for the transition to be ready
	await transition.ready;

	// Animate the clip-path
	document.documentElement.animate(
		{
			clipPath: [
				`circle(0px at ${x}px ${y}px)`,
				`circle(${endRadius}px at ${x}px ${y}px)`
			]
		},
		{
			duration: 500,
			easing: 'ease-in-out',
			pseudoElement: '::view-transition-new(root)'
		}
	);
}
