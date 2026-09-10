import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct } from '@/lib/data';
import { productCategorySlug } from '@/lib/catalog';

export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const p=await getProduct(slug);if(!p)notFound();const catSlug=productCategorySlug(p.category);
  return <>
    <section className="product-detail-hero"><div className="container"><div className="breadcrumbs dark"><Link href="/products">Products</Link><span>/</span>{catSlug&&<><Link href={`/products/category/${catSlug}`}>{p.category}</Link><span>/</span></>}<b>{p.name}</b></div><div className="product-detail-grid"><div className="product-detail-art"><Image src={p.image_url||'/assets/product-powerstation.svg'} alt={p.name} fill priority sizes="(max-width:900px) 100vw, 46vw" />{p.demo&&<span className="sample-badge">Sample catalog item</span>}</div><div className="product-detail-copy"><span className="eyebrow light">{p.category}</span><h1>{p.name}</h1><p className="lead">{p.short_description}</p><div className="product-brand-line"><span>Brand / range</span><b>{p.brand||'Configured from Admin'}</b></div><div className="hero-actions"><Link className="btn btn-primary" href="/contact#quote">Request Price / Proposal</Link>{p.brochure_url&&<a className="btn btn-ghost" href={p.brochure_url} target="_blank">Download Brochure</a>}</div></div></div></div></section>
    <section className="section"><div className="container product-info-grid"><div><span className="eyebrow">Product overview</span><h2>Built into the right system—not sold in isolation.</h2><p className="lead">{p.description}</p>{p.demo&&<div className="notice">This sample item demonstrates the catalog layout. Replace it from Admin with your actual supplied brand/model before presenting it as Green X inventory.</div>}</div><div><h3>Key specifications</h3><div className="spec-table enhanced">{Object.entries(p.specifications||{}).map(([k,v])=><div key={k}><span>{k.replace(/([A-Z])/g,' $1')}</span><b>{v}</b></div>)}</div></div></div></section>
    <section className="section soft-section"><div className="container category-cta"><div><span className="eyebrow">Need sizing or selection?</span><h2>Tell us the application, load and expected runtime.</h2><p>Green X can help select the right capacity and integrate it with the rest of your power system.</p></div><Link className="btn btn-primary" href="/contact#quote">Ask for Technical Guidance</Link></div></section>
  </>
}
