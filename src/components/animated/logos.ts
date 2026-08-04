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

const raw = import.meta.glob('../../assets/logos/*.svg', {
	query: '?raw',
	import: 'default',
	eager: true,
}) as Record<string, string>;

export const LOGOS: Record<string, string> = Object.fromEntries(
	Object.entries(raw).map(([path, svg]) => {
		const name = path.split('/').pop()!.replace('.svg', '');
		return [name, namespaceIds(svg, name.toLowerCase())];
	}),
);
