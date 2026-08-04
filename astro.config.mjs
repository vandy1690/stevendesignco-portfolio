// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react()],
  build: {
    // Ship all page css inline in the HTML. Corporate proxies (Steve's work
    // machine) block /_astro/ asset fetches; inline styles cannot be blocked.
    inlineStylesheets: 'always',
  },
});
