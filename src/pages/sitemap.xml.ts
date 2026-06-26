import type { APIRoute } from 'astro';

export const prerender = false;

const SITE = 'https://www.stevendesignco.com';

const pages: { path: string; priority: string }[] = [
	{ path: '/', priority: '1.0' },
	{ path: '/work/paypal', priority: '0.9' },
	{ path: '/work/plate', priority: '0.8' },
	{ path: '/work/blackbird', priority: '0.8' },
	{ path: '/work/alt-meat', priority: '0.8' },
	{ path: '/work/meatingplace', priority: '0.8' },
	{ path: '/resume', priority: '0.7' },
];

export const GET: APIRoute = () => {
	const urls = pages
		.map(
			(p) => `	<url>
		<loc>${SITE}${p.path}</loc>
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
