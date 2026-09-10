'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAV_SOLUTIONS } from '@/lib/constants';
import { PRODUCT_CATEGORY_META } from '@/lib/catalog';
import { SiteSettings } from '@/lib/types';

const solutionAssets: Record<string,string> = {
  'solar-energy':'/assets/solar.svg',
  'generator-backup-power':'/assets/generator.svg',
  'lift-elevator':'/assets/lift.svg',
  'electrical-engineering':'/assets/electrical.svg',
  'lightning-protection':'/assets/lightning.svg',
  'maintenance-support':'/assets/maintenance.svg',
};

export default function Header({settings}:{settings:SiteSettings}) {
  const pathname=usePathname();
  const [open,setOpen]=useState<'solutions'|'products'|null>(null);
  const [mobile,setMobile]=useState(false);
  const wa=(settings.whatsapp||settings.phone||'').replace(/\D/g,'');
  useEffect(()=>{setOpen(null);setMobile(false)},[pathname]);

  return <>
    <div className="topbar"><div className="container topbar-inner"><span>Engineering • Supply • Installation • Commissioning • Maintenance</span><span className="topbar-contact">{settings.phone && <a href={`tel:${settings.phone}`}>{settings.phone}</a>}<span>Bangladesh</span></span></div></div>
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" aria-label="Green X home"><Image src={settings.logo_url || '/assets/logo.svg'} alt="Green X Power Engineering" width={220} height={64} priority /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link className={pathname==='/'?'active':''} href="/">Home</Link>
          <Link className={pathname.startsWith('/about')?'active':''} href="/about">About</Link>
          <div className="nav-item">
            <button className={pathname.startsWith('/solutions')?'active':''} aria-expanded={open==='solutions'} onClick={()=>setOpen(open==='solutions'?null:'solutions')}>Solutions <span className="chev">⌄</span></button>
            {open==='solutions'&&<div className="mega-menu solutions-mega">
              <div className="mega-head"><div><span>Engineering solutions</span><strong>One partner from survey to support.</strong></div><Link href="/solutions">View all solutions →</Link></div>
              <div className="mega-grid solution-mega-grid">{NAV_SOLUTIONS.map(([label,slug])=><Link className="mega-card" key={slug} href={`/solutions/${slug}`}><span className="mega-icon"><Image src={solutionAssets[slug]} alt="" width={44} height={44}/></span><span><b>{label}</b><small>Explore capabilities</small></span><i>→</i></Link>)}</div>
            </div>}
          </div>
          <div className="nav-item">
            <button className={pathname.startsWith('/products')?'active':''} aria-expanded={open==='products'} onClick={()=>setOpen(open==='products'?null:'products')}>Products <span className="chev">⌄</span></button>
            {open==='products'&&<div className="mega-menu products-mega">
              <div className="mega-head"><div><span>Product catalog</span><strong>Browse equipment by application.</strong></div><Link href="/products">All products →</Link></div>
              <div className="mega-grid product-mega-grid">{PRODUCT_CATEGORY_META.map(c=><Link className="mega-card compact" key={c.slug} href={`/products/category/${c.slug}`}><span className="mega-icon"><Image src={c.asset} alt="" width={38} height={38}/></span><span><b>{c.name}</b><small>{c.short}</small></span></Link>)}</div>
            </div>}
          </div>
          <Link className={pathname.startsWith('/projects')?'active':''} href="/projects">Projects</Link>
          <Link className={pathname.startsWith('/contact')?'active':''} href="/contact">Contact</Link>
        </nav>
        <div className="nav-actions">{wa && <a className="icon-btn" target="_blank" rel="noreferrer" href={`https://wa.me/${wa}`}>WhatsApp</a>}<Link className="btn btn-primary" href="/contact#quote">Get a Quote</Link></div>
        <button className="mobile-toggle" onClick={()=>setMobile(!mobile)} aria-expanded={mobile} aria-label="Open menu"><span/><span/><span/></button>
      </div>
      {mobile&&<div className="mobile-sheet"><div className="container mobile-sheet-inner"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/solutions">Solutions</Link><div className="mobile-subgrid">{NAV_SOLUTIONS.map(([label,slug])=><Link key={slug} href={`/solutions/${slug}`}>{label}</Link>)}</div><Link href="/products">Products</Link><div className="mobile-subgrid">{PRODUCT_CATEGORY_META.map(c=><Link key={c.slug} href={`/products/category/${c.slug}`}>{c.name}</Link>)}</div><Link href="/projects">Projects</Link><Link href="/contact">Contact</Link><Link className="btn btn-primary" href="/contact#quote">Get a Quote</Link></div></div>}
    </header>
    {open&&<button className="menu-scrim" aria-label="Close menu" onClick={()=>setOpen(null)}/>} 
  </>;
}
