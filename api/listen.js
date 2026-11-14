// Count one listen: once per phone per band, and only with a ticket from /api/mix that is at least 15 seconds old.
import {on,pipe,day,week,okDev,okId,ipKey,body,off,sign,KEEP} from './_r.js';
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'POST only'});
  if(!on)return off(res);
  const {id,dev,ts,tk}=body(req),age=Date.now()-Number(ts);
  if(!okId(id)||!okDev(dev)||!Number.isFinite(age)||typeof tk!=='string')return res.status(400).json({error:'bad input'});
  if(tk!==sign(id+'|'+ts)||age<14000||age>7200000)return res.status(200).json({counted:false});
  try{
    // Address caps are checked before the phone's one listen is used up. Many phones share an address on Indian mobile networks, so they are loose.
    const ip=ipKey(req),ipl=`ipl:${ip}:${id}:${day()}`,ipa=`ipa:${ip}:${day()}`;
    const [g,perBand,,perDay]=await pipe([['HGET','mix:'+id,'g'],['INCR',ipl],['EXPIRE',ipl,90000],['INCR',ipa],['EXPIRE',ipa,90000]]);
    if(!g)return res.status(404).json({error:'no such band'});
    if(perBand>25||perDay>300)return res.status(200).json({counted:false});
    const [fresh]=await pipe([['SET',`l:${id}:${dev}`,1,'NX','EX',2592000]]);
    if(!fresh)return res.status(200).json({counted:false});
    const wk=`chart:${g}:${week()}`;
    const [,,n]=await pipe([['ZINCRBY',wk,1,id],['EXPIRE',wk,5184000],['HINCRBY','mix:'+id,'n',1],['EXPIRE','mix:'+id,KEEP]]);
    res.status(200).json({counted:true,n});
  }catch(e){res.status(500).json({error:'store'});}
}
