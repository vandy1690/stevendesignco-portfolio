export default { title: 'Foundations' };

/* Contrast is computed in the browser against whatever the tokens currently
   resolve to, so these numbers stay true if a token changes. */
const helpers = `
  const read = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const toRgb = (c) => { const d = document.createElement('div'); d.style.color = c;
    document.body.appendChild(d); const v = getComputedStyle(d).color; d.remove();
    const m = v.match(/[\\d.]+/g).map(Number); return m; };
  const flatten = (c, bg) => { const f = toRgb(c), b = toRgb(bg); const a = f.length > 3 ? f[3] : 1;
    return [0,1,2].map(i => f[i] * a + b[i] * (1 - a)); };
  const lum = (rgb) => { const s = rgb.map(v => { v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126*s[0] + 0.7152*s[1] + 0.0722*s[2]; };
  const ratio = (fg, bg) => { const L1 = lum(flatten(fg, bg)), L2 = lum(toRgb(bg).slice(0,3));
    const a = Math.max(L1, L2), b = Math.min(L1, L2); return (a + 0.05) / (b + 0.05); };
`;

export const Color = () => {
  const el = document.createElement('div');
  el.innerHTML = `
    <p class="sb-note">Every color token in the system, in one list. Light is the shipped
      default and dark is the alternate, chosen rather than inherited from the operating
      system. Ratios are against the page ground and the card surface. AA needs 4.5 for body
      text and 3 for large text and control boundaries.</p>
    <p class="sb-note">The last six are the status colors, added October 2026. They behave
      differently from one another on paper, and the Status story shows which of them can
      carry text, which can only be a fill or a ground, and why two resolve to a deeper form
      in the light theme.</p>
    <div class="sb-grid"></div>`;
  const run = () => {
    const script = document.createElement('script');
    /* Block scoped, and the host is found from the script itself: a docs page
       renders this story more than once in the same document. */
    script.textContent = `{ ${helpers}
      /* Borders and dividers are non-text contrast: the bar is 3, not 4.5. */
      const TOKENS = [['--sdc-bg',0],['--sdc-surface',0],['--sdc-surface-2',0],['--sdc-text',4.5],['--sdc-text-mute',4.5],
                      ['--sdc-accent',4.5],['--sdc-accent-hover',4.5],['--sdc-accent-text',0],
                      ['--sdc-rule',0],['--sdc-rule-strong',3],
                      ['--sdc-error',4.5],['--sdc-error-tint',0],
                      ['--sdc-warning',4.5],['--sdc-warning-tint',0],
                      ['--sdc-success',4.5],['--sdc-success-tint',0]];
      const host = document.currentScript.parentElement.querySelector('.sb-grid');
      if (host) host.innerHTML = TOKENS.map(([t, bar]) => {
        const v = read(t);
        const onBg = ratio(v, read('--sdc-bg')), onSurf = ratio(v, read('--sdc-surface'));
        const mark = (r) => '<b class="' + (r >= bar ? 'sb-pass' : 'sb-fail') + '">' + r.toFixed(2) + '</b>';
        const line = !bar ? '<div class="sb-swatch__ratio" style="color:var(--sdc-text-mute)">ground or decorative</div>' :
          '<div class="sb-swatch__ratio">on bg ' + mark(onBg) + ' · on card ' + mark(onSurf) +
          ' <span style="color:var(--sdc-text-mute)">(needs ' + bar + ')</span></div>';
        return '<div class="sb-swatch"><div class="sb-swatch__chip" style="background:' + v + '"></div>' +
          '<div class="sb-swatch__meta"><div class="sb-swatch__name">' + t + '</div>' +
          '<div class="sb-swatch__val">' + v + '</div>' + line + '</div></div>';
      }).join(''); }`;
    el.appendChild(script);
  };
  requestAnimationFrame(run);
  return el;
};

/* The SDS theme, the one product theme on the system. The values are declared
   here because they live in another repo, and the SDS repo has a check that
   fails if this copy drifts from its token file. Ratios are computed in the
   browser against this block rather than written down, the same way the Color
   story works, so a stale number is not possible. */
export const SDSTheme = () => {
  const el = document.createElement('div');
  el.innerHTML = `
    <p class="sb-note">stevendesignservices.com runs its own theme on this system: the
      Urban Oasis palette. It re-points the grounds, the ink and the accent, and nothing
      else. The type, the spacing, the status colors and every component stay SDC's.
      See <a href="/docs/foundations/themes/">Themes</a> for what a theme may and may not
      change.</p>
    <p class="sb-note">Swatches below are the SDS values, and the ratios are measured
      against the SDS ground rather than SDC's paper, which is the only way the numbers
      mean anything.</p>
    <div class="sb-sds" style="--sds-marble:#F3EBDD;--sds-marble-2:#EFE7D9;--sds-marble-3:#EAE2D3;--sds-bark:#2A2922;--sds-bark-mute:#5C584B;--sds-leaves:#506D2F;--sds-leaves-hover:#425927;--sds-leaves-deep:#3B5123">
      <div class="sb-grid"></div>
    </div>`;
  const run = () => {
    const script = document.createElement('script');
    script.textContent = `{ ${helpers}
      const host = document.currentScript.parentElement.querySelector('.sb-sds');
      const grid = host.querySelector('.sb-grid');
      const cs = getComputedStyle(host);
      const v = (n) => cs.getPropertyValue(n).trim();
      const GROUND = v('--sds-marble');
      const ROWS = [
        ['--sds-marble',       '--sdc-bg',           0,   'page ground'],
        ['--sds-marble-2',     '--sdc-surface',      0,   'raised surface'],
        ['--sds-marble-3',     '--sdc-surface-2',    0,   'alternating section'],
        ['--sds-bark',         '--sdc-text',         4.5, 'ink'],
        ['--sds-bark-mute',    '--sdc-text-mute',    4.5, 'secondary ink'],
        ['--sds-leaves',       '--sdc-accent',       4.5, 'accent'],
        ['--sds-leaves-hover', '--sdc-accent-hover', 4.5, 'hover, must beat the accent'],
        ['--sds-leaves-deep',  '--sdc-focus-ring',   3,   'focus ring'],
      ];
      const accentRatio = ratio(v('--sds-leaves'), GROUND);
      grid.innerHTML = ROWS.map(([tok, role, bar, what]) => {
        const val = v(tok);
        const r = ratio(val, GROUND);
        const ok = bar ? r >= bar : true;
        const beats = tok === '--sds-leaves-hover' ? (r >= accentRatio) : true;
        const mark = '<b class="' + (ok && beats ? 'sb-pass' : 'sb-fail') + '">' + r.toFixed(2) + '</b>';
        const line = !bar
          ? '<div class="sb-swatch__ratio" style="color:var(--sdc-text-mute)">ground</div>'
          : '<div class="sb-swatch__ratio">on the SDS ground ' + mark +
            ' <span style="color:var(--sdc-text-mute)">(needs ' + bar +
            (tok === '--sds-leaves-hover' ? ', and more than the accent\\u2019s ' + accentRatio.toFixed(2) : '') +
            ')</span></div>';
        return '<div class="sb-swatch"><div class="sb-swatch__chip" style="background:' + val + '"></div>' +
          '<div class="sb-swatch__meta"><div class="sb-swatch__name">' + tok + '</div>' +
          '<div class="sb-swatch__val">' + val + ' \\u2192 ' + role + '</div>' +
          '<div class="sb-swatch__val" style="color:var(--sdc-text-mute)">' + what + '</div>' +
          line + '</div></div>';
      }).join(''); }`;
    el.appendChild(script);
  };
  requestAnimationFrame(run);
  return el;
};

export const Status = () => {
  const el = document.createElement('div');
  el.innerHTML = `
    <p class="sb-note">Three colors, for the three things a system has to say: something failed,
      something needs attention, something worked. Each one is a solid for text and small marks
      and a tint for the message ground. The solid changes between themes because a color that
      reads on paper does not read on black, and the other way round. Ratios below are live.</p>
    <p class="sb-note">Status is never carried by color alone. Every message here has an icon and
      a word as well, which is what makes it work for a reader who cannot tell the three hues
      apart. The person colors used in Family Shifts are deliberately <b>not</b> in this system:
      they are an app-level exception, recorded in the docs under Practices &rsaquo; Exceptions.</p>
    <div class="sb-grid"></div>
    <div class="sb-col" style="margin-top:28px"></div>`;
  const run = () => {
    const script = document.createElement('script');
    script.textContent = `{ ${helpers}
      const ROLES = [['error','Something failed'],['warning','Needs attention'],['success','It worked']];
      const root = document.currentScript.parentElement;
      const grid = root.querySelector('.sb-grid');
      if (grid) grid.innerHTML = ROLES.map(([r]) => {
        const solid = read('--sdc-' + r), tint = read('--sdc-' + r + '-tint');
        const onBg = ratio(solid, read('--sdc-bg')), onSurf = ratio(solid, read('--sdc-surface'));
        const inkOnTint = ratio(read('--sdc-text'), tint);
        const mark = (x) => '<b class="' + (x >= 4.5 ? 'sb-pass' : 'sb-fail') + '">' + x.toFixed(2) + '</b>';
        return '<div class="sb-swatch"><div class="sb-swatch__chip" style="background:' + solid + '"></div>' +
          '<div class="sb-swatch__meta"><div class="sb-swatch__name">--sdc-' + r + '</div>' +
          '<div class="sb-swatch__val">' + solid + '</div>' +
          '<div class="sb-swatch__ratio">on bg ' + mark(onBg) + ' · on card ' + mark(onSurf) + '</div></div></div>' +
          '<div class="sb-swatch"><div class="sb-swatch__chip" style="background:' + tint + '"></div>' +
          '<div class="sb-swatch__meta"><div class="sb-swatch__name">--sdc-' + r + '-tint</div>' +
          '<div class="sb-swatch__val">' + tint + '</div>' +
          '<div class="sb-swatch__ratio">body text on it ' + mark(inkOnTint) + '</div></div></div>';
      }).join('');
      const ICON = {
        error: '<circle cx="10" cy="10" r="7.5"/><path d="M10 6.2v4.6M10 13.6v.2"/>',
        warning: '<path d="M10 2.8 18 16.4H2z"/><path d="M10 8v3.4M10 13.8v.2"/>',
        success: '<circle cx="10" cy="10" r="7.5"/><path d="m6.6 10.2 2.3 2.3 4.5-4.8"/>'
      };
      const COPY = {
        error: ['That shift could not be saved.', 'Check the start and end times, then try again.'],
        warning: ['Two shifts overlap on Thursday.', 'Angie is booked twice between 5p and 7p.'],
        success: ['The week is posted.', 'Everyone with the passcode sees it now.']
      };
      const demo = root.querySelector('.sb-col');
      if (demo) demo.innerHTML = ROLES.map(([r]) =>
        '<div style="display:flex;align-items:flex-start;gap:10px;padding:12px 14px;border-radius:var(--sdc-radius-sm);' +
        'background:var(--sdc-' + r + '-tint);color:var(--sdc-text);font-size:14px;max-width:62ch">' +
        '<svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="var(--sdc-' + r + ')" stroke-width="1.9" ' +
        'stroke-linecap="round" stroke-linejoin="round" style="flex:none;margin-top:2px" aria-hidden="true">' + ICON[r] + '</svg>' +
        '<span><b>' + COPY[r][0] + '</b> ' + COPY[r][1] + '</span></div>'
      ).join(''); }`;
    el.appendChild(script);
  };
  requestAnimationFrame(run);
  return el;
};

export const Typography = () => `
  <p class="sb-note">Display is Nickel Gothic Variable from Typekit. Its axes are width 25 to 150
    and slant −15 to 15. There is no weight axis, so a weight setting on the display face does
    nothing. Body is Inter, 400 through 900.</p>
  <div class="sb-col">
    <div><p class="sb-label">Display 1 · clamp(48px, 8vw, 96px)</p>
      <div class="sdc-display" style="font-size:var(--sdc-text-display-1);line-height:.95">Case studies</div></div>
    <div><p class="sb-label">Display 2 · clamp(32px, 4.8vw, 48px)</p>
      <div class="sdc-display" style="font-size:var(--sdc-text-display-2);line-height:1">Nobody asked for this one.</div></div>
    <div><p class="sb-label">Heading · clamp(24px, 3.2vw, 32px)</p>
      <div style="font-size:var(--sdc-text-heading);font-weight:600;letter-spacing:-.015em;line-height:1.25">One shared framework, seven brands.</div></div>
    <div><p class="sb-label">Display 3 · <code>.sdc-display-3</code> · the same clamp, display face</p>
      <div class="sdc-display-3">One shared framework, seven brands.</div>
      <p class="sb-note" style="margin-top:8px">Same size as Heading above. The scale had the measurement
        and not the treatment, so a heading wanting the display face at 24 to 32px had nothing to use.
        A class rather than a token, because a second name for one value is drift. Line height 1.1, not
        <code>.sdc-display</code>'s 0.96, which collides on two lines at this size.</p></div>
    <div><p class="sb-label">Deck · clamp(18px, 1.9vw, 24px)</p>
      <div style="font-size:var(--sdc-text-deck);font-weight:500;line-height:1.5;max-width:56ch">Plate's website was only a recipe database. The work was to grow it into a platform that carried the whole brand.</div></div>
    <div><p class="sb-label">Body · 16px / 1.65</p>
      <div style="font-size:var(--sdc-text-body);line-height:1.65;color:var(--sdc-text-mute);max-width:68ch">I ported the recipe database and grew it into a full content platform, organized into Recipes, Trends, Food News, and Magazine content.</div></div>
    <div><p class="sb-label">Label · 11px, .14em, 800</p>
      <div style="font-size:var(--sdc-text-label);letter-spacing:.14em;text-transform:uppercase;font-weight:800;color:var(--sdc-text-mute)">Product</div></div>
  </div>`;

export const DisplayWidths = () => {
  const widths = [['Compressed',25],['Extra Condensed',38],['Condensed',50],['Narrow',75],['Regular',100],['Semi Wide',125],['Wide',150]];
  return `<p class="sb-note">The named widths on the <code>wdth</code> axis. Headlines on the site sit
    around 62, between Condensed and Narrow.</p>
    <div class="sb-col">${widths.map(([n, w]) => `
      <div class="sb-row">
        <div class="sb-row__k">${n} · ${w}</div>
        <div style="font-family:var(--sdc-font-display);font-variation-settings:'wdth' ${w},'slnt' 0;font-synthesis:none;font-size:34px;line-height:1.1">Becoming the default</div>
      </div>`).join('')}</div>`;
};
DisplayWidths.storyName = 'Display widths';

export const Spacing = () => {
  const steps = [['xs',8],['sm',16],['md',24],['lg',32],['xl',48],['2xl',64],['3xl',96],['4xl',128],['5xl',160]];
  return `<p class="sb-note">One scale for every gap, margin and section rhythm.</p>
    <div class="sb-col">${steps.map(([n, px]) => `
      <div class="sb-row"><div class="sb-row__k">--space-${n} · ${px}px</div>
      <div class="sb-bar" style="width:${px}px"></div></div>`).join('')}</div>`;
};

export const Elevation = () => `
  <p class="sb-note">Cards carry a four-stop shadow and deepen on hover. Radius is 18px for cards
    and 10px for controls.</p>
  <div class="sb-stack" style="gap:28px">
    <div style="width:230px;height:130px;border-radius:var(--sdc-radius);background:var(--sdc-surface);box-shadow:var(--sdc-shadow-card);display:grid;place-items:center;font-size:13px;color:var(--sdc-text-mute)">--sdc-shadow-card</div>
    <div style="width:230px;height:130px;border-radius:var(--sdc-radius);background:var(--sdc-surface);box-shadow:var(--sdc-shadow-card-hover);display:grid;place-items:center;font-size:13px;color:var(--sdc-text-mute)">--sdc-shadow-card-hover</div>
    <div style="width:230px;height:130px;border-radius:var(--sdc-radius-sm);background:var(--sdc-surface);border:1px solid var(--sdc-rule-strong);display:grid;place-items:center;font-size:13px;color:var(--sdc-text-mute)">--sdc-radius-sm, --sdc-rule-strong</div>
  </div>`;

export const Focus = () => `
  <p class="sb-note">The ring has its own token, <code>--sdc-focus-ring</code>, rather than borrowing the body
    ink, so focus can be retuned without moving hover or text with it. It appears only for
    <code>:focus-visible</code>. Tab into these to see it; clicking them shows nothing.
    It measures 10.6 to 1 against the page in light and 19.7 to 1 in dark, both far past the
    3 to 1 minimum for a focus indicator.</p>
  <div class="sb-stack">
    <a class="sdc-btn sdc-btn--primary" href="#0">Primary button</a>
    <a class="sdc-btn" href="#0">Secondary button</a>
    <a class="sdc-pager" href="#0">Pager<span class="sdc-pager__cap" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 3.5 4.5 4.5L6 12.5"/></svg></span></a>
    <a href="#0" style="font-weight:600">A text link</a>
  </div>`;

export const Texture = () => `
  <p class="sb-note">The page ground is a one pixel dot on a twenty pixel grid, drawn as a single
    background image on the body. No overlay element and no extra request. Turn it up or down
    with <code>--sdc-texture-dot</code>.</p>
  <div class="sb-stack" style="gap:24px">
    ${[['0.04','subtle'],['0.10','shipped'],['0.20','loud']].map(([o, n]) => `
      <div style="width:220px">
        <div style="height:120px;border-radius:12px;border:1px solid var(--sdc-rule);background-color:var(--sdc-bg);background-image:radial-gradient(circle at 1px 1px, rgba(45,52,54,${o}) 1px, transparent 0);background-size:20px 20px"></div>
        <p class="sb-label" style="margin-top:8px">${n} · ${o}</p>
      </div>`).join('')}
  </div>`;
