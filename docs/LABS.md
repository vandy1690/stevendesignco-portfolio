# Labs

Five browsable component libraries live under `/labs/`. They are the working
proof behind the design systems claims on the site. Each one is a static build
committed in `public/labs/`, and Vercel copies them into the site as is.

| URL | Folder | What it is | Size |
|-----|--------|------------|------|
| `/labs/plate/` | `public/labs/plate` | The original Plate Pattern Lab, atomic design | 16 MB |
| `/labs/altmeat/` | `public/labs/altmeat` | The Alt-Meat Pattern Lab. Same structure, its own palette and type | 8 MB |
| `/labs/plate-storybook/` | `public/labs/plate-storybook` | Plate converted to Storybook in 2026, built in Cursor | 20 MB |
| `/labs/altmeat-storybook/` | `public/labs/altmeat-storybook` | Alt-Meat converted to Storybook in 2026 | 11 MB |
| `/labs/sdc-storybook/` | `public/labs/sdc-storybook` | This site's own component library | 7 MB |

Together they are about 61 MB of the 68 MB in `public/`.

## Where they are linked

- `/design-systems` links to all five.
- `/work` lists the four Plate and Alt-Meat libraries under Labs.
- The Plate and Alt-Meat case studies link to their own libraries.

## They are unlisted on purpose

`public/robots.txt` disallows `/labs/`, and none of the labs are in the sitemap.
They are there for a person who follows a link from a case study, not for search
results. Tool generated pages with thin text would dilute the site in search.

The labs are public. They sit on the public domain, so the password gate does
not apply. Do not put anything in a lab that should not be seen.

## Source

| Library | Source |
|---------|--------|
| SDC Storybook | In this repo, in `storybook/`. See [storybook/README.md](../storybook/README.md) |
| The other four | Not in this repo. Only the built output is here |

For the four without source here, treat the folder as an archive. Past fixes
(branding, favicons, asset paths, blank images) were committed here as changes
to the built files. That is fine for an archive. Anything larger should be done
in the source project and rebuilt.

## Rebuild the SDC Storybook

    cd storybook
    npm install
    npm run build

That syncs the site CSS and writes the build to `public/labs/sdc-storybook/`.
Commit the output with the source. The sync needs the site running on port 4321,
or pass it the production URL. Details and troubleshooting are in the Storybook
README.

## Rules for anything under `/labs/`

- **Relative asset paths.** A lab runs from a subfolder. A path that starts with
  `/` points at the site root and breaks. The Storybook builds set `base: './'`
  for this.
- **Same origin images are fine.** The SDC Storybook points its images at the
  site's `/images/...` on purpose, so they are not stored twice. They only
  resolve when the lab is served from the site.
- **Commit the build.** Vercel does not build the labs. If it is not committed,
  it is not live.
- **Check after deploy.** Open the lab on the live domain and click through a
  few pages. Broken asset paths only show up once it is served from `/labs/`.
- **Mind the size.** Every lab adds to the repo and to every clone. Compress
  images before committing a rebuild.
