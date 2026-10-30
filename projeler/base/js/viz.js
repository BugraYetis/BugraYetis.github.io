/* ============================================================
   BASE — Visualisation engine
   Procedural vehicle / axle SVG + LED environment scenes.
   Vehicles are deliberately generic and anonymous: BASE supplies
   drivetrain, not complete vehicles. The axle is the hero.
   ============================================================ */
(function(){
'use strict';

/* ---------- deterministic pseudo-random ---------- */
function rng(seed){ let s=seed>>>0||1; return ()=>{ s^=s<<13; s^=s>>>17; s^=s<<5; return ((s>>>0)/4294967296); }; }

/* ---------- smooth ridge path generator ---------- */
function ridge(seed,{w=2400,base=560,amp=110,steps=13,jag=0}={}){
  const r=rng(seed), pts=[];
  for(let i=0;i<=steps;i++){
    const x=(w/steps)*i;
    let y=base-Math.sin(i*1.7+seed*.31)*amp*.45-r()*amp;
    if(jag) y-= (i%2? jag*r() : -jag*r()*.5);
    pts.push([x,y]);
  }
  let d=`M -40 ${base+400} L -40 ${pts[0][1]}`;
  for(let i=0;i<pts.length-1;i++){
    const [x0,y0]=pts[i],[x1,y1]=pts[i+1], mx=(x0+x1)/2;
    d+=` Q ${x0} ${y0} ${mx} ${(y0+y1)/2}`;
  }
  d+=` L ${w+40} ${pts[pts.length-1][1]} L ${w+40} ${base+400} Z`;
  return d;
}
function groundPath(seed,{w=2400,base=690,amp=16,steps=44}={}){
  const r=rng(seed); let d=`M -40 ${base} `;
  for(let i=0;i<=steps;i++){
    const x=(w/steps)*i, y=base+(r()-.5)*amp;
    d+=`L ${x.toFixed(0)} ${y.toFixed(1)} `;
  }
  return d+`L ${w+40} ${base} L ${w+40} 1000 L -40 1000 Z`;
}

/* ============================================================
   ENVIRONMENTS
   ============================================================ */
const ENVS = {
  desert:{
    label:'DESERT', short:'Extreme Desert',
    sky:['#F2CE96','#DDA061','#A97F52','#3E5169'],
    far:'#7B5637', mid:'#96693D', near:'#B07E43', ground:'#C08B44',
    haze:'rgba(235,192,124,.30)', sun:'rgba(255,224,170,.85)', sunPos:[.68,.30],
    fx:'sand', tempNote:'+52 °C', hud:'#F0D2A2',
    ridgeSeed:[7,19], jag:0
  },
  arctic:{
    label:'ARCTIC', short:'Arctic / Extreme Cold',
    sky:['#D7E7F2','#9CBBD2','#5E7B93','#2A3946'],
    far:'#6F8CA3', mid:'#93AFC6', near:'#C6DAE8', ground:'#E4EFF6',
    haze:'rgba(215,231,242,.34)', sun:'rgba(226,240,252,.72)', sunPos:[.30,.24],
    fx:'snow', tempNote:'−41 °C', hud:'#DCEDF8',
    ridgeSeed:[23,41], jag:26
  },
  forest:{
    label:'FOREST', short:'Forest / Temperate',
    sky:['#BFCFC4','#8B9E8C','#48594A','#1E2A20'],
    far:'#3D5142', mid:'#2C3E31', near:'#22301F', ground:'#2B3A28',
    haze:'rgba(191,207,196,.22)', sun:'rgba(226,236,214,.55)', sunPos:[.52,.20],
    fx:'mist', tempNote:'+18 °C', hud:'#CFE0CE',
    ridgeSeed:[53,67], jag:8
  },
  rock:{
    label:'ROCK', short:'Rock / High Altitude',
    sky:['#A7B1B7','#717B82','#3D464D','#1B2126'],
    far:'#49525A', mid:'#5C666E', near:'#78828A', ground:'#5A636A',
    haze:'rgba(167,177,183,.22)', sun:'rgba(226,232,238,.5)', sunPos:[.42,.18],
    fx:'dust', tempNote:'+6 °C', hud:'#D3DDE4',
    ridgeSeed:[83,97], jag:38
  },
  mud:{
    label:'MUD / EXTREME', short:'Mud / Extreme Terrain',
    sky:['#7E7768','#5A5347','#332F27','#16140F'],
    far:'#39332A', mid:'#4A4136', near:'#5C5142', ground:'#463C2E',
    haze:'rgba(126,119,104,.26)', sun:'rgba(214,205,182,.35)', sunPos:[.58,.22],
    fx:'rain', tempNote:'+29 °C', hud:'#E0D6BE',
    ridgeSeed:[109,127], jag:14
  }
};

/* ---------- one environment layer (inside the panorama) ---------- */
const PANO={W:2400,H:750,gY:560};
function envLayer(key){
  const e=ENVS[key], W=PANO.W,H=PANO.H, gY=PANO.gY;
  const uid='e_'+key;
  const farD = ridge(e.ridgeSeed[0], {w:W, base:500, amp:118, steps:11, jag:e.jag});
  const midD = ridge(e.ridgeSeed[1], {w:W, base:545, amp:72, steps:16, jag:e.jag*.6});
  const grD  = groundPath(e.ridgeSeed[0]+e.ridgeSeed[1], {w:W, base:gY, amp:14, steps:60});
  return `
  <svg class="envl" data-envl="${key}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="${uid}_sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"  stop-color="${e.sky[3]}"/>
        <stop offset="34%" stop-color="${e.sky[2]}"/>
        <stop offset="70%" stop-color="${e.sky[1]}"/>
        <stop offset="100%" stop-color="${e.sky[0]}"/>
      </linearGradient>
      <radialGradient id="${uid}_sun" cx="${e.sunPos[0]}" cy="${e.sunPos[1]}" r=".42">
        <stop offset="0%" stop-color="${e.sun}"/><stop offset="100%" stop-color="transparent"/>
      </radialGradient>
      <linearGradient id="${uid}_gr" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${e.ground}"/><stop offset="100%" stop-color="${e.far}"/>
      </linearGradient>
      <linearGradient id="${uid}_hz" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="transparent"/><stop offset="100%" stop-color="${e.haze}"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#${uid}_sky)"/>
    <rect width="${W}" height="${H}" fill="url(#${uid}_sun)"/>
    <path d="${farD}" fill="${e.far}" opacity=".72"/>
    <rect y="370" width="${W}" height="200" fill="url(#${uid}_hz)"/>
    <path d="${midD}" fill="${e.mid}" opacity=".9"/>
    <path d="${grD}" fill="url(#${uid}_gr)"/>
    <path d="${grD}" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1.4" transform="translate(0,-2)"/>
  </svg>`;
}

/* ============================================================
   VEHICLE / AXLE
   ============================================================ */
const CFG = {
  2:{ wheels:[352,884], x0:236, x1:986,  cab:492, drive:'4×4', label:'2-AXLE PLATFORM' },
  3:{ wheels:[330,790,972], x0:222, x1:1062, cab:478, drive:'6×6', label:'3-AXLE PLATFORM' },
  4:{ wheels:[292,478,860,1046], x0:210, x1:1118, cab:466, drive:'8×8', label:'4-AXLE PLATFORM' }
};
const VB={ w:1340, h:520, ground:392, R:58, rim:33, sill:336, railT:288, railB:302, hood:246, ws:158, roof:156, modRoof:132 };

function wheel(x,y,o){
  const {R,rim}=VB, eng=o.eng;
  const tyre  = eng? 'none' : '#0C1013';
  const tStroke = eng? 'rgba(91,174,224,.45)' : '#242C31';
  const spokes = [];
  for(let i=0;i<6;i++){ const a=(Math.PI/3)*i + (o.spin||0);
    spokes.push(`<line x1="${(x+Math.cos(a)*13).toFixed(1)}" y1="${(y+Math.sin(a)*13).toFixed(1)}" x2="${(x+Math.cos(a)*(rim-5)).toFixed(1)}" y2="${(y+Math.sin(a)*(rim-5)).toFixed(1)}" stroke="${eng?'rgba(91,174,224,.4)':'#39434A'}" stroke-width="3.5" stroke-linecap="round"/>`); }
  return `<g class="whl">
    <circle cx="${x}" cy="${y}" r="${R}" fill="${tyre}" stroke="${tStroke}" stroke-width="${eng?1.4:2}"/>
    <circle cx="${x}" cy="${y}" r="${R-9}" fill="none" stroke="${eng?'rgba(91,174,224,.28)':'#1A2126'}" stroke-width="${eng?1:9}" stroke-dasharray="${eng?'6 7':'14 9'}"/>
    <circle cx="${x}" cy="${y}" r="${rim}" fill="${eng?'none':'#171D22'}" stroke="${eng?'rgba(91,174,224,.5)':'#2C353B'}" stroke-width="1.6"/>
    ${spokes.join('')}
    <circle cx="${x}" cy="${y}" r="13" fill="${eng?'none':'#C08B44'}" stroke="#E5B76E" stroke-width="${eng?2:1.2}" opacity="${eng?1:.9}"/>
  </g>`;
}

/* the BASE axle group — schematic, shown through the wheel in engineering view */
function axleGroup(x,y,o){
  const hi = o.eng ? 1 : 0;
  const c = '#C08B44', cl='#E5B76E';
  const op = hi? 1 : .0;
  if(!hi) return '';
  return `<g class="axl" opacity="${op}">
    <line x1="${x-118}" y1="${y}" x2="${x+118}" y2="${y}" stroke="${c}" stroke-width="13" stroke-linecap="round" opacity=".95"/>
    <line x1="${x-118}" y1="${y}" x2="${x+118}" y2="${y}" stroke="${cl}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
    <ellipse cx="${x}" cy="${y}" rx="44" ry="34" fill="#8A6230" stroke="${cl}" stroke-width="1.8"/>
    <ellipse cx="${x}" cy="${y}" rx="26" ry="20" fill="none" stroke="${cl}" stroke-width="1.4" opacity=".8"/>
    <circle cx="${x}" cy="${y}" r="7" fill="${cl}"/>
    <rect x="${x-96}" y="${y-26}" width="26" height="52" rx="5" fill="#8A6230" stroke="${cl}" stroke-width="1.4"/>
    <rect x="${x+70}" y="${y-26}" width="26" height="52" rx="5" fill="#8A6230" stroke="${cl}" stroke-width="1.4"/>
  </g>`;
}

/* Faceted armoured-hull profile — sloped glacis, angled windscreen, low roof,
   chamfered rear. Matches the wheeled platforms in the BASE lineup renders
   rather than a cab-and-box truck. */
function bodyPath(c){
  const {sill}=VB, {x0,x1}=c;
  const btm=sill+22;                       // hull skirt drops between the wheels
  return `M ${x0+46} ${btm}
    L ${x0+8} 310
    L ${x0+76} 238
    L ${x0+122} 228
    L ${x0+210} 150
    L ${x1-74} 150
    L ${x1-24} 178
    L ${x1-14} 322
    L ${x1-52} ${btm} Z`;
}
/* remote weapon station on the roof — reads instantly as a protected platform */
function turret(c,eng){
  const {x0}=c, bx=x0+296, by=150;
  const st = eng?'rgba(91,174,224,.75)':'#39434A', fl = eng?'rgba(91,174,224,.06)':'#2A333A';
  return `<g class="tur">
    <path d="M ${bx} ${by} L ${bx+18} ${by-46} L ${bx+96} ${by-46} L ${bx+114} ${by} Z"
      fill="${fl}" stroke="${st}" stroke-width="${eng?1.6:1.4}" stroke-linejoin="round"/>
    <rect x="${bx+30}" y="${by-64}" width="46" height="20" rx="3" fill="${fl}" stroke="${st}" stroke-width="1.3"/>
    <line x1="${bx+30}" y1="${by-32}" x2="${bx-96}" y2="${by-40}" stroke="${st}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="${bx+22}" cy="${by-26}" r="6" fill="none" stroke="${st}" stroke-width="1.3"/>
  </g>`;
}
/**
 * vehicleSVG(opts)
 *  axles 2|3|4 · eng (engineering view) · grade (deg) · artic (0..1) · load (0..1)
 *  labels · challenge (force overlays) · scale
 */
function vehicleSVG(o){
  o=Object.assign({axles:2,eng:false,grade:0,artic:0,load:0,labels:true,challenge:false,idle:true},o);
  const c=CFG[o.axles]||CFG[2], {ground,sill,railT,railB,R}=VB;
  const r=rng(o.axles*97+7);
  const sag = o.load*13;
  const dys = c.wheels.map((_,i)=> o.artic ? (r()-.45)*46*o.artic : 0);

  /* wheels + axles */
  let wheels='', axles='', susp='';
  c.wheels.forEach((wx,i)=>{
    const wy = ground - R + dys[i] + sag*.35;
    wheels += wheel(wx, wy, o);
    axles  += axleGroup(wx, wy, o);
    if(o.eng){
      susp += `<g class="susp-g"><g stroke="rgba(91,174,224,.85)" fill="none" stroke-width="2.6" stroke-linecap="round">
        <path d="M ${wx-6} ${wy-16} L ${wx-104} ${railB-8}"/>
        <path d="M ${wx-4} ${wy+20} L ${wx-96} ${railB+14}"/>
      </g>
      <g stroke="#5BAEE0" fill="none" stroke-width="2">
        <line x1="${wx-52}" y1="${wy-30}" x2="${wx-64}" y2="${railT-14}"/>
        <path d="M ${wx-58} ${wy-34} l -5 -9 l 10 -7 l -10 -7 l 10 -7 l -10 -7 l 10 -7 l -5 -9" opacity=".9"/>
      </g></g>`;
    }
  });

  /* drive line + transfer case (engineering view) */
  let drive='';
  if(o.eng){
    const y=railB+16, tcx=(c.wheels[0]+c.wheels[c.wheels.length-1])/2 - 40;
    let shafts='';
    c.wheels.forEach(wx=>{ shafts+=`<line x1="${tcx}" y1="${y}" x2="${wx}" y2="${ground-R+ (o.artic?0:0)}" stroke="#C08B44" stroke-width="5" opacity=".55" stroke-linecap="round"/>`; });
    drive=`<g class="drv">${shafts}
      <rect x="${tcx-46}" y="${y-34}" width="92" height="68" rx="8" fill="#8A6230" stroke="#E5B76E" stroke-width="1.8"/>
      <rect x="${tcx-30}" y="${y-20}" width="60" height="40" rx="4" fill="none" stroke="#E5B76E" stroke-width="1.2" opacity=".7"/>
      ${o.labels?`<line x1="${tcx}" y1="${y-34}" x2="${tcx}" y2="88" stroke="#E5B76E" stroke-width="1.1" opacity=".7"/>
      <text x="${tcx}" y="76" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="22" fill="#E5B76E" letter-spacing="2.5">TWO-SPEED TRANSFER CASE</text>`:''}
    </g>`;
  }

  /* body */
  const bp=bodyPath(c);
  const bodyFill  = o.eng? 'rgba(91,174,224,.05)' : 'url(#vBody)';
  const bodyStroke= o.eng? 'rgba(91,174,224,.75)' : '#2B343A';
  const glass = o.eng? 'none':'url(#vGlass)';

  /* hull panel joints and the V-hull chamfer line */
  const hullS = o.eng?'rgba(91,174,224,.3)':'rgba(255,255,255,.08)';
  let ribs=`<line x1="${c.x0+52}" y1="302" x2="${c.x1-22}" y2="302" stroke="${hullS}" stroke-width="1.6"/>`;
  for(let x=c.x0+236; x<c.x1-90; x+=96){
    ribs+=`<line x1="${x}" y1="158" x2="${x}" y2="296" stroke="${hullS}" stroke-width="1.4"/>`;
  }
  /* vision blocks along the upper hull */
  if(!o.eng){
    for(let i=0;i<3;i++){ const vx=c.x0+250+i*84;
      ribs+=`<rect x="${vx}" y="168" width="46" height="20" rx="2" fill="rgba(146,196,230,.28)" stroke="#39434A" stroke-width="1"/>`; }
  }
  /* angular armoured wheel arches */
  let arches='';
  c.wheels.forEach(wx=>{
    arches+=`<path d="M ${wx-VB.R-20} ${VB.sill+22} L ${wx-VB.R-2} ${VB.sill-40} L ${wx+VB.R+2} ${VB.sill-40} L ${wx+VB.R+20} ${VB.sill+22}"
      fill="none" stroke="${o.eng?'rgba(91,174,224,.45)':'rgba(0,0,0,.6)'}" stroke-width="3.2" stroke-linejoin="round"/>`;
  });

  /* chassis rail */
  const rail = `<g class="rail-g">
    <rect x="${c.x0+14}" y="${railT}" width="${c.x1-c.x0-28}" height="${railB-railT}" rx="2"
      fill="${o.eng?'rgba(91,174,224,.14)':'#12171B'}" stroke="${o.eng?'#5BAEE0':'#242C31'}" stroke-width="${o.eng?2:1}"/>
    ${o.eng? c.wheels.map(wx=>`<rect x="${wx-8}" y="${railT-10}" width="16" height="${railB-railT+20}" fill="none" stroke="rgba(91,174,224,.6)" stroke-width="1.2"/>`).join('') : ''}
  </g>`;

  /* challenge overlays */
  const gxPre=(c.x0+c.x1)/2;
  let ch='';
  if(o.challenge){
    if(o.grade>0.4){
      const L=(c.x1-c.x0)/2+120;
      ch+=`<g transform="rotate(${-o.grade} ${gxPre} ${ground+26})">
        <line x1="${gxPre-L}" y1="${ground+26}" x2="${gxPre+L}" y2="${ground+26}" stroke="rgba(224,160,48,.75)" stroke-width="3" stroke-dasharray="16 10"/>
        <text x="${gxPre+L+12}" y="${ground+32}" font-family="IBM Plex Mono,monospace" font-size="22" fill="#E0A030" letter-spacing="2">GRADIENT</text>
      </g>`;
    }
    c.wheels.forEach((wx,i)=>{
      const wy=ground-R+dys[i]+sag*.35;
      const f=.4+o.load*.6;
      ch+=`<g class="fx">
        <line x1="${wx}" y1="${wy-96-f*38}" x2="${wx}" y2="${wy-58}" stroke="#D9552F" stroke-width="3" opacity=".9"/>
        <path d="M ${wx-8} ${wy-70} L ${wx} ${wy-56} L ${wx+8} ${wy-70}" fill="none" stroke="#D9552F" stroke-width="3" stroke-linecap="round"/>
        <path d="M ${wx-R-14} ${wy+R-4} a ${R+14} ${R+14} 0 0 0 ${2*(R+14)} 0" fill="none" stroke="#4CC08A" stroke-width="2.4" opacity=".8" stroke-dasharray="7 6"/>
      </g>`;
    });
  }

  /* labels */
  let lbl='';
  if(o.eng && o.labels){
    const wx=c.wheels[c.wheels.length-1], wy=ground-R+dys[dys.length-1];
    lbl=`<g font-family="IBM Plex Mono,monospace" font-size="23" letter-spacing="2.5">
      <line x1="${wx}" y1="${wy+34}" x2="${wx+62}" y2="${ground+56}" stroke="#E5B76E" stroke-width="1.2"/>
      <line x1="${wx+62}" y1="${ground+56}" x2="1282" y2="${ground+56}" stroke="#E5B76E" stroke-width="1.2"/>
      <circle cx="${wx}" cy="${wy+34}" r="4" fill="#E5B76E"/>
      <text x="1290" y="${ground+50}" text-anchor="end" fill="#E5B76E">BASE DRIVE AXLE</text>
      <text x="1290" y="${ground+78}" text-anchor="end" fill="rgba(229,183,110,.75)" font-size="18">HUB REDUCTION · DIFF LOCK · CTIS-READY</text>
      <line x1="${c.wheels[0]}" y1="${ground-R+34}" x2="${c.wheels[0]-70}" y2="${ground+56}" stroke="#5BAEE0" stroke-width="1.2"/>
      <line x1="${c.wheels[0]-70}" y1="${ground+56}" x2="68" y2="${ground+56}" stroke="#5BAEE0" stroke-width="1.2"/>
      <circle cx="${c.wheels[0]}" cy="${ground-R+34}" r="4" fill="#5BAEE0"/>
      <text x="60" y="${ground+50}" fill="#5BAEE0">INDEPENDENT SUSPENSION</text>
      <text x="60" y="${ground+78}" fill="rgba(91,174,224,.75)" font-size="18">WHEEL TRAVEL UP TO 400 mm</text>
    </g>`;
  }

  const gx=(c.x0+c.x1)/2, gy=VB.ground;
  /* In panorama mode the vehicle shares the environment's coordinate system, so its
     wheels always meet the horizon line no matter how the walls are sized. */
  const K=1.16, bodyCx=(c.x0+c.x1)/2, tx=1700-bodyCx*K, ty=PANO.gY-VB.ground*K;
  const F=fitBox(o.axles,o.fit);
  const open = o.pano
    ? `<svg class="veh veh--pano" viewBox="0 0 ${PANO.W} ${PANO.H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">`
    : `<svg class="veh" viewBox="${F.x} ${F.y} ${F.w} ${F.h}" preserveAspectRatio="xMidYMax meet" aria-hidden="true">`;
  const gOpen = o.pano ? `<g transform="translate(${tx.toFixed(1)},${ty.toFixed(1)}) scale(${K})">` : '';
  const gClose= o.pano ? `</g>` : '';
  return `${open}
    <defs>
      <linearGradient id="vBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#39434A"/><stop offset="52%" stop-color="#232B31"/><stop offset="100%" stop-color="#161C21"/>
      </linearGradient>
      <linearGradient id="vGlass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(146,196,230,.55)"/><stop offset="100%" stop-color="rgba(30,44,56,.75)"/>
      </linearGradient>
      <radialGradient id="vShadow"><stop offset="0%" stop-color="rgba(0,0,0,.6)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
    </defs>
    ${gOpen}
    <ellipse cx="${(c.x0+c.x1)/2}" cy="${ground+22}" rx="${(c.x1-c.x0)/1.7}" ry="20" fill="url(#vShadow)"/>
    <g transform="rotate(${-o.grade} ${gx} ${gy})">
      ${rail}${drive}${susp}
      <g class="bdy" opacity="${o.eng?1:1}">
        <path d="${bp}" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="${o.eng?2:1.6}" stroke-linejoin="round"/>
        ${o.eng?'':`<path d="M ${c.x0+132} 228 L ${c.x0+214} 154 L ${c.x0+276} 154 L ${c.x0+188} 228 Z" fill="${glass}" opacity=".92"/>`}
        ${ribs}${arches}
        ${o.eng?'':`<path d="M ${c.x0+14} 292 l 34 -30 l 26 0 l -34 30 z" fill="#DDE7EE" opacity=".75"/>
        <path d="M ${c.x0+18} 264 l 30 -26 l 20 0 l -30 26 z" fill="#C08B44" opacity=".55"/>
        <line x1="${c.x1-56}" y1="150" x2="${c.x1-64}" y2="62" stroke="#39434A" stroke-width="2.4" stroke-linecap="round"/>
        <line x1="${c.x1-88}" y1="150" x2="${c.x1-98}" y2="78" stroke="#39434A" stroke-width="2.4" stroke-linecap="round"/>`}
        ${turret(c,o.eng)}
      </g>
      ${wheels}${axles}${ch}${lbl}
    </g>
    ${gClose}
  </svg>`;
}

/* ---------- simplified axle-only diagram (touchscreen option cards) ---------- */
function axleDiagram(n,active){
  const W=200,H=64,cy=32, positions={2:[52,148],3:[44,110,156],4:[36,84,136,184]}[n];
  const col=active?'#5BAEE0':'#4A5760';
  let g=`<line x1="20" y1="${cy}" x2="${W-20}" y2="${cy}" stroke="${col}" stroke-width="2.4"/>`;
  positions.forEach(x=>{
    g+=`<line x1="${x}" y1="${cy-19}" x2="${x}" y2="${cy+19}" stroke="${col}" stroke-width="2.4"/>
        <circle cx="${x}" cy="${cy-19}" r="6.5" fill="none" stroke="${col}" stroke-width="2.4"/>
        <circle cx="${x}" cy="${cy+19}" r="6.5" fill="none" stroke="${col}" stroke-width="2.4"/>
        <circle cx="${x}" cy="${cy}" r="4.4" fill="${active?'#E5B76E':'#6B7A85'}"/>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" class="axdia">${g}</svg>`;
}

/* ---------- tiny environment thumbnail ---------- */
function envThumb(key,active){
  const e=ENVS[key], u='t_'+key+(active?'a':'b');
  return `<svg viewBox="0 0 64 44" class="envthumb">
    <defs><linearGradient id="${u}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${e.sky[2]}"/><stop offset="100%" stop-color="${e.sky[0]}"/></linearGradient></defs>
    <rect width="64" height="44" fill="url(#${u})" opacity="${active?1:.55}"/>
    <path d="M -2 32 L 12 19 L 24 30 L 34 16 L 48 31 L 66 22 L 66 46 L -2 46 Z" fill="${e.mid}" opacity=".95"/>
    <path d="M -2 36 L 18 33 L 40 37 L 66 33 L 66 46 L -2 46 Z" fill="${e.ground}"/>
  </svg>`;
}


/* ---------- wireframe axle graphic shown on the LED content layer ---------- */
function axleWire(){
  const rings=(cx,rx,ry,n)=>Array.from({length:n},(_,i)=>
    `<ellipse cx="${cx+i*10}" cy="0" rx="${rx}" ry="${ry-i*1.5}"/>`).join('');
  return `<svg class="axwire" viewBox="0 0 760 360" aria-hidden="true">
    <g transform="translate(380,180)" fill="none" stroke="rgba(175,222,250,.85)" stroke-width="2.1">
      <line x1="-300" y1="0" x2="300" y2="0"/>
      <line x1="-300" y1="-22" x2="300" y2="-22" opacity=".4"/>
      <line x1="-300" y1="22" x2="300" y2="22" opacity=".4"/>
      <ellipse rx="96" ry="112"/><ellipse rx="66" ry="80" opacity=".75"/><ellipse rx="34" ry="44" opacity=".55"/>
      <g transform="translate(-250,0)">${rings(0,26,64,5)}</g>
      <g transform="translate(196,0)">${rings(0,26,64,5)}</g>
      <g transform="translate(-160,0)">${rings(0,18,42,3)}</g>
      <g transform="translate(122,0)">${rings(0,18,42,3)}</g>
      <ellipse rx="184" ry="30" opacity=".3"/>
      <ellipse rx="230" ry="38" opacity=".18"/>
    </g>
  </svg>`;
}
/* The drawing viewBox. `fit` crops tight around the platform so it fills
   its container instead of floating in the middle of a fixed 1340-wide box. */
function fitBox(axles,fit){
  if(!fit) return {x:0,y:0,w:VB.w,h:VB.h};
  const c=CFG[axles]||CFG[2];
  return { x:c.x0-96, y:92, w:(c.x1-c.x0)+192, h:392 };
}

/* Normalised (0-1) positions of the key components inside the vehicle viewBox,
   so callers can overlay HTML hotspots on top of the rendered SVG. */
function vehicleGeom(axles,fit){
  const c=CFG[axles]||CFG[2], F=fitBox(axles,fit);
  const W=F.w, H=F.h, ox=F.x, oy=F.y;
  const tcx=(c.wheels[0]+c.wheels[c.wheels.length-1])/2-40;
  const last=c.wheels[c.wheels.length-1];
  const n=(x,y)=>({ x:(x-ox)/W, y:(y-oy)/H });
  /* anchors are spread apart so the hotspot pills never stack on each other */
  return {
    chassis:    n((c.x0+c.x1)/2,   VB.railT),
    transfer:   n(tcx,             VB.railB+22),
    axle:       n(last,            VB.ground-VB.R),
    suspension: n(c.wheels[0]-46,  VB.ground-VB.R-72),
    hub:        n(c.wheels[0],     VB.ground-VB.R)
  };
}
window.BASE_VIZ = { ENVS, CFG, PANO, VB, envLayer, axleWire, vehicleGeom, vehicleSVG, axleDiagram, envThumb, ridge, groundPath, rng };
})();
