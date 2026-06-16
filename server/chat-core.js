import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";

// Core chat logic, shared by the local Express dev server (server/index.js)
// and the Vercel serverless function (api/chat.js). Framework-agnostic:
// takes { message, history, gradeLevel } and returns { status, body }.

const MODEL = "claude-haiku-4-5"; // fast + cheap, right for a kids' chat POC
const MAX_HISTORY = 20; // capped, in-memory only — no persistence
const MAX_TOKENS = 1024; // keep replies short and costs low
const DEFAULT_GRADE_LEVEL = "middle";

const GRADE_LEVEL_INSTRUCTIONS = {
  elementary:
    "Audience level: elementary school. Keep the answer lighter, simpler, and more playful. Use concrete examples, short sentences, and only a little markdown. Stay factual and do not make the answer babyish.",
  middle:
    "Audience level: middle school. Use the normal JUST A BOT style: clear, friendly, concise, and age-appropriate for a broad kid audience.",
  high:
    "Audience level: high school. Make the answer a bit more precise, dense, and complete. It may be slightly longer when useful, but should still be clear, concise, and approachable.",
};

function normalizeGradeLevel(gradeLevel) {
  return GRADE_LEVEL_INSTRUCTIONS[gradeLevel] ? gradeLevel : DEFAULT_GRADE_LEVEL;
}

// Short, human-readable reason for a failure. err.status is a numeric HTTP
// code (not a message), so map the common ones; fall back to the SDK error
// name, then message, for anything unmapped (incl. network errors with no status).
function describeError(err) {
  const byStatus = {
    400: "bad request",
    401: "invalid API key",
    403: "permission denied",
    404: "model not found",
    413: "request too large",
    429: "rate limited",
    500: "Anthropic server error",
    529: "Anthropic overloaded",
  };
  if (err?.status && byStatus[err.status]) return byStatus[err.status];
  if (err?.status) return `HTTP ${err.status}`;
  if (err?.name?.includes("Connection")) return "connection failed";
  // Unmapped (no HTTP status) — usually a config/runtime error like a missing
  // API key or a missing file. Surface code/message so it's self-diagnosing.
  if (err?.code) return String(err.code);
  if (err?.message) return String(err.message).slice(0, 140);
  return err?.name || "unknown error";
}

const borked = (reason) =>
  `Something is borked - failed to generate text. (Error: ${reason})`;

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
function loadSystemPrompt(gradeLevel) {
  const normalizedGradeLevel = normalizeGradeLevel(gradeLevel);

  return [
    {
      type: "text",
      text: readFileSync(PROMPT_PATH, "utf8"),
      cache_control: { type: "ephemeral" },
    },
    {
      type: "text",
      text: GRADE_LEVEL_INSTRUCTIONS[normalizedGradeLevel],
    },
  ];
}

export async function generateReply({ message, history, gradeLevel }) {
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
      system: loadSystemPrompt(gradeLevel),
      messages,
    });

    const reply = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    if (!reply) {
      return { status: 502, body: { reply: borked("empty response") } };
    }
    return { status: 200, body: { reply } };
  } catch (err) {
    console.error("chat error:", err?.status ?? "", err?.message ?? err);
    return { status: 502, body: { reply: borked(describeError(err)) } };
  }
}
