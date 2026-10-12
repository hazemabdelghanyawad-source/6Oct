document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.nav-links');
  if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕ إغلاق':'☰ القائمة';});}
  const current=(location.pathname.split('/').pop()||'index.html');
  document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===current)a.classList.add('active');});
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  // 3D crossing explainer
  const scenes=[
    {title:'01 — الاستعداد والتمهيد',desc:'تنسيق العمل والتمهيد النيراني مهّدا لبدء العبور.',tag:'المرحلة ١: التمهيد'},
    {title:'02 — العبور الأول',desc:'عبرت مجموعات المشاة بالقوارب لتكوين موطئ قدم على الضفة الشرقية.',tag:'المرحلة ٢: القوارب'},
    {title:'03 — فتح الممرات والجسور',desc:'ساعدت وحدات المهندسين في فتح الممرات وتشغيل المعابر لنقل القوات والمعدات.',tag:'المرحلة ٣: الجسور'},
    {title:'04 — تثبيت المواقع',desc:'تواصل دعم المواقع شرق القناة ومواجهة الهجمات المضادة في الأيام التالية.',tag:'المرحلة ٤: تثبيت المواقع'}
  ];
  const stage=document.getElementById('sceneStage');
  const st=document.getElementById('sceneTitle');const sd=document.getElementById('sceneDesc');
  document.querySelectorAll('.step-btn').forEach(btn=>btn.addEventListener('click',()=>{const n=Number(btn.dataset.step);document.querySelectorAll('.step-btn').forEach(b=>b.classList.toggle('active',b===btn));if(stage)stage.dataset.step=String(n);if(st)st.textContent=scenes[n].title;if(sd)sd.textContent=scenes[n].desc;}));
  // timeline filters
  const filterBtns=document.querySelectorAll('[data-era]');
  filterBtns.forEach(btn=>btn.addEventListener('click',()=>{filterBtns.forEach(b=>b.classList.toggle('active',b===btn));const target=btn.dataset.era;document.querySelectorAll('.event[data-era]').forEach(ev=>{ev.classList.toggle('hidden',target!=='all'&&ev.dataset.era!==target);});}));
  // video slots: set a YouTube ID in data-youtube-id to activate an embed.
  document.querySelectorAll('.video-card').forEach(card=>{const id=(card.dataset.youtubeId||'').trim();const frame=card.querySelector('.video-frame');if(id&&frame){frame.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}" title="${card.querySelector('h3')?.textContent||'فيديو عن حرب أكتوبر'}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;}});
  // video category filters
  document.querySelectorAll('[data-video-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-video-filter]').forEach(b=>b.classList.toggle('active',b===btn));const val=btn.dataset.videoFilter;document.querySelectorAll('.video-card').forEach(card=>card.classList.toggle('hidden',val!=='all'&&card.dataset.category!==val));}));
  // library search
  const search=document.getElementById('bookSearch');
  if(search){const books=[...document.querySelectorAll('.book-card')];const count=document.getElementById('bookCount');const empty=document.getElementById('bookEmpty');const run=()=>{const q=search.value.trim().toLocaleLowerCase('ar');let shown=0;books.forEach(b=>{const txt=(b.dataset.search+' '+b.innerText).toLocaleLowerCase('ar');const ok=txt.includes(q);b.classList.toggle('hidden',!ok);if(ok)shown++;});if(count)count.textContent=shown+' عناوين';if(empty)empty.classList.toggle('hidden',shown!==0);};search.addEventListener('input',run);}
  // image modal
  const modal=document.getElementById('imageModal');
  if(modal){const modalImg=modal.querySelector('img');const close=()=>modal.classList.remove('open');document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',e=>{if(e.target.closest('a'))return;const img=item.dataset.full;if(!img)return;modalImg.src=img;modalImg.alt=item.querySelector('img')?.alt||'صورة تاريخية';modal.classList.add('open');}));modal.querySelector('.modal-close').addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close();});document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});}
});
