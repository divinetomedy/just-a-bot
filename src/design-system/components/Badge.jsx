import React from "react";

/**
 * Badge — compact status pill for categories, labels, and counts.
 * Colors map to brand palette: blue | green | orange | yellow | purple | pink | neutral
 */

export function Badge({
  children,
  color = 'blue',
  size = 'md',
  dot = false,
  style,
  ...props
}) {
  const colorMap = {
    blue:    { bg: 'var(--color-blue-50)',    text: 'var(--color-blue-700)',    dot: 'var(--color-blue-500)'   },
    green:   { bg: 'var(--color-green-50)',   text: 'var(--color-green-700)',   dot: 'var(--color-green-400)'  },
    orange:  { bg: 'var(--color-orange-50)',  text: 'var(--color-orange-700)',  dot: 'var(--color-orange-500)' },
    yellow:  { bg: 'var(--color-yellow-50)',  text: 'var(--color-yellow-700)',  dot: 'var(--color-yellow-400)' },
    purple:  { bg: 'var(--color-purple-50)',  text: 'var(--color-purple-700)',  dot: 'var(--color-purple-500)' },
    pink:    { bg: 'var(--color-pink-50)',    text: 'var(--color-pink-700)',    dot: 'var(--color-pink-500)'   },
    neutral: { bg: 'var(--color-neutral-100)',text: 'var(--color-neutral-700)', dot: 'var(--color-neutral-400)'},
    success: { bg: 'var(--color-green-50)',   text: 'var(--color-green-700)',   dot: 'var(--color-green-400)'  },
    warning: { bg: 'var(--color-yellow-50)',  text: 'var(--color-yellow-700)',  dot: 'var(--color-yellow-400)' },
    danger:  { bg: 'var(--color-danger-subtle)', text: 'var(--color-danger-fg)', dot: 'var(--color-danger)' },
  };

  const sizes = {
    sm: { fontSize: 'var(--text-2xs)', padding: '3px 8px',  gap: '4px', dotSize: '5px' },
    md: { fontSize: 'var(--text-xs)',  padding: '4px 10px', gap: '5px', dotSize: '6px' },
    lg: { fontSize: 'var(--text-sm)',  padding: '5px 12px', gap: '6px', dotSize: '7px' },
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
      ...style,
    },
    ...props,
  },
    dot ? React.createElement('span', {
      style: {
        width: s.dotSize,
        height: s.dotSize,
        borderRadius: '50%',
        background: c.dot,
        flexShrink: 0,
      }
    }) : null,
    children,
  );
}
