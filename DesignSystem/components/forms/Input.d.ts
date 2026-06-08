import { ReactNode, InputHTMLAttributes, ChangeEventHandler } from 'react';

/**
 * Text input with label, hint, error state, optional icon, and focus ring.
 * Use in contact forms and any data-entry context.
 */
export interface InputProps {
  /** Field label rendered above */
  label?: string;
  /** Helper text below the input */
  hint?: string;
  /** Error message — replaces hint, turns border red */
  error?: string;
  /** HTML id for label association */
  id?: string;
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'search' | 'number';
  /** Placeholder text */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Change handler */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Disabled state */
  disabled?: boolean;
  /** Shows asterisk on label */
  required?: boolean;
  /** Icon node displayed inside left edge */
  leftIcon?: ReactNode;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
}

export declare function Input(props: InputProps): JSX.Element;
