/**
 * axe-core across every page, and again with each dialog open.
 *
 * The dialog pass exists because the dialog is where a whole stylesheet once
 * went missing while every standalone page was perfect. Scanning the pages is
 * not scanning the site.
 *
 * axe is loaded from node_modules rather than a CDN: the live site's CSP blocks
 * outside scripts, so a CDN load silently fails against production.
 */
import { open, openDialog, finding, report } from '../lib.mjs';
import { PAGES, DIALOG_CASES } from '../config.mjs';

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const AXE = 'node_modules/axe-core/axe.min.js';

async function run(page) {
	await page.addScriptTag({ path: AXE });
	return page.evaluate(async (tags) => {
		const res = await window.axe.run(document, { runOnly: tags });
		return res.violations.map((v) => ({
			id: v.id,
			impact: v.impact,
			count: v.nodes.length,
			first: v.nodes[0]?.target.join(' ') ?? '',
		}));
	}, TAGS);
}

export default async function axe(browser, base) {
	const findings = [];
	for (const path of PAGES) {
		const page = await open(browser, base + path);
		for (const v of await run(page)) {
			findings.push(finding(path, `${v.id} (${v.impact}) x${v.count} — ${v.first}`));
		}
		await page.context().close();
	}
	for (const href of DIALOG_CASES) {
		const page = await open(browser, base + '/');
		if (await openDialog(page, href)) {
			for (const v of await run(page)) {
				findings.push(finding(`dialog ${href}`, `${v.id} (${v.impact}) x${v.count} — ${v.first}`));
			}
		} else {
			findings.push(finding(`dialog ${href}`, 'no card on the home page to open it with'));
		}
		await page.context().close();
	}
	return report('axe-core', findings, `${PAGES.length} pages + ${DIALOG_CASES.length} dialogs`);
}
