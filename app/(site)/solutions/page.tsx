import Image from 'next/image';
import Link from 'next/link';
import { getServices } from '@/lib/data';
import { ServiceCard } from '@/components/Cards';
import SectionTitle from '@/components/SectionTitle';
import Icon from '@/components/Icons';
import { PHOTO_SOLAR_BD } from '@/lib/visuals';

export const metadata={title:'Engineering Solutions',description:'Solar, generator, lift, electrical, lightning protection and maintenance solutions from Greenex Power Engineering.'};

export default async function Solutions(){
  const services=await getServices();
  return <>
    <section className="inner-hero">
      <div className="container inner-hero-grid">
        <div className="inner-hero-copy"><span className="kicker kicker-light">Engineering solutions</span><h1>One engineering partner across power, energy and infrastructure.</h1><p>From site survey and equipment selection to installation, commissioning and maintenance, each solution is designed around the real operating requirement.</p><div className="hero-actions-v3"><Link className="btn btn-primary" href="/contact#quote">Request a Site Visit <Icon name="arrow"/></Link><Link className="btn btn-dark-outline" href="/projects">Explore Project Work</Link></div></div>
        <div className="inner-hero-photo"><Image src={PHOTO_SOLAR_BD} alt="Industrial solar energy application in Bangladesh" fill priority sizes="(max-width:900px) 100vw, 46vw"/><div className="hero-photo-shade"/><span>{services.length} Core Engineering Disciplines</span></div>
      </div>
    </section>
    <section className="section-v3"><div className="container"><SectionTitle eyebrow="Our capabilities" title="Choose the solution that matches your requirement." body="Each discipline has a dedicated page with scope, delivery process, related equipment and project examples."/><div className="service-grid-v3">{services.map((s,i)=><ServiceCard key={s.slug} item={{...s,display_order:i+1}}/>)}</div></div></section>
    <section className="section-v3 section-soft-v3"><div className="container system-thinking-v3"><div><span className="kicker">System thinking</span><h2>Different disciplines. One operating objective: reliability.</h2><p>Solar, generator, electrical distribution, protection and maintenance often interact at the same site. Greenex structures the solution so those systems can work together instead of being treated as separate purchases.</p></div><div className="system-map-v3">{['Load & site conditions','Engineering & selection','Installation & integration','Testing & handover','Maintenance & support'].map((x,i)=><div key={x}><span>0{i+1}</span><b>{x}</b></div>)}</div></div></section>
    <section className="section-v3"><div className="container simple-cta-v3"><div><span className="kicker">Need guidance?</span><h2>Tell us the problem, load or site requirement.</h2><p>We can help identify the right engineering path before you commit to equipment.</p></div><Link className="btn btn-primary" href="/contact#quote">Talk to Greenex <Icon name="arrow"/></Link></div></section>
  </>;
}
