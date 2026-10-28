# Design system inspection: Steven Design Co. 2.0
_Inspected: 2026-10-28 · Technician: Claude Opus 5.5 (Claude Code) · Mode 3, re-inspection of the six yellow stations (2, 4, 5, 6, 9, 10) · Previous: 2026-10-26 full pass (70/100)_
_Vehicle profile: `ds-inspection/GARAGE.md` (re-confirmed 2026-10-28)_

Work order: [`ds-inspection/work-orders/2026-10-28-work-order.md`](../work-orders/2026-10-28-work-order.md)

---

## The short version

Two days since the last pass. One PR reached production: #24, the SDS product theme and its docs page. One theme branch is unmerged (`docs/sds-theme`, Marble to Chalk). **No component, test, script or CI code changed.**

**The Figma half of the 10-26 work order got done, and the repo half did not move.** Elevation now has six effect styles whose values match the code exactly, all 18 component descriptions carry an accessibility section and a code pointer, and the unbound radii and generic layer names are gone but one. That closes three of twelve items. None of the nine repo-side items moved.

**Wider measurement found the documentation problem is twice the size reported.** Twelve surfaces contradict the code, not six. Seven were found today; six of those date from 28 September to 26 October and were missed by earlier passes, and one is new since 10-26.

**The live agent test shows what that costs.** Building a preferences form from the docs alone, the agent wrote `<FormStatus tone="success">`, a value the component does not accept, because the docs never list FormStatus's values and show `success` for the summary beside it. Nothing in CI type-checks props, so it would ship silently with no tint.

**Next:** correct the docs that break code when copied (an afternoon), then turn on `astro check` in CI so the next one fails the build.

**Overall: 37/60 across the six stations re-inspected** (38/60 for the same six on 10-26). No /100 this run, because four stations were not re-inspected. The one point down is all station 4, and it comes from wider measurement: nothing in that station changed in the code since 10-26.

---

## Inspection sheet

- **1 · Coverage & gaps** · Complete · 🟢 8/10 · held from 10-26, not re-inspected
- **2 · Best practices** · Sound · 🟡 **7/10** · held
- **3 · Accessibility** · Sound · 🟢 8/10 · held from 10-26, not re-inspected
- **4 · Shared language** · Sound · 🟡 **5/10** · down 1, wider measurement
- **5 · Testing & validation** · Sound · 🟡 **7/10** · held
- **6 · Orchestration** · Synchronized · 🟡 **6/10** · held
- **7 · Governance & version control** · Extensible · 🟢 8/10 · held from 10-26, not re-inspected
- **8 · Feedback & adoption** · Extensible · 🟢 8/10 · held from 10-26, not re-inspected
- **9 · Machine-readable docs & context** · AI-Ready · 🟡 **5/10** · held
- **10 · Agent access** · AI-Ready · 🟡 **7/10** · held

**This pass:** 🟡 6 yellow · 🔴 0 red · 4 not re-inspected · **37/60**

**A conversation starter, not a grade.** Fix the reds (none), schedule the yellows, re-run on a cadence.

**Key:** 🔴 Red (0 to 3): broken or missing, the light is on · 🟡 Yellow (4 to 7): drift or gaps, schedule a fix · 🟢 Green (8 to 10): healthy

---

## Evidence basis

- **Design library:** live. Figma Console MCP Desktop Bridge, probe 4 ms, file "SDC Fall of 2026" (`TJjqs7XSz21Y72GRPnVAQB`). Whole-file sweeps with `figma_execute`: 18 components, 57 component frames, 67 text layers, 104 variables in 6 collections with every mode, 6 effect styles and every node using them, all component property definitions.
- **Code library:** live. Production is `origin/dev` at `b3568ca`. The branch `docs/sds-theme` at `1406698` (four commits ahead, the Marble to Chalk change) is measured separately and labeled.
- **Docs:** live. All 46 docs pages as source, plus `DESIGN-SYSTEM.md`, `ARCHITECTURE.md`, `llms.txt`.
- **CI:** the workflow file, `qa/run.mjs`, `qa/config.mjs`, `package.json`, `tsconfig.json` read. GitHub run history not checked this pass.
- **Third consumer:** Designer Job Search at `~/Documents/claude/LLC/LLC/site-analytics`, read and measured.
- **Live agent test:** run. One subagent given only seven public context surfaces, asked to build a notification preferences page. **20 of its factual claims re-checked: 18 held, 1 rejected, 1 unconfirmed.**
- **Tags:** 40 findings `[verified]` (one of them outside the six stations), 1 `[reported]` (a pixel measurement from the test agent's hand-written preview).
- **Prior scores were visible before evidence gathering**, because this run began by reading the 10-26 work order to check each item's status. Scores were set from today's evidence against the station anchors, then compared.
- **Self-marking.** This inspector wrote most of the defects the 10-26 work order lists and built Designer Job Search, which station 10 grades. Counts over judgments.
- **Measurement errors.** One caught inside this run before reporting: a keyword search for accessibility guidance in Figma descriptions returned seven false misses, and all seven carry an ACCESSIBILITY section. That is the eighth logged instance of this inspector's failure mode. Three errors from the 10-26 run were found and are corrected below: the British spelling count (12 lines in 3 pages, actually 17 in 6), the how-to-read omission count (7, actually 9, plus one miscategorized), and the token name divergence count (1, actually 15).

---

## Station records

### Station 2 · Best practices: YELLOW (7/10, held)
- Sampled: all 18 Figma components (57 frames, 67 text layers); `Field`, `Select`, `FormStatus`, `Button` and `CaseSection` read end to end; the global stylesheet in `Site.astro` measured (907 declarations); all 25 component docs pages checked against the sections `how-to-read.mdx` promises.
- Evidence level: live on all three assets.
- Findings:
  - `[verified]` *format* · **The design library now measures clean nearly everywhere.** 56 of 57 component frames use auto-layout; the exception is `Case study card > art`, a composed illustration. 0 unbound corner radii (6 on 10-26). 0 unbound fills or strokes. 0 of 67 text layers with an unbound size. 1 generic layer name left, `Fieldset > Text` (11 on 10-26).
  - `[verified]` *format* · **No Figma component nests another.** The 18 components contain 0 instances. In code, `CaseBlock` and `CaseHero` render `Eyebrow`, and `PagerPair` renders `Pager`. In Figma, Case block's label is a plain text layer, so a change to Eyebrow never reaches it. The 10-26 "zero detached instances" was true because there are no instances at all.
  - `[verified]` *org* · **Code craft drift, measured for the first time.** In the global stylesheet, 15 font sizes and 10 spacing values are written in px where a token with that exact value exists: `14px` seven times where `--sdc-text-body-sm` is 14, `8px` seven times where `--sdc-space-xs` is 8. 16 more font sizes sit off the type scale (12, 13, 13.5, 17, 18, 22, 28, 30, 40), most of them in the home deck card. All predate 10-26; earlier passes did not measure code craft.
  - `[verified]` *industry* · **50 physical box properties against 4 logical ones**, and no written policy on right-to-left or vertical writing. An English-only site can reasonably skip this. Right now it is undecided rather than decided.
  - `[verified]` *org* · **System-prefixed classes defined in page stylesheets.** `.sdc-modal`, `.sdc-quote`, `.sdc-deck__*`, `.sdc-how__*` and `.sdc-recs__*` live in `src/pages/index.astro`; `.sdc-wk-row` in `src/pages/work/index.astro:81`. `start/naming.mdx:54-56` says a prefixed class is one defined in the global stylesheet.
  - `[verified]` *format* · **`.sdc-btn` sets no line-height**, and `sdc-button-group` is styled only inside `.sdc-case`, where it turns buttons into underlined text links. Outside a case study the group has no layout at all.
  - `[reported]` The test agent measured a 6px height difference between a `<button>` and an `<a>` carrying the same `.sdc-btn` classes, in its own preview.
  - `[verified]` *format* · **Docs share one shape and skip its optional parts.** The How/When/Where block is on 25 of 25 pages, and "Checks before you ship" on 24 (`text-passage` lacks it). The sections `how-to-read.mdx` promises "where true" are thin:
    - Anatomy: 5 of 25.
    - States: 4 of 25.
    - Accessibility: 5 of 25.
    - Do and Don't: 0 of 25.

    Four pages mention accessibility nowhere: case-hero, eyebrow, row-list and text-passage. All 18 Figma descriptions now carry an ACCESSIBILITY section, so the design file is more thorough than the docs. `form-messages.mdx` still has no props table, and `choice.mdx` and `slider.mdx` still share sidebar order 21.
  - `[verified]` *org* · **17 lines with British spellings across 6 docs pages**: releases 2, choice 6, form-messages 6, field 1, select 1, fieldset 1. Another 10 sit in component code comments. Every one was present on 10-26, which counted 12 lines in 3 pages. `SITE-CONTEXT.md:33` says American English.
- Not inspected: the 1.0 Figma library, story craft in the Storybook, the services site's copy.
- Deviations noted: the home page's one-off `clamp()` sizes are documented in `foundations/type`. The off-scale card sizes are not.
- Score: the design side alone is a 9. Code drift and thin docs hold the station at 7.
- First move: swap the 25 hardcoded values for their tokens, and either move the page-defined prefixed families into `Site.astro` or drop their prefix.

### Station 4 · Shared language: YELLOW (5/10, down from 6)
- Swept: all props in 23 components, the property definitions on all 18 Figma components, all 93 code-syntax variables against code token names, props tables on 17 docs pages, the FormStatus and FormSummary class modifiers.
- Evidence level: live on all three assets.
- Findings:
  - `[verified]` *cross-asset* · **Three docs props tables name a prop the code does not have.** `case-hero.mdx:43`, `case-study-block.mdx:35` and `eyebrow.mdx:20` call it `sdc-eyebrow`. `CaseHero` and `CaseBlock` take `eyebrow`, and so do the examples on the same pages (`case-hero.mdx:29`) and `custom-elements.json:38,139`. Introduced 2026-10-08 by the namespace commit `5092e5d`, which appears to have prefixed a prop name in prose. Copying the table produces a broken component.
  - `[verified]` *cross-asset* · **`case-figure.mdx:16` says to set `inner={false}`.** `CaseSection` has no `inner` prop. It was renamed `layout` in `5092e5d` on 2026-10-08, and `section.mdx:45` documents `layout={false}`.
  - `[verified]` *within-asset* · **FormStatus disagrees with itself.** Its prop takes `ok | warning | error` and writes the classes `--ok | --warn | --err` (`FormStatus.astro:27-29`). FormSummary takes `error | warning | success` and writes matching classes. `form-messages.mdx` never lists FormStatus's values, and line 53 writes its classes as `--sdc-form-status--ok`, in custom-property form. **The live test wrote `tone="success"` on FormStatus**, which renders no tint and raises no error. This existed on 10-26 and was not reported then; the `ok` versus `success` collision was.
  - `[verified]` Still open from 10-26: `error` (a string, Field) versus `invalid` (a boolean, Select) for one concept; `width` a number in `CaseFigure` and `'narrow'` in `CaseSection` and `TextPassage`.
  - `[verified]` *design to code* · **Figma and code name the same choices differently.** Button's Figma property is `Style: Primary | Secondary`; the code prop is `variant: primary | secondary`. Pager's is `Direction: Previous | Next`; the code takes `'prev' | 'next'`. Figma property casing still splits: Title case on Button and Pager, lowercase `state` and `tone` on the four form sets.
  - `[verified]` *design to code* · **Token names: 93 of 93 code-syntax variables resolve to a real code token, and 15 spell the concept differently.** The 14 type sizes are `size/*` in Figma and `--sdc-text-*` in code, `size/stat-large` is `--sdc-text-stat-lg`, and `nav-height` is `--sdc-nav-h`. Code syntax carries every one, so tooling works. 10-26 reported one divergence; there are fifteen.
  - `[verified]` *guardrail* · **`check:names` passes** ("8 elements, 51 system classes, tokens and props clean"). It checks the prefix and collisions with HTML global attributes. It does not compare the values of a prop name two components share, and it does not look for prefixed classes defined outside `Site.astro`. Every finding above passes it.
- Not inspected: story argument names in the Storybook.
- Deviations noted: Figma `Display/3` bound to `size/heading` (documented 10-26).
- Score: 5. `git log` shows no change to components, Site.astro classes or these docs pages since 10-26, apart from the theme work. The drop is wider measurement: three defects that existed on 10-26 were found today, and one of them broke the live test's output.
- First move: correct the four docs lines (`sdc-eyebrow` three times, `inner` once). Then pick one tone vocabulary, `success`, and make FormStatus's classes match its prop values.

### Station 5 · Testing & validation: YELLOW (7/10, held)
- Inspected: `.github/workflows/qa.yml`, `qa/run.mjs` and its nine checks, the `qa/config.mjs` page list, `scripts/adoption.mjs` output, the repo for test files, the sync guard against today's artifacts, `tsconfig.json` and dependencies.
- Evidence level: live.
- Findings:
  - `[verified]` **CI is deep for a one-person system.** On every PR and every push to `dev`: manifest, naming, tokens, build, the eight-check Q&A suite (axe, contrast, reflow at 11 widths, text spacing, forced colors, link distinction, dialog, deck fit) across 11 pages and both themes, never-say, docs build, docs in step.
  - `[verified]` **The seven form components get no automated checks.** The suite runs on the 11 site pages in `qa/config.mjs`, and `adoption.mjs` reports Choice, Field, Fieldset, FormStatus, FormSummary, Select and Slider used on none of them. Axe, contrast, keyboard and forced colors never render the most interactive third of the library. Their only check is the Storybook accessibility panel, opened by hand. 10-26 recorded "no behavior tests"; this is the sharper version, since not even the page-level checks reach them.
  - `[verified]` **Nothing type-checks component props.** `tsconfig.json` extends `astro/tsconfigs/strict`, but `@astrojs/check` is not installed and `astro check` runs nowhere. The live test's `tone="success"` would pass every gate.
  - `[verified]` **The sync guard is still manual**: no sync step in `qa.yml`, and `ship` does not build the Storybook. Today's artifacts are in step anyway. The committed `storybook/src/sdc.css` matches `Site.astro` on 74 of 74 classes and 134 of 134 tokens with no value differences, and the built Storybook in `public/labs/sdc-storybook` carries the same 134. In step by care, not by check.
  - `[verified]` **Zero test files** (`git ls-files`). Keyboard behavior is asserted only in `qa/checks/dialog.mjs`, with three key presses. No visual baseline: `pixel` compares against production and runs locally. No evals. No design-side lint in CI; the Figma file is clean because someone cleaned it by hand.
- Not inspected: CI run history, flakiness.
- Score: 7. Against the anchors, green needs behavior tests, gating visual regression and evals, and all three are absent.
- First move: install `@astrojs/check` and run `astro check` in CI. Then add one page that renders all seven controls to the Q&A page list, so the existing checks reach them.

### Station 6 · Orchestration: YELLOW (6/10, held)
- Diffed: 104 Figma variables against the code tokens on production and on the branch, in all three color modes; 6 effect styles against 6 shadow tokens; 18 Figma components against 23 code components; 12 documentation surfaces against the code; Designer Job Search's copy of the stylesheet against production.
- **Token diff:**
  - **Values:** 132 checked on production. Light and Dark are identical on every token. SDS differs on 3 (`bg`, `surface`, `surface-2`: Figma says Chalk, production says Marble).
  - **Names:** 93 of 93 bridged by code syntax, 15 spelled differently (station 4).
  - **Design-only:** the 3 Chalk primitives, which exist on the branch but not in production, plus 11 documented design-only variables.
  - **Code-only:** `--sdc-scrim` and `--sdc-texture-size`, plus 36 derived `-rgb` helpers. The six shadows now have a design-side form as effect styles.
- Evidence level: live on both sides.
- Findings:
  - `[verified]` **Elevation is connected.** Six effect styles: Card, Card hover, Float, Modal, Chip, Tile. All 14 shadow layers match the code's offsets, blur, spread, color and alpha exactly. `Shadow/Card` is applied to the Case study card component and 6 placements of it. Work order item 9 is done.
  - `[verified]` **Design-to-code pointers are complete.** 18 of 18 Figma descriptions end with a Code line naming the `.astro` file and the class (6 on 10-26). Item 10 is done.
  - `[verified]` **New drift, one day old: Figma's SDS mode is half-migrated.** `bg`, `surface` and `surface-2` point at the Chalk primitives that exist only on the unmerged branch, while `header-bg` still points at `paper/marble` at 82%. Against production 3 values differ; against the branch, 1. It matches neither. If this state is published, a designer working in SDS sees a ground the shipping site does not have.
  - `[verified]` **Twelve documentation surfaces contradict the code.** Six were reported on 10-26 and are still open:
    1. `ARCHITECTURE.md:149` says 16 components; there are 23.
    2. `DESIGN-SYSTEM.md` has no form classes, no control tokens, and 0 mentions of `--sdc-focus-ring`.
    3. `how-to-read.mdx:46-54` lists 14 components and omits 9, not 7. It also calls the case study card "CSS and markup only", though `CaseStudyCard.astro` has existed since 2026-10-08.
    4. `field.mdx:81-83` says there is no error state and no disabled state.
    5. `select.mdx:9-11` describes a composition `Field.astro` cannot hold (0 slots).
    6. `form-messages.mdx` has no props table.

    Seven were found today, by this run and the live test:
    7. The `sdc-eyebrow` props tables (10-08).
    8. `inner={false}` (10-08).
    9. `section.mdx:11-12` says `tone="alt"` shifts to the card surface and `tone="ink"` inverts. In CSS both are `background: var(--sdc-bg)`, and were already flat before 10-08.
    10. `eyebrow.mdx:9` says the Eyebrow is in the display face. The base `.sdc-eyebrow` sets no family, and the display face applies only inside `.sdc-case` (10-01).
    11. `index.mdx:33` promises a work index pattern that does not exist (09-28).
    12. The **new** one, since 10-26: the SDS block's comment in `Site.astro:605` on production says the six status colors are "deliberately absent", twenty lines above where they are restated (#24, 10-27).
  - `[verified]` **`check:docs` passed through all twelve.** It verifies that the docs were touched, not that they are true.
  - `[verified]` **16 of 23 code components have a Figma counterpart.** Missing on the design side: Slider, a documented control; CaseHero and CaseFigure; and four layout wrappers that may not need one (CaseSection, TextPassage, ButtonGroup, PagerPair). Choice has no radio variant in Figma, though the code has `radio`. Select has no invalid variant.
  - `[verified]` **Designer Job Search is the third consumer**, and it syncs by copy. `sync-sdc.mjs` copies `storybook/src/sdc.css`. Its copy was generated 2026-10-24: all 74 classes are present, and none of the 118 shared tokens differs in value. It lacks the 16 SDS tokens, which it does not use. Its `--check` flag exists and nothing runs it.
- Not inspected: whether the Figma library's SDS mode is published; the services site's copy.
- Score: 6. Two real connections were made (elevation, code pointers). They are offset by the SDS mode drift and a docs drift twice the size reported.
- First move: finish the Figma SDS mode (point `header-bg` at Chalk) and merge `docs/sds-theme`, so design and production agree before anything is published. Then the docs pass, work order item 1.

### Station 9 · Machine-readable docs & context: YELLOW (5/10, held)
- Inventoried: `custom-elements.json`, `primitives.tokens.json`, 46 docs pages, `DESIGN-SYSTEM.md`, `ARCHITECTURE.md`, `SITE-CONTEXT.md`, `never-say.txt`, `llms.txt`, the 18 Figma descriptions.
- **Generation test: run.** Self-rated **buildability 6/10, discoverability 5/10**, against 6 and 3 on 10-26 for a contact page (a different task). 18 of 20 claims held.
- Evidence level: live.
- Findings:
  - `[verified]` **The manifest still covers 8 tag names in 7 modules, for 23 components**, and `manifest:check` still passes ("in step (7 modules)"). No form control appears in it. Item 1 is open.
  - `[verified]` **`llms.txt` is unchanged since 2026-10-06**: 28 lines of career summary. No docs root, no component, no token, no version, no manifest.
  - `[verified]` **`DESIGN-SYSTEM.md` still omits** all seven form classes, `--sdc-control-h`, `--sdc-control-border` and `--sdc-focus-ring`.
  - `[verified]` **The design file is now the best machine-readable surface in the system.** All 18 descriptions follow one shape: purpose, then ACCESSIBILITY, then a Code line. An agent reading Figma over a bridge gets the accessibility contract and the code target in a predictable place.
  - `[verified]` **The props tables, the part an agent copies, are wrong in four places** (`sdc-eyebrow` three times, `inner` once) and missing on `form-messages.mdx`.
  - `[verified]` **Test output:**
    - 10 components imported by the correct path.
    - 12 tokens, 0 raw hex, and 1 raw length: a dialog width, which the agent flagged and proposed a token for.
    - 11 page-local classes, as `naming.mdx` sanctions.

    It found the form components by reading the docs folder. Neither agent-facing file, `llms.txt` or `custom-elements.json`, mentions them.
  - `[verified]` **Claims checked:** 18 held. 1 rejected: `field.mdx:15` saying the site has no forms is accurate, since no page uses one. 1 unconfirmed: `type.mdx:20-21` says headlines sit around width 62. The CSS sets `wdth` once, to 100, and the font's default width was not checked.
  - `[verified]` **Freshness:** tokens and the manifest are generated. The docs, `DESIGN-SYSTEM.md` and `llms.txt` are hand-written. Nothing is derived from the Props interfaces, which are the most accurate description of the API in the repo.
- Not inspected: the built Pagefind index as a retrieval surface.
- Score: 5. The design side gained real ground. The repo surfaces the test actually used did not move, and the test tripped on the same gaps.
- First move: generate the component index and manifest from the 23 Props interfaces, and give `llms.txt` a section pointing at them and at the docs root.

### Station 10 · Agent access: YELLOW (7/10, held)
- Surfaces mapped:
  - Figma Console MCP: live, 4 ms, read and write.
  - No system MCP server, and no Code Connect (no seat).
  - Public docs at `/docs` and the Storybook at `/labs/sdc-storybook`.
  - `llms.txt`, which is not about the system.
  - Private agent rules: the global `CLAUDE.md` design system rules, the `ds-validate.py` hook, and nine design system skills under `~/.claude/skills`.
- **Live test: run**, graded by this inspector from the output file.
- Evidence level: live.
- Findings:
  - `[verified]` **The test output was mostly on-system** (station 9). It invented four things, three where the system has no answer and one where the docs were silent:
    - A submit control: `.sdc-btn` on a native `<button>`, as on 10-26.
    - A confirmation dialog: `dialog.mdx:12-13` says the dialog is "Never for confirmations".
    - A form action row: `sdc-button-group` is styled only in case studies.
    - One prop value, `tone="success"`, because the docs were silent.
  - `[verified]` **Real product work shows the same edge.** Designer Job Search was built by an agent working under the global design system rules. It uses 12 SDC class families and 248 token references, with no raw hex. It also defines 82 local `dash-` blocks, including a switch, chips, a table, badges and a dialog that SDC does not offer. The rules say to build a missing component on the system, with a story. Two (`dash-switch`, `dash-callout`) were flagged to Steve for approval; none were added to SDC. **Token adoption is habitual. Component adoption stops at the system's edge.** Self-marked: this inspector built it.
  - `[verified]` **The design-to-code bridge got stronger without Code Connect.** 18 of 18 descriptions now name their code, up from 6.
  - `[verified]` **No docs page tells anyone how to give an agent the system.** Not one mentions MCP, Code Connect, `llms.txt` or the Figma bridge. The access story lives in Steve's private `~/.claude`, which works for one person and nobody else.
- Not inspected: Cursor or other IDE setups.
- Score: 7, not provisional (the live test ran).
- First move: the generated component index, shared with station 9. Then decide whether Designer Job Search's switch and callout become SDC components.

---

## Seen outside the six stations

Not scored, because station 7 was not re-inspected. Recorded because it is verified and small.

- `[verified]` **Station 7: the SDS theme shipped without a version.** #24 (`b3568ca`, 2026-10-27) added the SDS block to `Site.astro` (66 lines), 16 tokens to `primitives.tokens.json` (88 lines) and SDS to the Storybook theme menu. `sdc-version.json` still reads 02.02.00, released 2026-10-26, and `releases.mdx` has no entry. `releases.mdx:24` makes a new token a minor version, so production is running an unreleased 02.03.00. Work order item 15.

---

## What changed since 2026-10-26

**Score movement, six stations:**
- Station 2: 7 to 7.
- Station 4: 6 to **5**, wider measurement.
- Station 5: 7 to 7.
- Station 6: 6 to 6.
- Station 9: 5 to 5.
- Station 10: 7 to 7.
- Total: 38/60 to **37/60**.

**Lights turned off (10-26 work order):**
- **Item 9, elevation in Figma:** done. Six effect styles, values identical, applied.
- **Item 10, Figma descriptions:** done. 18 of 18 with accessibility and code.
- **Item 11, layer names and radii:** nearly done. 0 unbound radii, 1 generic name left.
- **Access upgrade 1, keep the bridge open:** done. It was live for this run.

**Still open:** items 1 to 8 and 12, every repo-side item. Item 7 is larger than reported (17 lines in 6 pages, not 12 in 3), item 3's how-to-read entry is larger (9 omitted, not 7), and item 8 was hit again by the live test.

**New lights:**
- Figma's SDS mode is half-migrated and matches neither production nor the branch (1 day old).
- A comment in production `Site.astro` contradicts the code beneath it (#24, 1 day old).
- The SDS theme reached production without a version or a changelog entry (#24, station 7, not scored).
- Six older docs defects found by wider measurement: the `sdc-eyebrow` tables, `inner`, the section tones, the Eyebrow face, the promised work index pattern, and FormStatus's undocumented values with its prop and class mismatch.
- Two CI gaps named for the first time: no prop type-checking, and no automated check that renders the form controls.

**The pattern, again:** the measured, generated layers stay true (token values, the CSS artifacts), and the hand-written layers drift. This pass adds a second half: **the work that got done was the work done over a live bridge**, and the work that waited was a handful of small text edits in the repo.

---

## Next service

- Work order: [`ds-inspection/work-orders/2026-10-28-work-order.md`](../work-orders/2026-10-28-work-order.md)
- Wire into CI now: `astro check`, `npm run sync -- --check`, a page that renders all seven controls in the Q&A page list, and two new `check:names` rules: a shared prop name must share its values, and no `sdc-` class may be defined outside `Site.astro`.
- Re-inspect (partial, stations 4, 6, 9) after the docs pass and the generated index land.
- Re-inspect (partial, stations 1 and 8) with Designer Job Search counted as a consumer: 82 local blocks, and at least five families SDC does not offer.
- Re-inspect (deep, all ten): 2027-01-26.
