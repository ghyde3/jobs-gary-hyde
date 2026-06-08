import { ReactNode, MouseEventHandler } from 'react';

/**
 * Content container with surface-1 background, subtle border, and optional hover lift.
 * Use for project cards, experience entries, and feature panels.
 */
export interface CardProps {
  /** Card body content */
  children: ReactNode;
  /** Inner padding preset */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Enable hover lift animation (border + shadow + translateY) */
  hoverable?: boolean;
  /** Renders as `<a>` — implies hoverable */
  href?: string;
  /** Click handler — implies hoverable */
  onClick?: MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
  /** Rendered above the body with a bottom border divider */
  header?: ReactNode;
  /** Rendered below the body with a top border divider */
  footer?: ReactNode;
}

export declare function Card(props: CardProps): JSX.Element;
