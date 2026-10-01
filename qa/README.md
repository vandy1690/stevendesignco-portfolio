# Q&A

Run this before shipping anything.

```
npm run dev          # the suite needs the site running
npm run qa           # every check against localhost
npm run qa -- --prod # the same checks against the live site
npm run qa -- axe    # one check by name
npm run qa -- --pixel # add the pixel comparison, which is slow
npm run ship         # docs check, build, then the Q&A pass
```

## What is in here, and why

Every check exists because something got through. None of them are speculative.

| Check | Catches | Got through as |
|---|---|---|
| `reflow` | Sideways scrolling and targets under 24px, 11 pages x 11 widths | The PayPal orbit widened the page below 390px for as long as the page existed. Four links sat between 19 and 22px. |
| `axe` | WCAG 2.2 A and AA, on every page **and** with every dialog open | A whole stylesheet stopped reaching the dialog while every standalone page was perfect. |
| `dialog` | The case styles reach the injected content; focus trap, inert, scroll, Escape, focus return | The dialog injects a case page's `<main>` contents without the `<main>` element, so rules scoped to a class on it silently stopped matching. |
| `text-spacing` | Clipping when a reader overrides line height and letter spacing | Nothing yet. It is cheap and the failure is invisible until someone hits it. |
| `forced-colors` | Windows High Contrast Mode actually applying | The forced-colors block sat above the rules it had to override. A media query adds no specificity, so it never applied, on a component whose own documentation described the behaviour. |
| `link-distinction` | A link in a sentence with no non-colour cue | **axe reported the page clean.** The one inline link measured 1.02:1 against its paragraph with no underline. Invisible to everybody, not just to people with a colour vision deficiency. |
| `pixel` | A refactor that was supposed to change nothing, changing something | A structural HTML diff said three pages were identical. They were not. |

## The three rules this suite is built on

**Check the pages you did not touch.** The regression that mattered most during
the component refactor was on the home page, the work index and the resume,
none of which were being edited. `config.mjs` lists every page for this reason.

**Check the places content gets reused, not just where it lives.** The pages
were right and the dialog showing the same content was broken. Anything scoped
to an ancestor has to be verified everywhere that content is injected.

**Do not trust a normaliser you wrote.** The HTML diff that declared three
broken pages identical was stripping `data-astro-cid` attributes, which are
exactly what Astro's scoped CSS matches on. If a comparison keeps passing while
you are expecting it to fail, suspect the comparison.

## Adding a check

Drop a module in `checks/`, export a default `async (browser, base) => boolean`,
and register it in `run.mjs`. Return `report(name, findings)`, which prints and
returns pass or fail.

Open the top of the file with what the check is for and what it caught. A check
nobody can explain is a check somebody will delete.

## Proving a check works

A check that has only ever passed is not evidence. Break the thing on purpose,
confirm the check fails and names the right thing, then put it back. Every check
in here was verified that way.

`axe` is the exception worth knowing about: it passes a link with 1.02:1
contrast and no underline, which is why `link-distinction` exists alongside it.
A scanner being clean is not the same as the page being right.
