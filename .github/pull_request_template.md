## What changed, and why

<!-- One or two sentences. The why matters more than the what; the diff already
     says what. If this fixes a defect, say how it got through. -->

## Checks

- [ ] `npm run qa` passes locally. CI runs it too, but on `dev` that lands after the deploy.
- [ ] Anything visual was compared against the live site: `npm run qa -- --pixel`. Every difference is one I meant.
- [ ] Documentation moved with the code, or `npm run check:docs` explains why it did not need to.
- [ ] Both themes still work. The dark palette went years without a scanner seeing it.

## Three habits, because each one caught something

- [ ] **I checked the pages I did not touch.** The worst regression here landed on three pages nobody was editing.
- [ ] **I checked where this content is reused, not only where it lives.** The case study pages were right while the dialog showing the same content was broken.
- [ ] **If I added a check, I proved it can fail.** Break the thing, watch the check name it, put it back. A check that has only ever passed is not evidence.

## Anything you would rather I had not done

<!-- Shortcuts, assumptions, things left half-finished. Say them here rather
     than letting someone find them later. -->

The full definition of done is the "Before you merge" list in `CONTRIBUTING.md`; the habits above are the ones most often skipped.
