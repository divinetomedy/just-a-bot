import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";

// Core chat logic, shared by the local Express dev server (server/index.js)
// and the Vercel serverless function (api/chat.js). Framework-agnostic:
// takes { message, history } and returns { status, body }.

const MODEL = "claude-haiku-4-5"; // fast + cheap, right for a kids' chat POC
const MAX_HISTORY = 20; // capped, in-memory only — no persistence
const MAX_TOKENS = 1024; // keep replies short and costs low

const SAFE_FALLBACK =
  "This is just a bot — that one didn't work. Try asking again.";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROMPT_PATH = join(__dirname, "system-prompt.md");

// Lazy singleton so the API key (from env) is read at call time, not import
// time — robust to dotenv ordering locally and to serverless cold starts.
let client;
function getClient() {
  if (!client) client = new Anthropic(); // reads ANTHROPIC_API_KEY from env
  return client;
}

// Re-read on every request so prompt edits take effect immediately while
// iterating. The file is bundled with the function on Vercel (see vercel.json).
function loadSystemPrompt() {
  return [
    {
      type: "text",
      text: readFileSync(PROMPT_PATH, "utf8"),
      cache_control: { type: "ephemeral" },
    },
  ];
}

export async function generateReply({ message, history }) {
  if (typeof message !== "string" || message.trim() === "") {
    return { status: 400, body: { error: "message is required" } };
  }

  // The frontend sends the full conversation (including the latest user turn)
  // as `history`. Cap it, and make sure it starts on a user turn.
  let messages = Array.isArray(history)
    ? history
        .filter((m) => m && typeof m.content === "string" && m.content.trim())
        .map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        }))
        .slice(-MAX_HISTORY)
    : [{ role: "user", content: message }];

  while (messages.length && messages[0].role !== "user") messages.shift();
  if (messages.length === 0) messages = [{ role: "user", content: message }];

  try {
    const response = await getClient().messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: loadSystemPrompt(),
      messages,
    });

    const reply = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    return { status: 200, body: { reply: reply || SAFE_FALLBACK } };
  } catch (err) {
    console.error("chat error:", err?.status ?? "", err?.message ?? err);
    return { status: 502, body: { reply: SAFE_FALLBACK } };
  }
}
