# Work Order — Steven Design Co. Design System 2.0

_From inspection: [`reports/2026-10-22-inspection.md`](../reports/2026-10-22-inspection.md) · Written: 2026-10-22_

Reds get fixed now. Yellows get scheduled. Every item cites its station and evidence. Steve owns prioritization; this is the technician's recommendation.

**No reds this run.** Two yellow stations (6 and 7); stations 1, 2, 5 and 9 held. The twelve items below are not ranked by which station moved — several are long-standing defects that two earlier inspections missed, and they are worth fixing regardless of what they cost in points. Items 1 to 4 are not projects — they are four factually wrong statements in shipped documentation and about twenty minutes of editing between them. They are listed first because three of them are the kind of wrong that gets copied.

---

## 🔴 Fix now (reds)

None. Nothing in the six inspected stations is broken or missing.

The nearest thing to a red is item 1 below. It is a yellow because the conclusion it supports is still correct and the site still passes every contrast check. It is first on the list because a published accessibility calculation computed from a value that is not shipping is the sort of thing that is quoted back later.

---

## 🟡 Schedule (yellows)

### 1. The stale `#5A6160` inside a contrast argument
- **Station:** 6, Orchestration · **Evidence:** `[verified]` `docs/DESIGN-SYSTEM.md:52` lists `--sdc-text-mute` light as `#5A6160` with "5.9 to 1 on paper"; the shipping primitive `ink.charcoal-mute` is `#545B5A` and its own `$description` records "Darkened from #5A6160 on 2026-10-05". `components/links.mdx:38` uses the same stale hex inside its **1.02:1** calculation.
- **Age:** not new. Verified present at the 02.00.00 release commit; the token changed on 2026-10-05. Two inspections missed it.
- **Why it's first:** that 1.02:1 figure is the stated reasoning behind the hand-written `link-distinction` check. The conclusion holds. The arithmetic behind it does not, and it is the kind of number that gets reused.
- **First move:** replace both hexes with `#545B5A` and recompute the two ratios against the shipping value.
- **AI assist:** have the agent recompute both ratios and check whether any other published ratio in the docs was derived from a primitive that has since changed. Steve confirms the recomputed numbers before they ship.
- **Done when:** no occurrence of `#5A6160` remains outside a dated changelog entry or a token `$description` recording the change.
- **Effort:** S

### 2. Two of two code samples on the Section page use removed prop names
- **Station:** 2, Best practices · **Evidence:** `[verified]` `components/section.mdx:30` shows `<CaseSection alt>` while the prop table at `:41` documents `tone`; `:34` shows `inner={false}` while the table at `:45` documents `layout`. The `alt` to `tone` rename is recorded at `start/naming.mdx:70`.
- **Age:** not new. Both wrong prop names verified present at the 02.00.00 release commit.
- **Why it matters:** Section is the most-used container in the system, and both of its examples are copy-paste traps. An agent or a person following the sample gets props that no longer exist.
- **First move:** `alt` becomes `tone="alt"`, `inner={false}` becomes `layout={false}`.
- **AI assist:** fully automatable, then sweep every other docs code sample against the current `Props` interfaces.
- **Done when:** every prop name in every docs code sample resolves against `custom-elements.json`.
- **Effort:** S

### 3. Theme behaviour: three descriptions, one correct
- **Station:** 6, Orchestration · **Evidence:** `[verified]` the 2026-10-22 change stopped consulting `prefers-color-scheme`. `foundations/colour.mdx:151` documents it correctly and well. `docs/DESIGN-SYSTEM.md:31` and `start/page-shell.mdx:27` still say the site follows the operating system on a first visit.
- **First move:** rewrite both stale statements, and cross-link them to `colour.mdx:151` rather than restating the reasoning a third time.
- **Done when:** one place explains the behaviour and the other two point at it.
- **Effort:** S · **Suggested timing:** before the next deploy, with items 1, 2 and 4

### 4. Stale counts in the hand-written reference docs
- **Station:** 6 and 9 · **Evidence:** `[verified]` "sixteen colour primitives" at `docs/DESIGN-SYSTEM.md:169` and `foundations/colour.mdx:22`, actual **28**. "14 components" at `docs/ARCHITECTURE.md:149`, actual **16**. "seven-check Q&A" at `CONTRIBUTING.md:70`, actual **9 checks, 8 gating**.
- **First move:** correct all four. Then consider whether they should be numbers in prose at all.
- **AI assist:** the real fix is a script. Three of these four are counts a node one-liner can derive from `primitives.tokens.json`, `src/components/ui/` and `qa/checks/`, and check the same way `tokens:check` checks values. That turns a recurring class of drift into a CI failure.
- **Done when:** a `check:counts` script exists and runs in CI, or the counts are gone from prose.
- **Effort:** S to correct, M to automate · **Suggested timing:** correct now, automate this month

### 5. Split PR #21 and release what is in it
- **Station:** 7, Governance · **Evidence:** `[verified]` five commits on a pull request titled and described as Storybook analytics: the symlink removal, the analytics, the status palette, "Light is the default theme, and the operating system no longer overrides it," and a Storybook colour edit. No version bump, no changelog line.
- **Why it matters:** per the project's own rules at `start/releases.mdx:23-27`, a new token is a minor bump and so is "a visual change that keeps every name." Thirty new tokens and a theme flip are two separate triggers. `sdc-version.json` still reads `02.00.00` released 2026-10-08, so the live `<meta name="sdc-version">` under-reports what is deployed, which defeats the reason that tag exists.
- **First move:** housekeeping (symlink, analytics) ships as one PR. The palette and the theme change ship as **02.01.00**, with a changelog entry and a `sdc-02.01.00` tag on the commit that reaches production.
- **AI assist:** the agent can draft the changelog entries and the release-log row. Whether the theme flip is a minor or deserves louder communication is Steve's call, not the agent's.
- **Done when:** `sdc-version.json` matches what is deployed, `/docs/start/releases/` has the row, and `CHANGELOG.md` has dated entries for October 9 and October 22.
- **Effort:** M · **Suggested timing:** before merging #21

### 6. The changelog is two weeks and four changes behind
- **Station:** 7, Governance · **Evidence:** `[verified]` newest dated entry **October 7**, plus the 02.00.00 header for October 8. Missing PR #19 (the deck regression fix, which visitors experienced), PR #20, and today's two changes. The file's own instruction: "Add a line here when you ship something a visitor or a future maintainer would notice."
- **First move:** three entries, from the git log.
- **Done when:** the newest dated entry matches the newest commit on `dev` that a visitor would notice.
- **Effort:** S · **Suggested timing:** with item 5

### 7. The status palette has no control layer to live on
- **Station:** 1, Coverage · **Evidence:** `[verified]` 30 tokens, zero uses in `src/` outside their own definitions at `Site.astro:465-470` and `:568-571`. No input, select, checkbox, form, validation, badge or alert in the 16-component library, and no `<form>`, `<input>`, `<select>` or `<textarea>` anywhere on the site. The generation test hardcoded seven values, six of which trace to this.
- **Why it matters:** the missing piece is one layer below the missing components. Control height, border width, interior padding, label treatment, disabled and invalid states, the required-field convention, and what the focus ring does to a filled control. Without that contract, every form-shaped thing anyone builds will invent its own.
- **First move:** write the control contract as a foundations page before building any component. Then the messaging pattern: which semantic situation takes which colour, what role a message carries, whether it gets a border or a heading.
- **AI assist:** the agent can draft both pages from the existing contrast work and propose the tokens. Whether this system should have forms at all is Steve's call — there is currently nothing on the site that needs one.
- **Done when:** a control contract exists, or a note records that forms are deliberately out of scope and the palette is for future use.
- **Effort:** L · **Suggested timing:** this quarter, or close it as out of scope

### 8. Two status token names are never written down
- **Station:** 9, Machine-readable context · **Evidence:** `[verified]` `foundations/colour.mdx:104` names `--sdc-error-tint` then says "and the other two." `--sdc-success-tint` and `--sdc-warning-tint` appear **zero** times across the public context layer and four times in `Site.astro`. The same page warns at `:178` that a misspelled `var()` fails silently.
- **First move:** write both names out. Add the status row to the colour table in `docs/DESIGN-SYSTEM.md`, which currently has zero mentions of status while `colour.mdx` documents it fully.
- **Done when:** all six semantic status tokens are spelled out in at least one tracked, public surface.
- **Effort:** S · **Suggested timing:** with items 1 to 4

### 9. No visual regression baseline
- **Station:** 5, Testing · **Evidence:** `[verified]` `qa/checks/pixel.mjs` shoots `PROD` and compares a dev server against the live site; no baseline directory exists. It cannot catch a regression that has already shipped and goes green once the bad version is live. Excluded from CI by design.
- **Why it matters:** this is the net the token system does not have. The 02.00.00 deck regression is the worked example: it shipped, and once it was live the comparison had nothing to object to.
- **First move:** commit a baseline for the eleven pages at the key widths, from a known-good build, and let the check gate against that instead of against production.
- **AI assist:** generating and wiring the baseline is automatable. Approving each baseline image is a human judgement and should stay one.
- **Done when:** `pixel` runs in CI against a committed baseline.
- **Effort:** M · **Suggested timing:** before the next token change

### 10. Nothing asserts component behaviour, and nothing evaluates AI output
- **Station:** 5, Testing · **Evidence:** `[verified]` no test or spec files exist; the four `storybook/stories/*.js` files are documentation. No keyboard interaction, state change or edge case is asserted for any of the 16 components. The rule-matchers that do exist (the PostToolUse hook, `check-names`, `check-claims`) test agent output against the system's rules but are not rubric-scored or judge-based.
- **First move:** one rubric-based component eval, run before promoting any agent-written component: deterministic checks plus an LLM judge grounded in `docs/DESIGN-SYSTEM.md` and the naming convention, scored with a pass gate. Start with one component.
- **Done when:** one eval exists and has rejected something.
- **Effort:** M · **Suggested timing:** this quarter, alongside the course work

### 11. Logical properties absent outside the component library
- **Station:** 2, Best practices · **Evidence:** `[verified]` directional declarations: `src/components/ui` 1 physical / 0 logical, `src/layouts` **33 / 0**, `src/pages` 38 / 4.
- **First move:** either convert `Site.astro`, or record it in GARAGE.md as an intentional deviation for an English-only site. Right now it is neither.
- **Done when:** converted, or written down as a decision.
- **Effort:** M · **Suggested timing:** before next inspection, and a decision is an acceptable outcome

### 12. 44 British spellings against the house American English rule
- **Station:** 2, Best practices · **Evidence:** `[verified]` across `docs-site/src/content/docs/`: colour 24, colours 8, behaviour 3, grey 2, plus recognise, recognisable, emphasise, coloured. One is a page title.
- **First move:** decide whether the rule covers the documentation. If it does, this is a rename including a page slug, so it is a breaking docs URL change and wants doing once.
- **Done when:** consistent either way, and the choice is in GARAGE.md.
- **Effort:** M · **Suggested timing:** low priority, but pick one

---

## 🔧 Access upgrades (sharper next inspection)

1. **Open the Desktop Bridge plugin in Figma before the next run.** Both bridges were probed and neither could read the library: Figma Console MCP reported `"No active file connected"`, and the official Figma MCP returned `"You currently have nothing selected."` This cost station 6 its token diff and station 2 its entire design-craft half, and it means every design-side statement in today's report is carried over from 2026-10-08. One plugin launch, two stations unblocked. Cheapest item on this list by a wide margin.
2. **Connect a design-systems knowledge MCP** so station 1's industry benchmark becomes citable instead of recalled: `claude mcp add --transport http design-systems https://design-systems-mcp.southleft.com/mcp`.
3. **Consider whether the Figma half of the token pipeline can ever be checked** on this plan. The Variables REST API is Enterprise-only, so the honest options are a bridge-driven script Steve runs deliberately, or accepting that the declared source of truth is trust-based and saying so in the docs. Right now `primitives.tokens.json` claims Figma is canonical and nothing verifies it.

---

## 🟢 Keeping the greens green

Nothing scored green this run, but four things are working well enough that the habit protecting them is worth naming.

- **The code half of the token pipeline.** `tokens:check` was proven to fail on a perturbed value and pass when restored. Keep perturbing a token once per inspection; a gate nobody has seen fail is not a gate.
- **Component craft.** 0 raw hex and 2 raw px across 16 components, every root semantic or a declared custom element. The PostToolUse validator hook is what holds this. Leave it on.
- **The committed docs build.** Verified in step today, 0 differing files, after being flagged twice before. The habit is running `npm run build:docs` in the same commit as the source edit.
- **`custom-elements.json`.** Generated, gated, and the generation test confirmed it is genuinely useful to an agent. Keep `manifest:check` in CI.

---

## Cadence

- **Items 1 to 4 and 8:** before the next deploy. Five small edits, four of which are statements that are currently false.
- **Item 5:** before merging PR #21.
- **Re-inspect (partial, stations 6 and 9):** after the drift fixes and the version bump, to confirm they moved. Run stations 2 and 6 again with the Desktop Bridge open.
- **Re-inspect (deep, all ten):** 2027-01-05, as scheduled on 2026-10-08.
- **Wire into CI now:** a `check:counts` script. Three of the four drifts found today are numbers in prose that a script can derive from the code. Across four inspections the pattern has not changed: the generated layers stay true and the hand-written layers rot, so the fix is to generate or to check, not to remember.
- **Owner:** Steve. **Review:** at the next inspection, or when PR #21 is split.
