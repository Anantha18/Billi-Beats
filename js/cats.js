// Cat character kit. Every cat is data: fur, shape, expression, quirk, clothes, accessories and a prop.
// catSVG(c,state) draws the full cat for the stage; faceSVG(c) crops to the head for buttons.
const INK='#2b1d17';
let uid=0;
export const DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
 <filter id="tex" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="w"/><feDisplacementMap in="SourceGraphic" in2="w" scale="2" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="3" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 .1  0 0 0 0 .06  0 0 0 0 .05  0 0 0 .5 -.18" result="gc"/><feComposite in="gc" in2="d" operator="in" result="gi"/><feMerge><feMergeNode in="d"/><feMergeNode in="gi"/></feMerge></filter>
 <filter id="glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs></svg>`;

// Expressions: eyelid cover, pupil size, gaze, brows, mouth, blush.
const EX={
  happy:{pup:.42,mouth:'w'},
  side:{lid:.42,look:[.6,.05],mouth:'flat'},
  smug:{wink:1,lid:.16,look:[.3,0],mouth:'smirk',brow:'one'},
  star:{pup:.56,star:1,mouth:'smile'},
  grumpy:{lid:.22,brow:'angry',mouth:'frown',look:[0,.15]},
  shy:{look:[-.2,.5],blush:1,mouth:'small',pup:.46},
  manic:{pup:.2,uneven:1,mouth:'grin'},
  sleepy:{lid:.6,look:[0,.35],mouth:'flat'},
  cool:{mouth:'smirk',pup:.42}
};

function geom(o){
  const cx=50,y0=o.y0,hw=o.hw,er=o.er,ex=Math.round(hw*.42),ey=y0+26,ny=ey+er+5,cy=ny+16,py=Math.min(cy+28,132);
  return {cx,y0,hw,er,ex,ey,ny,cy,py,ink:o.ink||INK,o,id:'k'+(uid++)};
}
const bodyPath=({cx,y0,hw})=>`M${cx-hw},152 C${cx-hw-4},122 ${cx-hw+2},${y0+44} ${cx-hw+4},${y0+18} L${cx-hw+2},${y0-8} L${cx-hw+18},${y0+5} Q${cx},${y0} ${cx+hw-18},${y0+5} L${cx+hw-2},${y0-8} L${cx+hw-4},${y0+18} C${cx+hw-2},${y0+44} ${cx+hw+4},122 ${cx+hw},152 Q${cx},157 ${cx-hw},152 Z`;

export function emptySVG(){
  const C=geom({y0:40,hw:30,er:10});
  return `<svg viewBox="-8 -30 116 192" aria-hidden="true"><path d="${bodyPath(C)}" fill="rgba(255,244,220,.07)" stroke="#fff4dc" stroke-opacity=".55" stroke-width="2.4" stroke-dasharray="6 5" stroke-linejoin="round"/><circle cx="50" cy="104" r="13" fill="#fff4dc"/><path d="M50 97v14M43 104h14" stroke="#170e33" stroke-width="3.4" stroke-linecap="round"/></svg>`;
}
export function faceSVG(o){
  const C=geom(o),h=C.er+100,w=2*C.hw+26,s=Math.max(w,h);
  return inner(o,'idle',C,`${50-s/2} ${C.y0-46-(s-h)/2} ${s} ${s}`,true);
}
export function catSVG(o,st){return inner(o,st||'idle',geom(o),'-8 -30 116 192',false);}

function inner(o,st,C,vb,faceOnly){
  const {cx,y0,hw,er,ey,cy,ink,id}=C,body=bodyPath(C),E=EX[o.ex]||EX.happy;
  let s=`<svg viewBox="${vb}" class="cs q-${o.quirk||'tail'}" aria-hidden="true"><defs><clipPath id="${id}c"><path d="${body}"/></clipPath>${patDefs(C)}</defs><g class="tx"><g class="bob"><g class="body">`;
  if(o.tail&&!faceOnly) s+=`<g class="tail"><path d="M${cx+hw-6},146 C${cx+hw+20},146 ${cx+hw+26},110 ${cx+hw+12},96" fill="none" stroke="${ink}" stroke-width="10" stroke-linecap="round"/><path d="M${cx+hw-6},146 C${cx+hw+20},146 ${cx+hw+26},110 ${cx+hw+12},96" fill="none" stroke="${o.fur}" stroke-width="6" stroke-linecap="round"/></g>`;
  if(lum(o.fur)<.2) s+=`<path d="${body}" fill="none" stroke="#fff4dc" stroke-width="6" stroke-linejoin="round" opacity=".85"/>`;
  s+=`<path d="${body}" fill="${o.fur}"/><g clip-path="url(#${id}c)">`;
  if(o.belly) s+=`<ellipse cx="${cx}" cy="${Math.max(cy+30,118)}" rx="${hw*.58}" ry="34" fill="${o.belly}"/>`;
  if(o.pat==='stripe'){for(let k=0;k<4;k++){const y=y0+58+k*15;s+=`<path d="M${cx-hw-2},${y} q11,2 15,-3 M${cx+hw+2},${y} q-11,2 -15,-3" stroke="${o.fur2}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;}
    s+=`<path d="M${cx-6},${y0+6} v7 M${cx},${y0+4} v9 M${cx+6},${y0+6} v7" stroke="${o.fur2}" stroke-width="2.6" stroke-linecap="round"/>`;}
  if(o.pat==='spot')[[-.6,70],[.55,82],[-.3,104],[.65,118],[-.7,128]].forEach(p=>s+=`<ellipse cx="${cx+p[0]*hw}" cy="${y0+p[1]*.7+20}" rx="5" ry="4" fill="${o.fur2}"/>`);
  if(o.pat==='tux') s+=`<path d="M${cx-hw*.5},${cy-2} Q${cx},${cy+60} ${cx+hw*.5},${cy-2} Z" fill="#fff"/><ellipse cx="${cx}" cy="${ey+er+10}" rx="${hw*.5}" ry="12" fill="#fff"/>`;
  if(o.patch) s+=`<path d="M${cx+hw*.1},${y0-12} Q${cx+hw+6},${y0-6} ${cx+hw+4},${ey+10} Q${cx+hw*.3},${ey+12} ${cx+hw*.1},${y0-12} Z" fill="${o.fur2}"/><ellipse cx="${cx-hw*.7}" cy="${y0+96}" rx="16" ry="20" fill="${o.patch}"/>`;
  if(o.mask) s+=`<ellipse cx="${cx}" cy="${ey+6}" rx="${hw*.78}" ry="20" fill="${o.mask}" opacity=".85"/><path d="M${cx-hw},${y0-10} L${cx-hw+20},${y0+8} L${cx-hw+2},${y0+22} Z M${cx+hw},${y0-10} L${cx+hw-20},${y0+8} L${cx+hw-2},${y0+22} Z" fill="${o.mask}"/>`;
  if(o.cloth) s+=cloth(C);
  s+=`</g><path d="${body}" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"/>`;
  s+=`<path d="M${cx-hw+6},${y0+12} L${cx-hw+5},${y0-1} L${cx-hw+14},${y0+7} Z M${cx+hw-6},${y0+12} L${cx+hw-5},${y0-1} L${cx+hw-14},${y0+7} Z" fill="#f3a1b4" opacity="${o.mask?0:.9}"/>`;
  if(!faceOnly)[-1,1].forEach(d=>s+=`<ellipse cx="${cx+d*hw*.45}" cy="152" rx="9.5" ry="5.5" fill="${o.fur}" stroke="${ink}" stroke-width="2"/>`);
  s+=face(C,st,E);
  (o.acc||[]).forEach(a=>{const [n,c]=a.split(':');s+=(ACC[n]||(()=>''))(C,c);});
  if(!faceOnly){
    const pr=PROP[o.prop]?PROP[o.prop](C,o.pc):{svg:'',paws:[[cx-hw*.55,C.py],[cx+hw*.55,C.py]]};
    s+=pr.svg;
    pr.paws.forEach(p=>s+=`<ellipse cx="${p[0]}" cy="${p[1]}" rx="7.5" ry="6" fill="${o.fur}" stroke="${ink}" stroke-width="2"/>`);
    if(pr.over) s+=pr.over;
  }
  if(st==='muted') s+=`<text x="${cx+hw-4}" y="${y0-4}" font-family="Hind Madurai,sans-serif" font-weight="700" font-size="13" fill="#fff4dc">z</text><text x="${cx+hw+5}" y="${y0-14}" font-family="Hind Madurai,sans-serif" font-weight="700" font-size="9" fill="#fff4dc">z</text>`;
  return s+`</g></g></g></svg>`;
}

function lum(h){const n=parseInt(h.slice(1),16),c=[n>>16,(n>>8)&255,n&255].map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);});return .2126*c[0]+.7152*c[1]+.0722*c[2];}
function face(C,st,E){
  const {cx,ex,ey,er,ny,hw,o,ink}=C,look=o.look||E.look||[0,0],shut=st==='muted',hidden=o.ex==='cool';let s='';
  [-1,1].forEach(d=>{const x=cx+d*ex,r=E.uneven&&d>0?er*.82:er;
    if(shut||(E.wink&&d<0)){s+=shut?`<path d="M${x-er+2},${ey} Q${x},${ey+7} ${x+er-2},${ey}" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/>`:`<path d="M${x-er+2},${ey+2} Q${x},${ey-6} ${x+er-2},${ey+2}" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>`;return;}
    const lx=x+look[0]*r*.38,ly=ey+look[1]*r*.38,pr=r*(E.pup||.42)*(o.iris?1.15:1);
    s+=`<g class="eye"><circle cx="${x}" cy="${ey}" r="${r}" fill="${o.iris||'#fffdf6'}" stroke="${ink}" stroke-width="2.2"/><circle cx="${lx}" cy="${ly}" r="${pr}" fill="${ink}"/><circle cx="${lx-pr*.38}" cy="${ly-pr*.42}" r="${Math.max(1,pr*.36)}" fill="#fff"/>`;
    if(E.star) s+=`<circle cx="${lx+pr*.4}" cy="${ly+pr*.36}" r="${pr*.2}" fill="#fff"/><path d="M${lx+pr*.1},${ly-pr*.1} l1.2,-2.6 l1.2,2.6 l2.6,1.2 l-2.6,1.2 l-1.2,2.6 l-1.2,-2.6 l-2.6,-1.2 Z" fill="#fff" opacity=".9"/>`;
    if(E.lid&&!hidden){const yl=ey-r+2*r*E.lid,hc=Math.sqrt(Math.max(0,r*r-(yl-ey)*(yl-ey)));
      s+=`<path d="M${x-r-1.5},${yl} L${x-r-1.5},${ey-r-2} L${x+r+1.5},${ey-r-2} L${x+r+1.5},${yl} Z" fill="${o.lidc||o.fur}"/><path d="M${x-hc},${yl} L${x+hc},${yl}" stroke="${ink}" stroke-width="2.2" stroke-linecap="round"/>`;}
    s+=`</g>`;
    if(E.brow==='angry'&&!shut) s+=`<path d="M${x+d*er*.9},${ey-er-6} L${x-d*er*.6},${ey-er+1}" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>`;
    if(E.brow==='one'&&d>0) s+=`<path d="M${x-er*.7},${ey-er-4} Q${x},${ey-er-9} ${x+er*.7},${ey-er-5}" fill="none" stroke="${ink}" stroke-width="2.2" stroke-linecap="round"/>`;
    if(E.blush) s+=`<ellipse cx="${x+d*er*.5}" cy="${ey+er+3}" rx="${er*.55}" ry="${er*.3}" fill="#ff6f91" opacity=".55"/>`;
  });
  s+=`<path d="M${cx-3.2},${ny} L${cx+3.2},${ny} L${cx},${ny+3.4} Z" fill="#f07c95" stroke="${ink}" stroke-width="1" stroke-linejoin="round"/>`;
  const my=ny+5;let mc;
  if(shut) mc=`<path d="M${cx-3},${my+1} h6" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" fill="none"/>`;
  else if(E.mouth==='flat') mc=`<path d="M${cx-5},${my+1.5} h10" stroke="${ink}" stroke-width="1.8" stroke-linecap="round" fill="none"/>`;
  else if(E.mouth==='smirk') mc=`<path d="M${cx-4},${my+2} q5,3 9,-2" stroke="${ink}" stroke-width="1.8" stroke-linecap="round" fill="none"/>`;
  else if(E.mouth==='frown') mc=`<path d="M${cx-5},${my+4} q5,-5 10,0" stroke="${ink}" stroke-width="1.8" stroke-linecap="round" fill="none"/>`;
  else if(E.mouth==='small') mc=`<ellipse cx="${cx}" cy="${my+2.5}" rx="1.8" ry="1.5" fill="${ink}"/>`;
  else if(E.mouth==='grin') mc=`<path d="M${cx-7},${my} q7,9 14,0 Z" fill="#fff" stroke="${ink}" stroke-width="1.6" stroke-linejoin="round"/><path d="M${cx-3.5},${my+.5} v3.4 M${cx},${my+.5} v4.2 M${cx+3.5},${my+.5} v3.4" stroke="${ink}" stroke-width=".9"/>`;
  else if(E.mouth==='smile') mc=`<path d="M${cx-5.5},${my} q5.5,8 11,0 Z" fill="#7a1f2b" stroke="${ink}" stroke-width="1.6" stroke-linejoin="round"/>`;
  else mc=`<path d="M${cx-5.5},${my} q2.75,3.2 5.5,0 q2.75,3.2 5.5,0" fill="none" stroke="${ink}" stroke-width="1.7" stroke-linecap="round"/>`;
  s+=`<g class="mc">${mc}</g>`;
  if(!shut) s+=`<g class="mo"><ellipse cx="${cx}" cy="${ny+8}" rx="4.6" ry="5.2" fill="#7a1f2b" stroke="${ink}" stroke-width="1.6"/><ellipse cx="${cx}" cy="${ny+10.6}" rx="2.6" ry="1.8" fill="#f07c95"/></g>`;
  for(let i=-1;i<=1;i++) s+=`<path d="M${cx-hw*.42},${ny+2+i*3} L${cx-hw-12},${ny-2+i*7} M${cx+hw*.42},${ny+2+i*3} L${cx+hw+12},${ny-2+i*7}" stroke="${ink}" stroke-width="1.1" opacity=".75" stroke-linecap="round"/>`;
  return s;
}

/* ---------- clothes ---------- */
function patDefs(C){
  const m=C.o.cloth&&C.o.cloth.m,id=C.id;
  if(m==='mesh')return `<pattern id="${id}p" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 0H5M0 0V5" stroke="#1a2a10" stroke-width=".8" opacity=".45"/></pattern>`;
  if(m==='bandhani')return `<pattern id="${id}p" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#fff4dc"/><circle cx="5.5" cy="5.5" r="1.2" fill="#ffc21a"/></pattern>`;
  if(m==='polka')return `<pattern id="${id}p" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2" fill="#fff"/></pattern>`;
  if(m==='check')return `<pattern id="${id}p" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 0H4V4H0ZM4 4H8V8H4Z" fill="#170e33" opacity=".28"/></pattern>`;
  if(m==='tiedye')return `<radialGradient id="${id}p" cx="50%" cy="70%" r="70%"><stop offset="0" stop-color="#ffd23f"/><stop offset=".3" stop-color="#ff4fa3"/><stop offset=".55" stop-color="#7b5cff"/><stop offset=".8" stop-color="#12c2b0"/><stop offset="1" stop-color="#ff4fa3"/></radialGradient>`;
  return '';
}
function cloth(C){
  const {cx,hw,cy,o,id,ink}=C,m=o.cloth.m,c=o.cloth.c,over=['mesh','bandhani','tiedye','polka','check'].indexOf(m)>=0;
  const shape=`M${cx-hw-6},${cy-2} Q${cx},${cy+12} ${cx+hw+6},${cy-2} L${cx+hw+8},162 L${cx-hw-8},162 Z`;
  let s=`<path d="${shape}" fill="${c}"/>`;
  if(over) s+=`<path d="${shape}" fill="url(#${id}p)"/>`;
  s+=`<path d="M${cx-hw-6},${cy-2} Q${cx},${cy+12} ${cx+hw+6},${cy-2}" fill="none" stroke="${ink}" stroke-width="1.8"/>`;
  if(m==='hoodie') s+=`<path d="M${cx-6},${cy+5} v16 M${cx+6},${cy+5} v16" stroke="#fff4dc" stroke-width="1.8" stroke-linecap="round"/><path d="M${cx-16},${cy+40} h32 v12 h-32 Z" fill="none" stroke="${ink}" stroke-width="1.4" opacity=".6"/>`;
  if(m==='jersey') s+=`<text x="${cx}" y="${cy+30}" text-anchor="middle" font-family="Hind Madurai,sans-serif" font-weight="700" font-size="16" fill="#e63946">07</text><path d="M${cx-hw},${cy+4} l10,6 M${cx+hw},${cy+4} l-10,6" stroke="#e63946" stroke-width="3"/>`;
  if(m==='track') s+=`<path d="M${cx-hw+5},${cy+4} V160 M${cx-hw+9},${cy+4} V160 M${cx+hw-5},${cy+4} V160 M${cx+hw-9},${cy+4} V160" stroke="#fff" stroke-width="1.8"/><path d="M${cx},${cy+6} V160" stroke="${ink}" stroke-width="1.2" opacity=".5"/>`;
  if(m==='kurta'){s+=`<path d="M${cx},${cy+6} v22" stroke="${ink}" stroke-width="1.4"/>`;[0,1,2].forEach(i=>s+=`<circle cx="${cx}" cy="${cy+10+i*7}" r="1.4" fill="#e63946"/>`);
    for(let x=cx-hw-4;x<cx+hw+4;x+=7) s+=`<path d="M${x},146 l3.5,-4 l3.5,4 l-3.5,4 Z" fill="#ff3d86"/><circle cx="${x+3.5}" cy="138" r="1.2" fill="#ffc21a"/>`;}
  if(m==='suit') s+=`<path d="M${cx},${cy+8} L${cx-hw*.5},${cy-4} L${cx-hw*.2},${cy+26} Z M${cx},${cy+8} L${cx+hw*.5},${cy-4} L${cx+hw*.2},${cy+26} Z" fill="${o.cloth.c2||'#fff'}" stroke="${ink}" stroke-width="1.4" stroke-linejoin="round"/><path d="M${cx},${cy+10} V160" stroke="${ink}" stroke-width="1.2" opacity=".5"/><circle cx="${cx+4}" cy="${cy+34}" r="1.5" fill="${ink}"/><circle cx="${cx+4}" cy="${cy+46}" r="1.5" fill="${ink}"/>`;
  if(m==='vest') s+=`<path d="M${cx},${cy+10} V160" stroke="${ink}" stroke-width="1.4"/><path d="M${cx-hw*.55},${cy+2} L${cx},${cy+22} L${cx+hw*.55},${cy+2}" fill="${o.fur}" stroke="${ink}" stroke-width="1.4"/>`;
  if(m==='veshti'){s+=`<path d="M${cx-hw-8},${cy+38} H${cx+hw+8} V${cy+45} H${cx-hw-8} Z" fill="${o.cloth.c2||'#d4a017'}"/><path d="M${cx-hw-8},150 H${cx+hw+8}" stroke="${o.cloth.c2||'#d4a017'}" stroke-width="5"/><path d="M${cx},${cy+45} V160" stroke="${ink}" stroke-width="1" opacity=".35"/>`;}
  if(m==='stripe') for(let y=cy+8;y<160;y+=11) s+=`<path d="M${cx-hw-8},${y} H${cx+hw+8}" stroke="${o.cloth.c2||'#fff'}" stroke-width="4.5"/>`;
  if(m==='sequin') for(let i=0;i<16;i++) s+=`<circle cx="${cx-hw+6+((i*17)%(2*hw-10))}" cy="${cy+14+((i*23)%52)}" r="1.6" fill="#fff" opacity=".85"/>`;
  return s;
}

/* ---------- accessories ---------- */
const ACC={
  longhair:(C,c)=>{const {cx,y0,hw,ey,ink}=C;c=c||'#241a1c';return `<path d="M${cx-hw+5},${y0+10} Q${cx-hw-2},${y0-16} ${cx},${y0-17} Q${cx+hw+2},${y0-16} ${cx+hw-5},${y0+10} Q${cx+hw*.3},${y0-2} ${cx},${y0+3} Q${cx-hw*.3},${y0-2} ${cx-hw+5},${y0+10} Z" fill="${c}" stroke="${ink}" stroke-width="2"/>${[-1,1].map(d=>`<path d="M${cx+d*(hw+1)},${y0+8} q${d*10},${24} ${d*4},${ey-y0+34} q${-d*7},-6 ${-d*6},-${ey-y0+24} Z" fill="${c}" stroke="${ink}" stroke-width="1.8" stroke-linejoin="round"/>`).join('')}`;},
  vibhuti:C=>{const {cx,y0}=C;return `<path d="M${cx-9},${y0+9} h18 M${cx-10},${y0+12.5} h20 M${cx-9},${y0+16} h18" stroke="#fff" stroke-width="1.9" stroke-linecap="round" opacity=".95"/><circle cx="${cx}" cy="${y0+12.5}" r="2.2" fill="#e0122f"/>`;},
  crown:C=>{const {cx,y0,hw,ink}=C;let s='';const cols=['#ff3d86','#ffd23f','#fff','#ff9a1f','#ff3d86','#fff','#ffd23f'];for(let i=0;i<7;i++){const a=i/6,x=cx-hw+9+a*(2*hw-18),y=y0+5-Math.sin(a*Math.PI)*7;s+=`<circle cx="${x}" cy="${y}" r="4" fill="${cols[i]}" stroke="${ink}" stroke-width="1"/><circle cx="${x}" cy="${y}" r="1.3" fill="#ffb000"/>`;}return s;},
  headband:(C,c)=>{const {cx,y0,hw,ink}=C;return `<path d="M${cx-hw+5},${y0+13} Q${cx},${y0+5} ${cx+hw-5},${y0+13} L${cx+hw-5},${y0+19} Q${cx},${y0+11} ${cx-hw+5},${y0+19} Z" fill="${c||'#e63946'}" stroke="${ink}" stroke-width="1.6"/>`;},
  cap:(C,c)=>{const {cx,y0,hw,ink}=C;return `<path d="M${cx-hw+8},${y0+12} Q${cx-hw+9},${y0-14} ${cx},${y0-15} Q${cx+hw-9},${y0-14} ${cx+hw-8},${y0+12} Z" fill="${c}" stroke="${ink}" stroke-width="2"/><path d="M${cx-7},${y0+12} q7,-9 14,0 Z" fill="${C.o.fur}" stroke="${ink}" stroke-width="1.6"/><path d="M${cx-hw+10},${y0-2} q-12,-4 -16,4 q8,2 17,4" fill="${c}" stroke="${ink}" stroke-width="1.8"/><circle cx="${cx}" cy="${y0-14}" r="2" fill="${ink}"/>`;},
  bucket:(C,c)=>{const {cx,y0,hw,ink}=C;return `<path d="M${cx-hw+10},${y0+6} L${cx-hw+14},${y0-14} Q${cx},${y0-19} ${cx+hw-14},${y0-14} L${cx+hw-10},${y0+6} Z" fill="${c}" stroke="${ink}" stroke-width="2"/><ellipse cx="${cx}" cy="${y0+7}" rx="${hw+2}" ry="5.5" fill="${c}" stroke="${ink}" stroke-width="2"/><path d="M${cx-hw+12},${y0-4} H${cx+hw-12}" stroke="#14a098" stroke-width="2.4"/>`;},
  beanie:(C,c)=>{const {cx,y0,hw,ink}=C;return `<path d="M${cx-hw+7},${y0+10} Q${cx-hw+6},${y0-16} ${cx},${y0-18} Q${cx+hw-6},${y0-16} ${cx+hw-7},${y0+10} Z" fill="${c}" stroke="${ink}" stroke-width="2"/><rect x="${cx-hw+5}" y="${y0+4}" width="${2*hw-10}" height="8" rx="3" fill="#fff4dc" stroke="${ink}" stroke-width="1.8"/><circle cx="${cx}" cy="${y0-20}" r="5" fill="#fff4dc" stroke="${ink}" stroke-width="1.6"/>`;},
  topi:(C,c)=>{const {cx,y0,hw,ink}=C;return `<path d="M${cx-hw+10},${y0+8} L${cx-hw+16},${y0-8} Q${cx},${y0-13} ${cx+hw-16},${y0-8} L${cx+hw-10},${y0+8} Q${cx},${y0+2} ${cx-hw+10},${y0+8} Z" fill="${c||'#fff'}" stroke="${ink}" stroke-width="2"/><path d="M${cx-hw+16},${y0-8} Q${cx},${y0-2} ${cx+hw-16},${y0-8}" fill="none" stroke="${ink}" stroke-width="1.2" opacity=".6"/>`;},
  mohawk:(C,c)=>{const {cx,y0,ink}=C;let s='';for(let i=-2;i<=2;i++)s+=`<path d="M${cx+i*5-4},${y0+5} L${cx+i*5},${y0-20+Math.abs(i)*5} L${cx+i*5+4},${y0+5} Z" fill="${c}" stroke="${ink}" stroke-width="1.6" stroke-linejoin="round"/>`;return s;},
  bouffant:(C,c)=>{const {cx,y0,hw,ink}=C;return `<path d="M${cx-hw+6},${y0+12} Q${cx-hw-4},${y0-26} ${cx},${y0-28} Q${cx+hw+4},${y0-26} ${cx+hw-6},${y0+12} Q${cx+hw*.4},${y0+2} ${cx},${y0+6} Q${cx-hw*.4},${y0+2} ${cx-hw+6},${y0+12} Z" fill="${c||'#241a1c'}" stroke="${ink}" stroke-width="2"/><path d="M${cx-8},${y0-18} q8,-6 16,0" stroke="#fff" stroke-width="1.6" fill="none" opacity=".35" stroke-linecap="round"/>`;},
  sidepart:(C,c)=>{const {cx,y0,hw,ink}=C;return `<path d="M${cx-hw+6},${y0+10} Q${cx-hw+2},${y0-14} ${cx+4},${y0-14} Q${cx+hw},${y0-12} ${cx+hw-6},${y0+12} Q${cx+hw*.3},${y0-2} ${cx-hw+6},${y0+10} Z" fill="${c||'#241a1c'}" stroke="${ink}" stroke-width="2"/>`;},
  chain:C=>{const {cx,hw,cy}=C;return `<path d="M${cx-hw*.62},${cy-5} Q${cx},${cy+16} ${cx+hw*.62},${cy-5}" fill="none" stroke="#f5c542" stroke-width="3" stroke-dasharray="2.4 1.4"/><circle cx="${cx}" cy="${cy+9}" r="5" fill="#f5c542" stroke="#9a6a00" stroke-width="1.2"/><text x="${cx}" y="${cy+12}" text-anchor="middle" font-size="7" font-weight="700" fill="#7a4e00" font-family="sans-serif">₹</text>`;},
  chain2:C=>{const {cx,hw,cy}=C;return `<path d="M${cx-hw*.7},${cy-3} Q${cx},${cy+28} ${cx+hw*.7},${cy-3}" fill="none" stroke="#f5c542" stroke-width="2.4" stroke-dasharray="2 1.4"/>`;},
  earring:C=>{const {cx,y0,hw}=C;return `<circle cx="${cx-hw+5}" cy="${y0+22}" r="3.2" fill="none" stroke="#f5c542" stroke-width="1.8"/>`;},
  shadesUp:C=>{const {cx,y0,ink}=C;return `<path d="M${cx-19},${y0+6} h14 q0,8 -7,8 q-7,0 -7,-8 Z M${cx+5},${y0+6} h14 q0,8 -7,8 q-7,0 -7,-8 Z" fill="#141414" stroke="${ink}" stroke-width="1.5"/><path d="M${cx-5},${y0+7} h10" stroke="${ink}" stroke-width="2"/><path d="M${cx-16},${y0+8} l3,3 M${cx+8},${y0+8} l3,3" stroke="#fff" stroke-width="1.2" opacity=".7"/>`;},
  aviators:(C,c)=>{const {cx,ex,ey,er,hw,ink}=C;return [-1,1].map(d=>{const x=cx+d*ex;return `<path d="M${x-er-2},${ey-er+1} H${x+er+2} Q${x+er+2},${ey+er+4} ${x},${ey+er+4} Q${x-er-2},${ey+er+4} ${x-er-2},${ey-er+1} Z" fill="${c||'#3a2a12'}" opacity=".92" stroke="#f5c542" stroke-width="1.8"/><path d="M${x-er+2},${ey-er+4} l5,5" stroke="#fff" stroke-width="1.4" opacity=".6" stroke-linecap="round"/>`;}).join('')+`<path d="M${cx-ex+er+2},${ey-er+2} Q${cx},${ey-er-2} ${cx+ex-er-2},${ey-er+2}" fill="none" stroke="#f5c542" stroke-width="1.8"/><path d="M${cx-ex-er-2},${ey-er+2} L${cx-hw},${ey-er} M${cx+ex+er+2},${ey-er+2} L${cx+hw},${ey-er}" stroke="#f5c542" stroke-width="1.4"/>`;},
  hearts:C=>{const {cx,ex,ey,er,ink}=C;return [-1,1].map(d=>{const x=cx+d*ex,r=er+1;return `<path d="M${x},${ey+r} C${x-r*1.5},${ey} ${x-r*.9},${ey-r*1.2} ${x},${ey-r*.4} C${x+r*.9},${ey-r*1.2} ${x+r*1.5},${ey} ${x},${ey+r} Z" fill="#ff3d86" opacity=".9" stroke="${ink}" stroke-width="1.8" stroke-linejoin="round"/><path d="M${x-r*.5},${ey-r*.3} l2,2" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>`;}).join('')+`<path d="M${cx-3},${ey} h6" stroke="${ink}" stroke-width="1.8"/>`;},
  specs:C=>{const {cx,ex,ey,er,ink}=C;return [-1,1].map(d=>`<circle cx="${cx+d*ex}" cy="${ey}" r="${er+2.5}" fill="none" stroke="${ink}" stroke-width="2.4"/>`).join('')+`<path d="M${cx-ex+er+2.5},${ey} h${2*(ex-er-2.5)}" stroke="${ink}" stroke-width="2.2"/>`;},
  visor:C=>{const {cx,ey,er,hw}=C;return `<rect x="${cx-hw-3}" y="${ey-er-3}" width="${2*hw+6}" height="${2*er+6}" rx="9" fill="#00f0ff" opacity=".38" filter="url(#glow)"/><rect x="${cx-hw-3}" y="${ey-er-3}" width="${2*hw+6}" height="${2*er+6}" rx="9" fill="none" stroke="#00f0ff" stroke-width="2.2"/><path d="M${cx-hw+2},${ey-er+2} l8,0" stroke="#fff" stroke-width="2" opacity=".8" stroke-linecap="round"/>`;},
  headphones:(C,c)=>{const {cx,ey,y0,hw,ink}=C;c=c||'#ff4fa3';return `<path d="M${cx-hw-1},${ey} Q${cx},${y0-30} ${cx+hw+1},${ey}" fill="none" stroke="${ink}" stroke-width="5"/><path d="M${cx-hw-1},${ey} Q${cx},${y0-30} ${cx+hw+1},${ey}" fill="none" stroke="${c}" stroke-width="2.5"/>${[-1,1].map(d=>`<rect x="${cx+d*(hw+1)-6}" y="${ey-9}" width="12" height="18" rx="5" fill="${c}" stroke="${ink}" stroke-width="2"/>`).join('')}`;},
  led:C=>{const {cx,y0,ink}=C;return `<path d="M${cx-18},${y0+9} Q${cx},${y0+2} ${cx+18},${y0+9}" fill="none" stroke="${ink}" stroke-width="3"/><path d="M${cx-8},${y0+5} l-5,-16 M${cx+8},${y0+5} l5,-16" stroke="${ink}" stroke-width="2"/><circle cx="${cx-13}" cy="${y0-12}" r="4.5" fill="#b6ff3b" filter="url(#glow)"/><circle cx="${cx+13}" cy="${y0-12}" r="4.5" fill="#ff4fa3" filter="url(#glow)"/>`;},
  bandana:(C,c)=>{const {cx,hw,cy,ink}=C;return `<path d="M${cx-hw*.75},${cy-6} L${cx+hw*.75},${cy-6} L${cx},${cy+14} Z" fill="${c||'#ff6a2b'}" stroke="${ink}" stroke-width="1.8" stroke-linejoin="round"/><circle cx="${cx-6}" cy="${cy-1}" r="1.3" fill="#fff4dc"/><circle cx="${cx+5}" cy="${cy+2}" r="1.3" fill="#fff4dc"/><circle cx="${cx}" cy="${cy+7}" r="1.3" fill="#fff4dc"/>`;},
  bowtie:(C,c)=>{const {cx,cy,ink}=C;return `<path d="M${cx},${cy+2} l-11,-6 v12 Z M${cx},${cy+2} l11,-6 v12 Z" fill="${c||'#e63946'}" stroke="${ink}" stroke-width="1.6" stroke-linejoin="round"/><circle cx="${cx}" cy="${cy+2}" r="2.6" fill="${c||'#e63946'}" stroke="${ink}" stroke-width="1.4"/>`;},
  scarf:(C,c)=>{const {cx,hw,cy,ink}=C;c=c||'#e63946';return `<path d="M${cx-hw*.85},${cy-8} Q${cx},${cy+6} ${cx+hw*.85},${cy-8} L${cx+hw*.8},${cy} Q${cx},${cy+14} ${cx-hw*.8},${cy} Z" fill="${c}" stroke="${ink}" stroke-width="1.8"/><path d="M${cx+hw*.45},${cy+4} l4,26 l8,-2 l-4,-24" fill="${c}" stroke="${ink}" stroke-width="1.6"/><path d="M${cx-hw*.6},${cy-2} H${cx+hw*.6} M${cx+hw*.5},${cy+14} l8,-1" stroke="#fff4dc" stroke-width="1.4" stroke-dasharray="3 2"/>`;},
  pagri:(C,c)=>{const {cx,y0,hw,ink}=C;c=c||'#ff9a1f';return `<path d="M${cx-hw+1},${y0+17} Q${cx-hw-2},${y0-12} ${cx},${y0-17} Q${cx+hw+2},${y0-12} ${cx+hw-1},${y0+17} Q${cx},${y0+7} ${cx-hw+1},${y0+17} Z" fill="${c}" stroke="${ink}" stroke-width="2.2"/><path d="M${cx-hw+6},${y0+6} Q${cx},${y0-6} ${cx+hw-6},${y0+6} M${cx-hw+8},${y0-3} Q${cx},${y0-13} ${cx+hw-8},${y0-3}" fill="none" stroke="${ink}" stroke-width="1.3" opacity=".5"/><path d="M${cx+6},${y0-14} q4,-20 18,-18 q-6,8 -9,18 Z" fill="#e63946" stroke="${ink}" stroke-width="1.8"/><circle cx="${cx}" cy="${y0+8}" r="3" fill="#ffd23f" stroke="${ink}" stroke-width="1.2"/>`;},
  moustache:C=>{const {cx,ny,ink}=C;return `<path d="M${cx},${ny+4} q-6,-4 -13,0 q-5,3 -9,-2 q3,8 10,6 q7,-1 12,-4 Z M${cx},${ny+4} q6,-4 13,0 q5,3 9,-2 q-3,8 -10,6 q-7,-1 -12,-4 Z" fill="${ink}"/>`;},
  bindi:C=>`<circle cx="${C.cx}" cy="${C.y0+13}" r="2.3" fill="#e0122f"/>`,
  tilak:C=>`<path d="M${C.cx},${C.y0+8} v8" stroke="#e0122f" stroke-width="2.6" stroke-linecap="round"/>`,
  jhumka:C=>{const {cx,hw,ey,er}=C;return [-1,1].map(d=>{const x=cx+d*(hw-3),y=ey+er+1;return `<path d="M${x},${y-6} v4" stroke="#f5c542" stroke-width="1.4"/><path d="M${x-4},${y+2} q4,-6 8,0 Z" fill="#f5c542" stroke="#9a6a00" stroke-width="1"/><circle cx="${x-3}" cy="${y+3.5}" r=".9" fill="#f5c542"/><circle cx="${x}" cy="${y+4}" r=".9" fill="#f5c542"/><circle cx="${x+3}" cy="${y+3.5}" r=".9" fill="#f5c542"/>`;}).join('');},
  gajra:C=>{const {cx,y0,hw}=C;let s='';for(let i=0;i<6;i++){const a=i/5,x=cx+hw*.25+a*(hw*.55),y=y0+2-Math.sin(a*Math.PI)*6;s+=`<circle cx="${x}" cy="${y}" r="2.6" fill="#fff" stroke="#c9bdf2" stroke-width=".6"/>`;}return s+`<path d="M${cx+hw*.25},${y0+2} q-3,6 1,10" stroke="#2fa84a" stroke-width="1.6" fill="none"/>`;},
  flower:(C,c)=>{const {cx,y0,hw,ink}=C,x=cx+hw-10,y=y0+4;let s='';for(let i=0;i<5;i++){const a=i/5*6.283;s+=`<circle cx="${x+Math.cos(a)*4.5}" cy="${y+Math.sin(a)*4.5}" r="3.6" fill="${c||'#ff3d86'}" stroke="${ink}" stroke-width="1"/>`;}return s+`<circle cx="${x}" cy="${y}" r="2.6" fill="#ffd23f"/>`;},
  ghungroo:C=>{const {cx,hw}=C;let s='';[-1,1].forEach(d=>{for(let i=-2;i<=2;i++)s+=`<circle cx="${cx+d*hw*.45+i*3.4}" cy="147.5" r="1.5" fill="#f5c542" stroke="#9a6a00" stroke-width=".5"/>`;});return s;},
  collar:(C,c)=>{const {cx,hw,cy,ink}=C;return `<path d="M${cx-hw*.7},${cy-6} Q${cx},${cy+6} ${cx+hw*.7},${cy-6}" fill="none" stroke="${c||'#e63946'}" stroke-width="4" stroke-linecap="round"/><circle cx="${cx}" cy="${cy+3}" r="3.4" fill="#f5c542" stroke="${ink}" stroke-width="1.2"/>`;}
};

/* ---------- props ---------- */
const PROP={
  guitar:(C,c)=>{const {cx,hw,py,ink}=C,bx=cx-6,by=py+4,nx=cx+hw+12,ny2=py-30;c=c||'#c9681c';
    return {svg:`<path d="M${bx+6},${by-4} L${nx},${ny2}" stroke="${ink}" stroke-width="6.5" stroke-linecap="round"/><path d="M${bx+6},${by-4} L${nx},${ny2}" stroke="#5e3a22" stroke-width="4" stroke-linecap="round"/><rect x="${nx-4}" y="${ny2-7}" width="8" height="10" rx="2" fill="#3a2210" stroke="${ink}" stroke-width="1.4" transform="rotate(35 ${nx} ${ny2})"/>
      <g transform="rotate(-28 ${bx} ${by})"><ellipse cx="${bx-5}" cy="${by+3}" rx="14" ry="12" fill="${c}" stroke="${ink}" stroke-width="2"/><ellipse cx="${bx+12}" cy="${by+1}" rx="10" ry="9" fill="${c}" stroke="${ink}" stroke-width="2"/><ellipse cx="${bx-5}" cy="${by+3}" rx="12" ry="10" fill="${c}"/><circle cx="${bx+3}" cy="${by+2}" r="3.6" fill="#2b1d17"/><path d="M${bx-14},${by+3} h8" stroke="#2b1d17" stroke-width="2"/></g>`,
      paws:[[bx-2,by-2],[cx+hw*.75,py-17]]};},
  sitar:(C,c)=>{const {cx,hw,py,ink}=C,gx=cx-hw*.45,gy=py+10,tx=cx+hw+18,ty=py-36;let f='';for(let i=1;i<6;i++){const a=i/6.5;f+=`<circle cx="${gx+(tx-gx)*a}" cy="${gy+(ty-gy)*a}" r="1.2" fill="#fff4dc"/>`;}
    return {svg:`<path d="M${gx},${gy} L${tx},${ty}" stroke="${ink}" stroke-width="7" stroke-linecap="round"/><path d="M${gx},${gy} L${tx},${ty}" stroke="#8a5424" stroke-width="4.5" stroke-linecap="round"/>${f}<circle cx="${tx-4}" cy="${ty+3}" r="5.5" fill="${c||'#c9681c'}" stroke="${ink}" stroke-width="1.6"/><circle cx="${gx}" cy="${gy}" r="14" fill="${c||'#c9681c'}" stroke="${ink}" stroke-width="2"/><path d="M${gx-9},${gy-4} q9,-7 18,0" stroke="#fff4dc" stroke-width="1.4" fill="none" opacity=".7"/>`,
      paws:[[gx+11,gy-6],[cx+hw*.8,(gy+ty)/2-3]]};},
  violin:(C,c)=>{const {cx,hw,cy,ink}=C,vx=cx+hw*.38,vy=cy+8;c=c||'#8a3a1c';
    return {svg:`<g transform="rotate(-55 ${vx} ${vy})"><path d="M${vx},${vy-14} q8,0 8,6 q-4,4 0,8 q0,8 -8,8 q-8,0 -8,-8 q4,-4 0,-8 q0,-6 8,-6 Z" fill="${c}" stroke="${ink}" stroke-width="1.8"/><path d="M${vx},${vy-14} v-14" stroke="#2b1d17" stroke-width="3" stroke-linecap="round"/><circle cx="${vx}" cy="${vy-29}" r="2.4" fill="#2b1d17"/></g><g class="swing"><path d="M${cx-hw-8},${cy+30} L${cx+hw*.5},${cy-2}" stroke="#2b1d17" stroke-width="2" stroke-linecap="round"/><path d="M${cx-hw-8},${cy+30} L${cx+hw*.5},${cy-2}" stroke="#f2d7a6" stroke-width=".8"/></g>`,
      paws:[[cx-hw*.55,cy+21],[cx-hw*.05,cy+20]]};},
  upright:(C,c)=>{const {cx,hw,py,y0,ink}=C,bx=cx+hw*.62,by=130;c=c||'#8a3a1c';
    return {svg:`<path d="M${bx},${by-16} L${bx+4},${Math.max(y0+18,by-74)}" stroke="${ink}" stroke-width="5" stroke-linecap="round"/><path d="M${bx},${by-16} L${bx+4},${Math.max(y0+18,by-74)}" stroke="#2b1d17" stroke-width="3" stroke-linecap="round"/><path d="M${bx},${by-22} q14,0 13,10 q-4,5 0,10 q2,14 -13,14 q-15,0 -13,-14 q4,-5 0,-10 q-1,-10 13,-10 Z" fill="${c}" stroke="${ink}" stroke-width="2"/><path d="M${bx-4},${by-6} q-2,4 0,8 M${bx+4},${by-6} q2,4 0,8" stroke="#2b1d17" stroke-width="1.4" fill="none"/><g class="swing"><path d="M${cx-hw*.5},${py-2} L${bx+16},${by-4}" stroke="#2b1d17" stroke-width="2" stroke-linecap="round"/></g>`,
      paws:[[cx-hw*.45,py-1],[bx+2,Math.max(y0+40,by-50)]]};},
  sticks:C=>{const {cx,hw,py}=C,l=cx-hw*.55,r=cx+hw*.55;return {svg:`<g class="swing"><path d="M${l},${py} L${l-8},${py-30}" stroke="#2b1d17" stroke-width="4.6" stroke-linecap="round"/><path d="M${l},${py} L${l-8},${py-30}" stroke="#e6c39a" stroke-width="2.6" stroke-linecap="round"/></g><g class="swing swing2"><path d="M${r},${py} L${r+8},${py-30}" stroke="#2b1d17" stroke-width="4.6" stroke-linecap="round"/><path d="M${r},${py} L${r+8},${py-30}" stroke="#e6c39a" stroke-width="2.6" stroke-linecap="round"/></g>`,paws:[[l,py],[r,py]]};},
  cup:(C,c)=>{const {cx,hw,py,ink}=C,x=cx+hw*.5;return {svg:`<g class="swing"><path d="M${x-8},${py-16} h16 l-2.5,15 h-11 Z" fill="${c||'#fff4dc'}" stroke="${ink}" stroke-width="1.8" stroke-linejoin="round"/><path d="M${x+8},${py-12} q7,1 5,7 q-2,3 -6,2" fill="none" stroke="${ink}" stroke-width="1.8"/><path d="M${x-3},${py-20} q-3,-4 0,-7 M${x+3},${py-20} q-3,-4 0,-7" stroke="#fff4dc" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".8"/></g>`,paws:[[cx-hw*.55,py+4],[x-1,py-2]]};},
  shaker:(C,c)=>{const {cx,hw,py,ink}=C;return {svg:[-1,1].map((d,i)=>`<g class="swing${i?' swing2':''}"><path d="M${cx+d*hw*.55},${py} v-9" stroke="#7a4a1c" stroke-width="3.4" stroke-linecap="round"/><ellipse cx="${cx+d*hw*.55}" cy="${py-16}" rx="6.5" ry="8.5" fill="${c||'#ff6a2b'}" stroke="${ink}" stroke-width="1.8"/><path d="M${cx+d*hw*.55-5},${py-17} h10" stroke="#fff4dc" stroke-width="1.6"/></g>`).join(''),paws:[[cx-hw*.55,py],[cx+hw*.55,py]]};},
  clap:C=>{const {cx,py}=C;return {svg:`<g class="swing"><path d="M${cx-3},${py-13} l-4,-6 M${cx+3},${py-13} l4,-6 M${cx},${py-14} v-7" stroke="#fff4dc" stroke-width="1.8" stroke-linecap="round" opacity=".9"/></g>`,paws:[[cx-5.5,py-3],[cx+5.5,py-3]]};},
  mic:(C,c)=>{const {cx,hw,py,ny,ink}=C,hx=cx+hw*.5,hy=py-4;return {svg:`<path d="M${hx},${hy} L${cx+9},${ny+13}" stroke="${ink}" stroke-width="5" stroke-linecap="round"/><path d="M${hx},${hy} L${cx+9},${ny+13}" stroke="#3a3a3a" stroke-width="3" stroke-linecap="round"/><g class="swing"><circle cx="${cx+9}" cy="${ny+10}" r="7.5" fill="#cfd6dd" stroke="${ink}" stroke-width="2"/><path d="M${cx+3},${ny+8} h12 M${cx+2.5},${ny+11.5} h13 M${cx+9},${ny+3} v14" stroke="#7d8590" stroke-width="1"/><rect x="${cx+3}" y="${ny+15}" width="12" height="3.4" rx="1" fill="${c||'#262026'}" stroke="${ink}" stroke-width="1"/></g>`,paws:[[cx-hw*.55,py+4],[hx,hy]]};},
  boombox:C=>{const {cx,py,ink}=C;return {svg:`<path d="M${cx-14},${py-12} q14,-10 28,0" fill="none" stroke="${ink}" stroke-width="2.4"/><rect x="${cx-23}" y="${py-12}" width="46" height="24" rx="3" fill="#cfd6dd" stroke="${ink}" stroke-width="2"/>${[-1,1].map(d=>`<circle cx="${cx+d*11.5}" cy="${py}" r="7.5" fill="#2b2b2b" stroke="${ink}" stroke-width="1.4"/><circle class="swing" cx="${cx+d*11.5}" cy="${py}" r="3.4" fill="#5a5a5a"/>`).join('')}<rect x="${cx-4}" y="${py-9}" width="8" height="4" rx="1" fill="#ff4fa3"/>`,paws:[[cx-24,py+2],[cx+24,py+2]]};},
  spray:C=>{const {cx,hw,py,ink}=C,x=cx+hw*.55;return {svg:`<g class="swing"><rect x="${x-4.5}" y="${py-20}" width="9" height="20" rx="2" fill="#ff4fa3" stroke="${ink}" stroke-width="1.8"/><rect x="${x-2}" y="${py-24}" width="4" height="4" fill="#fff" stroke="${ink}" stroke-width="1.2"/><circle cx="${x+6}" cy="${py-25}" r="2" fill="#ffd23f" opacity=".8"/><circle cx="${x+10}" cy="${py-28}" r="1.4" fill="#12c2b0" opacity=".8"/></g>`,paws:[[cx-hw*.55,py+4],[x,py-4]]};},
  keys:(C,c)=>{const {cx,py,ink}=C;let k='';for(let i=0;i<7;i++)k+=`<rect x="${cx-19+i*5.4}" y="${py-1}" width="4.6" height="9" fill="#fff" stroke="${ink}" stroke-width=".6"/>`;return {svg:`<rect x="${cx-24}" y="${py-9}" width="48" height="19" rx="3" fill="${c||'#2b2b36'}" stroke="${ink}" stroke-width="2"/>${k}<circle cx="${cx-16}" cy="${py-5}" r="2" fill="#00f0ff"/><circle cx="${cx-9}" cy="${py-5}" r="2" fill="#ff4fa3"/><circle class="swing" cx="${cx+14}" cy="${py-5}" r="2" fill="#b6ff3b"/>`,paws:[[cx-12,py+1],[cx+12,py-2]]};},
  pads:C=>{const {cx,py,ink}=C;let k='';for(let r=0;r<2;r++)for(let i=0;i<4;i++)k+=`<rect x="${cx-19+i*10}" y="${py-8+r*9}" width="8" height="7" rx="1.5" fill="${['#ff4fa3','#ffd23f','#12c2b0','#b6ff3b'][(i+r)%4]}"/>`;return {svg:`<rect x="${cx-23}" y="${py-11}" width="46" height="22" rx="3" fill="#2b2b36" stroke="${ink}" stroke-width="2"/>${k}`,paws:[[cx-13,py-12],[cx+13,py-12]]};},
  glow:C=>{const {cx,hw,py}=C,l=cx-hw*.6,r=cx+hw*.6;return {svg:`<g class="swing"><path d="M${l},${py} L${l-10},${py-30}" stroke="#b6ff3b" stroke-width="5" stroke-linecap="round" filter="url(#glow)"/></g><g class="swing swing2"><path d="M${r},${py} L${r+10},${py-30}" stroke="#ff4fa3" stroke-width="5" stroke-linecap="round" filter="url(#glow)"/></g>`,paws:[[l,py],[r,py]]};},
  vinyl:C=>{const {cx,py,ink}=C;return {svg:`<g class="swing"><circle cx="${cx}" cy="${py}" r="15" fill="#151515" stroke="${ink}" stroke-width="1.8"/><circle cx="${cx}" cy="${py}" r="11" fill="none" stroke="#3a3a3a" stroke-width=".8"/><circle cx="${cx}" cy="${py}" r="7.5" fill="none" stroke="#3a3a3a" stroke-width=".8"/><circle cx="${cx}" cy="${py}" r="4.5" fill="#ff6a2b"/><circle cx="${cx}" cy="${py}" r="1" fill="#151515"/></g>`,paws:[[cx-16,py+2],[cx+16,py-2]]};},
  dhol:(C,c)=>{const {cx,py,ink}=C;let x='';for(let i=0;i<5;i++)x+=`<path d="M${cx-20+i*9},${py-11} l9,22 M${cx-11+i*9},${py-11} l-9,22" stroke="#fff4dc" stroke-width="1.1" opacity=".9"/>`;
    return {svg:`<path d="M${cx-25},${py-12} Q${cx},${py-17} ${cx+25},${py-12} L${cx+25},${py+12} Q${cx},${py+17} ${cx-25},${py+12} Z" fill="${c||'#c0392b'}" stroke="${ink}" stroke-width="2"/>${x}<ellipse cx="${cx-25}" cy="${py}" rx="5" ry="12.5" fill="#f2d7a6" stroke="${ink}" stroke-width="2"/><ellipse cx="${cx+25}" cy="${py}" rx="5" ry="12.5" fill="#f2d7a6" stroke="${ink}" stroke-width="2"/>`,
      paws:[[cx-22,py-14],[cx+22,py-14]],over:`<g class="swing"><path d="M${cx-22},${py-14} l-8,-16" stroke="#7a4a1c" stroke-width="3" stroke-linecap="round"/></g><g class="swing swing2"><path d="M${cx+22},${py-14} q6,-10 2,-18" stroke="#7a4a1c" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`};},
  drums:(C,c)=>{const {cx,py,ink}=C;return {svg:[-1,1].map(d=>`<path d="M${cx+d*13-11},${py-6} h22 l-3,18 h-16 Z" fill="${c||'#b9692a'}" stroke="${ink}" stroke-width="1.8" stroke-linejoin="round"/><ellipse cx="${cx+d*13}" cy="${py-6}" rx="11" ry="4" fill="#f2d7a6" stroke="${ink}" stroke-width="1.8"/>`).join(''),paws:[[cx-13,py-10],[cx+13,py-10]],over:''};},
  pot:C=>{const {cx,py,ink}=C;return {svg:`<path d="M${cx-9},${py-13} h18 q2,4 -2,6 q16,8 10,22 q-5,9 -17,9 q-12,0 -17,-9 q-6,-14 10,-22 q-4,-2 -2,-6 Z" fill="#c4743a" stroke="${ink}" stroke-width="2" stroke-linejoin="round"/><path d="M${cx-14},${py+6} q14,6 28,0" stroke="#fff4dc" stroke-width="1.4" fill="none" stroke-dasharray="2 2.5"/><ellipse cx="${cx}" cy="${py-13}" rx="9" ry="2.6" fill="#7a3d1c" stroke="${ink}" stroke-width="1.4"/>`,paws:[[cx-19,py+2],[cx+19,py+2]]};},
  flute:C=>{const {cx,hw,ny,ink}=C,y1=ny+6,y2=ny+13;let h='';for(let i=0;i<5;i++)h+=`<circle cx="${cx+8+i*5.5}" cy="${y1+.5+(i*1.4)*(y2-y1)/30}" r="1.1" fill="${ink}"/>`;
    return {svg:`<path d="M${cx-hw-6},${y1-2} L${cx+hw+14},${y2}" stroke="${ink}" stroke-width="6" stroke-linecap="round"/><path d="M${cx-hw-6},${y1-2} L${cx+hw+14},${y2}" stroke="#c98b3c" stroke-width="3.6" stroke-linecap="round"/>${h}<path d="M${cx-hw+4},${y1-2} l0,3.5 M${cx+hw+6},${y2-2} l0,3.5" stroke="#e63946" stroke-width="2"/>`,paws:[[cx-hw*.35,y1+3],[cx+hw*.6,y2+3]]};},
  horn:(C,c)=>{const {cx,ny,py,ink}=C,x1=cx+2,y1=ny+9,x2=cx+16,y2=py+10;c=c||'#f5c542';
    return {svg:`<g class="pp"><path d="M${x1},${y1} L${x2},${y2-4}" stroke="${ink}" stroke-width="7" stroke-linecap="round"/><path d="M${x1},${y1} L${x2},${y2-4}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><path d="M${x2-9},${y2-6} L${x2+10},${y2-2} L${x2+4},${y2+10} L${x2-12},${y2+3} Z" fill="${c}" stroke="${ink}" stroke-width="1.8" stroke-linejoin="round"/></g>`,paws:[[cx+2,(y1+y2)/2-2],[cx+13,(y1+y2)/2+8]]};},
  strings:(C,c)=>{const {cx,hw,py,y0,ink}=C,bx=cx-hw*.35,by=py+8,nx=cx+hw+10,nyy=Math.max(y0+34,py-46);c=c||'#b9692a';
    return {svg:`<path d="M${bx},${by} L${nx},${nyy}" stroke="${ink}" stroke-width="6" stroke-linecap="round"/><path d="M${bx},${by} L${nx},${nyy}" stroke="#7a4a1c" stroke-width="3.4" stroke-linecap="round"/><ellipse cx="${bx}" cy="${by}" rx="14" ry="12" fill="${c}" stroke="${ink}" stroke-width="2"/><circle cx="${bx}" cy="${by}" r="3.5" fill="#3a2210"/><path d="M${bx-2},${by-1} L${nx-1},${nyy}" stroke="#fff4dc" stroke-width=".8"/><circle cx="${nx}" cy="${nyy}" r="3" fill="#7a4a1c" stroke="${ink}" stroke-width="1.4"/>`,paws:[[bx+10,by-2],[cx+hw*.75,(by+nyy)/2+4]],over:''};},
  manjira:C=>{const {cx,py,ink}=C;return {svg:[-1,1].map((d,i)=>`<g class="swing${i?' swing2':''}"><ellipse cx="${cx+d*13}" cy="${py-8}" rx="8" ry="4" fill="#f5c542" stroke="${ink}" stroke-width="1.6"/><circle cx="${cx+d*13}" cy="${py-9}" r="1.6" fill="#9a6a00"/><path d="M${cx+d*13},${py-12} v-5" stroke="#e63946" stroke-width="1.6"/></g>`).join(''),paws:[[cx-13,py-2],[cx+13,py-2]]};},
  disco:C=>{const {cx,hw,py,ink}=C,x=cx+hw*.7,y=py-26;return {svg:`<g class="swing"><path d="M${x},${py-2} L${x},${y+9}" stroke="${ink}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="10" fill="#dfe7f0" stroke="${ink}" stroke-width="1.8"/><path d="M${x-10},${y} h20 M${x},${y-10} v20 M${x-7},${y-7} q7,5 14,0 M${x-7},${y+7} q7,-5 14,0" stroke="#8f9aa8" stroke-width=".9" fill="none"/><path d="M${x-4},${y-5} l2,2" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g>`,paws:[[cx-hw*.55,py+4],[x,py-2]]};},
  rose:C=>{const {cx,hw,py,ink}=C,x=cx+hw*.6;return {svg:`<g class="swing"><path d="M${x},${py} q2,-12 0,-20" stroke="#2fa84a" stroke-width="2.4" fill="none"/><path d="M${x},${py-10} q6,-2 7,-7" stroke="#2fa84a" stroke-width="2" fill="none"/><circle cx="${x}" cy="${py-23}" r="6" fill="#e0122f" stroke="${ink}" stroke-width="1.6"/><path d="M${x-3},${py-24} q3,-3 6,0 q-3,3 -6,0" fill="none" stroke="#7a0f1c" stroke-width="1.2"/></g>`,paws:[[cx-hw*.55,py+4],[x,py]]};},
  laser:C=>{const {cx,hw,py}=C,x=cx+hw*.6;return {svg:`<g class="swing"><path d="M${x},${py} L${x+14},${py-34}" stroke="#00f0ff" stroke-width="3" stroke-linecap="round" filter="url(#glow)"/></g><g class="swing swing2"><path d="M${cx-hw*.6},${py} L${cx-hw*.6-14},${py-34}" stroke="#b6ff3b" stroke-width="3" stroke-linecap="round" filter="url(#glow)"/></g>`,paws:[[cx-hw*.6,py],[x,py]]};}
};
