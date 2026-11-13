// One published band: its line-up, total listens and this week's rank in its genre.
import {on,pipe,week,okId,off} from './_r.js';
export default async function handler(req,res){
  if(!on)return off(res);
  const id=req.query.id;
  if(!okId(id))return res.status(400).json({error:'bad input'});
  try{
    const [m]=await pipe([['HMGET','mix:'+id,'g','code','a','b','n']]);
    if(!m||!m[0])return res.status(404).json({error:'no such band'});
    const wk=`chart:${m[0]}:${week()}`,[rank,w]=await pipe([['ZREVRANK',wk,id],['ZSCORE',wk,id]]);
    res.status(200).json({id,g:m[0],code:m[1],a:+m[2],b:+m[3],n:+m[4]||0,w:+w||0,rank:rank==null?null:rank+1});
  }catch(e){res.status(500).json({error:'store'});}
}
