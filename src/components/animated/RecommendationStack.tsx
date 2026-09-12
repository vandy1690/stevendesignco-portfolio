import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// A fanned card stack for the LinkedIn recommendations. This is the card-stack
// interaction Steve picked, rebuilt for this codebase: the site has no Tailwind,
// no shadcn and no Next, so the geometry and behavior are ported and the styling
// runs on the site's own CSS tokens. framer-motion supplies the spring and the
// drag. Cards fan out from the active one, rotate and recede, and the active card
// can be dragged or swiped. Dots, arrow keys and clicking a neighbor all work.

export type Rec = {
	id: string | number;
	text: string;
	title: string;
	href?: string | null;
};

function wrapIndex(n: number, len: number) {
	if (len <= 0) return 0;
	return ((n % len) + len) % len;
}

/** Smallest signed distance from the active index to i, wrapping when looping. */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
	const raw = i - active;
	if (!loop || len <= 1) return raw;
	const alt = raw > 0 ? raw - len : raw + len;
	return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

type Size = { cardWidth: number; cardHeight: number; maxVisible: number; spreadDeg: number; overlap: number };

function sizeFor(w: number): Size {
	if (w < 560) return { cardWidth: 272, cardHeight: 372, maxVisible: 3, spreadDeg: 20, overlap: 0.58 };
	if (w < 900) return { cardWidth: 360, cardHeight: 356, maxVisible: 3, spreadDeg: 26, overlap: 0.56 };
	return { cardWidth: 440, cardHeight: 344, maxVisible: 5, spreadDeg: 32, overlap: 0.54 };
}

export default function RecommendationStack({
	items,
	loop = true,
	depthPx = 130,
	tiltXDeg = 10,
	activeLiftPx = 20,
	activeScale = 1.03,
	inactiveScale = 0.93,
	springStiffness = 260,
	springDamping = 30,
}: {
	items: Rec[];
	loop?: boolean;
	depthPx?: number;
	tiltXDeg?: number;
	activeLiftPx?: number;
	activeScale?: number;
	inactiveScale?: number;
	springStiffness?: number;
	springDamping?: number;
}) {
	const reduceMotion = useReducedMotion();
	const len = items.length;
	const [active, setActive] = React.useState(0);
	const [size, setSize] = React.useState<Size>(() => sizeFor(1440));

	React.useEffect(() => {
		const read = () => setSize(sizeFor(window.innerWidth));
		read();
		window.addEventListener('resize', read);
		return () => window.removeEventListener('resize', read);
	}, []);

	React.useEffect(() => {
		setActive((a) => wrapIndex(a, len));
	}, [len]);

	const { cardWidth, cardHeight, maxVisible, spreadDeg, overlap } = size;
	const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
	const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
	const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

	const prev = React.useCallback(() => {
		if (!len) return;
		if (!loop && active <= 0) return;
		setActive((a) => wrapIndex(a - 1, len));
	}, [len, loop, active]);

	const next = React.useCallback(() => {
		if (!len) return;
		if (!loop && active >= len - 1) return;
		setActive((a) => wrapIndex(a + 1, len));
	}, [len, loop, active]);

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
		if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
	};

	if (!len) return null;
	const activeItem = items[wrapIndex(active, len)]!;

	return (
		<div className="rs">
			<style>{`
				.rs { width: 100%; }
				.rs__stage {
					position: relative;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					overflow: hidden;
				}
				.rs__stage:focus-visible { outline: none; }
				.rs__stage:focus-visible .rs__ring { opacity: 1; }
				.rs__ring {
					position: absolute;
					inset: 8px;
					border-radius: 20px;
					border: 1px solid var(--accent);
					opacity: 0;
					pointer-events: none;
					transition: opacity 0.15s ease;
				}
				.rs__wash {
					position: absolute;
					left: 50%;
					bottom: 6%;
					width: 70%;
					height: 34%;
					transform: translateX(-50%);
					border-radius: 50%;
					background: rgba(45, 52, 54, 0.1);
					filter: blur(46px);
					pointer-events: none;
				}
				.rs__fan { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
				.rs__card {
					position: absolute;
					border-radius: var(--radius);
					overflow: hidden;
					background: var(--surface);
					box-shadow: var(--shadow-card);
					will-change: transform;
					user-select: none;
					-webkit-user-select: none;
				}
				.rs__card--active { cursor: grab; }
				.rs__card--active:active { cursor: grabbing; }
				.rs__card--idle { cursor: pointer; }
				.rs__inner {
					height: 100%;
					width: 100%;
					padding: clamp(22px, 4%, 34px);
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: var(--space-sm);
					text-align: center;
				}
				.rs__mark { width: 26px; height: auto; color: var(--text); flex: none; }
				.rs__text {
					margin: 0;
					font-family: var(--font-body);
					font-weight: 500;
					font-size: clamp(15px, 1.35vw, 18px);
					line-height: 1.45;
					letter-spacing: -0.005em;
					color: var(--text);
					text-wrap: pretty;
				}
				.rs__title {
					font-weight: 800;
					letter-spacing: 0.08em;
					text-transform: uppercase;
					font-size: 11px;
					color: var(--text-mute);
					max-width: 34ch;
				}
				.rs__controls { display: flex; align-items: center; justify-content: center; gap: var(--space-md); margin-top: var(--space-lg); }
				.rs__dots { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; justify-content: center; }
				.rs__dot {
					width: 7px; height: 7px; padding: 0;
					border: 0; border-radius: 999px;
					background: rgba(45, 52, 54, 0.28);
					cursor: pointer;
					transition: background 0.16s ease, transform 0.16s ease;
				}
				.rs__dot:hover { background: rgba(45, 52, 54, 0.5); }
				.rs__dot[aria-current="true"] { background: var(--text); transform: scale(1.35); }
				.rs__dot:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
				.rs__link { display: inline-flex; align-items: center; color: var(--text-mute); transition: color 0.16s ease; }
				.rs__link:hover { color: var(--accent); }
				.rs__link svg { width: 15px; height: 15px; display: block; }
				.rs__count { font-size: 12px; letter-spacing: 0.1em; color: var(--text-mute); font-variant-numeric: tabular-nums; }
				@media (prefers-reduced-motion: reduce) {
					.rs__card { transition: none !important; }
				}
			`}</style>

			<div
				className="rs__stage"
				style={{ height: cardHeight + 96 }}
				tabIndex={0}
				role="group"
				aria-label="Recommendations, use the left and right arrow keys"
				onKeyDown={onKeyDown}
			>
				<span className="rs__ring" aria-hidden="true" />
				<span className="rs__wash" aria-hidden="true" />
				<div className="rs__fan">
					{items.map((item, i) => {
						const off = signedOffset(i, active, len, loop);
						const abs = Math.abs(off);
						if (abs > maxOffset) return null;

						const isActive = off === 0;
						const rotateZ = off * stepDeg;
						const x = off * cardSpacing;
						const y = abs * 10 + (isActive ? -activeLiftPx : 0);
						const z = -abs * depthPx;
						const scale = isActive ? activeScale : inactiveScale;
						const rotateX = isActive ? 0 : tiltXDeg;

						const drag = isActive && !reduceMotion
							? {
									drag: 'x' as const,
									dragConstraints: { left: 0, right: 0 },
									dragElastic: 0.18,
									onDragEnd: (_e: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
										const travel = info.offset.x;
										const v = info.velocity.x;
										const threshold = Math.min(150, cardWidth * 0.22);
										if (travel > threshold || v > 620) prev();
										else if (travel < -threshold || v < -620) next();
									},
								}
							: {};

						return (
							<motion.div
								key={item.id}
								className={`rs__card ${isActive ? 'rs__card--active' : 'rs__card--idle'}`}
								style={{ width: cardWidth, height: cardHeight, zIndex: 100 - abs, transformStyle: 'preserve-3d' }}
								initial={false}
								animate={{ x, y, rotateZ, rotateX, scale, opacity: isActive ? 1 : 0.34 }}
								transition={
									reduceMotion
										? { duration: 0 }
										: { type: 'spring', stiffness: springStiffness, damping: springDamping }
								}
								onClick={() => { if (!isActive) setActive(i); }}
								aria-hidden={!isActive}
								{...drag}
							>
								<div style={{ height: '100%', width: '100%', transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d' }}>
									<figure className="rs__inner">
										<svg className="rs__mark" viewBox="0 0 37 32" aria-hidden="true">
											<path
												d="M16.5 16H8.5c0 4.4 3.6 8 8 8v8C7.7 32 .5 24.8.5 16V0h16v16Zm20 0h-8c0 4.4 3.6 8 8 8v8c-8.8 0-16-7.2-16-16V0h16v16Z"
												fill="currentColor"
											/>
										</svg>
										<blockquote className="rs__text">{item.text}</blockquote>
										<figcaption className="rs__title">{item.title}</figcaption>
									</figure>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>

			<div className="rs__controls">
				<span className="rs__count">
					{wrapIndex(active, len) + 1} / {len}
				</span>
				<div className="rs__dots">
					{items.map((it, idx) => (
						<button
							key={it.id}
							type="button"
							className="rs__dot"
							aria-current={idx === wrapIndex(active, len)}
							aria-label={`Recommendation ${idx + 1} of ${len}, ${it.title}`}
							onClick={() => setActive(idx)}
						/>
					))}
				</div>
				{activeItem.href ? (
					<a className="rs__link" href={activeItem.href} target="_blank" rel="noopener" aria-label="Read the recommendations on LinkedIn">
						<svg viewBox="0 0 16 16" aria-hidden="true" fill="none">
							<path d="M6 2h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M14 2 6.5 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
							<path d="M12 10.5V14H2V4h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</a>
				) : null}
			</div>
		</div>
	);
}
