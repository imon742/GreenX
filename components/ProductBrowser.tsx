'use client';
import { useMemo, useState } from 'react';
import type { Product } from '@/lib/types';
import { ProductCard } from './Cards';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

export default function ProductBrowser({items,initial}:{items:Product[];initial?:string}){
  const [cat,setCat]=useState(initial||'All');
  const filtered=useMemo(()=>cat==='All'?items:items.filter(x=>x.category===cat),[cat,items]);
  return <>
    <div className="filter-tabs" role="tablist" aria-label="Product categories">
      <button onClick={()=>setCat('All')} className={cat==='All'?'active':''}>All</button>
      {PRODUCT_CATEGORIES.map(c=><button key={c} onClick={()=>setCat(c)} className={cat===c?'active':''}>{c}</button>)}
    </div>
    <div className="product-grid-v3">{filtered.map(p=><ProductCard key={p.slug} item={p}/>)}</div>
    {!filtered.length&&<div className="public-empty"><h3>No published products yet.</h3><p>Contact Greenex for availability and project-specific equipment selection.</p></div>}
  </>;
}
