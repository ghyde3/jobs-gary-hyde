import { ReactNode } from 'react';

/**
 * Inline status label — available for hire, new, shipped, deprecated, etc.
 * Pill-shaped, semantically colored, optionally with a live-indicator dot.
 */
export interface BadgeProps {
  /** Badge label */
  children: ReactNode;
  /** Color variant matching semantic intent */
  variant?: 'neutral' | 'accent' | 'success' | 'error' | 'warning' | 'info';
  /** Badge size */
  size?: 'sm' | 'md';
  /** Show a filled dot indicator before the label */
  dot?: boolean;
}

export declare function Badge(props: BadgeProps): JSX.Element;
