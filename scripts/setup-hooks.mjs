#!/usr/bin/env node
/**
 * Points git at the hooks committed in .githooks, and records which branch is
 * production here.
 *
 * Git does not version .git/hooks, so a hook written there exists on one
 * machine and nowhere else. core.hooksPath moves the hook directory into the
 * repository, where the hook is reviewed in a pull request like any other file.
 * That config is per clone, so something has to set it: npm runs `prepare`
 * after every install, which is the same mechanism husky uses.
 *
 * It also sets ship.productionBranch. The pre-push hook reads it rather than
 * hardcoding a branch name, so the identical hook works in this repository,
 * where production is `dev`, and in stevendesignservices-site, where it is
 * `main`.
 *
 * Nothing here fails the install. A machine without git, or a tarball with no
 * .git directory, should still be able to run npm ci.
 *
 * Usage:  node scripts/setup-hooks.mjs [--check]
 *   --check  reports whether the hooks are wired up, and exits 1 if not.
 *            Used by `npm run ship`, so a clone that skipped the install step
 *            finds out before it pushes rather than after.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';

const PRODUCTION_BRANCH = 'dev';
const HOOKS_PATH = '.githooks';
const check = process.argv.includes('--check');

function git(args) {
	return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

let inRepo = false;
try {
	inRepo = git(['rev-parse', '--is-inside-work-tree']) === 'true';
} catch {
	inRepo = false;
}

if (!inRepo) {
	console.log('setup-hooks: not a git work tree, nothing to do.');
	process.exit(0);
}

const problems = [];

let hooksPath = '';
try {
	hooksPath = git(['config', '--get', 'core.hooksPath']);
} catch {
	hooksPath = '';
}

let productionBranch = '';
try {
	productionBranch = git(['config', '--get', 'ship.productionBranch']);
} catch {
	productionBranch = '';
}

if (check) {
	if (hooksPath !== HOOKS_PATH) problems.push(`core.hooksPath is "${hooksPath || 'unset'}", expected "${HOOKS_PATH}"`);
	if (productionBranch !== PRODUCTION_BRANCH) problems.push(`ship.productionBranch is "${productionBranch || 'unset'}", expected "${PRODUCTION_BRANCH}"`);
	if (!existsSync(`${HOOKS_PATH}/pre-push`)) {
		problems.push(`${HOOKS_PATH}/pre-push is missing`);
	} else if (!(statSync(`${HOOKS_PATH}/pre-push`).mode & 0o111)) {
		problems.push(`${HOOKS_PATH}/pre-push is not executable, so git will skip it silently`);
	}

	if (problems.length) {
		console.error('setup-hooks: the push guard is not active.');
		for (const p of problems) console.error(`  - ${p}`);
		console.error('\n  Fix with:  npm run setup:hooks');
		process.exit(1);
	}
	console.log(`setup-hooks: push guard active, production branch is ${PRODUCTION_BRANCH}.`);
	process.exit(0);
}

try {
	git(['config', 'core.hooksPath', HOOKS_PATH]);
	git(['config', 'ship.productionBranch', PRODUCTION_BRANCH]);
	console.log(`setup-hooks: hooks come from ${HOOKS_PATH}, production branch is ${PRODUCTION_BRANCH}.`);
} catch {
	// An install should never fail because a hook could not be wired up.
	console.log('setup-hooks: could not write git config, skipping.');
}
