# Design system inspection — Steven Design Co. 2.0
_Inspected: 2026-10-26 · Technician: Claude Opus 5 (Claude Code) · Mode 1, full ten-station pass · Previous full pass: 2026-10-08 (81/100) · Previous partial: 2026-10-22 (44/60 over six stations)_

Work order: [`ds-inspection/work-orders/2026-10-26-work-order.md`](../work-orders/2026-10-26-work-order.md)

---

## Inspection sheet

| # | Station | Light | 2026-10-08 | 2026-10-22 | **2026-10-26** |
|---|---|---|---|---|---|
| 1 | Coverage & gaps | GREEN | 8 | 8 | **8** |
| 2 | Best practices | YELLOW | 8 | 8 | **7** |
| 3 | Accessibility | GREEN | 9 | — | **8** |
| 4 | Shared language | YELLOW | 8 | — | **6** |
| 5 | Testing & validation | YELLOW | 8 | 8 | **7** |
| 6 | Orchestration | YELLOW | 7 | 6 | **6** |
| 7 | Governance & version control | GREEN | 8 | 6 | **8** |
| 8 | Feedback & adoption | GREEN | 8 | — | **8** |
| 9 | Machine-readable docs & context | YELLOW | 9 | 8 | **5** |
| 10 | Agent access | YELLOW | 8 | — | **7** |
| | **Overall** | | **81/100** | | **70/100** |

**A conversation starter, not a grade.** No reds. Five greens, five yellows.

---

## The shape of this one

Eleven points below the last full pass, and the cause is unusually clean. **The system's code and design layers both got better. Its documentation layer got worse, in one release, and I am the one who broke it.**

In the four days before this inspection the system gained seven components, two tokens, a type treatment, a published Figma library and a CSS-sync guard. The measured foundations are the best they have ever been: 99% auto-layout and zero detached instances in Figma, 82 of 82 token names agreeing across design and code with identical values, twelve of twelve contrast pairs passing in both themes.

Over the same four days, **six documentation surfaces went stale against the code**, every one of them touched by the same work that outdated them. That is what stations 4, 9 and 10 are reporting.

---

## The three findings that carry the most weight

**1. The one file advertised as machine-readable covers a third of the library.** `custom-elements.json` describes **8 elements**; there are **23 components**. `npm run manifest:check` reports "in step (7 modules)" and passes, because it verifies the eight it knows about rather than whether the library is covered. `start/naming.mdx:34` sells this file as the thing "a tool or an agent can read without opening the source." An agent handed only it would conclude the system has no form controls. `[verified]`

**2. Six documentation surfaces disagree with the code, four days after the release that outdated them.** `docs/ARCHITECTURE.md:149` says "the 16 components" (there are 23, and I corrected that same line from 14 to 16 on 23 October, three days before it went stale again). `start/how-to-read.mdx:46-48` lists fourteen components by name and none of the seven new ones, on the page whose stated job is "saying which is which." `docs/DESIGN-SYSTEM.md` carries **zero** of the seven form components in its shared-components table and **neither** control token in its layout table, despite being edited for this release. `components/field.mdx:81-83` says "There is no disabled state... There is no error state yet either" twenty-five lines below a props table documenting both. `components/select.mdx:9-11` describes Select sitting inside a Field, and `Field.astro` has **zero** `<slot>` elements, so that composition cannot be built. `[verified]`

**3. The system can build a form it cannot submit.** `Button.astro` requires `href`, and `components/button.mdx:47` states "Every button on this site is a link." There is no submit control, no form wrapper, no form pattern page. The live agent test built eight of nine requested pieces on-system and then knowingly put `.sdc-btn sdc-btn--primary` on a native `<button type="submit">`, calling it "the single worst line in my output," because the system offers no third option. This is the documented Button deviation meeting the new control set, and the collision was not noticed when the set shipped. `[verified]`

---

## Evidence basis

| Asset | Access | How established |
|---|---|---|
| Design library | **LIVE** | Figma Console MCP, 5ms probe, file "SDC Fall of 2026". Whole-file walks: 18 components, 93 variables, 95 frames, 17 text styles, 0 paint styles, 0 effect styles. Contrast computed from the design variables in both modes. |
| Code library | live | 23 components, 118 tokens, every count measured in session with grep, node or python |
| Docs | live | 45 pages; built and diffed |
| Process | live | `gh`: 20 merged PRs, branch protection, 4 tags, CI step list |
| Live agent test | **run** | One subagent given only the seven public context surfaces, asked to build a contact page. Self-rated 6/10 buildability, 3/10 discoverability. **All eleven of its factual claims independently re-verified; all eleven held.** |
| Keyboard | **run** | Real Tab presses through the Choice chips in a browser |

**First inspection since 2026-10-08 with design-library access.** Stations 2, 3, 4 and 6 carried `[reported]` design-side claims for two runs. Every design-side statement here is `[verified]`.

**Self-marking.** The inspector built everything added in 02.02.00: all seven components, both control tokens, Display 3, the sync guard, the Figma Controls section. **Nine of the defects in this report are its own work from the preceding four days**, and they are flagged inline. Steve's standing instruction is counts over judgements.

**Two measurement errors caught inside this run**, both the inspector's recurring failure mode. A filename-conversion bug made seven components look undocumented when they are covered on their parent pages. A keyboard test reported seven unreachable controls that were Storybook's own hidden 0×0 chrome. Both were re-measured before scoring. This is the sixth and seventh instance logged.

---

## Station records

### Station 1 — Coverage & gaps: GREEN (8/10, held)
- Inventory: **18 design** `[verified]` · **23 code** `[verified]` · **25 component docs pages** of 45 `[verified]` · **118 `--sdc-*` tokens**, **93 Figma variables**
- Findings:
  - `[verified]` **The control set landed and is real.** Field with five states, Slider, Choice, Fieldset, Select, FormSummary, FormStatus, plus `--sdc-control-h` and `--sdc-control-border`. The gap the 2026-10-22 report called the system's largest is closed. All six status tokens now have consumers.
  - `[verified]` **The set is seven ninths of a form.** No submit control, no form wrapper, no form pattern page. See finding 3.
  - `[verified]` Still absent, measured against the staples list: badge, tabs, table, accordion, tooltip, breadcrumb, avatar, segmented control. Five documented patterns remain CSS-only with no component: dialog, links, navigation, progress dots, row list.
  - `[verified]` Distribution is real and now serves **two** consumers: a published Figma library, a committed Storybook, and a token-plus-component file sync into stevendesignservices.com.
- Deviations noted: Button requires `href` by design; no npm package.
- First move: a submit control, or a written decision that forms are out of scope and the control set is for consumers only.

### Station 2 — Best practices: YELLOW (7/10, down from 8)
- Sampled: **all 18 Figma components** (95 frames walked), all 23 code components, 8 docs pages read end to end
- Findings:
  - `[verified]` **Design craft is excellent, measured for the first time.** 94 of 95 frames use auto-layout (**99%**). **Zero detached instances.** 133 of 135 fills bound to variables (**99%**). **100%** of text sizes bound. 18 of 18 components carry descriptions.
  - `[verified]` **11 generic "Frame" layer names and 6 unbound corner radii.** Nine of the eleven are inside Field, Fieldset and Select; four of the six inside Field, Choice, Form summary and Form status. **Built by this inspector on 2026-10-24.**
  - `[verified]` **The three newest docs pages are the three thinnest.** `how-to-read.mdx:20-36` promises Anatomy, States, Accessibility, Content and Do/Don't where true. Fieldset, Select and Form messages carry none of the five. `form-messages.mdx` is the only component page in the system with **no props table at all**.
  - `[verified]` **12 British spellings, all in three pages I wrote.** `colour` and `grey` and `behaviour` across choice.mdx (5), form-messages.mdx (6), fieldset.mdx (1). **Zero in the other 42 pages.** Steve ran a US-spelling pass on 2026-10-22; this reintroduced the thing he had just removed, against `SITE-CONTEXT.md:33`.
  - `[verified]` `choice.mdx` and `slider.mdx` both declare `sidebar: order: 21`.
- Not inspected: the 1.0 Figma library.
- First move: the docs craft, not the design craft. The design side would score 9 alone.

### Station 3 — Accessibility: GREEN (8/10, down from 9)
- Sampled: contrast across **both themes computed from the design variables**; keyboard tested in a real browser on the new controls; 8 CI checks
- Findings:
  - `[verified]` **12 of 12 contrast pairs pass in Light and Dark, computed from the Figma variables.** Text on bg 10.94 and 21. Muted text on the deepest surface 4.70 and 5.29. All three status solids on bg between 5.67 and 10.63. Text on all three tints between 7.70 and 15.63. **The design-side and code-side numbers agree exactly**, so neither side is shipping a failure the other hides.
  - `[verified]` **The chip pattern survives a real keyboard.** Tab reaches each chip in order, the 3px ring lands on `label.sdc-choice` rather than the 1px input, the input is `opacity: 0` so it never draws a second ring, targets measure 44 tall, and Space toggles.
  - `[verified]` 8 checks gate in CI across 11 pages, 11 widths and 2 themes, including forced colors.
  - `[verified]` **Keyboard behaviour is asserted in exactly one check**, `qa/checks/dialog.mjs`. Nothing else in CI presses a key.
  - `[verified]` **10 of 18 Figma components carry no accessibility guidance** in their description, and there is no annotation kit. A designer cannot spec focus order or keyboard behaviour in the file.
  - `[verified]` 19 of 25 component docs pages carry accessibility guidance.
- First move: a11y notes on the ten silent Figma components, since the bridge is open.

### Station 4 — Shared language: YELLOW (6/10, down from 8)
- Swept: **all 67 prop names across 20 components**, all 93 Figma variable names against all 118 code tokens, Figma component property names
- Findings:
  - `[verified]` **`tone` means two different things in two components written on the same day.** `FormSummary` takes `'error' | 'warning' | 'success'`; `FormStatus` takes `'ok' | 'warning' | 'error'`. Same concept, same prop name, two vocabularies. **Introduced by this inspector on 2026-10-23.**
  - `[verified]` **The same concept is `error` in one control and `invalid` in another.** `Field` takes `error?: string` whose presence means invalid; `Select` takes `invalid?: boolean`. Same day, same inspector.
  - `[verified]` **`width` carries two unrelated meanings.** A pixel number in `CaseFigure`, the literal `'narrow'` in `CaseSection` and `TextPassage`. Predates this period.
  - `[verified]` **Figma property casing is inconsistent.** Button and Pager use `Style`, `State`, `Direction`; the six new sets use lowercase `state` and `tone`. Mine.
  - `[verified]` Docs page names diverge from component names: `case-study-block` for `CaseBlock`, `section` for `CaseSection`.
  - `[verified]` The guardrail works where it reaches: `check:names` passes on 8 elements and 51 classes, and it caught a prop named `title` colliding with an HTML global attribute during this release. **It does not compare prop vocabularies across components**, which is where all three collisions live.
- First move: pick one word for each of the three pairs, then extend `check:names` to flag a shared prop name whose value sets disagree.

### Station 5 — Testing & validation: YELLOW (7/10, down from 8)
- Inspected: 9 checks, 14 CI steps, `ship`, `sync-css.mjs`, the whole repo for test files
- Findings:
  - `[verified]` The gating suite is deep for a solo system: 8 checks, real browser, warmed twice, 11 pages × 11 widths, both themes, motion on for the decks.
  - `[verified]` **The sync guard does not run in CI, and `ship` does not build the Storybook.** `grep -c "sync\|storybook" .github/workflows/qa.yml` returns **0**. The guard added on 2026-10-24 fires only when somebody runs the sync by hand, so the stale `sdc.css` it was built to prevent can still ship. **It protects the operation, not the artifact.** Mine.
  - `[verified]` **Zero test files.** No behaviour is asserted for any of the 23 components beyond the dialog's keyboard check.
  - `[verified]` **No visual regression baseline.** `pixel.mjs` still compares a dev server against live production, so it cannot catch a regression that already shipped.
  - `[verified]` No evals. The rule-matchers (`check-names`, `check-claims`, the PostToolUse hook) test agent output against the system's rules and earn credit, but nothing is rubric-scored or judge-based.
- **Calibration note:** this station scored 8 on 2026-10-08 and was corrected back to 8 on 2026-10-22 on the grounds that nothing had changed. Against the written anchors, green requires behaviour tests, gating visual regression and evals, and two of those three are still absent. 7 is the anchored score and the earlier 8s were generous.
- First move: add `npm run sync -- --check` to `ship` and to CI. The guard exists; it is three lines from being enforced.

### Station 6 — Orchestration: YELLOW (6/10, held)
- Diffed: **93 Figma variables against 118 code tokens on names, values and set membership**; 18 design components against 23 code components; six documentation surfaces against the code
- **Token diff, run for the first time:** 82 names shared · **values identical**, verified by computing contrast from both sides independently · **design-only: zero** · code-only: 36, of which **28 are the `-rgb` triples the generator derives** and cannot be a Figma variable. The genuine gap is **8**: six shadows, `--sdc-scrim`, `--sdc-texture-size`.
- Findings:
  - `[verified]` **The token pipeline is in the best state it has been.** Nothing exists in Figma that is missing from code. `tokens:check` gates the generated half in CI. The one name divergence, Figma `nav-height` to `--sdc-nav-h`, is carried explicitly by code syntax.
  - `[verified]` **The eight code-only tokens are exactly the shadows, and Figma has zero effect styles.** Elevation has no design-side representation at all. Long-standing.
  - `[verified]` **Six documentation surfaces are out of step with the code.** See finding 2. All six were outdated by the release they describe, four days ago.
  - `[verified]` **`check:docs` passed through every one of them.** It verifies documentation was touched, not that it was made true. This is the fourth inspection to record that and the second to catch it happening in the same change.
  - `[verified]` **Only 6 of 18 Figma components name their code counterpart** in the description, and those six are the ones this inspector wrote. With no Code Connect seat, the description is the only design-to-code bridge, so twelve components offer none.
- First move: the six stale surfaces, then decide whether `check:docs` can compare claims rather than timestamps.

### Station 7 — Governance & version control: GREEN (8/10, up from 6)
- Inspected: CONTRIBUTING (125 lines), CHANGELOG (241), the release rules, branch protection, the last three PRs, all four tags
- Findings:
  - `[verified]` **The version collision was found and resolved correctly.** 02.01.00 is the status palette and the theme default, released 22 October; 02.02.00 is the control set, released 26 October. Two numbers, two states, no overlap.
  - `[verified]` **Four releases, four tags**, each on a commit whose tree reports that version. `sdc-02.01.00` deliberately sits on the `#22` merge rather than the October 22 commit, because that is the first tree that says 02.01.00, and the tag message records why.
  - `[verified]` **The rules were broken once and followed twice.** #21 shipped a release with no version bump; #22 and #23 both bumped in the same PR as the change, as `docs/DESIGN-SYSTEM.md:16` requires.
  - `[verified]` The changelog's newest dated entry is the day of the newest release. It was two weeks behind on 2026-10-22.
  - `[verified]` Branch protection real: one required check, strict, force pushes blocked, admins deliberately not enforced.
- Deviations noted: no issue tracker, reasonable for a team of one.
- First move: nothing urgent. This station is working.

### Station 8 — Feedback & adoption: GREEN (8/10, held)
- Inspected: `scripts/adoption.mjs` output, the second consumer's synced state, six inspection reports
- Findings:
  - `[verified]` **The virtuous cycle this station exists to measure actually ran, end to end.** stevendesignservices.com needed form controls, invented `.sds-field`, `.sds-fieldset`, `.chip` and `.sds-display-3` locally with a written note saying PENDING PROMOTION, those were promoted into the system in 02.02.00, and the services site has since synced to 02.02.00 and migrated `sds-fieldset`, `sds-select` and `sds-form__summary` onto the real components. Product context in, system improvement out, product adoption back. That is the textbook loop and it is rare.
  - `[verified]` **7 of 23 components are used by nothing on stevendesignco.com**: Choice, Field, Fieldset, FormStatus, FormSummary, Select, Slider. `adoption.mjs` reports it. They serve the other consumer, which is legitimate, and it does mean the primary property exercises none of them.
  - `[verified]` Migration is partial: `chip` still appears 14 times on the services site, plus `sds-field` and `sds-display-3` once each.
  - `[verified]` **Six inspection reports since 3 October.** This inspection is on a real cadence, which is this station's last warning light and it is off.
  - `[verified]` `adoption.mjs` is not in CI, so the number is only as fresh as the last manual run.
- First move: finish the services-site migration, which turns 7 unused components into a proven second consumer.

### Station 9 — Machine-readable docs & context: YELLOW (5/10, down from 8)
- Inventoried: `custom-elements.json`, `primitives.tokens.json`, 45 docs pages, `DESIGN-SYSTEM.md`, `ARCHITECTURE.md`, `SITE-CONTEXT.md`, `never-say.txt`, `llms.txt`
- **Generation test: run.** Self-rated **6/10** for buildability. All eleven factual claims re-verified; all eleven held.
- Findings:
  - `[verified]` **The token layer is genuinely machine-readable and it shows.** The agent built a nine-piece contact page with **zero raw hex and zero raw px**, referencing `--sdc-control-h`, `--sdc-max-narrow` and three spacing tokens. On most systems that is not achievable.
  - `[verified]` **The component layer is not.** `custom-elements.json` covers **8 of 23**. `manifest:check` passes anyway. See finding 1.
  - `[verified]` **`docs/DESIGN-SYSTEM.md` omits all seven form components and both control tokens** from its tables, having been edited for this very release.
  - `[verified]` **`public/llms.txt` names no component, no token, no version, no docs root.** It is a career summary at the one path conventionally reserved for machine readers.
  - `[verified]` **Nothing points at the control set.** The agent found it with `ls`. The only surface that announces it is a changelog entry three clicks deep.
  - `[verified]` `field.mdx` tells a reader to build the error state its own props table already documents.
- First move: regenerate the manifest to cover all 23 components, or stop describing it as the machine-readable component API.

### Station 10 — Agent access: YELLOW (7/10, down from 8)
- Mapped: Figma Console MCP (live, read and write), official Figma MCP, nine design-system skills, no Code Connect
- **Live test: run.** Independently graded by this inspector from the output file.
- Findings:
  - `[verified]` **The output was on-system, which is this station's actual test.** Nine real components imported by correct path, all seven new controls used correctly, **zero raw hex, zero raw px**, two page-local classes that `start/naming.mdx:45` explicitly sanctions.
  - `[verified]` **One knowing violation, forced by a gap**: `.sdc-btn` on a native `<button type="submit">`, because no submit control exists.
  - `[verified]` **Discoverability is the weak half**, self-rated 3/10. No component index page anywhere. `index.mdx` has four prose cards and names no component. `how-to-read.mdx`, which is trying to be the index, lists fourteen components and is stale.
  - `[verified]` No Code Connect, which is a seat limitation rather than a choice, so the Figma component description is the only bridge, and twelve of eighteen do not name their code.
  - `[verified]` The bridge is real and bidirectional: this inspection read 93 variables, 95 frames and 17 text styles live, and the same surface wrote six components into the library two days ago.
- First move: a generated component index. It fixes this station and station 9 at once.

---

## Cadence

- **Before the next deploy:** work order items 1 to 4. All are documentation that currently contradicts the code.
- **Next partial:** stations 4, 9 and 10, after the manifest and the index land. Those three are one root cause.
- **Next full ten-station pass:** 2027-01-26, or sooner if another release of this size ships.
- **Wire into CI now:** `sync --check`, and a count check. Across five inspections the pattern has not changed: **the generated layers stay true and the hand-written ones rot.** 02.02.00 is the cleanest demonstration yet, because the same four days produced the best-ever token parity and the worst-ever documentation drift.
