**JUST A BOT - Product Spec**
*A child-safe AI encyclopedia.*

* **Product name:** JUST A BOT
* **Naming convention:** Always written in full caps — **JUST A BOT** — in every context (logo, copy, UI). The all-caps styling is intentional: flat, mechanical, and unmistakably non-human, which suits a product whose entire premise is that it is a mechanism, not a person. (In the assistant's own spoken lines, the phrase "just a bot" may appear in natural sentence casing — see §2 — but the *name as a name* is always JUST A BOT.)
* **Document status:** Draft v0.2 — high-level spec
* **Platform:** Mobile-first web app (PWA), built on a hosted foundation model via API

---

## 1. What it is

A web-based AI assistant for children that is deliberately **non-personified** and **non-companion**: it helps with learning and questions but never imitates a human, never refers to itself in the first person, and never forms or simulates a relationship with the child. A helpful analogy is an encyclopedia: how would it respond to questions? It would give the facts and be done. Safety is enforced through **multiple independent checks that every response must pass before a child sees it** (defense-in-depth), with detection handled by narrow classifiers and enforcement handled by deterministic, non-bypassable policy.

Design philosophy: **the model provides capability; deterministic code provides guarantees.** Anything that must be true 100% of the time is enforced in code, not left to a probabilistic model that can drift or be talked out of its instructions.

---

## 2. Goals

1. **No personification, no parasocial relationship** — never uses first-person self-reference, never claims feelings/opinions/experiences, never offers personal validation or companionship language, never implies it remembers the child as a friend. When asked what it is, or pressed to act like a person, it identifies as "just a bot" — the product name doubles as the standard, reusable answer to any attempt to personify it.
2. **Genuinely useful for kids** — friendly, age-appropriate help with questions, homework, and curiosity, with warmth conveyed through *content and topic*, never through a simulated self.
3. **Safety-first** — independent, redundant safety layers such that no single failure or bypass results in harm reaching the child.
4. **Privacy by design** — data minimization, no cross-session memory, capped session length; conversations are not used to train models and do not travel anywhere beyond what is needed to answer the question.
5. **Parent visibility** — clear insight into how the product works, and surfacing of genuinely concerning interactions.
6. **Thoughtful crisis handling** — reliable detection of self-harm / distress signals, with a fixed, carefully-designed response and a path to real human help.
7. **Grounded in current safety practice** — design informed by emerging norms for children's AI: clear "this is AI" disclosure, break reminders on long sessions, and protections against self-harm content and age-inappropriate material.

---

## 3. Non-goals (explicit)

- **Not a companion or friend.** No persona, no "personality," no relationship-building.
- **No persistent memory** of the child across sessions (also serves privacy and limits behavioral drift over long interactions).
- **Not a mental-health provider.** It detects distress and routes toward appropriate human help; it does not attempt to counsel or treat.
- **Not an "autonomous agent" product.** Only one generative model talks to the child; every other component is a guard around it.

---

## 4. Guiding architectural principles

- **Detection vs. enforcement.** Each safety domain splits into a *detector* (a narrow classifier making a judgment call — probabilistic is fine) and an *enforcer* (hard-coded policy deciding what happens — must be deterministic). Enforcement cannot be a model, because a model can be manipulated by a determined child.
- **Server-side only.** All keys and all guardrails live on the backend. The frontend is a thin window; anything client-side is assumed bypassable and is never trusted for safety.
- **Single conversational model, many guards.** The only full generative component is the assistant the child talks to. Anti-parasocial, content, self-harm, and jailbreak checks are classifiers + policy, not agents.
- **Fail safe, not open.** On any uncertainty, timeout, or repeated guard failure, fall back to a safe canned response rather than shipping an unchecked one.
- **No single point of failure.** A jailbreak that corrupts the main model is still caught by downstream output gates.

---

## 5. High-level implementation

### 5.1 Request pipeline

```
child message (browser)
  → backend
     ├─ INPUT checks (run in parallel): content classifier, self-harm/distress
     │   classifier, jailbreak/prompt-injection classifier
     │     └─ if distress or severe content → SHORT-CIRCUIT:
     │           skip the main model, run fixed escalation protocol,
     │           surface to parent per alert rules
     ├─ if clear → call main conversational model (system prompt + capped history + msg)
     ├─ OUTPUT checks (run in parallel): content classifier, anti-parasocial style gate
     │     └─ style gate fail → rewrite/regenerate loop (max N tries, else safe fallback)
     └─ deterministic policy engine logs verdicts, applies parent-alert rules
  → safe response to child + persistent "this is AI, not a person" disclosure
```

Input checks run in parallel for low latency (children won't tolerate long waits). The crisis path *gates* — it bypasses the chat model entirely, because a child in distress should reach help, not a chatty answer.

### 5.2 Components - initial provisional list

| Component | Type | Role |
| :---- | :---- | :---- |
| Conversational model | Foundation model via API | The only component that talks to the child |
| Anti-parasocial gate | Classifier + deterministic rewrite/block | Strips first-person & relationship-building; routes personification attempts to the standard "just a bot" response |
| Self-harm / distress detector | Input classifier | Flags crisis signals for the escalation path |
| Escalation protocol | Deterministic, carefully designed | Fixed crisis response + routing to real human help |
| Content moderation | Classifier (input & output) | Age-appropriateness, blocks unsafe content |
| Jailbreak / injection detector | Input classifier | First-line defense; output gates are the backstop |
| Parent-alert engine | Deterministic rules | Surfaces flagged interactions to the parent |
| Access | Simple per-child profiles | Lightweight sign-in; no data beyond what's needed |
| Frontend | React PWA, mobile-first | Thin UI: chat, AI disclosure, break reminders |

### 5.3 Stack (indicative)

- **Frontend:** React PWA, mobile-first, installable; minimal surface; persistent AI disclosure and break-reminder UI.
- **Backend:** Node/serverless functions; single `/chat` endpoint orchestrating the pipeline; holds all API keys.
- **Models:** hosted foundation model for conversation; small/fast classifier calls for detection. **No training or fine-tuning** in scope (a later optimization at most).
- **Data:** minimal storage; no cross-session conversation memory; a log of safety verdicts (not child content beyond what the alert rules require).

---

## 6. Testing & quality (a first-class concern)

For this product, the test suite *is* the safety story.

- **Adversarial probe suite:** persistent kid-style attempts to personify ("are you real?", "be my friend", "what's your favorite color?", "pretend you're a person"), jailbreaks, and — most critically — distress probes that must trigger escalation every time.
- **Self-identification check:** personification attempts reliably resolve to the standard "just a bot" framing, with no first-person slip and no relationship-building.
- **Regression gate:** the suite runs on every prompt change *and every model upgrade*, since new model versions can shift behavior.
- **Red-teaming:** structured adversarial testing before the kids use it, and periodically after.
- **Latency budget:** verify parallelized checks keep response times kid-acceptable.

---

## 7. Limitations & honest expectations

- **Detection is probabilistic.** Classifiers will sometimes miss; defense-in-depth reduces the chance of harm reaching the child but does not eliminate it.
- **It supplements, not replaces, adult involvement.** The tool is a guarded helper, not a substitute for supervision.
- **It is not a mental-health service.** The crisis path routes toward real human help; it is not itself care or treatment.
- **The crisis protocol should draw on reputable clinical/safety resources.** Getting the distress response right matters more than any other single piece of the system.
