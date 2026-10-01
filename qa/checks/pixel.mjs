/**
 * The local build against whatever is live, pixel for pixel.
 *
 * This is the check that catches what nothing else does: a refactor that is
 * supposed to change nothing, and changes something. It found a stylesheet
 * reaching three pages it had no business reaching, after a structural diff of
 * the same pages said they were identical.
 *
 * It reports rather than fails, because an intentional change also shows up
 * here. Read it. Every difference should be one you meant.
 *
 * Two kinds of noise are expected and are not defects:
 *   - A few dozen scattered single pixels on glyph edges. Font rasterisation
 *     differs between runs. A real shift shows as filled rows, not confetti.
 *   - The home page. Its scroll deck measures itself at load and settles
 *     differently run to run, including against itself.
 */
import { open, report, finding } from '../lib.mjs';
import { PAGES, KEY_WIDTHS, PROD } from '../config.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { PNG } from 'pngjs';

const OUT = 'qa/.shots';

async function shoot(browser, url, width, file) {
	const page = await open(browser, url, { width });
	await page.screenshot({ path: file, fullPage: true });
	await page.context().close();
}

function compare(a, b) {
	const A = PNG.sync.read(a), B = PNG.sync.read(b);
	if (A.width !== B.width || A.height !== B.height) {
		return { size: `${A.width}x${A.height} vs ${B.width}x${B.height}` };
	}
	let differing = 0;
	const rows = new Set();
	let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1;
	for (let y = 0; y < A.height; y++) {
		for (let x = 0; x < A.width; x++) {
			const i = (A.width * y + x) << 2;
			if (
				Math.abs(A.data[i] - B.data[i]) > 24 ||
				Math.abs(A.data[i + 1] - B.data[i + 1]) > 24 ||
				Math.abs(A.data[i + 2] - B.data[i + 2]) > 24
			) {
				differing++;
				rows.add(y);
				if (x < x0) x0 = x;
				if (x > x1) x1 = x;
				if (y < y0) y0 = y;
				if (y > y1) y1 = y;
			}
		}
	}
	// Confetti is rasterisation. A shift fills many pixels across many rows, so
	// it takes both a dense average and enough rows to call it one. A single
	// dense row is a rule or an underline moving, not the layout.
	const perRow = rows.size ? differing / rows.size : 0;
	const band = rows.size >= 5 && perRow > 40;
	// Where the differences sit says more than how dense they are. Everything
	// inside one small box is a single element: the first run after the theme
	// toggle was added reported every page as "scattered rasterisation" when in
	// fact every difference was the new 48px button in the corner.
	const box = differing
		? { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 }
		: null;
	const localised = box && box.w <= 200 && box.h <= 200;
	return { differing, rows: rows.size, perRow: Math.round(perRow), band, box, localised };
}

export default async function pixel(browser, base) {
	const { readFileSync } = await import('node:fs');
	mkdirSync(OUT, { recursive: true });
	const findings = [];
	for (const path of PAGES) {
		for (const width of KEY_WIDTHS) {
			const slug = path.replace(/\//g, '_') || '_home';
			const localFile = `${OUT}/${width}${slug}-local.png`;
			const prodFile = `${OUT}/${width}${slug}-prod.png`;
			await shoot(browser, base + path, width, localFile);
			await shoot(browser, PROD + path, width, prodFile);
			const r = compare(readFileSync(prodFile), readFileSync(localFile));
			if (r.size) {
				findings.push(finding(`${path} @${width}`, `different height: ${r.size}`));
			} else if (r.differing > 0) {
				const shape = r.localised
					? `all inside ${r.box.w}x${r.box.h} at ${r.box.x},${r.box.y} — one element`
					: r.band
						? 'dense across many rows, look at this one'
						: r.rows <= 2
							? 'one or two rows, likely a rule or an underline'
							: 'scattered across the page, likely glyph rasterisation';
				findings.push(finding(`${path} @${width}`, `${r.differing} px over ${r.rows} rows — ${shape}`));
			}
		}
	}
	report('Pixel against production (report only)', findings, `${PAGES.length} pages x ${KEY_WIDTHS.length} widths`, 'note');
	return true; // never fails the run
}
