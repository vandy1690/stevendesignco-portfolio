# Changelog

What changed on stevendesignco.com, newest first. Written from the git history.
Dates are commit dates. Because `dev` deploys to production, a commit date is
also the day the change went live, give or take a few minutes.

Add a line here when you ship something a visitor or a future maintainer would
notice.

## Unreleased: SDC 02.00.00

On branch `chore/sdc-token-prefix`, not yet on `dev`. The design system's first
major version since numbering began. Every name the system owns gains the `sdc-`
namespace, tokens and classes alike, and the containers render as light-DOM
custom elements (`<sdc-section tone="alt">`, `<sdc-card>`) with attributes for
variants. A written naming convention, a validator in CI, a generated
`custom-elements.json`, a version number in one file and a release log at
/docs/start/releases/. Two new components, Case study card and Text passage,
lifted from markup the home page carried inline. No visual change except a Note
inside a case block now rendering at its documented 14px.

## October 2026

**October 7**
- The MTG description on /design-systems and the home page says one shared
  framework under seven brands, with a separate design system per product,
  as settled on September 2. Four places had said one library.
- Button padding moved onto the spacing scale, 16 by 24 from `--space-sm` and
  `--space-md`, matching the Figma Button. Every button is 2px taller and 4px
  wider.
- The overlay and logo shadows became tokens next to the card shadows, with an
  Elevation page in the docs. Same values as before, except the chip and tile
  shadows now use the site's charcoal instead of a slate left over from an
  imported component.
- A never-say list (`never-say.txt`) and a check that fails CI when a page
  says something the site decided it must not. Its first run found three class
  names rendered with an en dash in the docs and two banned filler words.
- `SITE-CONTEXT.md` at the repo root: where each kind of truth lives, the
  settled content rules, and what has to pass before anything ships.

**October 5**
- Reconciled the documentation with the code after the first design system
  inspection. The agent-facing `claude-context/design-system.md` had the fonts
  inverted, named the dark palette as the locked system, and still described the
  Figma library as missing; `docs/ARCHITECTURE.md` still told you to copy case
  study CSS into every page by hand. Both now match what ships.
- Elevation moved into the token tier. The two card shadows were defined on
  `:root` from inside the home page's own style block.
- `Button` takes a `variant` prop, so primary no longer means remembering a class
  name.
- Muted text in the light theme darkened a step, from `#5A6160` to `#545B5A`, so
  it clears 4.5:1 on every light surface rather than only on the page background.
- Four documentation defects fixed: an example that did not run, a component page
  documenting two different components as one, two pages giving opposite rules on
  image alt text, and the word "Stats" meaning two different things.

**October 2**
- The resume PDF is the real document again rather than a print of the web page,
  and the title line on the resume page broadened.
- Positioning opened up on the home page, the design systems card refreshed, and
  the governance story added to it.

**October 1**
- Case study pages are built from real components now. Fourteen of them live in
  `src/components/ui/`, and the CSS that each page used to carry its own copy of
  is centralized in the layout under `.case`.
- Colour tokens tiered into primitives and semantic values, and the dark theme is
  reachable again: the toggle sits bottom right, follows the operating system on
  a first visit, and remembers a choice once one is made.
- Five type sizes the layout was already shipping became tokens, after binding
  the Figma library showed they matched nothing. Font family variables added.
- The Q&A pass is in the repo: seven checks covering reflow, target size, axe,
  the dialog, text spacing, High Contrast Mode, link distinction and contrast in
  both themes. It runs in CI on every push and every pull request, and `dev` is
  gated behind it. Pull requests get a template.
- Three defects fixed: an image overflowing its frame, touch targets under the
  minimum size, and a prose link that was invisible against its background.
- Case study styles fixed inside the home page dialog, which was showing the right
  content with none of the styling, and in High Contrast Mode.
- Storybook rebuilt against the current stylesheet, shown on the design systems
  card, and linked to the Figma library.
- The Figma library recorded and versioned as 2.0. The previous library stays
  published as 1.0 rather than being retired.

## September 2026

**September 29**
- Documentation drift is a build failure rather than a good intention. A change
  that touches the design system without touching its documentation now fails.
- The documentation linked from the Storybook introduction.

**September 28**
- The design system documentation site, at `/docs`.
- The repo documentation: the README, `docs/`, and the Storybook README.
- Fixed the contrast of a "Do" heading in the documentation.

**September 24**
- The merchant surfaces figure added to the Merchant Flow Builder case study.

**September 23**
- The Artistic Eye brand guidelines and case study published.

**September 19**
- Storybook add-ons for the SDC library: Controls, the theme toolbar, Viewport,
  Measure, Outline, a Docs page per section, an axe Accessibility tab, and an
  HTML tab. A Figma Design tab is wired and stays off until links are added.
- Fixed a low contrast label in the Storybook Colour story, and a script
  collision on the Foundations Docs page.
- Full project documentation: this file, the README, `docs/`, and the Storybook
  README.

**September 14**
- Accessibility fixes after an accessScan run on production: the sticky header
  no longer hides a focused link, links are named from their visible text, and
  vague links have descriptions. axe and HTML_CodeSniffer report zero on every
  page.
- Progress dots under the case study and recommendation decks.

**September 12**
- The home page rebuild for hiring managers went to production.
- The Steven Design Co. Storybook, at `/labs/sdc-storybook/`.
- The case study modal came back, with a scrolling fix.
- Recommendations became a scroll driven fan of cards.
- Design systems joined the case study deck.
- The three drawn card diagrams were replaced with flat editorial art.
- Dot grid page texture.
- Pager buttons at the foot of case studies.
- Case study images moved above the stats.
- The awards got an explanation and About got a headline and a personal closing
  line.
- An accessibility pass, rebuilt social cards, and fallbacks for short and small
  screens.
- An accurate resume PDF.

**September 11**
- Home page rebuilt around what a hiring manager needs to see first.
- The decks run on phones.

## August 2026

**August 27**
- The design systems practice page and the Merchant Flow Builder case study.
- Four libraries published under `/labs/`: the Plate and Alt-Meat Pattern Labs,
  and their Storybook conversions. Unlisted in robots.txt.
- Both Storybooks branded, with interactive controls and fixed asset paths.
- The Plate Pattern Lab cleaned up: branding, a wrong favicon removed, blank
  images filled, a broken logo path fixed, and the semantic colour layer shown.

**August 20**
- PayPal moved to the past tense across the site after the contract ended.
- A post contract resume PDF.

**August 3**
- All stylesheets inlined, because a corporate proxy blocked `/_astro/` assets.
- Hero logos inlined as SVG markup for the same reason, with namespaced ids and
  classes and missing viewBoxes added.
- Planned degradation when JavaScript does not load.

## July 2026

- **July 28 to 31.** The checkout dead end project added to the PayPal case and
  About, with its own anchor and a second tooling card. Light brand social
  cards, `llms.txt`, richer structured data, and sitemap `lastmod` dates.
- **July 8.** Self initiative framing and the settled plugin stat across the
  site. Education added to `/resume`. Tildes removed from display stats, because
  the Nickel Gothic tilde renders as a block.

## June 2026

- **June 26.** Home page and case study refresh: scatter hero, hamburger nav,
  letter flip links, and the new Adobe Fonts kit. SEO groundwork: sitemap,
  robots.txt, JSON-LD, and Search Console verification. Contract framing removed
  from About, the case studies, and the resume. A Nickel Gothic reverse italic
  bug fixed.
- **June 9.** Alt-Meat timing, an OZZIE award correction, and social cards.
- **June 5.** The light theme became the look of the site: warm paper, charcoal
  text, one blue accent. Case studies restructured around four questions and
  rewritten from the final drafts. The `/resume` page. A fix for phones inflating
  the hero text out of frame.
- **June 2.** Light mode added, with a floating toggle and theme aware hero
  images.

## May 2026

- **May 26.** Google Analytics 4, production only.
- **May 21.** The case study marquee replaced by a responsive grid. A real
  favicon and a social card. Alibaba added to the PayPal hero.
- **May 7.** Alt-Meat and Meatingplace case studies updated. Hamburger close
  icon fixed.
- **May 4 to 5.** Launch. The public domain went live and everything else went
  behind a password gate. Email bot protection. Vercel git deploys confirmed.
- **May 3.** First commit: an Astro scaffold with the PayPal case study hero.
