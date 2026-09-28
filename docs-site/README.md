# SDC design system documentation

The written documentation for stevendesignco.com, published at `/docs`.
Answers how, when and where to use every component, for designers, engineers,
writers and testers.

## Why it is a separate project

The live site runs Astro 6; current Starlight requires Astro 7. Rather than
upgrade a working production site to add documentation, this builds
independently into `../public/docs`, the same way the Pattern Labs and
Storybooks are prebuilt into `public/labs/`.

Documentation should never be able to break the site it documents.

## Commands

    cd docs-site
    npm install
    npm run dev      # localhost:4331
    npm run build    # writes ../public/docs

The output is committed, so a site deploy publishes whatever was last built
here. After changing any page, run the build and commit both.

## Division of labour

| Where | Holds |
|---|---|
| This site | Prose. How, when, where, content rules, checks, accessibility obligations. |
| [Storybook](https://stevendesignco.com/labs/sdc-storybook/) | Live rendering, token values, computed contrast. Generated from the running site. |
| `docs/` in the repo root | Working notes for the repo itself: architecture, deployment, labs. |

Token values are deliberately not repeated here. The Storybook generates its
stylesheet from the running site and cannot drift; a second copy in prose could.

## Conventions

Every component page opens with the same three answers, in order: How, When,
Where, using the `.sdc-hww` list. Then Anatomy, States, Accessibility, Content,
Do and Don't, and Checks before you ship, as each applies.

Write for someone who does not read CSS. Where the site got something wrong and
fixed it, say so on the page: the failure is the most useful part.
