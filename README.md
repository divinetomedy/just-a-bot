# JUST A BOT

A non-personified, child-safe AI assistant. **Milestone 1 (POC)** in progress — see [milestone-1-plan.md](milestone-1-plan.md). Product spec: [product-spec.md](product-spec.md).

## Run locally

```bash
npm install
cp .env.example .env   # add your ANTHROPIC_API_KEY
npm run dev            # backend on :3001, frontend on :5173
```

Open http://localhost:5173. The frontend proxies `/api/chat` to the backend, so the API key never reaches the browser.

## Layout

- `server/chat-core.js` — the chat logic (validation, capped history, model call). Shared by both runtimes.
- `server/index.js` — Express dev server; exposes `POST /api/chat` locally.
- `api/chat.js` — Vercel serverless function; the production `POST /api/chat`.
- `server/system-prompt.md` — the system prompt, versioned and editable on its own.
- `src/` — React (Vite) chat UI with the persistent "this is AI, not a person" banner.

## Deploy (Vercel)

The app is a static Vite frontend (`dist/`) + a serverless function (`api/chat.js`). The API key lives only as a Vercel environment variable — never in the repo.

1. **Import the repo:** at [vercel.com/new](https://vercel.com/new), import the GitHub repo. Vercel auto-detects Vite (build `vite build`, output `dist/`) and the `api/` function — no config needed beyond `vercel.json` (already in the repo, to bundle `system-prompt.md` with the function).
2. **Set the env var:** Project → Settings → Environment Variables → add `ANTHROPIC_API_KEY` (Production + Preview). Redeploy if you add it after the first build.
3. **Deploy** — every push to `main` auto-deploys; PRs get preview URLs.

### Custom domain (just-a-bot.com via Squarespace)

1. In Vercel: Project → Settings → **Domains** → add `just-a-bot.com` and `www.just-a-bot.com`. Vercel shows the exact DNS records to create.
2. In Squarespace: **Domains → just-a-bot.com → DNS settings** (Squarespace Domains, formerly Google Domains). Add the records Vercel gave you — typically:
   - Apex `just-a-bot.com`: an **A** record → `76.76.21.21`
   - `www`: a **CNAME** → `cname.vercel-dns.com`
   Use whatever Vercel displays; it's authoritative. (Don't use Squarespace's "connect a site" flow — you're pointing DNS at Vercel, not building a Squarespace site.)
3. Wait for DNS to propagate (minutes to a couple hours). Vercel auto-provisions HTTPS once the records resolve.

## Status

- [x] **1. Scaffold** — repo, `/api/chat` endpoint, env-based key, chat UI + disclosure banner.
- [x] **2. Model integration** — calls Claude Haiku 4.5, capped history, no persistence.
- [~] **3. System prompt v1** — non-personification + "This is just a bot" framing; iterating.
- [ ] 4. First-person guard
- [ ] 5. Probe suite
- [ ] 6. Polish & demo

Infra: deployable to Vercel (static frontend + `api/chat` serverless function).
