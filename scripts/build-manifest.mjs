/* Generates custom-elements.json, the standard machine-readable description of
   the component library, from the components themselves.

   Every component in src/components/ui/ gets an entry. The ones that render a
   custom element declare it with `@element sdc-name` and appear as custom
   element declarations, with a tagName and attributes, exactly as before. The
   rest keep their native element with sdc- classes, which is a deliberate rule
   written at docs/start/naming, so they appear as plain class declarations:
   kind "class" with no customElement flag, their props as members, and the
   classes they write listed under sdcClasses.

   That split is the manifest format's own: a consumer that wants only custom
   elements filters on `customElement`, which returns the same eight it always
   did. A consumer that wants the library reads every module.

   Every component also declares where it is documented with `@docs slug`. The
   check fails if a component is missing from the manifest, or names a page
   that does not exist, so an added component cannot stay invisible.

   Nothing is written by hand here, so the manifest cannot say something the
   source does not.

   Usage:  node scripts/build-manifest.mjs [--check]
           --check exits 1 if a committed file is out of date, a component is
           uncovered, or a @docs pointer is broken.
   Writes: custom-elements.json at the repo root, served at /custom-elements.json
           public/custom-elements.json
           docs-site/src/data/components.json, the index page's source */
import { readFileSync, readdirSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/components/ui';
const OUT = 'custom-elements.json';
const PUBLIC = 'public/custom-elements.json';
const DOCS_DIR = 'docs-site/src/content/docs/components';
const INDEX = 'docs-site/src/data/components.json';

// Which element a prop lands on, when a component renders more than one.
const ATTRIBUTE_HOME = {
	'sdc-layout-container': new Set(['layout', 'width', 'animate']),
};

const problems = [];
const files = readdirSync(DIR).filter((f) => f.endsWith('.astro')).sort();
const modules = [];
const index = [];
const claimed = new Set();

for (const file of files) {
	const src = readFileSync(join(DIR, file), 'utf8');
	const name = file.replace('.astro', '');
	const path = `${DIR}/${file}`;

	const elements = [...src.matchAll(/@element\s+(sdc-[a-z-]+)/g)].map((m) => m[1]);
	const docsTag = src.match(/@docs\s+(\S+)/);
	if (!docsTag) problems.push(`${path}: no @docs pointer. Add "@docs components/<slug>" to the doc comment.`);
	const slug = docsTag ? docsTag[1] : null;
	if (slug) {
		const page = `docs-site/src/content/docs/${slug}.mdx`;
		if (!existsSync(page)) problems.push(`${path}: @docs ${slug} points at ${page}, which does not exist.`);
		else claimed.add(slug);
	}
	const docsUrl = slug ? `/docs/${slug}/` : undefined;

	/* The summary is the first sentence of the doc comment, not its first line.
	   A line break is where the prose wrapped at 80 columns, so cutting there
	   left every summary ending mid-clause, in the manifest and on the index
	   page that reads it. Join the opening paragraph, then cut at the sentence. */
	const docBlock = src.match(/\/\*\*\s*\n([\s\S]*?)\n\s*\*\//);
	let summary = '';
	if (docBlock) {
		const lines = docBlock[1].split('\n').map((l) => l.replace(/^\s*\*\s?/, '').trimEnd());
		const body = lines.slice(1); // line 0 is the component name
		const para = [];
		for (const l of body) { if (!l.trim()) break; para.push(l.trim()); }
		const text = para.join(' ');
		summary = (text.match(/^.+?[.!?](?=\s|$)/) || [text])[0].trim();
	}

	const props = [];
	const propsBlock = src.match(/interface Props \{([\s\S]*?)\n\}/);
	if (propsBlock) {
		const lines = propsBlock[1].split('\n');
		let pending = '';
		for (const raw of lines) {
			const line = raw.trim();
			const comment = line.match(/^\/\*\*\s*(.*?)\s*\*\/$/);
			if (comment) { pending = comment[1]; continue; }
			const prop = line.match(/^(\w+)(\?)?:\s*(.+?);$/);
			if (prop) {
				props.push({ name: prop[1], optional: !!prop[2], type: prop[3], description: pending });
				pending = '';
			}
		}
	}

	const slots = [...new Set([...src.matchAll(/<slot(?:\s+name="([^"]+)")?\s*\/>/g)].map((m) => m[1] || ''))].map((n) => ({ name: n }));

	/* The sdc- classes this component writes. Taken from quoted strings only, so
	   an element used in the markup (<sdc-section>) is never mistaken for one.
	   An agent that has to hand-write the markup needs these names; they are the
	   only part of a non-element component that is not in its props. */
	const classes = [...new Set(
		[...src.matchAll(/['"]((?:sdc-[a-z0-9_-]+\s*)+)['"]/g)].flatMap((m) => m[1].trim().split(/\s+/)),
	)].sort();

	const declarations = elements.length
		? elements.map((tag) => {
			// A module that renders two elements splits its props between them;
			// a module with one element owns all of its props.
			const split = elements.length > 1;
			const mine = props.filter((p) => {
				if (!split) return true;
				const home = elements.find((t) => ATTRIBUTE_HOME[t]?.has(p.name));
				return home ? home === tag : tag === elements[0];
			});
			return {
				kind: 'class',
				customElement: true,
				tagName: tag,
				name,
				summary,
				description: `Rendered by ${path}. Light DOM, no shadow root, no JavaScript: the element is styled by tag and attribute in src/layouts/Site.astro.`,
				attributes: mine.filter((p) => p.name !== 'class').map((p) => ({
					name: p.name,
					type: { text: p.type },
					description: p.description,
					...(p.optional ? {} : { required: true }),
				})),
				slots,
				...(classes.length ? { sdcClasses: classes } : {}),
				...(docsUrl ? { sdcDocs: docsUrl } : {}),
			};
		})
		: [{
			kind: 'class',
			name,
			summary,
			description: `Rendered by ${path}. Not a custom element: it keeps the native element that carries the role and writes sdc- classes on it, styled in src/layouts/Site.astro. Import the component rather than writing the markup by hand.`,
			members: props.map((p) => ({
				kind: 'field',
				name: p.name,
				type: { text: p.type },
				description: p.description,
				privacy: 'public',
				...(p.optional ? {} : { required: true }),
			})),
			slots,
			...(classes.length ? { sdcClasses: classes } : {}),
			...(docsUrl ? { sdcDocs: docsUrl } : {}),
		}];

	/* The block, for the index: the shortest class that is not a utility. BEM
	   children and modifiers are longer than the block they hang off, so the
	   shortest one is the block, and that is the name worth printing. */
	const block = classes.filter((c) => !c.startsWith('sdc-u-')).sort((a, b) => a.length - b.length)[0] ?? null;

	modules.push({ kind: 'javascript-module', path, declarations });
	index.push({
		name,
		path,
		elements,
		block,
		classes,
		props: props.map((p) => p.name),
		slots: slots.map((s) => s.name || 'default'),
		docs: docsUrl ?? null,
		summary,
	});
}

const manifest = {
	schemaVersion: '1.0.0',
	readme: 'docs-site/src/content/docs/start/naming.mdx',
	modules,
};

/* A component page that no component claims documents a pattern that is CSS and
   markup only. Derived, not listed, so the two halves of the index can never
   disagree about which is which. */
const cssOnly = readdirSync(DOCS_DIR)
	.filter((f) => f.endsWith('.mdx') && f !== 'index.mdx')
	.map((f) => ({ file: f, slug: `components/${f.replace('.mdx', '')}` }))
	.filter((p) => !claimed.has(p.slug))
	.map((p) => {
		const fm = readFileSync(join(DOCS_DIR, p.file), 'utf8').match(/^---\n([\s\S]*?)\n---/);
		const field = (k) => (fm?.[1].match(new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, 'm'))?.[1] ?? '');
		return { title: field('title'), summary: field('description'), docs: `/docs/${p.slug}/` };
	})
	.sort((a, b) => a.title.localeCompare(b.title));

const indexFile = {
	generated: 'scripts/build-manifest.mjs, from src/components/ui and the component pages',
	components: index,
	cssOnly,
};

const json = JSON.stringify(manifest, null, '\t') + '\n';
const indexJson = JSON.stringify(indexFile, null, '\t') + '\n';

if (problems.length) {
	console.error(`\nManifest check failed: ${problems.length} problem${problems.length > 1 ? 's' : ''}.\n`);
	for (const p of problems) console.error('  ' + p);
	console.error('');
	process.exit(1);
}

if (process.argv.includes('--check')) {
	const stale = [];
	if (!existsSync(OUT) || readFileSync(OUT, 'utf8') !== json) stale.push(OUT);
	if (!existsSync(PUBLIC) || readFileSync(PUBLIC, 'utf8') !== json) stale.push(PUBLIC);
	if (!existsSync(INDEX) || readFileSync(INDEX, 'utf8') !== indexJson) stale.push(INDEX);
	if (stale.length) {
		console.error(`Out of date: ${stale.join(', ')}. Run: npm run build:manifest`);
		process.exit(1);
	}
	const els = modules.flatMap((m) => m.declarations).filter((d) => d.customElement).length;
	console.log(`custom-elements.json is in step: ${files.length} of ${files.length} components covered, ${els} of them custom elements, ${cssOnly.length} CSS-only patterns indexed.`);
} else {
	writeFileSync(OUT, json);
	copyFileSync(OUT, PUBLIC);
	mkdirSync('docs-site/src/data', { recursive: true });
	writeFileSync(INDEX, indexJson);
	const els = modules.flatMap((m) => m.declarations).filter((d) => d.customElement).length;
	console.log(`Wrote ${files.length} components (${els} custom elements) to ${OUT} and ${PUBLIC}`);
	console.log(`Wrote ${index.length} components and ${cssOnly.length} CSS-only patterns to ${INDEX}`);
}
