/* Beginner-friendly theme/content engine. Values come from Supabase site_settings. */
(function(){
  const defaults={
    theme:{bg:'#171717',surface:'#211f1f',surface2:'#2a2727',text:'#fff5f2',muted:'#aaa3a2',line:'#3a3636',accent:'#5046f7',accentSoft:'#8e80fd',font:'Inter',headingFont:'Inter',radius:24,hero:'#171717',about:'#171717',projects:'#171717',artboard:'#171717',contact:'#171717',footer:'#111111'},
    features:{projects:true,artboards:true,clientPortal:true,contactForm:true,invoices:true,clientMessaging:true,workTracking:true},
    content:{organization_type:'Creative Studio',nav_about:'About',nav_projects:'Projects',nav_artboard:'Artboard',nav_contact:'Get in touch',hero_eyebrow:'Brand • Graphic • Web',hero_cta:'Get in touch',hero_secondary:'View projects',selected_work:'Selected work',projects_title:'Projects',projects_intro:'A growing collection of work. Click any item to open its full details.',about_label:'About',about_button:'More about us',artboard_label:'Artboard',artboard_title:'Latest visuals',artboard_button:'View all',contact_label:'Start a project',contact_title:'Let’s talk.',contact_intro:'Tell us what you are building, designing or improving.',contact_button:'Send enquiry',footer_description:'Creative work and digital solutions for people and organisations building something useful.',copyright_name:'Your Organisation'}
  };
  function merge(a,b){if(!b)return a;Object.keys(b).forEach(k=>{if(a[k]&&typeof a[k]==='object'&&!Array.isArray(a[k])&&b[k]&&typeof b[k]==='object')merge(a[k],b[k]);else a[k]=b[k]});return a}
  function applyTheme(s){
    const t=merge(JSON.parse(JSON.stringify(defaults.theme)),s.theme||{}), root=document.documentElement;
    const vars={bg:t.bg,surface:t.surface,'surface-2':t.surface2,text:t.text,muted:t.muted,line:t.line,accent:t.accent,'accent-soft':t.accentSoft,'hero-bg':t.hero,'about-bg':t.about,'projects-bg':t.projects,'artboard-bg':t.artboard,'contact-bg':t.contact,'footer-bg':t.footer,radius:`${Number(t.radius)||24}px`};
    Object.entries(vars).forEach(([k,v])=>root.style.setProperty('--'+k,v));
    root.style.setProperty('--body-font',`'${t.font}', sans-serif`); root.style.setProperty('--heading-font',`'${t.headingFont}', sans-serif`);
    const families=[t.font,t.headingFont].filter(Boolean).map(x=>x.replace(/ /g,'+')).filter((v,i,a)=>a.indexOf(v)===i).join('|');
    if(families){let l=document.getElementById('dynamic-fonts');if(!l){l=document.createElement('link');l.id='dynamic-fonts';l.rel='stylesheet';document.head.appendChild(l)}l.href='https://fonts.googleapis.com/css2?family='+families+':wght@400;500;600;700;800&display=swap';}
  }
  function applyContent(c){
    const d=merge(JSON.parse(JSON.stringify(defaults.content)),c||{}); document.querySelectorAll('[data-content]').forEach(el=>{const k=el.dataset.content;if(d[k]!=null)el.textContent=d[k]});
    document.querySelectorAll('[data-content-placeholder]').forEach(el=>{const k=el.dataset.contentPlaceholder;if(d[k]!=null)el.placeholder=d[k]});
  }
  function applyFeatures(f){const x=merge(JSON.parse(JSON.stringify(defaults.features)),f||{});document.querySelectorAll('[data-feature]').forEach(el=>{const key=el.dataset.feature;if(x[key]===false)el.classList.add('feature-disabled');else el.classList.remove('feature-disabled')});}
  window.applySiteAppearance=function(settings){applyTheme(settings||{});applyContent(settings?.content||{});applyFeatures(settings?.features||{})};
  window.DEFAULT_SITE_APPEARANCE=defaults;
})();
