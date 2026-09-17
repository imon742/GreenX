import Link from 'next/link';
import type { SiteSettings } from '@/lib/types';
import Icon from './Icons';

export default function FloatingContact({ settings }: { settings: SiteSettings }) {
  const wa=(settings.whatsapp||settings.phone||'').replace(/\D/g,'');
  return <>
    {wa && <a className="floating-whatsapp" target="_blank" rel="noreferrer" href={`https://wa.me/${wa}`} aria-label="Chat with Greenex on WhatsApp"><Icon name="whatsapp"/><span>WhatsApp</span></a>}
    <div className="mobile-action-bar">
      {settings.phone && <a href={`tel:${settings.phone}`}><Icon name="phone"/><span>Call</span></a>}
      {wa && <a target="_blank" rel="noreferrer" href={`https://wa.me/${wa}`}><Icon name="whatsapp"/><span>WhatsApp</span></a>}
      <Link href="/estimate-system-size"><Icon name="arrow"/><span>Estimate</span></Link>
    </div>
  </>;
}
