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
  const icons = ['factory','building','home','electrical','ups','solar'] as const;
  const labels = clients.length ? clients.map(c=>c.name) : ['Industrial manufacturing','Commercial buildings','Residential developments','Healthcare & institutions','ICT & critical facilities','Infrastructure & utilities'];
  return <div className="sector-grid gx-sector-grid-rich">{labels.slice(0,6).map((label,index) => <div key={label}><Icon name={icons[index%icons.length]}/><span>{label}</span><small>Application-focused engineering</small></div>)}</div>;
}
