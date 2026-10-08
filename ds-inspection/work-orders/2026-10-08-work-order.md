# Work Order — Steven Design Co design system

_From inspection: `reports/2026-10-08-inspection.md` · Written: 2026-10-08 · Supersedes `2026-10-05-tokens-work-order.md`_

Reds get fixed now. Yellows get scheduled. Greens get left alone (and celebrated). Every item cites its station and evidence. The team owns prioritization; this is the technician's recommendation.

## 🔴 Fix now (reds)

No station scored red. Item 1 is the thing to do before anything else, because until it is done the system is two versions: the one inspected and the one in production.

### 1. Ship 02.00.00
- **Station:** 7 · **Evidence:** [verified] the inspected state is branch `chore/sdc-token-prefix` at `5d50fbf`, four commits ahead of `dev`; production serves 01.00.00 with the old names; the Figma library now carries the new names, so design and production disagree until this lands.
- **Why it's first:** every green in the report is on the branch. The release process (version file, tag, release log, changelog) has never been exercised; its first run is the test of Station 7.
- **First move:** push the branch, open a pull request into `dev`, let CI run the eight gates, merge, then set `released` in `sdc-version.json`, tag the merge `sdc-02.00.00`, push both tags, publish the Figma library.
- **AI assist:** the agent can open the PR and verify the deploy and the live `sdc-version` meta tag; the merge and the Figma publish are Steve's.
- **Done when:** `curl -s https://www.stevendesignco.com/ | grep sdc-version` prints 02.00.00 and the tag exists on the remote · **Effort:** S

## 🟡 Schedule (yellows)

### 2. A design-to-code parity check that runs on demand
- **Station:** 6 · **Evidence:** [verified] the 2026-10-07 rename left all 59 Figma code syntaxes naming tokens that no longer existed, and nothing noticed for a day. Figma's Variables REST API is Enterprise-only and Code Connect returns a seat error, so CI cannot read the library.
- **First move:** a short procedure, or a skill, that runs through the Desktop Bridge: read every variable's WEB code syntax, check each against the tokens in `Site.astro`, read every component name, check each against the manifest and docs titles, and print the mismatches. It cannot run in CI; it can run in one command before a release, and the definition of done can name it.
- **Done when:** the pre-release step is one command and it would have caught the 2026-10-07 drift · **Effort:** S
- **Suggested timing:** before the first release after 02.00.00

### 3. Elevation in the design library
- **Station:** 1, 6 · **Evidence:** [verified] zero effect styles in Figma, five inspections running, against seven shadow tokens in code.
- **First move:** seven effect styles named after the tokens (`shadow/card`, `shadow/card-hover`, `shadow/float`, `shadow/modal`, `shadow/chip`, `shadow/tile`, plus `scrim` as a colour style), descriptions pointing at the Elevation page.
- **Done when:** a designer can apply the card shadow from the library · **Effort:** S · **Suggested timing:** this quarter

### 4. Pager vocabulary, one form
- **Station:** 4, 6 · **Evidence:** [verified] Figma `Direction=Previous|Next`, code `direction="prev"|"next"`.
- **First move:** rename the Figma variant values to `prev|next`, or the code's to `previous|next`. Either; the docs name wins and the docs say `prev`.
- **Done when:** the same value works in both · **Effort:** S · **Suggested timing:** with item 3

### 5. Published docs are committed build output
- **Station:** 7 · **Evidence:** [verified] CI builds `docs-site` but does not compare the result to `public/docs`, so a docs edit that is not rebuilt publishes nothing.
- **First move:** in CI, after the docs build, `git diff --quiet public/docs` excluding Pagefind's hashed index files; fail if it differs. Or stop committing the output and build docs on deploy, which is the larger change and the right one eventually.
- **Done when:** an unrebuilt docs edit fails a pull request · **Effort:** S for the diff, M for the build-on-deploy

### 6. The four CSS-only pieces
- **Station:** 1 · **Evidence:** [verified] dialog, navigation, progress dots and row list have docs pages and no component file; each has exactly one instance.
- **First move:** none until a second instance appears. Write that rule on each docs page ("one instance, styled in place; becomes a component the day a second one is needed") so the gap is a decision.
- **Done when:** the four pages say so · **Effort:** S

### 7. `llms.txt` does not mention the system
- **Station:** 9 · **Evidence:** [verified] no line for `/docs`, `/custom-elements.json` or the tokens file.
- **First move:** three lines · **Done when:** an agent reading `llms.txt` can find the manifest · **Effort:** S

### 8. The canonical Figma library is not marked in Figma
- **Station:** 10 · **Evidence:** [verified] three published libraries; only the docs say which is current.
- **First move:** unpublish or rename the 1.0 libraries with "superseded" in the name · **Effort:** S · Steve's call, since things may point at them

## 🔧 Access upgrades (sharper next inspection)

- The bridge is read and write now; keep the Desktop Bridge plugin open in "SDC Fall of 2026" in Design mode when an inspection runs. Dev Mode makes it read-only and the plugin closing mid-run cost one retry today.
- A second technician. Every green on this report was built and graded by the same agent in the same session. The cheapest sharpening available is an inspection by an agent that did not do the work.

## 🟢 Keeping the greens green

- **1 Coverage:** `npm run adoption --check` in CI, so a component falling out of use fails something.
- **2 Best practices:** the PostToolUse hook and `check:names` already run on every edit and every PR; keep them.
- **3 Accessibility:** one manual screen-reader pass per release, recorded in the PR.
- **4 Shared language:** when a concept is renamed, rename it in Figma, code and docs in the same change; the validator covers code, item 2 covers Figma.
- **5 Testing:** keep the pixel check report-only and read it every time; it caught two real regressions today that nothing else did.
- **7 Governance:** bump `sdc-version.json` and the release log in the same PR as the change; CONTRIBUTING says so.
- **8 Adoption:** run `npm run adoption` at each inspection and paste the table into the report.
- **9 Machine-readable:** `manifest:check` is in CI; the manifest cannot drift.
- **10 Agent access:** when a rule is settled, it goes in `SITE-CONTEXT.md` and `never-say.txt` in the same change.

## Cadence

- Re-inspect (deep, all stations): **2027-01-05**. Partial pass (stations 6, 7) after 02.00.00 ships.
- Everyday checks to wire into CI now: `npm run adoption --check` (item in "keeping the greens green"); the docs build diff (item 5).
- Owner of this work order: Steve · Review: at the next design system session, before Artistic Eye starts
