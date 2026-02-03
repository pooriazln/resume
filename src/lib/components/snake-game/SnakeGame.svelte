<script lang="ts">
	import { onMount } from 'svelte';
	import { t, dir } from '$lib/i18n';
	import {
		createState,
		setDirection,
		tick,
		getTickMs,
		lerpPos,
		type SnakeState,
		type Direction,
	} from './snake-engine';

	const CELL_SIZE = 16;
	const RESTART_DELAY = 2000;
	const SEGMENT_SPACING = CELL_SIZE * 0.95;
	const MAX_TRAIL = 500;

	let wrapper: HTMLDivElement;
	let gameContainer: HTMLDivElement;
	let game: SnakeState;
	let lastTickTime = 0;
	let restartTimer: ReturnType<typeof setTimeout> | null = null;
	let isVisible = true;
	let isFocused = false;

	/** Ring buffer of head pixel positions for smooth body trail */
	let trail: { x: number; y: number }[] = [];

	// Game is inactive until user clicks to play — no PixiJS, no rendering
	let active = $state(false);
	let pixiReady = false;

	// PixiJS objects
	let app: import('pixi.js').Application;
	let snakeGfx: import('pixi.js').Graphics;
	let foodGfx: import('pixi.js').Graphics;
	let glowGfx: import('pixi.js').Graphics;
	let gridGfx: import('pixi.js').Graphics;
	let scoreText: import('pixi.js').Text;
	let centerText: import('pixi.js').Text;

	// Cached theme colors
	let primaryColor = '#38bdf8';
	let accentColor = '#818cf8';
	let foregroundColor = '#f0f0f5';
	let mutedColor = '#a0a0b0';

	let logicalW = 0;
	let logicalH = 0;

	function readColors(): void {
		const style = getComputedStyle(wrapper);
		primaryColor = style.getPropertyValue('--theme-primary').trim() || '#38bdf8';
		accentColor = style.getPropertyValue('--theme-accent').trim() || '#818cf8';
		foregroundColor = style.getPropertyValue('--theme-foreground').trim() || '#f0f0f5';
		mutedColor = style.getPropertyValue('--theme-muted-foreground').trim() || '#a0a0b0';
		if (gridGfx && game) drawGrid();
	}

	function getGridSize(): { cols: number; rows: number } {
		return {
			cols: Math.floor(logicalW / CELL_SIZE),
			rows: Math.floor(logicalH / CELL_SIZE),
		};
	}

	function easeInOutSine(t: number): number {
		return -(Math.cos(Math.PI * t) - 1) / 2;
	}

	/** Populate trail from current snake grid positions with sub-pixel intermediates */
	function initTrail(): void {
		trail = [];
		const half = CELL_SIZE / 2;
		for (let i = 0; i < game.snake.length; i++) {
			const seg = game.snake[i];
			const px = seg.x * CELL_SIZE + half;
			const py = seg.y * CELL_SIZE + half;
			if (i > 0) {
				// Insert intermediate points between consecutive segments
				const prev = trail[trail.length - 1];
				const steps = Math.ceil(CELL_SIZE / 2);
				for (let s = 1; s < steps; s++) {
					const frac = s / steps;
					trail.push({
						x: prev.x + (px - prev.x) * frac,
						y: prev.y + (py - prev.y) * frac,
					});
				}
			}
			trail.push({ x: px, y: py });
		}
	}

	/**
	 * Walk backward through trail measuring arc length, skipping wrap-around
	 * discontinuities. Returns interpolated {x, y} at target distance.
	 */
	function walkTrail(distance: number, canvasW: number, canvasH: number): { x: number; y: number } {
		if (trail.length === 0) return { x: 0, y: 0 };
		if (distance <= 0) return { x: trail[0].x, y: trail[0].y };

		const halfW = canvasW / 2;
		const halfH = canvasH / 2;
		let remaining = distance;

		for (let i = 1; i < trail.length; i++) {
			const a = trail[i - 1];
			const b = trail[i];
			const dx = b.x - a.x;
			const dy = b.y - a.y;

			// Skip wrap-around discontinuities
			if (Math.abs(dx) > halfW || Math.abs(dy) > halfH) continue;

			const segLen = Math.sqrt(dx * dx + dy * dy);
			if (segLen < 0.001) continue;

			if (remaining <= segLen) {
				const frac = remaining / segLen;
				return {
					x: a.x + dx * frac,
					y: a.y + dy * frac,
				};
			}
			remaining -= segLen;
		}

		// Trail too short — return last point
		return { x: trail[trail.length - 1].x, y: trail[trail.length - 1].y };
	}

	/** Modulo-wrap coordinates to canvas bounds */
	function wrapPos(x: number, y: number, w: number, h: number): { x: number; y: number } {
		return {
			x: ((x % w) + w) % w,
			y: ((y % h) + h) % h,
		};
	}

	/** Draw a body segment circle with size/alpha based on position in snake */
	function drawSegment(x: number, y: number, index: number, total: number): void {
		const segT = index / Math.max(total - 1, 1);
		const alpha = 0.2 + 0.4 * (1 - segT);
		const radius = CELL_SIZE * 0.32;
		snakeGfx.circle(x, y, radius);
		snakeGfx.fill({ color: primaryColor, alpha });
	}

	function resetGame(cols?: number, rows?: number): void {
		if (!cols || !rows) {
			const grid = getGridSize();
			cols = grid.cols;
			rows = grid.rows;
		}
		game = createState(cols, rows);
		lastTickTime = 0;
		if (restartTimer) {
			clearTimeout(restartTimer);
			restartTimer = null;
		}
		initTrail();
	}

	function deactivate(): void {
		active = false;
		if (app) app.ticker.stop();
	}

	function scheduleRestart(): void {
		if (restartTimer) return;
		restartTimer = setTimeout(() => {
			resetGame();
			deactivate();
			restartTimer = null;
		}, RESTART_DELAY);
	}

	function drawGrid(): void {
		gridGfx.clear();
		const { cols, rows } = game;
		for (let x = 0; x < cols; x++) {
			for (let y = 0; y < rows; y++) {
				gridGfx.rect(
					x * CELL_SIZE + CELL_SIZE / 2 - 0.5,
					y * CELL_SIZE + CELL_SIZE / 2 - 0.5,
					1,
					1,
				);
			}
		}
		gridGfx.fill({ color: foregroundColor, alpha: 0.04 });
	}

	function gameLoop(ticker: import('pixi.js').Ticker): void {
		if (!game || !isVisible || !active) return;

		const now = performance.now();
		const tickMs = getTickMs(game.score);

		if (game.started && !game.gameOver) {
			if (lastTickTime === 0) lastTickTime = now;
			while (now - lastTickTime >= tickMs) {
				tick(game);
				lastTickTime += tickMs;
				if (game.gameOver) {
					scheduleRestart();
					break;
				}
			}
		}

		const rawT =
			game.started && !game.gameOver && lastTickTime > 0
				? Math.min(1, (now - lastTickTime) / tickMs)
				: 1;
		const interpT = rawT;

		// -- Compute head pixel position and prepend to trail --
		const headPrev = game.prevSnake[0] ?? game.snake[0];
		const headCurr = game.snake[0];
		const headPos = lerpPos(headPrev, headCurr, interpT, game.cols, game.rows, CELL_SIZE);

		// Prepend head position to trail
		trail.unshift({ x: headPos.x, y: headPos.y });
		if (trail.length > MAX_TRAIL) trail.length = MAX_TRAIL;

		// -- Render snake --
		snakeGfx.clear();
		glowGfx.clear();
		const len = game.snake.length;
		const canvasW = game.cols * CELL_SIZE;
		const canvasH = game.rows * CELL_SIZE;

		// Draw head
		const wrappedHead = wrapPos(headPos.x, headPos.y, canvasW, canvasH);
		snakeGfx.circle(wrappedHead.x, wrappedHead.y, CELL_SIZE * 0.42);
		snakeGfx.fill({ color: primaryColor, alpha: 0.75 });
		glowGfx.circle(wrappedHead.x, wrappedHead.y, CELL_SIZE * 0.75);
		glowGfx.fill({ color: primaryColor, alpha: 0.12 });

		// Draw body segments by walking the trail
		for (let i = 1; i < len; i++) {
			const pos = walkTrail(i * SEGMENT_SPACING, canvasW, canvasH);
			const wrapped = wrapPos(pos.x, pos.y, canvasW, canvasH);
			drawSegment(wrapped.x, wrapped.y, i, len);
		}

		// -- Render food --
		foodGfx.clear();
		const pulse = 0.85 + 0.15 * Math.sin(now * 0.004);
		const fx = game.food.x * CELL_SIZE + CELL_SIZE / 2;
		const fy = game.food.y * CELL_SIZE + CELL_SIZE / 2;
		const foodR = (CELL_SIZE / 2) * 0.55 * pulse;

		foodGfx.circle(fx, fy, foodR * 2.8);
		foodGfx.fill({ color: accentColor, alpha: 0.1 });
		foodGfx.circle(fx, fy, foodR);
		foodGfx.fill({ color: accentColor, alpha: 0.65 });

		// -- Score text --
		if (game.started) {
			scoreText.text = `${$t.snakeGame.score}: ${game.score}`;
			scoreText.style.fill = foregroundColor;
			scoreText.alpha = 0.5;
			scoreText.visible = true;
			if ($dir === 'rtl') {
				scoreText.anchor.set(0, 0);
				scoreText.x = CELL_SIZE * 0.5;
			} else {
				scoreText.anchor.set(1, 0);
				scoreText.x = logicalW - CELL_SIZE * 0.5;
			}
			scoreText.y = CELL_SIZE * 0.4;
		} else {
			scoreText.visible = false;
		}

		// -- Game over text --
		if (game.gameOver) {
			centerText.text = $t.snakeGame.gameOver;
			centerText.style.fill = foregroundColor;
			centerText.style.fontSize = Math.max(14, Math.min(18, logicalW / 20));
			centerText.style.fontWeight = '600';
			centerText.alpha = 0.6;
			centerText.visible = true;
		} else {
			centerText.visible = false;
		}
		centerText.x = logicalW / 2;
		centerText.y = logicalH / 2;
	}

	// --- Input handling ---

	const KEY_MAP: Record<string, Direction> = {
		ArrowUp: 'up',
		ArrowDown: 'down',
		ArrowLeft: 'left',
		ArrowRight: 'right',
		w: 'up',
		W: 'up',
		s: 'down',
		S: 'down',
		a: 'left',
		A: 'left',
		d: 'right',
		D: 'right',
	};

	function forceEarlyTick(): void {
		if (!game.started || game.gameOver || game.inputQueue.length === 0) return;
		if (lastTickTime <= 0) return;

		const now = performance.now();
		const tickMs = getTickMs(game.score);

		// Capture the current visual head position into the trail before the tick
		// so the body path stays continuous through the direction change
		const rawT = Math.min(1, (now - lastTickTime) / tickMs);
		const headPrev = game.prevSnake[0] ?? game.snake[0];
		const headCurr = game.snake[0];
		const pos = lerpPos(headPrev, headCurr, rawT, game.cols, game.rows, CELL_SIZE);
		trail.unshift({ x: pos.x, y: pos.y });
		if (trail.length > MAX_TRAIL) trail.length = MAX_TRAIL;

		tick(game);
		// Give the head a small initial offset so it doesn't appear stuck at t=0
		lastTickTime = now - tickMs * 0.15;
		if (game.gameOver) scheduleRestart();
	}

	function applyDirection(newDir: Direction): void {
		if (!game.gameOver) {
			setDirection(game, newDir);
			forceEarlyTick();
		}
	}

	function handleKeydown(e: KeyboardEvent): void {
		if (!isFocused || !isVisible || !game || !active) return;
		const newDir = KEY_MAP[e.key];
		if (!newDir) return;
		e.preventDefault();
		applyDirection(newDir);
	}

	function handleTap(e: PointerEvent): void {
		if (!game || !active) return;
		isFocused = true;
		wrapper.focus();

		const rect = wrapper.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const cx = rect.width / 2;
		const cy = rect.height / 2;
		const dx = x - cx;
		const dy = y - cy;

		let newDir: Direction;
		if (Math.abs(dx) > Math.abs(dy)) {
			newDir = dx > 0 ? 'right' : 'left';
		} else {
			newDir = dy > 0 ? 'down' : 'up';
		}

		applyDirection(newDir);
	}

	function handleFocus(): void {
		isFocused = true;
	}

	function handleBlur(): void {
		isFocused = false;
	}

	// --- Activation: lazy-load PixiJS on first play ---

	async function activate(): Promise<void> {
		active = true;
		isFocused = true;
		wrapper.focus();

		if (!pixiReady) {
			await initPixi();
			pixiReady = true;
		} else {
			// Re-use existing PixiJS instance
			const rect = wrapper.getBoundingClientRect();
			logicalW = rect.width;
			logicalH = rect.height;
			app.renderer.resize(logicalW, logicalH);
			const { cols, rows } = getGridSize();
			resetGame(cols, rows);
			drawGrid();
			app.ticker.start();
		}

		// Start the snake immediately
		game.started = true;
		lastTickTime = 0;
	}

	async function initPixi(): Promise<void> {
		const { Application, Graphics, Text, TextStyle } = await import('pixi.js');

		const rect = gameContainer.getBoundingClientRect();
		logicalW = rect.width;
		logicalH = rect.height;

		app = new Application();
		await app.init({
			width: logicalW,
			height: logicalH,
			backgroundAlpha: 0,
			antialias: true,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
		});

		gameContainer.appendChild(app.canvas);
		app.canvas.style.display = 'block';
		app.canvas.style.width = '100%';
		app.canvas.style.height = '100%';
		app.canvas.style.touchAction = 'none';

		gridGfx = new Graphics();
		glowGfx = new Graphics();
		foodGfx = new Graphics();
		snakeGfx = new Graphics();

		const fontFamily = "'Vazirmatn', 'Inter', sans-serif";

		scoreText = new Text({
			text: '',
			style: new TextStyle({
				fontFamily,
				fontSize: Math.max(11, CELL_SIZE * 0.65),
				fontWeight: '600',
				fill: foregroundColor,
			}),
		});
		scoreText.visible = false;

		centerText = new Text({
			text: '',
			style: new TextStyle({
				fontFamily,
				fontSize: 13,
				fontWeight: '400',
				fill: mutedColor,
			}),
		});
		centerText.anchor.set(0.5, 0.5);

		app.stage.addChild(gridGfx, glowGfx, foodGfx, snakeGfx, scoreText, centerText);

		const { cols, rows } = getGridSize();
		resetGame(cols, rows);
		drawGrid();

		app.ticker.add(gameLoop);
	}

	function handleResize(): void {
		if (!app || !wrapper || !active) return;
		const rect = gameContainer.getBoundingClientRect();
		logicalW = rect.width;
		logicalH = rect.height;
		app.renderer.resize(logicalW, logicalH);
		const { cols, rows } = getGridSize();
		if (!game || cols !== game.cols || rows !== game.rows) {
			resetGame(cols, rows);
			drawGrid();
		}
	}

	onMount(() => {
		readColors();

		const themeObs = new MutationObserver(() => readColors());
		themeObs.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme'],
		});

		const visObs = new IntersectionObserver(
			(entries) => {
				isVisible = entries[0].isIntersecting;
				if (app && active) {
					if (isVisible) app.ticker.start();
					else app.ticker.stop();
				}
			},
			{ threshold: 0.1 },
		);
		visObs.observe(wrapper);

		window.addEventListener('resize', handleResize);
		window.addEventListener('keydown', handleKeydown);

		return () => {
			themeObs.disconnect();
			visObs.disconnect();
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('keydown', handleKeydown);
			if (restartTimer) clearTimeout(restartTimer);
			if (app) app.destroy(true, { children: true });
		};
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	bind:this={wrapper}
	class="snake-wrapper"
	tabindex="0"
	role="img"
	aria-label="Snake game"
	onfocus={handleFocus}
	onblur={handleBlur}
>
	{#if active}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			bind:this={gameContainer}
			class="snake-viewport"
			onpointerdown={handleTap}
		></div>
	{:else}
		<button class="snake-hint" onclick={() => activate()}>
			{$t.snakeGame.hint}
		</button>
	{/if}
</div>

<style>
	.snake-wrapper {
		position: relative;
		width: 100%;
		max-width: 360px;
		height: 220px;
		margin: 0 auto;
		border-radius: 0.75rem;
		border: 1px solid var(--theme-border);
		background: color-mix(in srgb, var(--theme-card) 50%, transparent);
		overflow: hidden;
		outline: none;
		transition: border-color 0.2s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.snake-wrapper:focus,
	.snake-wrapper:focus-within {
		border-color: var(--theme-primary);
	}

	.snake-viewport {
		width: 100%;
		height: 100%;
		cursor: pointer;
		touch-action: none;
	}

	.snake-hint {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background: none;
		border: none;
		color: var(--theme-muted-foreground);
		font-family: 'Vazirmatn', 'Inter', sans-serif;
		font-size: 0.8rem;
		cursor: pointer;
		opacity: 0.55;
		transition: opacity 0.2s ease;
	}

	.snake-hint:hover {
		opacity: 0.85;
	}
</style>
