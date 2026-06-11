Text field for search queries, question input, and form fields.

```jsx
<Input placeholder="Ask me anything…" size="lg" />

<Input
  label="Your question"
  placeholder="How do volcanoes form?"
  prefix={<SearchIcon size={16} />}
  hint="Type any science question"
/>

<Input
  label="Topic"
  error="Please enter a valid topic"
  value={topic}
  onChange={e => setTopic(e.target.value)}
/>
```

Notable variants/props:
- `prefix` / `suffix`: icons or nodes flanking the input text
- `error`: turns border red, replaces hint with error text
- `size`: sm (36px) | md (44px) | lg (54px)
- Focus ring uses brand blue, smooth 200ms transition
