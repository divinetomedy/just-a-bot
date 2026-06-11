import { useState } from "react";
import { HomeView } from "@/views/HomeView";
import { AnswerView } from "@/views/AnswerView";

// JUST A BOT — app shell.
// A non-personal AI encyclopedia for kids. Home (ask) → Answer (read) → Back.
// All safety logic lives server-side; the frontend is just a window.

export default function App() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("home");

  const handleSearch = (q) => {
    setQuery(q);
    setView("answer");
  };

  const handleBack = () => {
    setView("home");
    setQuery("");
  };

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
          <HomeView onSearch={handleSearch} />
        ) : (
          <AnswerView query={query} onBack={handleBack} onSearch={handleSearch} />
        )}
      </main>
    </div>
  );
}
