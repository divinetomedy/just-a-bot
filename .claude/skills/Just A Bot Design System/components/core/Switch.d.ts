export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Label rendered to the right of the toggle */
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}
