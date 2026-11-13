// This week's top bands, per genre.
import {on,pipe,GEN,week,off} from './_r.js';
export default async function handler(req,res){
  if(!on)return off(res);
  const want=GEN.indexOf(req.query.g)>=0?[req.query.g]:GEN,top=want.length>1?5:10;
  try{
    const lists=await pipe(want.map(g=>['ZREVRANGE',`chart:${g}:${week()}`,0,top-1,'WITHSCORES']));
    const rows=[];
    lists.forEach((l,gi)=>{for(let i=0;i<(l||[]).length;i+=2)rows.push({id:l[i],g:want[gi],w:+l[i+1],rank:i/2+1});});
    const info=rows.length?await pipe(rows.map(r=>['HMGET','mix:'+r.id,'code','a','b','n'])):[];
    const items=rows.map((r,i)=>info[i]&&info[i][0]?{id:r.id,g:r.g,rank:r.rank,w:r.w,code:info[i][0],a:+info[i][1],b:+info[i][2],n:+info[i][3]||0}:null).filter(Boolean);
    res.setHeader('Cache-Control','s-maxage=20, stale-while-revalidate=60');
    res.status(200).json({week:week(),items});
  }catch(e){res.status(500).json({error:'store'});}
}
