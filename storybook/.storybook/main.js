/** The site is Astro and vanilla CSS, so the stories are plain HTML strings.
 *  No React: these are the same class names the pages use. */
export default {
  framework: { name: '@storybook/html-vite', options: {} },
  stories: ['../stories/**/*.stories.js'],
  addons: [],
  // No staticDirs: the library is served from the same origin as the site, so
  // story images resolve against /images directly instead of being duplicated.
  viteFinal: (config) => ({ ...config, base: './' }),
};
