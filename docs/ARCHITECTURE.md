# Architecture

How stevendesignco.com is put together, and the reasons behind the choices
that look unusual.

## The short version

- One layout, `src/layouts/Site.astro`. It owns the head, header, footer, the
  design tokens, and all global CSS.
- One `.astro` file per route in `src/pages/`. Each page carries its own scoped
  styles and, where needed, its own script.
- No content collections, no CMS, no Markdown. Copy lives in the page files.
- Almost no client framework. One React island on one page. Everything else is
  plain TypeScript in Astro `<script>` tags.
- Static libraries under `public/labs/` ship as committed builds.

## Rendering

`astro.config.mjs` sets `output: 'server'` with the Vercel adapter. The pages
themselves are simple, so why server output and not a static build?

1. **The password gate needs a runtime.** `src/middleware.ts` runs on every
   request and asks for Basic auth on any host that is not the public domain.
   Middleware cannot run on a fully static site.
2. **The sitemap is an endpoint.** `src/pages/sitemap.xml.ts` sets
   `prerender = false` and returns XML.

## CSS is always inlined

    build: { inlineStylesheets: 'always' }

Every page ships its CSS inside the HTML. Some corporate proxies block requests
to `/_astro/` asset paths, which left the site unstyled on locked down work
machines. Those are the machines hiring managers use. Inline styles cannot be
blocked. The cost is a little repeated CSS per page, which is a fair trade for a
site this size.

Two other things depend on this choice:

- The home page case study modal fetches a case study page and brings its
  `<style>` blocks along with the content.
- The Storybook's `sync-css.mjs` reads the site's CSS straight out of the served
  HTML.

If you ever turn inlining off, both of those need to change.

The merchant logos in the PayPal hero are inlined as SVG markup for the same
reason.

## The layout: `Site.astro`

Props:

| Prop | Required | Purpose |
|------|----------|---------|
| `title` | yes | The `<title>`, Open Graph title, and the Article headline (the part before ` · `) |
| `description` | no | Meta description, Open Graph, Twitter |
| `image` | no | Path to a social card under `public/`. Falls back to `/og-image.png` |
| `variant` | no | `"case"` turns on the case study styles by putting `.case` on `<main>`. A case study page that omits it renders unstyled |

What it renders:

- **Head.** Favicons, canonical URL, Open Graph and Twitter tags, the Adobe Fonts
  link, and JSON-LD. The JSON-LD graph always has a `Person` and a `WebSite`. Pages
  under `/work/` add an `Article` and a `BreadcrumbList`. `/resume` adds a
  `ProfilePage`.
- **Analytics.** Google Analytics 4 loads only when `import.meta.env.PROD` is true.
- **Header and nav.** A desktop nav and a separate mobile nav. Links are in page
  anchors on the home page and `/#anchor` links everywhere else.
- **Footer.** The email link is stored hex encoded in `data-eml` and decoded at
  runtime, so scrapers that read the raw HTML do not see an address.
- **Global script.** Adds the `js` class to `<html>`, runs the fade in observer,
  the mobile nav, the email reveal, and the letter flip effect on menu and CTA links.
- **Global CSS.** Tokens, base type, and every shared component. See
  [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

## Planned degradation

The site has to work when JavaScript is blocked, fails, or is slow.

- The script adds `html.js` when it runs. Every state that depends on JavaScript
  (hidden fade sections, the mobile nav, dead controls) is gated on `html.js` in
  the CSS. If the script never runs, nothing is hidden.
- The home page has a `<noscript>` block with plain links to every case study.
- The scroll driven decks fall back to plain lists. The script adds
  `deck-static` to the root when the user asks for reduced motion, when the
  viewport is under 600 CSS pixels tall, or when it measures that a card would be
  clipped.

## The home page

`src/pages/index.astro` is the largest file and the only page with real
behaviour. The data sits at the top of the file.

- `cases`: the case study cards, in display order. Reorder the array to reorder
  the deck.
- `quotes`: twelve recommendation excerpts, titles only, no names.

Behaviour, all in the page's own script:

| Piece | What it does |
|-------|--------------|
| Lenis | Smooth scrolling over native scroll, so sticky positioning and scroll events still work |
| Reveal | `data-reveal="words"` splits text into masked words that slide up. `data-reveal="block"` fades and lifts as one |
| Work deck | `data-mode="flip"`. The track is n + 1 screens tall, the stage sticks, and scroll position sets each card's offset |
| Recommendations deck | `data-mode="fan"`. Cards sit at slot (j minus t), so the spread slides one slot per card as you scroll |
| Progress dots | Visual only and hidden from assistive tech, since the cards are already a list |
| Case study modal | A card click fetches the case study page and drops it into a dialog over the blurred page |

The modal keeps the standalone URLs working. It updates the URL while it is
open, so Back closes it, and a link pasted into an email still opens the full
page. While it is open the rest of the page is inert and Tab stays inside the
dialog.

## Case study pages

Each file in `src/pages/work/` is assembled from the components in
`src/components/ui/` and follows one shape:

1. `<CaseHero>`: back link, eyebrow, title, lede, a `figure` slot, and the meta
   row of role, org and recognition, which it renders itself from its `meta` prop.
2. A run of `<CaseSection>` bands, alternating with `alt`, each holding
   `<CaseBlock>` with an eyebrow, a lede heading and body copy.
3. `<PagerPair>` at the foot.

The `cs-*` class names below are what those components render. A page does not
write them by hand.

The `cs-*` classes are global. They are defined once in `src/layouts/Site.astro`,
scoped under `.case`, and a page turns them on by passing `variant="case"` to the
layout, which puts `.case` on `<main>`. Case study pages carry no CSS of their own.

They used to be per page, with each file holding a near identical copy of the same
rules. That is why `.case` exists: change a `cs-*` rule once and every case study
page and the home page dialog pick it up together. Two things follow from the
scoping:

- **A page that forgets `variant="case"` renders unstyled.** It is a loud failure
  and the pixel check in `npm run qa` catches it.
- **The dialog needs `.case` too.** It injects the contents of a case study's
  `<main>` without the `<main>` element, so `.modal__content` carries `case` as a
  class. Without it the dialog shows the right content with none of the styles.

The pieces that are global and not under `.case` (`pager`, `btn`, `eyebrow`,
`display`, `skip-link`, `sr-only`) are also in `Site.astro`.

## Components

The shared library is the 14 components in `components/ui/`. Every case study
page is assembled from them and carries no markup of its own for these pieces.
Each one has a page in the documentation site under `/docs/components/`.

| Component | Type | Used on |
|-----------|------|---------|
| `components/ui/CaseHero.astro` | Case study hero; renders `CaseMeta` and `Eyebrow` itself | Every case study |
| `components/ui/CaseSection.astro` | The page band, with `alt`, `figure`, `flush`, `inner` | Every case study |
| `components/ui/CaseBlock.astro` | The prose unit: eyebrow, lede heading, paragraphs | Every case study |
| `components/ui/CaseFigure.astro` | Figure with a caption slot | Case studies with art |
| `components/ui/CaseMeta.astro` | The role, org, recognition row. Composed inside `CaseHero` | Via `CaseHero` |
| `components/ui/PagerPair.astro` | The previous and next pair. Composes two `Pager` | Every case study |
| `components/ui/Pager.astro` | One pager link. Composed inside `PagerPair` | Via `PagerPair` |
| `components/ui/StatList.astro` | Two or three statistics, `three` and `large` | Selected case studies |
| `components/ui/Quote.astro` | The case study pull quote, `blockquote.cs-quote` | Selected case studies |
| `components/ui/Button.astro` | A link styled as a button, `variant="primary"` for the filled one | Several pages |
| `components/ui/ButtonGroup.astro` | A row of buttons | Several pages |
| `components/ui/Eyebrow.astro` | The small label above a heading | Via `CaseHero`, `CaseBlock` |
| `components/ui/Note.astro` | The aside for what a page is not showing | Several case studies |
| `components/ui/AwardList.astro` | The recognition list | `/work/plate` |
| `components/art/PluginPipeline.astro` | Inline SVG diagram | Home card stand in |
| `components/art/OneClickCheckout.astro` | Inline SVG diagram | Home card stand in |
| `components/art/JourneyMap.astro` | Inline SVG diagram | Home card stand in |
| `components/animated/PayPalHero.tsx` | React island, `client:load` | `/work/paypal` |
| `components/animated/logos.ts` | Inlined logo SVG markup for the orbit | PayPalHero |
| `components/animated/LogoScatter.tsx` | React | Not used by any page right now. Kept from the June hero |

The three `art/` diagrams render on a home page card only when that card has no
`image`. Every card has an image today, so they are fallbacks.

`PayPalHero` draws three rings of merchant logos orbiting the PayPal mark. The
rings, radii, speeds, and merchants are a data array at the top of the file.

## Middleware

`src/middleware.ts` decides who sees the site without a password:

1. Local dev: always open.
2. Host is `stevendesignco.com` or `www.stevendesignco.com`: open.
3. Any other host: Basic auth against the `SITE_PASSWORD` environment variable.
   Any username works. Only the password is checked.
4. If `SITE_PASSWORD` is not set, the site fails open, so a misconfigured deploy
   cannot lock everyone out.

## SEO files

| File | Notes |
|------|-------|
| `src/pages/sitemap.xml.ts` | A hand kept list of pages with `lastmod` dates. Bump the date when a page changes |
| `public/robots.txt` | Allows everything except `/labs/` |
| `public/llms.txt` | A plain language summary of the site for AI crawlers. Keep it in step with the case studies |
| `public/googled885855d7a595abc.html` | Google Search Console verification. Do not delete |

## What is deliberately not here

- **Tailwind or a CSS framework.** The tokens are custom properties and the site
  is small enough to read top to bottom.
- **A CMS or content collections.** Seven case studies do not need one, and copy
  edits are easier to review as diffs.
- **A client side router or view transitions.** Pages are separate documents.
- **Tests.** Checks are manual and tool assisted. See
  [ACCESSIBILITY.md](ACCESSIBILITY.md) and [CONTRIBUTING.md](../CONTRIBUTING.md).
