(() => {
  'use strict';
  const doc=document;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=reduced.matches;
  function motion(){doc.documentElement.classList.toggle('motion-paused',paused);}
  motion();
  reduced.addEventListener('change',event=>{paused=event.matches;motion();});
  if('IntersectionObserver' in window&&!paused){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target);}},{threshold:.08});for(const node of doc.querySelectorAll('.service-item,.info-box,.mission-text-box'))if(node.getBoundingClientRect().top>innerHeight){node.classList.add('aim-reveal-pending');observer.observe(node);}}

  const slider=doc.querySelector('.myArticleSlider');
  if(slider){
    const track=slider.querySelector('.swiper-wrapper');const slides=[...track.children];
    const prev=slider.querySelector('.swiper-button-prev');const next=slider.querySelector('.swiper-button-next');const pagination=slider.querySelector('.swiper-pagination');
    track.setAttribute('tabindex','0');track.setAttribute('aria-label','Articoli in primo piano: scorri per esplorare');track.setAttribute('role','region');
    let positions=[0];let current=0;
    function update(){current=positions.reduce((best,p,i)=>Math.abs(p-track.scrollLeft)<Math.abs(positions[best]-track.scrollLeft)?i:best,0);prev.disabled=current===0;next.disabled=current===positions.length-1;for(const [i,dot] of [...pagination.children].entries())dot.setAttribute('aria-current',String(i===current));}
    function go(index){track.scrollTo({left:positions[Math.max(0,Math.min(positions.length-1,index))],behavior:paused||reduced.matches?'auto':'smooth'});}
    function layout(){const max=Math.max(0,track.scrollWidth-track.clientWidth);positions=[...new Set([...slides.map(s=>Math.min(max,s.offsetLeft-slides[0].offsetLeft)),max])].sort((a,b)=>a-b);pagination.replaceChildren();for(const [i] of positions.entries()){const button=doc.createElement('button');button.type='button';button.setAttribute('aria-label',`Mostra gruppo di articoli ${i+1}`);button.addEventListener('click',()=>go(i));pagination.appendChild(button);}update();}
    prev.addEventListener('click',()=>go(current-1));next.addEventListener('click',()=>go(current+1));track.addEventListener('scroll',update,{passive:true});track.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();go(current+1);}if(event.key==='ArrowLeft'){event.preventDefault();go(current-1);}});
    layout();if('ResizeObserver' in window)new ResizeObserver(layout).observe(track);else window.addEventListener('resize',layout);
  }
  const serviceLinks=[...doc.querySelectorAll('.service-link')];
  function markService(){for(const link of serviceLinks){const active=link.hash===location.hash;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}}
  window.addEventListener('hashchange',markService);markService();
  const top=doc.querySelector('.back-to-top');
  if(top){const onScroll=()=>top.classList.toggle('show',scrollY>400);window.addEventListener('scroll',onScroll,{passive:true});onScroll();top.addEventListener('click',event=>{event.preventDefault();window.scrollTo({top:0,behavior:paused||reduced.matches?'auto':'smooth'});});}
  const select=doc.querySelector('#service-select');if(select){const value=new URLSearchParams(location.search).get('servizio');if([...select.options].some(option=>option.value===value))select.value=value;}
  const form=doc.querySelector('#contact-form');const button=form?.querySelector('[data-submit-button]');const label=button?.querySelector('[data-submit-label]');const originalLabel=label?.textContent;
  form?.addEventListener('submit',()=>{if(form.checkValidity()){if(button){button.disabled=true;button.setAttribute('aria-busy','true');}if(label)label.textContent='Invio in corso…';}});
  window.addEventListener('pageshow',()=>{if(button){button.disabled=false;button.removeAttribute('aria-busy');}if(label&&originalLabel)label.textContent=originalLabel;});
})();

(() => {
  'use strict';
  const doc=document;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const isPaused=()=>doc.documentElement.classList.contains('motion-paused')||reduced.matches;
  if('IntersectionObserver' in window&&!isPaused()){
    const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('v3-seen');observer.unobserve(entry.target);}},{threshold:.08});
    for(const item of doc.querySelectorAll('.articoli>h2,.v3-section-intro,.card-article,.article-image'))if(item.getBoundingClientRect().top>innerHeight){item.classList.add('v3-watch','v3-not-seen');observer.observe(item);}
  }
  if(matchMedia('(hover:hover) and (pointer:fine)').matches){
    for(const card of doc.querySelectorAll('.v3-featured-service')){
      card.addEventListener('pointermove',event=>{if(isPaused())return;const bounds=card.getBoundingClientRect();card.style.setProperty('--v3-rx',`${(0.5-(event.clientY-bounds.top)/bounds.height)*3}deg`);card.style.setProperty('--v3-ry',`${((event.clientX-bounds.left)/bounds.width-0.5)*3}deg`);});
      card.addEventListener('pointerleave',()=>{card.style.setProperty('--v3-rx','0deg');card.style.setProperty('--v3-ry','0deg');});
    }
  }
  for(const control of doc.querySelectorAll('[data-project-step]'))control.addEventListener('click',()=>{
    const figure=control.closest('.v3-project-figure')||control.closest('figure')||doc.querySelector('#pm');
    for(const button of figure.querySelectorAll('[data-project-step]')){const current=button===control;button.classList.toggle('is-current',current);button.setAttribute('aria-pressed',String(current));}
    const title=figure.querySelector('[data-project-title]');const description=figure.querySelector('[data-project-description]');if(title)title.textContent=control.dataset.stepTitle;if(description)description.textContent=control.dataset.stepDescription;
    figure.dataset.activeStep=control.dataset.projectStep;
  });
})();

(() => {
  'use strict';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(!reduced.matches&&'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries)if(entry.isIntersecting){
        entry.target.classList.add('v4-in-view');
        observer.unobserve(entry.target);
      }
    },{threshold:.12});
    for(const item of document.querySelectorAll('.v4-section-heading,.v4-contact-strip,.v3-contact .contact-background,.v3-about .v3-about-audiences,.v13-mission-lead,.v13-mission-scheme')){
      if(item.getBoundingClientRect().top<innerHeight)continue;
      item.classList.add('v4-reveal','v4-before-view');
      observer.observe(item);
    }
  }
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches||reduced.matches)return;
  for(const card of document.querySelectorAll('.v4-services .service-item')){
    let nextFrame=0;
    let pointer=null;
    card.addEventListener('pointermove',event=>{
      pointer={x:event.clientX,y:event.clientY};
      if(nextFrame)return;
      nextFrame=requestAnimationFrame(()=>{
        nextFrame=0;
        if(!pointer||reduced.matches)return;
        const box=card.getBoundingClientRect();
        card.style.setProperty('--v4-mx',`${pointer.x-box.left}px`);
        card.style.setProperty('--v4-my',`${pointer.y-box.top}px`);
      });
    });
    card.addEventListener('pointerleave',()=>{
      pointer=null;
      if(nextFrame)cancelAnimationFrame(nextFrame);
      nextFrame=0;
      card.style.removeProperty('--v4-mx');
      card.style.removeProperty('--v4-my');
    });
  }
})();

(() => {
  'use strict';
  const method=document.querySelector('.v5-method');
  if(!method)return;
  for(const button of method.querySelectorAll('[data-method-step]'))button.addEventListener('click',()=>{
    for(const step of method.querySelectorAll('[data-method-step]')){
      const selected=step===button;
      step.classList.toggle('is-current',selected);
      step.setAttribute('aria-pressed',String(selected));
      const action=step.querySelector('[data-method-action]');
      const icon=step.querySelector('[data-method-icon]');
      if(action)action.textContent=selected?'Stai leggendo':'Scopri la fase';
      if(icon)icon.textContent=selected?'−':'+';
    }
    const title=method.querySelector('[data-method-output-title]');
    const detail=method.querySelector('[data-method-output-detail]');
    if(title)title.textContent=button.dataset.methodTitle;
    if(detail)detail.textContent=button.dataset.methodDetail;
  });
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches||!('IntersectionObserver' in window))return;
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries)if(entry.isIntersecting){
      entry.target.classList.add('v4-in-view');
      observer.unobserve(entry.target);
    }
  },{threshold:.08});
  for(const block of document.querySelectorAll('.v5-focus-block,.v5-method')){
    if(block.getBoundingClientRect().top<innerHeight)continue;
    block.classList.add('v4-reveal','v4-before-view');
    observer.observe(block);
  }
})();

(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const elements = [...document.querySelectorAll('.aim8-brand-geometry,.v5-focus-photo,.v11-about-photo,.v13-mission-scheme,.aim-page-index .hero-container,.aim8-footer')];
  let observer;
  const syncMotion = () => {
    observer?.disconnect();
    document.documentElement.classList.toggle('aim8-motion-ready', !reduced.matches);
    for (const element of elements) element.classList.remove('aim8-motion-visible');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) entry.target.classList.toggle('aim8-motion-visible', entry.isIntersecting);
    }, {threshold:0});
    for (const element of elements) observer.observe(element);
  };
  syncMotion();
  reduced.addEventListener('change', syncMotion);
  const panel = document.querySelector('.v5-method-context');
  if (panel) {
    let frame;
    for (const button of document.querySelectorAll('[data-method-step]')) button.addEventListener('click', () => {
      if (reduced.matches) return;
      cancelAnimationFrame(frame);
      panel.classList.remove('aim8-context-enter');
      frame = requestAnimationFrame(() => { frame = requestAnimationFrame(() => panel.classList.add('aim8-context-enter')); });
    });
    panel.addEventListener('animationend', event => {
      if (event.target === panel.lastElementChild) panel.classList.remove('aim8-context-enter');
    });
  }
})();

(() => {
  const page = document.querySelector('.sv15-page');
  if (!page) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const diagrams = [...page.querySelectorAll('figure.sv15-diagram,figure.sv16-web-visual,figure.sv16-photo')];
  const revealTargets = [...page.querySelectorAll('.sv15-service-copy,.sv15-visual-wrap')];
  let motionObserver;
  let revealObserver;
  const setupMotion = () => {
    motionObserver?.disconnect();
    revealObserver?.disconnect();
    diagrams.forEach(node => node.classList.remove('sv15-motion-visible'));
    revealTargets.forEach(node => node.classList.remove('sv15-before-view'));
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
    motionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('sv15-motion-visible', entry.isIntersecting));
    }, { threshold:0.08 });
    diagrams.forEach(node => motionObserver.observe(node));
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('sv15-before-view');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold:0.04, rootMargin:'0px 0px -18px 0px' });
    revealTargets.forEach(node => {
      node.classList.add('sv15-reveal');
      // Content already above the viewport remains visible on an anchor arrival.
      if (node.getBoundingClientRect().top < window.innerHeight) return;
      node.classList.add('sv15-before-view');
      revealObserver.observe(node);
    });
  };
  setupMotion();
  reducedMotion.addEventListener('change', setupMotion);
  page.querySelectorAll('[data-web-preview]').forEach(button => button.addEventListener('click', () => {
    const figure = button.closest('figure.sv16-web-visual');
    if (!figure) return;
    figure.dataset.preview = button.dataset.webPreview;
    figure.querySelectorAll('[data-web-preview]').forEach(control => control.setAttribute('aria-pressed', String(control===button)));
  }));
})();
