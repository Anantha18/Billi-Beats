// Shared state and small helpers used by every module.
export const S={pack:null,slots:[-1,-1,-1,-1,-1,-1,-1],muted:[0,0,0,0,0,0,0],playing:false,stepIdx:0,t0:0,vq:[],comboOn:{},got:{},nameSeed:0};
export const $=id=>document.getElementById(id);
export const INK='#170e33';
export const reduce=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
export const store={
  get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
};
const _sent={};
export const trackHook={fn:null};
export function track(name,data,once){try{if(once){if(_sent[name])return;_sent[name]=1;}window.va&&window.va('event',{name:name,data:data||{}});trackHook.fn&&trackHook.fn(name,data||{});}catch(e){}}
let toastT=0;
export function toast(msg,ms){
  $('toastmsg').textContent=msg;$('toast').classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>$('toast').classList.remove('show'),ms||2600);
}
S.got=store.get('bb-got',{})||{};
