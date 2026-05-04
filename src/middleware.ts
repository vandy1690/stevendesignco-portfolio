import { defineMiddleware } from 'astro:middleware';

const REALM = 'StevenDesignCo dev preview';

export const onRequest = defineMiddleware(async (context, next) => {
  // Local dev (`astro dev`) is unprompted.
  if (import.meta.env.DEV) return next();

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
