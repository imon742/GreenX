import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getProjects, getService } from '@/lib/data';
import { ProductCard, ProjectCard } from '@/components/Cards';
import SectionTitle from '@/components/SectionTitle';
import Icon, { serviceIconName } from '@/components/Icons';
import { solutionPhoto } from '@/lib/visuals';

const solutionProductMap:Record<string,string[]>={
  'solar-energy':['Solar Generators','Solar Panels','Inverters','Battery & Storage'],
  'generator-backup-power':['Generators','UPS & Power Backup'],
  'lift-elevator':['Lift & Elevator'],
  'electrical-engineering':['Inverters','UPS & Power Backup'],
  'lightning-protection':[],
  'maintenance-support':['Generators','Lift & Elevator','UPS & Power Backup'],
};
const process=[
  ['Requirement review','Understand the load, operating goal, budget and project constraints.'],
  ['Site survey','Review real site conditions, existing systems and technical risks.'],
  ['Engineering & selection','Prepare sizing, equipment selection and integration concept.'],
  ['Supply & installation','Coordinate delivery, installation and on-site implementation.'],
  ['Testing & handover','Verify operation, document key checks and complete handover.'],
  ['Maintenance support','Plan preventive service, corrective support and future upgrades.'],
];

export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=await getService(slug);return {title:s?`${s.title} Solutions`:'Engineering Solutions',description:s?.short_description||undefined}}

export default async function Solution({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const s=await getService(slug); if(!s)notFound();
  const [products,projects]=await Promise.all([getProducts(),getProjects()]);
  const relatedProducts=products.filter(p=>(solutionProductMap[slug]||[]).includes(p.category||'')).slice(0,4);
  const relatedProjects=projects.filter(p=>p.category===s.title).slice(0,3);
  return <>
    <section className="detail-hero detail-hero-solution"><div className="container detail-hero-grid"><div className="detail-hero-copy"><div className="breadcrumbs-v3"><Link href="/solutions">Solutions</Link><span>•</span><b>{s.title}</b></div><span className="detail-icon"><Icon name={serviceIconName(slug)}/></span><h1>{s.title}</h1><p>{s.short_description}</p><div className="hero-actions-v3"><Link href="/contact#quote" className="btn btn-primary">Request a Site Proposal <Icon name="arrow"/></Link><Link href="/projects" className="btn btn-dark-outline">See Project Work</Link></div></div><div className="detail-hero-photo"><Image src={s.image_url || solutionPhoto(slug)} alt={`${s.title} engineering application`} fill priority sizes="(max-width:900px) 100vw, 48vw"/><div className="hero-photo-shade"/><span>Greenex engineering capability</span></div></div></section>

    <section className="section-v3"><div className="container solution-overview-v3"><div><span className="kicker">Engineering scope</span><h2>Designed around your site, load and operating priorities.</h2><p className="lead-v3">{s.description}</p></div><div className="capability-list-v3">{(s.features||[]).map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span><b>{x}</b><Icon name="check"/></div>)}</div></div></section>

    <section className="section-v3 section-soft-v3"><div className="container"><SectionTitle eyebrow="Delivery process" title="A clear path from requirement to reliable operation." body="The project process keeps technical decisions visible at every stage."/><div className="process-cards-v3">{process.map(([t,d],i)=><div key={t}><span>{String(i+1).padStart(2,'0')}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>

    {relatedProducts.length>0&&<section className="section-v3"><div className="container"><div className="section-heading-row"><SectionTitle eyebrow="Related equipment" title="Products that support this solution." body="Open each product for key specifications, application guidance and quotation options."/><Link className="arrow-link" href="/products">Browse products <Icon name="arrow"/></Link></div><div className="product-grid-v3">{relatedProducts.map(p=><ProductCard key={p.slug} item={p}/>)}</div></div></section>}

    {relatedProjects.length>0&&<section className="section-v3 section-dark-v3"><div className="container"><div className="section-heading-row light-heading"><SectionTitle eyebrow="Project examples" title="See the capability in project form." body="Case studies show scope, capacity, location and technical context."/><Link className="arrow-link arrow-link-light" href={`/projects/category/${slug}`}>View category <Icon name="arrow"/></Link></div><div className="project-grid-v3">{relatedProjects.map(p=><ProjectCard key={p.slug} item={p}/>)}</div></div></section>}

    <section className="section-v3"><div className="container simple-cta-v3"><div><span className="kicker">Talk to an engineer</span><h2>Have a {s.title.toLowerCase()} requirement?</h2><p>Share the site, capacity or operating requirement and we can help define the next step.</p></div><Link href="/contact#quote" className="btn btn-primary">Start Your Enquiry <Icon name="arrow"/></Link></div></section>
  </>;
}
