export type Direction = 'up' | 'down' | 'left' | 'right';
export type Difficulty = 'easy' | 'normal' | 'hard';

const DIFFICULTY_PARAMS: Record<Difficulty, { start: number; accel: number; floor: number }> = {
	easy: { start: 300, accel: 5, floor: 120 },
	normal: { start: 250, accel: 8, floor: 80 },
	hard: { start: 180, accel: 10, floor: 50 },
};

export interface Point {
	x: number;
	y: number;
}

export interface SnakeState {
	snake: Point[];
	/** Previous positions before last tick — used for interpolation */
	prevSnake: Point[];
	food: Point;
	direction: Direction;
	/** Direction before the last tick — used to detect turns for easing */
	prevDirection: Direction;
	/** Queue of pending direction changes (max 2) for responsive rapid turns */
	inputQueue: Direction[];
	score: number;
	gameOver: boolean;
	started: boolean;
	cols: number;
	rows: number;
}

const OPPOSITE: Record<Direction, Direction> = {
	up: 'down',
	down: 'up',
	left: 'right',
	right: 'left',
};

const DIRECTION_VECTORS: Record<Direction, Point> = {
	up: { x: 0, y: -1 },
	down: { x: 0, y: 1 },
	left: { x: -1, y: 0 },
	right: { x: 1, y: 0 },
};

function randomInt(max: number): number {
	return Math.floor(Math.random() * max);
}

function spawnFood(snake: Point[], cols: number, rows: number): Point {
	let food: Point;
	do {
		food = { x: randomInt(cols), y: randomInt(rows) };
	} while (snake.some((s) => s.x === food.x && s.y === food.y));
	return food;
}

function clonePoints(pts: Point[]): Point[] {
	return pts.map((p) => ({ x: p.x, y: p.y }));
}

export function createState(cols: number, rows: number): SnakeState {
	const cx = Math.floor(cols / 2);
	const cy = Math.floor(rows / 2);
	const snake: Point[] = [
		{ x: cx, y: cy },
		{ x: cx - 1, y: cy },
		{ x: cx - 2, y: cy },
	];
	return {
		snake,
		prevSnake: clonePoints(snake),
		food: spawnFood(snake, cols, rows),
		direction: 'right',
		prevDirection: 'right',
		inputQueue: [],
		score: 0,
		gameOver: false,
		started: false,
		cols,
		rows,
	};
}

/**
 * Queue a direction change. Keeps up to 2 entries so rapid L-shape
 * turns (e.g. Right then immediately Down) are never lost.
 */
export function setDirection(state: SnakeState, dir: Direction): void {
	// Compare against the last queued direction (or current if queue empty)
	const last =
		state.inputQueue.length > 0
			? state.inputQueue[state.inputQueue.length - 1]
			: state.direction;
	if (dir !== last && OPPOSITE[dir] !== last && state.inputQueue.length < 2) {
		state.inputQueue.push(dir);
	}
}

export function tick(state: SnakeState): void {
	if (state.gameOver || !state.started) return;

	// Snapshot current positions for interpolation
	state.prevSnake = clonePoints(state.snake);
	state.prevDirection = state.direction;

	// Consume next queued direction
	if (state.inputQueue.length > 0) {
		state.direction = state.inputQueue.shift()!;
	}
	const head = state.snake[0];
	const v = DIRECTION_VECTORS[state.direction];

	const newHead: Point = {
		x: (head.x + v.x + state.cols) % state.cols,
		y: (head.y + v.y + state.rows) % state.rows,
	};

	// Self-collision
	if (state.snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
		state.gameOver = true;
		return;
	}

	state.snake.unshift(newHead);

	if (newHead.x === state.food.x && newHead.y === state.food.y) {
		state.score++;
		state.food = spawnFood(state.snake, state.cols, state.rows);
		// prevSnake needs an extra entry for the new tail segment
		const last = state.prevSnake[state.prevSnake.length - 1];
		state.prevSnake.push({ x: last.x, y: last.y });
	} else {
		state.snake.pop();
	}
}

/** Tick interval in ms — starts slow, speeds up with score */
export function getTickMs(score: number, difficulty: Difficulty = 'normal'): number {
	const { start, accel, floor } = DIFFICULTY_PARAMS[difficulty];
	return Math.max(floor, start - score * accel);
}

/**
 * Interpolate a position between prev and current grid cell.
 * Handles wrap-around so the snake doesn't fly across the screen.
 */
export function lerpPos(
	prev: Point,
	curr: Point,
	t: number,
	cols: number,
	rows: number,
	cellSize: number,
): { x: number; y: number } {
	let dx = curr.x - prev.x;
	let dy = curr.y - prev.y;

	// Handle wrap-around: if distance > half the grid, it wrapped
	if (dx > cols / 2) dx -= cols;
	else if (dx < -cols / 2) dx += cols;
	if (dy > rows / 2) dy -= rows;
	else if (dy < -rows / 2) dy += rows;

	const px = (prev.x + dx * t) * cellSize + cellSize / 2;
	const py = (prev.y + dy * t) * cellSize + cellSize / 2;

	return { x: px, y: py };
}
