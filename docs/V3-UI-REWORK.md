# V3 UI Rework — Audit Closure

This version was rebuilt around the supplied V2 QA/UI feedback.

## Fixed production-readiness issues

- Every service now uses a distinct domain icon selected by service slug.
- Footer does not render empty contact paragraphs; contact actions render only when data exists.
- Public administrative instructions such as “replace from Admin”, “sample catalog” and “portfolio preview” were removed.
- Primary navigation was rebuilt without orphan empty navigation nodes.
- Database `null` values no longer wipe verified fallback contact/hero data.

## Navigation

- Sticky frosted header.
- Full-width desktop mega menu for Solutions and Products.
- Product mega menu links directly to all seven catalogue categories.
- Desktop navigation switches to a mobile drawer at 1120 px to avoid squeezed/cropped layouts.
- Mobile menu uses large touch targets and expandable sub-navigation.
- Escape key closes open navigation states.

## Home page

- High-impact photography-led engineering hero.
- Fast system-font typography; no web-font download dependency.
- Technical CTA hierarchy: Project Enquiry / Project Work.
- Trust/capability band does not invent client/project counts.
- Distinct solution cards with micro-interactions.
- Equipment-category navigation before catalogue cards.
- Filterable catalogue/project pages.
- Integrated power-continuity feature story.
- Six-step project process.
- Client logos animate only when actual logos exist; otherwise neutral market-sector cards are shown.
- Two-step quote builder.

## Detail pages

- Six solution routes with scoped capability, process, related products and related projects.
- Seven product category routes plus dynamic product pages.
- Six project category routes plus dynamic case-study pages.
- Project pages support gallery images and structured technical details from Supabase.
- Product pages support specs, brochures and quotation CTA.

## Mobile

- Tablet/mobile menu activates earlier to prevent header clipping.
- Hero, case studies and forms collapse to one column.
- Product catalogue stays two-column on normal phones and one-column on very narrow screens.
- Fixed Call / WhatsApp / Quote bar on mobile.
- Footer receives extra safe spacing behind the mobile action bar.

## Performance choices

- Next.js `<Image>` used for primary content images.
- AVIF/WebP output enabled through Next Image.
- Hero image is priority-loaded; below-fold imagery remains lazy by default.
- `content-visibility: auto` applied to below-fold sections.
- Preconnect hints for Cloudinary and Unsplash.
- No animation framework or heavy UI library.
- No external web-font request.
- Reduced-motion preference is respected.

## Intentionally not claimed

The audit suggested certifications, SLA response times, ROI figures and signed testimonials. V3 does not invent these. Add them only when Green X can provide verified certificates, real project data, signed client material or an approved service commitment.
