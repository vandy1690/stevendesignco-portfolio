# Design system

The tokens, type, themes, and shared components of stevendesignco.com. The
source of truth is the global `<style>` block in `src/layouts/Site.astro`. This
page describes it. When the two disagree, the code wins, so fix this page.

To see everything rendered, open the
[SDC Storybook](https://stevendesignco.com/labs/sdc-storybook/). It renders with
the CSS the site ships, so it cannot drift. See
[storybook/README.md](../storybook/README.md).

## Versions

SDC follows semantic versioning, major.minor.patch, two digits each (`02.00.00`). A rename of any token or class is a major version. The number
lives in `src/styles/tokens/sdc-version.json`; the rules and the log are on the
docs site at `/docs/start/releases/`. Bump it in the same pull request as the
change.

## Token names

Every system token starts with `--sdc-`: `--sdc-accent`, `--sdc-space-md`,
`--sdc-shadow-card`. The prefix marks what belongs to the system, so anything
without it is private to one component (`--pp-size` in the PayPal hero,
`--content` on the home page) and must not be used elsewhere. Figma keeps the
plain names; `scripts/build-tokens.mjs` adds the prefix when it generates the
primitives, and the semantic tier is written with it by hand.

## Themes

The site ships in **light**. `<html>` carries `data-theme="light"`, and a toggle
sits at the bottom right of every page: it follows the operating system on a first
visit and remembers a choice once one is made. The dark palette is the `:root`
default in the CSS and applies when `data-theme` is `dark`. The Storybook toolbar
is another way to look at it.

How the CSS resolves a theme:

1. `:root` holds the dark values.
2. `@media (prefers-color-scheme: light)` applies light unless `data-theme="dark"`.
3. `:root[data-theme="light"]` forces light. This is what ships.

When you add a token, add it in all three places, or the themes fall out of step.

## Colour tokens

| Token | Light (shipped) | Dark (alternate) | Use |
|-------|-----------------|------------------|-----|
| `--sdc-bg` | `#F0EEE9` | `#000000` | Page ground |
| `--sdc-surface` | `#E4E1DA` | `#111111` | Cards |
| `--sdc-surface-2` | `#D8D4CB` | `#1A1A1A` | Card hover |
| `--sdc-text` | `#2D3436` | `#FFFFFF` | Headings and body |
| `--sdc-text-mute` | `#5A6160` | `#8A8F8C` | Secondary text. 5.9 to 1 on paper, 5.6 to 1 on black |
| `--sdc-accent` | `#3F5F92` | `#CCFF00` | Links, primary button, selection |
| `--sdc-accent-text` | `#FFFFFF` | `#000000` | Text on the accent |
| `--sdc-accent-hover` | `#3D5C8C` | `#D8FF33` | Accent hover |
| `--sdc-accent-glow` | accent at 22% | accent at 20% | Soft glow |
| `--sdc-rule` | ink at 20% | white at 20% | Dividers |
| `--sdc-rule-soft` | ink at 10% | white at 10% | Quiet dividers |
| `--sdc-rule-strong` | ink at 58% | white at 42% | Control borders. Clears 3 to 1 |
| `--sdc-texture-dot` | ink at 10% | white at 7% | The dot grid page grain |
| `--sdc-header-bg` | paper at 82% | black at 78% | Sticky header, blurred |

The light palette has names in the comments: Cloud Dancer paper, charcoal text,
Regatta blue as the single accent.

The social card generator (`scripts/generate-og.mjs`) keeps its own copy of the
palette and uses `#4A6FA8` for the accent, a lighter blue than the site's
`#3F5F92`. If the cards should match exactly, change it there.

## Layout tokens

| Token | Value | Use |
|-------|-------|-----|
| `--sdc-max` | 1280px | Content width |
| `--sdc-max-narrow` | 800px | Reading width, case study body |
| `--sdc-gutter` | 24px | Side padding |
| `--sdc-nav-h` | 56px | Header height. Also the scroll padding, so anchors clear the sticky header |
| `--sdc-radius` | 18px | Cards |
| `--sdc-radius-sm` | 10px | Buttons and controls |
| `--sdc-texture-size` | 20px | Dot grid pitch |

## Spacing scale

| Token | Value |
|-------|-------|
| `--sdc-space-xs` | 8px |
| `--sdc-space-sm` | 16px |
| `--sdc-space-md` | 24px |
| `--sdc-space-lg` | 32px |
| `--sdc-space-xl` | 48px |
| `--sdc-space-2xl` | 64px |
| `--sdc-space-3xl` | 96px |
| `--sdc-space-4xl` | 128px |
| `--sdc-space-5xl` | 160px |

## Type

| Role | Face | Loaded from |
|------|------|-------------|
| Display | Nickel Gothic Variable | Adobe Fonts kit `uic8bwd`, a `<link>` in `Site.astro` |
| Body | Inter, weights 400 to 900 plus 900 italic | `@fontsource/inter`, bundled |

If the Adobe kit fails to load, display text falls back to Inter.

| Token | Value | Use |
|-------|-------|-----|
| `--sdc-text-display-1` | clamp(48px, 8vw, 96px) | Hero headlines |
| `--sdc-text-display-2` | clamp(32px, 4.8vw, 48px) | Section titles |
| `--sdc-text-heading` | clamp(24px, 3.2vw, 32px) | Case study titles |
| `--sdc-text-deck` | clamp(18px, 1.9vw, 24px) | Taglines and intros |
| `--sdc-text-subheading` | 20px | Section labels |
| `--sdc-text-body` | 16px | Paragraphs, line height 1.6 |
| `--sdc-text-nav` | 15px | Navigation |
| `--sdc-text-body-sm` | 14px | Captions |
| `--sdc-text-label` | 11px | Tags and metadata, uppercase, tracked out |

Rules worth knowing:

- Display text sets `font-variation-settings` with `"slnt" 0` and
  `font-synthesis: none`. Without that, Nickel Gothic rendered as a reverse
  italic on some links and numbers.
- Do not use a tilde in display text. The Nickel Gothic tilde glyph renders as
  a block.
- `text-size-adjust: 100%` is set on `html`. Some phones inflated the hero text
  until it ran off the frame.

## Shared components

All global, in `Site.astro`.

| Class | What it is |
|-------|------------|
| `.sdc-display` | Nickel Gothic, upright, tight line height. Add it to a heading |
| `.sdc-eyebrow` | The small uppercase label above a heading |
| `.sdc-btn`, `.sdc-btn--primary` | Two button weights only. 10px radius. The secondary border uses `--sdc-rule-strong` |
| `.sdc-pager`, `.sdc-pager--prev`, `.sdc-pager__cap` | The solid next and previous button with a chevron end cap |
| `.sdc-cta-row` | The row of links in the hero and contact. Stacks and drops its separators when it wraps |
| `.sdc-flip`, `.sdc-flip__row`, `.sdc-flip__char` | The letter flip on hover for menu and CTA links. Built by script |
| `.sdc-skip-link` | Skip to content. Off screen until focused |
| `.sdc-u-sr-only` | Text for assistive tech only |
| `.sdc-site-header`, `.sdc-nav`, `.sdc-nav-mobile`, `.sdc-nav-toggle` | Header and both navs |
| `.sdc-site-footer` | Footer |
| `<sdc-section tone="alt">`, `<sdc-layout-container width="narrow">` | Page bands and their content width |
| `.sdc-theme-img--light`, `.sdc-theme-img--dark` | Swap an image by theme |
| `[data-animate="fade"]` | Fade in on scroll. Only hidden when `html.js` is present |

The case study pieces (`<sdc-case-hero>`, `.sdc-cs-meta`, `<sdc-case-block>`, `<sdc-case-figure>`,
`<sdc-layout-container layout="prose">`) are styled once in `src/layouts/Site.astro`, scoped under `.sdc-case`.
A page turns them on by passing `variant="case"` to the layout, which puts `.sdc-case`
on `<main>`. They used to be defined per page; they are not any more, so a case
study page carries no CSS of its own. See
[ARCHITECTURE.md](ARCHITECTURE.md#case-study-pages).

## Motion

- Every animation has a `prefers-reduced-motion` rule. Smooth scrolling turns
  off, the letter flips stop, and the home page decks become plain lists.
- The full screen card flip is switched off under reduced motion because it is a
  classic vestibular trigger.
- Lenis runs only on the home page.

## Texture

The page ground is a dot grid: a `radial-gradient` on `body`, one dot per
`--sdc-texture-size`. Turn it up or down with `--sdc-texture-dot`.

## Changing a token

Which token it is decides where you change it. The sixteen colour primitives
are generated; everything else is hand-authored.

**A colour primitive** (`--ink-*`, `--paper-*`, `--brand-*`):

1. Change the value in `src/styles/tokens/primitives.tokens.json`, and in the
   Figma Primitives collection so the two agree.
2. Run `npm run tokens`. That rewrites the block between `TOKENS:START` and
   `TOKENS:END` in `Site.astro`, including the `-rgb` triples, which are derived
   rather than written by hand.
3. **Do not edit that block directly.** The next run overwrites it.
   `npm run tokens:check` fails when the two drift, and it runs in CI.

**Anything else** (the semantic tier, spacing, radius, layout, type scale):

1. Change it in `Site.astro`, in every theme block that defines it. These stay
   hand-authored because they use `rgba()` over the `-rgb` helpers and `clamp()`
   fluid type, neither of which a Figma variable can express.
2. Change the matching Figma variable too. Nothing detects it if you do not.

**Either way:**

3. Check contrast. The Storybook computes ratios live against the current tokens.
4. Run `npm run sync` and rebuild in `storybook/` so the library picks up the change.
5. If it is a brand colour, check `scripts/generate-og.mjs` too.
