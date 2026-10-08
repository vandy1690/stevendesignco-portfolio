/**
 * Windows High Contrast Mode.
 *
 * The site paints a few things with background rather than border, and those
 * disappear when the system forces its own colours. The rules that replace them
 * sit last in the stylesheet, because a media query adds no specificity: for a
 * long time they sat near the top, a later rule overrode them, and the pager
 * cap never became the border its own documentation described.
 */
import { open, finding, report } from '../lib.mjs';

export default async function forcedColors(browser, base) {
	const findings = [];
	const page = await open(browser, base + '/work/blackbird', { forcedColors: 'active' });

	const r = await page.evaluate(() => {
		if (!matchMedia('(forced-colors: active)').matches) return { unsupported: true };
		const out = [];
		document.querySelectorAll('.sdc-pager').forEach((pager) => {
			const cap = pager.querySelector('.sdc-pager__cap');
			if (!cap) return;
			const c = getComputedStyle(cap);
			const prev = pager.classList.contains('sdc-pager--prev');
			const side = prev ? c.borderRightWidth : c.borderLeftWidth;
			out.push({
				which: prev ? 'prev' : 'next',
				capBorder: side,
				capBg: c.backgroundColor,
				pagerBorder: getComputedStyle(pager).borderTopWidth,
			});
		});
		return { caps: out };
	});

	if (r.unsupported) {
		findings.push(finding('forced colors', 'the browser did not report forced-colors as active'));
	} else {
		for (const cap of r.caps) {
			if (cap.capBorder === '0px')
				findings.push(finding(`pager ${cap.which}`, 'cap has no border in High Contrast Mode, so the divider vanishes'));
			if (cap.capBg !== 'rgba(0, 0, 0, 0)')
				findings.push(finding(`pager ${cap.which}`, `cap still paints a background (${cap.capBg})`));
			if (cap.pagerBorder === '0px')
				findings.push(finding(`pager ${cap.which}`, 'pager has no border, so its shape vanishes'));
		}
	}
	await page.context().close();
	return report('Forced colors', findings, 'High Contrast Mode');
}
