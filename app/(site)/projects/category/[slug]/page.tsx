import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectCard } from '@/components/Cards';
import Icon, { serviceIconName } from '@/components/Icons';
import { PROJECT_CATEGORY_META, projectCategoryFromSlug } from '@/lib/catalog';
import { getProjects } from '@/lib/data';
import { solutionPhoto } from '@/lib/visuals';

export function generateStaticParams(){return PROJECT_CATEGORY_META.map(x=>({slug:x.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const cat=projectCategoryFromSlug(slug);return {title:cat?`${cat.name} Projects`:'Projects',description:cat?.description}}

export default async function ProjectCategoryPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const cat=projectCategoryFromSlug(slug); if(!cat) notFound();
  const all=await getProjects(); const items=all.filter(x=>x.category===cat.name);
  return <>
    <section className="detail-hero detail-hero-project"><div className="container detail-hero-grid"><div className="detail-hero-copy"><div className="breadcrumbs-v3"><Link href="/projects">Projects</Link><span>•</span><b>{cat.name}</b></div><span className="detail-icon"><Icon name={serviceIconName(cat.slug)}/></span><h1>{cat.name}</h1><p>{cat.description}</p><div className="hero-actions-v3"><Link href="/contact#quote" className="btn btn-primary">Discuss a Similar Project <Icon name="arrow"/></Link><Link href={`/solutions/${cat.slug}`} className="btn btn-dark-outline">Explore Solution</Link></div></div><div className="detail-hero-photo"><Image src={solutionPhoto(cat.slug)} alt={`${cat.name} engineering application`} fill priority sizes="(max-width:900px) 100vw, 48vw"/><div className="hero-photo-shade"/><span>{items.length} published {items.length===1?'case study':'case studies'}</span></div></div></section>

    <section className="section-v3"><div className="container"><div className="section-heading-row"><SectionTitleLike title={`${cat.name} project work`} body="Review scope, capacity, location and technical context from the available case studies."/><Link className="arrow-link" href="/projects">All project categories <Icon name="arrow"/></Link></div>{items.length?<div className="project-grid-v3">{items.map(p=><ProjectCard key={p.slug} item={p}/>)}</div>:<div className="public-empty"><h3>No public case study in this category yet.</h3><p>Greenex can still review your requirement and prepare a project-specific proposal.</p><Link className="btn btn-primary" href="/contact#quote">Discuss Requirement</Link></div>}</div></section>
  </>;
}

function SectionTitleLike({title,body}:{title:string;body:string}){return <div className="section-title"><span className="kicker">Case studies</span><h2>{title}</h2><p>{body}</p></div>}
