export interface CardProps {
  children?: React.ReactNode;
  /** Adds hover/press interaction states */
  interactive?: boolean;
  /** Inner padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Colored top accent bar */
  accent?: 'blue' | 'green' | 'orange' | 'yellow' | 'purple' | 'pink' | null;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}
