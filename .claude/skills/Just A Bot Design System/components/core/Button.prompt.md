Rounded pill button for all primary, secondary, and ghost actions.

```jsx
<Button variant="primary" size="md">Ask anything</Button>
<Button variant="secondary" iconLeading={<SearchIcon />}>Search topics</Button>
<Button variant="ghost" size="sm">Cancel</Button>
<Button variant="outline">Learn more</Button>
<Button variant="primary" loading>Thinking…</Button>
<Button variant="primary" iconOnly iconLeading={<PlusIcon />} />
```

Notable variants/props:
- `variant`: primary (blue filled) | secondary (blue tint) | ghost (transparent) | outline (border) | danger (red)
- `size`: sm (32px) | md (40px) | lg (52px)
- `loading`: shows spinner, disables click
- `iconOnly`: square padding for icon-only buttons
- Press state: scale(0.96) — tactile feel
- All buttons are pill-shaped (border-radius: full)
