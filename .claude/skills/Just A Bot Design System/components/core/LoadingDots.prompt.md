Three-dot bounce animation shown while the bot is thinking / generating.

```jsx
<LoadingDots />
<LoadingDots size="lg" color="purple" />
<LoadingDots size="sm" color="neutral" />

// Inside an answer card:
{isLoading
  ? <LoadingDots size="md" color="blue" />
  : <p>{answer}</p>
}
```

Notable props:
- `size`: sm (6px) | md (8px) | lg (11px)
- `color`: blue | green | purple | neutral | white | current
- Animates with a staggered bounce; each dot offset by 200ms
- role="status" aria-label="Loading" for accessibility
