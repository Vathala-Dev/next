# Deploying the static export

The site is a **static export** (`out/`). Upload **only** the contents of `out/` — not `node_modules` or `.next`.

## Subpath hosting (required env at build time)

If the site is served from a subfolder, set **`BASE_PATH`** before `pnpm run build`:

| Host | `BASE_PATH` | `NEXT_PUBLIC_SITE_URL` |
|------|-------------|-------------------------|
| GitHub Pages | `/vathala-web` | `https://<user>.github.io/vathala-web` |
| Dev server | `/test` | `https://dev.vathala.com/test` |
| Production root | *(empty)* | `https://vathala.com` |

`next.config.ts` copies `BASE_PATH` into `NEXT_PUBLIC_BASE_PATH` so `/public` assets (hero video, intro image) match `_next` URLs.

### Dev example

```bash
./scripts/build-dev-test.sh
# or:
BASE_PATH=/test NEXT_PUBLIC_SITE_URL=https://dev.vathala.com/test pnpm run build
```

## Common mistake (broken hero video / images)

Building **without** `BASE_PATH=/test` but deploying to `dev.vathala.com/test/` produces HTML like:

- `/hero/hero-poster.jpg` → server returns **HTML** (404 fallback), not the image
- `/test/hero/hero-poster.jpg` → correct JPEG

Symptoms: empty hero, broken intro image, video not playing.
