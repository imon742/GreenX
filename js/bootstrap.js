(function(){
  const tag=document.currentScript;
  const prefix=tag.dataset.prefix||'';
  const entry=tag.dataset.entry;
  function load(src,done){const s=document.createElement('script');s.src=src;s.onload=()=>done&&done();s.onerror=()=>{console.error('Could not load',src);done&&done()};document.body.appendChild(s)}
  function startApp(){load(prefix+'js/data-service.js',()=>load(entry));}
  const c=window.GREENX_CONFIG||{};
  if(c.SUPABASE_URL&&c.SUPABASE_ANON_KEY){load('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',startApp)}else startApp();
})();
