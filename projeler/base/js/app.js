/* ============================================================
   BASE — Shell: tabs, nav, reveal, counters
   ============================================================ */
(function(){
  'use strict';
  const $  = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
  window.$B = {$,$$};

  /* ---------- Tab switching ---------- */
  const views = { site:$('#view-site'), fair:$('#view-fair') };
  const navs  = { site:$('#siteNav'),   fair:$('#fairNav') };

  function setTab(id, push){
    if(!views[id]) return;
    $$('.stab').forEach(b=>b.classList.toggle('is-on', b.dataset.tab===id));
    Object.keys(views).forEach(k=>{ if(views[k]) views[k].classList.toggle('is-on', k===id); });
    Object.keys(navs).forEach(k=>{ if(navs[k]) navs[k].classList.toggle('hide', k!==id); });
    document.body.dataset.tab = id;
    window.scrollTo({top:0, behavior:'auto'});
    buildDrawer();
    if(push) history.replaceState(null,'','#'+(id==='site'?'home':'p-challenge'));
    document.dispatchEvent(new CustomEvent('tabchange',{detail:{id}}));
    requestAnimationFrame(()=>revealScan());
  }
  $$('.stab').forEach(b=> b.addEventListener('click',()=> setTab(b.dataset.tab,true)));
  $$('[data-go]').forEach(a=> a.addEventListener('click',e=>{ e.preventDefault(); setTab(a.dataset.go,true); }));
  window.BASE_setTab = setTab;

  /* ---------- Mobile drawer ---------- */
  const burger=$('#burger'), drawer=$('#drawer'), dlinks=$('#drawerLinks');
  function buildDrawer(){
    const src = document.body.dataset.tab==='fair' ? navs.fair : navs.site;
    if(!src||!dlinks) return;
    dlinks.innerHTML='';
    $$('a',src).forEach(a=>{
      const c=a.cloneNode(true); c.className='';
      c.addEventListener('click',()=>{ drawer.classList.remove('is-on'); burger.classList.remove('is-on'); });
      dlinks.appendChild(c);
    });
  }
  burger?.addEventListener('click',()=>{ drawer.classList.toggle('is-on'); burger.classList.toggle('is-on'); });

  /* ---------- Smooth anchors + active nav ---------- */
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#"]'); if(!a) return;
    const id=a.getAttribute('href').slice(1); if(!id||id==='#') return;
    const t=document.getElementById(id); if(!t) return;
    e.preventDefault();
    const y=t.getBoundingClientRect().top+window.scrollY-(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--shell-h'))||62)-6;
    window.scrollTo({top:y,behavior:'smooth'});
    history.replaceState(null,'','#'+id);
  });

  /* ---------- Scroll: progress + nav highlight ---------- */
  const prog=$('#progBar');
  let ticking=false;
  function onScroll(){
    if(ticking) return; ticking=true;
    // rAF is suspended while the tab is hidden; run inline in that case so the
    // latch cannot stick on and freeze the progress bar / nav highlighting.
    (document.hidden ? (fn=>fn()) : requestAnimationFrame)(()=>{
      const h=document.documentElement;
      const max=h.scrollHeight-h.clientHeight;
      if(prog) prog.style.width=(max>0?(h.scrollTop/max*100):0)+'%';
      const nav = document.body.dataset.tab==='fair'?navs.fair:navs.site;
      if(nav){
        let cur=null;
        $$('a',nav).forEach(a=>{
          const t=document.getElementById(a.getAttribute('href').slice(1));
          if(t && t.getBoundingClientRect().top<=140) cur=a;
        });
        $$('a',nav).forEach(a=>a.classList.toggle('is-active',a===cur));
      }
      $$('[data-reveal]:not(.in)').forEach(el=>{ if(el.getBoundingClientRect().top < 0) el.classList.add('in'); });
      ticking=false;
    });
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  document.addEventListener('visibilitychange',()=>{ ticking=false; onScroll(); });

  /* ---------- Reveal ---------- */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es=>{
    es.forEach(en=>{
      // Reveal when intersecting, or when the element sits above the viewport
      // (happens after a hash jump / programmatic scroll past it).
      if(en.isIntersecting || en.boundingClientRect.top < 0){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  },{rootMargin:'0px 0px -8% 0px', threshold:.06}) : null;
  function revealScan(){
    $$('[data-reveal]').forEach(el=>{
      if(el.classList.contains('in')) return;
      if(!io){ el.classList.add('in'); return; }
      if(el.offsetParent!==null || el.getClientRects().length) io.observe(el);
    });
  }
  window.BASE_revealScan = revealScan;

  /* ---------- Counters ---------- */
  const cio = 'IntersectionObserver' in window ? new IntersectionObserver(es=>{
    es.forEach(en=>{ if(en.isIntersecting){ runCount(en.target); cio.unobserve(en.target); } });
  },{threshold:.4}) : null;
  function runCount(el){
    if(el.dataset.static) return;
    const end=parseFloat(el.dataset.count)||0, suf=el.dataset.suffix||'', dur=1500, t0=performance.now();
    if(document.hidden){ el.textContent=Math.round(end).toLocaleString('en-US')+suf; return; }
    (function step(t){
      const p=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-p,3);
      el.textContent=Math.round(end*e).toLocaleString('en-US')+suf;
      if(p<1) requestAnimationFrame(step);
    })(t0);
  }
  function countScan(){ $$('[data-count]').forEach(el=>{ if(cio) cio.observe(el); else runCount(el); }); }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded',()=>{
    document.body.dataset.tab='site';
    buildDrawer(); revealScan(); countScan(); onScroll();
    if(location.hash==='#fair'||location.hash.startsWith('#p-')) setTab('fair',false);
  });
})();
