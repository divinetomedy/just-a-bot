/* @ds-bundle: {"format":3,"namespace":"JustABotDesignSystem_d87885","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"LoadingDots","sourcePath":"components/core/LoadingDots.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"fe0919ed119b","components/core/Button.jsx":"7d94877977f7","components/core/Card.jsx":"5c3ee0a01df6","components/core/Chip.jsx":"f94b436b17af","components/core/Input.jsx":"07388cee0fd8","components/core/LoadingDots.jsx":"93acd571616b","components/core/Switch.jsx":"2b133f392600","ui_kits/app/AnswerView.jsx":"0f46dcd00df4","ui_kits/app/HomeView.jsx":"588d95c42b72"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.JustABotDesignSystem_d87885 = window.JustABotDesignSystem_d87885 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/**
 * Badge — compact status pill for categories, labels, and counts.
 * Colors map to brand palette: blue | green | orange | yellow | purple | pink | neutral
 */

function Badge({
  children,
  color = 'blue',
  size = 'md',
  dot = false,
  style,
  ...props
}) {
  const colorMap = {
    blue: {
      bg: 'var(--color-blue-50)',
      text: 'var(--color-blue-700)',
      dot: 'var(--color-blue-500)'
    },
    green: {
      bg: 'var(--color-green-50)',
      text: 'var(--color-green-700)',
      dot: 'var(--color-green-400)'
    },
    orange: {
      bg: 'var(--color-orange-50)',
      text: 'var(--color-orange-700)',
      dot: 'var(--color-orange-500)'
    },
    yellow: {
      bg: 'var(--color-yellow-50)',
      text: 'var(--color-yellow-700)',
      dot: 'var(--color-yellow-400)'
    },
    purple: {
      bg: 'var(--color-purple-50)',
      text: 'var(--color-purple-700)',
      dot: 'var(--color-purple-500)'
    },
    pink: {
      bg: 'var(--color-pink-50)',
      text: 'var(--color-pink-700)',
      dot: 'var(--color-pink-500)'
    },
    neutral: {
      bg: 'var(--color-neutral-100)',
      text: 'var(--color-neutral-700)',
      dot: 'var(--color-neutral-400)'
    },
    success: {
      bg: 'var(--color-green-50)',
      text: 'var(--color-green-700)',
      dot: 'var(--color-green-400)'
    },
    warning: {
      bg: 'var(--color-yellow-50)',
      text: 'var(--color-yellow-700)',
      dot: 'var(--color-yellow-400)'
    },
    danger: {
      bg: 'var(--color-danger-subtle)',
      text: 'var(--color-danger-fg)',
      dot: 'var(--color-danger)'
    }
  };
  const sizes = {
    sm: {
      fontSize: 'var(--text-2xs)',
      padding: '3px 8px',
      gap: '4px',
      dotSize: '5px'
    },
    md: {
      fontSize: 'var(--text-xs)',
      padding: '4px 10px',
      gap: '5px',
      dotSize: '6px'
    },
    lg: {
      fontSize: 'var(--text-sm)',
      padding: '5px 12px',
      gap: '6px',
      dotSize: '7px'
    }
  };
  const c = colorMap[color] || colorMap.blue;
  const s = sizes[size] || sizes.md;
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: s.gap,
      background: c.bg,
      color: c.text,
      fontSize: s.fontSize,
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--font-weight-semibold)',
      letterSpacing: 'var(--tracking-wide)',
      padding: s.padding,
      borderRadius: 'var(--radius-badge)',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    },
    ...props
  }, dot ? React.createElement('span', {
    style: {
      width: s.dotSize,
      height: s.dotSize,
      borderRadius: '50%',
      background: c.dot,
      flexShrink: 0
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/**
 * Button — the primary interactive control for JUST A BOT.
 *
 * Variants: primary | secondary | ghost | outline | danger
 * Sizes: sm | md | lg
 * Supports: icon-only, leading icon, trailing icon, loading state, disabled
 */

function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  iconLeading = null,
  iconTrailing = null,
  iconOnly = false,
  type = 'button',
  onClick,
  style,
  className,
  ...props
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--gap-md)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--font-weight-semibold)',
    letterSpacing: 'var(--tracking-snug)',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    outline: 'none',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    transition: 'all var(--transition-fast)',
    borderRadius: 'var(--radius-button)',
    lineHeight: 1,
    position: 'relative',
    WebkitFontSmoothing: 'antialiased'
  };
  const sizes = {
    sm: {
      fontSize: 'var(--text-sm)',
      padding: iconOnly ? '8px' : '8px 16px',
      minHeight: '32px',
      minWidth: iconOnly ? '32px' : 'auto'
    },
    md: {
      fontSize: 'var(--text-base)',
      padding: iconOnly ? '10px' : '10px 20px',
      minHeight: '40px',
      minWidth: iconOnly ? '40px' : 'auto'
    },
    lg: {
      fontSize: 'var(--text-lg)',
      padding: iconOnly ? '14px' : '14px 28px',
      minHeight: '52px',
      minWidth: iconOnly ? '52px' : 'auto'
    }
  };
  const variants = {
    primary: {
      background: 'var(--color-green-400)',
      color: 'var(--color-neutral-0)',
      boxShadow: 'var(--shadow-glow-green)'
    },
    secondary: {
      background: 'var(--color-green-50)',
      color: 'var(--color-green-700)',
      boxShadow: 'none'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      boxShadow: 'none'
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-green-500)',
      boxShadow: 'inset 0 0 0 1.5px var(--color-green-400)'
    },
    danger: {
      background: 'var(--color-danger)',
      color: 'var(--color-neutral-0)',
      boxShadow: '0 4px 20px rgba(255,59,48,0.28)'
    }
  };
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const hoverStyles = {
    primary: {
      background: 'var(--color-green-500)'
    },
    secondary: {
      background: 'var(--color-green-100)'
    },
    ghost: {
      background: 'var(--color-neutral-100)',
      color: 'var(--color-text-primary)'
    },
    outline: {
      background: 'var(--color-green-50)'
    },
    danger: {
      background: 'var(--color-danger-fg)'
    }
  };
  const pressScale = pressed && !disabled && !loading ? 'scale(0.96)' : 'scale(1)';
  const computedStyle = {
    ...base,
    ...(sizes[size] || sizes.md),
    ...(variants[variant] || variants.primary),
    ...(hovered && !disabled && !loading ? hoverStyles[variant] || {} : {}),
    transform: pressScale,
    ...style
  };
  const spinnerStyle = {
    width: size === 'sm' ? 14 : size === 'lg' ? 20 : 16,
    height: size === 'sm' ? 14 : size === 'lg' ? 20 : 16,
    border: '2px solid currentColor',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'btn-spin 0.65s linear infinite',
    flexShrink: 0,
    opacity: 0.8
  };
  return React.createElement(React.Fragment, null, React.createElement('style', null, `
      @keyframes btn-spin {
        to { transform: rotate(360deg); }
      }
    `), React.createElement('button', {
    type,
    style: computedStyle,
    disabled: disabled || loading,
    onClick: !disabled && !loading ? onClick : undefined,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    className,
    ...props
  }, loading ? React.createElement('span', {
    style: spinnerStyle
  }) : null, !loading && iconLeading ? iconLeading : null, !iconOnly && children ? React.createElement('span', null, children) : null, !loading && iconTrailing ? iconTrailing : null));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/**
 * Card — elevated surface container for content blocks.
 * Use for answer cards, topic tiles, and info panels.
 */

function Card({
  children,
  interactive = false,
  padding = 'md',
  accent = null,
  style,
  onClick,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const padMap = {
    none: '0',
    sm: 'var(--pad-card-sm)',
    md: 'var(--pad-card-md)',
    lg: 'var(--pad-card-lg)'
  };
  const accentColors = {
    blue: 'var(--color-blue-500)',
    green: 'var(--color-green-400)',
    orange: 'var(--color-orange-500)',
    yellow: 'var(--color-yellow-400)',
    purple: 'var(--color-purple-500)',
    pink: 'var(--color-pink-500)'
  };
  const baseStyle = {
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-card)',
    padding: padMap[padding] || padMap.md,
    border: '1px solid var(--color-border)',
    boxShadow: hovered && interactive ? 'var(--shadow-md)' : 'var(--shadow-sm)',
    transition: 'all var(--transition-fast)',
    transform: pressed && interactive ? 'scale(0.99)' : 'scale(1)',
    cursor: interactive ? 'pointer' : 'default',
    position: 'relative',
    overflow: 'hidden'
  };

  // Top accent bar
  const accentBar = accent && accentColors[accent] ? React.createElement('div', {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: accentColors[accent],
      borderRadius: 'var(--radius-card) var(--radius-card) 0 0'
    }
  }) : null;
  return React.createElement('div', {
    style: {
      ...baseStyle,
      ...style
    },
    onClick,
    onMouseEnter: interactive ? () => setHovered(true) : undefined,
    onMouseLeave: interactive ? () => {
      setHovered(false);
      setPressed(false);
    } : undefined,
    onMouseDown: interactive ? () => setPressed(true) : undefined,
    onMouseUp: interactive ? () => setPressed(false) : undefined,
    ...props
  }, accentBar, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
/**
 * Chip — interactive suggestion pill, typically for topic/question suggestions.
 * Tappable variant of Badge with hover/press states.
 */

function Chip({
  children,
  selected = false,
  disabled = false,
  onClick,
  color = 'neutral',
  size = 'md',
  iconLeading = null,
  style,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const colorMap = {
    neutral: {
      default: {
        bg: 'var(--color-neutral-100)',
        text: 'var(--color-text-secondary)',
        border: 'var(--color-border)'
      },
      selected: {
        bg: 'var(--color-green-400)',
        text: 'white',
        border: 'var(--color-green-400)'
      },
      hover: {
        bg: 'var(--color-neutral-200)',
        text: 'var(--color-text-primary)',
        border: 'var(--color-border-strong)'
      }
    },
    blue: {
      default: {
        bg: 'var(--color-blue-50)',
        text: 'var(--color-blue-700)',
        border: 'var(--color-blue-200)'
      },
      selected: {
        bg: 'var(--color-blue-500)',
        text: 'white',
        border: 'var(--color-blue-500)'
      },
      hover: {
        bg: 'var(--color-blue-100)',
        text: 'var(--color-blue-700)',
        border: 'var(--color-blue-300)'
      }
    }
  };
  const sizes = {
    sm: {
      fontSize: 'var(--text-xs)',
      padding: '5px 12px',
      height: '28px',
      iconGap: '5px'
    },
    md: {
      fontSize: 'var(--text-sm)',
      padding: '7px 14px',
      height: '34px',
      iconGap: '6px'
    },
    lg: {
      fontSize: 'var(--text-base)',
      padding: '9px 18px',
      height: '42px',
      iconGap: '7px'
    }
  };
  const cm = colorMap[color] || colorMap.neutral;
  const c = selected ? cm.selected : hovered && !disabled ? cm.hover : cm.default;
  const sz = sizes[size] || sizes.md;
  return React.createElement('button', {
    type: 'button',
    disabled,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: sz.iconGap,
      background: c.bg,
      color: c.text,
      border: `1.5px solid ${c.border}`,
      borderRadius: 'var(--radius-chip)',
      padding: sz.padding,
      height: sz.height,
      fontFamily: 'var(--font-sans)',
      fontSize: sz.fontSize,
      fontWeight: 'var(--font-weight-medium)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      transition: 'all var(--transition-fast)',
      transform: pressed && !disabled ? 'scale(0.96)' : 'scale(1)',
      outline: 'none',
      whiteSpace: 'nowrap',
      lineHeight: 1,
      ...style
    },
    onClick: !disabled ? onClick : undefined,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    ...props
  }, iconLeading, React.createElement('span', null, children));
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
/**
 * Input — text field for questions and search queries.
 * Supports prefix/suffix nodes, labels, error states.
 */

function Input({
  type = 'text',
  placeholder = '',
  value,
  defaultValue,
  onChange,
  onKeyDown,
  disabled = false,
  label,
  hint,
  error,
  prefix,
  suffix,
  size = 'md',
  style,
  inputStyle,
  id,
  ...props
}) {
  const [focused, setFocused] = React.useState(false);
  const sizes = {
    sm: {
      fontSize: 'var(--text-sm)',
      height: '36px',
      padding: '0 12px',
      iconSize: '14px'
    },
    md: {
      fontSize: 'var(--text-base)',
      height: '44px',
      padding: '0 16px',
      iconSize: '16px'
    },
    lg: {
      fontSize: 'var(--text-lg)',
      height: '54px',
      padding: '0 20px',
      iconSize: '18px'
    }
  };
  const s = sizes[size] || sizes.md;
  const wrapStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    background: disabled ? 'var(--color-neutral-100)' : 'var(--color-surface)',
    border: error ? '1.5px solid var(--color-danger)' : focused ? '1.5px solid var(--color-green-400)' : '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-input)',
    height: s.height,
    padding: s.padding,
    boxShadow: focused && !error ? '0 0 0 3px var(--color-green-100)' : 'none',
    transition: 'all var(--transition-fast)',
    cursor: disabled ? 'not-allowed' : 'text',
    overflow: 'hidden',
    ...style
  };
  const innerInputStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: 'var(--font-sans)',
    fontSize: s.fontSize,
    fontWeight: 'var(--font-weight-regular)',
    color: disabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)',
    cursor: disabled ? 'not-allowed' : 'text',
    width: '100%',
    minWidth: 0,
    ...inputStyle
  };
  const affix = {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--color-text-muted)',
    flexShrink: 0,
    fontSize: s.iconSize
  };
  const uid = id || `input-${Math.random().toString(36).slice(2)}`;
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    }
  }, label ? React.createElement('label', {
    htmlFor: uid,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--font-weight-medium)',
      color: 'var(--color-text-primary)'
    }
  }, label) : null, React.createElement('div', {
    style: wrapStyle
  }, prefix ? React.createElement('span', {
    style: {
      ...affix,
      paddingRight: '8px'
    }
  }, prefix) : null, React.createElement('input', {
    id: uid,
    type,
    placeholder,
    value,
    defaultValue,
    disabled,
    onChange,
    onKeyDown,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: innerInputStyle,
    ...props
  }), suffix ? React.createElement('span', {
    style: {
      ...affix,
      paddingLeft: '8px'
    }
  }, suffix) : null), hint || error ? React.createElement('span', {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--color-danger)' : 'var(--color-text-muted)'
    }
  }, error || hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/LoadingDots.jsx
try { (() => {
/**
 * LoadingDots — animated three-dot thinking indicator.
 * Use while the bot is generating an answer.
 */

function LoadingDots({
  size = 'md',
  color = 'green',
  style,
  ...props
}) {
  const sizes = {
    sm: 6,
    md: 8,
    lg: 11
  };
  const colorMap = {
    blue: 'var(--color-blue-500)',
    green: 'var(--color-green-400)',
    purple: 'var(--color-purple-500)',
    neutral: 'var(--color-neutral-400)',
    white: 'white',
    current: 'currentColor'
  };
  const d = sizes[size] || 8;
  const c = colorMap[color] || colorMap.blue;
  return React.createElement(React.Fragment, null, React.createElement('style', null, `
      @keyframes jab-dot-bounce {
        0%, 80%, 100% { transform: scale(1);   opacity: 0.4; }
        40%            { transform: scale(1.3); opacity: 1;   }
      }
    `), React.createElement('span', {
    role: 'status',
    'aria-label': 'Loading',
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: `${d * 0.6}px`,
      ...style
    },
    ...props
  }, [0, 1, 2].map(i => React.createElement('span', {
    key: i,
    style: {
      width: d,
      height: d,
      borderRadius: '50%',
      background: c,
      display: 'inline-block',
      animation: `jab-dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`
    }
  }))));
}
Object.assign(__ds_scope, { LoadingDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LoadingDots.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
/**
 * Switch — toggle control for on/off settings.
 */

function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = 'md',
  style,
  ...props
}) {
  const sizes = {
    sm: {
      trackW: 32,
      trackH: 18,
      thumbSize: 14,
      thumbOff: 2,
      thumbOn: 16
    },
    md: {
      trackW: 44,
      trackH: 24,
      thumbSize: 20,
      thumbOff: 2,
      thumbOn: 22
    },
    lg: {
      trackW: 56,
      trackH: 30,
      thumbSize: 26,
      thumbOff: 2,
      thumbOn: 28
    }
  };
  const s = sizes[size] || sizes.md;
  const trackStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    width: s.trackW,
    height: s.trackH,
    borderRadius: 'var(--radius-full)',
    background: checked ? 'var(--color-green-400)' : 'var(--color-neutral-300)',
    position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    transition: 'background var(--transition-fast)',
    flexShrink: 0,
    boxShadow: checked ? 'var(--shadow-glow-green)' : 'none'
  };
  const thumbStyle = {
    position: 'absolute',
    width: s.thumbSize,
    height: s.thumbSize,
    borderRadius: '50%',
    background: 'white',
    boxShadow: 'var(--shadow-sm)',
    top: s.thumbOff,
    left: checked ? s.thumbOn : s.thumbOff,
    transition: 'left var(--transition-bounce)'
  };
  const wrapper = React.createElement('div', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      ...style
    },
    onClick: !disabled ? () => onChange && onChange(!checked) : undefined,
    ...props
  }, React.createElement('div', {
    style: trackStyle
  }, React.createElement('div', {
    style: thumbStyle
  })), label ? React.createElement('span', {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--font-weight-medium)',
      color: disabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)'
    }
  }, label) : null);
  return wrapper;
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AnswerView.jsx
try { (() => {
// JUST A BOT — Answer View
// Displays bot answer with loading state and related questions

const QA_DB = [{
  keywords: ['photosynthesis', 'plants make food', 'plants food'],
  topic: 'Science',
  topicColor: 'green',
  answer: 'Photosynthesis is how plants make their own food. They absorb sunlight through a green pigment called chlorophyll, then combine it with water from the soil and carbon dioxide from the air to produce glucose. Oxygen is released as a byproduct — which is why plants help keep air breathable.',
  related: ['What is chlorophyll?', 'Why are leaves green?', 'What is cellular respiration?']
}, {
  keywords: ['black hole', 'blackhole'],
  topic: 'Space',
  topicColor: 'purple',
  answer: 'A black hole is a region in space where gravity is so intense that nothing — not even light — can escape. They form when a massive star collapses under its own weight at the end of its life. The boundary around a black hole is called the event horizon: once you cross it, there is no way back.',
  related: ['What is a neutron star?', 'What is a supernova?', 'How big is the universe?']
}, {
  keywords: ['largest animal', 'biggest animal', 'blue whale'],
  topic: 'Animals',
  topicColor: 'orange',
  answer: 'The blue whale is the largest animal ever known to have existed on Earth. They can grow up to 30 metres long — roughly the length of three school buses — and weigh as much as 200 tonnes. Despite their enormous size, blue whales feed almost entirely on tiny shrimp-like creatures called krill.',
  related: ['How do whales breathe?', 'What is the smallest animal?', 'How long do whales live?']
}, {
  keywords: ['world war', 'ww1', 'wwi', 'first world war', 'world war 1', 'world war one'],
  topic: 'History',
  topicColor: 'yellow',
  answer: 'World War I began in 1914 and was triggered by the assassination of Archduke Franz Ferdinand of Austria-Hungary. Tensions had been building in Europe for years due to rival alliances, competing empires, and an arms race. The war involved most of the world\'s major powers and lasted until 1918, resulting in over 17 million deaths.',
  related: ['What was the Treaty of Versailles?', 'What caused World War II?', 'Who were the Allied Powers?']
}, {
  keywords: ['internet', 'how internet works', 'internet work'],
  topic: 'Technology',
  topicColor: 'blue',
  answer: 'The internet is a global network of computers that communicate using standardised rules called protocols. When you send a message or load a website, your data is broken into small packets, each routed through a series of connected computers and cables (and sometimes satellites) until they reach their destination and are reassembled.',
  related: ['What is Wi-Fi?', 'How does a web browser work?', 'What is an IP address?']
}, {
  keywords: ['earthquake', 'earthquakes', 'tectonic'],
  topic: 'Earth',
  topicColor: 'neutral',
  answer: 'Earthquakes happen when pieces of Earth\'s outer shell — called tectonic plates — suddenly shift or slip against each other. The point underground where the rupture begins is the focus; the point directly above it on the surface is the epicentre. Energy radiates outward as seismic waves, shaking the ground.',
  related: ['What is a tectonic plate?', 'What causes volcanoes?', 'What is the Richter scale?']
}, {
  keywords: ['fibonacci', 'fibonacci sequence'],
  topic: 'Math',
  topicColor: 'pink',
  answer: 'The Fibonacci sequence is a series of numbers where each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34… It appears surprisingly often in nature — in the spiral arrangement of sunflower seeds, pine cones, and the shells of nautiluses. The ratio between consecutive terms approaches the golden ratio (≈ 1.618).',
  related: ['What is the golden ratio?', 'What is a prime number?', 'What is pi?']
}, {
  keywords: ['heart', 'how heart works', 'heart work'],
  topic: 'Biology',
  topicColor: 'orange',
  answer: 'The heart is a muscular pump that circulates blood around your body. It has four chambers: two atria that receive blood, and two ventricles that pump it out. The right side sends oxygen-poor blood to the lungs; the left side pumps oxygen-rich blood to the rest of the body. A healthy heart beats about 60–100 times per minute.',
  related: ['What are arteries and veins?', 'What is blood made of?', 'How do lungs work?']
}];
const FALLBACK = {
  topic: 'Knowledge',
  topicColor: 'blue',
  answer: q => `"${q}" is a great question. While this is a simplified demo, the real Just A Bot would provide a clear, factual, age-appropriate answer drawn from encyclopedic sources — no ads, no engagement loops, just the answer.`,
  related: ['Try: What is photosynthesis?', 'Try: What is a black hole?', 'Try: How does the internet work?']
};
function findAnswer(query) {
  const q = query.toLowerCase();
  for (const item of QA_DB) {
    if (item.keywords.some(k => q.includes(k))) return item;
  }
  return {
    ...FALLBACK,
    answer: FALLBACK.answer(query)
  };
}
function AnswerView({
  query,
  onBack,
  onSearch
}) {
  const {
    Badge,
    Chip,
    Card,
    LoadingDots
  } = window.JustABotDesignSystem_d87885;
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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 24px 48px',
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 600
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 'var(--font-weight-bold)',
      color: 'var(--color-text-primary)',
      lineHeight: 'var(--leading-snug)',
      marginBottom: 24,
      letterSpacing: 'var(--tracking-snug)'
    }
  }, query), /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-green-400)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logomark-white.svg",
    width: "22",
    height: "22",
    alt: "bot"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, loading ? /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 6
    }
  }, /*#__PURE__*/React.createElement(LoadingDots, {
    size: "md",
    color: "green"
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      animation: 'fadeIn 0.3s ease'
    }
  }, result && /*#__PURE__*/React.createElement(Badge, {
    color: result.topicColor,
    size: "sm",
    style: {
      marginBottom: 12
    }
  }, result.topic), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body-size)',
      lineHeight: 'var(--leading-relaxed)',
      color: 'var(--color-text-primary)',
      margin: 0
    }
  }, result?.answer))))), !loading && result && /*#__PURE__*/React.createElement("div", {
    style: {
      animation: 'fadeIn 0.4s ease 0.1s both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-text-muted)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-widest)',
      marginBottom: 10
    }
  }, "Keep exploring"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, result.related.map(q => /*#__PURE__*/React.createElement(Chip, {
    key: q,
    onClick: () => onSearch(q)
  }, q))))));
}
Object.assign(window, {
  AnswerView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AnswerView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/HomeView.jsx
try { (() => {
// JUST A BOT — Home View
// Hero search screen with topic suggestions

const TOPICS = [{
  label: 'Science',
  color: 'green',
  query: 'How does photosynthesis work?'
}, {
  label: 'Space',
  color: 'purple',
  query: 'What is a black hole?'
}, {
  label: 'Animals',
  color: 'orange',
  query: 'What is the largest animal on Earth?'
}, {
  label: 'History',
  color: 'yellow',
  query: 'What caused World War I?'
}, {
  label: 'Technology',
  color: 'blue',
  query: 'How does the internet work?'
}, {
  label: 'Earth',
  color: 'neutral',
  query: 'Why do earthquakes happen?'
}, {
  label: 'Math',
  color: 'pink',
  query: 'What is the Fibonacci sequence?'
}, {
  label: 'Body',
  color: 'orange',
  query: 'How does the heart work?'
}];
function HomeView({
  onSearch
}) {
  const {
    Input,
    Chip,
    Button
  } = window.JustABotDesignSystem_d87885;
  const [query, setQuery] = React.useState('');
  const submit = q => {
    const text = (q || query).trim();
    if (text) onSearch(text);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 24px 48px',
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logomark.svg",
    width: "64",
    height: "64",
    style: {
      marginBottom: 20
    },
    alt: "Just A Bot"
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-4xl)',
      fontWeight: 'var(--font-weight-bold)',
      color: 'var(--color-text-primary)',
      letterSpacing: 'var(--tracking-tight)',
      lineHeight: 'var(--leading-tight)',
      textAlign: 'center',
      marginBottom: 10
    }
  }, "Ask anything."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-lg)',
      color: 'var(--color-text-secondary)',
      textAlign: 'center',
      marginBottom: 36,
      lineHeight: 'var(--leading-normal)'
    }
  }, "Clean answers. No fluff. No follows."), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 480,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      background: 'var(--color-surface)',
      border: '2px solid var(--color-border)',
      borderRadius: 'var(--radius-full)',
      padding: '6px 6px 6px 20px',
      boxShadow: 'var(--shadow-md)',
      transition: 'border-color var(--transition-fast)',
      gap: 8
    },
    onFocus: () => {}
  }, /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    placeholder: "What is a black hole?",
    value: query,
    onChange: e => setQuery(e.target.value),
    onKeyDown: e => e.key === 'Enter' && submit(),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--color-text-primary)',
      background: 'transparent',
      minWidth: 0
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    onClick: () => submit()
  }, "Ask"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'center',
      maxWidth: 520
    }
  }, TOPICS.map(t => /*#__PURE__*/React.createElement(Chip, {
    key: t.label,
    color: t.color === 'neutral' ? 'neutral' : 'neutral',
    onClick: () => submit(t.query)
  }, t.label))));
}
Object.assign(window, {
  HomeView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/HomeView.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.LoadingDots = __ds_scope.LoadingDots;

__ds_ns.Switch = __ds_scope.Switch;

})();
