// JUST A BOT — Answer View
// Renders the conversation thread: each question with its answer card, and a
// follow-up field at the bottom. Asking a follow-up scrolls the new question
// near the top of the screen, leaving the previous answer peeking above it.
//
// Answer text comes from the real /api/chat backend (threaded in App). The
// topic badge is a design element only — a lightweight client-side keyword
// guess, not backend-driven.

import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Badge, Card, LoadingDots } from "@/design-system";
import { AskBar } from "@/views/AskBar";

// Best-effort topic guess for the colored badge. Presentational only.
const TOPIC_RULES = [
  { match: ['photosynthesis', 'plant', 'chlorophyll', 'science'], topic: 'Science', color: 'green' },
  { match: ['black hole', 'space', 'star', 'planet', 'universe', 'galaxy'], topic: 'Space', color: 'purple' },
  { match: ['animal', 'whale', 'dog', 'cat', 'bird', 'fish'], topic: 'Animals', color: 'orange' },
  { match: ['war', 'history', 'ancient', 'empire', 'century'], topic: 'History', color: 'yellow' },
  { match: ['internet', 'computer', 'technology', 'wifi', 'software', 'robot'], topic: 'Technology', color: 'blue' },
  { match: ['earthquake', 'volcano', 'tectonic', 'earth', 'weather', 'climate'], topic: 'Earth', color: 'neutral' },
  { match: ['fibonacci', 'math', 'number', 'prime', 'geometry', 'pi'], topic: 'Math', color: 'pink' },
  { match: ['heart', 'body', 'lungs', 'blood', 'brain', 'bone'], topic: 'Body', color: 'orange' },
];

function guessTopic(query) {
  const q = query.toLowerCase();
  for (const rule of TOPIC_RULES) {
    if (rule.match.some(k => q.includes(k))) return { topic: rule.topic, color: rule.color };
  }
  return { topic: 'Knowledge', color: 'blue' };
}

export function AnswerView({ turns, onSearch }) {
  const lastQuestionRef = useRef(null);
  const anyLoading = turns.some(t => t.status === 'loading');

  // On a follow-up, bring the newest question near the top so the previous
  // answer just peeks in above it. The first question stays at the top.
  useEffect(() => {
    if (turns.length > 1 && lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [turns.length]);

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 24px 48px',
      gap: 0,
    }}>
      <div style={{ width: '100%', maxWidth: 600 }}>

        {turns.map((turn, i) => {
          const meta = guessTopic(turn.question);
          const isLast = i === turns.length - 1;
          const loading = turn.status === 'loading';
          const error = turn.status === 'error';

          // Reserve a near-viewport-height block for the newest follow-up so its
          // question can always scroll up to the top, even while the answer is
          // still loading and short.
          const reserve = isLast && i > 0;

          return (
            <div key={turn.id} style={reserve ? { minHeight: 'calc(100dvh - 120px)' } : undefined}>
              {/* Question heading. scrollMarginTop clears the sticky header
                  (~70px) and leaves ~50px of the previous answer peeking. */}
              <h2
                ref={isLast ? lastQuestionRef : null}
                style={{
                  scrollMarginTop: 120,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 'var(--leading-snug)',
                  marginTop: i === 0 ? 0 : 8,
                  marginBottom: 20,
                  letterSpacing: 'var(--tracking-snug)',
                }}
              >{turn.question}</h2>

              {/* Answer card */}
              <Card padding="lg" style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  {/* Bot avatar */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 'var(--radius-md)',
                    background: 'var(--color-green-400)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <img src="/logomark-white.svg" width="22" height="22" alt="bot" />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {loading
                      ? (
                        <div style={{ paddingTop: 6 }}>
                          <LoadingDots size="md" color="green" />
                        </div>
                      )
                      : (
                        <div style={{ animation: 'fadeIn 0.3s ease' }}>
                          {!error && (
                            <Badge color={meta.color} size="sm"
                              style={{ marginBottom: 12 }}>
                              {meta.topic}
                            </Badge>
                          )}
                          <div className="prose-chat" style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 'var(--text-body-size)',
                            lineHeight: 'var(--leading-relaxed)',
                            color: 'var(--color-text-primary)',
                          }}>
                            <ReactMarkdown>{turn.answer}</ReactMarkdown>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </Card>
            </div>
          );
        })}

        {/* Follow-up question — builds on the conversation above. */}
        {!anyLoading && (
          <div style={{ animation: 'fadeIn 0.4s ease 0.1s both' }}>
            <AskBar placeholder="Tell me more" onSubmit={onSearch} />
          </div>
        )}
      </div>
    </div>
  );
}
