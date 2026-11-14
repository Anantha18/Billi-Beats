// Indie Pop: 100 BPM in C major, on a I–V–vi–IV loop. Every tune here is original.
import {V,mkfq,drum,mel,chords,at,syl} from '../js/engine.js';
const R=[0,4,5,3];           // chord roots, one per half bar
const tri=r=>[r,r+2,r+4];
const bass=[],uke=[],pick=[],pad=[];
R.forEach((r,i)=>{const s=i*8;bass.push([s,r,3],[s+3,r,1],[s+6,r+4,2]);pad.push([s,tri(r),7.6]);
  [0,2,3,5,6,7].forEach(x=>uke.push([s+x,tri(r+7),.9]));
  [r,r+4,r+7,r+9,r+7,r+4,r+9,r+7].forEach((d,k)=>pick.push([s+k,d]));});
const hey=(t,o,f)=>{V.cons(t,o,'h',.3);V.vox(t+.02,o,f,.2,'e','i',.4,f*1.06);};
export default {
  key:'p',title:'Indie Pop',tag:'Rooftop gig · 100 BPM',blurb:'Chai, chhat aur ek billi ka gaana.',L:32,bar:16,sd:60/100/4,sw:.1,fq:mkfq([0,2,4,5,7,9,11],-2),
  theme:{bg:'indie',c1:'#ff8fab',c2:'#7b5cff'},lead:['soft','uke','lala'],
  cats:[
   {id:'soft',name:'Lo-Fi Lalu',fur:'#9aa0a8',fur2:'#6c727a',belly:'#d8dce2',y0:52,hw:35,er:11,pat:'stripe',cloth:{c:'#7b5cff',m:'hoodie'},acc:['headphones:#ff8fab'],prop:'pads',ex:'sleepy',quirk:'yawn',rev:.1,
    play:drum('K.....r.K.K...r. K.....r.K.K..rr.',{K:(t,o)=>V.kick(t,o,.8,120,46,.3),r:(t,o)=>V.wood(t,o,.36,900)})},
   {id:'snap',name:'Snap Sneha',fur:'#efd9a8',fur2:'#c9a25e',belly:'#fbf0d6',y0:36,hw:27,er:11,tail:1,cloth:{c:'#ff8fab',m:'stripe',c2:'#fff'},acc:['specs','flower:#7b5cff'],prop:'clap',ex:'smug',quirk:'tilt',rev:.2,
    play:drum('h.h.s.h.h.h.s.h. h.h.s.h.h.h.s.hh',{h:(t,o)=>V.hiss(t,o,.13,.03),s:(t,o)=>V.snap(t,o,.9)})},
   {id:'bass',name:'Bass Bittu',fur:'#e8792e',fur2:'#b9541a',belly:'#f8d2a6',y0:16,hw:25,er:10.5,pat:'stripe',tail:1,cloth:{c:'#12c2b0',m:'stripe',c2:'#fff'},acc:['beanie:#7b5cff'],prop:'strings',pc:'#ff8fab',ex:'happy',quirk:'tail',rev:.04,
    play:mel(32,2,bass,(t,o,f,d)=>V.pluck(t,o,f*2,d*.8+.05,.5,'triangle',4))},
   {id:'pad',name:'Dreamy Diya',fur:'#c9a7d8',fur2:'#a37fb8',belly:'#efe2f5',y0:44,hw:29,er:11.5,cloth:{c:'#ff8fab',m:'sequin'},acc:['crown'],prop:'keys',pc:'#7b5cff',ex:'shy',quirk:'tilt',rev:.5,
    play:chords(32,3,pad,(t,o,fs,d)=>V.pad(t,o,fs.map(f=>f*2),d,.05))},
   {id:'uke',name:'Ukulele Uma',fur:'#fbf6ee',fur2:'#f2a541',patch:'#f2a541',y0:58,hw:28,er:11.5,tail:1,cloth:{c:'#ffd23f',m:'polka'},acc:['flower:#ff8fab'],prop:'strings',pc:'#e6c39a',ex:'star',quirk:'hop',rev:.2,
    play:chords(32,3,uke,(t,o,fs)=>fs.forEach((f,i)=>V.pluck(t+i*.012,o,f,.22,.1,'triangle',6)))},
   {id:'keys',name:'Rhodes Rohan',fur:'#4b5d7a',fur2:'#33415a',belly:'#8fa0bd',y0:30,hw:31,er:10.5,cloth:{c:'#fff4dc',m:'vest'},acc:['specs','sidepart'],prop:'keys',pc:'#b3274a',ex:'smug',quirk:'tilt',rev:.35,
    play:mel(32,4,[[0,2,2],[3,4],[4,7,3],[8,4,2],[11,6],[12,8,3],[16,5,2],[19,7],[20,9,3],[24,3,2],[27,5],[28,7,2],[30,5,2]],(t,o,f,d)=>V.ep(t,o,f,d*.8,.17))},
   {id:'ooh',name:'Ooh-Ooh Ojas',fur:'#b9793f',fur2:'#8a5424',belly:'#e6c39a',y0:40,hw:32,er:11,pat:'stripe',cloth:{c:'#7b5cff',m:'stripe',c2:'#ff8fab'},acc:['beanie:#ffd23f'],prop:'cup',ex:'sleepy',quirk:'tilt',rev:.5,
    play:mel(32,4,[[0,4,7],[8,4,7],[16,2,7],[24,3,7]],(t,o,f,d)=>V.vox(t,o,f,d,'u','o',.17))},
   {id:'lala',name:'La-La Lavanya',fur:'#fbf6ee',belly:'#fff',y0:28,hw:28,er:11.5,tail:1,cloth:{c:'#ff8fab',m:'polka'},acc:['crown','jhumka'],prop:'mic',pc:'#7b5cff',ex:'star',quirk:'tail',rev:.4,
    play:mel(32,4,[[0,4,2],[2,4],[3,2,2],[6,0,2],[8,1,2],[10,1],[11,-1,3],[16,2,2],[18,2],[19,0,2],[22,-2,2],[24,0,2],[26,1],[27,2,2],[30,4,2]],(t,o,f,d)=>{V.cons(t,o,'d',.12);V.vox(t+.01,o,f,d*.9,'a','a',.27);})},
   {id:'cajon',name:'Cajon Kabir',fur:'#8a5a3c',fur2:'#5e3a22',belly:'#c79c7a',y0:60,hw:36,er:11,pat:'stripe',cloth:{c:'#12c2b0',m:'check'},acc:['headband:#ffd23f'],prop:'drums',pc:'#c79c7a',ex:'happy',quirk:'hop',rev:.1,
    play:drum('K..t..K.t..K..t. K..t..K.t..K.ttt',{K:(t,o)=>V.kick(t,o,.75,130,55,.22),t:(t,o)=>V.tak(t,o,.4,700,.05)})},
   {id:'shaker',name:'Shaker Shreya',fur:'#f6d046',fur2:'#d99a1f',belly:'#fff0b8',y0:66,hw:27,er:11.5,pat:'stripe',tail:1,acc:['crown'],prop:'shaker',pc:'#ff8fab',ex:'star',quirk:'hop',rev:.1,
    play:drum('sSsSsSsSsSsSsSsS sSsSsSsSsSsSsSsS',{s:(t,o)=>V.shk(t,o,.13,.05),S:(t,o)=>V.shk(t,o,.22,.06)})},
   {id:'sub',name:'Sub Simmi',fur:'#262026',ink:'#0c0a0c',iris:'#ff8fab',lidc:'#262026',y0:48,hw:33,er:11.5,cloth:{c:'#ff8fab',m:'hoodie'},acc:['cap:#7b5cff'],prop:'boombox',ex:'side',quirk:'tilt',rev:0,
    play:mel(32,2,R.map((r,i)=>[i*8,r,7.5]),(t,o,f,d)=>V.sub(t,o,f*2,d*.95,.5))},
   {id:'cello',name:'Cello Charu',fur:'#efe2c8',mask:'#5a4032',iris:'#8fd3ff',y0:22,hw:27,er:10,tail:1,cloth:{c:'#b3274a',m:'vest'},acc:['specs','bowtie:#ff8fab'],prop:'strings',pc:'#8a3a1c',ex:'grumpy',quirk:'tail',rev:.4,
    play:mel(32,3,[[0,0,4],[4,2,4],[8,4,4],[12,1,4],[16,5,4],[20,4,4],[24,3,4],[28,1,4]],(t,o,f,d,p)=>V.bow(t,o,f,d*.95,.17,p))},
   {id:'gtr',name:'Guitar Gauri',fur:'#f2a541',fur2:'#c9681c',y0:12,hw:24,er:10.5,pat:'stripe',tail:1,cloth:{c:'#7b5cff',m:'check'},acc:['longhair:#5a2a10','flower:#fff'],prop:'strings',pc:'#c9a25e',ex:'happy',quirk:'tilt',rev:.3,
    play:mel(32,3,pick,(t,o,f)=>V.pluck(t,o,f,.34,.17,'triangle',7))},
   {id:'seeti',name:'Seeti Sameer',fur:'#bfc6cf',fur2:'#7d8590',belly:'#e8eaec',y0:38,hw:29,er:11,pat:'stripe',cloth:{c:'#ffd23f',m:'stripe',c2:'#7b5cff'},acc:['bucket:#ff8fab'],prop:'cup',pc:'#7b5cff',ex:'smug',quirk:'tail',rev:.4,
    play:mel(32,5,[[0,4,2],[2,2],[3,0,3],[8,1,2],[10,2],[11,4,3],[16,2,2],[18,0],[19,-2,3],[24,0,2],[26,1],[27,2,2],[30,4,2]],(t,o,f,d,p)=>V.flute(t,o,f,d*.85,.13,p))},
   {id:'hey',name:'Hey-Ho Harsh',fur:'#e6b3d6',fur2:'#c482b0',belly:'#f7e1ef',y0:54,hw:34,er:12,cloth:{c:'#12c2b0',m:'hoodie'},acc:['beanie:#ff8fab'],prop:'clap',ex:'manic',quirk:'hop',rev:.35,
    play:at(32,{4:(t,o)=>hey(t,o,330),12:(t,o)=>{V.cons(t,o,'h',.3);V.vox(t+.02,o,262,.2,'o','o',.4);},20:(t,o)=>hey(t,o,330),28:(t,o)=>{V.cons(t,o,'h',.3);V.vox(t+.02,o,262,.2,'o','o',.4);},30:(t,o)=>V.clap(t,o,.4)})},
   {id:'hum',name:'Humsafar Hari',fur:'#fbf6ee',fur2:'#62676e',patch:'#62676e',y0:32,hw:30,er:10.5,tail:1,cloth:{c:'#fff4dc',m:'stripe',c2:'#12c2b0'},acc:['scarf:#ff8fab'],ex:'sleepy',quirk:'yawn',rev:.5,
    play:mel(32,3,[[0,2,3],[4,4,3],[8,1,3],[12,4,3],[16,2,3],[20,5,3],[24,3,3],[28,1,3]],(t,o,f,d)=>V.vox(t,o,f,d*.95,'m','m',.22))}
  ],
  combos:[
   {id:'cafe',need:['uke','snap','lala'],name:'Cafe Gig',title:'CAFE GIG',sub:'Open mic night. Chai pe taali.',fx:'bloom'},
   {id:'sunset',need:['pad','keys','ooh'],name:'Rooftop Sunset',title:'ROOFTOP SUNSET',sub:'Chhat pe shaam. Fairy lights on.',fx:'lamps'},
   {id:'trip',need:['cajon','gtr','hey'],name:'Road Trip',title:'ROAD TRIP!',sub:'Khidki khol, gaana baja.',fx:'kites'}
  ],
  bandA:['Chhat Pe Cats','Fairy Light Felines','Monsoon Meows','Hostel Room Billis','Sunday Whiskers','Cutting Chai Club'],
  bandB:['Bedroom Sessions','Unplugged','Live On The Terrace','feat. Ukulele Uma','First EP','& Friends']
};
