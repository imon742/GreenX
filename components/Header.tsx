import Link from 'next/link';
import Image from 'next/image';
import { PRODUCT_CATEGORIES, NAV_SOLUTIONS } from '@/lib/constants';
import { SiteSettings } from '@/lib/types';

export default function Header({settings}:{settings:SiteSettings}) {
  const wa=(settings.whatsapp||settings.phone||'').replace(/\D/g,'');
  return <>
    <div className="topbar"><div className="container topbar-inner"><span>Engineering • Supply • Installation • Commissioning • Maintenance</span><span className="topbar-contact">{settings.phone && <a href={`tel:${settings.phone}`}>{settings.phone}</a>}<span>Bangladesh</span></span></div></div>
    <header className="site-header"><div className="container nav-wrap">
      <Link href="/" className="brand" aria-label="Green X home"><Image src={settings.logo_url || '/assets/logo.svg'} alt="Green X Power Engineering" width={220} height={64} priority /></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/">Home</Link><Link href="/about">About</Link>
        <div className="nav-dropdown"><button>Solutions <span>⌄</span></button><div className="dropdown-panel">{NAV_SOLUTIONS.map(([label,slug])=><Link key={slug} href={`/solutions/${slug}`}>{label}<small>Explore solution →</small></Link>)}</div></div>
        <div className="nav-dropdown"><button>Products <span>⌄</span></button><div className="dropdown-panel product-menu"><Link href="/products" className="all-products"><strong>All Products</strong><small>Browse complete catalog →</small></Link>{PRODUCT_CATEGORIES.map(c=><Link key={c} href={`/products?category=${encodeURIComponent(c)}`}>{c}<small>View category →</small></Link>)}</div></div>
        <Link href="/projects">Projects</Link><Link href="/contact">Contact</Link>
      </nav>
      <div className="nav-actions">{wa && <a className="icon-btn" target="_blank" rel="noreferrer" href={`https://wa.me/${wa}`}>WhatsApp</a>}<Link className="btn btn-primary" href="/contact#quote">Get a Quote</Link></div>
      <details className="mobile-menu"><summary>Menu</summary><div className="mobile-panel"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/solutions">Solutions</Link><Link href="/products">Products</Link>{PRODUCT_CATEGORIES.map(c=><Link className="sub" key={c} href={`/products?category=${encodeURIComponent(c)}`}>{c}</Link>)}<Link href="/projects">Projects</Link><Link href="/contact">Contact</Link><Link className="btn btn-primary" href="/contact#quote">Get a Quote</Link></div></details>
    </div></header>
  </>;
}
