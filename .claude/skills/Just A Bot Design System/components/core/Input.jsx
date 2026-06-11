/**
 * Input — text field for questions and search queries.
 * Supports prefix/suffix nodes, labels, error states.
 */

export function Input({
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
    sm: { fontSize: 'var(--text-sm)',  height: '36px', padding: '0 12px', iconSize: '14px' },
    md: { fontSize: 'var(--text-base)', height: '44px', padding: '0 16px', iconSize: '16px' },
    lg: { fontSize: 'var(--text-lg)',  height: '54px', padding: '0 20px', iconSize: '18px' },
  };
  const s = sizes[size] || sizes.md;

  const wrapStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    background: disabled ? 'var(--color-neutral-100)' : 'var(--color-surface)',
    border: error
      ? '1.5px solid var(--color-danger)'
      : focused
        ? '1.5px solid var(--color-green-400)'
        : '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-input)',
    height: s.height,
    padding: s.padding,
    boxShadow: focused && !error ? '0 0 0 3px var(--color-green-100)' : 'none',
    transition: 'all var(--transition-fast)',
    cursor: disabled ? 'not-allowed' : 'text',
    overflow: 'hidden',
    ...style,
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
    ...inputStyle,
  };

  const affix = {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--color-text-muted)',
    flexShrink: 0,
    fontSize: s.iconSize,
  };

  const uid = id || `input-${Math.random().toString(36).slice(2)}`;

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
    label ? React.createElement('label', {
      htmlFor: uid,
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-weight-medium)',
        color: 'var(--color-text-primary)',
      }
    }, label) : null,

    React.createElement('div', { style: wrapStyle },
      prefix ? React.createElement('span', { style: { ...affix, paddingRight: '8px' } }, prefix) : null,
      React.createElement('input', {
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
        ...props,
      }),
      suffix ? React.createElement('span', { style: { ...affix, paddingLeft: '8px' } }, suffix) : null,
    ),

    (hint || error) ? React.createElement('span', {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        color: error ? 'var(--color-danger)' : 'var(--color-text-muted)',
      }
    }, error || hint) : null,
  );
}
