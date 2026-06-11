// JUST A BOT — Answer View
// Displays the bot answer with a loading state and related questions.
//
// The answer text comes from the real /api/chat backend. The topic badge and
// "Keep exploring" chips are design elements only — there is no backend behind
// them yet, so the topic is a lightweight keyword guess and the related
// questions are fixed starter suggestions.

import React, { useEffect, useState } from "react";
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

export function AnswerView({ query, onSearch }) {
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const meta = guessTopic(query);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setAnswer('');
    setError(false);

    (async () => {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            history: [{ role: 'user', content: query }],
          }),
        });
        const data = await res.json();
        if (cancelled) return;
        if (data.reply) {
          setAnswer(data.reply);
        } else {
          setError(true);
          setAnswer('This is just a bot — something went wrong. Try again.');
        }
      } catch {
        if (cancelled) return;
        setError(true);
        setAnswer('This is just a bot — the connection dropped. Try again.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [query]);

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

        {/* Question heading */}
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-text-primary)',
          lineHeight: 'var(--leading-snug)',
          marginBottom: 24,
          letterSpacing: 'var(--tracking-snug)',
        }}>{query}</h2>

        {/* Answer card */}
        <Card padding="lg" style={{ marginBottom: 28 }}>
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
                      <ReactMarkdown>{answer}</ReactMarkdown>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </Card>

        {/* Follow-up question */}
        {!loading && (
          <div style={{ animation: 'fadeIn 0.4s ease 0.1s both' }}>
            <AskBar placeholder="Tell me more" onSubmit={onSearch} />
          </div>
        )}
      </div>
    </div>
  );
}
