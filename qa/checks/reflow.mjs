/**
 * WCAG 2.2 1.4.10 Reflow, and 2.5.8 Target Size (Minimum).
 *
 * Reflow: no page may scroll in two directions at any width down to 320. The
 * PayPal logo orbit broke this below 390px for as long as the page existed; it
 * is 680px scaled to half and a 320px screen has 272px between the gutters.
 *
 * Target size: 24 by 24 CSS pixels, with the exception WCAG grants a link
 * sitting inside a sentence, where growing it would push the lines apart.
 */
import { open, finding, report } from '../lib.mjs';
import { PAGES, WIDTHS } from '../config.mjs';

export default async function reflow(browser, base) {
	const findings = [];
	for (const path of PAGES) {
		for (const width of WIDTHS) {
			const page = await open(browser, base + path, { width });
			const r = await page.evaluate((vw) => {
				const widest = [];
				if (document.documentElement.scrollWidth > vw + 1) {
					document.querySelectorAll('body *').forEach((el) => {
						const box = el.getBoundingClientRect();
						if (box.width <= vw + 1 || box.height === 0) return;
						const self = getComputedStyle(el).overflowX;
						const parent = el.parentElement && getComputedStyle(el.parentElement).overflowX;
						if (['auto', 'scroll', 'clip', 'hidden'].includes(self)) return;
						if (['auto', 'scroll', 'clip', 'hidden'].includes(parent)) return;
						widest.push(`${el.tagName}.${(el.className || '').toString().split(' ')[0]}:${Math.round(box.width)}`);
					});
				}
				const small = [];
				document.querySelectorAll('a, button, input, select, [role="button"]').forEach((el) => {
					const box = el.getBoundingClientRect();
					if (!box.width || !box.height) return;
					if (box.height >= 24 && box.width >= 24) return;
					const block = el.closest('p, li, dd, blockquote');
					const inSentence =
						block && block.textContent.trim().length > el.textContent.trim().length + 10;
					if (inSentence) return; // WCAG 2.5.8 inline exception
					small.push(
						`${(el.className || '').toString().split(' ')[0] || el.tagName} ${Math.round(box.width)}x${Math.round(box.height)}`,
					);
				});
				return { scrollWidth: document.documentElement.scrollWidth, widest: [...new Set(widest)].slice(0, 3), small: [...new Set(small)] };
			}, width);

			if (r.scrollWidth > width + 1) {
				findings.push(
					finding(`${path} @${width}`, `scrolls sideways to ${r.scrollWidth}px${r.widest.length ? ' — ' + r.widest.join(', ') : ''}`),
				);
			}
			for (const s of r.small) findings.push(finding(`${path} @${width}`, `target under 24px: ${s}`));
			await page.context().close();
		}
	}
	return report('Reflow and target size', findings, `${PAGES.length} pages x ${WIDTHS.length} widths`);
}
