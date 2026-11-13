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
  if(k==='soon') return open+`<rect width="800" height="300" fill="#2a1b57"/><path d="M0 262 H800" stroke="#4b3a8a" stroke-width="3"/></svg>`;
  let rg='';for(let ring=1;ring<=4;ring++){const n=ring*8;for(let i=0;i<n;i++){const a=i/n*Math.PI*2;rg+=`<circle cx="${400+Math.cos(a)*ring*34}" cy="${140+Math.sin(a)*ring*24}" r="${ring%2?5:3.5}" fill="${['#ffc21a','#fff4dc','#ff3d86','#12c2b0'][ring%4]}" opacity=".75"/>`;}}
  let tor='<path d="M0 8 H800" stroke="#ffc21a" stroke-width="3"/>';for(let x=14,i=0;x<800;x+=28,i++)tor+=i%2?`<circle cx="${x}" cy="22" r="10" fill="#ff8a1f" stroke="#170e33" stroke-width="1.6"/><circle cx="${x}" cy="22" r="4" fill="#ffc21a"/>`:`<path d="M${x} 8 C${x-10} 18 ${x-7} 34 ${x} 42 C${x+7} 34 ${x+10} 18 ${x} 8 Z" fill="#2fa84a" stroke="#170e33" stroke-width="1.4"/>`;
  return open+`<rect width="800" height="300" fill="#8a2e1c"/><rect width="800" height="300" fill="#5a1a10" opacity=".35"/>${rg}${tor}
    <rect y="262" width="800" height="38" fill="#c4743a"/><path d="M0 262 H800" stroke="#fff4dc" stroke-width="3"/>${Array.from({length:20},(_,i)=>`<path d="M${20+i*40} 294 l8 -12 l8 12 Z" stroke="#fff4dc" stroke-width="1.6" fill="none"/><circle cx="${28+i*40}" cy="276" r="3" fill="#fff4dc"/>`).join('')}</svg>`;
}
