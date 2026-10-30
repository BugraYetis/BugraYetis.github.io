/* ============================================================
   BASE EXPERIENCE DASHBOARD  +  SALES VIEW
   ALL FIGURES ARE DEMO DATA — clearly marked as such.
   ============================================================ */
(function(){
'use strict';
const el=id=>document.getElementById(id);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));

/* ---------------- demo dataset ---------------- */
const DAYS=['DAY 1','DAY 2','DAY 3','DAY 4','DAY 5'];
const DEMO={
  all:{ started:1842, completed:1106, prospects:414, engReq:96, hot:63, avg:'5m 12s',
    byDay:[286,402,455,391,308], compByDay:[161,244,281,236,184] },
  platform:[['4 AXLE',41],['3 AXLE',34],['2 AXLE',25]],
  env:[['DESERT',38],['ROCK',19],['MUD / EXTREME',17],['ARCTIC',14],['FOREST',12]],
  mission:[['HIGH PAYLOAD',31],['ALL-TERRAIN PERFORMANCE',24],['EXTREME MOBILITY',20],['DURABILITY',15],['ADAPTABILITY',10]],
  countries:[['United Arab Emirates',118],['Saudi Arabia',96],['Türkiye',61],['Egypt',44],['India',38],
             ['Indonesia',31],['Qatar',26],['Other',82]],
  products:[['Independent Suspension Drive Axle',46],['4×4 Rolling Chassis',22],
            ['Two-Speed Transfer Case',18],['Rigid Drive Axle',14]],
  content:[['Engineering View',742],['Axle Specifications',596],['Extreme Terrain Simulation',438],
           ['100M+ KM Experience',377],['Rolling Chassis Overview',241],['Transfer Case Ratios',188]],
  funnel:[['EXPLORE',1842],['INTEREST',1106],['PROJECT',414],['SALES LEAD',96]]
};
const LEADS=[
  {co:'Example Defence Systems', c:'Saudi Arabia', cfg:'4-Axle Platform', env:'Desert',
   mis:'High Payload / Extreme Mobility', eng:'6m 42s', tf:'0–12 months',
   viewed:['Engineering View','Axle Specifications','Extreme Terrain Simulation'],
   act:'Requested Engineering Contact', st:'SALES LEAD'},
  {co:'Northern Vehicle Works', c:'Poland', cfg:'3-Axle Platform', env:'Arctic',
   mis:'Durability / All-Terrain', eng:'4m 08s', tf:'12–24 months',
   viewed:['Engineering View','100M+ KM Experience'], act:'Requested Mobility Profile', st:'PROJECT'},
  {co:'Gulf Special Vehicles', c:'United Arab Emirates', cfg:'4-Axle Platform', env:'Desert',
   mis:'High Payload', eng:'5m 51s', tf:'Immediate',
   viewed:['Axle Specifications','Rolling Chassis Overview','Challenge Mode'],
   act:'Requested Engineering Contact', st:'SALES LEAD'},
  {co:'Andes Mobility Group', c:'Chile', cfg:'2-Axle Platform', env:'Rock',
   mis:'Extreme Mobility', eng:'2m 34s', tf:'Future / exploring',
   viewed:['Engineering View'], act:'Configuration completed', st:'INTEREST'},
  {co:'Sahel Logistics Vehicles', c:'Egypt', cfg:'3-Axle Platform', env:'Mud / Extreme',
   mis:'Durability / Adaptability', eng:'3m 47s', tf:'0–12 months',
   viewed:['Axle Specifications','Transfer Case Ratios'], act:'Requested Mobility Profile', st:'PROJECT'}
];

/* ---------------- chart primitives (pure SVG/CSS) ---------------- */
function bars(rows,{unit='%',color='var(--blue)',max}={}){
  const m=max||Math.max(...rows.map(r=>r[1]));
  return `<div class="bars">${rows.map(([n,v],i)=>`
    <div class="bar" style="--i:${i}">
      <div class="bar__t"><span>${n}</span><b class="mono">${v}${unit}</b></div>
      <div class="bar__r"><i style="width:${(v/m*100).toFixed(1)}%;background:${color}"></i></div>
    </div>`).join('')}</div>`;
}
function donut(pct,label){
  const R=54,C=2*Math.PI*R;
  return `<div class="donut">
    <svg viewBox="0 0 140 140">
      <circle cx="70" cy="70" r="${R}" fill="none" stroke="var(--g-800)" stroke-width="13"/>
      <circle cx="70" cy="70" r="${R}" fill="none" stroke="var(--blue)" stroke-width="13" stroke-linecap="round"
        stroke-dasharray="${(C*pct/100).toFixed(1)} ${C}" transform="rotate(-90 70 70)"/>
      <text x="70" y="66" text-anchor="middle" class="dn-v">${pct}%</text>
      <text x="70" y="86" text-anchor="middle" class="dn-l">${label}</text>
    </svg></div>`;
}
function area(vals,labels){
  const W=560,H=180,P=26, max=Math.max(...vals)*1.15;
  const x=i=>P+(W-P*2)*(i/(vals.length-1)), y=v=>H-P-(H-P*2)*(v/max);
  const line=vals.map((v,i)=>`${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return `<svg class="area" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
    <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(4,107,210,.5)"/><stop offset="100%" stop-color="rgba(4,107,210,0)"/></linearGradient></defs>
    ${[0,.25,.5,.75,1].map(f=>`<line x1="${P}" y1="${(P+(H-P*2)*f).toFixed(1)}" x2="${W-P}" y2="${(P+(H-P*2)*f).toFixed(1)}" stroke="rgba(255,255,255,.06)" stroke-width="1"/>`).join('')}
    <polygon points="${P},${H-P} ${line} ${W-P},${H-P}" fill="url(#ag)"/>
    <polyline points="${line}" fill="none" stroke="var(--tech)" stroke-width="2.2"/>
    ${vals.map((v,i)=>`<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3.6" fill="var(--tech)"/>
      <text x="${x(i).toFixed(1)}" y="${H-8}" text-anchor="middle" class="ax-l">${labels[i]}</text>
      <text x="${x(i).toFixed(1)}" y="${(y(v)-12).toFixed(1)}" text-anchor="middle" class="ax-v">${v}</text>`).join('')}
  </svg>`;
}
function funnel(rows){
  const max=rows[0][1];
  const col=['#6B7A85','#5BAEE0','#E0A030','#4CC08A'];
  return `<div class="funnel">${rows.map(([n,v],i)=>`
    <div class="fn" style="--w:${(v/max*100).toFixed(1)}%;--c:${col[i]}">
      <div class="fn__b"><i></i></div>
      <div class="fn__t"><span class="mono">${n}</span><b>${v.toLocaleString('en-US')}</b>
        <em class="mono">${(v/max*100).toFixed(1)}% of started</em></div>
    </div>`).join('')}</div>`;
}

/* ---------------- dashboard ---------------- */
function card(title,body,note,cls){
  return `<section class="dcard ${cls||''}">
    <header class="dcard__h"><h3 class="mono">${title}</h3>${note?`<span class="mono">${note}</span>`:''}</header>
    <div class="dcard__b">${body}</div></section>`;
}
function kpi(v,l,d){
  return `<div class="kpi"><b>${v}</b><span class="mono">${l}</span>${d?`<em class="mono">${d}</em>`:''}</div>`;
}
function buildDash(range){
  const d=DEMO.all;
  const idx = range==='all' ? null : DAYS.indexOf(range);
  const f = idx==null ? 1 : d.byDay[idx]/d.byDay.reduce((a,b)=>a+b,0);
  const n = v => Math.round(v*(idx==null?1:f)).toLocaleString('en-US');
  const box=el('dash'); if(!box) return;
  box.innerHTML=`
  <header class="dash__top">
    <div class="dash__brand">
      <img src="assets/img/BASE-logo-beyaz.png" alt="BASE">
      <div><b>BASE EXPERIENCE DASHBOARD</b><span class="mono">IDEX &amp; NAVDEX 2027 · STAND 12-E13</span></div>
    </div>
    <div class="dash__ctrl">
      <span class="demo mono">DEMO DATA</span>
      <div class="dash__tabs">${['all',...DAYS].map(t=>
        `<button class="dtab${t===range?' is-on':''}" data-range="${t}">${t==='all'?'FULL SHOW':t}</button>`).join('')}</div>
    </div>
  </header>

  <div class="dash__kpis">
    ${kpi(n(d.started),'EXPERIENCES STARTED', idx==null?'5 SHOW DAYS':range)}
    ${kpi(n(d.completed),'COMPLETED CONFIGURATIONS', ((d.completed/d.started)*100).toFixed(0)+'% COMPLETION')}
    ${kpi(n(d.prospects),'IDENTIFIED PROSPECTS','VOLUNTARY IDENTIFICATION')}
    ${kpi(n(d.engReq),'ENGINEERING REQUESTS','EXPLICIT CONTACT REQUEST')}
    ${kpi(n(d.hot),'HIGH-INTENT LEADS','SALES LEAD STAGE')}
    ${kpi(d.avg,'AVERAGE ENGAGEMENT TIME','PER SESSION')}
  </div>

  <div class="dash__grid">
    ${card('PLATFORM INTEREST', bars(DEMO.platform,{color:'var(--blue)'}),'SHARE OF CONFIGURATIONS')}
    ${card('ENVIRONMENT INTEREST', bars(DEMO.env,{color:'var(--bronze)'}),'SHARE OF SELECTIONS')}
    ${card('MISSION PRIORITIES', bars(DEMO.mission,{color:'var(--tech)'}),'MULTI-SELECT')}
    ${card('EXPERIENCE COMPLETION RATE', donut(60,'COMPLETED')+
      `<p class="dnote mono">${d.completed.toLocaleString('en-US')} OF ${d.started.toLocaleString('en-US')} SESSIONS REACHED "YOUR PLATFORM IS READY"</p>`,'','dcard--sm')}
    ${card('TOP COUNTRIES', bars(DEMO.countries,{unit:'',color:'var(--g-400)'}),'IDENTIFIED PROSPECTS')}
    ${card('PRODUCT INTEREST', bars(DEMO.products,{color:'var(--bronze-light)'}),'SHARE OF RECOMMENDATIONS VIEWED')}
    ${card('MOST VIEWED TECHNICAL CONTENT',
      `<div class="ranklist">${DEMO.content.map(([n2,v],i)=>
        `<div><i class="mono">${String(i+1).padStart(2,'0')}</i><span>${n2}</span><b class="mono">${v}</b></div>`).join('')}</div>`,'VIEWS','dcard--wide')}
    ${card('ENGAGEMENT BY SHOW DAY', area(d.byDay,DAYS),'SESSIONS STARTED','dcard--wide')}
    ${card('LEAD FUNNEL', funnel(DEMO.funnel),'BEHAVIOUR-BASED STAGES','dcard--wide')}
  </div>
  <p class="dash__note mono">ALL FIGURES ON THIS SCREEN ARE ILLUSTRATIVE DEMO DATA CREATED FOR THIS PROPOSAL. THEY ARE NOT FORECASTS.</p>`;
  $$('.dtab',box).forEach(b=>b.addEventListener('click',()=>buildDash(b.dataset.range)));
}

/* ---------------- sales view ---------------- */
function buildSales(i){
  const box=el('sales'); if(!box) return;
  const L=LEADS[i]||LEADS[0];
  box.innerHTML=`
  <div class="sales__list">
    <header class="mono">QUALIFIED LEAD DATABASE <span class="demo">DEMO DATA</span></header>
    ${LEADS.map((l,k)=>`
      <button class="lrow${k===i?' is-on':''}" data-lead="${k}">
        <b>${l.co}</b><span class="mono">${l.c}</span>
        <em class="lst lst--${l.st.replace(' ','-').toLowerCase()}">${l.st}</em>
      </button>`).join('')}
  </div>
  <div class="sales__detail">
    <header class="sd__h">
      <div><span class="mono">LEAD DETAIL</span><h3 class="t-h2">${L.co}</h3></div>
      <em class="lst lst--${L.st.replace(' ','-').toLowerCase()}">${L.st}</em>
    </header>
    <div class="sd__rows">
      <div><i class="mono">COUNTRY</i><b>${L.c}</b></div>
      <div><i class="mono">INTEREST</i><b>${L.cfg}</b></div>
      <div><i class="mono">ENVIRONMENT</i><b>${L.env}</b></div>
      <div><i class="mono">MISSION</i><b>${L.mis}</b></div>
      <div><i class="mono">ENGAGEMENT</i><b>${L.eng}</b></div>
      <div><i class="mono">PROJECT TIMEFRAME</i><b>${L.tf}</b></div>
    </div>
    <div class="sd__viewed">
      <i class="mono">VIEWED</i>
      ${L.viewed.map(v=>`<span>${v}</span>`).join('')}
    </div>
    <div class="sd__action"><i class="mono">ACTION</i><b>${L.act}</b></div>
    <div class="sd__btns">
      <button class="tbtn tbtn--pri" data-sact>VIEW CONFIGURATION</button>
      <button class="tbtn" data-sact>ASSIGN TO SALES</button>
      <button class="tbtn" data-sact>EXPORT TO CRM</button>
      <button class="tbtn" data-sact>CONTACT</button>
    </div>
    <p class="sd__note mono" id="sdNote">ALL DATA IS DEMO DATA. NO REAL COMPANY OR PERSON IS REPRESENTED.</p>
  </div>`;
  $$('.lrow',box).forEach(b=>b.addEventListener('click',()=>buildSales(+b.dataset.lead)));
  $$('[data-sact]',box).forEach(b=>b.addEventListener('click',()=>{
    const n=el('sdNote'); n.textContent='"'+b.textContent+'" — DEMONSTRATION ONLY. CRM AND CONTACT ACTIONS ARE CANDIDATE INTEGRATIONS TO BE CONFIRMED WITH BASE.';
    n.style.color='var(--warn)';
  }));
}

document.addEventListener('DOMContentLoaded',()=>{ buildDash('all'); buildSales(0); });
})();
