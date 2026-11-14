// Sufi Rock: 96 BPM in D minor. Qawwali claps and harmonium meet a distorted guitar. Every tune here is original.
import {V,mkfq,drum,mel,chords,at,syl} from '../js/engine.js';
const ha=(t,o)=>{V.cons(t,o,'h',.34);V.vox(t+.02,o,294,.16,'a','a',.44,262);};
export default {
  key:'s',trim:1.58,title:'Sufi Rock',tag:'Qawwali meets guitar · 96 BPM',blurb:'Dargah se stadium tak.',L:32,bar:16,sd:60/96/4,sw:.08,fq:mkfq([0,2,3,5,7,8,10]),
  theme:{bg:'sufi',c1:'#3ddc97',c2:'#ffc21a'},lead:['drums','riff','alaap'],
  cats:[
   {id:'drums',name:'Rock Rustam',fur:'#262026',ink:'#0c0a0c',iris:'#3ddc97',lidc:'#262026',y0:46,hw:35,er:11.5,cloth:{c:'#454a5c',m:'vest'},acc:['longhair:#0c0a0c','headband:#e63946'],prop:'sticks',ex:'manic',quirk:'hop',rev:.08,
    play:drum('K.h.S.h.K.K.S.h. K.h.S.h.KhK.S.SS',{K:(t,o)=>V.kick(t,o,.95,150,48,.34),S:(t,o)=>V.snare(t,o,.6),h:(t,o)=>V.hiss(t,o,.24,.05)})},
   {id:'dholak',name:'Dholak Darvesh',fur:'#efd9a8',fur2:'#c9a25e',belly:'#fbf0d6',y0:56,hw:33,er:10.5,pat:'stripe',cloth:{c:'#fff4dc',m:'kurta'},acc:['topi:#3ddc97'],prop:'drums',pc:'#8a5424',ex:'happy',quirk:'tilt',rev:.12,
    play:drum('g.nng.n.gnn.g.n. g.nng.n.gnn.gnnn',{g:(t,o)=>V.ge(t,o,.6,67,1.5,.24),n:(t,o)=>V.na(t,o,.38,500,.09)})},
   {id:'bass',name:'Bass Baba',fur:'#8a5a3c',fur2:'#5e3a22',belly:'#c79c7a',y0:16,hw:26,er:10,pat:'stripe',tail:1,cloth:{c:'#262026',m:'vest'},acc:['beanie:#3ddc97'],prop:'strings',pc:'#262026',ex:'sleepy',quirk:'tilt',rev:.04,
    play:mel(32,2,[[0,0,2],[2,0],[4,0,2],[6,0,2],[8,0,2],[10,0],[12,-2,2],[14,-1,2],[16,0,2],[18,0],[20,0,2],[22,3,2],[24,-1,2],[26,-1],[28,-1,2],[30,-1,2]],(t,o,f,d)=>V.pluck(t,o,f,d*.8+.05,.55,'sawtooth',4))},
   {id:'harm',name:'Harmonium Hakim',fur:'#fbf6ee',belly:'#fff',y0:44,hw:34,er:10,cloth:{c:'#12a08a',m:'kurta'},acc:['topi:#fff','specs','moustache'],prop:'keys',pc:'#8a5a3c',ex:'sleepy',quirk:'yawn',rev:.3,
    play:chords(32,3,[[0,[0,2,4],7.5],[8,[0,2,4],7.5],[16,[-2,0,2],7.5],[24,[-1,1,3],7.5]],(t,o,fs,d)=>V.pad(t,o,fs,d,.075))},
   {id:'solo',name:'Solo Sikandar',fur:'#e8792e',fur2:'#b9541a',y0:10,hw:24,er:10.5,pat:'stripe',tail:1,cloth:{c:'#262026',m:'suit',c2:'#3ddc97'},acc:['longhair:#5a2a10','aviators'],prop:'strings',pc:'#e63946',ex:'cool',quirk:'tail',rev:.35,
    play:mel(32,4,[[0,4,5],[6,5],[7,7,5],[12,6,2],[14,4,2],[16,3,5],[22,4],[23,6,5],[28,4,2],[30,2,2]],(t,o,f,d,p)=>V.gtr(t,o,f,d*.9,.11,0,0,p))},
   {id:'rubab',name:'Rubab Rahim',fur:'#b9793f',fur2:'#8a5424',belly:'#e6c39a',y0:36,hw:29,er:10.5,cloth:{c:'#7b3fa0',m:'vest'},acc:['pagri:#fff4dc','moustache'],prop:'strings',ex:'smug',quirk:'tilt',rev:.3,
    play:mel(32,3,[[0,0],[2,4],[3,7],[5,4],[6,9],[8,0],[10,4],[11,7],[13,4],[14,8],[16,-2],[18,2],[19,5],[21,2],[22,7],[24,-1],[26,3],[27,6],[29,3],[30,8]],(t,o,f)=>V.pluck(t,o,f,.3,.26,'sawtooth',6,.015))},
   {id:'alaap',name:'Alaap Ali',fur:'#fbf6ee',fur2:'#9aa0a8',patch:'#9aa0a8',y0:26,hw:30,er:11.5,tail:1,cloth:{c:'#3ddc97',m:'kurta'},acc:['scarf:#ffc21a'],prop:'mic',pc:'#ffc21a',ex:'sleepy',quirk:'tilt',rev:.55,
    play:mel(32,3,[[0,7,6],[6,8,2],[8,7,7],[16,9,5],[21,8,2],[23,7,3],[26,6,2],[28,4,4]],(t,o,f,d,p)=>V.vox(t,o,p||f,d*.95,'a','a',.24,f))},
   {id:'party',name:'Qawwal Party',fur:'#f2a541',fur2:'#c9681c',belly:'#fbe3b8',y0:52,hw:37,er:11,pat:'stripe',cloth:{c:'#fff4dc',m:'kurta'},acc:['topi:#e63946','moustache'],prop:'clap',ex:'happy',quirk:'hop',rev:.4,
    play:(s,t,o,p)=>{const k=s%32,m={12:[4,2],14:[3,2],28:[2,2],30:[0,3]}[k];if(!m)return 0;[1,1.5].forEach(x=>V.vox(t,o,p.fq(m[0],3)*x,p.sd*m[1]*.9,'o','a',.16));V.clap(t,o,.25);return 1;}},
   {id:'taali',name:'Taali Tabrez',fur:'#c9a7d8',fur2:'#a37fb8',belly:'#efe2f5',y0:62,hw:30,er:11.5,pat:'spot',cloth:{c:'#12a08a',m:'bandhani'},acc:['topi:#ffc21a'],prop:'clap',ex:'star',quirk:'hop',rev:.25,
    play:drum('c...c...c...c.c. c...c...c...c.cc',{c:(t,o)=>V.clap(t,o,.9)})},
   {id:'toms',name:'Tom-Tom Tariq',fur:'#4b5d7a',fur2:'#33415a',belly:'#8fa0bd',y0:38,hw:36,er:11,cloth:{c:'#e63946',m:'stripe',c2:'#262026'},acc:['mohawk:#3ddc97','earring'],prop:'sticks',ex:'grumpy',quirk:'yawn',rev:.2,
    play:drum('T.....t...T.t... T.....t..TtTttll',{T:(t,o)=>V.tom(t,o,.7,110),t:(t,o)=>V.tom(t,o,.6,150),l:(t,o)=>V.tom(t,o,.7,84)})},
   {id:'riff',name:'Riff Raja',fur:'#9aa0a8',fur2:'#6c727a',belly:'#d8dce2',y0:22,hw:28,er:10.5,pat:'stripe',tail:1,cloth:{c:'#262026',m:'suit',c2:'#e63946'},acc:['longhair:#241a1c'],prop:'strings',pc:'#3ddc97',ex:'grumpy',quirk:'tail',rev:.1,
    play:mel(32,2,[[0,0],[1,0],[3,0],[4,0],[6,3,2],[8,0],[9,0],[11,0],[12,5,2],[14,3,2],[16,0],[17,0],[19,0],[20,0],[22,-2,2],[24,-1],[25,-1],[27,-1],[28,-1,2],[30,-1,2]],(t,o,f,d)=>V.gtr(t,o,f*2,d,.13,d<.24,1))},
   {id:'drone',name:'Tanpura Tabu',fur:'#efe2c8',mask:'#5a4032',iris:'#8fd3ff',y0:34,hw:28,er:10,tail:1,cloth:{c:'#7b3fa0',m:'bandhani'},acc:['bindi','jhumka'],prop:'strings',ex:'shy',quirk:'tilt',rev:.45,
    play:mel(32,3,[[0,-3,4],[4,0,4],[8,0,4],[12,-7,4],[16,-3,4],[20,0,4],[24,0,4],[28,-7,4]],(t,o,f,d)=>V.pluck(t,o,f,d*1.7,.24,'sawtooth',9))},
   {id:'sarangi',name:'Sarangi Saeen',fur:'#fbf6ee',fur2:'#e8833a',patch:'#e8833a',y0:48,hw:31,er:11,cloth:{c:'#8a5a3c',m:'vest'},acc:['pagri:#3ddc97'],prop:'strings',pc:'#5e3a22',ex:'shy',quirk:'tail',rev:.45,
    play:mel(32,3,[[2,4,4],[6,3,2],[8,2,6],[18,6,4],[22,4,2],[24,3,3],[27,2],[28,0,4]],(t,o,f,d,p)=>V.bow(t,o,f*2,d*.92,.17,p&&p*2))},
   {id:'organ',name:'Organ Aapa',fur:'#e6b3d6',fur2:'#c482b0',belly:'#f7e1ef',y0:42,hw:29,er:11,cloth:{c:'#262026',m:'sequin'},acc:['scarf:#3ddc97','specs'],prop:'keys',pc:'#262026',ex:'smug',quirk:'tilt',rev:.2,
    play:chords(32,4,[[2,[0,2,4],1],[6,[0,2,4],1],[10,[0,2,4],1],[14,[0,2,4],1],[18,[-2,0,2],1],[22,[-2,0,2],1],[26,[-1,1,3],1],[30,[-1,1,3],1]],(t,o,fs,d)=>fs.forEach(f=>V.lead(t,o,f,d*.9,.045)))},
   {id:'mast',name:'Mast Malang',fur:'#e8792e',fur2:'#b9541a',belly:'#f8d2a6',y0:30,hw:32,er:12,pat:'stripe',tail:1,acc:['longhair:#5a2a10','scarf:#e63946','chain2'],prop:'shaker',pc:'#3ddc97',ex:'manic',quirk:'hop',rev:.35,
    play:at(32,{4:ha,12:ha,20:ha,27:ha,28:(t,o)=>V.vox(t,o,294,.36,'a','o',.42,392)})},
   {id:'hum',name:'Humming Hamza',fur:'#4b5d7a',fur2:'#33415a',belly:'#8fa0bd',y0:54,hw:35,er:10.5,cloth:{c:'#3ddc97',m:'kurta'},acc:['scarf:#ffc21a'],ex:'shy',quirk:'tilt',rev:.5,
    play:mel(32,2,[[0,7,7.5],[8,7,7.5],[16,5,7.5],[24,6,7.5]],(t,o,f,d)=>V.vox(t,o,f,d,'m','o',.26))}
  ],
  combos:[
   {id:'dargah',need:['dholak','harm','alaap'],name:'Dargah Night',title:'DARGAH KI RAAT',sub:'Chiragh jal gaye. Sur lag gaya.',fx:'lamps'},
   {id:'rockq',need:['drums','riff','party'],name:'Rock Qawwali',title:'ROCK QAWWALI!',sub:'Taali bajao, amp phaad do.',fx:'fire'},
   {id:'stadium',need:['solo','bass','mast'],name:'Stadium Sufi',title:'STADIUM SUFI',sub:'Pachaas hazaar log. Ek billi.',fx:'paper'}
  ],
  bandA:['Dargah Road Cats','Mast Kalandar Meows','Sufi Whiskers','Malang Billis','Ishq Ke Panje','Fakir Felines'],
  bandB:['& The Amplifiers','Unplugged','Live At The Dargah','Qawwali Night','feat. Alaap Ali','Electric Mehfil']
};
