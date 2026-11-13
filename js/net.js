// Talks to the chart API. If the chart store is not connected yet, every call resolves to null and the page carries on without it.
import {store} from './state.js';
export const net={on:null};
let dev=store.get('bb-dev',null);
if(!dev){dev=Array.from({length:14},()=>'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random()*36)]).join('');store.set('bb-dev',dev);}
export const devId=()=>dev;
export async function api(path,data){
  if(net.on===false||!/^https?:/.test(location.href))return null;
  try{
    const ctl=new AbortController(),to=setTimeout(()=>ctl.abort(),6000);
    const r=await fetch('/api/'+path,data?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({dev:dev},data)),signal:ctl.signal}:{signal:ctl.signal});
    clearTimeout(to);
    if(r.status===503||r.status===404&&!data&&path.indexOf('mix')!==0){net.on=false;return null;}
    if(r.status===204)return {};
    const j=await r.json().catch(()=>null);
    if(j&&j.off){net.on=false;return null;}
    if(r.ok)net.on=true;
    return r.ok?j:null;
  }catch(e){return null;}
}
export function ev(n,g){try{if(net.on===false)return;const b=JSON.stringify({n:n,g:g,dev:dev});
  if(navigator.sendBeacon)navigator.sendBeacon('/api/ev',new Blob([b],{type:'application/json'}));else api('ev',{n:n,g:g});}catch(e){}}
