# Green X V4 — Industrial Engineering Website + Admin CMS

V4 is a full visual redesign of the Green X public website while preserving the existing Next.js + Supabase + Cloudinary CMS stack.

The visual direction combines a dark industrial/emerald hero language with the clean estimator UX from the supplied Bolt prototype. The public site is mobile-first, image-led and focused on B2B engineering conversion.

## V4 highlights

- Dark glassmorphic sticky header
- Compact Solutions mega menu
- Product-category mega menu
- Dedicated Industries page
- Dedicated page for every solution
- Dedicated page for every product category and product
- Dedicated page for every project category and project
- Live System Estimator inside the homepage hero
- Full guided Estimate System Size flow for Solar PV, Generator, Lift and UPS
- Dedicated `/estimate-system-size` route
- Estimator enquiry submission to the existing Supabase `enquiries` table
- Pexels representative photography for fallback projects/products
- Photography-led service cards
- Responsive project and product showcases
- Mobile-friendly navigation and fixed Call / WhatsApp / Estimate actions
- Admin CMS remains available at `/admin`
- Supabase Auth, RLS and Cloudinary upload flow preserved

## Important content rule

Stock photography and fallback project/product content are representative presentation content. V4 does not claim competitor projects, certifications, SLA response times, installed MW, savings, client logos or other unverified facts as Green X achievements.

Replace representative items with real Green X content through `/admin` when available.

## Existing Vercel environment variables

Keep the environment variables you already configured:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```

Recommended:

```env
NEXT_PUBLIC_SITE_URL=https://green-x-lake.vercel.app
ADMIN_EMAIL=admin@google.com
NEXT_PUBLIC_COMPANY_PROFILE_URL=
```

Do not commit Supabase database passwords, service-role keys, Cloudinary secrets, or `.env.local`.

## Database

No new database table is required for V4. It continues to use:

- `site_settings`
- `services`
- `projects`
- `project_media`
- `products`
- `clients`
- `enquiries`

If not already applied, run:

`supabase/migrations/20260910_admin_hardening.sql`

This restricts CMS writes to `admin@google.com`.

## Local development

Use Node.js 20.

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=admin@google.com
```

Then:

```bash
npm install
npm run dev
```

Open:

- Home: `http://localhost:3000`
- Estimator: `http://localhost:3000/estimate-system-size`
- Admin: `http://localhost:3000/admin`
- Health: `http://localhost:3000/api/health`

Before pushing:

```bash
npm run build
```

## GitHub Desktop → Vercel

1. Copy the contents of this V4 folder into the existing local GreenX repository.
2. Keep the hidden `.git` directory.
3. In GitHub Desktop commit e.g. `Green X V4 full UX redesign`.
4. Push `main`.
5. Vercel automatically builds and deploys.

See `docs/V4-DESIGN-REWORK.md` and `docs/PEXELS-SOURCES.md` for the design handoff.
