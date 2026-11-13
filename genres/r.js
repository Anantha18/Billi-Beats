// Gully Rap: boom-bap at 90 BPM in D minor.
import {V,mkfq,drum,mel,at,syl} from '../js/engine.js';
const ay=(t,o)=>{V.cons(t,o,'h',.3);V.vox(t+.02,o,300,.2,'e','i',.42,340);};
export default {
  key:'r',title:'Gully Rap',tag:'Boom-bap · 90 BPM',blurb:'Apna time, apni billi.',L:32,bar:16,sd:60/90/4,sw:.12,fq:mkfq([0,2,3,5,7,8,10]),
  theme:{bg:'gully',c1:'#ffd23f',c2:'#e63946'},lead:['boom','sub','mc'],
  cats:[
   {id:'boom',name:'Boombox Biscuit',fur:'#f2a541',fur2:'#c9681c',belly:'#fbe3b8',y0:58,hw:36,er:10,pat:'stripe',tail:1,cloth:{c:'#ffd23f',m:'jersey'},acc:['shadesUp'],prop:'boombox',ex:'happy',quirk:'hop',rev:.06,
    play:drum('K...S..K..K.S... K...S..K.KK.S..K',{K:(t,o)=>{V.kick(t,o,.95,150,45,.4);V.tak(t,o,.2,700,.03);},S:(t,o)=>V.snare(t,o,.6)})},
   {id:'hats',name:'Chain Chiku',fur:'#a2a7ad',fur2:'#62676e',belly:'#e8eaec',y0:34,hw:28,er:10,pat:'stripe',cloth:{c:'#14a098',m:'track'},acc:['bucket:#f4f1ea','chain','chain2'],prop:'spray',ex:'side',quirk:'tilt',rev:.08,
    play:drum('h.h.h.hhh.h.h.H. h.h.hhh.h.h.hsss',{h:(t,o)=>V.hiss(t,o,.26,.04),H:(t,o)=>V.hiss(t,o,.3,.14),s:(t,o)=>V.scratch(t,o,.4)})},
   {id:'sub',name:'Sub Sultan',fur:'#4b5d7a',fur2:'#33415a',belly:'#8fa0bd',y0:50,hw:38,er:11,tail:1,cloth:{c:'#2b2b36',m:'hoodie'},acc:['beanie:#e63946'],prop:'pads',ex:'sleepy',quirk:'yawn',rev:0,
    play:mel(32,2,[[0,0,3],[7,0,2],[10,0,2],[14,3,2],[16,-2,3],[23,-2,2],[26,-3,2],[28,-3,1],[30,-1,2]],(t,o,f,d)=>V.sub(t,o,f,d*.85,.7))},
   {id:'tabla',name:'Tabla Tapori',fur:'#fbf6ee',fur2:'#e8833a',patch:'#e8833a',y0:66,hw:28,er:10,acc:['bandana:#e63946'],prop:'drums',ex:'manic',quirk:'hop',rev:.1,
    play:drum('g..g..n.g...n.g. g..g..n.g.n.gngn',{g:(t,o)=>V.ge(t,o,.6,90,1.5,.25),n:(t,o)=>V.na(t,o,.42,587,.12)})},
   {id:'keys',name:'Piano Pappu',fur:'#262026',ink:'#0c0a0c',pat:'tux',y0:30,hw:27,er:9.5,tail:1,acc:['specs','bowtie:#ffd23f'],prop:'keys',ex:'grumpy',quirk:'tail',rev:.25,
    play:mel(32,4,[[0,0],[2,2],[3,4],[6,2],[8,0],[10,2],[11,4],[14,6],[16,5],[18,4],[19,2],[22,4],[24,2],[26,0],[27,-1],[30,0]],(t,o,f)=>V.pluck(t,o,f,.38,.26,'triangle',6))},
   {id:'sitar',name:'Sitar Shanu',fur:'#efd9a8',fur2:'#c9a25e',y0:20,hw:25,er:9.5,pat:'stripe',cloth:{c:'#e63946',m:'check'},acc:['earring'],prop:'strings',ex:'smug',quirk:'tilt',rev:.3,
    play:mel(32,3,[[4,7,2],[6,6],[7,4,3],[12,4],[13,6],[14,7,2],[20,9,2],[22,7],[23,6,3],[28,4],[29,2],[30,0,2]],(t,o,f,d)=>{V.pluck(t,o,f,d+.3,.3,'sawtooth',8,-.03);V.pluck(t,o,f*2,d+.1,.06,'sawtooth',6);})},
   {id:'mc',name:'MC Billi',fur:'#262026',ink:'#0c0a0c',iris:'#ffd23f',lidc:'#262026',y0:18,hw:30,er:11.5,tail:1,cloth:{c:'#454a5c',m:'hoodie'},acc:['cap:#e63946','chain','earring'],prop:'mic',ex:'smug',quirk:'tail',rev:.1,
    play:syl(32,[[0,'t','a'],[1,'k','a'],[3,'d','i'],[4,'t','a'],[6,'k','a'],[7,'t','a'],[8,'d','o',2],[12,'t','a'],[13,'k','i'],[14,'t','a'],[16,'t','a'],[17,'k','a'],[19,'d','i'],[20,'t','a'],[21,'k','a'],[22,'t','a'],[23,'k','i'],[24,'d','o'],[26,'t','a'],[27,'k','a'],[28,'d','a',2.5]],130)},
   {id:'hype',name:'Hype Chhotu',fur:'#fbf6ee',fur2:'#f2a541',patch:'#f2a541',y0:72,hw:25,er:10.5,tail:1,acc:['cap:#4a86ff'],prop:'mic',pc:'#ffd23f',ex:'star',quirk:'hop',rev:.25,
    play:at(32,{6:ay,14:(t,o)=>V.meow(t,o,520,.3,.3),22:ay,28:(t,o)=>V.meow(t,o,620,.26,.3),30:ay})}
  ],
  combos:[
   {id:'cypher',need:['boom','sub','mc'],name:'Gully Cypher',title:'GULLY CYPHER!',sub:'Circle bana lo. Billi bol rahi hai.',fx:'eyes'},
   {id:'gang',need:['hats','sitar','hype'],name:'Billi Gang',title:'BILLI GANG',sub:'Poora mohalla sun raha hai.',fx:'paper'}
  ],
  bandA:['Gully Ki Billi','Chhapri Cats','Dharavi Meows','Local Train Litter','Tapori Tails','Vada Pav Vandals'],
  bandB:['& The 808 Paws','feat. Chain Chiku','Mixtape Vol. 1','Live From The Chawl','Ka Asli Scene','& Sons']
};
