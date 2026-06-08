import { ReactNode, MouseEventHandler, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

/**
 * Primary interactive control for CTAs, actions, and links.
 * Renders as `<button>` by default; pass `href` to render as `<a>`.
 *
 * @startingPoint section="Components" subtitle="Button — all variants and sizes" viewport="700x200"
 */
export interface ButtonProps {
  /** Button label or content */
  children: ReactNode;
  /** Visual style variant
   * - `primary` — filled amber, main CTA
   * - `secondary` — muted surface, secondary action
   * - `ghost` — transparent, tertiary / nav use
   * - `danger` — red tint, destructive actions
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state — visually dimmed, pointer-events removed */
  disabled?: boolean;
  /** Renders as `<a href>` when set */
  href?: string;
  /** Icon placed before the label */
  leftIcon?: ReactNode;
  /** Icon placed after the label */
  rightIcon?: ReactNode;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** HTML button type (ignored when `href` is set) */
  type?: 'button' | 'submit' | 'reset';
  /** Expand to fill container width */
  fullWidth?: boolean;
}

export declare function Button(props: ButtonProps): JSX.Element;
