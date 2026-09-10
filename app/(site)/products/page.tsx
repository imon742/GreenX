import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import ProductBrowser from '@/components/ProductBrowser';
import Icon, { productIconName } from '@/components/Icons';
import { PRODUCT_CATEGORY_META } from '@/lib/catalog';
import { getProducts } from '@/lib/data';
import { PHOTO_ELECTRICAL } from '@/lib/visuals';

export const metadata={title:'Products',description:'Browse Green X solar, generator, lift, storage, inverter and backup power product categories.'};

export default async function Products(){
  const items=await getProducts();
  return <>
    <section className="inner-hero"><div className="container inner-hero-grid"><div className="inner-hero-copy"><span className="kicker kicker-light">Product catalog</span><h1>Equipment selected around the application—not just the datasheet.</h1><p>Browse product categories, compare core specifications and request a project-specific price or technical recommendation.</p><div className="hero-actions-v3"><Link className="btn btn-primary" href="/contact#quote">Request Product Quote <Icon name="arrow"/></Link><Link className="btn btn-dark-outline" href="/projects">See Project Applications</Link></div></div><div className="inner-hero-photo"><Image src={PHOTO_ELECTRICAL} alt="Power engineering equipment" fill priority sizes="(max-width:900px) 100vw, 46vw"/><div className="hero-photo-shade"/><span>{PRODUCT_CATEGORY_META.length} Product Categories</span></div></div></section>

    <section className="section-v3"><div className="container"><SectionTitle eyebrow="Browse by category" title="Start with the equipment you need." body="Every category has its own page with products, specifications and a direct quotation path."/><div className="product-category-grid-v3">{PRODUCT_CATEGORY_META.map(c=><Link key={c.slug} href={`/products/category/${c.slug}`} className="product-category-tile"><span><Icon name={productIconName(c.slug)}/></span><div><small>{c.accent}</small><h3>{c.name}</h3><p>{c.short}</p></div><Icon name="arrow" className="tile-arrow"/></Link>)}</div></div></section>

    <section className="section-v3 section-soft-v3"><div className="container"><SectionTitle eyebrow="Complete catalog" title="Published equipment in one place." body="Use the quick filters to focus on the product group relevant to your requirement."/><ProductBrowser items={items}/></div></section>

    <section className="section-v3"><div className="container buying-guide-v3"><div><span className="kicker">Technical selection</span><h2>Not sure what capacity or model class you need?</h2><p>Share the load, runtime, site type and existing system. Green X can help narrow the suitable equipment before quotation.</p><Link className="btn btn-primary" href="/contact#quote">Ask for Technical Guidance <Icon name="arrow"/></Link></div><div className="buying-guide-list">{['Application & load review','Capacity / runtime sizing','Compatibility with existing system','Installation requirements','Maintenance planning'].map((x,i)=><span key={x}><b>0{i+1}</b>{x}</span>)}</div></div></section>
  </>;
}
