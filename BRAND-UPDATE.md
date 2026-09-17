# Greenex Brand Update

This package updates the existing GreenX V4.2 website to the new **GREENEX POWER ENGINEERING** identity.

## Included

- New Greenex master logo (`public/assets/greenex-logo.png`)
- New favicon/app icon (`app/icon.png`, `app/apple-icon.png`)
- Official tagline: **Sustainable & Innovative Engineering Solutions**
- Industrial Emerald + Deep Slate + Off-white website theme
- Updated metadata, Open Graph branding, header, footer, admin branding and demo copy
- Existing Supabase/Cloudinary/Vercel integration remains unchanged

## Existing Supabase project

The application automatically upgrades the old Green X default brand values at runtime. To persist the branding in Supabase, run this optional migration once in Supabase SQL Editor:

`supabase/migrations/20260917_greenex_brand_refresh.sql`

## Deploy

1. Copy these project files over your local GitHub repository.
2. Keep your existing Vercel environment variables.
3. Run `npm install` and `npm run build` locally if desired.
4. Commit and push with GitHub Desktop.
5. Vercel will redeploy automatically.
