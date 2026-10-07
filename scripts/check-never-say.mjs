#!/usr/bin/env node
/* Never-say check: fails when a site says something it has been decided it must not.
 *
 * The list lives in the site's own repo (never-say.txt by default), one entry per
 * line:   phrase | why, with the date the rule was settled
 * Lines starting with # are comments. Matching ignores case and runs on what a
 * visitor gets: visible text plus meta descriptions, OG tags, titles, alt text and
 * aria-labels. Scripts, styles and HTML comments are ignored, so a code comment
 * never trips it.
 *
 * Usage:
 *   node check-never-say.mjs --list never-say.txt --url http://localhost:4321 /path /path2
 *   node check-never-say.mjs --list never-say.txt --files index.html public/docs
 *   (a directory in --files is searched for .html files)
 *
 * It catches exact wording, not meaning. It is a backstop for claims already
 * decided, not a substitute for reading the copy.
 *
 * Canonical copy: ~/.claude/skills/site-context/check-never-say.mjs. Repos that
 * run it in CI carry a copy; keep them identical.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
	const i = args.indexOf(name);
	return i === -1 ? fallback : args[i + 1];
};
const listPath = opt('--list', 'never-say.txt');
const base = opt('--url', null);
const filesFrom = args.indexOf('--files');
const takesValue = new Set(['--list', '--url']);
const positional = args.filter((a, i) => a !== '--files' && !takesValue.has(a) && !takesValue.has(args[i - 1]));

const entries = readFileSync(listPath, 'utf8')
	.split('\n')
	.map((l) => l.trim())
	.filter((l) => l && !l.startsWith('#'))
	.map((l) => {
		const [phrase, ...why] = l.split('|');
		return { phrase: phrase.trim(), why: why.join('|').trim() };
	})
	.filter((e) => e.phrase);

const decode = (s) => s
	.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
	.replace(/&#39;|&#x27;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
	.replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
	.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
	.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));

// What a visitor or a link preview actually reads.
function readable(html) {
	const attrs = [...html.matchAll(/\b(?:content|alt|title|aria-label)\s*=\s*"([^"]*)"/gi)].map((m) => m[1]);
	const body = html
		.replace(/<!--[\s\S]*?-->/g, ' ')
		.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
		.replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
		.replace(/<[^>]+>/g, ' ');
	return decode([body, ...attrs].join(' \n ')).replace(/\s+/g, ' ');
}

function htmlFiles(p) {
	if (statSync(p).isDirectory()) {
		return readdirSync(p).flatMap((f) => htmlFiles(join(p, f)));
	}
	return p.endsWith('.html') ? [p] : [];
}

const sources = [];
if (base) {
	for (const path of positional) {
		const res = await fetch(new URL(path, base));
		if (!res.ok) { console.error(`Could not load ${path}: HTTP ${res.status}`); process.exit(2); }
		sources.push({ where: path, text: readable(await res.text()) });
	}
}
if (filesFrom !== -1) {
	for (const p of positional) {
		for (const f of htmlFiles(p)) sources.push({ where: f, text: readable(readFileSync(f, 'utf8')) });
	}
}
if (!sources.length) {
	console.error('Nothing to check. Pass --url with paths, or --files with files or folders.');
	process.exit(2);
}

const hits = [];
for (const { where, text } of sources) {
	const lower = text.toLowerCase();
	for (const { phrase, why } of entries) {
		const at = lower.indexOf(phrase.toLowerCase());
		if (at === -1) continue;
		const snippet = text.slice(Math.max(0, at - 50), at + phrase.length + 50).trim();
		hits.push({ where, phrase, why, snippet });
	}
}

if (hits.length) {
	console.error(`\nNever-say check failed: ${hits.length} hit${hits.length > 1 ? 's' : ''}.\n`);
	for (const h of hits) {
		console.error(`${h.where}\n  says:   "${h.phrase}"\n  why:    ${h.why}\n  in:     ...${h.snippet}...\n`);
	}
	console.error(`Fix the copy, or if the rule itself changed, edit ${listPath} and say why in the commit.`);
	process.exit(1);
}
console.log(`Never-say check passed: ${entries.length} phrases, ${sources.length} pages.`);
