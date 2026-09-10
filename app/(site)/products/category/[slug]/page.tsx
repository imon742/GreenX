import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/Cards';
import { PRODUCT_CATEGORY_META, productCategoryFromSlug } from '@/lib/catalog';
import { getProducts } from '@/lib/data';

export function generateStaticParams(){return PRODUCT_CATEGORY_META.map(x=>({slug:x.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const cat=productCategoryFromSlug(slug);return {title:cat?`${cat.name} | Green X Products`:'Products',description:cat?.description}}

export default async function ProductCategoryPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const cat=productCategoryFromSlug(slug); if(!cat) notFound();
  const all=await getProducts(); const items=all.filter(x=>x.category===cat.name);
  return <>
    <section className="category-hero"><div className="container category-hero-grid"><div><div className="breadcrumbs"><Link href="/products">Products</Link><span>/</span><b>{cat.name}</b></div><span className="eyebrow light">{cat.accent} • PRODUCT CATEGORY</span><h1>{cat.name}</h1><p>{cat.description}</p><div className="hero-actions"><Link href="/contact#quote" className="btn btn-primary">Request Pricing</Link><Link href="/projects" className="btn btn-ghost">Related Projects</Link></div></div><div className="category-hero-art"><div className="art-ring"/><Image src={cat.asset} alt={cat.name} fill priority sizes="(max-width:800px) 100vw, 40vw"/><span>{cat.accent}</span></div></div></section>
    <section className="section"><div className="container"><div className="category-page-heading"><div><span className="eyebrow">Available products</span><h2>Explore {cat.name.toLowerCase()}.</h2></div><p>{items.length} published {items.length===1?'product':'products'} in this category.</p></div>{items.length?<div className="product-grid">{items.map(p=><ProductCard key={p.slug} item={p}/>)}</div>:<div className="empty-state premium"><h3>Catalog being prepared.</h3><p>Add the first {cat.name} item from Admin and it will appear on this page automatically.</p><Link className="btn btn-primary" href="/contact#quote">Ask Green X About This Category</Link></div>}</div></section>
    <section className="section soft-section"><div className="container category-cta"><div><span className="eyebrow">Need engineering support?</span><h2>Products are only one part of a reliable system.</h2><p>Green X can help with selection, sizing, supply, installation, testing and lifecycle support.</p></div><Link className="btn btn-primary" href="/solutions">Explore Engineering Solutions</Link></div></section>
  </>
}
