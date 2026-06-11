import { useEffect, useRef, useState } from "react";
import { HomeView } from "@/views/HomeView";
import { AnswerView } from "@/views/AnswerView";

// JUST A BOT — app shell.
// A non-personal AI encyclopedia for kids. Home (ask) → Answer thread.
// Follow-ups build on the conversation; all safety logic lives server-side.

export default function App() {
  // turn = { id, question, answer, status: 'loading' | 'done' | 'error' }
  const [turns, setTurns] = useState([]);
  const turnsRef = useRef([]);
  const idRef = useRef(0);

  useEffect(() => { turnsRef.current = turns; }, [turns]);

  const view = turns.length > 0 ? "answer" : "home";

  // Ask a question. `base` is the conversation it builds on — [] starts fresh,
  // the current thread for a follow-up.
  async function ask(question, base) {
    const id = ++idRef.current;
    setTurns([...base, { id, question, answer: "", status: "loading" }]);

    // The server wants the whole conversation (incl. this turn) as `history`.
    const history = [];
    for (const t of base) {
      history.push({ role: "user", content: t.question });
      if (t.status === "done" && t.answer) {
        history.push({ role: "assistant", content: t.answer });
      }
    }
    history.push({ role: "user", content: question });

    let patch;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      });
      const data = await res.json();
      patch = data.reply
        ? { answer: data.reply, status: "done" }
        : { answer: "This is just a bot — something went wrong. Try again.", status: "error" };
    } catch {
      patch = { answer: "This is just a bot — the connection dropped. Try again.", status: "error" };
    }
    setTurns((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  const startConversation = (q) => ask(q, []);
  const followUp = (q) => ask(q, turnsRef.current);
  const handleBack = () => setTurns([]);

  return (
    <div className="app-shell">
      <header className="app-header">
        {view === "answer" ? (
          <button className="back-btn" onClick={handleBack}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        ) : (
          <span />
        )}

        <div className="header-logo">
          <img src="/logomark.svg" width="24" height="24" alt="" />
          <span className="header-logo-text">JUST A BOT</span>
        </div>
      </header>

      <main className="app-body">
        {view === "home" ? (
          <HomeView onSearch={startConversation} />
        ) : (
          <AnswerView turns={turns} onSearch={followUp} />
        )}
      </main>
    </div>
  );
}
