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
</form>`})))()}var s;function c(){return(c=e((()=>{s=`<fieldset>
    <div class="field-container"><label for="ic">Color input</label> <input type="color" id="ic" value="#000000"></div>
    <div class="field-container"><label for="in">Number input</label> <input type="number" id="in" min="0" max="10" value="5"></div>
    <div class="field-container"><label for="ir">Range input</label> <input type="range" id="ir" value="10"></div>
    <div class="field-container"><label for="idd">Date input</label> <input type="date" id="idd" value="1970-01-01"></div>
    <div class="field-container"><label for="idm">Month input</label> <input type="month" id="idm" value="1970-01"></div>
    <div class="field-container"><label for="idw">Week input</label> <input type="week" id="idw" value="1970-W01"></div>
    <div class="field-container"><label for="idt">Datetime input</label> <input type="datetime" id="idt" value="1970-01-01T00:00:00Z"></div>
    <div class="field-container"><label for="idtl">Datetime-local input</label> <input type="datetime-local" id="idtl" value="1970-01-01T00:00"></div>
</fieldset>`})))()}var l,u,d,f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{n(),i(),o(),c(),l={argTypes:{label:{control:`text`},placeholder:{control:`text`},type:{control:`select`,options:[`text`,`password`,`url`,`email`,`search`,`number`]},state:{control:`select`,options:[`default`,`error`,`valid`],description:`Validation state class on the label`},multiline:{control:`boolean`,description:`Render a textarea instead of an input`}},render:({label:e,placeholder:t,type:n,state:r,multiline:i})=>{let a=document.createElement(`div`);a.className=`field-container`;let o=document.createElement(`label`);if(o.className=r==="default"?``:r,o.append(e+` `),i){let e=document.createElement(`textarea`);e.placeholder=t,e.rows=8,o.appendChild(e)}else{let e=document.createElement(`input`);e.type=n,e.placeholder=t,e.size=20,o.appendChild(e)}a.appendChild(o);let s=document.createElement(`fieldset`);return s.appendChild(a),s}},u={title:`Atoms/Forms`},d={...l,args:{label:`Text Input`,placeholder:`Text Input`,type:`text`,state:`default`,multiline:!1}},f={...l,args:{label:`Error Input`,placeholder:`Error Input`,type:`text`,state:`error`,multiline:!1}},p={...l,args:{label:`Valid Input`,placeholder:`Valid Input`,type:`text`,state:`valid`,multiline:!1}},m={...l,args:{label:`Textarea`,placeholder:`Enter your message here`,type:`text`,state:`default`,multiline:!0}},h=()=>t,g=()=>r,_=()=>a,v=()=>s,v.storyName=`HTML5 Inputs`,d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...textFieldMeta,
  args: {
    label: 'Text Input',
    placeholder: 'Text Input',
    type: 'text',
    state: 'default',
    multiline: false
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  ...textFieldMeta,
  args: {
    label: 'Error Input',
    placeholder: 'Error Input',
    type: 'text',
    state: 'error',
    multiline: false
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  ...textFieldMeta,
  args: {
    label: 'Valid Input',
    placeholder: 'Valid Input',
    type: 'text',
    state: 'valid',
    multiline: false
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...textFieldMeta,
  args: {
    label: 'Textarea',
    placeholder: 'Enter your message here',
    type: 'text',
    state: 'default',
    multiline: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => selectMenu`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => checkbox`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`() => radioButtons`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => html5Inputs`,...v.parameters?.docs?.source}}},y=[`TextField`,`ErrorField`,`ValidField`,`Textarea`,`SelectMenu`,`Checkbox`,`RadioButtons`,`Html5Inputs`]})))()}b();export{g as Checkbox,f as ErrorField,v as Html5Inputs,_ as RadioButtons,h as SelectMenu,d as TextField,m as Textarea,p as ValidField,y as __namedExportsOrder,u as default};