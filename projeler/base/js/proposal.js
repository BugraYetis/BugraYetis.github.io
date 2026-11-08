/* ============================================================
   IDEX 2027 PROPOSAL — generated diagrams & content blocks
   ============================================================ */
(function(){
'use strict';
const V=window.BASE_VIZ;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const el=(id)=>document.getElementById(id);

/* ───── 01 challenge grid ───── */
function challengeGrid(){
  const g=el('chalGrid'); if(!g) return;
  g.innerHTML=Array.from({length:45},()=>'<i></i>').join('');
  const cells=$$('i',g);
  let k=0;
  setInterval(()=>{
    cells.forEach(c=>c.classList.remove('on'));
    cells[(k=(k+17)%cells.length)].classList.add('on');
  },2200);
  cells[22].classList.add('on');
}

/* ───── 03 floor plan ───── */
const PLAN=[
  {c:'#046BD2', n:'LED WALL A', s:'Rear-left surface · ~4.5 m'},
  {c:'#3D9BEE', n:'LED WALL B', s:'Rear surface · ~6.0 m'},
  {c:'#5BAEE0', n:'CURVED CORNER TRANSITION', s:'Seamless join — one panorama'},
  {c:'#E5B76E', n:'PHYSICAL AXLE 1 & 2', s:'Lit plinths toward the front'},
  {c:'#F4F1EA', n:'TOUCHSCREEN CONTROLLER', s:'Facing the installation'},
  {c:'#6B7A85', n:'MEETING / SEATING', s:'Positioned toward the rear'},
  {c:'#4A5760', n:'STORAGE / COUNTER', s:'Rear corner service'},
  {c:'#4CC08A', n:'OPEN SIDES', s:'Two adjacent aisles'}
];
function floorPlan(){
  const w=el('planWrap'); if(!w) return;
  const M=54, S=54; // margin, px per metre
  const W=9.5*S, H=7*S, VW=W+M*2, VH=H+M*2;
  const x=m=>M+m*S, y=m=>M+m*S;
  w.innerHTML=`
  <svg viewBox="0 0 ${VW} ${VH}" role="img" aria-label="BASE stand floor plan, 7 by 9.5 metres, corner stand">
    <defs>
      <pattern id="pgrid" width="${S}" height="${S}" patternUnits="userSpaceOnUse">
        <path d="M ${S} 0 L 0 0 0 ${S}" fill="none" stroke="rgba(255,255,255,.05)" stroke-width="1"/></pattern>
      <linearGradient id="ledglow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#046BD2"/><stop offset="100%" stop-color="#5BAEE0"/></linearGradient>
    </defs>
    <rect x="${x(0)}" y="${y(0)}" width="${W}" height="${H}" fill="url(#pgrid)"/>
    <rect x="${x(0)}" y="${y(0)}" width="${W}" height="${H}" fill="rgba(4,107,210,.04)" stroke="rgba(255,255,255,.18)" stroke-width="1.2"/>

    <!-- LED walls -->
    <rect x="${x(0)-9}" y="${y(0)}" width="9" height="${4.5*S}" fill="url(#ledglow)" rx="2"/>
    <rect x="${x(0)}" y="${y(0)-9}" width="${6*S}" height="9" fill="url(#ledglow)" rx="2"/>
    <path d="M ${x(0)-9} ${y(1.0)} Q ${x(0)-9} ${y(0)-9} ${x(1.0)} ${y(0)-9}" fill="none" stroke="#5BAEE0" stroke-width="9" stroke-linecap="round" opacity=".85"/>
    <path d="M ${x(0)} ${y(4.5)} L ${x(0)} ${y(0)} L ${x(6)} ${y(0)}" fill="none" stroke="rgba(91,174,224,.35)" stroke-width="1" stroke-dasharray="4 5"/>
    <path d="M ${x(0.15)} ${y(4.4)} Q ${x(3.2)} ${y(3.4)} ${x(5.9)} ${y(0.15)}" fill="none" stroke="rgba(91,174,224,.28)" stroke-width="1.2" stroke-dasharray="3 6"/>

    <!-- axle plinths -->
    ${plinth(x(1.5),y(4.9),2.0,0.9)}
    ${plinth(x(4.4),y(5.1),2.0,0.9)}

    <!-- touchscreen -->
    <g transform="translate(${x(3.1)},${y(3.55)}) rotate(-32)">
      <rect x="-42" y="-13" width="84" height="26" rx="3" fill="#F4F1EA"/>
      <rect x="-42" y="-13" width="84" height="26" rx="3" fill="none" stroke="#0A0D0F" stroke-width="1"/>
      <line x1="-30" y1="0" x2="30" y2="0" stroke="#046BD2" stroke-width="2"/>
    </g>
    <text x="${x(3.1)}" y="${y(3.55)+40}" text-anchor="middle" class="pl-t">TOUCHSCREEN</text>

    <!-- meeting / seating -->
    <g opacity=".9">
      <circle cx="${x(7.6)}" cy="${y(1.5)}" r="${0.55*S}" fill="none" stroke="#6B7A85" stroke-width="1.4"/>
      ${seats(x(7.6),y(1.5),0.95*S,5)}
      <circle cx="${x(7.9)}" cy="${y(3.9)}" r="${0.55*S}" fill="none" stroke="#6B7A85" stroke-width="1.4"/>
      ${seats(x(7.9),y(3.9),0.95*S,4)}
    </g>
    <text x="${x(7.75)}" y="${y(2.75)}" text-anchor="middle" class="pl-t">MEETING · SEATING</text>

    <!-- storage -->
    <rect x="${x(6.3)}" y="${y(0)}" width="${1.4*S}" height="${0.75*S}" fill="rgba(74,87,96,.35)" stroke="#4A5760" stroke-width="1.2"/>
    <text x="${x(7.0)}" y="${y(0.48)}" text-anchor="middle" class="pl-t">STORAGE</text>

    <!-- open sides -->
    <line x1="${x(0)}" y1="${y(7)}" x2="${x(9.5)}" y2="${y(7)}" stroke="#4CC08A" stroke-width="3" stroke-dasharray="12 8"/>
    <line x1="${x(9.5)}" y1="${y(0)}" x2="${x(9.5)}" y2="${y(7)}" stroke="#4CC08A" stroke-width="3" stroke-dasharray="12 8"/>
    <text x="${x(4.75)}" y="${y(7)+26}" text-anchor="middle" class="pl-t pl-t--g">OPEN AISLE</text>
    <text x="${x(9.5)+26}" y="${y(3.5)}" text-anchor="middle" transform="rotate(90 ${x(9.5)+26} ${y(3.5)})" class="pl-t pl-t--g">OPEN AISLE</text>

    <!-- dims -->
    <g stroke="rgba(255,255,255,.3)" stroke-width="1">
      <line x1="${x(0)}" y1="${y(0)-30}" x2="${x(9.5)}" y2="${y(0)-30}"/>
      <line x1="${x(0)}" y1="${y(0)-35}" x2="${x(0)}" y2="${y(0)-25}"/>
      <line x1="${x(9.5)}" y1="${y(0)-35}" x2="${x(9.5)}" y2="${y(0)-25}"/>
      <line x1="${x(9.5)+30}" y1="${y(0)}" x2="${x(9.5)+30}" y2="${y(7)}"/>
      <line x1="${x(9.5)+25}" y1="${y(0)}" x2="${x(9.5)+35}" y2="${y(0)}"/>
      <line x1="${x(9.5)+25}" y1="${y(7)}" x2="${x(9.5)+35}" y2="${y(7)}"/>
    </g>
    <text x="${x(4.75)}" y="${y(0)-38}" text-anchor="middle" class="pl-d">9.5 m</text>
    <text x="${x(9.5)+42}" y="${y(3.5)}" text-anchor="middle" transform="rotate(90 ${x(9.5)+42} ${y(3.5)})" class="pl-d">7.0 m</text>
    <text x="${x(0.2)}" y="${y(6.7)}" class="pl-d">66.5 m² · STAND 12-E13</text>
  </svg>`;
  el('planLegend').innerHTML=PLAN.map(p=>
    `<div class="plg"><em style="background:${p.c}"></em><div><b>${p.n}</b><span>${p.s}</span></div></div>`).join('');
}
function plinth(cx,cy,wm,hm){
  const S=54, w=wm*S, h=hm*S;
  return `<g><rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="3"
    fill="rgba(229,183,110,.14)" stroke="#E5B76E" stroke-width="1.4"/>
    <line x1="${cx-w/2+14}" y1="${cy}" x2="${cx+w/2-14}" y2="${cy}" stroke="#E5B76E" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="${cx}" cy="${cy}" rx="14" ry="10" fill="#E5B76E"/></g>`;
}
function seats(cx,cy,r,n){
  let s=''; for(let i=0;i<n;i++){ const a=(Math.PI*2/n)*i-0.6;
    s+=`<circle cx="${(cx+Math.cos(a)*r).toFixed(1)}" cy="${(cy+Math.sin(a)*r).toFixed(1)}" r="9" fill="none" stroke="#6B7A85" stroke-width="1.3"/>`; }
  return s;
}

/* ───── 08 km journey thumbnails ───── */
function kmJourney(){
  const w=el('kmJourney'); if(!w) return;
  const seq=[['desert','DESERT'],['rock','MOUNTAIN'],['forest','FOREST'],['mud','EXTREME TERRAIN'],['arctic','ARCTIC']];
  w.innerHTML=seq.map(([k,n],i)=>
    `<div class="kmj"><i>0${i+1}</i>${V.envLayer(k).replace('class="envl"','class="envl is-on"')}<b>${n}</b></div>`).join('');
  /* animated headline number */
  const n=el('kmBigNum'); if(!n) return;
  let done=false;
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting||done) return; done=true;
    const t0=performance.now(), dur=2400;
    (function step(t){ const p=Math.min(1,(t-t0)/dur), v=Math.floor(1e8*Math.pow(p,.55));
      n.textContent='+'+v.toLocaleString('en-US'); if(p<1) requestAnimationFrame(step); else n.textContent='+100,000,000';
    })(t0);
  }),{threshold:.4});
  io.observe(n);
}

/* ───── 11 profile sample + email mock ───── */
function outputSamples(){
  const box=el('profileSample');
  if(box){
    box.innerHTML=`
      <div class="pcard">
        <div class="pcard__top"><div><span class="mono">BASE MOBILITY PROFILE</span><b>Sample Visitor</b>
          <em>Example Defence Systems · Saudi Arabia</em></div>
          <img src="assets/img/BASE-logo-beyaz.png" alt="BASE" class="pcard__logo"></div>
        <div class="pcard__veh">${V.vehicleSVG({axles:4,eng:false,artic:.3,load:.8})}</div>
        <div class="pcard__rows">
          <div><span class="mono">CONFIGURATION</span><b>4-AXLE PLATFORM · 8×8</b></div>
          <div><span class="mono">ENVIRONMENT</span><b>Extreme Desert</b></div>
          <div><span class="mono">MISSION PRIORITY</span><b>High Payload</b></div>
          <div><span class="mono">TERRAIN</span><b>Extreme</b></div>
          <div><span class="mono">PAYLOAD</span><b>19 t per platform</b></div>
          <div><span class="mono">MOBILITY</span><b>All-wheel 8×8</b></div>
          <div class="pcard__rec"><span class="mono">BASE SOLUTION</span>
            <b>Independent Suspension Drive Axle — BTA-120</b>
            <em>Highest independent-suspension load rating with 360 mm wheel travel. Paired with TK-423 two-speed transfer case.</em>
            <i class="mono">PRODUCT RECOMMENDATION PLACEHOLDER — TO BE MAPPED TO VALIDATED BASE SELECTION RULES</i></div>
        </div>
        <div class="pcard__foot">
          <div class="pcard__qr">${qrSample()}<span class="mono">SCAN — PERSONAL LANDING PAGE</span></div>
          <div class="pcard__cta"><b>ENGINEERED FOR YOUR MISSION.</b>
            <span class="mono">BASE · YOUR STRATEGIC PARTNER IN WHEELED MOBILITY</span>
            <i class="mono">basestudio.com.tr · +90 (262) 242-8-242</i></div>
        </div>
      </div>
      <p class="disclaim t-small">DEMO DATA. QR is a visual placeholder in this prototype — it would resolve to a
      personalised mobile landing page generated per visitor.</p>`;
  }
  const m=el('mailMock');
  if(m){
    m.innerHTML=`
      <div class="mailmock__bar"><i></i><i></i><i></i><span>SAMPLE EMAIL / DOWNLOADABLE PDF</span></div>
      <div class="mailmock__body">
        <h4>Your BASE Mobility Profile</h4>
        <div class="mm-sub">FROM: BASE STUDIO · IDEX 2027 · STAND 12-E13</div>
        <p class="t-body">Thank you for building your platform in the BASE Experience Area. Your configuration and the
          matching BASE drivetrain recommendation are below.</p>
        <div class="mailmock__rows">
          <div><b>CONFIGURATION</b><span>4-Axle Platform · 8×8</span></div>
          <div><b>ENVIRONMENT</b><span>Extreme Desert</span></div>
          <div><b>MISSION PRIORITY</b><span>High Payload</span></div>
          <div><b>BASE SOLUTION</b><span>BTA-120 · TK-423</span></div>
          <div><b>PROFILE ID</b><span>BASE-IDEX-4471</span></div>
        </div>
        <span class="mm-btn">REQUEST ENGINEERING CONSULTATION</span>
        <p class="mm-note">SAMPLE LAYOUT · CONTENT AND VALIDATED TECHNICAL DATA TO BE SUPPLIED BY BASE</p>
      </div>`;
  }
}
function qrSample(){
  let h=771163; const r=V.rng(h), N=21, c=[];
  const finder=(x,y)=>(x<7&&y<7)||(x>N-8&&y<7)||(x<7&&y>N-8);
  for(let y=0;y<N;y++) for(let x=0;x<N;x++){
    if(finder(x,y)){ const fx=x<7?x:x-(N-7), fy=y<7?y:y-(N-7);
      if((fx===0||fx===6||fy===0||fy===6)||(fx>=2&&fx<=4&&fy>=2&&fy<=4)) c.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
    } else if(r()>.52) c.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
  }
  return `<svg viewBox="-1 -1 ${N+2} ${N+2}" class="qr" shape-rendering="crispEdges">
    <rect x="-1" y="-1" width="${N+2}" height="${N+2}" fill="#F4F1EA"/><g fill="#07090A">${c.join('')}</g></svg>`;
}

/* ───── 12 / 13 data lists ───── */
const ANON=[
  ['SESSION','Experience started','Experience completed','Session duration'],
  ['CONFIGURATION','Selected 2 axle','Selected 3 axle','Selected 4 axle','Selected payload category'],
  ['ENVIRONMENT','Desert','Arctic','Forest','Rock','Mud','Selected terrain severity'],
  ['MISSION','Selected mission priorities','Scenarios launched'],
  ['CONTENT','Engineering View opened','Challenge Mode opened','100M+ KM experience opened',
   'Technical specifications opened','Products explored','Products compared'],
  ['OUTCOME','Configuration completed','QR generated']
];
const IDENT=['Name','Company','Country','Business email','Project timeframe','Selected configuration',
 'Selected terrain','Selected capabilities','Products explored','Technical content viewed','Session duration',
 'Requested engineering contact','Requested configuration','Requested follow-up'];
function dataLists(){
  const a=el('anonList');
  if(a) a.innerHTML=ANON.map(g=>`<div class="grp">${g[0]}</div>`+g.slice(1).map(i=>`<div>${i}</div>`).join('')).join('');
  const i=el('identList');
  if(i) i.innerHTML=IDENT.map(x=>`<div>${x}</div>`).join('');
}

/* ───── 14 intent flow ───── */
const INTENT=[
  {k:'STAGE 01',n:'EXPLORE',d:'Visitor interacted with the experience.',c:'#6B7A85'},
  {k:'STAGE 02',n:'INTEREST',d:'Visitor configured a platform and explored technical information.',c:'#5BAEE0'},
  {k:'STAGE 03',n:'PROJECT',d:'Visitor completed a detailed configuration and requested their Mobility Profile.',c:'#E0A030'},
  {k:'STAGE 04',n:'SALES LEAD',d:'Visitor explicitly requested contact with a BASE engineer or sales representative.',c:'#4CC08A'}
];
function intentFlow(){
  const w=el('intentFlow'); if(!w) return;
  w.innerHTML=INTENT.map((s,i)=>`
    <div class="itc" style="--stage-c:${s.c}">
      <span class="itc__k">${s.k}</span><h3 class="t-h3">${s.n}</h3><p class="t-body">${s.d}</p>
      ${i<3?`<svg class="itc__ar" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 12h13M13 7l5 5-5 5"/></svg>`:''}
    </div>`).join('');
}

/* ───── 17 deliverables + report quotes ───── */
const DELIV=['BASE Experience Performance Dashboard','Qualified Lead Database','Configuration Interest Report',
 'Country / Market Interest Analysis','Platform Preference Analysis','Mission & Terrain Heatmap',
 'Product Interest Analysis','High-Intent Account List','Engagement Report','Content Performance Report',
 'Post-Event Sales Follow-Up List'];
const QUOTES=['4-axle platforms generated the highest engagement.',
 'Extreme desert was the most explored environment.',
 'High payload was the most frequently selected mission requirement.',
 'Visitors exploring Engineering View showed higher follow-up intent.'];
function postEvent(){
  const d=el('deliv');
  if(d) d.innerHTML=DELIV.map((t,i)=>`<div class="dv"><i>${String(i+1).padStart(2,'0')}</i><b>${t}</b></div>`).join('');
  const q=el('reportQuotes');
  if(q) q.innerHTML=QUOTES.map(t=>`<div class="rq"><p>“${t}”</p><span>EXAMPLE INSIGHT · HYPOTHETICAL DEMO DATA</span></div>`).join('');
}

/* ───── 18 data flow diagram ───── */
function fbox(x,y,w,h,label,sub,cls){
  return `<g class="fb ${cls||''}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>
    <text x="${x+w/2}" y="${y+(sub?h/2-3:h/2+5)}" text-anchor="middle" class="fb-t">${label}</text>
    ${sub?`<text x="${x+w/2}" y="${y+h/2+16}" text-anchor="middle" class="fb-s">${sub}</text>`:''}</g>`;
}
function dataFlow(){
  const w=el('flowWrap'); if(!w) return;
  const a=(x1,y1,x2,y2,cls)=>`<path d="M ${x1} ${y1} L ${x2} ${y2}" class="fa ${cls||''}" marker-end="url(#fah)"/>`;
  const l=(x1,y1,x2,y2)=>`<path d="M ${x1} ${y1} L ${x2} ${y2}" class="fa"/>`;
  const CH=[['VISITOR','','fb--v'],['TOUCHSCREEN','',''],['CONFIGURATION','',''],
            ['LED EXPERIENCE','',''],['INTERACTION DATA','','fb--hl']];
  let chain='';
  CH.forEach(([t,su,c],i)=>{ const y=30+i*86; chain+=fbox(50,y,230,56,t,su,c);
    if(i<CH.length-1) chain+=a(165,y+56,165,y+84); });
  w.innerHTML=`
  <svg viewBox="0 0 1180 600" role="img" aria-label="Data flow: visitor to touchscreen to configuration to LED experience to interaction data, splitting into anonymous analytics and identified lead paths">
    <defs><marker id="fah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="#5BAEE0"/></marker></defs>
    ${chain}
    ${l(280,402,340,402)}${l(340,402,340,196)}${a(340,196,394,196)}
    ${l(340,402,340,470)}${a(340,470,394,470)}
    <text x="352" y="176" class="fb-k">ANONYMOUS</text>
    <text x="352" y="508" class="fb-k">IDENTIFIED</text>
    ${fbox(400,168,330,56,'AGGREGATE ANALYTICS','No identification required','fb--an')}
    ${a(730,196,784,196)}
    ${fbox(790,168,340,56,'BASE EXPERIENCE DASHBOARD','Live during the show','fb--an')}
    ${a(960,224,960,296)}
    ${fbox(790,296,340,56,'POST-EVENT INTELLIGENCE','Reports & analysis','fb--hl')}
    ${fbox(400,442,330,56,'VISITOR REQUESTS OUTPUT','Profile or engineer contact','fb--id')}
    ${a(730,470,784,470)}
    ${fbox(790,442,150,56,'LEAD PROFILE','','fb--id')}
    ${a(940,470,974,470)}
    ${fbox(980,442,150,56,'BASE CRM','','fb--id')}
    <text x="50" y="566" class="fb-n">ANONYMOUS INTERACTION DATA REQUIRES NO IDENTIFICATION. IDENTIFICATION HAPPENS ONLY WHEN THE VISITOR ASKS BASE FOR SOMETHING.</text>
  </svg>`;
}

/* ───── 20 architecture diagram ───── */
function architecture(){
  const w=el('archWrap'); if(!w) return;
  const a=(x1,y1,x2,y2)=>`<path d="M ${x1} ${y1} L ${x2} ${y2}" class="fa" marker-end="url(#aah)"/>`;
  const l=(x1,y1,x2,y2)=>`<path d="M ${x1} ${y1} L ${x2} ${y2}" class="fa"/>`;
  const side=[['ANALYTICS','Anonymous aggregation'],['LEAD CAPTURE','Only on visitor request'],
              ['QR GENERATION','Personal landing page'],['EMAIL OUTPUT','Mobility Profile delivery'],
              ['CRM INTEGRATION','Export / sync — to confirm'],['DASHBOARD','Management & sales view']];
  let cards='';
  side.forEach(([t,s2],i)=>{ const x=560+(i%2)*300, y=40+Math.floor(i/2)*104;
    cards+=fbox(x,y,280,64,t,s2, i>=4?'fb--id':'fb--an'); });
  w.innerHTML=`
  <svg viewBox="0 0 1180 470" role="img" aria-label="Technical architecture: touchscreen web app to experience engine to LED wall content system, with platform services alongside">
    <defs><marker id="aah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="#5BAEE0"/></marker></defs>
    ${fbox(50,40,330,64,'TOUCHSCREEN WEB APP','Visitor-facing controller','fb--v')}
    ${a(215,104,215,144)}
    ${fbox(50,144,330,64,'EXPERIENCE ENGINE','State · rules · content orchestration','fb--hl')}
    ${a(215,208,215,248)}
    ${fbox(50,248,330,64,'LED WALL CONTENT SYSTEM','Two surfaces · one panorama','')}
    ${l(380,176,470,176)}${l(470,72,470,280)}
    ${a(470,72,554,72)}${a(470,176,554,176)}${a(470,280,554,280)}
    <text x="50" y="368" class="fb-k">EDGE — ON STAND</text>
    <text x="560" y="368" class="fb-k">PLATFORM SERVICES</text>
    <line x1="50" y1="380" x2="380" y2="380" stroke="rgba(91,174,224,.3)" stroke-width="1"/>
    <line x1="560" y1="380" x2="1140" y2="380" stroke="rgba(91,174,224,.3)" stroke-width="1"/>
    <text x="50" y="428" class="fb-n">THE EXPERIENCE RUNS LOCALLY ON STAND AND CONTINUES IF CONNECTIVITY DROPS.</text>
    <text x="50" y="452" class="fb-n">NO SPECIFIC INTEGRATION IS CLAIMED UNTIL CONFIRMED WITH BASE.</text>
    ${cards}
  </svg>`;
}

/* ───── 21 design requirements + palette ───── */
const DREQ=[
  ['Large typography','Readable from standing distance and from across the aisle.'],
  ['Very clear controls','Every action is a labelled, obvious target — no hidden gestures.'],
  ['Minimal menu depth','Three primary steps. No nested navigation.'],
  ['Large touch targets','Minimum ~90 px hit areas, generous spacing, glove-tolerant.'],
  ['Dark graphite interface','Reads as part of the stand architecture, not as a website.'],
  ['Subtle BASE blue highlights','Blue marks state and selection only — never decoration.'],
  ['Fine technical linework','Hairlines, ticks and monospace labels signal engineering.'],
  ['High-quality vehicle/axle visualisation','Anonymous platforms; the BASE axle is the hero.'],
  ['Premium transitions','Cross-fades and eased motion — never abrupt image replacement.'],
  ['5-second comprehension','The main interaction is understood without instruction.'],
  ['Landscape-first, responsive','Built for a large landscape touchscreen; degrades gracefully.'],
  ['Consistent dashboard identity','Denser information, same visual language.']
];
const PAL=[
  ['#14181B','GRAPHITE','--g-800'],['#050708','BLACK','--ink'],['#F4F1EA','WARM WHITE','--warm'],
  ['#046BD2','BASE BLUE','--blue'],['#5BAEE0','TECHNICAL BLUE','--tech'],
  ['#C08B44','DESERT BRONZE','--bronze'],['#E5B76E','METALLIC BRONZE','--bronze-light']
];
function designReq(){
  const d=el('dreq');
  if(d) d.innerHTML=DREQ.map(([b,s])=>`<div class="dr"><b>${b}</b><span>${s}</span></div>`).join('');
  const p=el('paletteRow');
  if(p) p.innerHTML=PAL.map(([c,n,v])=>`<div class="pal"><i style="background:${c}"></i><b>${n}</b><span>${c} · ${v}</span></div>`).join('');
}

/* ───── boot ───── */
document.addEventListener('DOMContentLoaded',()=>{
  challengeGrid(); floorPlan(); kmJourney(); outputSamples(); dataLists();
  intentFlow(); postEvent(); dataFlow(); architecture(); designReq();
  window.BASE_revealScan && window.BASE_revealScan();
});
})();
