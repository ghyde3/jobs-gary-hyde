import { ReactNode } from 'react';

/**
 * Sticky site navigation bar with logo, nav links, and optional CTA button.
 * Becomes opaque + blurred on scroll. Active link detection via `currentPath`.
 */
export interface NavLink {
  label: string;
  href: string;
}

export interface NavBarProps {
  /** Logo slot — pass an `<img>` or text node; defaults to "GH" */
  logo?: ReactNode;
  /** Array of nav link objects */
  links?: NavLink[];
  /** Optional CTA — pass a `<Button>` component */
  cta?: ReactNode;
  /** Current pathname for active-link detection */
  currentPath?: string;
  /** Called on nav link click — use for SPA routing */
  onLinkClick?: (event: React.MouseEvent, href: string) => void;
}

export declare function NavBar(props: NavBarProps): JSX.Element;
