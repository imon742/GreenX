import Link from 'next/link';
import { CategoryCard, ProductCard } from '@/components/Cards';
import SectionTitle from '@/components/SectionTitle';
import { PRODUCT_CATEGORY_META } from '@/lib/catalog';
import { getProducts } from '@/lib/data';

export const metadata={title:'Products | Green X Power Engineering',description:'Browse Green X solar, generator, lift, storage, inverter and backup power product categories.'};

export default async function Products(){
  const items=await getProducts();
  return <>
    <section className="page-hero catalog-hero"><div className="container page-hero-grid"><div><span className="eyebrow light">Product catalog</span><h1>Power equipment, organized around how your project works.</h1><p>Explore each product category on its own page, compare specifications, then request a project-specific price or proposal.</p><div className="hero-actions"><Link className="btn btn-primary" href="/contact#quote">Request a Product Quote</Link><Link className="btn btn-ghost" href="/projects">See Installed Solutions</Link></div></div><div className="hero-stat-card"><span>CATALOG</span><strong>{PRODUCT_CATEGORY_META.length}</strong><p>Dedicated equipment categories for energy, backup power and vertical mobility.</p></div></div></section>
    <section className="section category-section"><div className="container"><SectionTitle eyebrow="Browse by category" title="Start with the equipment you need." body="Every category now has a dedicated landing page with its own products and enquiry path."/><div className="category-grid">{PRODUCT_CATEGORY_META.map(c=><CategoryCard key={c.slug} item={c} href={`/products/category/${c.slug}`} count={items.filter(p=>p.category===c.name).length}/>)}</div></div></section>
    <section className="section soft-section"><div className="container"><div className="title-row"><SectionTitle eyebrow="Complete catalog" title="All products in one place." body="Published products from Admin appear here automatically."/><Link href="/contact#quote" className="text-link">Need help choosing? →</Link></div><div className="product-grid">{items.map(p=><ProductCard key={p.slug} item={p}/>)}</div></div></section>
  </>
}
