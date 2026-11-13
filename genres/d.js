// Retro Filmy: disco at 116 BPM in E minor. Every tune here is original.
import {V,mkfq,drum,mel,chords,at} from '../js/engine.js';
const roots=[0,0,0,0,-2,-2,-2,-2,-1,-1,-1,-1,0,0,0,0],oct=[];
for(let i=0;i<16;i++)oct.push([i*2,roots[i]+(i%2?7:0)]);
const aha=(t,o)=>{V.vox(t,o,330,.12,'a','a',.4);V.vox(t+.16,o,415,.22,'a','a',.4,392);};
export default {
  key:'d',title:'Retro Filmy',tag:'Disco · 116 BPM',blurb:'Bell-bottom pehno, billi aa rahi hai.',L:32,bar:16,sd:60/116/4,sw:.06,fq:mkfq([0,2,3,5,7,8,10],2),
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
    play:at(32,{7:aha,15:(t,o)=>V.whistle(t,o,1500,2400,.2),23:aha,30:(t,o)=>V.whistle(t,o,2400,1500,.28)})}
  ],
  combos:[
   {id:'disco',need:['disco','octave','brass'],name:'Disco Raat',title:'DISCO RAAT!',sub:'Mirror ball ghoom raha hai.',fx:'paper'},
   {id:'dream',need:['strings','lala','organ'],name:'Dream Sequence',title:'DREAM SEQUENCE',sub:'Slow motion mein phool gir rahe hain.',fx:'bloom'}
  ],
  bandA:['Bell-Bottom Billis','Disco Whiskers','Matinee Meows','Golden Jubilee Cats','Interval Ke Baad','Single Screen Sitare'],
  bandB:['& The Mirror Balls','Silver Jubilee Hit','Houseful','Live On Stage','Ek Raat Ka Show','& Orchestra']
};
