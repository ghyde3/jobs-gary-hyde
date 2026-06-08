import React from 'react';

interface DividerProps {
  label?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

export function Divider({ label, spacing = 'md' }: DividerProps) {
  const spacings: Record<'sm' | 'md' | 'lg', string> = {
    sm: '24px',
    md: '40px',
    lg: '64px',
  };
  const m = spacings[spacing];

  if (!label) {
    return (
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          margin: `${m} 0`,
          width: '100%',
        }}
      />
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: `${m} 0`, width: '100%' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
      <span
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '11px',
          color: '#52525B',
          letterSpacing: '0.14em',
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
    </div>
  );
}
