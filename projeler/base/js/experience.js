/* ============================================================
   BASE EXPERIENCE AREA — working prototype
   Touchscreen controller  ⇄  two-wall panoramic LED simulation
   ============================================================ */
(function(){
'use strict';
const V = window.BASE_VIZ;
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));

/* ---------------- state ---------------- */
const MISSIONS=[
  {id:'payload',  n:'HIGH PAYLOAD',            d:'Maximum axle load rating'},
  {id:'mobility', n:'EXTREME MOBILITY',        d:'Ground clearance & articulation'},
  {id:'durab',    n:'DURABILITY',              d:'Life in harsh field conditions'},
  {id:'adapt',    n:'ADAPTABILITY',            d:'Modular, customisable driveline'},
  {id:'allterr',  n:'ALL-TERRAIN PERFORMANCE', d:'Traction across every surface'}
];
const ENVKEYS=['desert','arctic','forest','rock','mud'];

const S = {
  axles:2, env:'desert', missions:new Set(),
  payload:12, gradient:30, severity:35, temp:25, traction:60,
  view:'vehicle', mode:'configure', step:1,
  started:false, completed:false, identified:false, stage:'EXPLORE',
  t0:Date.now(), log:[], profile:null
};

/* ---------------- analytics (anonymous by default) ---------------- */
function ev(name,detail){
  S.log.unshift({t:new Date(), name, detail:detail||''});
  if(S.log.length>60) S.log.pop();
  paintSession();
}
function setStage(st){
  const order=['EXPLORE','INTEREST','PROJECT','SALES LEAD'];
  if(order.indexOf(st)>order.indexOf(S.stage)){ S.stage=st; ev('INTENT STAGE → '+st); }
  paintSession();
}

/* ============================================================
   STAGE MARKUP
   ============================================================ */
function panoHTML(side){
  const envs = ENVKEYS.map(k=>V.envLayer(k)).join('');
  return `
  <div class="pano" data-side="${side}">
    <div class="pano__envs">${envs}</div>
    <div class="pano__fx" data-fx></div>
    <div class="pano__tech">
      <svg viewBox="0 0 2400 750" preserveAspectRatio="none" class="techgrid">
        <defs><pattern id="tg${side}" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M120 0 L0 0 0 120" fill="none" stroke="rgba(140,200,240,.09)" stroke-width="1"/></pattern></defs>
        <rect width="2400" height="750" fill="url(#tg${side})"/>
        <line x1="0" y1="86" x2="2400" y2="86" stroke="rgba(140,200,240,.30)" stroke-width="1.4"/>
        ${Array.from({length:24},(_,i)=>`<line x1="${i*100}" y1="78" x2="${i*100}" y2="94" stroke="rgba(140,200,240,.35)" stroke-width="1.2"/>`).join('')}
      </svg>
      <div class="contband mono"><span></span></div>
    </div>
    <div class="pano__eng"></div>
    <div class="pano__wire">${V.axleWire()}</div>
    <div class="pano__veh" data-veh></div>
    <div class="pano__hud">
      <div class="hud-l">
        <div class="hud-l__k mono" data-hud-eyebrow>BASE EXPERIENCE AREA</div>
        <h3 class="hud-l__h" data-hud-head>ONE AXLE.<br>MULTIPLE PLATFORMS.<br>UNLIMITED POSSIBILITIES.</h3>
        <div class="hud-l__ic" data-hud-icons></div>
      </div>
      <div class="hud-r">
        <div class="hud-r__k mono" data-hud-rkey>MISSION READY</div>
        <div class="hud-r__rows" data-hud-rows></div>
        <svg class="hud-r__spark" viewBox="0 0 220 54" preserveAspectRatio="none" data-hud-spark></svg>
      </div>
      <div class="hud-big" data-hud-big></div>
    </div>
    <div class="pano__vig"></div>
  </div>`;
}

function stageHTML(){
  return `
  <div class="stage__in wrap--wide">
    <div class="stage__main">

      <!-- ══ LED RIG ══ -->
      <div class="ledrig" id="ledrig">
        <div class="ledrig__label mono"><i></i>LED WALL A &nbsp;·&nbsp; REAR LEFT</div>
        <div class="ledrig__label ledrig__label--r mono">LED WALL B &nbsp;·&nbsp; REAR RIGHT<i></i></div>
        <div class="ledcorner">
          <div class="ledwall ledwall--l">${panoHTML('l')}<div class="ledwall__sheen"></div></div>
          <div class="ledseam"><i></i></div>
          <div class="ledwall ledwall--r">${panoHTML('r')}<div class="ledwall__sheen"></div></div>
        </div>
        <div class="ledrig__floor"></div>
        <div class="plinths">
          <div class="plinth"><div class="plinth__ax">${axleObject()}</div><span class="mono">BASE INDEPENDENT SUSPENSION DRIVE AXLE</span></div>
          <div class="plinth"><div class="plinth__ax">${axleObject()}</div><span class="mono">BASE RIGID DRIVE AXLE</span></div>
        </div>
        <div class="ledrig__note mono">ONE CONTINUOUS ENVIRONMENT ACROSS BOTH SURFACES — CURVED CORNER TRANSITION</div>
      </div>

      <!-- ══ TOUCHSCREEN ══ -->
      <div class="device" id="device">
        <div class="device__bezel">
          <div class="ts" id="ts"></div>
        </div>
        <div class="device__neck"></div>
        <div class="device__base"></div>
        <div class="device__tag mono">TOUCHSCREEN CONTROLLER · 32" LANDSCAPE</div>
      </div>
    </div>

    <!-- ══ SESSION / DATA PANEL ══ -->
    <aside class="sesspanel" id="sesspanel"></aside>
  </div>`;
}

/* physical axle object on the plinth (bronze) */
function axleObject(){
  return `<svg viewBox="0 0 300 90" preserveAspectRatio="xMidYMid meet">
    <defs><linearGradient id="axg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E5B76E"/><stop offset="48%" stop-color="#C08B44"/><stop offset="100%" stop-color="#7E5824"/></linearGradient></defs>
    <rect x="16" y="38" width="268" height="16" rx="8" fill="url(#axg)"/>
    <ellipse cx="150" cy="46" rx="46" ry="34" fill="url(#axg)"/>
    <ellipse cx="150" cy="46" rx="27" ry="19" fill="none" stroke="#7E5824" stroke-width="2"/>
    <rect x="18" y="24" width="34" height="44" rx="6" fill="url(#axg)"/>
    <rect x="248" y="24" width="34" height="44" rx="6" fill="url(#axg)"/>
    <rect x="74" y="32" width="20" height="28" rx="4" fill="url(#axg)"/>
    <rect x="206" y="32" width="20" height="28" rx="4" fill="url(#axg)"/>
  </svg>`;
}

/* ============================================================
   TOUCHSCREEN RENDER
   ============================================================ */
function tsHTML(){
  return `
  <div class="ts__top">
    <div class="ts__brand"><b>BASE</b><span class="mono">BASE EXPERIENCE AREA</span></div>
    <div class="ts__topr">
      <button class="ts__ico" data-act="lang" title="Language">EN</button>
      <button class="ts__ico" data-act="restart" title="Restart">⟲</button>
    </div>
  </div>
  <div class="ts__body">
    <nav class="ts__rail" id="tsRail"></nav>
    <section class="ts__main" id="tsMain"></section>
    <aside class="ts__side" id="tsSide"></aside>
  </div>
  <div class="ts__bar" id="tsBar"></div>`;
}

function railHTML(){
  const steps=[
    {k:'01',n:'CONFIGURATION',s:1},{k:'02',n:'ENVIRONMENT',s:2},
    {k:'03',n:'MISSION',s:3},{k:'04',n:'FINE TUNE',s:4}
  ];
  const inCfg = S.mode==='configure';
  return steps.map(t=>`
    <button class="rstep${inCfg&&S.step===t.s?' is-on':''}${S.step>t.s?' is-done':''}" data-step="${t.s}">
      <i class="mono">${t.k}</i><b>${t.n}</b>
    </button>`).join('') + `
    <div class="rail__intent">
      <span class="mono">INTENT</span>
      <div class="rail__stage" data-stage="${S.stage}">${S.stage}</div>
    </div>`;
}

function mainHTML(){
  if(S.mode==='challenge') return challengeHTML();
  if(S.mode==='km')        return kmHTML();
  if(S.mode==='ready')     return readyHTML();
  if(S.mode==='form')      return formHTML();
  if(S.mode==='profile')   return profileHTML();
  return configureHTML();
}

function configureHTML(){
  if(S.step===1){
    return `
    <div class="ts__prompt"><span class="mono">STEP 01</span><h2>BUILD YOUR MOBILITY</h2>
      <p>How much platform does your mission need?</p></div>
    <div class="optgrid optgrid--3">
      ${[2,3,4].map(n=>`
        <button class="opt opt--axle${S.axles===n?' is-on':''}" data-axle="${n}">
          <div class="opt__dia">${V.axleDiagram(n,S.axles===n)}</div>
          <b>${n} AXLE</b><span class="mono">${V.CFG[n].drive} ALL-WHEEL DRIVE</span>
        </button>`).join('')}
    </div>`;
  }
  if(S.step===2){
    return `
    <div class="ts__prompt"><span class="mono">STEP 02</span><h2>SELECT ENVIRONMENT</h2>
      <p>Where does this platform have to work?</p></div>
    <div class="optgrid optgrid--5">
      ${ENVKEYS.map(k=>`
        <button class="opt opt--env${S.env===k?' is-on':''}" data-env="${k}">
          <div class="opt__th">${V.envThumb(k,S.env===k)}</div>
          <b>${V.ENVS[k].label}</b><span class="mono">${V.ENVS[k].tempNote}</span>
        </button>`).join('')}
    </div>`;
  }
  if(S.step===3){
    return `
    <div class="ts__prompt"><span class="mono">STEP 03</span><h2>SELECT MISSION REQUIREMENT</h2>
      <p>Select one or more. This drives the BASE product recommendation.</p></div>
    <div class="optgrid optgrid--5">
      ${MISSIONS.map(m=>`
        <button class="opt opt--mis${S.missions.has(m.id)?' is-on':''}" data-mis="${m.id}">
          <i class="opt__chk"></i><b>${m.n}</b><span>${m.d}</span>
        </button>`).join('')}
    </div>`;
  }
  return `
    <div class="ts__prompt"><span class="mono">STEP 04 · OPTIONAL</span><h2>ENGINEERING CONTROLS</h2>
      <p>Fine-tune the operating envelope. The walls respond as you move.</p></div>
    ${slidersHTML(false)}`;
}

const SLIDERS=[
  {k:'payload',  n:'PAYLOAD',            min:2,  max:24, step:.5, unit:' t'},
  {k:'gradient', n:'GRADIENT',           min:0,  max:60, step:1,  unit:' %'},
  {k:'severity', n:'TERRAIN SEVERITY',   min:0,  max:100,step:1,  unit:''},
  {k:'temp',     n:'TEMPERATURE',        min:-45,max:55, step:1,  unit:' °C'},
  {k:'traction', n:'TRACTION CONDITIONS',min:0,  max:100,step:1,  unit:''}
];
function sliderVal(s){
  if(s.k==='severity') return ['LOW','MODERATE','HIGH','SEVERE','EXTREME'][Math.min(4,Math.floor(S.severity/20.01))];
  if(s.k==='traction') return ['ICE','MUD','LOOSE','FIRM','DRY'][Math.min(4,Math.floor(S.traction/20.01))];
  return S[s.k]+s.unit;
}
function slidersHTML(challenge){
  return `<div class="sliders${challenge?' sliders--ch':''}">
    ${SLIDERS.map(s=>`
      <label class="sld" data-k="${s.k}">
        <span class="sld__n mono">${s.n}</span>
        <span class="sld__v mono" data-v="${s.k}">${sliderVal(s)}</span>
        <input type="range" min="${s.min}" max="${s.max}" step="${s.step}" value="${S[s.k]}" data-slider="${s.k}">
        <span class="sld__track"><i style="width:${((S[s.k]-s.min)/(s.max-s.min)*100).toFixed(1)}%"></i></span>
      </label>`).join('')}
  </div>`;
}

function challengeHTML(){
  return `
  <div class="ts__prompt ts__prompt--ch"><span class="mono">CHALLENGE MODE</span><h2>HOW FAR WOULD YOU PUSH IT?</h2>
    <p>Raise the difficulty. The environment gets harder — the platform keeps working.</p></div>
  ${slidersHTML(true)}
  <div class="chgauges" id="chGauges"></div>`;
}

function kmHTML(){
  return `
  <div class="ts__prompt ts__prompt--km"><span class="mono">100M+ KM</span><h2>+100,000,000 KM OF PROVEN MOBILITY</h2>
    <p>The world changes. The axle remains the constant.</p></div>
  <div class="kmpanel">
    <div class="kmpanel__n mono" id="kmCount">0</div>
    <div class="kmpanel__lbl mono">KILOMETRES IN THE FIELD</div>
    <div class="kmpanel__envs" id="kmEnvs">
      ${['desert','rock','forest','mud','arctic'].map(k=>`<span data-kmenv="${k}">${V.ENVS[k].label}</span>`).join('')}
    </div>
    <div class="kmpanel__btns">
      <button class="tbtn tbtn--pri" data-act="kmplay">▶ PLAY THE JOURNEY</button>
      <button class="tbtn" data-act="kmstop">STOP</button>
    </div>
    <p class="kmpanel__note mono">FINAL WORDING AND CLAIM SUBJECT TO BASE VALIDATION</p>
  </div>`;
}

function readyHTML(){
  return `
  <div class="ts__ready">
    <span class="mono">CONFIGURATION COMPLETE</span>
    <h2>YOUR PLATFORM<br>IS READY.</h2>
    <p class="ts__ready-sub mono">${V.CFG[S.axles].label} · ${V.ENVS[S.env].short.toUpperCase()}</p>
    <div class="ts__ready-q">WHAT WOULD YOU LIKE TO DO NEXT?</div>
    <div class="ts__ready-b">
      <button class="tbtn tbtn--pri" data-act="send">SEND MY CONFIGURATION</button>
      <button class="tbtn tbtn--pri" data-act="engineer">TALK TO AN ENGINEER</button>
      <button class="tbtn" data-act="explore">CONTINUE EXPLORING</button>
    </div>
  </div>`;
}

function formHTML(){
  return `
  <div class="ts__prompt"><span class="mono">${S.formIntent==='engineer'?'TALK TO AN ENGINEER':'SEND MY CONFIGURATION'}</span>
    <h2>WHERE SHOULD WE SEND IT?</h2><p>Four fields. Nothing else.</p></div>
  <form class="tsform" id="tsform" novalidate>
    <div class="tsform__grid">
      <label><span class="mono">NAME</span><input name="name" required autocomplete="off"></label>
      <label><span class="mono">COMPANY</span><input name="company" required autocomplete="off"></label>
      <label><span class="mono">COUNTRY</span><input name="country" required autocomplete="off"></label>
      <label><span class="mono">BUSINESS EMAIL</span><input name="email" type="email" required autocomplete="off"></label>
    </div>
    <div class="tsform__tf">
      <span class="mono">PROJECT TIMEFRAME <em>OPTIONAL</em></span>
      <div class="tfrow">
        ${['IMMEDIATE','0–12 MONTHS','12–24 MONTHS','FUTURE / EXPLORING'].map((t,i)=>
          `<button type="button" class="tfb${i===1?' is-on':''}" data-tf="${t}">${t}</button>`).join('')}
      </div>
    </div>
    <label class="tscons"><input type="checkbox" name="consent" required>
      <span>I agree that BASE may contact me about this configuration.
      <em>Consent statement placeholder — to be adapted to BASE privacy requirements and applicable regulations.</em></span></label>
    <div class="tsform__b">
      <button class="tbtn tbtn--pri" type="submit">GENERATE MY MOBILITY PROFILE</button>
      <button class="tbtn tbtn--scan" type="button" data-act="badge">⌁ SCAN EVENT BADGE</button>
    </div>
    <p class="tsform__note mono" id="tsformNote">BADGE SCANNING — OPTIONAL INTEGRATION, SUBJECT TO IDEX EXHIBITOR TECHNOLOGY / API AVAILABILITY</p>
  </form>`;
}

function profileHTML(){
  const p=S.profile||{};
  return `
  <div class="ts__prompt"><span class="mono">GENERATED</span><h2>YOUR BASE MOBILITY PROFILE</h2>
    <p>Take it with you. Scan the code or send it to your inbox.</p></div>
  <div class="tsprof">
    ${profileCard(p,true)}
    <div class="tsprof__b">
      <button class="tbtn tbtn--pri" data-act="email">SEND TO MY EMAIL</button>
      <button class="tbtn" data-act="explore">CONTINUE EXPLORING</button>
    </div>
    <p class="tsform__note mono" id="tsformNote"></p>
  </div>`;
}

/* ---------------- product recommendation logic ---------------- */
function recommend(){
  const m=S.missions;
  const heavy = m.has('payload') || S.payload>=14;
  const mob   = m.has('mobility') || m.has('allterr') || S.severity>60;
  let ax, model, why;
  if(mob && !heavy){ ax='Independent Suspension Drive Axle'; model = S.payload<=7.5?'BTA-075':'BTA-105';
    why='Wheel travel and ground clearance prioritised for articulation-critical terrain.'; }
  else if(heavy && mob){ ax='Independent Suspension Drive Axle'; model='BTA-120';
    why='Highest independent-suspension load rating with 360 mm wheel travel.'; }
  else if(heavy){ ax='Rigid Drive Axle'; model = S.payload>=15?'RTA-160':'RTA-135';
    why='Maximum load rating per axle for payload-led platforms.'; }
  else { ax='Independent Suspension Drive Axle'; model='BTA-100';
    why='Balanced load rating, wheel travel and packaging for mixed-role platforms.'; }
  const tc = S.axles>=3 ? (S.payload>=16?'TK-423':'TK-420') : 'TK-330';
  return {ax,model,why,tc};
}

function profileCard(p,compact){
  const rec=recommend();
  const mis=[...S.missions].map(id=>MISSIONS.find(m=>m.id===id).n);
  return `
  <div class="pcard${compact?' pcard--sm':''}">
    <div class="pcard__top">
      <div><span class="mono">BASE MOBILITY PROFILE</span><b>${p.name||'—'}</b>
        <em>${p.company||'—'}${p.country?' · '+p.country:''}</em></div>
      <img src="assets/img/BASE-logo-beyaz.png" alt="BASE" class="pcard__logo">
    </div>
    <div class="pcard__veh">${V.vehicleSVG({axles:S.axles,eng:false,artic:.3,load:S.payload/24})}</div>
    <div class="pcard__rows">
      <div><span class="mono">CONFIGURATION</span><b>${V.CFG[S.axles].label} · ${V.CFG[S.axles].drive}</b></div>
      <div><span class="mono">ENVIRONMENT</span><b>${V.ENVS[S.env].short}</b></div>
      <div><span class="mono">MISSION PRIORITY</span><b>${mis.length?mis.join(' · '):'Not specified'}</b></div>
      <div><span class="mono">TERRAIN</span><b>${sliderVal({k:'severity'})}</b></div>
      <div><span class="mono">PAYLOAD</span><b>${S.payload} t per platform</b></div>
      <div><span class="mono">MOBILITY</span><b>All-wheel ${V.CFG[S.axles].drive}</b></div>
      <div class="pcard__rec"><span class="mono">BASE SOLUTION</span>
        <b>${rec.ax} — ${rec.model}</b><em>${rec.why} Paired with ${rec.tc} two-speed transfer case.</em>
        <i class="mono">PRODUCT RECOMMENDATION PLACEHOLDER — TO BE MAPPED TO VALIDATED BASE SELECTION RULES</i></div>
    </div>
    <div class="pcard__foot">
      <div class="pcard__qr">${qrGraphic(p.id||'BASE-IDEX-0000')}<span class="mono">SCAN — PERSONAL LANDING PAGE</span></div>
      <div class="pcard__cta"><b>ENGINEERED FOR YOUR MISSION.</b>
        <span class="mono">BASE · YOUR STRATEGIC PARTNER IN WHEELED MOBILITY</span>
        <i class="mono">basestudio.com.tr · +90 (262) 242-8-242</i></div>
    </div>
  </div>`;
}

/* Visual QR placeholder — deterministic from the configuration id.
   Replace with a real QR encoder at build time. */
function qrGraphic(seed){
  let h=0; for(let i=0;i<seed.length;i++) h=(h*31+seed.charCodeAt(i))>>>0;
  const r=V.rng(h||9), N=21, c=[];
  const finder=(x,y)=>(x<7&&y<7)||(x>N-8&&y<7)||(x<7&&y>N-8);
  for(let y=0;y<N;y++) for(let x=0;x<N;x++){
    if(finder(x,y)){
      const fx=x<7?x:x-(N-7), fy=y<7?y:y-(N-7);
      const on=(fx===0||fx===6||fy===0||fy===6)||(fx>=2&&fx<=4&&fy>=2&&fy<=4);
      if(on) c.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
    } else if(r()>.52) c.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
  }
  return `<svg viewBox="-1 -1 ${N+2} ${N+2}" class="qr" shape-rendering="crispEdges">
    <rect x="-1" y="-1" width="${N+2}" height="${N+2}" fill="#F4F1EA"/>
    <g fill="#07090A">${c.join('')}</g></svg>`;
}

/* ---------------- side summary ---------------- */
function sideHTML(){
  const mis=[...S.missions].map(id=>MISSIONS.find(m=>m.id===id).n);
  const rec=recommend();
  return `
  <div class="tsum">
    <span class="mono tsum__k">LIVE CONFIGURATION</span>
    <div class="tsum__hero">${V.axleDiagram(S.axles,true)}</div>
    <div class="tsum__rows">
      <div><i class="mono">PLATFORM</i><b>${V.CFG[S.axles].drive}</b></div>
      <div><i class="mono">ENVIRONMENT</i><b>${V.ENVS[S.env].label}</b></div>
      <div><i class="mono">PAYLOAD</i><b>${S.payload} t</b></div>
      <div><i class="mono">GRADIENT</i><b>${S.gradient} %</b></div>
      <div><i class="mono">TERRAIN</i><b>${sliderVal({k:'severity'})}</b></div>
      <div><i class="mono">TRACTION</i><b>${sliderVal({k:'traction'})}</b></div>
    </div>
    <div class="tsum__mis">
      <i class="mono">MISSION PRIORITY</i>
      ${mis.length? mis.map(m=>`<span>${m}</span>`).join('') : '<span class="dim">Not selected</span>'}
    </div>
    <div class="tsum__rec">
      <i class="mono">INDICATIVE BASE SOLUTION</i>
      <b>${rec.model}</b><em>${rec.ax}</em>
    </div>
  </div>`;
}

/* ---------------- bottom bar ---------------- */
function barHTML(){
  const inFlow = ['ready','form','profile'].includes(S.mode);
  return `
  <div class="ts__barl">
    <button class="tbtn tbtn--tog${S.view==='vehicle'?' is-on':''}" data-act="vview">VEHICLE VIEW</button>
    <button class="tbtn tbtn--tog${S.view==='engineering'?' is-on':''}" data-act="eview">ENGINEERING VIEW</button>
  </div>
  <div class="ts__barc">
    <button class="tbtn${S.mode==='challenge'?' is-on':''}" data-act="challenge">CHALLENGE THE PLATFORM</button>
    <button class="tbtn${S.mode==='km'?' is-on':''}" data-act="km">100M+ KM</button>
  </div>
  <div class="ts__barr">
    ${S.mode==='configure' && S.step<4 ? `<button class="tbtn tbtn--pri" data-act="next">NEXT →</button>`:''}
    ${!inFlow ? `<button class="tbtn tbtn--pri" data-act="complete">COMPLETE ▸</button>`:''}
    ${inFlow ? `<button class="tbtn" data-act="explore">← BACK TO CONFIGURATOR</button>`:''}
  </div>`;
}

/* ============================================================
   LED WALL PAINT
   ============================================================ */
let kmTimer=null, kmVal=0, kmEnvIdx=0, finaleTimer=null;

function paintWalls(){
  const grade = S.mode==='challenge' ? S.gradient*.18 : 0;
  const artic = S.mode==='challenge' ? S.severity/100 : (S.severity/100)*.35;
  const veh = V.vehicleSVG({
    axles:S.axles, eng:S.view==='engineering', grade, pano:true,
    artic, load:Math.min(1,S.payload/24), challenge:S.mode==='challenge',
    labels:true
  });
  $$('[data-veh]').forEach(n=>{ n.innerHTML=veh; });

  $$('.pano').forEach(p=>{
    $$('.envl',p).forEach(l=> l.classList.toggle('is-on', l.dataset.envl===S.env));
    p.dataset.fxKind = V.ENVS[S.env].fx;
  });
  $('#ledrig')?.classList.toggle('is-eng', S.view==='engineering');
  $('#ledrig')?.classList.toggle('is-km', S.mode==='km');
  paintFX();
  paintHUD();
  paintTint();
}

function paintTint(){
  const rig=$('#ledrig'); if(!rig) return;
  let filter='none';
  if(S.mode==='challenge'){
    if(S.temp>38) filter='saturate(1.22) sepia(.22) contrast(1.06)';
    else if(S.temp<-10) filter='saturate(.72) hue-rotate(-12deg) brightness(1.06)';
  }
  rig.style.setProperty('--wall-filter',filter);
  rig.style.setProperty('--sev', (S.mode==='challenge'? S.severity/100 : 0));
}

function paintFX(){
  const kind=V.ENVS[S.env].fx;
  const n = kind==='snow'?46 : kind==='rain'?52 : kind==='sand'?40 : kind==='dust'?30 : 22;
  $$('[data-fx]').forEach(box=>{
    if(box.dataset.kind===kind) return;
    box.dataset.kind=kind; box.className='pano__fx fx--'+kind;
    let h='';
    for(let i=0;i<n;i++){
      const d=(Math.random()*9+4).toFixed(2), dl=(-Math.random()*12).toFixed(2),
            x=(Math.random()*106-3).toFixed(2), s=(Math.random()*.9+.5).toFixed(2);
      h+=`<i style="left:${x}%;animation-duration:${d}s;animation-delay:${dl}s;transform:scale(${s})"></i>`;
    }
    box.innerHTML=h;
  });
}

function paintHUD(){
  const e=V.ENVS[S.env], rec=recommend();
  const mis=[...S.missions].map(id=>MISSIONS.find(m=>m.id===id).n);
  let eyebrow='BASE EXPERIENCE AREA', head='ONE AXLE.<br>MULTIPLE PLATFORMS.<br>UNLIMITED POSSIBILITIES.', big='';
  if(S.view==='engineering'){ eyebrow='ENGINEERING VIEW'; head='ENGINEERING MOBILITY<br>FROM THE GROUND UP.'; }
  if(S.mode==='challenge'){ eyebrow='CHALLENGE THE PLATFORM'; head='HOW FAR WOULD<br>YOU PUSH IT?';
    if(S.severity>78||S.payload>20) head='BUILT FOR EXTREME TERRAIN.<br>ENGINEERED FOR<br>MISSION SUCCESS.'; }
  if(S.mode==='km'){ eyebrow='PROVEN MOBILITY'; head='THE WORLD CHANGES.<br>THE AXLE REMAINS<br>THE CONSTANT.';
    big=`<div class="hb"><b class="mono">+${kmVal.toLocaleString('en-US')}</b><span>KM IN THE FIELD</span></div>`; }
  if(S.mode==='finale'){ eyebrow='YOUR CONFIGURATION'; head='ENGINEERED<br>FOR YOUR MISSION.';
    big=`<div class="hb hb--fin"><b>YOUR PLATFORM IS READY.</b>
      <span>${V.CFG[S.axles].label} · ${e.short.toUpperCase()}</span></div>`; }

  $$('[data-hud-eyebrow]').forEach(n=>n.textContent=eyebrow);
  $$('[data-hud-head]').forEach(n=>n.innerHTML=head);
  $$('[data-hud-big]').forEach(n=>n.innerHTML=big);
  $$('[data-hud-rkey]').forEach(n=>n.textContent = S.mode==='challenge'?'LOAD & TRACTION':'MISSION READY');

  const rows = S.mode==='challenge' ? [
    ['AXLE LOAD', (S.payload/S.axles*1000).toFixed(0)+' kg'],
    ['GRADIENT', S.gradient+' %'],
    ['TERRAIN', sliderVal({k:'severity'})],
    ['TRACTION', sliderVal({k:'traction'})],
    ['CLIMATE', S.temp+' °C']
  ] : [
    ['CONFIGURATION', V.CFG[S.axles].drive],
    ['ENVIRONMENT', e.label],
    ['PAYLOAD', S.payload+' t'],
    ['MISSION', mis.length? mis[0] : '—'],
    ['BASE SOLUTION', rec.model]
  ];
  $$('[data-hud-rows]').forEach(n=> n.innerHTML = rows.map(r=>
    `<div><i class="mono">${r[0]}</i><b class="mono">${r[1]}</b></div>`).join(''));

  const icons=['PROTECTION','MOBILITY','RELIABILITY','ADAPTABILITY'];
  $$('[data-hud-icons]').forEach(n=> n.innerHTML = icons.map(t=>
    `<span class="mono"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.2">
      <path d="M12 2l9 3.5v7C21 19 16.5 22.5 12 24 7.5 22.5 3 19 3 12.5v-7L12 2z"/></svg>${t}</span>`).join(''));

  const pts=[]; const rr=V.rng(S.axles*31+S.severity+S.payload*7);
  for(let i=0;i<=10;i++) pts.push(`${i*22},${(46-rr()*36).toFixed(1)}`);
  $$('[data-hud-spark]').forEach(n=> n.innerHTML=
    `<polyline points="${pts.join(' ')}" fill="none" stroke="rgba(140,200,240,.85)" stroke-width="2"/>
     <polyline points="0,54 ${pts.join(' ')} 220,54" fill="rgba(140,200,240,.12)" stroke="none"/>`);

  $$('.contband span').forEach(n=> n.textContent =
    `BASE · ${V.CFG[S.axles].drive} · ${e.label} · ${sliderVal({k:'severity'})} TERRAIN · ${S.payload} t · CONTINUOUS SURFACE A→B · `.repeat(4));
}

/* ---------------- session panel ---------------- */
function paintSession(){
  const box=$('#sesspanel'); if(!box) return;
  const dur=Math.floor((Date.now()-S.t0)/1000);
  const mm=String(Math.floor(dur/60)).padStart(2,'0'), ss=String(dur%60).padStart(2,'0');
  box.innerHTML=`
  <div class="sp__h"><span class="mono">SESSION DATA — LIVE</span>
    <span class="sp__badge mono">${S.identified?'IDENTIFIED':'ANONYMOUS'}</span></div>
  <div class="sp__stage">
    ${['EXPLORE','INTEREST','PROJECT','SALES LEAD'].map(s=>
      `<div class="sps${S.stage===s?' is-on':''}${['EXPLORE','INTEREST','PROJECT','SALES LEAD'].indexOf(s)<['EXPLORE','INTEREST','PROJECT','SALES LEAD'].indexOf(S.stage)?' is-past':''}">
        <i></i><span class="mono">${s}</span></div>`).join('')}
  </div>
  <div class="sp__kv">
    <div><i class="mono">DURATION</i><b class="mono">${mm}:${ss}</b></div>
    <div><i class="mono">EVENTS</i><b class="mono">${S.log.length}</b></div>
    <div><i class="mono">COMPLETED</i><b class="mono">${S.completed?'YES':'NO'}</b></div>
  </div>
  <div class="sp__log">
    ${S.log.slice(0,14).map(l=>`<div><i class="mono">${l.t.toTimeString().slice(0,8)}</i><span>${l.name}${l.detail?' · '+l.detail:''}</span></div>`).join('')
      || '<div class="sp__empty mono">NO EVENTS YET — INTERACT WITH THE TOUCHSCREEN</div>'}
  </div>
  <p class="sp__note mono">ANONYMOUS UNTIL THE VISITOR CHOOSES TO IDENTIFY. FEEDS THE BASE EXPERIENCE DASHBOARD.</p>`;
}

/* ============================================================
   RENDER + EVENTS
   ============================================================ */
function paintTS(){
  const ts=$('#ts'); if(!ts) return;
  if(!ts.dataset.built){ ts.innerHTML=tsHTML(); ts.dataset.built='1'; }
  $('#tsRail').innerHTML=railHTML();
  $('#tsMain').innerHTML=mainHTML();
  $('#tsSide').innerHTML=sideHTML();
  $('#tsBar').innerHTML=barHTML();
  $('#tsMain').classList.remove('fadein'); void $('#tsMain').offsetWidth; $('#tsMain').classList.add('fadein');
  if(S.mode==='challenge') paintGauges();
}
function paintAll(){ paintTS(); paintWalls(); paintSession(); }

function paintGauges(){
  const box=$('#chGauges'); if(!box) return;
  const load=Math.min(100, (S.payload/24)*100);
  const trac=Math.max(6, 100-S.severity*.55-(100-S.traction)*.4);
  const art =Math.min(100, S.severity*.9+10);
  const g=[
    {n:'AXLE LOAD',      v:load, u:(S.payload/S.axles*1000).toFixed(0)+' kg/axle', c:'#D9552F'},
    {n:'TRACTION',       v:trac, u:sliderVal({k:'traction'}), c:'#4CC08A'},
    {n:'ARTICULATION',   v:art,  u:Math.round(art*3.6)+' mm travel', c:'#5BAEE0'},
    {n:'LOAD TRANSFER',  v:Math.min(100,S.gradient*1.6), u:S.gradient+' % gradient', c:'#E0A030'}
  ];
  box.innerHTML=g.map(x=>`
    <div class="gau"><div class="gau__t"><span class="mono">${x.n}</span><b class="mono">${x.u}</b></div>
      <div class="gau__b"><i style="width:${x.v.toFixed(0)}%;background:${x.c}"></i></div></div>`).join('')
    + `<p class="gau__note mono">EXHIBITION VISUALISATION OF ENGINEERING CAPABILITY — NOT VALIDATED SIMULATION DATA</p>`;
}

/* ---------------- finale ---------------- */
function runFinale(){
  clearTimeout(finaleTimer);
  S.mode='finale'; S.view='vehicle';
  $('#ledrig')?.classList.add('is-finale');
  paintWalls();
  ev('CINEMATIC TAKEOVER', '8s · both walls');
  finaleTimer=setTimeout(()=>{
    $('#ledrig')?.classList.remove('is-finale');
    S.mode='ready'; paintAll();
  }, 8200);
  S.mode='finale'; paintTS_finale();
}
function paintTS_finale(){
  $('#tsMain').innerHTML=`<div class="ts__ready ts__ready--wait">
    <span class="mono">NOW PLAYING ON BOTH LED WALLS</span>
    <h2>YOUR PLATFORM<br>IS READY.</h2>
    <div class="waitbar"><i></i></div>
    <p class="ts__ready-sub mono">8 SECOND CINEMATIC TAKEOVER · ${V.CFG[S.axles].label} IN ${V.ENVS[S.env].short.toUpperCase()}</p>
  </div>`;
  $('#tsBar').innerHTML='';
}

/* ---------------- 100M km journey ---------------- */
function kmPlay(){
  kmStop(); S.mode='km'; kmVal=0; kmEnvIdx=0;
  const order=['desert','rock','forest','mud','arctic'];
  const target=100000000, t0=performance.now(), dur=14000;
  ev('100M+ KM EXPERIENCE OPENED'); setStage('INTEREST');
  kmTimer=setInterval(()=>{
    const p=Math.min(1,(performance.now()-t0)/dur);
    kmVal=Math.floor(target*Math.pow(p,.62));
    const idx=Math.min(order.length-1, Math.floor(p*order.length));
    if(idx!==kmEnvIdx){ kmEnvIdx=idx; S.env=order[idx]; paintWalls(); }
    const c=$('#kmCount'); if(c) c.textContent='+'+kmVal.toLocaleString('en-US');
    $$('#kmEnvs span').forEach(s=>s.classList.toggle('is-on',s.dataset.kmenv===order[idx]));
    paintHUD();
    if(p>=1){ kmVal=target; if(c) c.textContent='+100,000,000'; clearInterval(kmTimer); kmTimer=null; paintHUD(); }
  },60);
  paintWalls();
}
function kmStop(){ if(kmTimer){ clearInterval(kmTimer); kmTimer=null; } }

/* ---------------- interaction ---------------- */
function bind(){
  const ts=$('#ts'); if(!ts) return;

  ts.addEventListener('click', e=>{
    const b=e.target.closest('button'); if(!b) return;

    if(b.dataset.axle){ S.axles=+b.dataset.axle; ev('PLATFORM SELECTED', S.axles+' AXLE / '+V.CFG[S.axles].drive);
      if(!S.started){ S.started=true; ev('EXPERIENCE STARTED'); } paintAll(); return; }

    if(b.dataset.env){ S.env=b.dataset.env; ev('ENVIRONMENT SELECTED', V.ENVS[S.env].label); setStage('INTEREST'); paintAll(); return; }

    if(b.dataset.mis){ const id=b.dataset.mis;
      S.missions.has(id)?S.missions.delete(id):S.missions.add(id);
      ev('MISSION PRIORITY', [...S.missions].map(i=>MISSIONS.find(m=>m.id===i).n).join(' + ')||'cleared');
      setStage('INTEREST'); paintAll(); return; }

    if(b.dataset.step){ S.mode='configure'; S.step=+b.dataset.step; kmStop(); paintAll(); return; }
    if(b.dataset.tf){ $$('.tfb',ts).forEach(x=>x.classList.toggle('is-on',x===b)); return; }

    const a=b.dataset.act;
    switch(a){
      case 'next': S.mode='configure'; S.step=Math.min(4,S.step+1); if(S.step>=3) setStage('INTEREST'); paintAll(); break;
      case 'vview': S.view='vehicle'; ev('VEHICLE VIEW'); paintAll(); break;
      case 'eview': S.view='engineering'; ev('ENGINEERING VIEW OPENED'); setStage('INTEREST'); paintAll(); break;
      case 'challenge': S.mode='challenge'; kmStop(); ev('CHALLENGE MODE OPENED'); setStage('INTEREST'); paintAll(); break;
      case 'km': S.mode='km'; paintAll(); break;
      case 'kmplay': kmPlay(); paintTS(); break;
      case 'kmstop': kmStop(); paintAll(); break;
      case 'complete': S.completed=true; ev('CONFIGURATION COMPLETED',
          `${S.axles} axle · ${V.ENVS[S.env].label} · ${S.payload}t`); setStage('PROJECT'); kmStop(); runFinale(); break;
      case 'explore': S.mode='configure'; S.step=1; ev('CONTINUE EXPLORING'); paintAll(); break;
      case 'send': S.formIntent='send'; S.mode='form'; ev('REQUESTED CONFIGURATION'); setStage('PROJECT'); paintAll(); break;
      case 'engineer': S.formIntent='engineer'; S.mode='form'; ev('REQUESTED ENGINEERING CONTACT'); setStage('SALES LEAD'); paintAll(); break;
      case 'badge': {
        const n=$('#tsformNote'); if(n){ n.textContent='BADGE SCANNER NOT CONNECTED IN PROTOTYPE — OPTIONAL INTEGRATION SUBJECT TO IDEX EXHIBITOR TECHNOLOGY / API AVAILABILITY'; n.style.color='var(--warn)'; }
        ev('BADGE SCAN ATTEMPTED','placeholder'); break; }
      case 'email': {
        const n=$('#tsformNote'); if(n){ n.textContent='SENT TO '+(S.profile?.email||'—')+' — DEMO ONLY, NO EMAIL TRANSMITTED'; n.style.color='var(--ok)'; }
        ev('PROFILE EMAILED','demo'); break; }
      case 'restart': reset(); break;
      case 'lang': b.textContent = b.textContent==='EN'?'AR':'EN'; ev('LANGUAGE TOGGLED', b.textContent); break;
    }
  });

  ts.addEventListener('input', e=>{
    const s=e.target.closest('[data-slider]'); if(!s) return;
    const k=s.dataset.slider; S[k]=parseFloat(s.value);
    const spec=SLIDERS.find(x=>x.k===k);
    const lab=ts.querySelector(`[data-v="${k}"]`); if(lab) lab.textContent=sliderVal(spec);
    const tr=s.parentElement.querySelector('.sld__track i');
    if(tr) tr.style.width=((S[k]-spec.min)/(spec.max-spec.min)*100)+'%';
    $('#tsSide').innerHTML=sideHTML();
    if(S.mode==='challenge') paintGauges();
    paintWalls();
    clearTimeout(S._slt); S._slt=setTimeout(()=>ev(spec.n+' ADJUSTED', sliderVal(spec)),420);
  });

  ts.addEventListener('submit', e=>{
    if(e.target.id!=='tsform') return;
    e.preventDefault();
    const f=new FormData(e.target), n=$('#tsformNote');
    if(!e.target.checkValidity()){ n.textContent='PLEASE COMPLETE ALL FIELDS AND ACCEPT THE CONSENT STATEMENT'; n.style.color='var(--warn)'; return; }
    S.identified=true;
    S.profile={ name:f.get('name'), company:f.get('company'), country:f.get('country'), email:f.get('email'),
      tf: ts.querySelector('.tfb.is-on')?.textContent||'—',
      id:'BASE-IDEX-'+String(Math.floor(Math.random()*9000)+1000) };
    ev('VISITOR IDENTIFIED', S.profile.company+' · '+S.profile.country);
    ev('MOBILITY PROFILE GENERATED', S.profile.id);
    setStage(S.formIntent==='engineer'?'SALES LEAD':'PROJECT');
    S.mode='profile'; paintAll();
  });
}

function reset(){
  kmStop(); clearTimeout(finaleTimer);
  $('#ledrig')?.classList.remove('is-finale');
  Object.assign(S,{axles:2,env:'desert',missions:new Set(),payload:12,gradient:30,severity:35,temp:25,
    traction:60,view:'vehicle',mode:'configure',step:1,started:false,completed:false,identified:false,
    stage:'EXPLORE',t0:Date.now(),log:[],profile:null});
  paintAll(); ev('SESSION RESET');
}

/* ---------------- init ---------------- */
function init(){
  const stage=$('#stage'); if(!stage||stage.dataset.built) return;
  stage.innerHTML=stageHTML(); stage.dataset.built='1';
  paintAll(); bind();
  setInterval(()=>{ const b=$('#sesspanel'); if(b && document.body.dataset.tab==='fair') paintSession(); }, 1000);

  /* deep links from the narrative sections */
  document.addEventListener('click', e=>{
    const a=e.target.closest('[data-proto-mode]'); if(!a) return;
    setTimeout(()=>{
      S.mode=a.dataset.protoMode;
      if(S.mode==='km'){ paintTS(); kmPlay(); } else paintAll();
    },650);
  });

  /* standalone engineering-view demo frame */
  const ef=$('#engvFrame');
  if(ef){
    let eng=true;
    const draw=()=>{ ef.innerHTML=V.vehicleSVG({axles:3,eng,artic:.35,load:.6,labels:eng}); };
    draw();
    $('#engvToggle')?.addEventListener('click',()=>{ eng=!eng; draw(); });
  }
  window.BASE_S = S;
}
document.addEventListener('DOMContentLoaded',init);
})();
