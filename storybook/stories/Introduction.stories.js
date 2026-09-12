export default { title: 'Introduction' };

export const ReadMe = () => `
  <div class="sb-col" style="max-width:64ch">
    <p class="eyebrow" style="font-family:var(--font-display);letter-spacing:.03em">Steven Design Co.</p>
    <h1 class="display" style="font-size:clamp(36px,5vw,64px);line-height:.98;margin:0">The component library.</h1>
    <p style="font-size:18px;line-height:1.6;margin:0">
      Every story on this page renders with the CSS stevendesignco.com actually ships.
      The stylesheet is pulled from the running site by <code>sync-css.mjs</code> at build
      time, not copied by hand, so the library cannot drift from production.
    </p>
    <p style="font-size:16px;line-height:1.65;color:var(--text-mute);margin:0">
      The site is Astro with vanilla CSS custom properties. No Tailwind, no component
      framework for layout. So these stories are plain HTML using the same class names
      the pages use. Switch the theme in the toolbar to check both palettes.
    </p>
    <ul style="font-size:16px;line-height:1.8;padding-left:1.1em;margin:0">
      <li><strong>Foundations</strong> are the tokens: colour, type, spacing, elevation, focus, texture.</li>
      <li><strong>Components</strong> are the pieces that repeat across pages.</li>
      <li><strong>Patterns</strong> are whole compositions assembled from them.</li>
    </ul>
    <p style="font-size:14px;color:var(--text-mute);margin:0">
      Contrast figures shown in Foundations are computed live in the browser against the
      current theme, so they stay honest when a token changes.
    </p>
  </div>`;
ReadMe.storyName = 'Read me';
