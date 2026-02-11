import{a as Y}from"./button-BNjhHhXl.js";import{r as l,c as Z,e as K}from"./app-DYZEWR9f.js";const Q=[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]],Re=Y("Gamepad2",Q);let V={data:""},W=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||V},J=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,X=/\/\*[^]*?\*\/|  +/g,F=/\n+/g,x=(e,t)=>{let a="",s="",i="";for(let o in e){let r=e[o];o[0]=="@"?o[1]=="i"?a=o+" "+r+";":s+=o[1]=="f"?x(r,o):o+"{"+x(r,o[1]=="k"?"":t)+"}":typeof r=="object"?s+=x(r,t?t.replace(/([^,])+/g,n=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,n):n?n+" "+c:c)):o):r!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=x.p?x.p(o,r):o+":"+r+";")}return a+(t&&i?t+"{"+i+"}":i)+s},b={},M=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+M(e[a]);return t}return e},ee=(e,t,a,s,i)=>{let o=M(e),r=b[o]||(b[o]=(c=>{let u=0,p=11;for(;u<c.length;)p=101*p+c.charCodeAt(u++)>>>0;return"go"+p})(o));if(!b[r]){let c=o!==e?e:(u=>{let p,d,m=[{}];for(;p=J.exec(u.replace(X,""));)p[4]?m.shift():p[3]?(d=p[3].replace(F," ").trim(),m.unshift(m[0][d]=m[0][d]||{})):m[0][p[1]]=p[2].replace(F," ").trim();return m[0]})(e);b[r]=x(i?{["@keyframes "+r]:c}:c,a?"":"."+r)}let n=a&&b.g?b.g:null;return a&&(b.g=b[r]),((c,u,p,d)=>{d?u.data=u.data.replace(d,c):u.data.indexOf(c)===-1&&(u.data=p?c+u.data:u.data+c)})(b[r],t,s,n),r},te=(e,t,a)=>e.reduce((s,i,o)=>{let r=t[o];if(r&&r.call){let n=r(a),c=n&&n.props&&n.props.className||/^go/.test(n)&&n;r=c?"."+c:n&&typeof n=="object"?n.props?"":x(n,""):n===!1?"":n}return s+i+(r??"")},"");function D(e){let t=this||{},a=e.call?e(t.p):e;return ee(a.unshift?a.raw?te(a,[].slice.call(arguments,1),t.p):a.reduce((s,i)=>Object.assign(s,i&&i.call?i(t.p):i),{}):a,W(t.target),t.g,t.o,t.k)}let R,N,z;D.bind({g:1});let v=D.bind({k:1});function ae(e,t,a,s){x.p=t,R=e,N=a,z=s}function w(e,t){let a=this||{};return function(){let s=arguments;function i(o,r){let n=Object.assign({},o),c=n.className||i.className;a.p=Object.assign({theme:N&&N()},n),a.o=/ *go\d+/.test(c),n.className=D.apply(a,s)+(c?" "+c:"");let u=e;return e[0]&&(u=n.as||e,delete n.as),z&&u[0]&&z(n),R(u,n)}return t?t(i):i}}var re=e=>typeof e=="function",O=(e,t)=>re(e)?e(t):e,se=(()=>{let e=0;return()=>(++e).toString()})(),H=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),oe=20,T="default",S=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:s}=t;return S(e,{type:e.toasts.find(r=>r.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(r=>r.id===i||i===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+o}))}}},C=[],q={toasts:[],pausedAt:void 0,settings:{toastLimit:oe}},h={},G=(e,t=T)=>{h[t]=S(h[t]||q,e),C.forEach(([a,s])=>{a===t&&s(h[t])})},B=e=>Object.keys(h).forEach(t=>G(e,t)),ie=e=>Object.keys(h).find(t=>h[t].toasts.some(a=>a.id===e)),j=(e=T)=>t=>{G(t,e)},ne={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},le=(e={},t=T)=>{let[a,s]=l.useState(h[t]||q),i=l.useRef(h[t]);l.useEffect(()=>(i.current!==h[t]&&s(h[t]),C.push([t,s]),()=>{let r=C.findIndex(([n])=>n===t);r>-1&&C.splice(r,1)}),[t]);let o=a.toasts.map(r=>{var n,c,u;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((n=e[r.type])==null?void 0:n.removeDelay)||e?.removeDelay,duration:r.duration||((c=e[r.type])==null?void 0:c.duration)||e?.duration||ne[r.type],style:{...e.style,...(u=e[r.type])==null?void 0:u.style,...r.style}}});return{...a,toasts:o}},ce=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:a?.id||se()}),k=e=>(t,a)=>{let s=ce(t,e,a);return j(s.toasterId||ie(s.id))({type:2,toast:s}),s.id},f=(e,t)=>k("blank")(e,t);f.error=k("error");f.success=k("success");f.loading=k("loading");f.custom=k("custom");f.dismiss=(e,t)=>{let a={type:3,toastId:e};t?j(t)(a):B(a)};f.dismissAll=e=>f.dismiss(void 0,e);f.remove=(e,t)=>{let a={type:4,toastId:e};t?j(t)(a):B(a)};f.removeAll=e=>f.remove(void 0,e);f.promise=(e,t,a)=>{let s=f.loading(t.loading,{...a,...a?.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let o=t.success?O(t.success,i):void 0;return o?f.success(o,{id:s,...a,...a?.success}):f.dismiss(s),i}).catch(i=>{let o=t.error?O(t.error,i):void 0;o?f.error(o,{id:s,...a,...a?.error}):f.dismiss(s)}),e};var de=1e3,ue=(e,t="default")=>{let{toasts:a,pausedAt:s}=le(e,t),i=l.useRef(new Map).current,o=l.useCallback((d,m=de)=>{if(i.has(d))return;let y=setTimeout(()=>{i.delete(d),r({type:4,toastId:d})},m);i.set(d,y)},[]);l.useEffect(()=>{if(s)return;let d=Date.now(),m=a.map(y=>{if(y.duration===1/0)return;let E=(y.duration||0)+y.pauseDuration-(d-y.createdAt);if(E<0){y.visible&&f.dismiss(y.id);return}return setTimeout(()=>f.dismiss(y.id,t),E)});return()=>{m.forEach(y=>y&&clearTimeout(y))}},[a,s,t]);let r=l.useCallback(j(t),[t]),n=l.useCallback(()=>{r({type:5,time:Date.now()})},[r]),c=l.useCallback((d,m)=>{r({type:1,toast:{id:d,height:m}})},[r]),u=l.useCallback(()=>{s&&r({type:6,time:Date.now()})},[s,r]),p=l.useCallback((d,m)=>{let{reverseOrder:y=!1,gutter:E=8,defaultPosition:P}=m||{},A=a.filter(g=>(g.position||P)===(d.position||P)&&g.height),U=A.findIndex(g=>g.id===d.id),_=A.filter((g,I)=>I<U&&g.visible).length;return A.filter(g=>g.visible).slice(...y?[_+1]:[0,_]).reduce((g,I)=>g+(I.height||0)+E,0)},[a]);return l.useEffect(()=>{a.forEach(d=>{if(d.dismissed)o(d.id,d.removeDelay);else{let m=i.get(d.id);m&&(clearTimeout(m),i.delete(d.id))}})},[a,o]),{toasts:a,handlers:{updateHeight:c,startPause:n,endPause:u,calculateOffset:p}}},pe=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,me=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,fe=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ye=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${pe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${me} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${fe} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ge=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,he=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ge} 1s linear infinite;
`,be=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ve=v`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,xe=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${be} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ve} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,we=w("div")`
  position: absolute;
`,ke=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Ee=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,$e=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ce=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return t!==void 0?typeof t=="string"?l.createElement($e,null,t):t:a==="blank"?null:l.createElement(ke,null,l.createElement(he,{...s}),a!=="loading"&&l.createElement(we,null,a==="error"?l.createElement(ye,{...s}):l.createElement(xe,{...s})))},Oe=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,De=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,je="0%{opacity:0;} 100%{opacity:1;}",Ae="0%{opacity:1;} 100%{opacity:0;}",Ie=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Ne=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ze=(e,t)=>{let a=e.includes("top")?1:-1,[s,i]=H()?[je,Ae]:[Oe(a),De(a)];return{animation:t?`${v(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Te=l.memo(({toast:e,position:t,style:a,children:s})=>{let i=e.height?ze(e.position||t||"top-center",e.visible):{opacity:0},o=l.createElement(Ce,{toast:e}),r=l.createElement(Ne,{...e.ariaProps},O(e.message,e));return l.createElement(Ie,{className:e.className,style:{...i,...a,...e.style}},typeof s=="function"?s({icon:o,message:r}):l.createElement(l.Fragment,null,o,r))});ae(l.createElement);var Pe=({id:e,className:t,style:a,onHeightUpdate:s,children:i})=>{let o=l.useCallback(r=>{if(r){let n=()=>{let c=r.getBoundingClientRect().height;s(e,c)};n(),new MutationObserver(n).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return l.createElement("div",{ref:o,className:t,style:a},i)},_e=(e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:H()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...i}},Fe=D`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$=16,He=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:i,toasterId:o,containerStyle:r,containerClassName:n})=>{let{toasts:c,handlers:u}=ue(a,o);return l.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:$,left:$,right:$,bottom:$,pointerEvents:"none",...r},className:n,onMouseEnter:u.startPause,onMouseLeave:u.endPause},c.map(p=>{let d=p.position||t,m=u.calculateOffset(p,{reverseOrder:e,gutter:s,defaultPosition:t}),y=_e(d,m);return l.createElement(Pe,{id:p.id,key:p.id,onHeightUpdate:u.updateHeight,className:p.visible?Fe:"",style:y},p.type==="custom"?O(p.message,p):i?i(p):l.createElement(Te,{toast:p,position:d}))}))},L=f;function Se(){const e=Z.c(3),{flash:t}=K().props,a=l.useRef(null);let s,i;return e[0]!==t?(s=()=>{const o=t?.success||t?.error||t?.payment||t?.errors;if(!o||a.current===o)return;const r={duration:3e3,position:"top-right",id:o};t.success||t.payment?L.success(o,r):t.error&&L.error(o,r),a.current=o;const n=setTimeout(()=>{a.current=null},3100);return()=>clearTimeout(n)},i=[t],e[0]=t,e[1]=s,e[2]=i):(s=e[1],i=e[2]),l.useEffect(s,i),null}export{He as F,Re as G,Se as a,f as n};
