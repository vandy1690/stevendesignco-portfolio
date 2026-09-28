# Accessibility

What the site does for accessibility, why, and how to check it. The target is
WCAG 2.2 AA.

## Status

- September 2026: an accessScan run against production came back Accessible with
  five failing checks. Three were real and were fixed. Two were decorative
  elements that were correctly hidden, and were left alone. After the fixes, axe
  and HTML_CodeSniffer reported zero issues on every page.
- September 19, 2026: every story in the SDC Storybook passes axe with zero
  violations in both themes.

Automated tools find a minority of real problems. The manual checks below matter
more.

## Structure and navigation

- A skip link is the first focusable element and lands on `<main id="main">`.
- Landmarks: `header`, two labelled `nav` elements (Main and Mobile), `main`,
  `footer`.
- One `h1` per page.
- The header is sticky, so `scroll-padding-top` is set to its height. A focused
  link or an anchor target is never hidden behind it (WCAG 2.4.11).
- The mobile menu button reports `aria-expanded`, changes its label between Open
  menu and Close menu, moves focus into the menu on open and back on close, and
  closes on Escape.

## Links

- A link's accessible name comes from its visible text. No `aria-label` overrides
  what is on screen.
- Links that would be vague on their own get an `aria-describedby` description,
  or hidden text through `.sr-only`. The pager reads "Next case study: Plate"
  while showing only "Plate".
- On a case study card, the headline is the only link. Its `::after` stretches
  over the card, so the whole card is clickable without the whole card being the
  link's name.
- Links that open a new tab are marked with an icon and carry hidden text,
  "(opens in a new tab)".
- The email link decodes at runtime and adds "(opens your email app)" for screen
  readers.

## Colour and contrast

- Body text and muted text clear 4.5 to 1 in both themes. `--text-mute` was
  darkened in light and lightened in dark to get there.
- Control borders use `--rule-strong`, which clears 3 to 1.
- `prefers-contrast: more` collapses muted text into the full ink colour and
  swaps dividers for the strong rule.
- `forced-colors: active` (Windows High Contrast) gets a system colour focus
  ring, and the pieces painted with backgrounds (menu bars, pager, skip link,
  new tab icon) are redrawn with system colours so they do not disappear.

## Focus

- A visible focus ring on everything focusable, shown for keyboard focus only.
- On a card, the ring is drawn around the card, not the headline text.
- The case study dialog tracks whether it was opened by mouse or keyboard, so a
  mouse user does not get a stray ring on the close button.

## The case study dialog

- `role="dialog"`, `aria-modal="true"`, and named after the case study it shows.
- The rest of the page is inert while it is open, and Tab is kept inside.
- Escape closes it. Focus returns to the card that opened it.
- The loaded page's `h1` is demoted so the document keeps one `h1`.
- The URL changes while it is open, so the browser Back button closes it.

## Motion

- Every animation respects `prefers-reduced-motion`.
- Under reduced motion the scroll driven decks become plain lists, smooth
  scrolling turns off, and the full screen card flip is removed. A large 3D flip
  is a known vestibular trigger.
- The progress dots under the decks are `aria-hidden`. The cards are already a
  list, so a second position indicator would be noise.

## Resilience

- The page works without JavaScript. Hidden states are gated on an `html.js`
  class that only exists once the script has run, and the home page has a
  `<noscript>` list of case studies.
- CSS and hero logos are inlined, so a proxy that blocks asset requests still
  gets a styled page.
- The decks fall back to lists on short viewports, where a pinned stage would
  clip the cards.
- `text-size-adjust: 100%` stops phones from inflating text out of the layout.
  Browser zoom and text resizing still work.

## Images

- Informative images have alt text that describes what is shown.
- Decorative images and icons have `alt=""` or `aria-hidden="true"`.
- New images should set `width` and `height`. Not every older image does yet.

## How to test a change

Do these before merging to `dev`.

1. **Keyboard.** Tab through the page from the top. Every control reachable, in
   a sensible order, with a visible ring. Open and close the mobile menu and the
   case study dialog with the keyboard only.
2. **Screen reader.** VoiceOver on a Mac: Command F5. Read the page by headings,
   then by links. Link names should make sense out of context.
3. **Reduced motion.** macOS System Settings, Accessibility, Display, Reduce
   motion. The home page decks should become lists.
4. **Zoom.** 200 percent browser zoom, and a 320 pixel wide viewport. No
   horizontal scroll, nothing clipped.
5. **Automated.** Run axe DevTools or Lighthouse on the page. For shared
   components, open the story in the Storybook and check the Accessibility tab in
   both themes.
6. **High contrast**, if you touched anything painted with a background colour.

## Known limits

- The Pattern Lab and Storybook builds under `/labs/` are archives of older work
  and third party tool interfaces. They are not held to the same bar as the site.
- Recommendation quotes link out to LinkedIn, which needs a LinkedIn sign in.
