/**
 * The home page decks still animate at real laptop heights.
 *
 * The work deck pins a card to a 100svh stage and flips it on scroll; the
 * recommendations deck fans its cards. Both fall back to a plain list when
 * `auditDeckFit` measures that a card will not fit, by adding `sdc-deck-static`
 * to the root. That fallback is correct below 600px of height, which is the
 * documented threshold. Above it, falling back means something regressed.
 *
 * This check exists because of 02.00.00. A `max-height: none !important` rule
 * that had lived in the home page's <noscript> block moved into the global
 * stylesheet when the card became a component, and the <noscript> scoping did
 * not move with it. It cancelled the 50svh cap on the card art for every
 * visitor. The art grew 116px, the stage overflowed by 58px at 780, the audit
 * tripped, and both decks sat in their static fallback for anyone whose window
 * was shorter than about 900px. It shipped, and it reached production.
 *
 * Nothing in the suite could have caught it, for a reason worth keeping in
 * mind: `open()` sets `reducedMotion: 'reduce'` on every context, which makes
 * the other checks deterministic and also puts both decks permanently in the
 * static fallback. Seven checks, and not one of them had ever seen the animated
 * deck. This is the only check that passes `motion: true`.
 *
 * The fallback is also self-fulfilling. Applying `sdc-deck-static` sets the
 * stage to `height: auto`, which removes the overflow that triggered it, so a
 * later audit cannot see that conditions improved. Measure the state, not the
 * overflow.
 */
import { open, settle, finding, report } from '../lib.mjs';

// Above the documented 600px fallback threshold. 700 and 780 are where a
// 13-inch laptop with browser chrome actually lands, and where the regression
// showed.
const HEIGHTS = [650, 700, 780, 850, 900, 1000];

export default async function deckFit(browser, base) {
	const findings = [];

	for (const height of HEIGHTS) {
		const page = await open(browser, base + '/', { width: 1440, height, motion: true });
		await settle(page);

		const state = await page.evaluate(() => {
			const root = document.documentElement;
			const work = document.querySelector('.sdc-deck--work');
			const stage = work?.querySelector('.sdc-deck__stage');
			const art = document.querySelector('.sdc-card__art');
			return {
				static: root.classList.contains('sdc-deck-static'),
				artMaxHeight: art ? getComputedStyle(art).maxHeight : null,
				overflow: stage ? Math.round(stage.scrollHeight - stage.clientHeight) : null,
			};
		});

		const at = `1440x${height}`;

		if (state.static) {
			findings.push(
				finding(
					at,
					`the deck fell back to the static list above the 600px threshold — cards do not flip and the recommendations do not fan. Stage overflow ${state.overflow}px, card art max-height ${state.artMaxHeight}`,
				),
			);
		}

		// The direct assertion, not just the symptom. The art carries a viewport
		// cap so the card fits a short stage; `none` means something overrode it
		// and the fallback is about to fire for every visitor on a laptop.
		if (state.artMaxHeight === 'none') {
			findings.push(
				finding(at, 'card art has no max-height — the 50svh cap is being overridden, which is what shipped in 02.00.00'),
			);
		}

		await page.context().close();
	}

	return report('Deck fit and flip', findings, `${HEIGHTS.length} viewport heights, motion on`);
}
