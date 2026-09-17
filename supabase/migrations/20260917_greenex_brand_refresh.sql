-- GREENEX brand refresh: safe update for the existing site_settings row.
update public.site_settings
set
  site_name = 'Greenex Power Engineering',
  tagline = 'Sustainable & Innovative Engineering Solutions',
  hero_title = 'Sustainable & Innovative Engineering Solutions',
  hero_subtitle = 'Practical, future-ready power, renewable energy, lift and electrical engineering—from consultation and design to installation, commissioning and long-term support.',
  phone = '+8801736432848',
  whatsapp = '+8801736432848',
  logo_url = '/assets/greenex-logo.png',
  updated_at = now()
where site_name in ('Green X Power Engineering','Greenex Power Engineering');
