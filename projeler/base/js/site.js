/* ============================================================
   BASE — corporate site
   Scroll-driven, interactive. Sections are self-contained;
   each returns early if its markup is not present.
   ============================================================ */
(function(){
'use strict';
const D=window.BASE_DATA, V=window.BASE_VIZ, ART=window.BASE_ART;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
/* progress of an element through the viewport, 0 → 1 */
function prog(el,extra){
  const r=el.getBoundingClientRect(), h=innerHeight;
  return clamp((h*(extra||0.85)-r.top)/(r.height+h*(extra||0.85)),0,1);
}
/* progress across a pinned (sticky) section, 0 → 1 */
function pinProg(el){
  const r=el.getBoundingClientRect();
  return clamp(-r.top/(r.height-innerHeight),0,1);
}
const onScroll=[];
let ticking=false;
function runScroll(){
  ticking=false;                       // release the latch first, so a thrown
  onScroll.forEach(f=>{ try{ f(); }catch(e){ console.error(e); } });
}
function tick(){
  if(ticking) return;
  ticking=true;
  // requestAnimationFrame never fires while the tab is hidden, which would
  // leave the latch stuck on and freeze every scroll-driven section.
  if(document.hidden) runScroll(); else requestAnimationFrame(runScroll);
}
addEventListener('scroll',tick,{passive:true});
addEventListener('resize',tick);
document.addEventListener('visibilitychange',()=>{ ticking=false; tick(); });

/* ═════════ shell shadow ═════════ */
onScroll.push(()=> $('#shell')?.classList.toggle('is-stuck', scrollY>40));

/* ═════════ section index rail ═════════ */
function rail(){
  const rl=$('#rail'); if(!rl) return;
  const secs=$$('[data-rail]');
  rl.innerHTML=secs.map((s,i)=>`<button data-i="${i}"><i></i><span>${s.dataset.rail}</span></button>`).join('');
  const btns=$$('button',rl);
  btns.forEach((b,i)=>b.addEventListener('click',()=>secs[i].scrollIntoView({behavior:'smooth'})));
  onScroll.push(()=>{
    let cur=0;
    secs.forEach((s,i)=>{ if(s.getBoundingClientRect().top<=innerHeight*0.42) cur=i; });
    btns.forEach((b,i)=>b.classList.toggle('is-on',i===cur));
  });
}

/* ═════════ hero ═════════ */
function hero(){
  const vids=$$('[data-hv]'); if(!vids.length) return;
  let i=0;
  const playAll=()=>vids.forEach(v=>v.play().catch(()=>{}));
  playAll();
  ['loadeddata','canplay'].forEach(e=>vids[0].addEventListener(e,playAll));
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden) playAll(); });
  document.addEventListener('tabchange',e=>{ if(e.detail.id==='site') playAll(); });
  setInterval(()=>{
    i=(i+1)%vids.length;
    vids.forEach((v,k)=>v.classList.toggle('is-on',k===i));
  },5000);
  $('#heroPlay')?.addEventListener('click',()=>{
    $('#film')?.scrollIntoView({behavior:'smooth'});
    setTimeout(()=>$('#filmPlay')?.click(),750);
  });
}

/* ═════════ statement — scroll-scrubbed illumination ═════════ */
function statement(){
  const el=$('#stmtText'); if(!el) return;
  const KEY=/axle|transfer|thru|chassis|drivetrain/i;
  el.innerHTML=el.textContent.trim().split(/\s+/)
    .map(w=>`<span class="w${KEY.test(w)?' key':''}">${w} </span>`).join('');
  const ws=$$('.w',el);
  onScroll.push(()=>{
    const p=prog(el,0.62), lit=Math.round(p*ws.length*1.35);
    ws.forEach((w,i)=>w.classList.toggle('lit',i<lit));
  });
}

/* ═════════ platform range explorer ═════════ */
function range(){
  const sec=$('#range'), pan=$('#rangePan'), hot=$('#rangeHot'),
        pick=$('#rangePick'), card=$('#rangeCard');
  if(!sec||!pan) return;
  const P=D.platforms;
  let cur=-1;

  hot.innerHTML=P.map((p,i)=>
    `<button class="rhot" data-p="${i}" style="left:${p.x*100}%;top:${p.y*100}%" aria-label="${p.n}"><em>${p.k}</em></button>`).join('');
  pick.innerHTML=P.map((p,i)=>
    `<button class="rpick" data-p="${i}"><i>${p.k}</i><b>${p.n}</b><span>${p.drive} all-wheel drive</span></button>`).join('');

  function show(i){
    cur=i;
    if(i<0){
      sec.classList.remove('is-zoom');
      pan.style.transform='none';
      $$('.rpick',pick).forEach(b=>b.classList.remove('is-on'));
      $$('.rhot',hot).forEach(b=>b.classList.remove('is-on'));
      return;
    }
    const p=P[i], k=p.zoom;
    pan.style.transform=`translate(${(-(p.x-.5)*k*100).toFixed(2)}%, ${(-(p.y-.5)*k*100).toFixed(2)}%) scale(${k})`;
    sec.classList.add('is-zoom');
    $$('.rpick',pick).forEach((b,j)=>b.classList.toggle('is-on',j===i));
    $$('.rhot',hot).forEach((b,j)=>b.classList.toggle('is-on',j===i));
    card.innerHTML=`<span class="rc__k">PLATFORM ${p.k}</span><h3 class="rc__n">${p.n}</h3>
      <p class="rc__d">${p.d}</p>
      <div class="rc__rows">${p.rows.map(r=>`<div><i>${r[0]}</i><b>${r[1]}</b></div>`).join('')}</div>`;
  }
  sec.addEventListener('click',e=>{
    const b=e.target.closest('[data-p]'); if(b) show(+b.dataset.p);
  });
  $('#rangeReset')?.addEventListener('click',()=>show(-1));
  $$('.envsw',sec).forEach(b=>b.addEventListener('click',()=>{
    $$('.envsw',sec).forEach(x=>x.classList.toggle('is-on',x===b));
    $$('.range__img',sec).forEach(im=>im.classList.toggle('is-on', im.dataset.env===b.dataset.renv));
  }));
}

/* ═════════ drivetrain — component explorer ═════════ */
function drivetrain(){
  const nav=$('#dtnNav'), stage=$('#dtnStage'), info=$('#dtnInfo');
  if(!nav||!stage) return;
  const C=D.dtn;

  nav.innerHTML=C.map((c,i)=>
    `<button class="dnav${i===0?' is-on':''}" data-d="${c.id}">
       <span class="dnav__t"><img src="assets/img/${c.img}" alt=""></span>
       <span><i>${c.k}</i><b>${c.n}</b></span>
     </button>`).join('');

  stage.innerHTML=`<span class="dtn__badge" id="dtnBadge"></span>
    <span class="dtn__mark dtn__mark--tr"></span><span class="dtn__mark dtn__mark--bl"></span>
    <span class="dtn__mark dtn__mark--br"></span>
    ${C.map((c,i)=>`<figure class="dstg${i===0?' is-on':''}" data-s="${c.id}">
       <img src="assets/img/${c.img}" alt="${c.n}"></figure>`).join('')}
    <span class="dtn__cap" id="dtnCap"></span>`;

  function show(id){
    const c=C.find(x=>x.id===id)||C[0];
    $$('.dnav',nav).forEach(b=>b.classList.toggle('is-on',b.dataset.d===c.id));
    $$('.dstg',stage).forEach(f=>f.classList.toggle('is-on',f.dataset.s===c.id));
    $('#dtnBadge').textContent=c.k+' · '+c.n.toUpperCase();
    $('#dtnCap').textContent='BASE '+c.n.toUpperCase()+' — PRODUCT RENDER';
    info.innerHTML=`<span class="di__c">${c.c}</span><h3 class="di__n">${c.n}</h3>
      <p class="di__d">${c.d}</p>
      <div class="di__rows">${c.rows.map(r=>`<div><i>${r[0]}</i><b>${r[1]}</b></div>`).join('')}</div>
      <a class="di__cta" href="#p-${c.p}" data-scroll>FULL SPECIFICATION <i class="ar"></i></a>`;
  }
  nav.addEventListener('click',e=>{ const b=e.target.closest('[data-d]'); if(b) show(b.dataset.d); });
  show(C[0].id);
}

/* ═════════ drivetrain configurator ═════════ */
function configurator(){
  const axlesBox=$('#cfgAxles'), out=$('#cfgOut'), gvwIn=$('#cfgGvw'), veh=$('#cstVeh');
  if(!axlesBox||!out||!veh) return;
  const S=D.selector;
  const st={ axles:3, gvw:24, susp:'auto', del:'parts' };
  const CFGN={2:'4×4',3:'6×6',4:'8×8'};

  function paintAxleCards(){
    axlesBox.innerHTML=[2,3,4].map(n=>
      `<button class="caxle${n===st.axles?' is-on':''}" data-a="${n}">${V.axleDiagram(n,n===st.axles)}
        <b>${CFGN[n]}</b></button>`).join('');
  }

  /* smallest axle in the family whose published rating covers the indicative load */
  const pickAxle=(fam,per)=>[...S[fam]].sort((a,b)=>a.t-b.t).find(x=>x.t>=per)||null;
  const pickTC  = gvw => S.tc.find(x=>gvw<=x.upTo) || S.tc[S.tc.length-1];
  const pickRC  = gvw => S.rc.find(x=>gvw<=x.gvw) || null;

  function resolve(){
    const per = st.gvw/st.axles;
    let fam = st.susp==='auto' ? (per<=12.0?'ids':'rda') : st.susp;
    let axle = pickAxle(fam, per), note=null;
    if(!axle){
      const other = fam==='ids' ? 'rda' : 'ids', alt = pickAxle(other, per);
      if(alt && st.susp==='auto'){ fam=other; axle=alt; }
      else note = `An indicative ${per.toFixed(1)} t per axle is above the published rating of the `+
        `${fam==='ids'?'independent suspension':'rigid'} range. Add an axle, reduce GVW, or talk to BASE engineering.`;
    }
    const tc=pickTC(st.gvw);
    const rc=(st.axles===2)?pickRC(st.gvw):null;
    if(st.del==='chassis' && !rc){
      note = note || (st.axles!==2
        ? 'The BASE rolling chassis is currently a 4×4 platform. For 6×6 and 8×8, BASE supplies the drivetrain package.'
        : 'The rolling chassis platforms cover up to 20 t GVW. Above that, BASE supplies the drivetrain package.');
    }
    return { per, fam, axle, tc, rc, note, util: axle?Math.min(100,per/axle.t*100):100 };
  }

  function paint(){
    const r=resolve();
    const utilCol = r.util>92?'var(--hot)':r.util>78?'var(--warn)':'var(--ok)';
    const famName = r.fam==='ids' ? 'Independent Suspension Drive Axle' : 'Rigid Drive Axle';
    const famImg  = r.fam==='ids' ? 'prod-ids.png' : 'prod-rda.png';

    /* BASE-supplied configuration artwork; the legend band is cropped off so the
       fixed model names on it cannot contradict the live selection */
    if(veh.dataset.a!==String(st.axles)){
      veh.dataset.a=String(st.axles);
      // --ar trims the artwork's bottom legend, whose fixed model names would
      // otherwise contradict the live selection in the rail
      const AR={2:2.430,3:2.090,4:2.090}[st.axles];
      veh.innerHTML=`<img style="--ar:${AR}" src="assets/img/cfg-${st.axles}.png"
        alt="${CFGN[st.axles]} configuration — BASE drivetrain">`;
    }
    $('#cstLoad').innerHTML=`<b>${st.gvw} t</b><span>GVW · ${r.per.toFixed(1)} t PER AXLE</span>`;
    $('#cstAxleTag').textContent = r.axle
      ? `${st.axles} × ${r.axle.m}  ·  ${famName.toUpperCase()}`
      : 'NO PUBLISHED AXLE COVERS THIS LOAD';
    $('#cstGauge').innerHTML=`<div class="g__t"><span>AXLE LOAD vs RATING</span>
      <b>${r.axle?r.util.toFixed(0)+' %':'—'}</b></div>
      <div class="g__r"><i style="width:${r.axle?r.util.toFixed(1):100}%;background:${utilCol}"></i></div>`;

    const row=(chip,k,model,name,detail)=>`
      <div class="cres">
        <span class="cres__chip${chip?'':' cres__chip--none'}">${chip?`<img src="assets/img/${chip}" alt="">`:''}</span>
        <div><i>${k}</i><b>${model}</b><span>${name}</span>${detail?`<em>${detail}</em>`:''}</div>
      </div>`;

    out.innerHTML=
      (r.note?`<div class="cfgp__warn"><b>NOTE</b><span>${r.note}</span></div>`:'') +
      row(famImg,'DRIVE AXLES', r.axle? st.axles+' × '+r.axle.m : '—', famName,
          r.axle? `RATING ${r.axle.t.toFixed(1)} t · ${r.axle.travel?('TRAVEL '+r.axle.travel):('STEER '+r.axle.steer)}` : '') +
      row('prod-tc.png','TRANSFER CASE', r.tc.m, 'Two-Speed Transfer Case',
          `${r.tc.nm} · DROP ${r.tc.drop}`) +
      row(r.rc?'prod-rc.png':null, r.rc?'ROLLING CHASSIS':'DELIVERY',
          r.rc?r.rc.m:'PACKAGE',
          r.rc?'Turnkey 4×4 platform':'Axles, transfer case and thru drive',
          r.rc?`${r.rc.hp} · ${r.rc.prot}`:'ASSEMBLED OR CKD') +
      `<div class="cres__links">
        <a href="#p-${r.fam}" data-scroll>AXLE SPECIFICATION <i class="ar"></i></a>
        <a href="#p-tc" data-scroll>TRANSFER CASE SPECIFICATION <i class="ar"></i></a>
        <a class="is-pri" href="#contact" data-scroll>TALK TO BASE ENGINEERING <i class="ar"></i></a>
      </div>`;
  }

  axlesBox.addEventListener('click',e=>{
    const b=e.target.closest('[data-a]'); if(!b) return;
    st.axles=+b.dataset.a; paintAxleCards(); paint();
  });
  gvwIn.addEventListener('input',()=>{
    st.gvw=+gvwIn.value;
    $('#cfgGvwV').innerHTML=st.gvw+'<em>t</em>';
    $('#cfgGvwFill').style.width=((st.gvw-6)/46*100)+'%';
    paint();
  });
  $('#cfgSusp').addEventListener('click',e=>{
    const b=e.target.closest('[data-susp]'); if(!b) return;
    st.susp=b.dataset.susp;
    $$('.cseg',$('#cfgSusp')).forEach(x=>x.classList.toggle('is-on',x===b)); paint();
  });
  $('#cfgDel').addEventListener('click',e=>{
    const b=e.target.closest('[data-del]'); if(!b) return;
    st.del=b.dataset.del;
    $$('.cseg',$('#cfgDel')).forEach(x=>x.classList.toggle('is-on',x===b)); paint();
  });

  $('#cfgGvwFill').style.width=((st.gvw-6)/46*100)+'%';
  paintAxleCards(); paint();
}

/* ═════════ validation & R&D ═════════ */
function validation(){
  const grid=$('#valGrid'); if(!grid) return;
  grid.innerHTML=D.validation.map((v,i)=>
    `<div class="vtile">
       <video muted loop playsinline preload="metadata" data-poster="1" src="assets/chap/${v.f}.mp4"></video>
       <div class="vtile__ov"><span class="vtile__k">${String(i+1).padStart(2,'0')}</span>
         <span class="vtile__n">${v.n}</span><span class="vtile__d">${v.d}</span></div>
     </div>`).join('');
  wakeOnView($$('.vtile',grid));
}

/* Shared lazy-video helper: park on a real frame, then play on view or hover.
   Hover is independent of the observer so previews work even if it is throttled. */
function wakeOnView(tiles){
  tiles.forEach(t=>{
    const v=$('video',t); if(!v) return;
    const at=parseFloat(v.dataset.poster)||1;
    const seek=()=>{ try{ v.currentTime=at; }catch(e){} };
    if(v.readyState>=1) seek(); else v.addEventListener('loadedmetadata',seek,{once:true});
    const wake=()=>{
      if(!v.dataset.loaded){ v.dataset.loaded='1'; v.preload='auto'; v.load();
        v.addEventListener('loadeddata',()=>v.play().catch(()=>{}),{once:true}); }
      v.play().catch(()=>{});
    };
    t.addEventListener('mouseenter',wake);
    t.addEventListener('focus',wake);
    t._wake=wake;
  });
  if(!('IntersectionObserver' in window)) return;
  const io=new IntersectionObserver(es=>es.forEach(en=>{
    const v=$('video',en.target); if(!v) return;
    if(en.isIntersecting) en.target._wake && en.target._wake(); else v.pause();
  }),{threshold:.25});
  tiles.forEach(t=>io.observe(t));
}

/* ═════════ products ═════════ */
function products(){
  const bands=$('#prodBands'); if(!bands) return;
  bands.innerHTML=D.products.map(p=>`
    <article class="pband" id="p-${p.id}">
      <div class="pband__in">
        <div class="pband__media" data-reveal>
          <div class="pband__sw">
            <button class="pmsw is-on" data-pm="drawing" data-t="${p.id}">DRAWING</button>
            <button class="pmsw" data-pm="photo" data-t="${p.id}">PRODUCT</button>
          </div>
          <figure class="pband__fig" id="fig-${p.id}">
            <span class="pband__badge">${p.badge}</span>
            ${ART[p.id]?ART[p.id]():''}
            ${p.photo?`<figure class="pband__photo"><img src="assets/img/${p.photo}" alt="${p.name}" loading="lazy">
              <figcaption>${p.photoCap}</figcaption></figure>`:''}
          </figure>
        </div>
        <div class="pband__tx" data-reveal data-delay="1">
          <span class="pband__k">PRODUCT ${p.code}</span>
          <h3 class="pband__n">${p.name}</h3>
          <p class="pband__c">${p.claim}</p>
          <p class="pband__d">${p.intro}</p>
          <ul class="pband__f">${p.features.map(f=>`<li>${f}</li>`).join('')}</ul>
          <p class="pband__note">${p.note}</p>
          <div class="pband__tbl">
            <table class="spectbl"><thead><tr>${p.specHead.map(h=>`<th>${h}</th>`).join('')}</tr></thead>
              <tbody>${p.specRows.map(r=>
                `<tr data-model="${r[0]}" data-prod="${p.id}" title="Add to comparison">${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>
          </div>
        </div>
      </div>
    </article>`).join('');
}

/* drawing ⇄ product photo */
function productMedia(){
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-pm]'); if(!b) return;
    const fig=$('#fig-'+b.dataset.t); if(!fig) return;
    fig.classList.toggle('show-photo', b.dataset.pm==='photo');
    $$('[data-t="'+b.dataset.t+'"]').forEach(x=>x.classList.toggle('is-on',x===b));
  });
}

/* ═════════ portfolio coverage ═════════ */
function coverage(){
  const el=$('#covScale'); if(!el) return;
  el.innerHTML=D.coverage.map(([d,g])=>`<div><b>${d}</b><span>${g}</span></div>`).join('');
}

/* ═════════ field gallery + lightbox ═════════ */
function gallery(){
  const grid=$('#galGrid'); if(!grid) return;
  grid.innerHTML=D.gallery.map((g,i)=>
    `<button class="gtile${g.w===2?' gtile--w2':''}" data-g="${i}">
       <img src="assets/img/${g.f}" alt="${g.c}" loading="lazy">
       <figcaption>${g.c}</figcaption></button>`).join('');

  const box=document.createElement('div');
  box.className='lbx'; box.setAttribute('role','dialog'); box.setAttribute('aria-modal','true');
  box.innerHTML=`<button class="lbx__x" aria-label="Close">✕</button>
    <button class="lbx__nav lbx__nav--p" aria-label="Previous">‹</button>
    <button class="lbx__nav lbx__nav--n" aria-label="Next">›</button>
    <div><img alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="><p class="lbx__cap mono"></p></div>
    <span class="lbx__i mono"></span>`;
  document.body.appendChild(box);
  const img=$('img',box), cap=$('.lbx__cap',box), idx=$('.lbx__i',box);
  let cur=0;
  function show(i){
    cur=(i+D.gallery.length)%D.gallery.length;
    const g=D.gallery[cur];
    img.src='assets/img/'+g.f; img.alt=g.c; cap.textContent=g.c;
    idx.textContent=String(cur+1).padStart(2,'0')+' / '+String(D.gallery.length).padStart(2,'0');
  }
  function open(i){ show(i); box.classList.add('is-on'); document.body.style.overflow='hidden'; }
  function close(){ box.classList.remove('is-on'); document.body.style.overflow=''; }
  grid.addEventListener('click',e=>{ const b=e.target.closest('[data-g]'); if(b) open(+b.dataset.g); });
  box.addEventListener('click',e=>{
    if(e.target.closest('.lbx__x')||e.target===box) return close();
    if(e.target.closest('.lbx__nav--p')) show(cur-1);
    if(e.target.closest('.lbx__nav--n')) show(cur+1);
  });
  document.addEventListener('keydown',e=>{
    if(!box.classList.contains('is-on')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowLeft') show(cur-1);
    if(e.key==='ArrowRight') show(cur+1);
  });
}

/* ═════════ cinematic interstitials ═════════ */
function cine(){
  const amb=$('.dtn__amb');
  if(amb && 'IntersectionObserver' in window){
    new IntersectionObserver(es=>es.forEach(en=>{
      if(en.isIntersecting){ if(!amb.dataset.loaded){ amb.dataset.loaded='1'; amb.preload='auto'; amb.load(); }
        amb.play().catch(()=>{}); } else amb.pause();
    }),{threshold:.15}).observe(amb.parentElement);
  }
  const secs=$$('[data-cine]'); if(!secs.length||!('IntersectionObserver' in window)) return;
  const io=new IntersectionObserver(es=>es.forEach(en=>{
    const v=$('video',en.target); if(!v) return;
    if(en.isIntersecting){
      if(!v.dataset.loaded){ v.dataset.loaded='1'; v.preload='auto'; v.load(); }
      v.play().catch(()=>{});
    } else v.pause();
  }),{threshold:.2});
  secs.forEach(s=>io.observe(s));
}

/* ═════════ comparison tool ═════════ */
function compare(){
  const pool=$('#cmpPool'), out=$('#cmpOut'); if(!pool) return;
  const all=[];
  D.products.forEach(p=>p.specRows.forEach(r=>all.push({prod:p, model:r[0], row:r})));
  const sel=new Set();

  pool.innerHTML=all.map(m=>`<button class="cchip" data-m="${m.model}">${m.model}</button>`).join('');

  function paint(){
    $$('.cchip',pool).forEach(c=>c.classList.toggle('is-on',sel.has(c.dataset.m)));
    $$('.spectbl tbody tr').forEach(tr=>tr.classList.toggle('picked',sel.has(tr.dataset.model)));
    const picks=all.filter(m=>sel.has(m.model));
    if(!picks.length){
      out.innerHTML=`<p class="cmp__empty">SELECT UP TO THREE MODELS ABOVE — OR CLICK ANY ROW IN THE SPECIFICATION TABLES.</p>`;
      return;
    }
    /* union of attribute labels across the selected products */
    const labels=[];
    picks.forEach(m=>m.prod.specHead.slice(1).forEach(h=>{ if(!labels.includes(h)) labels.push(h); }));
    out.innerHTML=`<table class="ctbl">
      <thead><tr><th></th>${picks.map(m=>`<th>${m.model}<em>${m.prod.name}</em></th>`).join('')}</tr></thead>
      <tbody>${labels.map(l=>`<tr><th>${l}</th>${picks.map(m=>{
        const i=m.prod.specHead.indexOf(l);
        return `<td>${i>0?m.row[i]:'—'}</td>`;
      }).join('')}</tr>`).join('')}</tbody></table>`;
  }
  function toggle(model){
    if(sel.has(model)) sel.delete(model);
    else { if(sel.size>=3){ const first=sel.values().next().value; sel.delete(first); } sel.add(model); }
    paint();
  }
  pool.addEventListener('click',e=>{ const b=e.target.closest('[data-m]'); if(b) toggle(b.dataset.m); });
  document.addEventListener('click',e=>{
    const tr=e.target.closest('.spectbl tbody tr'); if(!tr) return;
    toggle(tr.dataset.model);
    $('#cmp')?.scrollIntoView({behavior:'smooth', block:'center'});
  });
  $('#cmpClear')?.addEventListener('click',()=>{ sel.clear(); paint(); });
  paint();
}

/* ═════════ proven — pinned sequence ═════════ */
function proven(){
  const sec=$('#proven'); if(!sec) return;
  const layers=$$('.prv__l',sec), cap=$('#prvCap'), reg=$('#prvRegions'), bar=$('#prvProg');
  cap.innerHTML=D.proven.map((s,i)=>`<div${i===0?' class="is-on"':''}><b>${s.n}</b><p>${s.d}</p></div>`).join('');
  const caps=$$('div',cap);
  let cur=-1;
  function set(i){
    if(i===cur) return; cur=i;
    layers.forEach((l,k)=>l.classList.toggle('is-on',k===i));
    caps.forEach((c,k)=>c.classList.toggle('is-on',k===i));
    reg.innerHTML=D.proven[i].regions.map(r=>`<span>${r}</span>`).join('');
  }
  set(0);
  onScroll.push(()=>{
    const p=pinProg(sec);
    if(bar) bar.style.width=(p*100).toFixed(1)+'%';
    set(clamp(Math.floor(p*2.999),0,2));
  });
}

/* ═════════ film — YouTube-backed player with our own controls ═════════ */
const YT_ID='gT2on5fzOis';

function film(){
  const box=$('#flmBox'), ov=$('#flmOv'), track=$('#flmTrack'), fill=$('#flmFill'),
        time=$('#flmTime'), local=$('#filmVid'), mount=$('.flm__yt');
  if(!box||!mount) return;
  const fmt=s=>isFinite(s)&&s>0?`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`:'0:00';

  /* One adapter over either backend so the controls below stay backend-agnostic. */
  let M=null, poll=null;
  const ytApi = ()=>({
    play:()=>M.p.playVideo(), pause:()=>M.p.pauseVideo(),
    seek:t=>M.p.seekTo(t,true), now:()=>M.p.getCurrentTime()||0,
    dur:()=>M.p.getDuration()||0, paused:()=>M.p.getPlayerState()!==1,
    muted:()=>M.p.isMuted(), mute:v=>v?M.p.mute():M.p.unMute()
  });
  const localApi = ()=>({
    play:()=>local.play(), pause:()=>local.pause(),
    seek:t=>{ local.currentTime=t; }, now:()=>local.currentTime,
    dur:()=>local.duration||0, paused:()=>local.paused,
    muted:()=>local.muted, mute:v=>{ local.muted=v; }
  });

  function paintMarks(){
    const marks=$('#flmChaps'), d=M?M.dur():0;
    if(!marks||!d) return;
    marks.innerHTML=D.chapters.map(c=>
      `<b style="left:${(c.t/d*100).toFixed(2)}%" title="${c.n}"></b>`).join('');
  }
  function tick(){
    if(!M) return;
    const d=M.dur(), t=M.now();
    if(d){ fill.style.width=(t/d*100)+'%'; time.textContent=`${fmt(t)} / ${fmt(d)}`; }
    const b=box.querySelector('[data-fa="play"]');
    if(b) b.textContent = M.paused()?'▶':'❚❚';
  }
  function start(){ clearInterval(poll); poll=setInterval(tick,250); }

  function play(at){
    ov.classList.add('is-off'); box.classList.add('is-playing');
    if(!M) return;
    if(at!=null) M.seek(at);
    M.play(); start();
  }
  window.__filmPlay=play;

  /* Fall back to the bundled file if YouTube is unreachable — defence networks
     routinely block youtube.com. The fallback is reversible: if the API turns up
     late (throttled tab, slow link) the player takes over again. */
  function useLocal(reason){
    if(M && M.p) return;                       // YouTube already running
    if(window.YT && window.YT.Player) return;  // API is here, just slow — let it mount
    console.warn('Film: using the local file —', reason);
    box.classList.add('use-local'); local.classList.add('is-on');
    M=localApi();
    local.addEventListener('loadedmetadata',paintMarks,{once:true});
    local.addEventListener('ended',()=>{ ov.classList.remove('is-off'); box.classList.remove('is-playing'); });
    local.preload='metadata'; local.load();
  }
  function useYouTube(){
    local.pause(); box.classList.remove('use-local'); local.classList.remove('is-on');
  }

  function buildPlayer(){
    const p=new YT.Player('ytPlayer',{
      videoId:YT_ID, host:'https://www.youtube-nocookie.com',
      playerVars:{controls:0,rel:0,modestbranding:1,playsinline:1,iv_load_policy:3,disablekb:1},
      events:{
        onReady:()=>{ useYouTube(); M=ytApi(); M.p=p; paintMarks(); tick(); },
        onStateChange:e=>{ if(e.data===0){ ov.classList.remove('is-off'); box.classList.remove('is-playing'); clearInterval(poll); } },
        onError:()=>useLocal('player error')
      }
    });
  }
  function mountYT(){
    if(window.__ytLoading) return; window.__ytLoading=true;
    if(window.YT && window.YT.Player) return buildPlayer();
    const to=setTimeout(()=>useLocal('API load timed out'),15000);
    const prev=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=()=>{ clearTimeout(to); if(prev) prev(); buildPlayer(); };
    const sc=document.createElement('script');
    sc.src='https://www.youtube.com/iframe_api';
    sc.onerror=()=>{ clearTimeout(to); useLocal('script blocked'); };
    document.head.appendChild(sc);
  }
  /* Reach out to YouTube only when the section is approaching. Three triggers,
     because intersection callbacks alone can be throttled or never fire. */
  let mounted=false;
  const maybeMount=()=>{ if(mounted) return; 
    if(box.getBoundingClientRect().top < innerHeight+600){ mounted=true; mountYT(); } };
  if('IntersectionObserver' in window){
    new IntersectionObserver((es,o)=>es.forEach(en=>{ if(en.isIntersecting){ o.disconnect(); mounted=true; mountYT(); } }),
      {rootMargin:'600px'}).observe(box);
  }
  onScroll.push(maybeMount);
  maybeMount();

  const kick=()=>{ if(!mounted){ mounted=true; mountYT(); } play(); };
  $('#filmPlay')?.addEventListener('click',kick);
  ov.addEventListener('click',kick);
  track.addEventListener('click',e=>{
    if(!M) return;
    const r=track.getBoundingClientRect(), d=M.dur();
    if(d) play(((e.clientX-r.left)/r.width)*d);
  });
  box.addEventListener('click',e=>{
    const b=e.target.closest('[data-fa]'); if(!b||!M) return;
    e.stopPropagation();
    if(b.dataset.fa==='play'){ M.paused()?play():M.pause(); tick(); }
    if(b.dataset.fa==='mute'){ const m=!M.muted(); M.mute(m); b.textContent=m?'✕':'♪'; }
    if(b.dataset.fa==='full'){ (box.requestFullscreen||box.webkitRequestFullscreen||(()=>{})).call(box); }
  });

  /* chapter chips seek the film */
  const chaps=$('#flmChips');
  if(chaps){
    chaps.innerHTML=D.chapters.map((c,i)=>
      `<button class="fchip" data-seek="${c.t}"><i>${String(i+1).padStart(2,'0')} · ${fmt(c.t)}</i>
        <b>${c.n}</b><span>${c.s}</span></button>`).join('');
    chaps.addEventListener('click',e=>{
      const b=e.target.closest('[data-seek]'); if(!b) return;
      play(+b.dataset.seek);
      box.scrollIntoView({behavior:'smooth',block:'center'});
    });
  }
}

/* ═════════ chapter grid + theatre ═════════ */
function chapters(){
  const grid=$('#chpGrid'); if(!grid) return;
  const list=D.chapters.filter(c=>c.f);
  grid.innerHTML=list.map((c,i)=>
    `<button class="ctile${i===list.length-1?' ctile--wide':''}" data-c="${i}">
       <video muted loop playsinline preload="metadata" data-poster="${c.p||1}" src="assets/chap/${c.f}.mp4"></video>
       <div class="ctile__ov"><span class="ctile__k">${String(i+1).padStart(2,'0')}</span>
         <span class="ctile__n">${c.n}</span><span class="ctile__s">${c.s}</span></div>
     </button>`).join('');

  wakeOnView($$('.ctile',grid));

  const th=document.createElement('div');
  th.className='cth'; th.setAttribute('role','dialog'); th.setAttribute('aria-modal','true');
  th.innerHTML=`<button class="cth__x" aria-label="Close">✕</button>
    <button class="cth__nav cth__nav--p" aria-label="Previous chapter">‹</button>
    <button class="cth__nav cth__nav--n" aria-label="Next chapter">›</button>
    <div><video controls playsinline></video>
      <div class="cth__bar"><span class="cth__n"></span><span class="cth__s mono"></span></div></div>`;
  document.body.appendChild(th);
  const tv=$('video',th), tn=$('.cth__n',th), ts=$('.cth__s',th);
  let cur=0;
  function show(i){
    cur=(i+list.length)%list.length;
    const c=list[cur];
    tv.src='assets/chap/'+c.f+'.mp4';
    tn.textContent=c.n; ts.textContent=String(cur+1).padStart(2,'0')+' / '+String(list.length).padStart(2,'0')+' · '+c.s;
    tv.play().catch(()=>{});
  }
  function open(i){ show(i); th.classList.add('is-on'); document.body.style.overflow='hidden'; }
  function close(){ th.classList.remove('is-on'); tv.pause(); document.body.style.overflow=''; }
  grid.addEventListener('click',e=>{ const b=e.target.closest('[data-c]'); if(b) open(+b.dataset.c); });
  th.addEventListener('click',e=>{
    if(e.target.closest('.cth__x')||e.target===th) return close();
    if(e.target.closest('.cth__nav--p')) show(cur-1);
    if(e.target.closest('.cth__nav--n')) show(cur+1);
  });
  document.addEventListener('keydown',e=>{
    if(!th.classList.contains('is-on')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowLeft') show(cur-1);
    if(e.key==='ArrowRight') show(cur+1);
  });
}

/* ═════════ partners marquee ═════════ */
function partners(){
  const row=$('#ptnRow'); if(!row) return;
  const one=D.partners.map(p=>`<div title="${p.n}"><img src="assets/img/${p.f}" alt="${p.n}" loading="lazy"></div>`).join('');
  row.innerHTML=one+one;
}

/* ═════════ contact form ═════════ */
function form(){
  $('#cform')?.addEventListener('submit',e=>{
    e.preventDefault();
    const n=$('#cformNote');
    if(!e.target.checkValidity()){ n.textContent='PLEASE COMPLETE THE REQUIRED FIELDS'; n.style.color='var(--warn)'; return; }
    n.textContent='MESSAGE CAPTURED LOCALLY — THIS PROTOTYPE DOES NOT TRANSMIT DATA';
    n.style.color='var(--ok)';
    e.target.reset();
  });
  const cv=$('.ctc__v');
  if(cv && 'IntersectionObserver' in window){
    new IntersectionObserver(es=>es.forEach(en=>{
      if(en.isIntersecting){ cv.preload='auto'; cv.play().catch(()=>{}); } else cv.pause();
    }),{threshold:.15}).observe(cv);
  }
}

/* ═════════ boot ═════════ */
document.addEventListener('DOMContentLoaded',()=>{
  rail(); hero(); statement(); range(); products(); productMedia(); compare();
  coverage(); gallery(); cine(); chapters(); validation(); configurator();
  drivetrain(); proven(); film(); partners(); form();
  window.BASE_revealScan && window.BASE_revealScan();
  tick();
});
})();
