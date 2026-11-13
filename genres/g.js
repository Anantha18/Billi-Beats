// Goa Techno: four-on-the-floor at 128 BPM in A minor.
import {V,mkfq,drum,mel,chords,at} from '../js/engine.js';
const arp=[],sh=[[0,2,4,7],[0,2,4,7],[-2,0,2,5],[-3,-1,2,4]],ord=[0,1,2,3,2,1,2,3];
for(let s=0;s<32;s++)arp.push([s,sh[Math.floor(s/8)][ord[s%8]]]);
const acid=[[0,0],[1,0],[2,7],[3,0],[4,3],[5,0],[6,0],[7,10],[8,0],[9,0],[10,7],[11,0],[12,5],[13,0],[14,3],[15,7],[16,0],[17,0],[18,7],[19,0],[20,3],[21,0],[22,0],[23,12],[24,-2],[25,-2],[26,5],[27,-2],[28,3],[29,-2],[30,5],[31,7]];
let ai=0;
export default {
  key:'g',title:'Goa Techno',tag:'Four-on-the-floor · 128 BPM',blurb:'Beach, bass aur billi.',L:32,bar:16,sd:60/128/4,sw:0,fq:mkfq([0,2,3,5,7,8,10],7),
  theme:{bg:'goa',c1:'#00f0ff',c2:'#ff4fa3'},lead:['kick','acid','arp'],
  cats:[
   {id:'kick',name:'Glowstick Golu',fur:'#7d9cc4',fur2:'#5a7aa3',belly:'#c9d8ec',iris:'#b6f06a',y0:56,hw:37,er:13,cloth:{c:'#ff4fa3',m:'tiedye'},acc:['led'],prop:'glow',ex:'manic',quirk:'hop',rev:.04,
    play:drum('K...K...K...K...K...K...K...K.KK',{K:(t,o)=>V.kick(t,o,.95,160,48,.3)})},
   {id:'hat',name:'Hi-Hat Hema',fur:'#e6b3d6',fur2:'#c482b0',belly:'#f7e1ef',y0:40,hw:28,er:10.5,pat:'spot',tail:1,cloth:{c:'#12c2b0',m:'mesh'},acc:['headphones:#00f0ff'],prop:'manjira',ex:'smug',quirk:'tilt',rev:.1,
    play:drum('..o.C.o...o.C.o. ..o.C.o...o.C.oo',{o:(t,o)=>V.hiss(t,o,.3,.09),C:(t,o)=>V.clap(t,o,.5)})},
   {id:'acid',name:'Visor Vicky',fur:'#fbf6ee',fur2:'#e8833a',patch:'#2b2326',y0:30,hw:30,er:11,cloth:{c:'#b6ff3b',m:'mesh'},acc:['visor'],prop:'keys',ex:'happy',quirk:'tilt',rev:.12,
    play:mel(32,2,acid,(t,o,f,d)=>V.acid(t,o,f*2,d*.9,.26,(ai++)%3===2))},
   {id:'roll',name:'Bassline Bablu',fur:'#2b2630',ink:'#0c0a0c',iris:'#ff4fa3',lidc:'#2b2630',y0:54,hw:36,er:11,cloth:{c:'#7b5cff',m:'tiedye'},acc:['mohawk:#b6ff3b'],prop:'pads',ex:'grumpy',quirk:'yawn',rev:0,
    play:mel(32,2,[[2,0,2],[6,0,2],[10,0,2],[14,0,2],[18,-2,2],[22,-2,2],[26,-4,2],[30,-3,2]],(t,o,f,d)=>V.sub(t,o,f,d*.8,.62))},
   {id:'arp',name:'Neon Nimbu',fur:'#f6d046',fur2:'#d99a1f',y0:6,hw:22,er:9.5,pat:'stripe',tail:1,acc:['headphones','bandana'],prop:'vinyl',ex:'star',quirk:'tail',rev:.3,
    play:mel(32,4,arp,(t,o,f)=>V.pluck(t,o,f,.16,.15,'sawtooth',5))},
   {id:'stab',name:'Sunrise Simran',fur:'#fbf6ee',belly:'#fff',y0:36,hw:29,er:10.5,tail:1,cloth:{c:'#ff9a1f',m:'tiedye'},acc:['flower:#ff4fa3'],prop:'keys',pc:'#ff4fa3',ex:'sleepy',quirk:'tilt',rev:.4,
    play:chords(32,3,[[0,[0,2,4],3],[6,[0,2,4],2],[12,[0,2,4],2],[16,[-2,0,2],3],[22,[-2,0,2],2],[24,[-3,-1,1],3],[28,[-3,-1,2],3]],(t,o,fs,d)=>V.pad(t,o,fs,d,.085))},
   {id:'riser',name:'Riser Raja',fur:'#a2a7ad',fur2:'#62676e',y0:22,hw:26,er:11,pat:'stripe',acc:['led'],prop:'laser',ex:'manic',quirk:'hop',rev:.3,
    play:at(32,{0:(t,o)=>V.hiss(t,o,.3,.5),16:(t,o,sd)=>V.riser(t,o,.2,sd*15)})},
   {id:'meow',name:'Laser Lali',fur:'#efe2c8',mask:'#5a4032',iris:'#8fd3ff',y0:44,hw:27,er:10,tail:1,cloth:{c:'#ff4fa3',m:'sequin'},acc:['hearts'],prop:'mic',pc:'#00f0ff',ex:'star',quirk:'tail',rev:.45,
    play:at(32,{3:(t,o)=>V.meow(t,o,440,.24,.28),11:(t,o)=>V.meow(t,o,523,.24,.28),19:(t,o)=>V.meow(t,o,440,.24,.28),27:(t,o)=>V.meow(t,o,659,.2,.28),29:(t,o)=>V.meow(t,o,587,.3,.28)})}
  ],
  combos:[
   {id:'sunrise',need:['kick','arp','stab'],name:'Sunrise Set',title:'SUNRISE SET!',sub:'Subah ho gayi, billi abhi bhi naach rahi hai.',fx:'fire'},
   {id:'acid',need:['acid','hat','meow'],name:'Acid Billi',title:'ACID BILLI',sub:'Laser on. Whiskers up.',fx:'lamps'}
  ],
  bandA:['Anjuna Meows','Beach Shack Billis','Neon Whiskers','Full Moon Felines','Susegad Cats','Laser Paws'],
  bandB:['Sunrise Set','b2b Glowstick Golu','All Night Long','Live At The Shack','128 BPM Club','& The Glow Sticks']
};
