# Work Order — Steven Design Co design system

_From inspection: `reports/2026-10-05-full-inspection.md` · Written: 2026-10-05 · Supersedes both earlier orders_

Reds get fixed now. Yellows get scheduled. Greens get left alone (and celebrated). Every item cites its station and evidence. The team owns prioritization; this is the technician's recommendation.

## 🔴 Fix now (reds)

No station scored red. Three items below behave like reds because each is either already broken in production or a single point of failure, and none needs a decision. They are items 1, 2 and 3.

## 🟡 Schedule (yellows)

### 1. The agent layer exists on one disk, in no repository
- **Station:** 9, 10 · **Evidence:** [verified] `CLAUDE.md` is matched by `.gitignore:31`; `claude-context/` is ignored too. Neither is tracked. A generation test confirmed it from the other side: `CLAUDE.md` did not exist in a clean worktree. Only `public/llms.txt` is tracked, and that is a portfolio surface.
- **Why it's first:** `claude-context/design-system.md` is the first file any agent session reads, it was four months wrong until Sunday, and the corrected version has no backup. Losing that disk loses the rules file and all 20 routing destinations.
- **First move:** decide private or shareable. Private means a second private repo or an encrypted backup; shareable means dropping them from `.gitignore`.
- **Done when:** both exist somewhere other than one working directory.
- **Effort:** S

### 2. A live 404 in the published documentation, and nothing checks links
- **Station:** 9 · **Evidence:** [verified] `/design-system/components/case-figure/` returns 404 in production; the base path is `/docs/`, which returns 200. Introduced by Sunday's remediation, shipped through a green Q&A run and a merged pull request.
- **Blocked on:** PR #6 is `OPEN` and `DIRTY` and cannot merge, so the fix is written and not shipped.
- **First move:** unblock PR #6, then add a link check over the built `public/docs/`.
- **Done when:** no internal documentation link 404s, and a new one fails a check.
- **Effort:** S

### 3. Nothing detects design-code divergence, and it has happened once
- **Station:** 3, 6 · **Evidence:** [verified] `--ink-charcoal-mute` changed in code on 2026-10-05 and the Figma primitive stayed stale for two days, during which the design library carried a WCAG failure the code had fixed. The 2026-10-03 report predicted this in writing. Repaired by hand.
- **First move:** a script in `qa/` that reads the variables through the bridge, resolves aliases per mode, and diffs against `src/layouts/Site.astro`. This week wrote that diff three times as a throwaway.
- **Scope it wider than colour.** All three inspections verified colour and nothing else, and colour was already perfect. The check must cover spacing, radius and stroke or it will keep certifying the one axis that works.
- **Done when:** changing a value on one side and not the other fails a check.
- **Effort:** M

### 4. Geometry is a third bound, and a scale decision blocks the rest
- **Station:** 2, 6 · **Evidence:** [verified] 158 of 435 geometry properties bound, 36%, against 274 of 274 fills. Found by FigmaLint, confirmed directly.
- **The blocker underneath it:** `Button` padding is 14/22 and `Pager` is 18, in Figma *and* in the stylesheet, and none of 14, 22 or 18 exists in the spacing scale (8, 16, 24, 32, 48, 64, 96, 128, 160). They cannot be bound until the scale gains those values or the components change shape. **That is a decision for Steve, not a cleanup.**
- **What needs no decision:** the documentation furniture on the Cover and Foundations pages is most of the unbound bulk, and the Foundations page demonstrates the spacing scale using 32, 24, 16 and 6 as literals.
- **Done when:** the Components page clears 80% bound and every value a component uses exists in a scale.
- **Effort:** M

### 5. The layout is undocumented, and there is no whole-page example
- **Station:** 9 · **Evidence:** [verified] none of the 34 docs pages covers `Site.astro`; its only props table is in `docs/ARCHITECTURE.md` and omits `variant`, the prop whose absence renders a page unstyled. A generation test needed 19 guesses and said one worked example would remove four or five of them.
- **First move:** a `Site` page with `variant` in the table, then one complete case study page end to end.
- **Done when:** a re-run of the generation test places the file and uses the layout without guessing.
- **Effort:** M · **Suggested timing:** this quarter, first

### 6. Naming drifts three ways, and no convention is written down
- **Station:** 4 · **Evidence:** [verified] 5 of 13 concepts carry the same name across design, code and docs. `--text` is a colour inside a namespace of thirteen font sizes. Zero files document a naming convention; no validator exists.
- **First move:** pick one vocabulary, rename across all three assets in one pass starting with `--text-*`, write the algorithm into `docs/DESIGN-SYSTEM.md`.
- **Effort:** M · Nothing outside this repo consumes these names, so it is the cheapest it will ever be.

### 7. `llms.txt` undersells the positioning
- **Station:** 9 · **Evidence:** [verified] "looking for a Senior or Staff Product Designer seat" against a resume page reading "Staff Product Designer" and positioning deliberately opened to include Creative Director. `CONTRIBUTING.md` requires this file to be true.
- **Effort:** S · **Suggested timing:** this week. The only open item with a cost outside the repo, since it is what an LLM reads when someone asks about Steve. Held twice because the wording is Steve's.

### 8. Three definitions of done
- **Station:** 7 · **Evidence:** [verified] `CONTRIBUTING.md` 10 items, PR template 7, `claude-context/checklists.md` 5. `CONTRIBUTING.md` still never mentions `npm run qa`.
- **Effort:** S

### 9. Elevation has no design-side form
- **Station:** 1 · **Evidence:** [verified] zero effect styles in the library; Figma cannot express a four-stop shadow as a variable. Five literal `box-shadow` declarations remain, one using `rgba(15, 23, 42, …)`, a slate in no palette.
- **First move:** two effect styles named to match the two tokens. The three literals each need an answer to "should this be a card?"
- **Effort:** S

### 10. Three components have props and no props table
- **Station:** 1, 9 · **Evidence:** [verified] `Pager` (4 props, including the `hidden` name collision), `PagerPair` (2) and `CaseMeta` (1). Pager's page explains its accessibility reasoning in prose and never tabulates its API.
- **Effort:** S

### 11. `public/docs/` drifts silently from its source
- **Station:** 7 · **Evidence:** [verified] 94 files of committed build output with nothing enforcing the match. It drifted once this week and `check:docs` did not catch it, because that gate checks documentation was touched and not that it was made true.
- **First move:** make the docs build part of the gate.
- **Effort:** S

### 12. The design file is silent on focus state
- **Station:** 3 · **Evidence:** [verified] FigmaLint flags focus state while passing touch target size and minimum font size. Independently, 3 of 12 component descriptions mention accessibility and there is no annotation kit.
- **Effort:** S

### 13. Three published Figma libraries, no canonical marker
- **Station:** 10 · **Evidence:** [verified] a query for "surface" returns results from "SDC Fall of 2026" and from "SDC Design Tokens" at `ALL_SCOPES`, with nothing saying which the site uses.
- **First move:** rename the superseded two so their titles say so; the query surface returns library names.
- **Effort:** S

### 14. No evals for AI-assisted output
- **Station:** 5 · **Evidence:** [verified] no rubric, judge or eval anywhere, in a system built almost entirely with AI assistance. Station 4's naming drift is what that absence looks like after a few weeks.
- **First move:** turn the naming algorithm from item 6 into a checklist a judge can score. It has nothing to grade until that exists.
- **Effort:** M · **Suggested timing:** after item 6

### 15. The pixel check cannot gate
- **Station:** 5 · **Evidence:** [verified] gated behind `--pixel`, reports rather than fails, compares against live production rather than a committed baseline. Two identical runs reported 2104 and then 34439 differing pixels on the same page.
- **First move:** commit a baseline so it compares against something that does not move, then run it in CI.
- **Effort:** M

### 16. Smaller items, batchable
- **Station:** 1, 2, 4, 6 · **Evidence:** [verified] each
  - Three near-identical off-whites in `src/pages/index.astro`: `#F0EEE9` (duplicating `--paper-cloud`), `#EEEAE7`, `#F2F1EC`, plus two `#ffffff` in the animated components.
  - Zero logical CSS properties anywhere; 1 physical in the component library, 18 in the layout, and no `dir` on `<html>`. The components are nearly clean; the exposure is the layout and pages.
  - Four misleading prop names: `hidden`, `alt` (two meanings in sibling files), `light`, `three`.
  - Pager's variant vocabulary still differs: Figma `Direction=Previous|Next` against code `dir='prev'|'next'`.
  - The resume download and the home "View case studies" are raw anchors bypassing `Button`; they need `download` and `aria-describedby` passthrough first.
  - The pull request template never mentions the design library, so nothing asks whether a change needs to reach Figma.
- **Effort:** S each

## 🔧 Access upgrades (sharper next inspection)

- **Keep FigmaLint in the rotation.** It found in one pass what three of my inspections missed, because it measures an axis I did not. It also produced one false positive, a frame named after a component read as a detached instance. Run it, then verify what it flags; that pairing is stronger than either alone.
- **Commit the throwaway scripts.** This week wrote a token parity diff three times, a hex census, a binding-rate sweep, a property-count comparison and a page-height check, then discarded all of them. As files in `qa/` they turn four stations from an inspection activity into a continuous one, and item 3 depends on the first.
- **Connect a design-systems knowledge MCP**, so comparative claims can be cited rather than asserted.

## 🟢 Keeping the greens green

- **Station 3, Accessibility (9/10).** Seven checks on every push and pull request, each proven by breaking it first. Two habits at risk: proving new checks can fail, and running them against production occasionally rather than only a local build. This pass did the latter and it is a stronger signal.
- **Station 10, Agent access (8/10).** It is green because one file was corrected. It stays green only while that file keeps matching the code, which is items 1 and 3.

## Cadence

- Re-inspect (deep, all ten): **2027-01-05**
- A partial pass after any remediation batch. Both partial passes this week found defects in the remediation itself.
- Everyday checks to wire in now: token parity covering geometry (item 3), the docs build and link check (items 2 and 11), the component usage count.
- Owner: Steven Vanden Heuvel · Review: no ritual exists to triage this, which is itself the Station 8 finding. Read items 1 through 5 at the start of the next working session on the site.
