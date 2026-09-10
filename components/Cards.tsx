import Image from 'next/image';
import Link from 'next/link';
import type { Product, Project, Service } from '@/lib/types';
import type { CategoryMeta } from '@/lib/catalog';
import { productFallbackPhoto, projectFallbackPhoto, solutionPhoto } from '@/lib/visuals';
import Icon, { productIconName, serviceIconName } from './Icons';

export function ServiceCard({ item }: { item: Service }) {
  return <Link href={`/solutions/${item.slug}`} className="gx-service-card">
    <div className="gx-service-photo"><Image src={item.image_url || solutionPhoto(item.slug)} alt={`${item.title} engineering`} fill sizes="(max-width:760px) 100vw, 33vw"/><span><Icon name={serviceIconName(item.slug)}/></span></div>
    <div className="gx-service-body"><small>0{item.display_order || 1}</small><h3>{item.title}</h3><p>{item.short_description}</p><b>Explore solution <Icon name="arrow"/></b></div>
  </Link>;
}

export function ProjectCard({ item }: { item: Project }) {
  return <Link href={`/projects/${item.slug}`} className="gx-project-card">
    <div className="gx-project-photo"><Image src={item.cover_image_url || projectFallbackPhoto(item.category)} alt={item.title} fill sizes="(max-width:760px) 100vw, (max-width:1100px) 50vw, 33vw"/><div className="gx-photo-shade"/><span className="gx-project-type">{item.category || 'Engineering'}</span>{item.capacity&&<span className="gx-project-capacity">{item.capacity}</span>}</div>
    <div className="gx-project-body"><h3>{item.title}</h3><p>{item.short_description}</p><div><span><small>Application</small><b>{item.client_name || 'Project specific'}</b></span><span><small>Location</small><b>{item.location || 'Bangladesh'}</b></span></div><strong>View project profile <Icon name="arrow"/></strong></div>
  </Link>;
}

export function ProductCard({ item }: { item: Product }) {
  return <Link href={`/products/${item.slug}`} className="gx-product-card">
    <div className="gx-product-photo"><Image src={item.image_url || productFallbackPhoto(item.category)} alt={item.name} fill sizes="(max-width:760px) 100vw, (max-width:1100px) 50vw, 25vw"/><span>{item.category}</span></div>
    <div className="gx-product-body"><small>{item.brand || 'Project selection'}</small><h3>{item.name}</h3><p>{item.short_description}</p>{Object.keys(item.specifications||{}).length>0&&<div className="gx-spec-chips">{Object.entries(item.specifications||{}).slice(0,2).map(([k,v])=><span key={k}>{String(v)}</span>)}</div>}<strong>View specifications <Icon name="arrow"/></strong></div>
  </Link>;
}

export function CategoryCard({ item, href, count, label='Explore' }: { item: CategoryMeta; href: string; count?: number; label?: string }) {
  return <Link href={href} className="gx-category-card"><span><Icon name={productIconName(item.slug)}/></span><div><small>{count===undefined?'CATEGORY':`${count} ${count===1?'ITEM':'ITEMS'}`}</small><h3>{item.name}</h3><p>{item.short}</p><b>{label} <Icon name="arrow"/></b></div></Link>;
}
