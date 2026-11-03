#!/usr/bin/env node
/**
 * Fails when the built documentation committed in public/docs does not match
 * what docs-site/ currently produces.
 *
 * /docs is served from committed build output, not built on deploy, so a
 * change to docs-site/ that is merged without running `npm run build:docs`
 * never reaches the site. Nothing caught that: check:docs asks whether the
 * prose was touched, and the CI step that builds docs-site only proves it
 * compiles.
 *
 * The reason this was not already a plain `git diff` is written in the
 * workflow: two parts of the output change on every build whatever the source
 * says, so a raw comparison fails constantly and teaches everyone to ignore it.
 *
 *   - Pagefind rewrites its search index filenames each build. The whole
 *     pagefind/ directory is skipped.
 *   - Starlight stamps "Last updated" from the file's git commit date, so
 *     every page that was committed since the last docs build differs by a
 *     date and nothing else. Both the machine-readable datetime and the
 *     rendered date are normalized away.
 *
 * What survives both is real: prose, markup, navigation, frontmatter. That is
 * the thing worth failing on.
 *
 * Run it AFTER a docs build, against a clean working tree. `npm run ship` and
 * the workflow both do exactly that.
 *
 * Usage:  node scripts/check-docs-built.mjs
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const DIR = 'public/docs';
const SKIP = `${DIR}/pagefind/`;

/** Strips the two things that change on every build regardless of the source. */
function normalize(text) {
	return text
		.replace(/datetime="[^"]*"/g, 'datetime="NORMALIZED"')
		.replace(/>[A-Z][a-z]{2} \d{1,2}, \d{4}</g, '>NORMALIZED<');
}

function git(args) {
	return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

const status = git(['status', '--porcelain', '--', DIR]).split('\n').filter(Boolean);

const added = [];
const deleted = [];
const changed = [];

for (const line of status) {
	// Porcelain v1: two status characters, a space, then the path.
	const code = line.slice(0, 2).trim();
	const path = line.slice(3).replace(/^"|"$/g, '');
	if (path.startsWith(SKIP)) continue;

	if (code === '??' || code === 'A') {
		added.push(path);
		continue;
	}
	if (code === 'D') {
		deleted.push(path);
		continue;
	}

	let before;
	try {
		before = git(['show', `HEAD:${path}`]);
	} catch {
		added.push(path);
		continue;
	}
	const after = readFileSync(path, 'utf8');
	if (normalize(before) !== normalize(after)) changed.push(path);
}

const problems = added.length + deleted.length + changed.length;

if (!problems) {
	const ignored = status.length - status.filter((l) => !l.slice(3).replace(/^"|"$/g, '').startsWith(SKIP)).length;
	console.log(
		`check-docs-built: public/docs matches docs-site/.` +
			(status.length ? ` ${status.length - ignored} file(s) differ by timestamp only, ${ignored} in pagefind/, both ignored.` : ''),
	);
	process.exit(0);
}

console.error('check-docs-built: public/docs is out of step with docs-site/.\n');
for (const p of changed) console.error(`  changed  ${p}`);
for (const p of added) console.error(`  new      ${p}`);
for (const p of deleted) console.error(`  missing  ${p}`);
console.error('\n  These are content differences, not timestamps.');
console.error('  Run `npm run build:docs`, look at what changed, and commit it.');
process.exit(1);
