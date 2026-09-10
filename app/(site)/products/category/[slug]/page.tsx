import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/Cards';
import Icon, { productIconName } from '@/components/Icons';
import { PRODUCT_CATEGORY_META, productCategoryFromSlug } from '@/lib/catalog';
import { getProducts } from '@/lib/data';

export function generateStaticParams(){return PRODUCT_CATEGORY_META.map(x=>({slug:x.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const cat=productCategoryFromSlug(slug);return {title:cat?`${cat.name} Products`:'Products',description:cat?.description}}

export default async function ProductCategoryPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const cat=productCategoryFromSlug(slug); if(!cat) notFound();
  const all=await getProducts(); const items=all.filter(x=>x.category===cat.name);
  return <>
    <section className="category-hero-v3"><div className="container category-hero-grid-v3"><div><div className="breadcrumbs-v3"><Link href="/products">Products</Link><span>•</span><b>{cat.name}</b></div><span className="category-big-icon"><Icon name={productIconName(cat.slug)}/></span><h1>{cat.name}</h1><p>{cat.description}</p><div className="hero-actions-v3"><Link href="/contact#quote" className="btn btn-primary">Request Category Quote <Icon name="arrow"/></Link><Link href="/products" className="btn btn-dark-outline">All Categories</Link></div></div><div className="category-spec-panel"><small>Category focus</small><h3>{cat.short}</h3><div><span>Project-based selection</span><span>Technical specification review</span><span>Installation support</span><span>After-sales planning</span></div></div></div></section>

    <section className="section-v3"><div className="container"><div className="section-heading-row"><SectionTitleLike title={`${cat.name} catalog`} body={`${items.length} published ${items.length===1?'item':'items'} currently available in this category.`}/><Link className="arrow-link" href="/contact#quote">Need a recommendation? <Icon name="arrow"/></Link></div>{items.length?<div className="product-grid-v3">{items.map(p=><ProductCard key={p.slug} item={p}/>)}</div>:<div className="public-empty"><h3>Product selection available by enquiry.</h3><p>Tell us the required capacity, application and site type and Green X can prepare a suitable proposal.</p><Link className="btn btn-primary" href="/contact#quote">Request Selection</Link></div>}</div></section>

    <section className="section-v3 section-soft-v3"><div className="container simple-cta-v3"><div><span className="kicker">Project integration</span><h2>The right product depends on the full system.</h2><p>Capacity, protection, controls, installation conditions and maintenance access all matter. Green X can evaluate the complete application before final selection.</p></div><Link className="btn btn-primary" href="/solutions">Explore Engineering Solutions <Icon name="arrow"/></Link></div></section>
  </>;
}

function SectionTitleLike({title,body}:{title:string;body:string}){return <div className="section-title"><span className="kicker">Product category</span><h2>{title}</h2><p>{body}</p></div>}
