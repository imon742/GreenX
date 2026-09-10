import Image from 'next/image';
import Link from 'next/link';
import type { Product, Project, Service } from '@/lib/types';
import type { CategoryMeta } from '@/lib/catalog';
import { projectFallbackPhoto } from '@/lib/visuals';
import Icon, { productIconName, serviceIconName } from './Icons';

export function ServiceCard({ item }: { item: Service }) {
  return (
    <Link href={`/solutions/${item.slug}`} className="service-card-v3">
      <span className="service-icon-v3"><Icon name={serviceIconName(item.slug)} /></span>
      <span className="service-index">0{item.display_order || 1}</span>
      <h3>{item.title}</h3>
      <p>{item.short_description}</p>
      <span className="card-arrow">Explore solution <Icon name="arrow" /></span>
    </Link>
  );
}

export function ProjectCard({ item }: { item: Project }) {
  return (
    <Link href={`/projects/${item.slug}`} className="project-card-v3">
      <div className="project-image-v3">
        <Image src={item.cover_image_url || projectFallbackPhoto(item.category)} alt={item.title} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        <span className="project-category-chip">{item.demo ? 'Reference design' : (item.category || 'Project')}</span>{item.capacity&&<span className="project-capacity-chip">{item.capacity}</span>}
      </div>
      <div className="project-content-v3">
        <div className="project-topline"><span>{item.category}</span><Icon name="arrow" /></div>
        <h3>{item.title}</h3>
        <p>{item.short_description}</p>
        <div className="project-facts">
          <span><small>Capacity / Scope</small><b>{item.capacity || 'Custom scope'}</b></span>
          <span><small>Location</small><b>{item.location || 'Bangladesh'}</b></span>
        </div>
      </div>
    </Link>
  );
}

export function ProductCard({ item }: { item: Product }) {
  return (
    <Link href={`/products/${item.slug}`} className="product-card-v3">
      <div className="product-image-v3">
        <Image src={item.image_url || '/assets/product-powerstation.svg'} alt={item.name} fill sizes="(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw" />
      </div>
      <div className="product-content-v3">
        <span className="product-kicker">{item.category}</span>
        <h3>{item.name}</h3>
        <p>{item.short_description}</p>
        {Object.keys(item.specifications||{}).length>0&&<div className="product-spec-chips">{Object.entries(item.specifications||{}).slice(0,2).map(([k,v])=><span key={k}>{String(v)}</span>)}</div>}
        <div className="product-footer-v3"><span>{item.brand || 'Project selection'}</span><Icon name="arrow" /></div>
      </div>
    </Link>
  );
}

export function CategoryCard({ item, href, count, label='Explore' }: { item: CategoryMeta; href: string; count?: number; label?: string }) {
  return (
    <Link href={href} className="category-card-v3">
      <span className="category-icon-v3"><Icon name={productIconName(item.slug)} /></span>
      <div>
        <small>{count === undefined ? 'CATEGORY' : `${count} ${count === 1 ? 'ITEM' : 'ITEMS'}`}</small>
        <h3>{item.name}</h3>
        <p>{item.short}</p>
        <span className="card-arrow">{label} <Icon name="arrow" /></span>
      </div>
    </Link>
  );
}
