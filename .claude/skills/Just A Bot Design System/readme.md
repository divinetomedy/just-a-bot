# JUST A BOT — Design System

> **AI encyclopedia for kids. Clean answers. No fluff. No follows.**

JUST A BOT is a non-personal, non-relational, non-parasocial, non-engagement-driven information product for children. It gives clean, factual answers to questions — and nothing else. No streaks, no notifications, no personality. Just a bot.

---

## Sources

This design system was built from scratch based on the product brief. No external codebase or Figma file was provided.

- **Brief**: Internal product description (no URL)
- **Font**: Space Grotesk + Space Mono via Google Fonts CDN (`fonts.googleapis.com`)
- **Icons**: No external icon system — components use inline SVG or accept icon nodes as props

---

## Project Structure

```
/
├── styles.css              ← Entry point — @import list only
├── tokens/
│   ├── fonts.css           ← Google Fonts imports + @font-face
│   ├── colors.css          ← Brand palette + neutrals + semantic aliases
│   ├── typography.css      ← Font families, weights, scale, semantic roles
│   ├── spacing.css         ← 4px-based spacing scale + layout widths
│   └── effects.css         ← Radii, shadows, transitions, z-index, opacity
├── assets/
│   ├── logo.svg            ← Full wordmark (logomark + "JUST A BOT")
│   ├── logo-white.svg      ← White version for dark/blue backgrounds
│   ├── logomark.svg        ← Bot icon only (blue)
│   └── logomark-white.svg  ← Bot icon only (white)
├── components/
│   └── core/               ← All UI primitives
│       ├── Button           ← Primary action (5 variants, 3 sizes, loading)
│       ├── Badge            ← Status/topic pill (10 colors, 3 sizes, dot)
│       ├── Chip             ← Interactive filter/suggestion pill
│       ├── Card             ← Elevated content container (accent bar, interactive)
│       ├── Input            ← Text field (label, hint, error, prefix, suffix)
│       ├── Switch           ← On/off toggle (3 sizes, spring animation)
│       └── LoadingDots      ← Three-dot bounce indicator (AI thinking state)
├── guidelines/             ← @dsCard specimen pages
│   ├── colors-*.card.html
│   ├── type-*.card.html
│   ├── spacing-*.card.html
│   └── brand-*.card.html
├── ui_kits/
│   └── app/                ← Interactive app prototype
│       ├── index.html      ← Mounted in phone shell, fully interactive
│       ├── HomeView.jsx    ← Hero + search + topic chips
│       └── AnswerView.jsx  ← Bot answer card + related questions
├── readme.md               ← This file
└── SKILL.md                ← Agent skill definition
```

---

## Content Fundamentals

JUST A BOT writes like an encyclopedia, not a friend.

**Voice**: Direct, factual, plain. No hedging, no hype, no cheerleading.

**Tone**: Calm and confident. Curious but not excitable.

**Person**: Third person for facts. Second person only for direct instructions.

**Casing**: Sentence case everywhere. No title case in body text. ALL CAPS only for the product name: "JUST A BOT".

**Emoji**: None. The product is intentionally emoji-free.

**Punctuation**: Standard. No ellipsis to create suspense. No exclamation marks in answers.

**Length**: As short as it can be while still being complete. No padding sentences.

**Reading level**: Aim for grade 5–7 (age 10–13) as a baseline. Avoid jargon without defining it.

| ✗ Don't | ✓ Do |
|---|---|
| "Wow, great question! Let me help you discover…" | "Photosynthesis is how plants make food using sunlight." |
| "You're so smart for asking! Come back tomorrow! ⭐" | "The blue whale is the largest animal on Earth." |
| "Hmm, I'm not sure! Maybe ask a grown-up? 😊" | "Scientists don't yet fully understand dark matter." |

---

## Visual Foundations

### Colors
- **Primary**: Mint green (`#00C87B` / `--color-green-400`) — the hero color. Appears on primary buttons, interactive highlights, focus rings, and glow shadows.
- **Brand palette**: Six saturated brand colors — Blue, Green, Orange, Yellow, Purple, Pink. Each has a full 50–900 ramp. Used for topic badges, category chips, and card accents.
- **Neutrals**: Cool, slightly blue-tinted grays (12 steps, 0–950). The blue tint makes neutrals feel coherent with the brand rather than flat.
- **Background**: `--color-bg` = `#F4F6FC` — a near-white with a hint of sky blue. Cards sit on white (`--color-surface`) against this.

### Typography
- **Space Grotesk** for all UI text. Geometric, slightly rounded, technically confident — the right balance of playful and precise.
- **Space Mono** for code, formulas, and data values only.
- **Weights used**: Bold (700) for headings; Semibold (600) for labels, buttons; Regular (400) for body text.
- **Letter spacing**: Tight (`-0.015em`) on headings; wide (`+0.02em`) on labels/badges.
- **Line height**: Tight (1.2) for display/headings; relaxed (1.65) for body text.

### Spacing
- **4px base unit** — all spacing is a multiple of 4.
- Common values: `--space-4` (16px) as default component padding; `--space-6` (24px) for card padding; `--space-8` (32px) for section gaps.

### Backgrounds
- No full-bleed imagery. No gradients. No textures or patterns.
- White cards on a slightly tinted background is the canonical surface pattern.
- Color appears through badges, chips, and card accent bars — not backgrounds.

### Corner Radii
- **Bubbly by default**: Buttons and badges are fully pill-shaped (`--radius-full`).
- Cards use `--radius-xl` (20px) or `--radius-2xl` (28px) for a friendly, rounded feel.
- Inputs use `--radius-md` (12px) — noticeably rounded but not pill.

### Shadows
- Soft, slightly blue-tinted shadows at every level (xs → 2xl).
- **Colored glow shadows** for primary interactive elements (buttons, switches): `--shadow-glow-green`, `--shadow-glow-purple`, etc. Creates a tactile, "lit" feel.
- Cards rest on `--shadow-sm`; elevated overlays on `--shadow-xl`.

### Animation & Motion
- **Spring easing** (`cubic-bezier(0.16, 1, 0.3, 1)`) as the default — fast in, gently settles.
- **Bounce easing** (`cubic-bezier(0.34, 1.56, 0.64, 1)`) for switch thumbs and selected-state transitions — a small overshoot adds tactile delight.
- Durations: 150ms (hover/focus), 200ms (interactive), 300ms (panel open).
- No infinite decorative loops. No parallax. No auto-playing anything.

### Hover States
- Buttons: slightly darker fill color + cursor pointer.
- Ghost/outline buttons: background fill appears.
- Cards (interactive): shadow deepens from `sm` to `md`.
- All transitions at 150ms `ease-default`.

### Press / Active States
- `transform: scale(0.96)` on buttons and chips — tactile press-down feel.
- Switch thumb bounces to new position using `ease-bounce`.

### Borders
- 1px `--color-border` on cards (default).
- 1.5px focus/error ring on inputs.
- No decorative left-border accent patterns.

### Focus Rings
- Blue glow: `0 0 0 3px var(--color-blue-200)` — large and visible for accessibility.

### Cards
- Background: white (`--color-surface`)
- Border: 1px `--color-border`
- Shadow: `--shadow-sm` (deepens to `--shadow-md` on hover if interactive)
- Radius: `--radius-xl` (20px)
- Optional: 3px colored top accent bar via `accent` prop

### Imagery
- This product has no decorative imagery. The visual identity is type + color.
- The bot logomark is the only illustration: a simple geometric robot face.

---

## Iconography

JUST A BOT does not use an external icon system.

- **Logomark** (`assets/logomark.svg`, `assets/logomark-white.svg`): the brand's only illustration. A geometric robot face: rounded-rect head, antenna, eyes with pupils.
- **UI icons**: Components accept icon nodes as `iconLeading`/`iconTrailing`/`prefix`/`suffix` props. Consumers may plug in any SVG icon system (Lucide, Heroicons, Phosphor).
- **No icon font**: No Lucide CDN, no Material Icons — keep it dependency-light.
- **No emoji** in any product UI or copy.
- **Unicode characters** used sparingly for mathematical/scientific notation only (e.g. CO₂, ≈).

---

## Components

| Component | File | Description |
|---|---|---|
| Button | `components/core/Button.jsx` | 5 variants, 3 sizes, loading, icon |
| Badge | `components/core/Badge.jsx` | 10 colors, 3 sizes, status dot |
| Chip | `components/core/Chip.jsx` | Interactive filter/suggestion pill |
| Card | `components/core/Card.jsx` | Container with optional accent bar |
| Input | `components/core/Input.jsx` | Text field with label, error, affix |
| Switch | `components/core/Switch.jsx` | Animated toggle, 3 sizes |
| LoadingDots | `components/core/LoadingDots.jsx` | Three-dot bounce (AI thinking) |

Use components via the bundled namespace:
```js
const { Button, Badge, Card } = window.JustABotDesignSystem_d87885;
```

---

## UI Kits

| Kit | Path | Description |
|---|---|---|
| App | `ui_kits/app/index.html` | Interactive phone-shell prototype: Home search screen + Bot answer screen |

---

## Using This System

**In HTML prototypes**: link `styles.css` and load `_ds_bundle.js`, then use components via `window.JustABotDesignSystem_d87885`.

**In production**: copy font imports, token CSS files, and component source. Replace Google Fonts `@import` with self-hosted `@font-face` declarations for performance.
