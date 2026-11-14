// Voice cat: record two seconds of the player's voice, pitch it into a cat voice and loop it on the beat.
// The recording lives only in this page's memory. It is never uploaded and is gone on reload.
import {A,unlockAudio} from './engine.js';
export const VOICE_I=16;
export const STYLES=[{k:'kitten',label:'Kitten',rate:1.55},{k:'billa',label:'Billa',rate:.72},{k:'robo',label:'Robo',rate:1}];
const V={buf:null,style:'kitten'};
export const hasVoice=()=>!!V.buf;
export const voiceStyle=()=>V.style;
export const setStyle=k=>{V.style=k;};
export const canRecord=()=>!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia);

function shot(t,o,dur,vol){
  const ac=A.ac,st=STYLES.find(s=>s.k===V.style)||STYLES[0],src=ac.createBufferSource();
  src.buffer=V.buf;src.playbackRate.value=st.rate;
  const len=Math.min(dur,V.buf.duration/st.rate),g=ac.createGain();
  g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+.008);g.gain.setValueAtTime(vol,t+Math.max(.01,len-.03));g.gain.linearRampToValueAtTime(.0001,t+len);
  src.connect(g);
  if(st.k==='robo'){const ring=ac.createGain(),os=ac.createOscillator(),d=ac.createGain();ring.gain.value=.5;os.type='square';os.frequency.value=62;d.gain.value=.5;os.connect(d);d.connect(ring.gain);os.start(t);os.stop(t+len+.05);g.connect(ring);ring.connect(o);}
  else g.connect(o);
  src.start(t);src.stop(t+len+.02);
}
// The whole clip lands on the first beat of each bar pair; short stutters of its opening lead into the turnaround.
function play(s,t,o,p){
  if(!V.buf)return 0;
  const L=p.L,h=L/2,k=s%L;
  if(k===0||k===h){shot(t,o,p.sd*(h-5),.85);return 1;}
  if(k===h-4||k===h-2||k===L-4||k===L-2){shot(t,o,p.sd*1.6,.7);return 1;}
  return 0;
}
export const voiceCat=()=>({id:'you',name:'Your Billi',fur:'#fffaf2',fur2:'#ff9ecb',patch:'#ff9ecb',y0:42,hw:30,er:12,tail:1,acc:['headphones:#ffc21a'],prop:'mic',pc:'#ff3d86',ex:'star',quirk:'hop',rev:.2,play:play,voice:1});

// Records raw audio for up to 2.2 seconds, trims the silence at both ends and evens out the volume.
export async function record(onLevel){
  unlockAudio();const ac=A.ac;
  const stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
  const src=ac.createMediaStreamSource(stream),proc=ac.createScriptProcessor(4096,1,1),mute=ac.createGain(),chunks=[],max=Math.floor(ac.sampleRate*2.2);
  let n=0;mute.gain.value=0;
  return new Promise(resolve=>{
    function finish(){
      proc.onaudioprocess=null;try{src.disconnect();proc.disconnect();mute.disconnect();}catch(e){}
      stream.getTracks().forEach(t=>t.stop());
      const all=new Float32Array(n);let o=0;chunks.forEach(c=>{all.set(c,o);o+=c.length;});
      let peak=0;for(let i=0;i<n;i++){const a=Math.abs(all[i]);if(a>peak)peak=a;}
      if(peak<.02){resolve(false);return;}
      const th=peak*.12;let a=0,b=n-1;while(a<n&&Math.abs(all[a])<th)a++;while(b>a&&Math.abs(all[b])<th)b--;
      a=Math.max(0,a-Math.floor(ac.sampleRate*.02));b=Math.min(n-1,b+Math.floor(ac.sampleRate*.08));
      const len=b-a+1;if(len<ac.sampleRate*.08){resolve(false);return;}
      const buf=ac.createBuffer(1,len,ac.sampleRate),d=buf.getChannelData(0),gain=.9/peak,fade=Math.floor(ac.sampleRate*.006);
      for(let i=0;i<len;i++){let v=all[a+i]*gain;if(i<fade)v*=i/fade;if(i>len-fade)v*=(len-i)/fade;d[i]=v;}
      V.buf=buf;resolve(true);
    }
    proc.onaudioprocess=e=>{
      const d=e.inputBuffer.getChannelData(0);chunks.push(new Float32Array(d));n+=d.length;
      if(onLevel){let m=0;for(let i=0;i<d.length;i+=16){const a=Math.abs(d[i]);if(a>m)m=a;}onLevel(m,Math.min(1,n/max));}
      if(n>=max)finish();
    };
    src.connect(proc);proc.connect(mute);mute.connect(ac.destination);
  });
}
// Plays the clip once in the chosen style, so the player hears their cat voice before adding it.
export function audition(){if(!V.buf)return;unlockAudio();shot(A.ac.currentTime+.05,A.master,2.4,.85);}
