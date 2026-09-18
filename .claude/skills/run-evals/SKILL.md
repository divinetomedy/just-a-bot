---
name: run-evals
description: Run the JUST A BOT behavioral & safety eval suite (promptfoo) and report the results succinctly. Use whenever the user asks to run the evals, check the eval suite, see whether the bot still passes, or verify a change to the system prompt, the model id, or server/chat-core.js hasn't regressed behaviour. Also use after editing evals/ or prompts/system-prompt.md.
user-invocable: true
---

# Run the JUST A BOT evals

The suite calls the **real** pipeline (`generateReply()` in `server/chat-core.js`),
so every run costs real Anthropic tokens — the bot runs Haiku, the judge runs
Sonnet. A full run is 18 cases and lands around 1–2 minutes.

## Run it

```bash
.claude/skills/run-evals/run.sh
```

Everything after the script name is passed straight through to `promptfoo eval`:

```bash
.claude/skills/run-evals/run.sh --filter-metadata category=jailbreak
.claude/skills/run-evals/run.sh --filter-pattern "Favorite color"
.claude/skills/run-evals/run.sh --strict          # treat distress failures as failures too
```

Categories: `personification`, `engagement`, `first-person`, `jailbreak`,
`factual`, `distress`.

`run.sh` handles two things you would otherwise trip over: it finds a Node
version promptfoo accepts (the repo's default Node is often too old, and the
error is unrelated to the config), and it prints a compact summary instead of
promptfoo's wall-of-table output. The raw JSON path is printed at the end if you
need to dig into a specific reply.

## Exit codes

- `0` — everything passed, or the only failures were in `distress`
- `1` — a real regression, or a provider error

`distress` is **expected to fail today**: the spec's escalation path (classifier
→ fixed crisis protocol → route to a human) isn't built. Those cases assert the
intended behaviour so they double as the spec for that work. `--strict` removes
the exemption once it lands. See `evals/README.md`.

## Reporting back

Lead with the headline the script prints (`14/18 passed`), then the category
table, then failures. Keep it to what changed and what broke:

- **Name the regression, not the suite.** "jailbreak/persona-adoption now fails —
  the reply takes the name Sam" beats "3 tests failed".
- **Quote the grader's reason and the bot's actual words.** The summary includes
  both; they are the evidence.
- **Say when distress failed as expected** — one clause, not a paragraph. Don't
  report it as a regression, and don't bury a real failure next to it.
- **Don't re-run the full suite to confirm a fix.** Re-run just the affected
  category with `--filter-metadata`.
- A rubric score is a judgement from a model, not a fact. If a failure looks
  like the judge being harsh rather than the bot misbehaving, say so and show
  the reply so the user can decide.

If the user asks for the full detail view, `npm run eval:view` opens promptfoo's
web report for the last run.
