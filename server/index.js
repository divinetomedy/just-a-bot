import "dotenv/config";
import express from "express";
import cors from "cors";
import { generateReply } from "./chat-core.js";

// Local dev server only. In production the same logic runs as a Vercel
// serverless function (api/chat.js) — both call the shared chat-core.
// The route path matches production: /api/chat.

const app = express();
app.use(cors());
app.use(express.json({ limit: "32kb" }));

const PORT = process.env.PORT || 3001;

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/chat", async (req, res) => {
  const { message, history, gradeLevel } = req.body ?? {};
  const { status, body } = await generateReply({ message, history, gradeLevel });
  res.status(status).json(body);
});

app.listen(PORT, () => {
  console.log(`JUST A BOT dev backend listening on http://localhost:${PORT}`);
});
