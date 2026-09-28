# Changelog

What changed on stevendesignco.com, newest first. Written from the git history.
Dates are commit dates. Because `dev` deploys to production, a commit date is
also the day the change went live, give or take a few minutes.

Add a line here when you ship something a visitor or a future maintainer would
notice.

## September 2026

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
