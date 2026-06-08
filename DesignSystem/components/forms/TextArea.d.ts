import { ChangeEventHandler } from 'react';

/**
 * Multi-line text area — same styling as Input.
 * Use for message fields in contact forms.
 */
export interface TextAreaProps {
  /** Field label */
  label?: string;
  /** Helper text */
  hint?: string;
  /** Error message */
  error?: string;
  /** HTML id */
  id?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Change handler */
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  /** Disabled state */
  disabled?: boolean;
  /** Required — shows asterisk */
  required?: boolean;
  /** Number of visible rows */
  rows?: number;
  /** CSS resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export declare function TextArea(props: TextAreaProps): JSX.Element;
