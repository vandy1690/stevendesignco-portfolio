/* Generates custom-elements.json, the standard machine-readable description of
   the system's custom elements, from the components themselves.

   Each component that renders a custom element declares it in its doc comment
   with `@element sdc-name`. The attributes come from the Props interface: a
   doc comment line followed by `name?: type;`. Nothing is written by hand
   here, so the manifest cannot say something the source does not.

   Usage:  node scripts/build-manifest.mjs [--check]
           --check exits 1 if the committed file is out of date.
   Output: custom-elements.json at the repo root, served at /custom-elements.json. */
import { readFileSync, readdirSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/components/ui';
const OUT = 'custom-elements.json';
const PUBLIC = 'public/custom-elements.json';

// Which element a prop lands on, when a component renders more than one.
const ATTRIBUTE_HOME = {
	'sdc-layout-container': new Set(['layout', 'width', 'animate']),
};

const modules = [];
for (const file of readdirSync(DIR).filter((f) => f.endsWith('.astro')).sort()) {
	const src = readFileSync(join(DIR, file), 'utf8');
	const elements = [...src.matchAll(/@element\s+(sdc-[a-z-]+)/g)].map((m) => m[1]);
	if (!elements.length) continue;
	const doc = src.match(/\/\*\*\s*\n\s*\*\s*(\w+)\s*\n\s*\*\s*([^\n]*)/);
	const summary = doc ? doc[2].trim() : '';
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
	const slots = [...new Set([...src.matchAll(/<slot(?:\s+name="([^"]+)")?\s*\/>/g)].map((m) => m[1] || ''))].map((name) => ({ name }));
	const declarations = elements.map((tag) => {
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
			name: file.replace('.astro', ''),
			summary,
			description: `Rendered by ${DIR}/${file}. Light DOM, no shadow root, no JavaScript: the element is styled by tag and attribute in src/layouts/Site.astro.`,
			attributes: mine.filter((p) => p.name !== 'class').map((p) => ({
				name: p.name,
				type: { text: p.type },
				description: p.description,
				...(p.optional ? {} : { required: true }),
			})),
			slots,
		};
	});
	modules.push({ kind: 'javascript-module', path: `${DIR}/${file}`, declarations });
}

const manifest = {
	schemaVersion: '1.0.0',
	readme: 'docs-site/src/content/docs/start/naming.mdx',
	modules,
};
const json = JSON.stringify(manifest, null, '\t') + '\n';

if (process.argv.includes('--check')) {
	const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
	if (current !== json) {
		console.error(`${OUT} is out of date. Run: node scripts/build-manifest.mjs`);
		process.exit(1);
	}
	console.log(`${OUT} is in step (${modules.length} modules).`);
} else {
	writeFileSync(OUT, json);
	copyFileSync(OUT, PUBLIC);
	console.log(`Wrote ${modules.flatMap((m) => m.declarations).length} elements to ${OUT} and ${PUBLIC}`);
}
