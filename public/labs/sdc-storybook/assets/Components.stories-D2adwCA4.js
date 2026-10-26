import{a as ye}from"./design-links-CsRzzX79.js";const k=e=>`<span class="sdc-pager__cap" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${e==="prev"?"M10 3.5 5.5 8l4.5 4.5":"m6 3.5 4.5 4.5L6 12.5"}"/></svg></span>`,fe={title:"Components"},b={args:{label:"View work"},argTypes:{label:{control:"text"}},render:({label:e})=>`
    <p class="sb-note">Two weights only. Both take the 10px control radius, and the secondary
      border uses <code>--sdc-rule-strong</code> so the boundary clears 3 to 1.</p>
    <div class="sb-stack">
      <a class="sdc-btn sdc-btn--primary" href="#0">${e}</a>
      <a class="sdc-btn" href="#0">Resume</a>
    </div>`},m={args:{label:"Default at checkout",direction:"next"},argTypes:{label:{control:"text"},direction:{control:"inline-radio",options:["prev","next"]}},render:({label:e,direction:s})=>`
    <p class="sb-note">Moves between case studies. The visible text is the destination only; the
      arrow carries direction, and hidden text states both, so the link makes sense read on its own
      without a label overriding what is on screen. On phones two pagers share one row and wrap their own labels.</p>
    <div class="sb-stack">
      <a class="sdc-pager ${s==="prev"?"sdc-pager--prev":""}" href="#0">
        ${s==="prev"?k("prev"):""}<span class="sdc-u-sr-only">${s==="prev"?"Previous":"Next"} case study: </span>${e}${s==="next"?k("next"):""}
      </a>
    </div>`},n=()=>`
  <p class="sb-note">How the pair sits at the foot of every case study.</p>
  <sdc-layout-container layout="pager" style="display:flex;gap:16px;flex-wrap:wrap;justify-content:space-between;align-items:center;max-width:800px">
    <a class="sdc-pager sdc-pager--prev" href="#0">${k("prev")}<span class="sdc-u-sr-only">Back to </span>All case studies</a>
    <a class="sdc-pager" href="#0"><span class="sdc-u-sr-only">Next case study: </span>Plate${k("next")}</a>
  </sdc-layout-container>`;n.storyName="Pager pair";const o={args:{head:"Nobody asked for this one.",text:"A Figma plugin, built on my own initiative, that cut merchant flow setup from most of a day to 10 to 15 minutes, across the 38-merchant program.",product:"Figma plugin, PayPal",objective:"Faster merchant flow setup",image:"/images/case-studies/merchant-flow-builder/plugin-pipeline.webp"},argTypes:{head:{control:"text"},text:{control:"text"},product:{control:"text"},objective:{control:"text"},image:{control:"select",options:["/images/case-studies/merchant-flow-builder/plugin-pipeline.webp","/images/case-studies/paypal/one-click.webp","/images/case-studies/paypal/journey-dead-end.webp","/images/case-studies/plate/plate-scene.webp","/images/case-studies/design-systems/pattern-lab.webp"]}},render:({head:e,text:s,product:h,objective:a,image:t})=>`
    <p class="sb-note">The unit the home page deck is built from. Art is 16:9 and full bleed; the
      body is a grid so the meta and the call to action share the last row on desktop and stack
      on phones. Labels read Product and Objective, not Client and Service. The headline is the only link;
      a stretched ::after covers the card, so the whole card clicks while its accessible name is
      exactly the visible headline rather than a hand-written label.</p>
    <div style="max-width:760px">
      <sdc-card style="display:flex;flex-direction:column">
        <div class="sdc-card__art sdc-card__art--image"><img src="${t}" alt="" /></div>
        <div class="sdc-card__body">
          <h3 class="sdc-card__head"><a class="sdc-card__link" href="#0">${e}</a></h3>
          <p class="sdc-card__text">${s}</p>
          <dl class="sdc-card__meta">
            <div><dt>Product</dt><dd>${h}</dd></div>
            <div><dt>Objective</dt><dd>${a}</dd></div>
          </dl>
          <span class="sdc-card__cta">Read case study <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </sdc-card>
    </div>`};o.storyName="Case study card";const g={args:{quote:"He is one of those uncommon designers who can move fluidly between strategy, design, prototyping, and code.",title:"Product Designer, PayPal Merchant Enablement"},argTypes:{quote:{control:"text"},title:{control:"text"}},render:({quote:e,title:s})=>`
    <p class="sb-note">One verbatim sentence from a LinkedIn recommendation. Titles only, never
      names. Twelve of these run in the scroll-driven fan under "On the record."</p>
    <div style="width:440px;max-width:100%">
      <figure class="sdc-quote" style="height:330px;display:flex;flex-direction:column;justify-content:center;background:var(--sdc-surface);border-radius:var(--sdc-radius);box-shadow:var(--sdc-shadow-card);padding:34px 30px;margin:0;text-align:center">
        <blockquote class="sdc-quote__text" style="margin:0"><p>${e}</p></blockquote>
        <figcaption class="sdc-quote__title" style="margin-top:18px">${s}</figcaption>
      </figure>
    </div>`},i=()=>`
  <p class="sb-note">Key and value, with a pipe between them. The pipe is a CSS pseudo-element with
    empty alt text, so assistive tech never announces it, and it is suppressed on phones where the
    label stacks above the value.</p>
  <dl class="sdc-card__meta" style="max-width:640px">
    <div><dt>Product</dt><dd>One-click checkout, PayPal</dd></div>
    <div><dt>Objective</dt><dd>One tap in each merchant's own checkout</dd></div>
  </dl>`;i.storyName="Meta row";const r=()=>`
  <p class="sb-note">The shared treatment for How I work and Recognition. A 220px key column, a rule
    under each row, and nothing else.</p>
  <ul class="sdc-how__list" style="max-width:800px">
    <li><p class="sdc-how__tool">Figma</p><p>Design, prototyping, and the component libraries behind the case studies.</p></li>
    <li><p class="sdc-how__tool">Claude Code and Cursor</p><p>Building and extending what the design needs, including the plugin.</p></li>
    <li><p class="sdc-how__tool">Storybook</p><p>Component documentation with interactive controls on the core atoms.</p></li>
  </ul>`;r.storyName="Row list";const l=()=>`
  <p class="sb-note">One organism: a kicker, the section heading, and its body. They sit on line
    height alone with no margins between them, so the three read as a single unit. The heading is a
    real h2, styled to look like the paragraph it used to be.</p>
  <sdc-layout-container layout="prose" style="display:grid;gap:48px;max-width:800px">
    <sdc-case-block>
      <p class="sdc-eyebrow">What was unclear</p>
      <h2 class="sdc-case-block__lede">A whole brand online, reduced to recipes.</h2>
      <p>Plate's website was only a recipe database. The brand also had magazine content, daily news, and blogs, but none of it lived online in a usable structure.</p>
    </sdc-case-block>
  </sdc-layout-container>`;l.storyName="Case study block";const d=()=>`
  <p class="sb-note">First focusable element on every page, offscreen until focused. Tab into the
    frame to bring it in.</p>
  <div style="position:relative;height:90px">
    <a class="sdc-skip-link" href="#0" style="position:absolute;top:12px;left:0">Skip to content</a>
  </div>`;d.storyName="Skip link";const y={args:{label:"Type something",hint:"Up to 100 characters.",multiline:!0,value:"Hej Madeline! Vi saknar dig."},argTypes:{label:{control:"text"},hint:{control:"text"},multiline:{control:"boolean"},value:{control:"text"}},render:({label:e,hint:s,multiline:h,value:a})=>{const t=h?`<textarea class="sdc-field__input" id="sb-field" rows="2" maxlength="100"${s?' aria-describedby="sb-field-hint"':""}>${a}</textarea>`:`<input class="sdc-field__input" id="sb-field" type="text" value="${a}" maxlength="100"${s?' aria-describedby="sb-field-hint"':""}>`;return`
    <p class="sb-note">A label over one text control, and an optional hint tied to it with
      <code>aria-describedby</code>. The edge is <code>--sdc-rule-strong</code>, the same as the plain
      button, so the boundary clears 3 to 1. Body size, so phones do not zoom in on focus. Not
      resizable. Focus is the site-wide ring.</p>
    <div class="sdc-field" style="max-width:640px">
      <label class="sdc-field__label" for="sb-field">${e}</label>
      ${t}
      ${s?`<p class="sdc-field__hint" id="sb-field-hint">${s}</p>`:""}
    </div>`}},v={args:{label:"Size",min:16,max:96,value:32,unit:"px"},argTypes:{label:{control:"text"},min:{control:"number"},max:{control:"number"},value:{control:"number"},unit:{control:"text"}},render:({label:e,min:s,max:h,value:a,unit:t})=>{const _=t?`${a} ${t}`:String(a),x=document.createElement("div");x.innerHTML=`
    <p class="sb-note">The browser's own range input, tinted with <code>--sdc-accent</code>, so keyboard,
      touch and screen readers behave the way people expect. The current value sits beside the
      label in an <code>&lt;output&gt;</code>, not inside it, and <code>aria-valuetext</code> carries the
      unit, so a screen reader hears "${_}". Drag it, or tab to it and use the arrow keys.</p>
    <div class="sdc-field" style="max-width:640px">
      <div class="sdc-field__head">
        <label class="sdc-field__label" for="sb-slider">${e}</label>
        <output class="sdc-field__value" for="sb-slider">${_}</output>
      </div>
      <input class="sdc-field__slider" id="sb-slider" type="range" min="${s}" max="${h}" step="1" value="${a}" aria-valuetext="${_}">
    </div>`;const w=x.querySelector("input"),ge=x.querySelector("output");return w.addEventListener("input",()=>{const $=t?`${w.value} ${t}`:w.value;ge.textContent=$,w.setAttribute("aria-valuetext",$)}),x}},c={args:{label:"Email address",error:"That email address is missing something. Check it for a typo."},argTypes:{label:{control:"text"},error:{control:"text"}},render:({label:e,error:s})=>`
    <p class="sb-note">Required, invalid and disabled. The asterisk is <code>aria-hidden</code> because
      <code>required</code> already says it. An invalid control takes <code>aria-invalid="true"</code> and
      points <code>aria-describedby</code> at the error, so the failure is announced and not only
      coloured. The border thickens as well as reddens, for the same reason.</p>
    <div class="sb-stack" style="display:grid;gap:24px;max-width:640px">
      <div class="sdc-field">
        <label class="sdc-field__label" for="sb-req">${e}<span class="sdc-field__req" aria-hidden="true">*</span></label>
        <input class="sdc-field__input" id="sb-req" type="email" required autocomplete="email" inputmode="email" placeholder="jane@mercerdental.com">
      </div>
      <div class="sdc-field sdc-field--invalid">
        <label class="sdc-field__label" for="sb-inv">${e}<span class="sdc-field__req" aria-hidden="true">*</span></label>
        <input class="sdc-field__input" id="sb-inv" type="email" value="jane@" required aria-invalid="true" aria-describedby="sb-inv-err">
        <p class="sdc-field__error" id="sb-inv-err">${s}</p>
      </div>
      <div class="sdc-field">
        <label class="sdc-field__label" for="sb-dis">${e}</label>
        <input class="sdc-field__input" id="sb-dis" type="email" value="set by your account" disabled>
      </div>
    </div>`};c.storyName="Field states";const f={args:{legend:"What should people be able to do?"},argTypes:{legend:{control:"text"}},render:({legend:e})=>`
    <p class="sb-note">A checkbox or radio drawn as a chip. The native input stays in the DOM and keeps
      its keyboard behaviour; the label is the visible target and carries the 44px height. The input is
      1px wide, which is why an automated target-size scan flags it and is wrong to. Checked is not
      colour alone: the chip grows a tick. Tab to one and press space.</p>
    <fieldset class="sdc-fieldset" style="max-width:640px">
      <legend>${e}</legend>
      <div class="sdc-choice-set">
        <label class="sdc-choice"><input type="checkbox" name="sb-do" value="call" checked><span>Call me</span></label>
        <label class="sdc-choice"><input type="checkbox" name="sb-do" value="email"><span>Email me</span></label>
        <label class="sdc-choice"><input type="checkbox" name="sb-do" value="book"><span>Book an appointment</span></label>
        <label class="sdc-choice"><input type="checkbox" name="sb-do" value="quote"><span>Ask for a quote</span></label>
      </div>
    </fieldset>`},p={args:{label:"How did you hear about me?"},argTypes:{label:{control:"text"}},render:({label:e})=>`
    <p class="sb-note">The browser's own select with our chrome on it, so the platform picker, the
      keyboard and the screen reader announcement all still work. Same height, border and radius as a
      text input, because they sit next to each other.</p>
    <div class="sdc-field" style="max-width:640px">
      <label class="sdc-field__label" for="sb-sel">${e}</label>
      <select class="sdc-select" id="sb-sel">
        <option value="" disabled selected>Pick one</option>
        <option value="referral">Someone referred me</option>
        <option value="search">I searched for it</option>
        <option value="social">Social media</option>
      </select>
    </div>`};p.storyName="Select";const u={render:()=>`
    <p class="sb-note">The two things a form says. The summary appears on a failed submit, takes focus,
      and links each message to the control that needs fixing: <code>role="alert"</code>, <code>tabindex="-1"</code>,
      hidden until it has something to say. The status line is a polite live region that stays in the DOM
      empty, because a region added at the moment it speaks is often missed. Three tones, one per
      status colour: the tint is the ground, the ink sits on it, the solid draws the border. Measured
      in both themes, text on tint runs 7.70 to 15.63 and every border clears 3 to 1.</p>
    <div class="sb-stack" style="display:grid;gap:24px;max-width:640px">
      <div class="sdc-form-summary" role="alert" tabindex="-1">
        <strong>That did not send yet.</strong>
        <ul>
          <li><a href="#0">Add your name.</a></li>
          <li><a href="#0">That email address is missing something.</a></li>
        </ul>
      </div>
      <div class="sdc-form-summary sdc-form-summary--warning" role="alert" tabindex="-1">
        <strong>Saved, with one thing to check.</strong>
        <ul><li><a href="#0">No phone number, so I can only reply by email.</a></li></ul>
      </div>
      <div class="sdc-form-summary sdc-form-summary--success" role="alert" tabindex="-1">
        <strong>Sent. I will reply within a day.</strong>
      </div>
      <p class="sdc-form-status sdc-form-status--ok" role="status" aria-live="polite">Sent. I will reply within a day.</p>
      <p class="sdc-form-status sdc-form-status--warn" role="status" aria-live="polite">Saved as a draft. Nothing has been sent yet.</p>
      <p class="sdc-form-status sdc-form-status--err" role="status" aria-live="polite">That did not send. Email me directly instead.</p>
    </div>`};u.storyName="Form messages";ye({Buttons:b,Pager:m,PagerPair:n,CaseCard:o,Recommendation:g,MetaRow:i,RowList:r,CaseBlock:l,SkipLink:d,Field:y,Slider:v,FieldStates:c,Choice:f,SelectControl:p,FormMessages:u});var T,S,q;b.parameters={...b.parameters,docs:{...(T=b.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(q=(S=b.parameters)==null?void 0:S.docs)==null?void 0:q.source}}};var C,P,j;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(j=(P=m.parameters)==null?void 0:P.docs)==null?void 0:j.source}}};var O,A,N;n.parameters={...n.parameters,docs:{...(O=n.parameters)==null?void 0:O.docs,source:{originalSource:`() => \`
  <p class="sb-note">How the pair sits at the foot of every case study.</p>
  <sdc-layout-container layout="pager" style="display:flex;gap:16px;flex-wrap:wrap;justify-content:space-between;align-items:center;max-width:800px">
    <a class="sdc-pager sdc-pager--prev" href="#0">\${chevron('prev')}<span class="sdc-u-sr-only">Back to </span>All case studies</a>
    <a class="sdc-pager" href="#0"><span class="sdc-u-sr-only">Next case study: </span>Plate\${chevron('next')}</a>
  </sdc-layout-container>\``,...(N=(A=n.parameters)==null?void 0:A.docs)==null?void 0:N.source}}};var F,M,B;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(B=(M=o.parameters)==null?void 0:M.docs)==null?void 0:B.source}}};var R,D,E;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(E=(D=g.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var L,z,H;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`() => \`
  <p class="sb-note">Key and value, with a pipe between them. The pipe is a CSS pseudo-element with
    empty alt text, so assistive tech never announces it, and it is suppressed on phones where the
    label stacks above the value.</p>
  <dl class="sdc-card__meta" style="max-width:640px">
    <div><dt>Product</dt><dd>One-click checkout, PayPal</dd></div>
    <div><dt>Objective</dt><dd>One tap in each merchant's own checkout</dd></div>
  </dl>\``,...(H=(z=i.parameters)==null?void 0:z.docs)==null?void 0:H.source}}};var I,V,W;r.parameters={...r.parameters,docs:{...(I=r.parameters)==null?void 0:I.docs,source:{originalSource:`() => \`
  <p class="sb-note">The shared treatment for How I work and Recognition. A 220px key column, a rule
    under each row, and nothing else.</p>
  <ul class="sdc-how__list" style="max-width:800px">
    <li><p class="sdc-how__tool">Figma</p><p>Design, prototyping, and the component libraries behind the case studies.</p></li>
    <li><p class="sdc-how__tool">Claude Code and Cursor</p><p>Building and extending what the design needs, including the plugin.</p></li>
    <li><p class="sdc-how__tool">Storybook</p><p>Component documentation with interactive controls on the core atoms.</p></li>
  </ul>\``,...(W=(V=r.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var K,U,G;l.parameters={...l.parameters,docs:{...(K=l.parameters)==null?void 0:K.docs,source:{originalSource:`() => \`
  <p class="sb-note">One organism: a kicker, the section heading, and its body. They sit on line
    height alone with no margins between them, so the three read as a single unit. The heading is a
    real h2, styled to look like the paragraph it used to be.</p>
  <sdc-layout-container layout="prose" style="display:grid;gap:48px;max-width:800px">
    <sdc-case-block>
      <p class="sdc-eyebrow">What was unclear</p>
      <h2 class="sdc-case-block__lede">A whole brand online, reduced to recipes.</h2>
      <p>Plate's website was only a recipe database. The brand also had magazine content, daily news, and blogs, but none of it lived online in a usable structure.</p>
    </sdc-case-block>
  </sdc-layout-container>\``,...(G=(U=l.parameters)==null?void 0:U.docs)==null?void 0:G.source}}};var J,Q,X;d.parameters={...d.parameters,docs:{...(J=d.parameters)==null?void 0:J.docs,source:{originalSource:`() => \`
  <p class="sb-note">First focusable element on every page, offscreen until focused. Tab into the
    frame to bring it in.</p>
  <div style="position:relative;height:90px">
    <a class="sdc-skip-link" href="#0" style="position:absolute;top:12px;left:0">Skip to content</a>
  </div>\``,...(X=(Q=d.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;y.parameters={...y.parameters,docs:{...(Y=y.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(ee=(Z=y.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var se,ae,te;v.parameters={...v.parameters,docs:{...(se=v.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
}`,...(te=(ae=v.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var ne,oe,ie;c.parameters={...c.parameters,docs:{...(ne=c.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    label: 'Email address',
    error: 'That email address is missing something. Check it for a typo.'
  },
  argTypes: {
    label: {
      control: 'text'
    },
    error: {
      control: 'text'
    }
  },
  render: ({
    label,
    error
  }) => \`
    <p class="sb-note">Required, invalid and disabled. The asterisk is <code>aria-hidden</code> because
      <code>required</code> already says it. An invalid control takes <code>aria-invalid="true"</code> and
      points <code>aria-describedby</code> at the error, so the failure is announced and not only
      coloured. The border thickens as well as reddens, for the same reason.</p>
    <div class="sb-stack" style="display:grid;gap:24px;max-width:640px">
      <div class="sdc-field">
        <label class="sdc-field__label" for="sb-req">\${label}<span class="sdc-field__req" aria-hidden="true">*</span></label>
        <input class="sdc-field__input" id="sb-req" type="email" required autocomplete="email" inputmode="email" placeholder="jane@mercerdental.com">
      </div>
      <div class="sdc-field sdc-field--invalid">
        <label class="sdc-field__label" for="sb-inv">\${label}<span class="sdc-field__req" aria-hidden="true">*</span></label>
        <input class="sdc-field__input" id="sb-inv" type="email" value="jane@" required aria-invalid="true" aria-describedby="sb-inv-err">
        <p class="sdc-field__error" id="sb-inv-err">\${error}</p>
      </div>
      <div class="sdc-field">
        <label class="sdc-field__label" for="sb-dis">\${label}</label>
        <input class="sdc-field__input" id="sb-dis" type="email" value="set by your account" disabled>
      </div>
    </div>\`
}`,...(ie=(oe=c.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};var re,le,de;f.parameters={...f.parameters,docs:{...(re=f.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    legend: 'What should people be able to do?'
  },
  argTypes: {
    legend: {
      control: 'text'
    }
  },
  render: ({
    legend
  }) => \`
    <p class="sb-note">A checkbox or radio drawn as a chip. The native input stays in the DOM and keeps
      its keyboard behaviour; the label is the visible target and carries the 44px height. The input is
      1px wide, which is why an automated target-size scan flags it and is wrong to. Checked is not
      colour alone: the chip grows a tick. Tab to one and press space.</p>
    <fieldset class="sdc-fieldset" style="max-width:640px">
      <legend>\${legend}</legend>
      <div class="sdc-choice-set">
        <label class="sdc-choice"><input type="checkbox" name="sb-do" value="call" checked><span>Call me</span></label>
        <label class="sdc-choice"><input type="checkbox" name="sb-do" value="email"><span>Email me</span></label>
        <label class="sdc-choice"><input type="checkbox" name="sb-do" value="book"><span>Book an appointment</span></label>
        <label class="sdc-choice"><input type="checkbox" name="sb-do" value="quote"><span>Ask for a quote</span></label>
      </div>
    </fieldset>\`
}`,...(de=(le=f.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ce,pe,ue;p.parameters={...p.parameters,docs:{...(ce=p.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    label: 'How did you hear about me?'
  },
  argTypes: {
    label: {
      control: 'text'
    }
  },
  render: ({
    label
  }) => \`
    <p class="sb-note">The browser's own select with our chrome on it, so the platform picker, the
      keyboard and the screen reader announcement all still work. Same height, border and radius as a
      text input, because they sit next to each other.</p>
    <div class="sdc-field" style="max-width:640px">
      <label class="sdc-field__label" for="sb-sel">\${label}</label>
      <select class="sdc-select" id="sb-sel">
        <option value="" disabled selected>Pick one</option>
        <option value="referral">Someone referred me</option>
        <option value="search">I searched for it</option>
        <option value="social">Social media</option>
      </select>
    </div>\`
}`,...(ue=(pe=p.parameters)==null?void 0:pe.docs)==null?void 0:ue.source}}};var he,be,me;u.parameters={...u.parameters,docs:{...(he=u.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: () => \`
    <p class="sb-note">The two things a form says. The summary appears on a failed submit, takes focus,
      and links each message to the control that needs fixing: <code>role="alert"</code>, <code>tabindex="-1"</code>,
      hidden until it has something to say. The status line is a polite live region that stays in the DOM
      empty, because a region added at the moment it speaks is often missed. Three tones, one per
      status colour: the tint is the ground, the ink sits on it, the solid draws the border. Measured
      in both themes, text on tint runs 7.70 to 15.63 and every border clears 3 to 1.</p>
    <div class="sb-stack" style="display:grid;gap:24px;max-width:640px">
      <div class="sdc-form-summary" role="alert" tabindex="-1">
        <strong>That did not send yet.</strong>
        <ul>
          <li><a href="#0">Add your name.</a></li>
          <li><a href="#0">That email address is missing something.</a></li>
        </ul>
      </div>
      <div class="sdc-form-summary sdc-form-summary--warning" role="alert" tabindex="-1">
        <strong>Saved, with one thing to check.</strong>
        <ul><li><a href="#0">No phone number, so I can only reply by email.</a></li></ul>
      </div>
      <div class="sdc-form-summary sdc-form-summary--success" role="alert" tabindex="-1">
        <strong>Sent. I will reply within a day.</strong>
      </div>
      <p class="sdc-form-status sdc-form-status--ok" role="status" aria-live="polite">Sent. I will reply within a day.</p>
      <p class="sdc-form-status sdc-form-status--warn" role="status" aria-live="polite">Saved as a draft. Nothing has been sent yet.</p>
      <p class="sdc-form-status sdc-form-status--err" role="status" aria-live="polite">That did not send. Email me directly instead.</p>
    </div>\`
}`,...(me=(be=u.parameters)==null?void 0:be.docs)==null?void 0:me.source}}};const xe=["Buttons","Pager","PagerPair","CaseCard","Recommendation","MetaRow","RowList","CaseBlock","SkipLink","Field","Slider","FieldStates","Choice","SelectControl","FormMessages"];export{b as Buttons,l as CaseBlock,o as CaseCard,f as Choice,y as Field,c as FieldStates,u as FormMessages,i as MetaRow,m as Pager,n as PagerPair,g as Recommendation,r as RowList,p as SelectControl,d as SkipLink,v as Slider,xe as __namedExportsOrder,fe as default};
