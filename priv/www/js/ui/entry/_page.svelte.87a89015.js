var at=Object.defineProperty;var rt=(l,e,t)=>e in l?at(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var q=(l,e,t)=>(rt(l,typeof e!="symbol"?e+"":e,t),t);import{S as te,i as le,s as se,e as fe,b as D,H as X,h as d,k as v,a as w,l as k,m as T,c as S,n as I,G as p,J as pe,K as he,q as j,r as U,u as Y,L as ct,M as ke,N as ue,O as F,P as ie,Q as ye,R as x,T as et,o as Ie,U as ve,V as tt,W as Q,g as L,v as de,d as H,f as me,X as ut,y as oe,z as ae,A as re,B as ce}from"../chunks/index.9614888c.js";import{w as ft}from"../chunks/index.66e03b77.js";var M=(l=>(l[l.Text=0]="Text",l[l.TextArray=1]="TextArray",l[l.Number=2]="Number",l[l.DateTime=3]="DateTime",l))(M||{});const Z=[Object.freeze({type:M.DateTime,displayName:"Date & Time",logItemKey:"timestamp",getDisplayValue:l=>ht(l.timestamp)}),Object.freeze({type:M.Number,displayName:"Channel",logItemKey:"channel"}),Object.freeze({type:M.Text,displayName:"Connection",logItemKey:"connection"}),Object.freeze({type:M.Text,displayName:"Exchange",logItemKey:"exchange"}),Object.freeze({type:M.Text,displayName:"Node",logItemKey:"node"}),Object.freeze({type:M.Text,displayName:"Payload",logItemKey:"payload"}),Object.freeze({type:M.Text,displayName:"Queue",logItemKey:"queue"}),Object.freeze({type:M.TextArray,displayName:"Routed Queues",logItemKey:"routed_queues"}),Object.freeze({type:M.TextArray,displayName:"Routing Keys",logItemKey:"routing_keys"}),Object.freeze({type:M.Text,displayName:"Type",logItemKey:"type"}),Object.freeze({type:M.Text,displayName:"User",logItemKey:"user"}),Object.freeze({type:M.Text,displayName:"Vhost",logItemKey:"vhost"}),Object.freeze({type:M.Number,displayName:"Delivery Mode",logItemKey:"delivery_mode"})];function ht(l){const e=l.toLocaleDateString(),t=l.toLocaleTimeString();return`${e} ${t}`}const lt="logItemColumnList",ee=ft({isEditMode:!1,columns:[]});let be;class _e{constructor(e){this.columns=e,ee.update(t=>({...t,columns:this.columns}))}toggleColumnVisibility(e){e.isVisible=!e.isVisible;const t=this.columns.some(s=>s.isVisible)?void 0:!1;this.saveColumnsAndUpdateStore(t)}moveColumnLeft(e){this.moveColumn(e,!1)}moveColumnRight(e){this.moveColumn(e,!0)}canMoveColumnLeft(e){const t=this.getVisibleColumns();return e.index>Math.min(...t.map(s=>s.index))}canMoveColumnRight(e){const t=this.getVisibleColumns();return e.index<Math.max(...t.map(s=>s.index))}getVisibleColumns(){return this.columns.filter(e=>e.isVisible)}moveColumn(e,t){if(t&&!this.canMoveColumnRight(e)||!t&&!this.canMoveColumnLeft(e))return;const s=this.getVisibleColumns(),n=e.index,i=t?s.find(o=>o.index>n):s.reverse().find(o=>o.index<n);e.index=i.index,i.index=n,this.columns=st(this.columns),this.saveColumnsAndUpdateStore()}saveColumnsAndUpdateStore(e){this.save(),ee.update(t=>({columns:this.columns,isEditMode:e===void 0?t.isEditMode:e}))}save(){const e=JSON.stringify(this.columns);localStorage.setItem(lt,e)}static get instance(){if(!be){const e=dt();be=new _e(e)}return be}}function dt(){let l;const e=typeof localStorage<"u"?localStorage.getItem(lt):void 0;return e?l=JSON.parse(e):l=Z.map(({displayName:t,logItemKey:s},n)=>({displayName:t,logItemKey:s,isVisible:!0,index:n})),st(l)}function st(l){return l.sort((e,t)=>e.index-t.index)}const{Map:nt}=ct;function Ne(l,e,t){const s=l.slice();return s[8]=e[t],s[10]=t,s}function Ce(l,e,t){const s=l.slice();return s[11]=e[t],s}function Ve(l,e,t){const s=l.slice();return s[11]=e[t],s}function De(l){let e,t,s,n=[],i=new nt,o,a,r=l[1];const f=c=>c[11].index;for(let c=0;c<r.length;c+=1){let _=Ve(l,r,c),h=f(_);i.set(h,n[c]=Se(h,_))}let g=l[0],u=[];for(let c=0;c<g.length;c+=1)u[c]=Ae(Ne(l,g,c));return{c(){e=v("table"),t=v("thead"),s=v("tr");for(let c=0;c<n.length;c+=1)n[c].c();o=w(),a=v("tbody");for(let c=0;c<u.length;c+=1)u[c].c();this.h()},l(c){e=k(c,"TABLE",{class:!0});var _=T(e);t=k(_,"THEAD",{});var h=T(t);s=k(h,"TR",{});var C=T(s);for(let b=0;b<n.length;b+=1)n[b].l(C);C.forEach(d),h.forEach(d),o=S(_),a=k(_,"TBODY",{});var E=T(a);for(let b=0;b<u.length;b+=1)u[b].l(E);E.forEach(d),_.forEach(d),this.h()},h(){I(e,"class","list svelte-1uj74mp")},m(c,_){D(c,e,_),p(e,t),p(t,s);for(let h=0;h<n.length;h+=1)n[h].m(s,null);p(e,o),p(e,a);for(let h=0;h<u.length;h+=1)u[h].m(a,null)},p(c,_){if(_&14&&(r=c[1],n=pe(n,_,f,1,c,r,i,s,ke,Se,null,Ve)),_&19){g=c[0];let h;for(h=0;h<g.length;h+=1){const C=Ne(c,g,h);u[h]?u[h].p(C,_):(u[h]=Ae(C),u[h].c(),u[h].m(a,null))}for(;h<u.length;h+=1)u[h].d(1);u.length=g.length}},d(c){c&&d(e);for(let _=0;_<n.length;_+=1)n[_].d();he(u,c)}}}function we(l){let e,t,s,n,i,o,a,r;function f(){return l[5](l[11])}function g(){return l[6](l[11])}return{c(){e=v("div"),t=v("div"),s=j("←"),n=w(),i=v("div"),o=j("→"),this.h()},l(u){e=k(u,"DIV",{class:!0});var c=T(e);t=k(c,"DIV",{class:!0});var _=T(t);s=U(_,"←"),_.forEach(d),n=S(c),i=k(c,"DIV",{class:!0});var h=T(i);o=U(h,"→"),h.forEach(d),c.forEach(d),this.h()},h(){I(t,"class","move-arrow svelte-1uj74mp"),ue(t,"disabled",!l[3].canMoveColumnLeft(l[11])),I(i,"class","move-arrow svelte-1uj74mp"),ue(i,"disabled",!l[3].canMoveColumnRight(l[11])),I(e,"class","config-container svelte-1uj74mp")},m(u,c){D(u,e,c),p(e,t),p(t,s),p(e,n),p(e,i),p(i,o),a||(r=[F(t,"click",f),F(i,"click",g)],a=!0)},p(u,c){l=u,c&10&&ue(t,"disabled",!l[3].canMoveColumnLeft(l[11])),c&10&&ue(i,"disabled",!l[3].canMoveColumnRight(l[11]))},d(u){u&&d(e),a=!1,ie(r)}}}function Se(l,e){let t,s,n,i=e[11].displayName+"",o,a,r=e[2]&&we(e);return{key:l,first:null,c(){t=v("th"),r&&r.c(),s=w(),n=v("strong"),o=j(i),a=w(),this.h()},l(f){t=k(f,"TH",{class:!0});var g=T(t);r&&r.l(g),s=S(g),n=k(g,"STRONG",{});var u=T(n);o=U(u,i),u.forEach(d),a=S(g),g.forEach(d),this.h()},h(){I(t,"class","c svelte-1uj74mp"),this.first=t},m(f,g){D(f,t,g),r&&r.m(t,null),p(t,s),p(t,n),p(n,o),p(t,a)},p(f,g){e=f,e[2]?r?r.p(e,g):(r=we(e),r.c(),r.m(t,s)):r&&(r.d(1),r=null),g&2&&i!==(i=e[11].displayName+"")&&Y(o,i)},d(f){f&&d(t),r&&r.d()}}}function Me(l,e){let t,s=e[4](e[8],e[11])+"",n;return{key:l,first:null,c(){t=v("td"),n=j(s),this.h()},l(i){t=k(i,"TD",{});var o=T(t);n=U(o,s),o.forEach(d),this.h()},h(){this.first=t},m(i,o){D(i,t,o),p(t,n)},p(i,o){e=i,o&3&&s!==(s=e[4](e[8],e[11])+"")&&Y(n,s)},d(i){i&&d(t)}}}function Ae(l){let e,t=[],s=new nt,n,i=l[1];const o=a=>a[11].index;for(let a=0;a<i.length;a+=1){let r=Ce(l,i,a),f=o(r);s.set(f,t[a]=Me(f,r))}return{c(){e=v("tr");for(let a=0;a<t.length;a+=1)t[a].c();n=w(),this.h()},l(a){e=k(a,"TR",{class:!0});var r=T(e);for(let f=0;f<t.length;f+=1)t[f].l(r);n=S(r),r.forEach(d),this.h()},h(){I(e,"class",l[10]%2===0?"alt2":"alt1")},m(a,r){D(a,e,r);for(let f=0;f<t.length;f+=1)t[f].m(e,null);p(e,n)},p(a,r){r&19&&(i=a[1],t=pe(t,r,o,1,a,i,s,e,ke,Me,n,Ce))},d(a){a&&d(e);for(let r=0;r<t.length;r+=1)t[r].d()}}}function mt(l){let e,t=l[0].length&&De(l);return{c(){t&&t.c(),e=fe()},l(s){t&&t.l(s),e=fe()},m(s,n){t&&t.m(s,n),D(s,e,n)},p(s,[n]){s[0].length?t?t.p(s,n):(t=De(s),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:X,o:X,d(s){t&&t.d(s),s&&d(e)}}}function pt(l,e,t){let{logItems:s=[]}=e;const n=_e.instance,i=new Map(Z.filter(u=>typeof u.getDisplayValue=="function").map(u=>[u.logItemKey,u.getDisplayValue]));let o,a=!1;ee.subscribe(({isEditMode:u})=>{t(1,o=n.getVisibleColumns()),t(2,a=u)});function r(u,c){return i.has(c.logItemKey)?i.get(c.logItemKey)(u):`${u[c.logItemKey]}`}const f=u=>n.moveColumnLeft(u),g=u=>n.moveColumnRight(u);return l.$$set=u=>{"logItems"in u&&t(0,s=u.logItems)},[s,o,a,n,r,f,g]}class _t extends te{constructor(e){super(),le(this,e,pt,mt,se,{logItems:0})}}class Ee{constructor(e){q(this,"channel");q(this,"connection");q(this,"exchange");q(this,"node");q(this,"payload");q(this,"properties");q(this,"queue");q(this,"routed_queues");q(this,"routing_keys");q(this,"timestamp");q(this,"type");q(this,"user");q(this,"vhost");q(this,"delivery_mode");Object.assign(this,e)}static fromJson(e){const t=new Ee(JSON.parse(e));return t.timestamp=new Date(t.timestamp),t.delivery_mode=t.properties.delivery_mode,t.payload=window.atob(t.payload),t}}var K=(l=>(l[l.IsEqual=0]="IsEqual",l[l.IsNotEqual=1]="IsNotEqual",l[l.Includes=2]="Includes",l[l.DoesNotInclude=3]="DoesNotInclude",l[l.StartsWith=4]="StartsWith",l[l.EndsWith=5]="EndsWith",l[l.Greater=6]="Greater",l[l.GreaterOrEqual=7]="GreaterOrEqual",l[l.Less=8]="Less",l[l.LessOrEqual=9]="LessOrEqual",l[l.After=10]="After",l[l.Before=11]="Before",l))(K||{});const Oe=new Map([[0,"is equal"],[1,"is not equal"],[2,"includes"],[3,"doesn't include"],[4,"starts with"],[5,"ends with"],[6,"is greater"],[7,"is greater or equal"],[8,"is less"],[9,"is less or equal"],[10,"is after"],[11,"is before"]]),gt=new Map([[K.IsEqual,(l,e)=>l===e],[K.IsNotEqual,(l,e)=>l!==e],[K.StartsWith,(l,e)=>l==null?void 0:l.startsWith(e)],[K.EndsWith,(l,e)=>l==null?void 0:l.endsWith(e)],[K.Includes,(l,e)=>l==null?void 0:l.includes(e)],[K.DoesNotInclude,(l,e)=>!(l!=null&&l.includes(e))]]),bt=new Map([[K.IsEqual,(l,e)=>l.some(t=>t===e)],[K.IsNotEqual,(l,e)=>l.some(t=>t!==e)],[K.StartsWith,(l,e)=>l.some(t=>t==null?void 0:t.startsWith(e))],[K.EndsWith,(l,e)=>l.some(t=>t==null?void 0:t.endsWith(e))],[K.Includes,(l,e)=>l.some(t=>t==null?void 0:t.includes(e))],[K.DoesNotInclude,(l,e)=>l.some(t=>!(t!=null&&t.includes(e)))]]),yt=new Map([[K.IsEqual,(l,e)=>l===e],[K.IsNotEqual,(l,e)=>l!==e],[K.Greater,(l,e)=>l>e],[K.GreaterOrEqual,(l,e)=>l>=e],[K.Less,(l,e)=>l<e],[K.LessOrEqual,(l,e)=>l<=e]]),vt=new Map([[K.After,(l,e)=>l>=e],[K.Before,(l,e)=>l<=e]]),kt=new Map([[M.Text,gt],[M.TextArray,bt],[M.Number,yt],[M.DateTime,vt]]);let qe=class it{constructor(e){q(this,"id");q(this,"targetValue");q(this,"config");q(this,"operatorsMap");q(this,"operators");q(this,"operator");this.id=e||It()}get targetDate(){const e=this.targetValue,t=e.getTimezoneOffset();return new Date(e.getTime()-t*60*1e3).toISOString().split("T")[0]}set targetDate(e){const t=this.targetTime;this.targetValue=new Date(e),this.targetTime=t}get targetTime(){const e=this.targetValue,t=e.getTimezoneOffset();return new Date(e.getTime()-t*60*1e3).toISOString().split("T")[1].split(".")[0]}set targetTime(e){const[t,s]=e.split(":").map(n=>parseInt(n));this.targetValue.setHours(t,s,0,0)}configure(e,t,s){if(this.config=e,this.operatorsMap=kt.get(this.config.type),this.operators=Array.from(this.operatorsMap.keys()),this.operator=s||this.operators[0],this.config.type===M.DateTime)this.targetValue=t?new Date(t):new Date;else if(this.config.type===M.Number)this.targetValue=t?parseFloat(t):0;else if(this.config.type===M.Text||this.config.type===M.TextArray)this.targetValue=t||"";else throw new Error(`Not implemented type ${this.config.type}`)}filter(e){const t=e[this.config.logItemKey];return this.operatorsMap.get(this.operator)(t,this.targetValue)}static fromObjects(e){return e.map(t=>{const s=new it(t.id),n=Z.find(i=>i.logItemKey===t.config.logItemKey);return s.configure(n,t.targetValue,t.operator),s})}};function It(){return Date.now()+"-"+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36)}function Ke(l,e,t){const s=l.slice();return s[12]=e[t],s}function je(l,e,t){const s=l.slice();return s[15]=e[t],s}function Ue(l){let e,t=l[15].displayName+"",s,n;return{c(){e=v("option"),s=j(t),n=w(),this.h()},l(i){e=k(i,"OPTION",{});var o=T(e);s=U(o,t),n=S(o),o.forEach(d),this.h()},h(){e.__value=l[15],e.value=e.__value},m(i,o){D(i,e,o),p(e,s),p(e,n)},p:X,d(i){i&&d(e)}}}function $e(l){let e,t=Oe.get(l[12])+"",s,n,i;return{c(){e=v("option"),s=j(t),n=w(),this.h()},l(o){e=k(o,"OPTION",{});var a=T(e);s=U(a,t),n=S(a),a.forEach(d),this.h()},h(){e.__value=i=l[12],e.value=e.__value},m(o,a){D(o,e,a),p(e,s),p(e,n)},p(o,a){a&1&&t!==(t=Oe.get(o[12])+"")&&Y(s,t),a&1&&i!==(i=o[12])&&(e.__value=i,e.value=e.__value)},d(o){o&&d(e)}}}function Et(l){let e,t,s,n,i;return{c(){e=v("input"),t=w(),s=v("input"),this.h()},l(o){e=k(o,"INPUT",{type:!0,class:!0}),t=S(o),s=k(o,"INPUT",{type:!0,class:!0}),this.h()},h(){I(e,"type","date"),I(e,"class","svelte-17ir4hc"),I(s,"type","time"),I(s,"class","svelte-17ir4hc")},m(o,a){D(o,e,a),Q(e,l[0].targetDate),D(o,t,a),D(o,s,a),Q(s,l[0].targetTime),n||(i=[F(e,"input",l[9]),F(s,"input",l[10])],n=!0)},p(o,a){a&1&&Q(e,o[0].targetDate),a&1&&Q(s,o[0].targetTime)},d(o){o&&d(e),o&&d(t),o&&d(s),n=!1,ie(i)}}}function Tt(l){let e,t,s;return{c(){e=v("input"),this.h()},l(n){e=k(n,"INPUT",{type:!0,class:!0}),this.h()},h(){I(e,"type","number"),I(e,"class","svelte-17ir4hc")},m(n,i){D(n,e,i),Q(e,l[0].targetValue),t||(s=F(e,"input",l[8]),t=!0)},p(n,i){i&1&&tt(e.value)!==n[0].targetValue&&Q(e,n[0].targetValue)},d(n){n&&d(e),t=!1,s()}}}function Nt(l){let e,t,s;return{c(){e=v("input"),this.h()},l(n){e=k(n,"INPUT",{type:!0,class:!0}),this.h()},h(){I(e,"type","text"),I(e,"class","svelte-17ir4hc")},m(n,i){D(n,e,i),Q(e,l[0].targetValue),t||(s=F(e,"input",l[7]),t=!0)},p(n,i){i&1&&e.value!==n[0].targetValue&&Q(e,n[0].targetValue)},d(n){n&&d(e),t=!1,s()}}}function Ct(l){let e,t,s;return{c(){e=v("input"),this.h()},l(n){e=k(n,"INPUT",{type:!0,class:!0}),this.h()},h(){I(e,"type","text"),I(e,"class","svelte-17ir4hc")},m(n,i){D(n,e,i),Q(e,l[0].targetValue),t||(s=F(e,"input",l[6]),t=!0)},p(n,i){i&1&&e.value!==n[0].targetValue&&Q(e,n[0].targetValue)},d(n){n&&d(e),t=!1,s()}}}function Vt(l){let e,t,s,n,i,o,a,r,f,g,u=Z,c=[];for(let m=0;m<u.length;m+=1)c[m]=Ue(je(l,u,m));let _=l[0].operators,h=[];for(let m=0;m<_.length;m+=1)h[m]=$e(Ke(l,_,m));function C(m,V){if(m[0].config.type===M.Text)return Ct;if(m[0].config.type===M.TextArray)return Nt;if(m[0].config.type===M.Number)return Tt;if(m[0].config.type===M.DateTime)return Et}let E=C(l),b=E&&E(l);return{c(){e=v("div"),t=v("div"),s=j("x"),n=w(),i=v("select");for(let m=0;m<c.length;m+=1)c[m].c();o=w(),a=v("select");for(let m=0;m<h.length;m+=1)h[m].c();r=w(),b&&b.c(),this.h()},l(m){e=k(m,"DIV",{class:!0});var V=T(e);t=k(V,"DIV",{class:!0});var y=T(t);s=U(y,"x"),y.forEach(d),n=S(V),i=k(V,"SELECT",{class:!0});var z=T(i);for(let A=0;A<c.length;A+=1)c[A].l(z);z.forEach(d),o=S(V),a=k(V,"SELECT",{class:!0});var B=T(a);for(let A=0;A<h.length;A+=1)h[A].l(B);B.forEach(d),r=S(V),b&&b.l(V),V.forEach(d),this.h()},h(){I(t,"class","btn-remove svelte-17ir4hc"),I(i,"class","field-display-name svelte-17ir4hc"),l[1]===void 0&&ye(()=>l[4].call(i)),I(a,"class","svelte-17ir4hc"),l[0].operator===void 0&&ye(()=>l[5].call(a)),I(e,"class","container svelte-17ir4hc")},m(m,V){D(m,e,V),p(e,t),p(t,s),p(e,n),p(e,i);for(let y=0;y<c.length;y+=1)c[y].m(i,null);x(i,l[1]),p(e,o),p(e,a);for(let y=0;y<h.length;y+=1)h[y].m(a,null);x(a,l[0].operator),p(e,r),b&&b.m(e,null),f||(g=[F(t,"click",l[3]),F(i,"change",l[4]),F(i,"change",l[2]),F(a,"change",l[5])],f=!0)},p(m,[V]){if(V&0){u=Z;let y;for(y=0;y<u.length;y+=1){const z=je(m,u,y);c[y]?c[y].p(z,V):(c[y]=Ue(z),c[y].c(),c[y].m(i,null))}for(;y<c.length;y+=1)c[y].d(1);c.length=u.length}if(V&2&&x(i,m[1]),V&1){_=m[0].operators;let y;for(y=0;y<_.length;y+=1){const z=Ke(m,_,y);h[y]?h[y].p(z,V):(h[y]=$e(z),h[y].c(),h[y].m(a,null))}for(;y<h.length;y+=1)h[y].d(1);h.length=_.length}V&1&&x(a,m[0].operator),E===(E=C(m))&&b?b.p(m,V):(b&&b.d(1),b=E&&E(m),b&&(b.c(),b.m(e,null)))},i:X,o:X,d(m){m&&d(e),he(c,m),he(h,m),b&&b.d(),f=!1,ie(g)}}}function Dt(l,e,t){const s=et();let{field:n}=e,i;Ie(async()=>{t(1,i=n.config)});function o(){n.configure(i),t(0,n)}function a(){s("remove",n)}function r(){i=ve(this),t(1,i)}function f(){n.operator=ve(this),t(0,n)}function g(){n.targetValue=this.value,t(0,n)}function u(){n.targetValue=this.value,t(0,n)}function c(){n.targetValue=tt(this.value),t(0,n)}function _(){n.targetDate=this.value,t(0,n)}function h(){n.targetTime=this.value,t(0,n)}return l.$$set=C=>{"field"in C&&t(0,n=C.field)},[n,i,o,a,r,f,g,u,c,_,h]}class wt extends te{constructor(e){super(),le(this,e,Dt,Vt,se,{field:0})}}function Fe(l,e,t){const s=l.slice();return s[10]=e[t],s}function ze(l){let e,t,s,n;return{c(){e=v("button"),t=j("Apply"),this.h()},l(i){e=k(i,"BUTTON",{type:!0,class:!0});var o=T(e);t=U(o,"Apply"),o.forEach(d),this.h()},h(){I(e,"type","button"),I(e,"class","btn-secondary")},m(i,o){D(i,e,o),p(e,t),s||(n=F(e,"click",l[5]),s=!0)},p:X,d(i){i&&d(e),s=!1,n()}}}function Be(l){let e,t,s,n;return{c(){e=v("button"),t=j("Reset"),this.h()},l(i){e=k(i,"BUTTON",{type:!0,class:!0});var o=T(e);t=U(o,"Reset"),o.forEach(d),this.h()},h(){I(e,"type","button"),I(e,"class","btn-secondary")},m(i,o){D(i,e,o),p(e,t),s||(n=F(e,"click",l[6]),s=!0)},p:X,d(i){i&&d(e),s=!1,n()}}}function Re(l){let e,t=[],s=new Map,n,i=l[2];const o=a=>a[10].id;for(let a=0;a<i.length;a+=1){let r=Fe(l,i,a),f=o(r);s.set(f,t[a]=Pe(f,r))}return{c(){e=v("div");for(let a=0;a<t.length;a+=1)t[a].c();this.h()},l(a){e=k(a,"DIV",{class:!0});var r=T(e);for(let f=0;f<t.length;f+=1)t[f].l(r);r.forEach(d),this.h()},h(){I(e,"class","conditions svelte-187dxfa")},m(a,r){D(a,e,r);for(let f=0;f<t.length;f+=1)t[f].m(e,null);n=!0},p(a,r){r&20&&(i=a[2],de(),t=pe(t,r,o,1,a,i,s,e,ut,Pe,null,Fe),me())},i(a){if(!n){for(let r=0;r<i.length;r+=1)L(t[r]);n=!0}},o(a){for(let r=0;r<t.length;r+=1)H(t[r]);n=!1},d(a){a&&d(e);for(let r=0;r<t.length;r+=1)t[r].d()}}}function Pe(l,e){let t,s,n;return s=new wt({props:{field:e[10]}}),s.$on("remove",e[4]),{key:l,first:null,c(){t=fe(),oe(s.$$.fragment),this.h()},l(i){t=fe(),ae(s.$$.fragment,i),this.h()},h(){this.first=t},m(i,o){D(i,t,o),re(s,i,o),n=!0},p(i,o){e=i;const a={};o&4&&(a.field=e[10]),s.$set(a)},i(i){n||(L(s.$$.fragment,i),n=!0)},o(i){H(s.$$.fragment,i),n=!1},d(i){i&&d(t),ce(s,i)}}}function St(l){let e,t,s,n,i,o,a,r,f,g,u,c,_,h=l[0]&&l[2].length>0&&ze(l),C=l[1]&&Be(l),E=l[2].length>0&&Re(l);return{c(){e=v("div"),t=v("div"),s=v("strong"),n=j("Filter Conditions:"),i=w(),o=v("button"),a=j("Add"),r=w(),h&&h.c(),f=w(),C&&C.c(),g=w(),E&&E.c(),this.h()},l(b){e=k(b,"DIV",{class:!0});var m=T(e);t=k(m,"DIV",{class:!0});var V=T(t);s=k(V,"STRONG",{});var y=T(s);n=U(y,"Filter Conditions:"),y.forEach(d),i=S(V),o=k(V,"BUTTON",{type:!0,class:!0});var z=T(o);a=U(z,"Add"),z.forEach(d),r=S(V),h&&h.l(V),f=S(V),C&&C.l(V),V.forEach(d),g=S(m),E&&E.l(m),m.forEach(d),this.h()},h(){I(o,"type","button"),I(o,"class","btn-secondary"),I(t,"class","actions svelte-187dxfa"),I(e,"class","container svelte-187dxfa")},m(b,m){D(b,e,m),p(e,t),p(t,s),p(s,n),p(t,i),p(t,o),p(o,a),p(t,r),h&&h.m(t,null),p(t,f),C&&C.m(t,null),p(e,g),E&&E.m(e,null),u=!0,c||(_=F(o,"click",l[3]),c=!0)},p(b,[m]){b[0]&&b[2].length>0?h?h.p(b,m):(h=ze(b),h.c(),h.m(t,f)):h&&(h.d(1),h=null),b[1]?C?C.p(b,m):(C=Be(b),C.c(),C.m(t,null)):C&&(C.d(1),C=null),b[2].length>0?E?(E.p(b,m),m&4&&L(E,1)):(E=Re(b),E.c(),L(E,1),E.m(e,null)):E&&(de(),H(E,1,1,()=>{E=null}),me())},i(b){u||(L(E),u=!0)},o(b){H(E),u=!1},d(b){b&&d(e),h&&h.d(),C&&C.d(),E&&E.d(),c=!1,_()}}}const We="logFilter";function Mt(l,e,t){const s=et();let{canApplyFilter:n=!1}=e,{isFilterApplied:i=!1}=e,o=[];Ie(()=>{c()});function a(){const _=Z.find(C=>!o.some(E=>E.config.logItemKey===C.logItemKey))||Z[0],h=new qe;h.configure(_),t(2,o=[...o,h]),u()}function r({detail:_}){t(2,o=o.filter(h=>h.id!==_.id)),u()}function f(){u(),s("applyFilter",o)}function g(){s("resetFilter")}function u(){const _=JSON.stringify(o);localStorage.setItem(We,_)}function c(){var _=localStorage.getItem(We);if(!_)return;const h=JSON.parse(_);t(2,o=qe.fromObjects(h))}return l.$$set=_=>{"canApplyFilter"in _&&t(0,n=_.canApplyFilter),"isFilterApplied"in _&&t(1,i=_.isFilterApplied)},[n,i,o,a,r,f,g]}class At extends te{constructor(e){super(),le(this,e,Mt,St,se,{canApplyFilter:0,isFilterApplied:1})}}function Je(l,e,t){const s=l.slice();return s[4]=e[t],s[5]=e,s[6]=t,s}function Ge(l,e){let t,s,n,i=e[4].displayName+"",o,a,r,f;function g(){return e[2](e[4])}function u(){e[3].call(s,e[5],e[6])}return{key:l,first:null,c(){t=v("label"),s=v("input"),n=w(),o=j(i),a=w(),this.h()},l(c){t=k(c,"LABEL",{class:!0});var _=T(t);s=k(_,"INPUT",{type:!0,class:!0}),n=S(_),o=U(_,i),a=S(_),_.forEach(d),this.h()},h(){I(s,"type","checkbox"),I(s,"class","checkbox svelte-10x9425"),I(t,"class","column-visibility-label svelte-10x9425"),this.first=t},m(c,_){D(c,t,_),p(t,s),s.checked=e[4].isVisible,p(t,n),p(t,o),p(t,a),r||(f=[F(s,"change",g),F(s,"change",u)],r=!0)},p(c,_){e=c,_&1&&(s.checked=e[4].isVisible),_&1&&i!==(i=e[4].displayName+"")&&Y(o,i)},d(c){c&&d(t),r=!1,ie(f)}}}function Ot(l){let e,t,s,n,i=[],o=new Map,a=l[0];const r=f=>f[4].index;for(let f=0;f<a.length;f+=1){let g=Je(l,a,f),u=r(g);o.set(u,i[f]=Ge(u,g))}return{c(){e=v("div"),t=v("strong"),s=j("Columns Visibility:"),n=w();for(let f=0;f<i.length;f+=1)i[f].c();this.h()},l(f){e=k(f,"DIV",{class:!0});var g=T(e);t=k(g,"STRONG",{});var u=T(t);s=U(u,"Columns Visibility:"),u.forEach(d),n=S(g);for(let c=0;c<i.length;c+=1)i[c].l(g);g.forEach(d),this.h()},h(){I(e,"class","container svelte-10x9425")},m(f,g){D(f,e,g),p(e,t),p(t,s),p(e,n);for(let u=0;u<i.length;u+=1)i[u].m(e,null)},p(f,[g]){g&3&&(a=f[0],i=pe(i,g,r,1,f,a,o,e,ke,Ge,null,Je))},i:X,o:X,d(f){f&&d(e);for(let g=0;g<i.length;g+=1)i[g].d()}}}function qt(l,e,t){const s=_e.instance;let n;ee.subscribe(({columns:a})=>{t(0,n=a)});const i=a=>s.toggleColumnVisibility(a);function o(a,r){a[r].isVisible=this.checked,t(0,n)}return[n,s,i,o]}class Kt extends te{constructor(e){super(),le(this,e,qt,Ot,se,{})}}function Le(l,e,t){const s=l.slice();return s[7]=e[t],s}function He(l){let e,t=l[7].name+"",s,n,i;return{c(){e=v("option"),s=j(t),n=w(),this.h()},l(o){e=k(o,"OPTION",{});var a=T(e);s=U(a,t),n=S(a),a.forEach(d),this.h()},h(){e.__value=i=l[7],e.value=e.__value},m(o,a){D(o,e,a),p(e,s),p(e,n)},p(o,a){a&1&&t!==(t=o[7].name+"")&&Y(s,t),a&1&&i!==(i=o[7])&&(e.__value=i,e.value=e.__value)},d(o){o&&d(e)}}}function Qe(l){let e,t=l[3]?"Hide":"Show",s,n,i,o;return{c(){e=v("button"),s=j(t),n=j(" Filter"),this.h()},l(a){e=k(a,"BUTTON",{type:!0,class:!0});var r=T(e);s=U(r,t),n=U(r," Filter"),r.forEach(d),this.h()},h(){I(e,"type","button"),I(e,"class","btn-secondary")},m(a,r){D(a,e,r),p(e,s),p(e,n),i||(o=F(e,"click",l[14]),i=!0)},p(a,r){r&8&&t!==(t=a[3]?"Hide":"Show")&&Y(s,t)},d(a){a&&d(e),i=!1,o()}}}function Xe(l){let e,t=l[4]?"Hide":"Show",s,n,i,o;return{c(){e=v("button"),s=j(t),n=j(" Columns Config"),this.h()},l(a){e=k(a,"BUTTON",{type:!0,class:!0});var r=T(e);s=U(r,t),n=U(r," Columns Config"),r.forEach(d),this.h()},h(){I(e,"type","button"),I(e,"class","btn-secondary")},m(a,r){D(a,e,r),p(e,s),p(e,n),i||(o=F(e,"click",l[11]),i=!0)},p(a,r){r&16&&t!==(t=a[4]?"Hide":"Show")&&Y(s,t)},d(a){a&&d(e),i=!1,o()}}}function Ye(l){let e,t;return{c(){e=v("div"),t=j(l[5]),this.h()},l(s){e=k(s,"DIV",{class:!0});var n=T(e);t=U(n,l[5]),n.forEach(d),this.h()},h(){I(e,"class","error svelte-n3m35p")},m(s,n){D(s,e,n),p(e,t)},p(s,n){n&32&&Y(t,s[5])},d(s){s&&d(e)}}}function Ze(l){let e,t,s;return t=new At({props:{isFilterApplied:l[2],canApplyFilter:l[6]}}),t.$on("applyFilter",l[9]),t.$on("resetFilter",l[10]),{c(){e=v("div"),oe(t.$$.fragment)},l(n){e=k(n,"DIV",{});var i=T(e);ae(t.$$.fragment,i),i.forEach(d)},m(n,i){D(n,e,i),re(t,e,null),s=!0},p(n,i){const o={};i&4&&(o.isFilterApplied=n[2]),i&64&&(o.canApplyFilter=n[6]),t.$set(o)},i(n){s||(L(t.$$.fragment,n),s=!0)},o(n){H(t.$$.fragment,n),s=!1},d(n){n&&d(e),ce(t)}}}function xe(l){let e,t,s;return t=new Kt({}),{c(){e=v("div"),oe(t.$$.fragment)},l(n){e=k(n,"DIV",{});var i=T(e);ae(t.$$.fragment,i),i.forEach(d)},m(n,i){D(n,e,i),re(t,e,null),s=!0},i(n){s||(L(t.$$.fragment,n),s=!0)},o(n){H(t.$$.fragment,n),s=!1},d(n){n&&d(e),ce(t)}}}function jt(l){let e,t,s,n,i,o,a,r,f,g,u,c,_,h,C,E,b,m,V,y,z=l[0],B=[];for(let N=0;N<z.length;N+=1)B[N]=He(Le(l,z,N));let A=l[6]&&Qe(l),W=l[6]&&Xe(l),J=l[5].length&&Ye(l),$=l[3]&&Ze(l),R=l[4]&&xe();return b=new _t({props:{logItems:l[1]}}),{c(){e=v("div"),t=v("div"),s=v("label"),n=j("File:"),i=w(),o=v("select");for(let N=0;N<B.length;N+=1)B[N].c();a=w(),r=v("button"),f=j("Load File"),u=w(),A&&A.c(),c=w(),W&&W.c(),_=w(),J&&J.c(),h=w(),$&&$.c(),C=w(),R&&R.c(),E=w(),oe(b.$$.fragment),this.h()},l(N){e=k(N,"DIV",{class:!0});var O=T(e);t=k(O,"DIV",{class:!0});var P=T(t);s=k(P,"LABEL",{for:!0});var G=T(s);n=U(G,"File:"),G.forEach(d),i=S(P),o=k(P,"SELECT",{id:!0});var ne=T(o);for(let ge=0;ge<B.length;ge+=1)B[ge].l(ne);ne.forEach(d),a=S(P),r=k(P,"BUTTON",{type:!0});var Te=T(r);f=U(Te,"Load File"),Te.forEach(d),u=S(P),A&&A.l(P),c=S(P),W&&W.l(P),P.forEach(d),_=S(O),J&&J.l(O),h=S(O),$&&$.l(O),C=S(O),R&&R.l(O),E=S(O),ae(b.$$.fragment,O),O.forEach(d),this.h()},h(){I(s,"for","fileName"),I(o,"id","fileName"),l[7]===void 0&&ye(()=>l[13].call(o)),r.disabled=g=!l[7],I(r,"type","button"),I(t,"class","controls svelte-n3m35p"),I(e,"class","tracing-ui-root svelte-n3m35p")},m(N,O){D(N,e,O),p(e,t),p(t,s),p(s,n),p(t,i),p(t,o);for(let P=0;P<B.length;P+=1)B[P].m(o,null);x(o,l[7]),p(t,a),p(t,r),p(r,f),p(t,u),A&&A.m(t,null),p(t,c),W&&W.m(t,null),p(e,_),J&&J.m(e,null),p(e,h),$&&$.m(e,null),p(e,C),R&&R.m(e,null),p(e,E),re(b,e,null),m=!0,V||(y=[F(o,"change",l[13]),F(r,"click",l[8])],V=!0)},p(N,[O]){if(O&1){z=N[0];let G;for(G=0;G<z.length;G+=1){const ne=Le(N,z,G);B[G]?B[G].p(ne,O):(B[G]=He(ne),B[G].c(),B[G].m(o,null))}for(;G<B.length;G+=1)B[G].d(1);B.length=z.length}O&129&&x(o,N[7]),(!m||O&129&&g!==(g=!N[7]))&&(r.disabled=g),N[6]?A?A.p(N,O):(A=Qe(N),A.c(),A.m(t,c)):A&&(A.d(1),A=null),N[6]?W?W.p(N,O):(W=Xe(N),W.c(),W.m(t,null)):W&&(W.d(1),W=null),N[5].length?J?J.p(N,O):(J=Ye(N),J.c(),J.m(e,h)):J&&(J.d(1),J=null),N[3]?$?($.p(N,O),O&8&&L($,1)):($=Ze(N),$.c(),L($,1),$.m(e,C)):$&&(de(),H($,1,1,()=>{$=null}),me()),N[4]?R?O&16&&L(R,1):(R=xe(),R.c(),L(R,1),R.m(e,E)):R&&(de(),H(R,1,1,()=>{R=null}),me());const P={};O&2&&(P.logItems=N[1]),b.$set(P)},i(N){m||(L($),L(R),L(b.$$.fragment,N),m=!0)},o(N){H($),H(R),H(b.$$.fragment,N),m=!1},d(N){N&&d(e),he(B,N),A&&A.d(),W&&W.d(),J&&J.d(),$&&$.d(),R&&R.d(),ce(b),V=!1,ie(y)}}}const ot="api/trace-files";async function Ut(){const e=await(await fetch(ot)).text();return JSON.parse(e)}function $t(l,e,t){let s,n=[],i,o=[],a=[],r=!1,f=!1,g=!1,u="";Ie(async()=>{t(0,n=await Ut())}),ee.subscribe(({isEditMode:m})=>{t(4,g=m)});async function c(){t(12,o=[]),t(5,u="");const m=`${ot}/${encodeURIComponent(i.name)}`,y=await(await fetch(m)).text();try{t(12,o=y.split(`
`).filter(Boolean).map(Ee.fromJson))}catch{t(7,i=void 0),t(3,f=!1),t(4,g=!1),t(5,u="Failed to parse JSON in log file. It could be a text log file. Pick a JSON log file.")}h()}function _({detail:m}){t(2,r=!0),t(1,a=o.filter(V=>m.every(y=>y.filter(V))))}function h(){t(2,r=!1),t(1,a=o.slice())}function C(){ee.update(m=>({...m,isEditMode:!m.isEditMode}))}function E(){i=ve(this),t(7,i),t(0,n)}const b=()=>t(3,f=!f);return l.$$.update=()=>{l.$$.dirty&4096&&t(6,s=o.length>0)},[n,a,r,f,g,u,s,i,c,_,h,C,o,E,b]}class Ft extends te{constructor(e){super(),le(this,e,$t,jt,se,{})}}function zt(l){let e,t,s;return t=new Ft({}),{c(){e=v("section"),oe(t.$$.fragment)},l(n){e=k(n,"SECTION",{});var i=T(e);ae(t.$$.fragment,i),i.forEach(d)},m(n,i){D(n,e,i),re(t,e,null),s=!0},p:X,i(n){s||(L(t.$$.fragment,n),s=!0)},o(n){H(t.$$.fragment,n),s=!1},d(n){n&&d(e),ce(t)}}}class Wt extends te{constructor(e){super(),le(this,e,null,zt,se,{})}}export{Wt as default};
