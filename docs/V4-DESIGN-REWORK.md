# Greenex V4 — Design Rework

V4 combines three inputs:

1. The uploaded Grok concept: dark industrial hero, emerald accent, glass navigation, high-contrast typography, technical trust language and a live estimator card in the hero.
2. The uploaded Bolt project: simple three-step estimator logic, system-specific inputs, clear progress and B2B enquiry handoff.
3. The existing Greenex V3 application: Next.js, Supabase CMS/auth, Cloudinary media uploads, solution/product/project routes, admin dashboard and enquiry storage.

## Main V4 changes

- New dark glass header with compact Solutions and Products mega menus.
- Dedicated Industries page.
- Dedicated Estimate System Size page plus full estimator on the homepage.
- Interactive live estimator in the hero.
- Solar, Generator, Lift and UPS sizing flows.
- Pexels representative photography for all fallback projects and products.
- Photography-led service cards.
- New project and product card systems.
- Dark engineering story section and industrial client/application section.
- New footer and mobile menu.
- Mobile action bar prioritizes Estimate System Size.
- Removed developer/sample-preview wording from the public experience.
- Avoided unverified certification, MW, SLA, savings and client-brand claims.

## Performance choices

- No additional UI framework or icon dependency.
- No external web fonts.
- One priority image in the homepage hero; below-the-fold Next/Image assets remain lazy by default.
- Pexels and Cloudinary preconnects only.
- AVIF/WebP enabled in Next.js.
- No autoplay homepage video.
- CSS-driven visuals and interaction instead of large animation packages.

## Estimator disclaimer

Estimator results are intentionally described as indicative planning values. Final equipment sizing, safety, compatibility and commercial proposals require site/load verification by an engineer.
