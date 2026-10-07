# Multi-Point Inspection Report — Steven Design Co design system

_Inspected: 2026-10-05 (third pass, partial) · Technician: Claude Opus 5 (1M context), via the ds-inspection kit · Previous: 2026-10-03 full, 2026-10-05 partial, 2026-10-05 full_
_Vehicle profile: `ds-inspection/GARAGE.md`_

**Partial re-inspection.** Stations 1, 2, 5, 6 and 9 — the five the token pipeline touches. Stations 3, 4, 7, 8 and 10 were not inspected and carry their most recent scores forward. Run against `origin/dev` (54c35f7) from a clean worktree, with the Q&A suite against live production.

## The short version

A token pipeline landed since the last pass, and it is the thing three inspections kept asking for. There is now a canonical DTCG file, a generator that is the only thing allowed to write the colour primitives into CSS, marker-fenced output with a "do not edit" notice, and a `--check` mode that fails when the two drift. All 16 primitives match the live Figma collection exactly, hex for hex. The `-rgb` companions that were hand-maintained are now derived. Station 6 moves up a point for it.

Two things keep it from being a bigger move. **Nothing actually reads from Figma.** The only mentions of Figma in `scripts/` are comments, so `primitives.tokens.json` is hand-maintained and the script's own claim that Figma is the source of truth is intent rather than mechanism. The hand-maintenance moved one step back; it did not go away. And **`tokens:check` is not in CI** — it lives only in the `ship` script, so like the pixel check it is a good guard that cannot stop a merge.

The cost of the velocity shows up next door. The library grew from 59 variables to 73 in a few hours, and **code syntax coverage fell from 59 of 59 to 59 of 73**. The 14 without it are exactly the new work. That metric was perfect in every prior report and it is what Station 6's parity rests on, so Station 2 comes down a point.

Net across the five stations: unchanged. A real structural improvement landed and the total did not move, because the same push that produced it opened new gaps.

One thing to fix today regardless of scoring: `docs/DESIGN-SYSTEM.md` still says to change a token by editing `Site.astro`. For any of the 16 primitives that instruction silently loses the edit on the next build.

**Overall: 72/100** — a conversation starter, not a grade.

## Inspection sheet

|  # | Station                         | Quality      | Light |      Score |           Previous |
|---:|:--------------------------------|:-------------|:-----:|-----------:|-------------------:|
|  1 | Coverage & gaps                 | Complete     |  🟡   |       7/10 |               7/10 |
|  2 | Best practices                  | Sound        |  🟡   |       6/10 |               7/10 |
|  3 | Accessibility                   | Sound        |  🟢   |   9/10 *   |               9/10 |
|  4 | Shared language                 | Sound        |  🟡   |   6/10 *   |               6/10 |
|  5 | Testing & validation            | Sound        |  🟡   |       7/10 |               7/10 |
|  6 | Orchestration                   | Synchronized |  🟢   |       8/10 |               7/10 |
|  7 | Governance & version control    | Extensible   |  🟡   |   7/10 *   |               7/10 |
|  8 | Feedback & adoption             | Extensible   |  🟡   |   7/10 *   |               7/10 |
|  9 | Machine-readable docs & context | AI-Ready     |  🟡   |       7/10 |               7/10 |
| 10 | Agent access                    | AI-Ready     |  🟢   |   8/10 *   |               8/10 |
|    | **Overall**                     |              |       | **72/100** |         **72/100** |

`*` not inspected this pass; most recent score carried forward.

**Lights:** 🟢 3 green · 🟡 7 yellow · 🔴 0 red

## Evidence basis

- Access used: design library `live` via the Figma plugin bridge, sweeping all 5 pages, 433 nodes and all 73 variables. Code `live` from a clean worktree at `origin/dev`. Docs `live`. The Q&A suite run against live production.
- Findings tagged `[verified]`: 28 · `[reported]`: 0
- **Technician conflict of interest.** I built the system and inspected it three times before this. This pass is the first where the main change under inspection was made by someone else, which makes it the least self-marked of the four. The pattern named in the previous report still applies to my own earlier findings: I measured the dimension that was working and wrote the claim as though it covered all of them.

## Station records

### Station 1 — Coverage & gaps: YELLOW (7/10, held)
- Swept: all 73 Figma variables across 6 collections, the new `src/styles/tokens/primitives.tokens.json`, all 81 CSS custom properties, effect styles, the three legs. Clean worktree at `origin/dev` (54c35f7).
- Evidence level: design `live` · code `live` · docs `live`
- Findings:
  - [verified] **A token source of truth now exists.** `src/styles/tokens/primitives.tokens.json` holds 16 colour primitives in DTCG format with `$value` and `$description`, and `$extensions` records its provenance: `figma-console-mcp`, file key `TJjqs7XSz21Y72GRPnVAQB`, collection `Primitives`. This was a named gap in all three prior reports.
  - [verified] Focus is now a real token on both sides. `brand/focus`, `brand/focus-dark` and the semantic `focus-ring` exist in Figma, and `--brand-focus`, `--brand-focus-dark` and `--focus-ring` exist in the stylesheet. The `focus-ring` variable I flagged this morning as having no code counterpart now has one.
  - [verified] CSS tokens grew from 68 to 81, and the 5 `-rgb` companions that used to be hand-maintained code-only tokens are now **derived** by the generator from the hex values.
  - [verified] **The library grew faster than the code and opened a new gap.** Figma went from 59 variables to 73. Eleven of the new ones have no counterpart in the stylesheet under any name I can find: `Spacing / line-height-normal` and ten Type scale additions (`size/button`, `leading/button`, `size/link-sm`, `leading/link-sm`, `size/wordmark`, `size/card-title`, `font/weight-regular`, `font/weight-medium`, `font/weight-emphasized`, `font/weight-extrabold`). I searched the stylesheet for button, wordmark, card-title, link, weight, leading and line-height and found zero matching tokens.
  - [verified] The pipeline covers 16 of 73 variables. Spacing, Radius, Layout and Type scale are still hand-kept on both sides, and the script's own header explains why Tier 2 stays hand-authored: `rgba()` over the `-rgb` helpers and `clamp()` fluid type, neither of which a Figma variable can express. That reasoning is sound and documented.
  - [verified] Unchanged: 12 Figma components, 14 code components, 18 docs pages. The five documented patterns that are CSS-only are still CSS-only. **Effect styles remain at zero**, so elevation still has no design-side form.
- Not inspected: the labs under `/labs`, out of scope per GARAGE.md
- Why the score held: a token source of truth appearing is a real coverage gain, and it is roughly cancelled by eleven new design-only variables and an elevation gap that has not moved in three inspections.
- First move: give the eleven new Figma variables either a code counterpart or a note saying they are design-only on purpose.

### Station 2 — Best practices: YELLOW (6/10, down from 7)
- Sampled: all 73 variables for code syntax, every node on all 5 pages for binding rates, the 12 components, the generated token block
- Evidence level: design `live` · code `live`
- Findings:
  - [verified] **Code syntax coverage regressed from perfect.** Every prior report recorded 59 of 59 variables carrying WEB code syntax. It is now **59 of 73, 81%**. The 14 without it are precisely the new work: `brand/focus`, `brand/focus-dark`, `focus-ring`, `line-height-normal` and all ten Type scale additions. The convention did not change; the velocity outran it.
  - [verified] This matters more than a tidiness score. Code syntax is the mechanism that makes the design-to-code name mapping explicit rather than inferred, and it is what Station 6's parity rests on. Fourteen holes in it is fourteen variables a developer has to guess the token name for.
  - [verified] Colour binding is still flawless: **283 of 283** solid fills bound to variables, up from 274 of 274 as the library grew.
  - [verified] Geometry binding moved from 158 of 435 (36.3%) to **176 of 458 (38.4%)**. A real gain and a small one. The blocker is unchanged: Button's padding of 14 and 22 and Pager's 18 exist in neither the Figma spacing scale nor the CSS one, and the Spacing collection's one new variable is `line-height-normal`, not those values.
  - [verified] The generated primitives block is well formed: 32 lines, 16 primitives plus 16 derived rgb triples, fenced by `TOKENS:START` and `TOKENS:END` markers with a "Do not edit" notice.
  - [verified] Components unchanged and still strong: 12 components, all with real descriptions, 34 instances, zero detached.
- Why the score moved: one previously perfect metric is now at 81%, and it happened inside a few hours of active work. Saying so is more useful than protecting the number.
- First move: add WEB code syntax to the 14 variables that lack it, before the next batch of additions makes it a habit.

### Station 5 — Testing & validation: YELLOW (7/10, held)
- Inspected: `.github/workflows/qa.yml`, `package.json` scripts, `scripts/build-tokens.mjs`, the eight checks in `qa/`, and the suite run against live production
- Evidence level: code `live` · CI `live` · production run `live`
- Findings:
  - [verified] **A new drift guard exists.** `scripts/build-tokens.mjs --check` exits 1 when the generated CSS block no longer matches the canonical token file, and it is wired as `npm run tokens:check`. It passes right now: "Tokens in step (16 primitives)."
  - [verified] **It is not in CI.** The workflow runs build, the Q&A suite, the docs build and `check:docs`, and has no tokens step. `tokens:check` appears in exactly one place that enforces it, the `ship` script in `package.json`, which runs only when someone types it. This is the same shape as the pixel check: a good guard that cannot block a merge.
  - [verified] All seven accessibility and layout checks pass against `https://stevendesignco.com`.
  - [verified] Unchanged: no unit tests, which remains the honest level for 14 presentational components; the pixel check still gated behind `--pixel` and still comparing against live production rather than a committed baseline; still no evals, rubric or judge for AI-assisted output.
  - [verified] FigmaLint remains the only design-side validation, run manually.
- Why the score held: the system gained a real check and did not gain a place where that check can stop anything.
- First move: add `npm run tokens:check` to the workflow. It is one line and the script already exists.

### Station 6 — Orchestration: YELLOW (8/10, up from 7)
- Diffed: all 16 canonical token values against the live Figma Primitives collection; all 73 variables against 81 CSS custom properties; the pipeline script read in full
- Token diff: **16 of 16 primitives match Figma exactly**, verified live, hex for hex. Eleven Figma variables have no CSS counterpart. The pipeline governs 16 of 73.
- Evidence level: design `live` · code `live` · docs `live`
- Findings:
  - [verified] **The core weakness of all three prior reports is partly closed.** There is now a pipeline: a canonical DTCG file, a generator that is the only thing permitted to write the primitives into CSS, marker-fenced output, and a `--check` mode. The CSS can no longer silently drift from the token file, which is more than was true this morning.
  - [verified] The pipeline is correct where it reaches. All 16 primitives match the live Figma collection exactly, including the values the other session changed today: `brand/citron-light` at `#F1FFB8`, `brand/regatta-deep` at `#233552`, `ink/gray-mute` at `#8A8F8C`.
  - [verified] **Nothing reads from Figma.** The only mentions of Figma in `scripts/` are comments. `primitives.tokens.json` is hand-maintained, so the script's own header, "Figma is the source of truth for primitive VALUES", is a statement of intent that nothing enforces. The hand-maintenance moved one step back rather than disappearing, and the Figma-to-JSON link is still a person remembering. That it matches today is evidence of care, not of a mechanism.
  - [verified] The pipeline is documented, and documented well, on `foundations/colour.mdx`: what generates what, where the markers are, that editing by hand gets overwritten, and that `tokens:check` fails when the two drift.
  - [verified] **And `docs/DESIGN-SYSTEM.md` now gives an instruction that silently loses work.** Its "Changing a token" section still opens with "Change it in `Site.astro`, in every theme block that defines it." For any of the 16 primitives that is now wrong: the next build overwrites the edit. Two repo documents describe the same procedure and one of them is a trap. Same class of defect as the stale `ARCHITECTURE.md` tables found this morning.
  - [verified] Semantic colour parity still holds on both modes, and the design and code sides agreed on `ink/gray-mute` after this afternoon's rename, including its code syntax.
- Why the score moved: the station's headline finding across three reports was "no pipeline, hand-maintained, nothing detects divergence". A pipeline now exists and detects one of the two divergences. Not a 9, because the half it does not detect is the half that starts in Figma, and it governs 16 of 73 variables.
- First move: make the Figma-to-JSON direction real. Either a script that exports the Primitives collection through the bridge and diffs it against the JSON, or an honest comment saying the JSON is the source and Figma follows.

### Station 9 — Machine-readable docs & context: YELLOW (7/10, held)
- Inventoried: the new DTCG token file and its `$extensions`, the pipeline documentation, `docs/DESIGN-SYSTEM.md`, the 34 docs pages, what git tracks
- Evidence level: code `live` · docs `live` · design `live`
- Findings:
  - [verified] **A machine-readable token format now exists**, which every prior report listed as absent. DTCG shape, `$value` and `$description` per token, and `$extensions` carrying real provenance: the tool, the Figma file key, the file name and the collection. A machine can now read the primitives without parsing CSS.
  - [verified] The pipeline's documentation is genuinely good and sits on the page a reader would look at.
  - [verified] **It contradicts `docs/DESIGN-SYSTEM.md`, which still tells you to hand-edit the generated block.** An agent following the repo documentation would edit the primitives in `Site.astro` and lose the change on the next build without being told why.
  - [verified] Unchanged and still dominant: no documentation page for `Site.astro`; no complete page example; the generation test's 19 guesses were about components and pages, and nothing in this change touches that.
  - [verified] Unchanged: `CLAUDE.md` and `claude-context/` are both gitignored, so the agent layer still sits on one disk with no backup. `public/llms.txt` is still stale in production because the fix is in an unmerged pull request. Three components still carry props and no props table.
- Why the score held: the token format gap closed and a new documentation contradiction opened, on the exact procedure the change introduced.
- First move: rewrite "Changing a token" in `docs/DESIGN-SYSTEM.md` to split primitives from semantic tokens, and point it at the colour page rather than restating it.

## What changed since last inspection

**Score movement:** Station 6 up one, Station 2 down one, three held. Total unchanged at 72.

**Closed:** the absence of any token pipeline (Station 6, work-order item 3, partially); the absence of a machine-readable token format (Station 9); `focus-ring` having no code counterpart (found this morning, now has one).

**Opened:** 14 variables without WEB code syntax, where there were none before; 11 Figma variables with no code counterpart; a contradiction between `docs/DESIGN-SYSTEM.md` and `foundations/colour.mdx` about how to change a token, where the repo document is the one that loses work.

**Unmoved across four inspections:** elevation has no design-side representation (still zero effect styles); the layout has no documentation page; `CLAUDE.md` and `claude-context/` are gitignored; the Button and Pager padding values exist in no spacing scale; three components carry props and no props table.

## Next service

- Work order: `ds-inspection/work-orders/2026-10-05-tokens-work-order.md`
- Cadence unchanged: deep inspection quarterly, **2027-01-05**. Four passes in three days was driven by active remediation and is not a rhythm. The partial pass after a change lands is the pattern worth keeping, and this one found three things within an hour of the change.
- Everyday checks to add now: `npm run tokens:check` in the workflow, a code-syntax coverage check over the Figma variables, and the internal link check still outstanding from the last order.
- Re-inspect by: 2027-01-05
