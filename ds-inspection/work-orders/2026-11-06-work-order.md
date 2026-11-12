# Work Order: Steven Design Co. Design System 2.0

_From inspection: [`reports/2026-11-06-inspection.md`](../reports/2026-11-06-inspection.md) · Written: 2026-11-06 · Replaces: [`2026-10-28-work-order.md`](2026-10-28-work-order.md)_

Reds get fixed now. Yellows get scheduled. Every item cites its station and evidence. Steve owns prioritization; this is the technician's recommendation.

**Done since 10-28:** items 1, 2, 3, 4, 6 (mostly), 7 (code side) and 15 of that order. Carried items are marked **(10-28 #n)**.

---

## 🔴 Fix now (reds)

None.

---

## 🟡 Schedule (yellows)

### 1. Land 02.05.00, and tag what already shipped
- **Station:** 1, 2, 3, 6, 7, 9 · **Evidence:** `[verified]` the `add/subhead-type` worktree at `~/portfolio-astro-subhead` holds 63 uncommitted paths (the subhead token and class, `--sdc-control-bg`, the inset caret, the `::placeholder` rule at `Site.astro:1286`), 0 commits, no remote branch, 2 commits behind dev, idle since 10-29. The published Figma library already describes it (Select and Field descriptions, updated 2026-10-29). `sdc-02.04.01` is not tagged (production commit 305b802).
- **Why it's first:** it closes lights in six stations at once. Until it lands, every agent that reads Figma is handed tokens that resolve to nothing, and the placeholder contrast fix sits unused.
- **First move:** rebase the worktree on dev, commit, open a PR. Decide `--sdc-text-subhead` against `--sdc-text-subheading` before merging (the branch's own comment flags it). Set `released` to the merge date. Tag `sdc-02.04.01` on 305b802 and `sdc-02.05.00` on the merge. If 02.05.00 is not ready, revert the two Figma descriptions to 02.04.01 instead.
- **AI assist:** the rebase, commit, changelog, tags and the wish list's switch from its interim copies are mechanical. The name decision and the white control ground are Steve's.
- **Done when:** production defines `--sdc-control-bg`, Figma's descriptions are true of production, `git tag --list 'sdc-*'` shows 02.04.01 and 02.05.00, and the Family Wish List drops its copies of `.sdc-subhead` and the caret.
- **Effort:** M
- **Suggested timing:** this week

### 2. Put the SDS theme in front of the checks, and fix high contrast for it
- **Station:** 3, 5, 6 · **Evidence:** `[verified]` `qa/config.mjs` has `THEMES = ['light','dark']`; the SDS repo's `qa.mjs` is parser-only. `Site.astro:697-699` scopes `prefers-contrast: more` to `:root, :root[data-theme="light"]`, so SDS muted text stays `rgb(92,88,75)` under high contrast (rendered in Chromium).
- **First move:** add `sds` to `THEMES`; add `:root[data-theme="sds"]` to the high contrast override; teach `check-theme-complete.mjs` to check media overrides as well as theme blocks.
- **Done when:** axe and contrast run in three themes on every PR, and high contrast changes SDS muted text.
- **Effort:** S · **Suggested timing:** this week

### 3. Give a fieldset's legend its space
- **Station:** 2, 3 · **Evidence:** `[verified]` `.sdc-fieldset { display: grid; gap: var(--sdc-space-md) }`; a rendered legend is not a grid item, so the gap never applies: 0px on the live test page, 6px in the Family Wish List.
- **First move:** add `margin-block-end: var(--sdc-space-md)` (or the logical equivalent) to `.sdc-fieldset > legend`, and a reflow or keyboard-check assertion on the measured gap on `/labs/controls`.
- **Done when:** the legend sits `--sdc-space-md` above the first option in every theme.
- **Effort:** S · **Suggested timing:** with item 1

### 4. Make the shipped Storybook stylesheet safe to copy
- **Station:** 2, 6 · **Evidence:** `[verified]` `storybook/src/sdc.css` points its Inter files at `/node_modules/@fontsource/inter/files/...` (49 references, since 8dafdca); it carries the home page's `.hero{…}` and `:root{--content:…}`, and an unconditional top-level `[data-animate], [data-reveal] { opacity: 1 !important; transform: none !important }` (line 1704). `Foundations.stories.js:162` labels spacing `--space-*`.
- **First move:** have `sync-css.mjs` rewrite font URLs to a documented path and drop page-local rules (or scope them to the pages that own them); relabel the story.
- **Done when:** a page that links only `sdc.css` loads Inter and gets no home page rules.
- **Effort:** S · **Suggested timing:** this month

### 5. A consumer list, and an intake for what consumers propose
- **Station:** 8, 6, 1 · **Evidence:** `[verified]` 8 projects use SDC tokens; SDC names 3. Designer Job Search's own `sync-sdc.mjs --check` exits 1 (118 of 140 tokens, 3 status classes missing). The Family Wish List marks 10 blocks PROPOSED; Designer Job Search's `dash-switch` and `dash-callout` appear only in a work order. 0 GitHub issues. **(10-28 #8, #14)**
- **First move:** one page in the SDC repo listing each consumer: how it syncs, the version it carries, its check, and its open proposals as backlog entries. Run Designer Job Search's sync. Wire `npm run sync -- --check` into CI and run each consumer's own check on a schedule.
- **Done when:** every consumer on disk is on the list with a version, and no consumer's check fails.
- **Effort:** M · **Suggested timing:** this month

### 6. Build the four things every consumer built, starting with a real button
- **Station:** 1, 2, 10 · **Evidence:** `[verified]` all three app consumers built a status tag, a disclosure, setup steps and a text-link button; consumers write `<button class="sdc-btn">` by hand 46 times because `Button.astro` requires `href`; `.sdc-btn` sets no line-height; `sdc-button-group` is styled only under `.sdc-case`; `.sdc-cta-row` stacks by a script, not the stylesheet; `patterns/` has no form page. **(10-28 #10)**
- **First move:** give Button an element mode for `<button>`, set its line-height, and give the button group a layout outside case studies. Then promote `wl-tag` (four tones, tokens only) as the status tag. Write `patterns/form.mdx` with a submit row.
- **AI assist:** the build is mechanical once the API is decided; which blocks to promote, and their names, are Steve's.
- **Done when:** a form can be built from SDC alone with a submit button and an actions row, and at least one consumer drops its local status tag.
- **Effort:** L · **Suggested timing:** this quarter

### 7. Merge the stranded manifest branch, and fix the context files agents read
- **Station:** 9, 10, 6, 7 · **Evidence:** `[verified]` `origin/fix/manifest-covers-the-library` (3 commits, 10-27, never opened as a PR) carries a 24-declaration manifest and a generated components index; production's manifest covers 7 of 23 components. `llms.txt` has 0 links to the system. `DESIGN-SYSTEM.md` says "two blocks" (three exist), 0 mentions of SDS, "28 color primitives" (39), unprefixed primitive names, and no entry for the theme toggle or `.sdc-field__req`. `ARCHITECTURE.md` lists 14 of 23 components, gets CaseSection's props wrong on 2 of 4, and says checks are manual. `claude-context/design-system.md` dates from 10-07. Also stale: `qa/README.md:39`, `check-docs-in-step.mjs:5`, `CONTRIBUTING.md:114`, and the 02.00.00 migration note (`releases.mdx:153`). **(10-28 #5)**
- **First move:** rebase and PR the manifest branch (or close it and redo it). Add a design system section to `llms.txt` pointing at `/docs`, `/custom-elements.json` and the version. Then correct the hand-written files in one pass, and make `check:claims` cover every count they state.
- **Done when:** the manifest covers 23 of 23, `llms.txt` points at the system, and every hand-written count matches the code or is checked by a script.
- **Effort:** M · **Suggested timing:** this month

### 8. Figma housekeeping
- **Station:** 2, 3, 4, 6 · **Evidence:** `[verified]` 30 Foundations captions use pre-prefix names; Button binds `--sds-size-stroke-border` (7:10) and Pager binds two `State Layers` variables (7:27), none in the library; no Slider component; Choice has no radio variant; Select has no invalid variant; Field, Choice and Select have no Focus variant; the Pager description says a 2px focus offset (code 3px); the Case study card shows one meta line (code and docs two pairs); no component nests another. **(10-28 #12)**
- **First move:** relabel the captions and rebind the three foreign variables in one sitting, with the Console bridge on SDC so a whole-file sweep can confirm nothing else is bound outside the library.
- **Done when:** a whole-file sweep finds 0 foreign variables and 0 pre-prefix names, and Slider, radio, invalid and focus variants exist.
- **Effort:** M · **Suggested timing:** this quarter

### 9. Tell agents how to reach SDC, and make the hook catch more
- **Station:** 10, 9 · **Evidence:** `[verified]` "agent" appears once in the docs; no page explains the access surfaces. Cursor has no SDC wiring (`~/.cursor/mcp.json` has Notion only). The `ds-validate.py` hook caught 2 of 7 probes (missed a one-line hex, an inline style, a hex in JS, raw px, an invented `sdc-` class) and runs only on Edit and Write. The Figma MCP search mixes in the 1.0 library, Artistic Eye and a third "Steven Design Co" library. robots.txt disallows `/labs/`, so the Storybook is not crawlable. The user MCP config lists a component source outside the system (21st.dev). The DS skills have no SDC profile.
- **First move:** one docs page, "Building with SDC from an agent", listing every surface and how to wire it into Claude Code and Cursor. Widen the hook to px values and unknown `sdc-` names. Unpublish or rename the older Figma libraries so search returns one system.
- **Done when:** a fresh agent in Cursor and in Claude Code can find the system from the docs alone, and the hook flags all seven probe cases.
- **Effort:** M · **Suggested timing:** this quarter

### 10. Code craft and wording, carried
- **Station:** 2, 4 · **Evidence:** `[verified]` 15 font sizes and 11 spacing values in px with an exact token; 50 physical box properties to 5 logical, with no right-to-left policy; 7 prefixed families defined in page stylesheets; `choice.mdx` and `slider.mdx` share sidebar order 21; 21 British words in 10 docs pages and 8 component comments, none in `never-say.txt`; `practices/accessibility.mdx` claims two scanners (one runs) and reflow from 280px (the suite starts at 320). Same-concept prop names: `heading`/`head`, `lede`/`text`, `hint`/`desc`. **(10-28 #9, #11)**
- **First move:** swap the 26 exact-match values, add the British words to `never-say.txt` and fix them, correct the two accessibility claims, and add the "no `sdc-` class outside Site.astro" names rule.
- **Done when:** the never-say check fails on a British spelling and passes on the docs; the accessibility page states what runs.
- **Effort:** S · **Suggested timing:** this month

### 11. A visual baseline and evals
- **Station:** 5 · **Evidence:** `[verified]` zero unit tests; `pixel` reports only and compares against live; no evals for agent-written pages. The keyboard part of 10-28 #13 is done. **(10-28 #13)**
- **First move:** commit a pixel baseline for `/labs/controls` and the docs component pages that can fail a build; turn the live test brief in this report into a repeatable eval with a short rubric.
- **Done when:** a visual change to a control fails CI until the baseline is updated on purpose.
- **Effort:** M · **Suggested timing:** this quarter

### 12. Small governance and privacy cleanups
- **Station:** 7 · **Evidence:** `[verified]` #29 and #30 have no CHANGELOG line; #30 skipped the sitemap `lastmod`; `ship` is documented as 8 steps and has 11; `practices/shipping.mdx:105` publishes a local path naming the job hunt folder and resume file; SDS `SITE-CONTEXT.md:103` and `ContactForm.astro:15` say "SDC has no form components". Two consumers still write the deprecated `--ok` and `--err`.
- **First move:** replace the local path with a placeholder, add the two changelog lines, correct the `ship` step list, update the SDS context, and move SDS and Designer Job Search to the new status names before 03.00.00.
- **Done when:** the public docs hold no local paths, and no consumer uses a deprecated name.
- **Effort:** S · **Suggested timing:** before the next deploy

---

## 🔧 Access upgrades (sharper next inspection)

- **Open "SDC Fall of 2026" in Figma desktop with the Console bridge before the next inspection.** This pass had only the official MCP, so auto-layout, unbound values, the SDS mode values, aliases, version history and a whole-file variable count were out of reach.
- **Keep a consumer list** (item 5) so the next inspection measures the same set instead of discovering consumers by grep.
- **Give the DS skills an SDC profile**, so vibe-killer, ds-ascii and ds-adoption-plan start from the system instead of intake.

## 🟢 Keeping the greens green

No station is green this pass. The habits that were keeping 1, 3, 7 and 8 green still hold (CI on every PR, enforced protection, frequent inspections); what tipped them is consumer growth and unreleased work. Items 1, 2 and 5 are the fastest route back to green for 3, 7 and 8.

## Cadence

- Re-inspect (deep, all stations): 2026-12-06, or right after 02.05.00 merges.
- Everyday checks to wire into CI now: `sds` in the Q&A themes; `npm run sync -- --check`; each consumer's own check on a schedule; the "no `sdc-` class outside Site.astro" rule.
- Owner of this work order: Steve · Review: at the start of the next SDC working session.
