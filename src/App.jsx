import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Thin chat UI for JUST A BOT. Minimal: white background, black text.
// No client-side safety logic — the frontend is just a window; everything
// that matters happens server-side.

export default function App() {
  const [messages, setMessages] = useState([]); // { role: "user"|"bot", text }
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function send(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const nextMessages = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const history = nextMessages.map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      const reply = data.reply ?? "This is just a bot — something went wrong. Try again.";
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "This is just a bot — the connection dropped. Try again." },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-6 py-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">JUST A BOT</h1>
        <p className="mt-2 text-muted-foreground">
          An AI encyclopedia for kids. NON-personal, NON-relational, NON-parasocial, NON-engagement-driven. Just clean answers.
        </p>
      </header>

      {messages.length > 0 && (
        <div className="mt-8 flex flex-1 flex-col gap-3">
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="self-end rounded-2xl bg-secondary px-4 py-2">
                {m.text}
              </div>
            ) : (
              <div key={i} className="prose-chat self-start">
                <ReactMarkdown>{m.text}</ReactMarkdown>
              </div>
            )
          )}
          {sending && <div className="self-start text-muted-foreground">…</div>}
          <div ref={endRef} />
        </div>
      )}

      <form onSubmit={send} className="mt-8 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a question"
          aria-label="Your question"
          autoComplete="off"
        />
        <Button type="submit" disabled={sending || !input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
