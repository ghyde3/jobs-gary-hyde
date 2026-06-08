import { ReactNode } from 'react';

/**
 * Styled code block with optional filename header and copy-to-clipboard.
 * Uses JetBrains Mono. Syntax highlighting is handled externally (e.g. Shiki).
 */
export interface CodeBlockProps {
  /** Code string or pre-highlighted HTML nodes */
  children: ReactNode;
  /** Language label shown in header (e.g. "typescript", "bash") */
  language?: string;
  /** Filename shown instead of language (e.g. "app/api/route.ts") */
  filename?: string;
  /** Show line numbers (not yet implemented — reserved) */
  showLineNumbers?: boolean;
}

export declare function CodeBlock(props: CodeBlockProps): JSX.Element;
