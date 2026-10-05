# Work Order — Steven Design Co design system

_From inspection: `reports/2026-10-05-inspection.md` · Written: 2026-10-05 · Supersedes: `2026-10-03-work-order.md`_

Reds get fixed now. Yellows get scheduled. Greens get left alone (and celebrated). Every item cites its station and evidence. The team owns prioritization; this is the technician's recommendation.

This supersedes the 2026-10-03 order. Items closed by the 2026-10-05 remediation are listed at the bottom rather than dropped, so the next inspection can see what was actually done.

## 🔴 Fix now (reds)

No station scored red. Two items below behave like reds because they are silent-failure mechanisms rather than gaps: nothing in the system reports them, and both already caused a defect to ship this week. They are items 1 and 2.

## 🟡 Schedule (yellows)

### 1. Nothing detects design-code token divergence, and it has now happened
- **Station:** 3 and 6 · **Evidence:** [verified] `--ink-charcoal-mute` changed from `#5A6160` to `#545B5A` in code on 2026-10-05. The Figma primitive stayed `#5a6160` for two days. For that window the design library carried a WCAG 1.4.3 failure on `surface-2` (4.29:1) that the code had already fixed (4.70:1). Corrected by hand during this inspection.
- **Why it's first:** the 2026-10-03 report predicted this in writing and it happened within 48 hours, to the person who wrote it. Both token lists are hand-maintained with no pipeline, so this recurs on every value change until something watches it.
- **First move:** a script in `qa/` that reads the Figma variables through the bridge, resolves aliases per mode, and diffs them against the custom properties in `src/layouts/Site.astro` on names and values. This inspection wrote that diff twice as a throwaway; make it a file.
- **Scope it wider than colour.** Both of my passes verified colour and nothing else. FigmaLint found the dimensional gap neither pass looked for (item 12). The parity check should cover spacing, radius and stroke bindings too, or it will keep certifying the one axis that already works.
- **AI assist:** an agent can write the script and wire it into `npm run qa`. A human decides which side wins when they disagree.
- **Done when:** changing a colour on one side and not the other fails a check.
- **Effort:** M

### 2. Three silent-drift mechanisms with no check behind them
- **Station:** 7 and 9 · **Evidence:** [verified] all three shipped a defect this week.
  - `public/docs/` is 94 files of committed build output. Editing the documentation source publishes nothing until someone runs `npm run build:docs` and commits the result. The live `/docs/components/section/` page served a broken code example after its source was fixed.
  - Nothing checks internal links in the documentation. A link to `/design-system/components/case-figure/` returned 404 in production, having passed a green Q&A run and a merged pull request.
  - `check:docs` verifies that documentation was *touched*, not that it was made *true*. Two stale statements in `docs/DESIGN-SYSTEM.md` went through it, and so did two stale tables in `docs/ARCHITECTURE.md`.
- **First move:** make the docs build part of the gate rather than a step someone remembers, and add a link check over the built `public/docs/`. Both are small and both would have caught a real defect this week.
- **Done when:** a documentation source change that is not rebuilt fails, and a 404 internal link fails.
- **Effort:** S

### 3. The agent layer is not in any repository
- **Station:** 9 and 10 · **Evidence:** [verified] `CLAUDE.md` is matched by `.gitignore:31` and `claude-context/` is ignored too. Neither is tracked. The generation test confirmed it from the other side: `CLAUDE.md` did not exist in a clean worktree. Only `public/llms.txt` is tracked, and that is a portfolio surface, not a system surface.
- **Why it matters:** `claude-context/design-system.md` was the highest-value fix in the 2026-10-05 batch and it exists on one disk, in no backup. Losing that disk loses the rules file and every routing destination behind it.
- **First move:** decide whether these are private or shareable. If private, a second private repo or an encrypted backup; if shareable, drop them from `.gitignore`. Either beats one copy.
- **Done when:** both files exist somewhere other than one working directory.
- **Effort:** S · **Suggested timing:** this week

### 4. The layout is undocumented, and there is still no whole-page example
- **Station:** 9 · **Evidence:** [verified] none of the 34 docs pages covers `Site.astro`. Its only props table is in `docs/ARCHITECTURE.md`, and until this pass that table omitted `variant`, the prop whose absence makes a page render unstyled. The generation test needed 19 distinct guesses and reported that one worked example would eliminate four or five of them.
- **Why it matters:** this is now the largest single gap in the system and it is unchanged from the 2026-10-03 order, where it was item 7.
- **First move:** a `Site` page under `components/` with `variant` in the props table, then one complete case study page from frontmatter to closing tag.
- **Done when:** a re-run of the generation test places the file and uses the layout without guessing.
- **Effort:** M · **Suggested timing:** this quarter, and it is the one to do first

### 5. `llms.txt` undersells the positioning
- **Station:** 9 · **Evidence:** [verified] it reads "looking for a Senior or Staff Product Designer seat" while the resume page says "Staff Product Designer" and the site positioning was deliberately opened to include Creative Director. `CONTRIBUTING.md` carries a checklist item requiring this file to be true.
- **First move:** rewrite that sentence · **Done when:** it agrees with `src/pages/resume.astro` and the home page · **Effort:** S
- **Suggested timing:** this week. It is the one open item with a cost outside the repo, since it is what an LLM reads when someone asks about Steve. Held from the last batch only because the wording is Steve's call.

### 6. Three definitions of done, agreeing on nothing
- **Station:** 7 · **Evidence:** [verified] `CONTRIBUTING.md` lists 10 items, the pull request template 7, `claude-context/checklists.md` 5. `CONTRIBUTING.md` still does not mention `npm run qa` once. Unchanged from the 2026-10-03 order, item 5.
- **First move:** make `CONTRIBUTING.md` the single list; the other two reference it · **Done when:** one list exists · **Effort:** S

### 7. Naming drifts three ways across design, code and docs
- **Station:** 4, carried forward unchanged (not inspected this pass) · **Evidence:** [verified 2026-10-03] only 5 of 13 traceable concepts carry the same name everywhere. `--text` is a colour inside a namespace of thirteen font sizes.
- **First move:** pick one target vocabulary, rename across all three assets in one pass, write the algorithm into `docs/DESIGN-SYSTEM.md`. Nothing outside the repo consumes these names, so this is the cheapest it will ever be.
- **Effort:** M · **Suggested timing:** this quarter, before the component set grows

### 8. Elevation has no design-side representation
- **Station:** 1 · **Evidence:** [verified] the Figma library has **zero effect styles**, and Figma cannot express a four-stop shadow as a single variable. The code side was fixed on 2026-10-05; the design side has nothing. This reframes item 8 of the previous order rather than closing it.
- **First move:** two Figma effect styles named to match `--shadow-card` and `--shadow-card-hover`.
- **Still open from the previous order:** three literal `box-shadow` declarations, in `Site.astro:680`, `index.astro:978` and `LogoScatter.tsx:101`, the last using `rgba(15, 23, 42, …)`, a slate in no palette. Each needs an answer to "should this be a card?"
- **Effort:** S

### 9. Four documentation contradictions found this pass, left open
- **Station:** 9 · **Evidence:** [verified] each confirmed against source. Each needs a judgement call, which is why none was fixed during the inspection.
  - `section.mdx` says a figure sits "at full width of the measure" while its own `figure` prop is "a full bleed figure band" and its example pairs `figure` with `inner={false}`, meaning no measure.
  - Two inner-class vocabularies coexist (`.section__inner`, `.section__inner--narrow`, `cs-body`) with no documented way to pass the narrow one through `CaseSection`.
  - `docs/DESIGN-SYSTEM.md`'s list of case study classes names five and omits `cs-quote`, `cs-back`, `cs-artifacts`, `cs-note` and `cs-figure__cap`, all real in `src/layouts/Site.astro`.
  - `StatList` is absent from the canonical page order the pattern page calls "the argument".
- **Effort:** S each

### 10. Smaller items, batchable
- **Station:** 1, 2, 4, 9 · **Evidence:** [verified] each
  - Three near-identical off-whites loose in `src/pages/index.astro`: `#F0EEE9` (an exact duplicate of `--paper-cloud`), `#EEEAE7` and `#F2F1EC`, plus two `#ffffff` in the animated components. Collapse to tokens.
  - 60 physical CSS properties against 4 logical across `src/`, and no `dir` on `<html>`. Only 1 of the 60 is in `src/components/ui/`, so the component library is nearly clean and the exposure is in the layout and pages.
  - Four misleading prop names: `hidden` on `Pager` collides with the HTML global attribute; `alt` means image alt text on `CaseFigure` and a darker background on `CaseSection`; `light` on `CaseFigure` looks boolean and is a second image source; `three` on `StatList` is a column count that can only say three.
  - The resume download and the home page "View case studies" are raw `<a class="btn btn--primary">` anchors that bypass `Button`. Needs `download` and `aria-describedby` passthrough first.
- **Effort:** S each

### 11. Carried forward, not inspected this pass
- **Station 5:** no evals or rubric for AI-assisted output, in a system built almost entirely with AI assistance. The pixel check is still excluded from CI and still compares a dev server to live production, which makes it unstable (two identical runs reported 2104 and 34439 differing pixels on one page). Commit a baseline.
- **Station 8:** nothing is instrumented; every adoption number comes from a script an inspection writes and throws away. No cadence beyond this kit.
- **Station 10:** three published Figma libraries, nothing marking the canonical one. Rename the two superseded ones, since the query surface returns library names.
- **Station 6:** `Button` now has a `variant` prop; Figma's `Direction=Previous|Next` still disagrees with code's `dir='prev'|'next'`. The pull request template still does not mention the design library at all.

### 12. Dimensional properties are mostly not bound to variables
- **Station:** 2 · **Evidence:** [verified] found by FigmaLint, then confirmed directly against the file. **110 of 504** dimensional properties across the library are bound: 21.8%. On the Components page, 52 of 115 (45%); on the Site page, 68 of 122 (56%). FigmaLint reported 29% with 20 hard-coded values, 16 spacing and 4 borders, on a narrower scope.
- **Why it is not as bad as the number:** every Button and Pager variant has its radius bound to `radius-sm`, resolving to 10px and matching the shipped CSS exactly. Most of the unbound bulk is documentation furniture on the Cover and Foundations pages.
- **Why it still matters:** the Spacing collection has nine tokens and the Foundations page itself uses 32, 24, 16 and 6 as literals. The library demonstrates the tokens without using them.
- **The real blocker underneath it:** Button's padding is 14/22 and Pager's is 18, in Figma *and* in the stylesheet, and none of 14, 22 or 18 is in the spacing scale (8, 16, 24, 32, 48, 64, 96, 128, 160). Binding them is impossible until the scale either gains those values or the buttons change shape. **That is a decision for Steve, not a cleanup.**
- **First move:** decide the padding question, then bind the documentation furniture, which needs no decision at all.
- **Done when:** the Components page clears 80% bound, and every value a component uses exists in a scale.
- **Effort:** M

### 13. The design file is silent on focus state
- **Station:** 3 · **Evidence:** [verified] FigmaLint's accessibility panel passes touch target size and minimum font size and flags **focus state**. Independently, Station 3 found no annotation kit, no page for specifying focus order or keyboard behaviour, and 9 of 12 component descriptions silent on accessibility. Two methods, one conclusion.
- **First move:** copy the keyboard and focus notes that already exist in the component docs into the matching Figma descriptions, and add a focus variant or an annotation layer to Button and Pager.
- **Effort:** S

## 🔧 Access upgrades (sharper next inspection)

Access was complete again this pass, including a write to the design library. Two things would still sharpen the next one.

- **Keep running FigmaLint.** It found in one pass a real gap that two of my inspections missed entirely, because it measures dimensional binding and I only ever measured colour. It also produced one false positive, the detached Button, which is a frame named after a component. Run it, then verify what it flags; that combination is stronger than either alone.
- **Connect a design-systems knowledge MCP**, so comparative claims can be cited rather than asserted from the technician's own knowledge.
- **Commit the throwaway scripts.** This inspection wrote a token parity diff, a hex-literal census, a physical-versus-logical property count and a page-height comparison, then discarded all four. As files in `qa/` they turn three stations from an inspection activity into a continuous one, and item 1 depends on the first of them.

## 🟢 Keeping the greens green

- **Station 3, Accessibility (9/10).** Seven checks on every push and pull request, each proven by breaking it first. The habit at risk is the second half: a check that has only ever passed is not evidence. Also: run them against production occasionally, not only against a local build. This pass did and it is a stronger signal.
- **Station 10, Agent access (8/10), newly green.** It got here because one stale file was corrected. It stays here only if that file keeps matching the code, which is item 1 and item 3 on this list.
- **Station 2, Best practices (8/10), carried forward.** Real descriptions and auto-layout before a component is done, and instances never detached. 23 instances and zero detached is a number worth re-checking rather than assuming.

## Cadence

- Re-inspect (deep, all ten stations): **2027-01-05**
- Partial re-inspection after any remediation batch, as this one was. It cost a fraction of the full pass and found three defects in the remediation itself.
- Everyday checks to wire into CI now: token parity (item 1), the docs build and an internal link check (item 2).
- Owner: Steven Vanden Heuvel · Review: still no ritual to triage this at, which remains the Station 8 finding. The practical substitute is to read items 1 through 5 at the start of the next working session on the site.
