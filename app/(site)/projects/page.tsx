import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import ProjectBrowser from '@/components/ProjectBrowser';
import Icon, { serviceIconName } from '@/components/Icons';
import { PROJECT_CATEGORY_META } from '@/lib/catalog';
import { getProjects } from '@/lib/data';
import { PHOTO_SOLAR_BD } from '@/lib/visuals';

export const metadata={title:'Projects',description:'Explore Green X power, solar, lift, electrical and maintenance project categories.'};

export default async function Projects(){
  const items=await getProjects();
  return <>
    <section className="inner-hero"><div className="container inner-hero-grid"><div className="inner-hero-copy"><span className="kicker kicker-light">Project portfolio</span><h1>Engineering is easier to trust when the scope is visible.</h1><p>Browse work by discipline, then open each case study for capacity, location, services delivered, technical details and project media.</p><div className="hero-actions-v3"><Link className="btn btn-primary" href="/contact#quote">Discuss Your Project <Icon name="arrow"/></Link><Link className="btn btn-dark-outline" href="/solutions">Explore Solutions</Link></div></div><div className="inner-hero-photo"><Image src={PHOTO_SOLAR_BD} alt="Industrial rooftop solar installation" fill priority sizes="(max-width:900px) 100vw, 46vw"/><div className="hero-photo-shade"/><span>Case studies • Scope • Technical context</span></div></div></section>

    <section className="section-v3"><div className="container"><SectionTitle eyebrow="Project disciplines" title="Find the work closest to your requirement." body="Open a project category for a focused view of related case studies and engineering applications."/><div className="project-category-grid-v3">{PROJECT_CATEGORY_META.map(c=><Link key={c.slug} href={`/projects/category/${c.slug}`} className="project-category-tile"><span><Icon name={serviceIconName(c.slug)}/></span><div><small>{c.accent}</small><h3>{c.name}</h3><p>{c.short}</p></div><Icon name="arrow" className="tile-arrow"/></Link>)}</div></div></section>

    <section className="section-v3 section-soft-v3"><div className="container"><SectionTitle eyebrow="Case studies" title="Project work presented with context." body="Use the filters to focus on solar, power, lift, electrical or maintenance work."/><ProjectBrowser items={items}/></div></section>

    <section className="section-v3"><div className="container simple-cta-v3"><div><span className="kicker">Planning something similar?</span><h2>Share the site, scope and performance target.</h2><p>Green X can review the requirement and help structure the technical next step.</p></div><Link className="btn btn-primary" href="/contact#quote">Start Project Discussion <Icon name="arrow"/></Link></div></section>
  </>;
}
