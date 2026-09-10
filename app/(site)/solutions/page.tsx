import Link from 'next/link';
import { getServices } from '@/lib/data';
import { ServiceCard } from '@/components/Cards';
import SectionTitle from '@/components/SectionTitle';

export const metadata={title:'Engineering Solutions | Green X',description:'Solar, generator, lift, electrical, lightning protection and maintenance solutions from Green X Power Engineering.'};

export default async function Solutions(){
  const services=await getServices();
  return <>
    <section className="page-hero solutions-index-hero"><div className="container page-hero-grid"><div><span className="eyebrow light">Engineering solutions</span><h1>One engineering partner across power, energy and infrastructure.</h1><p>From the first site visit to commissioning and maintenance, each Green X solution has its own dedicated page, capability scope and related project path.</p><div className="hero-actions"><Link className="btn btn-primary" href="/contact#quote">Request a Site Visit</Link><Link className="btn btn-ghost" href="/projects">Explore Project Work</Link></div></div><div className="hero-stat-card"><span>CAPABILITIES</span><strong>{services.length}</strong><p>Core solution areas designed for commercial, industrial and residential requirements.</p></div></div></section>
    <section className="section"><div className="container"><SectionTitle eyebrow="Our capabilities" title="Choose the solution that matches your requirement." body="Each area opens a complete page with scope, process, related equipment and relevant project work."/><div className="service-grid premium-service-grid">{services.map((s,i)=><ServiceCard key={s.slug} item={{...s,display_order:i+1}}/>)}</div></div></section>
    <section className="section soft-section"><div className="container category-cta"><div><span className="eyebrow">Not sure where to start?</span><h2>Tell us the problem, load or site requirement.</h2><p>Green X can help define whether the right answer is solar, standby power, electrical improvement, lift work, protection or maintenance.</p></div><Link className="btn btn-primary" href="/contact#quote">Talk to Green X</Link></div></section>
  </>
}
