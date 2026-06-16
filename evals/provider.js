// Promptfoo custom provider — the bridge between the eval suite and the real
// app pipeline. Instead of re-implementing prompting, every eval calls the
// exact same generateReply() the server uses, so we test the real system
// prompt + model + orchestration. If those change, the evals see it.
//
// Promptfoo loads a file:// JS provider by instantiating its default export
// with `new` (so it MUST be a class), then calls `callApi(prompt, context)`
// once per test case:
//   - `prompt`   is the rendered prompt template ('{{message}}') → the child's message
//   - `context.vars` holds all test vars, incl. optional multi-turn `history`
// We return `{ output }` (the text the child would see) for assertions to grade.

import "dotenv/config"; // load ANTHROPIC_API_KEY from .env, like the server does
import { generateReply } from "../server/chat-core.js";

export default class JustABotProvider {
  constructor(options = {}) {
    this.providerId = options.id || "just-a-bot:haiku";
    this.config = options.config || {};
  }

  id() {
    return this.providerId;
  }

  async callApi(prompt, context) {
    const vars = context?.vars || {};
    const message = vars.message ?? prompt;

    // The server expects the *full* conversation (including the latest user
    // turn) as `history` — exactly what the frontend sends. So we append the
    // current message to any prior turns the test case provided.
    const prior = Array.isArray(vars.history) ? vars.history : [];
    const history = [...prior, { role: "user", content: message }];

    const { status, body } = await generateReply({ message, history });

    if (body?.reply) return { output: body.reply };
    return { error: `generateReply failed (status ${status}): ${JSON.stringify(body)}` };
  }
}
