# GARAGE.md — Steven Design Co. Design System 2.0
_Checked in: 2026-10-03 · Re-confirmed 2026-10-05 (PR #5 easy wins) · 2026-10-08 (02.00.00 namespace and custom elements) · **Re-confirmed 2026-10-22** before the partial re-inspection of stations 1, 2, 5, 6, 7, 9 · Re-confirm at next inspection_

## Vehicle
- System: Steven Design Co. design system 2.0, serving stevendesignco.com (one property, 11 routes) plus browsable labs under /labs
- Team: one person, side-of-desk · Consumers: 1 property, 0 other teams
- Age: v2 site live 6 May 2026. Component and token layers rebuilt 1–2 October 2026 against a Brad Frost gap analysis. 02.00.00 reached production 9 October 2026 (tag `sdc-02.00.00`).
- Reason for service: two weeks of change since the 2026-10-08 pass. 02.00.00 shipped; a deck regression shipped and was fixed; a status palette and a theme-default change are sitting unreleased on an open PR. The 2026-10-08 report pre-booked stations 6 and 7 for after 02.00.00 shipped, which it now has.

## Assets
- Design library: Figma, "SDC Fall of 2026" (file key `TJjqs7XSz21Y72GRPnVAQB`), published. 5 pages (Cover, Foundations, Components, Site, UX flow). Last verified counts, 2026-10-08: 12 components, 73 variables, 17 text styles, 6 collections. **Not re-verified 2026-10-22** — see the access map. A separate 1.0 library, "SDC Design Tokens" (April 2026), is still published.
- Code library: Astro 6.2.1 plus one React island, repo `portfolio-astro`, on Vercel. **16 components** in `src/components/ui/`. Containers render as light-DOM custom elements (8 tag names in `custom-elements.json`), no shadow DOM. No package: consumed in-repo only. Tokens are CSS custom properties in `src/layouts/Site.astro`, two tiers, every name `--sdc-*`: **116 unique tokens**, of which **28 are colour primitives** (brand 6, ink 6, paper 4, signal 12) generated from `src/styles/tokens/primitives.tokens.json` by `scripts/build-tokens.mjs`. All five categories are tokenized: colour, type, spacing, radius, elevation.
- Docs: Starlight in `docs-site/`, building into `public/docs`, published at /docs. **39 source pages, 40 built.** Committed build output; verified in step with a fresh build on 2026-10-22 (0 differing files outside Pagefind).
- Process: GitHub (vandy1690/stevendesignco-portfolio). `dev` is production. Branch protection: one required check ("Accessibility, reflow and contrast"), strict, force pushes blocked, admins deliberately not enforced. One PR template. CONTRIBUTING 125 lines, CHANGELOG 192 lines, a release-rules page at /docs/start/releases/. No issue tracker, no support channel (team of one).
- AI surface: **9 Q&A checks** in `qa/`, 8 of them gating in CI (`pixel` is excluded by design because it compares against the live site). `custom-elements.json` generated and gated by `manifest:check`. `check-names.mjs`, `check-claims.mjs` (never-say), `check-docs-in-step.mjs`, `build-tokens.mjs --check` all in CI. `SITE-CONTEXT.md`, `never-say.txt`, `public/llms.txt`, `docs/DESIGN-SYSTEM.md`, `docs/ARCHITECTURE.md` tracked. `CLAUDE.md` and `claude-context/` gitignored by design, so they are **not** part of the context a cloner or an outside agent receives. No Code Connect (no seat).

## Evidence access map
| Asset | Access 2026-10-22 | Verified how |
|---|---|---|
| Design library | **DOWN** — Figma Console MCP Desktop Bridge not connected; official Figma MCP reachable but node-scoped and requires a live selection in the desktop app | Probed both. `figma_get_status` with `probe:true`: server running on 9223, `"No active file connected"`, five other instances on 9224–9228. Official MCP `get_metadata` listed the five pages successfully; `get_variable_defs` returned "You currently have nothing selected." |
| Code library | live — repo open | `src/components/ui/`, `src/layouts/Site.astro`, `src/styles/tokens/`, `qa/` all read directly; counts measured with grep and node, not recalled |
| Docs | live — local source plus a fresh build | `docs-site/src/content/docs/` read directly; `npm run build` in `docs-site` run and diffed against committed `public/docs` |
| Process | live — GitHub API via `gh` | Branch protection, PR list, merge dates, open PR contents all read directly |

**Consequence:** every design-side claim in the 2026-10-22 report is `[reported]`, carried over from 2026-10-08. Opening the Desktop Bridge plugin in Figma, or selecting a layer for the official MCP, would unlock station 6's token diff and station 2's design-craft half.

## Known symptoms
- **Version and changelog are behind the code.** `sdc-version.json` says 02.00.00 released 2026-10-08. Since then: 30 new tokens and a theme-default behaviour change, both of which the project's own rules at /docs/start/releases/ call a minor bump. Changelog's newest dated entry is October 7.
- **The declared source of truth is the one unchecked link.** `primitives.tokens.json` names Figma as canonical and carries the file key in `$extensions`. Nothing reads Figma: no script references it, and the Variables REST API is Enterprise-only on this plan. The second half of the pipeline (JSON to CSS) is generated and CI-gated; the first half is an agent doing it by hand.
- **Hand-written reference docs rot while generated ones stay true.** As of 2026-10-22: `docs/DESIGN-SYSTEM.md:169` says "sixteen colour primitives" (28), `docs/ARCHITECTURE.md:149` says "14 components" (16), `CONTRIBUTING.md:70` says "seven-check Q&A" (9, 8 gating).
- **Three places describe theme behaviour and one is right.** The 2026-10-22 change stopped consulting `prefers-color-scheme`. `foundations/colour.mdx:151` documents it well, with reasoning. `docs/DESIGN-SYSTEM.md:31` and `start/page-shell.mdx:27` still say the site follows the operating system on a first visit.
- **The status palette has no consumer.** 30 tokens defined, swatched in the Storybook and documented on the colour page. Zero uses in `src/` outside their own definitions, and no component to put them on: there is no input, select, checkbox, form, validation, badge or alert in the library, and no `<form>` anywhere on the site.
- **No visual regression baseline.** `qa/checks/pixel.mjs` compares a dev server against the live production site, so it cannot catch a regression that has already shipped, and it goes green once the bad version is live.
- **No behaviour tests and no evals.** The 9 checks are deterministic accessibility and layout. Nothing asserts a component's keyboard interaction or state changes; nothing evaluates AI-produced work, in a workflow where AI writes most of the code.
- `storybook/src/sdc.css` is generated from the running site only when someone builds. It carried the broken 02.00.00 rule for five days after production was fixed. Found 2026-10-13, corrected on PR #21.
- Two Figma libraries published (1.0 and 2.0) with only documentation saying which is current.
- Five components documented and real in Figma are CSS-only in code: dialog, navigation, progress dots, row list, and (resolved) the case study card.
- RESOLVED since 2026-10-08: `public/docs` drift (verified in step today); the `node_modules` symlink committed to `dev` (removed on PR #21); the resume PDF master.

## Probable greens
- Accessibility and layout: 8 checks gating in CI, both themes, 11 pages × 11 widths, real browser
- Token tiering and the code half of the pipeline: two tiers, all five categories, drift detection proven to fail when it should (`tokens:check` exit 1 on a perturbed value, 0 when restored, tested 2026-10-22)
- Component craft: 0 raw hex and 2 raw px across all 16 components; every component root a semantic or custom element, no div soup
- Documentation volume and structure: 39 pages, build gated in CI

## Intentional deviations
- The home page keeps 11 one-off `clamp()` type sizes as per-page art direction. Documented in `foundations/type`. Rule: two pages use a size, it becomes a token.
- `--text-block-lede` shares endpoints with `--text-heading` but climbs differently. Documented on the variable.
- Branch protection does not enforce for admins: a one-person repo where lockout is its own risk.
- The 1.0 Figma library stays published so anything pointing at it keeps working.
- No npm package. The system is consumed in-repo by one property.
- `pixel` is deliberately outside CI because it compares against production.
- `CLAUDE.md` and `claude-context/` gitignored because they hold private material.

## Scope & frame
- Stations 2026-10-03: all 10. 2026-10-05: 1, 3, 7, 9, 10. 2026-10-08: all 10. **2026-10-22: 1, 2, 5, 6, 7, 9**, chosen as the pair the last report pre-booked (6, 7) plus the four the status palette, the token pipeline and the drift findings touch.
- Scoring frame: **solo / side-of-desk**. A green means "healthy for a system with one maintainer and one consumer", not platform-org maturity.
- Out of scope: the labs under /labs, the resume build pipeline, stations 3, 4, 8 and 10 this run.
- **Technician conflict of interest:** the inspecting agent built most of the code library, token tiers, CI and Figma library being graded, and wrote two of the five commits on the open PR it is now grading. Steve chose "counts over judgements" for this run: prefer measured numbers to opinion, state the sample on every claim, flag self-marked findings inline.
- **Known failure mode of this inspector, now logged five times:** on 2026-10-22 a fourth variant appeared and Steve caught it, not the inspector. The first draft of that report scored six stations down eleven points by treating defects it had just found for the first time as though they had just appeared; four of the six had not changed at all since 2026-10-08, two of them verified unchanged against the release commit. Corrected to four points across two stations. **Before scoring any station down, check the finding against git history and establish whether it is new.** The older variant: measuring one file or one spelling and writing the claim as though it covered everything. 2026-10-05 caught two such counts. On 2026-10-22 it happened twice more within the run and was caught before reporting: a search for `--sdc-status*` concluded the palette did not exist when it ships as `--sdc-error`/`--sdc-warning`/`--sdc-success`, and a staples check searched only `Site.astro` and missed 30 lines of dialog CSS in the page file. Both were re-measured across `src/` before scoring. Treat any count in these reports that does not name its scope as narrower than it reads.
