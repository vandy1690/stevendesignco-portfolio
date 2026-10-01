# stevendesignco.com

The portfolio site of Steven Vanden Heuvel, product designer. Case studies,
a design systems practice page, a resume, and five browsable component
libraries.

Live: [stevendesignco.com](https://stevendesignco.com)

Designed in Figma. Built in Cursor with Claude Code. Astro, vanilla CSS, and a
small amount of React.

## What is here

| Path | What it is |
|------|------------|
| `/` | Home: hero, case study deck, recommendations, how I work, recognition, about, contact |
| `/work` | Every case study and working artifact |
| `/work/merchant-flow-builder` | PayPal: a self initiated Figma plugin and brief form |
| `/work/paypal` | PayPal: one click checkout proposals and the checkout dead end |
| `/work/plate` | Plate: 2017 Jesse H. Neal Award for Best Website |
| `/work/meatingplace` | Meatingplace: flagship news site redesign |
| `/work/alt-meat` | Alt-Meat: a brand launched from nothing |
| `/work/blackbird` | Project Blackbird: Grand Neal finalist |
| `/design-systems` | The practice behind the case studies |
| `/resume` | Resume page with a PDF download |
| `/labs/*` | Two Pattern Labs and three Storybooks, served as static builds |

## Stack

| Piece | Choice |
|-------|--------|
| Framework | Astro 6, server output |
| Host | Vercel, through `@astrojs/vercel` |
| Styling | Vanilla CSS with custom properties. No Tailwind, no CSS framework |
| Interactivity | Plain TypeScript in Astro script tags. React 19 for one island |
| Smooth scroll | Lenis, on the home page only |
| Fonts | Nickel Gothic Variable (Adobe Fonts) for display, Inter (`@fontsource`) for body |
| Component library | Storybook 8 on `@storybook/html-vite`, in `storybook/` |
| Node | 22.12 or newer |

## Quick start

    git clone https://github.com/vandy1690/stevendesignco-portfolio.git
    cd stevendesignco-portfolio
    npm install
    npm run dev

The site runs at [localhost:4321](http://localhost:4321). Local dev has no
password gate and no analytics.

## Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Dev server on port 4321 |
| `npm run build` | Production build into `dist/` and `.vercel/output/` |
| `npm run qa` | The Q&A pass: accessibility, reflow, contrast, keyboard, both themes. Needs `npm run dev` running |
| `npm run qa -- --prod` | The same checks against the live site |
| `npm run qa -- --pixel` | Adds a pixel comparison against the live site |
| `npm run ship` | Documentation check, build, then the Q&A pass |
| `npm run check:docs` | Fails if the design system changed and no documentation did |
| `node scripts/generate-og.mjs` | Rebuild the social cards in `public/og/` and `public/og-image.png` |
| `node scripts/generate-icons.mjs` | Rebuild the favicon PNGs from `public/favicon.svg` |

The Storybook has its own `package.json` and commands. See
[storybook/README.md](storybook/README.md).

## Documentation

| Doc | Read it when you want to |
|-----|--------------------------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Understand how the site is put together and why |
| [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | Use the tokens, type, themes, and components |
| [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md) | Add or edit a case study, the resume, social cards, or SEO files |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Ship, preview, roll back, or change an environment variable |
| [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) | See what the site does for accessibility and how to test it |
| [docs/LABS.md](docs/LABS.md) | Work with the Pattern Labs and Storybooks under `/labs/` |
| [qa/README.md](qa/README.md) | Run the Q&A pass, add a check, or understand why one exists |
| [storybook/README.md](storybook/README.md) | Run or extend the site's own component library |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Follow the branch, commit, and writing conventions |
| [CHANGELOG.md](CHANGELOG.md) | See what changed and when |

## Read this before you push

**The `dev` branch is production.** Vercel deploys every push to `dev` to
stevendesignco.com. There is no staging step between a push and the live site.
Work on a feature branch, check the Vercel preview, then merge to `dev`. The
details are in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

**Run `npm run qa` before you merge.** GitHub Actions runs it on every push and
pull request as well, so a branch tells you either way, but on `dev` that
feedback arrives after the deploy rather than before it. The checks and the
defect each one was written for are listed in [qa/README.md](qa/README.md).

## Folder layout

    .
    ├── src/
    │   ├── layouts/Site.astro      the one layout: head, header, footer, global CSS, tokens
    │   ├── pages/                  one file per route
    │   │   ├── index.astro
    │   │   ├── resume.astro
    │   │   ├── design-systems.astro
    │   │   ├── sitemap.xml.ts
    │   │   └── work/               the case studies
    │   ├── components/
    │   │   ├── art/                inline SVG diagrams, as Astro components
    │   │   └── animated/           React: the PayPal logo orbit
    │   ├── assets/logos/           merchant logo SVGs for the orbit
    │   └── middleware.ts           password gate for non public hosts
    ├── public/
    │   ├── images/                 case study, brand, and about images
    │   ├── og/                     per page social cards
    │   ├── labs/                   committed static builds of the five libraries
    │   ├── resume.pdf
    │   ├── llms.txt
    │   └── robots.txt
    ├── scripts/                    social card and icon generators
    ├── storybook/                  source for the SDC Storybook
    └── docs/

## License and credits

There is no license file in this repo, so normal copyright applies. The code
and the writing are © Steven Vanden Heuvel. Merchant and publisher logos belong
to their owners and appear here to describe work done for or about them.

Nickel Gothic Variable is licensed through Adobe Fonts and loads from Adobe's
servers. It is not in this repo.

## Contact

steven [at] stevendesignco [dot] com ·
[LinkedIn](https://www.linkedin.com/in/stevendesignco)
