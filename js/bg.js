// Stage backdrops, one per genre, drawn in code. Also used as the art on the genre cards.
export function backdrop(k){
  const open='<svg class="bg" viewBox="0 0 800 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">';
  if(k==='gully'){let b='';for(let r=0;r<12;r++)for(let c=0;c<15;c++)b+=`<rect x="${c*60+(r%2?30:0)-30}" y="${r*22}" width="56" height="18" rx="2" fill="${['#9c5a48','#a8634f','#8f5242','#b06c55'][(r*7+c*3)%4]}"/>`;
    return open+`<rect width="800" height="300" fill="#6d3a2e"/>${b}
      <text x="400" y="62" text-anchor="middle" font-family="'Baloo 2',sans-serif" font-weight="800" font-size="46" fill="#ffd23f" stroke="#170e33" stroke-width="4" paint-order="stroke" transform="rotate(-4 400 56)" opacity=".9">GULLY KI BILLI</text>
      <path d="M40 40 q24 -24 48 0 t48 0" stroke="#12c2b0" stroke-width="9" fill="none" stroke-linecap="round" opacity=".85"/><circle cx="740" cy="44" r="20" fill="none" stroke="#ff4fa3" stroke-width="8" opacity=".85"/><path d="M728 44 l24 0 M740 32 l0 24" stroke="#ff4fa3" stroke-width="6"/>
      <rect y="262" width="800" height="38" fill="#2e2b33"/><path d="M0 276 H800" stroke="#ffd23f" stroke-width="4" stroke-dasharray="40 30"/></svg>`;}
  if(k==='goa'){let l='';[[0,'#00f0ff'],[1,'#ff4fa3'],[2,'#b6ff3b'],[3,'#00f0ff']].forEach(([i,c])=>l+=`<path d="M400 40 L${80+i*210} 300" stroke="${c}" stroke-width="2.4" opacity=".55"/>`);
    let sun='';for(let i=0;i<6;i++)sun+=`<rect x="300" y="${118+i*12}" width="200" height="${3+i}" fill="#3d0f5a"/>`;
    const palm=(x,s)=>`<g transform="translate(${x} 262) scale(${s})" fill="#1b0626"><path d="M-4 0 Q2 -60 10 -120 L16 -119 Q8 -60 6 0 Z"/><path d="M12 -120 q-40 -10 -70 10 q30 -26 70 -14 Z M12 -120 q40 -14 72 4 q-34 -22 -72 -8 Z M12 -122 q-14 -34 -48 -46 q38 6 50 42 Z M12 -122 q16 -34 50 -42 q-38 10 -48 44 Z"/></g>`;
    return open+`<defs><linearGradient id="gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c0533"/><stop offset=".55" stop-color="#7a1a6e"/><stop offset="1" stop-color="#ff5f7e"/></linearGradient><linearGradient id="gsun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#ff4fa3"/></linearGradient></defs>
      <rect width="800" height="300" fill="url(#gs)"/><circle cx="400" cy="160" r="100" fill="url(#gsun)"/>${sun}${l}${palm(90,1)}${palm(700,1.15)}${palm(600,.7)}
      <rect y="262" width="800" height="38" fill="#e8a46a"/><path d="M0 264 Q200 256 400 264 T800 264" stroke="#ffd29a" stroke-width="3" fill="none"/></svg>`;}
  if(k==='retro'){let cur='';for(let x=0;x<800;x+=40)cur+=`<path d="M${x} 0 Q${x+10} 150 ${x} 262 H${x+40} Q${x+30} 150 ${x+40} 0 Z" fill="${(x/40)%2?'#8f1838':'#a51d44'}"/>`;
    let bulbs='';for(let x=20;x<800;x+=36)bulbs+=`<circle cx="${x}" cy="14" r="6" fill="#ffe9a8" filter="url(#glow)"/>`;
    let fl='';for(let r=0;r<2;r++)for(let c=0;c<20;c++)fl+=`<rect x="${c*40}" y="${262+r*19}" width="40" height="19" fill="${(r+c)%2?'#ffd23f':'#ff3d86'}" opacity="${(r+c)%2?.9:.85}"/>`;
    return open+`<rect width="800" height="300" fill="#6d1230"/>${cur}
      <path d="M150 0 L60 262 H330 Z" fill="#fff4dc" opacity=".1"/><path d="M650 0 L470 262 H740 Z" fill="#fff4dc" opacity=".1"/><path d="M400 0 L270 262 H530 Z" fill="#ffd23f" opacity=".1"/>
      <rect width="800" height="28" fill="#3a0a1c"/>${bulbs}${fl}<path d="M0 262 H800" stroke="#170e33" stroke-width="3"/></svg>`;}
  if(k==='sufi'){let st='';for(let i=0;i<46;i++)st+=`<circle cx="${(i*173)%800}" cy="${(i*67)%150}" r="${1+(i%3)*.6}" fill="#fff4dc" opacity="${.35+(i%4)*.15}"/>`;
    const arch=(x,w,h)=>`<path d="M${x} 262 V${262-h+w/2} Q${x} ${262-h-w*.1} ${x+w/2} ${262-h-w*.45} Q${x+w} ${262-h-w*.1} ${x+w} ${262-h+w/2} V262 Z"/>`;
    let li='';for(let x=10,i=0;x<800;x+=26,i++)li+=`<circle cx="${x}" cy="${26+Math.sin(x/60)*9}" r="4.2" fill="${['#ffc21a','#3ddc97','#ff6a2b'][i%3]}" filter="url(#glow)"/>`;
    return open+`<defs><linearGradient id="sf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#06211f"/><stop offset="1" stop-color="#0f5a4a"/></linearGradient></defs><rect width="800" height="300" fill="url(#sf)"/>${st}
      <circle cx="660" cy="62" r="26" fill="#fff4dc"/><circle cx="671" cy="55" r="23" fill="#0a2f2a"/>
      <g fill="#083a33">${arch(60,150,150)}${arch(325,150,190)}${arch(590,150,150)}<rect x="0" y="232" width="800" height="30"/></g>
      <g fill="#ffc21a" opacity=".16">${arch(85,100,118)}${arch(350,100,158)}${arch(615,100,118)}</g>
      <path d="M385 60 q15 -22 30 0 Z" fill="#083a33"/><path d="M400 38 v-14" stroke="#ffc21a" stroke-width="3"/>
      <path d="M0 22 Q200 44 400 22 T800 22" stroke="#fff4dc" stroke-width="1.2" fill="none" opacity=".5"/>${li}
      <rect y="262" width="800" height="38" fill="#7a2030"/><path d="M0 262 H800" stroke="#ffc21a" stroke-width="3"/>${Array.from({length:14},(_,i)=>`<path d="M${30+i*58} 281 l10 -9 l10 9 l-10 9 Z" fill="none" stroke="#ffc21a" stroke-width="1.6" opacity=".8"/>`).join('')}</svg>`;}
  if(k==='carnatic'){let tiers='';for(let i=0;i<6;i++){const w=210-i*30,y=232-i*30;tiers+=`<rect x="${400-w/2}" y="${y-28}" width="${w}" height="28" fill="${i%2?'#7a1f3a':'#8f2746'}" stroke="#ffb000" stroke-width="2"/>`;for(let j=0;j<Math.max(2,6-i);j++)tiers+=`<path d="M${400-w/2+12+j*(w-24)/Math.max(1,(Math.max(2,6-i)-1))-6} ${y-4} v-14 q6 -8 12 0 v14 Z" fill="#ffb000" opacity=".75"/>`;}
    const leaf=(x,f)=>`<g transform="translate(${x} 262) scale(${f} 1)"><path d="M0 0 Q-6 -110 14 -196" stroke="#1c6a34" stroke-width="7" fill="none"/><path d="M12 -190 Q-70 -150 -86 -60 Q-30 -110 10 -150 Z M12 -192 Q80 -170 104 -90 Q50 -130 12 -160 Z M10 -150 Q-40 -110 -50 -30 Q-10 -80 8 -112 Z" fill="#2fa84a" stroke="#1c6a34" stroke-width="2"/></g>`;
    let kol='';for(let i=0;i<19;i++)kol+=`<path d="M${22+i*42} 281 q10 -12 20 0 q-10 12 -20 0 Z" fill="none" stroke="#fff4dc" stroke-width="1.6"/><circle cx="${32+i*42}" cy="281" r="1.6" fill="#fff4dc"/>`;
    const lamp=x=>`<g transform="translate(${x} 262)"><path d="M-4 0 V-70 M-16 0 H8" stroke="#d4a017" stroke-width="5" stroke-linecap="round"/><path d="M-18 -70 H10 l-4 8 H-14 Z" fill="#d4a017"/><path d="M-4 -74 q-7 -10 0 -20 q7 10 0 20 Z" fill="#ffd23f" filter="url(#glow)"/></g>`;
    return open+`<rect width="800" height="300" fill="#4a0f24"/><rect width="800" height="300" fill="#ffb000" opacity=".06"/>
      <circle cx="400" cy="120" r="150" fill="#ffb000" opacity=".1"/>${tiers}<path d="M370 22 h60 l-10 22 h-40 Z" fill="#ffb000"/>${[378,400,422].map(x=>`<path d="M${x} 22 v-12" stroke="#ffb000" stroke-width="4" stroke-linecap="round"/>`).join('')}
      ${leaf(70,1)}${leaf(730,-1)}${lamp(220)}${lamp(588)}
      <rect y="262" width="800" height="38" fill="#b3274a"/><path d="M0 262 H800" stroke="#ffb000" stroke-width="4"/>${kol}</svg>`;}
  if(k==='indie'){let sky='',bl='';const B=[[0,90,60],[70,130,70],[150,70,50],[210,110,90],[310,150,60],[380,84,70],[460,120,80],[550,160,56],[616,96,70],[696,134,104]];
    B.forEach(([x,h,w],i)=>{sky+=`<rect x="${x}" y="${262-h}" width="${w}" height="${h}" fill="${i%2?'#3b2a6b':'#46327c'}"/>`;for(let r=0;r<Math.floor(h/22);r++)for(let c=0;c<Math.floor(w/18);c++)if((r*7+c*3+i)%3===0)sky+=`<rect x="${x+6+c*18}" y="${262-h+8+r*22}" width="7" height="9" fill="#ffd98a" opacity=".85"/>`;});
    for(let x=6,i=0;x<800;x+=30,i++)bl+=`<circle cx="${x}" cy="${30+Math.sin(x/800*Math.PI)*26}" r="5" fill="${['#ffd23f','#ff8fab','#fff4dc','#7bdff2'][i%4]}" filter="url(#glow)"/>`;
    return open+`<defs><linearGradient id="ip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2a78"/><stop offset=".5" stop-color="#c85a9a"/><stop offset="1" stop-color="#ffb37a"/></linearGradient></defs><rect width="800" height="300" fill="url(#ip)"/>
      <circle cx="560" cy="196" r="46" fill="#ffe2a8" opacity=".9"/>${sky}
      <g fill="#2a1d52"><rect x="96" y="150" width="46" height="34" rx="4"/><path d="M100 184 v20 M138 184 v20" stroke="#2a1d52" stroke-width="5"/><path d="M640 120 v60 M626 132 h28 M630 144 h20" stroke="#2a1d52" stroke-width="4"/></g>
      <path d="M0 30 Q400 84 800 30" stroke="#2a1d52" stroke-width="1.6" fill="none"/>${bl}
      <rect y="262" width="800" height="38" fill="#8a5a6e"/><path d="M0 262 H800" stroke="#2a1d52" stroke-width="5"/>${Array.from({length:20},(_,i)=>`<path d="M${i*40} 262 v38" stroke="#2a1d52" stroke-width="1.4" opacity=".35"/>`).join('')}</svg>`;}
  if(k==='soon') return open+`<rect width="800" height="300" fill="#2a1b57"/><path d="M0 262 H800" stroke="#4b3a8a" stroke-width="3"/></svg>`;
  let rg='';for(let ring=1;ring<=4;ring++){const n=ring*8;for(let i=0;i<n;i++){const a=i/n*Math.PI*2;rg+=`<circle cx="${400+Math.cos(a)*ring*34}" cy="${140+Math.sin(a)*ring*24}" r="${ring%2?5:3.5}" fill="${['#ffc21a','#fff4dc','#ff3d86','#12c2b0'][ring%4]}" opacity=".75"/>`;}}
  let tor='<path d="M0 8 H800" stroke="#ffc21a" stroke-width="3"/>';for(let x=14,i=0;x<800;x+=28,i++)tor+=i%2?`<circle cx="${x}" cy="22" r="10" fill="#ff8a1f" stroke="#170e33" stroke-width="1.6"/><circle cx="${x}" cy="22" r="4" fill="#ffc21a"/>`:`<path d="M${x} 8 C${x-10} 18 ${x-7} 34 ${x} 42 C${x+7} 34 ${x+10} 18 ${x} 8 Z" fill="#2fa84a" stroke="#170e33" stroke-width="1.4"/>`;
  return open+`<rect width="800" height="300" fill="#8a2e1c"/><rect width="800" height="300" fill="#5a1a10" opacity=".35"/>${rg}${tor}
    <rect y="262" width="800" height="38" fill="#c4743a"/><path d="M0 262 H800" stroke="#fff4dc" stroke-width="3"/>${Array.from({length:20},(_,i)=>`<path d="M${20+i*40} 294 l8 -12 l8 12 Z" stroke="#fff4dc" stroke-width="1.6" fill="none"/><circle cx="${28+i*40}" cy="276" r="3" fill="#fff4dc"/>`).join('')}</svg>`;
}
