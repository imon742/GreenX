import type { MetadataRoute } from 'next';
import { PRODUCT_CATEGORY_META, PROJECT_CATEGORY_META } from '@/lib/catalog';
import { NAV_SOLUTIONS } from '@/lib/constants';
import { getProducts, getProjects } from '@/lib/data';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://green-x-lake.vercel.app';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products,projects]=await Promise.all([getProducts(),getProjects()]);
  const urls=['','/about','/solutions','/products','/projects','/industries','/estimate-system-size','/contact'];
  return [
    ...urls.map(url=>({url:`${base}${url}`,changeFrequency:'monthly' as const,priority:url===''?1:.8})),
    ...NAV_SOLUTIONS.map(([,slug])=>({url:`${base}/solutions/${slug}`,changeFrequency:'monthly' as const,priority:.8})),
    ...PRODUCT_CATEGORY_META.map(c=>({url:`${base}/products/category/${c.slug}`,changeFrequency:'weekly' as const,priority:.75})),
    ...PROJECT_CATEGORY_META.map(c=>({url:`${base}/projects/category/${c.slug}`,changeFrequency:'monthly' as const,priority:.7})),
    ...products.map(p=>({url:`${base}/products/${p.slug}`,changeFrequency:'weekly' as const,priority:.7})),
    ...projects.map(p=>({url:`${base}/projects/${p.slug}`,changeFrequency:'monthly' as const,priority:.7})),
  ];
}
