import Image from 'next/image';
import Link from 'next/link';
import { Product, Project, Service } from '@/lib/types';
import { CategoryMeta } from '@/lib/catalog';

export function ServiceCard({item}:{item:Service}) {
  return <Link href={`/solutions/${item.slug}`} className="service-card">
    <div className="media-frame"><Image src={item.image_url||'/assets/electrical.svg'} alt="" fill sizes="(max-width:700px) 100vw, 33vw" /></div>
    <div className="card-content"><span className="card-number">0{(item.display_order||1)}</span><h3>{item.title}</h3><p>{item.short_description}</p><span className="text-link">Explore solution <b>→</b></span></div>
  </Link>
}

export function ProjectCard({item}:{item:Project}) {
  return <Link href={`/projects/${item.slug}`} className="project-card">
    <div className="project-image"><Image src={item.cover_image_url||'/assets/solar-project.svg'} alt={item.title} fill sizes="(max-width:800px) 100vw, 50vw" /><div className="project-overlay"/></div>
    <div className="project-meta">{item.demo&&<span className="sample-badge">Portfolio preview</span>}<span>{item.category}</span><h3>{item.title}</h3><div className="project-spec"><b>{item.capacity||'Custom scope'}</b><span>{item.location}</span></div><span className="project-open">View case study <b>↗</b></span></div>
  </Link>
}

export function ProductCard({item}:{item:Product}) {
  return <Link href={`/products/${item.slug}`} className="product-card">
    <div className="product-media"><Image src={item.image_url||'/assets/product-powerstation.svg'} alt={item.name} fill sizes="(max-width:700px) 100vw, 25vw" />{item.demo&&<span className="sample-badge">Sample catalog</span>}<span className="product-view">View product ↗</span></div>
    <div className="product-body"><span className="product-category">{item.category}</span><h3>{item.name}</h3><p>{item.short_description}</p><span className="text-link">Specifications & details <b>→</b></span></div>
  </Link>
}

export function CategoryCard({item,href,count,label='Explore'}:{item:CategoryMeta;href:string;count?:number;label?:string}) {
  return <Link href={href} className="category-card">
    <div className="category-art"><span>{item.accent}</span><Image src={item.asset} alt="" width={108} height={108}/></div>
    <div className="category-copy"><small>{count===undefined?'ENGINEERING CATEGORY':`${count} ${count===1?'ITEM':'ITEMS'}`}</small><h3>{item.name}</h3><p>{item.short}</p><b>{label} →</b></div>
  </Link>
}
