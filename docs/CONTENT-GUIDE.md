# Content guide

How to add or change what the site says. There is no CMS. Copy lives in the
`.astro` files, so every content change is a code change and shows up as a diff.

## Writing rules

These apply to every word on the site, in alt text, and in commit messages.

- No em dashes or en dashes. Rewrite the sentence, use a comma, or split it.
- No contractions.
- Plain language. Specific over vague. Real numbers over general claims.
- PayPal is past tense everywhere. The contract ran December 2025 to August 2026.
- Name a merchant only if it is on the confirmed list. Name a person only with
  their say so. Recommendations show titles, never names.
- Every claim on a card or in `llms.txt` has to match the case study it points to.

## Edit a case study

Open the file in `src/pages/work/`. The page shape is:

1. `<Site title description image>`: the head. The title format is
   `Case title · Steven Vanden Heuvel`. The part before ` · ` becomes the
   Article headline in the structured data.
2. `cs-hero`: back link, eyebrow, `h1`, lede, hero image, and the `cs-meta`
   list (Role, Org, Recognition).
3. Bands of `section` and `section--alt`, each with `cs-block` elements. A block
   is an eyebrow, a `cs-block__lede` heading, and paragraphs.
4. The pager pair at the foot.

After a copy change:

- [ ] Bump the page's `lastmod` in `src/pages/sitemap.xml.ts`.
- [ ] If the headline claim changed, update the matching card in
      `src/pages/index.astro`, the entry in `src/pages/work/index.astro`, and
      the line in `public/llms.txt`.
- [ ] If the title changed, update `scripts/generate-og.mjs` and rebuild the cards.

## Add a case study

1. Copy the closest existing page in `src/pages/work/` to a new file. The file
   name is the URL.
2. Put images in `public/images/case-studies/<slug>/`. See
   [Images](#images).
3. Add a social card. See [Social cards](#social-cards).
4. Add the page to:
   - `src/pages/work/index.astro` (`featured` or `more`)
   - `src/pages/sitemap.xml.ts`
   - `public/llms.txt`
   - `src/pages/index.astro` `cases`, only if it earns a place on the home page
   - the `<noscript>` list on the home page, if it went into `cases`
5. Update the pager links on the pages either side of it, so the chain of next
   and previous links stays whole.
6. If the page has styles the Storybook should see, add its path to `PAGES` in
   `storybook/sync-css.mjs`.

## The home page

All the data is at the top of `src/pages/index.astro`.

**Case study cards (`cases`).** Order in the array is order in the deck.

| Field | Purpose |
|-------|---------|
| `href` | Where the card opens. A hash is allowed, as in `/work/paypal#checkout-dead-end` |
| `image` | Full bleed card art. 16 by 9, 1600 by 900 or larger, WebP |
| `contain` | Set `true` for a logo lockup, so it letterboxes and no mark is cropped |
| `anchor` | Gives the card an id the nav can jump to |
| `head`, `text` | Headline and one supporting sentence |
| `product`, `objective` | The two meta lines under the card |

The deck sizes itself from the array length, so adding or removing a card needs
no CSS change.

**Recommendations (`quotes`).** One verbatim sentence per LinkedIn
recommendation. The rules are in the comment above the array: titles only, no
names, no sentence with an em dash, and no claim the site does not make
elsewhere. Every quote links to the LinkedIn recommendations page.

## The resume

`src/pages/resume.astro` is the web resume. `public/resume.pdf` is the download.

The PDF is made from the page. The page has print styles that drop the site
chrome, tighten the type, and show one `print-only` line (the phone number) that
the web page hides. To refresh the PDF:

1. Run the site locally and open `/resume`.
2. Print to PDF from the browser.
3. Save it over `public/resume.pdf`.
4. Bump `/resume` in the sitemap.

Keep the page, the PDF, LinkedIn, and the Figma resume master saying the same
thing. Dates and titles are the usual place they drift.

## Images

- WebP for photos and composites, SVG for logos and diagrams.
- Always set `width` and `height` on `<img>` so the page does not jump while
  loading.
- Write alt text that says what the image shows. Decorative images get `alt=""`.
- Case study hero images are about 2000 pixels wide.
- Home page card art is 16 by 9.
- Paths start at `/images/...`, which maps to `public/images/...`.

One known trap: in `public/images/case-studies/plate/`, use `plate-scene.webp`.
An older PNG with a similar name has made up type in it and should not be
published.

## Social cards

1200 by 630 PNGs, drawn as SVG and rendered with `sharp`.

- `public/og-image.png` is the site default.
- `public/og/<slug>.png` is the card for one page. Pass it to the layout as
  `image="/og/<slug>.png"`.

To add or change a card, edit the `CASES` object in `scripts/generate-og.mjs`
(eyebrow, title, footer), then run:

    node scripts/generate-og.mjs

Commit the PNGs. After it ships, run the URL through the LinkedIn Post Inspector
so LinkedIn drops its cached copy of the old card.

## Icons

`public/favicon.svg` is the source. After changing it:

    node scripts/generate-icons.mjs

That rewrites `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`, and
`favicon.ico`.

## SEO checklist for any content change

- [ ] `title` and `description` on the page still describe it
- [ ] `lastmod` bumped in `src/pages/sitemap.xml.ts`
- [ ] `public/llms.txt` still true
- [ ] Person details in the JSON-LD in `Site.astro` still true (job title,
      awards, description)
- [ ] Social card still matches the title
