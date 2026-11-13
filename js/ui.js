// Genre picker, band stage, sound shelves, combos and sharing.
import {S,$,reduce,store,track,toast} from './state.js';
import {A,V,unlockAudio} from './engine.js';
import {play,pause,syncBuses,hooks,preview} from './sequencer.js';
import {catSVG,faceSVG,emptySVG,DEFS} from './cats.js';
import {backdrop} from './bg.js';
import {scene,SC} from './scenes.js';

export const GENRES=[
  {k:'r',title:'Gully Rap',tag:'Boom-bap · 90 BPM',bg:'gully'},
  {k:'g',title:'Goa Techno',tag:'Four-on-the-floor · 128 BPM',bg:'goa'},
  {k:'f',title:'Desi Folk',tag:'Dhol and dance · 104 BPM',bg:'folk'},
  {k:'d',title:'Retro Filmy',tag:'Disco · 116 BPM',bg:'retro'}
];
const SOON=['Sufi Rock','Carnatic Fusion','Indie Pop'];
const SHELF=['Beat','Bass','Tune','Voice'],SHEX=['#ff6a2b','#12c2b0','#ffc21a','#ff3d86'];
const EMPTY=()=>[-1,-1,-1,-1,-1,-1,-1];
const cache={};
let slotEls=[],adds=0,beatFlip=false;

export async function loadGenre(k){
  if(cache[k])return cache[k];
  const p=(await import(`../genres/${k}.js`)).default;
  p.cats.forEach((c,i)=>{c.i=i;c.g=Math.floor(i/2);});
  cache[k]=p;return p;
}
const hasGenre=k=>GENRES.some(g=>g.k===k);

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
  $('soon').innerHTML=SOON.map(t=>`<span class="pill">🔒 ${t}</span>`).join('');
}
function show(view){
  $('home').hidden=view!=='home';$('band').hidden=view!=='band';
  if(view==='home'){if(S.playing)pause();try{history.replaceState(null,'',location.pathname);}catch(e){}}
  window.scrollTo(0,0);
}

/* ---------- stage ---------- */
function buildStage(){
  const band=$('lineup');band.innerHTML='';slotEls=[];
  for(let i=0;i<7;i++){
    const d=document.createElement('div');d.className='slot';d.dataset.s=i;
    d.innerHTML=`<button class="who" id="who${i}"></button><button class="x" id="x${i}" aria-label="Remove">✕</button>`;
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
}
export function renderAll(){
  for(let i=0;i<7;i++)renderSlot(i);
  const empty=S.slots.every(x=>x<0);
  document.querySelectorAll('.chip').forEach(c=>{const i=+c.dataset.i;c.classList.toggle('on',S.slots.indexOf(i)>=0);c.classList.toggle('nudge',empty&&i===0);});
  $('hint').textContent=empty?`Start the band: tap ${S.pack.cats[0].name} below, then add more cats.`:'Tap a cat on stage to mute it. Two secret combos are hiding in this genre.';
  syncBuses();
}
function setSlot(i,idx){
  if(idx>=0){const prev=S.slots.indexOf(idx);if(prev>=0&&prev!==i){S.slots[prev]=-1;S.muted[prev]=0;}}
  S.slots[i]=idx;S.muted[i]=0;renderAll();checkCombos();
  if(idx>=0){adds++;if(adds===5)track('engaged_5_cats',{genre:S.pack.key},true);}
}
function toggleCat(idx){
  const at=S.slots.indexOf(idx);
  if(at>=0){setSlot(at,-1);return;}
  const free=S.slots.indexOf(-1);
  if(free<0){toast('The stage is full. Remove a cat first.');return;}
  setSlot(free,idx);
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
}
function initTray(){
  let drag=null,suppress=false;
  // Touch never starts a drag: swipes over the shelves must scroll the page.
  $('tray').addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;const c=e.target.closest('.chip');if(!c)return;drag={i:+c.dataset.i,x:e.clientX,y:e.clientY,id:e.pointerId,moved:false,ghost:null};});
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
  $('tray').addEventListener('click',e=>{const c=e.target.closest('.chip');if(!c||suppress)return;toggleCat(+c.dataset.i);});
}

/* ---------- combos ---------- */
function buildTrophies(){
  const p=S.pack,box=$('troph');box.innerHTML='';
  p.combos.forEach(cb=>{
    const has=!!S.got[p.key+cb.id],d=document.createElement('div');d.className='tro'+(has?' got':'');
    d.innerHTML=`<span class="faces">${cb.need.map(id=>faceSVG(p.cats.find(c=>c.id===id))).join('')}</span><span>${has?cb.name:'Secret combo'}</span>`;
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
  track('combo',{id:p.key+'-'+cb.id,first:S.got[k]?'no':'yes'});
  S.got[k]=1;store.set('bb-got',S.got);buildTrophies();
  const t=A.ac.currentTime+.05;[587.3,740,880,1174.7].forEach((f,i)=>V.bell(t+i*.09,A.master,f,.2,.9));
  V.meow(t+.4,A.master,700,.4,.25);
  $('bn1').textContent=cb.title;$('bn2').textContent=cb.sub;
  const b=$('banner');b.classList.remove('show');void b.offsetWidth;b.classList.add('show');
  const run=++SC.run;setTimeout(()=>{if(run===SC.run)b.classList.remove('show');},4200);
  const stg=$('stage');stg.classList.add('cheer');setTimeout(()=>stg.classList.remove('cheer'),2400);
  if(!reduce)scene(cb.fx,run);
}

/* ---------- share ---------- */
export const mixCode=()=>'mix-'+S.pack.key+'-'+S.slots.map(s=>s<0?'x':s.toString(36)).join('');
export function parseCode(str){const m=/mix-([a-z])-([0-9a-zx]{7})/i.exec(str||'');if(!m)return null;return {k:m[1].toLowerCase(),slots:m[2].toLowerCase().split('').map(ch=>ch==='x'?-1:parseInt(ch,36))};}
function bandName(){
  const p=S.pack;let h=S.nameSeed*131+7;S.slots.forEach((s,i)=>{h=(h*31+(s+2)*(i+3))>>>0;});
  return p.bandA[h%p.bandA.length]+' '+p.bandB[Math.floor(h/97)%p.bandB.length];
}
const mixUrl=()=>(/^https?:/.test(location.href)?location.origin+location.pathname:'')+'#'+mixCode();
function openShare(){
  if(S.slots.every(x=>x<0)){toast('Add a few cats first, then share.');return;}
  try{history.replaceState(null,'','#'+mixCode());}catch(e){}
  const p=S.pack;
  $('sharecats').innerHTML=S.slots.filter(s=>s>=0).map(s=>catSVG(p.cats[s])).join('');
  $('sharebg').innerHTML=backdrop(p.theme.bg);
  $('bandname').textContent=bandName();$('sharegenre').textContent=p.title;
  $('sheet').classList.add('show');$('closesheet').focus();track('share_open',{genre:p.key});
}
function initShare(){
  $('shr').addEventListener('click',openShare);
  $('closesheet').addEventListener('click',()=>$('sheet').classList.remove('show'));
  $('sheet').addEventListener('click',e=>{if(e.target===$('sheet'))$('sheet').classList.remove('show');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')$('sheet').classList.remove('show');});
  $('rename').addEventListener('click',()=>{S.nameSeed++;$('bandname').textContent=bandName();});
  $('copylink').addEventListener('click',()=>{
    const txt=`"${bandName()}" just dropped a ${S.pack.title} track on Billi Beats. Can your cats beat it? ${mixUrl()}`;
    (navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>{toast('Copied. Paste it anywhere.');track('link_copy',{genre:S.pack.key});}).catch(()=>toast('Copy is blocked here. Copy the address bar instead.'));
  });
}

/* ---------- genre and mix ---------- */
export async function openGenre(k,slots){
  if(S.playing)pause();
  const p=await loadGenre(k);S.pack=p;S.comboOn={};SC.run++;$('banner').classList.remove('show');
  S.slots=slots?slots.slice(0,7).map((s,i,a)=>(s>=0&&s<p.cats.length&&a.indexOf(s)===i)?s:-1):EMPTY();
  while(S.slots.length<7)S.slots.push(-1);S.muted=[0,0,0,0,0,0,0];
  const b=document.documentElement;b.style.setProperty('--g1',p.theme.c1);b.style.setProperty('--g2',p.theme.c2);
  $('gtitle').textContent=p.title;$('gtag').textContent=p.blurb;$('stagebg').innerHTML=backdrop(p.theme.bg);
  buildTray();buildTrophies();renderAll();show('band');
}
export async function loadMix(m){if(!m||!hasGenre(m.k))return false;await openGenre(m.k,m.slots);return true;}

export async function start(){
  document.body.insertAdjacentHTML('afterbegin',DEFS);
  buildStage();initTray();initShare();
  hooks.hit=i=>{const el=slotEls[i];el.classList.add('hit');clearTimeout(el._h);el._h=setTimeout(()=>el.classList.remove('hit'),120);};
  hooks.beat=()=>{beatFlip=!beatFlip;$('stage').classList.toggle('beat',beatFlip);};
  hooks.state=()=>{$('play').textContent=S.playing?'Ruko':'Bajao';$('play').setAttribute('aria-pressed',S.playing);};
  hooks.start=checkCombos;
  $('play').addEventListener('click',()=>{if(!S.playing&&S.slots.every(x=>x<0)){unlockAudio();toast('Pick a cat from the shelves below first.');return;}S.playing?pause():play();});
  $('clr').addEventListener('click',()=>{S.slots=EMPTY();S.muted=[0,0,0,0,0,0,0];renderAll();checkCombos();});
  $('shuf').addEventListener('click',()=>{
    const p=S.pack,pick=[];[0,1,2,3].forEach(g=>pick.push(g*2+Math.floor(Math.random()*2)));
    const rest=p.cats.map(c=>c.i).filter(i=>pick.indexOf(i)<0).sort(()=>Math.random()-.5);pick.push(rest[0],rest[1]);
    pick.sort(()=>Math.random()-.5);S.slots=EMPTY();pick.forEach((x,i)=>S.slots[i]=x);S.muted=[0,0,0,0,0,0,0];renderAll();
    if(!S.playing)play();else checkCombos();
  });
  $('back').addEventListener('click',()=>show('home'));
  window.addEventListener('hashchange',()=>{const m=parseCode(location.hash);if(m&&S.pack&&('mix-'+m.k+'-'+m.slots.map(s=>s<0?'x':s.toString(36)).join(''))!==mixCode())loadMix(m);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&S.playing)pause();});
  // Personality: every so often one cat on stage does its quirk, and cats blink at random.
  if(!reduce)setInterval(()=>{
    const on=slotEls.filter(e=>e.classList.contains('on')&&!e.classList.contains('muted'));if(!on.length)return;
    const e=on[Math.floor(Math.random()*on.length)];
    if(Math.random()<.5){e.classList.add('q');setTimeout(()=>e.classList.remove('q'),650);}
    else{e.classList.add('blk');setTimeout(()=>e.classList.remove('blk'),130);}
  },700);
  await buildHome();
  const m=parseCode(location.hash);
  if(m&&await loadMix(m))track('mix_load',{genre:m.k});else show('home');
}
