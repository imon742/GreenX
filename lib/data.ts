import { createClient } from './supabase/server';
import { defaultSettings, demoClients, demoProducts, demoProjects, demoServices } from './demo-data';
import { Client, Product, Project, Service, SiteSettings } from './types';

async function table<T>(name:string, order='display_order') {
  try {
    const supabase = await createClient(); if (!supabase) return [] as T[];
    const { data, error } = await supabase.from(name).select('*').eq('published', true).order(order, { ascending:true });
    if (error) return [] as T[]; return (data || []) as T[];
  } catch { return [] as T[]; }
}
export async function getSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient(); if (!supabase) return defaultSettings;
    const { data } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
    return { ...defaultSettings, ...(data || {}) };
  } catch { return defaultSettings; }
}
export async function getServices(): Promise<Service[]> {
  const db = await table<Service>('services');
  if (!db.length) return demoServices;
  return db.map(s => ({...demoServices.find(d=>d.slug===s.slug), ...s}));
}
export async function getProjects(): Promise<Project[]> { const db=await table<Project>('projects'); return db.length?db:demoProjects; }
export async function getProducts(): Promise<Product[]> { const db=await table<Product>('products'); return db.length?db:demoProducts; }
export async function getClients(): Promise<Client[]> { const db=await table<Client>('clients'); return db.length?db:demoClients; }
export async function getProject(slug:string): Promise<Project|undefined> {
  try { const s=await createClient(); if(s){ const {data}=await s.from('projects').select('*').eq('slug',slug).eq('published',true).maybeSingle(); if(data) return data as Project; }} catch{}
  return demoProjects.find(x=>x.slug===slug);
}
export async function getProduct(slug:string): Promise<Product|undefined> {
  try { const s=await createClient(); if(s){ const {data}=await s.from('products').select('*').eq('slug',slug).eq('published',true).maybeSingle(); if(data) return data as Product; }} catch{}
  return demoProducts.find(x=>x.slug===slug);
}
export async function getService(slug:string): Promise<Service|undefined> {
  const list=await getServices(); return list.find(x=>x.slug===slug);
}
export async function getProjectMedia(projectId?:string) {
  if(!projectId) return [];
  try { const s=await createClient(); if(!s) return []; const {data}=await s.from('project_media').select('*').eq('project_id',projectId).order('display_order'); return data||[]; } catch{return[];}
}
