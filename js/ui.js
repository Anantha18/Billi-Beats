// Genre picker, band stage, sound shelves, combos, voice cat, sharing, publishing and the chart.
import {S,$,reduce,store,track,trackHook,toast} from './state.js';
import {A,V,unlockAudio} from './engine.js';
import {play,pause,syncBuses,hooks,preview} from './sequencer.js';
import {catSVG,faceSVG,emptySVG,DEFS} from './cats.js';
import {backdrop} from './bg.js';
import {scene,SC} from './scenes.js';
import {net,api,ev} from './net.js';
import {VOICE_I,STYLES,hasVoice,voiceStyle,setStyle,canRecord,voiceCat,record,audition} from './voice.js';
import {storyCard} from './card.js';

export const GENRES=[
  {k:'r',title:'Gully Rap',tag:'Boom-bap · 90 BPM',bg:'gully'},
  {k:'g',title:'Goa Techno',tag:'Four-on-the-floor · 128 BPM',bg:'goa'},
  {k:'f',title:'Desi Folk',tag:'Dhol and dance · 104 BPM',bg:'folk'},
  {k:'d',title:'Retro Filmy',tag:'Disco · 116 BPM',bg:'retro'},
  {k:'s',title:'Sufi Rock',tag:'Qawwali meets guitar · 96 BPM',bg:'sufi'},
  {k:'c',title:'Carnatic Fusion',tag:'Kutcheri meets groove · 110 BPM',bg:'carnatic'},
  {k:'p',title:'Indie Pop',tag:'Rooftop gig · 100 BPM',bg:'indie'}
];
const SHELF=['Beat','Bass','Tune','Voice'],SHEX=['#ff6a2b','#12c2b0','#ffc21a','#ff3d86'];
const EMPTY=()=>[-1,-1,-1,-1,-1,-1,-1];
const cache={};
// Each string player gets a drawing of its own instrument.
const INST={'s.solo':'guitar','s.riff':'guitar','p.gtr':'guitar','d.wah':'guitar','s.bass':'guitar','p.bass':'guitar','c.bass':'guitar','d.octave':'guitar','p.uke':'guitar',
  'r.sitar':'sitar','d.sitar':'sitar','g.tara':'sitar','c.veena':'sitar','s.rubab':'sitar','c.tambura':'sitar','f.tanpura':'sitar','s.drone':'sitar',
  'c.violin':'violin','d.strings':'violin','f.sarangi':'violin','s.sarangi':'violin','p.cello':'upright','d.walk':'upright'};
let slotEls=[],adds=0,beatFlip=false,pub=null,heard=0,listenSent=false,nav=0;

export async function loadGenre(k){
  if(cache[k])return cache[k];
  const p=(await import(`../genres/${k}.js`)).default;
  // Cats 0-7 keep their original positions so old links still work; 8-15 are the second pair on each shelf.
  p.combos.forEach(cb=>{cb.hint='Try '+cb.need.map(id=>['beat','bass','tune','voice'][Math.floor((p.cats.findIndex(c=>c.id===id)%8)/2)]).join(' + ');});
  p.cats.forEach((c,i)=>{c.i=i;c.g=Math.floor((i%8)/2);if(INST[k+'.'+c.id])c.prop=INST[k+'.'+c.id];});
  // Keep heavy-lidded faces rare so most of the band looks lively: at most three per genre.
  let lidded=0;const lively=['happy','star','shy','manic'];
  p.cats.forEach((c,i)=>{if(['sleepy','grumpy','side'].indexOf(c.ex)>=0&&++lidded>3)c.ex=lively[i%4];});
  const v=voiceCat();v.i=VOICE_I;v.g=4;p.cats.push(v);
  cache[k]=p;return p;
}
const hasGenre=k=>GENRES.some(g=>g.k===k);
const fromCode=code=>code.split('').map(ch=>ch==='x'?-1:parseInt(ch,36));
const nameOf=(p,a,b)=>p.bandA[a%p.bandA.length]+' '+p.bandB[b%p.bandB.length];
const siteUrl=()=>/^https?:/.test(location.href)?location.origin+location.pathname:'';
const plural=n=>n===1?'1 listen':n.toLocaleString('en-IN')+' listens';

/* ---------- home ---------- */
async function buildHome(){
  const box=$('cards');box.innerHTML='';
  for(const g of GENRES){
    const p=await loadGenre(g.k);
    const b=document.createElement('button');b.className='card';b.id='card-'+g.k;b.style.setProperty('--g1',p.theme.c1);
    b.innerHTML=`${backdrop(g.bg)}<span class="trio">${p.lead.map(id=>catSVG(p.cats.find(c=>c.id===id))).join('')}</span><span class="lbl"><b>${g.title}</b><i>${g.tag}</i></span><span class="go" aria-hidden="true">▶</span>`;
    b.setAttribute('aria-label',g.title+'. '+g.tag);
    b.addEventListener('click',()=>{preview(p);track('genre_open',{genre:g.k});openGenre(g.k);});
    box.appendChild(b);
  }
}
function chartRows(items,showGenre){
  return items.map(it=>{const p=cache[it.g];if(!p)return '';
    const faces=fromCode(it.code).filter(i=>i>=0&&i<VOICE_I).slice(0,4).map(i=>faceSVG(p.cats[i])).join('');
    return `<button class="crow" data-id="${it.id}"><b class="rk">${it.rank}</b><span class="faces">${faces}</span><span class="cn"><b>${nameOf(p,it.a,it.b)}</b><i>${showGenre?p.title+' · ':''}${plural(it.w)} this week</i></span><span class="pl" aria-hidden="true">▶</span></button>`;}).join('');
}
async function loadHomeChart(){
  const r=await api('chart');const sec=$('homechart');
  if(!r){sec.hidden=true;return;}
  sec.hidden=false;
  const items=r.items.slice().sort((a,b)=>b.w-a.w).slice(0,8);
  $('homelist').innerHTML=items.length?chartRows(items,true):'<p class="emptyc">No bands on the chart yet. Build one, tap Share, then Publish. Yours could be the first.</p>';
}
function show(view){
  $('home').hidden=view!=='home';$('band').hidden=view!=='band';
  if(view==='home'){nav++;pub=null;if(S.playing)pause();try{history.replaceState(null,'',location.pathname);}catch(e){}loadHomeChart();}
  window.scrollTo(0,0);
}

/* ---------- stage ---------- */
function buildStage(){
  const band=$('lineup');band.innerHTML='';slotEls=[];
  for(let i=0;i<7;i++){
    const d=document.createElement('div');d.className='slot';d.dataset.s=i;
    d.innerHTML=`<button class="who" id="who${i}"></button><button class="x" id="x${i}" aria-label="Remove from stage">✕</button>`;
    band.appendChild(d);slotEls.push(d);
    d.querySelector('.who').addEventListener('click',()=>{
      if(S.slots[i]<0){unlockAudio();const c=document.querySelector('.chip.nudge')||document.querySelector('.chip:not(.on)');if(c)c.scrollIntoView({block:'center',behavior:'smooth'});return;}
      S.muted[i]=S.muted[i]?0:1;renderSlot(i);syncBuses();checkCombos();
    });
    d.querySelector('.x').addEventListener('click',()=>setSlot(i,-1));
  }
}
function renderSlot(i){
  const p=S.pack,el=slotEls[i],c=S.slots[i]>=0?p.cats[S.slots[i]]:null;
  el.classList.toggle('on',!!c);el.classList.toggle('muted',!!c&&!!S.muted[i]);
  const w=el.querySelector('.who');
  w.innerHTML=`<span class="bobw">${c?catSVG(c,S.muted[i]?'muted':'idle'):emptySVG()}</span><span class="nm">${c?c.name:''}</span>`;
  w.setAttribute('aria-label',c?(c.name+(S.muted[i]?', muted. Tap to unmute':'. Tap to mute')):'Empty spot');
  el.querySelector('.x').setAttribute('aria-label',c?'Remove '+c.name:'Remove');
}
export function renderAll(){
  for(let i=0;i<7;i++)renderSlot(i);
  const empty=S.slots.every(x=>x<0);
  document.querySelectorAll('.chip').forEach(c=>{const i=+c.dataset.i;c.classList.toggle('on',S.slots.indexOf(i)>=0);c.classList.toggle('nudge',empty&&i===0);});
  $('hint').textContent=empty?`Start the band: tap ${S.pack.cats[0].name} below, then add more cats.`:'Tap a cat on stage to mute it, then ✕ to send it off. Three secret combos are hiding here.';
  syncBuses();
}
function changed(){if(pub&&pub.code!==pubCode()){pub=null;renderPubBar();}}
function setSlot(i,idx){
  if(idx>=0){const prev=S.slots.indexOf(idx);if(prev>=0&&prev!==i){S.slots[prev]=-1;S.muted[prev]=0;}}
  S.slots[i]=idx;S.muted[i]=0;renderAll();checkCombos();changed();
  if(idx>=0){adds++;if(adds===5)track('engaged_5_cats',{genre:S.pack.key},true);}
}
function toggleCat(idx){
  const at=S.slots.indexOf(idx);
  if(at>=0){setSlot(at,-1);return;}
  if(idx===VOICE_I&&!hasVoice()){openRec();return;}
  const free=S.slots.indexOf(-1);
  if(free<0){toast('The stage is full. Remove a cat first.');return;}
  setSlot(free,idx);
  if(idx===VOICE_I)track('voice_use',{genre:S.pack.key},true);
  if(!S.playing)play();
}

/* ---------- shelves ---------- */
function buildTray(){
  const p=S.pack,tray=$('tray');tray.innerHTML='';
  SHELF.forEach((name,gi)=>{
    const sec=document.createElement('section');sec.className='grp';sec.style.setProperty('--c',SHEX[gi]);
    sec.innerHTML=`<h2>${name}</h2><div class="chips"></div>`;
    p.cats.filter(c=>c.g===gi).forEach(c=>{
      const b=document.createElement('button');b.className='chip';b.dataset.i=c.i;b.id='chip-'+p.key+'-'+c.id;
      b.innerHTML=faceSVG(c)+`<span>${c.name}</span>`;sec.querySelector('.chips').appendChild(b);
    });
    tray.appendChild(sec);
  });
  // The voice cat gets its own full-width shelf.
  const v=p.cats[VOICE_I],sec=document.createElement('section');sec.className='grp you';sec.style.setProperty('--c','#fff4dc');
  sec.innerHTML=`<h2>Your voice</h2><div class="yourow"><button class="chip" data-i="${VOICE_I}" id="chip-${p.key}-you">${faceSVG(v)}<span>${hasVoice()?v.name:'Record your voice'}</span></button>
    <div class="youside">${hasVoice()
      ?`<div class="pills" role="group" aria-label="Voice style">${STYLES.map(s=>`<button class="pillb" data-style="${s.k}" aria-pressed="${s.k===voiceStyle()}">${s.label}</button>`).join('')}</div><button class="btn sm" id="rerec">🎙 Record again</button>`
      :`<p>${canRecord()?'Say or sing anything for 2 seconds. It joins the band as a cat, on the beat.':'This browser cannot record. Open Billi Beats in Chrome or Safari to add your voice.'}</p>`}</div></div>`;
  tray.appendChild(sec);
}
function initTray(){
  let drag=null,suppress=false;
  // Touch never starts a drag: swipes over the shelves must scroll the page.
  $('tray').addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;const c=e.target.closest('.chip');if(!c)return;if(+c.dataset.i===VOICE_I&&!hasVoice())return;drag={i:+c.dataset.i,x:e.clientX,y:e.clientY,id:e.pointerId,moved:false,ghost:null};});
  window.addEventListener('pointermove',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    if(!drag.moved&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>12){drag.moved=true;const g=document.createElement('div');g.className='ghost';g.innerHTML=faceSVG(S.pack.cats[drag.i]);document.body.appendChild(g);drag.ghost=g;}
    if(drag.moved){drag.ghost.style.left=e.clientX+'px';drag.ghost.style.top=e.clientY+'px';
      const t=document.elementFromPoint(e.clientX,e.clientY),s=t&&t.closest('.slot');slotEls.forEach(el=>el.classList.toggle('drop',el===s));}
  });
  function endDrag(e){
    if(!drag||e.pointerId!==drag.id)return;
    if(drag.moved){
      const t=document.elementFromPoint(e.clientX,e.clientY),s=t&&t.closest('.slot');
      drag.ghost.remove();slotEls.forEach(el=>el.classList.remove('drop'));
      if(s){setSlot(+s.dataset.s,drag.i);if(!S.playing)play();}
      suppress=true;setTimeout(()=>{suppress=false;},60);
    }
    drag=null;
  }
  window.addEventListener('pointerup',endDrag);window.addEventListener('pointercancel',endDrag);
  $('tray').addEventListener('click',e=>{
    const st=e.target.closest('.pillb');
    if(st){setStyle(st.dataset.style);document.querySelectorAll('.pillb').forEach(b=>b.setAttribute('aria-pressed',b===st));if(S.slots.indexOf(VOICE_I)<0||!S.playing)audition();return;}
    if(e.target.closest('#rerec')){openRec();return;}
    const c=e.target.closest('.chip');if(!c||suppress)return;toggleCat(+c.dataset.i);
  });
}

/* ---------- voice recorder ---------- */
function openRec(){
  if(!canRecord()){toast('This browser cannot record. Try Chrome or Safari.');return;}
  if(S.playing)pause();
  $('recmsg').textContent='Say or sing anything for 2 seconds: a meow, "aye!", your name.';
  $('recgo').hidden=false;$('recgo').textContent='Start recording';$('recbar').style.width='0%';$('reclvl').style.transform='scaleX(0)';
  $('recsheet').classList.add('show');$('recgo').focus();
}
async function doRec(){
  $('recgo').hidden=true;$('recmsg').textContent='Recording… go!';
  let ok=false;
  try{ok=await record((lvl,prog)=>{$('recbar').style.width=(prog*100)+'%';$('reclvl').style.transform='scaleX('+Math.min(1,lvl*2.2)+')';});}
  catch(e){$('recmsg').textContent='The microphone is blocked. Allow it in your browser settings for this site, then try again.';$('recgo').hidden=false;$('recgo').textContent='Try again';return;}
  if(!ok){$('recmsg').textContent='That was too quiet to use. Hold the phone closer and try again.';$('recgo').hidden=false;$('recgo').textContent='Try again';$('recbar').style.width='0%';return;}
  track('voice_record',{genre:S.pack.key});
  $('recsheet').classList.remove('show');buildTray();renderAll();audition();
  setTimeout(()=>{if(S.slots.indexOf(VOICE_I)<0){const free=S.slots.indexOf(-1);if(free>=0){setSlot(free,VOICE_I);if(!S.playing)play();}}},900);
}

/* ---------- combos ---------- */
function buildTrophies(){
  const p=S.pack,box=$('troph');box.innerHTML='';
  p.combos.forEach(cb=>{
    const has=!!S.got[p.key+cb.id],d=document.createElement('div');d.className='tro'+(has?' got':'');
    d.innerHTML=has?`<span class="faces">${cb.need.map(id=>faceSVG(p.cats.find(c=>c.id===id))).join('')}</span><span>${cb.name}</span>`:`<span class="faces q"><i>?</i><i>?</i><i>?</i></span><span>${cb.hint||'Secret combo'}</span>`;
    d.setAttribute('aria-label',has?cb.name+', found':'Secret combo, not found yet');box.appendChild(d);
  });
}
function checkCombos(){
  if(!S.playing)return;
  const p=S.pack,live=S.slots.map((s,i)=>s>=0&&!S.muted[i]?p.cats[s].id:null);
  p.combos.forEach(cb=>{
    const ok=cb.need.every(id=>live.indexOf(id)>=0),k=p.key+cb.id;
    if(ok&&!S.comboOn[k]){S.comboOn[k]=1;fire(cb);}
    if(!ok)S.comboOn[k]=0;
  });
}
function fire(cb){
  const p=S.pack,k=p.key+cb.id;
  track('combo',{id:p.key+'-'+cb.id,first:S.got[k]?'no':'yes',genre:p.key});
  S.got[k]=1;store.set('bb-got',S.got);buildTrophies();
  const t=A.ac.currentTime+.05;[587.3,740,880,1174.7].forEach((f,i)=>V.bell(t+i*.09,A.master,f,.2,.9));
  V.meow(t+.4,A.master,700,.4,.25);
  $('bn1').textContent=cb.title;$('bn2').textContent=cb.sub;
  const b=$('banner');b.classList.remove('show');void b.offsetWidth;b.classList.add('show');
  const run=++SC.run;setTimeout(()=>{if(run===SC.run)b.classList.remove('show');},4200);
  const stg=$('stage');stg.classList.add('cheer');setTimeout(()=>stg.classList.remove('cheer'),2400);
  if(!reduce)scene(cb.fx,run);
}

/* ---------- share, publish, story card ---------- */
export const mixCode=()=>'mix-'+S.pack.key+'-'+S.slots.map(s=>s<0?'x':s.toString(36)).join('');
// What gets published: the line-up without the voice cat, which never leaves the phone.
const pubCode=()=>S.slots.map(s=>s<0||s===VOICE_I?'x':s.toString(36)).join('');
export function parseCode(str){const m=/mix-([a-z])-([0-9a-zx]{7})/i.exec(str||'');if(!m)return null;return {k:m[1].toLowerCase(),slots:fromCode(m[2].toLowerCase())};}
function nameIdx(){
  const p=S.pack;let h=S.nameSeed*131+7;S.slots.forEach((s,i)=>{h=(h*31+(s+2)*(i+3))>>>0;});
  return [h%p.bandA.length,Math.floor(h/97)%p.bandB.length];
}
const bandName=()=>pub?nameOf(S.pack,pub.a,pub.b):nameOf(S.pack,...nameIdx());
const shareUrl=()=>siteUrl()+'#'+(pub?'m-'+pub.id:mixCode());
function renderPubBar(){
  const el=$('pubbar');
  if(pub){el.innerHTML=`<b>On the chart.</b> ${pub.rank?'#'+pub.rank+' in '+S.pack.title+' this week · ':''}${plural(pub.n||0)}`;el.hidden=false;}
  else el.hidden=true;
}
function renderShare(){
  const p=S.pack;
  $('bandname').textContent=bandName();$('sharegenre').textContent=p.title;
  $('rename').hidden=!!pub;
  $('publish').hidden=!!pub||net.on===false||!siteUrl();
  $('story').hidden=!siteUrl();
  $('pubnote').textContent=pub?`${plural(pub.n||0)} so far. Every new phone that plays your link for 15 seconds counts once.`:
    (net.on===false||!siteUrl()?'The link opens this exact band for anyone you send it to.':'Publish puts this band on the weekly chart. Only the cats and the band name are saved.');
  renderPubBar();
}
function openShare(){
  if(S.slots.every(x=>x<0)){toast('Add a few cats first, then share.');return;}
  if(!pub)try{history.replaceState(null,'','#'+mixCode());}catch(e){}
  const p=S.pack;
  $('sharecats').innerHTML=S.slots.filter(s=>s>=0).map(s=>catSVG(p.cats[s])).join('');
  $('sharebg').innerHTML=backdrop(p.theme.bg);
  renderShare();
  $('sheet').classList.add('show');$('bandname').focus();track('share_open',{genre:p.key});
}
async function doPublish(){
  const code=pubCode();
  if(code.replace(/x/g,'').length<2){toast('A band needs at least two cats (not counting your voice).');return;}
  const [a,b]=nameIdx(),btn=$('publish'),g=S.pack.key,my=nav;btn.disabled=true;btn.textContent='Publishing…';
  const r=await api('publish',{g:g,code:code,a:a,b:b});
  btn.disabled=false;btn.textContent='Publish to chart';
  if(my!==nav||S.pack.key!==g||pubCode()!==code)return; // the band changed while publishing
  if(!r||!r.id){toast(net.on===false?'The chart is not open yet.':net.last===429?'Too many bands published from this network today. Try again tomorrow.':'Could not publish. Check your connection and try again.');renderShare();return;}
  const m=await api('mix?id='+r.id);
  if(my!==nav||S.pack.key!==g||pubCode()!==code)return;
  pub={id:r.id,code:code,a:m?m.a:a,b:m?m.b:b,n:m?m.n:0,rank:m?m.rank:null,mine:true};listenSent=true;
  try{history.replaceState(null,'','#m-'+pub.id);}catch(e){}
  track('publish',{genre:S.pack.key});renderShare();toast('Published. Share the link to collect listens.');
}
async function doStory(){
  const p=S.pack,btn=$('story');btn.disabled=true;btn.textContent='Drawing…';
  const line=pub?((pub.rank?'#'+pub.rank+' in '+p.title+' · ':'')+plural(pub.n||0)):'';
  const blob=await storyCard(p,S.slots.filter(s=>s>=0).map(s=>p.cats[s]),bandName(),line,shareUrl().replace(/^https?:\/\//,''));
  btn.disabled=false;btn.textContent='Story card';
  if(!blob){toast('Could not draw the card on this phone.');return;}
  track('story_card',{genre:p.key});
  const file=new File([blob],'billi-beats.png',{type:'image/png'});
  try{if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],text:`${bandName()} on Billi Beats ${shareUrl()}`});return;}}catch(e){if(e&&e.name==='AbortError')return;}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='billi-beats.png';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);
  toast('Saved the card. Post it to your story.');
}
function initShare(){
  $('shr').addEventListener('click',openShare);
  $('closesheet').addEventListener('click',()=>$('sheet').classList.remove('show'));
  document.querySelectorAll('.sheet').forEach(s=>s.addEventListener('click',e=>{if(e.target===s)s.classList.remove('show');}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.sheet').forEach(s=>s.classList.remove('show'));});
  $('rename').addEventListener('click',()=>{S.nameSeed++;$('bandname').textContent=bandName();});
  $('copylink').addEventListener('click',()=>{
    const txt=`"${bandName()}" just dropped a ${S.pack.title} track on Billi Beats. Can your cats beat it? ${shareUrl()}`;
    (navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>{toast('Copied. Paste it anywhere.');track('link_copy',{genre:S.pack.key});}).catch(()=>toast('Copy is blocked here. Copy the address bar instead.'));
  });
  $('publish').addEventListener('click',doPublish);
  $('story').addEventListener('click',doStory);
  $('recgo').addEventListener('click',doRec);
  $('reccancel').addEventListener('click',()=>$('recsheet').classList.remove('show'));
}

/* ---------- chart ---------- */
async function openChart(){
  const p=S.pack;$('charttitle').textContent=p.title+': top bands this week';
  $('chartlist').innerHTML='<p class="emptyc">Loading…</p>';$('chartsheet').classList.add('show');$('chartclose').focus();
  track('chart_open',{genre:p.key});
  const r=await api('chart?g='+p.key);
  $('chartlist').innerHTML=!r?'<p class="emptyc">The chart is not open yet. It will appear here soon.</p>':r.items.length?chartRows(r.items,false):'<p class="emptyc">No bands here yet this week. Build one, tap Share, then Publish.</p>';
}
async function openPublished(id){
  const my=++nav,m=await api('mix?id='+id);
  if(my!==nav)return true; // the player has moved on; ignore this late answer
  if(!m||!hasGenre(m.g))return false;
  await openGenre(m.g,fromCode(m.code));
  pub={id:m.id,code:m.code,a:m.a,b:m.b,n:m.n,rank:m.rank,ts:m.ts,tk:m.tk};heard=0;listenSent=false;
  try{history.replaceState(null,'','#m-'+m.id);}catch(e){}
  renderPubBar();$('hint').textContent=`You are listening to "${bandName()}". Tap Bajao to play it.`;
  track('mix_load',{genre:m.g});return true;
}

/* ---------- genre and mix ---------- */
export async function openGenre(k,slots){
  if(S.playing)pause();
  nav++;const p=await loadGenre(k);S.pack=p;S.comboOn={};SC.run++;$('banner').classList.remove('show');pub=null;
  S.slots=slots?slots.slice(0,7).map((s,i,a)=>(s>=0&&s<p.cats.length&&a.indexOf(s)===i&&(s!==VOICE_I||hasVoice()))?s:-1):EMPTY();
  while(S.slots.length<7)S.slots.push(-1);S.muted=[0,0,0,0,0,0,0];
  const b=document.documentElement;b.style.setProperty('--g1',p.theme.c1);b.style.setProperty('--g2',p.theme.c2);
  $('gtitle').textContent=p.title;$('gtag').textContent=p.blurb;$('stagebg').innerHTML=backdrop(p.theme.bg);
  buildTray();buildTrophies();renderAll();renderPubBar();show('band');
}
export async function loadMix(m){if(!m||!hasGenre(m.k))return false;await openGenre(m.k,m.slots);return true;}
async function route(){
  const h=location.hash,pm=/^#m-([a-z0-9]{6})$/.exec(h);
  if(pm){if(pub&&pub.id===pm[1]&&!$('band').hidden)return true;const ok=await openPublished(pm[1]);if(!ok)toast(net.on===false?'The chart is offline right now. Try the link again later.':'That band could not be found.');return ok;}
  const m=parseCode(h);
  if(m){if(S.pack&&!$('band').hidden&&('mix-'+m.k+'-'+m.slots.map(s=>s<0?'x':s.toString(36)).join(''))===mixCode())return true;if(await loadMix(m)){track('mix_load',{genre:m.k});return true;}}
  return false;
}

export async function start(){
  document.body.insertAdjacentHTML('afterbegin',DEFS);
  trackHook.fn=(n,d)=>ev(n,d&&d.genre);
  buildStage();initTray();initShare();
  hooks.hit=i=>{const el=slotEls[i];el.classList.add('hit');clearTimeout(el._h);el._h=setTimeout(()=>el.classList.remove('hit'),120);};
  hooks.beat=()=>{beatFlip=!beatFlip;$('stage').classList.toggle('beat',beatFlip);};
  hooks.state=()=>{$('play').textContent=S.playing?'Ruko':'Bajao';$('play').setAttribute('aria-pressed',S.playing);document.body.classList.toggle('playing',S.playing);};
  hooks.start=checkCombos;
  $('play').addEventListener('click',()=>{if(!S.playing&&S.slots.every(x=>x<0)){unlockAudio();toast('Pick a cat from the shelves below first.');return;}S.playing?pause():play();});
  $('clr').addEventListener('click',()=>{S.slots=EMPTY();S.muted=[0,0,0,0,0,0,0];renderAll();checkCombos();changed();});
  $('shuf').addEventListener('click',()=>{
    const all=S.pack.cats.filter(c=>c.i<VOICE_I),pick=[];[0,1,2,3].forEach(g=>{const sh=all.filter(c=>c.g===g);pick.push(sh[Math.floor(Math.random()*sh.length)].i);});
    const rest=all.map(c=>c.i).filter(i=>pick.indexOf(i)<0).sort(()=>Math.random()-.5);pick.push(rest[0],rest[1]);
    pick.sort(()=>Math.random()-.5);S.slots=EMPTY();pick.forEach((x,i)=>S.slots[i]=x);S.muted=[0,0,0,0,0,0,0];renderAll();changed();
    if(!S.playing)play();else checkCombos();
  });
  $('back').addEventListener('click',()=>show('home'));
  $('top10').addEventListener('click',openChart);
  $('chartclose').addEventListener('click',()=>$('chartsheet').classList.remove('show'));
  document.addEventListener('click',e=>{const r=e.target.closest('.crow');if(!r)return;$('chartsheet').classList.remove('show');unlockAudio();openPublished(r.dataset.id).then(ok=>{if(ok)play();else toast('That band could not be loaded.');});});
  window.addEventListener('hashchange',()=>{route();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&S.playing)pause();});
  // A listen counts once this phone has actually played a published band for 15 seconds.
  setInterval(()=>{
    if(!pub||pub.mine||listenSent||!S.playing||!A.ac||A.ac.state!=='running'||pub.code!==pubCode()||!S.slots.some((s,i)=>s>=0&&!S.muted[i]))return;
    if(++heard>=15){listenSent=true;api('listen',{id:pub.id,ts:pub.ts,tk:pub.tk}).then(r=>{if(r&&r.counted){pub.n=r.n;renderPubBar();}});}
  },1000);
  // Personality: every so often one cat on stage does its quirk, and cats blink at random.
  if(!reduce)setInterval(()=>{
    const on=slotEls.filter(e=>e.classList.contains('on')&&!e.classList.contains('muted'));if(!on.length)return;
    const e=on[Math.floor(Math.random()*on.length)];
    if(Math.random()<.5){e.classList.add('q');setTimeout(()=>e.classList.remove('q'),650);}
    else{e.classList.add('blk');setTimeout(()=>e.classList.remove('blk'),130);}
  },700);
  await buildHome();
  ev('visit');
  if(!(await route()))show('home');
}
