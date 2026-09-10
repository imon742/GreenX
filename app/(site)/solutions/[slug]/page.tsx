import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getProjects, getService } from '@/lib/data';
import { ProductCard, ProjectCard } from '@/components/Cards';

const solutionProductMap:Record<string,string[]>={
  'solar-energy':['Solar Generators','Solar Panels','Inverters','Battery & Storage'],
  'generator-backup-power':['Generators','UPS & Power Backup'],
  'lift-elevator':['Lift & Elevator'],
  'electrical-engineering':['Inverters','UPS & Power Backup'],
  'lightning-protection':[],
  'maintenance-support':['Generators','Lift & Elevator','UPS & Power Backup'],
};
const process=['Requirement Review','Site Survey','Engineering & Selection','Supply & Installation','Testing & Handover','Maintenance Support'];

export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=await getService(slug);return {title:s?`${s.title} | Green X Solutions`:'Green X Solutions',description:s?.short_description||undefined}}

export default async function Solution({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const s=await getService(slug); if(!s)notFound();
  const [products,projects]=await Promise.all([getProducts(),getProjects()]);
  const relatedProducts=products.filter(p=>(solutionProductMap[slug]||[]).includes(p.category||'')).slice(0,4);
  const relatedProjects=projects.filter(p=>p.category===s.title).slice(0,3);
  return <>
    <section className="solution-hero"><div className="container solution-hero-grid"><div><div className="breadcrumbs"><Link href="/solutions">Solutions</Link><span>/</span><b>{s.title}</b></div><span className="eyebrow light">GREEN X ENGINEERING SOLUTION</span><h1>{s.title}</h1><p>{s.short_description}</p><div className="hero-actions"><Link href="/contact#quote" className="btn btn-primary">Request a Site Proposal</Link><Link href="/projects" className="btn btn-ghost">See Project Work</Link></div></div><div className="solution-hero-art"><div className="solution-number">GX / {String(s.display_order||1).padStart(2,'0')}</div><Image src={s.image_url||'/assets/electrical.svg'} alt={s.title} fill priority sizes="(max-width:900px) 100vw, 42vw"/></div></div></section>
    <section className="section"><div className="container solution-intro"><div><span className="eyebrow">Engineering scope</span><h2>Designed around your site, load and operating priorities.</h2></div><div><p className="lead">{s.description}</p><div className="feature-list premium-list">{(s.features||[]).map(x=><div key={x}><span>✓</span>{x}</div>)}</div></div></div></section>
    <section className="section soft-section"><div className="container"><div className="category-page-heading"><div><span className="eyebrow">Delivery process</span><h2>From requirement to reliable operation.</h2></div><p>A clear engineering path gives clients confidence before, during and after installation.</p></div><div className="solution-process">{process.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span><h3>{x}</h3><p>{['Understand goals, load, budget and project constraints.','Review the real site and identify technical conditions.','Prepare system concept, sizing and equipment selection.','Coordinate delivery and execute installation professionally.','Verify operation, safety and handover documentation.','Protect uptime with preventive service and technical support.'][i]}</p></div>)}</div></div></section>
    {relatedProducts.length>0&&<section className="section"><div className="container"><div className="title-row"><div className="section-title"><span className="eyebrow">Related equipment</span><h2>Products that support this solution.</h2><p>Open each product page for specifications and enquiry options.</p></div><Link className="text-link" href="/products">Browse all products →</Link></div><div className="product-grid">{relatedProducts.map(p=><ProductCard key={p.slug} item={p}/>)}</div></div></section>}
    {relatedProjects.length>0&&<section className="section dark-section"><div className="container"><div className="title-row"><div className="section-title"><span className="eyebrow light">Related projects</span><h2>See this capability in project form.</h2><p>Case-study pages combine scope, location, capacity, services and project images.</p></div><Link className="text-link light-link" href={`/projects/category/${slug}`}>View category →</Link></div><div className="project-grid">{relatedProjects.map(p=><ProjectCard key={p.slug} item={p}/>)}</div></div></section>}
    <section className="section solution-final-cta"><div className="container category-cta"><div><span className="eyebrow">Talk to an engineer</span><h2>Have a {s.title.toLowerCase()} requirement?</h2><p>Share your site, capacity or operating requirement and Green X can prepare the next technical step.</p></div><Link href="/contact#quote" className="btn btn-primary">Start Your Enquiry</Link></div></section>
  </>
}
