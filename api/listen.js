// Count one listen: once per phone per band, after the page has played it for 15 seconds.
import {on,pipe,day,week,okDev,okId,ipKey,body,off} from './_r.js';
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'POST only'});
  if(!on)return off(res);
  const {id,dev}=body(req);
  if(!okId(id)||!okDev(dev))return res.status(400).json({error:'bad input'});
  try{
    const ipl=`ipl:${ipKey(req)}:${id}:${day()}`;
    const [g,fresh,perIp]=await pipe([['HGET','mix:'+id,'g'],['SET',`l:${id}:${dev}`,1,'NX','EX',2592000],['INCR',ipl],['EXPIRE',ipl,90000]]);
    if(!g)return res.status(404).json({error:'no such band'});
    // Many phones share one address on Indian mobile networks, so the per-address cap is loose.
    if(!fresh||perIp>20)return res.status(200).json({counted:false});
    const wk=`chart:${g}:${week()}`;
    const [,,n]=await pipe([['ZINCRBY',wk,1,id],['EXPIRE',wk,5184000],['HINCRBY','mix:'+id,'n',1]]);
    res.status(200).json({counted:true,n});
  }catch(e){res.status(500).json({error:'store'});}
}
