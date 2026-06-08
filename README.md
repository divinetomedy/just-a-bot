# JUST A BOT

A deliberately **non-personified** AI encyclopedia for kids. It answers questions but never acts like a person: no first-person voice, no feelings or opinions, no friendship or companionship. Asked about itself, it replies **"This is just a bot"** and redirects to the topic.

This repo is **Milestone 1 — a proof of concept** of that voice. The full product vision (defense-in-depth safety, crisis handling, parent visibility, etc.) lives in [product-spec.md](product-spec.md); the current milestone's scope is in [milestone-1-plan.md](milestone-1-plan.md).

## Quick start

```bash
npm install
cp .env.example .env   # set ANTHROPIC_API_KEY
npm run dev            # frontend :5173, backend :3001
```

Open http://localhost:5173.

## How it works

The whole point is that **the API key and all logic stay server-side** — the frontend is a thin window.

```
browser (React)  →  POST /api/chat  →  Claude (Haiku 4.5)
                     ↑ holds the key, sends the system prompt + capped history
```

- **`server/chat-core.js`** — all the chat logic: input validation, history capping (last 20 turns, no persistence), the model call, and granular error messages. Shared by both runtimes below.
- **`server/index.js`** — Express server for **local dev** (`/api/chat`).
- **`api/chat.js`** — the **production** `/api/chat` as a Vercel serverless function. Thin wrapper over `chat-core`.
- **`server/system-prompt.md`** — the system prompt, kept as its own file so it can be versioned and reviewed independently. Re-read on every request, so edits apply on the next message with no restart.
- **`src/`** — React (Vite) chat UI: minimal, mobile-first, with the persistent "this is AI, not a person" line and markdown-rendered replies.

The model is **Claude Haiku 4.5** (fast/cheap, set in `chat-core.js`). There is no database, no auth, and no cross-session memory by design.

## Deploy

Hosted on **Vercel**, connected to this repo — every push to `main` auto-deploys, PRs get preview URLs. The only required config is the **`ANTHROPIC_API_KEY`** environment variable (Settings → Environment Variables, Production + Preview); env-var changes need a redeploy to take effect. `vercel.json` bundles the system-prompt file with the function. Custom domain and DNS are already configured.

## Status

**Milestone 1 (this repo):**

- [x] Scaffold — `/api/chat`, env-based key, chat UI + AI-disclosure line
- [x] Model integration — Claude Haiku 4.5, capped history, no persistence
- [x] Deploy — Vercel + custom domain
- [~] System prompt v1 — non-personification + "This is just a bot" framing (iterating)
- [ ] First-person guard — deterministic check that the reply never uses "I/me/my…", with regenerate-then-fallback
- [ ] Probe suite — adversarial prompts asserting: no first-person, correct "just a bot" self-answers, no trailing engagement question, still genuinely useful
- [ ] Polish — UI, latency, child-facing error copy

**Deferred to later milestones** (see the spec): content moderation, jailbreak/injection defense, crisis/self-harm escalation, parent alerts, auth/profiles, PWA install, session caps, logging. The code is shaped to add these as guards around the single model — none are built yet.

> ⚠️ This is an early POC. It has **no safety guardrails yet** beyond the voice/persona — not suitable for real child use until the deferred work above lands.
