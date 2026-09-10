# Green X V3 — Professional Engineering Website + Admin CMS

V3 is a full public-UI rework of Green X Power Engineering built with Next.js App Router, Supabase and Cloudinary. It is designed for a fast, mobile-first B2B engineering-company presentation while keeping all core content manageable from `/admin`.

## V3 public experience

- Professional dark-slate + industrial-emerald design system
- Responsive sticky glass header
- Desktop mega menus for Solutions and Products
- Touch-friendly mobile navigation at tablet/mobile widths
- Dedicated page for every solution
- Dedicated page for every product category
- Dedicated page for every project category
- Dynamic product detail and project case-study pages
- Distinct service icons — no repeated fallback icon
- Product and project filter tabs
- Technical specification chips and structured detail tables
- Fixed image aspect ratios for stable layouts
- Two-step technical quote builder
- Floating WhatsApp on desktop and Call / WhatsApp / Quote action bar on mobile
- Client-logo marquee when real logos exist; professional sector cards when they do not
- Complete multi-column footer with conditional phone, WhatsApp, email and address links
- Open Graph / Twitter metadata, robots.txt and dynamic sitemap
- Smooth quote-anchor scrolling with sticky-header offset
- Generic engineering photography is never labelled as completed Green X project photography
- No public developer/CMS instructions or preview labels

## Admin CMS

Open `/admin` and sign in with the Supabase user configured as the Green X administrator.

Default admin email in this package:

`admin@google.com`

CMS modules:

- Projects + project gallery
- Products
- Services
- Clients / partners
- Enquiries
- Homepage / company settings
- Logo and hero-image upload
- Cloudinary image/GIF upload
- Published / Draft and Featured controls

## Existing infrastructure

Your Vercel project should already contain:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```

Do not commit database passwords, Supabase secret/service-role keys, Cloudinary API secrets or `.env.local`.

Optional/recommended:

```env
NEXT_PUBLIC_SITE_URL=https://green-x-lake.vercel.app
ADMIN_EMAIL=admin@google.com
NEXT_PUBLIC_COMPANY_PROFILE_URL=
```

`NEXT_PUBLIC_COMPANY_PROFILE_URL` can point to a real company-profile PDF when one is available. The download action remains hidden when it is blank.

## Database

V3 uses the same seven tables already created for V2:

- `site_settings`
- `services`
- `projects`
- `project_media`
- `products`
- `clients`
- `enquiries`

No new V3 schema migration is required.

If you have not already applied database-level admin hardening, run:

`supabase/migrations/20260910_admin_hardening.sql`

It restricts CMS write access to `admin@google.com`.

## Local development

Node.js 20 or newer is recommended. A `.nvmrc` is included.

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=admin@google.com
```

Then run:

```bash
npm install
npm run dev
```

Open:

- Public: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
- Health: `http://localhost:3000/api/health`

Before pushing:

```bash
npm run build
```

## GitHub Desktop → Vercel

1. Copy the contents of this V3 folder into your existing local `GreenX` repository.
2. Keep the repository's hidden `.git` directory.
3. Open GitHub Desktop.
4. Commit, for example: `Green X V3 professional UI rework`.
5. Push `main`.
6. Vercel automatically builds and deploys the commit.

Production URL currently configured for the project:

`https://green-x-lake.vercel.app`

## Content integrity

The fallback catalogue is present only so the layout does not look empty before Green X content is entered. Fallback project pages are described as engineering reference configurations rather than completed-client claims. Competitor projects are not presented as Green X work.

For a client-facing demo, replace the reference data with actual Green X project names, photos and technical facts through `/admin` as soon as those assets are available.

See `docs/V3-UI-REWORK.md` and `docs/IMAGE-SOURCES.md` for the design/audit handoff.
