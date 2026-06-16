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

const GRADE_LEVEL_OPTIONS = [
  { value: 'elementary', label: 'Elementary School' },
  { value: 'middle', label: 'Middle School' },
  { value: 'high', label: 'High School' },
];

function GradeLevelControl({ value, onChange }) {
  const selectedIndex = GRADE_LEVEL_OPTIONS.findIndex((option) => option.value === value);
  const safeIndex = selectedIndex === -1 ? 1 : selectedIndex;
  const selected = GRADE_LEVEL_OPTIONS[safeIndex];

  return (
    <div
      aria-label="Answer level"
      style={{
        width: '60%',
        minWidth: 220,
        maxWidth: 300,
        margin: '0 auto',
      }}
    >
      <style>{`
        .grade-level-slider {
          appearance: none;
          -webkit-appearance: none;
          background: transparent;
        }

        .grade-level-slider::-webkit-slider-runnable-track {
          height: 3px;
          background: var(--color-neutral-200);
          border-radius: var(--radius-full);
        }

        .grade-level-slider::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -5.5px;
          border: 2px solid var(--color-neutral-300);
          border-radius: var(--radius-full);
          background: var(--color-surface);
          box-shadow: var(--shadow-sm);
        }

        .grade-level-slider::-moz-range-track {
          height: 3px;
          background: var(--color-neutral-200);
          border-radius: var(--radius-full);
        }

        .grade-level-slider::-moz-range-progress {
          height: 3px;
          background: var(--color-neutral-200);
          border-radius: var(--radius-full);
        }

        .grade-level-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid var(--color-neutral-300);
          border-radius: var(--radius-full);
          background: var(--color-surface);
          box-shadow: var(--shadow-sm);
        }
      `}</style>
      <input
        className="grade-level-slider"
        type="range"
        min="0"
        max="2"
        step="1"
        value={safeIndex}
        aria-label="Answer level"
        aria-valuetext={selected.label}
        onChange={(event) => onChange(GRADE_LEVEL_OPTIONS[Number(event.target.value)].value)}
        style={{
          width: '100%',
          cursor: 'pointer',
        }}
      />
      <div
        style={{
          position: 'relative',
          height: 32,
          marginTop: 6,
        }}
      >
        {GRADE_LEVEL_OPTIONS.map((option, index) => {
          const isSelected = index === safeIndex;
          const stopPosition = `${index * 50}%`;
          return (
            <span
              key={option.value}
              aria-current={isSelected ? 'true' : undefined}
              style={{
                position: 'absolute',
                left: stopPosition,
                top: 0,
                width: 96,
                transform: 'translateX(-50%)',
                color: isSelected ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: isSelected ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                lineHeight: 'var(--leading-tight)',
                textAlign: 'center',
                whiteSpace: 'pre-line',
              }}
            >
              {option.label.replace(' ', '\n')}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function HomeView({ gradeLevel, onGradeLevelChange, onSearch }) {
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
      <div style={{ width: '100%', maxWidth: 480, marginBottom: 36 }}>
        <AskBar placeholder="What is a black hole?" autoFocus onSubmit={onSearch} />
        <div style={{ marginTop: 16 }}>
          <GradeLevelControl value={gradeLevel} onChange={onGradeLevelChange} />
        </div>
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
