# Work Order — Steven Design Co. Design System 2.0

_From inspection: [`reports/2026-10-26-inspection.md`](../reports/2026-10-26-inspection.md) · Written: 2026-10-26_

Reds get fixed now. Yellows get scheduled. Every item cites its station and evidence. Steve owns prioritization.

**No reds.** Five yellow stations: 2, 4, 5, 6, 9, 10.

**Nine of the twelve items below are defects this inspector introduced between 23 and 26 October.** They are marked **(mine)**. Items 1 to 4 are not projects; they are four documents that currently contradict the code, and together they are most of what dragged stations 9 and 10 down.

---

## 🔴 Fix now (reds)

None.

---

## 🟡 Schedule (yellows)

### 1. The manifest covers 8 of 23 components, and the check passes anyway
- **Station:** 9 and 10 · **Evidence:** `[verified]` `custom-elements.json` declares 8 tag names; `src/components/ui/` holds 23 components. `npm run manifest:check` reports "in step (7 modules)" and exits 0, because it verifies the eight it knows about.
- **Why it's first:** `start/naming.mdx:34` sells this file as what "a tool or an agent can read without opening the source." It is the single artifact most likely to be handed to an agent, and it describes a third of the system. The live test's agent, given it alone, would have concluded there are no form controls.
- **First move:** decide what the manifest is for. Either extend `build-manifest.mjs` to emit an entry for every component in `src/components/ui/` including the ones that are not custom elements, or rename what it claims to be and point agents somewhere else.
- **AI assist:** generating entries from the `Props` interfaces is fully automatable; whether a non-custom-element belongs in a custom-elements manifest is a judgement call.
- **Done when:** the manifest's component count matches `ls src/components/ui/ | wc -l`, or the docs stop calling it the component API.
- **Effort:** M

### 2. A component index, generated so it cannot rot **(mine, in part)**
- **Station:** 10 · **Evidence:** `[verified]` no component index exists. `docs-site/.../index.mdx` has four prose cards and names no component. `start/how-to-read.mdx:46-48` lists fourteen components by name, omits all seven new ones, and says on the next line that "saying which is which is the point."
- **Why it matters:** the live test rated discoverability **3/10** and found the control set with `ls`, not with a document. This item and item 1 are the same root cause.
- **First move:** one page listing all 23 with import path, docs URL and whether it is a component or a CSS-only pattern, generated from the same source as the manifest.
- **Done when:** adding a component to `src/components/ui/` makes it appear without anyone editing prose.
- **Effort:** M

### 3. Four documents that contradict the code **(mine)**
- **Station:** 6 · **Evidence:** `[verified]` all four:
  - `docs/ARCHITECTURE.md:149` says "the 16 components"; there are 23. I corrected this line from 14 to 16 on 23 October and it was stale again three days later.
  - `docs/DESIGN-SYSTEM.md` carries none of the seven form components in its shared-components table and neither `--sdc-control-h` nor `--sdc-control-border` in its layout table, having been edited for this release.
  - `start/how-to-read.mdx:46-48`, see item 2.
  - `components/field.mdx:81-83` says "There is no disabled state... There is no error state yet either" twenty-five lines below a props table documenting `disabled` and `error`.
- **First move:** correct all four. Then stop writing component counts in prose, because this is the third inspection to find one wrong.
- **Done when:** no document states a component count, or a script checks every one that does.
- **Effort:** S to correct, M to make it structural

### 4. `select.mdx` documents a composition the code cannot perform **(mine)**
- **Station:** 2 and 6 · **Evidence:** `[verified]` `components/select.mdx:9-11` says Select "sits inside a Field for its label, hint and error, the same as an input." `Field.astro` contains **zero** `<slot>` elements.
- **Why it matters:** this was the one hard blocker in the live test. The agent had to hand-write `.sdc-field` markup that `field.mdx:12` explicitly says `Field.astro` owns, which is exactly the failure `how-to-read.mdx:56` warns about.
- **First move:** either give Field a slot so the documented composition works, or rewrite `select.mdx` to describe what Select actually is. The slot is the better answer, because `FormSummary` and `FormStatus` will want the same treatment.
- **Done when:** the documented example compiles.
- **Effort:** S either way

### 5. Three prop collisions, two of them a day old **(mine)**
- **Station:** 4 · **Evidence:** `[verified]` `FormSummary` takes `tone: 'error' | 'warning' | 'success'`; `FormStatus` takes `tone: 'ok' | 'warning' | 'error'`. `Field` signals invalid with `error?: string`; `Select` with `invalid?: boolean`. `width` is a number in `CaseFigure` and `'narrow'` in `CaseSection` and `TextPassage`.
- **First move:** pick one word per pair. `success` over `ok`, and one of `error`/`invalid`. The `width` collision predates this period and is the lower priority.
- **AI assist:** the rename is mechanical; which word wins is Steve's call, and either is a minor version since nothing external consumes these yet.
- **Done when:** a shared prop name means one thing.
- **Effort:** S

### 6. The sync guard does not run in CI **(mine)**
- **Station:** 5 · **Evidence:** `[verified]` `grep -c "sync\|storybook" .github/workflows/qa.yml` returns **0**, and `npm run ship` does not build the Storybook.
- **Why it matters:** the guard was built on 24 October specifically to stop a stale `storybook/src/sdc.css` shipping. It only fires when somebody runs the sync by hand, so the failure it prevents can still happen. It protects the operation, not the artifact.
- **First move:** add `npm run sync -- --check` to `ship` and as a CI step.
- **Done when:** CI fails if the committed `sdc.css` is behind `Site.astro`.
- **Effort:** S

### 7. Twelve British spellings in three pages **(mine)**
- **Station:** 2 · **Evidence:** `[verified]` `colour`, `grey` and `behaviour` across `choice.mdx` (5), `form-messages.mdx` (6), `fieldset.mdx` (1). **Zero across the other 42 docs pages.** Steve ran a US-spelling pass on 22 October; these pages were written on the 23rd and reintroduced it, against `SITE-CONTEXT.md:33`.
- **First move:** fix the twelve. Then consider adding the four words to `never-say.txt`, which already runs in CI and would have caught this.
- **Done when:** `grep -riE "colour|grey|behaviour" docs-site/src/content/docs/` is empty, or the words are in the never-say list.
- **Effort:** S

### 8. No submit control, so the system can build a form it cannot submit
- **Station:** 1 · **Evidence:** `[verified]` `Button.astro` requires `href`; `components/button.mdx:47` says "Every button on this site is a link." No form wrapper, no `patterns/form.mdx`. The live test put `.sdc-btn` on a native `<button type="submit">` and called it the worst line in its output.
- **Why it matters:** this is the documented Button deviation colliding with the new control set, and nobody noticed when the set shipped.
- **First move:** decide whether Button gains a button mode, or a separate submit control exists, or forms are explicitly consumer-only and the docs say so. Then a `patterns/form.mdx` assembling the pieces, with the focus-management script `form-messages.mdx:24` promises and does not provide.
- **Done when:** a form can be built and submitted entirely on-system, or the limit is written down.
- **Effort:** M

### 9. Elevation has no design-side form
- **Station:** 6 · **Evidence:** `[verified]` Figma has **zero effect styles**. Six shadow tokens plus `--sdc-scrim` and `--sdc-texture-size` are the entire design/code token gap; everything else is 82 for 82.
- **First move:** six effect styles in Figma bound to the shadow values. The bridge is open and this is a ten-minute job.
- **Done when:** a designer can apply the system's elevation without reading CSS.
- **Effort:** S

### 10. Ten Figma components carry no accessibility guidance, twelve name no code
- **Station:** 3, 6 and 10 · **Evidence:** `[verified]` 8 of 18 descriptions mention keyboard, focus, screen readers or contrast. 6 of 18 name a `.astro` file or an `sdc-` class, and those six are the ones written on 24 October.
- **Why it matters:** with no Code Connect seat the description is the only design-to-code bridge there is.
- **First move:** add a code pointer to all eighteen and a11y notes to the ten that are silent. Mechanical over the bridge.
- **Effort:** M

### 11. Generic layer names and unbound radii in the library **(mine)**
- **Station:** 2 · **Evidence:** `[verified]` 11 layers named "Frame", 9 of them in Field, Fieldset and Select. 6 corner radii not bound to a variable, 4 of them in Field, Choice, Form summary and Form status.
- **First move:** rename and bind over the bridge.
- **Effort:** S

### 12. No behaviour tests, no evals, no visual baseline
- **Station:** 5 · **Evidence:** `[verified]` zero test files. Keyboard asserted in one check. `pixel.mjs` compares a dev server against live production, so it cannot catch a shipped regression.
- **First move:** a committed visual baseline so `pixel` can gate, then one rubric-based eval for agent-written components.
- **Effort:** M each · **Suggested timing:** this quarter

---

## 🔧 Access upgrades

1. **Keep the Desktop Bridge open during inspections.** It was reachable for this run and not for the two before, and it is the difference between `[reported]` and `[verified]` on four stations. Without it, stations 2, 3, 4 and 6 are half-inspections.
2. **Code Connect needs a seat.** Until then the Figma component description is the only design-to-code bridge, which is why item 10 matters more than it otherwise would.
3. **A design-systems knowledge MCP** would make station 1's benchmark citable rather than recalled: `claude mcp add --transport http design-systems https://design-systems-mcp.southleft.com/mcp`.

---

## 🟢 Keeping the greens green

- **Station 7, governance.** Four releases, four tags, a changelog current to the day, and a version collision found and fixed properly. The habit that holds it: bump in the same PR as the change, tag the commit that reached production.
- **Station 8, adoption.** The product-to-system-to-product loop genuinely ran this month. Keep `adoption.mjs` honest by running it, and finish the services-site migration.
- **Station 3, accessibility.** 12 of 12 contrast pairs pass in both themes from the design variables. Recompute from the design side at every inspection, not just from code.
- **Station 1, coverage.** The control set closed the largest gap in the system. Keep it by finishing the form, item 8.
- **The token pipeline.** 82 of 82 names agreeing with identical values is the strongest single result in this report. `tokens:check` is what holds it.

---

## Cadence

- **Items 1 to 4 and 7:** before the next deploy. Five documents that are currently wrong.
- **Items 5, 6, 9, 11:** this month. All small, all mine.
- **Items 8, 10, 12:** this quarter.
- **Re-inspect (partial, stations 4, 9, 10):** after the manifest and the index land. Those three stations share one root cause.
- **Re-inspect (deep, all ten):** 2027-01-26.
- **Wire into CI now:** `sync --check` (item 6) and a count check. Five inspections, one unchanged pattern: **the generated layers stay true and the hand-written ones rot.** This release produced the best token parity and the worst documentation drift the system has had, in the same four days, which is the cleanest statement of that pattern yet.
- **Owner:** Steve. **Review:** at the next inspection.
