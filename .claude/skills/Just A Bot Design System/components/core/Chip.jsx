/**
 * Chip — interactive suggestion pill, typically for topic/question suggestions.
 * Tappable variant of Badge with hover/press states.
 */

export function Chip({
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
      default:  { bg: 'var(--color-neutral-100)', text: 'var(--color-text-secondary)', border: 'var(--color-border)' },
      selected: { bg: 'var(--color-green-400)',    text: 'white',                       border: 'var(--color-green-400)' },
      hover:    { bg: 'var(--color-neutral-200)', text: 'var(--color-text-primary)',    border: 'var(--color-border-strong)' },
    },
    blue: {
      default:  { bg: 'var(--color-blue-50)',  text: 'var(--color-blue-700)',  border: 'var(--color-blue-200)' },
      selected: { bg: 'var(--color-blue-500)', text: 'white',                  border: 'var(--color-blue-500)' },
      hover:    { bg: 'var(--color-blue-100)', text: 'var(--color-blue-700)',  border: 'var(--color-blue-300)' },
    },
  };

  const sizes = {
    sm: { fontSize: 'var(--text-xs)',  padding: '5px 12px',  height: '28px', iconGap: '5px' },
    md: { fontSize: 'var(--text-sm)',  padding: '7px 14px',  height: '34px', iconGap: '6px' },
    lg: { fontSize: 'var(--text-base)', padding: '9px 18px', height: '42px', iconGap: '7px' },
  };

  const cm = (colorMap[color] || colorMap.neutral);
  const c  = selected ? cm.selected : (hovered && !disabled ? cm.hover : cm.default);
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
      ...style,
    },
    onClick: !disabled ? onClick : undefined,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setHovered(false); setPressed(false); },
    onMouseDown: () => setPressed(true),
    onMouseUp:   () => setPressed(false),
    ...props,
  },
    iconLeading,
    React.createElement('span', null, children),
  );
}
