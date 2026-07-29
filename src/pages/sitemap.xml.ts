import type { APIRoute } from 'astro';

export const prerender = false;

const SITE = 'https://www.stevendesignco.com';

// lastmod: bump the date for a page when its content changes.
const pages: { path: string; priority: string; lastmod: string }[] = [
	{ path: '/', priority: '1.0', lastmod: '2026-07-28' },
	{ path: '/work/paypal', priority: '0.9', lastmod: '2026-07-28' },
	{ path: '/work/plate', priority: '0.8', lastmod: '2026-06-26' },
	{ path: '/work/blackbird', priority: '0.8', lastmod: '2026-06-26' },
	{ path: '/work/alt-meat', priority: '0.8', lastmod: '2026-06-26' },
	{ path: '/work/meatingplace', priority: '0.8', lastmod: '2026-06-26' },
	{ path: '/resume', priority: '0.7', lastmod: '2026-07-08' },
];

export const GET: APIRoute = () => {
	const urls = pages
		.map(
			(p) => `	<url>
		<loc>${SITE}${p.path}</loc>
		<lastmod>${p.lastmod}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>${p.priority}</priority>
	</url>`,
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
