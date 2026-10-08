/* Adoption report: which pages use which components, and which components
   nothing uses. Counts come from the source, so the number is the same every
   time it runs rather than something an inspection measures by hand and
   throws away.

   Usage:  node scripts/adoption.mjs           prints the table
           node scripts/adoption.mjs --check   exits 1 if a component in
                                               src/components/ui/ is used by
                                               no page and no other component */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir) {
	return readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.astro') ? [join(dir, e.name)] : []);
}
const components = readdirSync('src/components/ui').filter((f) => f.endsWith('.astro')).map((f) => f.replace('.astro', ''));
const pages = walk('src/pages');
const others = walk('src/components');
const rows = components.map((c) => {
	const re = new RegExp(`<${c}\\b`);
	const onPages = pages.filter((p) => re.test(readFileSync(p, 'utf8'))).map((p) => p.replace('src/pages/', ''));
	const inComponents = others.filter((p) => !p.endsWith(`/${c}.astro`) && re.test(readFileSync(p, 'utf8'))).map((p) => p.replace('src/components/', ''));
	return { component: c, pages: onPages, components: inComponents };
});
const pagesUsingSystem = pages.filter((p) => /components\/ui\//.test(readFileSync(p, 'utf8')));
const unused = rows.filter((r) => !r.pages.length && !r.components.length);

console.log(`Pages importing from ui/: ${pagesUsingSystem.length} of ${pages.length}`);
for (const p of pages) if (!pagesUsingSystem.includes(p)) console.log(`  not yet: ${p.replace('src/pages/', '')}`);
console.log('\nComponent             pages  via components');
for (const r of rows) console.log(`${r.component.padEnd(22)}${String(r.pages.length).padStart(5)}  ${r.components.join(', ')}`);
if (unused.length) {
	console.error(`\n${unused.length} component(s) used nowhere: ${unused.map((u) => u.component).join(', ')}`);
	if (process.argv.includes('--check')) process.exit(1);
} else {
	console.log('\nEvery component is used by a page or by another component.');
}
