import type { Client } from '@/lib/types';
import Icon from './Icons';

export default function ClientShowcase({ clients }: { clients: Client[] }) {
  const logos = clients.filter(c => c.logo_url);
  if (logos.length) {
    const repeated = [...logos, ...logos];
    return <div className="logo-rail" aria-label="Clients and partners"><div className="logo-track">{repeated.map((c,i) => {
      const inner = <><img src={c.logo_url!} alt={c.name} loading="lazy" decoding="async"/><span>{c.name}</span></>;
      return c.website_url ? <a key={`${c.name}-${i}`} target="_blank" rel="noreferrer" href={c.website_url}>{inner}</a> : <div key={`${c.name}-${i}`}>{inner}</div>;
    })}</div></div>;
  }
  const sectors = [
    ['factory','Industrial manufacturing'],
    ['building','Commercial buildings'],
    ['home','Residential developments'],
    ['electrical','Infrastructure & institutions'],
  ] as const;
  return <div className="sector-grid">{sectors.map(([icon,label]) => <div key={label}><Icon name={icon}/><span>{label}</span></div>)}</div>;
}
