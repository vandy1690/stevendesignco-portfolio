const u={title:"Patterns"},e=()=>`
  <p class="sb-note">Order is fixed across all seven case studies: back link, kicker, title, deck,
    figure, then the stats. The figure sits between the deck and the stats at full width.</p>
  <div style="max-width:900px">
    <a class="cs-back-top" href="#0">← Case studies</a>
    <p class="eyebrow">Case study</p>
    <h1 class="cs-hero__title display" style="font-size:clamp(36px,6vw,72px);line-height:.98;margin:8px 0 32px;max-width:20ch">Plate: Repositioning a Print Brand as a Digital Platform</h1>
    <p class="cs-hero__lede" style="font-size:var(--text-deck);line-height:1.5;max-width:56ch;font-weight:500;margin-bottom:64px">Plate's website was only a recipe database. The work was to grow it into a platform that carried the whole brand.</p>
    <div class="cs-figure" style="margin:32px 0 48px"><img src="/images/case-studies/plate/plate-scene.webp" alt="" style="width:100%;height:auto;display:block" /></div>
    <dl class="cs-meta" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin:0;padding:32px 0 0;border-top:1px solid var(--rule)">
      <div><dt>Role</dt><dd>Creative Director</dd></div>
      <div><dt>Org</dt><dd>MTG Media Group</dd></div>
      <div><dt>Recognition</dt><dd>2017 Jesse H. Neal Award, Best Website</dd></div>
    </dl>
  </div>`;e.storyName="Case study hero";const a=()=>`
  <p class="sb-note">The home page pins a card to the viewport and flips through five of them on
    scroll. That needs height it does not always have, so the deck degrades to this plain list in
    three cases: the visitor asked for reduced motion, the viewport is under 600px tall, which is
    also what 400 percent zoom looks like, or a runtime check finds a card does not actually fit.
    JavaScript being off lands here too.</p>
  <div style="display:grid;gap:24px;max-width:700px">
    ${[["Nobody asked for this one.","/images/case-studies/merchant-flow-builder/plugin-pipeline.webp","Figma plugin, PayPal"],["Becoming the default at checkout.","/images/case-studies/paypal/one-click.webp","One-click checkout, PayPal"]].map(([h,m,g])=>`
      <div class="card" style="display:flex;flex-direction:column">
        <div class="card__art card__art--image"><img src="${m}" alt="" /></div>
        <div class="card__body">
          <h3 class="card__head"><a class="card__link" href="#0">${h}</a></h3>
          <dl class="card__meta"><div><dt>Product</dt><dd>${g}</dd></div></dl>
          <span class="card__cta">Read case study <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </div>`).join("")}
  </div>`;a.storyName="Deck fallback";const t=()=>`
  <p class="sb-note">Closes the page. Long handles wrap rather than push the layout wide.</p>
  <div style="max-width:700px">
    <h2 class="contact__title display" style="font-size:clamp(40px,6vw,88px);line-height:.95;margin:0 0 32px">Let's talk.</h2>
    <ul class="contact__list">
      <li><a href="#0">steven [at] stevendesignco [dot] com</a></li>
      <li><a href="#0">linkedin.com/in/stevendesignco</a></li>
      <li><a href="#0">instagram.com/stevendesignservices</a></li>
    </ul>
    <p class="contact__based" style="margin-top:24px">Aurora, IL · Chicago area · Open to remote</p>
  </div>`;t.storyName="Contact block";var s,i,d;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`() => \`
  <p class="sb-note">Order is fixed across all seven case studies: back link, kicker, title, deck,
    figure, then the stats. The figure sits between the deck and the stats at full width.</p>
  <div style="max-width:900px">
    <a class="cs-back-top" href="#0">← Case studies</a>
    <p class="eyebrow">Case study</p>
    <h1 class="cs-hero__title display" style="font-size:clamp(36px,6vw,72px);line-height:.98;margin:8px 0 32px;max-width:20ch">Plate: Repositioning a Print Brand as a Digital Platform</h1>
    <p class="cs-hero__lede" style="font-size:var(--text-deck);line-height:1.5;max-width:56ch;font-weight:500;margin-bottom:64px">Plate's website was only a recipe database. The work was to grow it into a platform that carried the whole brand.</p>
    <div class="cs-figure" style="margin:32px 0 48px"><img src="/images/case-studies/plate/plate-scene.webp" alt="" style="width:100%;height:auto;display:block" /></div>
    <dl class="cs-meta" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin:0;padding:32px 0 0;border-top:1px solid var(--rule)">
      <div><dt>Role</dt><dd>Creative Director</dd></div>
      <div><dt>Org</dt><dd>MTG Media Group</dd></div>
      <div><dt>Recognition</dt><dd>2017 Jesse H. Neal Award, Best Website</dd></div>
    </dl>
  </div>\``,...(d=(i=e.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var l,r,c;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`() => \`
  <p class="sb-note">The home page pins a card to the viewport and flips through five of them on
    scroll. That needs height it does not always have, so the deck degrades to this plain list in
    three cases: the visitor asked for reduced motion, the viewport is under 600px tall, which is
    also what 400 percent zoom looks like, or a runtime check finds a card does not actually fit.
    JavaScript being off lands here too.</p>
  <div style="display:grid;gap:24px;max-width:700px">
    \${[['Nobody asked for this one.', '/images/case-studies/merchant-flow-builder/plugin-pipeline.webp', 'Figma plugin, PayPal'], ['Becoming the default at checkout.', '/images/case-studies/paypal/one-click.webp', 'One-click checkout, PayPal']].map(([h, img, product]) => \`
      <div class="card" style="display:flex;flex-direction:column">
        <div class="card__art card__art--image"><img src="\${img}" alt="" /></div>
        <div class="card__body">
          <h3 class="card__head"><a class="card__link" href="#0">\${h}</a></h3>
          <dl class="card__meta"><div><dt>Product</dt><dd>\${product}</dd></div></dl>
          <span class="card__cta">Read case study <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </div>\`).join('')}
  </div>\``,...(c=(r=a.parameters)==null?void 0:r.docs)==null?void 0:c.source}}};var o,n,p;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => \`
  <p class="sb-note">Closes the page. Long handles wrap rather than push the layout wide.</p>
  <div style="max-width:700px">
    <h2 class="contact__title display" style="font-size:clamp(40px,6vw,88px);line-height:.95;margin:0 0 32px">Let's talk.</h2>
    <ul class="contact__list">
      <li><a href="#0">steven [at] stevendesignco [dot] com</a></li>
      <li><a href="#0">linkedin.com/in/stevendesignco</a></li>
      <li><a href="#0">instagram.com/stevendesignservices</a></li>
    </ul>
    <p class="contact__based" style="margin-top:24px">Aurora, IL · Chicago area · Open to remote</p>
  </div>\``,...(p=(n=t.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const v=["CaseStudyHero","DeckFallback","ContactBlock"];export{e as CaseStudyHero,t as ContactBlock,a as DeckFallback,v as __namedExportsOrder,u as default};
