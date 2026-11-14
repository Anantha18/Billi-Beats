// The 9:16 story card: the band on its stage, its name, and its place on the chart. Drawn on a canvas so it saves as one image.
import {catSVG,DEFS} from './cats.js';
import {backdrop} from './bg.js';
const defsInner=DEFS.replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'');
const strip=s=>s.replace(/^<svg /,'<svg xmlns="http://www.w3.org/2000/svg" ');
function img(svg){return new Promise(res=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});}
function wrap(c,text,x,y,maxW,lh){const words=text.split(' ');let line='',yy=y;words.forEach(w=>{const t=line?line+' '+w:w;if(c.measureText(t).width>maxW&&line){c.fillText(line,x,yy);line=w;yy+=lh;}else line=t;});c.fillText(line,x,yy);return yy+lh;}
export async function storyCard(p,cats,name,line,url){
  const W=1080,H=1920,cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d');
  if(document.fonts&&document.fonts.ready)await document.fonts.ready;
  c.fillStyle='#170e33';c.fillRect(0,0,W,H);
  // Stage band: the genre backdrop at its own 8:3 shape, so the floor line is known.
  const sy=360,sh=1000,bw=sh*800/300,floor=sy+sh*262/300;
  const bg=await img(strip(backdrop(p.theme.bg)).replace('<svg ',`<svg width="${bw}" height="${sh}" `));
  if(bg){c.save();c.beginPath();c.rect(0,sy,W,sh);c.clip();c.drawImage(bg,(W-bw)/2,sy,bw,sh);c.restore();}
  c.fillStyle=p.theme.c1;c.fillRect(0,sy-12,W,12);c.fillStyle=p.theme.c2;c.fillRect(0,sy+sh,W,12);
  // One staggered row with feet on the floor; every other cat stands a step back and is drawn first.
  const n=cats.length,cw=Math.min(380,1080/(n*.5+.5)),ch=cw*192/116,step=cw*.5,x0=(W-(step*(n-1)+cw))/2;
  const order=cats.map((ct,i)=>i).sort((a,b)=>(b%2)-(a%2));
  for(const i of order){
    const back=i%2===1,sc=back?.9:1,w=cw*sc,h=ch*sc,feet=floor+(back?-38:6);
    const svg=strip(catSVG(cats[i])).replace(/<g class="mo">[\s\S]*?<\/g>/g,'').replace('<defs>','<defs>'+defsInner).replace('<svg ',`<svg width="${w*2}" height="${h*2}" `);
    const im=await img(svg);if(im)c.drawImage(im,x0+i*step+(cw-w)/2,feet-h*.977,w,h);
  }
  c.textAlign='center';
  c.font='800 60px "Baloo 2",sans-serif';c.fillStyle='#ff3d86';c.fillText('Billi Beats',W/2+4,104);c.fillStyle='#ffc21a';c.fillText('Billi Beats',W/2,100);
  c.font='700 32px "Hind Madurai",sans-serif';c.fillStyle='#c9bdf2';c.fillText(p.title.toUpperCase(),W/2,156);
  c.font='800 84px "Baloo 2",sans-serif';c.fillStyle=p.theme.c1;wrap(c,name,W/2,250,980,88);
  let y=sy+sh+90;
  if(line){c.font='700 46px "Hind Madurai",sans-serif';const tw=c.measureText(line).width;c.fillStyle='#fff4dc';c.beginPath();c.roundRect((W-tw)/2-36,y-58,tw+72,90,45);c.fill();c.fillStyle='#170e33';c.fillText(line,W/2,y+2);y+=96;}
  c.font='800 52px "Baloo 2",sans-serif';c.fillStyle='#fff4dc';c.fillText('Can your cats beat this?',W/2,y+10);
  c.font='700 34px "Hind Madurai",sans-serif';c.fillStyle='#12c2b0';c.fillText(url,W/2,y+66);
  return new Promise(res=>cv.toBlob(b=>res(b),'image/png'));
}
