import{r as I,j as y,G as Gt,c as Xe,L as Pe,H as er}from"./app-B_8zf3Wf.js";import{c as Ke,B as tr}from"./button-C-OWhaWV.js";import{G as ar}from"./tooltip-mAVKZxYk.js";import{M as rr,a as ft,u as Bt,P as nr,b as ir,c as or,L as sr,m as lr}from"./proxy-BElYfJsI.js";const fr=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],ur=Ke("House",fr);const cr=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],dr=Ke("Send",cr);const mr=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],hr=Ke("ShoppingCart",mr);function ut(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function pr(...e){return t=>{let a=!1;const r=e.map(n=>{const i=ut(n,t);return!a&&typeof i=="function"&&(a=!0),i});if(a)return()=>{for(let n=0;n<r.length;n++){const i=r[n];typeof i=="function"?i():ut(e[n],null)}}}}function vr(...e){return I.useCallback(pr(...e),e)}class gr extends I.Component{getSnapshotBeforeUpdate(t){const a=this.props.childRef.current;if(a&&t.isPresent&&!this.props.isPresent){const r=a.offsetParent,n=ft(r)&&r.offsetWidth||0,i=ft(r)&&r.offsetHeight||0,o=this.props.sizeRef.current;o.height=a.offsetHeight||0,o.width=a.offsetWidth||0,o.top=a.offsetTop,o.left=a.offsetLeft,o.right=n-o.width-o.left,o.bottom=i-o.height-o.top}return null}componentDidUpdate(){}render(){return this.props.children}}function br({children:e,isPresent:t,anchorX:a,anchorY:r,root:n}){const i=I.useId(),o=I.useRef(null),s=I.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:l}=I.useContext(rr),u=e.props?.ref??e?.ref,c=vr(o,u);return I.useInsertionEffect(()=>{const{width:d,height:h,top:m,left:g,right:v,bottom:x}=s.current;if(t||!o.current||!d||!h)return;const S=a==="left"?`left: ${g}`:`right: ${v}`,P=r==="bottom"?`bottom: ${x}`:`top: ${m}`;o.current.dataset.motionPopId=i;const A=document.createElement("style");l&&(A.nonce=l);const E=n??document.head;return E.appendChild(A),A.sheet&&A.sheet.insertRule(`
          [data-motion-pop-id="${i}"] {
            position: absolute !important;
            width: ${d}px !important;
            height: ${h}px !important;
            ${S}px !important;
            ${P}px !important;
          }
        `),()=>{E.contains(A)&&E.removeChild(A)}},[t]),y.jsx(gr,{isPresent:t,childRef:o,sizeRef:s,children:I.cloneElement(e,{ref:c})})}const yr=({children:e,initial:t,isPresent:a,onExitComplete:r,custom:n,presenceAffectsLayout:i,mode:o,anchorX:s,anchorY:l,root:u})=>{const c=Bt(xr),d=I.useId();let h=!0,m=I.useMemo(()=>(h=!1,{id:d,initial:t,isPresent:a,custom:n,onExitComplete:g=>{c.set(g,!0);for(const v of c.values())if(!v)return;r&&r()},register:g=>(c.set(g,!1),()=>c.delete(g))}),[a,c,r]);return i&&h&&(m={...m}),I.useMemo(()=>{c.forEach((g,v)=>c.set(v,!1))},[a]),I.useEffect(()=>{!a&&!c.size&&r&&r()},[a]),o==="popLayout"&&(e=y.jsx(br,{isPresent:a,anchorX:s,anchorY:l,root:u,children:e})),y.jsx(nr.Provider,{value:m,children:e})};function xr(){return new Map}const fe=e=>e.key||"";function ct(e){const t=[];return I.Children.forEach(e,a=>{I.isValidElement(a)&&t.push(a)}),t}const wr=({children:e,custom:t,initial:a=!0,onExitComplete:r,presenceAffectsLayout:n=!0,mode:i="sync",propagate:o=!1,anchorX:s="left",anchorY:l="top",root:u})=>{const[c,d]=ir(o),h=I.useMemo(()=>ct(e),[e]),m=o&&!c?[]:h.map(fe),g=I.useRef(!0),v=I.useRef(h),x=Bt(()=>new Map),S=I.useRef(new Set),[P,A]=I.useState(h),[E,w]=I.useState(h);or(()=>{g.current=!1,v.current=h;for(let j=0;j<E.length;j++){const C=fe(E[j]);m.includes(C)?(x.delete(C),S.current.delete(C)):x.get(C)!==!0&&x.set(C,!1)}},[E,m.length,m.join("-")]);const z=[];if(h!==P){let j=[...h];for(let C=0;C<E.length;C++){const V=E[C],ke=fe(V);m.includes(ke)||(j.splice(C,0,V),z.push(V))}return i==="wait"&&z.length&&(j=z),w(ct(j)),A(h),null}const{forceRender:Ae}=I.useContext(sr);return y.jsx(y.Fragment,{children:E.map(j=>{const C=fe(j),V=o&&!c?!1:h===E||m.includes(C),ke=()=>{if(S.current.has(C))return;if(S.current.add(C),x.has(C))x.set(C,!0);else return;let lt=!0;x.forEach(Za=>{Za||(lt=!1)}),lt&&(Ae?.(),w(v.current),o&&d?.(),r&&r())};return y.jsx(yr,{isPresent:V,initial:!g.current||a?void 0:!1,custom:t,presenceAffectsLayout:n,mode:i,root:u,onExitComplete:V?void 0:ke,anchorX:s,anchorY:l,children:j},C)})})};function _e(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,r=Array(t);a<t;a++)r[a]=e[a];return r}function Sr(e){if(Array.isArray(e))return e}function Ar(e){if(Array.isArray(e))return _e(e)}function kr(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Pr(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,Vt(r.key),r)}}function Ir(e,t,a){return t&&Pr(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function de(e,t){var a=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=Je(e))||t){a&&(e=a);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(l){throw l},f:n}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i,o=!0,s=!1;return{s:function(){a=a.call(e)},n:function(){var l=a.next();return o=l.done,l},e:function(l){s=!0,i=l},f:function(){try{o||a.return==null||a.return()}finally{if(s)throw i}}}}function b(e,t,a){return(t=Vt(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Er(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Cr(e,t){var a=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(a!=null){var r,n,i,o,s=[],l=!0,u=!1;try{if(i=(a=a.call(e)).next,t===0){if(Object(a)!==a)return;l=!1}else for(;!(l=(r=i.call(a)).done)&&(s.push(r.value),s.length!==t);l=!0);}catch(c){u=!0,n=c}finally{try{if(!l&&a.return!=null&&(o=a.return(),Object(o)!==o))return}finally{if(u)throw n}}return s}}function Fr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function jr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function dt(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),a.push.apply(a,r)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?dt(Object(a),!0).forEach(function(r){b(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):dt(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function be(e,t){return Sr(e)||Cr(e,t)||Je(e,t)||Fr()}function _(e){return Ar(e)||Er(e)||Je(e)||jr()}function Nr(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Vt(e){var t=Nr(e,"string");return typeof t=="symbol"?t:t+""}function pe(e){"@babel/helpers - typeof";return pe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},pe(e)}function Je(e,t){if(e){if(typeof e=="string")return _e(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_e(e,t):void 0}}var mt=function(){},qe={},Xt={},Kt=null,Jt={mark:mt,measure:mt};try{typeof window<"u"&&(qe=window),typeof document<"u"&&(Xt=document),typeof MutationObserver<"u"&&(Kt=MutationObserver),typeof performance<"u"&&(Jt=performance)}catch{}var Or=qe.navigator||{},ht=Or.userAgent,pt=ht===void 0?"":ht,W=qe,k=Xt,vt=Kt,ue=Jt;W.document;var D=!!k.documentElement&&!!k.head&&typeof k.addEventListener=="function"&&typeof k.createElement=="function",qt=~pt.indexOf("MSIE")||~pt.indexOf("Trident/"),Ie,_r=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|jr|jfr|jdr|usb|ufsb|udsb|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Tr=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Utility|Utility Fill|Utility Duo|Slab Press|Slab|Whiteboard)?.*/i,Qt={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"},utility:{"fa-semibold":"semibold",fausb:"semibold"},"utility-duo":{"fa-semibold":"semibold",faudsb:"semibold"},"utility-fill":{"fa-semibold":"semibold",faufsb:"semibold"}},Lr={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},Zt=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],F="classic",oe="duotone",ea="sharp",ta="sharp-duotone",aa="chisel",ra="etch",na="jelly",ia="jelly-duo",oa="jelly-fill",sa="notdog",la="notdog-duo",fa="slab",ua="slab-press",ca="thumbprint",da="utility",ma="utility-duo",ha="utility-fill",pa="whiteboard",Mr="Classic",Rr="Duotone",$r="Sharp",Dr="Sharp Duotone",zr="Chisel",Wr="Etch",Ur="Jelly",Yr="Jelly Duo",Hr="Jelly Fill",Gr="Notdog",Br="Notdog Duo",Vr="Slab",Xr="Slab Press",Kr="Thumbprint",Jr="Utility",qr="Utility Duo",Qr="Utility Fill",Zr="Whiteboard",va=[F,oe,ea,ta,aa,ra,na,ia,oa,sa,la,fa,ua,ca,da,ma,ha,pa];Ie={},b(b(b(b(b(b(b(b(b(b(Ie,F,Mr),oe,Rr),ea,$r),ta,Dr),aa,zr),ra,Wr),na,Ur),ia,Yr),oa,Hr),sa,Gr),b(b(b(b(b(b(b(b(Ie,la,Br),fa,Vr),ua,Xr),ca,Kr),da,Jr),ma,qr),ha,Qr),pa,Zr);var en={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"},utility:{600:"fausb"},"utility-duo":{600:"faudsb"},"utility-fill":{600:"faufsb"}},tn={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"},"Font Awesome 7 Utility":{600:"fausb",normal:"fausb"},"Font Awesome 7 Utility Duo":{600:"faudsb",normal:"faudsb"},"Font Awesome 7 Utility Fill":{600:"faufsb",normal:"faufsb"}},an=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["utility",{defaultShortPrefixId:"fausb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-duo",{defaultShortPrefixId:"faudsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-fill",{defaultShortPrefixId:"faufsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),rn={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},utility:{semibold:"fausb"},"utility-duo":{semibold:"faudsb"},"utility-fill":{semibold:"faufsb"},whiteboard:{semibold:"fawsb"}},ga=["fak","fa-kit","fakd","fa-kit-duotone"],gt={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},nn=["kit"],on="kit",sn="kit-duotone",ln="Kit",fn="Kit Duotone";b(b({},on,ln),sn,fn);var un={kit:{"fa-kit":"fak"}},cn={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},dn={kit:{fak:"fa-kit"}},bt={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},Ee,ce={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},mn=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],hn="classic",pn="duotone",vn="sharp",gn="sharp-duotone",bn="chisel",yn="etch",xn="jelly",wn="jelly-duo",Sn="jelly-fill",An="notdog",kn="notdog-duo",Pn="slab",In="slab-press",En="thumbprint",Cn="utility",Fn="utility-duo",jn="utility-fill",Nn="whiteboard",On="Classic",_n="Duotone",Tn="Sharp",Ln="Sharp Duotone",Mn="Chisel",Rn="Etch",$n="Jelly",Dn="Jelly Duo",zn="Jelly Fill",Wn="Notdog",Un="Notdog Duo",Yn="Slab",Hn="Slab Press",Gn="Thumbprint",Bn="Utility",Vn="Utility Duo",Xn="Utility Fill",Kn="Whiteboard";Ee={},b(b(b(b(b(b(b(b(b(b(Ee,hn,On),pn,_n),vn,Tn),gn,Ln),bn,Mn),yn,Rn),xn,$n),wn,Dn),Sn,zn),An,Wn),b(b(b(b(b(b(b(b(Ee,kn,Un),Pn,Yn),In,Hn),En,Gn),Cn,Bn),Fn,Vn),jn,Xn),Nn,Kn);var Jn="kit",qn="kit-duotone",Qn="Kit",Zn="Kit Duotone";b(b({},Jn,Qn),qn,Zn);var ei={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"},utility:{"fa-semibold":"fausb"},"utility-duo":{"fa-semibold":"faudsb"},"utility-fill":{"fa-semibold":"faufsb"}},ti={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"],utility:["fausb"],"utility-duo":["faudsb"],"utility-fill":["faufsb"]},Te={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"},utility:{fausb:"fa-semibold"},"utility-duo":{faudsb:"fa-semibold"},"utility-fill":{faufsb:"fa-semibold"}},ai=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],ba=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fajr","fajfr","fajdr","facr","fausb","faudsb","faufsb"].concat(mn,ai),ri=["solid","regular","light","thin","duotone","brands","semibold"],ya=[1,2,3,4,5,6,7,8,9,10],ni=ya.concat([11,12,13,14,15,16,17,18,19,20]),ii=["aw","fw","pull-left","pull-right"],oi=[].concat(_(Object.keys(ti)),ri,ii,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",ce.GROUP,ce.SWAP_OPACITY,ce.PRIMARY,ce.SECONDARY]).concat(ya.map(function(e){return"".concat(e,"x")})).concat(ni.map(function(e){return"w-".concat(e)})),si={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},R="___FONT_AWESOME___",Le=16,xa="fa",wa="svg-inline--fa",G="data-fa-i2svg",Me="data-fa-pseudo-element",li="data-fa-pseudo-element-pending",Qe="data-prefix",Ze="data-icon",yt="fontawesome-i2svg",fi="async",ui=["HTML","HEAD","STYLE","SCRIPT"],Sa=["::before","::after",":before",":after"],Aa=(function(){try{return!0}catch{return!1}})();function se(e){return new Proxy(e,{get:function(a,r){return r in a?a[r]:a[F]}})}var ka=f({},Qt);ka[F]=f(f(f(f({},{"fa-duotone":"duotone"}),Qt[F]),gt.kit),gt["kit-duotone"]);var ci=se(ka),Re=f({},rn);Re[F]=f(f(f(f({},{duotone:"fad"}),Re[F]),bt.kit),bt["kit-duotone"]);var xt=se(Re),$e=f({},Te);$e[F]=f(f({},$e[F]),dn.kit);var et=se($e),De=f({},ei);De[F]=f(f({},De[F]),un.kit);se(De);var di=_r,Pa="fa-layers-text",mi=Tr,hi=f({},en);se(hi);var pi=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Ce=Lr,vi=[].concat(_(nn),_(oi)),te=W.FontAwesomeConfig||{};function gi(e){var t=k.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function bi(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(k&&typeof k.querySelector=="function"){var yi=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];yi.forEach(function(e){var t=be(e,2),a=t[0],r=t[1],n=bi(gi(a));n!=null&&(te[r]=n)})}var Ia={styleDefault:"solid",familyDefault:F,cssPrefix:xa,replacementClass:wa,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};te.familyPrefix&&(te.cssPrefix=te.familyPrefix);var Q=f(f({},Ia),te);Q.autoReplaceSvg||(Q.observeMutations=!1);var p={};Object.keys(Ia).forEach(function(e){Object.defineProperty(p,e,{enumerable:!0,set:function(a){Q[e]=a,ae.forEach(function(r){return r(p)})},get:function(){return Q[e]}})});Object.defineProperty(p,"familyPrefix",{enumerable:!0,set:function(t){Q.cssPrefix=t,ae.forEach(function(a){return a(p)})},get:function(){return Q.cssPrefix}});W.FontAwesomeConfig=p;var ae=[];function xi(e){return ae.push(e),function(){ae.splice(ae.indexOf(e),1)}}var X=Le,T={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function wi(e){if(!(!e||!D)){var t=k.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var a=k.head.childNodes,r=null,n=a.length-1;n>-1;n--){var i=a[n],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(r=i)}return k.head.insertBefore(t,r),e}}var Si="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function wt(){for(var e=12,t="";e-- >0;)t+=Si[Math.random()*62|0];return t}function Z(e){for(var t=[],a=(e||[]).length>>>0;a--;)t[a]=e[a];return t}function tt(e){return e.classList?Z(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function Ea(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ai(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,'="').concat(Ea(e[a]),'" ')},"").trim()}function ye(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,": ").concat(e[a].trim(),";")},"")}function at(e){return e.size!==T.size||e.x!==T.x||e.y!==T.y||e.rotate!==T.rotate||e.flipX||e.flipY}function ki(e){var t=e.transform,a=e.containerWidth,r=e.iconWidth,n={transform:"translate(".concat(a/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),o="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),s="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},u={transform:"translate(".concat(r/2*-1," -256)")};return{outer:n,inner:l,path:u}}function Pi(e){var t=e.transform,a=e.width,r=a===void 0?Le:a,n=e.height,i=n===void 0?Le:n,o="";return qt?o+="translate(".concat(t.x/X-r/2,"em, ").concat(t.y/X-i/2,"em) "):o+="translate(calc(-50% + ".concat(t.x/X,"em), calc(-50% + ").concat(t.y/X,"em)) "),o+="scale(".concat(t.size/X*(t.flipX?-1:1),", ").concat(t.size/X*(t.flipY?-1:1),") "),o+="rotate(".concat(t.rotate,"deg) "),o}var Ii=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 7 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 7 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 7 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 7 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 7 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 7 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-slab-regular: normal 400 1em/1 "Font Awesome 7 Slab";
  --fa-font-slab-press-regular: normal 400 1em/1 "Font Awesome 7 Slab Press";
  --fa-font-whiteboard-semibold: normal 600 1em/1 "Font Awesome 7 Whiteboard";
  --fa-font-thumbprint-light: normal 300 1em/1 "Font Awesome 7 Thumbprint";
  --fa-font-notdog-solid: normal 900 1em/1 "Font Awesome 7 Notdog";
  --fa-font-notdog-duo-solid: normal 900 1em/1 "Font Awesome 7 Notdog Duo";
  --fa-font-etch-solid: normal 900 1em/1 "Font Awesome 7 Etch";
  --fa-font-jelly-regular: normal 400 1em/1 "Font Awesome 7 Jelly";
  --fa-font-jelly-fill-regular: normal 400 1em/1 "Font Awesome 7 Jelly Fill";
  --fa-font-jelly-duo-regular: normal 400 1em/1 "Font Awesome 7 Jelly Duo";
  --fa-font-chisel-regular: normal 400 1em/1 "Font Awesome 7 Chisel";
  --fa-font-utility-semibold: normal 600 1em/1 "Font Awesome 7 Utility";
  --fa-font-utility-duo-semibold: normal 600 1em/1 "Font Awesome 7 Utility Duo";
  --fa-font-utility-fill-semibold: normal 600 1em/1 "Font Awesome 7 Utility Fill";
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`;function Ca(){var e=xa,t=wa,a=p.cssPrefix,r=p.replacementClass,n=Ii;if(a!==e||r!==t){var i=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(t),"g");n=n.replace(i,".".concat(a,"-")).replace(o,"--".concat(a,"-")).replace(s,".".concat(r))}return n}var St=!1;function Fe(){p.autoAddCss&&!St&&(wi(Ca()),St=!0)}var Ei={mixout:function(){return{dom:{css:Ca,insertCss:Fe}}},hooks:function(){return{beforeDOMElementCreation:function(){Fe()},beforeI2svg:function(){Fe()}}}},$=W||{};$[R]||($[R]={});$[R].styles||($[R].styles={});$[R].hooks||($[R].hooks={});$[R].shims||($[R].shims=[]);var O=$[R],Fa=[],ja=function(){k.removeEventListener("DOMContentLoaded",ja),ve=1,Fa.map(function(t){return t()})},ve=!1;D&&(ve=(k.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(k.readyState),ve||k.addEventListener("DOMContentLoaded",ja));function Ci(e){D&&(ve?setTimeout(e,0):Fa.push(e))}function le(e){var t=e.tag,a=e.attributes,r=a===void 0?{}:a,n=e.children,i=n===void 0?[]:n;return typeof e=="string"?Ea(e):"<".concat(t," ").concat(Ai(r),">").concat(i.map(le).join(""),"</").concat(t,">")}function At(e,t,a){if(e&&e[t]&&e[t][a])return{prefix:t,iconName:a,icon:e[t][a]}}var je=function(t,a,r,n){var i=Object.keys(t),o=i.length,s=a,l,u,c;for(r===void 0?(l=1,c=t[i[0]]):(l=0,c=r);l<o;l++)u=i[l],c=s(c,t[u],u,t);return c};function Na(e){return _(e).length!==1?null:e.codePointAt(0).toString(16)}function kt(e){return Object.keys(e).reduce(function(t,a){var r=e[a],n=!!r.icon;return n?t[r.iconName]=r.icon:t[a]=r,t},{})}function ze(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=a.skipHooks,n=r===void 0?!1:r,i=kt(t);typeof O.hooks.addPack=="function"&&!n?O.hooks.addPack(e,kt(t)):O.styles[e]=f(f({},O.styles[e]||{}),i),e==="fas"&&ze("fa",t)}var ne=O.styles,Fi=O.shims,Oa=Object.keys(et),ji=Oa.reduce(function(e,t){return e[t]=Object.keys(et[t]),e},{}),rt=null,_a={},Ta={},La={},Ma={},Ra={};function Ni(e){return~vi.indexOf(e)}function Oi(e,t){var a=t.split("-"),r=a[0],n=a.slice(1).join("-");return r===e&&n!==""&&!Ni(n)?n:null}var $a=function(){var t=function(i){return je(ne,function(o,s,l){return o[l]=je(s,i,{}),o},{})};_a=t(function(n,i,o){if(i[3]&&(n[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){n[l.toString(16)]=o})}return n}),Ta=t(function(n,i,o){if(n[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){n[l]=o})}return n}),Ra=t(function(n,i,o){var s=i[2];return n[o]=o,s.forEach(function(l){n[l]=o}),n});var a="far"in ne||p.autoFetchSvg,r=je(Fi,function(n,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!a&&(s="fas"),typeof o=="string"&&(n.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(n.unicodes[o.toString(16)]={prefix:s,iconName:l}),n},{names:{},unicodes:{}});La=r.names,Ma=r.unicodes,rt=xe(p.styleDefault,{family:p.familyDefault})};xi(function(e){rt=xe(e.styleDefault,{family:p.familyDefault})});$a();function nt(e,t){return(_a[e]||{})[t]}function _i(e,t){return(Ta[e]||{})[t]}function H(e,t){return(Ra[e]||{})[t]}function Da(e){return La[e]||{prefix:null,iconName:null}}function Ti(e){var t=Ma[e],a=nt("fas",e);return t||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function U(){return rt}var za=function(){return{prefix:null,iconName:null,rest:[]}};function Li(e){var t=F,a=Oa.reduce(function(r,n){return r[n]="".concat(p.cssPrefix,"-").concat(n),r},{});return va.forEach(function(r){(e.includes(a[r])||e.some(function(n){return ji[r].includes(n)}))&&(t=r)}),t}function xe(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.family,r=a===void 0?F:a,n=ci[r][e];if(r===oe&&!e)return"fad";var i=xt[r][e]||xt[r][n],o=e in O.styles?e:null,s=i||o||null;return s}function Mi(e){var t=[],a=null;return e.forEach(function(r){var n=Oi(p.cssPrefix,r);n?a=n:r&&t.push(r)}),{iconName:a,rest:t}}function Pt(e){return e.sort().filter(function(t,a,r){return r.indexOf(t)===a})}var It=ba.concat(ga);function we(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.skipLookups,r=a===void 0?!1:a,n=null,i=Pt(e.filter(function(m){return It.includes(m)})),o=Pt(e.filter(function(m){return!It.includes(m)})),s=i.filter(function(m){return n=m,!Zt.includes(m)}),l=be(s,1),u=l[0],c=u===void 0?null:u,d=Li(i),h=f(f({},Mi(o)),{},{prefix:xe(c,{family:d})});return f(f(f({},h),zi({values:e,family:d,styles:ne,config:p,canonical:h,givenPrefix:n})),Ri(r,n,h))}function Ri(e,t,a){var r=a.prefix,n=a.iconName;if(e||!r||!n)return{prefix:r,iconName:n};var i=t==="fa"?Da(n):{},o=H(r,n);return n=i.iconName||o||n,r=i.prefix||r,r==="far"&&!ne.far&&ne.fas&&!p.autoFetchSvg&&(r="fas"),{prefix:r,iconName:n}}var $i=va.filter(function(e){return e!==F||e!==oe}),Di=Object.keys(Te).filter(function(e){return e!==F}).map(function(e){return Object.keys(Te[e])}).flat();function zi(e){var t=e.values,a=e.family,r=e.canonical,n=e.givenPrefix,i=n===void 0?"":n,o=e.styles,s=o===void 0?{}:o,l=e.config,u=l===void 0?{}:l,c=a===oe,d=t.includes("fa-duotone")||t.includes("fad"),h=u.familyDefault==="duotone",m=r.prefix==="fad"||r.prefix==="fa-duotone";if(!c&&(d||h||m)&&(r.prefix="fad"),(t.includes("fa-brands")||t.includes("fab"))&&(r.prefix="fab"),!r.prefix&&$i.includes(a)){var g=Object.keys(s).find(function(x){return Di.includes(x)});if(g||u.autoFetchSvg){var v=an.get(a).defaultShortPrefixId;r.prefix=v,r.iconName=H(r.prefix,r.iconName)||r.iconName}}return(r.prefix==="fa"||i==="fa")&&(r.prefix=U()||"fas"),r}var Wi=(function(){function e(){kr(this,e),this.definitions={}}return Ir(e,[{key:"add",value:function(){for(var a=this,r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];var o=n.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){a.definitions[s]=f(f({},a.definitions[s]||{}),o[s]),ze(s,o[s]);var l=et[F][s];l&&ze(l,o[s]),$a()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(a,r){var n=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(n).map(function(i){var o=n[i],s=o.prefix,l=o.iconName,u=o.icon,c=u[2];a[s]||(a[s]={}),c.length>0&&c.forEach(function(d){typeof d=="string"&&(a[s][d]=u)}),a[s][l]=u}),a}}])})(),Et=[],J={},q={},Ui=Object.keys(q);function Yi(e,t){var a=t.mixoutsTo;return Et=e,J={},Object.keys(q).forEach(function(r){Ui.indexOf(r)===-1&&delete q[r]}),Et.forEach(function(r){var n=r.mixout?r.mixout():{};if(Object.keys(n).forEach(function(o){typeof n[o]=="function"&&(a[o]=n[o]),pe(n[o])==="object"&&Object.keys(n[o]).forEach(function(s){a[o]||(a[o]={}),a[o][s]=n[o][s]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(o){J[o]||(J[o]=[]),J[o].push(i[o])})}r.provides&&r.provides(q)}),a}function We(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];var i=J[e]||[];return i.forEach(function(o){t=o.apply(null,[t].concat(r))}),t}function B(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];var n=J[e]||[];n.forEach(function(i){i.apply(null,a)})}function Y(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return q[e]?q[e].apply(null,t):void 0}function Ue(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,a=e.prefix||U();if(t)return t=H(a,t)||t,At(Wa.definitions,a,t)||At(O.styles,a,t)}var Wa=new Wi,Hi=function(){p.autoReplaceSvg=!1,p.observeMutations=!1,B("noAuto")},Gi={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return D?(B("beforeI2svg",t),Y("pseudoElements2svg",t),Y("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot;p.autoReplaceSvg===!1&&(p.autoReplaceSvg=!0),p.observeMutations=!0,Ci(function(){Vi({autoReplaceSvgRoot:a}),B("watch",t)})}},Bi={icon:function(t){if(t===null)return null;if(pe(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:H(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var a=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=xe(t[0]);return{prefix:r,iconName:H(r,a)||a}}if(typeof t=="string"&&(t.indexOf("".concat(p.cssPrefix,"-"))>-1||t.match(di))){var n=we(t.split(" "),{skipLookups:!0});return{prefix:n.prefix||U(),iconName:H(n.prefix,n.iconName)||n.iconName}}if(typeof t=="string"){var i=U();return{prefix:i,iconName:H(i,t)||t}}}},N={noAuto:Hi,config:p,dom:Gi,parse:Bi,library:Wa,findIconDefinition:Ue,toHtml:le},Vi=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot,r=a===void 0?k:a;(Object.keys(O.styles).length>0||p.autoFetchSvg)&&D&&p.autoReplaceSvg&&N.dom.i2svg({node:r})};function Se(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return le(r)})}}),Object.defineProperty(e,"node",{get:function(){if(D){var r=k.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function Xi(e){var t=e.children,a=e.main,r=e.mask,n=e.attributes,i=e.styles,o=e.transform;if(at(o)&&a.found&&!r.found){var s=a.width,l=a.height,u={x:s/l/2,y:.5};n.style=ye(f(f({},i),{},{"transform-origin":"".concat(u.x+o.x/16,"em ").concat(u.y+o.y/16,"em")}))}return[{tag:"svg",attributes:n,children:t}]}function Ki(e){var t=e.prefix,a=e.iconName,r=e.children,n=e.attributes,i=e.symbol,o=i===!0?"".concat(t,"-").concat(p.cssPrefix,"-").concat(a):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:f(f({},n),{},{id:o}),children:r}]}]}function Ji(e){var t=["aria-label","aria-labelledby","title","role"];return t.some(function(a){return a in e})}function it(e){var t=e.icons,a=t.main,r=t.mask,n=e.prefix,i=e.iconName,o=e.transform,s=e.symbol,l=e.maskId,u=e.extra,c=e.watchable,d=c===void 0?!1:c,h=r.found?r:a,m=h.width,g=h.height,v=[p.replacementClass,i?"".concat(p.cssPrefix,"-").concat(i):""].filter(function(w){return u.classes.indexOf(w)===-1}).filter(function(w){return w!==""||!!w}).concat(u.classes).join(" "),x={children:[],attributes:f(f({},u.attributes),{},{"data-prefix":n,"data-icon":i,class:v,role:u.attributes.role||"img",viewBox:"0 0 ".concat(m," ").concat(g)})};!Ji(u.attributes)&&!u.attributes["aria-hidden"]&&(x.attributes["aria-hidden"]="true"),d&&(x.attributes[G]="");var S=f(f({},x),{},{prefix:n,iconName:i,main:a,mask:r,maskId:l,transform:o,symbol:s,styles:f({},u.styles)}),P=r.found&&a.found?Y("generateAbstractMask",S)||{children:[],attributes:{}}:Y("generateAbstractIcon",S)||{children:[],attributes:{}},A=P.children,E=P.attributes;return S.children=A,S.attributes=E,s?Ki(S):Xi(S)}function Ct(e){var t=e.content,a=e.width,r=e.height,n=e.transform,i=e.extra,o=e.watchable,s=o===void 0?!1:o,l=f(f({},i.attributes),{},{class:i.classes.join(" ")});s&&(l[G]="");var u=f({},i.styles);at(n)&&(u.transform=Pi({transform:n,width:a,height:r}),u["-webkit-transform"]=u.transform);var c=ye(u);c.length>0&&(l.style=c);var d=[];return d.push({tag:"span",attributes:l,children:[t]}),d}function qi(e){var t=e.content,a=e.extra,r=f(f({},a.attributes),{},{class:a.classes.join(" ")}),n=ye(a.styles);n.length>0&&(r.style=n);var i=[];return i.push({tag:"span",attributes:r,children:[t]}),i}var Ne=O.styles;function Ye(e){var t=e[0],a=e[1],r=e.slice(4),n=be(r,1),i=n[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(p.cssPrefix,"-").concat(Ce.GROUP)},children:[{tag:"path",attributes:{class:"".concat(p.cssPrefix,"-").concat(Ce.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(p.cssPrefix,"-").concat(Ce.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:t,height:a,icon:o}}var Qi={found:!1,width:512,height:512};function Zi(e,t){!Aa&&!p.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function He(e,t){var a=t;return t==="fa"&&p.styleDefault!==null&&(t=U()),new Promise(function(r,n){if(a==="fa"){var i=Da(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&Ne[t]&&Ne[t][e]){var o=Ne[t][e];return r(Ye(o))}Zi(e,t),r(f(f({},Qi),{},{icon:p.showMissingIcons&&e?Y("missingIconAbstract")||{}:{}}))})}var Ft=function(){},Ge=p.measurePerformance&&ue&&ue.mark&&ue.measure?ue:{mark:Ft,measure:Ft},ee='FA "7.1.0"',eo=function(t){return Ge.mark("".concat(ee," ").concat(t," begins")),function(){return Ua(t)}},Ua=function(t){Ge.mark("".concat(ee," ").concat(t," ends")),Ge.measure("".concat(ee," ").concat(t),"".concat(ee," ").concat(t," begins"),"".concat(ee," ").concat(t," ends"))},ot={begin:eo,end:Ua},me=function(){};function jt(e){var t=e.getAttribute?e.getAttribute(G):null;return typeof t=="string"}function to(e){var t=e.getAttribute?e.getAttribute(Qe):null,a=e.getAttribute?e.getAttribute(Ze):null;return t&&a}function ao(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(p.replacementClass)}function ro(){if(p.autoReplaceSvg===!0)return he.replace;var e=he[p.autoReplaceSvg];return e||he.replace}function no(e){return k.createElementNS("http://www.w3.org/2000/svg",e)}function io(e){return k.createElement(e)}function Ya(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.ceFn,r=a===void 0?e.tag==="svg"?no:io:a;if(typeof e=="string")return k.createTextNode(e);var n=r(e.tag);Object.keys(e.attributes||[]).forEach(function(o){n.setAttribute(o,e.attributes[o])});var i=e.children||[];return i.forEach(function(o){n.appendChild(Ya(o,{ceFn:r}))}),n}function oo(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var he={replace:function(t){var a=t[0];if(a.parentNode)if(t[1].forEach(function(n){a.parentNode.insertBefore(Ya(n),a)}),a.getAttribute(G)===null&&p.keepOriginalSource){var r=k.createComment(oo(a));a.parentNode.replaceChild(r,a)}else a.remove()},nest:function(t){var a=t[0],r=t[1];if(~tt(a).indexOf(p.replacementClass))return he.replace(t);var n=new RegExp("".concat(p.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(s,l){return l===p.replacementClass||l.match(n)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",i.toNode.join(" "))}var o=r.map(function(s){return le(s)}).join(`
`);a.setAttribute(G,""),a.innerHTML=o}};function Nt(e){e()}function Ha(e,t){var a=typeof t=="function"?t:me;if(e.length===0)a();else{var r=Nt;p.mutateApproach===fi&&(r=W.requestAnimationFrame||Nt),r(function(){var n=ro(),i=ot.begin("mutate");e.map(n),i(),a()})}}var st=!1;function Ga(){st=!0}function Be(){st=!1}var ge=null;function Ot(e){if(vt&&p.observeMutations){var t=e.treeCallback,a=t===void 0?me:t,r=e.nodeCallback,n=r===void 0?me:r,i=e.pseudoElementsCallback,o=i===void 0?me:i,s=e.observeMutationsRoot,l=s===void 0?k:s;ge=new vt(function(u){if(!st){var c=U();Z(u).forEach(function(d){if(d.type==="childList"&&d.addedNodes.length>0&&!jt(d.addedNodes[0])&&(p.searchPseudoElements&&o(d.target),a(d.target)),d.type==="attributes"&&d.target.parentNode&&p.searchPseudoElements&&o([d.target],!0),d.type==="attributes"&&jt(d.target)&&~pi.indexOf(d.attributeName))if(d.attributeName==="class"&&to(d.target)){var h=we(tt(d.target)),m=h.prefix,g=h.iconName;d.target.setAttribute(Qe,m||c),g&&d.target.setAttribute(Ze,g)}else ao(d.target)&&n(d.target)})}}),D&&ge.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function so(){ge&&ge.disconnect()}function lo(e){var t=e.getAttribute("style"),a=[];return t&&(a=t.split(";").reduce(function(r,n){var i=n.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(r[o]=s.join(":").trim()),r},{})),a}function fo(e){var t=e.getAttribute("data-prefix"),a=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",n=we(tt(e));return n.prefix||(n.prefix=U()),t&&a&&(n.prefix=t,n.iconName=a),n.iconName&&n.prefix||(n.prefix&&r.length>0&&(n.iconName=_i(n.prefix,e.innerText)||nt(n.prefix,Na(e.innerText))),!n.iconName&&p.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(n.iconName=e.firstChild.data)),n}function uo(e){var t=Z(e.attributes).reduce(function(a,r){return a.name!=="class"&&a.name!=="style"&&(a[r.name]=r.value),a},{});return t}function co(){return{iconName:null,prefix:null,transform:T,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function _t(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=fo(e),r=a.iconName,n=a.prefix,i=a.rest,o=uo(e),s=We("parseNodeAttributes",{},e),l=t.styleParser?lo(e):[];return f({iconName:r,prefix:n,transform:T,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var mo=O.styles;function Ba(e){var t=p.autoReplaceSvg==="nest"?_t(e,{styleParser:!1}):_t(e);return~t.extra.classes.indexOf(Pa)?Y("generateLayersText",e,t):Y("generateSvgReplacementMutation",e,t)}function ho(){return[].concat(_(ga),_(ba))}function Tt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!D)return Promise.resolve();var a=k.documentElement.classList,r=function(d){return a.add("".concat(yt,"-").concat(d))},n=function(d){return a.remove("".concat(yt,"-").concat(d))},i=p.autoFetchSvg?ho():Zt.concat(Object.keys(mo));i.includes("fa")||i.push("fa");var o=[".".concat(Pa,":not([").concat(G,"])")].concat(i.map(function(c){return".".concat(c,":not([").concat(G,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=Z(e.querySelectorAll(o))}catch{}if(s.length>0)r("pending"),n("complete");else return Promise.resolve();var l=ot.begin("onTree"),u=s.reduce(function(c,d){try{var h=Ba(d);h&&c.push(h)}catch(m){Aa||m.name==="MissingIcon"&&console.error(m)}return c},[]);return new Promise(function(c,d){Promise.all(u).then(function(h){Ha(h,function(){r("active"),r("complete"),n("pending"),typeof t=="function"&&t(),l(),c()})}).catch(function(h){l(),d(h)})})}function po(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Ba(e).then(function(a){a&&Ha([a],t)})}function vo(e){return function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:Ue(t||{}),n=a.mask;return n&&(n=(n||{}).icon?n:Ue(n||{})),e(r,f(f({},a),{},{mask:n}))}}var go=function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,n=r===void 0?T:r,i=a.symbol,o=i===void 0?!1:i,s=a.mask,l=s===void 0?null:s,u=a.maskId,c=u===void 0?null:u,d=a.classes,h=d===void 0?[]:d,m=a.attributes,g=m===void 0?{}:m,v=a.styles,x=v===void 0?{}:v;if(t){var S=t.prefix,P=t.iconName,A=t.icon;return Se(f({type:"icon"},t),function(){return B("beforeDOMElementCreation",{iconDefinition:t,params:a}),it({icons:{main:Ye(A),mask:l?Ye(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:S,iconName:P,transform:f(f({},T),n),symbol:o,maskId:c,extra:{attributes:g,styles:x,classes:h}})})}},bo={mixout:function(){return{icon:vo(go)}},hooks:function(){return{mutationObserverCallbacks:function(a){return a.treeCallback=Tt,a.nodeCallback=po,a}}},provides:function(t){t.i2svg=function(a){var r=a.node,n=r===void 0?k:r,i=a.callback,o=i===void 0?function(){}:i;return Tt(n,o)},t.generateSvgReplacementMutation=function(a,r){var n=r.iconName,i=r.prefix,o=r.transform,s=r.symbol,l=r.mask,u=r.maskId,c=r.extra;return new Promise(function(d,h){Promise.all([He(n,i),l.iconName?He(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(m){var g=be(m,2),v=g[0],x=g[1];d([a,it({icons:{main:v,mask:x},prefix:i,iconName:n,transform:o,symbol:s,maskId:u,extra:c,watchable:!0})])}).catch(h)})},t.generateAbstractIcon=function(a){var r=a.children,n=a.attributes,i=a.main,o=a.transform,s=a.styles,l=ye(s);l.length>0&&(n.style=l);var u;return at(o)&&(u=Y("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),r.push(u||i.icon),{children:r,attributes:n}}}},yo={mixout:function(){return{layer:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.classes,i=n===void 0?[]:n;return Se({type:"layer"},function(){B("beforeDOMElementCreation",{assembler:a,params:r});var o=[];return a(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(p.cssPrefix,"-layers")].concat(_(i)).join(" ")},children:o}]})}}}},xo={mixout:function(){return{counter:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};r.title;var n=r.classes,i=n===void 0?[]:n,o=r.attributes,s=o===void 0?{}:o,l=r.styles,u=l===void 0?{}:l;return Se({type:"counter",content:a},function(){return B("beforeDOMElementCreation",{content:a,params:r}),qi({content:a.toString(),extra:{attributes:s,styles:u,classes:["".concat(p.cssPrefix,"-layers-counter")].concat(_(i))}})})}}}},wo={mixout:function(){return{text:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.transform,i=n===void 0?T:n,o=r.classes,s=o===void 0?[]:o,l=r.attributes,u=l===void 0?{}:l,c=r.styles,d=c===void 0?{}:c;return Se({type:"text",content:a},function(){return B("beforeDOMElementCreation",{content:a,params:r}),Ct({content:a,transform:f(f({},T),i),extra:{attributes:u,styles:d,classes:["".concat(p.cssPrefix,"-layers-text")].concat(_(s))}})})}}},provides:function(t){t.generateLayersText=function(a,r){var n=r.transform,i=r.extra,o=null,s=null;if(qt){var l=parseInt(getComputedStyle(a).fontSize,10),u=a.getBoundingClientRect();o=u.width/l,s=u.height/l}return Promise.resolve([a,Ct({content:a.innerHTML,width:o,height:s,transform:n,extra:i,watchable:!0})])}}},Va=new RegExp('"',"ug"),Lt=[1105920,1112319],Mt=f(f(f(f({},{FontAwesome:{normal:"fas",400:"fas"}}),tn),si),cn),Ve=Object.keys(Mt).reduce(function(e,t){return e[t.toLowerCase()]=Mt[t],e},{}),So=Object.keys(Ve).reduce(function(e,t){var a=Ve[t];return e[t]=a[900]||_(Object.entries(a))[0][1],e},{});function Ao(e){var t=e.replace(Va,"");return Na(_(t)[0]||"")}function ko(e){var t=e.getPropertyValue("font-feature-settings").includes("ss01"),a=e.getPropertyValue("content"),r=a.replace(Va,""),n=r.codePointAt(0),i=n>=Lt[0]&&n<=Lt[1],o=r.length===2?r[0]===r[1]:!1;return i||o||t}function Po(e,t){var a=e.replace(/^['"]|['"]$/g,"").toLowerCase(),r=parseInt(t),n=isNaN(r)?"normal":r;return(Ve[a]||{})[n]||So[a]}function Rt(e,t){var a="".concat(li).concat(t.replace(":","-"));return new Promise(function(r,n){if(e.getAttribute(a)!==null)return r();var i=Z(e.children),o=i.filter(function(z){return z.getAttribute(Me)===t})[0],s=W.getComputedStyle(e,t),l=s.getPropertyValue("font-family"),u=l.match(mi),c=s.getPropertyValue("font-weight"),d=s.getPropertyValue("content");if(o&&!u)return e.removeChild(o),r();if(u&&d!=="none"&&d!==""){var h=s.getPropertyValue("content"),m=Po(l,c),g=Ao(h),v=u[0].startsWith("FontAwesome"),x=ko(s),S=nt(m,g),P=S;if(v){var A=Ti(g);A.iconName&&A.prefix&&(S=A.iconName,m=A.prefix)}if(S&&!x&&(!o||o.getAttribute(Qe)!==m||o.getAttribute(Ze)!==P)){e.setAttribute(a,P),o&&e.removeChild(o);var E=co(),w=E.extra;w.attributes[Me]=t,He(S,m).then(function(z){var Ae=it(f(f({},E),{},{icons:{main:z,mask:za()},prefix:m,iconName:P,extra:w,watchable:!0})),j=k.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(j,e.firstChild):e.appendChild(j),j.outerHTML=Ae.map(function(C){return le(C)}).join(`
`),e.removeAttribute(a),r()}).catch(n)}else r()}else r()})}function Io(e){return Promise.all([Rt(e,"::before"),Rt(e,"::after")])}function Eo(e){return e.parentNode!==document.head&&!~ui.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Me)&&(!e.parentNode||e.parentNode.tagName!=="svg")}var Co=function(t){return!!t&&Sa.some(function(a){return t.includes(a)})},Fo=function(t){if(!t)return[];var a=new Set,r=t.split(/,(?![^()]*\))/).map(function(l){return l.trim()});r=r.flatMap(function(l){return l.includes("(")?l:l.split(",").map(function(u){return u.trim()})});var n=de(r),i;try{for(n.s();!(i=n.n()).done;){var o=i.value;if(Co(o)){var s=Sa.reduce(function(l,u){return l.replace(u,"")},o);s!==""&&s!=="*"&&a.add(s)}}}catch(l){n.e(l)}finally{n.f()}return a};function $t(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(D){var a;if(t)a=e;else if(p.searchPseudoElementsFullScan)a=e.querySelectorAll("*");else{var r=new Set,n=de(document.styleSheets),i;try{for(n.s();!(i=n.n()).done;){var o=i.value;try{var s=de(o.cssRules),l;try{for(s.s();!(l=s.n()).done;){var u=l.value,c=Fo(u.selectorText),d=de(c),h;try{for(d.s();!(h=d.n()).done;){var m=h.value;r.add(m)}}catch(v){d.e(v)}finally{d.f()}}}catch(v){s.e(v)}finally{s.f()}}catch(v){p.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(o.href," (").concat(v.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(v){n.e(v)}finally{n.f()}if(!r.size)return;var g=Array.from(r).join(", ");try{a=e.querySelectorAll(g)}catch{}}return new Promise(function(v,x){var S=Z(a).filter(Eo).map(Io),P=ot.begin("searchPseudoElements");Ga(),Promise.all(S).then(function(){P(),Be(),v()}).catch(function(){P(),Be(),x()})})}}var jo={hooks:function(){return{mutationObserverCallbacks:function(a){return a.pseudoElementsCallback=$t,a}}},provides:function(t){t.pseudoElements2svg=function(a){var r=a.node,n=r===void 0?k:r;p.searchPseudoElements&&$t(n)}}},Dt=!1,No={mixout:function(){return{dom:{unwatch:function(){Ga(),Dt=!0}}}},hooks:function(){return{bootstrap:function(){Ot(We("mutationObserverCallbacks",{}))},noAuto:function(){so()},watch:function(a){var r=a.observeMutationsRoot;Dt?Be():Ot(We("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},zt=function(t){var a={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,n){var i=n.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return r.flipX=!0,r;if(o&&s==="v")return r.flipY=!0,r;if(s=parseFloat(s),isNaN(s))return r;switch(o){case"grow":r.size=r.size+s;break;case"shrink":r.size=r.size-s;break;case"left":r.x=r.x-s;break;case"right":r.x=r.x+s;break;case"up":r.y=r.y-s;break;case"down":r.y=r.y+s;break;case"rotate":r.rotate=r.rotate+s;break}return r},a)},Oo={mixout:function(){return{parse:{transform:function(a){return zt(a)}}}},hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-transform");return n&&(a.transform=zt(n)),a}}},provides:function(t){t.generateAbstractTransformGrouping=function(a){var r=a.main,n=a.transform,i=a.containerWidth,o=a.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(n.x*32,", ").concat(n.y*32,") "),u="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),c="rotate(".concat(n.rotate," 0 0)"),d={transform:"".concat(l," ").concat(u," ").concat(c)},h={transform:"translate(".concat(o/2*-1," -256)")},m={outer:s,inner:d,path:h};return{tag:"g",attributes:f({},m.outer),children:[{tag:"g",attributes:f({},m.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:f(f({},r.icon.attributes),m.path)}]}]}}}},Oe={x:0,y:0,width:"100%",height:"100%"};function Wt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function _o(e){return e.tag==="g"?e.children:[e]}var To={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-mask"),i=n?we(n.split(" ").map(function(o){return o.trim()})):za();return i.prefix||(i.prefix=U()),a.mask=i,a.maskId=r.getAttribute("data-fa-mask-id"),a}}},provides:function(t){t.generateAbstractMask=function(a){var r=a.children,n=a.attributes,i=a.main,o=a.mask,s=a.maskId,l=a.transform,u=i.width,c=i.icon,d=o.width,h=o.icon,m=ki({transform:l,containerWidth:d,iconWidth:u}),g={tag:"rect",attributes:f(f({},Oe),{},{fill:"white"})},v=c.children?{children:c.children.map(Wt)}:{},x={tag:"g",attributes:f({},m.inner),children:[Wt(f({tag:c.tag,attributes:f(f({},c.attributes),m.path)},v))]},S={tag:"g",attributes:f({},m.outer),children:[x]},P="mask-".concat(s||wt()),A="clip-".concat(s||wt()),E={tag:"mask",attributes:f(f({},Oe),{},{id:P,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[g,S]},w={tag:"defs",children:[{tag:"clipPath",attributes:{id:A},children:_o(h)},E]};return r.push(w,{tag:"rect",attributes:f({fill:"currentColor","clip-path":"url(#".concat(A,")"),mask:"url(#".concat(P,")")},Oe)}),{children:r,attributes:n}}}},Lo={provides:function(t){var a=!1;W.matchMedia&&(a=W.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],n={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:f(f({},n),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=f(f({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:f(f({},n),{},{cx:"256",cy:"364",r:"28"}),children:[]};return a||s.children.push({tag:"animate",attributes:f(f({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:f(f({},o),{},{values:"1;0;1;1;0;1;"})}),r.push(s),r.push({tag:"path",attributes:f(f({},n),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:a?[]:[{tag:"animate",attributes:f(f({},o),{},{values:"1;0;0;0;0;1;"})}]}),a||r.push({tag:"path",attributes:f(f({},n),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:f(f({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},Mo={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-symbol"),i=n===null?!1:n===""?!0:n;return a.symbol=i,a}}}},Ro=[Ei,bo,yo,xo,wo,jo,No,Oo,To,Lo,Mo];Yi(Ro,{mixoutsTo:N});N.noAuto;var ie=N.config;N.library;N.dom;var Xa=N.parse;N.findIconDefinition;N.toHtml;var $o=N.icon;N.layer;N.text;N.counter;function Do(e){return e=e-0,e===e}function Ka(e){return Do(e)?e:(e=e.replace(/[_-]+(.)?/g,(t,a)=>a?a.toUpperCase():""),e.charAt(0).toLowerCase()+e.slice(1))}function zo(e){return e.charAt(0).toUpperCase()+e.slice(1)}var K=new Map,Wo=1e3;function Uo(e){if(K.has(e))return K.get(e);const t={};let a=0;const r=e.length;for(;a<r;){const n=e.indexOf(";",a),i=n===-1?r:n,o=e.slice(a,i).trim();if(o){const s=o.indexOf(":");if(s>0){const l=o.slice(0,s).trim(),u=o.slice(s+1).trim();if(l&&u){const c=Ka(l);t[c.startsWith("webkit")?zo(c):c]=u}}}a=i+1}if(K.size===Wo){const n=K.keys().next().value;n&&K.delete(n)}return K.set(e,t),t}function Ja(e,t,a={}){if(typeof t=="string")return t;const r=(t.children||[]).map(c=>Ja(e,c)),n=t.attributes||{},i={};for(const[c,d]of Object.entries(n))switch(!0){case c==="class":{i.className=d;break}case c==="style":{i.style=Uo(String(d));break}case c.startsWith("aria-"):case c.startsWith("data-"):{i[c.toLowerCase()]=d;break}default:i[Ka(c)]=d}const{style:o,role:s,"aria-label":l,...u}=a;return o&&(i.style=i.style?{...i.style,...o}:o),s&&(i.role=s),l&&(i["aria-label"]=l,i["aria-hidden"]="false"),e(t.tag,{...u,...i},...r)}var Yo=Ja.bind(null,Gt.createElement),Ut=(e,t)=>{const a=I.useId();return e||(t?a:void 0)},Ho=class{constructor(e="react-fontawesome"){this.enabled=!1;let t=!1;try{t=typeof process<"u"&&!1}catch{}this.scope=e,this.enabled=t}log(...e){this.enabled&&console.log(`[${this.scope}]`,...e)}warn(...e){this.enabled&&console.warn(`[${this.scope}]`,...e)}error(...e){this.enabled&&console.error(`[${this.scope}]`,...e)}},Go="searchPseudoElementsFullScan"in ie?"7.0.0":"6.0.0",Bo=Number.parseInt(Go)>=7,re="fa",L={beat:"fa-beat",fade:"fa-fade",beatFade:"fa-beat-fade",bounce:"fa-bounce",shake:"fa-shake",spin:"fa-spin",spinPulse:"fa-spin-pulse",spinReverse:"fa-spin-reverse",pulse:"fa-pulse"},Vo={left:"fa-pull-left",right:"fa-pull-right"},Xo={90:"fa-rotate-90",180:"fa-rotate-180",270:"fa-rotate-270"},Ko={"2xs":"fa-2xs",xs:"fa-xs",sm:"fa-sm",lg:"fa-lg",xl:"fa-xl","2xl":"fa-2xl","1x":"fa-1x","2x":"fa-2x","3x":"fa-3x","4x":"fa-4x","5x":"fa-5x","6x":"fa-6x","7x":"fa-7x","8x":"fa-8x","9x":"fa-9x","10x":"fa-10x"},M={border:"fa-border",fixedWidth:"fa-fw",flip:"fa-flip",flipHorizontal:"fa-flip-horizontal",flipVertical:"fa-flip-vertical",inverse:"fa-inverse",rotateBy:"fa-rotate-by",swapOpacity:"fa-swap-opacity",widthAuto:"fa-width-auto"};function Jo(e){const t=ie.cssPrefix||ie.familyPrefix||re;return t===re?e:e.replace(new RegExp(String.raw`(?<=^|\s)${re}-`,"g"),`${t}-`)}function qo(e){const{beat:t,fade:a,beatFade:r,bounce:n,shake:i,spin:o,spinPulse:s,spinReverse:l,pulse:u,fixedWidth:c,inverse:d,border:h,flip:m,size:g,rotation:v,pull:x,swapOpacity:S,rotateBy:P,widthAuto:A,className:E}=e,w=[];return E&&w.push(...E.split(" ")),t&&w.push(L.beat),a&&w.push(L.fade),r&&w.push(L.beatFade),n&&w.push(L.bounce),i&&w.push(L.shake),o&&w.push(L.spin),l&&w.push(L.spinReverse),s&&w.push(L.spinPulse),u&&w.push(L.pulse),c&&w.push(M.fixedWidth),d&&w.push(M.inverse),h&&w.push(M.border),m===!0&&w.push(M.flip),(m==="horizontal"||m==="both")&&w.push(M.flipHorizontal),(m==="vertical"||m==="both")&&w.push(M.flipVertical),g!=null&&w.push(Ko[g]),v!=null&&v!==0&&w.push(Xo[v]),x!=null&&w.push(Vo[x]),S&&w.push(M.swapOpacity),Bo?(P&&w.push(M.rotateBy),A&&w.push(M.widthAuto),(ie.cssPrefix||ie.familyPrefix||re)===re?w:w.map(Jo)):w}var Qo=e=>typeof e=="object"&&"icon"in e&&!!e.icon;function Yt(e){if(e)return Qo(e)?e:Xa.icon(e)}function Zo(e){return Object.keys(e)}var Ht=new Ho("FontAwesomeIcon"),qa={border:!1,className:"",mask:void 0,maskId:void 0,fixedWidth:!1,inverse:!1,flip:!1,icon:void 0,listItem:!1,pull:void 0,pulse:!1,rotation:void 0,rotateBy:!1,size:void 0,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:void 0,transform:void 0,swapOpacity:!1,widthAuto:!1},es=new Set(Object.keys(qa)),Qa=Gt.forwardRef((e,t)=>{const a={...qa,...e},{icon:r,mask:n,symbol:i,title:o,titleId:s,maskId:l,transform:u}=a,c=Ut(l,!!n),d=Ut(s,!!o),h=Yt(r);if(!h)return Ht.error("Icon lookup is undefined",r),null;const m=qo(a),g=typeof u=="string"?Xa.transform(u):u,v=Yt(n),x=$o(h,{...m.length>0&&{classes:m},...g&&{transform:g},...v&&{mask:v},symbol:i,title:o,titleId:d,maskId:c});if(!x)return Ht.error("Could not find icon",h),null;const{abstract:S}=x,P={ref:t};for(const A of Zo(a))es.has(A)||(P[A]=a[A]);return Yo(S[0],P)});Qa.displayName="FontAwesomeIcon";var ts={prefix:"fab",iconName:"discord",icon:[576,512,[],"f392","M492.5 69.8c-.2-.3-.4-.6-.8-.7-38.1-17.5-78.4-30-119.7-37.1-.4-.1-.8 0-1.1 .1s-.6 .4-.8 .8c-5.5 9.9-10.5 20.2-14.9 30.6-44.6-6.8-89.9-6.8-134.4 0-4.5-10.5-9.5-20.7-15.1-30.6-.2-.3-.5-.6-.8-.8s-.7-.2-1.1-.2c-41.3 7.1-81.6 19.6-119.7 37.1-.3 .1-.6 .4-.8 .7-76.2 113.8-97.1 224.9-86.9 334.5 0 .3 .1 .5 .2 .8s.3 .4 .5 .6c44.4 32.9 94 58 146.8 74.2 .4 .1 .8 .1 1.1 0s.7-.4 .9-.7c11.3-15.4 21.4-31.8 30-48.8 .1-.2 .2-.5 .2-.8s0-.5-.1-.8-.2-.5-.4-.6-.4-.3-.7-.4c-15.8-6.1-31.2-13.4-45.9-21.9-.3-.2-.5-.4-.7-.6s-.3-.6-.3-.9 0-.6 .2-.9 .3-.5 .6-.7c3.1-2.3 6.2-4.7 9.1-7.1 .3-.2 .6-.4 .9-.4s.7 0 1 .1c96.2 43.9 200.4 43.9 295.5 0 .3-.1 .7-.2 1-.2s.7 .2 .9 .4c2.9 2.4 6 4.9 9.1 7.2 .2 .2 .4 .4 .6 .7s.2 .6 .2 .9-.1 .6-.3 .9-.4 .5-.6 .6c-14.7 8.6-30 15.9-45.9 21.8-.2 .1-.5 .2-.7 .4s-.3 .4-.4 .7-.1 .5-.1 .8 .1 .5 .2 .8c8.8 17 18.8 33.3 30 48.8 .2 .3 .6 .6 .9 .7s.8 .1 1.1 0c52.9-16.2 102.6-41.3 147.1-74.2 .2-.2 .4-.4 .5-.6s.2-.5 .2-.8c12.3-126.8-20.5-236.9-86.9-334.5zm-302 267.7c-29 0-52.8-26.6-52.8-59.2s23.4-59.2 52.8-59.2c29.7 0 53.3 26.8 52.8 59.2 0 32.7-23.4 59.2-52.8 59.2zm195.4 0c-29 0-52.8-26.6-52.8-59.2s23.4-59.2 52.8-59.2c29.7 0 53.3 26.8 52.8 59.2 0 32.7-23.2 59.2-52.8 59.2z"]};function as(){const e=Xe.c(5);let t;e[0]===Symbol.for("react.memo_cache_sentinel")?(t=y.jsxs(Pe,{href:"/",className:"flex items-center gap-2 text-sm font-extrabold tracking-tighter uppercase transition-opacity hover:opacity-80",children:[y.jsx(ar,{className:"text-primary",size:18}),"Nomroti"]}),e[0]=t):t=e[0];let a;e[1]===Symbol.for("react.memo_cache_sentinel")?(a=y.jsxs(Pe,{href:"/",className:"flex items-center gap-1.5 transition-colors hover:text-primary",children:[y.jsx(ur,{size:14})," Home"]}),e[1]=a):a=e[1];let r;e[2]===Symbol.for("react.memo_cache_sentinel")?(r=y.jsxs("div",{className:"hidden gap-6 text-[13px] font-semibold text-muted-foreground md:flex",children:[a,y.jsxs(Pe,{href:"/products",className:"flex items-center gap-1.5 transition-colors hover:text-primary",children:[y.jsx(hr,{size:14})," Store"]})]}),e[2]=r):r=e[2];let n;e[3]===Symbol.for("react.memo_cache_sentinel")?(n=y.jsx("a",{href:"https://dsc.gg/nomrotismp",target:"blank",className:"text-muted-foreground transition-colors hover:text-[#5865F2]","aria-label":"Discord",children:y.jsx(Qa,{icon:ts,size:"1x"})}),e[3]=n):n=e[3];let i;return e[4]===Symbol.for("react.memo_cache_sentinel")?(i=y.jsx("nav",{className:"fixed top-6 z-50 flex w-full justify-center px-4",children:y.jsxs("div",{className:"flex items-center gap-6 rounded-full border border-border bg-card/90 px-5 py-2 shadow-2xl backdrop-blur-md",children:[t,r,y.jsxs("div",{className:"flex items-center gap-4 border-l border-border pl-4",children:[n,y.jsx("a",{href:"https://t.me/nomrotismp",target:"blank",className:"text-muted-foreground transition-colors hover:text-[#0088cc]","aria-label":"Telegram",children:y.jsx(dr,{size:18})})]}),y.jsx(tr,{className:"h-9 rounded-full bg-primary px-6 font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-95",children:"PLAY NOW"})]})}),e[4]=i):i=e[4],i}function rs(){const e=Xe.c(2);let t;e[0]===Symbol.for("react.memo_cache_sentinel")?(t=y.jsxs("div",{className:"mb-6 flex justify-center gap-6 text-muted-foreground",children:[y.jsx("a",{href:"#",className:"text-xs font-bold tracking-widest uppercase transition-colors hover:text-primary",children:"Terms"}),y.jsx("a",{href:"#",className:"text-xs font-bold tracking-widest uppercase transition-colors hover:text-primary",children:"Privacy"}),y.jsx("a",{href:"#",className:"text-xs font-bold tracking-widest uppercase transition-colors hover:text-primary",children:"Rules"})]}),e[0]=t):t=e[0];let a;return e[1]===Symbol.for("react.memo_cache_sentinel")?(a=y.jsx("footer",{className:"border-t border-border bg-card/30 py-12",children:y.jsxs("div",{className:"container mx-auto px-6 text-center",children:[t,y.jsxs("p",{className:"text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase opacity-60",children:["© ",new Date().getFullYear()," NOMROTI Network • Engineered for Performance"]})]})}),e[1]=a):a=e[1],a}function ls(e){const t=Xe.c(19),{children:a,title:r}=e,n=r===void 0?"NOMROTI - Network":r;let i;t[0]!==n?(i=y.jsx("title",{children:n}),t[0]=n,t[1]=i):i=t[1];let o,s;t[2]===Symbol.for("react.memo_cache_sentinel")?(o=y.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),s=y.jsx("meta",{name:"description",content:"The next generation of Minecraft gamemodes."}),t[2]=o,t[3]=s):(o=t[2],s=t[3]);let l;t[4]!==i?(l=y.jsxs(er,{children:[i,o,s]}),t[4]=i,t[5]=l):l=t[5];let u;t[6]===Symbol.for("react.memo_cache_sentinel")?(u=y.jsx(as,{}),t[6]=u):u=t[6];let c,d,h,m;t[7]===Symbol.for("react.memo_cache_sentinel")?(d={opacity:0,y:10},h={opacity:1,y:0},m={opacity:0,y:-10},c={duration:.3,ease:"easeOut"},t[7]=c,t[8]=d,t[9]=h,t[10]=m):(c=t[7],d=t[8],h=t[9],m=t[10]);let g;t[11]!==a?(g=y.jsx(wr,{mode:"wait",children:y.jsx(lr.main,{initial:d,animate:h,exit:m,transition:c,children:a},window.location.pathname)}),t[11]=a,t[12]=g):g=t[12];let v;t[13]===Symbol.for("react.memo_cache_sentinel")?(v=y.jsx(rs,{}),t[13]=v):v=t[13];let x;t[14]!==g?(x=y.jsxs("div",{className:"flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/30",children:[u,g,v]}),t[14]=g,t[15]=x):x=t[15];let S;return t[16]!==x||t[17]!==l?(S=y.jsxs(y.Fragment,{children:[l,x]}),t[16]=x,t[17]=l,t[18]=S):S=t[18],S}export{ls as L,hr as S};
