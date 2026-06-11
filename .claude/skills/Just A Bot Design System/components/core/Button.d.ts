export interface ButtonProps {
  /** Button label */
  children?: React.ReactNode;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Loading spinner state */
  loading?: boolean;
  /** Icon before label */
  iconLeading?: React.ReactNode;
  /** Icon after label */
  iconTrailing?: React.ReactNode;
  /** Icon-only mode (square padding, no label shown) */
  iconOnly?: boolean;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}
