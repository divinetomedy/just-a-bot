Animated toggle for binary settings and preferences.

```jsx
const [on, setOn] = React.useState(false);
<Switch checked={on} onChange={setOn} label="Show related questions" />
<Switch checked={true} size="sm" label="Simple language" />
<Switch checked={false} disabled label="Offline mode" />
```

Notable props:
- `checked` + `onChange`: fully controlled
- `label`: optional text to the right
- `size`: sm | md | lg
- Thumb animates with a spring bounce; track glows blue when on
