#!/usr/bin/env node
/**
 * Fails when a change touches the design system without touching its
 * documentation.
 *
 * The Storybook cannot drift: it regenerates its stylesheet from the running
 * site. Prose can. This is the mechanism that replaces "remember to update the
 * docs" with something that actually stops you.
 *
 * Usage:  node scripts/check-docs-in-step.mjs [baseRef]
 * Default baseRef is origin/dev.
 */
import { execSync } from 'node:child_process';

const base = process.argv[2] || 'origin/dev';
const changed = execSync(`git diff --name-only ${base}...HEAD`, { encoding: 'utf8' })
	.split('\n').filter(Boolean);

if (!changed.length) {
	console.log('No changes against ' + base + '. Nothing to check.');
	process.exit(0);
}

// What counts as touching the system people rely on the docs to explain.
const systemChanged = changed.filter((f) =>
	f === 'src/layouts/Site.astro' ||
	f.startsWith('src/components/') ||
	(f.startsWith('storybook/stories/') && f.endsWith('.js')) ||
	f === 'storybook/.storybook/storybook.css');

const docsChanged = changed.filter((f) =>
	f.startsWith('docs-site/src/content/docs/') || f.startsWith('docs/'));

const storybookRebuilt = changed.some((f) => f.startsWith('public/labs/sdc-storybook/'));
const storybookSourceChanged = changed.some((f) => f.startsWith('storybook/stories/'));

const problems = [];

if (systemChanged.length && !docsChanged.length) {
	problems.push(
		'These changed, but no documentation page did:\n  ' + systemChanged.join('\n  ') +
		'\n\nUpdate the matching page under docs-site/src/content/docs/, or say in the\n' +
		'commit message why the behaviour people rely on did not change.');
}

if (storybookSourceChanged && !storybookRebuilt) {
	problems.push(
		'Storybook stories changed but public/labs/sdc-storybook was not rebuilt.\n' +
		'Run: cd storybook && npm run build   (the site must be running on :4321)');
}

if (problems.length) {
	console.error('\nDocumentation is out of step.\n');
	for (const p of problems) console.error(p + '\n');
	console.error('Override for a genuine exception:  SKIP_DOCS_CHECK=1\n');
	if (!process.env.SKIP_DOCS_CHECK) process.exit(1);
	console.error('SKIP_DOCS_CHECK set. Continuing.\n');
}

console.log('Documentation is in step with the change.');
