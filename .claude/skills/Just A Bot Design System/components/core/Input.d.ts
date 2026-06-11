export interface InputProps {
  type?: 'text' | 'search' | 'email' | 'password' | 'number' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  /** Field label rendered above */
  label?: string;
  /** Helper text below */
  hint?: string;
  /** Error message — replaces hint and turns border red */
  error?: string;
  /** Node rendered left of input (icon, $ sign…) */
  prefix?: React.ReactNode;
  /** Node rendered right of input (icon, button…) */
  suffix?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  id?: string;
}
