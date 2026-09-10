import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProject,getProjectMedia } from '@/lib/data';
import { projectCategorySlug } from '@/lib/catalog';

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const p=await getProject(slug);if(!p)notFound();const media=await getProjectMedia(p.id);const catSlug=projectCategorySlug(p.category);
  return <>
    <section className="project-hero"><Image src={p.cover_image_url||'/assets/solar-project.svg'} alt={p.title} fill priority sizes="100vw"/><div className="project-hero-overlay"/><div className="container project-hero-copy"><div className="breadcrumbs project-breadcrumb"><Link href="/projects">Projects</Link><span>/</span>{catSlug&&<><Link href={`/projects/category/${catSlug}`}>{p.category}</Link><span>/</span></>}<b>Case study</b></div>{p.demo&&<span className="sample-badge">Portfolio preview</span>}<span className="eyebrow light">{p.category}</span><h1>{p.title}</h1><p>{p.short_description}</p></div></section>
    <section className="project-summary-strip"><div className="container project-summary-grid"><div><span>Client</span><b>{p.client_name||'Confidential'}</b></div><div><span>Location</span><b>{p.location||'Bangladesh'}</b></div><div><span>Capacity / Scope</span><b>{p.capacity||'Custom scope'}</b></div><div><span>Completion</span><b>{p.completion_date||'—'}</b></div></div></section>
    <section className="section"><div className="container project-story-grid"><aside><span className="eyebrow">Project scope</span><h2>From requirement to handover.</h2><p>Use this page to show clients what Green X delivered, not only what the company offers.</p><Link className="text-link" href={catSlug?`/projects/category/${catSlug}`:'/projects'}>More {p.category||''} projects →</Link></aside><article>{p.demo&&<div className="notice">This is sample presentation data for the initial client demo. Replace it from Admin with a real Green X completed project before using it as a company claim.</div>}<p className="lead">{p.description}</p><h3>Services delivered</h3><div className="feature-list premium-list">{(p.services_provided||[]).map(x=><div key={x}><span>✓</span>{x}</div>)}</div><h3>Technical snapshot</h3><div className="spec-table enhanced">{Object.entries(p.technical_details||{}).map(([k,v])=><div key={k}><span>{k}</span><b>{v}</b></div>)}</div><Link className="btn btn-primary" href="/contact#quote">Discuss a Similar Project</Link></article></div>
    {media.length>0&&<div className="container project-gallery-section"><div className="category-page-heading"><div><span className="eyebrow">Project gallery</span><h2>See the installation up close.</h2></div></div><div className="gallery-grid">{media.map((m:any)=><div className="gallery-item" key={m.id}><Image src={m.media_url} alt={m.alt_text||p.title} fill sizes="33vw"/></div>)}</div></div>}
    </section>
  </>
}
