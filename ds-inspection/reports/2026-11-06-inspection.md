# Design system inspection: Steven Design Co. 2.0
_Inspected: 2026-11-06 · Technician: Claude Opus 5.5 (Claude Code), with four inspector agents and one live test agent · Mode 3, re-inspection of all ten stations · Previous: 2026-10-28 (six stations, 37/60) and 2026-10-26 (all ten, 70/100)_
_Vehicle profile: `ds-inspection/GARAGE.md` (re-confirmed 2026-11-06)_

Work order: [`ds-inspection/work-orders/2026-11-06-work-order.md`](../work-orders/2026-11-06-work-order.md)

---

## The short version

Six PRs reached production since 10-28 (#25 to #30): the SDS theme was versioned and moved to Chalk, `astro check` gates CI, one word per concept is enforced, the seven controls are in front of the whole Q&A suite, a keyboard check drives them, and branch protection now binds admins too. **The 10-28 work order's first four items are done, and docs accuracy is the best it has been: 104 of 104 prop names in the docs match the code.**

**Release 02.05.00 exists everywhere except production.** The subhead token, the white control ground, the inset select caret and the placeholder contrast fix have sat as uncommitted changes in a side worktree since 10-29. Meanwhile the published Figma library describes them as current, and the Family Wish List ships copies of two of them. An agent reading Figma today gets `--sdc-control-bg`, which resolves to nothing in production.

**Consumers keep building the same missing pieces, and nothing collects them.** SDC now has eight consumers on disk but names three. All three app consumers built their own status tag, disclosure, setup steps and text-link button; they write `<button class="sdc-btn">` by hand 46 times because `Button.astro` only renders links. Designer Job Search's copy of SDC is 22 tokens and 3 classes behind, and its own check fails.

**Some defects no check can see.** Placeholder text fails contrast on light grounds (the fix is in the side worktree). The SDS theme has never been scanned by axe or contrast, and `prefers-contrast: more` skips it. The live test found that a fieldset's legend gets 0px of space before its options.

**Next:** land 02.05.00 (commit, PR, merge, tag 02.04.01 and 02.05.00), then add `sds` to the Q&A themes. Those two moves close the most lights across the most stations.

**Overall: 67/100** (70 on 10-26, the last full pass). A conversation starter, not a grade. Most of the three-point drop is wider measurement, not decay: counting eight consumers instead of two, and measuring Figma descriptions and the shipped Storybook stylesheet for the first time. Stations 4 and 9 improved.

---

## Inspection sheet

- **1 · Coverage & gaps** · Complete · 🟡 **6/10** · down 2 from 10-26
- **2 · Best practices** · Sound · 🟡 **7/10** · held from 10-28
- **3 · Accessibility** · Sound · 🟡 **7/10** · down 1 from 10-26
- **4 · Shared language** · Sound · 🟡 **7/10** · up 2 from 10-28
- **5 · Testing & validation** · Sound · 🟡 **7/10** · held
- **6 · Orchestration** · Synchronized · 🟡 **6/10** · held
- **7 · Governance & version control** · Extensible · 🟡 **7/10** · down 1 from 10-26
- **8 · Feedback & adoption** · Extensible · 🟡 **6/10** · down 2 from 10-26
- **9 · Machine-readable docs & context** · AI-Ready · 🟡 **7/10** · up 2 from 10-28
- **10 · Agent access** · AI-Ready · 🟡 **7/10** · held
- **Overall: 67/100**

**Lights:** 🟢 0 green · 🟡 10 yellow · 🔴 0 red · 0 not inspected

**Key:** 🔴 Red (0 to 3): broken or missing, the light is on · 🟡 Yellow (4 to 7): drift or gaps, schedule a fix · 🟢 Green (8 to 10): healthy

---

## Evidence basis

- **Design library:** live but sampled. The Figma Console bridge was connected to a different file ("upwork"), so it was not used, and no whole-file sweep was possible. The official Figma MCP read file `TJjqs7XSz21Y72GRPnVAQB` ("SDC Fall of 2026"): `get_metadata` on the Components, Foundations and Site pages, `get_variable_defs` on 7 to 10 nodes (60 code-syntax values), `search_design_system` scoped to the library, `get_screenshot` on Controls (193:23), `get_code_connect_map` on 2 sets, `whoami`. Auto-layout, unbound values, SDS mode values and version history were not reachable this way; claims about them are scoped or carried as `[reported]`.
- **Code library:** live. Production is `origin/dev` at `ecf8535`, which equals the local checkout, clean. The worktree `~/portfolio-astro-subhead` (`add/subhead-type`, 0 commits ahead, 63 uncommitted paths) was measured separately and labeled.
- **Docs:** live. All 46 pages as source, plus `DESIGN-SYSTEM.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `llms.txt`, the gitignored `claude-context/design-system.md`.
- **Process:** live. `qa.yml`, the last 40 CI runs, the full log of the production run, branch protection, repo merge settings, all 30 PRs, all 24 remote branches, tags (read-only `gh`).
- **Consumers:** stevendesignservices.com, Designer Job Search and the Family Wish List measured from committed files, plus five more SDC copies found on disk (private-sites family and clients, the MsMadeline specimen, family-shifts, and others).
- **Live agent test:** run. One agent given only seven public surfaces (`DESIGN-SYSTEM.md`, `ARCHITECTURE.md`, `llms.txt`, `custom-elements.json`, the Starlight docs source, `storybook/src/sdc.css`, the stories) built a notification preferences page. It cited 44 claims; 10 were re-checked against their lines and 10 held. It reported 23 gaps; the 8 load-bearing ones were re-checked in the stylesheet and docs and 8 held.
- **Tags:** findings below are `[verified]` unless marked. `[reported]`: the wish list's live status (from memory notes), the Figma SDS mode values (from the CHANGELOG), and the clients site's deployed copy.
- **Prior scores were visible to the coordinating technician** (this run began by reading GARAGE.md and the 10-28 report to brief the inspectors). The four inspector agents scored from today's evidence before opening any prior record, then compared.
- **Self-marking.** Agents of this lineage built much of what is graded: the keyboard check, `/labs/controls`, the naming rule, the SDS drift check, Designer Job Search, the Family Wish List and its SDC lite, the stranded manifest branch and the 02.05.00 worktree. Counts over judgments.
- **Measurement method changes.** Two counts changed method this pass, so compare trends within a method, not absolutes: Designer Job Search blocks (82 on 10-28 by the old method; 87 at the same commit and 91 today by the new one), and classes in sync (74 by the sync guard's method, 100 by selector).

---

## Station records

### Station 1 · Coverage & gaps: YELLOW (6/10, down 2 from 10-26)
- Inventory: 18 in Figma · 23 in code · 23 of 23 documented across 25 component pages, 5 of them CSS-only patterns (dialog, links, navigation, progress dots, row list).
- Evidence level: Figma live via native MCP, whole Components page; code, docs and consumers live.
- Findings:
  - `[verified]` **Design and code differ in the same places as 10-28.** In code but not Figma: ButtonGroup, CaseFigure, CaseHero, CaseSection, PagerPair, Slider, TextPassage. In Figma but not code: Site header and Site footer, both shell. No Slider component in the library.
  - `[verified]` **New: Figma describes a release that has not shipped.** Field and Select draw a white `--sdc-control-bg` ground, and the Select description (updated 2026-10-29) says the caret "is the system's own since 02.05.00". Production is 02.04.01 and fills controls with `--sdc-surface` (`Site.astro:1215-1275`); `--sdc-control-bg` occurs 0 times on any branch (`git log --all -S`).
  - `[verified]` **What consumers built locally, measured.**
    - Family Wish List: 63 `wl-` blocks (110 classes), 10 marked PROPOSED, plus copies of `.sdc-subhead` and the select caret.
    - Designer Job Search: 91 `dash-` blocks (87 at its 10-28 commit by the same method).
    - stevendesignservices.com: 28 `sds-` blocks, plus 44 unprefixed questionnaire classes including its own `.btn`, `.chip` and `.field`.
    - Share of class use in markup that is SDC: Wish List 38%, Job Search 28%, SDS 72%.
  - `[verified]` **All three app consumers built the same four things:** a status tag (`wl-tag`, `dash-badge`, `sds-tag`), a disclosure on details and summary, setup steps, and a text-link button. Two of three built a panel, an app bar, a side nav, a tour, a dialog, a progress meter, a row list and a toolbar.
  - `[verified]` **The Astro components reach 0 of 3 consumers.** Two are plain HTML and the third imports nothing from `src/components/ui/`. Consumers write `<button class="sdc-btn">` by hand 46 times, because `Button.astro` renders only `<a>` and requires `href`.
  - `[verified]` **Staples absent** (same list as 10-26, so old): generic card, table, tabs, accordion, badge, avatar, breadcrumb, tooltip, toast, switch, loading and empty states. Benchmark from the inspector's own knowledge; no design systems MCP is connected.
  - `[verified]` **Designer Job Search's copy is stale**: its own `sync-sdc.mjs --check` exits 1 (22 tokens and 3 renamed status classes missing).
- Not inspected: Figma Site and UX flow pages; Figma SDS mode values; the rendered Storybook.
- Deviations noted: no npm package; header and footer are shell; Button is link only by design.
- First move: decide on the three blocks every consumer already built (status tag, disclosure, steps), and give Button a `<button>` mode. `wl-tag` is the readiest candidate: four tones, tokens only, on the status tint contract.

### Station 2 · Best practices: YELLOW (7/10, held from 10-28)
- Sampled: Button, Field, Select, Choice, Slider, FormStatus, FormSummary, Fieldset, CaseStudyCard, CaseHero, CaseSection and Pager read end to end; the global stylesheet (910 declarations); all 25 component pages; Figma metadata for 5 components and 17 of 18 descriptions.
- Evidence level: code and docs live; Figma partial (no auto-layout data from the native MCP).
- Findings:
  - `[verified]` **Props tables match the code on 18 of 18 pages** that have one, compared by script against each `interface Props`.
  - `[verified]` **Markup is semantic throughout the sample**: native select, fieldset and legend, `label for`, `dl` for meta, `output` with `aria-valuetext`.
  - `[verified]` **Code craft drift is unchanged**: 15 font sizes and 11 spacing values in px where a token has the same value; 50 physical box properties to 5 logical; no right-to-left policy written.
  - `[verified]` **System-prefixed classes still defined in page stylesheets**: six families in `src/pages/index.astro`, `sdc-wk-row` in `work/index.astro`.
  - `[verified]` **Still open**: `.sdc-btn` sets no line-height; `sdc-button-group` is styled only under `.sdc-case` (`Site.astro:1425`); `choice.mdx` and `slider.mdx` both use sidebar order 21.
  - `[verified]` **New, from the live test: a fieldset's legend gets no space before its options.** `.sdc-fieldset` spaces its children with grid `gap: var(--sdc-space-md)`, but a rendered legend is not a grid item, so the gap never applies. The test page measured 0px; the Family Wish List measures 6px. Old, from wider measurement.
  - `[verified]` **New, from the live test: the shipped Storybook stylesheet carries page leftovers**: `.hero{…}` and `:root{--content:…}` from the home page, and an unconditional `[data-animate], [data-reveal] { opacity: 1 !important; transform: none !important }` at top level (`storybook/src/sdc.css:1704`). Every consumer that copies the file gets them.
  - `[verified]` **British spellings**: 21 words in 10 docs pages by a wider word list (16 lines in 6 pages by the 10-28 method), and 8 component comment lines. `never-say.txt` lists none of them.
  - `[verified]` **The accessibility standard overclaims**: `practices/accessibility.mdx` says two independent scanners (axe and HTML_CodeSniffer) run on every page; only axe runs. It also says reflow is checked from 280px; the suite starts at 320. Both date from 09-28.
  - `[verified]` **Figma**: no component nests another (Case block's label is a text layer, 8:17); the Case study card shows one meta line where code and docs specify two pairs; Foundations captions use pre-prefix names on 30 labels.
- Not inspected: Figma auto-layout and binding (the 10-28 Console sweep reported 56 of 57 frames on auto-layout); Storybook story craft.
- Deviations noted: the home page `clamp()` sizes; Button link only.
- First move: land or park 02.05.00 so the Figma descriptions are true of production; then fix the legend spacing and swap the 26 exact-match px values for their tokens.

### Station 3 · Accessibility: YELLOW (7/10, down 1 from 10-26)
- Sampled: Field, Select, Choice, Slider, FormSummary, FormStatus, Fieldset, Button, Pager; Light, Dark and SDS computed from tokens; Figma Light and Dark variables and 17 of 18 descriptions.
- Evidence level: code live; CI from the production run log; placeholder color rendered in Playwright Chromium and WebKit; Figma partial.
- Findings:
  - `[verified]` **Fundamentals hold in the sample**: native elements, visible labels, hint then error in `aria-describedby`, `aria-invalid`, `role=status` polite, `role=alert` with `tabindex=-1`, the focus ring on the chip, value text on the slider.
  - `[verified]` **CI on `ecf8535` passes 9 checks over 12 pages, now including `/labs/controls`**: keyboard (13 stops in 2 themes and 6 behaviors), axe on 12 pages and 5 dialogs, text contrast in 2 themes.
  - `[verified]` **98 of 99 contrast pairs pass across Light, Dark and SDS** (SDS 33 of 33). The one failure, accent `#3F5F92` on `surface-2` at 4.35:1, is latent: no accent text sits on surface-2 in SDC or the consumers' CSS.
  - `[verified]` **New light, old defect: placeholder text fails contrast on light grounds.** `Field.astro` has had a `placeholder` prop since 02.02.00 and production has never had a `::placeholder` rule. Rendered defaults on the light surface: 3.53:1 in Chromium, 1.80:1 in WebKit. Shipping users: the SDS contact form (5 placeholders) and Designer Job Search (16). No gate sees it. The fix is written, uncommitted, in the worktree (`Site.astro:1286`).
  - `[verified]` **The SDS theme is never rendered by any automated accessibility check** in either repo (`THEMES` is light and dark).
  - `[verified]` **`prefers-contrast: more` does not reach SDS.** The override at `Site.astro:697-699` targets `:root, :root[data-theme="light"]`, and the SDS block outranks `:root`. Rendered in Chromium: muted text stays `rgb(92,88,75)` in SDS under high contrast. Since #24 on 10-27.
  - `[verified]` **Figma has no Focus variant on Field, Choice or Select**; the Pager description says a 2px focus offset where code uses 3px.
  - `[verified]` **21 of 25 component pages describe screen reader behavior**, and `docs/ACCESSIBILITY.md` records a manual VoiceOver pass.
- Not inspected: rendered SDS pages; Firefox; real Safari or a real screen reader; Figma SDS mode.
- Deviations noted: Choice's 1px input is documented as correct.
- First move: land the `::placeholder` rule, give one `/labs/controls` field a placeholder, and assert its computed color, since the contrast check reads only text nodes.

### Station 4 · Shared language: YELLOW (7/10, up 2 from 10-28)
- Swept: all 107 props across 20 components; 19 props tables and 44 component tags in docs examples; property names on all 6 Figma variant sets; every `--sdc-` token stem; British spellings across 7 asset folders.
- Evidence level: code and docs live; Figma live via native MCP.
- Findings:
  - `[verified]` **Four of the five collisions named on 10-28 are fixed, each with a deprecation path**: FormStatus takes `success | warning | error` with `'ok'` accepted until 03.00.00; classes `--success`, `--warning`, `--error` with the old ones aliased; Select takes `error` like Field, `invalid` deprecated; Figma uses `variant`, `direction`, lowercase `state` and `tone` on all 6 sets.
  - `[verified]` **104 of 107 props documented; 44 of 44 doc example tags use accepted attributes.**
  - `[verified]` **The guardrails fail when they should**: `check:names` rule 5 failed on a planted `tone: 'good'|'bad'`, and `astro check` failed on a planted `tone="bogus"`. Both run in CI.
  - `[verified]` **Same concept, different names**, which rule 5 cannot see because it only compares shared names: `heading` versus `head`, `lede` versus `text`, `hint` versus `desc`, Choice's `radio` boolean versus Field's `type`. All old.
  - `[verified]` **Foreign variables bound inside SDC components**: Button binds `var(--sds-size-stroke-border)` (7:10), Pager binds two `State Layers/...` variables (7:27); none is in the SDC library. Age unknown.
  - `[verified]` **`--sdc-text-*` means two things**: a color in 2 tokens and a size in 14. The worktree adds `--sdc-text-subhead` (18px) beside `--sdc-text-subheading` (20px); its own comment warns about it.
  - `[verified]` **Two consumers still write the deprecated names** (`--ok`, `--err`): the SDS contact form and Designer Job Search. Nothing will flag them before 03.00.00 removes those names.
- Not inspected: Storybook argument names; Figma layer names beyond three pages.
- Deviations noted: the 15 `size/*` to `--sdc-text-*` spellings carried by code syntax; `Display/3` bound to `size/heading`.
- First move: relabel the 30 Foundations captions to `--sdc-` names, rebind Button's stroke and Pager's state layers to SDC tokens, then add a Figma-side name check to the inspection.

### Station 5 · Testing & validation: YELLOW (7/10, held)
- Inspected: `qa.yml`, all 10 Q&A checks (`keyboard.mjs` in full), `qa/config.mjs`, `ship`, the pre-push hook, the PR template, the last 40 CI runs and the full production run log, branch protection, the consumers' own checks.
- Evidence level: live. `astro check`, `check:names`, `tokens:check`, `manifest:check` and `check:claims` run in a scratch copy; the Q&A results read from the CI log.
- Findings:
  - `[verified]` **CI gates every change**: types (76 files, 0 errors), manifest, names, tokens, build, 9 Q&A checks on 12 pages, never-say, docs build, docs-built and docs-in-step, all green on production.
  - `[verified]` **The gate is enforced**: `enforce_admins: true`, linear history, one required strict check, a pre-push hook refusing direct pushes, and the Q&A pass refusing a dev server from another worktree. 5 PR runs failed before merge; every push to dev since 10-26 is green.
  - `[verified]` **The keyboard check tests behavior**: tab order, disabled skipped, one stop per radio group, focus ring in both themes, Space, arrows, Home and End with `aria-valuetext`, select type-ahead, error wiring, summary links. Its first run found a real Select bug.
  - `[verified]` **Gaps that remain**: zero unit tests, no visual baseline (`pixel` stays outside CI and compares against live), no evals for agent-written pages, no design-side lint, Storybook checked by hand.
  - `[verified]` **The SDS theme has no browser check anywhere**, which hid the `prefers-contrast` gap (station 3).
  - `[verified]` **Two consumer checks run only by hand**: Designer Job Search's `--check` (failing today) and the wish list's `check:styles` (passing, 1,676 elements).
- Not inspected: flakiness over time; the consumers' own test suites.
- Deviations noted: `pixel` outside CI by design.
- First move: add `sds` to `THEMES`; then commit a pixel baseline that can fail a build.

### Station 6 · Orchestration: YELLOW (6/10, held)
- Diffed: Button, Pager, FormSummary, FormStatus, Field, Choice and Select across Figma, code and docs; 18 Figma components against 23 code components; 60 code-syntax values from 7 Figma nodes; seven consumer copies against production.
- Evidence level: code and consumers live; Figma live but sampled.
- Findings:
  - `[verified]` **Token values match on the sample**: 35 of 37 colors exactly (alpha included), 21 of 21 numbers, 2 of 2 font families. The two that do not are `control-bg` and `control-bg-disabled`: published in Figma with code syntax, defined nowhere in production.
  - `[verified]` **Figma's published library is ahead of production** (station 1): components updated 2026-10-29T22:28Z describe 02.05.00, which is 43 uncommitted files in the worktree, 8 days unmerged.
  - `[verified]` **All 12 docs surfaces from 10-28 are fixed.** Five stale statements outside that list: `DESIGN-SYSTEM.md:199` "28 color primitives" (39); `DESIGN-SYSTEM.md:202` unprefixed `--ink-*`; `qa/README.md:39` "11 pages" (12); `check-docs-in-step.mjs:5` "The Storybook cannot drift"; `CONTRIBUTING.md:114` "Regenerated from the running site each build" (only by hand).
  - `[verified]` **Consumer copies today**: Storybook 140 of 140 tokens, 74 of 74 classes, unchecked in CI; SDS in step and checked by its own CI; **Designer Job Search 118 of 140 tokens, 135 of 138 classes, its check failing**; family full 140 of 140 (pulled at build); family lite 140 of 140 and `check:styles` passing; the clients site 116 of 140 with the whole control set missing.
  - `[verified]` **New, from the live test: the shipped Storybook stylesheet points its Inter files at `/node_modules/@fontsource/inter/files/...`** (49 references). A consumer that copies `storybook/src/sdc.css` as is loses Inter; Designer Job Search rewrites the paths, so it is unaffected. Old: present since the Storybook was added (8dafdca).
  - `[verified]` **The wish list's interim copies** of `.sdc-subhead` and the caret match the worktree, but not its move to the white control ground, so that change will arrive unannounced when 02.05.00 merges.
  - `[verified]` **The token pipeline is half generated**: 39 primitives JSON to CSS with `tokens:check`; the semantic tier hand-written on both sides.
- Not inspected: Figma SDS mode values, aliases and version history; deployed copies on Vercel.
- Deviations noted: no npm package; 11 design-only variables.
- First move: merge or shelve 02.05.00 so Figma and production describe the same control; then wire `npm run sync -- --check` into CI and run Designer Job Search's sync.

### Station 7 · Governance & version control: YELLOW (7/10, down 1 from 10-26)
- Inspected: CONTRIBUTING, the PR template, CHANGELOG, `releases.mdx`, `sdc-version.json`, the pre-push hook, `qa.yml` and its history, branch protection, merge settings, 40 CI runs, PRs #1 to #30, issues, 24 remote branches, tags, the worktree.
- Evidence level: live.
- Findings:
  - `[verified]` **Enforcement is much stronger than on 10-26**: `enforce_admins: true`, linear history, no force pushes or deletions, squash merges only, delete-on-merge, a versioned pre-push hook checked at the top of `ship`. 6 of 6 commits on dev since 10-28 came through a PR.
  - `[verified]` **Versioning is real, with one slip**: one version file, the live site reports 02.04.01 in a meta tag, 7 releases logged, 6 tagged. **`sdc-02.04.01` does not exist**, locally or on the remote. `releases.mdx` says every release is tagged on its production commit (305b802).
  - `[verified]` **Work died in the queue**: `origin/fix/manifest-covers-the-library` holds 3 commits from 10-27 (a 24-declaration manifest, `@docs` pointers, a generated components index, three gates, a "02.02.01" release) that were never opened as a PR.
  - `[verified]` **02.05.00 is live in design and in a consumer before it exists in code.** The worktree has no remote branch, sits 2 commits behind dev, and its `sdc-version.json` already says "released 2026-10-29", which breaks the rule that released is the date it reaches production.
  - `[verified]` **Paper and practice differ in small ways**: #28 merged an empty diff; #29 and #30 have no CHANGELOG line; #30 skipped the sitemap `lastmod`; `ship` is described as 8 steps in CONTRIBUTING and SITE-CONTEXT and has 11.
  - `[verified]` **The 02.00.00 migration note is broken**: "`sdc-card` is `sdc-card`" for 3 of its 4 rename examples (`releases.mdx:153`). Old (10-08), from wider measurement.
  - `[verified]` **Public docs publish a private local path**: `practices/shipping.mdx:105` names the job hunt folder and resume file on Steve's machine.
  - `[verified]` 0 GitHub issues ever; the backlog is the inspection work orders. Ownership is clear.
- Not inspected: whether the human half of the merge checklist happened; when `enforce_admins` was switched on.
- Deviations noted: GARAGE's "admins deliberately not enforced" no longer holds; retired. No issue tracker is reasonable at this size.
- First move: commit, push and PR the 02.05.00 worktree; tag `sdc-02.04.01` on 305b802 and 02.05.00 on its merge; rebase and PR the manifest branch or close it.

### Station 8 · Feedback & adoption: YELLOW (6/10, down 2 from 10-26)
- Measured: `scripts/adoption.mjs` (read-only); every project under `~/Documents/claude/LLC/LLC` and `~/Sites` grepped for SDC tokens; the drift checks of SDS and Designer Job Search; consumer token and class diffs; PROPOSED markers and local blocks.
- Evidence level: live.
- Findings:
  - `[verified]` **Inside the source repo**: 23 of 23 components used somewhere; all 7 form components used on one page, `/labs/controls`, a test harness. `adoption.mjs` is not in CI.
  - `[verified]` **Eight projects outside the source use SDC tokens; SDC names three of them** (SDS in 15 files, Designer Job Search in 5, the MsMadeline specimen in 9; family-shifts once). 0 mentions of the wish list, private-sites, the Upwork portfolio or the content site template. There is no consumer list.
  - `[verified]` **Each consumer syncs differently**: SDS checked in its CI; Designer Job Search stale with a failing check nothing runs; the wish list 140 of 140 plus pre-release rules; private-sites pulls CSS at build; the MsMadeline copy from 10-22; family-shifts a hand-copied block of 86 names.
  - `[verified]` **The loop turns informally**: 02.02.00's controls proved out on SDS; 02.04.00 kept the old names for SDS and Designer Job Search and says so; the 02.05.00 subhead was built the same day the wish list shipped a copy of it, though the notes do not name the wish list.
  - `[verified]` **Proposals have no intake**: the wish list marks 10 names PROPOSED (its header lists 4); Designer Job Search carries 91 local blocks, with `dash-switch` and `dash-callout` named only in an inspection work order; 0 GitHub issues.
  - `[verified]` **Stale consumer context**: SDS `SITE-CONTEXT.md:103` and `ContactForm.astro:15` still say "SDC has no form components", in a file that uses `sdc-field` and `sdc-form` 38 times.
  - `[verified]` **A consumer writes in the system namespace**: the wish list defines `.sdc-subhead` and overrides `.sdc-select` locally.
  - `[verified]` **Cadence is frequent but ad hoc**: 9 SDC reports since 10-03; nothing schedules them.
- Not inspected: Figma library analytics; the Upwork, content site and family-shifts copies in depth.
- Deviations noted: no npm package, sync by file copy, as designed.
- First move: one consumer list in the SDC repo with eight rows (how each syncs, the version it carries, its open proposals as backlog entries); then run Designer Job Search's sync.

### Station 9 · Machine-readable docs & context: YELLOW (7/10, up 2 from 10-28)
- Inventoried: 140 CSS custom properties; `primitives.tokens.json` (39); Figma variables over the native MCP; `custom-elements.json`; TypeScript Props with `astro check` in CI; the Storybook index (27 stories); `llms.txt`, `SITE-CONTEXT.md`, `never-say.txt` (36 rules), `DESIGN-SYSTEM.md`, `ARCHITECTURE.md`, 46 Starlight pages, the private `claude-context/design-system.md`.
- **Generation test: run.** 44 claims cited by the test agent, 10 re-checked against their lines, 10 held (form summary, invalid field, select wrapper, fieldset, chips, slider, status tones and classes, button, narrow container, theme). Every documented component on the page is built as the docs say. It invented only what the system has no answer for: page layout rows, the theme toggle, and a submit button.
- Evidence level: live.
- Findings:
  - `[verified]` **The props tables are true**: 104 of 104 prop names, 9 of 9 enum rows checked; 0 `sdc-eyebrow` or `inner` left. On 10-28 the test agent copied a wrong value from the docs; this time none of the ten sampled claims was wrong.
  - `[verified]` **The component pages are consistent**: 25 of 25 carry How, When and Where; 24 of 25 "Checks before you ship".
  - `[verified]` **The manifest is unchanged**: 8 elements from 7 of 23 components, generated and gated. The fix that covers all 23 is on the stranded branch.
  - `[verified]` **`llms.txt` is unchanged since 10-06**: 0 links to `/docs`, the Storybook or the manifest.
  - `[verified]` **`DESIGN-SYSTEM.md` values are right (39 of 39 rows) but its structure is stale**: "two blocks" where there are three theme blocks (the test agent caught this too), 0 mentions of SDS, "28 color primitives" for 39, 13 of the 62 non-primitive tokens absent, and no entry for the theme toggle or `.sdc-field__req`.
  - `[verified]` **`ARCHITECTURE.md` is stale**: its component table lists 14 of 23; CaseSection props wrong on 2 of 4; "Checks are manual" false since CI.
  - `[verified]` **The private agent context is older still**: `claude-context/design-system.md` (modified 10-07) says 14 components, 12 Figma components and 59 variables, and the pre-10-05 hover colors.
  - `[verified]` **Figma descriptions run ahead of the code**: 2 of 5 read describe unshipped 02.05.00 tokens.
  - `[verified]` **What the live test could not find**: how to write the theme toggle; the Typekit URL; a submit button (`button.mdx:9` says every button is a link); a form actions row (`.sdc-cta-row`'s stacking lives in a script in `Site.astro`, not in the stylesheet, though `DESIGN-SYSTEM.md:160` documents it); spacing between form fields; a page-title size outside case studies; and plain-HTML markup for radio chips, a fieldset description and a select hint (shown only for Astro). One story still labels spacing `--space-*` (`Foundations.stories.js:162`).
  - `[verified]` **The Storybook is not crawlable** by robots-honoring agents: robots.txt disallows `/labs/`.
- Not inspected: the Pagefind index as a retrieval surface; 13 of 18 Figma descriptions.
- Deviations noted: CLAUDE.md and claude-context are gitignored by design; their accuracy is still in scope.
- First move: rebase and merge the stranded manifest and index branch; add a design system section to `llms.txt`; refresh `DESIGN-SYSTEM.md` for three themes and the toggle; refresh or retire `claude-context/design-system.md`.

### Station 10 · Agent access: YELLOW (7/10, held)
- Surfaces mapped: no SDC MCP server or query API; repo and public files (`/llms.txt`, `/docs`, `/custom-elements.json`, the version meta tag); the official Figma MCP (live); the Figma Console MCP (configured, on another file); no Code Connect; the global CLAUDE.md design system rules and the `ds-validate.py` hook; skills (site-context, ds-inspection, vibe-killer, ds-ascii, ds-adoption-plan, ds-token-architecture); Cursor. **Live test: run, output on-system** (station 9).
- Evidence level: live (MCP probes, config files, the hook run in scratch).
- Findings:
  - `[verified]` **The official Figma MCP reads SDC**, but its search mixes libraries: for "accent", 6 of 12 results came from SDC Fall of 2026, 3 from the 1.0 library and 3 from Artistic Eye; for "Field", one result came from a third library named "Steven Design Co" (2025) that GARAGE did not list.
  - `[verified]` **No Code Connect**: the team is on the pro tier; `get_code_connect_map` returned `{}` on 2 of 2 sets; 0 of 18 Storybook design links filled.
  - `[verified]` **The hook catches 2 of 7 probes** (Tailwind classes; a raw hex in multi-line CSS) and misses a hex in a one-line rule, an inline style, a hex in JS, raw px spacing, and an invented `sdc-` class. It runs only on Edit and Write. Unchanged since 10-07.
  - `[verified]` **Cursor, where Steve builds, has no SDC wiring**: `~/.cursor/mcp.json` has Notion only, no rules.
  - `[verified]` **The user-level MCP config includes a component source outside the system** (21st.dev `magic`); it failed to connect this session.
  - `[verified]` **The DS skills have no SDC profile** to start from, so each run begins with intake.
  - `[verified]` **Discoverability is low**: "agent" appears once in the docs site; no page explains how to point an agent at SDC.
  - `[verified]` **The live test was on-system where the docs speak**, so the "weak, generic results" light is off; the gaps it hit are context gaps (station 9), not access gaps.
- Not inspected: the Figma Console bridge on SDC.
- Deviations noted: no Code Connect, because of the plan tier.
- First move: one docs page listing every access surface and how to wire it into Claude Code and Cursor; widen the hook to px values and unknown `sdc-` names.

---

## What changed since last inspection

**Score movement** (against each station's last record): 1 down 2 · 2 held · 3 down 1 · 4 up 2 · 5 held · 6 held · 7 down 1 · 8 down 2 · 9 up 2 · 10 held. **67/100** against 70 on 10-26.

**Lights turned off**
- The docs that broke code when copied (10-28 #1): done. 104 of 104 prop names match.
- `astro check` in CI (10-28 #2): done, proven to fail on a planted bad value.
- The docs that described the wrong look or count (10-28 #3): all 7 lines done.
- The controls page in front of the Q&A suite (10-28 #4): done.
- One word per concept (10-28 #6): 4 of 5 collisions fixed with deprecation paths; the "no `sdc-` class outside Site.astro" rule is still open.
- The SDS theme versioned (10-28 #15): done as 02.03.00.
- Admins now bound by branch protection; squash only; delete-on-merge; a pre-push hook.
- The live test copied no wrong value from the docs (it copied one on 10-28).

**New lights**
- 02.05.00 in Figma and a consumer, not in code; 02.04.01 untagged; a stranded branch.
- Placeholder contrast (old defect, newly found).
- SDS never scanned, and `prefers-contrast` skips it.
- Fieldset legend spacing, Inter paths in the shipped stylesheet, and leaked home page rules (old, found by the live test).
- Designer Job Search stale; eight consumers with no list and no intake for proposals.
- Foreign variables bound in Figma Button and Pager.
- A private local path in the public docs.

**Still open from 10-28**: #5 (manifest, index, `llms.txt`), #8 (sync guard in CI), #9 (British spellings), #10 (forms you can submit), #11 (code craft), #12 (Figma composition), #13 (visual baseline and evals; keyboard part done), #14 (what Designer Job Search gives back). #7 (SDS mode in Figma) partly: the code side is done; the Figma mode values are `[reported]` matching.

---

## Next service

- Work order: [`ds-inspection/work-orders/2026-11-06-work-order.md`](../work-orders/2026-11-06-work-order.md)
- Recommended cadence: a deep inspection monthly while three or more consumers are changing, quarterly once they settle. Wire into CI now: `sds` in the Q&A themes, `npm run sync -- --check`, and the consumers' own checks (Designer Job Search `--check`, the wish list's `check:styles`) on a schedule.
- Re-inspect by: 2026-12-06, or right after 02.05.00 merges.
