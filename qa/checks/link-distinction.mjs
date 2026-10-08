/**
 * WCAG 2.2 1.4.1 Use of Color, for links inside a sentence.
 *
 * A link sitting in a paragraph has to be identifiable without relying on
 * colour. The usual way to satisfy that with colour alone is to put 3:1 between
 * the link and the text around it, and add a non-colour cue on hover and focus.
 * Anything short of 3:1 needs a cue that is always there.
 *
 * This check exists because axe does not catch it. The one inline link in the
 * case studies measured 1.02:1 against its paragraph, with no underline at rest
 * or on hover, and axe reported the page clean. It was not a near miss for
 * people with a colour vision deficiency: the link was invisible as a link to
 * everyone. The arithmetic is short, so do it here rather than trust a scanner.
 */
import { open, finding, report } from '../lib.mjs';
import { PAGES } from '../config.mjs';

export default async function linkDistinction(browser, base) {
	const findings = [];
	for (const path of PAGES) {
		const page = await open(browser, base + path);
		const bad = await page.evaluate(() => {
			const luminance = (css) => {
				const [r, g, b] = css.match(/[\d.]+/g).slice(0, 3).map(Number);
				const lin = (v) => {
					v /= 255;
					return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
				};
				return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
			};
			const ratio = (a, b) => {
				const l1 = luminance(a), l2 = luminance(b);
				return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
			};
			const out = [];
			document.querySelectorAll('p a, li a, dd a, blockquote a').forEach((a) => {
				if (a.closest('nav, header, footer')) return;
				if (a.classList.contains('sdc-btn') || a.classList.contains('sdc-pager') || a.classList.contains('sdc-card__link')) return;
				const block = a.closest('p, li, dd, blockquote');
				if (!block) return;
				// Only links sitting inside a run of text. A link that is the whole
				// row has no surrounding text to be confused with.
				if (block.textContent.trim().length <= a.textContent.trim().length + 10) return;

				const la = getComputedStyle(a), lb = getComputedStyle(block);
				const contrast = ratio(la.color, lb.color);
				const underlined = la.textDecorationLine.includes('underline');
				const bordered = parseFloat(la.borderBottomWidth) > 0;
				const filled = la.backgroundColor !== 'rgba(0, 0, 0, 0)' && la.backgroundColor !== 'transparent';
				const bolder = parseInt(la.fontWeight, 10) >= parseInt(lb.fontWeight, 10) + 200;
				const nonColourCue = underlined || bordered || filled || bolder;

				if (!nonColourCue && contrast < 3) {
					out.push({
						text: a.textContent.trim().slice(0, 40),
						contrast: contrast.toFixed(2),
						link: la.color,
						around: lb.color,
					});
				}
			});
			return out;
		});
		for (const b of bad) {
			findings.push(
				finding(path, `"${b.text}" is ${b.contrast}:1 against the text around it and has no underline — nothing marks it as a link`),
			);
		}
		await page.context().close();
	}
	return report('Inline link distinction', findings, `${PAGES.length} pages`);
}
