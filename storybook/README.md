# Steven Design Co. Storybook

The component library for stevendesignco.com. Twenty stories across Foundations,
Components and Patterns.

## The point of it

The stylesheet is **generated, not copied**. `sync-css.mjs` fetches the running
site, pulls the CSS out of the pages it serves, strips Astro's compile-time scope
hashes, and writes `src/sdc.css`. Every story therefore renders with the CSS
production actually ships, and the library cannot drift from the site.

## Stack

Plain HTML stories on `@storybook/html-vite`. No React, which matches the site:
Astro with vanilla CSS custom properties. Stories are functions returning HTML
strings using the same class names the pages use.

## Commands

    npm install
    npm run sync     # regenerate src/sdc.css from a running site
    npm run dev      # Storybook on :6007 (needs the site running on :4321 for sync)
    npm run build    # sync, then build into ../public/labs/sdc-storybook

`sync-css.mjs` defaults to `http://localhost:4321`. Pass another origin to pull
from production instead:

    node sync-css.mjs https://stevendesignco.com

## Notes

- The display face (Nickel Gothic Variable) is loaded from its Adobe Typekit kit
  in `.storybook/preview-head.html`, because the site loads it with a link tag
  rather than inline CSS, so the sync cannot see it.
- Story images point at `/images/...` and resolve against the site, since the
  built library is served from the same origin at `/labs/sdc-storybook/`.
- Contrast figures in Foundations are computed in the browser against whatever
  the tokens currently resolve to, so they stay honest when a token changes.
- The built output is committed under `public/labs/`, the same as the Plate and
  Alt-Meat labs. `storybook/node_modules` is not.
