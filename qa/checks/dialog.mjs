/**
 * The dialog, as a keyboard user meets it, and as a stylesheet reaches it.
 *
 * Both halves are here because both have broken. The styling half: the dialog
 * injects a case page's <main> contents without the <main> element, so rules
 * scoped to a class on <main> stopped matching and the meta row rendered as a
 * raw indented list. The keyboard half: `inert` was once applied to an ancestor
 * that contained the dialog, which killed its scrolling.
 */
import { open, openDialog, finding, report } from '../lib.mjs';
import { DIALOG_CASES, KEY_WIDTHS } from '../config.mjs';

export default async function dialog(browser, base) {
	const findings = [];

	// Styling reaches the injected content.
	for (const href of DIALOG_CASES) {
		for (const width of KEY_WIDTHS) {
			const page = await open(browser, base + '/', { width });
			if (!(await openDialog(page, href))) {
				findings.push(finding(`${href} @${width}`, 'could not open the dialog'));
				await page.context().close();
				continue;
			}
			const r = await page.evaluate(() => {
				const content = document.querySelector('.sdc-modal__content');
				const meta = content.querySelector('.sdc-cs-meta');
				const hero = content.querySelector('.sdc-cs-hero');
				return {
					scoped: content.classList.contains('sdc-case'),
					metaDisplay: meta ? getComputedStyle(meta).display : null,
					heroPadding: hero ? getComputedStyle(hero).paddingTop : null,
				};
			});
			if (!r.scoped) findings.push(finding(`${href} @${width}`, '.sdc-modal__content lost the case scope'));
			if (r.metaDisplay && r.metaDisplay !== 'grid')
				findings.push(finding(`${href} @${width}`, `meta row is ${r.metaDisplay}, not grid — the case styles are not reaching the dialog`));
			if (r.heroPadding === '0px')
				findings.push(finding(`${href} @${width}`, 'hero has no padding — the case styles are not reaching the dialog'));
			await page.context().close();
		}
	}

	// Keyboard.
	const page = await open(browser, base + '/');
	const href = DIALOG_CASES[0];
	const link = await page.$(`a.sdc-card__link[href="${href}"]`);
	if (!link) {
		findings.push(finding('keyboard', `no card for ${href}`));
	} else {
		await link.evaluate((el) => el.focus());
		await page.keyboard.press('Enter');
		await page.waitForTimeout(1800);

		const opened = await page.evaluate(() => {
			const m = document.getElementById('case-modal');
			return m && !m.hidden;
		});
		if (!opened) findings.push(finding('keyboard', 'Enter on a card did not open the dialog'));

		const focused = await page.evaluate(() =>
			document.getElementById('case-modal')?.contains(document.activeElement),
		);
		if (!focused) findings.push(finding('keyboard', 'focus did not move into the dialog'));

		const inert = await page.evaluate(() => {
			let el = document.getElementById('case-modal');
			while (el && el !== document.body) {
				for (const sib of el.parentElement.children) {
					if (sib === el) continue;
					if (['SCRIPT', 'STYLE', 'LINK'].includes(sib.tagName)) continue;
					if (!sib.hasAttribute('inert')) return false;
				}
				el = el.parentElement;
			}
			return true;
		});
		if (!inert) findings.push(finding('keyboard', 'the page behind the dialog is not inert'));

		const scrolls = await page.evaluate(async () => {
			const m = document.getElementById('case-modal');
			let target = null;
			const walk = (el) => {
				const cs = getComputedStyle(el);
				if (!target && el.scrollHeight > el.clientHeight + 4 && ['auto', 'scroll'].includes(cs.overflowY)) target = el;
				[...el.children].forEach(walk);
			};
			if (m.scrollHeight > m.clientHeight + 4 && ['auto', 'scroll'].includes(getComputedStyle(m).overflowY)) target = m;
			if (!target) walk(m);
			if (!target) return false;
			target.scrollTop = 400;
			await new Promise((r) => setTimeout(r, 120));
			const moved = target.scrollTop > 0;
			target.scrollTop = 0;
			return moved;
		});
		if (!scrolls) findings.push(finding('keyboard', 'the dialog does not scroll'));

		let escaped = null;
		for (let i = 0; i < 40; i++) {
			await page.keyboard.press('Tab');
			const inside = await page.evaluate(() =>
				document.getElementById('case-modal').contains(document.activeElement),
			);
			if (!inside) {
				escaped = await page.evaluate(() => document.activeElement.outerHTML.slice(0, 60));
				break;
			}
		}
		if (escaped) findings.push(finding('keyboard', `focus escaped the dialog: ${escaped}`));

		await page.keyboard.press('Escape');
		await page.waitForTimeout(1800);
		const closed = await page.evaluate(() => {
			const m = document.getElementById('case-modal');
			return m.hidden || getComputedStyle(m).visibility === 'hidden';
		});
		if (!closed) findings.push(finding('keyboard', 'Escape did not close the dialog'));

		const restored = await page.evaluate(() => document.activeElement.getAttribute('href'));
		if (restored !== href) findings.push(finding('keyboard', `focus returned to ${restored}, not ${href}`));

		const stillInert = await page.evaluate(() => !!document.querySelector('[inert]'));
		if (stillInert) findings.push(finding('keyboard', 'the page is still inert after closing'));
	}
	await page.context().close();

	return report('Dialog', findings, `${DIALOG_CASES.length} cases x ${KEY_WIDTHS.length} widths, plus keyboard`);
}
