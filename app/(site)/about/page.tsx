import Image from 'next/image';
import Link from 'next/link';
import { getSettings } from '@/lib/data';
import { PHOTO_ELECTRICAL, PHOTO_SOLAR_BD } from '@/lib/visuals';
import Icon from '@/components/Icons';

export const metadata={title:'About',description:'About Greenex Power Engineering, our engineering approach, mission and long-term support philosophy.'};

export default async function About(){
  const s=await getSettings();
  const profile=process.env.NEXT_PUBLIC_COMPANY_PROFILE_URL;
  return <>
    <section className="inner-hero">
      <div className="container inner-hero-grid">
        <div className="inner-hero-copy"><span className="kicker kicker-light">About Greenex</span><h1>Engineering confidence into every project.</h1><p>{s.about_short}</p><div className="hero-actions-v3"><Link className="btn btn-primary" href="/contact#quote">Talk to Our Team <Icon name="arrow"/></Link>{profile&&<a className="btn btn-dark-outline" href={profile} target="_blank" rel="noreferrer"><Icon name="download"/> Company Profile</a>}</div></div>
        <div className="inner-hero-photo"><Image src={PHOTO_ELECTRICAL} alt="Electrical engineering system" fill priority sizes="(max-width:900px) 100vw, 46vw"/><div className="hero-photo-shade"/><span>Power • Safety • Reliability</span></div>
      </div>
    </section>

    <section className="section-v3"><div className="container about-story-grid"><div><span className="kicker">Who we are</span><h2>Practical engineering. Reliable execution. Long-term support.</h2></div><div><p className="lead-v3">{s.about_full}</p><p>Our work is built around understanding the real operating requirement first—load, site conditions, safety, maintainability and future expansion—then selecting and integrating the right solution.</p></div></div></section>

    <section className="section-v3 section-soft-v3"><div className="container"><div className="value-grid-v3">{[
      ['01','Engineering first','Solutions are shaped around site conditions, load and operating priorities—not only product availability.'],
      ['02','Safety & quality','Clear scope, suitable equipment, disciplined installation and testing support dependable operation.'],
      ['03','Client partnership','We aim to make technical decisions understandable and keep communication clear throughout delivery.'],
      ['04','Lifecycle support','Maintenance, service planning and upgrade support continue beyond project handover.'],
    ].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>

    <section className="section-v3"><div className="container mission-vision-v3"><div><span className="kicker">Mission</span><h2>{s.mission}</h2></div><div><span className="kicker">Vision</span><h2>{s.vision}</h2></div></div></section>

    <section className="section-v3 section-dark-v3"><div className="container document-grid"><div><span className="kicker kicker-light">Project documentation</span><h2>Built to support technical review and procurement.</h2><p>Depending on project scope, Greenex can structure proposals and handover documentation so engineering and procurement teams can review the solution clearly.</p><Link className="btn btn-primary" href="/contact#quote">Request Technical Proposal <Icon name="arrow"/></Link></div><div className="document-list">{['Technical scope & proposal','Product datasheets','Method statement & implementation plan','Testing / commissioning records','Maintenance & service plan','Project handover documentation'].map(x=><span key={x}><Icon name="check"/>{x}</span>)}</div></div></section>

    <section className="section-v3"><div className="container image-cta-v3"><div className="image-cta-photo"><Image src={PHOTO_SOLAR_BD} alt="Industrial rooftop solar application in Bangladesh" fill sizes="(max-width:900px) 100vw, 48vw"/></div><div><span className="kicker">Build with Greenex</span><h2>Have a power, solar, lift or maintenance requirement?</h2><p>Bring us the problem, the load or the project goal. We can help define the next engineering step.</p><Link className="btn btn-primary" href="/contact#quote">Start a Conversation <Icon name="arrow"/></Link></div></div></section>
  </>;
}
