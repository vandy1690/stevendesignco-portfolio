# Multi-Point Inspection Report — Steven Design Co design system

_Inspected: 2026-10-05 · Technician: Claude Opus 5 (1M context), via the ds-inspection kit · Previous inspection: 2026-10-03_
_Vehicle profile: `ds-inspection/GARAGE.md` (re-confirmed 2026-10-05)_

**Partial re-inspection.** Stations 1, 3, 7, 9 and 10 only, chosen because those are the ones the 2026-10-03 work order's easy wins touched. Stations 2, 4, 5, 6 and 8 were not inspected this pass and carry their 2026-10-03 scores forward unchanged.

## The short version

The remediation worked where it was aimed and the inspection can prove it: a fresh agent given only the documentation reported that three of the fixes "prevented exactly the three mistakes I would otherwise have made". The changelog is current, the published documentation finally matches its source, the contrast pair that was failing now clears, and elevation sits in the token tier.

Three of the five stations held their score rather than rising, and that is the honest result. The fixes improved the truthfulness of what exists; they did not close the coverage gaps that dominate those stations. There is still no documentation page for `Site.astro`, the one file every page must use correctly, and still no complete page example, so the generation test still cannot build a page without guessing.

The most useful finding is a failure of my own, and Friday's report predicted it in writing. Station 6 said: "Change a value on either side and the other is silently wrong, and nothing in the system would notice." On Sunday I changed a colour in code, left the Figma primitive stale, and nothing noticed for two days. For that window the design library was the side carrying a WCAG failure the code had already fixed. I also shipped a 404 link into the live documentation and left two stale tables in a file I was actively editing. Everything in that paragraph passed a green Q&A run and a merged pull request.

**Overall: 38/50 across the five stations inspected.** With four carried forward unchanged and Station 2 revised down one on later evidence, the system total moves from 71/100 to **71/100** — a conversation starter, not a grade.

## Inspection sheet

|  # | Station                         | Quality      | Light |      Score |         2026-10-03 |
|---:|:--------------------------------|:-------------|:-----:|-----------:|-------------------:|
|  1 | Coverage & gaps                 | Complete     |  🟡   |       7/10 |               7/10 |
|  2 | Best practices                  | Sound        |  🟡   |   7/10 †   |               8/10 |
|  3 | Accessibility                   | Sound        |  🟢   |       9/10 |               9/10 |
|  4 | Shared language                 | Sound        |  🟡   |   6/10 *   |               6/10 |
|  5 | Testing & validation            | Sound        |  🟡   |   7/10 *   |               7/10 |
|  6 | Orchestration                   | Synchronized |  🟡   |   7/10 *   |               7/10 |
|  7 | Governance & version control    | Extensible   |  🟡   |       7/10 |               6/10 |
|  8 | Feedback & adoption             | Extensible   |  🟡   |   7/10 *   |               7/10 |
|  9 | Machine-readable docs & context | AI-Ready     |  🟡   |       7/10 |               7/10 |
| 10 | Agent access                    | AI-Ready     |  🟢   |       8/10 |               7/10 |
|    | **Overall**                     |              |       | **71/100** |         **71/100** |

`*` not inspected this pass; 2026-10-03 score carried forward.
`†` not re-inspected in full, but revised down on new evidence from FigmaLint (see the addendum below).

**Lights:** 🟢 2 green · 🟡 8 yellow · 🔴 0 red · 0 not inspected (5 carried forward)

**Key:** 🔴 Red (0–3) — broken or missing; the light is ON · 🟡 Yellow (4–7) — drift or gaps; schedule a fix · 🟢 Green (8–10) — healthy, no action needed

## Evidence basis

- Access used this pass: design library `live` via the Figma plugin bridge, read **and written** (one variable corrected). Code `live`, read from a clean `git worktree` at `origin/dev` (00a3618) so the parallel session's 11 uncommitted files could not contaminate any count. Docs `live` in source and `live` as published, checked by HTTP. Process `live` via the GitHub API. The Q&A suite run against **live production**, not a CI log and not a local build.
- Findings tagged `[verified]`: 30 · `[reported]`: 0
- No design-systems knowledge MCP connected; benchmarking is from the technician's own knowledge and labelled as such.
- **Technician conflict of interest, now compounded.** I built the system being graded, I performed the remediation being verified, and I am grading my own remediation. Three of this pass's findings are defects I introduced or left half-finished, and I fixed them during the inspection, which means the "after" state differs from the state I measured. Each is named in its station record. A second opinion is worth more here than it was on Friday.

## Station records

### Station 1 — Coverage & gaps: YELLOW (7/10, held from 7)
- Sampled: all 14 code components, all 18 docs component pages, the Figma library's components and effect styles, every hex literal and every `box-shadow` in `src/`, physical versus logical CSS properties at three scopes. Inspected a clean worktree at `origin/dev` (00a3618) so the other session's uncommitted edits could not contaminate the counts.
- Evidence level: code `live` · design `live` · docs `live`
- Findings:
  - [verified] **Fixed since 2026-10-03.** Elevation is in the token tier: `--shadow-card` and `--shadow-card-hover` are defined in `src/layouts/Site.astro` against `--ink-charcoal-rgb`, not on `:root` from inside the home page. `StatList`'s hardcoded `14px` is now `var(--text-body-sm)`, and all three of its font sizes are tokens.
  - [verified] **And elevation is half a fix, not a fix.** The Figma library has **zero effect styles**. Figma cannot express a four-stop shadow as a single variable, so an effect style is the only design-side mechanism, and none exists. Elevation now lives correctly in code and has no representation on the design side at all, which is a different gap from the one reported on Friday rather than a smaller one.
  - [verified] **Correction to my own 2026-10-03 finding, in an unfavourable direction.** I reported "16 hex total" across `src/` and "effectively nothing hardcoded outside the primitive tier". 16 is the count in `src/layouts/Site.astro` alone; `src/` holds 131. Of those, 100 are inside third-party brand logo SVGs and 4 are hex values quoted as prose in the Artistic Eye case study copy, all correctly literal. That leaves **6 real ones**: `#ffffff` twice in the animated components, and `#F0EEE9`, `#EEEAE7`, `#2B2C2B` and `#F2F1EC` as card art grounds in `src/pages/index.astro`. `#F0EEE9` is an exact duplicate of `--paper-cloud` written as a literal, and `#EEEAE7` and `#F2F1EC` are two further near-identical off-whites that are in no palette. Three almost-the-same off-whites loose in page data is how a palette starts to drift.
  - [verified] **Second correction, same direction.** I reported "12 physical properties against 4 logical". That number reproduces at no scope I can find. The real counts: 1 physical property in all of `src/components/ui/`, 18 in `src/layouts/Site.astro`, **60 across `src/`**, against 4 logical. The useful framing is the one I missed: the component library is almost clean, and the RTL exposure is concentrated in the layout and the pages. `<html>` still carries `lang` and no `dir`.
  - [verified] **The dominant gap has not moved at all.** Still 12 Figma components, 14 code components, 18 docs pages. The five documented patterns that are CSS-only in code are still CSS-only and still absent from Figma: case study card, dialog, navigation, progress dots, row list. The three Figma components with no code counterpart are still Site header, Case card and Site footer.
- Not inspected: the five labs under `/labs`, out of scope per GARAGE.md
- Deviations noted: the home page's 11 one-off `clamp()` sizes and `--text-block-lede` sharing endpoints with `--text-heading`, both documented and deliberate. Brand logo hex and quoted hex in case study prose, correctly literal.
- Why the score held: two real fixes landed, and the inspection also found that elevation's design side is empty and that two of my Friday counts were measured narrowly and written broadly. The structural three-leg gap, which is what this station is mostly about, is identical to Friday. Effort moved; system health did not.
- First move: two Figma effect styles named to match the two shadow tokens, then collapse the three off-whites in `index.astro` to one token.

### Station 3 — Accessibility: GREEN (9/10, held from 9)
- Sampled: all seven automated checks run against **live production**, not a CI log and not a local build; all 14 semantic colour tokens recomputed from both the shipped stylesheet and the Figma library; the Figma library's component descriptions and page list
- Evidence level: production `live` · code `live` · design `live`
- Findings:
  - [verified] All seven checks pass against `https://stevendesignco.com`: reflow and target size at 11 pages by 11 widths, axe-core over 11 pages and 5 dialogs, the dialog's ten keyboard and focus assertions, text spacing, forced colors, inline link distinction, and text contrast across both themes. This is the shipped system, not a branch.
  - [verified] **The latent pair Friday flagged is closed.** `text-mute` on `surface-2` in Light computed 4.29:1 and failed; it now computes 4.70:1. `--ink-charcoal-mute` went from `#5A6160` to `#545B5A`, which also lifts the other two light grounds to 5.32:1 and 6.00:1.
  - [verified] **I broke design-code contrast parity for two days and nothing noticed.** The code value changed on 2026-10-05; the Figma primitive stayed `#5a6160`. For that window the design library was the side carrying a WCAG 1.4.3 failure on `surface-2` while the code had fixed it, which is precisely the split this station's procedure tells a technician to look for. Friday's own Station 6 record predicted it in these words: "Change a value on either side and the other is silently wrong, and nothing in the system would notice." It took 48 hours and the person who wrote it.
  - [verified] Corrected during this inspection: `ink/charcoal-mute` is now `#545b5a` in Figma, and the variable carries a description saying it must match `--ink-charcoal-mute` in `src/layouts/Site.astro`. Parity restored, by hand, with still nothing watching it.
  - [verified] The design side is still the weak leg and it is why this is a 9 and not higher. No annotation kit, no page for specifying focus order, keyboard behaviour or alt text, and 9 of 12 component descriptions still say nothing about accessibility. Unchanged since Friday because nothing in the easy-wins batch touched it.
- Not inspected: screen-reader behaviour by hand. The documented VoiceOver plan exists and I did not run it this pass either.
- Deviations noted: `--rule` deliberately under 3:1 for decorative hairlines, with `--rule-strong` carried for anything that must read as a boundary.
- First move: copy the keyboard and focus notes that already exist in the component docs into the matching Figma descriptions.

### Station 7 — Governance & version control: YELLOW (7/10, up from 6)
- Inspected: `CHANGELOG.md` against the git log, the three pre-merge checklists, live branch protection on `dev`, all five pull requests, the working tree
- Evidence level: repo `live` · GitHub API `live`
- Findings:
  - [verified] **The headline gap is closed.** The changelog runs through October 5 and the newest commit on `dev` is October 5. Friday it stopped on September 19 with 30 commits unrecorded, against a `CONTRIBUTING.md` that asks for a line per merge.
  - [verified] Contribution discipline is now five for five. Every change since the gate landed went through a pull request, including both of this week's. Branch protection is still armed and correctly shaped: the Q&A check required, strict mode on, force pushes and deletions blocked.
  - [verified] **Three definitions of done, still three, still agreeing on almost nothing.** `CONTRIBUTING.md` lists 10 items, the pull request template 7, `claude-context/checklists.md` 5. `CONTRIBUTING.md` still does not mention `npm run qa` once, which remains the most load-bearing check in the repo. This was work-order item 5 and was not in the easy-wins batch.
  - [verified] **A new silent-drift vector, found by accident.** `public/docs/` is 94 files of committed build output. Editing the documentation source changes nothing on the live site until someone runs `npm run build:docs` and commits the result, and the live `/docs/components/section/` page was still serving a broken code example after its source had been fixed. `check:docs` does not catch this: it verifies documentation was touched, not that the published output matches its source. Fixed in commit 00a3618; the mechanism that allowed it is untouched.
  - [verified] The parallel editing session's work is still uncommitted after more than two days: 11 modified files plus an untracked `vercel.json`, on the branch that deploys to production. One fewer than Friday. Still not mine to touch.
- Not inspected: whether the pre-gate history ever shipped something the gate would now catch
- Deviations noted: no semver, no releases, no issue tracker, admins not enforced. All correct for one maintainer, one consumer and continuous deployment.
- First move: merge the three checklists into one in `CONTRIBUTING.md` and have the other two point at it. Then make the docs build part of the gate rather than a step someone remembers.

### Station 10 — Agent access: GREEN (8/10, up from 7)
- Surfaces mapped: Figma plugin bridge (read and write, exercised live this pass), `search_design_system` (queried live), `CLAUDE.md` routing into 20 `claude-context/` files, the repo as context, `docs/` and the Storybook · Live test: the bridge was used for every design-side finding here, including a write
- Evidence level: design `live` · query surface `live` · repo `live` · Code Connect still unreachable on the plan
- Findings:
  - [verified] **The named blocker is gone.** Friday's record said the stale `claude-context/design-system.md` "is the reason this station is not an 8". It now opens by stating that the code is the source of truth, names `src/layouts/Site.astro` and `docs/DESIGN-SYSTEM.md` as the authorities, carries the real palette with the accent correction and the reasoning, has the fonts the right way round, and lists the current Figma library with its file key.
  - [verified] That file is gitignored, so the highest-value fix in this system's agent surface exists on one disk and in no backup. Worth knowing rather than fixing blind.
  - [verified] The bridge is fully working in both directions: it read 59 variables, resolved aliases through both modes, enumerated components and effect styles, and wrote a corrected variable value and description this pass.
  - [verified] **Three published libraries, still nothing marking the canonical one.** A query for "surface" still returns `surface` and `surface-2` from "SDC Fall of 2026" alongside `color/surface` from "SDC Design Tokens" at `ALL_SCOPES`. Work-order item 11, not in the easy-wins batch.
  - [verified] Code Connect is still gated by Steve's Figma plan.
  - [verified] The caution this pass earned: an agent with write access to both sides changed a token in code, left the design library stale for two days, and no surface reported it. Good access without drift detection is how a two-sided system gets quietly inconsistent.
- Not inspected: reachability from Cursor, which Steve also uses daily
- Deviations noted: no dedicated design-system MCP, correct at this size. Code Connect absent by plan, not by choice.
- First move: rename the two superseded libraries so their titles say so, since the query surface returns library names.

### Station 9 — Machine-readable docs & context: YELLOW (7/10, held from 7)
- Inventoried: `claude-context/design-system.md`, `CLAUDE.md`, `docs/DESIGN-SYSTEM.md`, `docs/ARCHITECTURE.md`, all 34 docs-site pages, `public/llms.txt`, the published pages at /docs, and which agent-facing files git actually tracks · **Generation test: re-run.** A fresh agent, restricted to the documentation and barred from `src/`, built a case study page for a fictional client. I graded it and verified each of its claims against source.
- Evidence level: code `live` · docs `live` and `live published` · generation test `live`
- Findings:
  - [verified] **The fixes worked, and the test says so specifically.** The agent reported that three disambiguations added on 2026-10-05 "prevented exactly the three mistakes I would otherwise have made": that the meta row is `CaseMeta` and not `StatList`, that `Quote.astro` is the case study pull quote and not the home page fan card, and that `CaseHero` and `CaseBlock` render `CaseMeta` and `Eyebrow` themselves. Those were three of Friday's four documented contradictions. Fixing a contradiction has a measurable effect on what an agent builds.
  - [verified] The published pages now match their source, checked live rather than locally: `/docs/components/section/`, `/quote/` and `/button/` all serve the corrected content.
  - [verified] **And the test still needed 19 distinct guesses, against 14 on Friday.** The two numbers are not comparable and I will not present them as a regression: different fictional subject, different agent, and this run was given `docs/ARCHITECTURE.md` as a source, which Friday's was not. Giving it another document gave it more to find wrong. What is comparable is that the dominant gap has not moved.
  - [verified] **The layout is still undocumented, and it is still the largest single gap.** No page among the 34 covers `Site.astro`. Its only props table anywhere is in `docs/ARCHITECTURE.md`, and until this pass that table listed `title`, `description` and `image` and **omitted `variant`**, the one prop a case study page cannot ship without and whose absence makes a page render unstyled. Work-order item 7 remains open: there is still no complete page example anywhere, so how `Quote` and `StatList` nest relative to `CaseBlock` was a guess, as were the file location, the import depth, the pager chain and every image convention.
  - [verified] **Three defects in my own 2026-10-05 remediation, found by this test and fixed during this pass.** First, the alt-text fix I wrote on Friday linked to `/design-system/components/case-figure/`, which returns 404; the correct base path is `/docs/`. It shipped through a green Q&A run and a merged pull request, because nothing checks internal links in the documentation. Second and third, I edited `docs/ARCHITECTURE.md` to correct its CSS-location claim and left both of its tables describing the pre-October system: the layout props table missing `variant`, and the Components table carrying the three `art/` diagrams and the React island with **no row for any of the 14 `components/ui/` components**. I fixed the sentence I was pointed at and not the document.
  - [verified] **Both agent-facing files are gitignored.** Not just `claude-context/design-system.md`: `CLAUDE.md` is matched by `.gitignore:31` and is untracked too. The generation test confirmed it from the other side, reporting that `CLAUDE.md` did not exist in the worktree. GARAGE.md's asset list says "`CLAUDE.md` agent rules in repo", which is wrong. The entire agent context layer for this system, the rules file and its routing destinations, exists on one disk, in no repository and in no backup. Only `public/llms.txt`, which is a portfolio surface and not a system surface, is tracked.
  - [verified] `public/llms.txt` is unchanged and still says "looking for a Senior or Staff Product Designer seat", below the floor and omitting Creative Director, while `CONTRIBUTING.md` carries a checklist item requiring that file to be true. Held deliberately: it is published copy and the wording is Steve's.
  - [verified] Four further documentation defects found this pass and left open, because each needs a judgement call rather than a correction. `section.mdx` says a figure sits "at full width of the measure" while its own `figure` prop is documented as "a full bleed figure band" and its example pairs `figure` with `inner={false}`, meaning no measure. Two inner-class vocabularies coexist (`.section__inner`, `.section__inner--narrow`, `cs-body`) with no documented way to pass the narrow one through `CaseSection`. `docs/DESIGN-SYSTEM.md`'s list of case study classes names five and omits `cs-quote`, `cs-back`, `cs-artifacts`, `cs-note` and `cs-figure__cap`, all of which are real in `src/layouts/Site.astro`. And `StatList` is absent from the canonical page order the pattern page calls "the argument".
  - [verified] Still almost nothing is generated from source. The Storybook stylesheet remains the only generated artifact.
- Not inspected: the token documentation went untested again, because the docs correctly tell a case study page to carry no CSS of its own, so the generation test never had cause to reach for a token
- Deviations noted: no token JSON, correct at one consumer. `llms.txt` serving the portfolio rather than the system, which is its purpose.
- Why the score held: the truthfulness of what exists improved and the test measured it. The coverage gap that dominates this station, a documented layout and one worked example, is exactly where Friday left it, and my own remediation added a 404 and half-fixed a document. Quality up, coverage flat, score flat.
- First move: still work-order item 7. One page documenting `Site.astro` with `variant` in the table, and one complete case study page from frontmatter to closing tag. Then get `CLAUDE.md` and `claude-context/` into a repository, private if need be, because losing that disk loses the system's entire agent layer.

## What changed since last inspection

**Score movement:** Station 7 up one (6 to 7), Station 10 up one (7 to 8). Stations 1, 3 and 9 held. Net system total 71 to 72.

**Lights turned off:** none. No station crossed a threshold, though Station 10 crossed into green.

**New lights:** none, but three new defects were found and fixed inside this pass, and four documentation contradictions were found and left open.

**Work order items closed:**
- Item 1, the stale agent-facing `claude-context/design-system.md`. Done.
- Item 2, the two stale statements in `docs/DESIGN-SYSTEM.md`. Done.
- Item 3, the 30-commit changelog gap. Done.
- Item 8, elevation outside the token tier. Code side done; the design side turns out to have no representation at all, so the item is reframed rather than closed.
- Item 14, four of its eight sub-items: the broken example, the `Quote` caption contradiction, the alt-text conflict, and the overloaded word "Stats". The `StatList` magic number is also done.

**Work order items still open:** 4 (`llms.txt`, held for Steve's wording), 5 (three definitions of done), 6 (three-way naming drift), 7 (the layout page and a worked example, now the largest single gap), 9 (`Button` variant shipped, but the two prominent CTAs still bypass the component), 10 (pixel baseline), 11 (three published Figma libraries), 12 (no evals), 13 (accessibility silent in the design file), and the rest of 14.

**New since Friday, not yet in a work order:** `public/docs/` is committed build output that drifts silently from its source and `check:docs` does not catch it. `CLAUDE.md` and `claude-context/` are both gitignored, so the system's whole agent layer is unbacked. The Figma library has zero effect styles. Three near-identical off-whites are loose in `src/pages/index.astro`. Nothing checks internal links in the documentation, which is how a 404 shipped.

## Next service

- Work order: `ds-inspection/work-orders/2026-10-05-work-order.md`
- Recommended cadence unchanged: deep inspection quarterly, so **early January 2027**. The partial pass proved its worth and is cheap; worth repeating after any remediation batch rather than waiting for the quarter.
- Everyday checks worth adding, each of which would have caught something this pass found by hand: a token parity diff between Figma and the stylesheet, an internal link check on the documentation, and a published-versus-source check on `public/docs/`.
- Re-inspect by: 2027-01-05


## Addendum, 2026-10-05: an independent tool checked my homework

Steve ran **FigmaLint** against the library after this report was written. It is the second opinion the evidence basis asked for, and it found something I did not, because I never looked for it.

**It is right about tokens, and my Station 2 finding was scoped too narrowly.** FigmaLint reported token usage at 8 of 28 properties (29%) with 20 hard-coded values, 16 of them spacing and 4 borders. Verified against the file directly:

- **110 of 504** dimensional properties across the library are bound to variables: **21.8%**
- On the **Components** page specifically: **52 of 115**, 45%
- On the **Site** page: **68 of 122**, 56%

My 2026-10-03 Station 2 record said "fills bound to variables, 15 of 16 in the sample". That was true and it was only ever about **colour**. I never checked whether padding, spacing, radius or stroke were bound, and then scored the station green on design craft. This is the third instance of the same methodological flaw the re-inspection already found twice in Station 1: measuring one dimension and writing the claim as though it covered all of them. Station 2 is revised from 8 to 7 on this evidence, with only the binding dimension re-measured.

**Three things temper it, each verified rather than assumed:**

1. **The components are better than 22% suggests.** Every Button and Pager variant has `cornerRadius` **bound** to `radius-sm`, and all eight resolve to 10px, matching the shipped `border-radius: 10px` exactly. Pager's height of 42 and padding of 18 also match the CSS exactly. The design library is faithfully reproducing what ships.
2. **What is unbound is padding, and it is off-scale on both sides.** Button is 14/22 and Pager is 18 in Figma, and `padding: 14px 22px` and `padding: 0 54px 0 18px` in the stylesheet. None of 14, 22 or 18 exists in the spacing scale (8, 16, 24, 32, 48, 64, 96, 128, 160). So this is not design drifting from code; it is a scale that does not contain the values the buttons actually use. Fixing it means either extending the scale or changing how the buttons look, which is a decision and not a cleanup.
3. **Most of the 504 is documentation furniture.** The Cover page, the Foundations swatch grid and the colour chips account for the bulk of the unbound values. They matter least and they drag the headline percentage down hardest.

**It is wrong about the detached instance, and I checked rather than deferring.** FigmaLint reported "Detached instances (1): Button, Component overview". Node 10:24 is a FRAME named "Button" containing a TEXT label and a child frame named "instances". So are the eight beside it: Pager, Eyebrow, Meta pair, Note, Quote, Stat, Award row, Case block. They are labelled display cells on a documentation board, which is correct practice, and the name match is what triggered the flag. My own first sweep used the same crude heuristic and surfaced all nine, which is how I know the shape of the error. FigmaLint shows it as an info icon rather than a failure, so it may intend it as advisory. The 2026-10-03 finding of 23 instances and zero detached on the Site page stands.

**Its accessibility panel agrees with Station 3.** Touch target size and minimum font size pass; **focus state** is flagged. That is the same gap Station 3 scored around: the design file has no annotation kit and no way to specify focus order or keyboard behaviour, and 9 of 12 component descriptions say nothing about accessibility. Two independent methods, one conclusion.

**What this changes in the work order:** a new item 12 for dimensional token binding, and a note on item 1 that a parity check should cover geometry and not only colour, since colour was the only axis either of my passes actually verified.
