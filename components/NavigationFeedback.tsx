'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationFeedback(){
  const pathname = usePathname();
  const [loading,setLoading] = useState(false);

  useEffect(()=>{ setLoading(false); },[pathname]);


  useEffect(()=>{
    if(!loading) return;
    const timer=window.setTimeout(()=>setLoading(false),8000);
    return ()=>window.clearTimeout(timer);
  },[loading]);

  useEffect(()=>{
    const onClick=(event:MouseEvent)=>{
      if(event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target=event.target as HTMLElement | null;
      const anchor=target?.closest('a') as HTMLAnchorElement | null;
      if(!anchor) return;
      if(anchor.target==='_blank' || anchor.hasAttribute('download')) return;
      const href=anchor.getAttribute('href');
      if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      try{
        const url=new URL(anchor.href,window.location.href);
        if(url.origin!==window.location.origin) return;
        if(url.pathname===window.location.pathname && url.search===window.location.search) return;
        setLoading(true);
      }catch{}
    };
    document.addEventListener('click',onClick,true);
    return ()=>document.removeEventListener('click',onClick,true);
  },[]);

  if(!loading) return null;
  return <div className="gx-route-feedback" aria-live="polite" aria-label="Loading next page">
    <div className="gx-route-progress"/>
    <div className="gx-route-pill"><span/><b>Loading</b></div>
  </div>;
}
