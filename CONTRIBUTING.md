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

- [ ] `npm run build` finishes clean
- [ ] Checked at phone width and desktop width
- [ ] Keyboard pass on anything interactive. See
      [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md)
- [ ] Reduced motion still gives a usable page
- [ ] No console errors
- [ ] Sitemap `lastmod` bumped for changed pages
- [ ] `public/llms.txt` still true
- [ ] Storybook resynced and rebuilt if shared CSS changed
- [ ] Docs updated if behaviour or setup changed
- [ ] `CHANGELOG.md` has a line for it

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
