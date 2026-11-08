/* ============================================================
   BASE — technical product drawings
   Elevation drawings in a consistent drafting language:
   bronze bodies, blue centre/dimension lines, monospace callouts.
   ============================================================ */
(function(){
'use strict';
const BR='#C08B44', BL='#E5B76E', BD='#7E5824', TC='#5BAEE0', DM='rgba(91,174,224,.55)';

/* --- shared primitives --- */
const defs = uid => `
  <defs>
    <linearGradient id="${uid}b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${BL}"/><stop offset="46%" stop-color="${BR}"/><stop offset="100%" stop-color="${BD}"/>
    </linearGradient>
    <linearGradient id="${uid}s" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3B454C"/><stop offset="100%" stop-color="#1B2227"/>
    </linearGradient>
  </defs>`;
const centre = (x,y1,y2)=>`<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${DM}" stroke-width="1" stroke-dasharray="14 5 3 5"/>`;
const hCentre= (y,x1,x2)=>`<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${DM}" stroke-width="1" stroke-dasharray="14 5 3 5"/>`;
/* dimension line with end ticks and a label */
function dim(x1,y1,x2,y2,label,flip){
  const mx=(x1+x2)/2, my=(y1+y2)/2, vert=Math.abs(x2-x1)<2;
  return `<g stroke="${DM}" stroke-width="1" fill="none">
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>
    ${vert?`<line x1="${x1-6}" y1="${y1}" x2="${x1+6}" y2="${y1}"/><line x1="${x2-6}" y1="${y2}" x2="${x2+6}" y2="${y2}"/>`
          :`<line x1="${x1}" y1="${y1-6}" x2="${x1}" y2="${y1+6}"/><line x1="${x2}" y1="${y2-6}" x2="${x2}" y2="${y2+6}"/>`}
  </g>
  <text x="${vert?mx+(flip?-16:16):mx}" y="${vert?my+7:my-12}" text-anchor="${vert?(flip?'end':'start'):'middle'}"
    class="pa-dim">${label}</text>`;
}
/* lettered callout with leader */
function call(letter,px,py,tx,ty,label,anchor){
  return `<g class="pa-call">
    <line x1="${px}" y1="${py}" x2="${tx}" y2="${ty}" stroke="${DM}" stroke-width="1"/>
    <circle cx="${px}" cy="${py}" r="3.4" fill="${TC}"/>
    <circle cx="${tx}" cy="${ty}" r="15" fill="none" stroke="${TC}" stroke-width="1.2"/>
    <text x="${tx}" y="${ty+7}" text-anchor="middle" class="pa-let">${letter}</text>
    <text x="${anchor==='end'?tx-24:tx+24}" y="${ty+7}" text-anchor="${anchor||'start'}" class="pa-lab">${label}</text>
  </g>`;
}
/* coil spring between two points */
function spring(x1,y1,x2,y2,coils,amp){
  const dx=x2-x1, dy=y2-y1, len=Math.hypot(dx,dy), ux=dx/len, uy=dy/len, nx=-uy, ny=ux;
  let d=`M ${x1} ${y1}`;
  for(let i=1;i<=coils;i++){
    const t=i/coils, px=x1+dx*t, py=y1+dy*t, s=(i%2?1:-1)*amp;
    d+=` L ${(px+nx*s).toFixed(1)} ${(py+ny*s).toFixed(1)}`;
  }
  return `<path d="${d} L ${x2} ${y2}" fill="none" stroke="${TC}" stroke-width="3" stroke-linejoin="round"/>`;
}
const ground = (y,x1,x2)=>`<g><line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="rgba(255,255,255,.22)" stroke-width="1.4"/>
  ${Array.from({length:Math.floor((x2-x1)/18)},(_,i)=>`<line x1="${x1+i*18}" y1="${y}" x2="${x1+i*18-9}" y2="${y+10}" stroke="rgba(255,255,255,.12)" stroke-width="1"/>`).join('')}</g>`;

/* ─────────── 1 · INDEPENDENT SUSPENSION DRIVE AXLE ─────────── */
function ids(){
  const u='a1', cx=500, ay=248, gy=392;
  const hub=x=>`
    <g>
      <rect x="${x-34}" y="${ay-52}" width="68" height="104" rx="12" fill="url(#${u}b)" stroke="${BL}" stroke-width="1.4"/>
      <rect x="${x-18}" y="${ay-30}" width="36" height="60" rx="6" fill="none" stroke="${BD}" stroke-width="1.4"/>
      <circle cx="${x}" cy="${ay}" r="60" fill="none" stroke="url(#${u}s)" stroke-width="9"/>
      <circle cx="${x}" cy="${ay}" r="60" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="1"/>
      <circle cx="${x}" cy="${ay}" r="14" fill="${BL}"/>
      ${Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;
        return `<circle cx="${(x+Math.cos(a)*34).toFixed(1)}" cy="${(ay+Math.sin(a)*34).toFixed(1)}" r="3.4" fill="${BD}"/>`}).join('')}
    </g>`;
  const side=s=>`
    ${spring(cx+s*118, ay-118, cx+s*268, ay-24, 9, 13)}
    <line x1="${cx+s*118}" y1="${ay-118}" x2="${cx+s*118}" y2="${ay-134}" stroke="${TC}" stroke-width="4" stroke-linecap="round"/>
    <path d="M ${cx+s*74} ${ay-30} L ${cx+s*286} ${ay-52}" stroke="${TC}" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M ${cx+s*70} ${ay+34} L ${cx+s*286} ${ay+48}" stroke="${TC}" stroke-width="7" stroke-linecap="round" fill="none"/>
    <rect x="${cx+s*100-13}" y="${ay-13}" width="26" height="26" rx="13" fill="${BD}" stroke="${BL}" stroke-width="1.4"/>
    <rect x="${cx+s*196-13}" y="${ay-13}" width="26" height="26" rx="13" fill="${BD}" stroke="${BL}" stroke-width="1.4"/>
    <line x1="${cx+s*56}" y1="${ay}" x2="${cx+s*286}" y2="${ay}" stroke="url(#${u}b)" stroke-width="17" stroke-linecap="round"/>
    ${hub(cx+s*318)}`;
  return `<svg viewBox="-250 -40 1500 596" class="pa" role="img" aria-label="Independent suspension drive axle, front elevation">
    ${defs(u)}
    ${centre(cx,26,gy+18)} ${hCentre(ay,40,960)}
    ${side(-1)} ${side(1)}
    <ellipse cx="${cx}" cy="${ay}" rx="66" ry="58" fill="url(#${u}b)" stroke="${BL}" stroke-width="1.6"/>
    <ellipse cx="${cx}" cy="${ay}" rx="40" ry="34" fill="none" stroke="${BD}" stroke-width="1.6"/>
    <circle cx="${cx}" cy="${ay}" r="9" fill="${BL}"/>
    <rect x="${cx-26}" y="${ay-96}" width="52" height="44" rx="6" fill="url(#${u}b)" stroke="${BL}" stroke-width="1.3"/>
    ${ground(gy,60,940)}
    ${dim(182,gy+40,818,gy+40,'TRACK WIDTH')}
    ${dim(870,ay-118,870,ay+58,'WHEEL TRAVEL 400 mm',false)}
    ${call('A',cx,ay-20,cx-38,120,'ALUMINIUM DIFF HOUSING','end')}
    ${call('B',cx+150,ay,690,116,'HALF SHAFT / CV JOINT')}
    ${call('C',cx+318,ay-44,760,300,'HUB REDUCTION')}
    ${call('D',cx-318,ay+40,240,330,'DISC / DRUM BRAKE','end')}
    ${call('E',cx-200,ay+42,150,196,'CONTROL ARMS','end')}
    ${call('F',cx-190,ay-70,270,66,'SPRING & DAMPER','end')}
  </svg>`;
}

/* ─────────── 2 · RIGID DRIVE AXLE ─────────── */
function rda(){
  const u='a2', cx=500, ay=252, gy=392;
  const hub=x=>`
    <g>
      <rect x="${x-36}" y="${ay-56}" width="72" height="112" rx="12" fill="url(#${u}b)" stroke="${BL}" stroke-width="1.4"/>
      <circle cx="${x}" cy="${ay}" r="62" fill="none" stroke="url(#${u}s)" stroke-width="11"/>
      <circle cx="${x}" cy="${ay}" r="62" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="1"/>
      <circle cx="${x}" cy="${ay}" r="40" fill="none" stroke="${BD}" stroke-width="1.6"/>
      <circle cx="${x}" cy="${ay}" r="15" fill="${BL}"/>
      ${Array.from({length:10},(_,i)=>{const a=i*Math.PI/5;
        return `<circle cx="${(x+Math.cos(a)*30).toFixed(1)}" cy="${(ay+Math.sin(a)*30).toFixed(1)}" r="3.2" fill="${BD}"/>`}).join('')}
    </g>`;
  return `<svg viewBox="-250 -40 1500 596" class="pa" role="img" aria-label="Rigid drive axle, front elevation">
    ${defs(u)}
    ${centre(cx,26,gy+18)} ${hCentre(ay,40,960)}
    <path d="M 196 ${ay-30} L 400 ${ay-30} L 430 ${ay-46} L 570 ${ay-46} L 600 ${ay-30} L 804 ${ay-30}
             L 804 ${ay+30} L 600 ${ay+30} L 570 ${ay+46} L 430 ${ay+46} L 400 ${ay+30} L 196 ${ay+30} Z"
      fill="url(#${u}b)" stroke="${BL}" stroke-width="1.6" stroke-linejoin="round"/>
    <ellipse cx="${cx}" cy="${ay}" rx="76" ry="66" fill="url(#${u}b)" stroke="${BL}" stroke-width="1.6"/>
    <ellipse cx="${cx}" cy="${ay}" rx="46" ry="38" fill="none" stroke="${BD}" stroke-width="1.6"/>
    <circle cx="${cx}" cy="${ay}" r="10" fill="${BL}"/>
    ${[-1,1].map(s=>`<rect x="${cx+s*230-42}" y="${ay-52}" width="84" height="24" rx="4" fill="url(#${u}b)" stroke="${BL}" stroke-width="1.2"/>
      <line x1="${cx+s*230-30}" y1="${ay-52}" x2="${cx+s*230-30}" y2="${ay-84}" stroke="${TC}" stroke-width="4"/>
      <line x1="${cx+s*230+30}" y1="${ay-52}" x2="${cx+s*230+30}" y2="${ay-84}" stroke="${TC}" stroke-width="4"/>
      <rect x="${cx+s*230-46}" y="${ay-100}" width="92" height="18" rx="4" fill="none" stroke="${TC}" stroke-width="2"/>`).join('')}
    ${hub(cx-320)} ${hub(cx+320)}
    ${ground(gy,60,940)}
    ${dim(180,gy+40,820,gy+40,'TRACK WIDTH')}
    ${call('A',cx,ay-24,cx-30,118,'INTER-WHEEL DIFF LOCK','end')}
    ${call('B',cx+150,ay-30,700,132,'ONE-PIECE BEAM HOUSING')}
    ${call('C',cx+320,ay-50,780,308,'HUB REDUCTION')}
    ${call('D',cx-320,ay+44,236,336,'AIR DISC / AIR DRUM BRAKE','end')}
    ${call('E',cx-230,ay-92,196,120,'SUSPENSION MOUNTS','end')}
  </svg>`;
}

/* ─────────── 3 · TWO-SPEED TRANSFER CASE ─────────── */
function tc(){
  const u='a3';
  const gear=(x,y,r,teeth)=>`
    <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${BL}" stroke-width="1.6"/>
    <circle cx="${x}" cy="${y}" r="${r-9}" fill="none" stroke="${BD}" stroke-width="1.2"/>
    <circle cx="${x}" cy="${y}" r="7" fill="${BL}"/>
    ${Array.from({length:teeth},(_,i)=>{const a=(2*Math.PI/teeth)*i;
      return `<line x1="${(x+Math.cos(a)*r).toFixed(1)}" y1="${(y+Math.sin(a)*r).toFixed(1)}" x2="${(x+Math.cos(a)*(r+7)).toFixed(1)}" y2="${(y+Math.sin(a)*(r+7)).toFixed(1)}" stroke="${BL}" stroke-width="2"/>`}).join('')}`;
  const flange=(x,y,h)=>`<rect x="${x-13}" y="${y-h/2}" width="26" height="${h}" rx="4" fill="url(#${u}b)" stroke="${BL}" stroke-width="1.3"/>
    <line x1="${x-13}" y1="${y}" x2="${x+13}" y2="${y}" stroke="${BD}" stroke-width="1.4"/>`;
  return `<svg viewBox="-250 -40 1500 596" class="pa" role="img" aria-label="Two-speed transfer case, side elevation">
    ${defs(u)}
    ${hCentre(150,40,960)} ${hCentre(330,40,960)} ${centre(500,40,440)}
    <path d="M 300 96 L 660 96 Q 706 96 716 138 L 738 236 Q 748 286 720 322 L 690 372
             Q 674 396 640 396 L 344 396 Q 306 396 296 358 L 268 244 Q 258 196 278 152 Q 288 108 300 96 Z"
      fill="url(#${u}b)" opacity=".22" stroke="${BL}" stroke-width="1.8" stroke-linejoin="round"/>
    ${gear(400,150,54,20)} ${gear(400,330,72,26)}
    ${gear(600,150,44,16)} ${gear(600,330,60,22)}
    <line x1="400" y1="150" x2="600" y2="150" stroke="${BD}" stroke-width="2" stroke-dasharray="5 5"/>
    <line x1="400" y1="330" x2="600" y2="330" stroke="${BD}" stroke-width="2" stroke-dasharray="5 5"/>
    ${flange(268,150,74)} ${flange(742,330,74)} ${flange(268,330,74)}
    <rect x="452" y="52" width="92" height="42" rx="7" fill="url(#${u}b)" stroke="${BL}" stroke-width="1.4"/>
    <line x1="498" y1="52" x2="498" y2="30" stroke="${TC}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="498" cy="24" r="8" fill="none" stroke="${TC}" stroke-width="2"/>
    ${dim(830,150,830,330,'DROP 330–535 mm',false)}
    ${call('A',268,150,210,74,'INPUT FLANGE','end')}
    ${call('B',600,150,760,84,'MODULAR GEAR SET')}
    ${call('C',498,60,560,26,'INTERAXLE DIFFERENTIAL LOCK')}
    ${call('D',742,330,806,420,'OUTPUT — REAR','end')}
    ${call('E',268,330,206,420,'OUTPUT — FRONT','end')}
    ${call('F',330,250,180,232,'ALUMINIUM HOUSING','end')}
  </svg>`;
}

/* ─────────── 4 · 4×4 ROLLING CHASSIS ─────────── */
function rc(){
  const u='a4', gy=396, R=62, wheels=[268,760];
  const wheel=x=>`<g>
    <circle cx="${x}" cy="${gy-R}" r="${R}" fill="none" stroke="url(#${u}s)" stroke-width="15"/>
    <circle cx="${x}" cy="${gy-R}" r="${R}" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1"/>
    <circle cx="${x}" cy="${gy-R}" r="${R-24}" fill="none" stroke="${BD}" stroke-width="1.6"/>
    <circle cx="${x}" cy="${gy-R}" r="13" fill="${BL}"/></g>`;
  const susp=x=>`<g class="pa-s">
    <path d="M ${x-4} ${gy-R-18} L ${x-92} ${254}" stroke="${TC}" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M ${x-2} ${gy-R+20} L ${x-86} ${286}" stroke="${TC}" stroke-width="6" stroke-linecap="round" fill="none"/>
    ${spring(x-46,gy-R-30,x-70,180,7,12)}</g>`;
  return `<svg viewBox="-250 -40 1500 596" class="pa" role="img" aria-label="4x4 rolling chassis, side elevation">
    ${defs(u)}
    ${hCentre(268,40,960)}
    <rect x="150" y="252" width="760" height="20" rx="3" fill="url(#${u}s)" stroke="rgba(255,255,255,.2)" stroke-width="1"/>
    <rect x="150" y="286" width="760" height="14" rx="3" fill="url(#${u}s)" stroke="rgba(255,255,255,.14)" stroke-width="1"/>
    ${[240,400,560,720,860].map(x=>`<rect x="${x}" y="${272}" width="12" height="14" fill="rgba(255,255,255,.09)"/>`).join('')}
    <rect x="176" y="150" width="150" height="104" rx="8" fill="url(#${u}s)" stroke="rgba(255,255,255,.24)" stroke-width="1.4"/>
    ${Array.from({length:4},(_,i)=>`<line x1="${196+i*32}" y1="158" x2="${196+i*32}" y2="246" stroke="rgba(255,255,255,.14)" stroke-width="2"/>`).join('')}
    <rect x="336" y="186" width="128" height="68" rx="7" fill="url(#${u}s)" stroke="rgba(255,255,255,.2)" stroke-width="1.3"/>
    <rect x="480" y="248" width="104" height="72" rx="8" fill="url(#${u}b)" stroke="${BL}" stroke-width="1.5"/>
    <rect x="498" y="264" width="68" height="40" rx="4" fill="none" stroke="${BD}" stroke-width="1.3"/>
    ${wheels.map(x=>`<line x1="532" y1="284" x2="${x}" y2="${gy-R}" stroke="${BR}" stroke-width="7" stroke-linecap="round" opacity=".8"/>`).join('')}
    ${wheels.map(x=>`<line x1="${x-112}" y1="${gy-R}" x2="${x+112}" y2="${gy-R}" stroke="url(#${u}b)" stroke-width="13" stroke-linecap="round"/>
      <ellipse cx="${x}" cy="${gy-R}" rx="42" ry="33" fill="url(#${u}b)" stroke="${BL}" stroke-width="1.4"/>`).join('')}
    ${wheels.map(susp).join('')} ${wheels.map(wheel).join('')}
    ${ground(gy,60,940)}
    ${dim(268,gy+42,760,gy+42,'WHEELBASE')}
    ${call('A',250,190,150,96,'DIESEL ENGINE','end')}
    ${call('B',400,196,404,44,'AUTOMATIC TRANSMISSION')}
    ${call('C',532,254,700,132,'BASE TRANSFER CASE')}
    ${call('D',760,334,918,222,'BASE DRIVE AXLE','end')}
    ${call('E',176,262,116,352,'LADDER / FRAMELESS','end')}
  </svg>`;
}

window.BASE_ART = { ids, rda, tc, rc };
})();
