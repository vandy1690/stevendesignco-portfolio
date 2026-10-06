# Work Order — Steven Design Co design system

_From inspection: `reports/2026-10-05-tokens-inspection.md` · Written: 2026-10-05 · Supersedes `2026-10-05-full-work-order.md`_

Reds get fixed now. Yellows get scheduled. Greens get left alone. Every item cites its station and evidence.

Items 1 to 4 are new or changed by the token pipeline landing. Items 5 onward carry forward from the previous order, unchanged and still open.

## 🔴 Fix now (reds)

No station scored red. Item 1 behaves like one: it is a documented instruction that destroys work, and it costs nothing to fix.

## 🟡 Schedule (yellows)

### 1. The repo tells you to change a token in a way that loses the change
- **Station:** 6, 9 · **Evidence:** [verified] `docs/DESIGN-SYSTEM.md`, "Changing a token", step 1: "Change it in `Site.astro`, in every theme block that defines it." For any of the 16 colour primitives that block is now generated between `TOKENS:START` and `TOKENS:END`, and the next build overwrites the edit. `foundations/colour.mdx` says so correctly; the repo document was not updated with it.
- **First move:** rewrite that section to split primitives from semantic tokens and point at the colour page rather than restating it.
- **Done when:** no document tells you to hand-edit the generated block · **Effort:** S

### 2. Nothing actually reads from Figma
- **Station:** 6 · **Evidence:** [verified] the only mentions of Figma anywhere in `scripts/` are comments. `primitives.tokens.json` is hand-maintained, so `build-tokens.mjs`'s own header, "Figma is the source of truth for primitive VALUES", is intent rather than mechanism. All 16 values match Figma exactly today, which is evidence of care and not of a guard.
- **Why it matters:** the pipeline closes the JSON-to-CSS direction and leaves the Figma-to-JSON direction a person remembering. That is the half that broke this week, twice.
- **First move:** either a script that exports the Primitives collection through the bridge and diffs it against the JSON, or an honest comment saying the JSON is the source and Figma follows. Both are defensible; claiming the first while doing the second is not.
- **Done when:** a value changed in Figma and not in the JSON fails something · **Effort:** M

### 3. `tokens:check` cannot stop a merge
- **Station:** 5 · **Evidence:** [verified] the guard exists and passes ("Tokens in step (16 primitives)"), and it appears in exactly one enforcing place: the `ship` script in `package.json`. The workflow has no tokens step.
- **First move:** add `npm run tokens:check` to `.github/workflows/qa.yml`. One line; the script already exists.
- **Done when:** a stale generated block fails a pull request · **Effort:** S

### 4. Fourteen variables have no code syntax
- **Station:** 2 · **Evidence:** [verified] coverage fell from 59 of 59 to **59 of 73**. The 14 without it are all the new work: `brand/focus`, `brand/focus-dark`, `focus-ring`, `line-height-normal`, and ten Type scale additions (`size/button`, `leading/button`, `size/link-sm`, `leading/link-sm`, `size/wordmark`, `size/card-title`, and four `font/weight-*`).
- **Why it matters:** code syntax is what makes the design-to-code name mapping explicit instead of guessed, and it is what Station 6's parity rests on.
- **Related:** eleven of those same variables have no CSS counterpart at all under any name. Either give them one or mark them design-only on purpose.
- **First move:** add WEB code syntax to the 14, before the next batch makes it a habit · **Effort:** S

### 5. The agent layer is not in any repository
- **Station:** 9, 10 · **Evidence:** [verified] `CLAUDE.md` is matched by `.gitignore:31`, `claude-context/` is ignored too, neither is tracked. The repo is **public**, so the fix is a private repo or an encrypted backup, never this one.
- **Note:** the comp floors were removed from `portfolio-astro/CLAUDE.md` on 2026-10-05, so that file is now safe to back up. `claude-context/` still holds bank details and client material and is not.
- **Effort:** S · **Timing:** this week

### 6. `llms.txt` is still stale in production
- **Station:** 9 · **Evidence:** [verified] the fix is written and sitting in an unmerged pull request. Production still reads "Senior or Staff Product Designer seat".
- **First move:** merge it · **Effort:** S

### 7. The layout is undocumented, and there is no whole-page example
- **Station:** 9 · **Evidence:** [verified] none of the 34 docs pages covers `Site.astro`. A generation test needed 19 guesses, and said one worked example would remove four or five of them. Unmoved across four inspections and still the largest structural gap.
- **Effort:** M · **Timing:** this quarter, first

### 8. Naming drifts three ways, and no convention is written down
- **Station:** 4, carried forward · **Evidence:** [verified 2026-10-05] 5 of 13 concepts share a name across design, code and docs. `--text` is a colour inside a namespace of font sizes. Zero files document a convention.
- **Effort:** M · Cheapest it will ever be; nothing outside this repo consumes the names.

### 9. Geometry binding, and the padding scale decision under it
- **Station:** 2 · **Evidence:** [verified] 176 of 458 bound, 38.4%, up from 36.3%. Colour is 283 of 283. Button's padding of 14 and 22 and Pager's 18 exist in neither scale, and the Spacing collection's one new variable is `line-height-normal`, not those values.
- **Blocked on:** a decision only Steve can make — the scale grows, or the components change shape.
- **Effort:** M after the decision

### 10. Elevation still has no design-side form
- **Station:** 1 · **Evidence:** [verified] zero effect styles, four inspections running. Figma cannot express a four-stop shadow as a variable, so effect styles are the only mechanism. Three literal `box-shadow` declarations also remain.
- **Effort:** S

### 11. Carried forward, unchanged
- **Station 5:** no evals for AI-assisted output; the pixel check still compares a dev server to live production and still cannot gate.
- **Station 7:** three conflicting definitions of done, and `CONTRIBUTING.md` still never mentions `npm run qa`; `public/docs/` is committed build output with nothing enforcing it matches source; no internal link check.
- **Station 8:** nothing instrumented; no cadence.
- **Station 10:** three published Figma libraries with nothing marking the canonical one.
- **Station 1/9:** three components carry props and have no props table.

## 🔧 Access upgrades

- **Keep FigmaLint in the rotation.** It found the geometry binding gap three of my inspections missed.
- **Commit the throwaway scripts.** Four inspections have now written a token parity diff and thrown it away. Item 2 is that script, kept.

## 🟢 Keeping the greens green

- **Station 6, Orchestration (8/10), newly green.** It got here because a pipeline landed. It stays only if the Figma side gets a mechanism (item 2) and the guard can actually block (item 3).
- **Station 3, Accessibility (9/10).** Seven checks on every push and pull request, each proven by breaking it first.
- **Station 10, Agent access (8/10).** Rests on one gitignored file staying correct, which is item 5.

## Cadence

- Re-inspect (deep, all ten): **2027-01-05**
- A partial pass after any significant change lands. This one took under an hour and found three things.
- Owner: Steven Vanden Heuvel
