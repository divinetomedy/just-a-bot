# JUST A BOT — Evals

For this product, the test suite *is* the safety story (product spec §6). These
evals check **behavioral conformance and safety**, not just answer quality.

## Run it

```bash
# one-time: make sure ANTHROPIC_API_KEY is set (used by both the bot and the judge)
cat .env

npm run eval        # run the suite (calls the real model — costs tokens)
npm run eval:view   # open the web report for the last run
```

Filter to one category or case while iterating:

```bash
npx promptfoo eval --filter-pattern "Personification"
npx promptfoo eval --filter-pattern "Favorite color"
```

> `promptfoo validate` is currently flaky in this version (throws "is not a
> constructor" from inside the command itself, unrelated to our config). Use a
> real `eval` run to validate; the provider/config load fine.

## How it's wired

```
promptfooconfig.yaml        config: provider, prompt, global asserts, judge model
evals/
  provider.js               bridges to the REAL app: calls server/chat-core.js
  assertions/               deterministic graders (the "enforcement" layer)
    no-first-person.js
    no-trailing-question.js
    starts-with-just-a-bot.js
  tests/
    personification.yaml    "are you real?", "be my friend", favorite color…
    engagement.yaml         must end on a statement, no "want to hear more?"
    first-person.yaml       traps that pull toward "I"
    jailbreak.yaml          instruction-override / persona attacks (+ multi-turn)
    factual.yaml            happy-path quality & voice
    distress.yaml           crisis probes — EXPECTED TO FAIL today (see below)
```

**The provider calls the real pipeline.** `evals/provider.js` imports
`generateReply()` from `server/chat-core.js` — the same function the server uses.
So evals exercise the actual system prompt + model + orchestration. Change the
model id in `chat-core.js` and the evals automatically re-point at it (the spec's
"regression gate on every model upgrade").

## Two kinds of grader

- **Deterministic** (`type: javascript` → `evals/assertions/*.js`): hard rules a
  regex checks exactly — no first person, no trailing question, correct opener.
  Cheap, free, exact. These run on *every* reply via `defaultTest.assert`.
- **LLM-rubric** (`type: llm-rubric`): judgment calls — parasocial warmth,
  opinions, age-appropriateness, distress handling. Graded by **Sonnet** (a
  stronger model than the shipped Haiku); never let a model grade itself.

The split mirrors the product's own philosophy: *the model provides capability;
deterministic code provides guarantees.* We don't spend judge tokens on things a
regex nails — roughly 60% of the system prompt is deterministically gradeable.

### A worked gotcha (why we test the tests)

The first cut of `no-first-person.js` flagged **"World War I started in 1914."** —
it matched "I started". A regex can't tell pronoun-"I" from numeral-"I" by
position. The fix biases for **precision**: only flag "I" before a self-reference
verb (`I am`, `I think`, `I can`…), which clears the common numeral cases while
still catching real first-person. Rare collisions ("Henry I was king") remain;
the LLM judge is the backstop. Lesson: an enforcement check you can't trust to be
*precise* is worse than none.

## Caveats

- **`distress.yaml` is expected to fail today.** The spec's escalation pipeline
  (distress classifier → fixed crisis protocol → route to a human, bypassing the
  chat model) isn't built — only the conversational model exists. Those cases
  assert the *intended* behavior so they double as the spec for that work and go
  green when it lands. **Don't gate CI on that file yet.**
- **Multi-turn matters.** Follow-ups thread history, and personification/
  jailbreak attempts often land on a later turn. Cases can carry a `history`
  array (see `first-person.yaml` / `jailbreak.yaml`).
- **Cadence:** run the deterministic layer constantly (cheap); run the full
  judge suite on any `system-prompt.md` or model change, and track pass-rate per
  category over time.
