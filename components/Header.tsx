'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAV_SOLUTIONS } from '@/lib/constants';
import { PRODUCT_CATEGORY_META } from '@/lib/catalog';
import type { SiteSettings } from '@/lib/types';
import Icon, { productIconName, serviceIconName } from './Icons';

type Menu = 'solutions' | 'products' | null;

export default function Header({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState<Menu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wa = (settings.whatsapp || settings.phone || '').replace(/\D/g, '');

  useEffect(() => { setMenu(null); setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.classList.toggle('nav-lock', mobileOpen);
    return () => document.body.classList.remove('nav-lock');
  }, [mobileOpen]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && (setMenu(null), setMobileOpen(false));
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const active = (prefix:string) => pathname.startsWith(prefix) ? 'active' : '';

  return <>
    <header className="gx-header" onMouseLeave={() => setMenu(null)}>
      <div className="container gx-nav">
        <Link href="/" className="gx-brand" aria-label="Green X Power Engineering home">
          <Image src="/assets/logo-dark.svg" alt="Green X Power Engineering" width={210} height={58} priority />
        </Link>

        <nav className="gx-desktop-nav" aria-label="Primary navigation">
          <button type="button" className={active('/solutions')} aria-expanded={menu==='solutions'} onMouseEnter={()=>setMenu('solutions')} onFocus={()=>setMenu('solutions')} onClick={()=>setMenu(menu==='solutions'?null:'solutions')}>Solutions</button>
          <button type="button" className={active('/products')} aria-expanded={menu==='products'} onMouseEnter={()=>setMenu('products')} onFocus={()=>setMenu('products')} onClick={()=>setMenu(menu==='products'?null:'products')}>Products</button>
          <Link className={active('/industries')} href="/industries">Industries</Link>
          <Link className={active('/projects')} href="/projects">Projects</Link>
          <Link className={active('/about')} href="/about">About</Link>
          <Link className={active('/contact')} href="/contact">Contact</Link>
        </nav>

        <div className="gx-nav-actions">
          {wa && <a className="gx-whatsapp" target="_blank" rel="noreferrer" href={`https://wa.me/${wa}`} aria-label="WhatsApp Green X"><Icon name="whatsapp"/></a>}
          <Link href="/estimate-system-size" className="gx-consult">Get a Consultation <Icon name="arrow"/></Link>
        </div>

        <button className="gx-menu-toggle" onClick={()=>setMobileOpen(v=>!v)} aria-label={mobileOpen?'Close navigation':'Open navigation'} aria-expanded={mobileOpen}><Icon name={mobileOpen?'close':'menu'}/></button>
      </div>

      {menu && <div className="gx-mega" onMouseEnter={()=>setMenu(menu)}>
        <div className="container gx-mega-grid">
          <div className="gx-mega-copy">
            <span>{menu==='solutions'?'ENGINEERING SOLUTIONS':'PRODUCT CATEGORIES'}</span>
            <h3>{menu==='solutions'?'From site survey to long-term support.':'Equipment selected around the application.'}</h3>
            <p>{menu==='solutions'?'Explore the core engineering disciplines Green X brings together under one project team.':'Browse product families, key specifications and application guidance before requesting a quotation.'}</p>
            <Link href={menu==='solutions'?'/solutions':'/products'}>View all {menu} <Icon name="arrow"/></Link>
          </div>
          <div className="gx-mega-items">
            {menu==='solutions' ? NAV_SOLUTIONS.map(([label,slug])=><Link key={slug} href={`/solutions/${slug}`} className="gx-mega-item"><span><Icon name={serviceIconName(slug)}/></span><div><b>{label}</b><small>Explore capability</small></div><Icon name="arrow"/></Link>) : PRODUCT_CATEGORY_META.map(item=><Link key={item.slug} href={`/products/category/${item.slug}`} className="gx-mega-item"><span><Icon name={productIconName(item.slug)}/></span><div><b>{item.name}</b><small>{item.short}</small></div><Icon name="arrow"/></Link>)}
          </div>
        </div>
      </div>}
    </header>

    {mobileOpen && <div className="gx-mobile-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="gx-mobile-scroll">
        <div className="gx-mobile-head"><span>Navigation</span><button onClick={()=>setMobileOpen(false)} aria-label="Close menu"><Icon name="close"/></button></div>
        <details open><summary>Solutions</summary><div>{NAV_SOLUTIONS.map(([label,slug])=><Link key={slug} href={`/solutions/${slug}`}><Icon name={serviceIconName(slug)}/><span>{label}</span><Icon name="arrow"/></Link>)}</div></details>
        <details><summary>Products</summary><div>{PRODUCT_CATEGORY_META.map(item=><Link key={item.slug} href={`/products/category/${item.slug}`}><Icon name={productIconName(item.slug)}/><span>{item.name}</span><Icon name="arrow"/></Link>)}</div></details>
        <Link className="gx-mobile-link" href="/industries">Industries</Link>
        <Link className="gx-mobile-link" href="/projects">Projects</Link>
        <Link className="gx-mobile-link" href="/about">About</Link>
        <Link className="gx-mobile-link" href="/contact">Contact</Link>
        <div className="gx-mobile-contact">
          <small>Need a technical discussion?</small>
          <Link href="/estimate-system-size" className="gx-consult">Estimate System Size <Icon name="arrow"/></Link>
          <div>{settings.phone&&<a href={`tel:${settings.phone}`}><Icon name="phone"/>Call</a>}{wa&&<a target="_blank" rel="noreferrer" href={`https://wa.me/${wa}`}><Icon name="whatsapp"/>WhatsApp</a>}</div>
        </div>
      </div>
    </div>}
  </>;
}
