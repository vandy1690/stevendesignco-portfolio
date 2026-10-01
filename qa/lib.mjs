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

/**
 * Locally this drives the installed Chrome, because that is the browser the
 * pixel baselines were taken in. CI has no Chrome, so it sets QA_CHANNEL to
 * 'chromium' and gets the one Playwright ships, which is also the reproducible
 * choice for a machine nobody is looking at.
 */
export async function launch() {
	const channel = process.env.QA_CHANNEL || (process.env.CI ? 'chromium' : 'chrome');
	return chromium.launch(channel === 'chromium' ? {} : { channel });
}

/**
 * Open a page and put it in a state worth measuring: no dev toolbar, no
 * in-flight animation, fonts loaded.
 */
export async function open(browser, url, { width = 1280, height = 900, forcedColors, theme } = {}) {
	const ctx = await browser.newContext({
		viewport: { width, height },
		deviceScaleFactor: 1,
		reducedMotion: 'reduce',
		...(forcedColors ? { forcedColors } : {}),
	});
	// Set the stored choice before the page runs, so the pre-paint script picks
	// the theme we are testing and nothing flips after load.
	if (theme) {
		await ctx.addInitScript((t) => {
			try { localStorage.setItem('theme', t); } catch (e) { /* private mode */ }
		}, theme);
	}
	const page = await ctx.newPage();
	page.on('pageerror', (e) => page.__errors?.push(String(e)) ?? (page.__errors = [String(e)]));
	// 'load' rather than 'networkidle'. Analytics beacons and a dev server's
	// HMR socket mean the network may never go quiet, which timed out the whole
	// run against production. settle() does the waiting that actually matters.
	await page.goto(url, { waitUntil: 'load', timeout: 45000 });
	if (theme) {
		const got = await evaluateThroughReloads(page, () =>
			document.documentElement.getAttribute('data-theme'),
		);
		if (got !== theme) throw new Error(`asked for the ${theme} theme, got ${got}`);
	}
	await settle(page);
	return page;
}

/**
 * Run an evaluate, and run it again if the page navigated underneath it.
 *
 * Astro's dev server compiles a route on demand and then pushes a full reload
 * over HMR when it finishes. On a slow runner that lands between the navigation
 * and the measurement, and Playwright reports "Execution context was destroyed".
 * It is not a defect in the page, so retrying once after the reload settles is
 * the right answer rather than failing the run.
 */
async function evaluateThroughReloads(page, fn, arg) {
	for (let attempt = 0; attempt < 3; attempt++) {
		try {
			return await page.evaluate(fn, arg);
		} catch (err) {
			const destroyed = /Execution context was destroyed|Target closed|frame was detached/i.test(
				String(err && err.message),
			);
			if (!destroyed || attempt === 2) throw err;
			await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
			await page.waitForTimeout(500);
		}
	}
}

/** Remove the dev toolbar, finish every reveal, wait for fonts. */
export async function settle(page) {
	await evaluateThroughReloads(page, () => {
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
	await evaluateThroughReloads(page, () => document.fonts.ready);
	await page.waitForTimeout(350);
}

export { evaluateThroughReloads };

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
