# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

VaThala — home healthcare marketing site for a Chennai-based company. Static Next.js export serving service pages, blog, contact form, and Sanity Studio.

**Live:** https://vathala.com · **Staging:** https://testenqa.github.io/vathala-web

## Commands

```bash
pnpm dev                    # Dev server on localhost:3000
pnpm run build              # Sync blogs + static export to out/
pnpm start                  # Serve out/ locally (npx serve@14 out)
pnpm run sync-blogs         # Pull blog data from vathala.com API → src/data/blogs.json
pnpm run migrate-sanity     # Push synced blogs into Sanity CMS
pnpm run sync-and-migrate   # Both in sequence
pnpm run lint               # ESLint
```

### Subpath builds (GitHub Pages / dev server)

```bash
BASE_PATH=/test NEXT_PUBLIC_SITE_URL=https://dev.vathala.com/test pnpm run build
# or: ./scripts/build-dev-test.sh
```

Without `BASE_PATH`, hero video and public assets break on subpath deploys.

## Architecture

**Static export** (`output: "export"`, `trailingSlash: true`) — no SSR, no API routes. Every route becomes `route/index.html` in `out/`.

### Content pipeline

```
vathala.com API → sync-blogs → src/data/blogs.json (legacy source of truth)
                                      ↓
                              Sanity CMS (Portable Text for new posts)
                                      ↓
                              next build → out/ (static HTML)
```

Blog posts have dual sources: legacy JSON (synced from vathala.com) overlays Sanity data at build time. `src/lib/blogs.ts` orchestrates this — if Sanity is configured, it fetches posts then overlays legacy fields for freshness. Posts can have HTML body (legacy) or Portable Text (Sanity-authored).

### Key source directories

- `src/app/` — Next.js App Router pages. Service pages each have their own route (e.g., `/doctor-visit-at-home/`)
- `src/components/vathala/` — All VaThala-specific UI components
- `src/components/motion/` — Scroll-triggered animation wrappers (reveal, stagger, ambient orbs)
- `src/components/seo/` — JSON-LD structured data
- `src/lib/` — Shared data, config, and utilities
- `src/lib/sanity/` — Sanity GROQ queries and types
- `sanity/` — Sanity schema definitions and client config
- `public/videos/` — Hero background video
- `public/hero/`, `public/images/` — Static imagery

### Design system

- **Fonts:** Playfair Display (headings, `--font-playfair`) + DM Sans (body, `--font-dm-sans`)
- **Brand colors** defined in `src/lib/brand-colors.ts` and mirrored as CSS custom properties (`vathala-forest`, `vathala-cream`, `vathala-sage`, `vathala-terracotta`, `vathala-text`, `vathala-muted`)
- **Tailwind CSS v4** with PostCSS
- Hero text panel has three visual variants controlled by `src/lib/hero-display.ts`: `"forest"` (production default — frosted glass), `"glass"`, `"none"`

### Important patterns

- **`publicAssetPath()`** (`src/lib/base-path.ts`) — must wrap all `/public` asset references to support subpath deploys
- **`CallbackModalProvider`** — React context wrapping pages that need the booking/callback modal (uses Cloudflare Turnstile for bot protection)
- **Service pages** share `ServiceDetailPage` component; service data lives in `src/lib/vathala-services.ts`
- **Sanity client** is lazy-initialized and gracefully degrades — builds work without Sanity env vars (falls back to legacy JSON)

### External integrations

- **Sanity.io** — Blog CMS; Studio embedded at `/studio`
- **Cloudflare Turnstile** — Bot protection; site key in `src/lib/turnstile-config.ts`
- **VaThala API** (`NEXT_PUBLIC_VATHALA_API_URL`) — Appointment booking / callback POST endpoint
- **AWS S3** — Remote image hosting (`vathala-bucket.s3.ap-south-1.amazonaws.com`)

### Deployment

GitHub Actions workflow on push to `main` → builds static export → deploys to GitHub Pages. See `docs/DEPLOY.md` for subpath config, `docs/SANITY.md` for CMS setup, `docs/TURNSTILE.md` for Turnstile setup.

## Environment variables

Copy `.env.example` → `.env.local`. Required for full functionality:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` — Sanity CMS
- `NEXT_PUBLIC_VATHALA_API_URL` — Backend API for form submissions
- `BASE_PATH` — Only for subpath deploys (empty for root domain)
