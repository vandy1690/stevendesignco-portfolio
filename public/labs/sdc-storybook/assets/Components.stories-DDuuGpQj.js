import{a as te}from"./design-links-5xpGFJ9n.js";const v=t=>`<span class="sdc-pager__cap" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${t==="prev"?"M10 3.5 5.5 8l4.5 4.5":"m6 3.5 4.5 4.5L6 12.5"}"/></svg></span>`,ae={title:"Components"},p={args:{label:"View work"},argTypes:{label:{control:"text"}},render:({label:t})=>`
    <p class="sb-note">Two weights only. Both take the 10px control radius, and the secondary
      border uses <code>--sdc-rule-strong</code> so the boundary clears 3 to 1.</p>
    <div class="sb-stack">
      <a class="sdc-btn sdc-btn--primary" href="#0">${t}</a>
      <a class="sdc-btn" href="#0">Resume</a>
    </div>`},u={args:{label:"Default at checkout",direction:"next"},argTypes:{label:{control:"text"},direction:{control:"inline-radio",options:["prev","next"]}},render:({label:t,direction:e})=>`
    <p class="sb-note">Moves between case studies. The visible text is the destination only; the
      arrow carries direction, and hidden text states both, so the link makes sense read on its own
      without a label overriding what is on screen. On phones two pagers share one row and wrap their own labels.</p>
    <div class="sb-stack">
      <a class="sdc-pager ${e==="prev"?"sdc-pager--prev":""}" href="#0">
        ${e==="prev"?v("prev"):""}<span class="sdc-u-sr-only">${e==="prev"?"Previous":"Next"} case study: </span>${t}${e==="next"?v("next"):""}
      </a>
    </div>`},n=()=>`
  <p class="sb-note">How the pair sits at the foot of every case study.</p>
  <sdc-layout-container layout="pager" style="display:flex;gap:16px;flex-wrap:wrap;justify-content:space-between;align-items:center;max-width:800px">
    <a class="sdc-pager sdc-pager--prev" href="#0">${v("prev")}<span class="sdc-u-sr-only">Back to </span>All case studies</a>
    <a class="sdc-pager" href="#0"><span class="sdc-u-sr-only">Next case study: </span>Plate${v("next")}</a>
  </sdc-layout-container>`;n.storyName="Pager pair";const o={args:{head:"Nobody asked for this one.",text:"A Figma plugin, built on my own initiative, that cut merchant flow setup from most of a day to 10 to 15 minutes, across the 38-merchant program.",product:"Figma plugin, PayPal",objective:"Faster merchant flow setup",image:"/images/case-studies/merchant-flow-builder/plugin-pipeline.webp"},argTypes:{head:{control:"text"},text:{control:"text"},product:{control:"text"},objective:{control:"text"},image:{control:"select",options:["/images/case-studies/merchant-flow-builder/plugin-pipeline.webp","/images/case-studies/paypal/one-click.webp","/images/case-studies/paypal/journey-dead-end.webp","/images/case-studies/plate/plate-scene.webp","/images/case-studies/design-systems/pattern-lab.webp"]}},render:({head:t,text:e,product:l,objective:s,image:a})=>`
    <p class="sb-note">The unit the home page deck is built from. Art is 16:9 and full bleed; the
      body is a grid so the meta and the call to action share the last row on desktop and stack
      on phones. Labels read Product and Objective, not Client and Service. The headline is the only link;
      a stretched ::after covers the card, so the whole card clicks while its accessible name is
      exactly the visible headline rather than a hand-written label.</p>
    <div style="max-width:760px">
      <sdc-card style="display:flex;flex-direction:column">
        <div class="sdc-card__art sdc-card__art--image"><img src="${a}" alt="" /></div>
        <div class="sdc-card__body">
          <h3 class="sdc-card__head"><a class="sdc-card__link" href="#0">${t}</a></h3>
          <p class="sdc-card__text">${e}</p>
          <dl class="sdc-card__meta">
            <div><dt>Product</dt><dd>${l}</dd></div>
            <div><dt>Objective</dt><dd>${s}</dd></div>
          </dl>
          <span class="sdc-card__cta">Read case study <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </sdc-card>
    </div>`};o.storyName="Case study card";const h={args:{quote:"He is one of those uncommon designers who can move fluidly between strategy, design, prototyping, and code.",title:"Product Designer, PayPal Merchant Enablement"},argTypes:{quote:{control:"text"},title:{control:"text"}},render:({quote:t,title:e})=>`
    <p class="sb-note">One verbatim sentence from a LinkedIn recommendation. Titles only, never
      names. Twelve of these run in the scroll-driven fan under "On the record."</p>
    <div style="width:440px;max-width:100%">
      <figure class="sdc-quote" style="height:330px;display:flex;flex-direction:column;justify-content:center;background:var(--sdc-surface);border-radius:var(--sdc-radius);box-shadow:var(--sdc-shadow-card);padding:34px 30px;margin:0;text-align:center">
        <blockquote class="sdc-quote__text" style="margin:0"><p>${t}</p></blockquote>
        <figcaption class="sdc-quote__title" style="margin-top:18px">${e}</figcaption>
      </figure>
    </div>`},r=()=>`
  <p class="sb-note">Key and value, with a pipe between them. The pipe is a CSS pseudo-element with
    empty alt text, so assistive tech never announces it, and it is suppressed on phones where the
    label stacks above the value.</p>
  <dl class="sdc-card__meta" style="max-width:640px">
    <div><dt>Product</dt><dd>One-click checkout, PayPal</dd></div>
    <div><dt>Objective</dt><dd>One tap in each merchant's own checkout</dd></div>
  </dl>`;r.storyName="Meta row";const i=()=>`
  <p class="sb-note">The shared treatment for How I work and Recognition. A 220px key column, a rule
    under each row, and nothing else.</p>
  <ul class="sdc-how__list" style="max-width:800px">
    <li><p class="sdc-how__tool">Figma</p><p>Design, prototyping, and the component libraries behind the case studies.</p></li>
    <li><p class="sdc-how__tool">Claude Code and Cursor</p><p>Building and extending what the design needs, including the plugin.</p></li>
    <li><p class="sdc-how__tool">Storybook</p><p>Component documentation with interactive controls on the core atoms.</p></li>
  </ul>`;i.storyName="Row list";const d=()=>`
  <p class="sb-note">One organism: a kicker, the section heading, and its body. They sit on line
    height alone with no margins between them, so the three read as a single unit. The heading is a
    real h2, styled to look like the paragraph it used to be.</p>
  <sdc-layout-container layout="prose" style="display:grid;gap:48px;max-width:800px">
    <sdc-case-block>
      <p class="sdc-eyebrow">What was unclear</p>
      <h2 class="sdc-case-block__lede">A whole brand online, reduced to recipes.</h2>
      <p>Plate's website was only a recipe database. The brand also had magazine content, daily news, and blogs, but none of it lived online in a usable structure.</p>
    </sdc-case-block>
  </sdc-layout-container>`;d.storyName="Case study block";const c=()=>`
  <p class="sb-note">First focusable element on every page, offscreen until focused. Tab into the
    frame to bring it in.</p>
  <div style="position:relative;height:90px">
    <a class="sdc-skip-link" href="#0" style="position:absolute;top:12px;left:0">Skip to content</a>
  </div>`;c.storyName="Skip link";const b={args:{label:"Type something",hint:"Up to 100 characters.",multiline:!0,value:"Hej Madeline! Vi saknar dig."},argTypes:{label:{control:"text"},hint:{control:"text"},multiline:{control:"boolean"},value:{control:"text"}},render:({label:t,hint:e,multiline:l,value:s})=>{const a=l?`<textarea class="sdc-field__input" id="sb-field" rows="2" maxlength="100"${e?' aria-describedby="sb-field-hint"':""}>${s}</textarea>`:`<input class="sdc-field__input" id="sb-field" type="text" value="${s}" maxlength="100"${e?' aria-describedby="sb-field-hint"':""}>`;return`
    <p class="sb-note">A label over one text control, and an optional hint tied to it with
      <code>aria-describedby</code>. The edge is <code>--sdc-rule-strong</code>, the same as the plain
      button, so the boundary clears 3 to 1. Body size, so phones do not zoom in on focus. Not
      resizable. Focus is the site-wide ring.</p>
    <div class="sdc-field" style="max-width:640px">
      <label class="sdc-field__label" for="sb-field">${t}</label>
      ${a}
      ${e?`<p class="sdc-field__hint" id="sb-field-hint">${e}</p>`:""}
    </div>`}},m={args:{label:"Size",min:16,max:96,value:32,unit:"px"},argTypes:{label:{control:"text"},min:{control:"number"},max:{control:"number"},value:{control:"number"},unit:{control:"text"}},render:({label:t,min:e,max:l,value:s,unit:a})=>{const w=a?`${s} ${a}`:String(s),g=document.createElement("div");g.innerHTML=`
    <p class="sb-note">The browser's own range input, tinted with <code>--sdc-accent</code>, so keyboard,
      touch and screen readers behave the way people expect. The current value sits beside the
      label in an <code>&lt;output&gt;</code>, not inside it, and <code>aria-valuetext</code> carries the
      unit, so a screen reader hears "${w}". Drag it, or tab to it and use the arrow keys.</p>
    <div class="sdc-field" style="max-width:640px">
      <div class="sdc-field__head">
        <label class="sdc-field__label" for="sb-slider">${t}</label>
        <output class="sdc-field__value" for="sb-slider">${w}</output>
      </div>
      <input class="sdc-field__slider" id="sb-slider" type="range" min="${e}" max="${l}" step="1" value="${s}" aria-valuetext="${w}">
    </div>`;const y=g.querySelector("input"),ee=g.querySelector("output");return y.addEventListener("input",()=>{const x=a?`${y.value} ${a}`:y.value;ee.textContent=x,y.setAttribute("aria-valuetext",x)}),g}};te({Buttons:p,Pager:u,PagerPair:n,CaseCard:o,Recommendation:h,MetaRow:r,RowList:i,CaseBlock:d,SkipLink:c,Field:b,Slider:m});var f,_,k;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
      border uses <code>--sdc-rule-strong</code> so the boundary clears 3 to 1.</p>
    <div class="sb-stack">
      <a class="sdc-btn sdc-btn--primary" href="#0">\${label}</a>
      <a class="sdc-btn" href="#0">Resume</a>
    </div>\`
}`,...(k=(_=p.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var $,T,S;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
      <a class="sdc-pager \${direction === 'prev' ? 'sdc-pager--prev' : ''}" href="#0">
        \${direction === 'prev' ? chevron('prev') : ''}<span class="sdc-u-sr-only">\${direction === 'prev' ? 'Previous' : 'Next'} case study: </span>\${label}\${direction === 'next' ? chevron('next') : ''}
      </a>
    </div>\`
}`,...(S=(T=u.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};var P,C,j;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`() => \`
  <p class="sb-note">How the pair sits at the foot of every case study.</p>
  <sdc-layout-container layout="pager" style="display:flex;gap:16px;flex-wrap:wrap;justify-content:space-between;align-items:center;max-width:800px">
    <a class="sdc-pager sdc-pager--prev" href="#0">\${chevron('prev')}<span class="sdc-u-sr-only">Back to </span>All case studies</a>
    <a class="sdc-pager" href="#0"><span class="sdc-u-sr-only">Next case study: </span>Plate\${chevron('next')}</a>
  </sdc-layout-container>\``,...(j=(C=n.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};var q,O,A;o.parameters={...o.parameters,docs:{...(q=o.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
      <sdc-card style="display:flex;flex-direction:column">
        <div class="sdc-card__art sdc-card__art--image"><img src="\${image}" alt="" /></div>
        <div class="sdc-card__body">
          <h3 class="sdc-card__head"><a class="sdc-card__link" href="#0">\${head}</a></h3>
          <p class="sdc-card__text">\${text}</p>
          <dl class="sdc-card__meta">
            <div><dt>Product</dt><dd>\${product}</dd></div>
            <div><dt>Objective</dt><dd>\${objective}</dd></div>
          </dl>
          <span class="sdc-card__cta">Read case study <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </sdc-card>
    </div>\`
}`,...(A=(O=o.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var F,N,B;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
      <figure class="sdc-quote" style="height:330px;display:flex;flex-direction:column;justify-content:center;background:var(--sdc-surface);border-radius:var(--sdc-radius);box-shadow:var(--sdc-shadow-card);padding:34px 30px;margin:0;text-align:center">
        <blockquote class="sdc-quote__text" style="margin:0"><p>\${quote}</p></blockquote>
        <figcaption class="sdc-quote__title" style="margin-top:18px">\${title}</figcaption>
      </figure>
    </div>\`
}`,...(B=(N=h.parameters)==null?void 0:N.docs)==null?void 0:B.source}}};var L,R,M;r.parameters={...r.parameters,docs:{...(L=r.parameters)==null?void 0:L.docs,source:{originalSource:`() => \`
  <p class="sb-note">Key and value, with a pipe between them. The pipe is a CSS pseudo-element with
    empty alt text, so assistive tech never announces it, and it is suppressed on phones where the
    label stacks above the value.</p>
  <dl class="sdc-card__meta" style="max-width:640px">
    <div><dt>Product</dt><dd>One-click checkout, PayPal</dd></div>
    <div><dt>Objective</dt><dd>One tap in each merchant's own checkout</dd></div>
  </dl>\``,...(M=(R=r.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var z,H,D;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`() => \`
  <p class="sb-note">The shared treatment for How I work and Recognition. A 220px key column, a rule
    under each row, and nothing else.</p>
  <ul class="sdc-how__list" style="max-width:800px">
    <li><p class="sdc-how__tool">Figma</p><p>Design, prototyping, and the component libraries behind the case studies.</p></li>
    <li><p class="sdc-how__tool">Claude Code and Cursor</p><p>Building and extending what the design needs, including the plugin.</p></li>
    <li><p class="sdc-how__tool">Storybook</p><p>Component documentation with interactive controls on the core atoms.</p></li>
  </ul>\``,...(D=(H=i.parameters)==null?void 0:H.docs)==null?void 0:D.source}}};var E,I,V;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`() => \`
  <p class="sb-note">One organism: a kicker, the section heading, and its body. They sit on line
    height alone with no margins between them, so the three read as a single unit. The heading is a
    real h2, styled to look like the paragraph it used to be.</p>
  <sdc-layout-container layout="prose" style="display:grid;gap:48px;max-width:800px">
    <sdc-case-block>
      <p class="sdc-eyebrow">What was unclear</p>
      <h2 class="sdc-case-block__lede">A whole brand online, reduced to recipes.</h2>
      <p>Plate's website was only a recipe database. The brand also had magazine content, daily news, and blogs, but none of it lived online in a usable structure.</p>
    </sdc-case-block>
  </sdc-layout-container>\``,...(V=(I=d.parameters)==null?void 0:I.docs)==null?void 0:V.source}}};var K,U,W;c.parameters={...c.parameters,docs:{...(K=c.parameters)==null?void 0:K.docs,source:{originalSource:`() => \`
  <p class="sb-note">First focusable element on every page, offscreen until focused. Tab into the
    frame to bring it in.</p>
  <div style="position:relative;height:90px">
    <a class="sdc-skip-link" href="#0" style="position:absolute;top:12px;left:0">Skip to content</a>
  </div>\``,...(W=(U=c.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var G,J,Q;b.parameters={...b.parameters,docs:{...(G=b.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    label: 'Type something',
    hint: 'Up to 100 characters.',
    multiline: true,
    value: 'Hej Madeline! Vi saknar dig.'
  },
  argTypes: {
    label: {
      control: 'text'
    },
    hint: {
      control: 'text'
    },
    multiline: {
      control: 'boolean'
    },
    value: {
      control: 'text'
    }
  },
  render: ({
    label,
    hint,
    multiline,
    value
  }) => {
    const control = multiline ? \`<textarea class="sdc-field__input" id="sb-field" rows="2" maxlength="100"\${hint ? ' aria-describedby="sb-field-hint"' : ''}>\${value}</textarea>\` : \`<input class="sdc-field__input" id="sb-field" type="text" value="\${value}" maxlength="100"\${hint ? ' aria-describedby="sb-field-hint"' : ''}>\`;
    return \`
    <p class="sb-note">A label over one text control, and an optional hint tied to it with
      <code>aria-describedby</code>. The edge is <code>--sdc-rule-strong</code>, the same as the plain
      button, so the boundary clears 3 to 1. Body size, so phones do not zoom in on focus. Not
      resizable. Focus is the site-wide ring.</p>
    <div class="sdc-field" style="max-width:640px">
      <label class="sdc-field__label" for="sb-field">\${label}</label>
      \${control}
      \${hint ? \`<p class="sdc-field__hint" id="sb-field-hint">\${hint}</p>\` : ''}
    </div>\`;
  }
}`,...(Q=(J=b.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,Y,Z;m.parameters={...m.parameters,docs:{...(X=m.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    label: 'Size',
    min: 16,
    max: 96,
    value: 32,
    unit: 'px'
  },
  argTypes: {
    label: {
      control: 'text'
    },
    min: {
      control: 'number'
    },
    max: {
      control: 'number'
    },
    value: {
      control: 'number'
    },
    unit: {
      control: 'text'
    }
  },
  render: ({
    label,
    min,
    max,
    value,
    unit
  }) => {
    const shown = unit ? \`\${value} \${unit}\` : String(value);
    const wrap = document.createElement('div');
    wrap.innerHTML = \`
    <p class="sb-note">The browser's own range input, tinted with <code>--sdc-accent</code>, so keyboard,
      touch and screen readers behave the way people expect. The current value sits beside the
      label in an <code>&lt;output&gt;</code>, not inside it, and <code>aria-valuetext</code> carries the
      unit, so a screen reader hears "\${shown}". Drag it, or tab to it and use the arrow keys.</p>
    <div class="sdc-field" style="max-width:640px">
      <div class="sdc-field__head">
        <label class="sdc-field__label" for="sb-slider">\${label}</label>
        <output class="sdc-field__value" for="sb-slider">\${shown}</output>
      </div>
      <input class="sdc-field__slider" id="sb-slider" type="range" min="\${min}" max="\${max}" step="1" value="\${value}" aria-valuetext="\${shown}">
    </div>\`;
    const input = wrap.querySelector('input');
    const out = wrap.querySelector('output');
    input.addEventListener('input', () => {
      const text = unit ? \`\${input.value} \${unit}\` : input.value;
      out.textContent = text;
      input.setAttribute('aria-valuetext', text);
    });
    return wrap;
  }
}`,...(Z=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};const ne=["Buttons","Pager","PagerPair","CaseCard","Recommendation","MetaRow","RowList","CaseBlock","SkipLink","Field","Slider"];export{p as Buttons,d as CaseBlock,o as CaseCard,b as Field,r as MetaRow,u as Pager,n as PagerPair,h as Recommendation,i as RowList,c as SkipLink,m as Slider,ne as __namedExportsOrder,ae as default};
