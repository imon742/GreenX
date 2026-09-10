import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProject,getProjectMedia } from '@/lib/data';
import { projectCategorySlug } from '@/lib/catalog';
import { projectFallbackPhoto, projectGalleryFallback } from '@/lib/visuals';
import Icon from '@/components/Icons';

export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=await getProject(slug);return {title:p?.title||'Project',description:p?.short_description||undefined}}

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const p=await getProject(slug); if(!p)notFound(); const media=await getProjectMedia(p.id); const gallery=media.length?media:projectGalleryFallback(p.category).map((media_url,index)=>({id:`stock-${index}`,media_url,alt_text:`${p.title} representative engineering image ${index+1}`})); const catSlug=projectCategorySlug(p.category);
  return <>
    <section className="project-hero-v3"><Image src={p.cover_image_url||projectFallbackPhoto(p.category)} alt={p.title} fill priority sizes="100vw"/><div className="project-hero-overlay-v3"/><div className="container project-hero-copy-v3"><div className="breadcrumbs-v3"><Link href="/projects">Projects</Link><span>•</span>{catSlug&&<Link href={`/projects/category/${catSlug}`}>{p.category}</Link>}</div><span className="project-type-badge">{p.demo?'Engineering profile':'Case study'}</span><h1>{p.title}</h1><p>{p.short_description}</p></div></section>

    <section className="project-fact-band"><div className="container project-fact-grid">{[
      ['Client / Application',p.client_name||'Confidential'],['Location',p.location||'Bangladesh'],['Capacity / Scope',p.capacity||'Custom scope'],['Completion',p.completion_date||'Project specific']
    ].map(([k,v])=><div key={k}><span>{k}</span><b>{v}</b></div>)}</div></section>

    <section className="section-v3"><div className="container project-story-v3"><aside><span className="kicker">Project overview</span><h2>{p.demo?'A structured engineering example.':'From requirement to handover.'}</h2><p>{p.demo?'This illustrative profile shows the technical scope, application context and delivery structure Green X can use for a similar requirement.':'Project pages combine the commercial story with the technical details clients and procurement teams need.'}</p>{catSlug&&<Link className="arrow-link" href={`/projects/category/${catSlug}`}>More {p.category} work <Icon name="arrow"/></Link>}</aside><article><p className="lead-v3">{p.description}</p><h3>Services delivered</h3><div className="deliverable-grid-v3">{(p.services_provided||[]).map(x=><span key={x}><Icon name="check"/>{x}</span>)}</div><h3>Technical snapshot</h3><div className="spec-table-v3">{Object.entries(p.technical_details||{}).map(([k,v])=><div key={k}><span>{k}</span><b>{v}</b></div>)}</div><Link className="btn btn-primary" href="/contact#quote">Discuss a Similar Requirement <Icon name="arrow"/></Link></article></div></section>

    {gallery.length>0&&<section className="section-v3 section-soft-v3"><div className="container"><div className="section-heading-row"><SectionTitleLike title="Project gallery" body="Representative installation and engineering imagery for this solution profile."/></div><div className="gallery-grid-v3">{gallery.map((m:any)=><div key={m.id}><Image src={m.media_url} alt={m.alt_text||p.title} fill sizes="(max-width:760px) 100vw, 33vw"/></div>)}</div></div></section>}

    <section className="section-v3"><div className="container simple-cta-v3"><div><span className="kicker">Your project</span><h2>Need a similar technical scope?</h2><p>Share your site, capacity, timeline and operating requirement with Green X.</p></div><Link className="btn btn-primary" href="/contact#quote">Start Project Enquiry <Icon name="arrow"/></Link></div></section>
  </>;
}

function SectionTitleLike({title,body}:{title:string;body:string}){return <div className="section-title"><span className="kicker">Project media</span><h2>{title}</h2><p>{body}</p></div>}
