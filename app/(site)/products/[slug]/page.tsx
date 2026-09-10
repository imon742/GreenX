import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct } from '@/lib/data';
import { productCategorySlug } from '@/lib/catalog';
import Icon from '@/components/Icons';
import { productFallbackPhoto } from '@/lib/visuals';

export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=await getProduct(slug);return {title:p?.name||'Product',description:p?.short_description||undefined}}

export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const p=await getProduct(slug); if(!p) notFound(); const catSlug=productCategorySlug(p.category);
  return <>
    <section className="product-detail-v3"><div className="container product-detail-grid-v3"><div className="product-detail-media-v3"><Image src={p.image_url||productFallbackPhoto(p.category)} alt={p.name} fill priority sizes="(max-width:900px) 100vw, 48vw"/></div><div className="product-detail-copy-v3"><div className="breadcrumbs-v3 dark-breadcrumb"><Link href="/products">Products</Link><span>•</span>{catSlug&&<Link href={`/products/category/${catSlug}`}>{p.category}</Link>}</div><span className="product-kicker-light">{p.demo?'Engineering selection profile':(p.brand||'Project selection')}</span><h1>{p.name}</h1><p>{p.short_description}</p><div className="product-actions-v3"><Link className="btn btn-primary" href={`/contact#quote`}>Request Price & Availability <Icon name="arrow"/></Link>{p.brochure_url&&<a className="btn btn-dark-outline" href={p.brochure_url} target="_blank" rel="noreferrer"><Icon name="download"/> Datasheet / Brochure</a>}</div><div className="product-trust-line"><span><Icon name="check"/> Application review</span><span><Icon name="check"/> Installation support</span><span><Icon name="check"/> Maintenance planning</span></div></div></div></section>

    <section className="section-v3"><div className="container product-info-grid-v3"><div><span className="kicker">Product overview</span><h2>Selected as part of the right engineering system.</h2><p className="lead-v3">{p.description}</p><p>Final model selection, accessories and installation requirements should be confirmed against the actual load, site condition and project scope.</p></div><div><h3>Key specifications</h3><div className="spec-table-v3">{Object.entries(p.specifications||{}).map(([k,v])=><div key={k}><span>{k.replace(/([A-Z])/g,' $1')}</span><b>{v}</b></div>)}</div></div></div></section>

    <section className="section-v3 section-soft-v3"><div className="container simple-cta-v3"><div><span className="kicker">Need sizing or selection?</span><h2>Tell us the application, load and expected runtime.</h2><p>Green X can help narrow the correct capacity and integration approach before quotation.</p></div><Link className="btn btn-primary" href="/contact#quote">Ask for Technical Guidance <Icon name="arrow"/></Link></div></section>
  </>;
}
