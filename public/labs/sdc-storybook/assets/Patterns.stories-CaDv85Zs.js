import{a as w}from"./design-links-CsRzzX79.js";const x={title:"Patterns"},e=()=>`
  <p class="sb-note">Order is fixed across all seven case studies: back link, kicker, title, deck,
    figure, then the stats. The figure sits between the deck and the stats at full width.</p>
  <div style="max-width:900px">
    <a class="sdc-cs-back-top" href="#0">← Case studies</a>
    <p class="sdc-eyebrow">Case study</p>
    <h1 class="sdc-case-hero__title sdc-display" style="font-size:clamp(36px,6vw,72px);line-height:.98;margin:8px 0 32px;max-width:20ch">Plate: Repositioning a Print Brand as a Digital Platform</h1>
    <p class="sdc-case-hero__lede" style="font-size:var(--sdc-text-deck);line-height:1.5;max-width:56ch;font-weight:500;margin-bottom:64px">Plate's website was only a recipe database. The work was to grow it into a platform that carried the whole brand.</p>
    <sdc-case-figure style="margin:32px 0 48px"><img src="/images/case-studies/plate/plate-scene.webp" alt="" style="width:100%;height:auto;display:block" /></sdc-case-figure>
    <dl class="sdc-meta-row" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin:0;padding:32px 0 0;border-top:1px solid var(--sdc-rule)">
      <div><dt>Role</dt><dd>Creative Director</dd></div>
      <div><dt>Org</dt><dd>MTG Media Group</dd></div>
      <div><dt>Recognition</dt><dd>2017 Jesse H. Neal Award, Best Website</dd></div>
    </dl>
  </div>`;e.storyName="Case study hero";const t=()=>`
  <p class="sb-note">A short screen recording inside a case study. It uses the same element and
    caption as a case figure. It never plays by itself, it starts muted, and its label says what
    the recording shows. The portrait modifier keeps a tall recording from filling the column.</p>
  <div class="sdc-case">
    <sdc-case-figure class="sdc-case-figure--video sdc-case-figure--portrait">
      <video controls playsinline muted preload="none" poster="/labs/low-supply/poster.jpg" width="1080" height="1350"
        aria-label="Screen recording of Low Supply with a child's phone on the left and a parent's phone on the right.">
        <source src="/labs/low-supply/low-supply-demo.mp4" type="video/mp4" />
      </video>
      <p class="sdc-case-figure__cap">No sound. Recorded from the running app in a browser.</p>
    </sdc-case-figure>
  </div>`;t.storyName="Case video";const s=()=>`
  <p class="sb-note">The home page pins a card to the viewport and flips through five of them on
    scroll. That needs height it does not always have, so the deck degrades to this plain list in
    three cases: the visitor asked for reduced motion, the viewport is under 600px tall, which is
    also what 400 percent zoom looks like, or a runtime check finds a card does not actually fit.
    JavaScript being off lands here too.</p>
  <div style="display:grid;gap:24px;max-width:700px">
    ${[["Nobody asked for this one.","/images/case-studies/merchant-flow-builder/plugin-pipeline.webp","Figma plugin, PayPal"],["Becoming the default at checkout.","/images/case-studies/paypal/one-click.webp","One-click checkout, PayPal"]].map(([f,v,y])=>`
      <sdc-card style="display:flex;flex-direction:column">
        <div class="sdc-card__art sdc-card__art--image"><img src="${v}" alt="" /></div>
        <div class="sdc-card__body">
          <h3 class="sdc-card__head"><a class="sdc-card__link" href="#0">${f}</a></h3>
          <dl class="sdc-card__meta"><div><dt>Product</dt><dd>${y}</dd></div></dl>
          <span class="sdc-card__cta">Read case study <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </sdc-card>`).join("")}
  </div>`;s.storyName="Deck fallback";const a=()=>`
  <p class="sb-note">Closes the page. Long handles wrap rather than push the layout wide.</p>
  <div style="max-width:700px">
    <h2 class="contact__title sdc-display" style="font-size:clamp(40px,6vw,88px);line-height:.95;margin:0 0 32px">Let's talk.</h2>
    <ul class="contact__list">
      <li><a href="#0">steven [at] stevendesignco [dot] com</a></li>
      <li><a href="#0">linkedin.com/in/stevendesignco</a></li>
      <li><a href="#0">instagram.com/stevendesignservices</a></li>
    </ul>
    <p class="contact__based" style="margin-top:24px">Aurora, IL · Chicago area · Open to remote</p>
  </div>`;a.storyName="Contact block";w({CaseStudyHero:e,DeckFallback:s,ContactBlock:a});var i,d,c;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`() => \`
  <p class="sb-note">Order is fixed across all seven case studies: back link, kicker, title, deck,
    figure, then the stats. The figure sits between the deck and the stats at full width.</p>
  <div style="max-width:900px">
    <a class="sdc-cs-back-top" href="#0">← Case studies</a>
    <p class="sdc-eyebrow">Case study</p>
    <h1 class="sdc-case-hero__title sdc-display" style="font-size:clamp(36px,6vw,72px);line-height:.98;margin:8px 0 32px;max-width:20ch">Plate: Repositioning a Print Brand as a Digital Platform</h1>
    <p class="sdc-case-hero__lede" style="font-size:var(--sdc-text-deck);line-height:1.5;max-width:56ch;font-weight:500;margin-bottom:64px">Plate's website was only a recipe database. The work was to grow it into a platform that carried the whole brand.</p>
    <sdc-case-figure style="margin:32px 0 48px"><img src="/images/case-studies/plate/plate-scene.webp" alt="" style="width:100%;height:auto;display:block" /></sdc-case-figure>
    <dl class="sdc-meta-row" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin:0;padding:32px 0 0;border-top:1px solid var(--sdc-rule)">
      <div><dt>Role</dt><dd>Creative Director</dd></div>
      <div><dt>Org</dt><dd>MTG Media Group</dd></div>
      <div><dt>Recognition</dt><dd>2017 Jesse H. Neal Award, Best Website</dd></div>
    </dl>
  </div>\``,...(c=(d=e.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var r,o,l;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => \`
  <p class="sb-note">A short screen recording inside a case study. It uses the same element and
    caption as a case figure. It never plays by itself, it starts muted, and its label says what
    the recording shows. The portrait modifier keeps a tall recording from filling the column.</p>
  <div class="sdc-case">
    <sdc-case-figure class="sdc-case-figure--video sdc-case-figure--portrait">
      <video controls playsinline muted preload="none" poster="/labs/low-supply/poster.jpg" width="1080" height="1350"
        aria-label="Screen recording of Low Supply with a child's phone on the left and a parent's phone on the right.">
        <source src="/labs/low-supply/low-supply-demo.mp4" type="video/mp4" />
      </video>
      <p class="sdc-case-figure__cap">No sound. Recorded from the running app in a browser.</p>
    </sdc-case-figure>
  </div>\``,...(l=(o=t.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};var n,p,h;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`() => \`
  <p class="sb-note">The home page pins a card to the viewport and flips through five of them on
    scroll. That needs height it does not always have, so the deck degrades to this plain list in
    three cases: the visitor asked for reduced motion, the viewport is under 600px tall, which is
    also what 400 percent zoom looks like, or a runtime check finds a card does not actually fit.
    JavaScript being off lands here too.</p>
  <div style="display:grid;gap:24px;max-width:700px">
    \${[['Nobody asked for this one.', '/images/case-studies/merchant-flow-builder/plugin-pipeline.webp', 'Figma plugin, PayPal'], ['Becoming the default at checkout.', '/images/case-studies/paypal/one-click.webp', 'One-click checkout, PayPal']].map(([h, img, product]) => \`
      <sdc-card style="display:flex;flex-direction:column">
        <div class="sdc-card__art sdc-card__art--image"><img src="\${img}" alt="" /></div>
        <div class="sdc-card__body">
          <h3 class="sdc-card__head"><a class="sdc-card__link" href="#0">\${h}</a></h3>
          <dl class="sdc-card__meta"><div><dt>Product</dt><dd>\${product}</dd></div></dl>
          <span class="sdc-card__cta">Read case study <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </sdc-card>\`).join('')}
  </div>\``,...(h=(p=s.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var g,m,u;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`() => \`
  <p class="sb-note">Closes the page. Long handles wrap rather than push the layout wide.</p>
  <div style="max-width:700px">
    <h2 class="contact__title sdc-display" style="font-size:clamp(40px,6vw,88px);line-height:.95;margin:0 0 32px">Let's talk.</h2>
    <ul class="contact__list">
      <li><a href="#0">steven [at] stevendesignco [dot] com</a></li>
      <li><a href="#0">linkedin.com/in/stevendesignco</a></li>
      <li><a href="#0">instagram.com/stevendesignservices</a></li>
    </ul>
    <p class="contact__based" style="margin-top:24px">Aurora, IL · Chicago area · Open to remote</p>
  </div>\``,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const k=["CaseStudyHero","CaseVideo","DeckFallback","ContactBlock"];export{e as CaseStudyHero,t as CaseVideo,a as ContactBlock,s as DeckFallback,k as __namedExportsOrder,x as default};
