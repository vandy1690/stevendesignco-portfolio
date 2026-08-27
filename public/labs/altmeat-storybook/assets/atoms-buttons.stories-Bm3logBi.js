import{t as e}from"./rolldown-runtime-Dh6celcD.js";var t,n,r,i,a,o;function s(){return(s=e((()=>{t={title:`Atoms/Buttons`,argTypes:{label:{control:`text`,description:`Button text`},variant:{control:`select`,options:[`default`,`alt`,`text`],description:`default renders .btn, alt renders .btn.alt, text renders .text-btn`},disabled:{control:`boolean`,description:`Adds the .disabled class`}},render:({label:e,variant:t,disabled:n})=>{let r=document.createElement(`a`);r.href=`#`;let i=t===`text`?[`text-btn`]:[`btn`];return t===`alt`&&i.push(`alt`),n&&i.push(`disabled`),r.className=i.join(` `),r.textContent=e,r}},n={args:{label:`Button`,variant:`default`,disabled:!1}},r={args:{label:`Alternate Button`,variant:`alt`,disabled:!1}},i={args:{label:`Disabled Button`,variant:`default`,disabled:!0}},a={args:{label:`Text Button`,variant:`text`,disabled:!1}},n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Button',
    variant: 'default',
    disabled: false
  }
}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Alternate Button',
    variant: 'alt',
    disabled: false
  }
}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Button',
    variant: 'default',
    disabled: true
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Text Button',
    variant: 'text',
    disabled: false
  }
}`,...a.parameters?.docs?.source}}},o=[`Button`,`AlternateButton`,`DisabledButton`,`TextButton`]})))()}s();export{r as AlternateButton,n as Button,i as DisabledButton,a as TextButton,o as __namedExportsOrder,t as default};