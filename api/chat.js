import { generateReply } from "../server/chat-core.js";

// Vercel serverless function → POST /api/chat.
// Holds no logic of its own; delegates to the shared core. The API key comes
// from the ANTHROPIC_API_KEY environment variable set in the Vercel dashboard.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const { message, history, gradeLevel } = req.body ?? {};
  const { status, body } = await generateReply({ message, history, gradeLevel });
  res.status(status).json(body);
}
