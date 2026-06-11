White elevated container for answer blocks, topic tiles, and info panels.

```jsx
<Card padding="md">
  <h3>What is photosynthesis?</h3>
  <p>Plants make food from sunlight…</p>
</Card>

<Card interactive accent="green" onClick={() => navigate('/topic')}>
  <Badge color="green">Science</Badge>
  <h4>How do plants grow?</h4>
</Card>

<Card padding="lg" accent="blue">
  Bot answer content here
</Card>
```

Notable variants/props:
- `interactive`: adds hover lift + press scale — use for clickable tiles
- `accent`: colored 3px top bar in any brand color
- `padding`: none | sm (16px) | md (24px) | lg (32px)
- Cards use border + soft shadow; shadow deepens on hover when interactive
