/**
 * The form controls, as a keyboard user meets them.
 *
 * Runs on /labs/controls, the one page that renders every control in every
 * state. Until this check existed, keyboard behavior was asserted only for the
 * case study dialog, and the control set had no automated coverage at all.
 * Added 2026-10-28. The expected behaviors below are the browser's own for
 * native controls; if one should differ, change the assertion and say why.
 *
 * What it asserts, in order:
 *   1. Tab reaches every enabled control in page order, once each.
 *   2. Tab skips disabled controls, the summary region and the status lines.
 *   3. A radio group is one tab stop, and it lands on the checked radio.
 *   4. Every control shows the focus ring when reached by keyboard, both themes.
 *   5. Space checks and unchecks a choice chip.
 *   6. Arrow keys move between radios and check the one they land on.
 *   7. Arrow keys, Home and End move the slider, and its value text follows.
 *   8. Typing a letter in a closed select picks the matching option.
 *   9. Typing in a field changes its value; error and hint are announced.
 *  10. Enter on an error summary link moves focus to the control it names.
 *
 * The ids live in src/pages/labs/controls.astro. Change one there, change it here.
 */
import { open, finding, report } from '../lib.mjs';
import { THEMES } from '../config.mjs';

const PATH = '/labs/controls';

// The enabled controls, in page order. Each is how the focused element is named
// below: an id, or name=value for a choice chip.
const ORDER = [
	'summary-link:#kb-site',
	'summary-link:#kb-referral',
	'kb-name',
	'kb-email',
	'kb-site',
	'kb-note',
	'kb-source',
	'kb-referral',
	'topics=case-studies',
	'topics=process',
	'topics=speaking',
	'often=monthly',
	'kb-posts',
];
const NEVER = ['kb-off', 'kb-locked', 'topics=roles', 'kb-summary', 'kb-status', 'kb-status-success'];

/** A short name for whatever has focus, matching the names in ORDER. */
const NAME_ACTIVE = () => {
	const el = document.activeElement;
	if (!el || el === document.body) return 'body';
	if (el.closest('.sdc-form-summary') && el.tagName === 'A') return `summary-link:${el.getAttribute('href')}`;
	if (el.type === 'checkbox' || el.type === 'radio') return `${el.name}=${el.value}`;
	return el.id || `${el.tagName.toLowerCase()}`;
};

/** Is a focus indicator drawn? Choice chips draw it on the label around the input. */
const RING = () => {
	const el = document.activeElement;
	const target = el.closest('.sdc-choice') || el;
	const s = getComputedStyle(target);
	const outline = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0;
	const shadow = s.boxShadow && s.boxShadow !== 'none';
	return outline || shadow;
};

export default async function keyboard(browser, base) {
	const findings = [];

	for (const theme of THEMES) {
		const page = await open(browser, base + PATH, { theme });
		const where = `${PATH} (${theme})`;

		// 1 to 4. Walk the page with Tab from the top and record every stop.
		await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
		const stops = [];
		for (let i = 0; i < 60; i++) {
			await page.keyboard.press('Tab');
			const name = await page.evaluate(NAME_ACTIVE);
			if (name === 'body') break;
			const ring = await page.evaluate(RING);
			stops.push({ name, ring });
			if (name === ORDER[ORDER.length - 1]) break;
		}
		const names = stops.map((s) => s.name);
		const inOrder = names.filter((n) => ORDER.includes(n));
		if (inOrder.join(' ') !== ORDER.join(' ')) {
			const missing = ORDER.filter((n) => !inOrder.includes(n));
			findings.push(finding(where, missing.length
				? `Tab never reached: ${missing.join(', ')}`
				: `Tab order is ${inOrder.join(' > ')}, expected ${ORDER.join(' > ')}`));
		}
		for (const n of NEVER) if (names.includes(n)) findings.push(finding(where, `Tab stopped on ${n}, which should be skipped`));
		const radios = names.filter((n) => n.startsWith('often='));
		if (radios.length !== 1) findings.push(finding(where, `the radio group took ${radios.length} tab stops, expected 1`));
		for (const s of stops) if (ORDER.includes(s.name) && !s.ring) findings.push(finding(where, `no visible focus ring on ${s.name}`));

		await page.context().close();
	}

	// The behaviors do not depend on the theme, so they run once.
	const page = await open(browser, base + PATH);
	const focus = (sel) => page.focus(sel);
	const state = (fn, arg) => page.evaluate(fn, arg);

	// 5. Space toggles a chip.
	await focus('input[name="topics"][value="process"]');
	await page.keyboard.press('Space');
	const on = await state(() => document.querySelector('input[name="topics"][value="process"]').checked);
	await page.keyboard.press('Space');
	const off = await state(() => document.querySelector('input[name="topics"][value="process"]').checked);
	if (!on || off) findings.push(finding('Choice', `Space should check then uncheck the chip; got ${on}, then ${off}`));

	// 6. Arrows move through a radio group and check what they land on.
	await focus('input[name="often"][value="monthly"]');
	await page.keyboard.press('ArrowRight');
	const next = await state(NAME_ACTIVE);
	const nextChecked = await state(() => document.querySelector('input[name="often"]:checked')?.value);
	await page.keyboard.press('ArrowLeft');
	const back = await state(() => document.querySelector('input[name="often"]:checked')?.value);
	if (next !== 'often=big-news' || nextChecked !== 'big-news') findings.push(finding('Choice (radio)', `ArrowRight from Monthly should land on and check Only big news; got ${next}, checked ${nextChecked}`));
	if (back !== 'monthly') findings.push(finding('Choice (radio)', `ArrowLeft should return to Monthly; got ${back}`));

	// 7. The slider, and the value text that a screen reader hears.
	await focus('#kb-posts');
	const slider = () => page.evaluate(() => {
		const i = document.getElementById('kb-posts');
		return { value: i.value, text: document.querySelector('output[for="kb-posts"]').textContent.trim(), aria: i.getAttribute('aria-valuetext') };
	});
	await page.keyboard.press('ArrowRight');
	const up = await slider();
	await page.keyboard.press('End');
	const end = await slider();
	await page.keyboard.press('Home');
	const home = await slider();
	await page.keyboard.press('ArrowLeft');
	const floor = await slider();
	if (up.value !== '5' || up.text !== '5 per month' || up.aria !== '5 per month') findings.push(finding('Slider', `ArrowRight from 4 gave value ${up.value}, text "${up.text}", aria "${up.aria}"; expected 5 and "5 per month"`));
	if (end.value !== '8') findings.push(finding('Slider', `End gave ${end.value}, expected the maximum, 8`));
	if (home.value !== '1') findings.push(finding('Slider', `Home gave ${home.value}, expected the minimum, 1`));
	if (floor.value !== '1') findings.push(finding('Slider', `ArrowLeft at the minimum gave ${floor.value}, expected it to stay at 1`));

	// 8. Type-ahead in a closed select.
	await focus('#kb-source');
	await page.keyboard.press('s');
	const picked = await state(() => document.getElementById('kb-source').value);
	if (picked !== 'referral') findings.push(finding('Select', `typing "s" picked "${picked}", expected the first option starting with S, "referral"`));

	// 9. A field takes typing, and its error and hint are tied to it.
	await focus('#kb-name');
	await page.keyboard.type('Ada');
	const typed = await state(() => document.getElementById('kb-name').value);
	if (typed !== 'Ada') findings.push(finding('Field', `typing "Ada" gave "${typed}"`));
	const wiring = await state(() => {
		const said = (el) => (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean)
			.map((id) => document.getElementById(id)?.textContent.trim() || `missing #${id}`);
		const site = document.getElementById('kb-site');
		const email = document.getElementById('kb-email');
		const referral = document.getElementById('kb-referral');
		return {
			site: { invalid: site.getAttribute('aria-invalid'), says: said(site) },
			email: { says: said(email), required: email.required },
			referral: { invalid: referral.getAttribute('aria-invalid'), says: said(referral) },
		};
	});
	if (wiring.site.invalid !== 'true' || !wiring.site.says.includes('Enter a web address like example.com.'))
		findings.push(finding('Field', `the error field should be aria-invalid and described by its message; got ${JSON.stringify(wiring.site)}`));
	if (!wiring.email.says.includes('I only use it to reply.') || !wiring.email.required)
		findings.push(finding('Field', `the email field should be required and described by its hint; got ${JSON.stringify(wiring.email)}`));
	if (wiring.referral.invalid !== 'true' || !wiring.referral.says.includes('Pick how you heard about me.'))
		findings.push(finding('Select', `the error select should be aria-invalid and described by its message; got ${JSON.stringify(wiring.referral)}`));

	// 10. The summary is focusable by script, and its links take you to the fix.
	const summary = await state(() => {
		const s = document.getElementById('kb-summary');
		s.focus();
		return { focused: document.activeElement === s, role: s.getAttribute('role') };
	});
	if (!summary.focused || summary.role !== 'alert') findings.push(finding('FormSummary', `script focus should land on the role="alert" summary; got ${JSON.stringify(summary)}`));
	await focus('#kb-summary a[href="#kb-site"]');
	await page.keyboard.press('Enter');
	await page.waitForTimeout(300);
	const landed = await state(NAME_ACTIVE);
	if (landed !== 'kb-site') findings.push(finding('FormSummary', `Enter on "Enter a web address" should move focus to the Website field; focus is on ${landed}`));

	await page.context().close();
	return report('Keyboard', findings, `${PATH}, ${ORDER.length} stops x ${THEMES.length} themes, 6 behaviors`);
}
