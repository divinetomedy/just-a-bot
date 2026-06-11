export interface ChipProps {
  children?: React.ReactNode;
  /** Whether this chip is in a selected/active state */
  selected?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Color scheme */
  color?: 'neutral' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  /** Icon before the label */
  iconLeading?: React.ReactNode;
  style?: React.CSSProperties;
}
