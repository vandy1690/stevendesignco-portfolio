// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// The documentation is its own Astro project, built as static files into
// ../public/docs, the same way the Pattern Labs and Storybooks live under
// /labs/. Two reasons: the live site runs Astro 6 and current Starlight needs
// Astro 7, and documentation should never be able to break the site it
// documents.
export default defineConfig({
  site: 'https://stevendesignco.com',
  base: '/docs',
  outDir: '../public/docs',
  build: { format: 'directory' },
  integrations: [
    starlight({
      title: 'SDC Design System',
      description:
        'How, when and where to use every component on stevendesignco.com. Written for designers, engineers, content and QA.',
      customCss: ['./src/styles/sdc.css'],
      favicon: '/favicon.svg',
      lastUpdated: true,
      pagination: true,
      social: [
        { icon: 'external', label: 'stevendesignco.com', href: 'https://stevendesignco.com' },
        { icon: 'puzzle', label: 'Storybook', href: 'https://stevendesignco.com/labs/sdc-storybook/' },
      ],
      editLink: { baseUrl: 'https://github.com/vandy1690/stevendesignco-portfolio/edit/dev/docs-site/' },
      sidebar: [
        { label: 'Start here', items: [
          { label: 'What this is', link: '/' },
          { label: 'How to read a component page', slug: 'start/how-to-read' },
          { label: 'Who does what', slug: 'start/roles' },
        ]},
        { label: 'Foundations', items: [{ autogenerate: { directory: 'foundations' } }] },
        { label: 'Components', items: [{ autogenerate: { directory: 'components' } }] },
        { label: 'Patterns', items: [{ autogenerate: { directory: 'patterns' } }] },
        { label: 'Practices', items: [{ autogenerate: { directory: 'practices' } }] },
      ],
    }),
  ],
});
