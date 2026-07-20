# Sanity CMS — VaThala Blog

## Quick answers

| Topic | Detail |
|--------|--------|
| **Studio (staging)** | `https://testenqa.github.io/vathala-web/studio` |
| **Studio (production)** | `https://vathala.com/studio` (after go-live) |
| **Publish flow (GitHub Pages)** | Edit in Studio → **re-run deploy** (push to `main` or Actions → Run workflow) |
| **Publish flow (Vercel/Node)** | Can enable ISR later (~60s) without full redeploy |

## Setup (first time)

1. Copy `.env.example` → `.env.local` and set:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (usually `production`)
   - `NEXT_PUBLIC_SANITY_API_VERSION` (`2024-01-01`)
   - `SANITY_API_WRITE_TOKEN` (migration only; Editor token from sanity.io/manage → API → Tokens)

2. Install dependencies: `pnpm install`

3. **CORS** (sanity.io/manage → API → CORS):
   - `http://localhost:3000`
   - `https://testenqa.github.io`
   - `https://vathala.com` (when live)

4. After syncing from vathala.com, push into Sanity (repeat when live site updates):

   ```bash
   pnpm run sync-blogs
   pnpm run migrate-sanity
   # or: pnpm run sync-and-migrate
   ```

   Deployed builds always run `sync-blogs` first. Imported post **content, images, meta, and FAQs** come from `src/data/blogs.json` and overlay Sanity at build time. Run `migrate-sanity` to keep Studio in sync.

5. Local dev: `pnpm dev` → `/studio` and `/blog`

## GitHub Pages secrets

Repo → Settings → Secrets → Actions:

| Secret | Example |
|--------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `abc123` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` |
| `SANITY_API_WRITE_TOKEN` | *(optional)* Editor token — enables `migrate-sanity` in CI so Studio matches vathala.com |

## SEO fields in Studio

Each post supports: meta title/description/keywords, canonical URL, noindex, OG image, FAQs, HowTo steps, and rating schema (JSON-LD on the site).

Imported posts keep **HTML body** (`bodyHtml`) and **hero image URLs** from the old CMS. New posts should use **Portable Text** and uploaded hero images.

## Handoff to client

Transfer the Sanity project in [sanity.io/manage](https://sanity.io/manage) and invite their team as **Editors**. Update production env vars on their host when they switch from GitHub Pages.
