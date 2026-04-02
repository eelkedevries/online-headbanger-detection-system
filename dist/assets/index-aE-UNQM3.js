(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const ba=180/Math.PI,hm=Math.PI/180,$_=180,kl=20,J_=60,fm=1e4,Z_=8e3,dm=18,pm=110,zc=.34,Q_=2e3,t1=.18,e1=.04,n1=.52,i1=1800,Ia=.5,Hl=30,r1=.001,mm=typeof window<"u"&&window.matchMedia("(max-width: 900px)").matches?1.25:2,s1=.3,Vl=90,jh=.05,o1=.3,$r=Object.freeze({happiness:Object.freeze({weights:Object.freeze({mouthSmileLeft:1,mouthSmileRight:1,cheekSquintLeft:.7,cheekSquintRight:.7,mouthDimpleLeft:.3,mouthDimpleRight:.3}),magnitude:Math.hypot(1,1,.7,.7,.3,.3)}),sadness:Object.freeze({weights:Object.freeze({browInnerUp:1,mouthFrownLeft:.8,mouthFrownRight:.8,mouthShrugLower:.4,eyeSquintLeft:.3,eyeSquintRight:.3}),magnitude:Math.hypot(1,.8,.8,.4,.3,.3)}),fear:Object.freeze({weights:Object.freeze({browInnerUp:.9,browOuterUpLeft:.7,browOuterUpRight:.7,eyeWideLeft:1,eyeWideRight:1,mouthStretchLeft:.6,mouthStretchRight:.6,jawOpen:.4}),magnitude:Math.hypot(.9,.7,.7,1,1,.6,.6,.4)}),disgust:Object.freeze({weights:Object.freeze({noseSneerLeft:1,noseSneerRight:1,browDownLeft:.5,browDownRight:.5,mouthUpperUpLeft:.5,mouthUpperUpRight:.5,mouthFrownLeft:.3,mouthFrownRight:.3}),magnitude:Math.hypot(1,1,.5,.5,.5,.5,.3,.3)}),anger:Object.freeze({weights:Object.freeze({browDownLeft:1,browDownRight:1,eyeSquintLeft:.6,eyeSquintRight:.6,noseSneerLeft:.4,noseSneerRight:.4,mouthPressLeft:.5,mouthPressRight:.5}),magnitude:Math.hypot(1,1,.6,.6,.4,.4,.5,.5)}),surprise:Object.freeze({weights:Object.freeze({browOuterUpLeft:1,browOuterUpRight:1,browInnerUp:.8,eyeWideLeft:.9,eyeWideRight:.9,jawOpen:1}),magnitude:Math.hypot(1,1,.8,.9,.9,1)})}),gm=[[11,12],[11,13],[13,15],[12,14],[14,16],[11,23],[12,24],[23,24],[23,25],[25,27],[27,31],[24,26],[26,28],[28,32]],_m=Object.freeze([[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]]),vm=[0,7,8,11,12,13,14,15,16,23,24,25,26,27,28,31,32],Yt={noseTip:1,mouthLeft:61,mouthRight:291,mouthTop:13,mouthBottom:14,leftEyeOuter:33,leftEyeInner:133,leftEyeTop:159,leftEyeBottom:145,rightEyeOuter:362,rightEyeInner:263,rightEyeTop:386,rightEyeBottom:374,leftBrow:[70,63,105,66,107],rightBrow:[336,296,334,293,300],leftIris:[468,469,470,471,472],rightIris:[473,474,475,476,477]};class jo{constructor(t){this._buf=new Array(t),this._cap=t,this._head=0,this._size=0}push(t){this._size<this._cap?(this._buf[(this._head+this._size)%this._cap]=t,this._size++):(this._buf[this._head]=t,this._head=(this._head+1)%this._cap)}shift(){if(!this._size)return;const t=this._buf[this._head];return this._head=(this._head+1)%this._cap,this._size--,t}get length(){return this._size}first(){return this._size?this._buf[this._head]:void 0}last(){return this._size?this._buf[(this._head+this._size-1)%this._cap]:void 0}toArray(){const t=new Array(this._size);for(let n=0;n<this._size;n++)t[n]=this._buf[(this._head+n)%this._cap];return t}clear(){this._head=0,this._size=0}}function he(e,t,n){return Math.min(n,Math.max(t,e))}function kc(e,t,n){return e+(t-e)*n}function ln(e){return e.length?e.reduce((t,n)=>t+n,0)/e.length:0}function a1(e,t){if(!e.length)return 0;const n=t!==void 0?t:ln(e);return Math.sqrt(e.reduce((i,r)=>i+(r-n)*(r-n),0)/e.length)}function Zn(e,t){const n=e.x-t.x,i=e.y-t.y;return Math.hypot(n,i)}function Kh(e){switch(e==null?void 0:e.name){case"NotAllowedError":return"Camera access was blocked. Allow camera access in the browser and try again.";case"NotFoundError":return"No camera was found on this device.";case"NotReadableError":return"The camera is already in use by another app or browser tab.";case"OverconstrainedError":return"The requested camera settings were not available on this device.";case"SecurityError":return"Camera access is only available in a secure browser context.";case"AbortError":return"Camera start was interrupted before the stream became ready.";default:return(e==null?void 0:e.message)||"Unknown camera error."}}function Hc(e){return`${e>=0?"":"-"}${Math.abs(e).toFixed(1)}°`}function c1(e){return`${Math.round(he(e,0,1)*100)}%`}function Vc(e){const t=Math.max(0,Math.floor(e/1e3)),n=Math.floor(t/60),i=t%60;return`${n}:${String(i).padStart(2,"0")}`}function l1(e){return`${e>0?"+":""}${e.toFixed(1)} cm`}function $h(e,t){let n=0,i=0,r=0;for(const s of t){const o=e[s];o&&(n+=o.x,i+=o.y,r+=1)}return r?{x:n/r,y:i/r}:null}function u1(e){var n,i;const t=((i=(n=e==null?void 0:e.faceBlendshapes)==null?void 0:n[0])==null?void 0:i.categories)??[];return Object.fromEntries(t.map(r=>[r.categoryName,r.score]))}function h1(e){const t=ln([e.eyeBlinkLeft??0,e.eyeBlinkRight??0]),n=1-t,i=ln([e.browInnerUp??0,e.browOuterUpLeft??0,e.browOuterUpRight??0]),r=ln([e.browDownLeft??0,e.browDownRight??0]),s=ln([e.mouthSmileLeft??0,e.mouthSmileRight??0]),o=ln([e.mouthPressLeft??0,e.mouthPressRight??0]),a=ln([e.mouthStretchLeft??0,e.mouthStretchRight??0]),c=e.cheekPuff??0,l=e.jawOpen??0,u=ln([e.noseSneerLeft??0,e.noseSneerRight??0]),h=ln([e.eyeSquintLeft??0,e.eyeSquintRight??0]);return{blink:t,eyeOpen:n,browRaise:i,browFurrow:r,smile:s,lipPress:o,lipStretch:a,cheekPuff:c,jawOpen:l,noseFlare:u,squint:h}}let se=null;const xm=new Float32Array(Vl);let Ta=0,Ao=0;function Jr(e,t){let n=0,i=0;for(const[s,o]of Object.entries(t.weights)){const a=e[s]??0;n+=a*o,i+=a*a}const r=Math.sqrt(i);return r===0||t.magnitude===0?0:n/(r*t.magnitude)}function f1(e){const t=Jr(e,$r.happiness),n=Jr(e,$r.sadness),i=Jr(e,$r.fear),r=Jr(e,$r.disgust),s=Jr(e,$r.anger),o=Jr(e,$r.surprise);if(se===null)se={happiness:t,sadness:n,fear:i,disgust:r,anger:s,surprise:o};else{const f=s1,p=1-f;se.happiness=f*t+p*se.happiness,se.sadness=f*n+p*se.sadness,se.fear=f*i+p*se.fear,se.disgust=f*r+p*se.disgust,se.anger=f*s+p*se.anger,se.surprise=f*o+p*se.surprise}const a=Math.max(se.happiness,se.sadness,se.fear,se.disgust,se.anger,se.surprise);xm[Ta]=a,Ta=(Ta+1)%Vl,Ao<Vl&&Ao++;const c=e.mouthSmileLeft??0,l=e.mouthSmileRight??0,u=Math.abs(c-l),h=he(u*1.6*he(1-(c+l)*.75,0,1),0,1);return{happiness:he(se.happiness,0,1),sadness:he(se.sadness,0,1),fear:he(se.fear,0,1),disgust:he(se.disgust,0,1),anger:he(se.anger,0,1),surprise:he(se.surprise,0,1),contempt:h}}function d1(){if(Ao===0)return jh;const e=xm.subarray(0,Ao),t=ln(e);return he(t+a1(e,t),jh,o1)}function p1(){se=null,Ta=0,Ao=0}const fe=document.getElementById("video"),Yn=document.getElementById("headFeedCanvas"),Bi=document.getElementById("headOverlay"),mo=document.getElementById("avatar3d"),sr=document.getElementById("startBtn"),Lr=document.getElementById("stopBtn"),Pr=document.getElementById("calibrateBtn"),or=document.getElementById("distanceRefBtn"),Jh=document.getElementById("status"),Ko=document.getElementById("startupLog"),ym=document.getElementById("yawValue"),Mm=document.getElementById("pitchValue"),Sm=document.getElementById("rollValue"),Gl=document.getElementById("headDistanceValue"),Em=document.getElementById("yawBar"),bm=document.getElementById("pitchBar"),Tm=document.getElementById("rollBar"),Wl=document.getElementById("headDistanceBar"),Da=document.getElementById("trackingState"),Ua=document.getElementById("trackingHint"),bu=document.getElementById("currentAction"),wo=document.getElementById("fpsValue"),Zh=document.getElementById("lookingAtCameraValue"),Qh=document.getElementById("lookingAwayValue"),tf=document.getElementById("gazeHorizontalValue"),ef=document.getElementById("gazeVerticalValue"),nf=document.getElementById("attentionHint"),Am=document.getElementById("nodFreqValue"),wm=document.getElementById("shakeFreqValue"),Rm=document.getElementById("tiltFreqValue"),Cm=document.getElementById("headbangFreqValue"),Gc=document.getElementById("distanceValue"),rf=document.getElementById("distanceHint"),Wc=document.getElementById("distanceMode"),Xc=document.getElementById("faceWidthPx"),qc=document.getElementById("faceHeightPx"),Yc=document.getElementById("interEyePxValue"),jc=document.getElementById("irisDiameterPxValue"),sf=document.getElementById("mouthWidthValue"),of=document.getElementById("mouthHeightValue"),af=document.getElementById("mouthAspectValue"),cf=document.getElementById("geomFaceWidthEstimate"),lf=document.getElementById("geomFaceHeightEstimate"),uf=document.getElementById("geomInterEyeEstimate"),hf=document.getElementById("geomIrisEstimate"),ff=document.getElementById("earLeftValue"),df=document.getElementById("earRightValue"),pf=document.getElementById("browLeftValue"),mf=document.getElementById("browRightValue"),gf=document.getElementById("faceRatioValue"),_f=document.getElementById("faceX"),vf=document.getElementById("faceY"),Lm=document.getElementById("movingTimeValue"),Pm=document.getElementById("stillTimeValue"),Im=document.getElementById("movementBoutsValue"),Dm=document.getElementById("avgBoutValue"),Um=document.getElementById("maxHeadSpeedValue"),Nm=document.getElementById("movementLoadValue"),Fm=document.getElementById("yawBalanceValue"),Om=document.getElementById("eventNodCount"),Bm=document.getElementById("eventShakeCount"),zm=document.getElementById("eventTiltLeftCount"),km=document.getElementById("eventTiltRightCount"),Hm=document.getElementById("eventHeadbangCount"),Vm=document.getElementById("blinkCountValue"),Aa=document.getElementById("elapsedTimeValue"),go=document.getElementById("neutralState"),Xl={blink:{value:document.getElementById("exprBlinkValue"),bar:document.getElementById("exprBlinkBar")},eyeOpen:{value:document.getElementById("exprOpenValue"),bar:document.getElementById("exprOpenBar")},browRaise:{value:document.getElementById("exprBrowRaiseValue"),bar:document.getElementById("exprBrowRaiseBar")},browFurrow:{value:document.getElementById("exprBrowFurrowValue"),bar:document.getElementById("exprBrowFurrowBar")},squint:{value:document.getElementById("exprSquintValue"),bar:document.getElementById("exprSquintBar")}},xf={happiness:{value:document.getElementById("basicHappinessValue"),bar:document.getElementById("basicHappinessBar")},sadness:{value:document.getElementById("basicSadnessValue"),bar:document.getElementById("basicSadnessBar")},fear:{value:document.getElementById("basicFearValue"),bar:document.getElementById("basicFearBar")},disgust:{value:document.getElementById("basicDisgustValue"),bar:document.getElementById("basicDisgustBar")},anger:{value:document.getElementById("basicAngerValue"),bar:document.getElementById("basicAngerBar")},surprise:{value:document.getElementById("basicSurpriseValue"),bar:document.getElementById("basicSurpriseBar")},contempt:{value:document.getElementById("basicContemptValue"),bar:document.getElementById("basicContemptBar")}},yf=document.getElementById("dominantExprValue"),Tu=document.getElementById("talkingStateValue"),Au=document.getElementById("yawningStateValue"),Kc=document.getElementById("qualityBarFill"),Mf=document.getElementById("qualityScore"),Sf=document.getElementById("qualityHint"),m1=[document.getElementById("panelEyes"),document.getElementById("panelExpressions"),document.getElementById("panelAttention"),document.getElementById("panelGeometry")],g1=200;let ai=!1,Ef=-1/0;function _1(e){ai=e-Ef>=g1,ai&&(Ef=e)}function As(){return ai}function ge(e,t="info"){if(!Ko)return;const n=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),i=document.createElement("span");i.className=`log-line ${t}`.trim(),i.textContent=`[${n}] ${e}`,Ko.appendChild(i),Ko.scrollTop=Ko.scrollHeight}function en(e,t=""){Jh.textContent=e,Jh.className=`status ${t}`.trim()}function zi(e,t,n=$_){const i=he(t,-n,n),r=Math.abs(i)/n*50;e.style.left=i>=0?"50%":`${50-r}%`,e.style.width=`${r}%`}function _s(e,t){const n=he(t,0,1);Xl[e].bar.style.width=`${n*100}%`,ai&&(Xl[e].value.textContent=c1(n))}function $c(e){if(!Number.isFinite(e)){Gl.textContent="–",zi(Wl,0,kl);return}zi(Wl,e,kl),ai&&(Gl.textContent=l1(e))}function wu(){ym.textContent="0.0°",Mm.textContent="0.0°",Sm.textContent="0.0°",Gl.textContent="–",zi(Em,0),zi(bm,0),zi(Tm,0),zi(Wl,0,kl)}function v1(e){zi(Em,e.yaw),zi(bm,e.pitch),zi(Tm,e.roll),ai&&(ym.textContent=Hc(e.yaw),Mm.textContent=Hc(e.pitch),Sm.textContent=Hc(e.roll))}function x1(e){_s("blink",e.blink),_s("eyeOpen",e.eyeOpen),_s("squint",e.squint),_s("browRaise",e.browRaise),_s("browFurrow",e.browFurrow)}function Gm(e){if(!e){for(const r of Object.values(xf))r.bar.style.width="0%",r.value.textContent="0%";yf.textContent="–";return}const t=d1();let n=null,i=t;for(const[r,s]of Object.entries(xf)){const o=e[r],a=Math.round(o*100);s.bar.style.width=`${a}%`,ai&&(s.value.textContent=`${a}%`,o>i&&(i=o,n=r))}ai&&(yf.textContent=n?n.charAt(0).toUpperCase()+n.slice(1):"Neutral")}function ql(e){if(!e){Zh.textContent="–",Qh.textContent="–",tf.textContent="–",ef.textContent="–",nf.textContent="Heuristic estimate from head orientation and iris position.";return}if(!ai)return;Zh.textContent=e.lookingAtCamera?"Likely yes":"Likely no",Qh.textContent=e.lookingAway?"Likely yes":"Likely no";const t=e.gazeHoriz>.22?"Right":e.gazeHoriz<-.22?"Left":"Centred",n=e.gazeVert>.18?"Down":e.gazeVert<-.18?"Up":"Centred";tf.textContent=t,ef.textContent=n,nf.textContent=`Heuristic estimate. Confidence: ${Math.round(e.confidence*100)}%.`}function y1(e,t){const n=t&&e.score<Ia;for(const r of m1)r&&r.classList.toggle("metric--dim",n);if(!t){Kc.style.width="0%",ai&&(Mf.textContent="–",Sf.textContent="");return}const i=Math.round(e.score*100);Kc.style.width=`${i}%`,Kc.style.backgroundColor=e.score>=.7?"var(--ok)":e.score>=Ia?"var(--warn)":"#e03131",ai&&(Mf.textContent=`${i}%`,Sf.textContent=e.hint)}function Wm(e){e?(Da.textContent="Tracking",Ua.textContent="One face detected."):(Da.textContent="Searching",Ua.textContent="No face currently detected.")}var ws=typeof self<"u"?self:{};function Xm(e,t){t:{for(var n=["CLOSURE_FLAGS"],i=ws,r=0;r<n.length;r++)if((i=i[n[r]])==null){n=null;break t}n=i}return(e=n&&n[e])!=null?e:t}function vr(){throw Error("Invalid UTF8")}function bf(e,t){return t=String.fromCharCode.apply(null,t),e==null?t:e+t}let $o,Jc;const M1=typeof TextDecoder<"u";let S1;const E1=typeof TextEncoder<"u";function qm(e){if(E1)e=(S1||(S1=new TextEncoder)).encode(e);else{let n=0;const i=new Uint8Array(3*e.length);for(let r=0;r<e.length;r++){var t=e.charCodeAt(r);if(t<128)i[n++]=t;else{if(t<2048)i[n++]=t>>6|192;else{if(t>=55296&&t<=57343){if(t<=56319&&r<e.length){const s=e.charCodeAt(++r);if(s>=56320&&s<=57343){t=1024*(t-55296)+s-56320+65536,i[n++]=t>>18|240,i[n++]=t>>12&63|128,i[n++]=t>>6&63|128,i[n++]=63&t|128;continue}r--}t=65533}i[n++]=t>>12|224,i[n++]=t>>6&63|128}i[n++]=63&t|128}}e=n===i.length?i:i.subarray(0,n)}return e}function Ym(e){ws.setTimeout(()=>{throw e},0)}var Yl,b1=Xm(610401301,!1),Tf=Xm(748402147,!0);function Af(){var e=ws.navigator;return e&&(e=e.userAgent)?e:""}const wf=ws.navigator;function tc(e){return tc[" "](e),e}Yl=wf&&wf.userAgentData||null,tc[" "]=function(){};const jm={};let ho=null;function T1(e){const t=e.length;let n=3*t/4;n%3?n=Math.floor(n):"=.".indexOf(e[t-1])!=-1&&(n="=.".indexOf(e[t-2])!=-1?n-2:n-1);const i=new Uint8Array(n);let r=0;return function(s,o){function a(l){for(;c<s.length;){const u=s.charAt(c++),h=ho[u];if(h!=null)return h;if(!/^[\s\xa0]*$/.test(u))throw Error("Unknown base64 encoding at char: "+u)}return l}Km();let c=0;for(;;){const l=a(-1),u=a(0),h=a(64),f=a(64);if(f===64&&l===-1)break;o(l<<2|u>>4),h!=64&&(o(u<<4&240|h>>2),f!=64&&o(h<<6&192|f))}}(e,function(s){i[r++]=s}),r!==n?i.subarray(0,r):i}function Km(){if(!ho){ho={};var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),t=["+/=","+/","-_=","-_.","-_"];for(let n=0;n<5;n++){const i=e.concat(t[n].split(""));jm[n]=i;for(let r=0;r<i.length;r++){const s=i[r];ho[s]===void 0&&(ho[s]=r)}}}}var A1=typeof Uint8Array<"u",$m=!(!(b1&&Yl&&Yl.brands.length>0)&&(Af().indexOf("Trident")!=-1||Af().indexOf("MSIE")!=-1))&&typeof btoa=="function";const Rf=/[-_.]/g,w1={"-":"+",_:"/",".":"="};function R1(e){return w1[e]||""}function Jm(e){if(!$m)return T1(e);e=Rf.test(e)?e.replace(Rf,R1):e,e=atob(e);const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}function Ru(e){return A1&&e!=null&&e instanceof Uint8Array}var Rs={};function Vr(){return C1||(C1=new vi(null,Rs))}function Cu(e){Zm(Rs);var t=e.g;return(t=t==null||Ru(t)?t:typeof t=="string"?Jm(t):null)==null?t:e.g=t}var vi=class{h(){return new Uint8Array(Cu(this)||0)}constructor(e,t){if(Zm(t),this.g=e,e!=null&&e.length===0)throw Error("ByteString should be constructed with non-empty values")}};let C1,L1;function Zm(e){if(e!==Rs)throw Error("illegal external caller")}function Qm(e,t){e.__closure__error__context__984382||(e.__closure__error__context__984382={}),e.__closure__error__context__984382.severity=t}function jl(e){return Qm(e=Error(e),"warning"),e}function Cs(e,t){if(e!=null){var n=L1??(L1={}),i=n[e]||0;i>=t||(n[e]=i+1,Qm(e=Error(),"incident"),Ym(e))}}function Vs(){return typeof BigInt=="function"}var Gs=typeof Symbol=="function"&&typeof Symbol()=="symbol";function Mi(e,t,n=!1){return typeof Symbol=="function"&&typeof Symbol()=="symbol"?n&&Symbol.for&&e?Symbol.for(e):e!=null?Symbol(e):Symbol():t}var P1=Mi("jas",void 0,!0),Cf=Mi(void 0,"0di"),oo=Mi(void 0,"1oa"),In=Mi(void 0,Symbol()),I1=Mi(void 0,"0ub"),D1=Mi(void 0,"0ubs"),Kl=Mi(void 0,"0ubsb"),U1=Mi(void 0,"0actk"),Ls=Mi("m_m","Pa",!0),Lf=Mi();const t0={Ga:{value:0,configurable:!0,writable:!0,enumerable:!1}},e0=Object.defineProperties,pt=Gs?P1:"Ga";var Yr;const Pf=[];function Fo(e,t){Gs||pt in e||e0(e,t0),e[pt]|=t}function We(e,t){Gs||pt in e||e0(e,t0),e[pt]=t}function Oo(e){return Fo(e,34),e}function Ro(e){return Fo(e,8192),e}We(Pf,7),Yr=Object.freeze(Pf);var Ps={};function Nn(e,t){return t===void 0?e.h!==Gr&&!!(2&(0|e.v[pt])):!!(2&t)&&e.h!==Gr}const Gr={};function Lu(e,t){if(e!=null){if(typeof e=="string")e=e?new vi(e,Rs):Vr();else if(e.constructor!==vi)if(Ru(e))e=e.length?new vi(new Uint8Array(e),Rs):Vr();else{if(!t)throw Error();e=void 0}}return e}class If{constructor(t,n,i){this.g=t,this.h=n,this.l=i}next(){const t=this.g.next();return t.done||(t.value=this.h.call(this.l,t.value)),t}[Symbol.iterator](){return this}}var N1=Object.freeze({});function n0(e,t,n){const i=128&t?0:-1,r=e.length;var s;(s=!!r)&&(s=(s=e[r-1])!=null&&typeof s=="object"&&s.constructor===Object);const o=r+(s?-1:0);for(t=128&t?1:0;t<o;t++)n(t-i,e[t]);if(s){e=e[r-1];for(const a in e)!isNaN(a)&&n(+a,e[a])}}var i0={};function Ws(e){return 128&e?i0:void 0}function ec(e){return e.Na=!0,e}var F1=ec(e=>typeof e=="number"),Df=ec(e=>typeof e=="string"),O1=ec(e=>typeof e=="boolean"),nc=typeof ws.BigInt=="function"&&typeof ws.BigInt(0)=="bigint";function Dn(e){var t=e;if(Df(t)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(t))throw Error(String(t))}else if(F1(t)&&!Number.isSafeInteger(t))throw Error(String(t));return nc?BigInt(e):e=O1(e)?e?"1":"0":Df(e)?e.trim()||"0":String(e)}var $l=ec(e=>nc?e>=z1&&e<=H1:e[0]==="-"?Uf(e,B1):Uf(e,k1));const B1=Number.MIN_SAFE_INTEGER.toString(),z1=nc?BigInt(Number.MIN_SAFE_INTEGER):void 0,k1=Number.MAX_SAFE_INTEGER.toString(),H1=nc?BigInt(Number.MAX_SAFE_INTEGER):void 0;function Uf(e,t){if(e.length>t.length)return!1;if(e.length<t.length||e===t)return!0;for(let n=0;n<e.length;n++){const i=e[n],r=t[n];if(i>r)return!1;if(i<r)return!0}}const V1=typeof Uint8Array.prototype.slice=="function";let G1,Ee=0,Oe=0;function Nf(e){const t=e>>>0;Ee=t,Oe=(e-t)/4294967296>>>0}function Is(e){if(e<0){Nf(-e);const[t,n]=Du(Ee,Oe);Ee=t>>>0,Oe=n>>>0}else Nf(e)}function Pu(e){const t=G1||(G1=new DataView(new ArrayBuffer(8)));t.setFloat32(0,+e,!0),Oe=0,Ee=t.getUint32(0,!0)}function r0(e,t){const n=4294967296*t+(e>>>0);return Number.isSafeInteger(n)?n:Co(e,t)}function W1(e,t){return Dn(Vs()?BigInt.asUintN(64,(BigInt(t>>>0)<<BigInt(32))+BigInt(e>>>0)):Co(e,t))}function s0(e,t){return Vs()?Dn(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(t))<<BigInt(32))+BigInt.asUintN(32,BigInt(e)))):Dn(Iu(e,t))}function Co(e,t){if(e>>>=0,(t>>>=0)<=2097151)var n=""+(4294967296*t+e);else Vs()?n=""+(BigInt(t)<<BigInt(32)|BigInt(e)):(e=(16777215&e)+6777216*(n=16777215&(e>>>24|t<<8))+6710656*(t=t>>16&65535),n+=8147497*t,t*=2,e>=1e7&&(n+=e/1e7>>>0,e%=1e7),n>=1e7&&(t+=n/1e7>>>0,n%=1e7),n=t+Ff(n)+Ff(e));return n}function Ff(e){return e=String(e),"0000000".slice(e.length)+e}function Iu(e,t){if(2147483648&t)if(Vs())e=""+(BigInt(0|t)<<BigInt(32)|BigInt(e>>>0));else{const[n,i]=Du(e,t);e="-"+Co(n,i)}else e=Co(e,t);return e}function ic(e){if(e.length<16)Is(Number(e));else if(Vs())e=BigInt(e),Ee=Number(e&BigInt(4294967295))>>>0,Oe=Number(e>>BigInt(32)&BigInt(4294967295));else{const t=+(e[0]==="-");Oe=Ee=0;const n=e.length;for(let i=t,r=(n-t)%6+t;r<=n;i=r,r+=6){const s=Number(e.slice(i,r));Oe*=1e6,Ee=1e6*Ee+s,Ee>=4294967296&&(Oe+=Math.trunc(Ee/4294967296),Oe>>>=0,Ee>>>=0)}if(t){const[i,r]=Du(Ee,Oe);Ee=i,Oe=r}}}function Du(e,t){return t=~t,e?e=1+~e:t+=1,[e,t]}function oi(e){return Array.prototype.slice.call(e)}const Bo=typeof BigInt=="function"?BigInt.asIntN:void 0,X1=typeof BigInt=="function"?BigInt.asUintN:void 0,Wr=Number.isSafeInteger,rc=Number.isFinite,Ds=Math.trunc,q1=Dn(0);function fo(e){if(e!=null&&typeof e!="number")throw Error(`Value of float/double field must be a number, found ${typeof e}: ${e}`);return e}function _i(e){return e==null||typeof e=="number"?e:e==="NaN"||e==="Infinity"||e==="-Infinity"?Number(e):void 0}function Lo(e){if(e!=null&&typeof e!="boolean"){var t=typeof e;throw Error(`Expected boolean but got ${t!="object"?t:e?Array.isArray(e)?"array":t:"null"}: ${e}`)}return e}function o0(e){return e==null||typeof e=="boolean"?e:typeof e=="number"?!!e:void 0}const Y1=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function zo(e){switch(typeof e){case"bigint":return!0;case"number":return rc(e);case"string":return Y1.test(e);default:return!1}}function Xs(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return rc(e)?0|e:void 0}function a0(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return rc(e)?e>>>0:void 0}function c0(e){const t=e.length;return(e[0]==="-"?t<20||t===20&&e<="-9223372036854775808":t<19||t===19&&e<="9223372036854775807")?e:(ic(e),Iu(Ee,Oe))}function Uu(e){if(e=Ds(e),!Wr(e)){Is(e);var t=Ee,n=Oe;(e=2147483648&n)&&(n=~n>>>0,(t=1+~t>>>0)==0&&(n=n+1>>>0)),e=typeof(t=r0(t,n))=="number"?e?-t:t:e?"-"+t:t}return e}function l0(e){var t=Ds(Number(e));return Wr(t)?String(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),c0(e))}function u0(e){var t=Ds(Number(e));return Wr(t)?Dn(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),Vs()?Dn(Bo(64,BigInt(e))):Dn(c0(e)))}function h0(e){return Wr(e)?e=Dn(Uu(e)):(e=Ds(e),Wr(e)?e=String(e):(Is(e),e=Iu(Ee,Oe)),e=Dn(e)),e}function Na(e){const t=typeof e;return e==null?e:t==="bigint"?Dn(Bo(64,e)):zo(e)?t==="string"?u0(e):h0(e):void 0}function f0(e){if(typeof e!="string")throw Error();return e}function ko(e){if(e!=null&&typeof e!="string")throw Error();return e}function nn(e){return e==null||typeof e=="string"?e:void 0}function Nu(e,t,n,i){return e!=null&&e[Ls]===Ps?e:Array.isArray(e)?((i=(n=0|e[pt])|32&i|2&i)!==n&&We(e,i),new t(e)):(n?2&i?((e=t[Cf])||(Oo((e=new t).v),e=t[Cf]=e),t=e):t=new t:t=void 0,t)}function j1(e,t,n){if(t)t:{if(!zo(t=e))throw jl("int64");switch(typeof t){case"string":t=u0(t);break t;case"bigint":t=Dn(Bo(64,t));break t;default:t=h0(t)}}else t=Na(e);return(e=t)==null?n?q1:void 0:e}const K1={};let $1=function(){try{return tc(new class extends Map{constructor(){super()}}),!1}catch{return!0}}();class Zc{constructor(){this.g=new Map}get(t){return this.g.get(t)}set(t,n){return this.g.set(t,n),this.size=this.g.size,this}delete(t){return t=this.g.delete(t),this.size=this.g.size,t}clear(){this.g.clear(),this.size=this.g.size}has(t){return this.g.has(t)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(t,n){return this.g.forEach(t,n)}[Symbol.iterator](){return this.entries()}}const J1=$1?(Object.setPrototypeOf(Zc.prototype,Map.prototype),Object.defineProperties(Zc.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),Zc):class extends Map{constructor(){super()}};function Of(e){return e}function Qc(e){if(2&e.J)throw Error("Cannot mutate an immutable Map")}var Hi=class extends J1{constructor(e,t,n=Of,i=Of){super(),this.J=0|e[pt],this.K=t,this.S=n,this.fa=this.K?Z1:i;for(let r=0;r<e.length;r++){const s=e[r],o=n(s[0],!1,!0);let a=s[1];t?a===void 0&&(a=null):a=i(s[1],!1,!0,void 0,void 0,this.J),super.set(o,a)}}V(e){return Ro(Array.from(super.entries(),e))}clear(){Qc(this),super.clear()}delete(e){return Qc(this),super.delete(this.S(e,!0,!1))}entries(){if(this.K){var e=super.keys();e=new If(e,Q1,this)}else e=super.entries();return e}values(){if(this.K){var e=super.keys();e=new If(e,Hi.prototype.get,this)}else e=super.values();return e}forEach(e,t){this.K?super.forEach((n,i,r)=>{e.call(t,r.get(i),i,r)}):super.forEach(e,t)}set(e,t){return Qc(this),(e=this.S(e,!0,!1))==null?this:t==null?(super.delete(e),this):super.set(e,this.fa(t,!0,!0,this.K,!1,this.J))}Ma(e){const t=this.S(e[0],!1,!0);e=e[1],e=this.K?e===void 0?null:e:this.fa(e,!1,!0,void 0,!1,this.J),super.set(t,e)}has(e){return super.has(this.S(e,!1,!1))}get(e){e=this.S(e,!1,!1);const t=super.get(e);if(t!==void 0){var n=this.K;return n?((n=this.fa(t,!1,!0,n,this.ra,this.J))!==t&&super.set(e,n),n):t}}[Symbol.iterator](){return this.entries()}};function Z1(e,t,n,i,r,s){return e=Nu(e,i,n,s),r&&(e=Ou(e)),e}function Q1(e){return[e,this.get(e)]}let t2;function Bf(){return t2||(t2=new Hi(Oo([]),void 0,void 0,void 0,K1))}function sc(e){return In?e[In]:void 0}function Fa(e,t){for(const n in e)!isNaN(n)&&t(e,+n,e[n])}Hi.prototype.toJSON=void 0;var Jl=class{};const e2={Ka:!0};function n2(e,t){t<100||Cs(D1,1)}function oc(e,t,n,i){const r=i!==void 0;i=!!i;var s,o=In;!r&&Gs&&o&&(s=e[o])&&Fa(s,n2),o=[];var a=e.length;let c;s=4294967295;let l=!1;const u=!!(64&t),h=u?128&t?0:-1:void 0;1&t||(c=a&&e[a-1],c!=null&&typeof c=="object"&&c.constructor===Object?s=--a:c=void 0,!u||128&t||r||(l=!0,s=s-h+h)),t=void 0;for(var f=0;f<a;f++){let p=e[f];if(p!=null&&(p=n(p,i))!=null)if(u&&f>=s){const g=f-h;(t??(t={}))[g]=p}else o[f]=p}if(c)for(let p in c){if((a=c[p])==null||(a=n(a,i))==null)continue;let g;f=+p,u&&!Number.isNaN(f)&&(g=f+h)<s?o[g]=a:(t??(t={}))[p]=a}return t&&(l?o.push(t):o[s]=t),r&&In&&(e=sc(e))&&e instanceof Jl&&(o[In]=function(p){const g=new Jl;return Fa(p,(_,m,d)=>{g[m]=oi(d)}),g.da=p.da,g}(e)),o}function i2(e){return e[0]=Po(e[0]),e[1]=Po(e[1]),e}function Po(e){switch(typeof e){case"number":return Number.isFinite(e)?e:""+e;case"bigint":return $l(e)?Number(e):""+e;case"boolean":return e?1:0;case"object":if(Array.isArray(e)){var t=0|e[pt];return e.length===0&&1&t?void 0:oc(e,t,Po)}if(e!=null&&e[Ls]===Ps)return d0(e);if(e instanceof vi){if((t=e.g)==null)e="";else if(typeof t=="string")e=t;else{if($m){for(var n="",i=0,r=t.length-10240;i<r;)n+=String.fromCharCode.apply(null,t.subarray(i,i+=10240));n+=String.fromCharCode.apply(null,i?t.subarray(i):t),t=btoa(n)}else{n===void 0&&(n=0),Km(),n=jm[n],i=Array(Math.floor(t.length/3)),r=n[64]||"";let l=0,u=0;for(;l<t.length-2;l+=3){var s=t[l],o=t[l+1],a=t[l+2],c=n[s>>2];s=n[(3&s)<<4|o>>4],o=n[(15&o)<<2|a>>6],a=n[63&a],i[u++]=c+s+o+a}switch(c=0,a=r,t.length-l){case 2:a=n[(15&(c=t[l+1]))<<2]||r;case 1:t=t[l],i[u]=n[t>>2]+n[(3&t)<<4|c>>4]+a+r}t=i.join("")}e=e.g=t}return e}return e instanceof Hi?e=e.size!==0?e.V(i2):void 0:void 0}return e}let r2,s2;function d0(e){return oc(e=e.v,0|e[pt],Po)}function Ir(e,t){return p0(e,t[0],t[1])}function p0(e,t,n,i=0){if(e==null){var r=32;n?(e=[n],r|=128):e=[],t&&(r=-16760833&r|(1023&t)<<14)}else{if(!Array.isArray(e))throw Error("narr");if(r=0|e[pt],Tf&&1&r)throw Error("rfarr");if(2048&r&&!(2&r)&&function(){if(Tf)throw Error("carr");Cs(U1,5)}(),256&r)throw Error("farr");if(64&r)return(r|i)!==r&&We(e,r|i),e;if(n&&(r|=128,n!==e[0]))throw Error("mid");t:{r|=64;var s=(n=e).length;if(s){var o=s-1;const c=n[o];if(c!=null&&typeof c=="object"&&c.constructor===Object){if((o-=t=128&r?0:-1)>=1024)throw Error("pvtlmt");for(var a in c)(s=+a)<o&&(n[s+t]=c[a],delete c[a]);r=-16760833&r|(1023&o)<<14;break t}}if(t){if((a=Math.max(t,s-(128&r?0:-1)))>1024)throw Error("spvt");r=-16760833&r|(1023&a)<<14}}}return We(e,64|r|i),e}function o2(e,t){if(typeof e!="object")return e;if(Array.isArray(e)){var n=0|e[pt];return e.length===0&&1&n?void 0:zf(e,n,t)}if(e!=null&&e[Ls]===Ps)return kf(e);if(e instanceof Hi){if(2&(t=e.J))return e;if(!e.size)return;if(n=Oo(e.V()),e.K)for(e=0;e<n.length;e++){const i=n[e];let r=i[1];r=r==null||typeof r!="object"?void 0:r!=null&&r[Ls]===Ps?kf(r):Array.isArray(r)?zf(r,0|r[pt],!!(32&t)):void 0,i[1]=r}return n}return e instanceof vi?e:void 0}function zf(e,t,n){return 2&t||(!n||4096&t||16&t?e=qs(e,t,!1,n&&!(16&t)):(Fo(e,34),4&t&&Object.freeze(e))),e}function Fu(e,t,n){return e=new e.constructor(t),n&&(e.h=Gr),e.m=Gr,e}function kf(e){const t=e.v,n=0|t[pt];return Nn(e,n)?e:Bu(e,t,n)?Fu(e,t):qs(t,n)}function qs(e,t,n,i){return i??(i=!!(34&t)),e=oc(e,t,o2,i),i=32,n&&(i|=2),We(e,t=16769217&t|i),e}function Ou(e){const t=e.v,n=0|t[pt];return Nn(e,n)?Bu(e,t,n)?Fu(e,t,!0):new e.constructor(qs(t,n,!1)):e}function Ys(e){if(e.h!==Gr)return!1;var t=e.v;return Fo(t=qs(t,0|t[pt]),2048),e.v=t,e.h=void 0,e.m=void 0,!0}function js(e){if(!Ys(e)&&Nn(e,0|e.v[pt]))throw Error()}function jr(e,t){t===void 0&&(t=0|e[pt]),32&t&&!(4096&t)&&We(e,4096|t)}function Bu(e,t,n){return!!(2&n)||!(!(32&n)||4096&n)&&(We(t,2|n),e.h=Gr,!0)}const m0=Dn(0),qi={};function be(e,t,n,i,r){if((t=Vi(e.v,t,n,r))!==null||i&&e.m!==Gr)return t}function Vi(e,t,n,i){if(t===-1)return null;const r=t+(n?0:-1),s=e.length-1;let o,a;if(!(s<1+(n?0:-1))){if(r>=s)if(o=e[s],o!=null&&typeof o=="object"&&o.constructor===Object)n=o[t],a=!0;else{if(r!==s)return;n=o}else n=e[r];if(i&&n!=null){if((i=i(n))==null)return i;if(!Object.is(i,n))return a?o[t]=i:e[r]=i,i}return n}}function re(e,t,n,i){js(e),Ve(e=e.v,0|e[pt],t,n,i)}function Ve(e,t,n,i,r){const s=n+(r?0:-1);var o=e.length-1;if(o>=1+(r?0:-1)&&s>=o){const a=e[o];if(a!=null&&typeof a=="object"&&a.constructor===Object)return a[n]=i,t}return s<=o?(e[s]=i,t):(i!==void 0&&(n>=(o=(t??(t=0|e[pt]))>>14&1023||536870912)?i!=null&&(e[o+(r?0:-1)]={[n]:i}):e[s]=i),t)}function wr(){return N1===void 0?2:4}function Rr(e,t,n,i,r){let s=e.v,o=0|s[pt];i=Nn(e,o)?1:i,r=!!r||i===3,i===2&&Ys(e)&&(s=e.v,o=0|s[pt]);let a=(e=zu(s,t))===Yr?7:0|e[pt],c=ku(a,o);var l=!(4&c);if(l){4&c&&(e=oi(e),a=0,c=Ur(c,o),o=Ve(s,o,t,e));let u=0,h=0;for(;u<e.length;u++){const f=n(e[u]);f!=null&&(e[h++]=f)}h<u&&(e.length=h),n=-513&(4|c),c=n&=-1025,c&=-4097}return c!==a&&(We(e,c),2&c&&Object.freeze(e)),g0(e,c,s,o,t,i,l,r)}function g0(e,t,n,i,r,s,o,a){let c=t;return s===1||s===4&&(2&t||!(16&t)&&32&i)?Dr(t)||((t|=!e.length||o&&!(4096&t)||32&i&&!(4096&t||16&t)?2:256)!==c&&We(e,t),Object.freeze(e)):(s===2&&Dr(t)&&(e=oi(e),c=0,t=Ur(t,i),i=Ve(n,i,r,e)),Dr(t)||(a||(t|=16),t!==c&&We(e,t))),2&t||!(4096&t||16&t)||jr(n,i),e}function zu(e,t,n){return e=Vi(e,t,n),Array.isArray(e)?e:Yr}function ku(e,t){return 2&t&&(e|=2),1|e}function Dr(e){return!!(2&e)&&!!(4&e)||!!(256&e)}function _0(e){return Lu(e,!0)}function v0(e){e=oi(e);for(let t=0;t<e.length;t++){const n=e[t]=oi(e[t]);Array.isArray(n[1])&&(n[1]=Oo(n[1]))}return Ro(e)}function Qi(e,t,n,i){js(e),Ve(e=e.v,0|e[pt],t,(i==="0"?Number(n)===0:n===i)?void 0:n)}function Ks(e,t,n){if(2&t)throw Error();const i=Ws(t);let r=zu(e,n,i),s=r===Yr?7:0|r[pt],o=ku(s,t);return(2&o||Dr(o)||16&o)&&(o===s||Dr(o)||We(r,o),r=oi(r),s=0,o=Ur(o,t),Ve(e,t,n,r,i)),o&=-13,o!==s&&We(r,o),r}function tl(e,t){var n=lg;return Vu(Hu(e=e.v),e,void 0,n)===t?t:-1}function Hu(e){if(Gs)return e[oo]??(e[oo]=new Map);if(oo in e)return e[oo];const t=new Map;return Object.defineProperty(e,oo,{value:t}),t}function x0(e,t,n,i,r){const s=Hu(e),o=Vu(s,e,t,n,r);return o!==i&&(o&&(t=Ve(e,t,o,void 0,r)),s.set(n,i)),t}function Vu(e,t,n,i,r){let s=e.get(i);if(s!=null)return s;s=0;for(let o=0;o<i.length;o++){const a=i[o];Vi(t,a,r)!=null&&(s!==0&&(n=Ve(t,n,s,void 0,r)),s=a)}return e.set(i,s),s}function Gu(e,t,n){let i=0|e[pt];const r=Ws(i),s=Vi(e,n,r);let o;if(s!=null&&s[Ls]===Ps){if(!Nn(s))return Ys(s),s.v;o=s.v}else Array.isArray(s)&&(o=s);if(o){const a=0|o[pt];2&a&&(o=qs(o,a))}return o=Ir(o,t),o!==s&&Ve(e,i,n,o,r),o}function y0(e,t,n,i,r){let s=!1;if((i=Vi(e,i,r,o=>{const a=Nu(o,n,!1,t);return s=a!==o&&a!=null,a}))!=null)return s&&!Nn(i)&&jr(e,t),i}function Qt(e,t,n,i){let r=e.v,s=0|r[pt];if((t=y0(r,s,t,n,i))==null)return t;if(s=0|r[pt],!Nn(e,s)){const o=Ou(t);o!==t&&(Ys(e)&&(r=e.v,s=0|r[pt]),s=Ve(r,s,n,t=o,i),jr(r,s))}return t}function M0(e,t,n,i,r,s,o,a){var c=Nn(e,n);s=c?1:s,o=!!o||s===3,c=a&&!c,(s===2||c)&&Ys(e)&&(n=0|(t=e.v)[pt]);var l=(e=zu(t,r))===Yr?7:0|e[pt],u=ku(l,n);if(a=!(4&u)){var h=e,f=n;const p=!!(2&u);p&&(f|=2);let g=!p,_=!0,m=0,d=0;for(;m<h.length;m++){const y=Nu(h[m],i,!1,f);if(y instanceof i){if(!p){const v=Nn(y);g&&(g=!v),_&&(_=v)}h[d++]=y}}d<m&&(h.length=d),u|=4,u=_?-4097&u:4096|u,u=g?8|u:-9&u}if(u!==l&&(We(e,u),2&u&&Object.freeze(e)),c&&!(8&u||!e.length&&(s===1||s===4&&(2&u||!(16&u)&&32&n)))){for(Dr(u)&&(e=oi(e),u=Ur(u,n),n=Ve(t,n,r,e)),i=e,c=u,l=0;l<i.length;l++)(h=i[l])!==(u=Ou(h))&&(i[l]=u);c|=8,We(e,u=c=i.length?4096|c:-4097&c)}return g0(e,u,t,n,r,s,a,o)}function Gi(e,t,n){const i=e.v;return M0(e,i,0|i[pt],t,n,wr(),!1,!0)}function S0(e){return e==null&&(e=void 0),e}function bt(e,t,n,i,r){return re(e,n,i=S0(i),r),i&&!Nn(i)&&jr(e.v),e}function _o(e,t,n,i){t:{var r=i=S0(i);js(e);const s=e.v;let o=0|s[pt];if(r==null){const a=Hu(s);if(Vu(a,s,o,n)!==t)break t;a.set(n,0)}else o=x0(s,o,n,t);Ve(s,o,t,r)}i&&!Nn(i)&&jr(e.v)}function Ur(e,t){return-273&(2&t?2|e:-3&e)}function Wu(e,t,n,i){var r=i;js(e),e=M0(e,i=e.v,0|i[pt],n,t,2,!0),r=r??new n,e.push(r),t=n=e===Yr?7:0|e[pt],(r=Nn(r))?(n&=-9,e.length===1&&(n&=-4097)):n|=4096,n!==t&&We(e,n),r||jr(i)}function Kn(e,t,n){return Xs(be(e,t,void 0,n))}function De(e,t){return be(e,t,void 0,void 0,_i)??0}function Wi(e,t,n){if(n!=null){if(typeof n!="number"||!rc(n))throw jl("int32");n|=0}re(e,t,n)}function yt(e,t,n){re(e,t,fo(n))}function Fn(e,t,n){Qi(e,t,ko(n),"")}function Oa(e,t,n){{js(e);const o=e.v;let a=0|o[pt];if(n==null)Ve(o,a,t);else{var i=e=n===Yr?7:0|n[pt],r=Dr(e),s=r||Object.isFrozen(n);for(r||(e=0),s||(n=oi(n),i=0,e=Ur(e,a),s=!1),e|=5,e|=(4&e?512&e?512:1024&e?1024:0:void 0)??1024,r=0;r<n.length;r++){const c=n[r],l=f0(c);Object.is(c,l)||(s&&(n=oi(n),i=0,e=Ur(e,a),s=!1),n[r]=l)}e!==i&&(s&&(n=oi(n),e=Ur(e,a)),We(n,e)),Ve(o,a,t,n)}}}function ac(e,t,n){js(e),Rr(e,t,nn,2,!0).push(f0(n))}var Zr=class{constructor(e,t,n){if(this.buffer=e,n&&!t)throw Error();this.g=t}};function Xu(e,t){if(typeof e=="string")return new Zr(Jm(e),t);if(Array.isArray(e))return new Zr(new Uint8Array(e),t);if(e.constructor===Uint8Array)return new Zr(e,!1);if(e.constructor===ArrayBuffer)return e=new Uint8Array(e),new Zr(e,!1);if(e.constructor===vi)return t=Cu(e)||new Uint8Array(0),new Zr(t,!0,e);if(e instanceof Uint8Array)return e=e.constructor===Uint8Array?e:new Uint8Array(e.buffer,e.byteOffset,e.byteLength),new Zr(e,!1);throw Error()}function qu(e,t){let n,i=0,r=0,s=0;const o=e.h;let a=e.g;do n=o[a++],i|=(127&n)<<s,s+=7;while(s<32&&128&n);if(s>32)for(r|=(127&n)>>4,s=3;s<32&&128&n;s+=7)n=o[a++],r|=(127&n)<<s;if(Nr(e,a),!(128&n))return t(i>>>0,r>>>0);throw Error()}function Yu(e){let t=0,n=e.g;const i=n+10,r=e.h;for(;n<i;){const s=r[n++];if(t|=s,(128&s)==0)return Nr(e,n),!!(127&t)}throw Error()}function fr(e){const t=e.h;let n=e.g,i=t[n++],r=127&i;if(128&i&&(i=t[n++],r|=(127&i)<<7,128&i&&(i=t[n++],r|=(127&i)<<14,128&i&&(i=t[n++],r|=(127&i)<<21,128&i&&(i=t[n++],r|=i<<28,128&i&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++])))))throw Error();return Nr(e,n),r}function yi(e){return fr(e)>>>0}function Ba(e){var t=e.h;const n=e.g;var i=t[n],r=t[n+1];const s=t[n+2];return t=t[n+3],Nr(e,e.g+4),e=2*((r=(i<<0|r<<8|s<<16|t<<24)>>>0)>>31)+1,i=r>>>23&255,r&=8388607,i==255?r?NaN:e*(1/0):i==0?1401298464324817e-60*e*r:e*Math.pow(2,i-150)*(r+8388608)}function a2(e){return fr(e)}function Nr(e,t){if(e.g=t,t>e.l)throw Error()}function E0(e,t){if(t<0)throw Error();const n=e.g;if((t=n+t)>e.l)throw Error();return e.g=t,n}function b0(e,t){if(t==0)return Vr();var n=E0(e,t);return e.Y&&e.j?n=e.h.subarray(n,n+t):(e=e.h,n=n===(t=n+t)?new Uint8Array(0):V1?e.slice(n,t):new Uint8Array(e.subarray(n,t))),n.length==0?Vr():new vi(n,Rs)}var Hf=[];function T0(e,t,n,i){if(za.length){const r=za.pop();return r.o(i),r.g.init(e,t,n,i),r}return new c2(e,t,n,i)}function A0(e){e.g.clear(),e.l=-1,e.h=-1,za.length<100&&za.push(e)}function w0(e){var t=e.g;if(t.g==t.l)return!1;e.m=e.g.g;var n=yi(e.g);if(t=n>>>3,!((n&=7)>=0&&n<=5)||t<1)throw Error();return e.l=t,e.h=n,!0}function wa(e){switch(e.h){case 0:e.h!=0?wa(e):Yu(e.g);break;case 1:Nr(e=e.g,e.g+8);break;case 2:if(e.h!=2)wa(e);else{var t=yi(e.g);Nr(e=e.g,e.g+t)}break;case 5:Nr(e=e.g,e.g+4);break;case 3:for(t=e.l;;){if(!w0(e))throw Error();if(e.h==4){if(e.l!=t)throw Error();break}wa(e)}break;default:throw Error()}}function Ho(e,t,n){const i=e.g.l;var r=yi(e.g);let s=(r=e.g.g+r)-i;if(s<=0&&(e.g.l=r,n(t,e,void 0,void 0,void 0),s=r-e.g.g),s)throw Error();return e.g.g=r,e.g.l=i,t}function ju(e){var t=yi(e.g),n=E0(e=e.g,t);if(e=e.h,M1){var i,r=e;(i=Jc)||(i=Jc=new TextDecoder("utf-8",{fatal:!0})),t=n+t,r=n===0&&t===r.length?r:r.subarray(n,t);try{var s=i.decode(r)}catch(a){if($o===void 0){try{i.decode(new Uint8Array([128]))}catch{}try{i.decode(new Uint8Array([97])),$o=!0}catch{$o=!1}}throw!$o&&(Jc=void 0),a}}else{t=(s=n)+t,n=[];let a,c=null;for(;s<t;){var o=e[s++];o<128?n.push(o):o<224?s>=t?vr():(a=e[s++],o<194||(192&a)!=128?(s--,vr()):n.push((31&o)<<6|63&a)):o<240?s>=t-1?vr():(a=e[s++],(192&a)!=128||o===224&&a<160||o===237&&a>=160||(192&(i=e[s++]))!=128?(s--,vr()):n.push((15&o)<<12|(63&a)<<6|63&i)):o<=244?s>=t-2?vr():(a=e[s++],(192&a)!=128||a-144+(o<<28)>>30||(192&(i=e[s++]))!=128||(192&(r=e[s++]))!=128?(s--,vr()):(o=(7&o)<<18|(63&a)<<12|(63&i)<<6|63&r,o-=65536,n.push(55296+(o>>10&1023),56320+(1023&o)))):vr(),n.length>=8192&&(c=bf(c,n),n.length=0)}s=bf(c,n)}return s}function R0(e){const t=yi(e.g);return b0(e.g,t)}function cc(e,t,n){var i=yi(e.g);for(i=e.g.g+i;e.g.g<i;)n.push(t(e.g))}var c2=class{constructor(e,t,n,i){if(Hf.length){const r=Hf.pop();r.init(e,t,n,i),e=r}else e=new class{constructor(r,s,o,a){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.init(r,s,o,a)}init(r,s,o,{Y:a=!1,ea:c=!1}={}){this.Y=a,this.ea=c,r&&(r=Xu(r,this.ea),this.h=r.buffer,this.j=r.g,this.m=s||0,this.l=o!==void 0?this.m+o:this.h.length,this.g=this.m)}clear(){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.Y=!1}}(e,t,n,i);this.g=e,this.m=this.g.g,this.h=this.l=-1,this.o(i)}o({ha:e=!1}={}){this.ha=e}},za=[];function Vf(e){return e?/^\d+$/.test(e)?(ic(e),new Zl(Ee,Oe)):null:l2||(l2=new Zl(0,0))}var Zl=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let l2;function Gf(e){return e?/^-?\d+$/.test(e)?(ic(e),new Ql(Ee,Oe)):null:u2||(u2=new Ql(0,0))}var Ql=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let u2;function Ss(e,t,n){for(;n>0||t>127;)e.g.push(127&t|128),t=(t>>>7|n<<25)>>>0,n>>>=7;e.g.push(t)}function $s(e,t){for(;t>127;)e.g.push(127&t|128),t>>>=7;e.g.push(t)}function lc(e,t){if(t>=0)$s(e,t);else{for(let n=0;n<9;n++)e.g.push(127&t|128),t>>=7;e.g.push(1)}}function Ku(e){var t=Ee;e.g.push(t>>>0&255),e.g.push(t>>>8&255),e.g.push(t>>>16&255),e.g.push(t>>>24&255)}function Us(e,t){t.length!==0&&(e.l.push(t),e.h+=t.length)}function $n(e,t,n){$s(e.g,8*t+n)}function $u(e,t){return $n(e,t,2),t=e.g.end(),Us(e,t),t.push(e.h),t}function Ju(e,t){var n=t.pop();for(n=e.h+e.g.length()-n;n>127;)t.push(127&n|128),n>>>=7,e.h++;t.push(n),e.h++}function uc(e,t,n){$n(e,t,2),$s(e.g,n.length),Us(e,e.g.end()),Us(e,n)}function ka(e,t,n,i){n!=null&&(t=$u(e,t),i(n,e),Ju(e,t))}function Si(){const e=class{constructor(){throw Error()}};return Object.setPrototypeOf(e,e.prototype),e}var Zu=Si(),C0=Si(),Qu=Si(),th=Si(),eh=Si(),L0=Si(),h2=Si(),hc=Si(),P0=Si(),I0=Si();function Ei(e,t,n){var i=e.v;In&&In in i&&(i=i[In])&&delete i[t.g],t.h?t.j(e,t.h,t.g,n,t.l):t.j(e,t.g,n,t.l)}var mt=class{constructor(e,t){this.v=p0(e,t,void 0,2048)}toJSON(){return d0(this)}j(){var r;var e=q2,t=this.v,n=e.g,i=In;if(Gs&&i&&((r=t[i])==null?void 0:r[n])!=null&&Cs(I1,3),t=e.g,Lf&&In&&Lf===void 0&&(i=(n=this.v)[In])&&(i=i.da))try{i(n,t,e2)}catch(s){Ym(s)}return e.h?e.m(this,e.h,e.g,e.l):e.m(this,e.g,e.defaultValue,e.l)}clone(){const e=this.v,t=0|e[pt];return Bu(this,e,t)?Fu(this,e,!0):new this.constructor(qs(e,t,!1))}};mt.prototype[Ls]=Ps,mt.prototype.toString=function(){return this.v.toString()};var Js=class{constructor(e,t,n){this.g=e,this.h=t,e=Zu,this.l=!!e&&n===e||!1}};function fc(e,t){return new Js(e,t,Zu)}function D0(e,t,n,i,r){ka(e,n,O0(t,i),r)}const f2=fc(function(e,t,n,i,r){return e.h===2&&(Ho(e,Gu(t,i,n),r),!0)},D0),d2=fc(function(e,t,n,i,r){return e.h===2&&(Ho(e,Gu(t,i,n),r),!0)},D0);var dc=Symbol(),pc=Symbol(),tu=Symbol(),Wf=Symbol(),Xf=Symbol();let U0,N0;function Kr(e,t,n,i){var r=i[e];if(r)return r;(r={}).qa=i,r.T=function(h){switch(typeof h){case"boolean":return r2||(r2=[0,void 0,!0]);case"number":return h>0?void 0:h===0?s2||(s2=[0,void 0]):[-h,void 0];case"string":return[0,h];case"object":return h}}(i[0]);var s=i[1];let o=1;s&&s.constructor===Object&&(r.ba=s,typeof(s=i[++o])=="function"&&(r.ma=!0,U0??(U0=s),N0??(N0=i[o+1]),s=i[o+=2]));const a={};for(;s&&Array.isArray(s)&&s.length&&typeof s[0]=="number"&&s[0]>0;){for(var c=0;c<s.length;c++)a[s[c]]=s;s=i[++o]}for(c=1;s!==void 0;){let h;typeof s=="number"&&(c+=s,s=i[++o]);var l=void 0;if(s instanceof Js?h=s:(h=f2,o--),h==null?void 0:h.l){s=i[++o],l=i;var u=o;typeof s=="function"&&(s=s(),l[u]=s),l=s}for(u=c+1,typeof(s=i[++o])=="number"&&s<0&&(u-=s,s=i[++o]);c<u;c++){const f=a[c];l?n(r,c,h,l,f):t(r,c,h,f)}}return i[e]=r}function F0(e){return Array.isArray(e)?e[0]instanceof Js?e:[d2,e]:[e,void 0]}function O0(e,t){return e instanceof mt?e.v:Array.isArray(e)?Ir(e,t):void 0}function nh(e,t,n,i){const r=n.g;e[t]=i?(s,o,a)=>r(s,o,a,i):r}function ih(e,t,n,i,r){const s=n.g;let o,a;e[t]=(c,l,u)=>s(c,l,u,a||(a=Kr(pc,nh,ih,i).T),o||(o=rh(i)),r)}function rh(e){let t=e[tu];if(t!=null)return t;const n=Kr(pc,nh,ih,e);return t=n.ma?(i,r)=>U0(i,r,n):(i,r)=>{for(;w0(r)&&r.h!=4;){var s=r.l,o=n[s];if(o==null){var a=n.ba;a&&(a=a[s])&&(a=m2(a))!=null&&(o=n[s]=a)}if(o==null||!o(r,i,s)){if(o=(a=r).m,wa(a),a.ha)var c=void 0;else c=a.g.g-o,a.g.g=o,c=b0(a.g,c);o=void 0,a=i,c&&((o=a[In]??(a[In]=new Jl))[s]??(o[s]=[])).push(c)}}return(i=sc(i))&&(i.da=n.qa[Xf]),!0},e[tu]=t,e[Xf]=p2.bind(e),t}function p2(e,t,n,i){var r=this[pc];const s=this[tu],o=Ir(void 0,r.T),a=sc(e);if(a){var c=!1,l=r.ba;if(l){if(r=(u,h,f)=>{if(f.length!==0)if(l[h])for(const p of f){u=T0(p);try{c=!0,s(o,u)}finally{A0(u)}}else i==null||i(e,h,f)},t==null)Fa(a,r);else if(a!=null){const u=a[t];u&&r(a,t,u)}if(c){let u=0|e[pt];if(2&u&&2048&u&&!(n!=null&&n.Ka))throw Error();const h=Ws(u),f=(p,g)=>{if(Vi(e,p,h)!=null){if((n==null?void 0:n.Qa)===1)return;throw Error()}g!=null&&(u=Ve(e,u,p,g,h)),delete a[p]};t==null?n0(o,0|o[pt],(p,g)=>{f(p,g)}):f(t,Vi(o,t,h))}}}}function m2(e){const t=(e=F0(e))[0].g;if(e=e[1]){const n=rh(e),i=Kr(pc,nh,ih,e).T;return(r,s,o)=>t(r,s,o,i,n)}return t}function mc(e,t,n){e[t]=n.h}function gc(e,t,n,i){let r,s;const o=n.h;e[t]=(a,c,l)=>o(a,c,l,s||(s=Kr(dc,mc,gc,i).T),r||(r=B0(i)))}function B0(e){let t=e[Wf];if(!t){const n=Kr(dc,mc,gc,e);t=(i,r)=>z0(i,r,n),e[Wf]=t}return t}function z0(e,t,n){n0(e,0|e[pt],(i,r)=>{if(r!=null){var s=function(o,a){var c=o[a];if(c)return c;if((c=o.ba)&&(c=c[a])){var l=(c=F0(c))[0].h;if(c=c[1]){const u=B0(c),h=Kr(dc,mc,gc,c).T;c=o.ma?N0(h,u):(f,p,g)=>l(f,p,g,h,u)}else c=l;return o[a]=c}}(n,i);s?s(t,r,i):i<500||Cs(Kl,3)}}),(e=sc(e))&&Fa(e,(i,r,s)=>{for(Us(t,t.g.end()),i=0;i<s.length;i++)Us(t,Cu(s[i])||new Uint8Array(0))})}const g2=Dn(0);function Zs(e,t){if(Array.isArray(t)){var n=0|t[pt];if(4&n)return t;for(var i=0,r=0;i<t.length;i++){const s=e(t[i]);s!=null&&(t[r++]=s)}return r<i&&(t.length=r),(e=-1537&(5|n))!==n&&We(t,e),2&e&&Object.freeze(t),t}}function hn(e,t,n){return new Js(e,t,n)}function Qs(e,t,n){return new Js(e,t,n)}function fn(e,t,n){Ve(e,0|e[pt],t,n,Ws(0|e[pt]))}var _2=fc(function(e,t,n,i,r){if(e.h!==2)return!1;if(e=oi(e=Ho(e,Ir([void 0,void 0],i),r)),r=Ws(i=0|t[pt]),2&i)throw Error();let s=Vi(t,n,r);if(s instanceof Hi)2&s.J?(s=s.V(),s.push(e),Ve(t,i,n,s,r)):s.Ma(e);else if(Array.isArray(s)){var o=0|s[pt];8192&o||We(s,o|=8192),2&o&&(s=v0(s),Ve(t,i,n,s,r)),s.push(e)}else Ve(t,i,n,Ro([e]),r);return!0},function(e,t,n,i,r){if(t instanceof Hi)t.forEach((s,o)=>{ka(e,n,Ir([o,s],i),r)});else if(Array.isArray(t)){for(let s=0;s<t.length;s++){const o=t[s];Array.isArray(o)&&ka(e,n,Ir(o,i),r)}Ro(t)}});function k0(e,t,n){(t=_i(t))!=null&&($n(e,n,5),e=e.g,Pu(t),Ku(e))}function H0(e,t,n){if(t=function(i){if(i==null)return i;const r=typeof i;if(r==="bigint")return String(Bo(64,i));if(zo(i)){if(r==="string")return l0(i);if(r==="number")return Uu(i)}}(t),t!=null&&(typeof t=="string"&&Gf(t),t!=null))switch($n(e,n,0),typeof t){case"number":e=e.g,Is(t),Ss(e,Ee,Oe);break;case"bigint":n=BigInt.asUintN(64,t),n=new Ql(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),Ss(e.g,n.h,n.g);break;default:n=Gf(t),Ss(e.g,n.h,n.g)}}function V0(e,t,n){(t=Xs(t))!=null&&t!=null&&($n(e,n,0),lc(e.g,t))}function G0(e,t,n){(t=o0(t))!=null&&($n(e,n,0),e.g.g.push(t?1:0))}function W0(e,t,n){(t=nn(t))!=null&&uc(e,n,qm(t))}function X0(e,t,n,i,r){ka(e,n,O0(t,i),r)}function q0(e,t,n){(t=t==null||typeof t=="string"||t instanceof vi?t:void 0)!=null&&uc(e,n,Xu(t,!0).buffer)}function Y0(e,t,n){(t=a0(t))!=null&&t!=null&&($n(e,n,0),$s(e.g,t))}function j0(e,t,n){return(e.h===5||e.h===2)&&(t=Ks(t,0|t[pt],n),e.h==2?cc(e,Ba,t):t.push(Ba(e.g)),!0)}var Be=hn(function(e,t,n){return e.h===5&&(fn(t,n,Ba(e.g)),!0)},k0,hc),v2=Qs(j0,function(e,t,n){if((t=Zs(_i,t))!=null)for(let o=0;o<t.length;o++){var i=e,r=n,s=t[o];s!=null&&($n(i,r,5),i=i.g,Pu(s),Ku(i))}},hc),sh=Qs(j0,function(e,t,n){if((t=Zs(_i,t))!=null&&t.length){$n(e,n,2),$s(e.g,4*t.length);for(let i=0;i<t.length;i++)n=e.g,Pu(t[i]),Ku(n)}},hc),x2=hn(function(e,t,n){return e.h===5&&(fn(t,n,(e=Ba(e.g))===0?void 0:e),!0)},k0,hc),dr=hn(function(e,t,n){return e.h!==0?e=!1:(fn(t,n,qu(e.g,s0)),e=!0),e},H0,L0),el=hn(function(e,t,n){return e.h!==0?t=!1:(fn(t,n,(e=qu(e.g,s0))===g2?void 0:e),t=!0),t},H0,L0),y2=hn(function(e,t,n){return e.h!==0?e=!1:(fn(t,n,qu(e.g,W1)),e=!0),e},function(e,t,n){if(t=function(i){if(i==null)return i;var r=typeof i;if(r==="bigint")return String(X1(64,i));if(zo(i)){if(r==="string")return r=Ds(Number(i)),Wr(r)&&r>=0?i=String(r):((r=i.indexOf("."))!==-1&&(i=i.substring(0,r)),(r=i[0]!=="-"&&((r=i.length)<20||r===20&&i<="18446744073709551615"))||(ic(i),i=Co(Ee,Oe))),i;if(r==="number")return(i=Ds(i))>=0&&Wr(i)||(Is(i),i=r0(Ee,Oe)),i}}(t),t!=null&&(typeof t=="string"&&Vf(t),t!=null))switch($n(e,n,0),typeof t){case"number":e=e.g,Is(t),Ss(e,Ee,Oe);break;case"bigint":n=BigInt.asUintN(64,t),n=new Zl(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),Ss(e.g,n.h,n.g);break;default:n=Vf(t),Ss(e.g,n.h,n.g)}},h2),He=hn(function(e,t,n){return e.h===0&&(fn(t,n,fr(e.g)),!0)},V0,th),Vo=Qs(function(e,t,n){return(e.h===0||e.h===2)&&(t=Ks(t,0|t[pt],n),e.h==2?cc(e,fr,t):t.push(fr(e.g)),!0)},function(e,t,n){if((t=Zs(Xs,t))!=null&&t.length){n=$u(e,n);for(let i=0;i<t.length;i++)lc(e.g,t[i]);Ju(e,n)}},th),xs=hn(function(e,t,n){return e.h===0&&(fn(t,n,(e=fr(e.g))===0?void 0:e),!0)},V0,th),Te=hn(function(e,t,n){return e.h===0&&(fn(t,n,Yu(e.g)),!0)},G0,C0),Fr=hn(function(e,t,n){return e.h===0&&(fn(t,n,(e=Yu(e.g))===!1?void 0:e),!0)},G0,C0),cn=Qs(function(e,t,n){return e.h===2&&(e=ju(e),Ks(t,0|t[pt],n).push(e),!0)},function(e,t,n){if((t=Zs(nn,t))!=null)for(let o=0;o<t.length;o++){var i=e,r=n,s=t[o];s!=null&&uc(i,r,qm(s))}},Qu),er=hn(function(e,t,n){return e.h===2&&(fn(t,n,(e=ju(e))===""?void 0:e),!0)},W0,Qu),oe=hn(function(e,t,n){return e.h===2&&(fn(t,n,ju(e)),!0)},W0,Qu),Je=function(e,t,n=Zu){return new Js(e,t,n)}(function(e,t,n,i,r){return e.h===2&&(i=Ir(void 0,i),Ks(t,0|t[pt],n).push(i),Ho(e,i,r),!0)},function(e,t,n,i,r){if(Array.isArray(t)){for(let s=0;s<t.length;s++)X0(e,t[s],n,i,r);1&(e=0|t[pt])||We(t,1|e)}}),me=fc(function(e,t,n,i,r,s){if(e.h!==2)return!1;let o=0|t[pt];return x0(t,o,s,n,Ws(o)),Ho(e,t=Gu(t,i,n),r),!0},X0),K0=hn(function(e,t,n){return e.h===2&&(fn(t,n,R0(e)),!0)},q0,P0),M2=Qs(function(e,t,n){return(e.h===0||e.h===2)&&(t=Ks(t,0|t[pt],n),e.h==2?cc(e,yi,t):t.push(yi(e.g)),!0)},function(e,t,n){if((t=Zs(a0,t))!=null)for(let o=0;o<t.length;o++){var i=e,r=n,s=t[o];s!=null&&($n(i,r,0),$s(i.g,s))}},eh),S2=hn(function(e,t,n){return e.h===0&&(fn(t,n,(e=yi(e.g))===0?void 0:e),!0)},Y0,eh),un=hn(function(e,t,n){return e.h===0&&(fn(t,n,fr(e.g)),!0)},function(e,t,n){(t=Xs(t))!=null&&(t=parseInt(t,10),$n(e,n,0),lc(e.g,t))},I0);class E2{constructor(t,n){var i=Bn;this.g=t,this.h=n,this.m=Qt,this.j=bt,this.defaultValue=void 0,this.l=i.Oa!=null?i0:void 0}register(){tc(this)}}function bi(e,t){return new E2(e,t)}function mr(e,t){return(n,i)=>{{const s={ea:!0};i&&Object.assign(s,i),n=T0(n,void 0,void 0,s);try{const o=new e,a=o.v;rh(t)(a,n);var r=o}finally{A0(n)}}return r}}function _c(e){return function(){const t=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[]}length(){return this.g.length}end(){const o=this.g;return this.g=[],o}}}};z0(this.v,t,Kr(dc,mc,gc,e)),Us(t,t.g.end());const n=new Uint8Array(t.h),i=t.l,r=i.length;let s=0;for(let o=0;o<r;o++){const a=i[o];n.set(a,s),s+=a.length}return t.l=[n],n}}var qf=class extends mt{constructor(e){super(e)}},Yf=[0,er,hn(function(e,t,n){return e.h===2&&(fn(t,n,(e=R0(e))===Vr()?void 0:e),!0)},function(e,t,n){if(t!=null){if(t instanceof mt){const i=t.Ra;return void(i?(t=i(t),t!=null&&uc(e,n,Xu(t,!0).buffer)):Cs(Kl,3))}if(Array.isArray(t))return void Cs(Kl,3)}q0(e,t,n)},P0)],$0=[0,He,un,Te,-1,Vo,un,-1,Te],b2=class extends mt{constructor(e){super(e)}},J0=[0,Te,oe,Te,un,-1,Qs(function(e,t,n){return(e.h===0||e.h===2)&&(t=Ks(t,0|t[pt],n),e.h==2?cc(e,a2,t):t.push(fr(e.g)),!0)},function(e,t,n){if((t=Zs(Xs,t))!=null&&t.length){n=$u(e,n);for(let i=0;i<t.length;i++)lc(e.g,t[i]);Ju(e,n)}},I0),oe,-1,[0,Te,-1],un,Te,-1],Z0=[0,3,Te,-1,2,[0,[2],He,me,[0,hn(function(e,t,n){return e.h===0&&(fn(t,n,yi(e.g)),!0)},Y0,eh)]],[0,un,Te,un,Te,un,Te,oe,-1],[0,[3,4],oe,-1,me,[0,He],me,[0,un]],[0]],Q0=[0,oe,-2],jf=class extends mt{constructor(e){super(e)}},tg=[0],eg=[0,He,Te,1,Te,-4],Bn=class extends mt{constructor(e){super(e,2)}},Ge={};Ge[336783863]=[0,oe,Te,-1,He,[0,[1,2,3,4,5,6,7,8,9],me,tg,me,J0,me,Q0,me,eg,me,$0,me,[0,oe,-2],me,[0,oe,un],me,Z0,me,[0,un,-1,Te]],[0,oe],Te,[0,[1,3],[2,4],me,[0,Vo],-1,me,[0,cn],-1,Je,[0,oe,-1]],oe];var Kf=[0,el,-1,Fr,-3,el,Vo,er,xs,el,-1,Fr,xs,Fr,-2,er];function _e(e,t){ac(e,3,t)}function jt(e,t){ac(e,4,t)}var bn=class extends mt{constructor(e){super(e,500)}o(e){return bt(this,0,7,e)}},vo=[-1,{}],$f=[0,oe,1,vo],Jf=[0,oe,cn,vo];function Jn(e,t){Wu(e,1,bn,t)}function Ae(e,t){ac(e,10,t)}function te(e,t){ac(e,15,t)}var zn=class extends mt{constructor(e){super(e,500)}o(e){return bt(this,0,1001,e)}},ng=[-500,Je,[-500,er,-1,cn,-3,[-2,Ge,Te],Je,Yf,xs,-1,$f,Jf,Je,[0,er,Fr],er,Kf,xs,cn,987,cn],4,Je,[-500,oe,-1,[-1,{}],998,oe],Je,[-500,oe,cn,-1,[-2,{},Te],997,cn,-1],xs,Je,[-500,oe,cn,vo,998,cn],cn,xs,$f,Jf,Je,[0,er,-1,vo],cn,-2,Kf,er,-1,Fr,[0,Fr,S2],978,vo,Je,Yf];zn.prototype.g=_c(ng);var T2=mr(zn,ng),A2=class extends mt{constructor(e){super(e)}},ig=class extends mt{constructor(e){super(e)}g(){return Gi(this,A2,1)}},rg=[0,Je,[0,He,Be,oe,-1]],vc=mr(ig,rg),w2=class extends mt{constructor(e){super(e)}},R2=class extends mt{constructor(e){super(e)}},nl=class extends mt{constructor(e){super(e)}l(){return Qt(this,w2,2)}g(){return Gi(this,R2,5)}},sg=mr(class extends mt{constructor(e){super(e)}},[0,cn,Vo,sh,[0,un,[0,He,-3],[0,Be,-3],[0,He,-1,[0,Je,[0,He,-2]]],Je,[0,Be,-1,oe,Be]],oe,-1,dr,Je,[0,He,Be],cn,dr]),og=class extends mt{constructor(e){super(e)}},Es=mr(class extends mt{constructor(e){super(e)}},[0,Je,[0,Be,-4]]),ag=class extends mt{constructor(e){super(e)}},Go=mr(class extends mt{constructor(e){super(e)}},[0,Je,[0,Be,-4]]),C2=class extends mt{constructor(e){super(e)}},L2=[0,He,-1,sh,un],cg=class extends mt{constructor(e){super(e)}};cg.prototype.g=_c([0,Be,-4,dr]);var P2=class extends mt{constructor(e){super(e)}},I2=mr(class extends mt{constructor(e){super(e)}},[0,Je,[0,1,He,oe,rg],dr]),Zf=class extends mt{constructor(e){super(e)}},D2=class extends mt{constructor(e){super(e)}na(){const e=be(this,1,void 0,void 0,_0);return e??Vr()}},U2=class extends mt{constructor(e){super(e)}},lg=[1,2],N2=mr(class extends mt{constructor(e){super(e)}},[0,Je,[0,lg,me,[0,sh],me,[0,K0],He,oe],dr]),oh=class extends mt{constructor(e){super(e)}},ug=[0,oe,He,Be,cn,-1],Qf=class extends mt{constructor(e){super(e)}},F2=[0,Te,-1],td=class extends mt{constructor(e){super(e)}},Ra=[1,2,3,4,5,6],Ha=class extends mt{constructor(e){super(e)}g(){return be(this,1,void 0,void 0,_0)!=null}l(){return nn(be(this,2))!=null}},Le=class extends mt{constructor(e){super(e)}g(){return o0(be(this,2))??!1}},hg=[0,K0,oe,[0,He,dr,-1],[0,y2,dr]],ze=[0,hg,Te,[0,Ra,me,eg,me,J0,me,$0,me,tg,me,Q0,me,Z0],un],xc=class extends mt{constructor(e){super(e)}},ah=[0,ze,Be,-1,He],O2=bi(502141897,xc);Ge[502141897]=ah;var B2=mr(class extends mt{constructor(e){super(e)}},[0,[0,un,-1,v2,M2],L2]),fg=class extends mt{constructor(e){super(e)}},dg=class extends mt{constructor(e){super(e)}},eu=[0,ze,Be,[0,ze],Te],z2=bi(508968150,dg);Ge[508968150]=[0,ze,ah,eu,Be,[0,[0,hg]]],Ge[508968149]=eu;var Qr=class extends mt{constructor(e){super(e)}l(){return Qt(this,oh,2)}g(){re(this,2)}},pg=[0,ze,ug];Ge[478825465]=pg;var k2=class extends mt{constructor(e){super(e)}},mg=class extends mt{constructor(e){super(e)}},ch=class extends mt{constructor(e){super(e)}},lh=class extends mt{constructor(e){super(e)}},gg=class extends mt{constructor(e){super(e)}},ed=[0,ze,[0,ze],pg,-1],_g=[0,ze,Be,He],uh=[0,ze,Be],vg=[0,ze,_g,uh,Be],H2=bi(479097054,gg);Ge[479097054]=[0,ze,vg,ed],Ge[463370452]=ed,Ge[464864288]=_g;var V2=bi(462713202,lh);Ge[462713202]=vg,Ge[474472470]=uh;var G2=class extends mt{constructor(e){super(e)}},xg=class extends mt{constructor(e){super(e)}},yg=class extends mt{constructor(e){super(e)}},Mg=class extends mt{constructor(e){super(e)}},hh=[0,ze,Be,-1,He],nu=[0,ze,Be,Te];Mg.prototype.g=_c([0,ze,uh,[0,ze],ah,eu,hh,nu]);var Sg=class extends mt{constructor(e){super(e)}},W2=bi(456383383,Sg);Ge[456383383]=[0,ze,ug];var Eg=class extends mt{constructor(e){super(e)}},X2=bi(476348187,Eg);Ge[476348187]=[0,ze,F2];var bg=class extends mt{constructor(e){super(e)}},nd=class extends mt{constructor(e){super(e)}},Tg=[0,un,-1],q2=bi(458105876,class extends mt{constructor(e){super(e)}g(){let e;var t=this.v;const n=0|t[pt];return e=Nn(this,n),t=function(i,r,s,o){var a=nd;!o&&Ys(i)&&(s=0|(r=i.v)[pt]);var c=Vi(r,2);if(i=!1,c==null){if(o)return Bf();c=[]}else if(c.constructor===Hi){if(!(2&c.J)||o)return c;c=c.V()}else Array.isArray(c)?i=!!(2&(0|c[pt])):c=[];if(o){if(!c.length)return Bf();i||(i=!0,Oo(c))}else i&&(i=!1,Ro(c),c=v0(c));return!i&&32&s&&Fo(c,32),s=Ve(r,s,2,o=new Hi(c,a,j1,void 0)),i||jr(r,s),o}(this,t,n,e),!e&&nd&&(t.ra=!0),t}});Ge[458105876]=[0,Tg,_2,[!0,dr,[0,oe,-1,cn]],[0,Vo,Te,un]];var fh=class extends mt{constructor(e){super(e)}},Ag=bi(458105758,fh);Ge[458105758]=[0,ze,oe,Tg];var il=class extends mt{constructor(e){super(e)}},id=[0,x2,-1,Fr],Y2=class extends mt{constructor(e){super(e)}},wg=class extends mt{constructor(e){super(e)}},iu=[1,2];wg.prototype.g=_c([0,iu,me,id,me,[0,Je,id]]);var Rg=class extends mt{constructor(e){super(e)}},j2=bi(443442058,Rg);Ge[443442058]=[0,ze,oe,He,Be,cn,-1,Te,Be],Ge[514774813]=hh;var Cg=class extends mt{constructor(e){super(e)}},K2=bi(516587230,Cg);function ru(e,t){return t=t?t.clone():new oh,e.displayNamesLocale!==void 0?re(t,1,ko(e.displayNamesLocale)):e.displayNamesLocale===void 0&&re(t,1),e.maxResults!==void 0?Wi(t,2,e.maxResults):"maxResults"in e&&re(t,2),e.scoreThreshold!==void 0?yt(t,3,e.scoreThreshold):"scoreThreshold"in e&&re(t,3),e.categoryAllowlist!==void 0?Oa(t,4,e.categoryAllowlist):"categoryAllowlist"in e&&re(t,4),e.categoryDenylist!==void 0?Oa(t,5,e.categoryDenylist):"categoryDenylist"in e&&re(t,5),t}function Lg(e){const t=Number(e);return Number.isSafeInteger(t)?t:String(e)}function dh(e,t=-1,n=""){return{categories:e.map(i=>({index:Kn(i,1)??0??-1,score:De(i,2)??0,categoryName:nn(be(i,3))??""??"",displayName:nn(be(i,4))??""??""})),headIndex:t,headName:n}}function $2(e){const t={classifications:Gi(e,P2,1).map(n=>{var i;return dh(((i=Qt(n,ig,4))==null?void 0:i.g())??[],Kn(n,2)??0,nn(be(n,3))??"")})};return function(n){return n==null?n:typeof n=="bigint"?($l(n)?n=Number(n):(n=Bo(64,n),n=$l(n)?Number(n):String(n)),n):zo(n)?typeof n=="number"?Uu(n):l0(n):void 0}(be(e,2,void 0,void 0,Na))!=null&&(t.timestampMs=Lg(be(e,2,void 0,void 0,Na)??m0)),t}function Pg(e){var o,a;var t=Rr(e,3,_i,wr()),n=Rr(e,2,Xs,wr()),i=Rr(e,1,nn,wr()),r=Rr(e,9,nn,wr());const s={categories:[],keypoints:[]};for(let c=0;c<t.length;c++)s.categories.push({score:t[c],index:n[c]??-1,categoryName:i[c]??"",displayName:r[c]??""});if((t=(o=Qt(e,nl,4))==null?void 0:o.l())&&(s.boundingBox={originX:Kn(t,1,qi)??0,originY:Kn(t,2,qi)??0,width:Kn(t,3,qi)??0,height:Kn(t,4,qi)??0,angle:0}),(a=Qt(e,nl,4))==null?void 0:a.g().length)for(const c of Qt(e,nl,4).g())s.keypoints.push({x:be(c,1,void 0,qi,_i)??0,y:be(c,2,void 0,qi,_i)??0,score:be(c,4,void 0,qi,_i)??0,label:nn(be(c,3,void 0,qi))??""});return s}function yc(e){const t=[];for(const n of Gi(e,ag,1))t.push({x:De(n,1)??0,y:De(n,2)??0,z:De(n,3)??0,visibility:De(n,4)??0});return t}function xo(e){const t=[];for(const n of Gi(e,og,1))t.push({x:De(n,1)??0,y:De(n,2)??0,z:De(n,3)??0,visibility:De(n,4)??0});return t}function rd(e){return Array.from(e,t=>t>127?t-256:t)}function sd(e,t){if(e.length!==t.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);let n=0,i=0,r=0;for(let s=0;s<e.length;s++)n+=e[s]*t[s],i+=e[s]*e[s],r+=t[s]*t[s];if(i<=0||r<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(i*r)}Ge[516587230]=[0,ze,hh,nu,Be],Ge[518928384]=nu;function Ig(){var e=navigator;return typeof OffscreenCanvas<"u"&&(!function(t=navigator){return(t=t.userAgent).includes("Safari")&&!t.includes("Chrome")}(e)||!!((e=e.userAgent.match(/Version\/([\d]+).*Safari/))&&e.length>=1&&Number(e[1])>=17))}async function od(e){if(typeof importScripts!="function"){const t=document.createElement("script");return t.src=e.toString(),t.crossOrigin="anonymous",new Promise((n,i)=>{t.addEventListener("load",()=>{n()},!1),t.addEventListener("error",r=>{i(r)},!1),document.body.appendChild(t)})}try{importScripts(e.toString())}catch(t){if(!(t instanceof TypeError))throw t;await self.import(e.toString())}}function Dg(e){return e.videoWidth!==void 0?[e.videoWidth,e.videoHeight]:e.naturalWidth!==void 0?[e.naturalWidth,e.naturalHeight]:e.displayWidth!==void 0?[e.displayWidth,e.displayHeight]:[e.width,e.height]}function gt(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(t=e.i.stringToNewUTF8(t)),e.i._free(t)}function ad(e,t,n){if(!e.i.canvas)throw Error("No OpenGL canvas configured.");if(n?e.i._bindTextureToStream(n):e.i._bindTextureToCanvas(),!(n=e.i.canvas.getContext("webgl2")||e.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t),e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);const[i,r]=Dg(t);return!e.l||i===e.i.canvas.width&&r===e.i.canvas.height||(e.i.canvas.width=i,e.i.canvas.height=r),[i,r]}function cd(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const i=new Uint32Array(t.length);for(let r=0;r<t.length;r++)i[r]=e.i.stringToNewUTF8(t[r]);t=e.i._malloc(4*i.length),e.i.HEAPU32.set(i,t>>2),n(t);for(const r of i)e.i._free(r);e.i._free(t)}function fi(e,t,n){e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=n}function Yi(e,t,n){let i=[];e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=(r,s,o)=>{s?(n(i,o),i=[]):i.push(r)}}async function J2(e,t,n,i){return e=await(async(r,s,o,a,c)=>{if(s&&await od(s),!self.ModuleFactory||o&&(await od(o),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&c&&((s=self.Module).locateFile=c.locateFile,c.mainScriptUrlOrBlob&&(s.mainScriptUrlOrBlob=c.mainScriptUrlOrBlob)),c=await self.ModuleFactory(self.Module||c),self.ModuleFactory=self.Module=void 0,new r(c,a)})(e,n.wasmLoaderPath,n.assetLoaderPath,t,{locateFile:r=>r.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&r.endsWith(".data")?n.assetBinaryPath.toString():r}),await e.o(i),e}function rl(e,t){const n=Qt(e.baseOptions,Ha,1)||new Ha;typeof t=="string"?(re(n,2,ko(t)),re(n,1)):t instanceof Uint8Array&&(re(n,1,Lu(t,!1)),re(n,2)),bt(e.baseOptions,0,1,n)}function ld(e){try{const t=e.H.length;if(t===1)throw Error(e.H[0].message);if(t>1)throw Error("Encountered multiple errors: "+e.H.map(n=>n.message).join(", "))}finally{e.H=[]}}function ut(e,t){e.C=Math.max(e.C,t)}function Mc(e,t){e.B=new bn,Fn(e.B,2,"PassThroughCalculator"),_e(e.B,"free_memory"),jt(e.B,"free_memory_unused_out"),Ae(t,"free_memory"),Jn(t,e.B)}function Ns(e,t){_e(e.B,t),jt(e.B,t+"_unused_out")}function Sc(e){e.g.addBoolToStream(!0,"free_memory",e.C)}var su=class{constructor(e){this.g=e,this.H=[],this.C=0,this.g.setAutoRenderToScreen(!1)}l(e,t=!0){var n,i,r,s,o,a;if(t){const c=e.baseOptions||{};if((n=e.baseOptions)!=null&&n.modelAssetBuffer&&((i=e.baseOptions)!=null&&i.modelAssetPath))throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!((r=Qt(this.baseOptions,Ha,1))!=null&&r.g()||(s=Qt(this.baseOptions,Ha,1))!=null&&s.l()||(o=e.baseOptions)!=null&&o.modelAssetBuffer||(a=e.baseOptions)!=null&&a.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if(function(l,u){let h=Qt(l.baseOptions,td,3);if(!h){var f=h=new td,p=new jf;_o(f,4,Ra,p)}"delegate"in u&&(u.delegate==="GPU"?(u=h,f=new b2,_o(u,2,Ra,f)):(u=h,f=new jf,_o(u,4,Ra,f))),bt(l.baseOptions,0,3,h)}(this,c),c.modelAssetPath)return fetch(c.modelAssetPath.toString()).then(l=>{if(l.ok)return l.arrayBuffer();throw Error(`Failed to fetch model: ${c.modelAssetPath} (${l.status})`)}).then(l=>{try{this.g.i.FS_unlink("/model.dat")}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(l),!0,!1,!1),rl(this,"/model.dat"),this.m(),this.L()});if(c.modelAssetBuffer instanceof Uint8Array)rl(this,c.modelAssetBuffer);else if(c.modelAssetBuffer)return async function(l){const u=[];for(var h=0;;){const{done:f,value:p}=await l.read();if(f)break;u.push(p),h+=p.length}if(u.length===0)return new Uint8Array(0);if(u.length===1)return u[0];l=new Uint8Array(h),h=0;for(const f of u)l.set(f,h),h+=f.length;return l}(c.modelAssetBuffer).then(l=>{rl(this,l),this.m(),this.L()})}return this.m(),this.L(),Promise.resolve()}L(){}ca(){let e;if(this.g.ca(t=>{e=T2(t)}),!e)throw Error("Failed to retrieve CalculatorGraphConfig");return e}setGraph(e,t){this.g.attachErrorListener((n,i)=>{this.H.push(Error(i))}),this.g.Ja(),this.g.setGraph(e,t),this.B=void 0,ld(this)}finishProcessing(){this.g.finishProcessing(),ld(this)}close(){this.B=void 0,this.g.closeGraph()}};function ar(e,t){if(!e)throw Error(`Unable to obtain required WebGL resource: ${t}`);return e}su.prototype.close=su.prototype.close;class Z2{constructor(t,n,i,r){this.g=t,this.h=n,this.m=i,this.l=r}bind(){this.g.bindVertexArray(this.h)}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l)}}function ud(e,t,n){const i=e.g;if(n=ar(i.createShader(n),"Failed to create WebGL shader"),i.shaderSource(n,t),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${i.getShaderInfoLog(n)}`);return i.attachShader(e.h,n),n}function hd(e,t){const n=e.g,i=ar(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(i);const r=ar(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,r),n.enableVertexAttribArray(e.O),n.vertexAttribPointer(e.O,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const s=ar(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(e.L),n.vertexAttribPointer(e.L,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(t?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new Z2(n,i,r,s)}function ph(e,t){if(e.g){if(t!==e.g)throw Error("Cannot change GL context once initialized")}else e.g=t}function Q2(e,t,n,i){return ph(e,t),e.h||(e.m(),e.D()),n?(e.u||(e.u=hd(e,!0)),n=e.u):(e.A||(e.A=hd(e,!1)),n=e.A),t.useProgram(e.h),n.bind(),e.l(),e=i(),n.g.bindVertexArray(null),e}function Ug(e,t,n){return ph(e,t),e=ar(t.createTexture(),"Failed to create texture"),t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n??t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n??t.LINEAR),t.bindTexture(t.TEXTURE_2D,null),e}function Ng(e,t,n){ph(e,t),e.B||(e.B=ar(t.createFramebuffer(),"Failed to create framebuffe.")),t.bindFramebuffer(t.FRAMEBUFFER,e.B),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0)}function tv(e){var t;(t=e.g)==null||t.bindFramebuffer(e.g.FRAMEBUFFER,null)}var Fg=class{H(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}m(){const e=this.g;if(this.h=ar(e.createProgram(),"Failed to create WebGL program"),this.X=ud(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,e.VERTEX_SHADER),this.W=ud(this,this.H(),e.FRAGMENT_SHADER),e.linkProgram(this.h),!e.getProgramParameter(this.h,e.LINK_STATUS))throw Error(`Error during program linking: ${e.getProgramInfoLog(this.h)}`);this.O=e.getAttribLocation(this.h,"aVertex"),this.L=e.getAttribLocation(this.h,"aTex")}D(){}l(){}close(){if(this.h){const e=this.g;e.deleteProgram(this.h),e.deleteShader(this.X),e.deleteShader(this.W)}this.B&&this.g.deleteFramebuffer(this.B),this.A&&this.A.close(),this.u&&this.u.close()}};function Ni(e,t){switch(t){case 0:return e.g.find(n=>n instanceof Uint8Array);case 1:return e.g.find(n=>n instanceof Float32Array);case 2:return e.g.find(n=>typeof WebGLTexture<"u"&&n instanceof WebGLTexture);default:throw Error(`Type is not supported: ${t}`)}}function ou(e){var t=Ni(e,1);if(!t){if(t=Ni(e,0))t=new Float32Array(t).map(i=>i/255);else{t=new Float32Array(e.width*e.height);const i=Fs(e);var n=mh(e);if(Ng(n,i,Og(e)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"document"in self&&"ontouchend"in self.document){n=new Float32Array(e.width*e.height*4),i.readPixels(0,0,e.width,e.height,i.RGBA,i.FLOAT,n);for(let r=0,s=0;r<t.length;++r,s+=4)t[r]=n[s]}else i.readPixels(0,0,e.width,e.height,i.RED,i.FLOAT,t)}e.g.push(t)}return t}function Og(e){let t=Ni(e,2);if(!t){const n=Fs(e);t=zg(e);const i=ou(e),r=Bg(e);n.texImage2D(n.TEXTURE_2D,0,r,e.width,e.height,0,n.RED,n.FLOAT,i),au(e)}return t}function Fs(e){if(!e.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return e.h||(e.h=ar(e.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),e.h}function Bg(e){if(e=Fs(e),!Jo)if(e.getExtension("EXT_color_buffer_float")&&e.getExtension("OES_texture_float_linear")&&e.getExtension("EXT_float_blend"))Jo=e.R32F;else{if(!e.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");Jo=e.R16F}return Jo}function mh(e){return e.l||(e.l=new Fg),e.l}function zg(e){const t=Fs(e);t.viewport(0,0,e.width,e.height),t.activeTexture(t.TEXTURE0);let n=Ni(e,2);return n||(n=Ug(mh(e),t,e.m?t.LINEAR:t.NEAREST),e.g.push(n),e.j=!0),t.bindTexture(t.TEXTURE_2D,n),n}function au(e){e.h.bindTexture(e.h.TEXTURE_2D,null)}var Jo,$e=class{constructor(e,t,n,i,r,s,o){this.g=e,this.m=t,this.j=n,this.canvas=i,this.l=r,this.width=s,this.height=o,this.j&&--fd===0&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.")}Fa(){return!!Ni(this,0)}ka(){return!!Ni(this,1)}R(){return!!Ni(this,2)}ja(){return(t=Ni(e=this,0))||(t=ou(e),t=new Uint8Array(t.map(n=>Math.round(255*n))),e.g.push(t)),t;var e,t}ia(){return ou(this)}N(){return Og(this)}clone(){const e=[];for(const t of this.g){let n;if(t instanceof Uint8Array)n=new Uint8Array(t);else if(t instanceof Float32Array)n=new Float32Array(t);else{if(!(t instanceof WebGLTexture))throw Error(`Type is not supported: ${t}`);{const i=Fs(this),r=mh(this);i.activeTexture(i.TEXTURE1),n=Ug(r,i,this.m?i.LINEAR:i.NEAREST),i.bindTexture(i.TEXTURE_2D,n);const s=Bg(this);i.texImage2D(i.TEXTURE_2D,0,s,this.width,this.height,0,i.RED,i.FLOAT,null),i.bindTexture(i.TEXTURE_2D,null),Ng(r,i,n),Q2(r,i,!1,()=>{zg(this),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),au(this)}),tv(r),au(this)}}e.push(n)}return new $e(e,this.m,this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&Fs(this).deleteTexture(Ni(this,2)),fd=-1}};$e.prototype.close=$e.prototype.close,$e.prototype.clone=$e.prototype.clone,$e.prototype.getAsWebGLTexture=$e.prototype.N,$e.prototype.getAsFloat32Array=$e.prototype.ia,$e.prototype.getAsUint8Array=$e.prototype.ja,$e.prototype.hasWebGLTexture=$e.prototype.R,$e.prototype.hasFloat32Array=$e.prototype.ka,$e.prototype.hasUint8Array=$e.prototype.Fa;var fd=250;function ci(...e){return e.map(([t,n])=>({start:t,end:n}))}const ev=function(e){return class extends e{Ja(){this.i._registerModelResourcesGraphService()}}}((dd=class{constructor(e,t){this.l=!0,this.i=e,this.g=null,this.h=0,this.m=typeof this.i._addIntToInputStream=="function",t!==void 0?this.i.canvas=t:Ig()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"))}async initializeGraph(e){const t=await(await fetch(e)).arrayBuffer();e=!(e.endsWith(".pbtxt")||e.endsWith(".textproto")),this.setGraph(new Uint8Array(t),e)}setGraphFromString(e){this.setGraph(new TextEncoder().encode(e),!1)}setGraph(e,t){const n=e.length,i=this.i._malloc(n);this.i.HEAPU8.set(e,i),t?this.i._changeBinaryGraph(n,i):this.i._changeTextGraph(n,i),this.i._free(i)}configureAudio(e,t,n,i,r){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),gt(this,i||"input_audio",s=>{gt(this,r=r||"audio_header",o=>{this.i._configureAudio(s,o,e,t??0,n)})})}setAutoResizeCanvas(e){this.l=e}setAutoRenderToScreen(e){this.i._setAutoRenderToScreen(e)}setGpuBufferVerticalFlip(e){this.i.gpuOriginForWebTexturesIsBottomLeft=e}ca(e){fi(this,"__graph_config__",t=>{e(t)}),gt(this,"__graph_config__",t=>{this.i._getGraphConfig(t,void 0)}),delete this.i.simpleListeners.__graph_config__}attachErrorListener(e){this.i.errorListener=e}attachEmptyPacketListener(e,t){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[e]=t}addAudioToStream(e,t,n){this.addAudioToStreamWithShape(e,0,0,t,n)}addAudioToStreamWithShape(e,t,n,i,r){const s=4*e.length;this.h!==s&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(s),this.h=s),this.i.HEAPF32.set(e,this.g/4),gt(this,i,o=>{this.i._addAudioToInputStream(this.g,t,n,o,r)})}addGpuBufferToStream(e,t,n){gt(this,t,i=>{const[r,s]=ad(this,e,i);this.i._addBoundTextureToStream(i,r,s,n)})}addBoolToStream(e,t,n){gt(this,t,i=>{this.i._addBoolToInputStream(e,i,n)})}addDoubleToStream(e,t,n){gt(this,t,i=>{this.i._addDoubleToInputStream(e,i,n)})}addFloatToStream(e,t,n){gt(this,t,i=>{this.i._addFloatToInputStream(e,i,n)})}addIntToStream(e,t,n){gt(this,t,i=>{this.i._addIntToInputStream(e,i,n)})}addUintToStream(e,t,n){gt(this,t,i=>{this.i._addUintToInputStream(e,i,n)})}addStringToStream(e,t,n){gt(this,t,i=>{gt(this,e,r=>{this.i._addStringToInputStream(r,i,n)})})}addStringRecordToStream(e,t,n){gt(this,t,i=>{cd(this,Object.keys(e),r=>{cd(this,Object.values(e),s=>{this.i._addFlatHashMapToInputStream(r,s,Object.keys(e).length,i,n)})})})}addProtoToStream(e,t,n,i){gt(this,n,r=>{gt(this,t,s=>{const o=this.i._malloc(e.length);this.i.HEAPU8.set(e,o),this.i._addProtoToInputStream(o,e.length,s,r,i),this.i._free(o)})})}addEmptyPacketToStream(e,t){gt(this,e,n=>{this.i._addEmptyPacketToInputStream(n,t)})}addBoolVectorToStream(e,t,n){gt(this,t,i=>{const r=this.i._allocateBoolVector(e.length);if(!r)throw Error("Unable to allocate new bool vector on heap.");for(const s of e)this.i._addBoolVectorEntry(r,s);this.i._addBoolVectorToInputStream(r,i,n)})}addDoubleVectorToStream(e,t,n){gt(this,t,i=>{const r=this.i._allocateDoubleVector(e.length);if(!r)throw Error("Unable to allocate new double vector on heap.");for(const s of e)this.i._addDoubleVectorEntry(r,s);this.i._addDoubleVectorToInputStream(r,i,n)})}addFloatVectorToStream(e,t,n){gt(this,t,i=>{const r=this.i._allocateFloatVector(e.length);if(!r)throw Error("Unable to allocate new float vector on heap.");for(const s of e)this.i._addFloatVectorEntry(r,s);this.i._addFloatVectorToInputStream(r,i,n)})}addIntVectorToStream(e,t,n){gt(this,t,i=>{const r=this.i._allocateIntVector(e.length);if(!r)throw Error("Unable to allocate new int vector on heap.");for(const s of e)this.i._addIntVectorEntry(r,s);this.i._addIntVectorToInputStream(r,i,n)})}addUintVectorToStream(e,t,n){gt(this,t,i=>{const r=this.i._allocateUintVector(e.length);if(!r)throw Error("Unable to allocate new unsigned int vector on heap.");for(const s of e)this.i._addUintVectorEntry(r,s);this.i._addUintVectorToInputStream(r,i,n)})}addStringVectorToStream(e,t,n){gt(this,t,i=>{const r=this.i._allocateStringVector(e.length);if(!r)throw Error("Unable to allocate new string vector on heap.");for(const s of e)gt(this,s,o=>{this.i._addStringVectorEntry(r,o)});this.i._addStringVectorToInputStream(r,i,n)})}addBoolToInputSidePacket(e,t){gt(this,t,n=>{this.i._addBoolToInputSidePacket(e,n)})}addDoubleToInputSidePacket(e,t){gt(this,t,n=>{this.i._addDoubleToInputSidePacket(e,n)})}addFloatToInputSidePacket(e,t){gt(this,t,n=>{this.i._addFloatToInputSidePacket(e,n)})}addIntToInputSidePacket(e,t){gt(this,t,n=>{this.i._addIntToInputSidePacket(e,n)})}addUintToInputSidePacket(e,t){gt(this,t,n=>{this.i._addUintToInputSidePacket(e,n)})}addStringToInputSidePacket(e,t){gt(this,t,n=>{gt(this,e,i=>{this.i._addStringToInputSidePacket(i,n)})})}addProtoToInputSidePacket(e,t,n){gt(this,n,i=>{gt(this,t,r=>{const s=this.i._malloc(e.length);this.i.HEAPU8.set(e,s),this.i._addProtoToInputSidePacket(s,e.length,r,i),this.i._free(s)})})}addBoolVectorToInputSidePacket(e,t){gt(this,t,n=>{const i=this.i._allocateBoolVector(e.length);if(!i)throw Error("Unable to allocate new bool vector on heap.");for(const r of e)this.i._addBoolVectorEntry(i,r);this.i._addBoolVectorToInputSidePacket(i,n)})}addDoubleVectorToInputSidePacket(e,t){gt(this,t,n=>{const i=this.i._allocateDoubleVector(e.length);if(!i)throw Error("Unable to allocate new double vector on heap.");for(const r of e)this.i._addDoubleVectorEntry(i,r);this.i._addDoubleVectorToInputSidePacket(i,n)})}addFloatVectorToInputSidePacket(e,t){gt(this,t,n=>{const i=this.i._allocateFloatVector(e.length);if(!i)throw Error("Unable to allocate new float vector on heap.");for(const r of e)this.i._addFloatVectorEntry(i,r);this.i._addFloatVectorToInputSidePacket(i,n)})}addIntVectorToInputSidePacket(e,t){gt(this,t,n=>{const i=this.i._allocateIntVector(e.length);if(!i)throw Error("Unable to allocate new int vector on heap.");for(const r of e)this.i._addIntVectorEntry(i,r);this.i._addIntVectorToInputSidePacket(i,n)})}addUintVectorToInputSidePacket(e,t){gt(this,t,n=>{const i=this.i._allocateUintVector(e.length);if(!i)throw Error("Unable to allocate new unsigned int vector on heap.");for(const r of e)this.i._addUintVectorEntry(i,r);this.i._addUintVectorToInputSidePacket(i,n)})}addStringVectorToInputSidePacket(e,t){gt(this,t,n=>{const i=this.i._allocateStringVector(e.length);if(!i)throw Error("Unable to allocate new string vector on heap.");for(const r of e)gt(this,r,s=>{this.i._addStringVectorEntry(i,s)});this.i._addStringVectorToInputSidePacket(i,n)})}attachBoolListener(e,t){fi(this,e,t),gt(this,e,n=>{this.i._attachBoolListener(n)})}attachBoolVectorListener(e,t){Yi(this,e,t),gt(this,e,n=>{this.i._attachBoolVectorListener(n)})}attachIntListener(e,t){fi(this,e,t),gt(this,e,n=>{this.i._attachIntListener(n)})}attachIntVectorListener(e,t){Yi(this,e,t),gt(this,e,n=>{this.i._attachIntVectorListener(n)})}attachUintListener(e,t){fi(this,e,t),gt(this,e,n=>{this.i._attachUintListener(n)})}attachUintVectorListener(e,t){Yi(this,e,t),gt(this,e,n=>{this.i._attachUintVectorListener(n)})}attachDoubleListener(e,t){fi(this,e,t),gt(this,e,n=>{this.i._attachDoubleListener(n)})}attachDoubleVectorListener(e,t){Yi(this,e,t),gt(this,e,n=>{this.i._attachDoubleVectorListener(n)})}attachFloatListener(e,t){fi(this,e,t),gt(this,e,n=>{this.i._attachFloatListener(n)})}attachFloatVectorListener(e,t){Yi(this,e,t),gt(this,e,n=>{this.i._attachFloatVectorListener(n)})}attachStringListener(e,t){fi(this,e,t),gt(this,e,n=>{this.i._attachStringListener(n)})}attachStringVectorListener(e,t){Yi(this,e,t),gt(this,e,n=>{this.i._attachStringVectorListener(n)})}attachProtoListener(e,t,n){fi(this,e,t),gt(this,e,i=>{this.i._attachProtoListener(i,n||!1)})}attachProtoVectorListener(e,t,n){Yi(this,e,t),gt(this,e,i=>{this.i._attachProtoVectorListener(i,n||!1)})}attachAudioListener(e,t,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),fi(this,e,(i,r)=>{i=new Float32Array(i.buffer,i.byteOffset,i.length/4),t(i,r)}),gt(this,e,i=>{this.i._attachAudioListener(i,n||!1)})}finishProcessing(){this.i._waitUntilIdle()}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0}},class extends dd{get ga(){return this.i}pa(e,t,n){gt(this,t,i=>{const[r,s]=ad(this,e,i);this.ga._addBoundTextureAsImageToStream(i,r,s,n)})}Z(e,t){fi(this,e,t),gt(this,e,n=>{this.ga._attachImageListener(n)})}aa(e,t){Yi(this,e,t),gt(this,e,n=>{this.ga._attachImageVectorListener(n)})}}));var dd,li=class extends ev{};async function Jt(e,t,n){return async function(i,r,s,o){return J2(i,r,s,o)}(e,n.canvas??(Ig()?void 0:document.createElement("canvas")),t,n)}function kg(e,t,n,i){if(e.U){const s=new cg;if(n!=null&&n.regionOfInterest){if(!e.oa)throw Error("This task doesn't support region-of-interest.");var r=n.regionOfInterest;if(r.left>=r.right||r.top>=r.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(r.left<0||r.top<0||r.right>1||r.bottom>1)throw Error("Expected RectF values to be in [0,1].");yt(s,1,(r.left+r.right)/2),yt(s,2,(r.top+r.bottom)/2),yt(s,4,r.right-r.left),yt(s,3,r.bottom-r.top)}else yt(s,1,.5),yt(s,2,.5),yt(s,4,1),yt(s,3,1);if(n!=null&&n.rotationDegrees){if((n==null?void 0:n.rotationDegrees)%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(yt(s,5,-Math.PI*n.rotationDegrees/180),(n==null?void 0:n.rotationDegrees)%180!=0){const[o,a]=Dg(t);n=De(s,3)*a/o,r=De(s,4)*o/a,yt(s,4,n),yt(s,3,r)}}e.g.addProtoToStream(s.g(),"mediapipe.NormalizedRect",e.U,i)}e.g.pa(t,e.X,i??performance.now()),e.finishProcessing()}function ui(e,t,n){var i;if((i=e.baseOptions)!=null&&i.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");kg(e,t,n,e.C+1)}function Ti(e,t,n,i){var r;if(!((r=e.baseOptions)!=null&&r.g()))throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");kg(e,t,n,i)}function Os(e,t,n,i){var r=t.data;const s=t.width,o=s*(t=t.height);if((r instanceof Uint8Array||r instanceof Float32Array)&&r.length!==o)throw Error("Unsupported channel count: "+r.length/o);return e=new $e([r],n,!1,e.g.i.canvas,e.P,s,t),i?e.clone():e}var On=class extends su{constructor(e,t,n,i){super(e),this.g=e,this.X=t,this.U=n,this.oa=i,this.P=new Fg}l(e,t=!0){if("runningMode"in e&&re(this.baseOptions,2,Lo(!!e.runningMode&&e.runningMode!=="IMAGE")),e.canvas!==void 0&&this.g.i.canvas!==e.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(e,t)}close(){this.P.close(),super.close()}};On.prototype.close=On.prototype.close;var Hn=class extends On{constructor(e,t){super(new li(e,t),"image_in","norm_rect_in",!1),this.j={detections:[]},bt(e=this.h=new xc,0,1,t=new Le),yt(this.h,2,.5),yt(this.h,3,.3)}get baseOptions(){return Qt(this.h,Le,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return"minDetectionConfidence"in e&&yt(this.h,2,e.minDetectionConfidence??.5),"minSuppressionThreshold"in e&&yt(this.h,3,e.minSuppressionThreshold??.3),this.l(e)}F(e,t){return this.j={detections:[]},ui(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},Ti(this,e,n,t),this.j}m(){var e=new zn;Ae(e,"image_in"),Ae(e,"norm_rect_in"),te(e,"detections");const t=new Bn;Ei(t,O2,this.h);const n=new bn;Fn(n,2,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect_in"),jt(n,"DETECTIONS:detections"),n.o(t),Jn(e,n),this.g.attachProtoVectorListener("detections",(i,r)=>{for(const s of i)i=sg(s),this.j.detections.push(Pg(i));ut(this,r)}),this.g.attachEmptyPacketListener("detections",i=>{ut(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Hn.prototype.detectForVideo=Hn.prototype.G,Hn.prototype.detect=Hn.prototype.F,Hn.prototype.setOptions=Hn.prototype.o,Hn.createFromModelPath=async function(e,t){return Jt(Hn,e,{baseOptions:{modelAssetPath:t}})},Hn.createFromModelBuffer=function(e,t){return Jt(Hn,e,{baseOptions:{modelAssetBuffer:t}})},Hn.createFromOptions=function(e,t){return Jt(Hn,e,t)};var gh=ci([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),_h=ci([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),vh=ci([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),Hg=ci([474,475],[475,476],[476,477],[477,474]),xh=ci([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),yh=ci([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),Vg=ci([469,470],[470,471],[471,472],[472,469]),Mh=ci([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),Gg=[...gh,..._h,...vh,...xh,...yh,...Mh],Wg=ci([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function pd(e){e.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var Zt=class extends On{constructor(e,t){super(new li(e,t),"image_in","norm_rect",!1),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,bt(e=this.h=new dg,0,1,t=new Le),this.A=new fg,bt(this.h,0,3,this.A),this.u=new xc,bt(this.h,0,2,this.u),Wi(this.u,4,1),yt(this.u,2,.5),yt(this.A,2,.5),yt(this.h,4,.5)}get baseOptions(){return Qt(this.h,Le,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return"numFaces"in e&&Wi(this.u,4,e.numFaces??1),"minFaceDetectionConfidence"in e&&yt(this.u,2,e.minFaceDetectionConfidence??.5),"minTrackingConfidence"in e&&yt(this.h,4,e.minTrackingConfidence??.5),"minFacePresenceConfidence"in e&&yt(this.A,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in e&&(this.outputFacialTransformationMatrixes=!!e.outputFacialTransformationMatrixes),this.l(e)}F(e,t){return pd(this),ui(this,e,t),this.j}G(e,t,n){return pd(this),Ti(this,e,n,t),this.j}m(){var e=new zn;Ae(e,"image_in"),Ae(e,"norm_rect"),te(e,"face_landmarks");const t=new Bn;Ei(t,z2,this.h);const n=new bn;Fn(n,2,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect"),jt(n,"NORM_LANDMARKS:face_landmarks"),n.o(t),Jn(e,n),this.g.attachProtoVectorListener("face_landmarks",(i,r)=>{for(const s of i)i=Go(s),this.j.faceLandmarks.push(yc(i));ut(this,r)}),this.g.attachEmptyPacketListener("face_landmarks",i=>{ut(this,i)}),this.outputFaceBlendshapes&&(te(e,"blendshapes"),jt(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",(i,r)=>{if(this.outputFaceBlendshapes)for(const s of i)i=vc(s),this.j.faceBlendshapes.push(dh(i.g()??[]));ut(this,r)}),this.g.attachEmptyPacketListener("blendshapes",i=>{ut(this,i)})),this.outputFacialTransformationMatrixes&&(te(e,"face_geometry"),jt(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",(i,r)=>{if(this.outputFacialTransformationMatrixes)for(const s of i)(i=Qt(i=B2(s),C2,2))&&this.j.facialTransformationMatrixes.push({rows:Kn(i,1)??0??0,columns:Kn(i,2)??0??0,data:Rr(i,3,_i,wr()).slice()??[]});ut(this,r)}),this.g.attachEmptyPacketListener("face_geometry",i=>{ut(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Zt.prototype.detectForVideo=Zt.prototype.G,Zt.prototype.detect=Zt.prototype.F,Zt.prototype.setOptions=Zt.prototype.o,Zt.createFromModelPath=function(e,t){return Jt(Zt,e,{baseOptions:{modelAssetPath:t}})},Zt.createFromModelBuffer=function(e,t){return Jt(Zt,e,{baseOptions:{modelAssetBuffer:t}})},Zt.createFromOptions=function(e,t){return Jt(Zt,e,t)},Zt.FACE_LANDMARKS_LIPS=gh,Zt.FACE_LANDMARKS_LEFT_EYE=_h,Zt.FACE_LANDMARKS_LEFT_EYEBROW=vh,Zt.FACE_LANDMARKS_LEFT_IRIS=Hg,Zt.FACE_LANDMARKS_RIGHT_EYE=xh,Zt.FACE_LANDMARKS_RIGHT_EYEBROW=yh,Zt.FACE_LANDMARKS_RIGHT_IRIS=Vg,Zt.FACE_LANDMARKS_FACE_OVAL=Mh,Zt.FACE_LANDMARKS_CONTOURS=Gg,Zt.FACE_LANDMARKS_TESSELATION=Wg;var Sh=ci([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function md(e){e.gestures=[],e.landmarks=[],e.worldLandmarks=[],e.handedness=[]}function gd(e){return e.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:e.gestures,landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handedness:e.handedness,handednesses:e.handedness}}function _d(e,t=!0){const n=[];for(const r of e){var i=vc(r);e=[];for(const s of i.g())i=t&&Kn(s,1)!=null?Kn(s,1)??0:-1,e.push({score:De(s,2)??0,index:i,categoryName:nn(be(s,3))??""??"",displayName:nn(be(s,4))??""??""});n.push(e)}return n}var An=class extends On{constructor(e,t){super(new li(e,t),"image_in","norm_rect",!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],bt(e=this.j=new gg,0,1,t=new Le),this.u=new lh,bt(this.j,0,2,this.u),this.D=new ch,bt(this.u,0,3,this.D),this.A=new mg,bt(this.u,0,2,this.A),this.h=new k2,bt(this.j,0,3,this.h),yt(this.A,2,.5),yt(this.u,4,.5),yt(this.D,2,.5)}get baseOptions(){return Qt(this.j,Le,1)}set baseOptions(e){bt(this.j,0,1,e)}o(e){var r,s,o,a;if(Wi(this.A,3,e.numHands??1),"minHandDetectionConfidence"in e&&yt(this.A,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&yt(this.u,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&yt(this.D,2,e.minHandPresenceConfidence??.5),e.cannedGesturesClassifierOptions){var t=new Qr,n=t,i=ru(e.cannedGesturesClassifierOptions,(r=Qt(this.h,Qr,3))==null?void 0:r.l());bt(n,0,2,i),bt(this.h,0,3,t)}else e.cannedGesturesClassifierOptions===void 0&&((s=Qt(this.h,Qr,3))==null||s.g());return e.customGesturesClassifierOptions?(bt(n=t=new Qr,0,2,i=ru(e.customGesturesClassifierOptions,(o=Qt(this.h,Qr,4))==null?void 0:o.l())),bt(this.h,0,4,t)):e.customGesturesClassifierOptions===void 0&&((a=Qt(this.h,Qr,4))==null||a.g()),this.l(e)}Ha(e,t){return md(this),ui(this,e,t),gd(this)}Ia(e,t,n){return md(this),Ti(this,e,n,t),gd(this)}m(){var e=new zn;Ae(e,"image_in"),Ae(e,"norm_rect"),te(e,"hand_gestures"),te(e,"hand_landmarks"),te(e,"world_hand_landmarks"),te(e,"handedness");const t=new Bn;Ei(t,H2,this.j);const n=new bn;Fn(n,2,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect"),jt(n,"HAND_GESTURES:hand_gestures"),jt(n,"LANDMARKS:hand_landmarks"),jt(n,"WORLD_LANDMARKS:world_hand_landmarks"),jt(n,"HANDEDNESS:handedness"),n.o(t),Jn(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,r)=>{for(const s of i){i=Go(s);const o=[];for(const a of Gi(i,ag,1))o.push({x:De(a,1)??0,y:De(a,2)??0,z:De(a,3)??0,visibility:De(a,4)??0});this.landmarks.push(o)}ut(this,r)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{ut(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,r)=>{for(const s of i){i=Es(s);const o=[];for(const a of Gi(i,og,1))o.push({x:De(a,1)??0,y:De(a,2)??0,z:De(a,3)??0,visibility:De(a,4)??0});this.worldLandmarks.push(o)}ut(this,r)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{ut(this,i)}),this.g.attachProtoVectorListener("hand_gestures",(i,r)=>{this.gestures.push(..._d(i,!1)),ut(this,r)}),this.g.attachEmptyPacketListener("hand_gestures",i=>{ut(this,i)}),this.g.attachProtoVectorListener("handedness",(i,r)=>{this.handedness.push(..._d(i)),ut(this,r)}),this.g.attachEmptyPacketListener("handedness",i=>{ut(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};function vd(e){return{landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handednesses:e.handedness,handedness:e.handedness}}An.prototype.recognizeForVideo=An.prototype.Ia,An.prototype.recognize=An.prototype.Ha,An.prototype.setOptions=An.prototype.o,An.createFromModelPath=function(e,t){return Jt(An,e,{baseOptions:{modelAssetPath:t}})},An.createFromModelBuffer=function(e,t){return Jt(An,e,{baseOptions:{modelAssetBuffer:t}})},An.createFromOptions=function(e,t){return Jt(An,e,t)},An.HAND_CONNECTIONS=Sh;var wn=class extends On{constructor(e,t){super(new li(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],bt(e=this.h=new lh,0,1,t=new Le),this.u=new ch,bt(this.h,0,3,this.u),this.j=new mg,bt(this.h,0,2,this.j),Wi(this.j,3,1),yt(this.j,2,.5),yt(this.u,2,.5),yt(this.h,4,.5)}get baseOptions(){return Qt(this.h,Le,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return"numHands"in e&&Wi(this.j,3,e.numHands??1),"minHandDetectionConfidence"in e&&yt(this.j,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&yt(this.h,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&yt(this.u,2,e.minHandPresenceConfidence??.5),this.l(e)}F(e,t){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],ui(this,e,t),vd(this)}G(e,t,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Ti(this,e,n,t),vd(this)}m(){var e=new zn;Ae(e,"image_in"),Ae(e,"norm_rect"),te(e,"hand_landmarks"),te(e,"world_hand_landmarks"),te(e,"handedness");const t=new Bn;Ei(t,V2,this.h);const n=new bn;Fn(n,2,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect"),jt(n,"LANDMARKS:hand_landmarks"),jt(n,"WORLD_LANDMARKS:world_hand_landmarks"),jt(n,"HANDEDNESS:handedness"),n.o(t),Jn(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,r)=>{for(const s of i)i=Go(s),this.landmarks.push(yc(i));ut(this,r)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{ut(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,r)=>{for(const s of i)i=Es(s),this.worldLandmarks.push(xo(i));ut(this,r)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{ut(this,i)}),this.g.attachProtoVectorListener("handedness",(i,r)=>{var s=this.handedness,o=s.push;const a=[];for(const c of i){i=vc(c);const l=[];for(const u of i.g())l.push({score:De(u,2)??0,index:Kn(u,1)??0??-1,categoryName:nn(be(u,3))??""??"",displayName:nn(be(u,4))??""??""});a.push(l)}o.call(s,...a),ut(this,r)}),this.g.attachEmptyPacketListener("handedness",i=>{ut(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};wn.prototype.detectForVideo=wn.prototype.G,wn.prototype.detect=wn.prototype.F,wn.prototype.setOptions=wn.prototype.o,wn.createFromModelPath=function(e,t){return Jt(wn,e,{baseOptions:{modelAssetPath:t}})},wn.createFromModelBuffer=function(e,t){return Jt(wn,e,{baseOptions:{modelAssetBuffer:t}})},wn.createFromOptions=function(e,t){return Jt(wn,e,t)},wn.HAND_CONNECTIONS=Sh;var Xg=ci([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function xd(e){e.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function yd(e){try{if(!e.D)return e.h;e.D(e.h)}finally{Sc(e)}}function Zo(e,t){e=Go(e),t.push(yc(e))}var pe=class extends On{constructor(e,t){super(new li(e,t),"input_frames_image",null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,bt(e=this.j=new Mg,0,1,t=new Le),this.I=new ch,bt(this.j,0,2,this.I),this.W=new G2,bt(this.j,0,3,this.W),this.u=new xc,bt(this.j,0,4,this.u),this.O=new fg,bt(this.j,0,5,this.O),this.A=new xg,bt(this.j,0,6,this.A),this.M=new yg,bt(this.j,0,7,this.M),yt(this.u,2,.5),yt(this.u,3,.3),yt(this.O,2,.5),yt(this.A,2,.5),yt(this.A,3,.3),yt(this.M,2,.5),yt(this.I,2,.5)}get baseOptions(){return Qt(this.j,Le,1)}set baseOptions(e){bt(this.j,0,1,e)}o(e){return"minFaceDetectionConfidence"in e&&yt(this.u,2,e.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in e&&yt(this.u,3,e.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in e&&yt(this.O,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"minPoseDetectionConfidence"in e&&yt(this.A,2,e.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in e&&yt(this.A,3,e.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in e&&yt(this.M,2,e.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in e&&(this.outputPoseSegmentationMasks=!!e.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in e&&yt(this.I,2,e.minHandLandmarksConfidence??.5),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.D=typeof t=="function"?t:n,xd(this),ui(this,e,i),yd(this)}G(e,t,n,i){const r=typeof n!="function"?n:{};return this.D=typeof n=="function"?n:i,xd(this),Ti(this,e,r,t),yd(this)}m(){var e=new zn;Ae(e,"input_frames_image"),te(e,"pose_landmarks"),te(e,"pose_world_landmarks"),te(e,"face_landmarks"),te(e,"left_hand_landmarks"),te(e,"left_hand_world_landmarks"),te(e,"right_hand_landmarks"),te(e,"right_hand_world_landmarks");const t=new Bn,n=new qf;Fn(n,1,"type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),function(r,s){if(s!=null)if(Array.isArray(s))re(r,2,oc(s,0,Po));else{if(!(typeof s=="string"||s instanceof vi||Ru(s)))throw Error("invalid value in Any.value field: "+s+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");Qi(r,2,Lu(s,!1),Vr())}}(n,this.j.g());const i=new bn;Fn(i,2,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),Wu(i,8,qf,n),_e(i,"IMAGE:input_frames_image"),jt(i,"POSE_LANDMARKS:pose_landmarks"),jt(i,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),jt(i,"FACE_LANDMARKS:face_landmarks"),jt(i,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),jt(i,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),jt(i,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),jt(i,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),i.o(t),Jn(e,i),Mc(this,e),this.g.attachProtoListener("pose_landmarks",(r,s)=>{Zo(r,this.h.poseLandmarks),ut(this,s)}),this.g.attachEmptyPacketListener("pose_landmarks",r=>{ut(this,r)}),this.g.attachProtoListener("pose_world_landmarks",(r,s)=>{var o=this.h.poseWorldLandmarks;r=Es(r),o.push(xo(r)),ut(this,s)}),this.g.attachEmptyPacketListener("pose_world_landmarks",r=>{ut(this,r)}),this.outputPoseSegmentationMasks&&(jt(i,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),Ns(this,"pose_segmentation_mask"),this.g.Z("pose_segmentation_mask",(r,s)=>{this.h.poseSegmentationMasks=[Os(this,r,!0,!this.D)],ut(this,s)}),this.g.attachEmptyPacketListener("pose_segmentation_mask",r=>{this.h.poseSegmentationMasks=[],ut(this,r)})),this.g.attachProtoListener("face_landmarks",(r,s)=>{Zo(r,this.h.faceLandmarks),ut(this,s)}),this.g.attachEmptyPacketListener("face_landmarks",r=>{ut(this,r)}),this.outputFaceBlendshapes&&(te(e,"extra_blendshapes"),jt(i,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",(r,s)=>{var o=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(r=vc(r),o.push(dh(r.g()??[]))),ut(this,s)}),this.g.attachEmptyPacketListener("extra_blendshapes",r=>{ut(this,r)})),this.g.attachProtoListener("left_hand_landmarks",(r,s)=>{Zo(r,this.h.leftHandLandmarks),ut(this,s)}),this.g.attachEmptyPacketListener("left_hand_landmarks",r=>{ut(this,r)}),this.g.attachProtoListener("left_hand_world_landmarks",(r,s)=>{var o=this.h.leftHandWorldLandmarks;r=Es(r),o.push(xo(r)),ut(this,s)}),this.g.attachEmptyPacketListener("left_hand_world_landmarks",r=>{ut(this,r)}),this.g.attachProtoListener("right_hand_landmarks",(r,s)=>{Zo(r,this.h.rightHandLandmarks),ut(this,s)}),this.g.attachEmptyPacketListener("right_hand_landmarks",r=>{ut(this,r)}),this.g.attachProtoListener("right_hand_world_landmarks",(r,s)=>{var o=this.h.rightHandWorldLandmarks;r=Es(r),o.push(xo(r)),ut(this,s)}),this.g.attachEmptyPacketListener("right_hand_world_landmarks",r=>{ut(this,r)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};pe.prototype.detectForVideo=pe.prototype.G,pe.prototype.detect=pe.prototype.F,pe.prototype.setOptions=pe.prototype.o,pe.createFromModelPath=function(e,t){return Jt(pe,e,{baseOptions:{modelAssetPath:t}})},pe.createFromModelBuffer=function(e,t){return Jt(pe,e,{baseOptions:{modelAssetBuffer:t}})},pe.createFromOptions=function(e,t){return Jt(pe,e,t)},pe.HAND_CONNECTIONS=Sh,pe.POSE_CONNECTIONS=Xg,pe.FACE_LANDMARKS_LIPS=gh,pe.FACE_LANDMARKS_LEFT_EYE=_h,pe.FACE_LANDMARKS_LEFT_EYEBROW=vh,pe.FACE_LANDMARKS_LEFT_IRIS=Hg,pe.FACE_LANDMARKS_RIGHT_EYE=xh,pe.FACE_LANDMARKS_RIGHT_EYEBROW=yh,pe.FACE_LANDMARKS_RIGHT_IRIS=Vg,pe.FACE_LANDMARKS_FACE_OVAL=Mh,pe.FACE_LANDMARKS_CONTOURS=Gg,pe.FACE_LANDMARKS_TESSELATION=Wg;var Vn=class extends On{constructor(e,t){super(new li(e,t),"input_image","norm_rect",!0),this.j={classifications:[]},bt(e=this.h=new Sg,0,1,t=new Le)}get baseOptions(){return Qt(this.h,Le,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return bt(this.h,0,2,ru(e,Qt(this.h,oh,2))),this.l(e)}sa(e,t){return this.j={classifications:[]},ui(this,e,t),this.j}ta(e,t,n){return this.j={classifications:[]},Ti(this,e,n,t),this.j}m(){var e=new zn;Ae(e,"input_image"),Ae(e,"norm_rect"),te(e,"classifications");const t=new Bn;Ei(t,W2,this.h);const n=new bn;Fn(n,2,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),_e(n,"IMAGE:input_image"),_e(n,"NORM_RECT:norm_rect"),jt(n,"CLASSIFICATIONS:classifications"),n.o(t),Jn(e,n),this.g.attachProtoListener("classifications",(i,r)=>{this.j=$2(I2(i)),ut(this,r)}),this.g.attachEmptyPacketListener("classifications",i=>{ut(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Vn.prototype.classifyForVideo=Vn.prototype.ta,Vn.prototype.classify=Vn.prototype.sa,Vn.prototype.setOptions=Vn.prototype.o,Vn.createFromModelPath=function(e,t){return Jt(Vn,e,{baseOptions:{modelAssetPath:t}})},Vn.createFromModelBuffer=function(e,t){return Jt(Vn,e,{baseOptions:{modelAssetBuffer:t}})},Vn.createFromOptions=function(e,t){return Jt(Vn,e,t)};var Rn=class extends On{constructor(e,t){super(new li(e,t),"image_in","norm_rect",!0),this.h=new Eg,this.embeddings={embeddings:[]},bt(e=this.h,0,1,t=new Le)}get baseOptions(){return Qt(this.h,Le,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){var t=this.h,n=Qt(this.h,Qf,2);return n=n?n.clone():new Qf,e.l2Normalize!==void 0?re(n,1,Lo(e.l2Normalize)):"l2Normalize"in e&&re(n,1),e.quantize!==void 0?re(n,2,Lo(e.quantize)):"quantize"in e&&re(n,2),bt(t,0,2,n),this.l(e)}za(e,t){return ui(this,e,t),this.embeddings}Aa(e,t,n){return Ti(this,e,n,t),this.embeddings}m(){var e=new zn;Ae(e,"image_in"),Ae(e,"norm_rect"),te(e,"embeddings_out");const t=new Bn;Ei(t,X2,this.h);const n=new bn;Fn(n,2,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect"),jt(n,"EMBEDDINGS:embeddings_out"),n.o(t),Jn(e,n),this.g.attachProtoListener("embeddings_out",(i,r)=>{i=N2(i),this.embeddings=function(s){return{embeddings:Gi(s,U2,1).map(o=>{var l,u;const a={headIndex:Kn(o,3)??0??-1,headName:nn(be(o,4))??""??""};var c=o.v;return y0(c,0|c[pt],Zf,tl(o,1))!==void 0?(o=Rr(o=Qt(o,Zf,tl(o,1),void 0),1,_i,wr()),a.floatEmbedding=o.slice()):(c=new Uint8Array(0),a.quantizedEmbedding=((u=(l=Qt(o,D2,tl(o,2),void 0))==null?void 0:l.na())==null?void 0:u.h())??c),a}),timestampMs:Lg(be(s,2,void 0,void 0,Na)??m0)}}(i),ut(this,r)}),this.g.attachEmptyPacketListener("embeddings_out",i=>{ut(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Rn.cosineSimilarity=function(e,t){if(e.floatEmbedding&&t.floatEmbedding)e=sd(e.floatEmbedding,t.floatEmbedding);else{if(!e.quantizedEmbedding||!t.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");e=sd(rd(e.quantizedEmbedding),rd(t.quantizedEmbedding))}return e},Rn.prototype.embedForVideo=Rn.prototype.Aa,Rn.prototype.embed=Rn.prototype.za,Rn.prototype.setOptions=Rn.prototype.o,Rn.createFromModelPath=function(e,t){return Jt(Rn,e,{baseOptions:{modelAssetPath:t}})},Rn.createFromModelBuffer=function(e,t){return Jt(Rn,e,{baseOptions:{modelAssetBuffer:t}})},Rn.createFromOptions=function(e,t){return Jt(Rn,e,t)};var cu=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};function nv(e){var n,i;const t=function(r){return Gi(r,bn,1)}(e.ca()).filter(r=>(nn(be(r,1))??"").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));if(e.u=[],t.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");t.length===1&&(((i=(n=Qt(t[0],Bn,7))==null?void 0:n.j())==null?void 0:i.g())??new Map).forEach((r,s)=>{e.u[Number(s)]=nn(be(r,1))??""})}function Md(e){e.categoryMask=void 0,e.confidenceMasks=void 0,e.qualityScores=void 0}function Sd(e){try{const t=new cu(e.confidenceMasks,e.categoryMask,e.qualityScores);if(!e.j)return t;e.j(t)}finally{Sc(e)}}cu.prototype.close=cu.prototype.close;var yn=class extends On{constructor(e,t){super(new li(e,t),"image_in","norm_rect",!1),this.u=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new fh,this.A=new bg,bt(this.h,0,3,this.A),bt(e=this.h,0,1,t=new Le)}get baseOptions(){return Qt(this.h,Le,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?re(this.h,2,ko(e.displayNamesLocale)):"displayNamesLocale"in e&&re(this.h,2),"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}L(){nv(this)}segment(e,t,n){const i=typeof t!="function"?t:{};return this.j=typeof t=="function"?t:n,Md(this),ui(this,e,i),Sd(this)}La(e,t,n,i){const r=typeof n!="function"?n:{};return this.j=typeof n=="function"?n:i,Md(this),Ti(this,e,r,t),Sd(this)}Da(){return this.u}m(){var e=new zn;Ae(e,"image_in"),Ae(e,"norm_rect");const t=new Bn;Ei(t,Ag,this.h);const n=new bn;Fn(n,2,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect"),n.o(t),Jn(e,n),Mc(this,e),this.outputConfidenceMasks&&(te(e,"confidence_masks"),jt(n,"CONFIDENCE_MASKS:confidence_masks"),Ns(this,"confidence_masks"),this.g.aa("confidence_masks",(i,r)=>{this.confidenceMasks=i.map(s=>Os(this,s,!0,!this.j)),ut(this,r)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],ut(this,i)})),this.outputCategoryMask&&(te(e,"category_mask"),jt(n,"CATEGORY_MASK:category_mask"),Ns(this,"category_mask"),this.g.Z("category_mask",(i,r)=>{this.categoryMask=Os(this,i,!1,!this.j),ut(this,r)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,ut(this,i)})),te(e,"quality_scores"),jt(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,r)=>{this.qualityScores=i,ut(this,r)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,ut(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};yn.prototype.getLabels=yn.prototype.Da,yn.prototype.segmentForVideo=yn.prototype.La,yn.prototype.segment=yn.prototype.segment,yn.prototype.setOptions=yn.prototype.o,yn.createFromModelPath=function(e,t){return Jt(yn,e,{baseOptions:{modelAssetPath:t}})},yn.createFromModelBuffer=function(e,t){return Jt(yn,e,{baseOptions:{modelAssetBuffer:t}})},yn.createFromOptions=function(e,t){return Jt(yn,e,t)};var lu=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};lu.prototype.close=lu.prototype.close;var di=class extends On{constructor(e,t){super(new li(e,t),"image_in","norm_rect_in",!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new fh,this.u=new bg,bt(this.h,0,3,this.u),bt(e=this.h,0,1,t=new Le)}get baseOptions(){return Qt(this.h,Le,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}segment(e,t,n,i){const r=typeof n!="function"?n:{};if(this.j=typeof n=="function"?n:i,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.C+1,i=new wg,t.keypoint&&t.scribble)throw Error("Cannot provide both keypoint and scribble.");if(t.keypoint){var s=new il;Qi(s,3,Lo(!0),!1),Qi(s,1,fo(t.keypoint.x),0),Qi(s,2,fo(t.keypoint.y),0),_o(i,1,iu,s)}else{if(!t.scribble)throw Error("Must provide either a keypoint or a scribble.");{const a=new Y2;for(s of t.scribble)Qi(t=new il,3,Lo(!0),!1),Qi(t,1,fo(s.x),0),Qi(t,2,fo(s.y),0),Wu(a,1,il,t);_o(i,2,iu,a)}}this.g.addProtoToStream(i.g(),"mediapipe.tasks.vision.interactive_segmenter.proto.RegionOfInterest","roi_in",n),ui(this,e,r);t:{try{const a=new lu(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var o=a;break t}this.j(a)}finally{Sc(this)}o=void 0}return o}m(){var e=new zn;Ae(e,"image_in"),Ae(e,"roi_in"),Ae(e,"norm_rect_in");const t=new Bn;Ei(t,Ag,this.h);const n=new bn;Fn(n,2,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraphV2"),_e(n,"IMAGE:image_in"),_e(n,"ROI:roi_in"),_e(n,"NORM_RECT:norm_rect_in"),n.o(t),Jn(e,n),Mc(this,e),this.outputConfidenceMasks&&(te(e,"confidence_masks"),jt(n,"CONFIDENCE_MASKS:confidence_masks"),Ns(this,"confidence_masks"),this.g.aa("confidence_masks",(i,r)=>{this.confidenceMasks=i.map(s=>Os(this,s,!0,!this.j)),ut(this,r)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],ut(this,i)})),this.outputCategoryMask&&(te(e,"category_mask"),jt(n,"CATEGORY_MASK:category_mask"),Ns(this,"category_mask"),this.g.Z("category_mask",(i,r)=>{this.categoryMask=Os(this,i,!1,!this.j),ut(this,r)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,ut(this,i)})),te(e,"quality_scores"),jt(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,r)=>{this.qualityScores=i,ut(this,r)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,ut(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};di.prototype.segment=di.prototype.segment,di.prototype.setOptions=di.prototype.o,di.createFromModelPath=function(e,t){return Jt(di,e,{baseOptions:{modelAssetPath:t}})},di.createFromModelBuffer=function(e,t){return Jt(di,e,{baseOptions:{modelAssetBuffer:t}})},di.createFromOptions=function(e,t){return Jt(di,e,t)};var Gn=class extends On{constructor(e,t){super(new li(e,t),"input_frame_gpu","norm_rect",!1),this.j={detections:[]},bt(e=this.h=new Rg,0,1,t=new Le)}get baseOptions(){return Qt(this.h,Le,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?re(this.h,2,ko(e.displayNamesLocale)):"displayNamesLocale"in e&&re(this.h,2),e.maxResults!==void 0?Wi(this.h,3,e.maxResults):"maxResults"in e&&re(this.h,3),e.scoreThreshold!==void 0?yt(this.h,4,e.scoreThreshold):"scoreThreshold"in e&&re(this.h,4),e.categoryAllowlist!==void 0?Oa(this.h,5,e.categoryAllowlist):"categoryAllowlist"in e&&re(this.h,5),e.categoryDenylist!==void 0?Oa(this.h,6,e.categoryDenylist):"categoryDenylist"in e&&re(this.h,6),this.l(e)}F(e,t){return this.j={detections:[]},ui(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},Ti(this,e,n,t),this.j}m(){var e=new zn;Ae(e,"input_frame_gpu"),Ae(e,"norm_rect"),te(e,"detections");const t=new Bn;Ei(t,j2,this.h);const n=new bn;Fn(n,2,"mediapipe.tasks.vision.ObjectDetectorGraph"),_e(n,"IMAGE:input_frame_gpu"),_e(n,"NORM_RECT:norm_rect"),jt(n,"DETECTIONS:detections"),n.o(t),Jn(e,n),this.g.attachProtoVectorListener("detections",(i,r)=>{for(const s of i)i=sg(s),this.j.detections.push(Pg(i));ut(this,r)}),this.g.attachEmptyPacketListener("detections",i=>{ut(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Gn.prototype.detectForVideo=Gn.prototype.G,Gn.prototype.detect=Gn.prototype.F,Gn.prototype.setOptions=Gn.prototype.o,Gn.createFromModelPath=async function(e,t){return Jt(Gn,e,{baseOptions:{modelAssetPath:t}})},Gn.createFromModelBuffer=function(e,t){return Jt(Gn,e,{baseOptions:{modelAssetBuffer:t}})},Gn.createFromOptions=function(e,t){return Jt(Gn,e,t)};var uu=class{constructor(e,t,n){this.landmarks=e,this.worldLandmarks=t,this.segmentationMasks=n}close(){var e;(e=this.segmentationMasks)==null||e.forEach(t=>{t.close()})}};function Ed(e){e.landmarks=[],e.worldLandmarks=[],e.segmentationMasks=void 0}function bd(e){try{const t=new uu(e.landmarks,e.worldLandmarks,e.segmentationMasks);if(!e.u)return t;e.u(t)}finally{Sc(e)}}uu.prototype.close=uu.prototype.close;var Cn=class extends On{constructor(e,t){super(new li(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,bt(e=this.h=new Cg,0,1,t=new Le),this.A=new yg,bt(this.h,0,3,this.A),this.j=new xg,bt(this.h,0,2,this.j),Wi(this.j,4,1),yt(this.j,2,.5),yt(this.A,2,.5),yt(this.h,4,.5)}get baseOptions(){return Qt(this.h,Le,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return"numPoses"in e&&Wi(this.j,4,e.numPoses??1),"minPoseDetectionConfidence"in e&&yt(this.j,2,e.minPoseDetectionConfidence??.5),"minTrackingConfidence"in e&&yt(this.h,4,e.minTrackingConfidence??.5),"minPosePresenceConfidence"in e&&yt(this.A,2,e.minPosePresenceConfidence??.5),"outputSegmentationMasks"in e&&(this.outputSegmentationMasks=e.outputSegmentationMasks??!1),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.u=typeof t=="function"?t:n,Ed(this),ui(this,e,i),bd(this)}G(e,t,n,i){const r=typeof n!="function"?n:{};return this.u=typeof n=="function"?n:i,Ed(this),Ti(this,e,r,t),bd(this)}m(){var e=new zn;Ae(e,"image_in"),Ae(e,"norm_rect"),te(e,"normalized_landmarks"),te(e,"world_landmarks"),te(e,"segmentation_masks");const t=new Bn;Ei(t,K2,this.h);const n=new bn;Fn(n,2,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect"),jt(n,"NORM_LANDMARKS:normalized_landmarks"),jt(n,"WORLD_LANDMARKS:world_landmarks"),n.o(t),Jn(e,n),Mc(this,e),this.g.attachProtoVectorListener("normalized_landmarks",(i,r)=>{this.landmarks=[];for(const s of i)i=Go(s),this.landmarks.push(yc(i));ut(this,r)}),this.g.attachEmptyPacketListener("normalized_landmarks",i=>{this.landmarks=[],ut(this,i)}),this.g.attachProtoVectorListener("world_landmarks",(i,r)=>{this.worldLandmarks=[];for(const s of i)i=Es(s),this.worldLandmarks.push(xo(i));ut(this,r)}),this.g.attachEmptyPacketListener("world_landmarks",i=>{this.worldLandmarks=[],ut(this,i)}),this.outputSegmentationMasks&&(jt(n,"SEGMENTATION_MASK:segmentation_masks"),Ns(this,"segmentation_masks"),this.g.aa("segmentation_masks",(i,r)=>{this.segmentationMasks=i.map(s=>Os(this,s,!0,!this.u)),ut(this,r)}),this.g.attachEmptyPacketListener("segmentation_masks",i=>{this.segmentationMasks=[],ut(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Cn.prototype.detectForVideo=Cn.prototype.G,Cn.prototype.detect=Cn.prototype.F,Cn.prototype.setOptions=Cn.prototype.o,Cn.createFromModelPath=function(e,t){return Jt(Cn,e,{baseOptions:{modelAssetPath:t}})},Cn.createFromModelBuffer=function(e,t){return Jt(Cn,e,{baseOptions:{modelAssetBuffer:t}})},Cn.createFromOptions=function(e,t){return Jt(Cn,e,t)},Cn.POSE_CONNECTIONS=Xg;const Sn={referenceDistanceCm:50,referenceFaceWidthPx:null,referenceIsDefault:!0};function iv(e){if(!e)return null;const t=Array.from(e.data??e);return t.length<12?null:[[t[0],t[1],t[2]],[t[4],t[5],t[6]],[t[8],t[9],t[10]]]}function rv(e){return[[e[0][0],e[1][0],e[2][0]],[e[0][1],e[1][1],e[2][1]],[e[0][2],e[1][2],e[2][2]]]}function sv(e,t){const n=[[0,0,0],[0,0,0],[0,0,0]];for(let i=0;i<3;i+=1)for(let r=0;r<3;r+=1)n[i][r]=e[i][0]*t[0][r]+e[i][1]*t[1][r]+e[i][2]*t[2][r];return n}function ov(e){const t=Math.sqrt(e[0][0]*e[0][0]+e[1][0]*e[1][0]),n=t<1e-6;let i,r,s;return n?(i=Math.atan2(-e[1][2],e[1][1]),r=Math.atan2(-e[2][0],t),s=0):(i=Math.atan2(e[2][1],e[2][2]),r=Math.atan2(-e[2][0],t),s=Math.atan2(e[1][0],e[0][0])),{pitch:i*ba,yaw:r*ba,roll:s*ba}}function Ec(e){let t=1/0,n=-1/0,i=1/0,r=-1/0;for(const s of e)s.x<t&&(t=s.x),s.x>n&&(n=s.x),s.y<i&&(i=s.y),s.y>r&&(r=s.y);return{minX:t,maxX:n,minY:i,maxY:r,width:n-t,height:r-i}}function Me(e,t){const n=bc();return{x:n.x+e[t].x*n.width,y:n.y+e[t].y*n.height}}function Td(e,t){let n=0,i=0;for(const r of t){const s=Me(e,r);n+=s.x,i+=s.y}return{x:n/t.length,y:i/t.length}}function qg(e){return!e||!Sn.referenceFaceWidthPx||e.faceWidth<=0?null:Sn.referenceDistanceCm*(Sn.referenceFaceWidthPx/e.faceWidth)}function av(e,t="diag"){const n=bc(),i=Math.max(n.width,1e-6),r=Math.max(n.height,1e-6),s=i/r,o=J_,a=2*Math.atan(Math.tan(o*hm/2)/Math.max(s,1e-6))*ba;if(t==="x")return e*o/i;if(t==="y")return e*a/r;const c=ln([o/i,a/r]);return e*c}function cv(e,t){return!Number.isFinite(e)||!Number.isFinite(t)||t<=0?null:2*t*Math.tan(e*hm/2)}function ts(e,t,n){const i=av(e,t),r=cv(i,n),s=`${e.toFixed(e>=100?0:1)} px`,o=Number.isFinite(i)?`${i.toFixed(1)}°`:"–",a=Number.isFinite(r)?`${r.toFixed(1)} cm`:"–";return`${s} | ${o} | ${a}`}function lv(e){var i;const t=(i=e==null?void 0:e.faceLandmarks)==null?void 0:i[0];if(!t)return null;const n=bc();return Ec(t).width*n.width}function uv(e){const t=bc(),n=Ec(e),i=n.width*t.width,r=n.height*t.height,s=((n.minX+n.maxX)/2-.5)*100,o=((n.minY+n.maxY)/2-.5)*100,a=Me(e,Yt.mouthLeft),c=Me(e,Yt.mouthRight),l=Me(e,Yt.mouthTop),u=Me(e,Yt.mouthBottom),h=Zn(a,c),f=Zn(l,u),p=f/Math.max(h,1e-6),g=Me(e,Yt.leftEyeOuter),_=Me(e,Yt.leftEyeInner),m=Me(e,Yt.leftEyeTop),d=Me(e,Yt.leftEyeBottom),y=Me(e,Yt.rightEyeOuter),v=Me(e,Yt.rightEyeInner),A=Me(e,Yt.rightEyeTop),C=Me(e,Yt.rightEyeBottom),T=Zn(g,_),w=Zn(y,v),V=Zn(m,d),S=Zn(A,C),b=V/Math.max(T,1e-6),z=S/Math.max(w,1e-6),q=Td(e,Yt.leftIris),et=Td(e,Yt.rightIris),P=Zn(q,et),F=ln([Zn(Me(e,469),Me(e,471)),Zn(Me(e,474),Me(e,476)),Zn(Me(e,470),Me(e,472)),Zn(Me(e,475),Me(e,477))]),G={y:(m.y+d.y)/2},Y={y:(A.y+C.y)/2},X=ln(Yt.leftBrow.map(at=>Me(e,at).y)),W=ln(Yt.rightBrow.map(at=>Me(e,at).y)),K=(G.y-X)/Math.max(r,1e-6),Q=(Y.y-W)/Math.max(r,1e-6);return{faceWidth:i,faceHeight:r,faceRatio:i/Math.max(r,1e-6),faceCenterX:s,faceCenterY:o,mouthWidth:h,mouthHeight:f,mouthAspect:p,leftEAR:b,rightEAR:z,interEye:P,irisDiameter:F,leftBrowHeight:K,rightBrowHeight:Q}}function Yg(e){if(!e){Gc.textContent="–",Wc.textContent="Proxy only",Xc.textContent="–",qc.textContent="–",Yc.textContent="–",jc.textContent="–",$c(Number.NaN);return}const t=qg(e);if(Number.isFinite(t)){const n=Sn.referenceDistanceCm-t;$c(n),As()&&(Xc.textContent=`${e.faceWidth.toFixed(0)} px`,qc.textContent=`${e.faceHeight.toFixed(0)} px`,Yc.textContent=`${e.interEye.toFixed(0)} px`,jc.textContent=`${e.irisDiameter.toFixed(1)} px`,Gc.textContent=`${t.toFixed(1)} cm`,rf.textContent="Approximate calibrated estimate from apparent face size.",Wc.textContent=Sn.referenceIsDefault?"Default (50 cm)":"Calibrated")}else{const n=e.faceWidth/100;$c(Number.NaN),As()&&(Xc.textContent=`${e.faceWidth.toFixed(0)} px`,qc.textContent=`${e.faceHeight.toFixed(0)} px`,Yc.textContent=`${e.interEye.toFixed(0)} px`,jc.textContent=`${e.irisDiameter.toFixed(1)} px`,Gc.textContent=`${n.toFixed(2)}×`,rf.textContent="Relative proximity proxy only. Larger value means closer to the camera.",Wc.textContent="Proxy only")}}function jg(e){if(!e){cf.textContent="–",lf.textContent="–",uf.textContent="–",hf.textContent="–",sf.textContent="–",of.textContent="–",af.textContent="–",ff.textContent="–",df.textContent="–",pf.textContent="–",mf.textContent="–",gf.textContent="–",_f.textContent="–",vf.textContent="–";return}if(!As())return;const t=qg(e);cf.textContent=ts(e.faceWidth,"x",t),lf.textContent=ts(e.faceHeight,"y",t),uf.textContent=ts(e.interEye,"x",t),hf.textContent=ts(e.irisDiameter,"diag",t),sf.textContent=ts(e.mouthWidth,"x",t),of.textContent=ts(e.mouthHeight,"y",t),af.textContent=e.mouthAspect.toFixed(3),ff.textContent=e.leftEAR.toFixed(3),df.textContent=e.rightEAR.toFixed(3),pf.textContent=e.leftBrowHeight.toFixed(3),mf.textContent=e.rightBrowHeight.toFixed(3),gf.textContent=e.faceRatio.toFixed(3),_f.textContent=`${e.faceCenterX.toFixed(1)}%`,vf.textContent=`${e.faceCenterY.toFixed(1)}%`}const Eh=Yn.getContext("2d"),Fe=Bi.getContext("2d");let hu=null,Ca=null;function Kg(){const e=fe.videoWidth||1280,t=fe.videoHeight||720;return hu={x:0,y:0,width:e,height:t},hu}function bc(){return hu??Kg()}function bh(){const t=Yn.parentElement.getBoundingClientRect(),n=Math.min(window.devicePixelRatio||1,mm),i=Math.max(1,Math.round(t.width*n)),r=Math.max(1,Math.round(t.height*n));(Yn.width!==i||Yn.height!==r)&&(Yn.width=i,Yn.height=r),(Bi.width!==i||Bi.height!==r)&&(Bi.width=i,Bi.height=r),Eh.setTransform(n,0,0,n,0,0),Fe.setTransform(n,0,0,n,0,0)}function Tc(){Eh.clearRect(0,0,Yn.width,Yn.height),Fe.clearRect(0,0,Bi.width,Bi.height)}function $g(){Ca=null}function Ad(e,t,n){const i=he(e.size,1,Math.min(t,n));return{x:he(e.x,0,Math.max(0,t-i)),y:he(e.y,0,Math.max(0,n-i)),size:i}}function hv(e,t,n){const i=Ad(e,t,n),r=Ca;if(!r)return Ca=i,i;const s=Ad({x:kc(r.x,i.x,zc),y:kc(r.y,i.y,zc),size:kc(r.size,i.size,Math.min(.48,zc+.08))},t,n);return Ca=s,s}function fv(e,t){var v;if(!e||fe.readyState<2)return null;const n=fe.videoWidth||1280,i=fe.videoHeight||720,r=Ec(e);let s=r.minX*n,o=r.maxX*n,a=r.minY*i,c=r.maxY*i;const l=Math.max(1,o-s),u=Math.max(1,c-a);s-=l*.42,o+=l*.42,a-=u*.54,c+=u*.72;const h=(v=t==null?void 0:t.landmarks)==null?void 0:v[0];if(h!=null&&h[11]&&(h!=null&&h[12])){const A=h[11],C=h[12];if((A.visibility??1)>.35&&(C.visibility??1)>.35){const T=Math.min(A.x,C.x)*n,w=Math.max(A.x,C.x)*n,V=Math.max(A.y,C.y)*i;s=Math.min(s,T-l*.22),o=Math.max(o,w+l*.22),c=Math.max(c,V+u*.26)}}let f=Math.max(o-s,c-a);f=Math.min(f*1.02,Math.min(n,i));const p=(r.minX+r.maxX)/2*n,g=(r.minY+r.maxY)/2*i,_=.5,m=.43;let d=p-f*_,y=g-f*m;return d=he(d,0,Math.max(0,n-f)),y=he(y,0,Math.max(0,i-f)),hv({x:d,y,size:f},n,i)}function Va(e,t,n,i){return{x:(e.x*(fe.videoWidth||1280)-t.x)/t.size*n,y:(e.y*(fe.videoHeight||720)-t.y)/t.size*i}}function pi(e,t,n,i={}){if(!Array.isArray(t)||t.length===0)return;const r=Bi.clientWidth,s=Bi.clientHeight;Fe.save(),Fe.lineJoin="round",Fe.lineCap="round",Fe.strokeStyle=i.color??"rgba(255,255,255,0.85)",Fe.lineWidth=i.lineWidth??1.5,Fe.beginPath();for(const o of t){const a=o.start??o[0],c=o.end??o[1];if(a==null||c==null||!e[a]||!e[c])continue;const l=Va(e[a],n,r,s),u=Va(e[c],n,r,s);Fe.moveTo(l.x,l.y),Fe.lineTo(u.x,u.y)}Fe.stroke(),Fe.restore()}function dv(e,t){var o;if(bh(),Tc(),!e||fe.readyState<2)return;const n=fv(e,t);if(!n)return;const i=Yn.clientWidth||Yn.parentElement.clientWidth||1,r=Yn.clientHeight||Yn.parentElement.clientHeight||1;Eh.drawImage(fe,n.x,n.y,n.size,n.size,0,0,i,r),pi(e,Zt.FACE_LANDMARKS_TESSELATION,n,{color:"rgba(120, 140, 150, 0.35)",lineWidth:.65}),pi(e,Zt.FACE_LANDMARKS_FACE_OVAL,n,{color:"rgba(230, 240, 255, 0.95)",lineWidth:1.8}),pi(e,Zt.FACE_LANDMARKS_LEFT_EYE,n,{color:"rgba(70, 110, 255, 0.95)",lineWidth:1.7}),pi(e,Zt.FACE_LANDMARKS_RIGHT_EYE,n,{color:"rgba(70, 255, 110, 0.95)",lineWidth:1.7}),pi(e,Zt.FACE_LANDMARKS_LEFT_EYEBROW,n,{color:"rgba(70, 110, 255, 0.95)",lineWidth:1.3}),pi(e,Zt.FACE_LANDMARKS_RIGHT_EYEBROW,n,{color:"rgba(70, 255, 110, 0.95)",lineWidth:1.3}),pi(e,Zt.FACE_LANDMARKS_LEFT_IRIS,n,{color:"rgba(35, 70, 255, 0.98)",lineWidth:1.7}),pi(e,Zt.FACE_LANDMARKS_RIGHT_IRIS,n,{color:"rgba(40, 220, 70, 0.98)",lineWidth:1.7}),pi(e,Zt.FACE_LANDMARKS_LIPS,n,{color:"rgba(255, 210, 160, 0.9)",lineWidth:1.4}),pi(e,Zt.FACE_LANDMARKS_NOSE,n,{color:"rgba(255, 90, 90, 0.78)",lineWidth:1.2});const s=(o=t==null?void 0:t.landmarks)==null?void 0:o[0];if(s!=null&&s[11]&&(s!=null&&s[12])){const a=s[11],c=s[12];if((a.visibility??1)>.35&&(c.visibility??1)>.35){const l=Va(a,n,i,r),u=Va(c,n,i,r);Fe.save(),Fe.strokeStyle="rgba(110, 225, 255, 0.8)",Fe.lineWidth=2,Fe.beginPath(),Fe.moveTo(l.x,l.y),Fe.lineTo(u.x,u.y),Fe.stroke(),Fe.restore()}}}const pv=.04,Io=20,mv=.03,fu=new Float32Array(Io),du=new Float32Array(Io);let po=0,Ga=0;const ke={score:1,jitter:0,inFrame:1,confidence:1,hint:""};function gv(){const e=Math.min(Ga,Io);if(e<3)return 0;let t=0,n=0;for(let r=0;r<e;r++)t+=fu[r],n+=du[r];t/=e,n/=e;let i=0;for(let r=0;r<e;r++){const s=fu[r]-t,o=du[r]-n;i+=s*s+o*o}return Math.sqrt(i/e)}function _v(e){var h;const t=(h=e==null?void 0:e.faceLandmarks)==null?void 0:h[0];if(!t)return ke;const n=t[Yt.noseTip];fu[po]=n.x,du[po]=n.y,po=(po+1)%Io,Ga<Io&&Ga++;const i=gv(),r=he(i/mv,0,1);ke.jitter=i;const s=Ec(t),o=he(s.maxX,0,1)-he(s.minX,0,1),a=he(s.maxY,0,1)-he(s.minY,0,1),c=s.width>0&&s.height>0?he(o*a/(s.width*s.height),0,1):1;ke.inFrame=c;const l=s.width*s.height,u=he(l/pv,0,1);return ke.confidence=u,ke.score=he(.35*(1-r)+.35*c+.3*u,0,1),r>.65?ke.hint="Hold still for better tracking accuracy":c<.75?ke.hint="Move closer to the centre of the frame":u<.5?ke.hint="Move closer to the camera":ke.score<Ia?ke.hint="Tracking quality is low":ke.hint="",ke}function vv(){return ke}function xv(){return ke.score<Ia}function yv(){po=0,Ga=0,ke.score=1,ke.jitter=0,ke.inFrame=1,ke.confidence=1,ke.hint=""}function Mv(e,t){const n=$h(e,Yt.leftIris),i=$h(e,Yt.rightIris);if(!n||!i)return null;const r=Math.min(e[Yt.leftEyeOuter].x,e[Yt.leftEyeInner].x),s=Math.max(e[Yt.leftEyeOuter].x,e[Yt.leftEyeInner].x),o=Math.min(e[Yt.rightEyeOuter].x,e[Yt.rightEyeInner].x),a=Math.max(e[Yt.rightEyeOuter].x,e[Yt.rightEyeInner].x),c=Math.min(e[Yt.leftEyeTop].y,e[Yt.leftEyeBottom].y),l=Math.max(e[Yt.leftEyeTop].y,e[Yt.leftEyeBottom].y),u=Math.min(e[Yt.rightEyeTop].y,e[Yt.rightEyeBottom].y),h=Math.max(e[Yt.rightEyeTop].y,e[Yt.rightEyeBottom].y),f=(n.x-r)/Math.max(1e-6,s-r),p=(i.x-o)/Math.max(1e-6,a-o),g=(n.y-c)/Math.max(1e-6,l-c),_=(i.y-u)/Math.max(1e-6,h-u),m=(f-.5+(p-.5))/2*2,d=(g-.5+(_-.5))/2*2,y=((t==null?void 0:t.yaw)??0)/22+m*1.15,v=((t==null?void 0:t.pitch)??0)/16+d*.9,A=Math.abs(y)<.95&&Math.abs(v)<.95,C=Math.abs(y)>1.35||Math.abs(v)>1.2;return{lookingAtCamera:A,lookingAway:C,gazeHoriz:m,gazeVert:d,confidence:he(1-(Math.abs(y)+Math.abs(v))/2.4,0,1)}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Th="160",Sv=0,wd=1,Ev=2,Jg=1,bv=2,Di=3,pr=0,En=1,Fi=2,cr=0,bs=1,Rd=2,Cd=3,Ld=4,Tv=5,Tr=100,Av=101,wv=102,Pd=103,Id=104,Rv=200,Cv=201,Lv=202,Pv=203,pu=204,mu=205,Iv=206,Dv=207,Uv=208,Nv=209,Fv=210,Ov=211,Bv=212,zv=213,kv=214,Hv=0,Vv=1,Gv=2,Wa=3,Wv=4,Xv=5,qv=6,Yv=7,Zg=0,jv=1,Kv=2,lr=0,$v=1,Jv=2,Zv=3,Qv=4,tx=5,ex=6,Qg=300,Bs=301,zs=302,gu=303,_u=304,Ac=306,vu=1e3,ri=1001,xu=1002,vn=1003,Dd=1004,sl=1005,Xn=1006,nx=1007,Do=1008,ur=1009,ix=1010,rx=1011,Ah=1012,t_=1013,nr=1014,ir=1015,Uo=1016,e_=1017,n_=1018,Or=1020,sx=1021,si=1023,ox=1024,ax=1025,Br=1026,ks=1027,cx=1028,i_=1029,lx=1030,r_=1031,s_=1033,ol=33776,al=33777,cl=33778,ll=33779,Ud=35840,Nd=35841,Fd=35842,Od=35843,o_=36196,Bd=37492,zd=37496,kd=37808,Hd=37809,Vd=37810,Gd=37811,Wd=37812,Xd=37813,qd=37814,Yd=37815,jd=37816,Kd=37817,$d=37818,Jd=37819,Zd=37820,Qd=37821,ul=36492,tp=36494,ep=36495,ux=36283,np=36284,ip=36285,rp=36286,a_=3e3,zr=3001,hx=3200,fx=3201,c_=0,dx=1,jn="",tn="srgb",Xi="srgb-linear",wh="display-p3",wc="display-p3-linear",Xa="linear",de="srgb",qa="rec709",Ya="p3",es=7680,sp=519,px=512,mx=513,gx=514,l_=515,_x=516,vx=517,xx=518,yx=519,op=35044,ap="300 es",yu=1035,ki=2e3,ja=2001;class to{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let cp=1234567;const yo=Math.PI/180,No=180/Math.PI;function eo(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(on[e&255]+on[e>>8&255]+on[e>>16&255]+on[e>>24&255]+"-"+on[t&255]+on[t>>8&255]+"-"+on[t>>16&15|64]+on[t>>24&255]+"-"+on[n&63|128]+on[n>>8&255]+"-"+on[n>>16&255]+on[n>>24&255]+on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]).toLowerCase()}function Ze(e,t,n){return Math.max(t,Math.min(n,e))}function Rh(e,t){return(e%t+t)%t}function Mx(e,t,n,i,r){return i+(e-t)*(r-i)/(n-t)}function Sx(e,t,n){return e!==t?(n-e)/(t-e):0}function Mo(e,t,n){return(1-n)*e+n*t}function Ex(e,t,n,i){return Mo(e,t,1-Math.exp(-n*i))}function bx(e,t=1){return t-Math.abs(Rh(e,t*2)-t)}function Tx(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Ax(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function wx(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Rx(e,t){return e+Math.random()*(t-e)}function Cx(e){return e*(.5-Math.random())}function Lx(e){e!==void 0&&(cp=e);let t=cp+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Px(e){return e*yo}function Ix(e){return e*No}function Mu(e){return(e&e-1)===0&&e!==0}function Dx(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))}function Ka(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function Ux(e,t,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),c=o(n/2),l=s((t+i)/2),u=o((t+i)/2),h=s((t-i)/2),f=o((t-i)/2),p=s((i-t)/2),g=o((i-t)/2);switch(r){case"XYX":e.set(a*u,c*h,c*f,a*l);break;case"YZY":e.set(c*f,a*u,c*h,a*l);break;case"ZXZ":e.set(c*h,c*f,a*u,a*l);break;case"XZX":e.set(a*u,c*g,c*p,a*l);break;case"YXY":e.set(c*p,a*u,c*g,a*l);break;case"ZYZ":e.set(c*g,c*p,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function vs(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function gn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}const hl={DEG2RAD:yo,RAD2DEG:No,generateUUID:eo,clamp:Ze,euclideanModulo:Rh,mapLinear:Mx,inverseLerp:Sx,lerp:Mo,damp:Ex,pingpong:bx,smoothstep:Tx,smootherstep:Ax,randInt:wx,randFloat:Rx,randFloatSpread:Cx,seededRandom:Lx,degToRad:Px,radToDeg:Ix,isPowerOfTwo:Mu,ceilPowerOfTwo:Dx,floorPowerOfTwo:Ka,setQuaternionFromProperEuler:Ux,normalize:gn,denormalize:vs};class dt{constructor(t=0,n=0){dt.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(Ze(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xt{constructor(t,n,i,r,s,o,a,c,l){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,o,a,c,l)}set(t,n,i,r,s,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],h=i[7],f=i[2],p=i[5],g=i[8],_=r[0],m=r[3],d=r[6],y=r[1],v=r[4],A=r[7],C=r[2],T=r[5],w=r[8];return s[0]=o*_+a*y+c*C,s[3]=o*m+a*v+c*T,s[6]=o*d+a*A+c*w,s[1]=l*_+u*y+h*C,s[4]=l*m+u*v+h*T,s[7]=l*d+u*A+h*w,s[2]=f*_+p*y+g*C,s[5]=f*m+p*v+g*T,s[8]=f*d+p*A+g*w,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return n*o*u-n*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,f=a*c-u*s,p=l*s-o*c,g=n*h+i*f+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(r*l-u*i)*_,t[2]=(a*i-r*o)*_,t[3]=f*_,t[4]=(u*n-r*c)*_,t[5]=(r*s-a*n)*_,t[6]=p*_,t[7]=(i*c-l*n)*_,t[8]=(o*n-i*s)*_,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-r*l,r*c,-r*(-l*o+c*a)+a+n,0,0,1),this}scale(t,n){return this.premultiply(fl.makeScale(t,n)),this}rotate(t){return this.premultiply(fl.makeRotation(-t)),this}translate(t,n){return this.premultiply(fl.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const fl=new Xt;function u_(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function $a(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function Nx(){const e=$a("canvas");return e.style.display="block",e}const lp={};function So(e){e in lp||(lp[e]=!0,console.warn(e))}const up=new Xt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),hp=new Xt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Qo={[Xi]:{transfer:Xa,primaries:qa,toReference:e=>e,fromReference:e=>e},[tn]:{transfer:de,primaries:qa,toReference:e=>e.convertSRGBToLinear(),fromReference:e=>e.convertLinearToSRGB()},[wc]:{transfer:Xa,primaries:Ya,toReference:e=>e.applyMatrix3(hp),fromReference:e=>e.applyMatrix3(up)},[wh]:{transfer:de,primaries:Ya,toReference:e=>e.convertSRGBToLinear().applyMatrix3(hp),fromReference:e=>e.applyMatrix3(up).convertLinearToSRGB()}},Fx=new Set([Xi,wc]),ie={enabled:!0,_workingColorSpace:Xi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(e){if(!Fx.has(e))throw new Error(`Unsupported working color space, "${e}".`);this._workingColorSpace=e},convert:function(e,t,n){if(this.enabled===!1||t===n||!t||!n)return e;const i=Qo[t].toReference,r=Qo[n].fromReference;return r(i(e))},fromWorkingColorSpace:function(e,t){return this.convert(e,this._workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this._workingColorSpace)},getPrimaries:function(e){return Qo[e].primaries},getTransfer:function(e){return e===jn?Xa:Qo[e].transfer}};function Ts(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function dl(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let ns;class h_{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ns===void 0&&(ns=$a("canvas")),ns.width=t.width,ns.height=t.height;const i=ns.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=ns}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=$a("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ts(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ts(n[i]/255)*255):n[i]=Ts(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ox=0;class f_{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ox++}),this.uuid=eo(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(pl(r[o].image)):s.push(pl(r[o]))}else s=pl(r);i.url=s}return n||(t.images[this.uuid]=i),i}}function pl(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?h_.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bx=0;class Un extends to{constructor(t=Un.DEFAULT_IMAGE,n=Un.DEFAULT_MAPPING,i=ri,r=ri,s=Xn,o=Do,a=si,c=ur,l=Un.DEFAULT_ANISOTROPY,u=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bx++}),this.uuid=eo(),this.name="",this.source=new f_(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new dt(0,0),this.repeat=new dt(1,1),this.center=new dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(So("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===zr?tn:jn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Qg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case vu:t.x=t.x-Math.floor(t.x);break;case ri:t.x=t.x<0?0:1;break;case xu:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case vu:t.y=t.y-Math.floor(t.y);break;case ri:t.y=t.y<0?0:1;break;case xu:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return So("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===tn?zr:a_}set encoding(t){So("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===zr?tn:jn}}Un.DEFAULT_IMAGE=null;Un.DEFAULT_MAPPING=Qg;Un.DEFAULT_ANISOTROPY=1;class Qe{constructor(t=0,n=0,i=0,r=1){Qe.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,r){return this.x=t,this.y=n,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,r,s;const c=t.elements,l=c[0],u=c[4],h=c[8],f=c[1],p=c[5],g=c[9],_=c[2],m=c[6],d=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(l+1)/2,A=(p+1)/2,C=(d+1)/2,T=(u+f)/4,w=(h+_)/4,V=(g+m)/4;return v>A&&v>C?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=T/i,s=w/i):A>C?A<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(A),i=T/r,s=V/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=w/s,r=V/s),this.set(i,r,s,n),this}let y=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(h-_)/y,this.z=(f-u)/y,this.w=Math.acos((l+p+d-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zx extends to{constructor(t=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new Qe(0,0,t,n),this.scissorTest=!1,this.viewport=new Qe(0,0,t,n);const r={width:t,height:n,depth:1};i.encoding!==void 0&&(So("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===zr?tn:jn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Un(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(t,n,i=1){(this.width!==t||this.height!==n||this.depth!==i)&&(this.width=t,this.height=n,this.depth=i,this.texture.image.width=t,this.texture.image.height=n,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new f_(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xr extends zx{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class d_ extends Un{constructor(t=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=vn,this.minFilter=vn,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class kx extends Un{constructor(t=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=vn,this.minFilter=vn,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wo{constructor(t=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=r}static slerpFlat(t,n,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],h=i[r+3];const f=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[n+0]=c,t[n+1]=l,t[n+2]=u,t[n+3]=h;return}if(a===1){t[n+0]=f,t[n+1]=p,t[n+2]=g,t[n+3]=_;return}if(h!==_||c!==f||l!==p||u!==g){let m=1-a;const d=c*f+l*p+u*g+h*_,y=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const C=Math.sqrt(v),T=Math.atan2(C,d*y);m=Math.sin(m*T)/C,a=Math.sin(a*T)/C}const A=a*y;if(c=c*m+f*A,l=l*m+p*A,u=u*m+g*A,h=h*m+_*A,m===1-a){const C=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=C,l*=C,u*=C,h*=C}}t[n]=c,t[n+1]=l,t[n+2]=u,t[n+3]=h}static multiplyQuaternionsFlat(t,n,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],h=s[o],f=s[o+1],p=s[o+2],g=s[o+3];return t[n]=a*g+u*h+c*p-l*f,t[n+1]=c*g+u*f+l*h-a*p,t[n+2]=l*g+u*p+a*f-c*h,t[n+3]=u*g-a*h-c*f-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,r){return this._x=t,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),h=a(s/2),f=c(i/2),p=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=f*u*h+l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h+f*p*g;break;case"YZX":this._x=f*u*h+l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h-f*p*g;break;case"XZY":this._x=f*u*h-l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],c=n[9],l=n[2],u=n[6],h=n[10],f=i+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(o-r)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(u-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+l)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(s-l)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ze(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,r=t._y,s=t._z,o=t._w,a=n._x,c=n._y,l=n._z,u=n._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-n)*u)/l,f=Math.sin(n*u)/l;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=Math.random(),n=Math.sqrt(1-t),i=Math.sqrt(t),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(n*Math.cos(r),i*Math.sin(s),i*Math.cos(s),n*Math.sin(r))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,n=0,i=0){L.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(fp.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(fp.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const n=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*r-a*i),u=2*(a*n-s*r),h=2*(s*i-o*n);return this.x=n+c*l+o*h-a*u,this.y=i+c*u+a*l-s*h,this.z=r+c*h+s*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,r=t.y,s=t.z,o=n.x,a=n.y,c=n.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ml.copy(this).projectOnVector(t),this.sub(ml)}reflect(t){return this.sub(ml.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(Ze(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return n*n+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const r=Math.sin(n)*t;return this.x=r*Math.sin(i),this.y=Math.cos(n)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,i=Math.sqrt(1-t**2);return this.x=i*Math.cos(n),this.y=i*Math.sin(n),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ml=new L,fp=new Wo;class Xo{constructor(t=new L(1/0,1/0,1/0),n=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(Qn.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(Qn.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=Qn.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Qn):Qn.fromBufferAttribute(s,o),Qn.applyMatrix4(t.matrixWorld),this.expandByPoint(Qn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ta.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ta.copy(i.boundingBox)),ta.applyMatrix4(t.matrixWorld),this.union(ta)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Qn),Qn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ao),ea.subVectors(this.max,ao),is.subVectors(t.a,ao),rs.subVectors(t.b,ao),ss.subVectors(t.c,ao),ji.subVectors(rs,is),Ki.subVectors(ss,rs),xr.subVectors(is,ss);let n=[0,-ji.z,ji.y,0,-Ki.z,Ki.y,0,-xr.z,xr.y,ji.z,0,-ji.x,Ki.z,0,-Ki.x,xr.z,0,-xr.x,-ji.y,ji.x,0,-Ki.y,Ki.x,0,-xr.y,xr.x,0];return!gl(n,is,rs,ss,ea)||(n=[1,0,0,0,1,0,0,0,1],!gl(n,is,rs,ss,ea))?!1:(na.crossVectors(ji,Ki),n=[na.x,na.y,na.z],gl(n,is,rs,ss,ea))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ri),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ri=[new L,new L,new L,new L,new L,new L,new L,new L],Qn=new L,ta=new Xo,is=new L,rs=new L,ss=new L,ji=new L,Ki=new L,xr=new L,ao=new L,ea=new L,na=new L,yr=new L;function gl(e,t,n,i,r){for(let s=0,o=e.length-3;s<=o;s+=3){yr.fromArray(e,s);const a=r.x*Math.abs(yr.x)+r.y*Math.abs(yr.y)+r.z*Math.abs(yr.z),c=t.dot(yr),l=n.dot(yr),u=i.dot(yr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Hx=new Xo,co=new L,_l=new L;class Rc{constructor(t=new L,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):Hx.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;co.subVectors(t,this.center);const n=co.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(co,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_l.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(co.copy(t.center).add(_l)),this.expandByPoint(co.copy(t.center).sub(_l))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ci=new L,vl=new L,ia=new L,$i=new L,xl=new L,ra=new L,yl=new L;class p_{constructor(t=new L,n=new L(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ci)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Ci.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Ci.copy(this.origin).addScaledVector(this.direction,n),Ci.distanceToSquared(t))}distanceSqToSegment(t,n,i,r){vl.copy(t).add(n).multiplyScalar(.5),ia.copy(n).sub(t).normalize(),$i.copy(this.origin).sub(vl);const s=t.distanceTo(n)*.5,o=-this.direction.dot(ia),a=$i.dot(this.direction),c=-$i.dot(ia),l=$i.lengthSq(),u=Math.abs(1-o*o);let h,f,p,g;if(u>0)if(h=o*c-a,f=o*a-c,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,p=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-c),s),p=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-s,-c),s),p=f*(f+2*c)+l):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-c),s),p=-h*h+f*(f+2*c)+l);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(vl).addScaledVector(ia,f),p}intersectSphere(t,n){Ci.subVectors(t.center,this.origin);const i=Ci.dot(this.direction),r=Ci.dot(Ci)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,n):this.at(a,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,r=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,r=(t.min.x-f.x)*l),u>=0?(s=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(t){return this.intersectBox(t,Ci)!==null}intersectTriangle(t,n,i,r,s){xl.subVectors(n,t),ra.subVectors(i,t),yl.crossVectors(xl,ra);let o=this.direction.dot(yl),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;$i.subVectors(this.origin,t);const c=a*this.direction.dot(ra.crossVectors($i,ra));if(c<0)return null;const l=a*this.direction.dot(xl.cross($i));if(l<0||c+l>o)return null;const u=-a*$i.dot(yl);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ue{constructor(t,n,i,r,s,o,a,c,l,u,h,f,p,g,_,m){Ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,o,a,c,l,u,h,f,p,g,_,m)}set(t,n,i,r,s,o,a,c,l,u,h,f,p,g,_,m){const d=this.elements;return d[0]=t,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ue().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,i=t.elements,r=1/os.setFromMatrixColumn(t,0).length(),s=1/os.setFromMatrixColumn(t,1).length(),o=1/os.setFromMatrixColumn(t,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=o*u,p=o*h,g=a*u,_=a*h;n[0]=c*u,n[4]=-c*h,n[8]=l,n[1]=p+g*l,n[5]=f-_*l,n[9]=-a*c,n[2]=_-f*l,n[6]=g+p*l,n[10]=o*c}else if(t.order==="YXZ"){const f=c*u,p=c*h,g=l*u,_=l*h;n[0]=f+_*a,n[4]=g*a-p,n[8]=o*l,n[1]=o*h,n[5]=o*u,n[9]=-a,n[2]=p*a-g,n[6]=_+f*a,n[10]=o*c}else if(t.order==="ZXY"){const f=c*u,p=c*h,g=l*u,_=l*h;n[0]=f-_*a,n[4]=-o*h,n[8]=g+p*a,n[1]=p+g*a,n[5]=o*u,n[9]=_-f*a,n[2]=-o*l,n[6]=a,n[10]=o*c}else if(t.order==="ZYX"){const f=o*u,p=o*h,g=a*u,_=a*h;n[0]=c*u,n[4]=g*l-p,n[8]=f*l+_,n[1]=c*h,n[5]=_*l+f,n[9]=p*l-g,n[2]=-l,n[6]=a*c,n[10]=o*c}else if(t.order==="YZX"){const f=o*c,p=o*l,g=a*c,_=a*l;n[0]=c*u,n[4]=_-f*h,n[8]=g*h+p,n[1]=h,n[5]=o*u,n[9]=-a*u,n[2]=-l*u,n[6]=p*h+g,n[10]=f-_*h}else if(t.order==="XZY"){const f=o*c,p=o*l,g=a*c,_=a*l;n[0]=c*u,n[4]=-h,n[8]=l*u,n[1]=f*h+_,n[5]=o*u,n[9]=p*h-g,n[2]=g*h-p,n[6]=a*u,n[10]=_*h+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Vx,t,Gx)}lookAt(t,n,i){const r=this.elements;return Ln.subVectors(t,n),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),Ji.crossVectors(i,Ln),Ji.lengthSq()===0&&(Math.abs(i.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),Ji.crossVectors(i,Ln)),Ji.normalize(),sa.crossVectors(Ln,Ji),r[0]=Ji.x,r[4]=sa.x,r[8]=Ln.x,r[1]=Ji.y,r[5]=sa.y,r[9]=Ln.y,r[2]=Ji.z,r[6]=sa.z,r[10]=Ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],h=i[5],f=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],y=i[3],v=i[7],A=i[11],C=i[15],T=r[0],w=r[4],V=r[8],S=r[12],b=r[1],z=r[5],q=r[9],et=r[13],P=r[2],F=r[6],G=r[10],Y=r[14],X=r[3],W=r[7],K=r[11],Q=r[15];return s[0]=o*T+a*b+c*P+l*X,s[4]=o*w+a*z+c*F+l*W,s[8]=o*V+a*q+c*G+l*K,s[12]=o*S+a*et+c*Y+l*Q,s[1]=u*T+h*b+f*P+p*X,s[5]=u*w+h*z+f*F+p*W,s[9]=u*V+h*q+f*G+p*K,s[13]=u*S+h*et+f*Y+p*Q,s[2]=g*T+_*b+m*P+d*X,s[6]=g*w+_*z+m*F+d*W,s[10]=g*V+_*q+m*G+d*K,s[14]=g*S+_*et+m*Y+d*Q,s[3]=y*T+v*b+A*P+C*X,s[7]=y*w+v*z+A*F+C*W,s[11]=y*V+v*q+A*G+C*K,s[15]=y*S+v*et+A*Y+C*Q,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],f=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+s*c*h-r*l*h-s*a*f+i*l*f+r*a*p-i*c*p)+_*(+n*c*p-n*l*f+s*o*f-r*o*p+r*l*u-s*c*u)+m*(+n*l*h-n*a*p-s*o*h+i*o*p+s*a*u-i*l*u)+d*(-r*a*u-n*c*h+n*a*f+r*o*h-i*o*f+i*c*u)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=n,r[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],f=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],y=h*m*l-_*f*l+_*c*p-a*m*p-h*c*d+a*f*d,v=g*f*l-u*m*l-g*c*p+o*m*p+u*c*d-o*f*d,A=u*_*l-g*h*l+g*a*p-o*_*p-u*a*d+o*h*d,C=g*h*c-u*_*c-g*a*f+o*_*f+u*a*m-o*h*m,T=n*y+i*v+r*A+s*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/T;return t[0]=y*w,t[1]=(_*f*s-h*m*s-_*r*p+i*m*p+h*r*d-i*f*d)*w,t[2]=(a*m*s-_*c*s+_*r*l-i*m*l-a*r*d+i*c*d)*w,t[3]=(h*c*s-a*f*s-h*r*l+i*f*l+a*r*p-i*c*p)*w,t[4]=v*w,t[5]=(u*m*s-g*f*s+g*r*p-n*m*p-u*r*d+n*f*d)*w,t[6]=(g*c*s-o*m*s-g*r*l+n*m*l+o*r*d-n*c*d)*w,t[7]=(o*f*s-u*c*s+u*r*l-n*f*l-o*r*p+n*c*p)*w,t[8]=A*w,t[9]=(g*h*s-u*_*s-g*i*p+n*_*p+u*i*d-n*h*d)*w,t[10]=(o*_*s-g*a*s+g*i*l-n*_*l-o*i*d+n*a*d)*w,t[11]=(u*a*s-o*h*s-u*i*l+n*h*l+o*i*p-n*a*p)*w,t[12]=C*w,t[13]=(u*_*r-g*h*r+g*i*f-n*_*f-u*i*m+n*h*m)*w,t[14]=(g*a*r-o*_*r-g*i*c+n*_*c+o*i*m-n*a*m)*w,t[15]=(o*h*r-u*a*r+u*i*c-n*h*c-o*i*f+n*a*f)*w,this}scale(t){const n=this.elements,i=t.x,r=t.y,s=t.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=t.x,a=t.y,c=t.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,n,r,1,0,0,0,0,1),this}compose(t,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,c=n._w,l=s+s,u=o+o,h=a+a,f=s*l,p=s*u,g=s*h,_=o*u,m=o*h,d=a*h,y=c*l,v=c*u,A=c*h,C=i.x,T=i.y,w=i.z;return r[0]=(1-(_+d))*C,r[1]=(p+A)*C,r[2]=(g-v)*C,r[3]=0,r[4]=(p-A)*T,r[5]=(1-(f+d))*T,r[6]=(m+y)*T,r[7]=0,r[8]=(g+v)*w,r[9]=(m-y)*w,r[10]=(1-(f+_))*w,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,n,i){const r=this.elements;let s=os.set(r[0],r[1],r[2]).length();const o=os.set(r[4],r[5],r[6]).length(),a=os.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],ti.copy(this);const l=1/s,u=1/o,h=1/a;return ti.elements[0]*=l,ti.elements[1]*=l,ti.elements[2]*=l,ti.elements[4]*=u,ti.elements[5]*=u,ti.elements[6]*=u,ti.elements[8]*=h,ti.elements[9]*=h,ti.elements[10]*=h,n.setFromRotationMatrix(ti),i.x=s,i.y=o,i.z=a,this}makePerspective(t,n,i,r,s,o,a=ki){const c=this.elements,l=2*s/(n-t),u=2*s/(i-r),h=(n+t)/(n-t),f=(i+r)/(i-r);let p,g;if(a===ki)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===ja)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,r,s,o,a=ki){const c=this.elements,l=1/(n-t),u=1/(i-r),h=1/(o-s),f=(n+t)*l,p=(i+r)*u;let g,_;if(a===ki)g=(o+s)*h,_=-2*h;else if(a===ja)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const os=new L,ti=new Ue,Vx=new L(0,0,0),Gx=new L(1,1,1),Ji=new L,sa=new L,Ln=new L,dp=new Ue,pp=new Wo;class Cc{constructor(t=0,n=0,i=0,r=Cc.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,r=this._order){return this._x=t,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],h=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return dp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(dp,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return pp.setFromEuler(this),this.setFromQuaternion(pp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cc.DEFAULT_ORDER="XYZ";class m_{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Wx=0;const mp=new L,as=new Wo,Li=new Ue,oa=new L,lo=new L,Xx=new L,qx=new Wo,gp=new L(1,0,0),_p=new L(0,1,0),vp=new L(0,0,1),Yx={type:"added"},jx={type:"removed"};class rn extends to{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wx++}),this.uuid=eo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rn.DEFAULT_UP.clone();const t=new L,n=new Cc,i=new Wo,r=new L(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ue},normalMatrix:{value:new Xt}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new m_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return as.setFromAxisAngle(t,n),this.quaternion.multiply(as),this}rotateOnWorldAxis(t,n){return as.setFromAxisAngle(t,n),this.quaternion.premultiply(as),this}rotateX(t){return this.rotateOnAxis(gp,t)}rotateY(t){return this.rotateOnAxis(_p,t)}rotateZ(t){return this.rotateOnAxis(vp,t)}translateOnAxis(t,n){return mp.copy(t).applyQuaternion(this.quaternion),this.position.add(mp.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(gp,t)}translateY(t){return this.translateOnAxis(_p,t)}translateZ(t){return this.translateOnAxis(vp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?oa.copy(t):oa.set(t,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),lo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(lo,oa,this.up):Li.lookAt(oa,lo,this.up),this.quaternion.setFromRotationMatrix(Li),r&&(Li.extractRotation(r.matrixWorld),as.setFromRotationMatrix(Li),this.quaternion.premultiply(as.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Yx)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(jx)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Li.multiply(t.parent.matrixWorld)),t.applyMatrix4(Li),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,n);if(o!==void 0)return o}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lo,t,Xx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lo,qx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(t.shapes,h)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(t.animations,c))}}if(n){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}rn.DEFAULT_UP=new L(0,1,0);rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ei=new L,Pi=new L,Ml=new L,Ii=new L,cs=new L,ls=new L,xp=new L,Sl=new L,El=new L,bl=new L;let aa=!1;class ii{constructor(t=new L,n=new L,i=new L){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,r){r.subVectors(i,n),ei.subVectors(t,n),r.cross(ei);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,n,i,r,s){ei.subVectors(r,n),Pi.subVectors(i,n),Ml.subVectors(t,n);const o=ei.dot(ei),a=ei.dot(Pi),c=ei.dot(Ml),l=Pi.dot(Pi),u=Pi.dot(Ml),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,p=(l*c-a*u)*f,g=(o*u-a*c)*f;return s.set(1-p-g,g,p)}static containsPoint(t,n,i,r){return this.getBarycoord(t,n,i,r,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getUV(t,n,i,r,s,o,a,c){return aa===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),aa=!0),this.getInterpolation(t,n,i,r,s,o,a,c)}static getInterpolation(t,n,i,r,s,o,a,c){return this.getBarycoord(t,n,i,r,Ii)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ii.x),c.addScaledVector(o,Ii.y),c.addScaledVector(a,Ii.z),c)}static isFrontFacing(t,n,i,r){return ei.subVectors(i,n),Pi.subVectors(t,n),ei.cross(Pi).dot(r)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,r){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,n,i,r){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ei.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),ei.cross(Pi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ii.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return ii.getBarycoord(t,this.a,this.b,this.c,n)}getUV(t,n,i,r,s){return aa===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),aa=!0),ii.getInterpolation(t,this.a,this.b,this.c,n,i,r,s)}getInterpolation(t,n,i,r,s){return ii.getInterpolation(t,this.a,this.b,this.c,n,i,r,s)}containsPoint(t){return ii.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ii.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,r=this.b,s=this.c;let o,a;cs.subVectors(r,i),ls.subVectors(s,i),Sl.subVectors(t,i);const c=cs.dot(Sl),l=ls.dot(Sl);if(c<=0&&l<=0)return n.copy(i);El.subVectors(t,r);const u=cs.dot(El),h=ls.dot(El);if(u>=0&&h<=u)return n.copy(r);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),n.copy(i).addScaledVector(cs,o);bl.subVectors(t,s);const p=cs.dot(bl),g=ls.dot(bl);if(g>=0&&p<=g)return n.copy(s);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),n.copy(i).addScaledVector(ls,a);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return xp.subVectors(s,r),a=(h-u)/(h-u+(p-g)),n.copy(r).addScaledVector(xp,a);const d=1/(m+_+f);return o=_*d,a=f*d,n.copy(i).addScaledVector(cs,o).addScaledVector(ls,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const g_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},ca={h:0,s:0,l:0};function Tl(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class $t{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=tn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.toWorkingColorSpace(this,n),this}setRGB(t,n,i,r=ie.workingColorSpace){return this.r=t,this.g=n,this.b=i,ie.toWorkingColorSpace(this,r),this}setHSL(t,n,i,r=ie.workingColorSpace){if(t=Rh(t,1),n=Ze(n,0,1),i=Ze(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Tl(o,s,t+1/3),this.g=Tl(o,s,t),this.b=Tl(o,s,t-1/3)}return ie.toWorkingColorSpace(this,r),this}setStyle(t,n=tn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=tn){const i=g_[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ts(t.r),this.g=Ts(t.g),this.b=Ts(t.b),this}copyLinearToSRGB(t){return this.r=dl(t.r),this.g=dl(t.g),this.b=dl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=tn){return ie.fromWorkingColorSpace(an.copy(this),t),Math.round(Ze(an.r*255,0,255))*65536+Math.round(Ze(an.g*255,0,255))*256+Math.round(Ze(an.b*255,0,255))}getHexString(t=tn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=ie.workingColorSpace){ie.fromWorkingColorSpace(an.copy(this),n);const i=an.r,r=an.g,s=an.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,n=ie.workingColorSpace){return ie.fromWorkingColorSpace(an.copy(this),n),t.r=an.r,t.g=an.g,t.b=an.b,t}getStyle(t=tn){ie.fromWorkingColorSpace(an.copy(this),t);const n=an.r,i=an.g,r=an.b;return t!==tn?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,n,i){return this.getHSL(Zi),this.setHSL(Zi.h+t,Zi.s+n,Zi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Zi),t.getHSL(ca);const i=Mo(Zi.h,ca.h,n),r=Mo(Zi.s,ca.s,n),s=Mo(Zi.l,ca.l,n);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new $t;$t.NAMES=g_;let Kx=0;class no extends to{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kx++}),this.uuid=eo(),this.name="",this.type="Material",this.blending=bs,this.side=pr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pu,this.blendDst=mu,this.blendEquation=Tr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $t(0,0,0),this.blendAlpha=0,this.depthFunc=Wa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=es,this.stencilZFail=es,this.stencilZPass=es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==bs&&(i.blending=this.blending),this.side!==pr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==pu&&(i.blendSrc=this.blendSrc),this.blendDst!==mu&&(i.blendDst=this.blendDst),this.blendEquation!==Tr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Wa&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==es&&(i.stencilFail=this.stencilFail),this.stencilZFail!==es&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==es&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(n){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ch extends no{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Zg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ne=new L,la=new dt;class xi{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=op,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ir,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=n.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)la.fromBufferAttribute(this,n),la.applyMatrix3(t),this.setXY(n,la.x,la.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ne.fromBufferAttribute(this,n),Ne.applyMatrix3(t),this.setXYZ(n,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Ne.fromBufferAttribute(this,n),Ne.applyMatrix4(t),this.setXYZ(n,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Ne.fromBufferAttribute(this,n),Ne.applyNormalMatrix(t),this.setXYZ(n,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Ne.fromBufferAttribute(this,n),Ne.transformDirection(t),this.setXYZ(n,Ne.x,Ne.y,Ne.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=vs(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=gn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=vs(n,this.array)),n}setX(t,n){return this.normalized&&(n=gn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=vs(n,this.array)),n}setY(t,n){return this.normalized&&(n=gn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=vs(n,this.array)),n}setZ(t,n){return this.normalized&&(n=gn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=vs(n,this.array)),n}setW(t,n){return this.normalized&&(n=gn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,r){return t*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array),r=gn(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,n,i,r,s){return t*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array),r=gn(r,this.array),s=gn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==op&&(t.usage=this.usage),t}}class __ extends xi{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class v_ extends xi{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class ve extends xi{constructor(t,n,i){super(new Float32Array(t),n,i)}}let $x=0;const Wn=new Ue,Al=new rn,us=new L,Pn=new Xo,uo=new Xo,Ke=new L;class xn extends to{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$x++}),this.uuid=eo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(u_(t)?v_:__)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Xt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Wn.makeRotationFromQuaternion(t),this.applyMatrix4(Wn),this}rotateX(t){return Wn.makeRotationX(t),this.applyMatrix4(Wn),this}rotateY(t){return Wn.makeRotationY(t),this.applyMatrix4(Wn),this}rotateZ(t){return Wn.makeRotationZ(t),this.applyMatrix4(Wn),this}translate(t,n,i){return Wn.makeTranslation(t,n,i),this.applyMatrix4(Wn),this}scale(t,n,i){return Wn.makeScale(t,n,i),this.applyMatrix4(Wn),this}lookAt(t){return Al.lookAt(t),Al.updateMatrix(),this.applyMatrix4(Al.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(t){const n=[];for(let i=0,r=t.length;i<r;i++){const s=t[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ve(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xo);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Pn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ke.addVectors(this.boundingBox.min,Pn.min),this.boundingBox.expandByPoint(Ke),Ke.addVectors(this.boundingBox.max,Pn.max),this.boundingBox.expandByPoint(Ke)):(this.boundingBox.expandByPoint(Pn.min),this.boundingBox.expandByPoint(Pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rc);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(t){const i=this.boundingSphere.center;if(Pn.setFromBufferAttribute(t),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];uo.setFromBufferAttribute(a),this.morphTargetsRelative?(Ke.addVectors(Pn.min,uo.min),Pn.expandByPoint(Ke),Ke.addVectors(Pn.max,uo.max),Pn.expandByPoint(Ke)):(Pn.expandByPoint(uo.min),Pn.expandByPoint(uo.max))}Pn.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Ke.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Ke));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ke.fromBufferAttribute(a,l),c&&(us.fromBufferAttribute(t,l),Ke.add(us)),r=Math.max(r,i.distanceToSquared(Ke))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.array,r=n.position.array,s=n.normal.array,o=n.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xi(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],u=[];for(let b=0;b<a;b++)l[b]=new L,u[b]=new L;const h=new L,f=new L,p=new L,g=new dt,_=new dt,m=new dt,d=new L,y=new L;function v(b,z,q){h.fromArray(r,b*3),f.fromArray(r,z*3),p.fromArray(r,q*3),g.fromArray(o,b*2),_.fromArray(o,z*2),m.fromArray(o,q*2),f.sub(h),p.sub(h),_.sub(g),m.sub(g);const et=1/(_.x*m.y-m.x*_.y);isFinite(et)&&(d.copy(f).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(et),y.copy(p).multiplyScalar(_.x).addScaledVector(f,-m.x).multiplyScalar(et),l[b].add(d),l[z].add(d),l[q].add(d),u[b].add(y),u[z].add(y),u[q].add(y))}let A=this.groups;A.length===0&&(A=[{start:0,count:i.length}]);for(let b=0,z=A.length;b<z;++b){const q=A[b],et=q.start,P=q.count;for(let F=et,G=et+P;F<G;F+=3)v(i[F+0],i[F+1],i[F+2])}const C=new L,T=new L,w=new L,V=new L;function S(b){w.fromArray(s,b*3),V.copy(w);const z=l[b];C.copy(z),C.sub(w.multiplyScalar(w.dot(z))).normalize(),T.crossVectors(V,z);const et=T.dot(u[b])<0?-1:1;c[b*4]=C.x,c[b*4+1]=C.y,c[b*4+2]=C.z,c[b*4+3]=et}for(let b=0,z=A.length;b<z;++b){const q=A[b],et=q.start,P=q.count;for(let F=et,G=et+P;F<G;F+=3)S(i[F+0]),S(i[F+1]),S(i[F+2])}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new xi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new L,s=new L,o=new L,a=new L,c=new L,l=new L,u=new L,h=new L;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,_),o.fromBufferAttribute(n,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)Ke.fromBufferAttribute(t,n),Ke.normalize(),t.setXYZ(n,Ke.x,Ke.y,Ke.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*u;for(let d=0;d<u;d++)f[g++]=l[p++]}return new xi(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new xn,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=t(c,i);n.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],p=t(f,i);c.push(p)}n.morphAttributes[a]=c}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const p=l[h];u.push(p.toJSON(t.data))}u.length>0&&(r[c]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(n));const r=t.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(n))}const s=t.morphAttributes;for(const l in s){const u=[],h=s[l];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(n));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yp=new Ue,Mr=new p_,ua=new Rc,Mp=new L,hs=new L,fs=new L,ds=new L,wl=new L,ha=new L,fa=new dt,da=new dt,pa=new dt,Sp=new L,Ep=new L,bp=new L,ma=new L,ga=new L;class Ie extends rn{constructor(t=new xn,n=new Ch){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){ha.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],h=s[c];u!==0&&(wl.fromBufferAttribute(h,t),o?ha.addScaledVector(wl,u):ha.addScaledVector(wl.sub(n),u))}n.add(ha)}return n}raycast(t,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ua.copy(i.boundingSphere),ua.applyMatrix4(s),Mr.copy(t.ray).recast(t.near),!(ua.containsPoint(Mr.origin)===!1&&(Mr.intersectSphere(ua,Mp)===null||Mr.origin.distanceToSquared(Mp)>(t.far-t.near)**2))&&(yp.copy(s).invert(),Mr.copy(t.ray).applyMatrix4(yp),!(i.boundingBox!==null&&Mr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Mr)))}_computeIntersections(t,n,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],y=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let A=y,C=v;A<C;A+=3){const T=a.getX(A),w=a.getX(A+1),V=a.getX(A+2);r=_a(this,d,t,i,l,u,h,T,w,V),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const y=a.getX(m),v=a.getX(m+1),A=a.getX(m+2);r=_a(this,o,t,i,l,u,h,y,v,A),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],y=Math.max(m.start,p.start),v=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let A=y,C=v;A<C;A+=3){const T=A,w=A+1,V=A+2;r=_a(this,d,t,i,l,u,h,T,w,V),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const y=m,v=m+1,A=m+2;r=_a(this,o,t,i,l,u,h,y,v,A),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function Jx(e,t,n,i,r,s,o,a){let c;if(t.side===En?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,t.side===pr,a),c===null)return null;ga.copy(a),ga.applyMatrix4(e.matrixWorld);const l=n.ray.origin.distanceTo(ga);return l<n.near||l>n.far?null:{distance:l,point:ga.clone(),object:e}}function _a(e,t,n,i,r,s,o,a,c,l){e.getVertexPosition(a,hs),e.getVertexPosition(c,fs),e.getVertexPosition(l,ds);const u=Jx(e,t,n,i,hs,fs,ds,ma);if(u){r&&(fa.fromBufferAttribute(r,a),da.fromBufferAttribute(r,c),pa.fromBufferAttribute(r,l),u.uv=ii.getInterpolation(ma,hs,fs,ds,fa,da,pa,new dt)),s&&(fa.fromBufferAttribute(s,a),da.fromBufferAttribute(s,c),pa.fromBufferAttribute(s,l),u.uv1=ii.getInterpolation(ma,hs,fs,ds,fa,da,pa,new dt),u.uv2=u.uv1),o&&(Sp.fromBufferAttribute(o,a),Ep.fromBufferAttribute(o,c),bp.fromBufferAttribute(o,l),u.normal=ii.getInterpolation(ma,hs,fs,ds,Sp,Ep,bp,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new L,materialIndex:0};ii.getNormal(hs,fs,ds,h.normal),u.face=h}return u}class io extends xn{constructor(t=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,i,n,t,o,s,0),g("z","y","x",1,-1,i,n,-t,o,s,1),g("x","z","y",1,1,t,i,n,r,o,2),g("x","z","y",1,-1,t,i,-n,r,o,3),g("x","y","z",1,-1,t,n,i,r,s,4),g("x","y","z",-1,-1,t,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new ve(l,3)),this.setAttribute("normal",new ve(u,3)),this.setAttribute("uv",new ve(h,2));function g(_,m,d,y,v,A,C,T,w,V,S){const b=A/w,z=C/V,q=A/2,et=C/2,P=T/2,F=w+1,G=V+1;let Y=0,X=0;const W=new L;for(let K=0;K<G;K++){const Q=K*z-et;for(let at=0;at<F;at++){const H=at*b-q;W[_]=H*y,W[m]=Q*v,W[d]=P,l.push(W.x,W.y,W.z),W[_]=0,W[m]=0,W[d]=T>0?1:-1,u.push(W.x,W.y,W.z),h.push(at/w),h.push(1-K/V),Y+=1}}for(let K=0;K<V;K++)for(let Q=0;Q<w;Q++){const at=f+Q+F*K,H=f+Q+F*(K+1),j=f+(Q+1)+F*(K+1),ct=f+(Q+1)+F*K;c.push(at,H,ct),c.push(H,j,ct),X+=6}a.addGroup(p,X,S),p+=X,f+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new io(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Hs(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const r=e[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=r.clone():Array.isArray(r)?t[n][i]=r.slice():t[n][i]=r}}return t}function _n(e){const t={};for(let n=0;n<e.length;n++){const i=Hs(e[n]);for(const r in i)t[r]=i[r]}return t}function Zx(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function x_(e){return e.getRenderTarget()===null?e.outputColorSpace:ie.workingColorSpace}const Qx={clone:Hs,merge:_n};var t3=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,e3=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qr extends no{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=t3,this.fragmentShader=e3,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hs(t.uniforms),this.uniformsGroups=Zx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class y_ extends rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=ki}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class qn extends y_{constructor(t=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=No*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(yo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return No*2*Math.atan(Math.tan(yo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,n,i,r,s,o){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(yo*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,n-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const ps=-90,ms=1;class n3 extends rn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new qn(ps,ms,t,n);r.layers=this.layers,this.add(r);const s=new qn(ps,ms,t,n);s.layers=this.layers,this.add(s);const o=new qn(ps,ms,t,n);o.layers=this.layers,this.add(o);const a=new qn(ps,ms,t,n);a.layers=this.layers,this.add(a);const c=new qn(ps,ms,t,n);c.layers=this.layers,this.add(c);const l=new qn(ps,ms,t,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,c]=n;for(const l of n)this.remove(l);if(t===ki)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ja)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of n)this.add(l),l.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(n,s),t.setRenderTarget(i,1,r),t.render(n,o),t.setRenderTarget(i,2,r),t.render(n,a),t.setRenderTarget(i,3,r),t.render(n,c),t.setRenderTarget(i,4,r),t.render(n,l),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(n,u),t.setRenderTarget(h,f,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class M_ extends Un{constructor(t,n,i,r,s,o,a,c,l,u){t=t!==void 0?t:[],n=n!==void 0?n:Bs,super(t,n,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class i3 extends Xr{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];n.encoding!==void 0&&(So("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===zr?tn:jn),this.texture=new M_(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Xn}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new io(5,5,5),s=new qr({name:"CubemapFromEquirect",uniforms:Hs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:En,blending:cr});s.uniforms.tEquirect.value=n;const o=new Ie(r,s),a=n.minFilter;return n.minFilter===Do&&(n.minFilter=Xn),new n3(1,10,this).update(t,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,n,i,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(n,i,r);t.setRenderTarget(s)}}const Rl=new L,r3=new L,s3=new Xt;class Er{constructor(t=new L(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,r){return this.normal.set(t,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const r=Rl.subVectors(i,n).cross(r3.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(Rl),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||s3.getNormalMatrix(t),r=this.coplanarPoint(Rl).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Sr=new Rc,va=new L;class Lh{constructor(t=new Er,n=new Er,i=new Er,r=new Er,s=new Er,o=new Er){this.planes=[t,n,i,r,s,o]}set(t,n,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=ki){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],u=r[5],h=r[6],f=r[7],p=r[8],g=r[9],_=r[10],m=r[11],d=r[12],y=r[13],v=r[14],A=r[15];if(i[0].setComponents(c-s,f-l,m-p,A-d).normalize(),i[1].setComponents(c+s,f+l,m+p,A+d).normalize(),i[2].setComponents(c+o,f+u,m+g,A+y).normalize(),i[3].setComponents(c-o,f-u,m-g,A-y).normalize(),i[4].setComponents(c-a,f-h,m-_,A-v).normalize(),n===ki)i[5].setComponents(c+a,f+h,m+_,A+v).normalize();else if(n===ja)i[5].setComponents(a,h,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Sr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Sr)}intersectsSprite(t){return Sr.center.set(0,0,0),Sr.radius=.7071067811865476,Sr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Sr)}intersectsSphere(t){const n=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(va.x=r.normal.x>0?t.max.x:t.min.x,va.y=r.normal.y>0?t.max.y:t.min.y,va.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(va)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function S_(){let e=null,t=!1,n=null,i=null;function r(s,o){n(s,o),i=e.requestAnimationFrame(r)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(r),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function o3(e,t){const n=t.isWebGL2,i=new WeakMap;function r(l,u){const h=l.array,f=l.usage,p=h.byteLength,g=e.createBuffer();e.bindBuffer(u,g),e.bufferData(u,h,f),l.onUploadCallback();let _;if(h instanceof Float32Array)_=e.FLOAT;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(n)_=e.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=e.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=e.SHORT;else if(h instanceof Uint32Array)_=e.UNSIGNED_INT;else if(h instanceof Int32Array)_=e.INT;else if(h instanceof Int8Array)_=e.BYTE;else if(h instanceof Uint8Array)_=e.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:p}}function s(l,u,h){const f=u.array,p=u._updateRange,g=u.updateRanges;if(e.bindBuffer(h,l),p.count===-1&&g.length===0&&e.bufferSubData(h,0,f),g.length!==0){for(let _=0,m=g.length;_<m;_++){const d=g[_];n?e.bufferSubData(h,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):e.bufferSubData(h,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}u.clearUpdateRanges()}p.count!==-1&&(n?e.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):e.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=i.get(l);u&&(e.deleteBuffer(u.buffer),i.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const f=i.get(l);(!f||f.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const h=i.get(l);if(h===void 0)i.set(l,r(l,u));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,l,u),h.version=l.version}}return{get:o,remove:a,update:c}}class Ph extends xn{constructor(t=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:r};const s=t/2,o=n/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,h=t/a,f=n/c,p=[],g=[],_=[],m=[];for(let d=0;d<u;d++){const y=d*f-o;for(let v=0;v<l;v++){const A=v*h-s;g.push(A,-y,0),_.push(0,0,1),m.push(v/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let y=0;y<a;y++){const v=y+l*d,A=y+l*(d+1),C=y+1+l*(d+1),T=y+1+l*d;p.push(v,A,T),p.push(A,C,T)}this.setIndex(p),this.setAttribute("position",new ve(g,3)),this.setAttribute("normal",new ve(_,3)),this.setAttribute("uv",new ve(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ph(t.width,t.height,t.widthSegments,t.heightSegments)}}var a3=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,c3=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,l3=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,u3=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,h3=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,f3=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,d3=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,p3=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,m3=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,g3=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,_3=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,v3=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,x3=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,y3=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,M3=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,S3=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,E3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,b3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,T3=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,A3=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,w3=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,R3=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,C3=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,L3=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,P3=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,I3=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,D3=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,U3=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,N3=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,F3=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,O3="gl_FragColor = linearToOutputTexel( gl_FragColor );",B3=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,z3=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,k3=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,H3=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,V3=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,G3=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,W3=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,X3=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,q3=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Y3=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,j3=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,K3=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,$3=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,J3=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Z3=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Q3=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ty=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ey=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ny=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,iy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ry=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,oy=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ay=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,cy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ly=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,uy=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hy=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,dy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,py=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,my=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,_y=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yy=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,My=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Sy=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Ey=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,by=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ty=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ay=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ry=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Cy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ly=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Py=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Iy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Uy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ny=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Fy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Oy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,By=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ky=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Hy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Gy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Wy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Xy=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,qy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yy=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ky=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$y=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,eM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,nM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,iM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,sM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const oM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,aM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,dM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,pM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,gM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_M=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,MM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,EM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,TM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,AM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,RM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,CM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,PM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,UM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,NM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,FM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,OM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,BM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zt={alphahash_fragment:a3,alphahash_pars_fragment:c3,alphamap_fragment:l3,alphamap_pars_fragment:u3,alphatest_fragment:h3,alphatest_pars_fragment:f3,aomap_fragment:d3,aomap_pars_fragment:p3,batching_pars_vertex:m3,batching_vertex:g3,begin_vertex:_3,beginnormal_vertex:v3,bsdfs:x3,iridescence_fragment:y3,bumpmap_pars_fragment:M3,clipping_planes_fragment:S3,clipping_planes_pars_fragment:E3,clipping_planes_pars_vertex:b3,clipping_planes_vertex:T3,color_fragment:A3,color_pars_fragment:w3,color_pars_vertex:R3,color_vertex:C3,common:L3,cube_uv_reflection_fragment:P3,defaultnormal_vertex:I3,displacementmap_pars_vertex:D3,displacementmap_vertex:U3,emissivemap_fragment:N3,emissivemap_pars_fragment:F3,colorspace_fragment:O3,colorspace_pars_fragment:B3,envmap_fragment:z3,envmap_common_pars_fragment:k3,envmap_pars_fragment:H3,envmap_pars_vertex:V3,envmap_physical_pars_fragment:ty,envmap_vertex:G3,fog_vertex:W3,fog_pars_vertex:X3,fog_fragment:q3,fog_pars_fragment:Y3,gradientmap_pars_fragment:j3,lightmap_fragment:K3,lightmap_pars_fragment:$3,lights_lambert_fragment:J3,lights_lambert_pars_fragment:Z3,lights_pars_begin:Q3,lights_toon_fragment:ey,lights_toon_pars_fragment:ny,lights_phong_fragment:iy,lights_phong_pars_fragment:ry,lights_physical_fragment:sy,lights_physical_pars_fragment:oy,lights_fragment_begin:ay,lights_fragment_maps:cy,lights_fragment_end:ly,logdepthbuf_fragment:uy,logdepthbuf_pars_fragment:hy,logdepthbuf_pars_vertex:fy,logdepthbuf_vertex:dy,map_fragment:py,map_pars_fragment:my,map_particle_fragment:gy,map_particle_pars_fragment:_y,metalnessmap_fragment:vy,metalnessmap_pars_fragment:xy,morphcolor_vertex:yy,morphnormal_vertex:My,morphtarget_pars_vertex:Sy,morphtarget_vertex:Ey,normal_fragment_begin:by,normal_fragment_maps:Ty,normal_pars_fragment:Ay,normal_pars_vertex:wy,normal_vertex:Ry,normalmap_pars_fragment:Cy,clearcoat_normal_fragment_begin:Ly,clearcoat_normal_fragment_maps:Py,clearcoat_pars_fragment:Iy,iridescence_pars_fragment:Dy,opaque_fragment:Uy,packing:Ny,premultiplied_alpha_fragment:Fy,project_vertex:Oy,dithering_fragment:By,dithering_pars_fragment:zy,roughnessmap_fragment:ky,roughnessmap_pars_fragment:Hy,shadowmap_pars_fragment:Vy,shadowmap_pars_vertex:Gy,shadowmap_vertex:Wy,shadowmask_pars_fragment:Xy,skinbase_vertex:qy,skinning_pars_vertex:Yy,skinning_vertex:jy,skinnormal_vertex:Ky,specularmap_fragment:$y,specularmap_pars_fragment:Jy,tonemapping_fragment:Zy,tonemapping_pars_fragment:Qy,transmission_fragment:tM,transmission_pars_fragment:eM,uv_pars_fragment:nM,uv_pars_vertex:iM,uv_vertex:rM,worldpos_vertex:sM,background_vert:oM,background_frag:aM,backgroundCube_vert:cM,backgroundCube_frag:lM,cube_vert:uM,cube_frag:hM,depth_vert:fM,depth_frag:dM,distanceRGBA_vert:pM,distanceRGBA_frag:mM,equirect_vert:gM,equirect_frag:_M,linedashed_vert:vM,linedashed_frag:xM,meshbasic_vert:yM,meshbasic_frag:MM,meshlambert_vert:SM,meshlambert_frag:EM,meshmatcap_vert:bM,meshmatcap_frag:TM,meshnormal_vert:AM,meshnormal_frag:wM,meshphong_vert:RM,meshphong_frag:CM,meshphysical_vert:LM,meshphysical_frag:PM,meshtoon_vert:IM,meshtoon_frag:DM,points_vert:UM,points_frag:NM,shadow_vert:FM,shadow_frag:OM,sprite_vert:BM,sprite_frag:zM},it={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},gi={basic:{uniforms:_n([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:_n([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new $t(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:_n([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:_n([it.common,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.roughnessmap,it.metalnessmap,it.fog,it.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:_n([it.common,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.gradientmap,it.fog,it.lights,{emissive:{value:new $t(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:_n([it.common,it.bumpmap,it.normalmap,it.displacementmap,it.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:_n([it.points,it.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:_n([it.common,it.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:_n([it.common,it.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:_n([it.common,it.bumpmap,it.normalmap,it.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:_n([it.sprite,it.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:_n([it.common,it.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:_n([it.lights,it.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};gi.physical={uniforms:_n([gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};const xa={r:0,b:0,g:0};function kM(e,t,n,i,r,s,o){const a=new $t(0);let c=s===!0?0:1,l,u,h=null,f=0,p=null;function g(m,d){let y=!1,v=d.isScene===!0?d.background:null;v&&v.isTexture&&(v=(d.backgroundBlurriness>0?n:t).get(v)),v===null?_(a,c):v&&v.isColor&&(_(v,1),y=!0);const A=e.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(e.autoClear||y)&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Ac)?(u===void 0&&(u=new Ie(new io(1,1,1),new qr({name:"BackgroundCubeMaterial",uniforms:Hs(gi.backgroundCube.uniforms),vertexShader:gi.backgroundCube.vertexShader,fragmentShader:gi.backgroundCube.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=ie.getTransfer(v.colorSpace)!==de,(h!==v||f!==v.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,p=e.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Ie(new Ph(2,2),new qr({name:"BackgroundMaterial",uniforms:Hs(gi.background.uniforms),vertexShader:gi.background.vertexShader,fragmentShader:gi.background.fragmentShader,side:pr,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,l.material.toneMapped=ie.getTransfer(v.colorSpace)!==de,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,h=v,f=v.version,p=e.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,d){m.getRGB(xa,x_(e)),i.buffers.color.setClear(xa.r,xa.g,xa.b,d,o)}return{getClearColor:function(){return a},setClearColor:function(m,d=1){a.set(m),c=d,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(a,c)},render:g}}function HM(e,t,n,i){const r=e.getParameter(e.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:t.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},c=m(null);let l=c,u=!1;function h(P,F,G,Y,X){let W=!1;if(o){const K=_(Y,G,F);l!==K&&(l=K,p(l.object)),W=d(P,Y,G,X),W&&y(P,Y,G,X)}else{const K=F.wireframe===!0;(l.geometry!==Y.id||l.program!==G.id||l.wireframe!==K)&&(l.geometry=Y.id,l.program=G.id,l.wireframe=K,W=!0)}X!==null&&n.update(X,e.ELEMENT_ARRAY_BUFFER),(W||u)&&(u=!1,V(P,F,G,Y),X!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(X).buffer))}function f(){return i.isWebGL2?e.createVertexArray():s.createVertexArrayOES()}function p(P){return i.isWebGL2?e.bindVertexArray(P):s.bindVertexArrayOES(P)}function g(P){return i.isWebGL2?e.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function _(P,F,G){const Y=G.wireframe===!0;let X=a[P.id];X===void 0&&(X={},a[P.id]=X);let W=X[F.id];W===void 0&&(W={},X[F.id]=W);let K=W[Y];return K===void 0&&(K=m(f()),W[Y]=K),K}function m(P){const F=[],G=[],Y=[];for(let X=0;X<r;X++)F[X]=0,G[X]=0,Y[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:G,attributeDivisors:Y,object:P,attributes:{},index:null}}function d(P,F,G,Y){const X=l.attributes,W=F.attributes;let K=0;const Q=G.getAttributes();for(const at in Q)if(Q[at].location>=0){const j=X[at];let ct=W[at];if(ct===void 0&&(at==="instanceMatrix"&&P.instanceMatrix&&(ct=P.instanceMatrix),at==="instanceColor"&&P.instanceColor&&(ct=P.instanceColor)),j===void 0||j.attribute!==ct||ct&&j.data!==ct.data)return!0;K++}return l.attributesNum!==K||l.index!==Y}function y(P,F,G,Y){const X={},W=F.attributes;let K=0;const Q=G.getAttributes();for(const at in Q)if(Q[at].location>=0){let j=W[at];j===void 0&&(at==="instanceMatrix"&&P.instanceMatrix&&(j=P.instanceMatrix),at==="instanceColor"&&P.instanceColor&&(j=P.instanceColor));const ct={};ct.attribute=j,j&&j.data&&(ct.data=j.data),X[at]=ct,K++}l.attributes=X,l.attributesNum=K,l.index=Y}function v(){const P=l.newAttributes;for(let F=0,G=P.length;F<G;F++)P[F]=0}function A(P){C(P,0)}function C(P,F){const G=l.newAttributes,Y=l.enabledAttributes,X=l.attributeDivisors;G[P]=1,Y[P]===0&&(e.enableVertexAttribArray(P),Y[P]=1),X[P]!==F&&((i.isWebGL2?e:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,F),X[P]=F)}function T(){const P=l.newAttributes,F=l.enabledAttributes;for(let G=0,Y=F.length;G<Y;G++)F[G]!==P[G]&&(e.disableVertexAttribArray(G),F[G]=0)}function w(P,F,G,Y,X,W,K){K===!0?e.vertexAttribIPointer(P,F,G,X,W):e.vertexAttribPointer(P,F,G,Y,X,W)}function V(P,F,G,Y){if(i.isWebGL2===!1&&(P.isInstancedMesh||Y.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();const X=Y.attributes,W=G.getAttributes(),K=F.defaultAttributeValues;for(const Q in W){const at=W[Q];if(at.location>=0){let H=X[Q];if(H===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(H=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(H=P.instanceColor)),H!==void 0){const j=H.normalized,ct=H.itemSize,St=n.get(H);if(St===void 0)continue;const Mt=St.buffer,Nt=St.type,Ot=St.bytesPerElement,Ct=i.isWebGL2===!0&&(Nt===e.INT||Nt===e.UNSIGNED_INT||H.gpuType===t_);if(H.isInterleavedBufferAttribute){const Kt=H.data,U=Kt.stride,dn=H.offset;if(Kt.isInstancedInterleavedBuffer){for(let Tt=0;Tt<at.locationSize;Tt++)C(at.location+Tt,Kt.meshPerAttribute);P.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Kt.meshPerAttribute*Kt.count)}else for(let Tt=0;Tt<at.locationSize;Tt++)A(at.location+Tt);e.bindBuffer(e.ARRAY_BUFFER,Mt);for(let Tt=0;Tt<at.locationSize;Tt++)w(at.location+Tt,ct/at.locationSize,Nt,j,U*Ot,(dn+ct/at.locationSize*Tt)*Ot,Ct)}else{if(H.isInstancedBufferAttribute){for(let Kt=0;Kt<at.locationSize;Kt++)C(at.location+Kt,H.meshPerAttribute);P.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let Kt=0;Kt<at.locationSize;Kt++)A(at.location+Kt);e.bindBuffer(e.ARRAY_BUFFER,Mt);for(let Kt=0;Kt<at.locationSize;Kt++)w(at.location+Kt,ct/at.locationSize,Nt,j,ct*Ot,ct/at.locationSize*Kt*Ot,Ct)}}else if(K!==void 0){const j=K[Q];if(j!==void 0)switch(j.length){case 2:e.vertexAttrib2fv(at.location,j);break;case 3:e.vertexAttrib3fv(at.location,j);break;case 4:e.vertexAttrib4fv(at.location,j);break;default:e.vertexAttrib1fv(at.location,j)}}}}T()}function S(){q();for(const P in a){const F=a[P];for(const G in F){const Y=F[G];for(const X in Y)g(Y[X].object),delete Y[X];delete F[G]}delete a[P]}}function b(P){if(a[P.id]===void 0)return;const F=a[P.id];for(const G in F){const Y=F[G];for(const X in Y)g(Y[X].object),delete Y[X];delete F[G]}delete a[P.id]}function z(P){for(const F in a){const G=a[F];if(G[P.id]===void 0)continue;const Y=G[P.id];for(const X in Y)g(Y[X].object),delete Y[X];delete G[P.id]}}function q(){et(),u=!0,l!==c&&(l=c,p(l.object))}function et(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:q,resetDefaultState:et,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfProgram:z,initAttributes:v,enableAttribute:A,disableUnusedAttributes:T}}function VM(e,t,n,i){const r=i.isWebGL2;let s;function o(u){s=u}function a(u,h){e.drawArrays(s,u,h),n.update(h,s,1)}function c(u,h,f){if(f===0)return;let p,g;if(r)p=e,g="drawArraysInstanced";else if(p=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](s,u,h,f),n.update(h,s,f)}function l(u,h,f){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<f;g++)this.render(u[g],h[g]);else{p.multiDrawArraysWEBGL(s,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_];n.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function GM(e,t,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");i=e.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(w){if(w==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&e.constructor.name==="WebGL2RenderingContext";let a=n.precision!==void 0?n.precision:"highp";const c=s(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||t.has("WEBGL_draw_buffers"),u=n.logarithmicDepthBuffer===!0,h=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),f=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),m=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),d=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,A=o||t.has("OES_texture_float"),C=v&&A,T=o?e.getParameter(e.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:y,vertexTextures:v,floatFragmentTextures:A,floatVertexTextures:C,maxSamples:T}}function WM(e){const t=this;let n=null,i=0,r=!1,s=!1;const o=new Er,a=new Xt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||r;return r=f,i=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){n=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,d=e.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{const y=s?0:i,v=y*4;let A=d.clippingState||null;c.value=A,A=u(g,f,v,p);for(let C=0;C!==v;++C)A[C]=n[C];d.clippingState=A,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,p,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const d=p+_*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,A=p;v!==_;++v,A+=4)o.copy(h[v]).applyMatrix4(y,a),o.normal.toArray(m,A),m[A+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function XM(e){let t=new WeakMap;function n(o,a){return a===gu?o.mapping=Bs:a===_u&&(o.mapping=zs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===gu||a===_u)if(t.has(o)){const c=t.get(o).texture;return n(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new i3(c.height/2);return l.fromEquirectangularTexture(e,o),t.set(o,l),o.addEventListener("dispose",r),n(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class E_ extends y_{constructor(t=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const ys=4,Tp=[.125,.215,.35,.446,.526,.582],Ar=20,Cl=new E_,Ap=new $t;let Ll=null,Pl=0,Il=0;const br=(1+Math.sqrt(5))/2,gs=1/br,wp=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,br,gs),new L(0,br,-gs),new L(gs,0,br),new L(-gs,0,br),new L(br,gs,0),new L(-br,gs,0)];class Rp{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,r=100){Ll=this._renderer.getRenderTarget(),Pl=this._renderer.getActiveCubeFace(),Il=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ll,Pl,Il),t.scissorTest=!1,ya(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Bs||t.mapping===zs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ll=this._renderer.getRenderTarget(),Pl=this._renderer.getActiveCubeFace(),Il=this._renderer.getActiveMipmapLevel();const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Xn,minFilter:Xn,generateMipmaps:!1,type:Uo,format:si,colorSpace:Xi,depthBuffer:!1},r=Cp(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cp(t,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qM(s)),this._blurMaterial=YM(s,t,n)}return r}_compileMaterial(t){const n=new Ie(this._lodPlanes[0],t);this._renderer.compile(n,Cl)}_sceneToCubeUV(t,n,i,r){const a=new qn(90,1,n,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Ap),u.toneMapping=lr,u.autoClear=!1;const p=new Ch({name:"PMREM.Background",side:En,depthWrite:!1,depthTest:!1}),g=new Ie(new io,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(Ap),_=!0);for(let d=0;d<6;d++){const y=d%3;y===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):y===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));const v=this._cubeSize;ya(r,y*v,d>2?v:0,v,v),u.setRenderTarget(r),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,n){const i=this._renderer,r=t.mapping===Bs||t.mapping===zs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pp()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lp());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Ie(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;ya(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(o,Cl)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=wp[(r-1)%wp.length];this._blur(t,r-1,r,s,o)}n.autoClear=i}_blur(t,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,n,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,n,i,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ie(this._lodPlanes[r],l),f=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ar-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Ar;m>Ar&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ar}`);const d=[];let y=0;for(let w=0;w<Ar;++w){const V=w/_,S=Math.exp(-V*V/2);d.push(S),w===0?y+=S:w<m&&(y+=2*S)}for(let w=0;w<d.length;w++)d[w]=d[w]/y;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-i;const A=this._sizeLods[r],C=3*A*(r>v-ys?r-v+ys:0),T=4*(this._cubeSize-A);ya(n,C,T,3*A,2*A),c.setRenderTarget(n),c.render(h,Cl)}}function qM(e){const t=[],n=[],i=[];let r=e;const s=e-ys+1+Tp.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let c=1/a;o>e-ys?c=Tp[o-e+ys-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,m=2,d=1,y=new Float32Array(_*g*p),v=new Float32Array(m*g*p),A=new Float32Array(d*g*p);for(let T=0;T<p;T++){const w=T%3*2/3-1,V=T>2?0:-1,S=[w,V,0,w+2/3,V,0,w+2/3,V+1,0,w,V,0,w+2/3,V+1,0,w,V+1,0];y.set(S,_*g*T),v.set(f,m*g*T);const b=[T,T,T,T,T,T];A.set(b,d*g*T)}const C=new xn;C.setAttribute("position",new xi(y,_)),C.setAttribute("uv",new xi(v,m)),C.setAttribute("faceIndex",new xi(A,d)),t.push(C),r>ys&&r--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function Cp(e,t,n){const i=new Xr(e,t,n);return i.texture.mapping=Ac,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ya(e,t,n,i,r){e.viewport.set(t,n,i,r),e.scissor.set(t,n,i,r)}function YM(e,t,n){const i=new Float32Array(Ar),r=new L(0,1,0);return new qr({name:"SphericalGaussianBlur",defines:{n:Ar,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ih(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:cr,depthTest:!1,depthWrite:!1})}function Lp(){return new qr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ih(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:cr,depthTest:!1,depthWrite:!1})}function Pp(){return new qr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ih(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:cr,depthTest:!1,depthWrite:!1})}function Ih(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jM(e){let t=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===gu||c===_u,u=c===Bs||c===zs;if(l||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=t.get(a);return n===null&&(n=new Rp(e)),h=l?n.fromEquirectangular(a,h):n.fromCubemap(a,h),t.set(a,h),h.texture}else{if(t.has(a))return t.get(a).texture;{const h=a.image;if(l&&h&&h.height>0||u&&h&&r(h)){n===null&&(n=new Rp(e));const f=l?n.fromEquirectangular(a):n.fromCubemap(a);return t.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function KM(e){const t={};function n(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=e.getExtension(i)}return t[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function $M(e,t,n,i){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)t.remove(_[m])}f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(t.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)t.update(f[g],e.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)t.update(_[m],e.ARRAY_BUFFER)}}function l(h){const f=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const y=p.array;_=p.version;for(let v=0,A=y.length;v<A;v+=3){const C=y[v+0],T=y[v+1],w=y[v+2];f.push(C,T,T,w,w,C)}}else if(g!==void 0){const y=g.array;_=g.version;for(let v=0,A=y.length/3-1;v<A;v+=3){const C=v+0,T=v+1,w=v+2;f.push(C,T,T,w,w,C)}}else return;const m=new(u_(f)?v_:__)(f,1);m.version=_;const d=s.get(h);d&&t.remove(d),s.set(h,m)}function u(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function JM(e,t,n,i){const r=i.isWebGL2;let s;function o(p){s=p}let a,c;function l(p){a=p.type,c=p.bytesPerElement}function u(p,g){e.drawElements(s,g,a,p*c),n.update(g,s,1)}function h(p,g,_){if(_===0)return;let m,d;if(r)m=e,d="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](s,g,a,p*c,_),n.update(g,s,_)}function f(p,g,_){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<_;d++)this.render(p[d]/c,g[d]);else{m.multiDrawElementsWEBGL(s,g,0,a,p,0,_);let d=0;for(let y=0;y<_;y++)d+=g[y];n.update(d,s,1)}}this.setMode=o,this.setIndex=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function ZM(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case e.TRIANGLES:n.triangles+=a*(s/3);break;case e.LINES:n.lines+=a*(s/2);break;case e.LINE_STRIP:n.lines+=a*(s-1);break;case e.LINE_LOOP:n.lines+=a*s;break;case e.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function QM(e,t){return e[0]-t[0]}function tS(e,t){return Math.abs(t[1])-Math.abs(e[1])}function eS(e,t,n){const i={},r=new Float32Array(8),s=new WeakMap,o=new Qe,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,u,h){const f=l.morphTargetInfluences;if(t.isWebGL2===!0){const p=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=p!==void 0?p.length:0;let _=s.get(u);if(_===void 0||_.count!==g){let P=function(){q.dispose(),s.delete(u),u.removeEventListener("dispose",P)};_!==void 0&&_.texture.dispose();const y=u.morphAttributes.position!==void 0,v=u.morphAttributes.normal!==void 0,A=u.morphAttributes.color!==void 0,C=u.morphAttributes.position||[],T=u.morphAttributes.normal||[],w=u.morphAttributes.color||[];let V=0;y===!0&&(V=1),v===!0&&(V=2),A===!0&&(V=3);let S=u.attributes.position.count*V,b=1;S>t.maxTextureSize&&(b=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const z=new Float32Array(S*b*4*g),q=new d_(z,S,b,g);q.type=ir,q.needsUpdate=!0;const et=V*4;for(let F=0;F<g;F++){const G=C[F],Y=T[F],X=w[F],W=S*b*4*F;for(let K=0;K<G.count;K++){const Q=K*et;y===!0&&(o.fromBufferAttribute(G,K),z[W+Q+0]=o.x,z[W+Q+1]=o.y,z[W+Q+2]=o.z,z[W+Q+3]=0),v===!0&&(o.fromBufferAttribute(Y,K),z[W+Q+4]=o.x,z[W+Q+5]=o.y,z[W+Q+6]=o.z,z[W+Q+7]=0),A===!0&&(o.fromBufferAttribute(X,K),z[W+Q+8]=o.x,z[W+Q+9]=o.y,z[W+Q+10]=o.z,z[W+Q+11]=X.itemSize===4?o.w:1)}}_={count:g,texture:q,size:new dt(S,b)},s.set(u,_),u.addEventListener("dispose",P)}let m=0;for(let y=0;y<f.length;y++)m+=f[y];const d=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(e,"morphTargetBaseInfluence",d),h.getUniforms().setValue(e,"morphTargetInfluences",f),h.getUniforms().setValue(e,"morphTargetsTexture",_.texture,n),h.getUniforms().setValue(e,"morphTargetsTextureSize",_.size)}else{const p=f===void 0?0:f.length;let g=i[u.id];if(g===void 0||g.length!==p){g=[];for(let v=0;v<p;v++)g[v]=[v,0];i[u.id]=g}for(let v=0;v<p;v++){const A=g[v];A[0]=v,A[1]=f[v]}g.sort(tS);for(let v=0;v<8;v++)v<p&&g[v][1]?(a[v][0]=g[v][0],a[v][1]=g[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(QM);const _=u.morphAttributes.position,m=u.morphAttributes.normal;let d=0;for(let v=0;v<8;v++){const A=a[v],C=A[0],T=A[1];C!==Number.MAX_SAFE_INTEGER&&T?(_&&u.getAttribute("morphTarget"+v)!==_[C]&&u.setAttribute("morphTarget"+v,_[C]),m&&u.getAttribute("morphNormal"+v)!==m[C]&&u.setAttribute("morphNormal"+v,m[C]),r[v]=T,d+=T):(_&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),m&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),r[v]=0)}const y=u.morphTargetsRelative?1:1-d;h.getUniforms().setValue(e,"morphTargetBaseInfluence",y),h.getUniforms().setValue(e,"morphTargetInfluences",r)}}return{update:c}}function nS(e,t,n,i){let r=new WeakMap;function s(c){const l=i.render.frame,u=c.geometry,h=t.get(c,u);if(r.get(h)!==l&&(t.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return h}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),n.remove(l.instanceMatrix),l.instanceColor!==null&&n.remove(l.instanceColor)}return{update:s,dispose:o}}class b_ extends Un{constructor(t,n,i,r,s,o,a,c,l,u){if(u=u!==void 0?u:Br,u!==Br&&u!==ks)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Br&&(i=nr),i===void 0&&u===ks&&(i=Or),super(null,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=a!==void 0?a:vn,this.minFilter=c!==void 0?c:vn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const T_=new Un,A_=new b_(1,1);A_.compareFunction=l_;const w_=new d_,R_=new kx,C_=new M_,Ip=[],Dp=[],Up=new Float32Array(16),Np=new Float32Array(9),Fp=new Float32Array(4);function ro(e,t,n){const i=e[0];if(i<=0||i>0)return e;const r=t*n;let s=Ip[r];if(s===void 0&&(s=new Float32Array(r),Ip[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=n,e[o].toArray(s,a)}return s}function Xe(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function qe(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Lc(e,t){let n=Dp[t];n===void 0&&(n=new Int32Array(t),Dp[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function iS(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function rS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Xe(n,t))return;e.uniform2fv(this.addr,t),qe(n,t)}}function sS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Xe(n,t))return;e.uniform3fv(this.addr,t),qe(n,t)}}function oS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Xe(n,t))return;e.uniform4fv(this.addr,t),qe(n,t)}}function aS(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Xe(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),qe(n,t)}else{if(Xe(n,i))return;Fp.set(i),e.uniformMatrix2fv(this.addr,!1,Fp),qe(n,i)}}function cS(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Xe(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),qe(n,t)}else{if(Xe(n,i))return;Np.set(i),e.uniformMatrix3fv(this.addr,!1,Np),qe(n,i)}}function lS(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Xe(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),qe(n,t)}else{if(Xe(n,i))return;Up.set(i),e.uniformMatrix4fv(this.addr,!1,Up),qe(n,i)}}function uS(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function hS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Xe(n,t))return;e.uniform2iv(this.addr,t),qe(n,t)}}function fS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Xe(n,t))return;e.uniform3iv(this.addr,t),qe(n,t)}}function dS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Xe(n,t))return;e.uniform4iv(this.addr,t),qe(n,t)}}function pS(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function mS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Xe(n,t))return;e.uniform2uiv(this.addr,t),qe(n,t)}}function gS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Xe(n,t))return;e.uniform3uiv(this.addr,t),qe(n,t)}}function _S(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Xe(n,t))return;e.uniform4uiv(this.addr,t),qe(n,t)}}function vS(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);const s=this.type===e.SAMPLER_2D_SHADOW?A_:T_;n.setTexture2D(t||s,r)}function xS(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||R_,r)}function yS(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(t||C_,r)}function MS(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||w_,r)}function SS(e){switch(e){case 5126:return iS;case 35664:return rS;case 35665:return sS;case 35666:return oS;case 35674:return aS;case 35675:return cS;case 35676:return lS;case 5124:case 35670:return uS;case 35667:case 35671:return hS;case 35668:case 35672:return fS;case 35669:case 35673:return dS;case 5125:return pS;case 36294:return mS;case 36295:return gS;case 36296:return _S;case 35678:case 36198:case 36298:case 36306:case 35682:return vS;case 35679:case 36299:case 36307:return xS;case 35680:case 36300:case 36308:case 36293:return yS;case 36289:case 36303:case 36311:case 36292:return MS}}function ES(e,t){e.uniform1fv(this.addr,t)}function bS(e,t){const n=ro(t,this.size,2);e.uniform2fv(this.addr,n)}function TS(e,t){const n=ro(t,this.size,3);e.uniform3fv(this.addr,n)}function AS(e,t){const n=ro(t,this.size,4);e.uniform4fv(this.addr,n)}function wS(e,t){const n=ro(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function RS(e,t){const n=ro(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function CS(e,t){const n=ro(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function LS(e,t){e.uniform1iv(this.addr,t)}function PS(e,t){e.uniform2iv(this.addr,t)}function IS(e,t){e.uniform3iv(this.addr,t)}function DS(e,t){e.uniform4iv(this.addr,t)}function US(e,t){e.uniform1uiv(this.addr,t)}function NS(e,t){e.uniform2uiv(this.addr,t)}function FS(e,t){e.uniform3uiv(this.addr,t)}function OS(e,t){e.uniform4uiv(this.addr,t)}function BS(e,t,n){const i=this.cache,r=t.length,s=Lc(n,r);Xe(i,s)||(e.uniform1iv(this.addr,s),qe(i,s));for(let o=0;o!==r;++o)n.setTexture2D(t[o]||T_,s[o])}function zS(e,t,n){const i=this.cache,r=t.length,s=Lc(n,r);Xe(i,s)||(e.uniform1iv(this.addr,s),qe(i,s));for(let o=0;o!==r;++o)n.setTexture3D(t[o]||R_,s[o])}function kS(e,t,n){const i=this.cache,r=t.length,s=Lc(n,r);Xe(i,s)||(e.uniform1iv(this.addr,s),qe(i,s));for(let o=0;o!==r;++o)n.setTextureCube(t[o]||C_,s[o])}function HS(e,t,n){const i=this.cache,r=t.length,s=Lc(n,r);Xe(i,s)||(e.uniform1iv(this.addr,s),qe(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(t[o]||w_,s[o])}function VS(e){switch(e){case 5126:return ES;case 35664:return bS;case 35665:return TS;case 35666:return AS;case 35674:return wS;case 35675:return RS;case 35676:return CS;case 5124:case 35670:return LS;case 35667:case 35671:return PS;case 35668:case 35672:return IS;case 35669:case 35673:return DS;case 5125:return US;case 36294:return NS;case 36295:return FS;case 36296:return OS;case 35678:case 36198:case 36298:case 36306:case 35682:return BS;case 35679:case 36299:case 36307:return zS;case 35680:case 36300:case 36308:case 36293:return kS;case 36289:case 36303:case 36311:case 36292:return HS}}class GS{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=SS(n.type)}}class WS{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=VS(n.type)}}class XS{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,n[a.id],i)}}}const Dl=/(\w+)(\])?(\[|\.)?/g;function Op(e,t){e.seq.push(t),e.map[t.id]=t}function qS(e,t,n){const i=e.name,r=i.length;for(Dl.lastIndex=0;;){const s=Dl.exec(i),o=Dl.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Op(n,l===void 0?new GS(a,e,t):new WS(a,e,t));break}else{let h=n.map[a];h===void 0&&(h=new XS(a),Op(n,h)),n=h}}}class La{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(n,r),o=t.getUniformLocation(n,s.name);qS(s,o,this)}}setValue(t,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(t,i,r)}setOptional(t,n,i){const r=n[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,r)}}static seqWithValue(t,n){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in n&&i.push(o)}return i}}function Bp(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const YS=37297;let jS=0;function KS(e,t){const n=e.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function $S(e){const t=ie.getPrimaries(ie.workingColorSpace),n=ie.getPrimaries(e);let i;switch(t===n?i="":t===Ya&&n===qa?i="LinearDisplayP3ToLinearSRGB":t===qa&&n===Ya&&(i="LinearSRGBToLinearDisplayP3"),e){case Xi:case wc:return[i,"LinearTransferOETF"];case tn:case wh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",e),[i,"LinearTransferOETF"]}}function zp(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),r=e.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+KS(e.getShaderSource(t),o)}else return r}function JS(e,t){const n=$S(t);return`vec4 ${e}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function ZS(e,t){let n;switch(t){case $v:n="Linear";break;case Jv:n="Reinhard";break;case Zv:n="OptimizedCineon";break;case Qv:n="ACESFilmic";break;case ex:n="AgX";break;case tx:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function QS(e){return[e.extensionDerivatives||e.envMapCubeUVHeight||e.bumpMap||e.normalMapTangentSpace||e.clearcoatNormalMap||e.flatShading||e.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(e.extensionFragDepth||e.logarithmicDepthBuffer)&&e.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",e.extensionDrawBuffers&&e.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(e.extensionShaderTextureLOD||e.envMap||e.transmission)&&e.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ms).join(`
`)}function tE(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ms).join(`
`)}function eE(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function nE(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=e.getActiveAttrib(t,r),o=s.name;let a=1;s.type===e.FLOAT_MAT2&&(a=2),s.type===e.FLOAT_MAT3&&(a=3),s.type===e.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:e.getAttribLocation(t,o),locationSize:a}}return n}function Ms(e){return e!==""}function kp(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Hp(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const iE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Su(e){return e.replace(iE,sE)}const rE=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function sE(e,t){let n=zt[t];if(n===void 0){const i=rE.get(t);if(i!==void 0)n=zt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Su(n)}const oE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vp(e){return e.replace(oE,aE)}function aE(e,t,n,i){let r="";for(let s=parseInt(t);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Gp(e){let t="precision "+e.precision+` float;
precision `+e.precision+" int;";return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function cE(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Jg?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===bv?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===Di&&(t="SHADOWMAP_TYPE_VSM"),t}function lE(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case Bs:case zs:t="ENVMAP_TYPE_CUBE";break;case Ac:t="ENVMAP_TYPE_CUBE_UV";break}return t}function uE(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case zs:t="ENVMAP_MODE_REFRACTION";break}return t}function hE(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case Zg:t="ENVMAP_BLENDING_MULTIPLY";break;case jv:t="ENVMAP_BLENDING_MIX";break;case Kv:t="ENVMAP_BLENDING_ADD";break}return t}function fE(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function dE(e,t,n,i){const r=e.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const c=cE(n),l=lE(n),u=uE(n),h=hE(n),f=fE(n),p=n.isWebGL2?"":QS(n),g=tE(n),_=eE(s),m=r.createProgram();let d,y,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ms).join(`
`),d.length>0&&(d+=`
`),y=[p,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ms).join(`
`),y.length>0&&(y+=`
`)):(d=[Gp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ms).join(`
`),y=[p,Gp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+u:"",n.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==lr?"#define TONE_MAPPING":"",n.toneMapping!==lr?zt.tonemapping_pars_fragment:"",n.toneMapping!==lr?ZS("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,JS("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ms).join(`
`)),o=Su(o),o=kp(o,n),o=Hp(o,n),a=Su(a),a=kp(a,n),a=Hp(a,n),o=Vp(o),a=Vp(a),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,d=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,y=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===ap?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===ap?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const A=v+d+o,C=v+y+a,T=Bp(r,r.VERTEX_SHADER,A),w=Bp(r,r.FRAGMENT_SHADER,C);r.attachShader(m,T),r.attachShader(m,w),n.index0AttributeName!==void 0?r.bindAttribLocation(m,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function V(q){if(e.debug.checkShaderErrors){const et=r.getProgramInfoLog(m).trim(),P=r.getShaderInfoLog(T).trim(),F=r.getShaderInfoLog(w).trim();let G=!0,Y=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(G=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,m,T,w);else{const X=zp(r,T,"vertex"),W=zp(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+et+`
`+X+`
`+W)}else et!==""?console.warn("THREE.WebGLProgram: Program Info Log:",et):(P===""||F==="")&&(Y=!1);Y&&(q.diagnostics={runnable:G,programLog:et,vertexShader:{log:P,prefix:d},fragmentShader:{log:F,prefix:y}})}r.deleteShader(T),r.deleteShader(w),S=new La(r,m),b=nE(r,m)}let S;this.getUniforms=function(){return S===void 0&&V(this),S};let b;this.getAttributes=function(){return b===void 0&&V(this),b};let z=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=r.getProgramParameter(m,YS)),z},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=jS++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=w,this}let pE=0;class mE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new gE(t),n.set(t,i)),i}}class gE{constructor(t){this.id=pE++,this.code=t,this.usedTimes=0}}function _E(e,t,n,i,r,s,o){const a=new m_,c=new mE,l=[],u=r.isWebGL2,h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function m(S,b,z,q,et){const P=q.fog,F=et.geometry,G=S.isMeshStandardMaterial?q.environment:null,Y=(S.isMeshStandardMaterial?n:t).get(S.envMap||G),X=Y&&Y.mapping===Ac?Y.image.height:null,W=g[S.type];S.precision!==null&&(p=r.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const K=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Q=K!==void 0?K.length:0;let at=0;F.morphAttributes.position!==void 0&&(at=1),F.morphAttributes.normal!==void 0&&(at=2),F.morphAttributes.color!==void 0&&(at=3);let H,j,ct,St;if(W){const pn=gi[W];H=pn.vertexShader,j=pn.fragmentShader}else H=S.vertexShader,j=S.fragmentShader,c.update(S),ct=c.getVertexShaderID(S),St=c.getFragmentShaderID(S);const Mt=e.getRenderTarget(),Nt=et.isInstancedMesh===!0,Ot=et.isBatchedMesh===!0,Ct=!!S.map,Kt=!!S.matcap,U=!!Y,dn=!!S.aoMap,Tt=!!S.lightMap,Dt=!!S.bumpMap,_t=!!S.normalMap,xe=!!S.displacementMap,kt=!!S.emissiveMap,E=!!S.metalnessMap,x=!!S.roughnessMap,O=S.anisotropy>0,Z=S.clearcoat>0,J=S.iridescence>0,tt=S.sheen>0,vt=S.transmission>0,ot=O&&!!S.anisotropyMap,ht=Z&&!!S.clearcoatMap,Rt=Z&&!!S.clearcoatNormalMap,Ht=Z&&!!S.clearcoatRoughnessMap,$=J&&!!S.iridescenceMap,ne=J&&!!S.iridescenceThicknessMap,qt=tt&&!!S.sheenColorMap,It=tt&&!!S.sheenRoughnessMap,Et=!!S.specularMap,ft=!!S.specularColorMap,Bt=!!S.specularIntensityMap,ee=vt&&!!S.transmissionMap,we=vt&&!!S.thicknessMap,Gt=!!S.gradientMap,nt=!!S.alphaMap,R=S.alphaTest>0,rt=!!S.alphaHash,st=!!S.extensions,Lt=!!F.attributes.uv1,At=!!F.attributes.uv2,ae=!!F.attributes.uv3;let ce=lr;return S.toneMapped&&(Mt===null||Mt.isXRRenderTarget===!0)&&(ce=e.toneMapping),{isWebGL2:u,shaderID:W,shaderType:S.type,shaderName:S.name,vertexShader:H,fragmentShader:j,defines:S.defines,customVertexShaderID:ct,customFragmentShaderID:St,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Ot,instancing:Nt,instancingColor:Nt&&et.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:Mt===null?e.outputColorSpace:Mt.isXRRenderTarget===!0?Mt.texture.colorSpace:Xi,map:Ct,matcap:Kt,envMap:U,envMapMode:U&&Y.mapping,envMapCubeUVHeight:X,aoMap:dn,lightMap:Tt,bumpMap:Dt,normalMap:_t,displacementMap:f&&xe,emissiveMap:kt,normalMapObjectSpace:_t&&S.normalMapType===dx,normalMapTangentSpace:_t&&S.normalMapType===c_,metalnessMap:E,roughnessMap:x,anisotropy:O,anisotropyMap:ot,clearcoat:Z,clearcoatMap:ht,clearcoatNormalMap:Rt,clearcoatRoughnessMap:Ht,iridescence:J,iridescenceMap:$,iridescenceThicknessMap:ne,sheen:tt,sheenColorMap:qt,sheenRoughnessMap:It,specularMap:Et,specularColorMap:ft,specularIntensityMap:Bt,transmission:vt,transmissionMap:ee,thicknessMap:we,gradientMap:Gt,opaque:S.transparent===!1&&S.blending===bs,alphaMap:nt,alphaTest:R,alphaHash:rt,combine:S.combine,mapUv:Ct&&_(S.map.channel),aoMapUv:dn&&_(S.aoMap.channel),lightMapUv:Tt&&_(S.lightMap.channel),bumpMapUv:Dt&&_(S.bumpMap.channel),normalMapUv:_t&&_(S.normalMap.channel),displacementMapUv:xe&&_(S.displacementMap.channel),emissiveMapUv:kt&&_(S.emissiveMap.channel),metalnessMapUv:E&&_(S.metalnessMap.channel),roughnessMapUv:x&&_(S.roughnessMap.channel),anisotropyMapUv:ot&&_(S.anisotropyMap.channel),clearcoatMapUv:ht&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Rt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ht&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:qt&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:It&&_(S.sheenRoughnessMap.channel),specularMapUv:Et&&_(S.specularMap.channel),specularColorMapUv:ft&&_(S.specularColorMap.channel),specularIntensityMapUv:Bt&&_(S.specularIntensityMap.channel),transmissionMapUv:ee&&_(S.transmissionMap.channel),thicknessMapUv:we&&_(S.thicknessMap.channel),alphaMapUv:nt&&_(S.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(_t||O),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:Lt,vertexUv2s:At,vertexUv3s:ae,pointsUvs:et.isPoints===!0&&!!F.attributes.uv&&(Ct||nt),fog:!!P,useFog:S.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:et.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:at,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:e.shadowMap.enabled&&z.length>0,shadowMapType:e.shadowMap.type,toneMapping:ce,useLegacyLights:e._useLegacyLights,decodeVideoTexture:Ct&&S.map.isVideoTexture===!0&&ie.getTransfer(S.map.colorSpace)===de,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Fi,flipSided:S.side===En,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:st&&S.extensions.derivatives===!0,extensionFragDepth:st&&S.extensions.fragDepth===!0,extensionDrawBuffers:st&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:st&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:st&&S.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function d(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const z in S.defines)b.push(z),b.push(S.defines[z]);return S.isRawShaderMaterial===!1&&(y(b,S),v(b,S),b.push(e.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function y(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function v(S,b){a.disableAll(),b.isWebGL2&&a.enable(0),b.supportsVertexTextures&&a.enable(1),b.instancing&&a.enable(2),b.instancingColor&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.useLegacyLights&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function A(S){const b=g[S.type];let z;if(b){const q=gi[b];z=Qx.clone(q.uniforms)}else z=S.uniforms;return z}function C(S,b){let z;for(let q=0,et=l.length;q<et;q++){const P=l[q];if(P.cacheKey===b){z=P,++z.usedTimes;break}}return z===void 0&&(z=new dE(e,b,S,s),l.push(z)),z}function T(S){if(--S.usedTimes===0){const b=l.indexOf(S);l[b]=l[l.length-1],l.pop(),S.destroy()}}function w(S){c.remove(S)}function V(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:A,acquireProgram:C,releaseProgram:T,releaseShaderCache:w,programs:l,dispose:V}}function vE(){let e=new WeakMap;function t(s){let o=e.get(s);return o===void 0&&(o={},e.set(s,o)),o}function n(s){e.delete(s)}function i(s,o,a){e.get(s)[o]=a}function r(){e=new WeakMap}return{get:t,remove:n,update:i,dispose:r}}function xE(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function Wp(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Xp(){const e=[];let t=0;const n=[],i=[],r=[];function s(){t=0,n.length=0,i.length=0,r.length=0}function o(h,f,p,g,_,m){let d=e[t];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},e[t]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=_,d.group=m),t++,d}function a(h,f,p,g,_,m){const d=o(h,f,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):n.push(d)}function c(h,f,p,g,_,m){const d=o(h,f,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):n.unshift(d)}function l(h,f){n.length>1&&n.sort(h||xE),i.length>1&&i.sort(f||Wp),r.length>1&&r.sort(f||Wp)}function u(){for(let h=t,f=e.length;h<f;h++){const p=e[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function yE(){let e=new WeakMap;function t(i,r){const s=e.get(i);let o;return s===void 0?(o=new Xp,e.set(i,[o])):r>=s.length?(o=new Xp,s.push(o)):o=s[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}function ME(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new L,color:new $t};break;case"SpotLight":n={position:new L,direction:new L,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new L,color:new $t,distance:0,decay:0};break;case"HemisphereLight":n={direction:new L,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":n={color:new $t,position:new L,halfWidth:new L,halfHeight:new L};break}return e[t.id]=n,n}}}function SE(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let EE=0;function bE(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function TE(e,t){const n=new ME,i=SE(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new L);const s=new L,o=new Ue,a=new Ue;function c(u,h){let f=0,p=0,g=0;for(let q=0;q<9;q++)r.probe[q].set(0,0,0);let _=0,m=0,d=0,y=0,v=0,A=0,C=0,T=0,w=0,V=0,S=0;u.sort(bE);const b=h===!0?Math.PI:1;for(let q=0,et=u.length;q<et;q++){const P=u[q],F=P.color,G=P.intensity,Y=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)f+=F.r*G*b,p+=F.g*G*b,g+=F.b*G*b;else if(P.isLightProbe){for(let W=0;W<9;W++)r.probe[W].addScaledVector(P.sh.coefficients[W],G);S++}else if(P.isDirectionalLight){const W=n.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity*b),P.castShadow){const K=P.shadow,Q=i.get(P);Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,r.directionalShadow[_]=Q,r.directionalShadowMap[_]=X,r.directionalShadowMatrix[_]=P.shadow.matrix,A++}r.directional[_]=W,_++}else if(P.isSpotLight){const W=n.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(F).multiplyScalar(G*b),W.distance=Y,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,r.spot[d]=W;const K=P.shadow;if(P.map&&(r.spotLightMap[w]=P.map,w++,K.updateMatrices(P),P.castShadow&&V++),r.spotLightMatrix[d]=K.matrix,P.castShadow){const Q=i.get(P);Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,r.spotShadow[d]=Q,r.spotShadowMap[d]=X,T++}d++}else if(P.isRectAreaLight){const W=n.get(P);W.color.copy(F).multiplyScalar(G),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),r.rectArea[y]=W,y++}else if(P.isPointLight){const W=n.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity*b),W.distance=P.distance,W.decay=P.decay,P.castShadow){const K=P.shadow,Q=i.get(P);Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,Q.shadowCameraNear=K.camera.near,Q.shadowCameraFar=K.camera.far,r.pointShadow[m]=Q,r.pointShadowMap[m]=X,r.pointShadowMatrix[m]=P.shadow.matrix,C++}r.point[m]=W,m++}else if(P.isHemisphereLight){const W=n.get(P);W.skyColor.copy(P.color).multiplyScalar(G*b),W.groundColor.copy(P.groundColor).multiplyScalar(G*b),r.hemi[v]=W,v++}}y>0&&(t.isWebGL2?e.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=it.LTC_FLOAT_1,r.rectAreaLTC2=it.LTC_FLOAT_2):(r.rectAreaLTC1=it.LTC_HALF_1,r.rectAreaLTC2=it.LTC_HALF_2):e.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=it.LTC_FLOAT_1,r.rectAreaLTC2=it.LTC_FLOAT_2):e.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=it.LTC_HALF_1,r.rectAreaLTC2=it.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=p,r.ambient[2]=g;const z=r.hash;(z.directionalLength!==_||z.pointLength!==m||z.spotLength!==d||z.rectAreaLength!==y||z.hemiLength!==v||z.numDirectionalShadows!==A||z.numPointShadows!==C||z.numSpotShadows!==T||z.numSpotMaps!==w||z.numLightProbes!==S)&&(r.directional.length=_,r.spot.length=d,r.rectArea.length=y,r.point.length=m,r.hemi.length=v,r.directionalShadow.length=A,r.directionalShadowMap.length=A,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=A,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=T+w-V,r.spotLightMap.length=w,r.numSpotLightShadowsWithMaps=V,r.numLightProbes=S,z.directionalLength=_,z.pointLength=m,z.spotLength=d,z.rectAreaLength=y,z.hemiLength=v,z.numDirectionalShadows=A,z.numPointShadows=C,z.numSpotShadows=T,z.numSpotMaps=w,z.numLightProbes=S,r.version=EE++)}function l(u,h){let f=0,p=0,g=0,_=0,m=0;const d=h.matrixWorldInverse;for(let y=0,v=u.length;y<v;y++){const A=u[y];if(A.isDirectionalLight){const C=r.directional[f];C.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(d),f++}else if(A.isSpotLight){const C=r.spot[g];C.position.setFromMatrixPosition(A.matrixWorld),C.position.applyMatrix4(d),C.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(d),g++}else if(A.isRectAreaLight){const C=r.rectArea[_];C.position.setFromMatrixPosition(A.matrixWorld),C.position.applyMatrix4(d),a.identity(),o.copy(A.matrixWorld),o.premultiply(d),a.extractRotation(o),C.halfWidth.set(A.width*.5,0,0),C.halfHeight.set(0,A.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),_++}else if(A.isPointLight){const C=r.point[p];C.position.setFromMatrixPosition(A.matrixWorld),C.position.applyMatrix4(d),p++}else if(A.isHemisphereLight){const C=r.hemi[m];C.direction.setFromMatrixPosition(A.matrixWorld),C.direction.transformDirection(d),m++}}}return{setup:c,setupView:l,state:r}}function qp(e,t){const n=new TE(e,t),i=[],r=[];function s(){i.length=0,r.length=0}function o(h){i.push(h)}function a(h){r.push(h)}function c(h){n.setup(i,h)}function l(h){n.setupView(i,h)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function AE(e,t){let n=new WeakMap;function i(s,o=0){const a=n.get(s);let c;return a===void 0?(c=new qp(e,t),n.set(s,[c])):o>=a.length?(c=new qp(e,t),a.push(c)):c=a[o],c}function r(){n=new WeakMap}return{get:i,dispose:r}}class wE extends no{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class RE extends no{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const CE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,LE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function PE(e,t,n){let i=new Lh;const r=new dt,s=new dt,o=new Qe,a=new wE({depthPacking:fx}),c=new RE,l={},u=n.maxTextureSize,h={[pr]:En,[En]:pr,[Fi]:Fi},f=new qr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:CE,fragmentShader:LE}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new xn;g.setAttribute("position",new xi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ie(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jg;let d=this.type;this.render=function(T,w,V){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const S=e.getRenderTarget(),b=e.getActiveCubeFace(),z=e.getActiveMipmapLevel(),q=e.state;q.setBlending(cr),q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const et=d!==Di&&this.type===Di,P=d===Di&&this.type!==Di;for(let F=0,G=T.length;F<G;F++){const Y=T[F],X=Y.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;r.copy(X.mapSize);const W=X.getFrameExtents();if(r.multiply(W),s.copy(X.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/W.x),r.x=s.x*W.x,X.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/W.y),r.y=s.y*W.y,X.mapSize.y=s.y)),X.map===null||et===!0||P===!0){const Q=this.type!==Di?{minFilter:vn,magFilter:vn}:{};X.map!==null&&X.map.dispose(),X.map=new Xr(r.x,r.y,Q),X.map.texture.name=Y.name+".shadowMap",X.camera.updateProjectionMatrix()}e.setRenderTarget(X.map),e.clear();const K=X.getViewportCount();for(let Q=0;Q<K;Q++){const at=X.getViewport(Q);o.set(s.x*at.x,s.y*at.y,s.x*at.z,s.y*at.w),q.viewport(o),X.updateMatrices(Y,Q),i=X.getFrustum(),A(w,V,X.camera,Y,this.type)}X.isPointLightShadow!==!0&&this.type===Di&&y(X,V),X.needsUpdate=!1}d=this.type,m.needsUpdate=!1,e.setRenderTarget(S,b,z)};function y(T,w){const V=t.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Xr(r.x,r.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,e.setRenderTarget(T.mapPass),e.clear(),e.renderBufferDirect(w,null,V,f,_,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,e.setRenderTarget(T.map),e.clear(),e.renderBufferDirect(w,null,V,p,_,null)}function v(T,w,V,S){let b=null;const z=V.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(z!==void 0)b=z;else if(b=V.isPointLight===!0?c:a,e.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const q=b.uuid,et=w.uuid;let P=l[q];P===void 0&&(P={},l[q]=P);let F=P[et];F===void 0&&(F=b.clone(),P[et]=F,w.addEventListener("dispose",C)),b=F}if(b.visible=w.visible,b.wireframe=w.wireframe,S===Di?b.side=w.shadowSide!==null?w.shadowSide:w.side:b.side=w.shadowSide!==null?w.shadowSide:h[w.side],b.alphaMap=w.alphaMap,b.alphaTest=w.alphaTest,b.map=w.map,b.clipShadows=w.clipShadows,b.clippingPlanes=w.clippingPlanes,b.clipIntersection=w.clipIntersection,b.displacementMap=w.displacementMap,b.displacementScale=w.displacementScale,b.displacementBias=w.displacementBias,b.wireframeLinewidth=w.wireframeLinewidth,b.linewidth=w.linewidth,V.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const q=e.properties.get(b);q.light=V}return b}function A(T,w,V,S,b){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&b===Di)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,T.matrixWorld);const et=t.update(T),P=T.material;if(Array.isArray(P)){const F=et.groups;for(let G=0,Y=F.length;G<Y;G++){const X=F[G],W=P[X.materialIndex];if(W&&W.visible){const K=v(T,W,S,b);T.onBeforeShadow(e,T,w,V,et,K,X),e.renderBufferDirect(V,null,et,K,T,X),T.onAfterShadow(e,T,w,V,et,K,X)}}}else if(P.visible){const F=v(T,P,S,b);T.onBeforeShadow(e,T,w,V,et,F,null),e.renderBufferDirect(V,null,et,F,T,null),T.onAfterShadow(e,T,w,V,et,F,null)}}const q=T.children;for(let et=0,P=q.length;et<P;et++)A(q[et],w,V,S,b)}function C(T){T.target.removeEventListener("dispose",C);for(const V in l){const S=l[V],b=T.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}function IE(e,t,n){const i=n.isWebGL2;function r(){let R=!1;const rt=new Qe;let st=null;const Lt=new Qe(0,0,0,0);return{setMask:function(At){st!==At&&!R&&(e.colorMask(At,At,At,At),st=At)},setLocked:function(At){R=At},setClear:function(At,ae,ce,Ye,pn){pn===!0&&(At*=Ye,ae*=Ye,ce*=Ye),rt.set(At,ae,ce,Ye),Lt.equals(rt)===!1&&(e.clearColor(At,ae,ce,Ye),Lt.copy(rt))},reset:function(){R=!1,st=null,Lt.set(-1,0,0,0)}}}function s(){let R=!1,rt=null,st=null,Lt=null;return{setTest:function(At){At?Ot(e.DEPTH_TEST):Ct(e.DEPTH_TEST)},setMask:function(At){rt!==At&&!R&&(e.depthMask(At),rt=At)},setFunc:function(At){if(st!==At){switch(At){case Hv:e.depthFunc(e.NEVER);break;case Vv:e.depthFunc(e.ALWAYS);break;case Gv:e.depthFunc(e.LESS);break;case Wa:e.depthFunc(e.LEQUAL);break;case Wv:e.depthFunc(e.EQUAL);break;case Xv:e.depthFunc(e.GEQUAL);break;case qv:e.depthFunc(e.GREATER);break;case Yv:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}st=At}},setLocked:function(At){R=At},setClear:function(At){Lt!==At&&(e.clearDepth(At),Lt=At)},reset:function(){R=!1,rt=null,st=null,Lt=null}}}function o(){let R=!1,rt=null,st=null,Lt=null,At=null,ae=null,ce=null,Ye=null,pn=null;return{setTest:function(le){R||(le?Ot(e.STENCIL_TEST):Ct(e.STENCIL_TEST))},setMask:function(le){rt!==le&&!R&&(e.stencilMask(le),rt=le)},setFunc:function(le,mn,hi){(st!==le||Lt!==mn||At!==hi)&&(e.stencilFunc(le,mn,hi),st=le,Lt=mn,At=hi)},setOp:function(le,mn,hi){(ae!==le||ce!==mn||Ye!==hi)&&(e.stencilOp(le,mn,hi),ae=le,ce=mn,Ye=hi)},setLocked:function(le){R=le},setClear:function(le){pn!==le&&(e.clearStencil(le),pn=le)},reset:function(){R=!1,rt=null,st=null,Lt=null,At=null,ae=null,ce=null,Ye=null,pn=null}}}const a=new r,c=new s,l=new o,u=new WeakMap,h=new WeakMap;let f={},p={},g=new WeakMap,_=[],m=null,d=!1,y=null,v=null,A=null,C=null,T=null,w=null,V=null,S=new $t(0,0,0),b=0,z=!1,q=null,et=null,P=null,F=null,G=null;const Y=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,W=0;const K=e.getParameter(e.VERSION);K.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(K)[1]),X=W>=1):K.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),X=W>=2);let Q=null,at={};const H=e.getParameter(e.SCISSOR_BOX),j=e.getParameter(e.VIEWPORT),ct=new Qe().fromArray(H),St=new Qe().fromArray(j);function Mt(R,rt,st,Lt){const At=new Uint8Array(4),ae=e.createTexture();e.bindTexture(R,ae),e.texParameteri(R,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(R,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let ce=0;ce<st;ce++)i&&(R===e.TEXTURE_3D||R===e.TEXTURE_2D_ARRAY)?e.texImage3D(rt,0,e.RGBA,1,1,Lt,0,e.RGBA,e.UNSIGNED_BYTE,At):e.texImage2D(rt+ce,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,At);return ae}const Nt={};Nt[e.TEXTURE_2D]=Mt(e.TEXTURE_2D,e.TEXTURE_2D,1),Nt[e.TEXTURE_CUBE_MAP]=Mt(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Nt[e.TEXTURE_2D_ARRAY]=Mt(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Nt[e.TEXTURE_3D]=Mt(e.TEXTURE_3D,e.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Ot(e.DEPTH_TEST),c.setFunc(Wa),kt(!1),E(wd),Ot(e.CULL_FACE),_t(cr);function Ot(R){f[R]!==!0&&(e.enable(R),f[R]=!0)}function Ct(R){f[R]!==!1&&(e.disable(R),f[R]=!1)}function Kt(R,rt){return p[R]!==rt?(e.bindFramebuffer(R,rt),p[R]=rt,i&&(R===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=rt),R===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=rt)),!0):!1}function U(R,rt){let st=_,Lt=!1;if(R)if(st=g.get(rt),st===void 0&&(st=[],g.set(rt,st)),R.isWebGLMultipleRenderTargets){const At=R.texture;if(st.length!==At.length||st[0]!==e.COLOR_ATTACHMENT0){for(let ae=0,ce=At.length;ae<ce;ae++)st[ae]=e.COLOR_ATTACHMENT0+ae;st.length=At.length,Lt=!0}}else st[0]!==e.COLOR_ATTACHMENT0&&(st[0]=e.COLOR_ATTACHMENT0,Lt=!0);else st[0]!==e.BACK&&(st[0]=e.BACK,Lt=!0);Lt&&(n.isWebGL2?e.drawBuffers(st):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(st))}function dn(R){return m!==R?(e.useProgram(R),m=R,!0):!1}const Tt={[Tr]:e.FUNC_ADD,[Av]:e.FUNC_SUBTRACT,[wv]:e.FUNC_REVERSE_SUBTRACT};if(i)Tt[Pd]=e.MIN,Tt[Id]=e.MAX;else{const R=t.get("EXT_blend_minmax");R!==null&&(Tt[Pd]=R.MIN_EXT,Tt[Id]=R.MAX_EXT)}const Dt={[Rv]:e.ZERO,[Cv]:e.ONE,[Lv]:e.SRC_COLOR,[pu]:e.SRC_ALPHA,[Fv]:e.SRC_ALPHA_SATURATE,[Uv]:e.DST_COLOR,[Iv]:e.DST_ALPHA,[Pv]:e.ONE_MINUS_SRC_COLOR,[mu]:e.ONE_MINUS_SRC_ALPHA,[Nv]:e.ONE_MINUS_DST_COLOR,[Dv]:e.ONE_MINUS_DST_ALPHA,[Ov]:e.CONSTANT_COLOR,[Bv]:e.ONE_MINUS_CONSTANT_COLOR,[zv]:e.CONSTANT_ALPHA,[kv]:e.ONE_MINUS_CONSTANT_ALPHA};function _t(R,rt,st,Lt,At,ae,ce,Ye,pn,le){if(R===cr){d===!0&&(Ct(e.BLEND),d=!1);return}if(d===!1&&(Ot(e.BLEND),d=!0),R!==Tv){if(R!==y||le!==z){if((v!==Tr||T!==Tr)&&(e.blendEquation(e.FUNC_ADD),v=Tr,T=Tr),le)switch(R){case bs:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Rd:e.blendFunc(e.ONE,e.ONE);break;case Cd:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Ld:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case bs:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Rd:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case Cd:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Ld:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}A=null,C=null,w=null,V=null,S.set(0,0,0),b=0,y=R,z=le}return}At=At||rt,ae=ae||st,ce=ce||Lt,(rt!==v||At!==T)&&(e.blendEquationSeparate(Tt[rt],Tt[At]),v=rt,T=At),(st!==A||Lt!==C||ae!==w||ce!==V)&&(e.blendFuncSeparate(Dt[st],Dt[Lt],Dt[ae],Dt[ce]),A=st,C=Lt,w=ae,V=ce),(Ye.equals(S)===!1||pn!==b)&&(e.blendColor(Ye.r,Ye.g,Ye.b,pn),S.copy(Ye),b=pn),y=R,z=!1}function xe(R,rt){R.side===Fi?Ct(e.CULL_FACE):Ot(e.CULL_FACE);let st=R.side===En;rt&&(st=!st),kt(st),R.blending===bs&&R.transparent===!1?_t(cr):_t(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),c.setFunc(R.depthFunc),c.setTest(R.depthTest),c.setMask(R.depthWrite),a.setMask(R.colorWrite);const Lt=R.stencilWrite;l.setTest(Lt),Lt&&(l.setMask(R.stencilWriteMask),l.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),l.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),O(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Ot(e.SAMPLE_ALPHA_TO_COVERAGE):Ct(e.SAMPLE_ALPHA_TO_COVERAGE)}function kt(R){q!==R&&(R?e.frontFace(e.CW):e.frontFace(e.CCW),q=R)}function E(R){R!==Sv?(Ot(e.CULL_FACE),R!==et&&(R===wd?e.cullFace(e.BACK):R===Ev?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Ct(e.CULL_FACE),et=R}function x(R){R!==P&&(X&&e.lineWidth(R),P=R)}function O(R,rt,st){R?(Ot(e.POLYGON_OFFSET_FILL),(F!==rt||G!==st)&&(e.polygonOffset(rt,st),F=rt,G=st)):Ct(e.POLYGON_OFFSET_FILL)}function Z(R){R?Ot(e.SCISSOR_TEST):Ct(e.SCISSOR_TEST)}function J(R){R===void 0&&(R=e.TEXTURE0+Y-1),Q!==R&&(e.activeTexture(R),Q=R)}function tt(R,rt,st){st===void 0&&(Q===null?st=e.TEXTURE0+Y-1:st=Q);let Lt=at[st];Lt===void 0&&(Lt={type:void 0,texture:void 0},at[st]=Lt),(Lt.type!==R||Lt.texture!==rt)&&(Q!==st&&(e.activeTexture(st),Q=st),e.bindTexture(R,rt||Nt[R]),Lt.type=R,Lt.texture=rt)}function vt(){const R=at[Q];R!==void 0&&R.type!==void 0&&(e.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function ot(){try{e.compressedTexImage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ht(){try{e.compressedTexImage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Rt(){try{e.texSubImage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ht(){try{e.texSubImage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function $(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ne(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function qt(){try{e.texStorage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function It(){try{e.texStorage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Et(){try{e.texImage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ft(){try{e.texImage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Bt(R){ct.equals(R)===!1&&(e.scissor(R.x,R.y,R.z,R.w),ct.copy(R))}function ee(R){St.equals(R)===!1&&(e.viewport(R.x,R.y,R.z,R.w),St.copy(R))}function we(R,rt){let st=h.get(rt);st===void 0&&(st=new WeakMap,h.set(rt,st));let Lt=st.get(R);Lt===void 0&&(Lt=e.getUniformBlockIndex(rt,R.name),st.set(R,Lt))}function Gt(R,rt){const Lt=h.get(rt).get(R);u.get(rt)!==Lt&&(e.uniformBlockBinding(rt,Lt,R.__bindingPointIndex),u.set(rt,Lt))}function nt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),i===!0&&(e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null)),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),f={},Q=null,at={},p={},g=new WeakMap,_=[],m=null,d=!1,y=null,v=null,A=null,C=null,T=null,w=null,V=null,S=new $t(0,0,0),b=0,z=!1,q=null,et=null,P=null,F=null,G=null,ct.set(0,0,e.canvas.width,e.canvas.height),St.set(0,0,e.canvas.width,e.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Ot,disable:Ct,bindFramebuffer:Kt,drawBuffers:U,useProgram:dn,setBlending:_t,setMaterial:xe,setFlipSided:kt,setCullFace:E,setLineWidth:x,setPolygonOffset:O,setScissorTest:Z,activeTexture:J,bindTexture:tt,unbindTexture:vt,compressedTexImage2D:ot,compressedTexImage3D:ht,texImage2D:Et,texImage3D:ft,updateUBOMapping:we,uniformBlockBinding:Gt,texStorage2D:qt,texStorage3D:It,texSubImage2D:Rt,texSubImage3D:Ht,compressedTexSubImage2D:$,compressedTexSubImage3D:ne,scissor:Bt,viewport:ee,reset:nt}}function DE(e,t,n,i,r,s,o){const a=r.isWebGL2,c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,x){return p?new OffscreenCanvas(E,x):$a("canvas")}function _(E,x,O,Z){let J=1;if((E.width>Z||E.height>Z)&&(J=Z/Math.max(E.width,E.height)),J<1||x===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const tt=x?Ka:Math.floor,vt=tt(J*E.width),ot=tt(J*E.height);h===void 0&&(h=g(vt,ot));const ht=O?g(vt,ot):h;return ht.width=vt,ht.height=ot,ht.getContext("2d").drawImage(E,0,0,vt,ot),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+vt+"x"+ot+")."),ht}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function m(E){return Mu(E.width)&&Mu(E.height)}function d(E){return a?!1:E.wrapS!==ri||E.wrapT!==ri||E.minFilter!==vn&&E.minFilter!==Xn}function y(E,x){return E.generateMipmaps&&x&&E.minFilter!==vn&&E.minFilter!==Xn}function v(E){e.generateMipmap(E)}function A(E,x,O,Z,J=!1){if(a===!1)return x;if(E!==null){if(e[E]!==void 0)return e[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let tt=x;if(x===e.RED&&(O===e.FLOAT&&(tt=e.R32F),O===e.HALF_FLOAT&&(tt=e.R16F),O===e.UNSIGNED_BYTE&&(tt=e.R8)),x===e.RED_INTEGER&&(O===e.UNSIGNED_BYTE&&(tt=e.R8UI),O===e.UNSIGNED_SHORT&&(tt=e.R16UI),O===e.UNSIGNED_INT&&(tt=e.R32UI),O===e.BYTE&&(tt=e.R8I),O===e.SHORT&&(tt=e.R16I),O===e.INT&&(tt=e.R32I)),x===e.RG&&(O===e.FLOAT&&(tt=e.RG32F),O===e.HALF_FLOAT&&(tt=e.RG16F),O===e.UNSIGNED_BYTE&&(tt=e.RG8)),x===e.RGBA){const vt=J?Xa:ie.getTransfer(Z);O===e.FLOAT&&(tt=e.RGBA32F),O===e.HALF_FLOAT&&(tt=e.RGBA16F),O===e.UNSIGNED_BYTE&&(tt=vt===de?e.SRGB8_ALPHA8:e.RGBA8),O===e.UNSIGNED_SHORT_4_4_4_4&&(tt=e.RGBA4),O===e.UNSIGNED_SHORT_5_5_5_1&&(tt=e.RGB5_A1)}return(tt===e.R16F||tt===e.R32F||tt===e.RG16F||tt===e.RG32F||tt===e.RGBA16F||tt===e.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function C(E,x,O){return y(E,O)===!0||E.isFramebufferTexture&&E.minFilter!==vn&&E.minFilter!==Xn?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function T(E){return E===vn||E===Dd||E===sl?e.NEAREST:e.LINEAR}function w(E){const x=E.target;x.removeEventListener("dispose",w),S(x),x.isVideoTexture&&u.delete(x)}function V(E){const x=E.target;x.removeEventListener("dispose",V),z(x)}function S(E){const x=i.get(E);if(x.__webglInit===void 0)return;const O=E.source,Z=f.get(O);if(Z){const J=Z[x.__cacheKey];J.usedTimes--,J.usedTimes===0&&b(E),Object.keys(Z).length===0&&f.delete(O)}i.remove(E)}function b(E){const x=i.get(E);e.deleteTexture(x.__webglTexture);const O=E.source,Z=f.get(O);delete Z[x.__cacheKey],o.memory.textures--}function z(E){const x=E.texture,O=i.get(E),Z=i.get(x);if(Z.__webglTexture!==void 0&&(e.deleteTexture(Z.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(O.__webglFramebuffer[J]))for(let tt=0;tt<O.__webglFramebuffer[J].length;tt++)e.deleteFramebuffer(O.__webglFramebuffer[J][tt]);else e.deleteFramebuffer(O.__webglFramebuffer[J]);O.__webglDepthbuffer&&e.deleteRenderbuffer(O.__webglDepthbuffer[J])}else{if(Array.isArray(O.__webglFramebuffer))for(let J=0;J<O.__webglFramebuffer.length;J++)e.deleteFramebuffer(O.__webglFramebuffer[J]);else e.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer&&e.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&e.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let J=0;J<O.__webglColorRenderbuffer.length;J++)O.__webglColorRenderbuffer[J]&&e.deleteRenderbuffer(O.__webglColorRenderbuffer[J]);O.__webglDepthRenderbuffer&&e.deleteRenderbuffer(O.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let J=0,tt=x.length;J<tt;J++){const vt=i.get(x[J]);vt.__webglTexture&&(e.deleteTexture(vt.__webglTexture),o.memory.textures--),i.remove(x[J])}i.remove(x),i.remove(E)}let q=0;function et(){q=0}function P(){const E=q;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),q+=1,E}function F(E){const x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function G(E,x){const O=i.get(E);if(E.isVideoTexture&&xe(E),E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){const Z=E.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ct(O,E,x);return}}n.bindTexture(e.TEXTURE_2D,O.__webglTexture,e.TEXTURE0+x)}function Y(E,x){const O=i.get(E);if(E.version>0&&O.__version!==E.version){ct(O,E,x);return}n.bindTexture(e.TEXTURE_2D_ARRAY,O.__webglTexture,e.TEXTURE0+x)}function X(E,x){const O=i.get(E);if(E.version>0&&O.__version!==E.version){ct(O,E,x);return}n.bindTexture(e.TEXTURE_3D,O.__webglTexture,e.TEXTURE0+x)}function W(E,x){const O=i.get(E);if(E.version>0&&O.__version!==E.version){St(O,E,x);return}n.bindTexture(e.TEXTURE_CUBE_MAP,O.__webglTexture,e.TEXTURE0+x)}const K={[vu]:e.REPEAT,[ri]:e.CLAMP_TO_EDGE,[xu]:e.MIRRORED_REPEAT},Q={[vn]:e.NEAREST,[Dd]:e.NEAREST_MIPMAP_NEAREST,[sl]:e.NEAREST_MIPMAP_LINEAR,[Xn]:e.LINEAR,[nx]:e.LINEAR_MIPMAP_NEAREST,[Do]:e.LINEAR_MIPMAP_LINEAR},at={[px]:e.NEVER,[yx]:e.ALWAYS,[mx]:e.LESS,[l_]:e.LEQUAL,[gx]:e.EQUAL,[xx]:e.GEQUAL,[_x]:e.GREATER,[vx]:e.NOTEQUAL};function H(E,x,O){if(O?(e.texParameteri(E,e.TEXTURE_WRAP_S,K[x.wrapS]),e.texParameteri(E,e.TEXTURE_WRAP_T,K[x.wrapT]),(E===e.TEXTURE_3D||E===e.TEXTURE_2D_ARRAY)&&e.texParameteri(E,e.TEXTURE_WRAP_R,K[x.wrapR]),e.texParameteri(E,e.TEXTURE_MAG_FILTER,Q[x.magFilter]),e.texParameteri(E,e.TEXTURE_MIN_FILTER,Q[x.minFilter])):(e.texParameteri(E,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(E,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),(E===e.TEXTURE_3D||E===e.TEXTURE_2D_ARRAY)&&e.texParameteri(E,e.TEXTURE_WRAP_R,e.CLAMP_TO_EDGE),(x.wrapS!==ri||x.wrapT!==ri)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),e.texParameteri(E,e.TEXTURE_MAG_FILTER,T(x.magFilter)),e.texParameteri(E,e.TEXTURE_MIN_FILTER,T(x.minFilter)),x.minFilter!==vn&&x.minFilter!==Xn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(e.texParameteri(E,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(E,e.TEXTURE_COMPARE_FUNC,at[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const Z=t.get("EXT_texture_filter_anisotropic");if(x.magFilter===vn||x.minFilter!==sl&&x.minFilter!==Do||x.type===ir&&t.has("OES_texture_float_linear")===!1||a===!1&&x.type===Uo&&t.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||i.get(x).__currentAnisotropy)&&(e.texParameterf(E,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy)}}function j(E,x){let O=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",w));const Z=x.source;let J=f.get(Z);J===void 0&&(J={},f.set(Z,J));const tt=F(x);if(tt!==E.__cacheKey){J[tt]===void 0&&(J[tt]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,O=!0),J[tt].usedTimes++;const vt=J[E.__cacheKey];vt!==void 0&&(J[E.__cacheKey].usedTimes--,vt.usedTimes===0&&b(x)),E.__cacheKey=tt,E.__webglTexture=J[tt].texture}return O}function ct(E,x,O){let Z=e.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Z=e.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Z=e.TEXTURE_3D);const J=j(E,x),tt=x.source;n.bindTexture(Z,E.__webglTexture,e.TEXTURE0+O);const vt=i.get(tt);if(tt.version!==vt.__version||J===!0){n.activeTexture(e.TEXTURE0+O);const ot=ie.getPrimaries(ie.workingColorSpace),ht=x.colorSpace===jn?null:ie.getPrimaries(x.colorSpace),Rt=x.colorSpace===jn||ot===ht?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);const Ht=d(x)&&m(x.image)===!1;let $=_(x.image,Ht,!1,r.maxTextureSize);$=kt(x,$);const ne=m($)||a,qt=s.convert(x.format,x.colorSpace);let It=s.convert(x.type),Et=A(x.internalFormat,qt,It,x.colorSpace,x.isVideoTexture);H(Z,x,ne);let ft;const Bt=x.mipmaps,ee=a&&x.isVideoTexture!==!0&&Et!==o_,we=vt.__version===void 0||J===!0,Gt=C(x,$,ne);if(x.isDepthTexture)Et=e.DEPTH_COMPONENT,a?x.type===ir?Et=e.DEPTH_COMPONENT32F:x.type===nr?Et=e.DEPTH_COMPONENT24:x.type===Or?Et=e.DEPTH24_STENCIL8:Et=e.DEPTH_COMPONENT16:x.type===ir&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===Br&&Et===e.DEPTH_COMPONENT&&x.type!==Ah&&x.type!==nr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=nr,It=s.convert(x.type)),x.format===ks&&Et===e.DEPTH_COMPONENT&&(Et=e.DEPTH_STENCIL,x.type!==Or&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=Or,It=s.convert(x.type))),we&&(ee?n.texStorage2D(e.TEXTURE_2D,1,Et,$.width,$.height):n.texImage2D(e.TEXTURE_2D,0,Et,$.width,$.height,0,qt,It,null));else if(x.isDataTexture)if(Bt.length>0&&ne){ee&&we&&n.texStorage2D(e.TEXTURE_2D,Gt,Et,Bt[0].width,Bt[0].height);for(let nt=0,R=Bt.length;nt<R;nt++)ft=Bt[nt],ee?n.texSubImage2D(e.TEXTURE_2D,nt,0,0,ft.width,ft.height,qt,It,ft.data):n.texImage2D(e.TEXTURE_2D,nt,Et,ft.width,ft.height,0,qt,It,ft.data);x.generateMipmaps=!1}else ee?(we&&n.texStorage2D(e.TEXTURE_2D,Gt,Et,$.width,$.height),n.texSubImage2D(e.TEXTURE_2D,0,0,0,$.width,$.height,qt,It,$.data)):n.texImage2D(e.TEXTURE_2D,0,Et,$.width,$.height,0,qt,It,$.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ee&&we&&n.texStorage3D(e.TEXTURE_2D_ARRAY,Gt,Et,Bt[0].width,Bt[0].height,$.depth);for(let nt=0,R=Bt.length;nt<R;nt++)ft=Bt[nt],x.format!==si?qt!==null?ee?n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,nt,0,0,0,ft.width,ft.height,$.depth,qt,ft.data,0,0):n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,nt,Et,ft.width,ft.height,$.depth,0,ft.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?n.texSubImage3D(e.TEXTURE_2D_ARRAY,nt,0,0,0,ft.width,ft.height,$.depth,qt,It,ft.data):n.texImage3D(e.TEXTURE_2D_ARRAY,nt,Et,ft.width,ft.height,$.depth,0,qt,It,ft.data)}else{ee&&we&&n.texStorage2D(e.TEXTURE_2D,Gt,Et,Bt[0].width,Bt[0].height);for(let nt=0,R=Bt.length;nt<R;nt++)ft=Bt[nt],x.format!==si?qt!==null?ee?n.compressedTexSubImage2D(e.TEXTURE_2D,nt,0,0,ft.width,ft.height,qt,ft.data):n.compressedTexImage2D(e.TEXTURE_2D,nt,Et,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?n.texSubImage2D(e.TEXTURE_2D,nt,0,0,ft.width,ft.height,qt,It,ft.data):n.texImage2D(e.TEXTURE_2D,nt,Et,ft.width,ft.height,0,qt,It,ft.data)}else if(x.isDataArrayTexture)ee?(we&&n.texStorage3D(e.TEXTURE_2D_ARRAY,Gt,Et,$.width,$.height,$.depth),n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,qt,It,$.data)):n.texImage3D(e.TEXTURE_2D_ARRAY,0,Et,$.width,$.height,$.depth,0,qt,It,$.data);else if(x.isData3DTexture)ee?(we&&n.texStorage3D(e.TEXTURE_3D,Gt,Et,$.width,$.height,$.depth),n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,qt,It,$.data)):n.texImage3D(e.TEXTURE_3D,0,Et,$.width,$.height,$.depth,0,qt,It,$.data);else if(x.isFramebufferTexture){if(we)if(ee)n.texStorage2D(e.TEXTURE_2D,Gt,Et,$.width,$.height);else{let nt=$.width,R=$.height;for(let rt=0;rt<Gt;rt++)n.texImage2D(e.TEXTURE_2D,rt,Et,nt,R,0,qt,It,null),nt>>=1,R>>=1}}else if(Bt.length>0&&ne){ee&&we&&n.texStorage2D(e.TEXTURE_2D,Gt,Et,Bt[0].width,Bt[0].height);for(let nt=0,R=Bt.length;nt<R;nt++)ft=Bt[nt],ee?n.texSubImage2D(e.TEXTURE_2D,nt,0,0,qt,It,ft):n.texImage2D(e.TEXTURE_2D,nt,Et,qt,It,ft);x.generateMipmaps=!1}else ee?(we&&n.texStorage2D(e.TEXTURE_2D,Gt,Et,$.width,$.height),n.texSubImage2D(e.TEXTURE_2D,0,0,0,qt,It,$)):n.texImage2D(e.TEXTURE_2D,0,Et,qt,It,$);y(x,ne)&&v(Z),vt.__version=tt.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function St(E,x,O){if(x.image.length!==6)return;const Z=j(E,x),J=x.source;n.bindTexture(e.TEXTURE_CUBE_MAP,E.__webglTexture,e.TEXTURE0+O);const tt=i.get(J);if(J.version!==tt.__version||Z===!0){n.activeTexture(e.TEXTURE0+O);const vt=ie.getPrimaries(ie.workingColorSpace),ot=x.colorSpace===jn?null:ie.getPrimaries(x.colorSpace),ht=x.colorSpace===jn||vt===ot?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);const Rt=x.isCompressedTexture||x.image[0].isCompressedTexture,Ht=x.image[0]&&x.image[0].isDataTexture,$=[];for(let nt=0;nt<6;nt++)!Rt&&!Ht?$[nt]=_(x.image[nt],!1,!0,r.maxCubemapSize):$[nt]=Ht?x.image[nt].image:x.image[nt],$[nt]=kt(x,$[nt]);const ne=$[0],qt=m(ne)||a,It=s.convert(x.format,x.colorSpace),Et=s.convert(x.type),ft=A(x.internalFormat,It,Et,x.colorSpace),Bt=a&&x.isVideoTexture!==!0,ee=tt.__version===void 0||Z===!0;let we=C(x,ne,qt);H(e.TEXTURE_CUBE_MAP,x,qt);let Gt;if(Rt){Bt&&ee&&n.texStorage2D(e.TEXTURE_CUBE_MAP,we,ft,ne.width,ne.height);for(let nt=0;nt<6;nt++){Gt=$[nt].mipmaps;for(let R=0;R<Gt.length;R++){const rt=Gt[R];x.format!==si?It!==null?Bt?n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nt,R,0,0,rt.width,rt.height,It,rt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nt,R,ft,rt.width,rt.height,0,rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nt,R,0,0,rt.width,rt.height,It,Et,rt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nt,R,ft,rt.width,rt.height,0,It,Et,rt.data)}}}else{Gt=x.mipmaps,Bt&&ee&&(Gt.length>0&&we++,n.texStorage2D(e.TEXTURE_CUBE_MAP,we,ft,$[0].width,$[0].height));for(let nt=0;nt<6;nt++)if(Ht){Bt?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,$[nt].width,$[nt].height,It,Et,$[nt].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ft,$[nt].width,$[nt].height,0,It,Et,$[nt].data);for(let R=0;R<Gt.length;R++){const st=Gt[R].image[nt].image;Bt?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nt,R+1,0,0,st.width,st.height,It,Et,st.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nt,R+1,ft,st.width,st.height,0,It,Et,st.data)}}else{Bt?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,It,Et,$[nt]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ft,It,Et,$[nt]);for(let R=0;R<Gt.length;R++){const rt=Gt[R];Bt?n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nt,R+1,0,0,It,Et,rt.image[nt]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+nt,R+1,ft,It,Et,rt.image[nt])}}}y(x,qt)&&v(e.TEXTURE_CUBE_MAP),tt.__version=J.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function Mt(E,x,O,Z,J,tt){const vt=s.convert(O.format,O.colorSpace),ot=s.convert(O.type),ht=A(O.internalFormat,vt,ot,O.colorSpace);if(!i.get(x).__hasExternalTextures){const Ht=Math.max(1,x.width>>tt),$=Math.max(1,x.height>>tt);J===e.TEXTURE_3D||J===e.TEXTURE_2D_ARRAY?n.texImage3D(J,tt,ht,Ht,$,x.depth,0,vt,ot,null):n.texImage2D(J,tt,ht,Ht,$,0,vt,ot,null)}n.bindFramebuffer(e.FRAMEBUFFER,E),_t(x)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Z,J,i.get(O).__webglTexture,0,Dt(x)):(J===e.TEXTURE_2D||J>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,Z,J,i.get(O).__webglTexture,tt),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Nt(E,x,O){if(e.bindRenderbuffer(e.RENDERBUFFER,E),x.depthBuffer&&!x.stencilBuffer){let Z=a===!0?e.DEPTH_COMPONENT24:e.DEPTH_COMPONENT16;if(O||_t(x)){const J=x.depthTexture;J&&J.isDepthTexture&&(J.type===ir?Z=e.DEPTH_COMPONENT32F:J.type===nr&&(Z=e.DEPTH_COMPONENT24));const tt=Dt(x);_t(x)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,tt,Z,x.width,x.height):e.renderbufferStorageMultisample(e.RENDERBUFFER,tt,Z,x.width,x.height)}else e.renderbufferStorage(e.RENDERBUFFER,Z,x.width,x.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,E)}else if(x.depthBuffer&&x.stencilBuffer){const Z=Dt(x);O&&_t(x)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Z,e.DEPTH24_STENCIL8,x.width,x.height):_t(x)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Z,e.DEPTH24_STENCIL8,x.width,x.height):e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_STENCIL,x.width,x.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,E)}else{const Z=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let J=0;J<Z.length;J++){const tt=Z[J],vt=s.convert(tt.format,tt.colorSpace),ot=s.convert(tt.type),ht=A(tt.internalFormat,vt,ot,tt.colorSpace),Rt=Dt(x);O&&_t(x)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Rt,ht,x.width,x.height):_t(x)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Rt,ht,x.width,x.height):e.renderbufferStorage(e.RENDERBUFFER,ht,x.width,x.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ot(E,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G(x.depthTexture,0);const Z=i.get(x.depthTexture).__webglTexture,J=Dt(x);if(x.depthTexture.format===Br)_t(x)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Z,0,J):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Z,0);else if(x.depthTexture.format===ks)_t(x)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Z,0,J):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Ct(E){const x=i.get(E),O=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Ot(x.__webglFramebuffer,E)}else if(O){x.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer[Z]),x.__webglDepthbuffer[Z]=e.createRenderbuffer(),Nt(x.__webglDepthbuffer[Z],E,!1)}else n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=e.createRenderbuffer(),Nt(x.__webglDepthbuffer,E,!1);n.bindFramebuffer(e.FRAMEBUFFER,null)}function Kt(E,x,O){const Z=i.get(E);x!==void 0&&Mt(Z.__webglFramebuffer,E,E.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),O!==void 0&&Ct(E)}function U(E){const x=E.texture,O=i.get(E),Z=i.get(x);E.addEventListener("dispose",V),E.isWebGLMultipleRenderTargets!==!0&&(Z.__webglTexture===void 0&&(Z.__webglTexture=e.createTexture()),Z.__version=x.version,o.memory.textures++);const J=E.isWebGLCubeRenderTarget===!0,tt=E.isWebGLMultipleRenderTargets===!0,vt=m(E)||a;if(J){O.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(a&&x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[ot]=[];for(let ht=0;ht<x.mipmaps.length;ht++)O.__webglFramebuffer[ot][ht]=e.createFramebuffer()}else O.__webglFramebuffer[ot]=e.createFramebuffer()}else{if(a&&x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let ot=0;ot<x.mipmaps.length;ot++)O.__webglFramebuffer[ot]=e.createFramebuffer()}else O.__webglFramebuffer=e.createFramebuffer();if(tt)if(r.drawBuffers){const ot=E.texture;for(let ht=0,Rt=ot.length;ht<Rt;ht++){const Ht=i.get(ot[ht]);Ht.__webglTexture===void 0&&(Ht.__webglTexture=e.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&E.samples>0&&_t(E)===!1){const ot=tt?x:[x];O.__webglMultisampledFramebuffer=e.createFramebuffer(),O.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ht=0;ht<ot.length;ht++){const Rt=ot[ht];O.__webglColorRenderbuffer[ht]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,O.__webglColorRenderbuffer[ht]);const Ht=s.convert(Rt.format,Rt.colorSpace),$=s.convert(Rt.type),ne=A(Rt.internalFormat,Ht,$,Rt.colorSpace,E.isXRRenderTarget===!0),qt=Dt(E);e.renderbufferStorageMultisample(e.RENDERBUFFER,qt,ne,E.width,E.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.RENDERBUFFER,O.__webglColorRenderbuffer[ht])}e.bindRenderbuffer(e.RENDERBUFFER,null),E.depthBuffer&&(O.__webglDepthRenderbuffer=e.createRenderbuffer(),Nt(O.__webglDepthRenderbuffer,E,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(J){n.bindTexture(e.TEXTURE_CUBE_MAP,Z.__webglTexture),H(e.TEXTURE_CUBE_MAP,x,vt);for(let ot=0;ot<6;ot++)if(a&&x.mipmaps&&x.mipmaps.length>0)for(let ht=0;ht<x.mipmaps.length;ht++)Mt(O.__webglFramebuffer[ot][ht],E,x,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,ht);else Mt(O.__webglFramebuffer[ot],E,x,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);y(x,vt)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(tt){const ot=E.texture;for(let ht=0,Rt=ot.length;ht<Rt;ht++){const Ht=ot[ht],$=i.get(Ht);n.bindTexture(e.TEXTURE_2D,$.__webglTexture),H(e.TEXTURE_2D,Ht,vt),Mt(O.__webglFramebuffer,E,Ht,e.COLOR_ATTACHMENT0+ht,e.TEXTURE_2D,0),y(Ht,vt)&&v(e.TEXTURE_2D)}n.unbindTexture()}else{let ot=e.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(a?ot=E.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(ot,Z.__webglTexture),H(ot,x,vt),a&&x.mipmaps&&x.mipmaps.length>0)for(let ht=0;ht<x.mipmaps.length;ht++)Mt(O.__webglFramebuffer[ht],E,x,e.COLOR_ATTACHMENT0,ot,ht);else Mt(O.__webglFramebuffer,E,x,e.COLOR_ATTACHMENT0,ot,0);y(x,vt)&&v(ot),n.unbindTexture()}E.depthBuffer&&Ct(E)}function dn(E){const x=m(E)||a,O=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let Z=0,J=O.length;Z<J;Z++){const tt=O[Z];if(y(tt,x)){const vt=E.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:e.TEXTURE_2D,ot=i.get(tt).__webglTexture;n.bindTexture(vt,ot),v(vt),n.unbindTexture()}}}function Tt(E){if(a&&E.samples>0&&_t(E)===!1){const x=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],O=E.width,Z=E.height;let J=e.COLOR_BUFFER_BIT;const tt=[],vt=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ot=i.get(E),ht=E.isWebGLMultipleRenderTargets===!0;if(ht)for(let Rt=0;Rt<x.length;Rt++)n.bindFramebuffer(e.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Rt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,ot.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Rt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,ot.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,ot.__webglFramebuffer);for(let Rt=0;Rt<x.length;Rt++){tt.push(e.COLOR_ATTACHMENT0+Rt),E.depthBuffer&&tt.push(vt);const Ht=ot.__ignoreDepthValues!==void 0?ot.__ignoreDepthValues:!1;if(Ht===!1&&(E.depthBuffer&&(J|=e.DEPTH_BUFFER_BIT),E.stencilBuffer&&(J|=e.STENCIL_BUFFER_BIT)),ht&&e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,ot.__webglColorRenderbuffer[Rt]),Ht===!0&&(e.invalidateFramebuffer(e.READ_FRAMEBUFFER,[vt]),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[vt])),ht){const $=i.get(x[Rt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,$,0)}e.blitFramebuffer(0,0,O,Z,0,0,O,Z,J,e.NEAREST),l&&e.invalidateFramebuffer(e.READ_FRAMEBUFFER,tt)}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),ht)for(let Rt=0;Rt<x.length;Rt++){n.bindFramebuffer(e.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Rt,e.RENDERBUFFER,ot.__webglColorRenderbuffer[Rt]);const Ht=i.get(x[Rt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,ot.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Rt,e.TEXTURE_2D,Ht,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,ot.__webglMultisampledFramebuffer)}}function Dt(E){return Math.min(r.maxSamples,E.samples)}function _t(E){const x=i.get(E);return a&&E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function xe(E){const x=o.render.frame;u.get(E)!==x&&(u.set(E,x),E.update())}function kt(E,x){const O=E.colorSpace,Z=E.format,J=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===yu||O!==Xi&&O!==jn&&(ie.getTransfer(O)===de?a===!1?t.has("EXT_sRGB")===!0&&Z===si?(E.format=yu,E.minFilter=Xn,E.generateMipmaps=!1):x=h_.sRGBToLinear(x):(Z!==si||J!==ur)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}this.allocateTextureUnit=P,this.resetTextureUnits=et,this.setTexture2D=G,this.setTexture2DArray=Y,this.setTexture3D=X,this.setTextureCube=W,this.rebindTextures=Kt,this.setupRenderTarget=U,this.updateRenderTargetMipmap=dn,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=Ct,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=_t}function UE(e,t,n){const i=n.isWebGL2;function r(s,o=jn){let a;const c=ie.getTransfer(o);if(s===ur)return e.UNSIGNED_BYTE;if(s===e_)return e.UNSIGNED_SHORT_4_4_4_4;if(s===n_)return e.UNSIGNED_SHORT_5_5_5_1;if(s===ix)return e.BYTE;if(s===rx)return e.SHORT;if(s===Ah)return e.UNSIGNED_SHORT;if(s===t_)return e.INT;if(s===nr)return e.UNSIGNED_INT;if(s===ir)return e.FLOAT;if(s===Uo)return i?e.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===sx)return e.ALPHA;if(s===si)return e.RGBA;if(s===ox)return e.LUMINANCE;if(s===ax)return e.LUMINANCE_ALPHA;if(s===Br)return e.DEPTH_COMPONENT;if(s===ks)return e.DEPTH_STENCIL;if(s===yu)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===cx)return e.RED;if(s===i_)return e.RED_INTEGER;if(s===lx)return e.RG;if(s===r_)return e.RG_INTEGER;if(s===s_)return e.RGBA_INTEGER;if(s===ol||s===al||s===cl||s===ll)if(c===de)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===ol)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===al)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===cl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===ll)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===ol)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===al)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===cl)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===ll)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ud||s===Nd||s===Fd||s===Od)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Ud)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Nd)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Fd)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Od)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===o_)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Bd||s===zd)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Bd)return c===de?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===zd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===kd||s===Hd||s===Vd||s===Gd||s===Wd||s===Xd||s===qd||s===Yd||s===jd||s===Kd||s===$d||s===Jd||s===Zd||s===Qd)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(s===kd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Hd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Vd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Gd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Wd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Xd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===qd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Yd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===jd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Kd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===$d)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Jd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Zd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Qd)return c===de?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ul||s===tp||s===ep)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(s===ul)return c===de?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===tp)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===ep)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===ux||s===np||s===ip||s===rp)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(s===ul)return a.COMPRESSED_RED_RGTC1_EXT;if(s===np)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===ip)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===rp)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Or?i?e.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):e[s]!==void 0?e[s]:null}return{convert:r}}class NE extends qn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Cr extends rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const FE={type:"move"};class Ul{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Cr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Cr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Cr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=n.getJointPose(_,i),d=this._getHandJoint(l,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=n.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(FE)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new Cr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}class OE extends to{constructor(t,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,p=null,g=null;const _=n.getContextAttributes();let m=null,d=null;const y=[],v=[],A=new dt;let C=null;const T=new qn;T.layers.enable(1),T.viewport=new Qe;const w=new qn;w.layers.enable(2),w.viewport=new Qe;const V=[T,w],S=new NE;S.layers.enable(1),S.layers.enable(2);let b=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let j=y[H];return j===void 0&&(j=new Ul,y[H]=j),j.getTargetRaySpace()},this.getControllerGrip=function(H){let j=y[H];return j===void 0&&(j=new Ul,y[H]=j),j.getGripSpace()},this.getHand=function(H){let j=y[H];return j===void 0&&(j=new Ul,y[H]=j),j.getHandSpace()};function q(H){const j=v.indexOf(H.inputSource);if(j===-1)return;const ct=y[j];ct!==void 0&&(ct.update(H.inputSource,H.frame,l||o),ct.dispatchEvent({type:H.type,data:H.inputSource}))}function et(){r.removeEventListener("select",q),r.removeEventListener("selectstart",q),r.removeEventListener("selectend",q),r.removeEventListener("squeeze",q),r.removeEventListener("squeezestart",q),r.removeEventListener("squeezeend",q),r.removeEventListener("end",et),r.removeEventListener("inputsourceschange",P);for(let H=0;H<y.length;H++){const j=v[H];j!==null&&(v[H]=null,y[H].disconnect(j))}b=null,z=null,t.setRenderTarget(m),p=null,f=null,h=null,r=null,d=null,at.stop(),i.isPresenting=!1,t.setPixelRatio(C),t.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(H){if(r=H,r!==null){if(m=t.getRenderTarget(),r.addEventListener("select",q),r.addEventListener("selectstart",q),r.addEventListener("selectend",q),r.addEventListener("squeeze",q),r.addEventListener("squeezestart",q),r.addEventListener("squeezeend",q),r.addEventListener("end",et),r.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await n.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(A),r.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const j={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,j),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),d=new Xr(p.framebufferWidth,p.framebufferHeight,{format:si,type:ur,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let j=null,ct=null,St=null;_.depth&&(St=_.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,j=_.stencil?ks:Br,ct=_.stencil?Or:nr);const Mt={colorFormat:n.RGBA8,depthFormat:St,scaleFactor:s};h=new XRWebGLBinding(r,n),f=h.createProjectionLayer(Mt),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),d=new Xr(f.textureWidth,f.textureHeight,{format:si,type:ur,depthTexture:new b_(f.textureWidth,f.textureHeight,ct,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});const Nt=t.properties.get(d);Nt.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),at.setContext(r),at.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function P(H){for(let j=0;j<H.removed.length;j++){const ct=H.removed[j],St=v.indexOf(ct);St>=0&&(v[St]=null,y[St].disconnect(ct))}for(let j=0;j<H.added.length;j++){const ct=H.added[j];let St=v.indexOf(ct);if(St===-1){for(let Nt=0;Nt<y.length;Nt++)if(Nt>=v.length){v.push(ct),St=Nt;break}else if(v[Nt]===null){v[Nt]=ct,St=Nt;break}if(St===-1)break}const Mt=y[St];Mt&&Mt.connect(ct)}}const F=new L,G=new L;function Y(H,j,ct){F.setFromMatrixPosition(j.matrixWorld),G.setFromMatrixPosition(ct.matrixWorld);const St=F.distanceTo(G),Mt=j.projectionMatrix.elements,Nt=ct.projectionMatrix.elements,Ot=Mt[14]/(Mt[10]-1),Ct=Mt[14]/(Mt[10]+1),Kt=(Mt[9]+1)/Mt[5],U=(Mt[9]-1)/Mt[5],dn=(Mt[8]-1)/Mt[0],Tt=(Nt[8]+1)/Nt[0],Dt=Ot*dn,_t=Ot*Tt,xe=St/(-dn+Tt),kt=xe*-dn;j.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(kt),H.translateZ(xe),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();const E=Ot+xe,x=Ct+xe,O=Dt-kt,Z=_t+(St-kt),J=Kt*Ct/x*E,tt=U*Ct/x*E;H.projectionMatrix.makePerspective(O,Z,J,tt,E,x),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function X(H,j){j===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(j.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(r===null)return;S.near=w.near=T.near=H.near,S.far=w.far=T.far=H.far,(b!==S.near||z!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),b=S.near,z=S.far);const j=H.parent,ct=S.cameras;X(S,j);for(let St=0;St<ct.length;St++)X(ct[St],j);ct.length===2?Y(S,T,w):S.projectionMatrix.copy(T.projectionMatrix),W(H,S,j)};function W(H,j,ct){ct===null?H.matrix.copy(j.matrixWorld):(H.matrix.copy(ct.matrixWorld),H.matrix.invert(),H.matrix.multiply(j.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(j.projectionMatrix),H.projectionMatrixInverse.copy(j.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=No*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(H){c=H,f!==null&&(f.fixedFoveation=H),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=H)};let K=null;function Q(H,j){if(u=j.getViewerPose(l||o),g=j,u!==null){const ct=u.views;p!==null&&(t.setRenderTargetFramebuffer(d,p.framebuffer),t.setRenderTarget(d));let St=!1;ct.length!==S.cameras.length&&(S.cameras.length=0,St=!0);for(let Mt=0;Mt<ct.length;Mt++){const Nt=ct[Mt];let Ot=null;if(p!==null)Ot=p.getViewport(Nt);else{const Kt=h.getViewSubImage(f,Nt);Ot=Kt.viewport,Mt===0&&(t.setRenderTargetTextures(d,Kt.colorTexture,f.ignoreDepthValues?void 0:Kt.depthStencilTexture),t.setRenderTarget(d))}let Ct=V[Mt];Ct===void 0&&(Ct=new qn,Ct.layers.enable(Mt),Ct.viewport=new Qe,V[Mt]=Ct),Ct.matrix.fromArray(Nt.transform.matrix),Ct.matrix.decompose(Ct.position,Ct.quaternion,Ct.scale),Ct.projectionMatrix.fromArray(Nt.projectionMatrix),Ct.projectionMatrixInverse.copy(Ct.projectionMatrix).invert(),Ct.viewport.set(Ot.x,Ot.y,Ot.width,Ot.height),Mt===0&&(S.matrix.copy(Ct.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),St===!0&&S.cameras.push(Ct)}}for(let ct=0;ct<y.length;ct++){const St=v[ct],Mt=y[ct];St!==null&&Mt!==void 0&&Mt.update(St,j,l||o)}K&&K(H,j),j.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:j}),g=null}const at=new S_;at.setAnimationLoop(Q),this.setAnimationLoop=function(H){K=H},this.dispose=function(){}}}function BE(e,t){function n(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,x_(e)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,y,v,A){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),h(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,A)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),_(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,y,v):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,n(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===En&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,n(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===En&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,n(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,n(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const y=t.get(d).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const v=e._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*v,n(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,y,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*y,m.scale.value=v*.5,d.map&&(m.map.value=d.map,n(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,m.roughnessMapTransform)),t.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,y){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===En&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const y=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function zE(e,t,n,i){let r={},s={},o=[];const a=n.isWebGL2?e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(y,v){const A=v.program;i.uniformBlockBinding(y,A)}function l(y,v){let A=r[y.id];A===void 0&&(g(y),A=u(y),r[y.id]=A,y.addEventListener("dispose",m));const C=v.program;i.updateUBOMapping(y,C);const T=t.render.frame;s[y.id]!==T&&(f(y),s[y.id]=T)}function u(y){const v=h();y.__bindingPointIndex=v;const A=e.createBuffer(),C=y.__size,T=y.usage;return e.bindBuffer(e.UNIFORM_BUFFER,A),e.bufferData(e.UNIFORM_BUFFER,C,T),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,v,A),A}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const v=r[y.id],A=y.uniforms,C=y.__cache;e.bindBuffer(e.UNIFORM_BUFFER,v);for(let T=0,w=A.length;T<w;T++){const V=Array.isArray(A[T])?A[T]:[A[T]];for(let S=0,b=V.length;S<b;S++){const z=V[S];if(p(z,T,S,C)===!0){const q=z.__offset,et=Array.isArray(z.value)?z.value:[z.value];let P=0;for(let F=0;F<et.length;F++){const G=et[F],Y=_(G);typeof G=="number"||typeof G=="boolean"?(z.__data[0]=G,e.bufferSubData(e.UNIFORM_BUFFER,q+P,z.__data)):G.isMatrix3?(z.__data[0]=G.elements[0],z.__data[1]=G.elements[1],z.__data[2]=G.elements[2],z.__data[3]=0,z.__data[4]=G.elements[3],z.__data[5]=G.elements[4],z.__data[6]=G.elements[5],z.__data[7]=0,z.__data[8]=G.elements[6],z.__data[9]=G.elements[7],z.__data[10]=G.elements[8],z.__data[11]=0):(G.toArray(z.__data,P),P+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,q,z.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(y,v,A,C){const T=y.value,w=v+"_"+A;if(C[w]===void 0)return typeof T=="number"||typeof T=="boolean"?C[w]=T:C[w]=T.clone(),!0;{const V=C[w];if(typeof T=="number"||typeof T=="boolean"){if(V!==T)return C[w]=T,!0}else if(V.equals(T)===!1)return V.copy(T),!0}return!1}function g(y){const v=y.uniforms;let A=0;const C=16;for(let w=0,V=v.length;w<V;w++){const S=Array.isArray(v[w])?v[w]:[v[w]];for(let b=0,z=S.length;b<z;b++){const q=S[b],et=Array.isArray(q.value)?q.value:[q.value];for(let P=0,F=et.length;P<F;P++){const G=et[P],Y=_(G),X=A%C;X!==0&&C-X<Y.boundary&&(A+=C-X),q.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=A,A+=Y.storage}}}const T=A%C;return T>0&&(A+=C-T),y.__size=A,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const A=o.indexOf(v.__bindingPointIndex);o.splice(A,1),e.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function d(){for(const y in r)e.deleteBuffer(r[y]);o=[],r={},s={}}return{bind:c,update:l,dispose:d}}class L_{constructor(t={}){const{canvas:n=Nx(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const d=[],y=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=tn,this._useLegacyLights=!1,this.toneMapping=lr,this.toneMappingExposure=1;const v=this;let A=!1,C=0,T=0,w=null,V=-1,S=null;const b=new Qe,z=new Qe;let q=null;const et=new $t(0);let P=0,F=n.width,G=n.height,Y=1,X=null,W=null;const K=new Qe(0,0,F,G),Q=new Qe(0,0,F,G);let at=!1;const H=new Lh;let j=!1,ct=!1,St=null;const Mt=new Ue,Nt=new dt,Ot=new L,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Kt(){return w===null?Y:1}let U=i;function dn(M,D){for(let B=0;B<M.length;B++){const k=M[B],N=n.getContext(k,D);if(N!==null)return N}return null}try{const M={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Th}`),n.addEventListener("webglcontextlost",nt,!1),n.addEventListener("webglcontextrestored",R,!1),n.addEventListener("webglcontextcreationerror",rt,!1),U===null){const D=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&D.shift(),U=dn(D,M),U===null)throw dn(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Tt,Dt,_t,xe,kt,E,x,O,Z,J,tt,vt,ot,ht,Rt,Ht,$,ne,qt,It,Et,ft,Bt,ee;function we(){Tt=new KM(U),Dt=new GM(U,Tt,t),Tt.init(Dt),ft=new UE(U,Tt,Dt),_t=new IE(U,Tt,Dt),xe=new ZM(U),kt=new vE,E=new DE(U,Tt,_t,kt,Dt,ft,xe),x=new XM(v),O=new jM(v),Z=new o3(U,Dt),Bt=new HM(U,Tt,Z,Dt),J=new $M(U,Z,xe,Bt),tt=new nS(U,J,Z,xe),qt=new eS(U,Dt,E),Ht=new WM(kt),vt=new _E(v,x,O,Tt,Dt,Bt,Ht),ot=new BE(v,kt),ht=new yE,Rt=new AE(Tt,Dt),ne=new kM(v,x,O,_t,tt,f,c),$=new PE(v,tt,Dt),ee=new zE(U,xe,Dt,_t),It=new VM(U,Tt,xe,Dt),Et=new JM(U,Tt,xe,Dt),xe.programs=vt.programs,v.capabilities=Dt,v.extensions=Tt,v.properties=kt,v.renderLists=ht,v.shadowMap=$,v.state=_t,v.info=xe}we();const Gt=new OE(v,U);this.xr=Gt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const M=Tt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Tt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(M){M!==void 0&&(Y=M,this.setSize(F,G,!1))},this.getSize=function(M){return M.set(F,G)},this.setSize=function(M,D,B=!0){if(Gt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=M,G=D,n.width=Math.floor(M*Y),n.height=Math.floor(D*Y),B===!0&&(n.style.width=M+"px",n.style.height=D+"px"),this.setViewport(0,0,M,D)},this.getDrawingBufferSize=function(M){return M.set(F*Y,G*Y).floor()},this.setDrawingBufferSize=function(M,D,B){F=M,G=D,Y=B,n.width=Math.floor(M*B),n.height=Math.floor(D*B),this.setViewport(0,0,M,D)},this.getCurrentViewport=function(M){return M.copy(b)},this.getViewport=function(M){return M.copy(K)},this.setViewport=function(M,D,B,k){M.isVector4?K.set(M.x,M.y,M.z,M.w):K.set(M,D,B,k),_t.viewport(b.copy(K).multiplyScalar(Y).floor())},this.getScissor=function(M){return M.copy(Q)},this.setScissor=function(M,D,B,k){M.isVector4?Q.set(M.x,M.y,M.z,M.w):Q.set(M,D,B,k),_t.scissor(z.copy(Q).multiplyScalar(Y).floor())},this.getScissorTest=function(){return at},this.setScissorTest=function(M){_t.setScissorTest(at=M)},this.setOpaqueSort=function(M){X=M},this.setTransparentSort=function(M){W=M},this.getClearColor=function(M){return M.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor.apply(ne,arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha.apply(ne,arguments)},this.clear=function(M=!0,D=!0,B=!0){let k=0;if(M){let N=!1;if(w!==null){const lt=w.texture.format;N=lt===s_||lt===r_||lt===i_}if(N){const lt=w.texture.type,xt=lt===ur||lt===nr||lt===Ah||lt===Or||lt===e_||lt===n_,wt=ne.getClearColor(),Pt=ne.getClearAlpha(),Vt=wt.r,Ut=wt.g,Ft=wt.b;xt?(p[0]=Vt,p[1]=Ut,p[2]=Ft,p[3]=Pt,U.clearBufferuiv(U.COLOR,0,p)):(g[0]=Vt,g[1]=Ut,g[2]=Ft,g[3]=Pt,U.clearBufferiv(U.COLOR,0,g))}else k|=U.COLOR_BUFFER_BIT}D&&(k|=U.DEPTH_BUFFER_BIT),B&&(k|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",nt,!1),n.removeEventListener("webglcontextrestored",R,!1),n.removeEventListener("webglcontextcreationerror",rt,!1),ht.dispose(),Rt.dispose(),kt.dispose(),x.dispose(),O.dispose(),tt.dispose(),Bt.dispose(),ee.dispose(),vt.dispose(),Gt.dispose(),Gt.removeEventListener("sessionstart",pn),Gt.removeEventListener("sessionend",le),St&&(St.dispose(),St=null),mn.stop()};function nt(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function R(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const M=xe.autoReset,D=$.enabled,B=$.autoUpdate,k=$.needsUpdate,N=$.type;we(),xe.autoReset=M,$.enabled=D,$.autoUpdate=B,$.needsUpdate=k,$.type=N}function rt(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function st(M){const D=M.target;D.removeEventListener("dispose",st),Lt(D)}function Lt(M){At(M),kt.remove(M)}function At(M){const D=kt.get(M).programs;D!==void 0&&(D.forEach(function(B){vt.releaseProgram(B)}),M.isShaderMaterial&&vt.releaseShaderCache(M))}this.renderBufferDirect=function(M,D,B,k,N,lt){D===null&&(D=Ct);const xt=N.isMesh&&N.matrixWorld.determinant()<0,wt=q_(M,D,B,k,N);_t.setMaterial(k,xt);let Pt=B.index,Vt=1;if(k.wireframe===!0){if(Pt=J.getWireframeAttribute(B),Pt===void 0)return;Vt=2}const Ut=B.drawRange,Ft=B.attributes.position;let Pe=Ut.start*Vt,Tn=(Ut.start+Ut.count)*Vt;lt!==null&&(Pe=Math.max(Pe,lt.start*Vt),Tn=Math.min(Tn,(lt.start+lt.count)*Vt)),Pt!==null?(Pe=Math.max(Pe,0),Tn=Math.min(Tn,Pt.count)):Ft!=null&&(Pe=Math.max(Pe,0),Tn=Math.min(Tn,Ft.count));const je=Tn-Pe;if(je<0||je===1/0)return;Bt.setup(N,k,wt,B,Pt);let wi,ye=It;if(Pt!==null&&(wi=Z.get(Pt),ye=Et,ye.setIndex(wi)),N.isMesh)k.wireframe===!0?(_t.setLineWidth(k.wireframeLinewidth*Kt()),ye.setMode(U.LINES)):ye.setMode(U.TRIANGLES);else if(N.isLine){let Wt=k.linewidth;Wt===void 0&&(Wt=1),_t.setLineWidth(Wt*Kt()),N.isLineSegments?ye.setMode(U.LINES):N.isLineLoop?ye.setMode(U.LINE_LOOP):ye.setMode(U.LINE_STRIP)}else N.isPoints?ye.setMode(U.POINTS):N.isSprite&&ye.setMode(U.TRIANGLES);if(N.isBatchedMesh)ye.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else if(N.isInstancedMesh)ye.renderInstances(Pe,je,N.count);else if(B.isInstancedBufferGeometry){const Wt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Nc=Math.min(B.instanceCount,Wt);ye.renderInstances(Pe,je,Nc)}else ye.render(Pe,je)};function ae(M,D,B){M.transparent===!0&&M.side===Fi&&M.forceSinglePass===!1?(M.side=En,M.needsUpdate=!0,Yo(M,D,B),M.side=pr,M.needsUpdate=!0,Yo(M,D,B),M.side=Fi):Yo(M,D,B)}this.compile=function(M,D,B=null){B===null&&(B=M),m=Rt.get(B),m.init(),y.push(m),B.traverseVisible(function(N){N.isLight&&N.layers.test(D.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),M!==B&&M.traverseVisible(function(N){N.isLight&&N.layers.test(D.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),m.setupLights(v._useLegacyLights);const k=new Set;return M.traverse(function(N){const lt=N.material;if(lt)if(Array.isArray(lt))for(let xt=0;xt<lt.length;xt++){const wt=lt[xt];ae(wt,B,N),k.add(wt)}else ae(lt,B,N),k.add(lt)}),y.pop(),m=null,k},this.compileAsync=function(M,D,B=null){const k=this.compile(M,D,B);return new Promise(N=>{function lt(){if(k.forEach(function(xt){kt.get(xt).currentProgram.isReady()&&k.delete(xt)}),k.size===0){N(M);return}setTimeout(lt,10)}Tt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let ce=null;function Ye(M){ce&&ce(M)}function pn(){mn.stop()}function le(){mn.start()}const mn=new S_;mn.setAnimationLoop(Ye),typeof self<"u"&&mn.setContext(self),this.setAnimationLoop=function(M){ce=M,Gt.setAnimationLoop(M),M===null?mn.stop():mn.start()},Gt.addEventListener("sessionstart",pn),Gt.addEventListener("sessionend",le),this.render=function(M,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Gt.enabled===!0&&Gt.isPresenting===!0&&(Gt.cameraAutoUpdate===!0&&Gt.updateCamera(D),D=Gt.getCamera()),M.isScene===!0&&M.onBeforeRender(v,M,D,w),m=Rt.get(M,y.length),m.init(),y.push(m),Mt.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),H.setFromProjectionMatrix(Mt),ct=this.localClippingEnabled,j=Ht.init(this.clippingPlanes,ct),_=ht.get(M,d.length),_.init(),d.push(_),hi(M,D,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(X,W),this.info.render.frame++,j===!0&&Ht.beginShadows();const B=m.state.shadowsArray;if($.render(B,M,D),j===!0&&Ht.endShadows(),this.info.autoReset===!0&&this.info.reset(),ne.render(_,M),m.setupLights(v._useLegacyLights),D.isArrayCamera){const k=D.cameras;for(let N=0,lt=k.length;N<lt;N++){const xt=k[N];Vh(_,M,xt,xt.viewport)}}else Vh(_,M,D);w!==null&&(E.updateMultisampleRenderTarget(w),E.updateRenderTargetMipmap(w)),M.isScene===!0&&M.onAfterRender(v,M,D),Bt.resetDefaultState(),V=-1,S=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,d.pop(),d.length>0?_=d[d.length-1]:_=null};function hi(M,D,B,k){if(M.visible===!1)return;if(M.layers.test(D.layers)){if(M.isGroup)B=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(D);else if(M.isLight)m.pushLight(M),M.castShadow&&m.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||H.intersectsSprite(M)){k&&Ot.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Mt);const xt=tt.update(M),wt=M.material;wt.visible&&_.push(M,xt,wt,B,Ot.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||H.intersectsObject(M))){const xt=tt.update(M),wt=M.material;if(k&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ot.copy(M.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),Ot.copy(xt.boundingSphere.center)),Ot.applyMatrix4(M.matrixWorld).applyMatrix4(Mt)),Array.isArray(wt)){const Pt=xt.groups;for(let Vt=0,Ut=Pt.length;Vt<Ut;Vt++){const Ft=Pt[Vt],Pe=wt[Ft.materialIndex];Pe&&Pe.visible&&_.push(M,xt,Pe,B,Ot.z,Ft)}}else wt.visible&&_.push(M,xt,wt,B,Ot.z,null)}}const lt=M.children;for(let xt=0,wt=lt.length;xt<wt;xt++)hi(lt[xt],D,B,k)}function Vh(M,D,B,k){const N=M.opaque,lt=M.transmissive,xt=M.transparent;m.setupLightsView(B),j===!0&&Ht.setGlobalState(v.clippingPlanes,B),lt.length>0&&X_(N,lt,D,B),k&&_t.viewport(b.copy(k)),N.length>0&&qo(N,D,B),lt.length>0&&qo(lt,D,B),xt.length>0&&qo(xt,D,B),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function X_(M,D,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;const lt=Dt.isWebGL2;St===null&&(St=new Xr(1,1,{generateMipmaps:!0,type:Tt.has("EXT_color_buffer_half_float")?Uo:ur,minFilter:Do,samples:lt?4:0})),v.getDrawingBufferSize(Nt),lt?St.setSize(Nt.x,Nt.y):St.setSize(Ka(Nt.x),Ka(Nt.y));const xt=v.getRenderTarget();v.setRenderTarget(St),v.getClearColor(et),P=v.getClearAlpha(),P<1&&v.setClearColor(16777215,.5),v.clear();const wt=v.toneMapping;v.toneMapping=lr,qo(M,B,k),E.updateMultisampleRenderTarget(St),E.updateRenderTargetMipmap(St);let Pt=!1;for(let Vt=0,Ut=D.length;Vt<Ut;Vt++){const Ft=D[Vt],Pe=Ft.object,Tn=Ft.geometry,je=Ft.material,wi=Ft.group;if(je.side===Fi&&Pe.layers.test(k.layers)){const ye=je.side;je.side=En,je.needsUpdate=!0,Gh(Pe,B,k,Tn,je,wi),je.side=ye,je.needsUpdate=!0,Pt=!0}}Pt===!0&&(E.updateMultisampleRenderTarget(St),E.updateRenderTargetMipmap(St)),v.setRenderTarget(xt),v.setClearColor(et,P),v.toneMapping=wt}function qo(M,D,B){const k=D.isScene===!0?D.overrideMaterial:null;for(let N=0,lt=M.length;N<lt;N++){const xt=M[N],wt=xt.object,Pt=xt.geometry,Vt=k===null?xt.material:k,Ut=xt.group;wt.layers.test(B.layers)&&Gh(wt,D,B,Pt,Vt,Ut)}}function Gh(M,D,B,k,N,lt){M.onBeforeRender(v,D,B,k,N,lt),M.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),N.onBeforeRender(v,D,B,k,M,lt),N.transparent===!0&&N.side===Fi&&N.forceSinglePass===!1?(N.side=En,N.needsUpdate=!0,v.renderBufferDirect(B,D,k,N,M,lt),N.side=pr,N.needsUpdate=!0,v.renderBufferDirect(B,D,k,N,M,lt),N.side=Fi):v.renderBufferDirect(B,D,k,N,M,lt),M.onAfterRender(v,D,B,k,N,lt)}function Yo(M,D,B){D.isScene!==!0&&(D=Ct);const k=kt.get(M),N=m.state.lights,lt=m.state.shadowsArray,xt=N.state.version,wt=vt.getParameters(M,N.state,lt,D,B),Pt=vt.getProgramCacheKey(wt);let Vt=k.programs;k.environment=M.isMeshStandardMaterial?D.environment:null,k.fog=D.fog,k.envMap=(M.isMeshStandardMaterial?O:x).get(M.envMap||k.environment),Vt===void 0&&(M.addEventListener("dispose",st),Vt=new Map,k.programs=Vt);let Ut=Vt.get(Pt);if(Ut!==void 0){if(k.currentProgram===Ut&&k.lightsStateVersion===xt)return Xh(M,wt),Ut}else wt.uniforms=vt.getUniforms(M),M.onBuild(B,wt,v),M.onBeforeCompile(wt,v),Ut=vt.acquireProgram(wt,Pt),Vt.set(Pt,Ut),k.uniforms=wt.uniforms;const Ft=k.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ft.clippingPlanes=Ht.uniform),Xh(M,wt),k.needsLights=j_(M),k.lightsStateVersion=xt,k.needsLights&&(Ft.ambientLightColor.value=N.state.ambient,Ft.lightProbe.value=N.state.probe,Ft.directionalLights.value=N.state.directional,Ft.directionalLightShadows.value=N.state.directionalShadow,Ft.spotLights.value=N.state.spot,Ft.spotLightShadows.value=N.state.spotShadow,Ft.rectAreaLights.value=N.state.rectArea,Ft.ltc_1.value=N.state.rectAreaLTC1,Ft.ltc_2.value=N.state.rectAreaLTC2,Ft.pointLights.value=N.state.point,Ft.pointLightShadows.value=N.state.pointShadow,Ft.hemisphereLights.value=N.state.hemi,Ft.directionalShadowMap.value=N.state.directionalShadowMap,Ft.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ft.spotShadowMap.value=N.state.spotShadowMap,Ft.spotLightMatrix.value=N.state.spotLightMatrix,Ft.spotLightMap.value=N.state.spotLightMap,Ft.pointShadowMap.value=N.state.pointShadowMap,Ft.pointShadowMatrix.value=N.state.pointShadowMatrix),k.currentProgram=Ut,k.uniformsList=null,Ut}function Wh(M){if(M.uniformsList===null){const D=M.currentProgram.getUniforms();M.uniformsList=La.seqWithValue(D.seq,M.uniforms)}return M.uniformsList}function Xh(M,D){const B=kt.get(M);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function q_(M,D,B,k,N){D.isScene!==!0&&(D=Ct),E.resetTextureUnits();const lt=D.fog,xt=k.isMeshStandardMaterial?D.environment:null,wt=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Xi,Pt=(k.isMeshStandardMaterial?O:x).get(k.envMap||xt),Vt=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ut=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Ft=!!B.morphAttributes.position,Pe=!!B.morphAttributes.normal,Tn=!!B.morphAttributes.color;let je=lr;k.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(je=v.toneMapping);const wi=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ye=wi!==void 0?wi.length:0,Wt=kt.get(k),Nc=m.state.lights;if(j===!0&&(ct===!0||M!==S)){const kn=M===S&&k.id===V;Ht.setState(k,M,kn)}let Re=!1;k.version===Wt.__version?(Wt.needsLights&&Wt.lightsStateVersion!==Nc.state.version||Wt.outputColorSpace!==wt||N.isBatchedMesh&&Wt.batching===!1||!N.isBatchedMesh&&Wt.batching===!0||N.isInstancedMesh&&Wt.instancing===!1||!N.isInstancedMesh&&Wt.instancing===!0||N.isSkinnedMesh&&Wt.skinning===!1||!N.isSkinnedMesh&&Wt.skinning===!0||N.isInstancedMesh&&Wt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Wt.instancingColor===!1&&N.instanceColor!==null||Wt.envMap!==Pt||k.fog===!0&&Wt.fog!==lt||Wt.numClippingPlanes!==void 0&&(Wt.numClippingPlanes!==Ht.numPlanes||Wt.numIntersection!==Ht.numIntersection)||Wt.vertexAlphas!==Vt||Wt.vertexTangents!==Ut||Wt.morphTargets!==Ft||Wt.morphNormals!==Pe||Wt.morphColors!==Tn||Wt.toneMapping!==je||Dt.isWebGL2===!0&&Wt.morphTargetsCount!==ye)&&(Re=!0):(Re=!0,Wt.__version=k.version);let gr=Wt.currentProgram;Re===!0&&(gr=Yo(k,D,N));let qh=!1,so=!1,Fc=!1;const sn=gr.getUniforms(),_r=Wt.uniforms;if(_t.useProgram(gr.program)&&(qh=!0,so=!0,Fc=!0),k.id!==V&&(V=k.id,so=!0),qh||S!==M){sn.setValue(U,"projectionMatrix",M.projectionMatrix),sn.setValue(U,"viewMatrix",M.matrixWorldInverse);const kn=sn.map.cameraPosition;kn!==void 0&&kn.setValue(U,Ot.setFromMatrixPosition(M.matrixWorld)),Dt.logarithmicDepthBuffer&&sn.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&sn.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,so=!0,Fc=!0)}if(N.isSkinnedMesh){sn.setOptional(U,N,"bindMatrix"),sn.setOptional(U,N,"bindMatrixInverse");const kn=N.skeleton;kn&&(Dt.floatVertexTextures?(kn.boneTexture===null&&kn.computeBoneTexture(),sn.setValue(U,"boneTexture",kn.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}N.isBatchedMesh&&(sn.setOptional(U,N,"batchingTexture"),sn.setValue(U,"batchingTexture",N._matricesTexture,E));const Oc=B.morphAttributes;if((Oc.position!==void 0||Oc.normal!==void 0||Oc.color!==void 0&&Dt.isWebGL2===!0)&&qt.update(N,B,gr),(so||Wt.receiveShadow!==N.receiveShadow)&&(Wt.receiveShadow=N.receiveShadow,sn.setValue(U,"receiveShadow",N.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(_r.envMap.value=Pt,_r.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),so&&(sn.setValue(U,"toneMappingExposure",v.toneMappingExposure),Wt.needsLights&&Y_(_r,Fc),lt&&k.fog===!0&&ot.refreshFogUniforms(_r,lt),ot.refreshMaterialUniforms(_r,k,Y,G,St),La.upload(U,Wh(Wt),_r,E)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(La.upload(U,Wh(Wt),_r,E),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&sn.setValue(U,"center",N.center),sn.setValue(U,"modelViewMatrix",N.modelViewMatrix),sn.setValue(U,"normalMatrix",N.normalMatrix),sn.setValue(U,"modelMatrix",N.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const kn=k.uniformsGroups;for(let Bc=0,K_=kn.length;Bc<K_;Bc++)if(Dt.isWebGL2){const Yh=kn[Bc];ee.update(Yh,gr),ee.bind(Yh,gr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return gr}function Y_(M,D){M.ambientLightColor.needsUpdate=D,M.lightProbe.needsUpdate=D,M.directionalLights.needsUpdate=D,M.directionalLightShadows.needsUpdate=D,M.pointLights.needsUpdate=D,M.pointLightShadows.needsUpdate=D,M.spotLights.needsUpdate=D,M.spotLightShadows.needsUpdate=D,M.rectAreaLights.needsUpdate=D,M.hemisphereLights.needsUpdate=D}function j_(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(M,D,B){kt.get(M.texture).__webglTexture=D,kt.get(M.depthTexture).__webglTexture=B;const k=kt.get(M);k.__hasExternalTextures=!0,k.__hasExternalTextures&&(k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||Tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(M,D){const B=kt.get(M);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(M,D=0,B=0){w=M,C=D,T=B;let k=!0,N=null,lt=!1,xt=!1;if(M){const Pt=kt.get(M);Pt.__useDefaultFramebuffer!==void 0?(_t.bindFramebuffer(U.FRAMEBUFFER,null),k=!1):Pt.__webglFramebuffer===void 0?E.setupRenderTarget(M):Pt.__hasExternalTextures&&E.rebindTextures(M,kt.get(M.texture).__webglTexture,kt.get(M.depthTexture).__webglTexture);const Vt=M.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(xt=!0);const Ut=kt.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ut[D])?N=Ut[D][B]:N=Ut[D],lt=!0):Dt.isWebGL2&&M.samples>0&&E.useMultisampledRTT(M)===!1?N=kt.get(M).__webglMultisampledFramebuffer:Array.isArray(Ut)?N=Ut[B]:N=Ut,b.copy(M.viewport),z.copy(M.scissor),q=M.scissorTest}else b.copy(K).multiplyScalar(Y).floor(),z.copy(Q).multiplyScalar(Y).floor(),q=at;if(_t.bindFramebuffer(U.FRAMEBUFFER,N)&&Dt.drawBuffers&&k&&_t.drawBuffers(M,N),_t.viewport(b),_t.scissor(z),_t.setScissorTest(q),lt){const Pt=kt.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,Pt.__webglTexture,B)}else if(xt){const Pt=kt.get(M.texture),Vt=D||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pt.__webglTexture,B||0,Vt)}V=-1},this.readRenderTargetPixels=function(M,D,B,k,N,lt,xt){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=kt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&xt!==void 0&&(wt=wt[xt]),wt){_t.bindFramebuffer(U.FRAMEBUFFER,wt);try{const Pt=M.texture,Vt=Pt.format,Ut=Pt.type;if(Vt!==si&&ft.convert(Vt)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ft=Ut===Uo&&(Tt.has("EXT_color_buffer_half_float")||Dt.isWebGL2&&Tt.has("EXT_color_buffer_float"));if(Ut!==ur&&ft.convert(Ut)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ut===ir&&(Dt.isWebGL2||Tt.has("OES_texture_float")||Tt.has("WEBGL_color_buffer_float")))&&!Ft){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=M.width-k&&B>=0&&B<=M.height-N&&U.readPixels(D,B,k,N,ft.convert(Vt),ft.convert(Ut),lt)}finally{const Pt=w!==null?kt.get(w).__webglFramebuffer:null;_t.bindFramebuffer(U.FRAMEBUFFER,Pt)}}},this.copyFramebufferToTexture=function(M,D,B=0){const k=Math.pow(2,-B),N=Math.floor(D.image.width*k),lt=Math.floor(D.image.height*k);E.setTexture2D(D,0),U.copyTexSubImage2D(U.TEXTURE_2D,B,0,0,M.x,M.y,N,lt),_t.unbindTexture()},this.copyTextureToTexture=function(M,D,B,k=0){const N=D.image.width,lt=D.image.height,xt=ft.convert(B.format),wt=ft.convert(B.type);E.setTexture2D(B,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment),D.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,k,M.x,M.y,N,lt,xt,wt,D.image.data):D.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,k,M.x,M.y,D.mipmaps[0].width,D.mipmaps[0].height,xt,D.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,k,M.x,M.y,xt,wt,D.image),k===0&&B.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),_t.unbindTexture()},this.copyTextureToTexture3D=function(M,D,B,k,N=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const lt=M.max.x-M.min.x+1,xt=M.max.y-M.min.y+1,wt=M.max.z-M.min.z+1,Pt=ft.convert(k.format),Vt=ft.convert(k.type);let Ut;if(k.isData3DTexture)E.setTexture3D(k,0),Ut=U.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)E.setTexture2DArray(k,0),Ut=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment);const Ft=U.getParameter(U.UNPACK_ROW_LENGTH),Pe=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Tn=U.getParameter(U.UNPACK_SKIP_PIXELS),je=U.getParameter(U.UNPACK_SKIP_ROWS),wi=U.getParameter(U.UNPACK_SKIP_IMAGES),ye=B.isCompressedTexture?B.mipmaps[N]:B.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,ye.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ye.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,M.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,M.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,M.min.z),B.isDataTexture||B.isData3DTexture?U.texSubImage3D(Ut,N,D.x,D.y,D.z,lt,xt,wt,Pt,Vt,ye.data):B.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Ut,N,D.x,D.y,D.z,lt,xt,wt,Pt,ye.data)):U.texSubImage3D(Ut,N,D.x,D.y,D.z,lt,xt,wt,Pt,Vt,ye),U.pixelStorei(U.UNPACK_ROW_LENGTH,Ft),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Pe),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Tn),U.pixelStorei(U.UNPACK_SKIP_ROWS,je),U.pixelStorei(U.UNPACK_SKIP_IMAGES,wi),N===0&&k.generateMipmaps&&U.generateMipmap(Ut),_t.unbindTexture()},this.initTexture=function(M){M.isCubeTexture?E.setTextureCube(M,0):M.isData3DTexture?E.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?E.setTexture2DArray(M,0):E.setTexture2D(M,0),_t.unbindTexture()},this.resetState=function(){C=0,T=0,w=null,_t.reset(),Bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ki}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=t===wh?"display-p3":"srgb",n.unpackColorSpace=ie.workingColorSpace===wc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===tn?zr:a_}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===zr?tn:Xi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class kE extends L_{}kE.prototype.isWebGL1Renderer=!0;class HE extends rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}}class Pa extends no{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Yp=new L,jp=new L,Kp=new Ue,Nl=new p_,Ma=new Rc;class P_ extends rn{constructor(t=new xn,n=new Pa){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Yp.fromBufferAttribute(n,r-1),jp.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Yp.distanceTo(jp);t.setAttribute("lineDistance",new ve(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ma.copy(i.boundingSphere),Ma.applyMatrix4(r),Ma.radius+=s,t.ray.intersectsSphere(Ma)===!1)return;Kp.copy(r).invert(),Nl.copy(t.ray).applyMatrix4(Kp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new L,u=new L,h=new L,f=new L,p=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){const d=Math.max(0,o.start),y=Math.min(g.count,o.start+o.count);for(let v=d,A=y-1;v<A;v+=p){const C=g.getX(v),T=g.getX(v+1);if(l.fromBufferAttribute(m,C),u.fromBufferAttribute(m,T),Nl.distanceSqToSegment(l,u,f,h)>c)continue;f.applyMatrix4(this.matrixWorld);const V=t.ray.origin.distanceTo(f);V<t.near||V>t.far||n.push({distance:V,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,o.start),y=Math.min(m.count,o.start+o.count);for(let v=d,A=y-1;v<A;v+=p){if(l.fromBufferAttribute(m,v),u.fromBufferAttribute(m,v+1),Nl.distanceSqToSegment(l,u,f,h)>c)continue;f.applyMatrix4(this.matrixWorld);const T=t.ray.origin.distanceTo(f);T<t.near||T>t.far||n.push({distance:T,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const $p=new L,Jp=new L;class Zp extends P_{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)$p.fromBufferAttribute(n,r),Jp.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+$p.distanceTo(Jp);t.setAttribute("lineDistance",new ve(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ai{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,n){const i=this.getUtoTmapping(t);return this.getPoint(i,n)}getPoints(t=5){const n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return n}getSpacedPoints(t=5){const n=[];for(let i=0;i<=t;i++)n.push(this.getPointAt(i/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=t*i[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=i[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,i[r]===o)return r/(s-1);const u=i[r],f=i[r+1]-u,p=(o-u)/f;return(r+p)/(s-1)}getTangent(t,n){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),c=n||(o.isVector2?new dt:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,n){const i=this.getUtoTmapping(t);return this.getTangent(i,n)}computeFrenetFrames(t,n){const i=new L,r=[],s=[],o=[],a=new L,c=new Ue;for(let p=0;p<=t;p++){const g=p/t;r[p]=this.getTangentAt(g,new L)}s[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=l&&(l=u,i.set(1,0,0)),h<=l&&(l=h,i.set(0,1,0)),f<=l&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=t;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ze(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(c.makeRotationAxis(a,g))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(Ze(s[0].dot(s[t]),-1,1));p/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(p=-p);for(let g=1;g<=t;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],p*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Dh extends Ai{constructor(t=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,n){const i=n||new dt,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,p=l-this.aY;c=f*u-p*h+this.aX,l=f*h+p*u+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class VE extends Dh{constructor(t,n,i,r,s,o){super(t,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Uh(){let e=0,t=0,n=0,i=0;function r(s,o,a,c){e=s,t=a,n=-3*s+3*o-2*a-c,i=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,h){let f=(o-s)/l-(a-s)/(l+u)+(a-o)/u,p=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,p*=u,r(o,a,f,p)},calc:function(s){const o=s*s,a=o*s;return e+t*s+n*o+i*a}}}const Sa=new L,Fl=new Uh,Ol=new Uh,Bl=new Uh;class GE extends Ai{constructor(t=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=i,this.tension=r}getPoint(t,n=new L){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%s]:(Sa.subVectors(r[0],r[1]).add(r[0]),l=Sa);const h=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(Sa.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Sa),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),p),_=Math.pow(h.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(u),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Fl.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,_,m),Ol.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,_,m),Bl.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Fl.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),Ol.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),Bl.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return i.set(Fl.calc(c),Ol.calc(c),Bl.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){const r=t.points[n];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){const r=t.points[n];this.points.push(new L().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Qp(e,t,n,i,r){const s=(i-t)*.5,o=(r-n)*.5,a=e*e,c=e*a;return(2*n-2*i+s+o)*c+(-3*n+3*i-2*s-o)*a+s*e+n}function WE(e,t){const n=1-e;return n*n*t}function XE(e,t){return 2*(1-e)*e*t}function qE(e,t){return e*e*t}function Eo(e,t,n,i){return WE(e,t)+XE(e,n)+qE(e,i)}function YE(e,t){const n=1-e;return n*n*n*t}function jE(e,t){const n=1-e;return 3*n*n*e*t}function KE(e,t){return 3*(1-e)*e*e*t}function $E(e,t){return e*e*e*t}function bo(e,t,n,i,r){return YE(e,t)+jE(e,n)+KE(e,i)+$E(e,r)}class I_ extends Ai{constructor(t=new dt,n=new dt,i=new dt,r=new dt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=i,this.v3=r}getPoint(t,n=new dt){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(bo(t,r.x,s.x,o.x,a.x),bo(t,r.y,s.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class JE extends Ai{constructor(t=new L,n=new L,i=new L,r=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=i,this.v3=r}getPoint(t,n=new L){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(bo(t,r.x,s.x,o.x,a.x),bo(t,r.y,s.y,o.y,a.y),bo(t,r.z,s.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class D_ extends Ai{constructor(t=new dt,n=new dt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new dt){const i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new dt){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ZE extends Ai{constructor(t=new L,n=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new L){const i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new L){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class U_ extends Ai{constructor(t=new dt,n=new dt,i=new dt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new dt){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Eo(t,r.x,s.x,o.x),Eo(t,r.y,s.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class QE extends Ai{constructor(t=new L,n=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new L){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Eo(t,r.x,s.x,o.x),Eo(t,r.y,s.y,o.y),Eo(t,r.z,s.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class N_ extends Ai{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new dt){const i=n,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return i.set(Qp(a,c.x,l.x,u.x,h.x),Qp(a,c.y,l.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){const r=t.points[n];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){const r=t.points[n];this.points.push(new dt().fromArray(r))}return this}}var tm=Object.freeze({__proto__:null,ArcCurve:VE,CatmullRomCurve3:GE,CubicBezierCurve:I_,CubicBezierCurve3:JE,EllipseCurve:Dh,LineCurve:D_,LineCurve3:ZE,QuadraticBezierCurve:U_,QuadraticBezierCurve3:QE,SplineCurve:N_});class tb extends Ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new tm[i](n,t))}return this}getPoint(t,n){const i=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,n)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){const n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];i&&i.equals(u)||(n.push(u),i=u)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){const r=t.curves[n];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){const r=t.curves[n];this.curves.push(new tm[r.type]().fromJSON(r))}return this}}class eb extends tb{constructor(t){super(),this.type="Path",this.currentPoint=new dt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,i=t.length;n<i;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){const i=new D_(this.currentPoint.clone(),new dt(t,n));return this.curves.push(i),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,i,r){const s=new U_(this.currentPoint.clone(),new dt(t,n),new dt(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(t,n,i,r,s,o){const a=new I_(this.currentPoint.clone(),new dt(t,n),new dt(i,r),new dt(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const n=[this.currentPoint.clone()].concat(t),i=new N_(n);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,i,r,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,n+c,i,r,s,o),this}absarc(t,n,i,r,s,o){return this.absellipse(t,n,i,i,r,s,o),this}ellipse(t,n,i,r,s,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,n+u,i,r,s,o,a,c),this}absellipse(t,n,i,r,s,o,a,c){const l=new Dh(t,n,i,r,s,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Nh extends xn{constructor(t=[new dt(0,-.5),new dt(.5,0),new dt(0,.5)],n=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:n,phiStart:i,phiLength:r},n=Math.floor(n),r=Ze(r,0,Math.PI*2);const s=[],o=[],a=[],c=[],l=[],u=1/n,h=new L,f=new dt,p=new L,g=new L,_=new L;let m=0,d=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:m=t[y+1].x-t[y].x,d=t[y+1].y-t[y].y,p.x=d*1,p.y=-m,p.z=d*0,_.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:m=t[y+1].x-t[y].x,d=t[y+1].y-t[y].y,p.x=d*1,p.y=-m,p.z=d*0,g.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),c.push(p.x,p.y,p.z),_.copy(g)}for(let y=0;y<=n;y++){const v=i+y*u*r,A=Math.sin(v),C=Math.cos(v);for(let T=0;T<=t.length-1;T++){h.x=t[T].x*A,h.y=t[T].y,h.z=t[T].x*C,o.push(h.x,h.y,h.z),f.x=y/n,f.y=T/(t.length-1),a.push(f.x,f.y);const w=c[3*T+0]*A,V=c[3*T+1],S=c[3*T+0]*C;l.push(w,V,S)}}for(let y=0;y<n;y++)for(let v=0;v<t.length-1;v++){const A=v+y*t.length,C=A,T=A+t.length,w=A+t.length+1,V=A+1;s.push(C,T,V),s.push(w,V,T)}this.setIndex(s),this.setAttribute("position",new ve(o,3)),this.setAttribute("uv",new ve(a,2)),this.setAttribute("normal",new ve(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nh(t.points,t.segments,t.phiStart,t.phiLength)}}class Fh extends Nh{constructor(t=1,n=1,i=4,r=8){const s=new eb;s.absarc(0,-n/2,t,Math.PI*1.5,0),s.absarc(0,n/2,t,0,Math.PI*.5),super(s.getPoints(i),r),this.type="CapsuleGeometry",this.parameters={radius:t,length:n,capSegments:i,radialSegments:r}}static fromJSON(t){return new Fh(t.radius,t.length,t.capSegments,t.radialSegments)}}class Oh extends xn{constructor(t=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);const s=[],o=[],a=[],c=[],l=new L,u=new dt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=n;h++,f+=3){const p=i+h/n*r;l.x=t*Math.cos(p),l.y=t*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/t+1)/2,u.y=(o[f+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=n;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new ve(o,3)),this.setAttribute("normal",new ve(a,3)),this.setAttribute("uv",new ve(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oh(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class tr extends xn{constructor(t=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new L,f=new L,p=[],g=[],_=[],m=[];for(let d=0;d<=i;d++){const y=[],v=d/i;let A=0;d===0&&o===0?A=.5/n:d===i&&c===Math.PI&&(A=-.5/n);for(let C=0;C<=n;C++){const T=C/n;h.x=-t*Math.cos(r+T*s)*Math.sin(o+v*a),h.y=t*Math.cos(o+v*a),h.z=t*Math.sin(r+T*s)*Math.sin(o+v*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(T+A,1-v),y.push(l++)}u.push(y)}for(let d=0;d<i;d++)for(let y=0;y<n;y++){const v=u[d][y+1],A=u[d][y],C=u[d+1][y],T=u[d+1][y+1];(d!==0||o>0)&&p.push(v,A,T),(d!==i-1||c<Math.PI)&&p.push(A,C,T)}this.setIndex(p),this.setAttribute("position",new ve(g,3)),this.setAttribute("normal",new ve(_,3)),this.setAttribute("uv",new ve(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Bh extends xn{constructor(t=1,n=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],c=[],l=[],u=new L,h=new L,f=new L;for(let p=0;p<=i;p++)for(let g=0;g<=r;g++){const _=g/r*s,m=p/i*Math.PI*2;h.x=(t+n*Math.cos(m))*Math.cos(_),h.y=(t+n*Math.cos(m))*Math.sin(_),h.z=n*Math.sin(m),a.push(h.x,h.y,h.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/r),l.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=r;g++){const _=(r+1)*p+g-1,m=(r+1)*(p-1)+g-1,d=(r+1)*(p-1)+g,y=(r+1)*p+g;o.push(_,m,y),o.push(m,d,y)}this.setIndex(o),this.setAttribute("position",new ve(a,3)),this.setAttribute("normal",new ve(c,3)),this.setAttribute("uv",new ve(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bh(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class mi extends no{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new $t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=c_,this.normalScale=new dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class F_ extends rn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new $t(t),this.intensity=n}dispose(){}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}const zl=new Ue,em=new L,nm=new L;class nb{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new dt(512,512),this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Lh,this._frameExtents=new dt(1,1),this._viewportCount=1,this._viewports=[new Qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera,i=this.matrix;em.setFromMatrixPosition(t.matrixWorld),n.position.copy(em),nm.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(nm),n.updateMatrixWorld(),zl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(zl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class ib extends nb{constructor(){super(new E_(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class im extends F_{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.target=new rn,this.shadow=new ib}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class rb extends F_{constructor(t,n){super(t,n),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Th}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Th);let rr=null,Ui=null,hr=null,ni=null,Se=null,Mn=null,kr=null,Hr=null;const Ja={left:null,right:null},zh={left:[],right:[]},kh=new Map;function sb(){if(!mo||rr)return;Ui=new HE,Ui.background=new $t(725272),hr=new qn(32,1,.01,100),hr.position.set(0,.1,2.25),hr.lookAt(0,.15,0),rr=new L_({antialias:!1,alpha:!1,powerPreference:"low-power"}),rr.setPixelRatio(Math.min(window.devicePixelRatio||1,mm)),mo.appendChild(rr.domElement);const e=new rb(16777215,.82);Ui.add(e);const t=new im(12441855,1.15);t.position.set(1.2,2,2.2),Ui.add(t);const n=new im(8042751,.35);n.position.set(-1.4,.5,1),Ui.add(n),ni=new Cr,Ui.add(ni);const i=new Ie(new Oh(.9,48),new Ch({color:988962,transparent:!0,opacity:.65}));i.rotation.x=-Math.PI/2,i.position.y=-.95,Ui.add(i);const r=new xn;r.setAttribute("position",new ve(new Float32Array(gm.length*2*3),3)),kr=new Zp(r,new Pa({color:11457535,transparent:!0,opacity:.95})),ni.add(kr);const s=new xn;s.setAttribute("position",new ve(new Float32Array(2*3),3)),Hr=new P_(s,new Pa({color:13625087,transparent:!0,opacity:.95})),ni.add(Hr);const o=new tr(.03,16,16),a=new mi({color:15069951,roughness:.55,metalness:.08}),c=new mi({color:10275327,roughness:.7,metalness:.04});for(const z of vm){const q=new Ie(o,[11,12,23,24].includes(z)?a:c);q.visible=!1,ni.add(q),kh.set(z,q)}const l=(z,q)=>{const et=new xn;et.setAttribute("position",new ve(new Float32Array(_m.length*2*3),3));const P=new Zp(et,new Pa({color:q,transparent:!0,opacity:.95}));P.visible=!1,ni.add(P),Ja[z]=P;const F=[],G=new tr(.012,10,10),Y=new mi({color:q,roughness:.5,metalness:.04});for(let X=0;X<21;X+=1){const W=new Ie(G,Y);W.visible=!1,ni.add(W),F.push(W)}zh[z]=F};l("left",8253613),l("right",9356799),Se=new Cr,Se.rotation.order="YXZ";const u=new Ie(new tr(.15,24,24),new mi({color:14478591,roughness:.45,metalness:.06}));u.scale.set(.95,1.12,.92),Se.add(u);const h=new tr(.012,12,12),f=new mi({color:1185830,roughness:.4,metalness:.1}),p=new Ie(h,f),g=new Ie(h,f);p.position.set(-.045,.018,.12),g.position.set(.045,.018,.12),Se.add(p),Se.add(g);const _=new io(.07,.008,.012),m=new mi({color:7176096,roughness:.6,metalness:.03}),d=new Ie(_,m),y=new Ie(_,m);d.position.set(-.048,.066,.11),y.position.set(.048,.066,.11),d.rotation.z=-.12,y.rotation.z=.12,Se.add(d),Se.add(y);const v=new Ie(new Fh(.012,.06,4,8),new mi({color:13162734,roughness:.52,metalness:.04}));v.position.set(0,-.005,.128),v.rotation.z=Math.PI/2,Se.add(v);const A=new tr(.008,8,8),C=new mi({color:9347779,roughness:.5,metalness:.03}),T=new Ie(A,C),w=new Ie(A,C);T.position.set(-.016,-.03,.125),w.position.set(.016,-.03,.125),Se.add(T),Se.add(w);const V=new Cr;V.position.set(0,-.03,.02);const S=new Ie(new tr(.108,20,20),new mi({color:14215162,roughness:.5,metalness:.04}));S.scale.set(.82,.56,.74),S.position.set(0,-.068,.058),V.add(S);const b=new Ie(new Bh(.028,.004,8,24,Math.PI),new mi({color:8164019,roughness:.6,metalness:.02}));b.rotation.x=Math.PI,b.position.set(0,-.025,.108),V.add(b),Se.add(V),Mn={head:u,leftEye:p,rightEye:g,leftBrow:d,rightBrow:y,noseBridge:v,leftNostril:T,rightNostril:w,jawGroup:V,jaw:S,mouth:b},ni.add(Se),Pc(),Ic()}function Pc(){if(!rr||!mo||!hr)return;const e=Math.max(1,mo.clientWidth),t=Math.max(1,mo.clientHeight);rr.setSize(e,t,!1),hr.aspect=e/t,hr.updateProjectionMatrix(),Ic()}function Ic(){!rr||!Ui||!hr||rr.render(Ui,hr)}function Oi(e){return e&&Number.isFinite(e.x)&&Number.isFinite(e.y)&&Number.isFinite(e.z)}function rm(e){const t=new L;for(const n of e)t.add(n);return t.multiplyScalar(1/e.length)}function ob(e,t){const n=e.x-t.x,i=e.y-t.y,r=e.z-t.z;return Math.sqrt(n*n+i*i+r*r)}function ab(e){var t;return((t=e==null?void 0:e.worldLandmarks)==null?void 0:t[0])??null}function cb(e){var t;return((t=e==null?void 0:e.landmarks)==null?void 0:t[0])??null}function lb(e){return(e==null?void 0:e.worldLandmarks)??[]}function ub(e){return(e==null?void 0:e.handedness)??[]}function sm(e,t,n){const i=e==null?void 0:e[t];if(i&&(i.visibility??1)>.25)return i;const r=e==null?void 0:e[n];return r&&(r.visibility??1)>.25?r:null}function hb(e){if(!e||!e[11]||!e[12]||!e[23]||!e[24]||!Oi(e[11])||!Oi(e[12])||!Oi(e[23])||!Oi(e[24]))return null;const t={x:(e[23].x+e[24].x)/2,y:(e[23].y+e[24].y)/2,z:(e[23].z+e[24].z)/2},n=e[11].x-e[12].x,i=e[11].y-e[12].y,r=e[11].z-e[12].z,s=Math.sqrt(n*n+i*i+r*r),o=Math.max(s,.08),a=.42;return e.map(c=>Oi(c)?new L((c.x-t.x)/o*a,-((c.y-t.y)/o)*a-.58,-((c.z-t.z)/o)*a):null)}function fb(e,t){if(!Array.isArray(e)||e.length<21||!t)return null;const n=e[0],i=e[5],r=e[17];if(!Oi(n)||!Oi(i)||!Oi(r))return null;const s=Math.max(ob(i,r),.025),o=.18;return e.map(a=>Oi(a)?new L(t.x+(a.x-n.x)/s*o,t.y-(a.y-n.y)/s*o,t.z-(a.z-n.z)/s*o):null)}function db(e,t){var u,h,f,p,g,_;const n=(e==null?void 0:e.landmarks)??[],i=ub(e),r=cb(t),s=new Array(n.length).fill(null),o=r?{left:sm(r,15,11),right:sm(r,16,12)}:{left:null,right:null},a=[];for(let m=0;m<n.length;m+=1){const d=(u=n[m])==null?void 0:u[0];if(d)for(const y of["left","right"]){const v=o[y];v&&a.push({handIndex:m,side:y,distance:Math.hypot((d.x-v.x)*1.6,d.y-v.y)})}}a.sort((m,d)=>m.distance-d.distance);const c=new Set,l=new Set;for(const m of a)c.has(m.handIndex)||l.has(m.side)||(s[m.handIndex]=m.side,c.add(m.handIndex),l.add(m.side));for(let m=0;m<n.length;m+=1){if(s[m])continue;const d=((g=(p=(f=(h=i==null?void 0:i[m])==null?void 0:h[0])==null?void 0:f.categoryName)==null?void 0:p.toLowerCase)==null?void 0:g.call(p))??"";if(d==="left"){s[m]="right";continue}if(d==="right"){s[m]="left";continue}const y=(_=n[m])==null?void 0:_[0];s[m]=y&&y.x>.5?"left":"right"}return s}function Za(e){Ja[e]&&(Ja[e].visible=!1),zh[e].forEach(t=>{t.visible=!1})}function pb(){kr&&(kr.visible=!1),Hr&&(Hr.visible=!1),kh.forEach(e=>{e.visible=!1}),Za("left"),Za("right")}function O_(){return Se!=null&&Se.visible?Se.position.clone():new L(0,.18,0)}function B_(e,t,n){if(!Se||(Se.visible=!0,Se.position.copy(n??O_()),e?Se.rotation.set(hl.degToRad(-e.pitch),hl.degToRad(e.yaw),hl.degToRad(e.roll)):Se.rotation.set(0,0,0),!Mn))return;const i=(t==null?void 0:t.eyeOpen)??1,r=(t==null?void 0:t.browRaise)??0,s=(t==null?void 0:t.browFurrow)??0,o=(t==null?void 0:t.jawOpen)??0,a=(t==null?void 0:t.smile)??0,c=(t==null?void 0:t.lipStretch)??0,l=(t==null?void 0:t.noseFlare)??0;Mn.leftEye.scale.y=.25+i*.95,Mn.rightEye.scale.y=.25+i*.95,Mn.leftBrow.position.y=.066+r*.035,Mn.rightBrow.position.y=.066+r*.035,Mn.leftBrow.position.x=-.048+s*.01,Mn.rightBrow.position.x=.048-s*.01,Mn.leftNostril.position.x=-.016-l*.014,Mn.rightNostril.position.x=.016+l*.014,Mn.jawGroup.rotation.x=o*.55,Mn.mouth.scale.x=1+a*.55+c*.25,Mn.mouth.scale.y=1+o*1.25,Mn.mouth.position.y=-.025-o*.02}function om(e,t){const n=!!(e||t);ni.visible=n,pb(),n?B_(e,t,O_()):Se&&(Se.visible=!1),Ic()}function mb(e,t,n){const i=Ja[e],r=zh[e];if(!i||!r)return;const s=fb(t,n);if(!s){i.visible=!1,r.forEach(c=>{c.visible=!1});return}const o=i.geometry.attributes.position.array;let a=0;for(const[c,l]of _m){const u=s[c],h=s[l];if(u&&h)o[a++]=u.x,o[a++]=u.y,o[a++]=u.z,o[a++]=h.x,o[a++]=h.y,o[a++]=h.z;else{const f=u||h||n;o[a++]=f.x,o[a++]=f.y,o[a++]=f.z,o[a++]=f.x,o[a++]=f.y,o[a++]=f.z}}i.geometry.attributes.position.needsUpdate=!0,i.visible=!0;for(let c=0;c<r.length;c+=1){const l=r[c],u=s[c];l.visible=!!u,u&&l.position.copy(u)}}function To(e,t,n,i){if(!ni)return;const r=ab(t),s=hb(r);if(!r||!s){om(e,i);return}ni.visible=!0,kr.visible=!0,Hr.visible=!0;const o=kr.geometry.attributes.position.array;let a=0;for(const[A,C]of gm){const T=r[A],w=r[C],V=s[A],S=s[C],b=((T==null?void 0:T.visibility)??1)>.35&&V,z=((w==null?void 0:w.visibility)??1)>.35&&S;if(b&&z)o[a++]=V.x,o[a++]=V.y,o[a++]=V.z,o[a++]=S.x,o[a++]=S.y,o[a++]=S.z;else{const q=b?V:z?S:new L(0,-.58,0);o[a++]=q.x,o[a++]=q.y,o[a++]=q.z,o[a++]=q.x,o[a++]=q.y,o[a++]=q.z}}kr.geometry.attributes.position.needsUpdate=!0;for(const A of vm){const C=kh.get(A);if(!C)continue;const T=r[A],w=s[A];C.visible=!!w&&((T==null?void 0:T.visibility)??1)>.35,C.visible&&C.position.copy(w)}const c=s[11],l=s[12],u=s[23],h=s[24];if(!(c&&l&&u&&h)){om(e,i);return}const f=rm([c,l]),g=(s[7]&&s[8]?rm([s[7],s[8]]):s[0]?s[0].clone():f.clone().add(new L(0,-.28,0))).clone();g.y+=.06,B_(e,i,g);const _=Hr.geometry.attributes.position.array;_[0]=f.x,_[1]=f.y,_[2]=f.z,_[3]=g.x,_[4]=g.y-.11,_[5]=g.z,Hr.geometry.attributes.position.needsUpdate=!0;let m=!1,d=!1;const y=lb(n),v=db(n,t);for(let A=0;A<y.length;A+=1){const C=y[A],T=v[A];if(!T)continue;const w=T==="left"?s[15]??s[13]??s[11]:s[16]??s[14]??s[12];mb(T,C,w),T==="left"&&(m=!0),T==="right"&&(d=!0)}m||Za("left"),d||Za("right"),Ic()}const Ce={mediaStream:null,animationFrameId:null,lastVideoTime:-1,desiredInferenceIntervalMs:66,worker:null},I={videoFrameCallbackId:null,prevPose:null,prevSpeed:0,prevTime:null,totalMovement:0,movingTimeMs:0,stillTimeMs:0,maxHeadSpeed:0,history:new jo(512),leftYawMotion:0,rightYawMotion:0,isMoving:!1,boutStartTime:null,boutDurationsMs:new jo(500),boutAxisMotion:{yaw:0,pitch:0,roll:0},boutRollNet:0,boutPeakSpeed:0,currentAction:"Still",eventCounts:{nodding:0,shaking:0,tiltLeft:0,tiltRight:0,headbanging:0},blinkCount:0,blinkClosed:!1,sessionStartTime:null,fpsHistory:new jo(128),lastRuntimeError:"",lastRuntimeErrorTime:-1/0,lastHandLabelTime:-1/0,cachedFaceResult:null,cachedHandResult:null,cachedPoseResult:null,lastInferenceTimestamp:-1/0,loggedFirstFrame:!1,jawHistory:new jo(128),talkingState:!1,yawningState:!1,yawnThresholdStartTime:null,modelsReady:!1,currentResultSeq:0,lastRenderedResultSeq:0};function Dc(e){const t=performance.now();(e!==I.lastRuntimeError||t-I.lastRuntimeErrorTime>2e3)&&(ge(e,"error"),I.lastRuntimeError=e,I.lastRuntimeErrorTime=t)}function gb(e=performance.now()){for(I.fpsHistory.push(e);I.fpsHistory.length>0&&e-I.fpsHistory.first()>1500;)I.fpsHistory.shift();if(I.fpsHistory.length>=2){const t=I.fpsHistory.last()-I.fpsHistory.first();if(t>0){const n=(I.fpsHistory.length-1)*1e3/t;wo.textContent=String(Math.round(n));return}}wo.textContent="0"}function Uc(){Wm(!1),$g(),p1(),bu.textContent="Still",Yg(null),jg(null),ql(null);for(const e of Object.keys(Xl))_s(e,0);Gm(null),Tu.textContent="–",Au.textContent="–"}function _b(e,t,n,i,r=!0){var f;_1(i);const s=(f=e==null?void 0:e.faceLandmarks)==null?void 0:f[0],o=!!s;if(Wm(o),o?_v(e):yv(),y1(vv(),o),!o){Uc(),Tc(),ql(null),I.sessionStartTime!=null&&(Aa.textContent=Vc(i-I.sessionStartTime)),To(null,t,n,null);return}dv(s,t);const a=uv(s);a&&Sn.referenceFaceWidthPx==null&&(Sn.referenceFaceWidthPx=a.faceWidth),Yg(a),jg(a);const c=u1(e),l=h1(c);x1(l),Gm(f1(c)),r&&wb(c,i),Ab(l);const u=Sb(e),h=Mv(s,u);if(ql(h),!u){I.sessionStartTime!=null&&(Aa.textContent=Vc(i-I.sessionStartTime)),To(null,t,n,l);return}if(v1(u),To(u,t,n,l),I.sessionStartTime!=null&&(Aa.textContent=Vc(i-I.sessionStartTime)),r){if(I.prevPose&&I.prevTime!=null){const p=Math.max((i-I.prevTime)/1e3,.008333333333333333),g=i-I.prevTime,_=u.yaw-I.prevPose.yaw,m=u.pitch-I.prevPose.pitch,d=u.roll-I.prevPose.roll,y={yaw:_/p,pitch:m/p,roll:d/p},v=Math.hypot(y.yaw,y.pitch,y.roll),A=Math.abs(v-I.prevSpeed)/p;I.totalMovement+=Math.hypot(_,m,d),I.history.push({t:i,pose:{...u},speed:v,pitchSignal:u.pitch,yawSignal:u.yaw,rollSignal:u.roll}),am(i),xv()||Tb(u,y,v,A,g,i),I.prevSpeed=v}else I.history.push({t:i,pose:{...u},speed:0,pitchSignal:u.pitch,yawSignal:u.yaw,rollSignal:u.roll}),am(i);I.prevPose={...u},I.prevTime=i}}function Eu(){I.lastHandLabelTime=-1/0,I.cachedFaceResult=null,I.cachedHandResult=null,I.cachedPoseResult=null,I.loggedFirstFrame=!1,I.currentResultSeq=0,I.lastRenderedResultSeq=0,Ce.worker&&Ce.worker.postMessage({type:"reset"})}function vb({onReady:e,onError:t}){const n=new Worker(new URL(""+new URL("inference-worker-CNhGXX3l.js",import.meta.url).href,import.meta.url),{type:"module"});Ce.worker=n,n.onmessage=i=>{const r=i.data;r.type==="ready"?(I.modelsReady=!0,e()):r.type==="error"?t(r.message):r.type==="inferenceError"?Dc(`Inference error: ${r.message}`):r.type==="result"&&(I.cachedFaceResult=r.face,r.hand!==null&&(I.cachedHandResult=r.hand),r.pose!==null&&(I.cachedPoseResult=r.pose),I.currentResultSeq++,gb(r.timestamp))},n.onerror=i=>{t(i.message||"Worker error")},n.postMessage({type:"init"})}function xb(e){I.loggedFirstFrame||(ge("Processing live camera frames."),I.loggedFirstFrame=!0),createImageBitmap(fe).then(t=>{Ce.worker.postMessage({type:"frame",bitmap:t,timestamp:e},[t])}).catch(t=>{Dc(`Bitmap capture error: ${(t==null?void 0:t.message)||String(t)}`)})}function z_(e){if(!Ce.mediaStream||(Ce.animationFrameId=requestAnimationFrame(z_),fe.readyState<2))return;Kg();const t=I.currentResultSeq!==I.lastRenderedResultSeq;if(_b(I.cachedFaceResult,I.cachedPoseResult,I.cachedHandResult,e,t),t&&(I.lastRenderedResultSeq=I.currentResultSeq),e-I.lastInferenceTimestamp<Ce.desiredInferenceIntervalMs)return;const n=fe.currentTime;n!==Ce.lastVideoTime&&(I.lastInferenceTimestamp=e,Ce.lastVideoTime=n,xb(e))}function Hh(){cancelAnimationFrame(Ce.animationFrameId),Ce.animationFrameId=null}function k_(){Hh(),I.lastInferenceTimestamp=-1/0,Ce.animationFrameId=requestAnimationFrame(z_)}function H_(){Hh(),Ce.lastVideoTime=-1,Ce.mediaStream&&(Ce.mediaStream.getTracks().forEach(e=>e.stop()),Ce.mediaStream=null),fe.pause(),fe.srcObject=null}const ue={neutralRotation:null,calibrating:!1,calibBuffer:[],calibMode:null,_calibPrevRot:null};function yb(e,t){let n=0;for(let i=0;i<3;i++)for(let r=0;r<3;r++){const s=e[i][r]-t[i][r];n+=s*s}return n}function Mb(e){const t=[[0,0,0],[0,0,0],[0,0,0]];for(const i of e)for(let r=0;r<3;r++)for(let s=0;s<3;s++)t[r][s]+=i[r][s];const n=e.length;for(let i=0;i<3;i++)for(let r=0;r<3;r++)t[i][r]/=n;return t}function V_(e){ue.calibrating=!0,ue.calibBuffer=[],ue.calibMode=e,ue._calibPrevRot=null,go.textContent=`Collecting… (0/${Hl})`}function Sb(e){var i;const t=iv((i=e==null?void 0:e.facialTransformationMatrixes)==null?void 0:i[0]);if(!t)return null;if(!ue.neutralRotation&&!ue.calibrating&&V_("auto"),ue.calibrating){const r=ue._calibPrevRot;if(ue._calibPrevRot=t,r&&yb(t,r)<=r1&&(ue.calibBuffer.push(t),go.textContent=`Collecting… (${ue.calibBuffer.length}/${Hl})`,ue.calibBuffer.length>=Hl&&(ue.neutralRotation=Mb(ue.calibBuffer),ue.calibrating=!1,ue.calibBuffer=[],ue._calibPrevRot=null,ue.calibMode==="manual"?(go.textContent="Manually set (averaged)",ge("Neutral pose captured (averaged over 30 stable frames)."),en("Neutral pose stored.","ok")):go.textContent="Auto-set (averaged)",ue.calibMode=null)),!ue.neutralRotation)return null}const n=sv(t,rv(ue.neutralRotation));return ov(n)}function Eb(e=fm){const t=performance.now();return I.history.toArray().filter(n=>t-n.t<=e)}function am(e,t=fm){for(;I.history.length>0&&e-I.history.first().t>t;)I.history.shift()}function Ea(e,t,n,i){if(e.length<5)return 0;const r=e.map(l=>l[t]),s=ln(r),o=r.map(l=>Math.abs(l-s)),a=[];for(let l=1;l<o.length-1;l+=1)if(o[l]>n&&o[l]>o[l-1]&&o[l]>=o[l+1]){const u=e[l].t;(!a.length||u-a[a.length-1]>=i)&&a.push(u)}if(a.length<2)return 0;const c=(a[a.length-1]-a[0])/1e3;return c>0?(a.length-1)/c:0}function bb(e,t,n){const i=Math.abs(t.yaw),r=Math.abs(t.pitch),s=Math.abs(t.roll);return n<dm?"Still":r>=i&&r>=s?n>=pm&&Math.abs(e.pitch)>8?"Headbanging":"Nodding":i>=r&&i>=s?"Shaking":"Tilting"}function G_(e){if(!I.isMoving||I.boutStartTime==null)return;const t=e-I.boutStartTime;I.boutDurationsMs.push(t);const{yaw:n,pitch:i,roll:r}=I.boutAxisMotion;let s;i>=n&&i>=r?s=I.boutPeakSpeed>=pm?"headbanging":"nodding":n>=i&&n>=r?s="shaking":s=I.boutRollNet>=0?"tiltRight":"tiltLeft",I.eventCounts[s]+=1,I.isMoving=!1,I.boutStartTime=null,I.boutAxisMotion={yaw:0,pitch:0,roll:0},I.boutRollNet=0,I.boutPeakSpeed=0}function Tb(e,t,n,i,r,s){if(I.maxHeadSpeed=Math.max(I.maxHeadSpeed,n),I.currentAction=bb(e,t,n),n>=dm?(I.movingTimeMs+=r,I.isMoving||(I.isMoving=!0,I.boutStartTime=s,I.boutAxisMotion={yaw:0,pitch:0,roll:0},I.boutRollNet=0,I.boutPeakSpeed=n),I.boutAxisMotion.yaw+=Math.abs(t.yaw)*(r/1e3),I.boutAxisMotion.pitch+=Math.abs(t.pitch)*(r/1e3),I.boutAxisMotion.roll+=Math.abs(t.roll)*(r/1e3),I.boutRollNet+=t.roll*(r/1e3),I.boutPeakSpeed=Math.max(I.boutPeakSpeed,n)):(I.stillTimeMs+=r,I.isMoving&&G_(s)),t.yaw>=0?I.rightYawMotion+=t.yaw*(r/1e3):I.leftYawMotion+=Math.abs(t.yaw)*(r/1e3),As()){Um.textContent=`${I.maxHeadSpeed.toFixed(1)} °/s`,bu.textContent=I.currentAction,Lm.textContent=`${(I.movingTimeMs/1e3).toFixed(1)} s`,Pm.textContent=`${(I.stillTimeMs/1e3).toFixed(1)} s`,Im.textContent=`${I.boutDurationsMs.length+(I.isMoving?1:0)}`,Dm.textContent=`${(ln(I.boutDurationsMs.toArray())/1e3||0).toFixed(1)} s`,Nm.textContent=`${I.totalMovement.toFixed(1)} °`;const a=Math.max(I.leftYawMotion,I.rightYawMotion);Fm.textContent=a>0?`${(100*Math.min(I.leftYawMotion,I.rightYawMotion)/a).toFixed(0)}%`:"–",Om.textContent=String(I.eventCounts.nodding),Bm.textContent=String(I.eventCounts.shaking),zm.textContent=String(I.eventCounts.tiltLeft),km.textContent=String(I.eventCounts.tiltRight),Hm.textContent=String(I.eventCounts.headbanging);const c=Eb(Z_);Am.textContent=`${Ea(c,"pitchSignal",3.5,220).toFixed(2)} Hz`,wm.textContent=`${Ea(c,"yawSignal",3.5,220).toFixed(2)} Hz`,Rm.textContent=`${Ea(c,"rollSignal",2,220).toFixed(2)} Hz`,Cm.textContent=`${Ea(c,"pitchSignal",7,150).toFixed(2)} Hz`}}function Ab(e){e&&(!I.blinkClosed&&e.blink>=.62?(I.blinkClosed=!0,I.blinkCount+=1):I.blinkClosed&&e.blink<=.28&&(I.blinkClosed=!1),As()&&(Vm.textContent=String(I.blinkCount)))}function wb(e,t){const n=e.jawOpen??0;for(I.jawHistory.push({t,v:n});I.jawHistory.length>0&&t-I.jawHistory.first().t>Q_;)I.jawHistory.shift();if(n>=n1?(I.yawnThresholdStartTime==null&&(I.yawnThresholdStartTime=t),I.yawningState=t-I.yawnThresholdStartTime>=i1):(I.yawnThresholdStartTime=null,I.yawningState=!1),I.yawningState)I.talkingState=!1;else{const i=I.jawHistory.toArray().filter(r=>t-r.t<=1500);if(i.length>=4){const r=i.map(a=>a.v),s=Math.max(...r)-Math.min(...r),o=r.reduce((a,c)=>a+c,0)/r.length;I.talkingState=s>=t1&&o>e1}}As()&&(Tu.textContent=I.talkingState?"Yes":"No",Au.textContent=I.yawningState?"Yes":"No")}function Qa(){I.prevPose=null,I.prevTime=null,I.prevSpeed=0,I.totalMovement=0,I.movingTimeMs=0,I.stillTimeMs=0,I.maxHeadSpeed=0,I.history.clear(),I.leftYawMotion=0,I.rightYawMotion=0,I.isMoving=!1,I.boutStartTime=null,I.boutDurationsMs.clear(),I.boutAxisMotion={yaw:0,pitch:0,roll:0},I.boutRollNet=0,I.boutPeakSpeed=0,I.currentAction="Still",I.eventCounts={nodding:0,shaking:0,tiltLeft:0,tiltRight:0,headbanging:0},I.blinkCount=0,I.blinkClosed=!1,I.sessionStartTime=null,I.jawHistory.clear(),I.talkingState=!1,I.yawningState=!1,I.yawnThresholdStartTime=null,ue.neutralRotation=null,ue.calibrating=!1,ue.calibBuffer=[],ue.calibMode=null,ue._calibPrevRot=null,Sn.referenceFaceWidthPx=null,Sn.referenceDistanceCm=50,Sn.referenceIsDefault=!0,$g(),bu.textContent="Still",Lm.textContent="0.0 s",Pm.textContent="0.0 s",Im.textContent="0",Dm.textContent="0.0 s",Um.textContent="0.0 °/s",Nm.textContent="0.0 °",Fm.textContent="–",Am.textContent="0.00 Hz",wm.textContent="0.00 Hz",Rm.textContent="0.00 Hz",Cm.textContent="0.00 Hz",Om.textContent="0",Bm.textContent="0",zm.textContent="0",km.textContent="0",Hm.textContent="0",Vm.textContent="0",Aa.textContent="0:00",go.textContent="Not set",Tu.textContent="–",Au.textContent="–"}async function Rb(){var e;if(!I.modelsReady){ge("Camera start requested before the models were ready.","warn"),en("The models are still loading. Please wait a moment.","warn");return}if(Ce.mediaStream){en("Camera is already running.","ok");return}if(!((e=navigator.mediaDevices)!=null&&e.getUserMedia)){ge("Camera APIs are unavailable in this browser context.","error"),en("This browser does not expose camera access to the page.","warn");return}try{sr.disabled=!0,Lr.disabled=!0,Pr.disabled=!0,or.disabled=!0,en("Requesting camera access…"),ge("Requesting camera access…");const t=window.matchMedia("(max-width: 900px)").matches,n={audio:!1,video:{facingMode:"user",width:{ideal:t?960:1280},height:{ideal:t?540:720}}};Ce.desiredInferenceIntervalMs=t?50:33,Qa(),Ce.mediaStream=await navigator.mediaDevices.getUserMedia(n),I.sessionStartTime=performance.now(),fe.srcObject=Ce.mediaStream,await fe.play(),Eu(),I.fpsHistory.clear(),wo.textContent="0",I.lastInferenceTimestamp=-1/0,k_(),ge(`Tracking loop started (${t?"mobile":"desktop"} profile, target ≈ ${Math.round(1e3/Ce.desiredInferenceIntervalMs)} face fps; hands/pose throttled).`),sr.disabled=!0,Lr.disabled=!1,Pr.disabled=!1,or.disabled=!1,ge(`Camera stream started (${fe.videoWidth||"?"}×${fe.videoHeight||"?"}).`),en("Camera started. Look straight at the camera and click 'Set neutral pose'. Use 'Set reference distance' if you want an approximate centimetre estimate.","ok")}catch(t){H_(),Tc(),To(null,null,null,null),wu(),Eu(),Qa(),Uc(),Da.textContent="Waiting",Ua.textContent="Camera stream is off until access succeeds.",wo.textContent="0",sr.disabled=!1,Lr.disabled=!0,Pr.disabled=!0,or.disabled=!0,ge(`Camera start failed: ${(t==null?void 0:t.name)||"Error"} — ${Kh(t)}`,"error"),en(`Could not start the camera: ${Kh(t)}`,"warn")}}function Cb(){H_(),I.isMoving&&G_(performance.now()),Tc(),To(null,null,null,null),wu(),Eu(),Qa(),Uc(),Da.textContent="Stopped",Ua.textContent="Camera stream is off.",I.fpsHistory.clear(),wo.textContent="0",sr.disabled=!1,Lr.disabled=!0,Pr.disabled=!0,or.disabled=!0,ge("Camera stopped."),en("Camera stopped.")}function Lb(){if(!I.modelsReady||fe.readyState<2||!I.cachedFaceResult){en("Wait until a live face frame has been processed, then try again.","warn");return}V_("manual"),ge("Neutral pose collection started — hold still."),en("Hold still. Collecting stable frames for neutral pose…")}function Pb(){if(!I.modelsReady||fe.readyState<2||!I.cachedFaceResult){en("Wait until a live face frame has been processed, then try again.","warn");return}const e=lv(I.cachedFaceResult);if(!e){en("No face was detected in the latest live frame. Look at the camera and try again.","warn");return}const t=window.prompt("Current face-to-camera distance in cm:",String(Sn.referenceDistanceCm));if(t===null)return;const n=Number(t);if(!Number.isFinite(n)||n<=0){en("Please enter a positive distance in centimetres.","warn");return}Sn.referenceDistanceCm=n,Sn.referenceFaceWidthPx=e,Sn.referenceIsDefault=!1,ge(`Reference distance stored from the latest live frame (${n.toFixed(1)} cm).`),en("Reference distance stored. The distance readout now uses that calibration.","ok")}async function Ib(){try{ge("Booting page."),ge("Initialising 3D preview…"),sb(),ge("3D preview initialised."),Pc(),wu(),Qa(),Uc(),ge("Starting inference worker and loading MediaPipe models…"),vb({onReady(){ge("Face, hand, and pose models ready."),ge("Overlay is using explicit local hand/pose connector sets for compatibility."),en("Face, hand, and pose models are ready. Click 'Start camera'.","ok"),sr.disabled=!1,or.disabled=!0},onError(e){sr.disabled=!0,Lr.disabled=!0,Pr.disabled=!0,or.disabled=!0,ge(`Model load failed: ${e}`,"error"),en(`Could not load the MediaPipe models: ${e}`,"warn")}})}catch(e){sr.disabled=!0,Lr.disabled=!0,Pr.disabled=!0,or.disabled=!0,ge(`Initialisation failed: ${(e==null?void 0:e.message)||String(e)}`,"error"),en(`Initialisation error: ${(e==null?void 0:e.message)||String(e)}`,"warn"),console.error(e)}}fe.addEventListener("loadedmetadata",()=>{ge(`Video metadata loaded (${fe.videoWidth||"?"}×${fe.videoHeight||"?"}).`)});fe.addEventListener("resize",()=>{ge(`Video resized (${fe.videoWidth||"?"}×${fe.videoHeight||"?"}).`)});document.addEventListener("visibilitychange",()=>{document.hidden?(ge("Page hidden. Pausing tracking loop."),Hh()):Ce.mediaStream&&(ge("Page visible again. Resuming tracking loop."),k_())});sr.addEventListener("click",Rb);Lr.addEventListener("click",Cb);Pr.addEventListener("click",Lb);or.addEventListener("click",Pb);window.addEventListener("resize",bh,{passive:!0});window.addEventListener("resize",Pc,{passive:!0});const W_=new ResizeObserver(()=>{bh(),Pc()});var um;const cm=(um=document.getElementById("headFeedCanvas"))==null?void 0:um.parentElement;cm&&W_.observe(cm);const lm=document.getElementById("avatar3d");lm&&W_.observe(lm);window.addEventListener("error",e=>{Dc(`Unhandled error: ${e.message}`)});window.addEventListener("unhandledrejection",e=>{var n;const t=((n=e.reason)==null?void 0:n.message)||String(e.reason);Dc(`Unhandled rejection: ${t}`)});Ib();
