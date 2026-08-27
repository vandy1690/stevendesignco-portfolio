import{t as e}from"./rolldown-runtime-Dh6celcD.js";var t;function n(){return(n=e((()=>{t=`<fieldset>
    <div class="field-container">
        <label for="select">Select</label>
        <select id="select">
            <optgroup label="Option Group">
                <option>Option One</option>
                <option>Option Two</option>
                <option>Option Three</option>
            </optgroup>
        </select>
    </div>
</fieldset>`})))()}var r;function i(){return(i=e((()=>{r=`<form action="#">
    <fieldset class="options">
        <legend>Checkbox <abbr title="Required">*</abbr></legend>
        <ul>
            <li><label for="checkbox1"><input id="checkbox1" name="checkbox" type="checkbox" checked="checked"> Choice A</label></li>
            <li><label for="checkbox2"><input id="checkbox2" name="checkbox" type="checkbox"> Choice B</label></li>
            <li><label for="checkbox3"><input id="checkbox3" name="checkbox" type="checkbox"> Choice C</label></li>
        </ul>
    </fieldset>
</form>`})))()}var a;function o(){return(o=e((()=>{a=`<form action="#">
    <fieldset class="options">
        <legend>Radio</legend>
        <ul>
            <li><label for="radio1"><input id="radio1" name="radio" type="radio" class="radio" checked="checked"> Option 1</label></li>
            <li><label for="radio2"><input id="radio2" name="radio" type="radio" class="radio"> Option 2</label></li>
            <li><label for="radio3"><input id="radio3" name="radio" type="radio" class="radio"> Option 3</label></li>
        </ul>
    </fieldset>
</form>`})))()}var s,c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{n(),i(),o(),s={argTypes:{placeholder:{control:`text`},type:{control:`select`,options:[`text`,`password`,`url`,`email`,`search`,`number`]},state:{control:`select`,options:[`default`,`error`,`valid`],description:`Validation state class on .field-container`},multiline:{control:`boolean`,description:`Render a textarea instead of an input`}},render:({placeholder:e,type:t,state:n,multiline:r})=>{let i=document.createElement(`div`);if(i.className=n==="default"?`field-container`:`field-container ${n}`,r){let t=document.createElement(`textarea`);t.placeholder=e,t.rows=8,i.appendChild(t)}else{let n=document.createElement(`input`);n.type=t,n.placeholder=e,n.size=20,i.appendChild(n)}let a=document.createElement(`fieldset`);return a.appendChild(i),a}},c={title:`Atoms/Forms`},l={...s,args:{placeholder:`Text Input`,type:`text`,state:`default`,multiline:!1}},u={...s,args:{placeholder:`Error Input`,type:`text`,state:`error`,multiline:!1}},d={...s,args:{placeholder:`Valid Input`,type:`text`,state:`valid`,multiline:!1}},f={...s,args:{placeholder:`Enter your message here`,type:`text`,state:`default`,multiline:!0}},p=()=>t,m=()=>r,h=()=>a,l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...textFieldMeta,
  args: {
    placeholder: 'Text Input',
    type: 'text',
    state: 'default',
    multiline: false
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...textFieldMeta,
  args: {
    placeholder: 'Error Input',
    type: 'text',
    state: 'error',
    multiline: false
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...textFieldMeta,
  args: {
    placeholder: 'Valid Input',
    type: 'text',
    state: 'valid',
    multiline: false
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  ...textFieldMeta,
  args: {
    placeholder: 'Enter your message here',
    type: 'text',
    state: 'default',
    multiline: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => selectMenu`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => checkbox`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => radioButtons`,...h.parameters?.docs?.source}}},g=[`TextField`,`ErrorField`,`ValidField`,`Textarea`,`SelectMenu`,`Checkbox`,`RadioButtons`]})))()}_();export{m as Checkbox,u as ErrorField,h as RadioButtons,p as SelectMenu,l as TextField,f as Textarea,d as ValidField,g as __namedExportsOrder,c as default};