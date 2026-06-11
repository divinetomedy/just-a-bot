Tappable suggestion pill for topic filters and related question prompts.

```jsx
<Chip onClick={() => setTopic('space')}>Space</Chip>
<Chip selected>Animals</Chip>
<Chip color="blue" size="sm">Science</Chip>

// Filter row:
{topics.map(t =>
  <Chip key={t} selected={active === t} onClick={() => setActive(t)}>{t}</Chip>
)}
```

Notable props:
- `selected`: filled blue state — use for active filter
- `color`: neutral (default) | blue (tinted default)
- `size`: sm | md | lg
- Press state: scale(0.96) — tactile feel
- Use for suggested questions, topic filters, quick replies
