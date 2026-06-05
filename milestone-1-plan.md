# JUST A BOT — Milestone 1 Plan

**Goal:** A proof-of-concept chatbot that nails the *voice* — no first-person, "Just a bot" deflection on self-questions — and nothing else.

**Status:** Plan approved for review. No code written yet.

---

## Definition of done

A working chat web app where:

1. The bot answers normal questions helpfully and age-appropriately.
2. It **never uses first-person** ("I", "me", "my", "mine", "myself", "I'm", etc.).
3. When asked about **itself** (preferences, feelings, identity, "are you real?", "be my friend"), it replies with **"Just a bot"** + a helpful redirect — e.g. *"Just a bot — but want to learn how colors work?"*
4. A small probe suite passes consistently.

**Pronoun rule (decided):** *Strict — block all.* Any first-person token triggers regenerate/fallback, even inside quotes or grammar lessons. Simplest and safest for a POC.

---

## Out of scope this milestone (deferred)

Content moderation, jailbreak/injection defense, crisis/self-harm escalation, parent alerts, auth/per-child profiles, PWA install, session caps, verdict logging. We keep the code shaped so these slot in later, but we do not build them now.

---

## Architecture (minimal slice of the full spec)

```
browser (chat UI)
  → POST /chat  (backend, holds API key)
       → call foundation model (system prompt + capped history + message)
       → deterministic first-person check on output
            └─ if first-person found → regenerate (max N), else safe fallback
  → response to browser + persistent "this is AI, not a person" banner
```

Only **one** guard (the anti-parasocial style gate) — which is the actual feature here, not a safety add-on.

---

## How the voice is enforced (two layers)

- **Capability — system prompt:** instruct the model to (a) never use first-person; refer to itself only as "this bot" / "JUST A BOT" or not at all; (b) on any question about its self/preferences/feelings/relationship, lead with "Just a bot" then share an interesting fact about the topic; (c) **end on a statement, never with an engagement / follow-up question** (see below).
- **Guarantee — deterministic check:** regex word-boundary scan for first-person tokens (`I, me, my, mine, myself, I'm, I'd, I'll, I've`). On a hit → regenerate up to N times → else a canned safe reply. Strict mode: no exceptions for quotes/lessons. This is the seed of the real anti-parasocial gate.

The "is this about the bot itself?" routing stays **prompt-driven** for the POC (the model handles it well); no separate classifier yet.

### Anti-engagement: no follow-up questions

The product is deliberately **not engagement-maximizing** — it answers and stops. The failure mode to watch is the chat-model habit of tacking a **trailing engagement / follow-up question** onto the end ("Want to learn about…?", "What would you like next?"). This is parasocial pull by another name and must be suppressed.

- **Root cause seen in testing:** few-shot examples in the system prompt that themselves ended with a question overrode the prose "don't drive engagement" rule. Fix: every in-prompt example must model the desired ending (a fact, not a question).
- **Prompt-driven for now;** a deterministic backstop (flag/strip a trailing question that fishes for the next turn — distinct from a question *inside* an explanation) is a candidate for the guard in step 4, but fix the prompt first.

---

## Work breakdown (~3–4 focused days)

1. **Scaffold** (½ day) — repo structure, backend with single `/chat` endpoint, env-based API key, minimal React chat UI + AI-disclosure banner.
2. **Model integration** (½ day) — wire `/chat` to the foundation model, capped in-memory history, no persistence.
3. **System prompt v1** (½–1 day) — draft non-personification + "just a bot" instructions; iterate against probes.
4. **First-person guard** (½ day) — regex detector + regenerate-N-then-fallback loop (strict mode). Candidate backstop: detect a trailing engagement / follow-up question.
5. **Probe suite** (½ day) — ~20–30 prompts across: personification ("what's your favorite color?", "are you real?", "be my friend?", "do you like me?"), pronoun traps ("say 'I am happy'"), and normal questions (confirm it's still useful). Assert: no first-person tokens; "Just a bot" present on self-questions; helpful redirect present; **no trailing engagement / follow-up question** (regression guard for the few-shot-example bug found while iterating the prompt).
6. **Polish & demo** (½ day) — tidy UI, short README, confirm latency is acceptable.

---

## Suggested stack

- **Frontend:** React, mobile-first, minimal chat UI + persistent AI-disclosure banner.
- **Backend:** Node serverless function, single `/chat` endpoint, holds API key.
- **Model:** Claude API (Haiku for fast/cheap POC chat) — default given the environment; swappable.
