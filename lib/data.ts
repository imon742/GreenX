import { createClient } from './supabase/server';
import { defaultSettings, demoClients, demoProducts, demoProjects, demoServices } from './demo-data';
import { Client, Product, Project, Service, SiteSettings } from './types';

const PUBLIC_QUERY_TIMEOUT = 3200;

function mergeNonNull<T extends Record<string, any>>(base:T, incoming?:Partial<T>|null):T {
  if (!incoming) return { ...base };
  const out:any = { ...base };
  for (const [key,value] of Object.entries(incoming)) {
    if (value !== null && value !== undefined && value !== '') out[key] = value;
  }
  return out;
}

async function withTimeout<T>(work:PromiseLike<T>, fallback:T, ms=PUBLIC_QUERY_TIMEOUT):Promise<T>{
  let timer:ReturnType<typeof setTimeout> | undefined;
  try{
    return await Promise.race([
      Promise.resolve(work),
      new Promise<T>(resolve=>{ timer=setTimeout(()=>resolve(fallback),ms); }),
    ]);
  } finally {
    if(timer) clearTimeout(timer);
  }
}

async function table<T>(name:string, order='display_order') {
  try {
    const supabase = await createClient();
    if (!supabase) return [] as T[];
    const response = await withTimeout(
      supabase.from(name).select('*').eq('published', true).order(order, { ascending:true }),
      { data: null, error: new Error('Public content timeout') } as any,
    );
    if (response.error) return [] as T[];
    return (response.data || []) as T[];
  } catch { return [] as T[]; }
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    if (!supabase) return defaultSettings;
    const response = await withTimeout(
      supabase.from('site_settings').select('*').limit(1).maybeSingle(),
      { data: null, error: new Error('Settings timeout') } as any,
    );
    const merged=mergeNonNull(defaultSettings, response.data as Partial<SiteSettings>|null);
    // Upgrade the very early V2 seed copy automatically so an old demo DB does not make V4.1 look unfinished.
    if(merged.hero_title==='Powering a Smarter & Sustainable Future') merged.hero_title=defaultSettings.hero_title;
    if(merged.hero_subtitle==='Integrated solar, power, generator, lift and engineering solutions for businesses across Bangladesh.') merged.hero_subtitle=defaultSettings.hero_subtitle;
    const legacyBrand = (response.data as any)?.site_name === 'Green X Power Engineering' || (response.data as any)?.tagline === 'Powering the Future, Sustainably.';
    if(legacyBrand){
      merged.site_name=defaultSettings.site_name;
      merged.tagline=defaultSettings.tagline;
      merged.logo_url=defaultSettings.logo_url;
    }
    if(merged.logo_url==='/assets/logo-dark.svg' || merged.logo_url==='/assets/logo.svg') merged.logo_url=defaultSettings.logo_url;
    return merged;
  } catch { return defaultSettings; }
}

export async function getServices(): Promise<Service[]> {
  const db = await table<Service>('services');
  if (!db.length) return demoServices;
  return db.map(s => {
    const fallback = demoServices.find(d=>d.slug===s.slug) || ({} as Service);
    return mergeNonNull(fallback as any, s as any) as Service;
  });
}

export async function getProjects(): Promise<Project[]> {
  const db=await table<Project>('projects');
  return db.length ? db : demoProjects;
}
export async function getProducts(): Promise<Product[]> {
  const db=await table<Product>('products');
  return db.length ? db : demoProducts;
}
export async function getClients(): Promise<Client[]> {
  const db=await table<Client>('clients');
  return db.length ? db : demoClients;
}

export async function getProject(slug:string): Promise<Project|undefined> {
  try {
    const s=await createClient();
    if(s){
      const response=await withTimeout(
        s.from('projects').select('*').eq('slug',slug).eq('published',true).maybeSingle(),
        {data:null,error:new Error('Project timeout')} as any,
      );
      if(response.data) return response.data as Project;
    }
  } catch{}
  return demoProjects.find(x=>x.slug===slug);
}
export async function getProduct(slug:string): Promise<Product|undefined> {
  try {
    const s=await createClient();
    if(s){
      const response=await withTimeout(
        s.from('products').select('*').eq('slug',slug).eq('published',true).maybeSingle(),
        {data:null,error:new Error('Product timeout')} as any,
      );
      if(response.data) return response.data as Product;
    }
  } catch{}
  return demoProducts.find(x=>x.slug===slug);
}
export async function getService(slug:string): Promise<Service|undefined> {
  const list=await getServices();
  return list.find(x=>x.slug===slug);
}
export async function getProjectMedia(projectId?:string) {
  if(!projectId) return [];
  try {
    const s=await createClient();
    if(!s) return [];
    const response=await withTimeout(
      s.from('project_media').select('*').eq('project_id',projectId).order('display_order'),
      {data:null,error:new Error('Project media timeout')} as any,
    );
    return response.data||[];
  } catch{return[];}
}
