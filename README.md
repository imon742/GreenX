# Green X Power Engineering — Website + Admin CMS (V1)

This ZIP is a GitHub/Vercel-ready first version of the new Green X Power Engineering website.

It contains:

- Modern responsive public company website
- Solar, Generator/Backup Power, Lift, Electrical, Lightning Protection and Maintenance sections
- Dynamic Projects / case studies
- Client & partner logo area
- Quote/contact request form
- `/admin/` CMS dashboard
- Add/edit/delete Projects
- Add/edit/delete Services
- Add/edit/delete Products
- Add/edit/delete Clients
- Company/homepage content editor
- JPG / PNG / WebP / SVG / animated GIF upload support
- Quote enquiry management
- Supabase Auth login
- Supabase Storage media upload
- Draft / Published controls
- Demo Mode so you can preview before connecting Supabase

## 1. Open it locally first

No Node.js or npm is required for this V1.

Option A: double-click `index.html`. The public website can be previewed immediately.

Option B (recommended): run a small local web server. If you have Node installed:

```bash
npx http-server . -p 8080
```

Then open:

- Public: `http://localhost:8080`
- Admin: `http://localhost:8080/admin/`

If Supabase is not configured, click **Open Demo Admin**. Demo changes use browser Local Storage and are only visible in that browser.

## 2. Create the free Supabase backend

1. Go to Supabase and create a new project.
2. Open **SQL Editor**.
3. Create a new query.
4. Copy all SQL from `sql/supabase-schema.sql`.
5. Run it once.
6. Go to **Authentication > Users**.
7. Create your Green X admin user with your real admin email and a strong password.
8. Do not enable public user sign-up unless you intentionally want other people to create admin accounts.

## 3. Connect the website to Supabase

Open:

`js/config.js`

Replace:

```js
SUPABASE_URL: '',
SUPABASE_ANON_KEY: '',
```

with the values from your Supabase project settings.

Example:

```js
window.GREENX_CONFIG = {
  SUPABASE_URL: 'https://YOUR_PROJECT.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR_PUBLIC_ANON_OR_PUBLISHABLE_KEY',
  STORAGE_BUCKET: 'site-media'
};
```

The Supabase anon/publishable key is meant to be used by a browser application. Security is enforced through Row Level Security policies in the SQL file. Never put a Supabase service-role key in this project.

## 4. Admin login

After Supabase is connected, go to:

`/admin/`

Sign in using the Auth user you created in Supabase.

The Admin panel lets you update content without editing source code.

## 5. GIF, logo and project image support

Admin upload fields accept:

- JPG / JPEG
- PNG
- WebP
- SVG
- Animated GIF

Uploaded media is stored in the `site-media` Supabase Storage bucket.

You can also paste a direct image/GIF URL instead of uploading.

Your old Google Sites logo/GIF files are not included in this ZIP because this package does not have their original downloadable source files. Put those files into `assets/` manually or upload them through the Admin after Supabase is connected. The website is already designed to use them.

## 6. Use GitHub Desktop

1. Unzip this package.
2. Open **GitHub Desktop**.
3. Choose **File > Add Local Repository**.
4. Select the unzipped `greenx-v1` folder.
5. If GitHub Desktop says it is not a repository, choose **Create a Repository** from that folder.
6. Name it something like `greenx-website`.
7. Commit the initial files.
8. Click **Publish repository**.

From then on, every change you make can be committed and pushed using GitHub Desktop.

## 7. Deploy to Vercel

1. Sign in to Vercel.
2. Choose **Add New > Project**.
3. Import your `greenx-website` GitHub repository.
4. Framework preset: choose **Other** if Vercel does not auto-detect a static site.
5. No build command is needed.
6. Deploy.

After deployment you will get a URL like:

`https://your-project.vercel.app`

Admin will be:

`https://your-project.vercel.app/admin/`

When using Vercel for a real commercial/company website, check Vercel's current plan/usage terms and choose a plan appropriate for business use.

## 8. First things to change from Admin

Recommended order:

1. Company logo
2. Hero photo/GIF
3. Email
4. WhatsApp
5. Facebook / LinkedIn / YouTube
6. Real projects
7. Project photos
8. Actual client/partner logos
9. Product information
10. Company About content

## 9. Existing Green X content used in V1

The starting copy is based on the current Green X Power Engineering Google Sites content, including:

- Reliable power solutions positioning
- Lift Systems
- Thunder / lightning protection
- Building generators
- Sustainability focus
- Mission and vision themes
- Motto: Powering the Future, Sustainably.
- Mirpur, Dhaka head office information
- Phone: 01717202172

The project/client examples in V1 are deliberately marked as demo content. Replace them with real Green X work.

## 10. Current V1 limitation

Project cover images and multiple gallery images are uploadable from Admin, and the public project page displays the gallery. V1 can add gallery images but does not yet provide drag/drop reordering or one-click removal of individual gallery images. Those controls can be added in V2 without changing the database structure.

The public Products section is prepared in the CMS but is not yet given a large dedicated homepage section. This keeps V1 focused on services and completed projects, which are more important for client trust.

## Folder structure

```text
greenx-v1/
├── index.html
├── project.html
├── admin/
│   └── index.html
├── assets/
│   ├── logo.svg
│   ├── solar.svg
│   ├── generator.svg
│   └── lift.svg
├── css/
│   ├── styles.css
│   └── admin.css
├── js/
│   ├── config.js
│   ├── demo-data.js
│   ├── data-service.js
│   ├── app.js
│   └── admin.js
├── sql/
│   └── supabase-schema.sql
├── vercel.json
└── README.md
```

## Important security note

V1 treats any authenticated Supabase Auth user as an admin. For a small company where you manually create the only admin account(s), this is simple and secure enough when public sign-up is disabled. If you later need staff roles such as Super Admin / Content Admin / Sales Admin, add role-based policies before creating many users.
