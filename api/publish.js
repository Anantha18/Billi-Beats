// Publish a band to the chart. Stores only the genre, the cat line-up and two name indices: no text, no personal data.
import {on,pipe,GEN,day,okDev,okCode,okIdx,ipKey,body,off} from './_r.js';
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'POST only'});
  if(!on)return off(res);
  const {g,code,a,b,dev}=body(req);
  if(GEN.indexOf(g)<0||!okCode(code)||!okIdx(a)||!okIdx(b)||!okDev(dev))return res.status(400).json({error:'bad input'});
  try{
    const lim='pub:'+ipKey(req)+':'+day(),dup=`dup:${g}:${code}:${a}:${b}`;
    const [n,,had]=await pipe([['INCR',lim],['EXPIRE',lim,90000],['GET',dup]]);
    if(had)return res.status(200).json({id:had,existing:true});
    if(n>30)return res.status(429).json({error:'too many'});
    const id=Array.from({length:6},()=>'abcdefghijkmnpqrstuvwxyz23456789'[Math.floor(Math.random()*32)]).join('');
    const [set]=await pipe([['SET',dup,id,'NX']]);
    if(!set){const [cur]=await pipe([['GET',dup]]);return res.status(200).json({id:cur,existing:true});}
    // The maker's own phone is marked as already counted, so they cannot add listens to their own band.
    await pipe([['HSET','mix:'+id,'g',g,'code',code,'a',a,'b',b,'t',Date.now(),'n',0],['SET',`l:${id}:${dev}`,1,'EX',2592000]]);
    res.status(200).json({id});
  }catch(e){res.status(500).json({error:'store'});}
}
