/**
 * WCAG 2.2 1.4.12 Text Spacing.
 *
 * Someone can override line height, letter spacing, word spacing and paragraph
 * spacing. Nothing may be clipped or lost when they do. The values below are
 * the ones the success criterion names.
 */
import { open, finding, report } from '../lib.mjs';
import { PAGES, KEY_WIDTHS } from '../config.mjs';

const OVERRIDE = `
	p, li, dd, dt, h1, h2, h3, h4, blockquote, span, a, strong, em {
		line-height: 1.5 !important;
		letter-spacing: 0.12em !important;
		word-spacing: 0.16em !important;
	}
	p { margin-bottom: 2em !important; }
`;

export default async function textSpacing(browser, base) {
	const findings = [];
	for (const path of PAGES) {
		for (const width of KEY_WIDTHS) {
			const page = await open(browser, base + path, { width });
			await page.addStyleTag({ content: OVERRIDE });
			await page.waitForTimeout(400);
			const r = await page.evaluate((vw) => {
				const clipped = [];
				document
					.querySelectorAll('p, li, dd, dt, h1, h2, h3, blockquote, .btn, .pager')
					.forEach((el) => {
						const cs = getComputedStyle(el);
						const hides = ['hidden', 'clip'].includes(cs.overflow) || ['hidden', 'clip'].includes(cs.overflowY);
						if (hides && el.scrollHeight > el.clientHeight + 2) {
							clipped.push(`${el.tagName}.${(el.className || '').toString().split(' ')[0]}`);
						}
						if (cs.textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 2) {
							clipped.push(`ellipsis ${el.tagName}.${(el.className || '').toString().split(' ')[0]}`);
						}
					});
				return { over: document.documentElement.scrollWidth > vw + 1, clipped: [...new Set(clipped)].slice(0, 4) };
			}, width);
			if (r.over) findings.push(finding(`${path} @${width}`, 'scrolls sideways once text spacing is applied'));
			for (const c of r.clipped) findings.push(finding(`${path} @${width}`, `text clipped: ${c}`));
			await page.context().close();
		}
	}
	return report('Text spacing', findings, `${PAGES.length} pages x ${KEY_WIDTHS.length} widths`);
}
