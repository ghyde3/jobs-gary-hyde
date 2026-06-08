import { ReactNode } from 'react';

/**
 * Horizontal rule with optional centered label. Used between page sections.
 */
export interface DividerProps {
  /** Optional centered text label */
  label?: string;
  /** Vertical margin preset */
  spacing?: 'sm' | 'md' | 'lg';
  /** Use an even more subtle (4% white) line — for within-surface separation */
  subtle?: boolean;
}

export declare function Divider(props: DividerProps): JSX.Element;
