/* Naming convention check. Fails when a name the system owns breaks the rules
   written at docs-site/src/content/docs/start/naming.mdx.

   1. Custom elements: every <sdc-*> tag used in src/ is declared by a
      component (@element) and is in custom-elements.json.
   2. Classes: a class the system defines in the global stylesheet is written
      with the sdc- prefix wherever it appears (markup, selectors, strings).
      Utilities use sdc-u-. State classes (is-*, nav-open, modal-open, js,
      lenis) and page-local classes carry no prefix, by design.
   3. Tokens: every custom property defined in the global stylesheet starts
      with --sdc-. Component-private variables (--pp-*, --ls-*, --i, --dim,
      --content, --field, --n, --j) are private and are not checked.
   4. Props: a component prop never reuses the name of an HTML global
      attribute, so it cannot be mistaken for one. `class` and `id` are the two
      deliberate pass-throughs.

   Added 2026-10-08. The inspection found no naming convention written down
   and no validator, and the sdc- namespace was applied by hand the day before.

   Usage:  node scripts/check-names.mjs */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const problems = [];
const read = (p) => readFileSync(p, 'utf8');
function walk(dir, exts) {
	const out = [];
	for (const e of readdirSync(dir, { withFileTypes: true })) {
		const p = join(dir, e.name);
		if (e.isDirectory()) { if (e.name !== 'node_modules') out.push(...walk(p, exts)); }
		else if (exts.some((x) => p.endsWith(x))) out.push(p);
	}
	return out;
}

// --- 1. elements
const manifest = existsSync('custom-elements.json') ? JSON.parse(read('custom-elements.json')) : { modules: [] };
const declared = new Set(manifest.modules.flatMap((m) => m.declarations.map((d) => d.tagName)));
const used = new Map();
for (const f of walk('src', ['.astro', '.tsx'])) {
	for (const m of read(f).matchAll(/<(sdc-[a-z-]+)[\s>]/g)) used.set(m[1], f);
}
for (const [tag, f] of used) if (!declared.has(tag)) problems.push(`${f}: <${tag}> is used but no component declares it (@element) or the manifest is stale`);
for (const tag of declared) if (!used.has(tag)) problems.push(`custom-elements.json declares <${tag}> but nothing in src/ uses it`);

// --- 2. classes. The system's class blocks are the ones the global stylesheet defines.
const site = read('src/layouts/Site.astro');
const globalCss = [...site.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n')
	.replace(/\/\*[\s\S]*?\*\//g, ' '); // comments carry file names and URLs, not selectors
const STATE = new Set(['is-in', 'is-open', 'is-active', 'is-visible', 'nav-open', 'modal-open', 'js', 'lenis', 'lenis-stopped', 'lenis-smooth', 'lenis-scrolling', 'deck-static']);
const blocks = new Set();
for (const m of globalCss.matchAll(/(?<![\w)])\.([a-z][a-z0-9-]*)/g)) {
	const b = m[1].split(/__|--/)[0];
	if (!STATE.has(b)) blocks.add(b);
}
const bad = [...blocks].filter((b) => !b.startsWith('sdc-'));
for (const b of bad) problems.push(`src/layouts/Site.astro defines .${b}: a system class must start with sdc- (or sdc-u- for a utility)`);
const stems = new Set([...blocks].filter((b) => b.startsWith('sdc-')).map((b) => b.replace(/^sdc-(u-)?/, '')));
for (const f of walk('src', ['.astro', '.tsx', '.css'])) {
	const s = read(f);
	for (const m of s.matchAll(/class(?:Name)?=["']([^"'{}]*)["']/g)) {
		for (const t of m[1].split(/\s+/)) {
			const b = t.split(/__|--/)[0];
			if (stems.has(b)) problems.push(`${f}: class "${t}" is a system class and must be written sdc-${t}`);
		}
	}
}

// --- 3. tokens
const PRIVATE = /^--(pp|ls|rx|ry)[\w-]*$|^--(i|dim|content|field|n|j|lift)$/;
for (const m of globalCss.matchAll(/^\s*(--[a-z][\w-]*)\s*:/gm)) {
	if (!m[1].startsWith('--sdc-') && !PRIVATE.test(m[1])) problems.push(`src/layouts/Site.astro defines ${m[1]}: a system token must start with --sdc-`);
}

// --- 4. props
const GLOBAL_ATTRS = new Set(['hidden', 'title', 'style', 'lang', 'dir', 'tabindex', 'role', 'slot', 'is', 'part', 'draggable', 'translate', 'inert', 'popover', 'accesskey', 'autofocus', 'contenteditable', 'spellcheck', 'nonce']);
for (const f of walk('src/components', ['.astro'])) {
	const block = read(f).match(/interface Props \{([\s\S]*?)\n\}/);
	if (!block) continue;
	for (const m of block[1].matchAll(/^\s*(\w+)\??:/gm)) {
		if (GLOBAL_ATTRS.has(m[1])) problems.push(`${f}: prop "${m[1]}" reuses an HTML global attribute name; pick a name that says what it does`);
	}
}

if (problems.length) {
	console.error(`\nNaming check failed: ${problems.length} problem${problems.length > 1 ? 's' : ''}.\n`);
	for (const p of problems) console.error('  ' + p);
	console.error('\nThe rules: docs-site/src/content/docs/start/naming.mdx\n');
	process.exit(1);
}
console.log(`Naming check passed: ${declared.size} elements, ${stems.size} system classes, tokens and props clean.`);
