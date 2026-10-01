/**
 * The one place to add a page or a width.
 *
 * Every check reads this. A page that is not listed here is not checked, which
 * is the most common way a regression gets through: the pages that broke during
 * the component refactor were the three nobody thought to look at.
 */

/** Every page the site serves. Add new ones here. */
export const PAGES = [
	'/',
	'/work',
	'/resume',
	'/design-systems',
	'/work/paypal',
	'/work/plate',
	'/work/blackbird',
	'/work/alt-meat',
	'/work/meatingplace',
	'/work/merchant-flow-builder',
	'/work/artistic-eye',
];

/**
 * Case studies the home page opens in a dialog. The dialog injects a case
 * page's <main> contents without the <main> element, so anything scoped to an
 * ancestor has to be checked here as well as on the page itself.
 */
export const DIALOG_CASES = [
	'/work/paypal',
	'/work/plate',
	'/work/merchant-flow-builder',
	'/work/artistic-eye',
	'/design-systems',
];

/**
 * 320 is the WCAG reflow floor. 360 is the common Android width and is where
 * the PayPal orbit used to push the page sideways. 880 and 700 are real
 * breakpoints in the stylesheet. 1920 catches anything with a max width that
 * was never set.
 */
export const WIDTHS = [320, 360, 390, 430, 600, 768, 880, 1024, 1280, 1440, 1920];

/** A shorter list for checks that are slow and not width sensitive. */
export const KEY_WIDTHS = [390, 880, 1440];

export const LOCAL = 'http://localhost:4321';
export const PROD = 'https://stevendesignco.com';
