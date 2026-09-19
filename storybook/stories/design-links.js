/** Figma frame for each story, shown in the Design tab. Paste the frame's share
 *  link (Figma: right click the frame, Copy link to selection). The file has to
 *  be viewable by anyone with the link, or visitors get a Figma login wall.
 *  While every entry is empty the Design tab stays off entirely (see main.js). */
export const figma = {
  Buttons: '',
  Pager: '',
  PagerPair: '',
  CaseCard: '',
  Recommendation: '',
  MetaRow: '',
  RowList: '',
  CaseBlock: '',
  SkipLink: '',
  CaseStudyHero: '',
  DeckFallback: '',
  ContactBlock: '',
};

export const hasDesigns = Object.values(figma).some(Boolean);

/** Call at the foot of a stories file with its exports. */
export function attachDesigns(stories) {
  for (const [name, story] of Object.entries(stories)) {
    if (figma[name]) story.parameters = { ...story.parameters, design: { type: 'figma', url: figma[name] } };
  }
}
