# GARAGE.md — Steven Design Co. Design System 2.0
_Checked in: 2026-10-03 · Re-confirmed 2026-10-05 after the easy-wins remediation (PR #5) · Re-confirmed 2026-10-08 after the 02.00.00 namespace and custom element work (branch `chore/sdc-token-prefix`, unreleased) · Re-confirm at next inspection_

## Vehicle
- System: Steven Design Co. design system 2.0, serving stevendesignco.com (one property, 11 routes) plus five browsable labs under /labs
- Team: one person, side-of-desk · Consumers: 1 property, 0 other teams
- Age: v2 site live 6 May 2026. Component and token layers rebuilt 1–2 October 2026 against a Brad Frost gap analysis. Figma library 2.0 built 1–2 October; a 1.0 Figma library (April 2026) remains published.
- Reason for service: verification pass after a large remediation. The system went from "documentation and a Storybook with no code library" to components, tiered tokens, CI and a published Figma library in two days. The 2026-10-03 inspection was the check on whether that landed (71/100). The 2026-10-05 pass is a partial re-inspection of stations 1, 3, 7, 9 and 10, the ones the first work order's easy wins touched.

## Assets
- Design library: Figma, "SDC Fall of 2026" (file key TJjqs7XSz21Y72GRPnVAQB), published. 5 pages (Cover, Foundations, Components, Site, UX flow). 6 variable collections, 59 variables, 10 text styles, 12 components. A separate 1.0 library, "SDC Design Tokens" (April 2026, colour only, every variable ALL_SCOPES), is still published.
- Code library: Astro 6.2.1 + a small amount of React, repo `portfolio-astro`, deployed on Vercel. **16 components** in `src/components/ui/` as of 2026-10-08 (CaseStudyCard and TextPassage added; CaseMeta renamed MetaRow). The containers render as light-DOM custom elements (`<sdc-section>`, `<sdc-layout-container>`, `<sdc-case-hero>`, `<sdc-case-block>`, `<sdc-case-figure>`, `<sdc-button-group>`, `<sdc-card>`, `<sdc-text-passage>`), no shadow DOM, no script; native-role elements keep their element plus an `sdc-` class. No package: consumed in-repo only. Tokens are CSS custom properties in `src/layouts/Site.astro`, two tiers, every name `--sdc-*`; primitives generated from `src/styles/tokens/primitives.tokens.json` by `scripts/build-tokens.mjs`. Versioned: `src/styles/tokens/sdc-version.json`, semantic versioning, 01.00.00 tagged on production, 02.00.00 on the branch.
- Docs: Starlight (separate Astro project in `docs-site/`), builds into `public/docs`, published at /docs. **39 pages** as of 2026-10-08: 19 components, 7 foundations (Elevation added), 2 patterns, 4 practices, 6 start (Naming, Releases, The page shell added). `Site.astro` is documented at /docs/start/page-shell. `public/docs` is committed build output, not generated at deploy.
- Process: GitHub (vandy1690/stevendesignco-portfolio). `dev` is production. Branch protection requiring the Q&A check, strict mode, force pushes blocked, admins not enforced. PR template. Five PRs, all merged through the gate. Changelog current through 2026-10-05. No issue tracker in use, no support channel (team of one). Three separate pre-merge checklists that do not agree.
- AI surface: Figma Console MCP (Desktop Bridge) connected and able to write; seven-check Q&A suite (`qa/`) locally and in CI with a real-browser warm-up; `custom-elements.json` generated from the components; `SITE-CONTEXT.md` and `never-say.txt` at the root; `scripts/check-names.mjs` naming validator; `scripts/adoption.mjs`; llms.txt current. `CLAUDE.md` and `claude-context/` remain gitignored by design (private material). No Code Connect (seat).

## Evidence access map
| Asset | Access | Verified how |
|---|---|---|
| Design library | live — Figma Console MCP Desktop Bridge (`figma_execute`), read and write | Probe 2026-10-08, 8ms roundtrip, file "SDC Fall of 2026": 12 components, 73 variables, 17 text styles, 6 collections, 34 instances. Whole-file sweeps via `figma.root.findAll`. Writes used with Steve's go on 2026-10-08: code syntax and four component renames. |
| Code library | live — repo open | Read and written throughout; `src/components/ui/`, `src/layouts/Site.astro`, `qa/` all read directly |
| Docs | live — local source + published site | `docs-site/src/content/docs/` read directly; https://stevendesignco.com/docs reachable |
| Process | live — GitHub API via `gh` | Branch protection, 4 PRs, CI runs, check names all read directly |

## Known symptoms
- RESOLVED 2026-10-02 (d8b7289): the resume PDF is the real master document rather than a print of the web page. Nothing still checks that the two match.
- Two Figma libraries published (1.0 and 2.0) with only documentation telling anyone which is current
- Five components documented and real in Figma are still CSS-only in code: the case study card, dialog, navigation, progress dots, row list
- Another editing session has uncommitted changes in the working tree; two agents on one repo. Still unresolved 2026-10-05: 11 modified files plus an untracked `vercel.json`, on the branch that deploys to production.
- `public/docs/` is 94 files of committed build output. Editing the documentation source publishes nothing until someone runs `npm run build:docs` and commits the result, and `check:docs` does not catch the gap. It had already drifted once, found 2026-10-05.
- Design and code token values are hand-kept in agreement with nothing detecting divergence. Demonstrated live: a colour changed in code on 2026-10-05 and the Figma primitive stayed stale for two days until this inspection caught it.
- The Figma library has zero effect styles, so elevation exists in code and has no design-side representation at all.

## Probable greens
- Accessibility: seven automated checks pass on production, both themes, 11 pages × 11 widths
- Documentation: 34 pages, with a build gate that fails when docs fall out of step with the code
- Token tiering: primitives → semantic, both themes, every Figma variable carries code syntax and scoped pickers (0 ALL_SCOPES)

## Intentional deviations
- The home page keeps 11 one-off `clamp()` type sizes as per-page art direction rather than tokens. Documented in `foundations/type`. The stated rule: two pages use a size, it becomes a token; one page uses it to solve one composition, it stays local.
- `--text-block-lede` shares endpoints with `--text-heading` but climbs at a different rate. Deliberately not collapsed; documented on the variable.
- Branch protection does not enforce for admins, deliberately: a one-person repo where lockout is its own risk.
- The 1.0 Figma library stays published so anything pointing at it keeps working.

## Scope & frame
- Stations 2026-10-03: all 10. Stations 2026-10-05: 1, 3, 7, 9, 10 only, chosen because those are the ones the first work order's easy wins touched. Scoring frame: **solo / side-of-desk**. A green here means "healthy for a system with one maintainer and one consumer", not platform-org maturity.
- Out of scope: the five labs under /labs (Pattern Labs and Storybooks from prior roles), the resume build pipeline in the Job Hunt folder.
- **Technician conflict of interest:** the inspecting agent built most of the code library, token tiers, CI and Figma library being graded, 1–2 October 2026, and performed the 2026-10-05 remediation it then re-inspected. Self-marking is flagged per finding. A second opinion on any red is worth more than this agent's green.
- What the 2026-10-05 pass found about the 2026-10-03 pass: two Station 1 counts had been measured on one file and written as if they covered `src/`, both in a flattering direction. The re-inspection corrected them. Treat unsourced counts in the first report as narrower than they read, and prefer the second report's numbers where they conflict.
