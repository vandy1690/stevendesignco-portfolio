# GARAGE.md — Steven Design Co. Design System 2.0
_Checked in: 2026-10-03 · Re-confirmed 2026-10-05, 2026-10-08, 2026-10-22 · **Re-confirmed 2026-10-26** before a full ten-station pass · Re-confirm at next inspection_

## Vehicle
- System: Steven Design Co. design system 2.0, serving stevendesignco.com (one property, 11 routes) plus browsable labs under /labs, and **a second consumer**: stevendesignservices.com, which syncs the tokens and components down.
- Team: one person, side-of-desk · Consumers: **2 properties**, 0 other teams
- Age: v2 site live 6 May 2026. Component and token layers rebuilt 1–2 October 2026. **02.02.00 reached production 26 October 2026.**
- Reason for service: first full ten-station pass since 2026-10-08. Two releases shipped in four days, seven components landed, the Figma library was published, and the design bridge is reachable for the first time in two inspections.

## Assets
- **Design library:** Figma, "SDC Fall of 2026" (`TJjqs7XSz21Y72GRPnVAQB`), published. **18 components** (12 on 2026-10-08), **93 variables** in 6 collections, **17 text styles**, **0 paint styles, 0 effect styles**. A 1.0 library, "SDC Design Tokens", is still published.
- **Code library:** Astro 6.2.1 plus one React island, on Vercel. **23 components** in `src/components/ui/`, 8 light-DOM custom elements. **118 `--sdc-*` tokens**, two tiers; 28 colour primitives generated from `primitives.tokens.json`. Versioned in `sdc-version.json`, now **02.02.00**, four tags (`sdc-01.00.00` through `sdc-02.02.00`).
- **Docs:** Starlight in `docs-site/`, built into `public/docs`. **45 pages, 25 of them components.**
- **Process:** GitHub (vandy1690/stevendesignco-portfolio). `dev` is production. Branch protection: one required check, strict, force pushes blocked, admins deliberately not enforced. **20 PRs merged.** CONTRIBUTING 125 lines, CHANGELOG 241, a release-rules page, 4 releases logged and 4 tagged.
- **AI surface:** 9 Q&A checks (8 gating in CI), `custom-elements.json` generated and gated, `check-names`, `check-claims`, `check-docs-in-step`, `build-tokens --check`, and a **staleness guard on `sync-css.mjs`** added 2026-10-24. `SITE-CONTEXT.md`, `never-say.txt`, `llms.txt`, `docs/DESIGN-SYSTEM.md`, `docs/ARCHITECTURE.md` all tracked. `CLAUDE.md` and `claude-context/` gitignored by design. No Code Connect (no seat).

## Evidence access map
| Asset | Access 2026-10-26 | Verified how |
|---|---|---|
| Design library | **LIVE** — Figma Console MCP Desktop Bridge, read and write | `figma_get_status` probe: 5ms, file "SDC Fall of 2026". Whole-file sweeps via `figma.root.children` walks: 18 components, 93 variables, 95 frames, 17 text styles. Contrast computed from the design variables in both modes. |
| Code library | live — repo open | Every count measured with grep, node or python in session |
| Docs | live — source plus build | 45 pages read; `npm run build` run in `docs-site` |
| Process | live — GitHub API via `gh` | Branch protection, 20 merged PRs, tags, CI step list |
| Live agent test | **run** | One subagent given only the public context surfaces, asked to build a contact page |

**First inspection since 2026-10-08 with design-library access.** Stations 2, 3, 4 and 6 carried `[reported]` design-side claims for two runs; this run replaces them with measured ones.

## Known symptoms
- **Seven of 23 code components are used by nothing on stevendesignco.com**: Choice, Field, Fieldset, FormStatus, FormSummary, Select, Slider. They were built for the services site and the MsMadeline tester. `scripts/adoption.mjs` reports it.
- **The sync guard does not run in CI**, and `npm run ship` does not build the Storybook. The guard added on 2026-10-24 fires only when somebody runs the sync by hand, so a stale `storybook/src/sdc.css` can still ship. It protects the operation, not the artifact.
- **Zero effect styles in Figma.** Six shadow tokens, `--sdc-scrim` and `--sdc-texture-size` exist in code with no design-side counterpart. This is the whole of the design/code token gap.
- **Prop vocabulary collides in three places.** `tone` means `success` in FormSummary and `ok` in FormStatus. The same concept is `error` (string) in Field and `invalid` (boolean) in Select. `width` is a number in CaseFigure and `'narrow'` in CaseSection and TextPassage. The first two were introduced on one day, 2026-10-23.
- **11 generic "Frame" layer names and 6 unbound corner radii** in the Figma library, 9 and 4 of which are in components built 2026-10-24.
- **No behaviour tests and no evals.** Zero test files. Keyboard behaviour is asserted in exactly one place, `qa/checks/dialog.mjs`.
- **No visual regression baseline.** `qa/checks/pixel.mjs` still compares a dev server against live production, so it cannot catch a regression that already shipped.
- Two Figma libraries published (1.0 and 2.0) with only documentation saying which is current.
- Five documented patterns are CSS-only with no component: dialog, links, navigation, progress dots, row list.
- RESOLVED since 2026-10-22: the version collision (02.01.00 and 02.02.00 now distinct and tagged); the changelog gap; `--sdc-text-mute` documented as a dead hex; the Section page's wrong prop names; "sixteen colour primitives"; the status palette having no consumer; Display 3 pending promotion; the design library being unreachable.

## Probable greens
- Design craft: **99% auto-layout** (94 of 95 frames), **zero detached instances**, **100% of text sizes bound** to variables, 99% of fills bound
- Token parity: **82 of 82 shared names agree**, zero exist in Figma and not in code, values verified identical by computing contrast from both sides
- Contrast: **12 of 12 pairs pass in both Light and Dark**, computed from the design variables
- Release hygiene: 4 releases, 4 tags, each on the commit that reached production, changelog current to the day

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
- Stations: all 10 on 2026-10-03, 2026-10-08 and **2026-10-26**. Partial passes 2026-10-05 (1, 3, 7, 9, 10) and 2026-10-22 (1, 2, 5, 6, 7, 9).
- Scoring frame: **solo / side-of-desk**, now with two consumers rather than one.
- **Technician conflict of interest:** the inspecting agent built most of what is graded, including all seven components added in 02.02.00, the control tokens, the sync guard and the Figma Controls section, in the four days before this inspection. Steve's standing instruction is "counts over judgements": prefer measured numbers, state the sample, flag self-marked findings inline.
- **Known failure mode of this inspector, logged six times:** measuring one file or one spelling and writing the claim broadly. Caught twice more in this run before reporting (a filename-conversion bug made 7 components look undocumented when they are covered on their parent pages; a case-sensitive grep missed "Sixteen" on 2026-10-24). **Rule added 2026-10-22 after Steve caught an eleven-point scoring error: before scoring any station down, check the finding against git history and establish whether it is new.**
