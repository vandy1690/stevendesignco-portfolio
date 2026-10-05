# Multi-Point Inspection Report — Steven Design Co design system

_Inspected: 2026-10-05 (second pass, full) · Technician: Claude Opus 5 (1M context), via the ds-inspection kit · Previous inspections: 2026-10-03 (full), 2026-10-05 (partial, stations 1/3/7/9/10)_
_Vehicle profile: `ds-inspection/GARAGE.md` (re-confirmed 2026-10-05)_

All ten stations run fresh against what actually ships: a clean worktree at `origin/dev` (00a3618), with the Q&A suite run against live production rather than a local build.

## The short version

The system is genuinely healthy on the axes it has been measured on, and this pass found that the measuring has been lopsided. Colour is finished: 274 of 274 fills in the Figma library are bound to variables, all 59 variables carry code syntax, and design and code agree exactly on all 14 semantic colour tokens in both modes. Geometry is a third done: 158 of 435 padding, spacing and radius properties are bound. Three inspections called the design library healthy because all three checked colour and none checked geometry until an outside tool, FigmaLint, pointed at it.

Nothing is broken. All seven accessibility and layout checks pass against production, adoption is complete everywhere components exist, and the token lists agree name for name and value for value.

Two things are worth acting on before anything else. The agent layer, `CLAUDE.md` and `claude-context/`, is gitignored and exists on exactly one disk with no backup, and it is the first thing any future session reads. And there is still no documentation page for `Site.astro`, the one file every page must use correctly, which is why an agent given only the docs still needs 19 guesses to build a page and still produces one linked from nothing.

A live 404 sits in the published documentation right now, introduced by Sunday's remediation and fixed in a pull request that cannot merge.

**Overall: 72/100** — a conversation starter, not a grade. Fix the reds, schedule the yellows, re-run on a cadence.

## Inspection sheet

|  # | Station                         | Quality      | Light |      Score |         2026-10-03 |
|---:|:--------------------------------|:-------------|:-----:|-----------:|-------------------:|
|  1 | Coverage & gaps                 | Complete     |  🟡   |       7/10 |               7/10 |
|  2 | Best practices                  | Sound        |  🟡   |       7/10 |               8/10 |
|  3 | Accessibility                   | Sound        |  🟢   |       9/10 |               9/10 |
|  4 | Shared language                 | Sound        |  🟡   |       6/10 |               6/10 |
|  5 | Testing & validation            | Sound        |  🟡   |       7/10 |               7/10 |
|  6 | Orchestration                   | Synchronized |  🟡   |       7/10 |               7/10 |
|  7 | Governance & version control    | Extensible   |  🟡   |       7/10 |               6/10 |
|  8 | Feedback & adoption             | Extensible   |  🟡   |       7/10 |               7/10 |
|  9 | Machine-readable docs & context | AI-Ready     |  🟡   |       7/10 |               7/10 |
| 10 | Agent access                    | AI-Ready     |  🟢   |       8/10 |               7/10 |
|    | **Overall**                     |              |       | **72/100** |         **71/100** |

**Lights:** 🟢 2 green · 🟡 8 yellow · 🔴 0 red · 0 not inspected

**Key:** 🔴 Red (0–3) — broken or missing; the light is ON · 🟡 Yellow (4–7) — drift or gaps; schedule a fix · 🟢 Green (8–10) — healthy, no action needed

Net movement over three days: Station 7 up one on the changelog, Station 10 up one on the agent context file, Station 2 down one on the geometry binding FigmaLint surfaced. Everything else held. A one-point net gain across a week of remediation is the honest number, and it is what happens when the fixes land on truthfulness rather than on coverage.

## Evidence basis

- Access used this pass: design library `live` via the Figma plugin bridge, sweeping all 5 pages and 421 nodes, read and written. Code `live` from a clean worktree at `origin/dev`, so the parallel session's 11 uncommitted files could not contaminate any count. Docs `live` in source and `live` as published, checked by HTTP. Process `live` via the GitHub API. The Q&A suite run against **live production**.
- Findings tagged `[verified]`: 65 · `[reported]`: 0
- No design-systems knowledge MCP connected; benchmarking is from the technician's own knowledge and labelled as such.
- **Technician conflict of interest.** I built the system, performed two rounds of remediation on it, and am now inspecting all three. Over the three passes this has produced four corrections to my own earlier findings, every one of them in a flattering direction: two Station 1 counts measured on one file and written as though they covered `src/`, a Station 2 claim about variable binding that only ever covered colour, and a 404 and two stale tables shipped during remediation. The pattern is consistent enough to name: **I measure the dimension that is working and write the claim as though it covered all of them.** Treat any favourable finding in these reports as narrower than it reads until a second method confirms it. FigmaLint was that second method this week and it immediately found what I had missed.

## Station records

### Station 1 — Coverage & gaps: YELLOW (7/10)
- Swept: all 14 code components, all 18 docs pages, all 12 Figma components, all 59 variables across 6 collections, every style, every hex literal and every `box-shadow` in `src/`. Clean worktree at `origin/dev` (00a3618).
- Evidence level: design `live` · code `live` · docs `live`
- Findings:
  - [verified] Token family coverage is complete and well formed: 6 collections (Primitives 14, Colour 14, Spacing 11, Radius 2, Layout 2, Type scale 16), **59 of 59 carry WEB code syntax, 0 are ALL_SCOPES**. Colour, spacing, radius, layout and type all exist on both sides.
  - [verified] **Every solid fill in the library is bound to a variable: 274 of 274.** Colour is the one dimension of this system that is finished.
  - [verified] The three legs still do not line up: 12 Figma components, 14 code components, 18 docs pages. Five documented patterns are CSS-only in code and absent from Figma entirely (case study card, dialog, navigation, progress dots, row list). Three Figma components have no code counterpart (Site header, Case card, Site footer).
  - [verified] **Elevation has code and no design.** Two tokens in `Site.astro`, **zero effect styles** in the library, and Figma cannot express a four-stop shadow as a variable. Five literal `box-shadow` declarations remain, two using `--accent-glow` and three with raw colour, one of them `rgba(15, 23, 42, …)`, a slate in no palette.
  - [verified] 15 hex literals sit in component and page code outside the token tier. Four are hex values quoted as prose in the Artistic Eye case study, correctly literal. The rest are two `#ffffff` in the animated components and four card grounds in `index.astro`, where `#F0EEE9` duplicates `--paper-cloud` and `#EEEAE7` and `#F2F1EC` are two further near-identical off-whites in no palette.
  - [verified] **New this pass: three components carry props and have no props table.** `Pager` (4 props), `PagerPair` (2) and `CaseMeta` (1). Pager's page explains its accessibility reasoning in prose, which a generation test called the best writing in the set, and never tabulates its API. `Note` and `Quote` have no table and no props, which is correct.
- Not inspected: the five labs under `/labs`, out of scope per GARAGE.md
- Deviations noted: the home page's 11 one-off `clamp()` sizes; `--text-block-lede` sharing endpoints with `--text-heading`; brand logo hex and hex quoted as prose
- First move: two Figma effect styles for the shadow pair, then props tables for the three components missing them.

### Station 2 — Best practices: YELLOW (7/10)
- Sampled: all 12 Figma components, all 14 code components, all 18 docs pages, binding rates across every node on all 5 Figma pages
- Evidence level: design `live` · code `live` · docs `live`
- Findings:
  - [verified] Design craft is strong where it has been measured before: 12 of 12 components carry a real description, 157 to 463 characters, each explaining why the component is shaped the way it is rather than what it looks like.
  - [verified] **Binding splits hard by dimension, and this is the finding of the pass.** Colour: 274 of 274, 100%. Geometry (padding, item spacing, radius): **158 of 435, 36%**. A library that is perfect on one axis and a third of the way on the other, which is why two earlier inspections called it healthy: both measured only colour.
  - [verified] Code craft holds up. Zero magic numbers left in `src/components/ui/`, every size a token. APIs right-sized, largest 7 props, most 3 or 4. Semantic markup 13 elements against 7 `<div>`s.
  - [verified] **Zero logical CSS properties anywhere in `src/`**, against 1 physical in the component library and 18 in the layout. The components are nearly clean and the RTL exposure sits in the layout and the pages. `<html>` has `lang` and no `dir`.
  - [verified] Docs follow one shape where it counts: 18 of 18 pages carry "Checks before you ship". "In code" appears on 12 of 18, exactly the 12 that have a component file. Props tables on 8 of 18.
- Not inspected: layer-by-layer naming below component level, sampled at 32 of 34 meaningful on 2026-10-03
- Deviations noted: `Button` renders an `<a>` and has no `<button>` variant, documented in the component
- First move: bind the documentation furniture on the Cover and Foundations pages, which needs no decision, then settle the padding scale question that blocks the components.

### Station 3 — Accessibility: GREEN (9/10)
- Sampled: all seven checks run against **live production**; all 14 semantic colour tokens computed from both sources in both modes; the dialog's keyboard contract; all 12 Figma component descriptions
- Evidence level: production `live` · code `live` · design `live`
- Findings:
  - [verified] All seven pass against `https://stevendesignco.com`: reflow and target size at 11 pages by 11 widths, axe-core over 11 pages and 5 dialogs, the dialog keyboard contract, text spacing, forced colors, inline link distinction, and contrast across both themes.
  - [verified] **Design and code agree on colour exactly, 14 of 14 semantic tokens, both modes, after resolving the CSS aliases** — including every alpha. The one divergence that existed this morning, `ink/charcoal-mute` at `#5a6160` against the code's `#545B5A`, was introduced by Sunday's remediation and corrected during the 2026-10-05 pass.
  - [verified] Every painted pair clears WCAG 1.4.3 in both themes, and the pair that was latently failing now clears: `text-mute` on `surface-2` in Light moved from 4.29:1 to 4.70:1.
  - [verified] The dialog remains the most carefully built thing here: `role`, `aria-modal`, an `aria-label` rewritten from the loaded `<h1>`, ancestor-by-ancestor `inert`, a Tab trap, Escape, focus restored to the triggering card, and input-modality tracking so a mouse close leaves no ring.
  - [verified] **The design side is still the weak leg, and an independent tool now says so too.** No annotation kit, no page for focus order or keyboard behaviour, and 3 of 12 component descriptions mention accessibility. FigmaLint's accessibility panel passes touch target size and minimum font size and flags **focus state**. Two methods, one conclusion.
- Not inspected: screen-reader behaviour by hand; the documented VoiceOver plan exists and was not run
- Deviations noted: `--rule` deliberately under 3:1 for decorative hairlines, with `--rule-strong` carried for real boundaries
- First move: a focus variant or annotation layer on Button and Pager, and the keyboard notes from the component docs copied into the Figma descriptions.

### Station 4 — Shared language: YELLOW (6/10)
- Swept: every prop on all 14 components, all 68 custom properties, all 59 variable names, all 18 docs titles
- Evidence level: design `live` · code `live` · docs `live`
- Findings:
  - [verified] The shared vocabulary is deliberate and consistent where it repeats: the collection prop is always `items` (3 components), the pass-through always `class` (3), the link always `href` (2), and `lede` and `eyebrow` mean the same thing in both components that take them. No `size` versus `scale` versus `sz` problem anywhere.
  - [verified] **Only 5 of 13 concepts carry the same name in all three assets.** Figma "Meta pair" is code `CaseMeta` is docs "Meta row". Figma "Award row" is `AwardList` is "Award list". Figma "Stat" is `StatList`. Figma "Quote" is docs "Recommendation quote". Figma "Case block" is docs "Case study block". Two systematic causes: the collection suffix (row / pair / List) and the prefix (Case / Case study).
  - [verified] `--text` is a colour and `--text-body` is a font size. Two of the fifteen tokens in that namespace are colours; the other thirteen are sizes. Figma escapes it because its collections disambiguate; CSS has no collections.
  - [verified] Four prop names mislead. `hidden` on Pager is screen-reader text and collides with the HTML global attribute. `alt` is image alt text on `CaseFigure` and a darker background on `CaseSection`, two meanings and two types in sibling files. `light` on `CaseFigure` reads boolean and is a second image source. `three` on `StatList` is a column count that can only say three.
  - [verified] **No naming convention is written down anywhere.** Zero files in `docs/`, the docs site or `CONTRIBUTING.md` mention one, and there is no validator. Consistency runs on one person's memory, which is how the three-way drift accumulated unnoticed.
- Not inspected: Figma layer names below component level
- First move: pick one vocabulary, rename across all three assets in a single pass starting with the `--text-*` collision, then write the algorithm into `docs/DESIGN-SYSTEM.md`. Nothing outside this repo consumes these names, so it is the cheapest it will ever be.

### Station 5 — Testing & validation: YELLOW (7/10)
- Inspected: the workflow, all 8 checks in `qa/`, `check-docs-in-step.mjs`, package scripts, and the design-side tooling now in use
- Evidence level: code `live` · CI `live` · production run `live`
- Findings:
  - [verified] CI runs on every push to `dev` and every pull request: build, seven semantic checks, the docs build, and a documentation drift gate. The workflow header records the three regressions that caused it to exist.
  - [verified] The checks assert behaviour, not rendering. The dialog check alone makes ten distinct keyboard and focus assertions, including that focus returns to the exact card that opened it and that `inert` is cleaned up afterwards.
  - [verified] `check:docs` blocks a change to `src/components/` or `Site.astro` that does not touch documentation. It verifies that documentation was *touched*, not that it was made *true*: four stale statements shipped through it this week.
  - [verified] **Design-side validation now exists, and it earned its place immediately.** FigmaLint was run against the library on 2026-10-05 and found the dimensional binding gap that two prior inspections missed entirely. It also produced one false positive, a frame named "Button" read as a detached instance. Run it and verify what it flags.
  - [verified] No unit or component tests anywhere. For 14 presentational Astro components that emit markup and hold no logic, end to end is the honest level, so this is not scored as missing coverage. The consequence is different: coverage follows the 11-page list, not the component inventory.
  - [verified] Visual regression exists, is the sharpest check, and does not run in CI. It is gated behind `--pixel`, reports rather than fails, and compares against live production rather than a committed baseline, which makes it unstable: two identical runs on 2026-10-05 reported 2104 and then 34439 differing pixels on the same page.
  - [verified] **Still no evals, rubric or judge for AI-assisted output**, in a system built almost entirely with AI assistance. Station 4's three-way naming drift is what that absence looks like after a few weeks.
- Deviations noted: no unit tests; pixel comparison out of CI for a documented technical cause
- First move: run FigmaLint on a cadence rather than ad hoc, and commit a pixel baseline so the check can gate.

### Station 6 — Orchestration: YELLOW (7/10)
- Diffed: all 59 variables against all 68 custom properties on names, values and set membership, with CSS aliases resolved; 6 components traced docs to code; both component sets' variant properties against their code APIs
- Token diff: **59 of 59 names present in the stylesheet. 44 direct value matches; the other 15 are semantic tokens that alias primitives on both sides, and all 14 semantic colour tokens match exactly in both modes once resolved.** Design-only: none. Code-only: `--texture-size`, the two shadow tokens, and five `-rgb` companions that exist so `rgba()` can take an alpha.
- Evidence level: design `live` · code `live` · docs `live`
- Findings:
  - [verified] Token parity is complete on every axis this station asks about, and it is complete **because it was repaired by hand this morning**. It broke within 48 hours of the 2026-10-03 report predicting in writing that it would. There is no pipeline, no token JSON, no export step, and nothing that detects divergence.
  - [verified] **Agreement on values is not the same as use.** The two sides agree on all 11 spacing tokens and both radius tokens, and the Figma library binds only 36% of its geometry to them. The Foundations page demonstrates the spacing scale using 32, 24, 16 and 6 as literals.
  - [verified] Documentation and code agree where a table exists: 5 of 6 sampled components match prop for prop, including `variant` on `Button`, added 2026-10-05. The sixth, `Pager`, has no props table to compare.
  - [verified] Design and code still disagree on Pager's variant vocabulary: Figma `Direction=Previous|Next` against code `dir='prev'|'next'`. Button's mismatch is resolved: the code now has a `variant` prop matching Figma's `Style=Primary|Secondary`.
  - [verified] `State=Default|Hover` on both component sets has no code counterpart, correctly, because CSS `:hover` handles it.
  - [verified] The definition of done covers code and documentation and never mentions the design library. The pull request template does not contain the word Figma.
  - [verified] Code Connect, the mechanism built for exactly this, returns a seat error on Steve's plan. The 59 WEB codeSyntax entries are a partial substitute covering tokens and not components.
- First move: a token parity check in `qa/` covering geometry as well as colour. Both prior passes verified colour only, which is the axis that was already perfect.

### Station 7 — Governance & version control: YELLOW (7/10)
- Inspected: `CONTRIBUTING.md`, the PR template, `CHANGELOG.md` against the git log, live branch protection, all six pull requests, the tracker, the working tree
- Evidence level: repo `live` · GitHub API `live`
- Findings:
  - [verified] The artifacts are real and specific. `CONTRIBUTING.md` runs 108 lines across nine sections. The pull request template carries three habits, each traceable to a regression that happened.
  - [verified] The changelog is current through October 5, closing the 30-commit gap the 2026-10-03 pass found.
  - [verified] Branch protection is armed and correctly shaped: the Q&A check required, strict mode on, force pushes and deletions blocked, admins deliberately not enforced on a one-person repo.
  - [verified] Six pull requests, all through the gate. **PR #6 is currently `OPEN` and `DIRTY`**, meaning it cannot be cleanly merged, so this pass's own fixes for a live 404 and two stale tables are not shipped.
  - [verified] **Three definitions of done, still three.** `CONTRIBUTING.md` lists 10 items, the PR template 7, `claude-context/checklists.md` 5. `CONTRIBUTING.md` still never mentions `npm run qa`.
  - [verified] `public/docs/` is 94 files of committed build output with nothing enforcing that it matches its source. It drifted once already this week and `check:docs` did not catch it.
  - [verified] No issue tracker in use. Nothing can go stale in a backlog that does not exist; the cost is that known gaps live only in prose and in these reports.
  - [verified] The parallel session's work is still uncommitted after three days: 11 modified files and an untracked `vercel.json`, on the branch that deploys to production.
- Deviations noted: no semver, no releases, no tracker, admins not enforced. All correct at one maintainer and one consumer with continuous deployment.
- First move: unblock PR #6, then merge the three checklists into one.

### Station 8 — Feedback & adoption: YELLOW (7/10)
- Measured: every component counted by use across all 11 pages; Figma instance and detach counts; the repo's own record of why each check exists
- Evidence level: code `live` · design `live`
- Findings:
  - [verified] Adoption is complete everywhere coverage exists. 12 of 14 components are used directly; the two that are not, `CaseMeta` and `Pager`, are composed inside `CaseHero` and `PagerPair` with 100% of their use going through them. `CaseSection` 48 uses, `CaseBlock` 45.
  - [verified] 8 of 11 pages import from `ui/`. The three that do not are the home page, the work index and the resume, surfaces the component set has no components for. None carries a `cs-` class, so none is working around the system. That is coverage, not refusal.
  - [verified] Design-side adoption: 34 instances across the library, **zero detached**. FigmaLint reported one detached Button; node 10:24 is a frame holding a text label and a child frame of instances, and eight more beside it are the same labelled documentation cells. Verified and dismissed.
  - [verified] The feedback loop is documented in the code rather than claimed. The workflow header, the three habits in the PR template, the pixel check's own comment and `check-docs-in-step.mjs` each name the incident that produced them.
  - [verified] **A second signal source now exists.** FigmaLint found something no inspection here had, which is the first time this system has been told something by a tool outside its own loop.
  - [verified] Nothing is instrumented. Every adoption number above came from a script written during an inspection and thrown away. No check would report a component falling out of use.
  - [verified] No cadence. Three inspections in three days is a burst, not a rhythm, and nothing schedules a fourth.
- Deviations noted: no support channel, no intake form, no analytics platform. Correct at one consumer and one author.
- First move: commit the usage count as a reported CI number, and put the next inspection on the calendar.

### Station 9 — Machine-readable docs & context: YELLOW (7/10)
- Inventoried: typed interfaces, custom properties, Figma variables and descriptions, all 34 docs pages, `CLAUDE.md`, `claude-context/`, `llms.txt`, and what git tracks · **Generation test:** run 2026-10-05 against this exact commit, by a separate agent restricted to the documentation.
- Evidence level: code `live` · docs `live` and `live published` · design `live` · generation test `live`
- Findings:
  - [verified] The raw material is strong: 11 typed `Props` interfaces, 68 custom properties, 59 variables each carrying WEB code syntax, 12 component descriptions that encode purpose and anti-pattern, and 18 of 18 docs pages with "Checks before you ship".
  - [verified] **The generation test needed 19 distinct guesses** to build a case study page. It reported that the disambiguations added on 2026-10-05 "prevented exactly the three mistakes I would otherwise have made", so fixing a contradiction measurably changes what an agent builds. The count stayed high because the structural gap did not move.
  - [verified] **No page documents `Site.astro`**, the layout every page must use. Its only props table is in `docs/ARCHITECTURE.md` and that table omits `variant`, the prop whose absence renders a page unstyled. There is still no complete page example anywhere, so component nesting, file location, import depth, the pager chain and every image convention were guesses.
  - [verified] A **live 404** sits in the published documentation: `/design-system/components/case-figure/` where the base path is `/docs/`. Introduced by Sunday's remediation, found by this test, and still live because PR #6 is blocked. Nothing checks internal links.
  - [verified] **Both agent-facing files are gitignored.** `CLAUDE.md` is matched by `.gitignore:31` and `claude-context/` is ignored too. Only `public/llms.txt` is tracked, and that is a portfolio surface. The system's entire agent layer exists on one disk, in no repository and no backup.
  - [verified] `public/llms.txt` still says "looking for a Senior or Staff Product Designer seat", below the floor and omitting Creative Director, while `CONTRIBUTING.md` requires that file to be true.
  - [verified] Three components with props have no props table, `Pager` (4 props), `PagerPair` (2) and `CaseMeta` (1), so an agent reading those pages gets prose and no API.
  - [verified] Almost nothing is generated from source. The Storybook stylesheet remains the only generated artifact.
- First move: a `Site.astro` page with `variant` in its table, one complete case study page, and get `CLAUDE.md` and `claude-context/` into a repository.

### Station 10 — Agent access: GREEN (8/10)
- Surfaces mapped: Figma plugin bridge used read and write throughout this pass; `search_design_system`; `CLAUDE.md` routing into 20 context files; the repo as context; FigmaLint · Live test: every design-side finding in this report came through the bridge
- Evidence level: design `live` · query surface `live` · repo `live` · Code Connect unreachable on the plan
- Findings:
  - [verified] The bridge is fully working in both directions: it swept 5 pages and 421 nodes, resolved aliases through both modes, enumerated components, variants, styles and binding rates, and wrote a corrected variable earlier today.
  - [verified] The query surface returns rule-bearing descriptions, not just names. Button's carries "Never two Primaries in one view" and the `external` prop contract; Pager's explains why direction is hidden text rather than an `aria-label`.
  - [verified] `claude-context/design-system.md` now states that the code is the source of truth and carries the real palette, the correct fonts and the current library key. It was four months stale until 2026-10-05, and it is the file `CLAUDE.md` routes to first.
  - [verified] **Three published libraries, nothing marking the canonical one.** A query for "surface" returns `surface` and `surface-2` from "SDC Fall of 2026" alongside `color/surface` from "SDC Design Tokens" at `ALL_SCOPES`.
  - [verified] Code Connect remains gated by the Figma plan, returning a seat error rather than an empty mapping.
  - [verified] FigmaLint adds a second machine-readable surface over the same library and found what the bridge-based inspections did not, because it measures an axis they did not.
  - [verified] The caution this week earned: an agent with write access to both sides changed a token in code, left the design library stale for two days, and no surface reported it.
- First move: rename the two superseded libraries so their titles say so, since the query surface returns library names.

## What changed since last inspection

**Score movement across the three passes (2026-10-03 → 2026-10-05 full):** Station 7 up one, Station 10 up one, Station 2 down one. Seven held. Total 71 → 72.

**Lights:** none turned off, none turned on. Station 10 crossed into green; Station 2 crossed out of it.

**Closed since 2026-10-03:** the stale agent-facing context file, the two stale statements in `docs/DESIGN-SYSTEM.md`, the 30-commit changelog gap, the `StatList` magic number, four documentation self-contradictions, the latent failing contrast pair, and elevation's position outside the token tier.

**Opened or newly measured since 2026-10-03:** geometry binding at 36%, elevation absent from the design side entirely, three prop-bearing components with no props table, `public/docs/` as a silent drift vector, both agent files gitignored, a live 404 in the published docs, and a design-code token divergence that appeared and was repaired inside 48 hours.

**Still open from the first work order:** the three-way naming drift, the three conflicting definitions of done, `llms.txt`, the layout documentation page, the pixel baseline, the three published Figma libraries, and the absence of any eval for AI-assisted output.

## Next service

- Work order: `ds-inspection/work-orders/2026-10-05-full-work-order.md`
- Recommended cadence: deep inspection quarterly, **early January 2027**. Three passes in three days was a burst driven by active remediation and is not a rhythm; the partial pass after a batch of fixes is the pattern worth keeping.
- Everyday checks to wire into CI now, each of which this week found by hand: token parity covering geometry as well as colour, an internal link check on the built documentation, a published-versus-source check on `public/docs/`, and the component usage count.
- Re-inspect by: 2027-01-05
