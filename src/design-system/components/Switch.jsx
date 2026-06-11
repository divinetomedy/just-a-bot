import React from "react";

/**
 * Switch — toggle control for on/off settings.
 */

export function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = 'md',
  style,
  ...props
}) {
  const sizes = {
    sm: { trackW: 32, trackH: 18, thumbSize: 14, thumbOff: 2, thumbOn: 16 },
    md: { trackW: 44, trackH: 24, thumbSize: 20, thumbOff: 2, thumbOn: 22 },
    lg: { trackW: 56, trackH: 30, thumbSize: 26, thumbOff: 2, thumbOn: 28 },
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
    boxShadow: checked ? 'var(--shadow-glow-green)' : 'none',
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
    transition: 'left var(--transition-bounce)',
  };

  const wrapper = React.createElement('div', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      ...style,
    },
    onClick: !disabled ? () => onChange && onChange(!checked) : undefined,
    ...props,
  },
    React.createElement('div', { style: trackStyle },
      React.createElement('div', { style: thumbStyle }),
    ),
    label ? React.createElement('span', {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-weight-medium)',
        color: disabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)',
      }
    }, label) : null,
  );

  return wrapper;
}
