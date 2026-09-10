import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectCard } from '@/components/Cards';
import { PROJECT_CATEGORY_META, projectCategoryFromSlug } from '@/lib/catalog';
import { getProjects } from '@/lib/data';

export function generateStaticParams(){return PROJECT_CATEGORY_META.map(x=>({slug:x.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const cat=projectCategoryFromSlug(slug);return {title:cat?`${cat.name} Projects | Green X`:'Projects',description:cat?.description}}

export default async function ProjectCategoryPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const cat=projectCategoryFromSlug(slug); if(!cat) notFound();
  const all=await getProjects(); const items=all.filter(x=>x.category===cat.name);
  return <>
    <section className="category-hero project-category-hero"><div className="container category-hero-grid"><div><div className="breadcrumbs"><Link href="/projects">Projects</Link><span>/</span><b>{cat.name}</b></div><span className="eyebrow light">{cat.accent} • PROJECT DISCIPLINE</span><h1>{cat.name}</h1><p>{cat.description}</p><div className="hero-actions"><Link href="/contact#quote" className="btn btn-primary">Discuss a Similar Project</Link><Link href={`/solutions/${cat.slug}`} className="btn btn-ghost">Explore Solution</Link></div></div><div className="category-hero-art"><div className="art-ring"/><Image src={cat.asset} alt={cat.name} fill priority sizes="(max-width:800px) 100vw, 40vw"/><span>{cat.accent}</span></div></div></section>
    <section className="section"><div className="container"><div className="category-page-heading"><div><span className="eyebrow">Case studies</span><h2>{cat.name} projects.</h2></div><p>{items.length} published {items.length===1?'project':'projects'} in this discipline.</p></div>{items.length?<div className="project-grid">{items.map(p=><ProjectCard key={p.slug} item={p}/>)}</div>:<div className="empty-state premium"><h3>Project gallery being prepared.</h3><p>Add your first completed project in Admin to populate this category.</p><Link className="btn btn-primary" href="/contact#quote">Talk to Green X</Link></div>}</div></section>
  </>
}
