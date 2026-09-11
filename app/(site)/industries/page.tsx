import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icons';
import { PHOTO_ELECTRICAL, PHOTO_GENERATOR, PHOTO_SOLAR_FACTORY, PHOTO_ELEVATOR } from '@/lib/visuals';

export const metadata={title:'Industries',description:'Green X engineering solutions for industrial, commercial, residential and infrastructure projects in Bangladesh.'};

const sectors=[
  {icon:'factory' as const,title:'Industrial Manufacturing',copy:'Power continuity, rooftop solar, distribution, protection and maintenance designed around production uptime.',image:PHOTO_SOLAR_FACTORY,items:['Rooftop solar PV','Standby generators','Electrical distribution','Preventive maintenance']},
  {icon:'building' as const,title:'Commercial Buildings',copy:'Integrated power, lift and backup systems for offices, towers, retail and mixed-use facilities.',image:PHOTO_ELEVATOR,items:['Passenger lifts','Backup power','UPS systems','Lifecycle AMC']},
  {icon:'home' as const,title:'Residential Developments',copy:'Practical solar, generator and vertical-mobility solutions for modern residential properties.',image:PHOTO_GENERATOR,items:['Solar backup','Generator systems','Home & passenger lifts','Protection systems']},
  {icon:'electrical' as const,title:'Infrastructure & Institutions',copy:'Reliable electrical and backup systems for facilities where continuity, safety and serviceability matter.',image:PHOTO_ELECTRICAL,items:['Electrical engineering','Critical backup','Lightning protection','Maintenance support']},
];

export default function Industries(){return <>
  <section className="inner-hero"><div className="container inner-hero-grid"><div className="inner-hero-copy"><span className="kicker kicker-light">Industries</span><h1>Engineering shaped around how your facility actually operates.</h1><p>Different sites have different load profiles, critical systems, operating hours and maintenance expectations. Green X aligns the solution to that context.</p><div className="hero-actions-v3"><Link className="btn btn-primary" href="/estimate-system-size">Estimate System Size <Icon name="arrow"/></Link><Link className="btn btn-dark-outline" href="/projects">Explore Projects</Link></div></div><div className="inner-hero-photo"><Image src={PHOTO_SOLAR_FACTORY} alt="Industrial energy facility" fill priority sizes="(max-width:900px) 100vw,46vw"/><div className="hero-photo-shade"/><span>Industrial • Commercial • Residential • Infrastructure</span></div></div></section>
  <section className="gx-section"><div className="container gx-industry-detail-grid">{sectors.map(s=><article key={s.title} className="gx-industry-detail"><div className="gx-industry-photo"><Image src={s.image} alt={s.title} fill sizes="(max-width:800px) 100vw,50vw"/><div className="gx-photo-shade"/></div><div className="gx-industry-copy"><span><Icon name={s.icon}/></span><h2>{s.title}</h2><p>{s.copy}</p><div>{s.items.map(x=><b key={x}><Icon name="check"/>{x}</b>)}</div><Link href="/contact#quote">Discuss this application <Icon name="arrow"/></Link></div></article>)}</div></section>
  <section className="gx-section gx-cta-section"><div className="container gx-final-cta"><div><span className="kicker">Your facility</span><h2>Need a solution designed around your operating requirement?</h2><p>Start with an indicative system estimate or speak directly with the Green X engineering team.</p></div><div><Link className="gx-primary-cta" href="/estimate-system-size">Estimate System Size <Icon name="arrow"/></Link><Link className="gx-secondary-cta" href="/contact">Contact Green X</Link></div></div></section>
</>}
