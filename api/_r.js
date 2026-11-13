// Shared helpers for the API: a tiny Upstash Redis REST client, input checks and week maths.
import {createHash} from 'node:crypto';
const URL_=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL;
const TOKEN=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;
export const on=!!(URL_&&TOKEN);
export async function pipe(cmds){
  const r=await fetch(URL_+'/pipeline',{method:'POST',headers:{Authorization:'Bearer '+TOKEN,'Content-Type':'application/json'},body:JSON.stringify(cmds)});
  if(!r.ok)throw new Error('store '+r.status);
  return (await r.json()).map(x=>x.result);
}
export const GEN=['r','g','f','d'];
const IST=19800e3;
export const day=()=>Math.floor((Date.now()+IST)/864e5);
// Weeks run Monday to Sunday, India time.
export const week=()=>Math.floor((day()+3)/7);
export const okDev=d=>typeof d==='string'&&/^[a-z0-9]{8,24}$/.test(d);
export const okId=d=>typeof d==='string'&&/^[a-z0-9]{6}$/.test(d);
// A band is 7 slots, each one of the genre's 8 cats or empty. The voice cat never leaves the phone.
export const okCode=c=>typeof c==='string'&&/^[0-7x]{7}$/.test(c)&&c.replace(/x/g,'').length>=2&&new Set(c.replace(/x/g,'')).size===c.replace(/x/g,'').length;
export const okIdx=n=>Number.isInteger(n)&&n>=0&&n<50;
export function ipKey(req){
  const ip=String(req.headers['x-forwarded-for']||'').split(',')[0].trim()||'0';
  return createHash('sha256').update(ip+'|billi').digest('hex').slice(0,12);
}
export function body(req){
  if(req.body&&typeof req.body==='object')return req.body;
  try{return JSON.parse(req.body||'{}');}catch(e){return {};}
}
export const off=res=>res.status(503).json({off:true});
