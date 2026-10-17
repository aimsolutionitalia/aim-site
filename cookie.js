(() => {
  'use strict';
  const doc=document;const banner=doc.getElementById('cookie-banner');
  const measurement='G-NGDS2Z0GFB';let choice;
  try{choice=localStorage.getItem('cookiesChoice');}catch{}
  function show(visible){if(banner){banner.hidden=!visible;banner.style.display=visible?'flex':'none';}}
  function analytics(){if(choice!=='accepted'||window.gtagLoaded)return;window.gtagLoaded=true;window['ga-disable-'+measurement]=false;window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});window.gtag('js',new Date());window.gtag('config',measurement,{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});const script=doc.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+measurement;doc.head.appendChild(script);}
  function choose(value){choice=value;try{localStorage.setItem('cookiesChoice',value);}catch{}show(false);if(value==='accepted'){window['ga-disable-'+measurement]=false;if(window.gtag)window.gtag('consent','update',{analytics_storage:'granted'});analytics();}else{window['ga-disable-'+measurement]=true;if(window.gtag)window.gtag('consent','update',{analytics_storage:'denied'});for(const cookie of doc.cookie.split(';')){const name=cookie.split('=')[0].trim();if(/^_ga(?:_|$)|^_gid$|^_gat/.test(name))for(const domain of ['',location.hostname,'.'+location.hostname,'.aimsolutionsitalia.it'])doc.cookie=name+'=; Max-Age=0; path=/;'+(domain?' domain='+domain+';':'');}}}
  show(!choice);if(choice==='accepted')analytics();
  doc.getElementById('cookie-accept')?.addEventListener('click',()=>choose('accepted'));
  doc.getElementById('cookie-decline')?.addEventListener('click',()=>choose('declined'));
  for(const button of doc.querySelectorAll('[data-cookie-settings],#modify-consent'))button.addEventListener('click',event=>{event.preventDefault();show(true);doc.getElementById('cookie-decline')?.focus();});
})();
