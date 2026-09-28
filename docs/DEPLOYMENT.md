# Deployment

The site is hosted on Vercel and deploys from GitHub. This page describes the
setup as it was checked on September 19, 2026.

## The one thing to know

**`dev` is the production branch.** Every push to `dev` builds and goes live on
stevendesignco.com within a couple of minutes. `dev` is also the default branch
on GitHub.

`main` is not deployed to the live site. It is an older line and is behind `dev`.

## How a change reaches the site

| You push to | Vercel builds | Where it shows up |
|-------------|---------------|-------------------|
| `dev` | A production deployment | `stevendesignco.com` and `www.stevendesignco.com`. `dev.stevendesignco.com` is attached to the same project and sits behind the password gate |
| Any other branch | A preview deployment | A unique `*.vercel.app` URL, listed on the commit in GitHub and in the Vercel dashboard |

The safe workflow:

    git checkout -b my-change dev
    # work, commit
    git push -u origin my-change
    # open the Vercel preview URL and check it
    git checkout dev
    git merge my-change
    git push origin dev        # this goes live

## Who can see what

Two separate gates protect anything that is not the public site.

1. **Vercel Authentication** covers every `*.vercel.app` deployment URL. You
   need to be signed in to the Vercel team to open a preview. Custom domains are
   exempt.
2. **The site's own password gate** (`src/middleware.ts`) covers any host that is
   not `stevendesignco.com` or `www.stevendesignco.com`. That includes
   `dev.stevendesignco.com`. The browser asks for a username and password. Leave
   the username blank and enter the value of `SITE_PASSWORD`.

The password is not in this repo. It lives in the Vercel project's environment
variables.

## Environment variables

| Name | Where | Purpose |
|------|-------|---------|
| `SITE_PASSWORD` | Vercel project settings | The Basic auth password for non public hosts. If it is missing, the gate fails open and those hosts are public |

Nothing else is needed. The Google Analytics ID and the Adobe Fonts kit ID are
constants in `src/layouts/Site.astro`, since both are public values that appear
in the page source anyway. Analytics loads only in production builds.

For local work you do not need a `.env` file. The gate is skipped in dev.

## Build settings

| Setting | Value |
|---------|-------|
| Framework preset | Astro |
| Build command | `npm run build` |
| Adapter | `@astrojs/vercel`, server output |
| Node on Vercel | 24.x |
| Node locally | 22.12 or newer, per `package.json` engines |

`public/` is copied into the build as is. That is how the libraries under
`public/labs/` ship: they are built on your machine and committed, and Vercel
only copies them. Vercel does not run Storybook or Pattern Lab. If a lab looks
stale on the live site, it was not rebuilt and committed.

## Check a deploy

1. Watch the deployment in the Vercel dashboard, or the check on the commit in
   GitHub.
2. Load the page you changed on the live domain. Hard refresh.
3. If you changed a lab, open it under `/labs/` and click through a few pages.
4. If you changed a title or a social card, run the URL through the LinkedIn
   Post Inspector.

## Roll back

Fastest: in the Vercel dashboard, open Deployments, find the last good
production deployment, and choose Instant Rollback. The live site switches in
seconds and no code changes.

Then fix the branch, so the next push does not bring the problem back:

    git revert <bad commit>
    git push origin dev

Do not force push `dev`.

## Domains and DNS

- DNS is managed at GoDaddy. The records point at Vercel.
- The apex, `www`, and `dev` are all attached to the one Vercel project.
- The canonical URL in the page head is `https://www.stevendesignco.com`.

## Local production check

    npm run build

A clean build is the check. The Vercel adapter does not support
`astro preview`, so to click through a production build, push a branch and use
its Vercel preview URL.
