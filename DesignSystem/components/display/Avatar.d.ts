import { ImgHTMLAttributes } from 'react';

/**
 * Profile image with initials fallback.
 * Used in about sections, testimonials, and contact headers.
 */
export interface AvatarProps {
  /** Image URL — falls back to initials if missing or broken */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Person's name — used for initials fallback and title tooltip */
  name?: string;
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Border shape */
  shape?: 'circle' | 'rounded' | 'square';
}

export declare function Avatar(props: AvatarProps): JSX.Element;
