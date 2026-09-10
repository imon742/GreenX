import Link from 'next/link';
import { CategoryCard, ProjectCard } from '@/components/Cards';
import SectionTitle from '@/components/SectionTitle';
import { PROJECT_CATEGORY_META } from '@/lib/catalog';
import { getProjects } from '@/lib/data';

export const metadata={title:'Projects | Green X Power Engineering',description:'Explore Green X power, solar, lift, electrical and maintenance project categories.'};

export default async function Projects(){
  const items=await getProjects();
  return <>
    <section className="page-hero project-index-hero"><div className="container page-hero-grid"><div><span className="eyebrow light">Project portfolio</span><h1>Engineering is easier to trust when you can see the work.</h1><p>Browse projects by discipline, then open each case study for scope, capacity, location, technical details and project media.</p><div className="hero-actions"><Link className="btn btn-primary" href="/contact#quote">Discuss Your Project</Link><Link className="btn btn-ghost" href="/solutions">Explore Solutions</Link></div></div><div className="hero-stat-card"><span>PORTFOLIO</span><strong>{items.length}</strong><p>Published case studies and preview projects across Green X engineering disciplines.</p></div></div></section>
    <section className="section category-section"><div className="container"><SectionTitle eyebrow="Project disciplines" title="Browse work by solution area." body="Each project category now has a dedicated page so clients can reach the most relevant work quickly."/><div className="category-grid projects">{PROJECT_CATEGORY_META.map(c=><CategoryCard key={c.slug} item={c} href={`/projects/category/${c.slug}`} count={items.filter(p=>p.category===c.name).length} label="View projects"/>)}</div></div></section>
    <section className="section soft-section"><div className="container"><div className="title-row"><SectionTitle eyebrow="All case studies" title="Project work, presented with context." body="Published projects from Admin appear here automatically."/><Link href="/contact#quote" className="text-link">Start a similar project →</Link></div><div className="project-grid">{items.map(p=><ProjectCard key={p.slug} item={p}/>)}</div></div></section>
  </>
}
