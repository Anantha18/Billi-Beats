// Publish a band to the chart. Stores only the genre, the cat line-up and two name indices: no text, no personal data.
import {on,pipe,GEN,day,okDev,okCode,okIdx,ipKey,body,off,KEEP} from './_r.js';
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'POST only'});
  if(!on)return off(res);
  const {g,code,a,b,dev}=body(req);
  if(GEN.indexOf(g)<0||!okCode(code)||!okIdx(a)||!okIdx(b)||!okDev(dev))return res.status(400).json({error:'bad input'});
  try{
    // The same line-up in the same genre is one band, whatever name it was published under.
    const lim='pub:'+ipKey(req)+':'+day(),dup=`dup:${g}:${code}`;
    const [n,,had]=await pipe([['INCR',lim],['EXPIRE',lim,90000],['GET',dup]]);
    if(had)return res.status(200).json({id:had,existing:true});
    if(n>60)return res.status(429).json({error:'too many'});
    // Claim a fresh id; retry on the rare collision so one band can never overwrite another.
    let id=null;
    for(let k=0;k<6&&!id;k++){const c=Array.from({length:6},()=>'abcdefghijkmnpqrstuvwxyz23456789'[Math.floor(Math.random()*32)]).join('');const [ok]=await pipe([['HSETNX','mix:'+c,'g',g]]);if(ok)id=c;}
    if(!id)return res.status(500).json({error:'store'});
    const [set]=await pipe([['SET',dup,id,'NX','EX',KEEP]]);
    if(!set){const [cur]=await pipe([['GET',dup],['DEL','mix:'+id]]);return res.status(200).json({id:cur,existing:true});}
    // The maker's own phone is marked as already counted, so they cannot add listens to their own band.
    await pipe([['HSET','mix:'+id,'g',g,'code',code,'a',a,'b',b,'t',Date.now(),'n',0],['EXPIRE','mix:'+id,KEEP],['SET',`l:${id}:${dev}`,1,'EX',2592000]]);
    res.status(200).json({id});
  }catch(e){res.status(500).json({error:'store'});}
}
