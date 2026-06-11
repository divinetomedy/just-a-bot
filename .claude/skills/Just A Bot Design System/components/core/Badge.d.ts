export interface BadgeProps {
  /** Badge label */
  children?: React.ReactNode;
  /** Color variant — maps to brand palette */
  color?: 'blue' | 'green' | 'orange' | 'yellow' | 'purple' | 'pink' | 'neutral' | 'success' | 'warning' | 'danger';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Show a colored dot before the label */
  dot?: boolean;
  style?: React.CSSProperties;
}
