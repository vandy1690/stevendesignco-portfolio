/**
 * Shared browser setup.
 *
 * Every measurement here goes through `settle`. Three separate false results
 * during the component refactor came from measuring a page that was not ready:
 * axe read mid-fade opacity as a contrast failure, a screenshot caught the
 * display font before it loaded, and the dev toolbar was scanned as if it were
 * part of the site.
 */
import { chromium } from 'playwright';

export async function launch() {
	return chromium.launch({ channel: 'chrome' });
}

/**
 * Open a page and put it in a state worth measuring: no dev toolbar, no
 * in-flight animation, fonts loaded.
 */
export async function open(browser, url, { width = 1280, height = 900, forcedColors } = {}) {
	const ctx = await browser.newContext({
		viewport: { width, height },
		deviceScaleFactor: 1,
		reducedMotion: 'reduce',
		...(forcedColors ? { forcedColors } : {}),
	});
	const page = await ctx.newPage();
	page.on('pageerror', (e) => page.__errors?.push(String(e)) ?? (page.__errors = [String(e)]));
	await page.goto(url, { waitUntil: 'networkidle' });
	await settle(page);
	return page;
}

/** Remove the dev toolbar, finish every reveal, wait for fonts. */
export async function settle(page) {
	await page.evaluate(() => {
		document
			.querySelectorAll('astro-dev-toolbar, astro-dev-overlay, #dev-toolbar-root')
			.forEach((el) => el.remove());
		document
			.querySelectorAll('[data-animate],[data-reveal]')
			.forEach((el) => el.classList.add('is-in', 'is-visible'));
		const s = document.createElement('style');
		s.setAttribute('data-qa-freeze', '');
		s.textContent =
			'*,*::before,*::after{transition:none!important;animation:none!important}' +
			'[data-animate],[data-reveal]{opacity:1!important;transform:none!important}';
		document.head.appendChild(s);
	});
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(350);
}

/** Open a case study in the home page dialog and wait for it to be readable. */
export async function openDialog(page, href) {
	const link = await page.$(`a.card__link[href="${href}"]`);
	if (!link) return false;
	await link.evaluate((el) => el.click());
	await page.waitForFunction(
		() => {
			const m = document.getElementById('case-modal');
			return m && !m.hidden && m.querySelector('.modal__content')?.children.length > 1;
		},
		{ timeout: 15000 },
	);
	await settle(page);
	return true;
}

/** A finding is one failure worth a person's attention. */
export function finding(where, what) {
	return { where, what };
}

/**
 * `severity: 'note'` is for a check that reports and never fails, so the label
 * does not say FAIL on a line that the run is going to pass anyway.
 */
export function report(name, findings, note = '', severity = 'fail') {
	const ok = findings.length === 0;
	const label = ok ? 'PASS' : severity === 'note' ? 'DIFF' : 'FAIL';
	console.log(`\n${label}  ${name}${note ? '  (' + note + ')' : ''}`);
	for (const f of findings) console.log(`      ${f.where}  ${f.what}`);
	return ok;
}
