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
  // stage art in the middle band
  const sy=560,sh=900,bg=await img(strip(backdrop(p.theme.bg)).replace('<svg ','<svg width="2400" height="900" '));
  if(bg){c.save();c.beginPath();c.rect(0,sy,W,sh);c.clip();c.drawImage(bg,(W-2400)/2,sy,2400,sh);c.restore();}
  c.fillStyle=p.theme.c1;c.fillRect(0,sy-10,W,10);c.fillStyle=p.theme.c2;c.fillRect(0,sy+sh,W,10);
  // cats: back row then front row, standing on the stage floor
  const rows=cats.length>4?[cats.slice(0,Math.ceil(cats.length/2)),cats.slice(Math.ceil(cats.length/2))]:[cats];
  for(let r=0;r<rows.length;r++){
    const row=rows[r],cw=rows.length>1?(r?290:250):Math.min(300,1000/row.length),ch=cw*192/116,gap=Math.min(cw*1.02,(W-80-cw)/Math.max(1,row.length-1));
    const x0=(W-(gap*(row.length-1)+cw))/2,base=sy+sh-(rows.length>1?(r?40:300):110);
    for(let i=0;i<row.length;i++){
      const svg=strip(catSVG(row[i])).replace('<defs>','<defs>'+defsInner).replace('<svg ','<svg width="'+cw*2+'" height="'+ch*2+'" ');
      const im=await img(svg);if(im)c.drawImage(im,x0+i*gap,base-ch,cw,ch);
    }
  }
  // words
  c.textAlign='center';
  c.font='800 64px "Baloo 2",sans-serif';c.fillStyle='#ff3d86';c.fillText('Billi Beats',W/2+4,154);c.fillStyle='#ffc21a';c.fillText('Billi Beats',W/2,150);
  c.font='700 34px "Hind Madurai",sans-serif';c.fillStyle='#c9bdf2';c.fillText(p.title.toUpperCase(),W/2,214);
  c.font='800 92px "Baloo 2",sans-serif';c.fillStyle=p.theme.c1;wrap(c,name,W/2,340,960,96);
  if(line){c.fillStyle='#fff4dc';const tw=(c.font='700 46px "Hind Madurai",sans-serif',c.measureText(line).width);c.beginPath();c.roundRect((W-tw)/2-36,sy+sh+70,tw+72,92,46);c.fill();c.fillStyle='#170e33';c.fillText(line,W/2,sy+sh+132);}
  c.font='700 40px "Hind Madurai",sans-serif';c.fillStyle='#fff4dc';c.fillText('Can your cats beat this?',W/2,H-190);
  c.font='700 44px "Hind Madurai",sans-serif';c.fillStyle='#12c2b0';c.fillText(url,W/2,H-116);
  return new Promise(res=>cv.toBlob(b=>res(b),'image/png'));
}
