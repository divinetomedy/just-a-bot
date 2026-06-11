// JUST A BOT — Answer View
// Displays bot answer with loading state and related questions

const QA_DB = [
  {
    keywords: ['photosynthesis', 'plants make food', 'plants food'],
    topic: 'Science', topicColor: 'green',
    answer: 'Photosynthesis is how plants make their own food. They absorb sunlight through a green pigment called chlorophyll, then combine it with water from the soil and carbon dioxide from the air to produce glucose. Oxygen is released as a byproduct — which is why plants help keep air breathable.',
    related: ['What is chlorophyll?', 'Why are leaves green?', 'What is cellular respiration?'],
  },
  {
    keywords: ['black hole', 'blackhole'],
    topic: 'Space', topicColor: 'purple',
    answer: 'A black hole is a region in space where gravity is so intense that nothing — not even light — can escape. They form when a massive star collapses under its own weight at the end of its life. The boundary around a black hole is called the event horizon: once you cross it, there is no way back.',
    related: ['What is a neutron star?', 'What is a supernova?', 'How big is the universe?'],
  },
  {
    keywords: ['largest animal', 'biggest animal', 'blue whale'],
    topic: 'Animals', topicColor: 'orange',
    answer: 'The blue whale is the largest animal ever known to have existed on Earth. They can grow up to 30 metres long — roughly the length of three school buses — and weigh as much as 200 tonnes. Despite their enormous size, blue whales feed almost entirely on tiny shrimp-like creatures called krill.',
    related: ['How do whales breathe?', 'What is the smallest animal?', 'How long do whales live?'],
  },
  {
    keywords: ['world war', 'ww1', 'wwi', 'first world war', 'world war 1', 'world war one'],
    topic: 'History', topicColor: 'yellow',
    answer: 'World War I began in 1914 and was triggered by the assassination of Archduke Franz Ferdinand of Austria-Hungary. Tensions had been building in Europe for years due to rival alliances, competing empires, and an arms race. The war involved most of the world\'s major powers and lasted until 1918, resulting in over 17 million deaths.',
    related: ['What was the Treaty of Versailles?', 'What caused World War II?', 'Who were the Allied Powers?'],
  },
  {
    keywords: ['internet', 'how internet works', 'internet work'],
    topic: 'Technology', topicColor: 'blue',
    answer: 'The internet is a global network of computers that communicate using standardised rules called protocols. When you send a message or load a website, your data is broken into small packets, each routed through a series of connected computers and cables (and sometimes satellites) until they reach their destination and are reassembled.',
    related: ['What is Wi-Fi?', 'How does a web browser work?', 'What is an IP address?'],
  },
  {
    keywords: ['earthquake', 'earthquakes', 'tectonic'],
    topic: 'Earth', topicColor: 'neutral',
    answer: 'Earthquakes happen when pieces of Earth\'s outer shell — called tectonic plates — suddenly shift or slip against each other. The point underground where the rupture begins is the focus; the point directly above it on the surface is the epicentre. Energy radiates outward as seismic waves, shaking the ground.',
    related: ['What is a tectonic plate?', 'What causes volcanoes?', 'What is the Richter scale?'],
  },
  {
    keywords: ['fibonacci', 'fibonacci sequence'],
    topic: 'Math', topicColor: 'pink',
    answer: 'The Fibonacci sequence is a series of numbers where each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34… It appears surprisingly often in nature — in the spiral arrangement of sunflower seeds, pine cones, and the shells of nautiluses. The ratio between consecutive terms approaches the golden ratio (≈ 1.618).',
    related: ['What is the golden ratio?', 'What is a prime number?', 'What is pi?'],
  },
  {
    keywords: ['heart', 'how heart works', 'heart work'],
    topic: 'Biology', topicColor: 'orange',
    answer: 'The heart is a muscular pump that circulates blood around your body. It has four chambers: two atria that receive blood, and two ventricles that pump it out. The right side sends oxygen-poor blood to the lungs; the left side pumps oxygen-rich blood to the rest of the body. A healthy heart beats about 60–100 times per minute.',
    related: ['What are arteries and veins?', 'What is blood made of?', 'How do lungs work?'],
  },
];

const FALLBACK = {
  topic: 'Knowledge', topicColor: 'blue',
  answer: (q) => `"${q}" is a great question. While this is a simplified demo, the real Just A Bot would provide a clear, factual, age-appropriate answer drawn from encyclopedic sources — no ads, no engagement loops, just the answer.`,
  related: ['Try: What is photosynthesis?', 'Try: What is a black hole?', 'Try: How does the internet work?'],
};

function findAnswer(query) {
  const q = query.toLowerCase();
  for (const item of QA_DB) {
    if (item.keywords.some(k => q.includes(k))) return item;
  }
  return { ...FALLBACK, answer: FALLBACK.answer(query) };
}

function AnswerView({ query, onBack, onSearch }) {
  const { Badge, Chip, Card, LoadingDots } = window.JustABotDesignSystem_d87885;
  const [loading, setLoading] = React.useState(true);
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    setResult(null);
    const t = setTimeout(() => {
      setResult(findAnswer(query));
      setLoading(false);
    }, 1400);
    return () => clearTimeout(t);
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
              <img src="../../assets/logomark-white.svg" width="22" height="22" alt="bot" />
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
                    {result && (
                      <Badge color={result.topicColor} size="sm"
                        style={{ marginBottom: 12 }}>
                        {result.topic}
                      </Badge>
                    )}
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-body-size)',
                      lineHeight: 'var(--leading-relaxed)',
                      color: 'var(--color-text-primary)',
                      margin: 0,
                    }}>
                      {result?.answer}
                    </p>
                  </div>
                )
              }
            </div>
          </div>
        </Card>

        {/* Related questions */}
        {!loading && result && (
          <div style={{ animation: 'fadeIn 0.4s ease 0.1s both' }}>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-widest)',
              marginBottom: 10,
            }}>Keep exploring</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {result.related.map(q => (
                <Chip key={q} onClick={() => onSearch(q)}>{q}</Chip>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { AnswerView });
