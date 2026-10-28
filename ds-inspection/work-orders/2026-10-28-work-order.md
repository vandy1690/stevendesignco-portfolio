# Work Order: Steven Design Co. Design System 2.0

_From inspection: [`reports/2026-10-28-inspection.md`](../reports/2026-10-28-inspection.md) · Written: 2026-10-28 · Replaces: [`2026-10-26-work-order.md`](2026-10-26-work-order.md)_

Reds get fixed now. Yellows get scheduled. Every item cites its station and evidence. Steve owns prioritization.

**Status, 2026-10-28:** items **1, 3, 7 and 15 done** in SDC 02.03.00 (#25, tagged `sdc-02.03.00`). Items **2 and 6 done** in SDC 02.04.00 (#26): `astro check` gates CI after fixing the 11 errors its first run found, FormStatus and Select use the same words as their neighbors with the old names kept until 03.00.00, Figma's properties match the code, and `check:names` has a rule for shared choices. Item **4 done** and item **13 started** in SDC 02.04.01 (#27): `/labs/controls` puts every control in front of the whole Q&A suite, and a keyboard check drives it in both themes. On their first runs they found two defects: a Select with a placeholder row opened on the first real answer, and the error summary's links were 20px tall. Both are fixed. The visual baseline and evals in item 13 remain. Fixing item 3 turned up a thirteenth surface: `DESIGN-SYSTEM.md` listed the accent hover as `#3D5C8C` and `#D8FF33` since 2026-09-28, while the code and Figma say `#233552` and `#F1FFB8`. Two of item 3's design calls were resolved toward the code, so nothing visible changed: the docs now describe the section tones and the Eyebrow face as they ship. If either should look different, that is a new change.

**No reds.** Six yellow stations re-inspected: 2, 4, 5, 6, 9, 10.

**Carried from 10-26:** items 9, 10 and 11 of that order are done or nearly done, all in Figma. Its nine repo-side items are all still open and appear below, marked **(10-26 #n)**. Items 1 to 3 here are small text and config edits that stop the system teaching broken code. Together they are an afternoon.

---

## 🔴 Fix now (reds)

None.

---

## 🟡 Schedule (yellows)

### 1. Fix the docs that break code when copied
- **Station:** 4, 6 and 9 · **Evidence:** `[verified]`, every line checked against the Props interfaces:
  - `case-hero.mdx:43`, `case-study-block.mdx:35` and `eyebrow.mdx:20` name the prop `sdc-eyebrow`. The code takes `eyebrow`. Wrong since 2026-10-08.
  - `case-figure.mdx:16` says `inner={false}`. `CaseSection` has no `inner`; it is `layout={false}`. Wrong since 2026-10-08.
  - `form-messages.mdx` has no props table for FormStatus or FormSummary, never lists FormStatus's tone values, and writes its classes as `--sdc-form-status--ok` (line 53).
  - `select.mdx:9-11` says Select sits inside a Field, and `Field.astro` has 0 slots. **(10-26 #4)**
  - `field.mdx:81-83` says there is no error and no disabled state, below a props table that documents both. **(10-26 #3)**
- **Why it's first:** these are the lines an agent or a person copies. The live test copied the FormStatus gap straight into its output as `tone="success"`.
- **First move:** correct the four prop names. Add props tables for FormStatus and FormSummary, generated from their interfaces if item 5 lands first. For Select, either give Field a slot or rewrite the page to show the `.sdc-field` wrapper markup Select actually needs.
- **AI assist:** fully mechanical except the Field slot, which is an API decision.
- **Done when:** every props table and example on the 25 component pages matches the component's Props interface.
- **Effort:** S
- **Suggested timing:** before the next deploy

### 2. Type-check props in CI
- **Station:** 5 · **Evidence:** `[verified]` `tsconfig.json` extends `astro/tsconfigs/strict`; `@astrojs/check` is not installed; `astro check` appears in neither `package.json` nor `qa.yml`.
- **Why it matters:** an invalid prop value passes every gate today and ships silently. This is the check that would have caught the live test's `tone="success"`, and every future one like it.
- **First move:** `npm i -D @astrojs/check typescript`, then add an `astro check` step to `qa.yml` beside "Tokens in step", and to `ship`.
- **Done when:** a component given a value outside its union fails CI.
- **Effort:** S
- **Suggested timing:** before the next deploy

### 3. Correct the docs that describe the wrong look or the wrong count
- **Station:** 6 · **Evidence:** `[verified]`:
  - `section.mdx:11-12` says `tone="alt"` shifts to the card surface and `tone="ink"` inverts. In CSS both are `background: var(--sdc-bg)`, and were already flat before 10-08.
  - `eyebrow.mdx:9` says the Eyebrow is in the display face. The base `.sdc-eyebrow` sets no family; the face applies only inside `.sdc-case`.
  - `ARCHITECTURE.md:149` says 16 components; there are 23. **(10-26 #3)**
  - `how-to-read.mdx:46-54` lists 14 components, omits 9, and calls `CaseStudyCard` CSS-only. **(10-26 #2, #3)**
  - `DESIGN-SYSTEM.md` has no form classes, no `--sdc-control-h` or `--sdc-control-border`, and no `--sdc-focus-ring`. **(10-26 #3)**
  - `index.mdx:33` promises a work index pattern; `patterns/` holds two pages, neither one it.
  - `Site.astro:605` says the SDS status colors are "deliberately absent", twenty lines above where they are restated. New since 10-26.
- **First move:** two of these are design calls, not typos. Decide whether bands should alternate their ground and whether the Eyebrow should be in the display face everywhere, then make the CSS or the docs say the same thing. Correct the other five as written.
- **AI assist:** the five corrections are mechanical. The two design calls are Steve's.
- **Done when:** no docs page states a component count, or a script checks every one that does. **Fourth inspection to find one wrong.**
- **Effort:** S
- **Suggested timing:** before the next deploy

### 4. Put the control set in front of the Q&A suite
- **Station:** 5 · **Evidence:** `[verified]` `qa/config.mjs` lists 11 pages. `adoption.mjs` reports Choice, Field, Fieldset, FormStatus, FormSummary, Select and Slider used on none of them. The eight checks therefore never render seven of 23 components.
- **First move:** one unlisted page, for example `/labs/controls`, that renders all seven in every state (rest, checked, invalid, disabled, each tone), added to `PAGES`. Axe, contrast, reflow and forced colors then cover them for free.
- **Done when:** the Q&A run reports on every form control in both themes.
- **Effort:** S to M
- **Suggested timing:** this week

### 5. Generate the component index, the manifest and an llms.txt section from the Props interfaces **(10-26 #1, #2)**
- **Station:** 9 and 10 · **Evidence:** `[verified]` `custom-elements.json` covers 8 tag names for 23 components, and `manifest:check` passes. No component index exists. `llms.txt` (28 lines, unchanged since 10-06) names no docs root, component or token. The live test found the form components by reading the docs folder.
- **Why it matters:** stations 9 and 10 share this one root cause. The Props interfaces are the most accurate API description in the repo, and nothing is generated from them.
- **First move:** one script that reads every `interface Props` in `src/components/ui/` and writes a components file: name, import path, props with types and defaults, docs URL. Then derive the index page and an `llms.txt` "Design system" section from it, so adding a component updates all three.
- **AI assist:** the generator is mechanical. Whether non-custom-elements belong in `custom-elements.json` or a separate `components.json` is a judgment call.
- **Done when:** adding a file to `src/components/ui/` makes it appear in the index, the manifest and `llms.txt` without anyone editing prose.
- **Effort:** M
- **Suggested timing:** this month

### 6. One word per concept, and a check that keeps it **(10-26 #5)**
- **Station:** 4 · **Evidence:** `[verified]`:
  - `tone` is `ok | warning | error` on FormStatus and `error | warning | success` on FormSummary. FormStatus also writes `--warn` and `--err` for its own `warning` and `error`.
  - `error` (a string, Field) and `invalid` (a boolean, Select) express one concept.
  - `width` is a number in CaseFigure and `'narrow'` in CaseSection and TextPassage.
  - Figma: Button `Style` versus code `variant`; Pager `Previous | Next` versus `'prev' | 'next'`; Title case on two sets, lowercase on four.
  - `check:names` checks none of this.
- **First move:**
  1. FormStatus takes `success`, and its classes become `--success`, `--warning`, `--error` to match its prop values.
  2. Choose `error` or `invalid` for both controls.
  3. Rename the Figma properties to the code's names and casing.
  4. Then add two rules to `check:names`: a prop name used by two components must share its value set, and no `sdc-` class may be defined outside `Site.astro`.
- **AI assist:** the renames are mechanical. Which word wins is Steve's call; nothing external consumes these yet, so it is a minor version.
- **Done when:** `check:names` fails on a shared prop name with different values.
- **Effort:** S
- **Suggested timing:** this month

### 7. Finish the SDS mode in Figma and merge the branch
- **Station:** 6 · **Evidence:** `[verified]` Figma's SDS mode points `bg`, `surface` and `surface-2` at the Chalk primitives, which exist only on `docs/sds-theme`, and `header-bg` at `paper/marble` at 82%. Production code is Marble throughout, and the branch is Chalk throughout. The Figma file matches neither.
- **First move:** point `header-bg` at `paper/chalk` at 82% over the bridge, then merge `docs/sds-theme`. Do not publish the library between those two steps.
- **Done when:** the token diff shows 0 differences in all three modes.
- **Effort:** S
- **Suggested timing:** this week

### 8. The sync guard in CI, for both consumers **(10-26 #6)**
- **Station:** 5 and 6 · **Evidence:** `[verified]` `qa.yml` has no sync step, and `ship` does not build the Storybook. The artifacts happen to be in step today: 74 of 74 classes and 134 of 134 tokens. Designer Job Search's copy dates from 2026-10-24, and its `sync-sdc.mjs --check` exists but nothing runs it.
- **First move:** `npm run sync -- --check` in `ship` and as a CI step. In Designer Job Search, run `node sync-sdc.mjs --check` from `npm start` as a warning, not a block.
- **Done when:** CI fails if the committed `sdc.css` is behind `Site.astro`.
- **Effort:** S
- **Suggested timing:** this month

### 9. British spellings, and the check that stops them coming back **(10-26 #7)**
- **Station:** 2 · **Evidence:** `[verified]` 17 lines across 6 docs pages: releases 2, choice 6, form-messages 6, field 1, select 1, fieldset 1. Another 10 sit in component code comments. 10-26 counted 12 lines in 3 pages.
- **First move:** fix all 27, then add `colour`, `grey`, `greys` and `behaviour` to `never-say.txt`, which already runs in CI.
- **Done when:** `grep -rniE "colour|grey|behaviour" docs-site/src/content/docs/ src/components/` is empty.
- **Effort:** S
- **Suggested timing:** this month

### 10. Forms you can submit and confirm **(10-26 #8)**
- **Station:** 1, 2 and 10 · **Evidence:** `[verified]`:
  - `Button.astro` requires `href`.
  - `.sdc-btn` sets no line-height.
  - `sdc-button-group` is styled only inside `.sdc-case`.
  - `dialog.mdx:12-13` rules out confirmations.
  - No `patterns/form.mdx`.

  The live test hand-wrote a submit button again, plus a page-local confirmation dialog with the one raw value in its output.
- **First move:** decide which of these the system owns:
  - a button mode for Button;
  - an action row that works outside case studies;
  - a confirmation dialog on native `<dialog>`, with a `--sdc-dialog-w` token.

  Then write `patterns/form.mdx` assembling the pieces, including the focus script `form-messages.mdx:24` describes.
- **Done when:** a form with a confirmation can be built and submitted on-system, or the limit is written down.
- **Effort:** M
- **Suggested timing:** this month

### 11. Code craft: hardcoded values and page-defined system classes
- **Station:** 2 · **Evidence:** `[verified]` In the global stylesheet, 15 font sizes and 10 spacing values are written in px where a token with that value exists, and 16 font sizes sit off the scale. `.sdc-modal`, `.sdc-quote`, `.sdc-deck__*`, `.sdc-how__*` and `.sdc-recs__*` are defined in `src/pages/index.astro`, and `.sdc-wk-row` in `src/pages/work/index.astro`, against `naming.mdx:54-56`. 50 physical box properties against 4 logical ones, with no written policy.
- **First move:** swap the 25 exact matches for their tokens (no visual change). Move the page-defined prefixed classes into `Site.astro` or drop their prefix. Write one line in `foundations` saying whether logical properties are the rule.
- **Done when:** a scan for px values equal to a token returns 0, and the second new `check:names` rule (item 6) passes.
- **Effort:** M
- **Suggested timing:** this month

### 12. Figma composition gaps
- **Station:** 2 and 6 · **Evidence:** `[verified]`:
  - The 18 components contain 0 instances. Case block's label is a text layer, not an Eyebrow.
  - 7 code components have no Figma counterpart, Slider among them.
  - Choice has no radio variant, and Select no invalid variant.
  - 1 generic layer name remains (`Fieldset > Text`).
- **First move:** over the bridge:
  1. Swap Case block's label for an Eyebrow instance.
  2. Add a Slider component.
  3. Add Choice `radio` and Select `invalid` variants.
  4. Rename the last layer.
- **Done when:** a change to Eyebrow in Figma reaches Case block, and every documented control has a Figma component.
- **Effort:** S to M
- **Suggested timing:** this month

### 13. Behavior tests, a visual baseline, evals **(10-26 #12)**
- **Station:** 5 · **Evidence:** `[verified]` 0 test files. Keyboard is asserted in one check, with three presses. `pixel` compares against production and runs locally. No evals.
- **First move:** once item 4 exists, add keyboard assertions for Choice (space, arrows), Select and Slider to that page's check. Then commit a visual baseline so `pixel` can gate, then one rubric-based eval for agent-written pages. The live test in this report is a ready-made first case.
- **Effort:** M each
- **Suggested timing:** this quarter

### 14. Decide what Designer Job Search gives back to the system
- **Station:** 10, with stations 1 and 8 next · **Evidence:** `[verified]` 82 local `dash-` blocks, including a switch, chips, a table, badges and a dialog that SDC lacks. `dash-switch` and `dash-callout` are waiting on Steve's approval. None were added to SDC as the design system rules require.
- **First move:** approve or reject `dash-switch` and `dash-callout` as SDC components. If approved, build them in `Site.astro` with stories that pass axe in Light, Dark and SDS, and switch Designer Job Search to them.
- **Done when:** each local block that duplicates a system need is either an SDC component or a documented exception.
- **Effort:** S to decide, M to build
- **Suggested timing:** before the next stations 1 and 8 inspection

### 15. Version the SDS theme
- **Station:** 7, seen in passing and not scored · **Evidence:** `[verified]` #24 (`b3568ca`, 2026-10-27) added 66 lines to `Site.astro` and 88 to `primitives.tokens.json`: the SDS theme block and 16 new tokens. The Storybook theme menu also gained SDS. `sdc-version.json` still reads 02.02.00, released 2026-10-26, and `releases.mdx` has no entry for it. `releases.mdx:24` says a new token is a minor version.
- **First move:** fold it into the merge in item 7. Release 02.03.00 with one changelog entry covering the SDS theme and the move to Chalk, and tag the commit that reaches production.
- **Done when:** the version, the changelog and the tag all describe what production ships.
- **Effort:** S
- **Suggested timing:** with item 7

---

## 🔧 Access upgrades

1. **The bridge worked.** It was live for this run and the last. Keep Figma Desktop open with the Desktop Bridge plugin during inspections.
2. **Check publish state next time.** This run could not tell whether the Figma library's SDS mode has been published. That decides whether item 7 is internal drift or something designers can already see.
3. **Read CI run history.** `gh run list` would show whether any of the gating steps flake. This pass read the workflow, not its runs.
4. **Code Connect needs a seat.** Until then, the 18 code lines in the Figma descriptions are the bridge. Keep them current when a component is renamed.
5. **A design-systems knowledge MCP** would make benchmarks citable rather than recalled: `claude mcp add --transport http design-systems https://design-systems-mcp.southleft.com/mcp`.

---

## 🟢 Keeping the greens green

Stations 1, 3, 7 and 8 were not re-inspected and carry their 10-26 scores.

- **Station 1, coverage:** item 10 is the gap that matters. Designer Job Search shows which components a product needs next.
- **Station 3, accessibility:** when the SDS mode moves to Chalk, recompute contrast for every SDS text and border pair from the design variables. A new ground changes every ratio on it.
- **Station 7, governance:** bump the version in the same PR as the change, and tag the commit that reaches production. This slipped once already; see item 15.
- **Station 8, adoption:** run `adoption.mjs` across all three consumers, not just this site.
- **The token pipeline:** 132 of 132 Light and Dark values identical, design to code. `tokens:check` holds the code half; the bridge diff in this report is the design half. Rerun it at every inspection.

---

## Cadence

- **Items 1 to 3:** before the next deploy. An afternoon in total.
- **Items 4, 7 and 15:** this week.
- **Items 5, 6, 8, 9, 10, 11, 12:** this month.
- **Item 13:** this quarter.
- **Item 14:** before the next stations 1 and 8 inspection.
- **Re-inspect (partial, stations 4, 6, 9):** after items 1, 3 and 5 land.
- **Re-inspect (partial, stations 1 and 8):** with Designer Job Search counted as a consumer.
- **Re-inspect (deep, all ten):** 2027-01-26.
- **Wire into CI now:**
  - `astro check` (item 2)
  - `sync --check` (item 8)
  - the controls page (item 4)
  - the two `check:names` rules (item 6)
- **Owner:** Steve. **Review:** at the next inspection.
