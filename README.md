# Green X Power Engineering — V2

Deployment-ready Next.js CMS website for Green X.

## What is included

- Modern responsive public website
- Product header dropdown with category links
- Solutions, products, project portfolio, about and contact pages
- Supabase-backed Admin CMS at `/admin`
- Admin email restricted in application code to `admin@google.com` by default
- Project/Product/Service/Client CRUD
- Cloudinary image/GIF uploads through a protected server API route
- Quote/enquiry form stored in Supabase
- Enquiry status management
- Draft / Published and Featured controls
- Demo fallback content so the first Vercel deployment looks complete even before real Green X records are added
- Sample/demo portfolio and catalog items are clearly labelled so competitor or fictional work is never presented as Green X completed work

## Your already-configured infrastructure

Vercel should have:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `CLOUDINARY_URL`

Do **not** commit API secrets, database passwords or `.env.local`.

Supabase Auth redirect URLs should include:

- `https://green-x-lake.vercel.app/**`
- `http://localhost:3000/**`

Site URL:

- `https://green-x-lake.vercel.app`

## Deploy with GitHub Desktop

1. Extract this ZIP.
2. Replace the contents of your local `GreenX` repository with the V2 files (keep `.git` if you are copying into the existing repo).
3. Open the repository in GitHub Desktop.
4. Commit: `Green X V2 Next.js CMS`.
5. Push `main`.
6. Vercel automatically detects Next.js, installs dependencies and deploys.
7. Open `https://green-x-lake.vercel.app`.
8. Admin: `https://green-x-lake.vercel.app/admin`.

## Supabase

The base tables you already created are exactly the tables V2 uses:

- site_settings
- services
- projects
- project_media
- products
- clients
- enquiries

### Recommended one-time security hardening

Your first SQL setup allowed every authenticated Supabase account to write CMS data. V2 application routes already restrict Admin to `admin@google.com`, but you should also tighten RLS at database level.

Run:

`supabase/migrations/20260910_admin_hardening.sql`

in Supabase SQL Editor.

Or, because you already linked the Supabase CLI project:

```bash
supabase db push
```

Review the migration before applying. If the admin email changes later, update both `ADMIN_EMAIL` in Vercel and the SQL helper policy.

## Local development

Create `.env.local` (never commit it):

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
ADMIN_EMAIL=admin@google.com
```

Then:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Important demo-content note

The fallback project and product records are intentionally marked `Portfolio preview` / `Sample catalog`. They show the finished visual treatment without claiming that another Bangladesh company's publicly documented work belongs to Green X. Add real Green X project photos/details through Admin before removing those labels by replacing the fallback data with database records.

The Bangladesh competitor research was used to shape realistic information architecture: rooftop solar, mini-grid/solar systems, generator/backup, lifts, client/project proof, technical capacity, maintenance and after-sales presentation. Publicly documented competitor projects were **not copied as Green X work**.

## Cloudinary

Admin uploads use the server route `/api/admin/upload`. `CLOUDINARY_URL` stays server-side and the API secret is never sent to the browser.

Supported demo usage includes JPG, PNG, WebP, SVG/GIF uploads supported by your Cloudinary account. The route currently limits each upload to 12 MB for a lightweight CMS workflow.

## Product dropdown

Product categories in the top navigation:

- Solar Generators
- Solar Panels
- Inverters
- Battery & Storage
- Generators
- Lift & Elevator
- UPS & Power Backup

Admin product category options use the same values, so new products automatically appear under the correct dropdown/filter.
