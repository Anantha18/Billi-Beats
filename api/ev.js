// Our own anonymous usage counters: how many plays, combos, shares and so on per day. No personal data.
import {on,pipe,GEN,day,okDev,body,off} from './_r.js';
const NAMES=['visit','genre_open','first_play','engaged_5_cats','combo','share_open','link_copy','publish','story_card','mix_load','chart_open','voice_record','voice_use','listen'];
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'POST only'});
  if(!on)return off(res);
  const {n,g,dev}=body(req);
  if(NAMES.indexOf(n)<0)return res.status(400).json({error:'bad input'});
  try{
    const k='ev:'+day(),cmds=[['HINCRBY',k,n+(GEN.indexOf(g)>=0?'|'+g:''),1],['EXPIRE',k,10368000]];
    if(okDev(dev))cmds.push(['PFADD','uv:'+day(),dev],['EXPIRE','uv:'+day(),10368000]);
    await pipe(cmds);res.status(204).end();
  }catch(e){res.status(500).json({error:'store'});}
}
