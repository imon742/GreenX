-- GREEN X V2 OPTIONAL SECURITY HARDENING
-- Run this once with Supabase SQL Editor OR `supabase db push` after linking the project.
-- It limits CMS mutation policies to the configured admin email used for this deployment.
-- Note: SQL policies cannot read Vercel ADMIN_EMAIL, so this migration uses the current admin explicitly.

create or replace function public.is_greenx_admin()
returns boolean language sql stable security definer set search_path=public as $$
  select coalesce((auth.jwt() ->> 'email') = 'admin@google.com', false);
$$;

do $$ declare t text; begin
  foreach t in array array['site_settings','services','projects','project_media','products','clients','enquiries'] loop
    execute format('drop policy if exists "Admins manage %s" on public.%I', replace(t,'_',' '), t);
  end loop;
end $$;

-- Drop the exact V1/V2 broad policy names too.
drop policy if exists "Admins manage site settings" on public.site_settings;
drop policy if exists "Admins manage services" on public.services;
drop policy if exists "Admins manage projects" on public.projects;
drop policy if exists "Admins manage project media" on public.project_media;
drop policy if exists "Admins manage products" on public.products;
drop policy if exists "Admins manage clients" on public.clients;
drop policy if exists "Admins manage enquiries" on public.enquiries;

create policy "GreenX admin manage site settings" on public.site_settings for all to authenticated using (public.is_greenx_admin()) with check (public.is_greenx_admin());
create policy "GreenX admin manage services" on public.services for all to authenticated using (public.is_greenx_admin()) with check (public.is_greenx_admin());
create policy "GreenX admin manage projects" on public.projects for all to authenticated using (public.is_greenx_admin()) with check (public.is_greenx_admin());
create policy "GreenX admin manage project media" on public.project_media for all to authenticated using (public.is_greenx_admin()) with check (public.is_greenx_admin());
create policy "GreenX admin manage products" on public.products for all to authenticated using (public.is_greenx_admin()) with check (public.is_greenx_admin());
create policy "GreenX admin manage clients" on public.clients for all to authenticated using (public.is_greenx_admin()) with check (public.is_greenx_admin());
create policy "GreenX admin manage enquiries" on public.enquiries for all to authenticated using (public.is_greenx_admin()) with check (public.is_greenx_admin());
