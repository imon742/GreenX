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

  useEffect(() => {
    setMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('nav-lock', mobileOpen);
    return () => document.body.classList.remove('nav-lock');
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenu(null); setMobileOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>Engineering • Supply • Installation • Commissioning • Maintenance</span>
          <div className="utility-actions">
            <span>Dhaka, Bangladesh</span>
            {settings.phone && <a href={`tel:${settings.phone}`}>Call {settings.phone}</a>}
          </div>
        </div>
      </div>

      <header className="site-header" onMouseLeave={() => setMenu(null)}>
        <div className="container nav-shell">
          <Link href="/" className="brand" aria-label="Green X Power Engineering home">
            <Image
              src={settings.logo_url || '/assets/logo.svg'}
              alt="Green X Power Engineering"
              width={218}
              height={58}
              priority
            />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link className={pathname === '/' ? 'active' : ''} href="/">Home</Link>
            <Link className={pathname.startsWith('/about') ? 'active' : ''} href="/about">About</Link>
            <button
              type="button"
              className={pathname.startsWith('/solutions') ? 'active' : ''}
              aria-expanded={menu === 'solutions'}
              aria-haspopup="true"
              onClick={() => setMenu(menu === 'solutions' ? null : 'solutions')}
              onMouseEnter={() => setMenu('solutions')}
              onFocus={() => setMenu('solutions')}
            >
              Solutions <span className="nav-caret">⌄</span>
            </button>
            <button
              type="button"
              className={pathname.startsWith('/products') ? 'active' : ''}
              aria-expanded={menu === 'products'}
              aria-haspopup="true"
              onClick={() => setMenu(menu === 'products' ? null : 'products')}
              onMouseEnter={() => setMenu('products')}
              onFocus={() => setMenu('products')}
            >
              Products <span className="nav-caret">⌄</span>
            </button>
            <Link className={pathname.startsWith('/projects') ? 'active' : ''} href="/projects">Projects</Link>
            <Link className={pathname.startsWith('/contact') ? 'active' : ''} href="/contact">Contact</Link>
          </nav>

          <div className="desktop-cta">
            {wa && <a className="nav-whatsapp" target="_blank" rel="noreferrer" href={`https://wa.me/${wa}`} aria-label="Chat on WhatsApp"><Icon name="whatsapp" /></a>}
            <Link className="btn btn-primary btn-small" href="/contact#quote">Get a Quote</Link>
          </div>

          <button
            className="mobile-toggle"
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} />
          </button>
        </div>

        {menu === 'solutions' && (
          <div className="mega-panel" onMouseEnter={() => setMenu('solutions')}>
            <div className="container mega-shell">
              <div className="mega-intro">
                <span className="kicker">Engineering solutions</span>
                <h3>One partner from site survey to long-term support.</h3>
                <p>Power, renewable energy, vertical mobility and maintenance for modern facilities.</p>
                <Link href="/solutions" className="arrow-link">View all solutions <Icon name="arrow" /></Link>
              </div>
              <div className="mega-cards">
                {NAV_SOLUTIONS.map(([label, slug]) => (
                  <Link key={slug} href={`/solutions/${slug}`} className="mega-card">
                    <span className="mega-card-icon"><Icon name={serviceIconName(slug)} /></span>
                    <span className="mega-card-copy"><b>{label}</b><small>Explore capability</small></span>
                    <Icon name="arrow" className="mega-card-arrow" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {menu === 'products' && (
          <div className="mega-panel" onMouseEnter={() => setMenu('products')}>
            <div className="container mega-shell products-shell">
              <div className="mega-intro">
                <span className="kicker">Product catalog</span>
                <h3>Equipment grouped by project application.</h3>
                <p>Open a category for models, specifications and project-specific quotation.</p>
                <Link href="/products" className="arrow-link">Browse all products <Icon name="arrow" /></Link>
              </div>
              <div className="mega-cards product-mega-cards">
                {PRODUCT_CATEGORY_META.map((item) => (
                  <Link key={item.slug} href={`/products/category/${item.slug}`} className="mega-card">
                    <span className="mega-card-icon"><Icon name={productIconName(item.slug)} /></span>
                    <span className="mega-card-copy"><b>{item.name}</b><small>{item.short}</small></span>
                    <Icon name="arrow" className="mega-card-arrow" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-nav-scroll">
            <Link className="mobile-main-link" href="/">Home</Link>
            <Link className="mobile-main-link" href="/about">About</Link>

            <details open>
              <summary>Solutions <span>+</span></summary>
              <div className="mobile-subnav">
                {NAV_SOLUTIONS.map(([label, slug]) => (
                  <Link key={slug} href={`/solutions/${slug}`}>
                    <Icon name={serviceIconName(slug)} /><span>{label}</span><Icon name="arrow" />
                  </Link>
                ))}
              </div>
            </details>

            <details>
              <summary>Products <span>+</span></summary>
              <div className="mobile-subnav">
                {PRODUCT_CATEGORY_META.map((item) => (
                  <Link key={item.slug} href={`/products/category/${item.slug}`}>
                    <Icon name={productIconName(item.slug)} /><span>{item.name}</span><Icon name="arrow" />
                  </Link>
                ))}
              </div>
            </details>

            <Link className="mobile-main-link" href="/projects">Projects</Link>
            <Link className="mobile-main-link" href="/contact">Contact</Link>

            <div className="mobile-contact-box">
              <span>Need help with a project?</span>
              <div>
                {settings.phone && <a href={`tel:${settings.phone}`}><Icon name="phone" /> Call</a>}
                {wa && <a target="_blank" rel="noreferrer" href={`https://wa.me/${wa}`}><Icon name="whatsapp" /> WhatsApp</a>}
              </div>
              <Link className="btn btn-primary" href="/contact#quote">Request a Quote</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
