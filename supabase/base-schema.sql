-- GREEN X V2 BASE DATABASE
-- Safe to run on a fresh Supabase project. Uses IF NOT EXISTS where possible.
create extension if not exists pgcrypto;
create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end; $$;

create table if not exists public.site_settings (
 id uuid primary key default gen_random_uuid(), site_name text not null default 'Green X Power Engineering', tagline text,
 hero_title text, hero_subtitle text, hero_image_url text, logo_url text, phone text, whatsapp text, email text, address text,
 facebook_url text, linkedin_url text, youtube_url text, map_url text, about_short text, about_full text, mission text, vision text,
 years_experience integer, total_projects integer, total_clients integer, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.services (
 id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, short_description text, description text,
 icon_url text, image_url text, features jsonb default '[]'::jsonb, display_order integer default 0, featured boolean default false,
 published boolean default true, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.projects (
 id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, category text, client_name text, location text,
 capacity text, completion_date date, short_description text, description text, cover_image_url text,
 services_provided jsonb default '[]'::jsonb, technical_details jsonb default '{}'::jsonb, featured boolean default false,
 published boolean default false, display_order integer default 0, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.project_media (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
 media_url text not null, media_type text default 'image', caption text, alt_text text, display_order integer default 0, created_at timestamptz default now()
);
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null, category text, brand text,
 short_description text, description text, image_url text, brochure_url text, specifications jsonb default '{}'::jsonb,
 featured boolean default false, published boolean default true, display_order integer default 0,
 created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.clients (
 id uuid primary key default gen_random_uuid(), name text not null, logo_url text, website_url text, display_order integer default 0,
 published boolean default true, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.enquiries (
 id uuid primary key default gen_random_uuid(), name text not null, company text, phone text, email text, service text, location text, message text,
 status text not null default 'new' check(status in ('new','contacted','quotation_sent','closed')),
 created_at timestamptz default now(), updated_at timestamptz default now()
);

do $$ begin
 if not exists (select 1 from pg_trigger where tgname='site_settings_updated_at') then create trigger site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at(); end if;
 if not exists (select 1 from pg_trigger where tgname='services_updated_at') then create trigger services_updated_at before update on public.services for each row execute function public.set_updated_at(); end if;
 if not exists (select 1 from pg_trigger where tgname='projects_updated_at') then create trigger projects_updated_at before update on public.projects for each row execute function public.set_updated_at(); end if;
 if not exists (select 1 from pg_trigger where tgname='products_updated_at') then create trigger products_updated_at before update on public.products for each row execute function public.set_updated_at(); end if;
 if not exists (select 1 from pg_trigger where tgname='clients_updated_at') then create trigger clients_updated_at before update on public.clients for each row execute function public.set_updated_at(); end if;
 if not exists (select 1 from pg_trigger where tgname='enquiries_updated_at') then create trigger enquiries_updated_at before update on public.enquiries for each row execute function public.set_updated_at(); end if;
end $$;

alter table public.site_settings enable row level security; alter table public.services enable row level security;
alter table public.projects enable row level security; alter table public.project_media enable row level security;
alter table public.products enable row level security; alter table public.clients enable row level security; alter table public.enquiries enable row level security;

drop policy if exists "Public read site settings" on public.site_settings;
create policy "Public read site settings" on public.site_settings for select to anon,authenticated using(true);
drop policy if exists "Public read published services" on public.services;
create policy "Public read published services" on public.services for select to anon,authenticated using(published=true);
drop policy if exists "Public read published projects" on public.projects;
create policy "Public read published projects" on public.projects for select to anon,authenticated using(published=true);
drop policy if exists "Public read project media" on public.project_media;
create policy "Public read project media" on public.project_media for select to anon,authenticated using(exists(select 1 from public.projects where projects.id=project_media.project_id and projects.published=true));
drop policy if exists "Public read published products" on public.products;
create policy "Public read published products" on public.products for select to anon,authenticated using(published=true);
drop policy if exists "Public read published clients" on public.clients;
create policy "Public read published clients" on public.clients for select to anon,authenticated using(published=true);
drop policy if exists "Public create enquiries" on public.enquiries;
create policy "Public create enquiries" on public.enquiries for insert to anon,authenticated with check(true);

-- Apply the admin-hardening migration after this base schema.

insert into public.site_settings(site_name,tagline,hero_title,hero_subtitle)
select 'Green X Power Engineering','Powering the Future, Sustainably.','Reliable Power. Smarter Energy. Stronger Infrastructure.',
'Integrated solar, generator, lift and electrical engineering solutions for homes, businesses and industries across Bangladesh.'
where not exists(select 1 from public.site_settings);

insert into public.services(title,slug,short_description,display_order,featured,published) values
('Solar Energy','solar-energy','Solar power systems for commercial, industrial and residential applications.',1,true,true),
('Generator & Backup Power','generator-backup-power','Reliable generator, backup and emergency power solutions.',2,true,true),
('Lift & Elevator','lift-elevator','Lift supply, installation, modernization and maintenance.',3,true,true),
('Electrical Engineering','electrical-engineering','Electrical engineering, installation and power distribution solutions.',4,true,true),
('Lightning Protection','lightning-protection','Lightning protection, earthing and electrical safety solutions.',5,false,true),
('Maintenance & Support','maintenance-support','Preventive maintenance, repair, AMC and technical support.',6,true,true)
on conflict(slug) do nothing;
