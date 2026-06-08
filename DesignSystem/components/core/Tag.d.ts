import { ReactNode, MouseEventHandler } from 'react';

/**
 * Tech-stack chip for listing languages, frameworks, and tools.
 * Monospaced font reinforces technical credibility.
 */
export interface TagProps {
  /** Tag text — typically a technology name e.g. "TypeScript" */
  children: ReactNode;
  /** Tag size */
  size?: 'sm' | 'md';
  /** Highlighted/selected state — amber tint */
  active?: boolean;
  /** If provided, tag becomes interactive (filter use-case) */
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

export declare function Tag(props: TagProps): JSX.Element;
