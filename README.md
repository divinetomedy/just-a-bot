# JUST A BOT

A non-personified, child-safe AI assistant. **Milestone 1 (POC)** in progress — see [milestone-1-plan.md](milestone-1-plan.md). Product spec: [product-spec.md](product-spec.md).

## Run locally

```bash
npm install
cp .env.example .env   # add your ANTHROPIC_API_KEY (used from step 2 on)
npm run dev            # backend on :3001, frontend on :5173
```

Open http://localhost:5173. The frontend proxies `/chat` to the backend, so the API key never reaches the browser.

## Layout

- `server/index.js` — Express backend, single `/chat` endpoint (the whole pipeline lives here).
- `src/` — React (Vite) chat UI with the persistent "this is AI, not a person" banner.

## Status

- [x] **1. Scaffold** — repo, `/chat` endpoint, env-based key, chat UI + disclosure banner.
- [x] **2. Model integration** — `/chat` calls Claude Haiku 4.5, capped history, no persistence.
- [ ] 3. System prompt v1
- [ ] 4. First-person guard
- [ ] 5. Probe suite
- [ ] 6. Polish & demo
