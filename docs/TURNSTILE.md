# Cloudflare Turnstile (booking + contact forms)

## 1. Create a widget

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Turnstile** (left sidebar)
3. **Add widget**
   - **Widget mode:** Managed (recommended — low friction, rare challenges)
   - **Domains:** add every host you use, for example:
     - `localhost`
     - `127.0.0.1`
     - `testenqa.github.io`
     - `vathala.com`
     - `dev.vathala.com`
4. Copy the **Site key** (public) and **Secret key** (server only)

## 2. Frontend (this repo)

The **site key** is embedded in [`src/lib/turnstile-config.ts`](../src/lib/turnstile-config.ts) so builds work without `.env.local` (e.g. when sharing a zip with another dev).

**Common mistake:** putting the **Secret key** in `turnstile-config.ts`. The widget will fail on localhost with a domain/key error. Use **Site key** only.

Optional override in `.env.local`:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=other_site_key
```

Restart dev server after changes: `pnpm dev`

## 3. Backend (VaThala API — required)

The site POSTs the token as `cfTurnstileToken` to `POST /general/create`.

Your API must verify it with Cloudflare:

```http
POST https://challenges.cloudflare.com/turnstile/v0/siteverify
Content-Type: application/x-www-form-urlencoded

secret=<TURNSTILE_SECRET_KEY>&response=<token_from_form>
```

See [Cloudflare Turnstile server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

Until the API validates Turnstile tokens, submissions may fail even when the widget looks correct.

## 4. GitHub Pages

Repo → **Settings → Secrets → Actions** → add:

| Secret | Value |
|--------|--------|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Site key from Cloudflare |
