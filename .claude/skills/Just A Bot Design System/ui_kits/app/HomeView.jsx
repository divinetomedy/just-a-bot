// JUST A BOT — Home View
// Hero search screen with topic suggestions

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

function HomeView({ onSearch }) {
  const { Input, Chip, Button } = window.JustABotDesignSystem_d87885;
  const [query, setQuery] = React.useState('');

  const submit = (q) => {
    const text = (q || query).trim();
    if (text) onSearch(text);
  };

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
      <img src="../../assets/logomark.svg" width="64" height="64"
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
      }}>Clean answers. No fluff. No follows.</p>

      {/* Search bar */}
      <div style={{ width: '100%', maxWidth: 480, marginBottom: 28 }}>
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
        }}
          onFocus={() => {}}
        >
          <input
            autoFocus
            placeholder="What is a black hole?"
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
          <Button variant="primary" size="md" onClick={() => submit()}>Ask</Button>
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
          <Chip key={t.label} color={t.color === 'neutral' ? 'neutral' : 'neutral'}
            onClick={() => submit(t.query)}>
            {t.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { HomeView });
