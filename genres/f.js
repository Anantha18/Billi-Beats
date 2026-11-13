// Desi Folk: dhol and dance at 104 BPM in D mixolydian.
import {V,mkfq,drum,mel,at} from '../js/engine.js';
const hoi=(t,o)=>{V.cons(t,o,'h',.3);V.vox(t+.02,o,330,.16,'o','i',.45,300);};
export default {
  key:'f',title:'Desi Folk',tag:'Dhol and dance · 104 BPM',blurb:'Mela laga hai, billi naachi hai.',L:32,bar:16,sd:60/104/4,sw:.14,fq:mkfq([0,2,4,5,7,9,10]),
  theme:{bg:'folk',c1:'#ffc21a',c2:'#ff3d86'},lead:['dhol','shehnai','hoi'],
  cats:[
   {id:'dhol',name:'Dhol Dadda',fur:'#e8792e',fur2:'#b9541a',belly:'#f8d2a6',y0:44,hw:38,er:10,pat:'stripe',cloth:{c:'#fff4dc',m:'kurta'},acc:['pagri','moustache'],prop:'dhol',ex:'happy',quirk:'hop',rev:.08,
    play:drum('K..tK.t.K..tK.tt K..tK.t.K.tKt.tt',{K:(t,o)=>{V.kick(t,o,.95,170,55,.32);V.tak(t,o,.3,900);},t:(t,o)=>V.tak(t,o,.5,950)})},
   {id:'manjira',name:'Ghungroo Guddi',fur:'#c9a7d8',fur2:'#a37fb8',belly:'#efe2f5',y0:42,hw:30,er:11,pat:'spot',cloth:{c:'#ff3d86',m:'bandhani'},acc:['bindi','jhumka','gajra','ghungroo'],prop:'manjira',ex:'shy',quirk:'tilt',rev:.2,
    play:drum('j..j..j.j..j..j. j..j..j.j.jj.jjj',{j:(t,o)=>V.jing(t,o,.32,.09)})},
   {id:'ektara',name:'Ektara Ekka',fur:'#8a5a3c',fur2:'#5e3a22',belly:'#c79c7a',y0:10,hw:24,er:9.5,pat:'stripe',tail:1,acc:['topi:#fff4dc','scarf:#ff9a1f'],prop:'strings',ex:'sleepy',quirk:'tilt',rev:.25,
    play:mel(32,3,[[0,0,2],[3,0],[4,4,2],[8,0,2],[11,0],[12,4],[14,3],[16,0,2],[19,0],[20,4,2],[24,-1,2],[27,-1],[28,0,2],[30,4]],(t,o,f,d)=>V.pluck(t,o,f,d*.6+.25,.34,'sawtooth',5,.03))},
   {id:'matka',name:'Matka Mausi',fur:'#9aa0a8',fur2:'#6c727a',belly:'#d8dce2',y0:60,hw:37,er:10,pat:'stripe',cloth:{c:'#12a08a',m:'bandhani'},acc:['bindi','jhumka'],prop:'pot',ex:'grumpy',quirk:'yawn',rev:.15,
    play:drum('g..G.g..g.G..g.G g..G.g..g.G.gGgG',{g:(t,o)=>V.ghat(t,o,.55,110),G:(t,o)=>V.ghat(t,o,.7,165)})},
   {id:'bansuri',name:'Bansuri Bunty',fur:'#efe2c8',mask:'#5a4032',iris:'#8fd3ff',y0:30,hw:28,er:9.5,tail:1,acc:['scarf'],prop:'flute',ex:'smug',quirk:'tail',rev:.45,
    play:mel(32,4,[[0,4,3],[4,5],[5,7,3],[8,9,2],[10,8],[11,7,3],[16,6,3],[20,5],[21,4,3],[24,2,2],[26,4,2],[28,7,4]],(t,o,f,d,p)=>V.flute(t,o,f,d*.9,.25,p))},
   {id:'shehnai',name:'Shehnai Shera',fur:'#f2a541',fur2:'#c9681c',belly:'#fbe3b8',y0:36,hw:33,er:11,pat:'stripe',tail:1,cloth:{c:'#7b3fa0',m:'kurta'},acc:['pagri:#ff3d86'],prop:'horn',ex:'star',quirk:'hop',rev:.35,
    play:mel(32,4,[[2,7,4],[6,8,2],[8,7,2],[10,5,2],[12,4,3],[18,6,4],[22,5,2],[24,4,2],[26,2,2],[28,4,3]],(t,o,f,d,p)=>V.reed(t,o,f,d*.95,.19,p))},
   {id:'hoi',name:'Hoi Hoi Heera',fur:'#fbf6ee',fur2:'#2b2326',patch:'#2b2326',y0:26,hw:29,er:11.5,tail:1,acc:['pagri:#2fa84a','moustache'],prop:'mic',ex:'manic',quirk:'hop',rev:.25,
    play:at(32,{4:hoi,12:hoi,20:hoi,26:(t,o)=>V.vox(t,o,294,.4,'o','e',.42,392),30:hoi})},
   {id:'alaap',name:'Alaap Amma',fur:'#fbf6ee',belly:'#fff',y0:52,hw:32,er:9.5,cloth:{c:'#7b3fa0',m:'bandhani'},acc:['specs','bindi','gajra'],ex:'sleepy',quirk:'tilt',rev:.5,
    play:mel(32,3,[[0,4,7],[8,2,7],[16,3,7],[24,4,7]],(t,o,f,d)=>V.vox(t,o,f,d,'a','o',.24))}
  ],
  combos:[
   {id:'mela',need:['dhol','shehnai','hoi'],name:'Mela Time',title:'MELA LAG GAYA!',sub:'Jhoola, jalebi aur billi ka band.',fx:'fire'},
   {id:'shaam',need:['bansuri','ektara','alaap'],name:'Gaon Ki Shaam',title:'GAON KI SHAAM',sub:'Diya jala, sur laga.',fx:'lamps'}
  ],
  bandA:['Mela Meows','Gaon Ki Billi','Chaupal Cats','Haldi Whiskers','Baithak Billis','Khet Ke Sher'],
  bandB:['& The Dhol Paws','Mandali','Live At The Mela','feat. Alaap Amma','Lok Geet Edition','& Party']
};
