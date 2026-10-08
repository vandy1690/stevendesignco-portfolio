/* Generates the Tier 1 primitives block in src/layouts/Site.astro from the
   canonical DTCG file. Figma is the source of truth for primitive VALUES;
   this script is the only thing that writes them into CSS.

   Tier 2 (semantic) stays hand-authored, because it uses rgba() over the -rgb
   helpers and clamp() fluid type, neither of which a Figma variable can express.

   Usage: node scripts/build-tokens.mjs [--check]
          --check exits 1 if the file is out of date instead of writing. */
import { readFileSync, writeFileSync } from 'node:fs';

const TOKENS = 'src/styles/tokens/primitives.tokens.json';
const TARGET = 'src/layouts/Site.astro';
// Every system token is namespaced. Figma keeps the plain names; the prefix is
// added here, the one place names are generated.
const PREFIX = 'sdc';
const START = '/* TOKENS:START — generated from Figma by scripts/build-tokens.mjs. Do not edit. */';
const END = '/* TOKENS:END */';
const INDENT = '\t\t\t\t';

const hexToRgb = (h) => {
	const v = h.replace('#', '');
	return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16)).join(', ');
};

const doc = JSON.parse(readFileSync(TOKENS, 'utf8'));
const tokens = [];
for (const [group, members] of Object.entries(doc)) {
	if (group.startsWith('$')) continue;
	for (const [leaf, tok] of Object.entries(members)) {
		tokens.push({ name: `--${PREFIX}-${group}-${leaf}`, value: tok.$value, desc: tok.$description });
	}
}

const lines = [START];
for (const t of tokens) {
	lines.push(`${INDENT}${t.name}: ${t.value};${t.desc ? `   /* ${t.desc} */` : ''}`);
}
lines.push('');
lines.push(`${INDENT}/* rgb triples for rgba() in the semantic tier */`);
for (const t of tokens) lines.push(`${INDENT}${t.name}-rgb: ${hexToRgb(t.value)};`);
lines.push(`${INDENT}${END}`);
const block = lines.join('\n');

const src = readFileSync(TARGET, 'utf8');
const a = src.indexOf(START);
const b = src.indexOf(END);
if (a === -1 || b === -1) {
	console.error(`Markers not found in ${TARGET}. Expected ${START} ... ${END}`);
	process.exit(1);
}
const next = src.slice(0, a) + block + src.slice(b + END.length);

if (process.argv.includes('--check')) {
	if (next !== src) {
		console.error('Tokens are out of date. Run: node scripts/build-tokens.mjs');
		process.exit(1);
	}
	console.log(`Tokens in step (${tokens.length} primitives).`);
	process.exit(0);
}
writeFileSync(TARGET, next);
console.log(`Wrote ${tokens.length} primitives + ${tokens.length} rgb triples into ${TARGET}`);
