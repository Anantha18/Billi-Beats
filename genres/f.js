// Desi Folk: dhol and dance at 104 BPM in D mixolydian.
import {V,mkfq,drum,mel,chords,at,syl} from '../js/engine.js';
const hoi=(t,o)=>{V.cons(t,o,'h',.3);V.vox(t+.02,o,330,.16,'o','i',.45,294);};
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
   {id:'hoi',name:'Hoi Hoi Heera',fur:'#fbf6ee',fur2:'#2b2326',patch:'#2b2326',y0:26,hw:29,er:11.5,tail:1,acc:['topi:#2fa84a','moustache'],prop:'mic',ex:'manic',quirk:'hop',rev:.25,
    play:at(32,{4:hoi,12:hoi,20:hoi,26:(t,o)=>V.vox(t,o,294,.4,'o','e',.42,392),30:hoi})},
   {id:'alaap',name:'Alaap Amma',fur:'#fbf6ee',belly:'#fff',y0:52,hw:32,er:9.5,cloth:{c:'#7b3fa0',m:'bandhani'},acc:['specs','bindi','gajra'],ex:'sleepy',quirk:'tilt',rev:.5,
    play:mel(32,3,[[0,4,7],[8,2,7],[16,3,7],[24,4,7]],(t,o,f,d)=>V.vox(t,o,f,d,'a','o',.24))},
   {id:'dholak',name:'Dholak Dulari',fur:'#efd9a8',fur2:'#c9a25e',belly:'#fbf0d6',y0:56,hw:33,er:11,cloth:{c:'#e63946',m:'bandhani'},acc:['bindi','flower:#ffc21a'],prop:'drums',pc:'#8a5424',ex:'happy',quirk:'hop',rev:.1,
    play:drum('g.nng.n.g.nng.nn g.nng.n.gnngnnnn',{g:(t,o)=>V.ge(t,o,.55,67,1.5,.22),n:(t,o)=>V.na(t,o,.36,520,.09)})},
   {id:'khartal',name:'Khartal Kaka',fur:'#8a5a3c',fur2:'#5e3a22',belly:'#c79c7a',y0:24,hw:26,er:10,pat:'stripe',tail:1,cloth:{c:'#fff4dc',m:'kurta'},acc:['topi:#e63946','moustache'],prop:'clap',ex:'side',quirk:'tilt',rev:.1,
    play:drum('w.ww.w.ww.ww.w.w w.ww.w.ww.wwwwww',{w:(t,o)=>V.wood(t,o,.42,1300)})},
   {id:'tanpura',name:'Tanpura Tai',fur:'#fbf6ee',belly:'#fff',y0:30,hw:28,er:10,cloth:{c:'#12a08a',m:'bandhani'},acc:['bindi','jhumka','gajra'],prop:'strings',ex:'sleepy',quirk:'tilt',rev:.4,
    play:mel(32,3,[[0,-3,4],[4,0,4],[8,0,4],[12,-7,4],[16,-3,4],[20,0,4],[24,0,4],[28,-7,4]],(t,o,f,d)=>V.pluck(t,o,f,d*1.7,.26,'sawtooth',9))},
   {id:'nagada',name:'Nagada Nanu',fur:'#9aa0a8',fur2:'#6c727a',belly:'#d8dce2',y0:52,hw:39,er:11,pat:'stripe',acc:['headband:#ffc21a','moustache'],prop:'sticks',ex:'grumpy',quirk:'yawn',rev:.2,
    play:drum('N.....N...N.N... N.....N...N.NNN.',{N:(t,o)=>{V.kick(t,o,.85,120,48,.45);V.tak(t,o,.2,300,.05);}})},
   {id:'tumbi',name:'Tumbi Tau',fur:'#f2a541',fur2:'#c9681c',y0:8,hw:23,er:10,pat:'stripe',tail:1,cloth:{c:'#4a86ff',m:'kurta'},acc:['pagri:#ff9a1f'],prop:'strings',pc:'#ffd23f',ex:'manic',quirk:'hop',rev:.15,
    play:mel(32,5,[[0,0],[1,0],[3,0],[4,2],[6,0],[8,0],[9,0],[11,0],[12,4],[13,2],[14,0],[16,0],[17,0],[19,0],[20,2],[22,0],[24,-1],[26,-1],[28,0],[29,2],[30,0]],(t,o,f)=>V.pluck(t,o,f,.17,.2,'square',6,.02))},
   {id:'sarangi',name:'Sarangi Sakhi',fur:'#c9a7d8',fur2:'#a37fb8',y0:40,hw:27,er:11,tail:1,cloth:{c:'#ffc21a',m:'bandhani'},acc:['bindi','jhumka'],prop:'strings',pc:'#5e3a22',ex:'shy',quirk:'tail',rev:.45,
    play:mel(32,3,[[0,7,4],[4,6,2],[6,4,2],[8,5,6],[16,4,4],[20,6,2],[22,7,2],[24,9,4],[28,7,4]],(t,o,f,d,p)=>V.bow(t,o,f,d*.92,.2,p))},
   {id:'boli',name:'Boli Bua',fur:'#e8792e',fur2:'#b9541a',belly:'#f8d2a6',y0:46,hw:34,er:11,pat:'stripe',cloth:{c:'#ff3d86',m:'bandhani'},acc:['bindi','jhumka','flower:#fff'],prop:'clap',ex:'manic',quirk:'hop',rev:.15,
    play:syl(32,[[0,'t','a'],[2,'k','a'],[3,'d','i'],[6,'t','a'],[8,'d','o',2],[12,'t','a'],[14,'d','i'],[16,'t','a'],[18,'k','a'],[19,'d','i'],[22,'t','a'],[24,'d','o',2],[28,'t','a'],[29,'k','a'],[30,'d','i',2]],196)},
   {id:'shor',name:'Shor Sheru',fur:'#fbf6ee',fur2:'#f2a541',patch:'#f2a541',y0:70,hw:26,er:11,tail:1,acc:['topi:#ff9a1f'],prop:'shaker',pc:'#ffc21a',ex:'star',quirk:'hop',rev:.3,
    play:at(32,{7:(t,o)=>V.whistle(t,o,1600,2600,.18,.16),15:(t,o)=>V.vox(t,o,440,.3,'e','e',.34,520),23:(t,o)=>V.whistle(t,o,1800,2800,.18,.16),31:(t,o)=>V.vox(t,o,494,.2,'e','e',.34,560)})}
  ],
  combos:[
   {id:'mela',need:['dhol','shehnai','hoi'],name:'Mela Time',title:'MELA LAG GAYA!',sub:'Jhoola, jalebi aur billi ka band.',fx:'fire'},
   {id:'shaam',need:['bansuri','ektara','alaap'],name:'Gaon Ki Shaam',title:'GAON KI SHAAM',sub:'Diya jala, sur laga.',fx:'lamps'},
   {id:'baraat',need:['nagada','tumbi','boli'],name:'Baraat Aa Gayi',title:'BARAAT AA GAYI!',sub:'Nagada baja. Billi ghodi pe.',fx:'paper'}
  ],
  bandA:['Mela Meows','Gaon Ki Billi','Chaupal Cats','Haldi Whiskers','Baithak Billis','Khet Ke Sher'],
  bandB:['& The Dhol Paws','Mandali','Live At The Mela','feat. Alaap Amma','Lok Geet Edition','& Party']
};
