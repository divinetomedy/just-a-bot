// JUST A BOT — Home View
// Hero search screen with topic suggestions

import React from "react";
import { Chip } from "@/design-system";
import { AskBar } from "@/views/AskBar";

const TOPICS = [
  { label: 'Science',    color: 'green',  query: 'How does photosynthesis work?' },
  { label: 'Space',      color: 'purple', query: 'What is a black hole?' },
  { label: 'Animals',    color: 'orange', query: 'What is the largest animal on Earth?' },
  { label: 'History',    color: 'yellow', query: 'What caused World War I?' },
  { label: 'Technology', color: 'blue',   query: 'How does the internet work?' },
  { label: 'Earth',      color: 'neutral', query: 'Why do earthquakes happen?' },
  { label: 'Math',       color: 'pink',   query: 'What is the Fibonacci sequence?' },
  { label: 'Body',       color: 'orange', query: 'How does the heart work?' },
];

export function HomeView({ onSearch }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 24px 48px',
      gap: 0,
    }}>

      {/* Bot icon */}
      <img src="/logomark.svg" width="64" height="64"
        style={{ marginBottom: 20 }} alt="Just A Bot" />

      {/* Headline */}
      <h1 style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-4xl)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--color-text-primary)',
        letterSpacing: 'var(--tracking-tight)',
        lineHeight: 'var(--leading-tight)',
        textAlign: 'center',
        marginBottom: 10,
      }}>Ask anything.</h1>

      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-lg)',
        color: 'var(--color-text-secondary)',
        textAlign: 'center',
        marginBottom: 36,
        lineHeight: 'var(--leading-normal)',
      }}>An AI encyclopedia for kids. Totally de-humanized. Takes the “I” out of AI.</p>

      {/* Search bar */}
      <div style={{ width: '100%', maxWidth: 480, marginBottom: 28 }}>
        <AskBar placeholder="What is a black hole?" autoFocus onSubmit={onSearch} />
      </div>

      {/* Topic chips */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'center',
        maxWidth: 520,
      }}>
        {TOPICS.map(t => (
          <Chip key={t.label} color="neutral"
            onClick={() => onSearch(t.query)}>
            {t.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
