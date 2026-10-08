# Multi-Point Inspection Report — Steven Design Co design system

_Inspected: 2026-10-08 · Technician: Claude Fable 5.1 (Claude Code) · Previous inspection: 2026-10-05 (tokens pass, 72/100; full pass the same day, 72/100)_
_Vehicle profile: `ds-inspection/GARAGE.md` (checked in 2026-10-03, re-confirmed 2026-10-08)_
_State inspected: branch `chore/sdc-token-prefix` at `5d50fbf`, SDC 02.00.00, **unreleased**. Production still runs 01.00.00._

## The short version

Three days ago the system had names nobody had written down, components the home page carried as loose markup, and a design library whose code syntax pointed at the right tokens by luck. Today every name the system owns carries the `sdc-` namespace, the containers render as custom elements with attributes for variants, the naming convention is a docs page and a CI check, the component API is a generated manifest, and the design library's 62 code syntaxes all name a token that exists in code. Five stations moved to green and no station moved down. The most load-bearing thing left is not in this repo: design-to-code parity is still checked by a person, because the two mechanisms that would automate it, Figma's Variables REST API and Code Connect, are behind plan tiers this account does not have. That is the one yellow, and it is a yellow with a reason.

**Overall: 81/100** — a conversation starter, not a grade. Fix the reds, schedule the yellows, re-run on a cadence.

## Inspection sheet

|  # | Station                         | Quality      | Light |      Score |
|---:|:--------------------------------|:-------------|:-----:|-----------:|
|  1 | Coverage & gaps                 | Complete     |  🟢   |       8/10 |
|  2 | Best practices                  | Sound        |  🟢   |       8/10 |
|  3 | Accessibility                   | Sound        |  🟢   |       9/10 |
|  4 | Shared language                 | Sound        |  🟢   |       8/10 |
|  5 | Testing & validation            | Sound        |  🟢   |       8/10 |
|  6 | Orchestration                   | Synchronized |  🟡   |       7/10 |
|  7 | Governance & version control    | Extensible   |  🟢   |       8/10 |
|  8 | Feedback & adoption             | Extensible   |  🟢   |       8/10 |
|  9 | Machine-readable docs & context | AI-Ready     |  🟢   |       9/10 |
| 10 | Agent access                    | AI-Ready     |  🟢   |       8/10 |
|    | **Overall**                     |              |       | **81/100** |

**Lights:** 🟢 9 green · 🟡 1 yellow · 🔴 0 red · 0 not inspected

**Key:** 🔴 Red (0–3) — broken or missing; the light is ON · 🟡 Yellow (4–7) — drift or gaps; schedule a fix · 🟢 Green (8–10) — healthy, no action needed · **N/I** — not inspected (no evidence access; never guessed)

## Evidence basis

- Access used this pass: repo `live` (every file read directly, every check run); design library `live` through the Figma Console Desktop Bridge, read and, with Steve's explicit go, written; docs `live` (source and built output); process `live` (`gh`, CI run logs, branch protection); the running site `live` (Q&A suite, Playwright measurements against production, two real-browser passes).
- Findings tagged `[verified]`: 58 · `[reported]`: 0
- **Technician conflict of interest, stronger than before:** this agent built everything it graded today, within the same session, and then inspected it. Self-marking is flagged on every green. The two numbers least to be trusted are Station 1 and Station 8, where the anchors ask for judgment about "enough" and this agent has a stake in the answer. A second opinion on those two is worth more than this report.

## Station records

### Station 1 — Coverage & gaps: GREEN (8/10, up from 7)
- Inspected: all 16 files in `src/components/ui/`, all 11 pages, all 39 docs pages, the 12 Figma components, `scripts/adoption.mjs` output
- Evidence level: code `live` · design `live` · docs `live`
- Findings:
  - [verified] 16 components, up from 14. The two new ones, `CaseStudyCard` and `TextPassage`, are markup the home page carried inline on 2026-10-05, now a component with a docs page each. 9 of 11 pages import from `ui/`, up from 8; the home page was the one the last report named as having no components for its surface.
  - [verified] Documentation is ahead of code where it should be: 19 component pages for 16 components. The four documented pieces with no component file are the dialog, navigation, progress dots and row list. All four are home page or layout internals with exactly one instance each, which is the honest reason they are CSS rather than a reusable file; it is still a gap a second instance would expose.
  - [verified] The design library has 12 components to code's 16. The five code components with no Figma counterpart are the containers (`CaseSection`, `CaseFigure`, `CaseHero`, `ButtonGroup`, `TextPassage`), layout primitives a designer composes with frames rather than instances. Elevation still has no effect styles in Figma: zero, four inspections running.
  - [verified] The two pages still outside the system, `resume.astro` and `work/index.astro`, use the system's bands (`<sdc-section>`, `<sdc-layout-container>`) and page-local classes for everything else. Neither works around the system; both are surfaces it has no components for.
- Self-marking: this agent added the two components it is counting. The score would be 7 if the four CSS-only pieces are weighted as missing components rather than one-offs.
- Light: GREEN. The anchor is "the majority of what is needed for most core flows, evenly represented"; the case study flow is covered end to end in all three assets, and the home page now is in code and docs.

### Station 2 — Best practices: GREEN (8/10, up from 6)
- Inspected: all 73 Figma variables and their code syntax (sweep via the bridge, before and after the write), all 12 component descriptions, the components' geometry and colour binding, `src/` for raw values, the hook and validator output
- Evidence level: design `live` · code `live`
- Findings:
  - [verified] **The finding that moved this station: code syntax is complete and correct.** Before the write this morning the 59 entries all read `var(--ink-black)` style, the names the 2026-10-07 token rename retired, so 0 of 73 named a token that exists. After the write, 62 of 73 carry `var(--sdc-…)` and every one resolves to a defined token in `Site.astro` (checked by script). The remaining 11 are type-scale variables with no CSS counterpart (`size/button`, `leading/button`, `size/wordmark`, four font weights and so on); each now says "Design-only" in its description, so the absence is a decision rather than a gap. This was the station's open item 4 and the drift the rename had silently added.
  - [verified] Geometry binding inside components: 118 of 136 non-zero padding, spacing and radius values bound to variables, 87%; colour fills 19 of 19. **Method note:** this sweep counts non-zero values on nodes inside components. The 2026-10-05 figure of 38.4% counted every geometry slot including zeros, so the two are not comparable; the earlier number was the harder test. Button's padding is now on the scale in code (16/24 from `--sdc-space-sm` and `--sdc-space-md`, PR #14) and the Figma Button already was.
  - [verified] Code craft: zero raw colours in any `box-shadow` or `background` outside token definitions; the two literal `box-shadow` values the last report counted are now tokens (`--sdc-shadow-float`, `--sdc-shadow-modal`, `--sdc-shadow-chip`, `--sdc-shadow-tile`, `--sdc-scrim`). The only `box-shadow` literals left are two `none` values in the PayPal hero. A PostToolUse hook flags raw colours and framework classes on every edit; a CI validator checks every system name.
  - [verified] 12 of 12 Figma components carry a real description, 157 to 1,505 characters. Component descriptions in code: 16 of 16 open with a doc comment that says why, not what.
  - [verified] Unchanged: 18 physical properties in the layout, zero logical ones. RTL is not a goal of this site and nobody has written that down.
- Light: GREEN. Self-marking: this agent wrote the code syntax it is grading.

### Station 3 — Accessibility: GREEN (9/10, held)
- Inspected: the full Q&A suite (reflow at 11 widths, axe-core on 11 pages and 5 dialogs, dialog keyboard, text spacing, forced colours, link distinction, contrast in both themes), the custom elements' roles, the skip link and focus order by script
- Evidence level: code `live` · site `live`
- Findings:
  - [verified] 7 of 7 checks pass on the branch, three times today, including after the conversion to custom elements. The dialog cases pass under `reducedMotion: 'reduce'`, which is how the suite runs.
  - [verified] The conversion kept every native role. Lists, the meta `<dl>`, `<blockquote>`, the pager `<a>`, `<nav>` and `<main>` are unchanged elements with an `sdc-` class. The custom elements replaced only generic `<div>` and unnamed `<section>` containers. A band that needs to be a landmark passes `labelledby` and the element sets `role="region"` itself; the rule is written on the Naming page.
  - [verified] The focus ring, forced-colours rules and the `prefers-contrast` collapse all live in the global stylesheet, which reaches inside the custom elements because there is no shadow boundary. This is the stated reason shadow DOM was declined.
  - [verified] One point withheld, same as last time: axe covers what axe covers. No manual screen-reader pass with a real assistive technology is recorded for this branch.
- Light: GREEN.

### Station 4 — Shared language: GREEN (8/10, up from 6)
- Inspected: every component name in Figma, code and docs; every prop in all 16 components; the Naming page; `scripts/check-names.mjs` and its CI run; every `--sdc-` token name
- Evidence level: design `live` · code `live` · docs `live`
- Findings:
  - [verified] **A naming convention is written down and enforced.** `/docs/start/naming` states the rule (every name the system owns carries `sdc-`; elements, classes with BEM and `sdc-u-` utilities, tokens, props) and the three kinds of class that carry no prefix on purpose. `npm run check:names` fails CI on an undeclared element, an unprefixed system class or token, or a prop that reuses an HTML global attribute. On its first run it caught `title` on the hero and `dir` on the pager, both renamed.
  - [verified] **The four misleading props are gone.** `alt` on a section is `tone`, `inner` is `layout`, `hidden` on the Pager is `prefix`, plus `title` is `heading` and `dir` is `direction`. The remaining `alt` is image alt text on `CaseFigure`, which is what `alt` means.
  - [verified] **Concepts now carry one name across the three assets.** Figma was renamed this morning (Meta pair → Meta row, Stat → Stat list, Award row → Award list, Case card → Case study card), code renamed `CaseMeta` to `MetaRow`, and the docs retitled four pages to the element names (Case hero, Case block, Case figure, Quote). Of the 12 concepts present in all three assets, 12 match: Button, Pager, Eyebrow, Note, Quote, Meta row, Stat list, Award list, Case block, Case study card, Site header, Site footer. The concepts absent from Figma (section, layout container, figure, hero, text passage, button group) match between code and docs.
  - [verified] Two things withheld the last two points. `--sdc-text` is a colour inside a namespace where `--sdc-text-body`, `--sdc-text-heading` and eleven others are sizes; unchanged, and Figma's collections hide it. And Pager's variant vocabulary still differs in form: Figma `Direction=Previous|Next`, code `direction="prev"|"next"`.
- Light: GREEN. Self-marking: this agent wrote the convention and the validator.

### Station 5 — Testing & validation: GREEN (8/10, up from 7)
- Inspected: `.github/workflows/qa.yml`, `package.json` scripts, the five CI runs on this branch and the Q&A runner source
- Evidence level: code `live` · process `live`
- Findings:
  - [verified] CI runs, on every pull request, in order: manifest in step, naming convention, tokens in step, build, the seven-check Q&A, the never-say list, docs build, docs in step. Five deterministic gates on top of the suite, up from one (`check:docs`) on 2026-10-05. `tokens:check` and the never-say check, the last two work orders' open items, are both wired.
  - [verified] The suite no longer fails on a cold dev server. The runner warms every page in a real browser, twice, before measuring; the comment names the 2026-10-08 incident (Vite's lazy dependency re-optimization answering `504 Outdated Optimize Dep` to the dialog check with no error in the page).
  - [verified] The pixel comparison is still report-only and compares a dev server to live production. That is by design and documented in `qa/README.md`; it cannot gate because its baseline is whatever shipped last. It was decisive today: it is what caught the card losing its styles and the About passage losing its measure when markup moved into components.
  - [verified] Evals for AI-assisted output exist in substance if not in name: the PostToolUse hook that flags framework classes and raw colours on every edit, the naming validator, and the never-say check all test what an agent writes against the system's rules. No test reads a design file.
- Light: GREEN. What would make it 9: a committed visual baseline so the pixel check can gate rather than report.

### Station 6 — Orchestration: YELLOW (7/10, held)
- Inspected: `scripts/build-tokens.mjs`, `scripts/build-manifest.mjs`, the Figma variables before and after the write, the definition of done in `CONTRIBUTING.md`, the Pager in both assets
- Evidence level: design `live` · code `live` · docs `live`
- Findings:
  - [verified] The code-to-code direction is machine-checked everywhere it exists: tokens JSON → CSS (`tokens:check`), components → manifest (`manifest:check`), code → docs (`check:docs`). None of these has drifted since they were added.
  - [verified] **The design-to-code direction is a person, and it broke this week.** The 2026-10-07 token rename left all 59 Figma code syntaxes pointing at names that no longer existed, and nothing noticed for a day. It was repaired this morning through the bridge and verified by script; it was not caught by anything. The 2026-10-05 work order's item 2, "nothing reads from Figma", is still true.
  - [verified] The reason is external and worth stating plainly: Figma's Variables REST API, which a CI script could read, is Enterprise-only, and Code Connect returns a seat error on this plan. The bridge that worked this morning needs Figma Desktop open with a plugin running, which no CI runner has. Parity can be checked by a person with one command, and the definition of done now says to.
  - [verified] The definition of done mentions the design library for the first time: "If the design library should change with this, it did, or the pull request says why not. Figma does not fail a check."
  - [verified] Pager's vocabulary still differs between design and code (`Previous|Next` against `prev|next`). `State=Default|Hover` has no code counterpart, correctly.
- Light: YELLOW, and the case for not worrying: everything a one-person team can automate here is automated. The missing piece is a check across a boundary Figma charges for. A script that runs through the bridge on demand would turn the manual step into a one-liner and is the first move in the work order; it still would not run in CI.

### Station 7 — Governance & version control: GREEN (8/10, up from 7)
- Inspected: `CONTRIBUTING.md`, `.github/pull_request_template.md`, `SITE-CONTEXT.md`, `CHANGELOG.md` against `git log`, the git tags, `/docs/start/releases`, branch protection via `gh`
- Evidence level: process `live` · repo `live`
- Findings:
  - [verified] **The system is versioned.** Semantic versioning, two digits each; `01.00.00` tagged on the production commit; `02.00.00` on the branch with the breaking changes listed in the release log; the number lives in one file and shows in a meta tag on every page, the Storybook and the docs home. Three days ago there was no version.
  - [verified] **One definition of done.** The last three reports counted three checklists that disagreed. `CONTRIBUTING.md`'s "Before you merge" is now the list: the machine half is `npm run ship`, the human half is the seven things no check sees. The PR template and `SITE-CONTEXT.md` point at it rather than carrying their own.
  - [verified] The changelog is current: October 7's four shipped changes and an Unreleased 02.00.00 entry. Eight commits had landed on `dev` since its last entry before this morning.
  - [verified] Branch protection unchanged and correct for the team size: the Q&A check required, strict, force pushes blocked, admins not enforced. One thing to know: a direct push to `dev` on 2026-10-07 skipped the required check, which admins can do; it was followed by a PR for everything since.
  - [verified] `public/docs/` is still committed build output. CI builds the docs but does not diff the result against what is committed, so a docs edit that is not rebuilt still publishes nothing. The page-shell page added today was rebuilt and committed; nothing enforces that the next one is.
- Light: GREEN.

### Station 8 — Feedback & adoption: GREEN (8/10, up from 7)
- Inspected: `scripts/adoption.mjs` and its output, Figma instance and detach counts, the feedback incidents recorded in code comments, the cadence in `GARAGE.md`
- Evidence level: code `live` · design `live`
- Findings:
  - [verified] **Adoption is measured by something that stays.** `npm run adoption` reports which pages use which components and what nothing uses, from source; `--check` fails if a component is used nowhere. Today: 16 of 16 used, 14 directly by pages and 2 (`MetaRow`, `Pager`) only through composing components, 9 of 11 pages on the system. The last three reports got these numbers from scripts written during the inspection and thrown away.
  - [verified] Design-side adoption: 34 instances across the library, zero detached, unchanged.
  - [verified] The feedback loop is the incidents written next to the checks they produced. Three more were added this week, each dated: the never-say check's comment names the MTG claim that survived a deploy; the warm-up names the dialog failure; the naming validator names the hand-applied namespace. A reader can trace every gate to the day it earned its place.
  - [verified] Cadence: quarterly deep inspection, next 2027-01-05, written in `GARAGE.md`. Nothing on a machine schedules it.
  - [verified] No feedback channel from anyone other than the maintainer, because there is no one else. Not a gap to fix; a fact of the frame.
- Light: GREEN. Self-marking: this agent wrote the adoption script. The score is 8 on the solo frame; a platform org would call this a 5.

### Station 9 — Machine-readable docs & context: GREEN (9/10, up from 7)
- Inspected: `custom-elements.json`, `src/styles/tokens/primitives.tokens.json`, `public/llms.txt` locally and on production, all 39 docs pages for props tables, `/docs/start/page-shell`
- Evidence level: code `live` · docs `live` · site `live`
- Findings:
  - [verified] **The component API is machine-readable.** `custom-elements.json`, the standard manifest format, is generated from the components' `@element` tags and `Props` interfaces, served at `/custom-elements.json`, and checked for drift in CI. Eight elements, every attribute with its type, description and whether it is required, every slot.
  - [verified] Tokens are a DTCG JSON file, the generator reads it, and the docs say so.
  - [verified] **The layout is documented.** `/docs/start/page-shell` says what `Site.astro` provides, its four props, and gives a whole case study page built from the components. Four inspections had named this the largest structural gap; the 2026-10-05 generation test needed 19 guesses and said one worked example would remove four or five.
  - [verified] Props tables: every component that takes props has one, 16 of 16. The last two, the meta row and the pager pair, were added today.
  - [verified] `llms.txt` on production is current (PayPal in the past tense, December 2025 to August 2026); the stale copy the last report found has shipped.
  - [verified] One point withheld: `llms.txt` does not mention the design system, the manifest or the docs' machine-readable surfaces. An agent arriving from the site's own index would not learn they exist.
- Light: GREEN.

### Station 10 — Agent access: GREEN (8/10, held)
- Inspected: `SITE-CONTEXT.md`, the `site-context` skill, `never-say.txt`, the manifest, `.gitignore` for the agent files, the three published Figma libraries
- Evidence level: repo `live` · design `live`
- Findings:
  - [verified] An agent starting cold on this repo has, at the root: `SITE-CONTEXT.md` (where every kind of truth lives, the settled content rules, the definition of done), `never-say.txt`, `custom-elements.json`, and a skill that reads the first two before any UI or copy work. Every design decision this week is recorded somewhere an agent will find it, not only in a conversation.
  - [verified] `CLAUDE.md` and `claude-context/` remain gitignored. The last work order called this a gap; it is a boundary. They hold private material and the repo is public. What an agent needs for the system is in the tracked files above.
  - [verified] The bridge can write as well as read, which is new and was used today with an explicit go. The access map in `GARAGE.md` records it.
  - [verified] Three Figma libraries are published and nothing in Figma marks the canonical one; only the docs say "SDC Fall of 2026". Unchanged, four inspections.
- Light: GREEN.

## What changed since last inspection

**Score movement:** 72 → 81. Stations 1, 2, 4, 5, 7, 8, 9 up (1, 1, 2, 1, 1, 1, 2 points). Stations 3, 6, 10 held. Nothing down.

**Lights turned off:** six yellows became green (1, 2, 4, 5, 7, 8, 9 — seven, counting 9). One yellow remains, Station 6, for a reason outside the repo.

**New light:** none. The namespace rename briefly put Station 6 in a worse state than reported (0 of 73 code syntaxes valid); it was repaired during this inspection and is recorded in the station, not as a new light.

**Work order 2026-10-05, item by item:**
1. Hand-edit instruction that loses work: **closed** (2026-10-05 PR #12, confirmed).
2. Nothing reads from Figma: **open**, reframed as external (plan tier). First move in the new order.
3. `tokens:check` cannot stop a merge: **closed**, in CI.
4. Fourteen variables with no code syntax: **closed**, and the 59 that had it were repaired after the rename broke them.
5. Agent layer not in a repository: **closed as a boundary**, not a gap; the tracked agent surface now exists.
6. `llms.txt` stale in production: **closed**.
7. Layout undocumented, no whole-page example: **closed**, `/docs/start/page-shell`.
8. Naming drifts three ways, no convention: **closed**: convention written, validator in CI, names aligned in all three assets.
9. Geometry binding and the padding scale decision: **closed on the code side** (Button on the scale, PR #14); design-side binding measured at 87% by a narrower method.
10. Elevation has no design-side form: **open**, zero effect styles.
11. Carried forward: no evals (partly closed: hook, validator, never-say); pixel cannot gate (open, by design); three definitions of done (closed); `CONTRIBUTING.md` never mentions `npm run qa` (closed); `public/docs` build output unenforced (open); no internal link check (open); nothing instrumented (closed, adoption script); no cadence (closed, 2027-01-05); three Figma libraries unmarked (open); props tables missing (closed).

## Next service

- Work order: `ds-inspection/work-orders/2026-10-08-work-order.md`
- Recommended cadence: deep inspection quarterly, next **2027-01-05**. A partial pass after 02.00.00 ships, stations 6 and 7 only, to confirm the release process worked the first time it was used. Everyday checks already in CI: stations 2, 4, 5, 9 (tokens, names, manifest, Q&A, never-say, docs in step).
- Re-inspect by: 2027-01-05
