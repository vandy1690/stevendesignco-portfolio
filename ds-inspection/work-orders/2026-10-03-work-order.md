# Work Order — Steven Design Co design system

_From inspection: `reports/2026-10-03-inspection.md` · Written: 2026-10-03_

Reds get fixed now. Yellows get scheduled. Greens get left alone (and celebrated). Every item cites its station and evidence — no vibes-based work items. The team owns prioritization; this is the technician's recommendation.

## 🔴 Fix now (reds)

No station scored red, so there is no fix-now list. Two items below are scheduled as yellows but behave like reds in one specific way: they are wrong rather than missing, and anything that reads them inherits the error. They are items 1 and 2, and they are ordered first for that reason.

## 🟡 Schedule (yellows)

### 1. The design-system file an agent is routed to is four months wrong
- **Station:** 9, Machine-readable docs & context · **Evidence:** [verified] `claude-context/design-system.md` says to confirm tokens "against the Figma library when it is located", names black and `#CCFF00` as the locked system when the site ships light `#F0EEE9` with `#3F5F92` by default, gives "Inter Black Italic for display ... Nickel Gothic Variable for accents" when the shipped tokens are `--font-display: nickel-gothic-variable` and `--font-body: Inter`, and calls the current palette a June 2026 candidate "to test on a branch". `CLAUDE.md` routes here for design-system work and `claude-context/checklists.md` makes it the authority for a website change.
- **Why it's first:** every agent session reads the routing table before it reads the repo. This file hands an agent the wrong palette and inverted fonts with no hedging, which is worse than having no file. It is the most likely single cause of a future session producing off-system work.
- **First move:** delete the stale content and replace the body with a pointer to `docs/DESIGN-SYSTEM.md`, after fixing that file (item 2). One source, cross-linked, rather than two hand-maintained ones.
- **AI assist:** an agent can rewrite the file from the shipped tokens in one pass. A human has to confirm which of the two palettes is actually canonical before it is written down again, because that is a brand decision, not a code fact.
- **Done when:** the fonts, the default theme and the accent in that file match `src/layouts/Site.astro`, and no sentence in it describes the Figma library as missing.
- **Effort:** S

### 2. `docs/DESIGN-SYSTEM.md` contradicts the shipped code in two places
- **Station:** 9 · **Evidence:** [verified] line 131 says the case study classes "are defined per page, not globally" against 62 `.case`-scoped rules now in the global stylesheet; line 15 says "there is no theme switch in the interface today" against 18 theme-toggle references in the layout. Both changes shipped this week, through the `check:docs` gate.
- **First move:** correct both statements · **Done when:** both read true against `src/layouts/Site.astro` · **Effort:** S
- **Suggested timing:** this week, with item 1, since item 1's fix points at this file
- **Note:** this pair is also the proof of what `check:docs` can and cannot do. It verifies that documentation was touched, not that it was made true. Worth knowing before trusting it further.

### 3. The changelog stopped 30 commits ago
- **Station:** 7, Governance & version control · **Evidence:** [verified] `CHANGELOG.md` ends at September 19. Thirty commits have landed on `dev` since, including every piece of design-system work in this report. `CONTRIBUTING.md` requires a changelog line before merging to `dev`; zero of the 30 have one.
- **First move:** write the missing entries from `git log dev --since=2026-09-20` in one sitting · **Done when:** the newest changelog date matches the newest commit on `dev` · **Effort:** M
- **Suggested timing:** this week. It gets harder every day, and it is the artifact a hiring manager or a future maintainer opens first.

### 4. `public/llms.txt` undersells the positioning Steve just changed
- **Station:** 9 · **Evidence:** [verified] it reads "looking for a Senior or Staff Product Designer seat" while the resume page changed this week reads "Staff Product Designer" and the site positioning was deliberately opened to include Creative Director. `CONTRIBUTING.md`'s pre-merge checklist contains "`public/llms.txt` still true".
- **First move:** rewrite that sentence to match the site's current positioning, and re-read the rest of the file against the barred-phrase list while it is open · **Done when:** the closing positioning line agrees with `src/pages/resume.astro` and the home page · **Effort:** S
- **Suggested timing:** this week. This is the file an LLM reads when someone asks about Steve, so it is the one item here with a direct cost outside the repo.

### 5. Three definitions of done, agreeing on nothing
- **Station:** 7 · **Evidence:** [verified] `CONTRIBUTING.md` lists ten pre-merge items, the pull request template lists four plus three habits, and `claude-context/checklists.md` lists five under "Website change". Nineteen distinct requirements and not one appears in all three. `CONTRIBUTING.md` never mentions `npm run qa`; the third list mentions none of the repo's checks.
- **First move:** make `CONTRIBUTING.md` the single list and have the other two point at it · **Done when:** one list exists and the other two reference it rather than restate it · **Effort:** S
- **Suggested timing:** this quarter

### 6. Naming drifts three ways across design, code and docs
- **Station:** 4, Shared language · **Evidence:** [verified] only 5 of 13 traceable concepts carry the same name everywhere. Figma "Meta pair" is code `CaseMeta` is docs "Meta row". Figma "Award row" is code `AwardList`. Two systematic causes: the collection suffix (row / pair / List) and the prefix (Case / Case study). Separately, `--text` is a colour sitting inside a namespace of thirteen font sizes.
- **First move:** pick one target vocabulary and rename across all three assets in one coordinated pass, starting with the `--text-*` collision. Nothing outside this repo consumes these names, so there is no consumer to break and no codemod to generate — this is the cheapest it will ever be.
- **AI assist:** an agent can do the rename across all three assets and run the pixel check to prove nothing moved. A human picks the target vocabulary.
- **Done when:** a concept's name can be guessed in one asset from knowing it in another, and the naming algorithm is written into `docs/DESIGN-SYSTEM.md` · **Effort:** M
- **Suggested timing:** this quarter, before the component set grows

### 7. The missing layout page, and no whole-page example
- **Station:** 9 · **Evidence:** [verified] none of the 33 docs pages documents `Site.astro`. The generation test invented the prop names `title` and `description` (correctly, by luck), guessed the import path and the file location, and produced a page linked from nothing. Six of its fourteen guesses collapse into this one gap.
- **First move:** write a `Site.astro` page with props, slots and `variant` values, plus one complete case study page from frontmatter to closing tag · **Done when:** a re-run of the generation test places the file and uses the layout without guessing · **Effort:** M
- **Suggested timing:** this quarter

### 8. Elevation lives outside the token tier ~~and is untokenized~~
- **Station:** 1, Coverage & gaps · **Evidence:** [verified] **Corrected 2026-10-05.** The original finding said elevation was not tokenized. Wrong: `--shadow-card` and `--shadow-card-hover` exist and are good. They were defined on `:root` from inside `src/pages/index.astro` and hardcoded `rgba(45, 52, 54, ...)` instead of the `--ink-charcoal-rgb` primitive.
- **Status: partly done 2026-10-05.** Both tokens moved into the semantic tier in `src/layouts/Site.astro`, now written against `--ink-charcoal-rgb`. Pixel-identical in both themes.
- **Still open:** three literal `box-shadow` declarations, each needing a judgement call rather than a mechanical fix. `src/layouts/Site.astro:667` (`rgba(0,0,0,0.25)`), `src/pages/index.astro:975` (`rgba(0,0,0,0.45)`), and `src/components/animated/LogoScatter.tsx:101` (`rgba(15,23,42,...)`, a slate in no palette). The documented rule is "if a new element needs a shadow, ask first whether it should be a card", and answering that for each of the three is the work.
- **Effort:** S · **Suggested timing:** this quarter
- **Also open, found 2026-10-05:** the two most prominent calls to action on the site, the resume PDF download and the home page "View case studies", are raw `<a class="btn btn--primary">` anchors and do not use the `Button` component at all. They need `download` and `aria-describedby` passthrough before they can migrate, which is why they were left alone in the easy-wins batch. This belongs with item 9.

### 9. Button's code API cannot express the variant its design counterpart defines
- **Station:** 6, Orchestration · **Evidence:** [verified] the Figma Button is a variant set with `Style=Primary|Secondary`; the code `Button` has no variant prop, and primary is reached by passing the string `btn--primary` through `class`, which the docs describe as being for positioning. Pager has the same shape of problem more mildly: `Direction=Previous|Next` against `dir='prev'|'next'`.
- **First move:** add a real `variant` prop to `Button` · **Done when:** a primary button can be written without knowing a class name · **Effort:** S
- **Suggested timing:** this quarter

### 10. The pixel check, the sharpest regression net, does not run in CI
- **Station:** 5, Testing & validation · **Evidence:** [verified] `qa/checks/pixel.mjs` is gated behind a `--pixel` flag, reports rather than fails, and is excluded from the workflow for a real reason recorded in its header: it needs the production build, which this project cannot preview locally under the Vercel adapter. It is the check that caught a stylesheet reaching three pages nobody was editing.
- **First move:** commit a baseline set of screenshots so the check has something that does not move, then run it in CI against that instead of against live · **Done when:** a visual change fails a pull request without anyone remembering a flag · **Effort:** M
- **Suggested timing:** this quarter

### 11. Three published Figma libraries, no canonical marker
- **Station:** 10, Agent access · **Evidence:** [verified] `search_design_system` answers a query for "surface" with `surface` from "SDC Fall of 2026" and `color/surface` from "SDC Design Tokens" at `ALL_SCOPES`, and answers a component query from "Steven Design Co" as well, whose newest asset is from May 2025 and which carries no descriptions. Nothing in the results says which library the site uses.
- **First move:** rename the two superseded libraries so their titles say so, for example prefixing "1.0 superseded". The query surface returns library names, so that one change makes it answer the question itself · **Done when:** a search result's library name identifies the canonical library · **Effort:** S
- **Suggested timing:** this quarter. Steve's decision to keep 1.0 published stands; this only labels it.

### 12. Nothing evals AI-assisted output, and the naming drift is what that looks like
- **Station:** 5 · **Evidence:** [verified] no rubric, no judge, no eval anywhere in the repo, in a system built almost entirely with AI assistance. The QA suite catches accessibility and layout regressions and nothing checks whether generated work matches the system's own conventions. Station 4's three-way naming drift is that absence showing up as damage.
- **First move:** turn the naming algorithm from item 6 into a checklist a judge can score, and run it on AI-assisted work before it merges · **Done when:** one rubric exists and has been run once in anger · **Effort:** M
- **Suggested timing:** after item 6, since it has nothing to score until the conventions are written down

### 13. Accessibility is silent in the design file
- **Station:** 3, Accessibility · **Evidence:** [verified] no annotation kit and no page for specifying focus order, keyboard behaviour or alt text; the five pages are Cover, Foundations, Components, Site and UX flow. Nine of 12 component descriptions say nothing about accessibility, though the three that do are excellent. Separately, one latent token pair fails: `text-mute` on `surface-2` in Light computes 4.29:1, and `surface-2` is currently used only in a decorative illustration, so nothing ships broken.
- **First move:** copy the keyboard and focus notes that already exist in the component docs into the matching Figma descriptions, and nudge `surface-2` in Light until the pair clears 4.5:1 · **Done when:** every component description names its keyboard or screen-reader behaviour, and no semantic pair in either theme computes under its threshold · **Effort:** S
- **Suggested timing:** this quarter

### 14. Smaller items, batchable in one sitting
- **Station:** 1, 2, 4, 9 · **Evidence:** [verified] each
- `StatList.astro` hardcodes `font-size: 14px` where `--text-body-sm` is the same value (Stations 1 and 2).
- 12 physical CSS properties against 4 logical ones, and `<html>` carries `lang` but no `dir`, so RTL would break (Station 2).
- Four prop names mislead: `hidden` on Pager collides with the HTML global attribute, `alt` means image alt text on CaseFigure and a darker background on CaseSection, `light` on CaseFigure looks boolean and is a second image source, `three` on StatList is a column count that can only say three (Station 4).
- `components/section.mdx`'s code example uses `<CaseBlock>` without importing it, so the snippet does not run (Station 9).
- `components/quote.mdx` requires a caption in three sections and states "No props" in a fourth (Station 9).
- `case-figure.mdx` and `section.mdx` give opposite alt-text rules (Station 9).
- "Stats" means the meta row in the pattern page and `StatList` in the component pages (Station 9).
- **Effort:** S each · **Suggested timing:** one sitting, this quarter

## 🔧 Access upgrades (sharper next inspection)

Evidence access was unusually complete this pass: all four assets were `live` and no finding is `[reported]`. Three things would still sharpen the next one.

- **Connect a design-systems knowledge MCP.** Industry benchmarking this pass came from the technician's own knowledge and is labelled as such. A knowledge server would let comparative claims be cited instead.
- **Code Connect** is the right mechanism for item 9 and returns a seat error on the current Figma plan. Worth knowing the cost before deciding it is not worth buying.
- **Put the throwaway scripts in `qa/`.** The token parity diff and the component usage count were written and discarded during this inspection. As committed scripts they turn two stations from an inspection activity into a continuous one.

## 🟢 Keeping the greens green

- **Station 3, Accessibility (9/10).** The habit that keeps it: the QA suite runs on every push and pull request, and every new check gets proven by breaking it first. That second half is the part that would quietly lapse. The pull request template already asks for it.
- **Station 2, Best practices (8/10).** The habit that keeps it: components get a real description and auto-layout in Figma before they are considered done, and instances never get detached. 23 instances, zero detached, is a number worth checking again rather than assuming.

## Cadence

- Re-inspect (deep, all stations): **2027-01-05**
- Everyday checks to wire into CI now: Stations 3 and 5 are already there. Add the Station 6 token parity diff and the Station 8 usage count, both small scripts this inspection has already written once.
- Owner of this work order: Steven Vanden Heuvel · Review: there is no ritual to triage this at, which is itself the Station 8 finding. The practical substitute is to read it at the start of the next working session on the site and move items 1 through 4 into that session.
