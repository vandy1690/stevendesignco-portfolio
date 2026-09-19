# Steven Design Co. Storybook

The component library for [stevendesignco.com](https://stevendesignco.com).
Twenty stories across Foundations, Components and Patterns, each rendered with
the CSS the site ships.

Live: [stevendesignco.com/labs/sdc-storybook](https://stevendesignco.com/labs/sdc-storybook/)

## Contents

1. [The point of it](#the-point-of-it)
2. [Stack](#stack)
3. [Quick start](#quick-start)
4. [Commands](#commands)
5. [Folder layout](#folder-layout)
6. [How the CSS sync works](#how-the-css-sync-works)
7. [What is in the library](#what-is-in-the-library)
8. [Add-ons](#add-ons)
9. [Themes](#themes)
10. [Writing a story](#writing-a-story)
11. [Adding Figma frames](#adding-figma-frames)
12. [Accessibility](#accessibility)
13. [Build and deploy](#build-and-deploy)
14. [Troubleshooting](#troubleshooting)
15. [Upgrading Storybook](#upgrading-storybook)

## The point of it

The stylesheet is **generated, not copied**. `sync-css.mjs` fetches the running
site, pulls the CSS out of the pages it serves, strips Astro's compile time scope
hashes, and writes `src/sdc.css`. Every story renders with the CSS production
ships, so the library cannot drift from the site.

Most portfolio Storybooks are a second copy of the design system that slowly
goes stale. This one has no second copy to go stale.

## Stack

| Piece | Choice |
|-------|--------|
| Storybook | 8.6, `@storybook/html-vite` |
| Stories | Plain HTML strings, CSF 3, no React |
| Styles | `src/sdc.css`, generated from the site |
| Display font | Nickel Gothic Variable, Adobe Typekit kit `uic8bwd` |
| Body font | Inter, from the synced site CSS |
| Node | 20 or newer (built on 22) |

The site is Astro with vanilla CSS custom properties. No Tailwind and no
component framework for layout. So the stories are functions that return HTML
using the same class names the pages use.

## Quick start

    cd storybook
    npm install
    npm run dev

Storybook opens on [localhost:6007](http://localhost:6007). `src/sdc.css` is
committed, so you do not need the site running to look at the library. You only
need it running to refresh the CSS.

Story images point at `/images/...` on the site. They show as broken on the
Storybook dev server and resolve once the build is served from the site.

## Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Storybook dev server on port 6007 |
| `npm run sync` | Regenerate `src/sdc.css` from a running site on `localhost:4321` |
| `npm run build` | Sync, then build into `../public/labs/sdc-storybook` |
| `node sync-css.mjs https://stevendesignco.com` | Sync from production instead of local |
| `npx storybook build -o ../public/labs/sdc-storybook` | Build without syncing, keeping the current CSS |

To sync from a local site, start Astro first from the repo root with
`npm run dev`, then run `npm run sync` here.

## Folder layout

    storybook/
    ├── .storybook/
    │   ├── main.js             framework, story glob, add-ons
    │   ├── preview.js          theme switch, decorator, global parameters
    │   ├── preview-head.html   Typekit link for the display face
    │   └── storybook.css       helper classes for story chrome (.sb-*)
    ├── src/
    │   └── sdc.css             GENERATED. Never edit by hand
    ├── stories/
    │   ├── Introduction.stories.js
    │   ├── Foundations.stories.js
    │   ├── Components.stories.js
    │   ├── Patterns.stories.js
    │   └── design-links.js     Figma frame link per story
    ├── sync-css.mjs            pulls CSS from the running site
    └── package.json

The built library lives outside this folder, at `public/labs/sdc-storybook/`
in the repo root, and is committed. `storybook/node_modules` is not.

## How the CSS sync works

`sync-css.mjs` does four things:

1. Fetches five pages from the site: `/`, `/work`, `/work/paypal`,
   `/design-systems` and `/resume`.
2. Pulls every inline `<style>` block out of the HTML.
3. Strips Astro's `[data-astro-cid-...]` scope selectors. Those hashes are
   compile time noise. The class names are the contract.
4. Drops duplicate blocks and writes the rest to `src/sdc.css` with a header
   that says when it was generated.

If a new page ships styles that no story can see, add its path to the `PAGES`
list at the top of `sync-css.mjs` and sync again.

The one thing the sync cannot see is the display font. The site loads Nickel
Gothic with a link tag, not inline CSS, so the same Typekit link sits in
`.storybook/preview-head.html`.

## What is in the library

**Introduction**
- Read me

**Foundations** (the tokens)
- Colour, with contrast ratios computed live in the browser against the
  current theme
- Typography
- Display widths (Nickel Gothic has a width axis and a slant axis, no weight axis)
- Spacing
- Elevation
- Focus
- Texture

**Components** (pieces that repeat across pages)
- Buttons
- Pager
- Pager pair
- Case study card
- Recommendation
- Meta row
- Row list
- Case study block
- Skip link

**Patterns** (whole compositions)
- Case study hero
- Deck fallback
- Contact block

Each section also has a Docs page at the top of its list: every story in the
section on one scrolling page, with controls and source.

## Add-ons

| Add-on | What you get |
|--------|--------------|
| `@storybook/addon-essentials` | The toolbar the theme switch lives in, Controls, Viewport, Measure, Outline, and autodocs. Actions and Backgrounds are switched off: no story fires an action, and the theme switch owns the canvas colour |
| `@storybook/addon-a11y` | An Accessibility tab that runs axe on the story, plus a colour blindness simulator in the toolbar |
| `@whitespace/storybook-addon-html` | An HTML tab with the rendered, formatted markup. Scoped to the inside of the canvas wrapper, so you see the component and not the Storybook chrome |
| `@storybook/addon-designs` | A Design tab with the Figma frame beside the story. Off until a link is filled in. See [Adding Figma frames](#adding-figma-frames) |

All four are pinned to releases that support Storybook 8.

## Themes

The site ships in light mode. Dark is the alternate.

| Theme | Ground | Accent |
|-------|--------|--------|
| Light (default) | warm off white `#F0EEE9` | slate blue `#4A6FA8` |
| Dark | black | neon lime `#CCFF00` |

The toolbar switch sets `data-theme` on the document root, the same attribute
the site uses, so both palettes come straight from the synced CSS. You can also
link to a theme: add `&globals=theme:dark` to any story URL.

## Writing a story

Stories are CSF 3 objects or plain functions that return an HTML string.

A story with controls:

```js
export const Buttons = {
  args: { label: 'View work' },
  argTypes: { label: { control: 'text' } },
  render: ({ label }) => `
    <p class="sb-note">One line on what this is and why it is built this way.</p>
    <div class="sb-stack">
      <a class="btn btn--primary" href="#0">${label}</a>
    </div>`,
};
```

A static story:

```js
export const MetaRow = () => `<dl class="cs-meta">...</dl>`;
MetaRow.storyName = 'Meta row';
```

Rules that keep the library honest:

- **Use the site's class names.** Do not write new CSS for a component in a
  story. If it needs CSS, that CSS belongs in the site, and the sync brings it in.
- **Story chrome uses `.sb-*` classes** from `.storybook/storybook.css`:
  `.sb-note` for the explainer line, `.sb-stack` for a row, `.sb-col` for a
  column, `.sb-grid` for a tile grid, `.sb-row` for a labelled row. Nothing in
  that file ships to the site.
- **No ids, and scope your scripts.** A Docs page renders several stories, and
  some stories twice, in one document. An id will collide and a top level
  `const` in an injected script will throw on the second render. Wrap injected
  script text in a block and find elements from `document.currentScript`. The
  Colour story in `Foundations.stories.js` shows the pattern.
- **New section?** Add its title to `storySort.order` in `.storybook/preview.js`.
- **New story in Components or Patterns?** Add its export name to the
  `attachDesigns({...})` call at the foot of the file and to `design-links.js`.

## Adding Figma frames

1. In Figma, right click the frame and choose Copy link to selection.
2. Paste it next to the story's name in `stories/design-links.js`.
3. Rebuild.

The Design tab registers only when at least one link is filled in, so it never
shows up empty. The Figma file has to be viewable by anyone with the link, or
visitors hit a Figma login wall.

## Accessibility

Every story passes axe with zero violations in both themes, checked across all
twenty stories. Items axe marks as "incomplete" are contrast checks it cannot
finish on its own, mostly where text sits over the dotted ground texture. They
are not failures, but they are worth a look by eye.

The claims the story notes make, such as the 3 to 1 boundary on the secondary
button and the hidden text on pagers, can be checked in the Accessibility tab
and the HTML tab.

To check a new story: open it, open the Accessibility tab, switch to dark, and
look again.

## Build and deploy

    npm run build

This syncs the CSS and writes the static library to
`../public/labs/sdc-storybook/`. Astro copies `public/` into the site build as
is, so the library ships with the site at `/labs/sdc-storybook/`. Commit the
built output along with the source. The same approach is used for the other
labs on the site.

Two build settings matter, both in `.storybook/main.js`:

- `base: './'` makes asset paths relative, so the library works from a
  subfolder.
- There are no `staticDirs`. The library is served from the same origin as the
  site, so story images resolve against the site's `/images` and are not copied
  a second time.

The build is about 6.7 MB. Most of that is the docs renderer and axe, and it
loads only on the Storybook page.

## Troubleshooting

| Problem | Cause and fix |
|---------|---------------|
| `npm run build` fails on fetch | The sync needs a site to read. Start Astro on port 4321, or sync from production, or build without syncing (see [Commands](#commands)) |
| Images are broken in `npm run dev` | Expected. They resolve against the site origin once deployed |
| Display font falls back to a system face | The Typekit kit did not load. Check the link in `.storybook/preview-head.html` and that the kit allows the domain |
| A story looks unstyled | Its CSS is on a page the sync does not fetch. Add the page to `PAGES` in `sync-css.mjs` |
| A Docs page throws "Identifier has already been declared" | A story injects a script with a top level `const`. Scope it in a block |
| Theme switch or Controls missing | `@storybook/addon-essentials` is not installed or not listed in `main.js` |
| Design tab missing | Working as intended until `design-links.js` has a link |

## Upgrading Storybook

Stay on 8.x unless there is a reason to move. Storybook 9 and later fold
several essentials add-ons into core, drop others, and need newer majors of the
HTML and Designs add-ons, so an upgrade changes the add-on list in `main.js`
and should be done with `npx storybook upgrade` and a full check of every tab.
