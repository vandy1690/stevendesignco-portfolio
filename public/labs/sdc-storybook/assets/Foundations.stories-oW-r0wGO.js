const L={title:"Foundations"},E=`
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
`,r=()=>{const e=document.createElement("div");return e.innerHTML=`
    <p class="sb-note">Light is the shipped default; dark is the alternate. Ratios are against
      the page ground and the card surface. AA needs 4.5 for body text and 3 for large text
      and control boundaries.</p>
    <div class="sb-grid"></div>`,requestAnimationFrame(()=>{const s=document.createElement("script");s.textContent=`{ ${E}
      /* Borders and dividers are non-text contrast: the bar is 3, not 4.5. */
      const TOKENS = [['--bg',0],['--surface',0],['--surface-2',0],['--text',4.5],['--text-mute',4.5],
                      ['--accent',4.5],['--accent-hover',4.5],['--accent-text',0],
                      ['--rule',0],['--rule-strong',3]];
      const host = document.currentScript.parentElement.querySelector('.sb-grid');
      if (host) host.innerHTML = TOKENS.map(([t, bar]) => {
        const v = read(t);
        const onBg = ratio(v, read('--bg')), onSurf = ratio(v, read('--surface'));
        const mark = (r) => '<b class="' + (r >= bar ? 'sb-pass' : 'sb-fail') + '">' + r.toFixed(2) + '</b>';
        const line = !bar ? '<div class="sb-swatch__ratio" style="color:var(--text-mute)">ground or decorative</div>' :
          '<div class="sb-swatch__ratio">on bg ' + mark(onBg) + ' · on card ' + mark(onSurf) +
          ' <span style="color:var(--text-mute)">(needs ' + bar + ')</span></div>';
        return '<div class="sb-swatch"><div class="sb-swatch__chip" style="background:' + v + '"></div>' +
          '<div class="sb-swatch__meta"><div class="sb-swatch__name">' + t + '</div>' +
          '<div class="sb-swatch__val">' + v + '</div>' + line + '</div></div>';
      }).join(''); }`,e.appendChild(s)}),e},n=()=>`
  <p class="sb-note">Display is Nickel Gothic Variable from Typekit. Its axes are width 25 to 150
    and slant −15 to 15. There is no weight axis, so a weight setting on the display face does
    nothing. Body is Inter, 400 through 900.</p>
  <div class="sb-col">
    <div><p class="sb-label">Display 1 · clamp(48px, 8vw, 96px)</p>
      <div class="display" style="font-size:var(--text-display-1);line-height:.95">Case studies</div></div>
    <div><p class="sb-label">Display 2 · clamp(32px, 4.8vw, 48px)</p>
      <div class="display" style="font-size:var(--text-display-2);line-height:1">Nobody asked for this one.</div></div>
    <div><p class="sb-label">Heading · clamp(24px, 3.2vw, 32px)</p>
      <div style="font-size:var(--text-heading);font-weight:600;letter-spacing:-.015em;line-height:1.25">One library, seven brands.</div></div>
    <div><p class="sb-label">Deck · clamp(18px, 1.9vw, 24px)</p>
      <div style="font-size:var(--text-deck);font-weight:500;line-height:1.5;max-width:56ch">Plate's website was only a recipe database. The work was to grow it into a platform that carried the whole brand.</div></div>
    <div><p class="sb-label">Body · 16px / 1.65</p>
      <div style="font-size:var(--text-body);line-height:1.65;color:var(--text-mute);max-width:68ch">I ported the recipe database and grew it into a full content platform, organized into Recipes, Trends, Food News, and Magazine content.</div></div>
    <div><p class="sb-label">Label · 11px, .14em, 800</p>
      <div style="font-size:var(--text-label);letter-spacing:.14em;text-transform:uppercase;font-weight:800;color:var(--text-mute)">Product</div></div>
  </div>`,a=()=>`<p class="sb-note">The named widths on the <code>wdth</code> axis. Headlines on the site sit
    around 62, between Condensed and Narrow.</p>
    <div class="sb-col">${[["Compressed",25],["Extra Condensed",38],["Condensed",50],["Narrow",75],["Regular",100],["Semi Wide",125],["Wide",150]].map(([t,s])=>`
      <div class="sb-row">
        <div class="sb-row__k">${t} · ${s}</div>
        <div style="font-family:var(--font-display);font-variation-settings:'wdth' ${s},'slnt' 0;font-synthesis:none;font-size:34px;line-height:1.1">Becoming the default</div>
      </div>`).join("")}</div>`;a.storyName="Display widths";const o=()=>`<p class="sb-note">One scale for every gap, margin and section rhythm.</p>
    <div class="sb-col">${[["xs",8],["sm",16],["md",24],["lg",32],["xl",48],["2xl",64],["3xl",96],["4xl",128],["5xl",160]].map(([t,s])=>`
      <div class="sb-row"><div class="sb-row__k">--space-${t} · ${s}px</div>
      <div class="sb-bar" style="width:${s}px"></div></div>`).join("")}</div>`,i=()=>`
  <p class="sb-note">Cards carry a four-stop shadow and deepen on hover. Radius is 18px for cards
    and 10px for controls.</p>
  <div class="sb-stack" style="gap:28px">
    <div style="width:230px;height:130px;border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow-card);display:grid;place-items:center;font-size:13px;color:var(--text-mute)">--shadow-card</div>
    <div style="width:230px;height:130px;border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow-card-hover);display:grid;place-items:center;font-size:13px;color:var(--text-mute)">--shadow-card-hover</div>
    <div style="width:230px;height:130px;border-radius:var(--radius-sm);background:var(--surface);border:1px solid var(--rule-strong);display:grid;place-items:center;font-size:13px;color:var(--text-mute)">--radius-sm, --rule-strong</div>
  </div>`,d=()=>`
  <p class="sb-note">The ring is the page's own ink, never the browser blue, and it appears only for
    <code>:focus-visible</code>. Tab into these to see it; clicking them shows nothing.
    Ink on paper is about 11 to 1, far past the 3 to 1 minimum for a focus indicator.</p>
  <div class="sb-stack">
    <a class="btn btn--primary" href="#0">Primary button</a>
    <a class="btn" href="#0">Secondary button</a>
    <a class="pager" href="#0">Pager<span class="pager__cap" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 3.5 4.5 4.5L6 12.5"/></svg></span></a>
    <a href="#0" style="font-weight:600">A text link</a>
  </div>`,c=()=>`
  <p class="sb-note">The page ground is a one pixel dot on a twenty pixel grid, drawn as a single
    background image on the body. No overlay element and no extra request. Turn it up or down
    with <code>--texture-dot</code>.</p>
  <div class="sb-stack" style="gap:24px">
    ${[["0.04","subtle"],["0.10","shipped"],["0.20","loud"]].map(([e,t])=>`
      <div style="width:220px">
        <div style="height:120px;border-radius:12px;border:1px solid var(--rule);background-color:var(--bg);background-image:radial-gradient(circle at 1px 1px, rgba(45,52,54,${e}) 1px, transparent 0);background-size:20px 20px"></div>
        <p class="sb-label" style="margin-top:8px">${t} · ${e}</p>
      </div>`).join("")}
  </div>`;var l,p,v;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const el = document.createElement('div');
  el.innerHTML = \`
    <p class="sb-note">Light is the shipped default; dark is the alternate. Ratios are against
      the page ground and the card surface. AA needs 4.5 for body text and 3 for large text
      and control boundaries.</p>
    <div class="sb-grid"></div>\`;
  const run = () => {
    const script = document.createElement('script');
    /* Block scoped, and the host is found from the script itself: a docs page
       renders this story more than once in the same document. */
    script.textContent = \`{ \${helpers}
      /* Borders and dividers are non-text contrast: the bar is 3, not 4.5. */
      const TOKENS = [['--bg',0],['--surface',0],['--surface-2',0],['--text',4.5],['--text-mute',4.5],
                      ['--accent',4.5],['--accent-hover',4.5],['--accent-text',0],
                      ['--rule',0],['--rule-strong',3]];
      const host = document.currentScript.parentElement.querySelector('.sb-grid');
      if (host) host.innerHTML = TOKENS.map(([t, bar]) => {
        const v = read(t);
        const onBg = ratio(v, read('--bg')), onSurf = ratio(v, read('--surface'));
        const mark = (r) => '<b class="' + (r >= bar ? 'sb-pass' : 'sb-fail') + '">' + r.toFixed(2) + '</b>';
        const line = !bar ? '<div class="sb-swatch__ratio" style="color:var(--text-mute)">ground or decorative</div>' :
          '<div class="sb-swatch__ratio">on bg ' + mark(onBg) + ' · on card ' + mark(onSurf) +
          ' <span style="color:var(--text-mute)">(needs ' + bar + ')</span></div>';
        return '<div class="sb-swatch"><div class="sb-swatch__chip" style="background:' + v + '"></div>' +
          '<div class="sb-swatch__meta"><div class="sb-swatch__name">' + t + '</div>' +
          '<div class="sb-swatch__val">' + v + '</div>' + line + '</div></div>';
      }).join(''); }\`;
    el.appendChild(script);
  };
  requestAnimationFrame(run);
  return el;
}`,...(v=(p=r.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};var h,b,u;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`() => \`
  <p class="sb-note">Display is Nickel Gothic Variable from Typekit. Its axes are width 25 to 150
    and slant −15 to 15. There is no weight axis, so a weight setting on the display face does
    nothing. Body is Inter, 400 through 900.</p>
  <div class="sb-col">
    <div><p class="sb-label">Display 1 · clamp(48px, 8vw, 96px)</p>
      <div class="display" style="font-size:var(--text-display-1);line-height:.95">Case studies</div></div>
    <div><p class="sb-label">Display 2 · clamp(32px, 4.8vw, 48px)</p>
      <div class="display" style="font-size:var(--text-display-2);line-height:1">Nobody asked for this one.</div></div>
    <div><p class="sb-label">Heading · clamp(24px, 3.2vw, 32px)</p>
      <div style="font-size:var(--text-heading);font-weight:600;letter-spacing:-.015em;line-height:1.25">One library, seven brands.</div></div>
    <div><p class="sb-label">Deck · clamp(18px, 1.9vw, 24px)</p>
      <div style="font-size:var(--text-deck);font-weight:500;line-height:1.5;max-width:56ch">Plate's website was only a recipe database. The work was to grow it into a platform that carried the whole brand.</div></div>
    <div><p class="sb-label">Body · 16px / 1.65</p>
      <div style="font-size:var(--text-body);line-height:1.65;color:var(--text-mute);max-width:68ch">I ported the recipe database and grew it into a full content platform, organized into Recipes, Trends, Food News, and Magazine content.</div></div>
    <div><p class="sb-label">Label · 11px, .14em, 800</p>
      <div style="font-size:var(--text-label);letter-spacing:.14em;text-transform:uppercase;font-weight:800;color:var(--text-mute)">Product</div></div>
  </div>\``,...(u=(b=n.parameters)==null?void 0:b.docs)==null?void 0:u.source}}};var g,m,x;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const widths = [['Compressed', 25], ['Extra Condensed', 38], ['Condensed', 50], ['Narrow', 75], ['Regular', 100], ['Semi Wide', 125], ['Wide', 150]];
  return \`<p class="sb-note">The named widths on the <code>wdth</code> axis. Headlines on the site sit
    around 62, between Condensed and Narrow.</p>
    <div class="sb-col">\${widths.map(([n, w]) => \`
      <div class="sb-row">
        <div class="sb-row__k">\${n} · \${w}</div>
        <div style="font-family:var(--font-display);font-variation-settings:'wdth' \${w},'slnt' 0;font-synthesis:none;font-size:34px;line-height:1.1">Becoming the default</div>
      </div>\`).join('')}</div>\`;
}`,...(x=(m=a.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var w,f,y;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`() => {
  const steps = [['xs', 8], ['sm', 16], ['md', 24], ['lg', 32], ['xl', 48], ['2xl', 64], ['3xl', 96], ['4xl', 128], ['5xl', 160]];
  return \`<p class="sb-note">One scale for every gap, margin and section rhythm.</p>
    <div class="sb-col">\${steps.map(([n, px]) => \`
      <div class="sb-row"><div class="sb-row__k">--space-\${n} · \${px}px</div>
      <div class="sb-bar" style="width:\${px}px"></div></div>\`).join('')}</div>\`;
}`,...(y=(f=o.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var k,_,T;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`() => \`
  <p class="sb-note">Cards carry a four-stop shadow and deepen on hover. Radius is 18px for cards
    and 10px for controls.</p>
  <div class="sb-stack" style="gap:28px">
    <div style="width:230px;height:130px;border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow-card);display:grid;place-items:center;font-size:13px;color:var(--text-mute)">--shadow-card</div>
    <div style="width:230px;height:130px;border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow-card-hover);display:grid;place-items:center;font-size:13px;color:var(--text-mute)">--shadow-card-hover</div>
    <div style="width:230px;height:130px;border-radius:var(--radius-sm);background:var(--surface);border:1px solid var(--rule-strong);display:grid;place-items:center;font-size:13px;color:var(--text-mute)">--radius-sm, --rule-strong</div>
  </div>\``,...(T=(_=i.parameters)==null?void 0:_.docs)==null?void 0:T.source}}};var S,z,$;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`() => \`
  <p class="sb-note">The ring is the page's own ink, never the browser blue, and it appears only for
    <code>:focus-visible</code>. Tab into these to see it; clicking them shows nothing.
    Ink on paper is about 11 to 1, far past the 3 to 1 minimum for a focus indicator.</p>
  <div class="sb-stack">
    <a class="btn btn--primary" href="#0">Primary button</a>
    <a class="btn" href="#0">Secondary button</a>
    <a class="pager" href="#0">Pager<span class="pager__cap" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 3.5 4.5 4.5L6 12.5"/></svg></span></a>
    <a href="#0" style="font-weight:600">A text link</a>
  </div>\``,...($=(z=d.parameters)==null?void 0:z.docs)==null?void 0:$.source}}};var B,C,N;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`() => \`
  <p class="sb-note">The page ground is a one pixel dot on a twenty pixel grid, drawn as a single
    background image on the body. No overlay element and no extra request. Turn it up or down
    with <code>--texture-dot</code>.</p>
  <div class="sb-stack" style="gap:24px">
    \${[['0.04', 'subtle'], ['0.10', 'shipped'], ['0.20', 'loud']].map(([o, n]) => \`
      <div style="width:220px">
        <div style="height:120px;border-radius:12px;border:1px solid var(--rule);background-color:var(--bg);background-image:radial-gradient(circle at 1px 1px, rgba(45,52,54,\${o}) 1px, transparent 0);background-size:20px 20px"></div>
        <p class="sb-label" style="margin-top:8px">\${n} · \${o}</p>
      </div>\`).join('')}
  </div>\``,...(N=(C=c.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};const R=["Colour","Typography","DisplayWidths","Spacing","Elevation","Focus","Texture"];export{r as Colour,a as DisplayWidths,i as Elevation,d as Focus,o as Spacing,c as Texture,n as Typography,R as __namedExportsOrder,L as default};
