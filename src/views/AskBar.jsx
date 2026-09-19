// JUST A BOT — Ask bar
// The pill-shaped question field with a primary "Ask" button. Shared by the
// Home hero and the Answer view's follow-up prompt.

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/design-system";

export function AskBar({ placeholder = "What is a black hole?", onSubmit, autoFocus = false, disabled = false }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const wasDisabled = useRef(disabled);

  // Keep the cursor in the field so the next question can just be typed.
  // Two things take focus away, hence two places to put it back:
  //  - clicking "Ask" moves focus to the button (Enter alone never loses it)
  //  - the field disables while the reply is in flight, and a disabled input
  //    drops focus entirely, so it has to be restored when it re-enables
  // preventScroll matters because the bar is in a fixed dock: without it, the
  // browser can fight the scroll-the-new-question-to-the-top animation.
  useEffect(() => {
    if (wasDisabled.current && !disabled) {
      inputRef.current?.focus({ preventScroll: true });
    }
    wasDisabled.current = disabled;
  }, [disabled]);

  const submit = () => {
    if (disabled) return;
    const text = query.trim();
    if (text) {
      onSubmit(text);
      setQuery("");
      inputRef.current?.focus({ preventScroll: true });
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
        ref={inputRef}
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={query}
        disabled={disabled}
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
      <Button variant="primary" size="md" disabled={disabled} onClick={submit}>Ask</Button>
    </div>
  );
}
