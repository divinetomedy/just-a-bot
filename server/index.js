import "dotenv/config";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";

// JUST A BOT backend.
// Single /chat endpoint that orchestrates the (eventual) pipeline. As of
// step 2 it calls the real conversational model. The anti-parasocial guard
// (step 4) and probe suite (step 5) layer on top of this.

const app = express();
app.use(cors());
app.use(express.json({ limit: "32kb" }));

const PORT = process.env.PORT || 3001;
const MODEL = "claude-haiku-4-5"; // fast + cheap, right for a kids' chat POC
const MAX_HISTORY = 20; // capped, in-memory only — no persistence
const MAX_TOKENS = 1024; // keep replies short and costs low

const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY from env

// The system prompt lives in its own file so it can be versioned and reviewed
// independently of code. It's re-read on every request so prompt edits take
// effect on the next query with no restart — convenient while iterating.
// (At real traffic you'd cache this and reload on a file-watch instead.)
const __dirname = dirname(fileURLToPath(import.meta.url));
const PROMPT_PATH = join(__dirname, "system-prompt.md");

function loadSystemPrompt() {
  return [
    {
      type: "text",
      text: readFileSync(PROMPT_PATH, "utf8"),
      cache_control: { type: "ephemeral" },
    },
  ];
}

const SAFE_FALLBACK = "This is just a bot — that one didn't work. Try asking again.";

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/chat", async (req, res) => {
  const { message, history } = req.body ?? {};

  if (typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({ error: "message is required" });
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
    const response = await anthropic.messages.create({
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

    res.json({ reply: reply || SAFE_FALLBACK });
  } catch (err) {
    console.error("chat error:", err?.status ?? "", err?.message ?? err);
    res.status(502).json({ reply: SAFE_FALLBACK });
  }
});

app.listen(PORT, () => {
  console.log(`JUST A BOT backend listening on http://localhost:${PORT}`);
});
