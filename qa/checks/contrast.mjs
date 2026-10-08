/**
 * Text contrast, measured in both themes, on the real rendered page.
 *
 * axe covers this on whatever theme happens to be showing. For most of this
 * site's life that was the only reachable theme, so the dark palette was never
 * scanned at all. A figure caption sat at 3.31:1 on black because its rule
 * named --text-muted, a token that does not exist, and silently fell back to a
 * hard-coded light-theme hex. Nothing caught it: not a scanner, not review.
 *
 * This walks the text that carries meaning, resolves the real painted
 * background behind it, and applies the AA thresholds: 4.5:1 for normal text,
 * 3:1 for large text, which is 24px and up, or 18.66px and up when bold.
 */
import { open, finding, report } from '../lib.mjs';
import { PAGES, THEMES } from '../config.mjs';

const SELECTORS = [
	'p', 'li', 'dt', 'dd', 'h1', 'h2', 'h3', 'h4',
	'a', 'blockquote', 'figcaption', 'strong', 'span.sdc-cs-stats span', 'button',
];

export default async function contrast(browser, base) {
	const findings = [];
	for (const theme of THEMES) {
		for (const path of PAGES) {
			const page = await open(browser, base + path, { theme });
			const bad = await page.evaluate((sels) => {
				const lum = (css) => {
					const m = css.match(/[\d.]+/g);
					if (!m) return null;
					const [r, g, b] = m.slice(0, 3).map(Number);
					const f = (v) => {
						v /= 255;
						return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
					};
					return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
				};
				const ratio = (a, b) => {
					const l1 = lum(a), l2 = lum(b);
					if (l1 === null || l2 === null) return null;
					return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
				};
				// Fully transparent means alpha 0, which has to be parsed rather than
				// pattern matched: rgb(204, 255, 0) is opaque citron and ends in the
				// same three characters as a transparent colour. That mistake made
				// this check report the one button it should have passed.
				const isTransparent = (c) => {
					if (!c) return true;
					const m = c.match(/[\d.]+/g);
					if (!m) return true;
					return m.length >= 4 && Number(m[3]) === 0;
				};
				// The nearest ancestor that actually paints something.
				const paintedBg = (el) => {
					let n = el;
					while (n && n !== document.documentElement) {
						const c = getComputedStyle(n).backgroundColor;
						if (!isTransparent(c)) return c;
						n = n.parentElement;
					}
					return getComputedStyle(document.body).backgroundColor;
				};
				const out = [];
				const seen = new Set();
				document.querySelectorAll(sels.join(',')).forEach((el) => {
					if (el.closest('.sdc-u-sr-only') || el.classList.contains('sdc-u-sr-only')) return;
					const cs = getComputedStyle(el);
					if (cs.visibility === 'hidden' || cs.display === 'none') return;
					if (Number(cs.opacity) < 0.95) return; // mid-animation or deliberately faded
					const box = el.getBoundingClientRect();
					if (!box.width || !box.height) return;
					// Only elements holding their own text.
					const own = [...el.childNodes]
						.filter((n) => n.nodeType === 3)
						.map((n) => n.textContent.trim())
						.join('');
					if (own.length < 2) return;

					const size = parseFloat(cs.fontSize);
					const weight = parseInt(cs.fontWeight, 10) || 400;
					const large = size >= 24 || (size >= 18.66 && weight >= 700);
					const need = large ? 3 : 4.5;
					const r = ratio(cs.color, paintedBg(el));
					if (r === null) return;
					if (r < need - 0.005) {
						const key = `${el.tagName}.${(el.className || '').toString().split(' ')[0]}:${r.toFixed(2)}`;
						if (seen.has(key)) return;
						seen.add(key);
						out.push({
							el: `${el.tagName.toLowerCase()}${el.className ? '.' + el.className.toString().trim().split(/\s+/)[0] : ''}`,
							text: own.slice(0, 30),
							ratio: r.toFixed(2),
							need,
							size: Math.round(size),
						});
					}
				});
				return out;
			}, SELECTORS);
			for (const b of bad) {
				findings.push(
					finding(`${theme} ${path}`, `${b.el} at ${b.size}px is ${b.ratio}:1, needs ${b.need}:1 — "${b.text}"`),
				);
			}
			await page.context().close();
		}
	}
	return report('Text contrast', findings, `${THEMES.length} themes x ${PAGES.length} pages`);
}
