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
import { LOCAL, PROD, PAGES } from './config.mjs';

import reflow from './checks/reflow.mjs';
import axe from './checks/axe.mjs';
import dialog from './checks/dialog.mjs';
import textSpacing from './checks/text-spacing.mjs';
import forcedColors from './checks/forced-colors.mjs';
import linkDistinction from './checks/link-distinction.mjs';
import contrast from './checks/contrast.mjs';
import deckFit from './checks/deck-fit.mjs';

const CHECKS = {
	reflow,
	axe,
	dialog,
	'text-spacing': textSpacing,
	'forced-colors': forcedColors,
	'link-distinction': linkDistinction,
	contrast,
	'deck-fit': deckFit,
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

// Warm every page first. The dev server compiles a route on its first request
// after an edit, which can take longer than a check's navigation timeout and
// shows up as a failure that has nothing to do with the page. Three false
// failures in one afternoon earned this loop.
if (base === LOCAL) {
	process.stdout.write('warming routes');
	for (const path of PAGES) {
		try {
			await fetch(base + path, { signal: AbortSignal.timeout(120000) });
			process.stdout.write('.');
		} catch {
			process.stdout.write('!');
		}
	}
	// Compiling a route makes the dev server push a full reload over HMR. Let
	// those land before the first measurement rather than during it.
	await new Promise((r) => setTimeout(r, 3000));
	// A fetch warms the route, not its dependencies. Vite discovers client
	// dependencies lazily, re-optimizes, and answers "504 Outdated Optimize
	// Dep" to any context that loaded the page before it finished, which
	// broke the dialog check on 2026-10-08 with no error in the page. Load
	// every page in a real browser, twice, so the dependency set has settled
	// before anything is measured.
	process.stdout.write(' warming dependencies');
	const warm = await launch();
	for (let round = 0; round < 2; round++) {
		for (const path of PAGES) {
			const page = await warm.newPage();
			await page.goto(base + path, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
			await page.close();
			process.stdout.write('.');
		}
		await new Promise((r) => setTimeout(r, 2000));
	}
	await warm.close();
	console.log(' ready');
}

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
