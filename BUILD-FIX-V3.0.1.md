# Green X V3.0.1 Build Fix

This patch fixes the Vercel build failure reported on 2026-09-11.

## Fixed

1. Added the missing `SectionTitle` import in:
   `app/(site)/solutions/[slug]/page.tsx`

2. Replaced `align-items: end` with `align-items: flex-end` in:
   `app/globals.css`
   This removes the Autoprefixer mixed-support warning at the reported rule.

3. Pinned the Vercel Node runtime declaration to `20.x` instead of `>=20.0.0` so a future Node major release is not selected automatically.

4. Updated package version to `3.0.1`.

## Deploy

Replace the files in your local GreenX repository with the contents of this folder, then commit and push to `main` with GitHub Desktop. Vercel will redeploy automatically.

No Supabase migration or environment-variable change is required for this patch.
