import { defineMiddleware } from 'astro:middleware';

const REALM = 'StevenDesignCo dev preview';

// Hosts that are PUBLIC (no password gate). Everything else is gated.
const PUBLIC_HOSTS = new Set([
  'stevendesignco.com',
  'www.stevendesignco.com',
]);

export const onRequest = defineMiddleware(async (context, next) => {
  // Local dev (`astro dev`) is unprompted.
  if (import.meta.env.DEV) return next();

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
