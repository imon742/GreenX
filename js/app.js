const $=(s)=>document.querySelector(s); const esc=(v='')=>String(v??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function setText(sel,val){const e=$(sel);if(e&&val)e.textContent=val}
function safeUrl(v){if(!v)return '';try{const u=new URL(v,location.href);return ['http:','https:','tel:','mailto:'].includes(u.protocol)?u.href:''}catch{return ''}}
async function boot(){
  const d=window.GreenXData;
  try{
    const [s,services,projects,clients]=await Promise.all([d.getSettings(),d.getServices(),d.getProjects(),d.getClients()]);
    setText('#heroTitle',s.hero_title);setText('#heroSubtitle',s.hero_subtitle);setText('#aboutTitle',s.about_title);setText('#aboutText',s.about_text);setText('#contactPhone',s.phone);setText('#contactAddress',s.address);setText('#footerMotto',s.motto);
    if(s.hero_image) $('#heroImage').src=s.hero_image;if(s.logo_url){$('#brandLogo').src=s.logo_url;$('#footerLogo').src=s.logo_url}
    if(s.phone){$('#contactPhone').href='tel:'+s.phone.replace(/\s/g,'')}
    if(s.email){$('#emailCard').hidden=false;$('#contactEmail').textContent=s.email;$('#contactEmail').href='mailto:'+s.email}
    const social=[];if(s.whatsapp) social.push(['WhatsApp',s.whatsapp.startsWith('http')?s.whatsapp:'https://wa.me/'+s.whatsapp.replace(/\D/g,'')]);if(s.facebook)social.push(['Facebook',s.facebook]);if(s.linkedin)social.push(['LinkedIn',s.linkedin]);if(s.youtube)social.push(['YouTube',s.youtube]);
    $('#socialLinks').innerHTML=social.map(([n,u])=>`<a class="btn btn-secondary" target="_blank" rel="noopener" href="${esc(safeUrl(u))}">${esc(n)} ↗</a>`).join('');
    $('#serviceCards').innerHTML=services.map(x=>`<article class="service-card"><div class="service-icon">${x.image_url?`<img src="${esc(x.image_url)}" alt="${esc(x.title)}">`:esc(x.icon||'✦')}</div><h3>${esc(x.title)}</h3><p>${esc(x.short_description||'')}</p><a class="arrow" href="${esc(safeUrl(x.link_url||'#contact'))}">${x.link_url?'Open':'Discuss this solution'} →</a></article>`).join('');
    const visible=projects.filter(x=>x.published!==false).slice(0,6);
    $('#projectGrid').innerHTML=visible.map((p,i)=>`<a class="project-card ${i===0?'featured':''}" href="project.html?id=${encodeURIComponent(p.id||p.slug)}"><div class="project-image"><img src="${esc(p.cover_image||'assets/solar.svg')}" alt="${esc(p.title)}"></div><div class="project-body"><div class="project-meta"><span>${esc(p.category||'Project')}</span><span>${esc(p.location||'')}</span></div><h3>${esc(p.title)}</h3><p>${esc(p.short_description||'')}</p><strong>View case study →</strong></div></a>`).join('');
    $('#clientRow').innerHTML=clients.slice(0,8).map(c=>`<a class="client-logo" ${c.website_url&&safeUrl(c.website_url)?`href="${esc(safeUrl(c.website_url))}" target="_blank" rel="noopener"`:''}>${c.logo_url?`<img src="${esc(c.logo_url)}" alt="${esc(c.name)}">`:esc(c.name)}</a>`).join('');
  }catch(e){console.error(e)}
  $('#year').textContent=new Date().getFullYear();
}
$('#menuBtn').addEventListener('click',()=>$('#navLinks').classList.toggle('open'));document.querySelectorAll('#navLinks a').forEach(a=>a.addEventListener('click',()=>$('#navLinks').classList.remove('open')));
addEventListener('scroll',()=>$('#header').classList.toggle('scrolled',scrollY>20));
$('#quoteForm').addEventListener('submit',async e=>{e.preventDefault();const n=$('#formNotice');const fd=new FormData(e.currentTarget);const payload=Object.fromEntries(fd.entries());payload.status='New';n.className='notice show';n.textContent='Sending...';try{const r=await GreenXData.submitInquiry(payload);n.textContent=r.demo?'Saved in Demo Mode on this browser. Connect Supabase to receive enquiries from real visitors.':'Thank you. Your request has been received.';e.currentTarget.reset()}catch(err){n.textContent='Could not send the request. Please call us directly.';console.error(err)}});
boot();
