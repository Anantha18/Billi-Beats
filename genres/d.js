// Retro Filmy: disco at 116 BPM in E minor. Every tune here is original.
import {V,mkfq,drum,mel,chords,at,syl} from '../js/engine.js';
const roots=[0,0,0,0,-2,-2,-2,-2,-1,-1,-1,-1,0,0,0,0],oct=[];
for(let i=0;i<16;i++)oct.push([i*2,roots[i]+(i%2?7:0)]);
const aha=(t,o)=>{V.vox(t,o,330,.12,'a','a',.4);V.vox(t+.16,o,392,.22,'a','a',.4);};
export default {
  key:'d',trim:1.58,title:'Retro Filmy',tag:'Disco · 116 BPM',blurb:'Bell-bottom pehno, billi aa rahi hai.',L:32,bar:16,sd:60/116/4,sw:.06,fq:mkfq([0,2,3,5,7,8,10],2),
  theme:{bg:'retro',c1:'#ffd23f',c2:'#ff3d86'},lead:['disco','octave','brass'],
  cats:[
   {id:'disco',name:'Disco Deva',fur:'#f2a541',fur2:'#c9681c',y0:24,hw:29,er:10.5,tail:1,cloth:{c:'#fff',m:'suit',c2:'#ff3d86'},acc:['bouffant','aviators'],prop:'disco',ex:'cool',quirk:'tilt',rev:.08,
    play:drum('K.h.S.h.K.h.S.h. K.h.S.h.K.h.S.hh',{K:(t,o)=>V.kick(t,o,.9,150,50,.28),S:(t,o)=>{V.kick(t,o,.8,150,50,.28);V.snare(t,o,.5);},h:(t,o)=>V.hiss(t,o,.28,.07)})},
   {id:'bongo',name:'Bongo Babloo',fur:'#b9793f',fur2:'#8a5424',belly:'#e6c39a',y0:58,hw:34,er:11,pat:'stripe',cloth:{c:'#12c2b0',m:'vest'},acc:['sidepart'],prop:'drums',ex:'happy',quirk:'hop',rev:.12,
    play:drum('b.bB..b.B.b.bB.. b.bB..b.B.bbB.BB',{b:(t,o)=>V.na(t,o,.42,330,.1),B:(t,o)=>V.na(t,o,.46,440,.1)})},
   {id:'octave',name:'Bass Bunny',fur:'#c9a7d8',fur2:'#a37fb8',y0:8,hw:23,er:9.5,tail:1,cloth:{c:'#ff6a2b',m:'polka'},acc:['scarf:#ffd23f'],prop:'strings',pc:'#e63946',ex:'smug',quirk:'tail',rev:.05,
    play:mel(32,2,oct,(t,o,f)=>V.pluck(t,o,f,.2,.5,'sawtooth',4))},
   {id:'strings',name:'Violin Vimla',fur:'#efd9a8',fur2:'#c9a25e',belly:'#fbf0d6',y0:46,hw:28,er:10.5,cloth:{c:'#7b3fa0',m:'sequin'},acc:['bindi','flower:#fff'],prop:'strings',pc:'#5e3a22',ex:'shy',quirk:'tilt',rev:.5,
    play:chords(32,4,[[0,[0,2,4],7.5],[8,[-2,0,2],7.5],[16,[-1,1,3],7.5],[24,[0,2,4],7.5]],(t,o,fs,d)=>V.pad(t,o,fs,d,.06))},
   {id:'brass',name:'Trumpet Tony',fur:'#e8792e',fur2:'#b9541a',belly:'#f8d2a6',y0:50,hw:37,er:11.5,pat:'stripe',cloth:{c:'#b3274a',m:'suit',c2:'#ffd23f'},acc:['bowtie:#ffd23f'],prop:'horn',ex:'manic',quirk:'hop',rev:.25,
    play:mel(32,3,[[3,4],[4,4],[6,7,2],[11,2],[12,2],[14,5,2],[19,3],[20,3],[22,6,2],[27,4],[28,5],[29,6],[30,7,2]],(t,o,f,d)=>V.brass(t,o,f,d*.7,.26))},
   {id:'organ',name:'Organ Uncle',fur:'#a2a7ad',fur2:'#62676e',belly:'#e8eaec',y0:38,hw:31,er:10,cloth:{c:'#8a5a3c',m:'vest'},acc:['sidepart:#e8eaec','specs'],prop:'keys',pc:'#8a5a3c',ex:'grumpy',quirk:'yawn',rev:.25,
    play:mel(32,4,[[0,7,3],[4,6],[5,4,3],[8,5,3],[12,4],[13,2,3],[16,3,3],[20,4],[21,6,3],[24,4,2],[26,2,2],[28,0,4]],(t,o,f,d,p)=>V.lead(t,o,f,d*.85,.12,p))},
   {id:'lala',name:'La-La Leela',fur:'#fbf6ee',fur2:'#e8833a',patch:'#e8833a',y0:32,hw:28,er:11,tail:1,cloth:{c:'#ff3d86',m:'sequin'},acc:['bouffant','jhumka'],prop:'mic',pc:'#ffd23f',ex:'star',quirk:'tail',rev:.4,
    play:mel(32,3,[[0,4,2],[2,6,2],[4,7,4],[10,6],[11,4],[12,2,4],[16,3,2],[18,4,2],[20,6,4],[26,4],[27,2],[28,0,4]],(t,o,f,d)=>{V.cons(t,o,'d',.14);V.vox(t+.01,o,f,d*.9,'a','a',.3);})},
   {id:'hero',name:'Hero Heeralal',fur:'#262026',ink:'#0c0a0c',pat:'tux',iris:'#b6f06a',lidc:'#262026',y0:16,hw:27,er:10.5,tail:1,acc:['sidepart:#0c0a0c','collar'],prop:'rose',ex:'smug',quirk:'tilt',rev:.3,
    play:at(32,{7:aha,15:(t,o)=>V.whistle(t,o,1500,2400,.2),23:aha,30:(t,o)=>V.whistle(t,o,2400,1500,.28)})},
   {id:'tamb',name:'Tambourine Tina',fur:'#fbf6ee',fur2:'#c9a7d8',patch:'#c9a7d8',y0:44,hw:27,er:11,tail:1,cloth:{c:'#ffd23f',m:'polka'},acc:['longhair:#5a3520','flower:#ff3d86'],prop:'manjira',ex:'happy',quirk:'hop',rev:.15,
    play:drum('j.j.J.j.j.j.J.jj j.j.J.j.j.jjJ.jj',{j:(t,o)=>V.jing(t,o,.2,.06),J:(t,o)=>V.jing(t,o,.36,.12)})},
   {id:'taali',name:'Taali Tillu',fur:'#9aa0a8',fur2:'#6c727a',belly:'#d8dce2',y0:64,hw:31,er:11.5,pat:'stripe',cloth:{c:'#ff6a2b',m:'stripe',c2:'#ffd23f'},acc:['sidepart'],prop:'clap',ex:'star',quirk:'hop',rev:.2,
    play:drum('....c.......c.c. ....c.......cccc',{c:(t,o)=>V.clap(t,o,.9)})},
   {id:'synb',name:'Synth Sardar',fur:'#8a5a3c',fur2:'#5e3a22',belly:'#c79c7a',y0:40,hw:33,er:10.5,cloth:{c:'#7b3fa0',m:'suit',c2:'#ffd23f'},acc:['pagri:#ff3d86','aviators:#7b3fa0'],prop:'keys',pc:'#ff3d86',ex:'cool',quirk:'tilt',rev:.03,
    play:mel(32,2,[[0,0,1],[3,0,1],[6,0,2],[8,-2,1],[11,-2,1],[14,-2,2],[16,-1,1],[19,-1,1],[22,-1,2],[24,0,1],[27,0,1],[30,7,2]],(t,o,f,d)=>V.acid(t,o,f*2,d*.9+.06,.3,0))},
   {id:'walk',name:'Bass Dadu',fur:'#fbf6ee',belly:'#fff',y0:20,hw:27,er:9.5,cloth:{c:'#454a5c',m:'vest'},acc:['specs','bowtie:#e63946','moustache'],prop:'strings',pc:'#8a5424',ex:'sleepy',quirk:'yawn',rev:.08,
    play:mel(32,2,[[0,0,4],[4,4,4],[8,-2,4],[12,2,4],[16,-1,4],[20,3,4],[24,0,4],[28,-3,4]],(t,o,f,d)=>V.pluck(t,o,f,d*.8,.5,'sawtooth',7))},
   {id:'sitar',name:'Sitar Sundari',fur:'#efd9a8',fur2:'#c9a25e',y0:34,hw:27,er:11,pat:'stripe',tail:1,cloth:{c:'#12c2b0',m:'sequin'},acc:['bindi','jhumka','gajra'],prop:'strings',ex:'smug',quirk:'tail',rev:.4,
    play:mel(32,3,[[6,7],[7,6],[8,4,3],[14,2],[15,4,2],[22,6],[23,4],[24,3,3],[29,4],[30,7,2]],(t,o,f,d)=>{V.pluck(t,o,f,d+.3,.28,'sawtooth',8,-.03);V.pluck(t,o,f*2,d+.1,.06,'sawtooth',6);})},
   {id:'wah',name:'Wah-Wah Wahid',fur:'#262026',ink:'#0c0a0c',iris:'#ffd23f',lidc:'#262026',y0:12,hw:24,er:10.5,tail:1,cloth:{c:'#ff6a2b',m:'polka'},acc:['longhair:#0c0a0c','headband:#ffd23f'],prop:'strings',pc:'#e63946',ex:'smug',quirk:'tilt',rev:.12,
    play:mel(32,3,[[2,4],[3,4],[6,4],[10,2],[11,2],[14,2],[18,3],[19,3],[22,3],[26,4],[27,4],[30,4]],(t,o,f)=>V.twang(t,o,f,.09,.2,2400))},
   {id:'chorus',name:'Chorus Chachi',fur:'#e6b3d6',fur2:'#c482b0',belly:'#f7e1ef',y0:50,hw:34,er:11,cloth:{c:'#12a08a',m:'sequin'},acc:['bouffant','bindi','jhumka'],prop:'mic',ex:'happy',quirk:'tilt',rev:.45,
    play:(s,t,o,p)=>{const k=s%32;if(k%8)return 0;const r=[0,-2,-1,0][k/8];V.vox(t,o,p.fq(r+2,4),p.sd*3,'a','a',.16);V.vox(t,o,p.fq(r+4,4),p.sd*3,'a','a',.13);return 1;}},
   {id:'villain',name:'Villain Vicky',fur:'#4b5d7a',fur2:'#33415a',belly:'#8fa0bd',y0:30,hw:32,er:10.5,cloth:{c:'#262026',m:'suit',c2:'#e63946'},acc:['sidepart:#0c0a0c','moustache'],prop:'cup',pc:'#ffd23f',ex:'smug',quirk:'yawn',rev:.25,
    play:at(32,{12:(t,o)=>V.vox(t,o,123,.4,'m','m',.3),28:(t,o)=>V.vox(t,o,131,.1,'a','a',.4),29:(t,o)=>V.vox(t,o,123,.1,'a','a',.4),30:(t,o)=>V.vox(t,o,110,.12,'a','a',.4),31:(t,o)=>V.vox(t,o,98,.14,'a','a',.4)})}
  ],
  combos:[
   {id:'disco',need:['disco','octave','brass'],name:'Disco Raat',title:'DISCO RAAT!',sub:'Mirror ball ghoom raha hai.',fx:'paper'},
   {id:'dream',need:['strings','lala','organ'],name:'Dream Sequence',title:'DREAM SEQUENCE',sub:'Slow motion mein phool gir rahe hain.',fx:'bloom'},
   {id:'chase',need:['walk','wah','villain'],name:'Chase Scene',title:'CHASE SCENE!',sub:'Villain bhaag raha hai. Hero slow motion mein.',fx:'auto'}
  ],
  bandA:['Bell-Bottom Billis','Disco Whiskers','Matinee Meows','Golden Jubilee Cats','Interval Ke Baad','Single Screen Sitare'],
  bandB:['& The Mirror Balls','Silver Jubilee Hit','Houseful','Live On Stage','Ek Raat Ka Show','& Orchestra']
};
