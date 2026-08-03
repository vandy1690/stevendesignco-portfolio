// Inline logo pipeline. The hero animations used to load each logo as a
// separate <img> fetch; a corporate proxy on one of Steve's machines blocked
// an arbitrary subset of those requests, breaking individual tiles. Inlining
// the SVG markup into the HTML removes the fetches entirely: if the page
// loads, every logo loads. Works with or without JavaScript (server rendered).

// Internal ids (gradients, clip paths) are namespaced per brand so generic
// ids like "a" or "SVGID_2_" cannot cross-wire between logos in one document.
function namespaceIds(svg: string, prefix: string): string {
	return svg
		.replace(/\bid="([^"]+)"/g, (_m, id) => `id="${prefix}-${id}"`)
		.replace(/url\(#([^)]+)\)/g, (_m, id) => `url(#${prefix}-${id})`)
		.replace(/(xlink:)?href="#([^"]+)"/g, (_m, x, id) => `${x ?? ''}href="#${prefix}-${id}"`);
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
