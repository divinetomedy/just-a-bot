// JUST A BOT — Ask bar
// The pill-shaped question field with a primary "Ask" button. Shared by the
// Home hero and the Answer view's follow-up prompt.

import React, { useState } from "react";
import { Button } from "@/design-system";

export function AskBar({ placeholder = "What is a black hole?", onSubmit, autoFocus = false }) {
  const [query, setQuery] = useState("");

  const submit = () => {
    const text = query.trim();
    if (text) {
      onSubmit(text);
      setQuery("");
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: 'var(--color-surface)',
      border: '2px solid var(--color-border)',
      borderRadius: 'var(--radius-full)',
      padding: '6px 6px 6px 20px',
      boxShadow: 'var(--shadow-md)',
      transition: 'border-color var(--transition-fast)',
      gap: 8,
    }}>
      <input
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-primary)',
          background: 'transparent',
          minWidth: 0,
        }}
      />
      <Button variant="primary" size="md" onClick={submit}>Ask</Button>
    </div>
  );
}
