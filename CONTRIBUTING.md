# Contributing

This is a one person project. This page is the working agreement for Steven,
and for any AI coding assistant or collaborator working in the repo.

## Before you start

- Read [README.md](README.md), then the doc in `docs/` that matches the work.
- Node 22.12 or newer. `npm install`, then `npm run dev`.

## Branches

- `dev` is production. A push to `dev` is a deploy to stevendesignco.com.
- Do the work on a branch made from `dev`. Name it for what it does, such as
  `rebuild/hiring-manager-2026-09` or `fix/pager-wrap`.
- Push the branch and check its Vercel preview before merging.
- Merge to `dev` when it is ready to be live. Do not force push `dev`.
- `main` is not deployed. Leave it alone.

Full detail is in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Commits

Look at `git log` and match it.

- The subject says what changed, in plain words, in the imperative: "Fix case
  study dialog not scrolling".
- No prefixes like `feat:` or `fix:`.
- When the reason is not obvious, the body explains why, what was checked, and
  what was deliberately left alone.
- One logical change per commit. A copy edit and a layout fix are two commits.

## Writing

The rules apply to site copy, alt text, docs, comments, and commit messages.

- No em dashes or en dashes.
- No contractions in anything a visitor reads.
- Plain language, real numbers, active voice.
- PayPal in the past tense.

More in [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md).

## Code

- **CSS.** Vanilla, with the tokens in `Site.astro`. Do not add Tailwind or a CSS
  framework. Do not hard code a colour or a spacing value that a token covers.
  A new token goes in every theme block.
- **JavaScript.** Plain TypeScript in an Astro `<script>`. Reach for React only
  when a piece really needs component state. Every behaviour needs a fallback for
  no JavaScript and for reduced motion.
- **Comments.** Say why, not what. This codebase comments the reason for anything
  that looks odd, often with the bug that caused it. Keep doing that.
- **Dependencies.** Keep them few. Each one is a thing to update and a thing that
  can break a build.
- **Do not turn off `inlineStylesheets`** without reading
  [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). The case study modal and the
  Storybook CSS sync both depend on it.

## Before you merge to `dev`

This is the one definition of done. The pull request template points here, and
so does `SITE-CONTEXT.md`.

The machine's half, one command:

```
npm run dev     # one terminal
npm run ship    # the other: tokens, manifest, naming, docs in step, docs build,
                # site build, the seven-check Q&A, never-say
```

CI runs the same gates on every pull request. If `ship` is green locally and
CI is red, the difference is the thing to look at.

The human's half, because no check sees it:

- [ ] Anything visual was compared against the live site: `npm run qa -- --pixel`.
      Every difference is one you meant.
- [ ] Keyboard pass on anything interactive. See [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md).
- [ ] Both themes still work, and reduced motion still gives a usable page.
- [ ] The pages you did not touch, and the places this content is reused, were
      looked at. The worst regressions here landed on pages nobody was editing.
- [ ] If the design library should change with this, it did, or the pull
      request says why not. Figma does not fail a check.
- [ ] Sitemap `lastmod` bumped for changed pages; `public/llms.txt` still true.
- [ ] `CHANGELOG.md` has a line for it. A design system change also bumps
      `src/styles/tokens/sdc-version.json` and the release log at
      `/docs/start/releases/`.

## Never commit

The repo is public. `.gitignore` already covers these, so do not force add them.

- `CLAUDE.md`, `COLLAB-LOG.md`, `claude-context/`, and `claude-code-handoff_*.md`.
  They hold private job search and business notes.
- `.env` files and anything with a password or key in it.
- `.vercel/`.
- Client or employer material that has not been cleared for the public site.

## Reporting a problem

Found a bug or an accessibility problem on the site? Open an issue on GitHub, or
email steven [at] stevendesignco [dot] com. Say which page, which browser, and
what you expected.

## Documentation stays in step

The design system is documented in three places, and they are not
interchangeable:

| Where | Holds | Drifts? |
|---|---|---|
| `public/labs/sdc-storybook` | Live rendering, token values, computed contrast | No. Regenerated from the running site each build. |
| `docs-site/` published at `/docs` | How, when, where, content rules, accessibility obligations | Yes, if nobody updates it. |
| `docs/` | Repo notes: architecture, deployment, labs | Yes. |

Before pushing a change that touches `src/layouts/Site.astro`,
`src/components/`, or the Storybook stories:

    npm run check:docs

It fails when the system changed and no documentation page did, and when
stories changed without the Storybook being rebuilt. Genuine exceptions use
`SKIP_DOCS_CHECK=1` with the reason in the commit message.
