import { defineMiddleware } from 'astro:middleware';

const REALM = 'StevenDesignCo dev preview';

// Hosts that are PUBLIC (no password gate). Everything else is gated.
const PUBLIC_HOSTS = new Set([
  'stevendesignco.com',
  'www.stevendesignco.com',
]);

// `astro dev` does not serve directory indexes out of public/, so /labs/plate/
// and every other lab 404 locally while the same URL works in production, where
// Vercel's `handle: filesystem` resolves them. This closes that gap so a local
// review matches the live site, URL included. Dev only: the branch below is
// statically false in a build, so none of this reaches production.
async function publicDirectoryIndex(pathname: string): Promise<Response | null> {
  if (!pathname.endsWith('/')) return null;
  const [{ readFile }, path, { fileURLToPath }] = await Promise.all([
    import('node:fs/promises'),
    import('node:path'),
    import('node:url'),
  ]);
  const root = path.resolve(fileURLToPath(import.meta.url), '../../public');
  const file = path.join(root, pathname, 'index.html');
  // Anything that escapes public/ is not ours to serve.
  if (!file.startsWith(root + path.sep)) return null;
  try {
    return new Response(await readFile(file, 'utf8'), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch {
    return null;
  }
}

export const onRequest = defineMiddleware(async (context, next) => {
  // Local dev (`astro dev`) is unprompted.
  if (import.meta.env.DEV) {
    return (await publicDirectoryIndex(context.url.pathname)) ?? next();
  }

  // Public on the live domain; password gate stays on dev/preview.
  if (PUBLIC_HOSTS.has(context.url.hostname)) return next();

  const password = import.meta.env.SITE_PASSWORD;
  // Fail open if env var isn't set so a misconfigured deploy doesn't lock us out.
  if (!password) return next();

  const auth = context.request.headers.get('authorization') ?? '';
  if (auth.startsWith('Basic ')) {
    const decoded = atob(auth.slice(6));
    const supplied = decoded.split(':').slice(1).join(':');
    if (supplied === password) return next();
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}"`,
      'Content-Type': 'text/plain',
    },
  });
});
