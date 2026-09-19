import { hasDesigns } from '../stories/design-links.js';

/** The site is Astro and vanilla CSS, so the stories are plain HTML strings.
 *  No React: these are the same class names the pages use. */
export default {
  framework: { name: '@storybook/html-vite', options: {} },
  stories: ['../stories/**/*.stories.js'],
  // Essentials carries the toolbar the theme switch lives in and the Controls
  // panel the args need. Actions and backgrounds are off: no story fires an
  // action, and the theme switch owns the canvas colour. The rest are panels:
  // axe checks, the rendered markup, and the Figma frame. The Design tab only
  // registers once stories/design-links.js has a link, so it never shows empty.
  addons: [
    { name: '@storybook/addon-essentials', options: { actions: false, backgrounds: false } },
    '@storybook/addon-a11y',
    '@whitespace/storybook-addon-html',
    ...(hasDesigns ? ['@storybook/addon-designs'] : []),
  ],
  // No staticDirs: the library is served from the same origin as the site, so
  // story images resolve against /images directly instead of being duplicated.
  viteFinal: (config) => ({ ...config, base: './' }),
};
