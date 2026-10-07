# Site context: stevendesignco.com

Read this before any UI or copy change. It says where each kind of truth lives,
which content rules are settled, and what has to pass before anything ships. It
points at sources rather than copying them, so it cannot drift from them.

## How it ships

- Astro on Vercel, project `stevendesignco-dev`. **The `dev` branch is
  production.** `main` is stale.
- Ship through a pull request into `dev`, even a one-line copy fix, so the
  required check ("Accessibility, reflow and contrast") actually runs.
- Every address except stevendesignco.com and www sits behind a password prompt
  (`src/middleware.ts`). The password is in Steve's password manager under
  dev.stevendesignco.com. Vercel cannot show it back.

## Where the design system lives

| What | Where | Notes |
| :-- | :-- | :-- |
| Primitive color tokens | `src/layouts/Site.astro`, between `TOKENS:START` and `TOKENS:END` | Generated from Figma by `npm run tokens`. Never edit by hand. |
| Semantic tokens, shadows, type scale | `src/layouts/Site.astro`, below the generated block | Edit here. A new token gets a line in the docs. |
| Components | `src/components/` | |
| Documentation | `docs-site/src/content/docs/` | Published as built files in `public/docs`. Run `npm run build:docs` and commit the output, or the change never reaches /docs. |
| Storybook | `storybook/` | Built into `public/labs/sdc-storybook`. The build copies CSS from the running site, so start `npm run dev` first. |

The design system rules in Steve's global CLAUDE.md apply: no outside UI
frameworks, tokens only, and a missing component gets built on the system.

## Writing

The hard rules are in `CLAUDE.md` ("How to work with Steve") and the full banned
list is in `claude-context/writing-rules.md`. American English: color, gray,
center.

## Settled content rules

Facts that were argued out once and must not be re-argued or drifted from. Each
one that can be caught by wording also has lines in `never-say.txt`.

| Rule | Settled |
| :-- | :-- |
| MTG had one shared responsive framework across the brands, with a separate design system for each product built on top of it. Never one shared design system, one component library, or one token set across the brands. | 2026-09-02 |
| PayPal was a contract, December 2025 to August 2026. Past tense only. | 2026-09-14 |

When a new rule is settled, add a row here and the phrases to `never-say.txt`,
in the same commit.

## Before anything ships

```
npm run dev        # one terminal
npm run ship       # tokens, docs in step, docs build, build, Q&A, never-say
```

`npm run check:claims` runs the never-say list on its own. CI runs all of it on
every pull request.
