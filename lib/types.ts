export type SiteSettings = {
  id?: string; site_name: string; tagline: string; hero_title: string; hero_subtitle: string;
  hero_image_url?: string | null; logo_url?: string | null; phone?: string | null; whatsapp?: string | null;
  email?: string | null; address?: string | null; facebook_url?: string | null; linkedin_url?: string | null;
  youtube_url?: string | null; map_url?: string | null; about_short?: string | null; about_full?: string | null;
  mission?: string | null; vision?: string | null; years_experience?: number | null; total_projects?: number | null;
  total_clients?: number | null;
};
export type Service = { id?: string; title: string; slug: string; short_description?: string | null; description?: string | null; icon_url?: string | null; image_url?: string | null; features?: string[]; display_order?: number; featured?: boolean; published?: boolean; };
export type Project = { id?: string; title: string; slug: string; category?: string | null; client_name?: string | null; location?: string | null; capacity?: string | null; completion_date?: string | null; short_description?: string | null; description?: string | null; cover_image_url?: string | null; services_provided?: string[]; technical_details?: Record<string,string>; featured?: boolean; published?: boolean; display_order?: number; demo?: boolean; };
export type Product = { id?: string; name: string; slug: string; category?: string | null; brand?: string | null; short_description?: string | null; description?: string | null; image_url?: string | null; brochure_url?: string | null; specifications?: Record<string,string>; featured?: boolean; published?: boolean; display_order?: number; demo?: boolean; };
export type Client = { id?: string; name: string; logo_url?: string | null; website_url?: string | null; display_order?: number; published?: boolean; };
