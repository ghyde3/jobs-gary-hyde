import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'accent' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export function Badge({ children, variant = 'neutral', size = 'md', dot = false }: BadgeProps) {
  const sizes: Record<'sm' | 'md', React.CSSProperties> = {
    sm: { padding: '2px 8px', fontSize: '10px' },
    md: { padding: '3px 10px', fontSize: '11px' },
  };

  const variants: Record<'neutral' | 'accent' | 'success' | 'error' | 'warning' | 'info', React.CSSProperties> = {
    neutral: { backgroundColor: '#1F1F23', color: '#A1A1AA', borderColor: 'rgba(255,255,255,0.08)' },
    accent:  { backgroundColor: 'rgba(245,158,11,0.12)', color: '#F59E0B', borderColor: 'rgba(245,158,11,0.25)' },
    success: { backgroundColor: 'rgba(34,197,94,0.12)', color: '#22C55E', borderColor: 'rgba(34,197,94,0.25)' },
    error:   { backgroundColor: 'rgba(239,68,68,0.12)', color: '#EF4444', borderColor: 'rgba(239,68,68,0.25)' },
    warning: { backgroundColor: 'rgba(245,158,11,0.12)', color: '#F59E0B', borderColor: 'rgba(245,158,11,0.25)' },
    info:    { backgroundColor: 'rgba(59,130,246,0.12)', color: '#3B82F6', borderColor: 'rgba(59,130,246,0.25)' },
  };

  const dotColors: Record<'neutral' | 'accent' | 'success' | 'error' | 'warning' | 'info', string> = {
    neutral: '#71717A',
    accent:  '#F59E0B',
    success: '#22C55E',
    error:   '#EF4444',
    warning: '#F59E0B',
    info:    '#3B82F6',
  };

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: "'DM Sans',system-ui,sans-serif",
    fontWeight: 500,
    lineHeight: 1,
    borderRadius: '9999px',
    border: '1px solid',
    whiteSpace: 'nowrap',
    ...sizes[size],
    ...variants[variant],
  };

  return (
    <span style={style}>
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: dotColors[variant],
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
}
