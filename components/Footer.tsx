import Link from 'next/link';
import type { SiteSettings } from '@/lib/types';
import { NAV_SOLUTIONS } from '@/lib/constants';
import { PRODUCT_CATEGORY_META } from '@/lib/catalog';
import Icon from './Icons';

export default function Footer({ settings }: { settings: SiteSettings }) {
  const wa=(settings.whatsapp||settings.phone||'').replace(/\D/g,'');
  const mapHref=settings.map_url||(settings.address?`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`:'');
  return <footer className="gx-footer">
    <div className="container gx-footer-top">
      <div className="gx-footer-brand"><div className="gx-footer-wordmark">GREEN <b>X</b></div><p>{settings.tagline}</p><span>Integrated power, renewable energy, lift and lifecycle engineering solutions for Bangladesh.</span><div className="gx-footer-social">{settings.facebook_url&&<a href={settings.facebook_url} target="_blank" rel="noreferrer">Facebook</a>}{settings.linkedin_url&&<a href={settings.linkedin_url} target="_blank" rel="noreferrer">LinkedIn</a>}{settings.youtube_url&&<a href={settings.youtube_url} target="_blank" rel="noreferrer">YouTube</a>}</div></div>
      <div className="gx-footer-col"><h4>Solutions</h4>{NAV_SOLUTIONS.slice(0,6).map(([label,slug])=><Link key={slug} href={`/solutions/${slug}`}>{label}</Link>)}</div>
      <div className="gx-footer-col"><h4>Products</h4>{PRODUCT_CATEGORY_META.slice(0,6).map(item=><Link key={item.slug} href={`/products/category/${item.slug}`}>{item.name}</Link>)}</div>
      <div className="gx-footer-col"><h4>Company</h4><Link href="/about">About Green X</Link><Link href="/industries">Industries</Link><Link href="/projects">Projects</Link><Link href="/contact">Contact</Link><Link href="/estimate-system-size">System Estimator</Link></div>
      <div className="gx-footer-contact"><h4>Direct contact</h4>{settings.phone&&<a href={`tel:${settings.phone}`}><Icon name="phone"/><span><small>Call</small><b>{settings.phone}</b></span></a>}{wa&&<a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer"><Icon name="whatsapp"/><span><small>WhatsApp</small><b>Message Green X</b></span></a>}{settings.email&&<a href={`mailto:${settings.email}`}><Icon name="mail"/><span><small>Email</small><b>{settings.email}</b></span></a>}{settings.address&&<a href={mapHref} target="_blank" rel="noreferrer"><Icon name="location"/><span><small>Office</small><b>{settings.address}</b></span></a>}</div>
    </div>
    <div className="container gx-footer-bottom"><span>© {new Date().getFullYear()} Green X Power Engineering. All rights reserved.</span><span>Powering the Future, Sustainably.</span></div>
  </footer>;
}
