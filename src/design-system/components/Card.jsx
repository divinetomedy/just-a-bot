import React from "react";

/**
 * Card — elevated surface container for content blocks.
 * Use for answer cards, topic tiles, and info panels.
 */

export function Card({
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
    sm:   'var(--pad-card-sm)',
    md:   'var(--pad-card-md)',
    lg:   'var(--pad-card-lg)',
  };

  const accentColors = {
    blue:   'var(--color-blue-500)',
    green:  'var(--color-green-400)',
    orange: 'var(--color-orange-500)',
    yellow: 'var(--color-yellow-400)',
    purple: 'var(--color-purple-500)',
    pink:   'var(--color-pink-500)',
  };

  const baseStyle = {
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-card)',
    padding: padMap[padding] || padMap.md,
    border: '1px solid var(--color-border)',
    boxShadow: hovered && interactive
      ? 'var(--shadow-md)'
      : 'var(--shadow-sm)',
    transition: 'all var(--transition-fast)',
    transform: pressed && interactive ? 'scale(0.99)' : 'scale(1)',
    cursor: interactive ? 'pointer' : 'default',
    position: 'relative',
    overflow: 'hidden',
  };

  // Top accent bar
  const accentBar = accent && accentColors[accent]
    ? React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: accentColors[accent],
          borderRadius: 'var(--radius-card) var(--radius-card) 0 0',
        }
      })
    : null;

  return React.createElement('div', {
    style: { ...baseStyle, ...style },
    onClick,
    onMouseEnter: interactive ? () => setHovered(true) : undefined,
    onMouseLeave: interactive ? () => { setHovered(false); setPressed(false); } : undefined,
    onMouseDown:  interactive ? () => setPressed(true) : undefined,
    onMouseUp:    interactive ? () => setPressed(false) : undefined,
    ...props,
  },
    accentBar,
    children,
  );
}
