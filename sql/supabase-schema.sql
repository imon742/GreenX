-- GREEN X POWER ENGINEERING - Supabase schema
-- Run this whole file once in: Supabase Dashboard > SQL Editor > New query

create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  company_name text not null default 'Green X Power Engineering',
  motto text,
  hero_title text,
  hero_subtitle text,
  about_title text,
  about_text text,
  mission text,
  vision text,
  phone text,
  email text,
  whatsapp text,
  address text,
  facebook text,
  linkedin text,
  youtube text,
  hero_image text,
  logo_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  icon text,
  image_url text,
  link_url text,
  short_description text,
  details text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  category text,
  client_name text,
  location text,
  capacity text,
  completion_date date,
  short_description text,
  full_description text,
  services_provided text,
  cover_image text,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  caption text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  short_description text,
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  phone text not null,
  email text,
  service text,
  location text,
  message text not null,
  status text not null default 'New' check (status in ('New','Contacted','Quotation Sent','Closed')),
  created_at timestamptz not null default now()
);

-- Only one settings record is needed. This inserts the starting content if empty.
insert into public.site_settings (
  company_name,motto,hero_title,hero_subtitle,about_title,about_text,mission,vision,phone,address,hero_image,logo_url
)
select
  'Green X Power Engineering',
  'Powering the Future, Sustainably.',
  'Reliable Power. Smarter Energy. Stronger Infrastructure.',
  'Integrated solar, generator, lift and electrical engineering solutions for homes, businesses and industries across Bangladesh.',
  'Engineering solutions built around reliability.',
  'Green X Power Engineering delivers high-quality power solutions with a focus on efficiency, safety and sustainability. Our team supports clients from consultation and design through installation, commissioning and long-term maintenance.',
  'Deliver high-quality, safe and efficient power solutions tailored to client needs while advancing sustainability.',
  'Lead with sustainable and innovative power solutions for a reliable, green future.',
  '01717202172',
  'Spring Rahmat-e Tuba Complex, House-132 (3rd Floor), Block-A, Road-2, Section-12, Mirpur, Dhaka-1216, Bangladesh.',
  'assets/solar.svg',
  'assets/logo.svg'
where not exists (select 1 from public.site_settings);

insert into public.services (title,slug,icon,image_url,link_url,short_description,details,sort_order,published)
values
('Solar Energy','solar-energy','☀','assets/solar.svg','#contact','Rooftop, hybrid and off-grid solar systems designed for reliable clean energy.','Site survey, system design, equipment supply, installation, testing and commissioning.',1,true),
('Generator & Backup Power','generator-backup','⚡','assets/generator.svg','#contact','Generator, UPS/IPS and integrated backup power for business-critical operations.','Supply, installation, synchronization, commissioning and preventive maintenance.',2,true),
('Lift & Elevator','lift-elevator','↕','assets/lift.svg','#contact','Passenger, hospital, cargo and building lift solutions with installation support.','Planning, supply, installation, modernization, testing and maintenance.',3,true),
('Electrical Engineering','electrical-engineering','⌁','assets/generator.svg','#contact','Practical electrical engineering for commercial, residential and industrial facilities.','Distribution, protection, backup integration and system improvement.',4,true),
('Lightning Protection','lightning-protection','ϟ','assets/solar.svg','#contact','Lightning protection, earthing and safety solutions for buildings and facilities.','Survey, protection design, installation, testing and maintenance.',5,true),
('Maintenance & AMC','maintenance-amc','✦','assets/lift.svg','#contact','Preventive and corrective maintenance to protect your power and lift investment.','Scheduled inspections, emergency support, repair and annual maintenance contracts.',6,true)
on conflict (slug) do nothing;

-- Row Level Security
alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.products enable row level security;
alter table public.clients enable row level security;
alter table public.inquiries enable row level security;

-- Public website: read public/published content.
drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select using (true);
drop policy if exists "public read published services" on public.services;
create policy "public read published services" on public.services for select using (published = true or auth.role() = 'authenticated');
drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects" on public.projects for select using (published = true or auth.role() = 'authenticated');
drop policy if exists "public read project images" on public.project_images;
create policy "public read project images" on public.project_images for select using (exists(select 1 from public.projects p where p.id=project_id and (p.published=true or auth.role()='authenticated')));
drop policy if exists "public read published products" on public.products;
create policy "public read published products" on public.products for select using (published = true or auth.role() = 'authenticated');
drop policy if exists "public read published clients" on public.clients;
create policy "public read published clients" on public.clients for select using (published = true or auth.role() = 'authenticated');

-- Any signed-in Supabase user is treated as a Green X admin in V1.
-- Keep Auth user creation restricted to you in the Supabase dashboard.
drop policy if exists "admin settings" on public.site_settings;
create policy "admin settings" on public.site_settings for all to authenticated using (true) with check (true);
drop policy if exists "admin services" on public.services;
create policy "admin services" on public.services for all to authenticated using (true) with check (true);
drop policy if exists "admin projects" on public.projects;
create policy "admin projects" on public.projects for all to authenticated using (true) with check (true);
drop policy if exists "admin project images" on public.project_images;
create policy "admin project images" on public.project_images for all to authenticated using (true) with check (true);
drop policy if exists "admin products" on public.products;
create policy "admin products" on public.products for all to authenticated using (true) with check (true);
drop policy if exists "admin clients" on public.clients;
create policy "admin clients" on public.clients for all to authenticated using (true) with check (true);

-- Visitors can submit enquiries, but cannot read them.
drop policy if exists "public submit inquiry" on public.inquiries;
create policy "public submit inquiry" on public.inquiries for insert to anon, authenticated with check (true);
drop policy if exists "admin inquiries" on public.inquiries;
create policy "admin inquiries" on public.inquiries for select to authenticated using (true);
drop policy if exists "admin update inquiries" on public.inquiries;
create policy "admin update inquiries" on public.inquiries for update to authenticated using (true) with check (true);
drop policy if exists "admin delete inquiries" on public.inquiries;
create policy "admin delete inquiries" on public.inquiries for delete to authenticated using (true);

-- Media storage bucket. Public files are needed for the public website.
insert into storage.buckets (id,name,public)
values ('site-media','site-media',true)
on conflict (id) do update set public=true;

drop policy if exists "public media read" on storage.objects;
create policy "public media read" on storage.objects for select using (bucket_id='site-media');
drop policy if exists "admin media upload" on storage.objects;
create policy "admin media upload" on storage.objects for insert to authenticated with check (bucket_id='site-media');
drop policy if exists "admin media update" on storage.objects;
create policy "admin media update" on storage.objects for update to authenticated using (bucket_id='site-media') with check (bucket_id='site-media');
drop policy if exists "admin media delete" on storage.objects;
create policy "admin media delete" on storage.objects for delete to authenticated using (bucket_id='site-media');

-- Helpful indexes
create index if not exists idx_projects_published on public.projects(published, created_at desc);
create index if not exists idx_projects_category on public.projects(category);
create index if not exists idx_inquiries_status on public.inquiries(status, created_at desc);
create index if not exists idx_project_images_project on public.project_images(project_id, sort_order);
