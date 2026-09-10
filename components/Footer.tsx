import Link from 'next/link';
import type { SiteSettings } from '@/lib/types';
import { NAV_SOLUTIONS } from '@/lib/constants';
import { PRODUCT_CATEGORY_META } from '@/lib/catalog';
import Icon from './Icons';

export default function Footer({ settings }: { settings: SiteSettings }) {
  const wa = (settings.whatsapp || settings.phone || '').replace(/\D/g, '');
  const mapHref = settings.map_url || (settings.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}` : '');
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-company">
          <div className="footer-wordmark">GREEN <b>X</b></div>
          <p className="footer-tagline">{settings.tagline}</p>
          <p className="footer-about">Power, renewable energy and infrastructure engineering for commercial, industrial and residential requirements.</p>
          <div className="footer-socials">
            {settings.facebook_url && <a target="_blank" rel="noreferrer" href={settings.facebook_url}>Facebook</a>}
            {settings.linkedin_url && <a target="_blank" rel="noreferrer" href={settings.linkedin_url}>LinkedIn</a>}
            {settings.youtube_url && <a target="_blank" rel="noreferrer" href={settings.youtube_url}>YouTube</a>}
          </div>
        </div>

        <div className="footer-column">
          <h4>Solutions</h4>
          {NAV_SOLUTIONS.slice(0, 6).map(([label, slug]) => <Link key={slug} href={`/solutions/${slug}`}>{label}</Link>)}
        </div>

        <div className="footer-column">
          <h4>Products</h4>
          {PRODUCT_CATEGORY_META.slice(0, 6).map(item => <Link key={item.slug} href={`/products/category/${item.slug}`}>{item.name}</Link>)}
        </div>

        <div className="footer-column footer-contact">
          <h4>Direct contact</h4>
          {settings.phone && <a href={`tel:${settings.phone}`}><Icon name="phone" /><span><small>Phone</small>{settings.phone}</span></a>}
          {wa && <a target="_blank" rel="noreferrer" href={`https://wa.me/${wa}`}><Icon name="whatsapp" /><span><small>WhatsApp</small>Message Green X</span></a>}
          {settings.email && <a href={`mailto:${settings.email}`}><Icon name="mail" /><span><small>Email</small>{settings.email}</span></a>}
          {settings.address && <a target="_blank" rel="noreferrer" href={mapHref}><Icon name="location" /><span><small>Head office</small>{settings.address}</span></a>}
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Green X Power Engineering. All rights reserved.</span>
        <div><Link href="/about">Company</Link><Link href="/projects">Projects</Link><Link href="/contact">Contact</Link></div>
      </div>
    </footer>
  );
}
