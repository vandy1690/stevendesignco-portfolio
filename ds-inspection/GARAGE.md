# GARAGE.md: Steven Design Co. Design System 2.0
_Checked in: 2026-10-03 · Re-confirmed 2026-10-05, 2026-10-08, 2026-10-22, 2026-10-26 · **Re-confirmed 2026-10-28** before a re-inspection of stations 2, 4, 5, 6, 9 and 10 · Re-confirm at next inspection_

## Vehicle
- System: Steven Design Co. design system 2.0, serving stevendesignco.com (one property, 11 routes) plus browsable labs under /labs, and two more consumers:
  - **stevendesignservices.com**, which syncs the tokens and components down and runs the SDS product theme.
  - **Designer Job Search** (`~/Documents/claude/LLC/LLC/site-analytics`), a local app, which copies `storybook/src/sdc.css` with `sync-sdc.mjs`. **Added as a consumer 2026-10-28.**
- Team: one person, side-of-desk · Consumers: **3 properties**, 0 other teams
- Age: v2 site live 6 May 2026. Component and token layers rebuilt 1–2 October 2026. 02.02.00 reached production 26 October 2026. **The SDS product theme reached production 27 October 2026 (#24) without a version bump.**
- Reason for service (2026-10-28): re-inspect the six yellow stations from 2026-10-26 and check every work order item. One PR shipped and one theme branch is in flight (`docs/sds-theme`, Marble to Chalk).

## Assets
- **Design library:** Figma, "SDC Fall of 2026" (`TJjqs7XSz21Y72GRPnVAQB`), published. **18 components**, **104 variables** in 6 collections (Color has three modes: Light, Dark, SDS), **17 text styles**, 0 paint styles, **6 effect styles** (added between 2026-10-26 and 2026-10-28). A 1.0 library, "SDC Design Tokens", is still published.
- **Code library:** Astro 6.2.1 plus one React island, on Vercel. **23 components** in `src/components/ui/`, 8 light-DOM custom elements. **134 `--sdc-*` names on production** (140 on `docs/sds-theme`), including 36 derived `-rgb` helpers; color primitives generated from `primitives.tokens.json`. Versioned in `sdc-version.json`, still **02.02.00**, four tags (`sdc-01.00.00` through `sdc-02.02.00`).
- **Docs:** Starlight in `docs-site/`, built into `public/docs`. **46 pages, 25 of them components.**
- **Process:** GitHub (vandy1690/stevendesignco-portfolio). `dev` is production. Branch protection: one required check, strict, force pushes blocked, admins deliberately not enforced. CONTRIBUTING, CHANGELOG, a release-rules page, 4 releases logged and 4 tagged.
- **AI surface:** 9 Q&A checks (8 gating in CI), `custom-elements.json` generated and gated, `check-names`, `check-claims`, `check-docs-in-step`, `build-tokens --check`, and a staleness guard on `sync-css.mjs` (manual only). `SITE-CONTEXT.md`, `never-say.txt`, `llms.txt`, `docs/DESIGN-SYSTEM.md`, `docs/ARCHITECTURE.md` all tracked. `CLAUDE.md` and `claude-context/` gitignored by design. No Code Connect (no seat). No `astro check`.

## Evidence access map (2026-10-28)

**Design library: LIVE.** Figma Console MCP Desktop Bridge, read and write. Probe 4 ms, file "SDC Fall of 2026". Whole-file sweeps with `figma_execute`: 18 components, 57 component frames, 67 text layers, 104 variables with every mode and alias, 6 effect styles and their users, all component property definitions.

**Code library: live.** Repo open. Production measured at `origin/dev`, the branch measured separately. Every count taken with grep, node or python in session.

**Docs: live.** All 46 pages read as source. Not rebuilt this pass.

**Process: partial.** The workflow file, scripts and git history read. GitHub run history and branch protection not re-checked this pass.

**Live agent test: run.** One subagent given only seven public context surfaces, asked to build a notification preferences page. 20 claims re-checked: 18 held.

## Known symptoms
- **Twelve documentation surfaces contradict the code**, four of them props tables or examples that break when copied (`sdc-eyebrow` three times, `inner={false}`). `check:docs` passes through all of them because it checks that docs were touched, not that they are true.
- **Nothing type-checks component props.** `astro check` runs nowhere, so an invalid value such as `tone="success"` on FormStatus ships silently.
- **The Q&A suite never renders the seven form components.** It runs on the 11 site pages, and none of them uses Choice, Field, Fieldset, FormStatus, FormSummary, Select or Slider.
- **The sync guard is manual.** Artifacts were in step on 2026-10-28 (74 of 74 classes, 134 of 134 tokens) by care, not by check. Designer Job Search's copy has its own `--check` flag that nothing runs.
- **Prop vocabulary collides in four places.** `tone` is `ok` in FormStatus and `success` in FormSummary, and FormStatus writes `--warn` and `--err` for its own `warning` and `error`. `error` (string) in Field versus `invalid` (boolean) in Select. `width` a number in CaseFigure and `'narrow'` elsewhere. Figma Button `Style` versus code `variant`.
- **Figma's SDS mode is half-migrated**: three grounds on Chalk (branch only), `header-bg` on Marble. It matches neither production nor the branch.
- **The SDS theme is unversioned**: 16 tokens added to production on 2026-10-27, version still 02.02.00.
- **The manifest covers 8 of 23 components**, `llms.txt` describes Steve's career rather than the system, and no component index exists.
- **No behavior tests, no evals, no visual baseline.** Zero test files. Keyboard is asserted only in `qa/checks/dialog.mjs`.
- **Designer Job Search defines 82 local `dash-` blocks**, including a switch, chips, a table, badges and a dialog that SDC does not offer. `dash-switch` and `dash-callout` are awaiting Steve's approval.
- Two Figma libraries published (1.0 and 2.0), with only documentation saying which is current.
- Five documented patterns are CSS-only with no component: dialog, links, navigation, progress dots, row list.
- **RESOLVED since 2026-10-26** (all in Figma):
  - Elevation now has six effect styles, identical to the code.
  - All 18 descriptions carry an ACCESSIBILITY section and a code line.
  - 0 unbound radii.
  - 1 generic layer name left, down from 11.

## Probable greens
- **Design craft:** 56 of 57 component frames use auto-layout. 0 unbound radii, fills, strokes or text sizes. Note that there are no instances inside components at all, so "zero detached instances" is trivially true.
- **Token parity:** 132 of 132 Light and Dark values identical design to code on production. 93 of 93 code-syntax variables resolve. 15 are spelled differently on the two sides (`size/*` and `--sdc-text-*`), all carried by code syntax.
- **Contrast:** 12 of 12 pairs passed in Light and Dark on 2026-10-26. SDS on Chalk is not yet measured from the design side.
- **CI depth:** 8 gating checks across 11 pages, 11 widths and both themes on every PR.

## Intentional deviations
- 11 one-off `clamp()` type sizes on the home page as per-page art direction, documented in `foundations/type`
- `--sdc-text-block-lede` shares endpoints with `--sdc-text-heading` but climbs differently
- Branch protection does not enforce for admins: a one-person repo where lockout is its own risk
- The 1.0 Figma library stays published so anything pointing at it keeps working
- No npm package; consumed in-repo and by file sync
- `pixel` deliberately outside CI because it compares against production
- `CLAUDE.md` and `claude-context/` gitignored because they hold private material
- 11 Figma variables carry no code syntax, marked design-only on 2026-10-08
- The Figma style `Display/3` binds to the variable `size/heading`: renaming the token would be a major version for no value change

## Scope & frame
- Stations: all 10 on 2026-10-03, 2026-10-08 and 2026-10-26. Partial passes 2026-10-05 (1, 3, 7, 9, 10), 2026-10-22 (1, 2, 5, 6, 7, 9) and **2026-10-28 (2, 4, 5, 6, 9, 10)**.
- Scoring frame: **solo / side-of-desk**, now with three consumers.
- **Technician conflict of interest:** the inspecting agent built most of what is graded, including all seven components added in 02.02.00, the control tokens, the sync guard, the Figma Controls section and Designer Job Search. Steve's standing instruction is "counts over judgements": prefer measured numbers, state the sample, flag self-marked findings inline.
- **Known failure mode of this inspector, logged eight times:** measuring one file or one spelling and writing the claim broadly. On 2026-10-28 a keyword search for accessibility guidance in Figma descriptions returned seven false misses, caught before reporting. Three undercounts from the 2026-10-26 run were found and corrected: British spellings (12 in 3 pages, actually 17 in 6), how-to-read omissions (7, actually 9), token name divergences (1, actually 15). **Rule added 2026-10-22 after Steve caught an eleven-point scoring error: before scoring any station down, check the finding against git history and establish whether it is new.**
