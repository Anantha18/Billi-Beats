// Carnatic Fusion: 110 BPM, eight-beat cycle, in a Mayamalavagowla-style scale on D. Every tune here is original.
import {V,mkfq,drum,mel,chords,at,syl} from '../js/engine.js';
const aha=(t,o)=>{V.vox(t,o,196,.13,'a','a',.4);V.vox(t+.17,o,247,.26,'a','a',.42,220);};
export default {
  key:'c',title:'Carnatic Fusion',tag:'Kutcheri meets groove · 110 BPM',blurb:'Sabha-la semma jam.',L:32,bar:16,sd:60/110/4,sw:0,fq:mkfq([0,1,4,5,7,8,11]),
  theme:{bg:'carnatic',c1:'#ffb000',c2:'#b3274a'},lead:['mrid','veena','konna'],
  cats:[
   {id:'mrid',name:'Mridangam Mani',fur:'#8a5a3c',fur2:'#5e3a22',belly:'#c79c7a',y0:50,hw:36,er:11,pat:'stripe',cloth:{c:'#fff',m:'veshti'},acc:['vibhuti'],prop:'dhol',pc:'#5e3a22',ex:'happy',quirk:'hop',rev:.1,
    play:drum('D.tkD.t.DktkD.tt D.tkD.t.DkDktktk',{D:(t,o)=>{V.ge(t,o,.6,88,1.35,.24);V.na(t,o,.34,587,.1);},t:(t,o)=>V.na(t,o,.4,587,.1),k:(t,o)=>V.tak(t,o,.3,640,.035)})},
   {id:'ghatam',name:'Ghatam Giri',fur:'#9aa0a8',fur2:'#6c727a',belly:'#d8dce2',y0:60,hw:35,er:10.5,pat:'stripe',cloth:{c:'#fff',m:'veshti',c2:'#b3274a'},acc:['vibhuti','moustache'],prop:'pot',ex:'grumpy',quirk:'yawn',rev:.15,
    play:drum('g.gG.g.gG.gG.gG. g.gG.g.gG.gGgGGG',{g:(t,o)=>V.ghat(t,o,.5,196),G:(t,o)=>V.ghat(t,o,.68,294)})},
   {id:'tambura',name:'Tambura Thatha',fur:'#fbf6ee',belly:'#fff',y0:28,hw:28,er:9.5,cloth:{c:'#fff',m:'veshti'},acc:['vibhuti','specs'],prop:'strings',ex:'sleepy',quirk:'yawn',rev:.45,
    play:mel(32,3,[[0,-3,4],[4,0,4],[8,0,4],[12,-7,4],[16,-3,4],[20,0,4],[24,0,4],[28,-7,4]],(t,o,f,d)=>V.pluck(t,o,f,d*1.7,.26,'sawtooth',9))},
   {id:'bass',name:'Bass Balaji',fur:'#262026',ink:'#0c0a0c',iris:'#ffb000',lidc:'#262026',y0:14,hw:25,er:10.5,tail:1,cloth:{c:'#b3274a',m:'stripe',c2:'#ffb000'},acc:['headphones:#ffb000'],prop:'strings',pc:'#262026',ex:'smug',quirk:'tail',rev:.04,
    play:mel(32,2,[[0,0,2],[3,0],[6,4,2],[8,0,2],[11,0],[12,4],[14,3],[16,0,2],[19,0],[22,4,2],[24,0],[26,1],[28,4,2],[30,6]],(t,o,f,d)=>V.pluck(t,o,f,d*.8+.05,.55,'sawtooth',4))},
   {id:'veena',name:'Veena Vidya',fur:'#efd9a8',fur2:'#c9a25e',belly:'#fbf0d6',y0:40,hw:30,er:11,cloth:{c:'#b3274a',m:'veshti'},acc:['bindi','jhumka','gajra'],prop:'strings',ex:'smug',quirk:'tilt',rev:.35,
    play:mel(32,3,[[0,0,2],[2,1],[3,2,3],[6,4,2],[8,5,2],[10,4],[11,2,3],[14,1,2],[16,4,2],[18,5],[19,6,3],[22,7,2],[24,6],[25,5],[26,4,2],[28,2],[29,1],[30,0,2]],(t,o,f,d)=>V.pluck(t,o,f,d+.32,.3,'sawtooth',8,-.035))},
   {id:'violin',name:'Violin Venkat',fur:'#f2a541',fur2:'#c9681c',belly:'#fbe3b8',y0:18,hw:26,er:10.5,pat:'stripe',tail:1,cloth:{c:'#fff',m:'veshti'},acc:['vibhuti','sidepart'],prop:'strings',pc:'#8a3a1c',ex:'star',quirk:'tail',rev:.4,
    play:mel(32,4,[[0,4,3],[3,5],[4,6,2],[6,7,2],[8,6,3],[11,5],[12,4,4],[16,2,3],[19,1],[20,0,2],[22,1,2],[24,2,2],[26,4,2],[28,5,2],[30,4,2]],(t,o,f,d,p)=>V.bow(t,o,f,d*.92,.16,p))},
   {id:'konna',name:'Konnakol Kannan',fur:'#e8792e',fur2:'#b9541a',belly:'#f8d2a6',y0:34,hw:32,er:11.5,pat:'stripe',cloth:{c:'#fff',m:'veshti',c2:'#12a08a'},acc:['vibhuti','moustache'],prop:'clap',ex:'manic',quirk:'hop',rev:.12,
    play:syl(32,[[0,'t','a'],[1,'k','a'],[2,'d','i'],[3,'.','i'],[4,'t','a'],[5,'k','i'],[6,'t','a'],[8,'t','a'],[9,'k','a'],[10,'d','i'],[11,'.','i'],[12,'t','a'],[14,'d','o',2],[16,'t','a'],[17,'k','i'],[18,'t','a'],[19,'t','a'],[20,'k','i'],[21,'t','a'],[22,'d','i'],[24,'t','a'],[25,'k','a'],[26,'d','i'],[27,'.','i'],[28,'t','a'],[29,'k','a'],[30,'d','o',2]],147)},
   {id:'swara',name:'Sa-Ri-Ga Sita',fur:'#fbf6ee',fur2:'#c9a7d8',patch:'#c9a7d8',y0:44,hw:28,er:11,tail:1,cloth:{c:'#12a08a',m:'veshti'},acc:['bindi','jhumka','gajra'],prop:'mic',pc:'#ffb000',ex:'star',quirk:'tilt',rev:.4,
    play:mel(32,3,[[0,7,2],[2,8,2],[4,9,2],[6,11,2],[8,9,2],[10,8],[11,7,3],[16,11,2],[18,12,2],[20,13,3],[24,11,2],[26,9,2],[28,7,4]],(t,o,f,d)=>{V.cons(t,o,'t',.12);V.vox(t+.01,o,f,d*.9,'a','a',.26);})},
   {id:'kanjira',name:'Kanjira Kutty',fur:'#fbf6ee',fur2:'#f2a541',patch:'#f2a541',y0:70,hw:26,er:11,tail:1,cloth:{c:'#ffb000',m:'stripe',c2:'#b3274a'},acc:['vibhuti'],prop:'manjira',ex:'star',quirk:'hop',rev:.15,
    play:drum('g..g.g..g.g..gg. g..g.g..g.gg.ggj',{g:(t,o)=>V.ge(t,o,.5,120,1.9,.2),j:(t,o)=>V.jing(t,o,.3,.1)})},
   {id:'kit',name:'Drumkit Deepak',fur:'#4b5d7a',fur2:'#33415a',belly:'#8fa0bd',y0:42,hw:34,er:11,cloth:{c:'#262026',m:'vest'},acc:['headband:#ffb000','earring'],prop:'sticks',ex:'smug',quirk:'tilt',rev:.06,
    play:drum('K.h.S.hKK.h.S.h. K.h.S.hKK.hKS.SS',{K:(t,o)=>V.kick(t,o,.9,150,48,.3),S:(t,o)=>V.snare(t,o,.55),h:(t,o)=>V.hiss(t,o,.22,.04)})},
   {id:'synth',name:'Synth Sundar',fur:'#c9a7d8',fur2:'#a37fb8',y0:24,hw:27,er:10.5,tail:1,cloth:{c:'#454a5c',m:'hoodie'},acc:['specs','vibhuti'],prop:'keys',ex:'side',quirk:'tilt',rev:0,
    play:mel(32,2,[[0,0,8],[8,4,8],[16,0,8],[24,3,4],[28,4,4]],(t,o,f,d)=>V.sub(t,o,f,d*.93,.56))},
   {id:'morsing',name:'Morsing Murthy',fur:'#b9793f',fur2:'#8a5424',belly:'#e6c39a',y0:58,hw:31,er:11.5,pat:'stripe',cloth:{c:'#fff',m:'veshti'},acc:['vibhuti'],prop:'clap',ex:'manic',quirk:'hop',rev:.12,
    play:drum('M.mM.mM.mMmm.mM. M.mM.mMmmMmMMmMm',{M:(t,o)=>V.twang(t,o,146.8,.16,.36,2600),m:(t,o)=>V.twang(t,o,146.8,.1,.22,1500)})},
   {id:'nadas',name:'Nadas Nandu',fur:'#f6d046',fur2:'#d99a1f',belly:'#fff0b8',y0:36,hw:33,er:11,pat:'stripe',tail:1,cloth:{c:'#fff',m:'veshti',c2:'#b3274a'},acc:['vibhuti'],prop:'horn',ex:'happy',quirk:'hop',rev:.35,
    play:mel(32,4,[[0,7,3],[3,6],[4,7,2],[6,9,3],[9,8],[10,7,2],[12,6,3],[16,4,3],[19,5],[20,6,2],[22,4,2],[24,2,3],[27,1],[28,0,4]],(t,o,f,d,p)=>V.reed(t,o,f*.5,d*.95,.17,p&&p*.5))},
   {id:'venu',name:'Venu Vasu',fur:'#efe2c8',mask:'#5a4032',iris:'#8fd3ff',y0:10,hw:23,er:9.5,tail:1,cloth:{c:'#12a08a',m:'veshti'},acc:['vibhuti'],prop:'flute',ex:'sleepy',quirk:'tail',rev:.45,
    play:mel(32,4,[[0,7],[1,8],[2,9],[3,11,2],[6,9,2],[8,8],[9,7,3],[14,6],[15,7],[16,9],[17,11],[18,12,3],[22,11],[23,9],[24,8,2],[26,7,2],[28,4,4]],(t,o,f,d,p)=>V.flute(t,o,f,d*.9,.2,p))},
   {id:'sabha',name:'Sabha Mama',fur:'#9aa0a8',fur2:'#6c727a',belly:'#d8dce2',y0:46,hw:36,er:10.5,cloth:{c:'#fff',m:'veshti'},acc:['vibhuti','specs','scarf:#ffb000'],prop:'cup',pc:'#d8dce2',ex:'smug',quirk:'yawn',rev:.25,
    play:at(32,{14:aha,30:(t,o)=>{V.vox(t,o,196,.1,'a','e',.4);V.vox(t+.13,o,196,.1,'a','e',.4);V.clap(t+.26,o,.3);}})},
   {id:'sruthi',name:'Sruthi Paati',fur:'#fbf6ee',belly:'#fff',y0:54,hw:32,er:9.5,cloth:{c:'#7b3fa0',m:'veshti'},acc:['specs','bindi','gajra'],ex:'sleepy',quirk:'tilt',rev:.5,
    play:mel(32,3,[[0,0,15.5],[16,4,15.5]],(t,o,f,d)=>V.vox(t,o,f,d,'m','m',.2))}
  ],
  combos:[
   {id:'kutcheri',need:['mrid','veena','konna'],name:'Kutcheri',title:'KUTCHERI!',sub:'Front row maama thalai aatraar.',fx:'bloom'},
   {id:'jam',need:['kit','bass','violin'],name:'Fusion Jam',title:'FUSION JAM',sub:'Sabha meets studio.',fx:'fire'},
   {id:'thani',need:['mrid','ghatam','kanjira'],name:'Thani Avarthanam',title:'THANI AVARTHANAM!',sub:'Percussion mattum. Canteen-ku pogadheenga.',fx:'paper'}
  ],
  bandA:['Mylapore Meows','Sabha Cats','Margazhi Whiskers','Filter Kaapi Felines','Canteen Billis','Raga Paws'],
  bandB:['& The Mridangam Mob','Kutcheri Edition','Live At The Sabha','feat. Konnakol Kannan','Fusion Project','December Season']
};
