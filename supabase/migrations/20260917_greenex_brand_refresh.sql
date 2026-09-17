-- GREENEX brand refresh: safe update for the existing site_settings row.
update public.site_settings
set
  site_name = 'Greenex Power Engineering',
  tagline = 'Sustainable & Innovative Engineering Solutions',
  logo_url = '/assets/greenex-logo.png',
  updated_at = now()
where site_name in ('Green X Power Engineering','Greenex Power Engineering');
