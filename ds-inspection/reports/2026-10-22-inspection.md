# Design system inspection — Steven Design Co. 2.0
_Inspected: 2026-10-22 · Technician: Claude Opus 5 (Claude Code) · Mode 3, partial re-inspection of stations 1, 2, 5, 6, 7, 9 · Previous: 2026-10-08 (full pass, 81/100)_

Work order: [`ds-inspection/work-orders/2026-10-22-work-order.md`](../work-orders/2026-10-22-work-order.md)

---

## Inspection sheet

| # | Station | Light | 2026-10-08 | 2026-10-22 |
|---|---|---|---|---|
| 1 | Coverage & gaps | GREEN | 8 | **8** |
| 2 | Best practices | GREEN | 8 | **8** |
| 3 | Accessibility | — | 9 | not inspected |
| 4 | Shared language | — | 8 | not inspected |
| 5 | Testing & validation | GREEN | 8 | **8** |
| 6 | Orchestration | YELLOW | 7 | **6** |
| 7 | Governance & version control | YELLOW | 8 | **6** |
| 8 | Feedback & adoption | — | 8 | not inspected |
| 9 | Machine-readable docs & context | GREEN | 9 | **8** |
| 10 | Agent access | — | 8 | not inspected |
| | **Six stations inspected** | | **48/60** | **44/60** |

No /100 this run. Four stations were not inspected, so the 81/100 from 2026-10-08 is the last whole-system number and it is now stale. No reds, two yellows, four held. The shape of a system that is well built and two weeks behind its own paperwork.

**A conversation starter, not a grade.**

---

## How to read the four-point drop

**This section was rewritten after Steve challenged the first version of it.** The first draft of this report scored six stations down for a total of eleven points and attributed roughly seven of those to genuine regression. He pushed back with the obvious question: nothing has shipped since 8 October except the status palette, so where did eleven points go? He was right, and checking it against git changed four of the six scores.

**What is actually new since 2026-10-08**, and therefore scoreable as regression:

| Finding | Station | New? |
|---|---|---|
| Theme behaviour stale in two places | 6 | **Yes** — the change is from today |
| "Sixteen colour primitives", now 28, in two places | 6 and 9 | **Yes** — the palette made it wrong |
| Status palette absent from all five AI-facing surfaces | 9 | **Yes** |
| No version bump, no changelog entry, five commits on one PR | 7 | **Yes** |
| Status palette has no consumer and no control contract | 1 | **Yes**, and see below |

**What is not new**, verified against the tree at the 02.00.00 release:

| Finding | Station | Evidence it predates this period |
|---|---|---|
| `--sdc-text-mute` documented as `#5A6160` | 6 | Present in `docs/DESIGN-SYSTEM.md:52` and `components/links.mdx` at the release commit. The token changed on 2026-10-05. **Seventeen days old and missed by two inspections.** |
| `<CaseSection alt>` and `inner={false}` in the Section samples | 2 | Both present at the release commit |
| 44 British spellings | 2 | Present at the release commit |
| 19 physical directional properties in `Site.astro` | 2 | **19 in `origin/dev`, 19 on this branch.** Identical. The three new commits added none. The first draft of this report claimed 0 before and 33 now, which was a measurement error: a wider pattern run over a whole directory compared against a single file. |
| No visual regression baseline, no behaviour tests, no evals | 5 | Unchanged, and explicitly acknowledged in the 2026-10-08 record |

**So the corrected reading.** Stations 2 and 5 found nothing that got worse: station 5 in fact gained a ninth check, `deck-fit`, since the last pass. Both hold at 8. Station 1 holds at 8 because coverage did not shrink — thirty well-built tokens arrived; the finding is that they have nowhere to live, which is recorded without a deduction. Station 9 drops one point, not three: the palette really is missing from every AI-facing surface, while the rest of the earlier gap was the generation test that the 2026-10-08 run never ran. That 9 should have been recorded as a provisional green under the station's own rule, "no generation test, no confirmed green." Stations 6 and 7 carry the real movement.

**Four points, not eleven. Two stations moved, not six.** The error was mine and it ran in one direction: finding an old defect for the first time and scoring it as though it had just appeared. That is the fourth variant of the same self-marking failure this inspector has now logged, and Steve caught this one the way he caught the last three.

**One finding survived the challenge.** `docs/DESIGN-SYSTEM.md:16` says "Bump it in the same pull request as the change," so the version bump on PR #21 is due now rather than at merge. I began to concede that item and the rule does not support the concession.

**Not measured at all this run.** The design library. Both Figma bridges were probed and neither could read it (see Evidence basis). Every design-side statement below is `[reported]`, carried from 2026-10-08.

---

## The three findings that carry the most weight

**1. A documented accessibility calculation rests on a colour that has not shipped for seventeen days.** (Not new. Verified present at the 02.00.00 release and missed by two inspections, so it costs station 6 nothing this run and still belongs at the top of the work order.) `docs/DESIGN-SYSTEM.md:52` lists `--sdc-text-mute` light as `#5A6160` and claims "5.9 to 1 on paper." The shipping value is `#545B5A`. The token's own `$description` records why it changed: "Darkened from #5A6160 on 2026-10-05 so it clears 4.5:1 on surface-2." Worse, `components/links.mdx:38` uses the same stale `#5A6160` inside its **1.02:1** contrast argument, which is the reasoning behind the hand-written `link-distinction` check. The conclusion is still right. The arithmetic behind it is computed from a value the site does not use. `[verified]`

**2. The status palette has thirty tokens, zero consumers, and no control layer to put them on.** Shipped today: 12 `signal` primitives and 6 semantic tokens, swatched in the Storybook and documented well on `foundations/colour.mdx`. Uses in `src/` outside their own definitions: **zero**. There is no input, select, checkbox, form, validation, badge or alert in the 16-component library, and no `<form>`, `<input>`, `<select>` or `<textarea>` anywhere on the site. The generation test put a number on the consequence: asked to build a settings form, an agent hardcoded seven values, and six of the seven trace to one missing thing — a control contract. No control height, no border width, no interior padding, no label treatment, no disabled or invalid state, no required-field convention. `[verified]`

**3. The written rules are good and the latest change did not follow them, three ways at once.** The release rules at `/docs/start/releases/` are explicit: a new token is a minor bump, and so is "a visual change that keeps every name." Thirty new tokens landed, plus a change that stopped the site consulting `prefers-color-scheme`. `sdc-version.json` still reads `02.00.00`, released 2026-10-08, so the live `<meta name="sdc-version">` under-reports what is deployed. The changelog's newest dated entry is October 7, missing the 9 October deck-regression fix, which visitors saw. And all of it rides on PR #21, a pull request titled and described as Storybook analytics, now carrying five commits including a user-visible theme change, through one required check. This is the failure mode station 7 names: a governance doc describing an ideal while the work happens differently. `[verified]`

---

## Evidence basis

| Asset | Access | How it was established |
|---|---|---|
| Code library | **live** | `src/components/ui/` (16 files), `src/layouts/Site.astro`, `src/styles/tokens/`, `qa/`. Every count in this report was measured with grep or node in this session, not recalled. |
| Docs | **live** | 39 source pages read; `npm run build` run in `docs-site/` and diffed against committed `public/docs`. |
| Process | **live** | `gh`: branch protection, PR list, merge dates, the five commits on PR #21, CI step names. |
| Design library | **DOWN** | Probed twice. Figma Console MCP `figma_get_status` with `probe:true`: server up on 9223, `"No active file connected"`. Official Figma MCP: `get_metadata` listed all five pages, then `get_variable_defs` returned `"You currently have nothing selected."` |
| Generation test | **run** | One subagent, given only the public context surfaces and explicitly denied `src/layouts/`, `src/components/ui/`, `src/pages/` and `storybook/`. Asked for a settings form, inline status messages and a tab set. Self-rated 4/10. All seven of its factual claims were independently re-verified before entering this report; all seven held. |

**What this means.** Station 2's design-craft half and station 6's token diff were not run. Opening the Desktop Bridge plugin in Figma, or selecting any layer for the official MCP, would unlock both.

**Self-marking.** The inspector built most of what is graded here and wrote two of the five commits on the pull request it is grading. Steve chose "counts over judgements" for this run. Every number names its scope. **Three measurement errors occurred in this run. Two were caught before the report; the third reached Steve and he caught it** — the first draft scored six stations down eleven points by treating newly-found old defects as new regressions, and claimed physical directional properties went from 0 to 33 when the real figure is 19 on both sides. See "How to read the four-point drop". The two caught earlier were the same mistake this inspector has now made four times: searching one spelling or one file and writing the claim broadly. A search for `--sdc-status*` concluded the palette did not exist, when it ships as `--sdc-error`, `--sdc-warning` and `--sdc-success`. A staples check read only `Site.astro` and missed 30 lines of dialog CSS in the page file. Both were re-measured across `src/` before scoring. One finding from the generation test was also dropped after checking: `CHANGELOG.md:68` describes OS-following behaviour, but it sits inside a dated October 1 entry, so it is history, not drift.

---

## Station records

### Station 1 — Coverage & gaps: GREEN (8/10, held)
- Inventory: **12 in design** `[reported, 2026-10-08]` · **16 in code** `[verified]` · **39 docs pages, 40 built** `[verified]`
- Tokens: **116 unique `--sdc-*`** names, **28 colour primitives** (brand 6, ink 6, paper 4, signal 12), two tiers, all five categories tokenized: colour, type, spacing, radius, elevation `[verified]`
- Evidence level: code `live` · docs `live` · design `reported`
- Findings:
  - `[verified]` **Thirty status tokens with zero consumers.** Measured across `src/`: `--sdc-error`, `--sdc-warning`, `--sdc-success` and their tints appear only at `Site.astro:465-470` and `:568-571`, which are their own definitions in the two theme blocks. No component uses them. No `<form>`, `<input>`, `<select>` or `<textarea>` exists anywhere in `src/`.
  - `[verified]` **Staples diff, measured across all of `src/`.** Component: button, card, alert/toast (Note), pager. CSS only: dialog (30 references, in the page not the layout), navigation (48). Absent: text input, select, checkbox, form and validation, table, tabs, accordion, badge, avatar, breadcrumb, tooltip, empty and error states. Most of those absences match zero product need — this is an eleven-route portfolio with no forms — so the gap that matters is not the list, it is that the newest tokens point at the part of the list that is empty.
  - `[verified]` **The missing layer is one below the missing components.** From the generation test: six of seven hardcoded values trace to the absence of a control contract, not to the absence of a form component. Control height (`44px` invented), border width (`1px`), active underline (`2px`), label weight (`600`), checkbox box (`20px`).
  - `[verified]` Distribution is real for one consumer: a published Figma library, a committed Storybook build at `/labs/sdc-storybook/`, `custom-elements.json` served at the root. No npm package, which is a documented deviation for an in-repo system.
- Not inspected: the design library's component and variant depth.
- Deviations noted: no package; no form components on a site with no forms; `href` required on Button because "every button on this site is a link" (`components/button.mdx:47`), which is deliberate and does mean the palette's natural use cannot be built without new work.
- First move: write the control contract before the components. Height, border width, padding, label, disabled, invalid, required.

### Station 2 — Best practices: GREEN (8/10, held — every finding below predates 2026-10-08)
- Sampled: **all 16 components** (not a sample), `src/layouts/Site.astro`, `src/pages/`, 6 docs pages read end to end
- Evidence level: code `live` · docs `live` · design `not inspected`
- Findings:
  - `[verified]` **Component craft is genuinely strong.** Across all 16: **0 raw hex**, **2 raw px** (`StatList.astro:31` a 1px hairline, `:35` a 700px breakpoint, neither with a token to use). Every component root is a semantic element or a declared custom element: `ul`, `a`, `dl`, `p`, `blockquote`, `sdc-*`. No div soup anywhere.
  - `[verified]` **Two of two code samples on the Section page use prop names that no longer exist.** `components/section.mdx:30` shows `<CaseSection alt>`; the prop table nine lines down documents `tone`. `:34` shows `inner={false}`; the table documents `layout`. `start/naming.mdx:70` records the `alt` to `tone` rename. The samples were not updated. This is the most-used container in the system and both of its examples are wrong.
  - `[verified]` **Logical properties are absent outside the component library, and this is not new.** Counting `margin-*` and `padding-*` directional declarations: `src/layouts/Site.astro` **19 physical, 0 logical**; `src/pages` 30 physical, 4 logical; the component library 1 physical, 0 logical. Including `left:` and `right:` positioning raises `Site.astro` to 33, which is the figure an earlier draft of this report wrongly presented as growth from 0. The count is **19 in `origin/dev` and 19 on this branch**, and the three recent commits added none. RTL and vertical writing modes would break. Low consequence for an English-only site, and it is not recorded as an intentional deviation anywhere.
  - `[verified]` **44 British spellings in the docs** against the house American English rule: colour 24, colours 8, behaviour 3, grey 2, plus recognise, recognisable, emphasise, coloured. One is a page title.
  - `[verified]` Docs reasoning is above the industry bar where it counts. The independent generation agent, with no stake, called `practices/degradation.mdx` and `foundations/focus.mdx` "better than most published design systems," and named `start/page-shell.mdx:50-97` a complete working composition.
- Not inspected: the Figma library's auto-layout, layer naming, instance attachment and file hierarchy. This is the half the station weights for format-specific craft and the bridge was down.
- First move: fix the two Section code samples. They are four characters each and they are actively wrong.

### Station 5 — Testing & validation: GREEN (8/10, held — nothing changed, and a ninth check was added)
- Inspected: `qa/` (9 checks), `.github/workflows/qa.yml` (14 steps), `qa/checks/pixel.mjs`, `scripts/`, `storybook/package.json`, `package.json`
- Evidence level: code `live` · process `live`
- Findings:
  - `[verified]` **The gating suite is unusually deep for a solo system.** 9 checks, 8 gating in CI: reflow and target size (11 pages × 11 widths), axe-core (11 pages + 5 dialogs), dialog including keyboard, text spacing, forced colours, inline link distinction, text contrast (2 themes × 11 pages), deck fit with motion on. Real browser, warmed twice. Five more deterministic gates around it: manifest in step, naming convention, tokens in step, never-say, docs build, docs in step.
  - `[verified]` **Drift detection proven to fail when it should.** I perturbed `signal.grass` to `#000001`: `tokens:check` exited **1** with "Tokens are out of date." Restored: exited **0**. Tree clean. This is the house rule about proving a check can fail, and this check passes it.
  - `[verified]` **No visual regression baseline.** `qa/checks/pixel.mjs` shoots `PROD` and compares a dev server against the live site. There is no committed baseline directory. So it cannot catch a regression that has already shipped, and it goes green the moment the bad version is live. Excluded from CI by design and documented, which is honest, but it means the token system has no regression net.
  - `[verified]` **Nothing asserts component behaviour.** No test or spec files exist. The four `storybook/stories/*.js` files are documentation. No keyboard interaction, state change or edge case is asserted for any of the 16 components.
  - `[verified]` **No evals, in a workflow where AI writes most of the code.** The 2026-10-08 report argued evals "exist in substance" via the PostToolUse hook, the naming validator and the never-say check. Those are real and they do test agent output against the system's rules, so they earn credit. They are rule-matchers, not rubric-scored or judge-based evaluation, and nothing reads a design file.
  - `[verified]` **The suite had a systemic blind spot and it shipped.** Every check ran with `reducedMotion: 'reduce'`, which pinned both home decks in their static fallback, so seven checks had never seen the animated deck. The 02.00.00 regression reached production through all of them. A `deck-fit` check with `motion: true` now exists. Worth crediting as a repair and worth recording as evidence that the coverage model, not one check, was the gap.
- Not inspected: design-side linting.
- Deviations noted: `pixel` outside CI by design.
- First move: commit a visual baseline so the pixel check can gate instead of report.

### Station 6 — Orchestration: YELLOW (6/10, down from 7)
- Diffed: code tokens against the DTCG source; docs against code on theme behaviour, primitive counts, one token value and two prop names; committed `public/docs` against a fresh build
- Token diff: **not run on the design side — no design-library access.** Code side: 28 primitives in `primitives.tokens.json`, generated into `Site.astro` and gated by `tokens:check`, verified in step.
- Evidence level: code `live` · docs `live` · design `DOWN`
- Findings:
  - `[verified]` **The declared source of truth is the only unchecked link in the chain.** `primitives.tokens.json` states "Figma is the source of truth" and carries the file key in `$extensions`. Nothing reads Figma: `grep -rln figma scripts/*.mjs` returns nothing. The second half (JSON to CSS) is generated and CI-gated. The first half is an agent with a plugin, by hand. The Variables REST API is Enterprise-only on this plan, so this is a constraint, not neglect — but it means today's commit message claim, "in Figma, tokens, Storybook and docs," is verifiable on three legs and unverifiable on the one the file calls canonical.
  - `[verified]` **Three places describe theme behaviour and one is right.** The change today stopped consulting `prefers-color-scheme`. `foundations/colour.mdx:151` documents it properly, with the reasoning ("this palette is the brand and the other one is an accommodation"). `docs/DESIGN-SYSTEM.md:31` and `start/page-shell.mdx:27` both still say the site follows the operating system on a first visit.
  - `[verified]` **Two places say sixteen colour primitives. There are 28.** `docs/DESIGN-SYSTEM.md:169` and `foundations/colour.mdx:22`. Sixteen was right before today.
  - `[verified]` **The stale `#5A6160`**, in `docs/DESIGN-SYSTEM.md:52` and inside the contrast argument at `components/links.mdx:38`. See finding 1 above.
  - `[verified]` **Two wrong prop names in one six-line sample.** See station 2.
  - `[verified]` **`check:docs` passed through every one of these.** It verifies documentation was touched, not that it was made true. The theme change touched built docs HTML, so the gate was satisfied while two documentation statements went stale. This is the third inspection to record that and the first to catch it happening in the same change.
  - `[verified]` **One symptom turned off.** Committed `public/docs` is in step: a fresh `npm run build` in `docs-site/` produced **0 differing files** outside Pagefind, which rewrites its index names every build. Previously flagged twice.
  - `[verified]` `storybook/src/sdc.css` is generated from the running site only when somebody builds, and it carried the broken 02.00.00 rule for five days after production was fixed. Corrected on PR #21. No check guards it.
- Not inspected: design-to-code parity for any component; the two published Figma libraries.
- First move: the four drifts above are about twenty minutes of editing. Do them before the next deploy, then decide whether `check:docs` can be made to compare claims rather than timestamps.

### Station 7 — Governance & version control: YELLOW (6/10, down from 8)
- Inspected: `CONTRIBUTING.md` (125 lines), `CHANGELOG.md` (192), `.github/pull_request_template.md` (24, one file — an earlier case-insensitive file test wrongly suggested two), `/docs/start/releases/`, branch protection, the last six merged PRs, the five commits on PR #21
- Evidence level: process `live` · artifacts `live`
- Findings:
  - `[verified]` **The artifacts are all present, findable and well written.** The versioning table at `start/releases.mdx:23-27` is clearer than most teams manage, down to "The test is the consumer's code, not the visitor's eye."
  - `[verified]` **No version bump, against two of its own triggers.** The rules say minor goes up for "a new token" and for "a visual change that keeps every name." Thirty new tokens shipped and the theme default flipped. `sdc-version.json` still reads `02.00.00`, released `2026-10-08`. The live `<meta name="sdc-version">` therefore under-reports what is deployed, which defeats the stated purpose of putting it there: "one request tells you which version is in production."
  - `[verified]` **The changelog is two weeks and four changes behind.** Newest dated entry: **October 7**, plus the 02.00.00 header for October 8. Missing PR #19, the deck regression fix, which visitors experienced; PR #20; and today's palette and theme change. The file's own instruction, four lines in: "Add a line here when you ship something a visitor or a future maintainer would notice."
  - `[verified]` **Paper versus reality, the clearest exhibit in four inspections.** PR #21 carries five commits: the `node_modules` symlink removal, Storybook analytics, the status palette, "Light is the default theme, and the operating system no longer overrides it," and a Storybook colour page edit. Its title and body cover the first two. A design-system feature and a user-visible behaviour change are riding inside a pull request about analytics, through a single required check, with no changelog line and no version bump.
  - `[verified]` Branch protection is real: one required check, strict mode, force pushes blocked, admins deliberately not enforced.
  - `[verified]` Tags are clean so far: `sdc-01.00.00`, `sdc-02.00.00`, each on the commit that reached production, as the rules require.
- Not inspected: no issue tracker exists to audit, which is reasonable for a team of one.
- Deviations noted: admins not enforced; no tracker; no support channel.
- First move: split PR #21. The palette and the theme change are a release; the symlink and the analytics are housekeeping.

### Station 9 — Machine-readable docs & context: GREEN (8/10, down from 9; the prior 9 was a provisional green)
- Inventoried: `custom-elements.json` (generated, 8 tag names, gated by `manifest:check`), `primitives.tokens.json` (DTCG), 39 docs pages, `docs/DESIGN-SYSTEM.md`, `docs/ARCHITECTURE.md`, `SITE-CONTEXT.md`, `never-say.txt`, `public/llms.txt`
- **Generation test: run.** Self-rated **4/10**. All seven of its factual claims independently re-verified; all seven held.
- Evidence level: code `live` · docs `live` · test `live`
- Findings:
  - `[verified]` **The generated layer is excellent and the test confirmed it.** `custom-elements.json` is a real manifest, generated from `@element` tags and `Props` interfaces, served at the root, drift-checked in CI. Props tables on 16 of 16 components. The agent rated the same context surface **9/10** for building a case study page, which is what this system is actually for, and named `start/page-shell.mdx:50-97` a complete worked composition.
  - `[verified]` **None of the five AI-facing surfaces know the status palette exists.** Zero mentions of `sdc-error`, `sdc-success`, `sdc-warning` or `signal` in `public/llms.txt`, `CLAUDE.md`, `SITE-CONTEXT.md`, `docs/DESIGN-SYSTEM.md` or `custom-elements.json`. `docs/DESIGN-SYSTEM.md` opens by saying "When the two disagree, the code wins, so fix this page." It has not been fixed, so two surfaces an agent is told to read now disagree about whether the system has status colours at all.
  - `[verified]` **Two of the six status token names are never written down.** `foundations/colour.mdx:104` names `--sdc-error-tint` and then says "and the other two." `--sdc-success-tint` and `--sdc-warning-tint` appear **zero** times across the whole public context layer and four times in `Site.astro`. The agent inferred both. The same page warns at `:178` that "a typo in a `var()` is silent: it falls through to the fallback, or to nothing."
  - `[verified]` **The palette has contrast maths and no messaging pattern.** The usage guidance is one line: "three things the system has to say: something failed, something needs attention, something worked." That maps colours to adjectives. Nothing says whether a failed save is error or warning, whether a field message differs from a form-level one, what ARIA role a message takes, or whether it gets a border, a heading or a dismiss. The behavioural guidance underneath it is genuinely good: never white on the orange, nothing sits on the green, the light theme resolves success and warning to deeper forms.
  - `[verified]` **Governance correctly blocked the right move, which is both a credit and a wall.** The agent's instinct was `<sdc-field>`, following `start/naming.mdx:15-25`. Two lines stopped it: `check:names` fails on an undeclared `sdc-*` tag, and a page's own `<style>` cannot reach a custom element. So an agent restricted to the context surface cannot extend the system, only invent page-local classes and ask for promotion. That is the convention working as designed, and it means the context surface alone can never satisfy the global rule "if the system has no component for it, create one on the system."
  - `[verified]` The richest context file, `CLAUDE.md`, is gitignored by design, so a cloner or outside agent receives the thinner public layer: `llms.txt`, `custom-elements.json`, the two `docs/` references, `SITE-CONTEXT.md`, `never-say.txt` and the docs site.
  - `[verified]` `llms.txt` is hand-written with no generator and no check. It serves the portfolio-crawler purpose well and is not a design-system surface, which is a fair division rather than a gap.
- Not inspected: Figma component descriptions as machine-readable metadata.
- First move: spell out `--sdc-success-tint` and `--sdc-warning-tint`, and add the status row to `docs/DESIGN-SYSTEM.md`'s colour table. Then write the messaging pattern.

---

## Cadence

- **Before the next deploy:** work order items 1 to 4. All are small and three are factually wrong statements in shipped documentation.
- **Next partial:** stations 6 and 9, after the drift fixes and a version bump, to confirm they moved. Stations 2 and 6 also deserve a re-run with the Desktop Bridge open, since their design halves went uninspected today.
- **Next full ten-station pass:** 2027-01-05, as scheduled on 2026-10-08. The 81/100 stands as the last whole-system figure and should not be quoted after today without this report attached.
- **Worth wiring into CI now:** a count check. Three of the four drifts found today are numbers in prose that a script could verify against the code, the same way `tokens:check` verifies values. The pattern across four inspections is consistent: the generated layers stay true and the hand-written ones rot.
