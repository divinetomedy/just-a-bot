import React from "react";

/**
 * Button — the primary interactive control for JUST A BOT.
 *
 * Variants: primary | secondary | ghost | outline | danger
 * Sizes: sm | md | lg
 * Supports: icon-only, leading icon, trailing icon, loading state, disabled
 */

export function Button({
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
    WebkitFontSmoothing: 'antialiased',
  };

  const sizes = {
    sm: {
      fontSize: 'var(--text-sm)',
      padding: iconOnly ? '8px' : '8px 16px',
      minHeight: '32px',
      minWidth: iconOnly ? '32px' : 'auto',
    },
    md: {
      fontSize: 'var(--text-base)',
      padding: iconOnly ? '10px' : '10px 20px',
      minHeight: '40px',
      minWidth: iconOnly ? '40px' : 'auto',
    },
    lg: {
      fontSize: 'var(--text-lg)',
      padding: iconOnly ? '14px' : '14px 28px',
      minHeight: '52px',
      minWidth: iconOnly ? '52px' : 'auto',
    },
  };

  const variants = {
    primary: {
      background: 'var(--color-green-400)',
      color: 'var(--color-neutral-0)',
      boxShadow: 'var(--shadow-glow-green)',
    },
    secondary: {
      background: 'var(--color-green-50)',
      color: 'var(--color-green-700)',
      boxShadow: 'none',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      boxShadow: 'none',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-green-500)',
      boxShadow: 'inset 0 0 0 1.5px var(--color-green-400)',
    },
    danger: {
      background: 'var(--color-danger)',
      color: 'var(--color-neutral-0)',
      boxShadow: '0 4px 20px rgba(255,59,48,0.28)',
    },
  };

  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const hoverStyles = {
    primary:   { background: 'var(--color-green-500)' },
    secondary: { background: 'var(--color-green-100)' },
    ghost:     { background: 'var(--color-neutral-100)', color: 'var(--color-text-primary)' },
    outline:   { background: 'var(--color-green-50)' },
    danger:    { background: 'var(--color-danger-fg)' },
  };

  const pressScale = pressed && !disabled && !loading ? 'scale(0.96)' : 'scale(1)';

  const computedStyle = {
    ...base,
    ...sizes[size] || sizes.md,
    ...variants[variant] || variants.primary,
    ...(hovered && !disabled && !loading ? hoverStyles[variant] || {} : {}),
    transform: pressScale,
    ...style,
  };

  const spinnerStyle = {
    width: size === 'sm' ? 14 : size === 'lg' ? 20 : 16,
    height: size === 'sm' ? 14 : size === 'lg' ? 20 : 16,
    border: '2px solid currentColor',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'btn-spin 0.65s linear infinite',
    flexShrink: 0,
    opacity: 0.8,
  };

  return React.createElement(React.Fragment, null,
    React.createElement('style', null, `
      @keyframes btn-spin {
        to { transform: rotate(360deg); }
      }
    `),
    React.createElement('button', {
      type,
      style: computedStyle,
      disabled: disabled || loading,
      onClick: !disabled && !loading ? onClick : undefined,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => { setHovered(false); setPressed(false); },
      onMouseDown: () => setPressed(true),
      onMouseUp: () => setPressed(false),
      className,
      ...props,
    },
      loading
        ? React.createElement('span', { style: spinnerStyle })
        : null,
      !loading && iconLeading ? iconLeading : null,
      !iconOnly && children
        ? React.createElement('span', null, children)
        : null,
      !loading && iconTrailing ? iconTrailing : null,
    )
  );
}
