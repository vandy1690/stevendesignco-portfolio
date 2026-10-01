#!/usr/bin/env node
/**
 * The Q&A pass. Run it before shipping anything.
 *
 *   npm run qa              every check against the local dev server
 *   npm run qa -- --prod    the same checks against the live site
 *   npm run qa -- axe       one check by name
 *   npm run qa -- --pixel   add the pixel comparison, which is slow
 *
 * Every check in here exists because something got through. The comments at the
 * top of each one say what. Add a check when you find the next thing; that is
 * how this stays worth running.
 */
import { launch } from './lib.mjs';
import { LOCAL, PROD } from './config.mjs';

import reflow from './checks/reflow.mjs';
import axe from './checks/axe.mjs';
import dialog from './checks/dialog.mjs';
import textSpacing from './checks/text-spacing.mjs';
import forcedColors from './checks/forced-colors.mjs';
import linkDistinction from './checks/link-distinction.mjs';

const CHECKS = {
	reflow,
	axe,
	dialog,
	'text-spacing': textSpacing,
	'forced-colors': forcedColors,
	'link-distinction': linkDistinction,
};

const args = process.argv.slice(2);
const base = args.includes('--prod') ? PROD : LOCAL;
const withPixel = args.includes('--pixel');
const named = args.filter((a) => !a.startsWith('--'));

const selected = named.length ? named : Object.keys(CHECKS);
for (const name of selected) {
	if (!CHECKS[name]) {
		console.error(`No check called "${name}". Available: ${Object.keys(CHECKS).join(', ')}`);
		process.exit(2);
	}
}

const reachable = await fetch(base, { method: 'HEAD' }).then((r) => r.ok).catch(() => false);
if (!reachable) {
	console.error(`\nCannot reach ${base}.`);
	console.error(base === LOCAL ? 'Start the site first:  npm run dev\n' : '');
	process.exit(2);
}

console.log(`\nQ&A against ${base}`);
const browser = await launch();
const failed = [];
try {
	for (const name of selected) {
		const ok = await CHECKS[name](browser, base);
		if (!ok) failed.push(name);
	}
	if (withPixel) {
		const { default: pixel } = await import('./checks/pixel.mjs');
		await pixel(browser, base);
	}
} finally {
	await browser.close();
}

console.log('');
if (failed.length) {
	console.error(`Q&A failed: ${failed.join(', ')}\n`);
	process.exit(1);
}
console.log('Q&A passed.\n');
