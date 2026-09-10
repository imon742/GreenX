(function(){
  const cfg = window.GREENX_CONFIG || {};
  const demo = window.GREENX_DEMO;
  const connected = Boolean(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
  let client = null;
  if (connected) client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);

  const localKey = 'greenx-demo-admin-data-v1';
  function demoState(){
    try { return JSON.parse(localStorage.getItem(localKey)) || structuredClone(demo); }
    catch(e){ return structuredClone(demo); }
  }
  function saveDemo(data){ localStorage.setItem(localKey, JSON.stringify(data)); }
  function one(row){ return Array.isArray(row) ? row[0] : row; }

  async function getSettings(){
    if (!client) return demoState().settings;
    const {data,error}=await client.from('site_settings').select('*').limit(1).maybeSingle();
    if(error) throw error; return data || demo.settings;
  }
  async function getCollection(table, onlyPublished=true){
    if(!client){
      let rows=demoState()[table] || [];
      if(onlyPublished) rows=rows.filter(x=>x.published!==false);
      return rows.sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));
    }
    let q=client.from(table).select('*');
    if(onlyPublished) q=q.eq('published',true);
    if(['services','clients'].includes(table)) q=q.order('sort_order',{ascending:true});
    else q=q.order('created_at',{ascending:false});
    const {data,error}=await q; if(error) throw error; return data||[];
  }
  async function getProject(idOrSlug){
    if(!client){ return demoState().projects.find(x=>x.id===idOrSlug||x.slug===idOrSlug) || null; }
    let {data,error}=await client.from('projects').select('*').eq('id',idOrSlug).maybeSingle();
    if(error && error.code!=='22P02') throw error;
    if(!data){ const r=await client.from('projects').select('*').eq('slug',idOrSlug).maybeSingle(); if(r.error) throw r.error; data=r.data; }
    if(data){ const imgs=await client.from('project_images').select('*').eq('project_id',data.id).order('sort_order'); data.gallery=(imgs.data||[]).map(x=>x.image_url); }
    return data;
  }
  async function submitInquiry(payload){
    if(!client){ const d=demoState(); d.inquiries=d.inquiries||[]; d.inquiries.unshift({id:'demo-'+Date.now(),created_at:new Date().toISOString(),status:'New',...payload}); saveDemo(d); return {demo:true}; }
    const {error}=await client.from('inquiries').insert(payload); if(error) throw error; return {demo:false};
  }

  async function signIn(email,password){ if(!client) return {demo:true,user:{email:'demo@greenx.local'}}; const {data,error}=await client.auth.signInWithPassword({email,password}); if(error) throw error; return data; }
  async function signOut(){ if(client) await client.auth.signOut(); }
  async function session(){ if(!client) return null; const {data}=await client.auth.getSession(); return data.session; }

  async function adminGet(table){
    if(!client) return demoState()[table] || [];
    const {data,error}=await client.from(table).select('*').order('created_at',{ascending:false}); if(error) throw error; return data||[];
  }
  async function adminSave(table,row){
    if(!client){
      const d=demoState(); d[table]=d[table]||[];
      const copy={...row}; if(!copy.id) copy.id='demo-'+Date.now();
      const i=d[table].findIndex(x=>x.id===copy.id); if(i>=0)d[table][i]={...d[table][i],...copy}; else d[table].unshift(copy);
      saveDemo(d); return copy;
    }
    const payload={...row}; if(!payload.id) delete payload.id;
    const {data,error}=await client.from(table).upsert(payload).select().single(); if(error) throw error; return data;
  }
  async function adminDelete(table,id){
    if(!client){ const d=demoState(); d[table]=(d[table]||[]).filter(x=>x.id!==id); saveDemo(d); return; }
    const {error}=await client.from(table).delete().eq('id',id); if(error) throw error;
  }
  async function saveSettings(row){
    if(!client){const d=demoState(); d.settings={...d.settings,...row}; saveDemo(d); return d.settings;}
    const current=await getSettings(); const payload={...current,...row};
    const {data,error}=await client.from('site_settings').upsert(payload).select().single(); if(error) throw error; return data;
  }
  async function uploadFile(file,pathPrefix='uploads'){
    if(!client) return await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.readAsDataURL(file)});
    const ext=(file.name.split('.').pop()||'bin').toLowerCase();
    const path=`${pathPrefix}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const {error}=await client.storage.from(cfg.STORAGE_BUCKET||'site-media').upload(path,file,{upsert:false,contentType:file.type||undefined}); if(error) throw error;
    return client.storage.from(cfg.STORAGE_BUCKET||'site-media').getPublicUrl(path).data.publicUrl;
  }
  async function getInquiries(){ if(!client) return demoState().inquiries||[]; const {data,error}=await client.from('inquiries').select('*').order('created_at',{ascending:false}); if(error) throw error; return data||[]; }
  async function updateInquiry(id,status){
    if(!client){ const d=demoState(); const r=(d.inquiries||[]).find(x=>x.id===id); if(r)r.status=status; saveDemo(d); return; }
    const {error}=await client.from('inquiries').update({status}).eq('id',id); if(error) throw error;
  }

  async function adminAddProjectImages(projectId,urls){
    const clean=(urls||[]).filter(Boolean);
    if(!clean.length) return [];
    if(!client){
      const d=demoState(); const p=(d.projects||[]).find(x=>String(x.id)===String(projectId));
      if(p){p.gallery=[...(p.gallery||[]),...clean];saveDemo(d)}
      return clean;
    }
    const rows=clean.map((image_url,i)=>({project_id:projectId,image_url,sort_order:i}));
    const {data,error}=await client.from('project_images').insert(rows).select(); if(error) throw error; return data||[];
  }
  async function adminGetProjectImages(projectId){
    if(!client){const p=(demoState().projects||[]).find(x=>String(x.id)===String(projectId));return (p&&p.gallery)||[];}
    const {data,error}=await client.from('project_images').select('*').eq('project_id',projectId).order('sort_order'); if(error) throw error; return data||[];
  }

  function isConnected(){ return !!client; }
  function resetDemo(){ localStorage.removeItem(localKey); }

  window.GreenXData={getSettings,getServices:()=>getCollection('services'),getProjects:()=>getCollection('projects'),getClients:()=>getCollection('clients'),getProducts:()=>getCollection('products'),getProject,submitInquiry,signIn,signOut,session,adminGet,adminSave,adminDelete,saveSettings,uploadFile,adminAddProjectImages,adminGetProjectImages,getInquiries,updateInquiry,isConnected,resetDemo};
})();
