'use client';
import { useMemo, useState } from 'react';
import type { Project } from '@/lib/types';
import { ProjectCard } from './Cards';
import { PROJECT_CATEGORY_META } from '@/lib/catalog';

export default function ProjectBrowser({items}:{items:Project[]}){
  const [cat,setCat]=useState('All');
  const filtered=useMemo(()=>cat==='All'?items:items.filter(x=>x.category===cat),[cat,items]);
  return <>
    <div className="filter-tabs" role="tablist" aria-label="Project categories">
      <button onClick={()=>setCat('All')} className={cat==='All'?'active':''}>All</button>
      {PROJECT_CATEGORY_META.map(c=><button key={c.name} onClick={()=>setCat(c.name)} className={cat===c.name?'active':''}>{c.name}</button>)}
    </div>
    <div className="project-grid-v3">{filtered.map(p=><ProjectCard key={p.slug} item={p}/>)}</div>
  </>;
}
