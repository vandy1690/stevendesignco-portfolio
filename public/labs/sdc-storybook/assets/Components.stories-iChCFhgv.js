const p=e=>`<span class="pager__cap" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${e==="prev"?"M10 3.5 5.5 8l4.5 4.5":"m6 3.5 4.5 4.5L6 12.5"}"/></svg></span>`,E={title:"Components"},l={args:{label:"View work"},argTypes:{label:{control:"text"}},render:({label:e})=>`
    <p class="sb-note">Two weights only. Both take the 10px control radius, and the secondary
      border uses <code>--rule-strong</code> so the boundary clears 3 to 1.</p>
    <div class="sb-stack">
      <a class="btn btn--primary" href="#0">${e}</a>
      <a class="btn" href="#0">Resume</a>
    </div>`},d={args:{label:"Default at checkout",direction:"next"},argTypes:{label:{control:"text"},direction:{control:"inline-radio",options:["prev","next"]}},render:({label:e,direction:t})=>`
    <p class="sb-note">Moves between case studies. The visible text is the destination only; the
      arrow carries direction, and hidden text states both, so the link makes sense read on its own
      without a label overriding what is on screen. On phones two pagers share one row and wrap their own labels.</p>
    <div class="sb-stack">
      <a class="pager ${t==="prev"?"pager--prev":""}" href="#0">
        ${t==="prev"?p("prev"):""}<span class="sr-only">${t==="prev"?"Previous":"Next"} case study: </span>${e}${t==="next"?p("next"):""}
      </a>
    </div>`},a=()=>`
  <p class="sb-note">How the pair sits at the foot of every case study.</p>
  <div class="cs-back" style="display:flex;gap:16px;flex-wrap:wrap;justify-content:space-between;align-items:center;max-width:800px">
    <a class="pager pager--prev" href="#0">${p("prev")}<span class="sr-only">Back to </span>All case studies</a>
    <a class="pager" href="#0"><span class="sr-only">Next case study: </span>Plate${p("next")}</a>
  </div>`;a.storyName="Pager pair";const s={args:{head:"Nobody asked for this one.",text:"A Figma plugin, built on my own initiative, that cut merchant flow setup from most of a day to 10 to 15 minutes, across the 38-merchant program.",product:"Figma plugin, PayPal",objective:"Faster merchant flow setup",image:"/images/case-studies/merchant-flow-builder/plugin-pipeline.webp"},argTypes:{head:{control:"text"},text:{control:"text"},product:{control:"text"},objective:{control:"text"},image:{control:"select",options:["/images/case-studies/merchant-flow-builder/plugin-pipeline.webp","/images/case-studies/paypal/one-click.webp","/images/case-studies/paypal/journey-dead-end.webp","/images/case-studies/plate/plate-scene.webp","/images/case-studies/design-systems/pattern-lab.webp"]}},render:({head:e,text:t,product:D,objective:H,image:I})=>`
    <p class="sb-note">The unit the home page deck is built from. Art is 16:9 and full bleed; the
      body is a grid so the meta and the call to action share the last row on desktop and stack
      on phones. Labels read Product and Objective, not Client and Service. The headline is the only link;
      a stretched ::after covers the card, so the whole card clicks while its accessible name is
      exactly the visible headline rather than a hand-written label.</p>
    <div style="max-width:760px">
      <div class="card" style="display:flex;flex-direction:column">
        <div class="card__art card__art--image"><img src="${I}" alt="" /></div>
        <div class="card__body">
          <h3 class="card__head"><a class="card__link" href="#0">${e}</a></h3>
          <p class="card__text">${t}</p>
          <dl class="card__meta">
            <div><dt>Product</dt><dd>${D}</dd></div>
            <div><dt>Objective</dt><dd>${H}</dd></div>
          </dl>
          <span class="card__cta">Read case study <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </div>
    </div>`};s.storyName="Case study card";const c={args:{quote:"He is one of those uncommon designers who can move fluidly between strategy, design, prototyping, and code.",title:"Product Designer, PayPal Merchant Enablement"},argTypes:{quote:{control:"text"},title:{control:"text"}},render:({quote:e,title:t})=>`
    <p class="sb-note">One verbatim sentence from a LinkedIn recommendation. Titles only, never
      names. Twelve of these run in the scroll-driven fan under "On the record."</p>
    <div style="width:440px;max-width:100%">
      <figure class="quote" style="height:330px;display:flex;flex-direction:column;justify-content:center;background:var(--surface);border-radius:var(--radius);box-shadow:var(--shadow-card);padding:34px 30px;margin:0;text-align:center">
        <blockquote class="quote__text" style="margin:0"><p>${e}</p></blockquote>
        <figcaption class="quote__title" style="margin-top:18px">${t}</figcaption>
      </figure>
    </div>`},n=()=>`
  <p class="sb-note">Key and value, with a pipe between them. The pipe is a CSS pseudo-element with
    empty alt text, so assistive tech never announces it, and it is suppressed on phones where the
    label stacks above the value.</p>
  <dl class="card__meta" style="max-width:640px">
    <div><dt>Product</dt><dd>One-click checkout, PayPal</dd></div>
    <div><dt>Objective</dt><dd>One tap in each merchant's own checkout</dd></div>
  </dl>`;n.storyName="Meta row";const o=()=>`
  <p class="sb-note">The shared treatment for How I work and Recognition. A 220px key column, a rule
    under each row, and nothing else.</p>
  <ul class="how__list" style="max-width:800px">
    <li><p class="how__tool">Figma</p><p>Design, prototyping, and the component libraries behind the case studies.</p></li>
    <li><p class="how__tool">Claude Code and Cursor</p><p>Building and extending what the design needs, including the plugin.</p></li>
    <li><p class="how__tool">Storybook</p><p>Component documentation with interactive controls on the core atoms.</p></li>
  </ul>`;o.storyName="Row list";const r=()=>`
  <p class="sb-note">One organism: a kicker, the section heading, and its body. They sit on line
    height alone with no margins between them, so the three read as a single unit. The heading is a
    real h2, styled to look like the paragraph it used to be.</p>
  <div class="cs-body" style="display:grid;gap:48px;max-width:800px">
    <div class="cs-block">
      <p class="eyebrow">What was unclear</p>
      <h2 class="cs-block__lede">A whole brand online, reduced to recipes.</h2>
      <p>Plate's website was only a recipe database. The brand also had magazine content, daily news, and blogs, but none of it lived online in a usable structure.</p>
    </div>
  </div>`;r.storyName="Case study block";const i=()=>`
  <p class="sb-note">First focusable element on every page, offscreen until focused. Tab into the
    frame to bring it in.</p>
  <div style="position:relative;height:90px">
    <a class="skip-link" href="#0" style="position:absolute;top:12px;left:0">Skip to content</a>
  </div>`;i.storyName="Skip link";var h,u,m;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'View work'
  },
  argTypes: {
    label: {
      control: 'text'
    }
  },
  render: ({
    label
  }) => \`
    <p class="sb-note">Two weights only. Both take the 10px control radius, and the secondary
      border uses <code>--rule-strong</code> so the boundary clears 3 to 1.</p>
    <div class="sb-stack">
      <a class="btn btn--primary" href="#0">\${label}</a>
      <a class="btn" href="#0">Resume</a>
    </div>\`
}`,...(m=(u=l.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var g,b,v;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Default at checkout',
    direction: 'next'
  },
  argTypes: {
    label: {
      control: 'text'
    },
    direction: {
      control: 'inline-radio',
      options: ['prev', 'next']
    }
  },
  render: ({
    label,
    direction
  }) => \`
    <p class="sb-note">Moves between case studies. The visible text is the destination only; the
      arrow carries direction, and hidden text states both, so the link makes sense read on its own
      without a label overriding what is on screen. On phones two pagers share one row and wrap their own labels.</p>
    <div class="sb-stack">
      <a class="pager \${direction === 'prev' ? 'pager--prev' : ''}" href="#0">
        \${direction === 'prev' ? chevron('prev') : ''}<span class="sr-only">\${direction === 'prev' ? 'Previous' : 'Next'} case study: </span>\${label}\${direction === 'next' ? chevron('next') : ''}
      </a>
    </div>\`
}`,...(v=(b=d.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var w,y,x;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`() => \`
  <p class="sb-note">How the pair sits at the foot of every case study.</p>
  <div class="cs-back" style="display:flex;gap:16px;flex-wrap:wrap;justify-content:space-between;align-items:center;max-width:800px">
    <a class="pager pager--prev" href="#0">\${chevron('prev')}<span class="sr-only">Back to </span>All case studies</a>
    <a class="pager" href="#0"><span class="sr-only">Next case study: </span>Plate\${chevron('next')}</a>
  </div>\``,...(x=(y=a.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var f,k,_;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    head: 'Nobody asked for this one.',
    text: 'A Figma plugin, built on my own initiative, that cut merchant flow setup from most of a day to 10 to 15 minutes, across the 38-merchant program.',
    product: 'Figma plugin, PayPal',
    objective: 'Faster merchant flow setup',
    image: '/images/case-studies/merchant-flow-builder/plugin-pipeline.webp'
  },
  argTypes: {
    head: {
      control: 'text'
    },
    text: {
      control: 'text'
    },
    product: {
      control: 'text'
    },
    objective: {
      control: 'text'
    },
    image: {
      control: 'select',
      options: ['/images/case-studies/merchant-flow-builder/plugin-pipeline.webp', '/images/case-studies/paypal/one-click.webp', '/images/case-studies/paypal/journey-dead-end.webp', '/images/case-studies/plate/plate-scene.webp', '/images/case-studies/design-systems/pattern-lab.webp']
    }
  },
  render: ({
    head,
    text,
    product,
    objective,
    image
  }) => \`
    <p class="sb-note">The unit the home page deck is built from. Art is 16:9 and full bleed; the
      body is a grid so the meta and the call to action share the last row on desktop and stack
      on phones. Labels read Product and Objective, not Client and Service. The headline is the only link;
      a stretched ::after covers the card, so the whole card clicks while its accessible name is
      exactly the visible headline rather than a hand-written label.</p>
    <div style="max-width:760px">
      <div class="card" style="display:flex;flex-direction:column">
        <div class="card__art card__art--image"><img src="\${image}" alt="" /></div>
        <div class="card__body">
          <h3 class="card__head"><a class="card__link" href="#0">\${head}</a></h3>
          <p class="card__text">\${text}</p>
          <dl class="card__meta">
            <div><dt>Product</dt><dd>\${product}</dd></div>
            <div><dt>Objective</dt><dd>\${objective}</dd></div>
          </dl>
          <span class="card__cta">Read case study <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </div>
    </div>\`
}`,...(_=(k=s.parameters)==null?void 0:k.docs)==null?void 0:_.source}}};var P,T,$;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    quote: 'He is one of those uncommon designers who can move fluidly between strategy, design, prototyping, and code.',
    title: 'Product Designer, PayPal Merchant Enablement'
  },
  argTypes: {
    quote: {
      control: 'text'
    },
    title: {
      control: 'text'
    }
  },
  render: ({
    quote,
    title
  }) => \`
    <p class="sb-note">One verbatim sentence from a LinkedIn recommendation. Titles only, never
      names. Twelve of these run in the scroll-driven fan under "On the record."</p>
    <div style="width:440px;max-width:100%">
      <figure class="quote" style="height:330px;display:flex;flex-direction:column;justify-content:center;background:var(--surface);border-radius:var(--radius);box-shadow:var(--shadow-card);padding:34px 30px;margin:0;text-align:center">
        <blockquote class="quote__text" style="margin:0"><p>\${quote}</p></blockquote>
        <figcaption class="quote__title" style="margin-top:18px">\${title}</figcaption>
      </figure>
    </div>\`
}`,...($=(T=c.parameters)==null?void 0:T.docs)==null?void 0:$.source}}};var C,S,j;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`() => \`
  <p class="sb-note">Key and value, with a pipe between them. The pipe is a CSS pseudo-element with
    empty alt text, so assistive tech never announces it, and it is suppressed on phones where the
    label stacks above the value.</p>
  <dl class="card__meta" style="max-width:640px">
    <div><dt>Product</dt><dd>One-click checkout, PayPal</dd></div>
    <div><dt>Objective</dt><dd>One tap in each merchant's own checkout</dd></div>
  </dl>\``,...(j=(S=n.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var O,q,R;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`() => \`
  <p class="sb-note">The shared treatment for How I work and Recognition. A 220px key column, a rule
    under each row, and nothing else.</p>
  <ul class="how__list" style="max-width:800px">
    <li><p class="how__tool">Figma</p><p>Design, prototyping, and the component libraries behind the case studies.</p></li>
    <li><p class="how__tool">Claude Code and Cursor</p><p>Building and extending what the design needs, including the plugin.</p></li>
    <li><p class="how__tool">Storybook</p><p>Component documentation with interactive controls on the core atoms.</p></li>
  </ul>\``,...(R=(q=o.parameters)==null?void 0:q.docs)==null?void 0:R.source}}};var N,B,A;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`() => \`
  <p class="sb-note">One organism: a kicker, the section heading, and its body. They sit on line
    height alone with no margins between them, so the three read as a single unit. The heading is a
    real h2, styled to look like the paragraph it used to be.</p>
  <div class="cs-body" style="display:grid;gap:48px;max-width:800px">
    <div class="cs-block">
      <p class="eyebrow">What was unclear</p>
      <h2 class="cs-block__lede">A whole brand online, reduced to recipes.</h2>
      <p>Plate's website was only a recipe database. The brand also had magazine content, daily news, and blogs, but none of it lived online in a usable structure.</p>
    </div>
  </div>\``,...(A=(B=r.parameters)==null?void 0:B.docs)==null?void 0:A.source}}};var F,L,M;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`() => \`
  <p class="sb-note">First focusable element on every page, offscreen until focused. Tab into the
    frame to bring it in.</p>
  <div style="position:relative;height:90px">
    <a class="skip-link" href="#0" style="position:absolute;top:12px;left:0">Skip to content</a>
  </div>\``,...(M=(L=i.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};const z=["Buttons","Pager","PagerPair","CaseCard","Recommendation","MetaRow","RowList","CaseBlock","SkipLink"];export{l as Buttons,r as CaseBlock,s as CaseCard,n as MetaRow,d as Pager,a as PagerPair,c as Recommendation,o as RowList,i as SkipLink,z as __namedExportsOrder,E as default};
