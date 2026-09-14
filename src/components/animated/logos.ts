// Inline logo pipeline. The hero animations used to load each logo as a
// separate <img> fetch; a corporate proxy on one of Steve's machines blocked
// an arbitrary subset of those requests, breaking individual tiles. Inlining
// the SVG markup into the HTML removes the fetches entirely: if the page
// loads, every logo loads. Works with or without JavaScript (server rendered).

// Internal ids (gradients, clip paths) AND css class names are namespaced per
// brand. Generic ids like "a" or "SVGID_2_" would cross-wire between logos in
// one document, and Illustrator-style class names (.st0, .st1) collide across
// files, painting one brand with another brand's fill colors.
function namespaceIds(svg: string, prefix: string): string {
	return svg
		.replace(/\bid="([^"]+)"/g, (_m, id) => `id="${prefix}-${id}"`)
		.replace(/url\(#([^)]+)\)/g, (_m, id) => `url(#${prefix}-${id})`)
		.replace(/(xlink:)?href="#([^"]+)"/g, (_m, x, id) => `${x ?? ''}href="#${prefix}-${id}"`)
		.replace(/<style([^>]*)>([\s\S]*?)<\/style>/g, (_m, attrs, css) =>
			`<style${attrs}>${css.replace(/\.([A-Za-z_][\w-]*)/g, `.${prefix}-$1`)}</style>`)
		.replace(/\bclass="([^"]*)"/g, (_m, cls: string) =>
			`class="${cls.trim().split(/\s+/).filter(Boolean).map((c) => `${prefix}-${c}`).join(' ')}"`);
}

// Editor leftovers scanners misread. Inkscape and Illustrator exports carry an
// XML declaration, comments, an RDF <metadata> block and <style> blocks of
// class rules. Accessibility checkers read the RDF text (dc:format) and the
// <style> element as page text and report them as low-contrast text. None of it
// renders, so it is removed. Simple ".class{...}" rules are moved onto their
// shapes as inline styles first, ahead of any existing inline style so the
// original cascade order holds. A <style> block containing anything other than
// simple class rules is left untouched rather than risk a logo's colours.
function sanitize(svg: string): string {
	let s = svg
		.replace(/<\?xml[\s\S]*?\?>/g, '')
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/<metadata[\s\S]*?<\/metadata>/g, '')
		.replace(/<sodipodi:namedview[\s\S]*?(?:\/>|<\/sodipodi:namedview>)/g, '')
		.replace(/<title>\s*<\/title>/g, '')
		// The wrapper that inlines a logo carries role="img" and the brand name,
		// so the inner svg is decoration, not a presentation role with children.
		.replace(/\srole="presentation"/g, ' aria-hidden="true"');

	const rules: Record<string, string[]> = {};
	s = s.replace(/<style[^>]*>([\s\S]*?)<\/style>/g, (block, css: string) => {
		const found: Array<[string, string]> = [];
		const leftover = css.replace(/([^{}]+)\{([^{}]*)\}/g, (_r, sels: string, decl: string) => {
			for (const sel of sels.split(',')) {
				const m = sel.trim().match(/^\.([A-Za-z_][\w-]*)$/);
				if (!m) { found.length = 0; return '\u0000'; }
				found.push([m[1], decl.trim().replace(/;\s*$/, '')]);
			}
			return '';
		});
		if (leftover.includes('\u0000') || leftover.trim()) return block;
		for (const [cls, decl] of found) (rules[cls] ||= []).push(decl);
		return '';
	});
	if (Object.keys(rules).length) {
		s = s.replace(/<([a-zA-Z][\w:-]*)\b([^>]*?)\sclass="([^"]*)"([^>]*?)(\/?)>/g,
			(tag, name, before, cls: string, after, selfClose) => {
				const decls = cls.trim().split(/\s+/).flatMap((c) => rules[c] || []);
				if (!decls.length) return tag;
				const attrs = before + after;
				const existing = attrs.match(/\sstyle="([^"]*)"/);
				const merged = decls.join(';') + (existing ? ';' + existing[1] : '');
				const rest = attrs.replace(/\sstyle="[^"]*"/, '');
				return `<${name}${rest} class="${cls}" style="${merged}"${selfClose}>`;
			});
	}
	return s.trim();
}

const raw = import.meta.glob('../../assets/logos/*.svg', {
	query: '?raw',
	import: 'default',
	eager: true,
}) as Record<string, string>;

export const LOGOS: Record<string, string> = Object.fromEntries(
	Object.entries(raw).map(([path, svg]) => {
		const name = path.split('/').pop()!.replace('.svg', '');
		return [name, namespaceIds(sanitize(svg), name.toLowerCase())];
	}),
);
