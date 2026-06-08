'use client';

import React, { useState } from 'react';

interface TagProps {
  children: React.ReactNode;
  size?: 'sm' | 'md';
  active?: boolean;
  onClick?: () => void;
}

export function Tag({ children, size = 'md', active = false, onClick }: TagProps) {
  const [hov, setHov] = useState(false);
  const interactive = Boolean(onClick);

  const sizeStyle: React.CSSProperties =
    size === 'sm'
      ? { padding: '2px 7px', fontSize: '10px' }
      : { padding: '3px 9px', fontSize: '11px' };

  let stateStyle: React.CSSProperties;
  if (active) {
    stateStyle = {
      backgroundColor: 'rgba(245,158,11,0.12)',
      color: '#F59E0B',
      borderColor: 'rgba(245,158,11,0.25)',
    };
  } else if (hov && interactive) {
    stateStyle = {
      backgroundColor: '#1F1F23',
      color: '#FAFAFA',
      borderColor: 'rgba(255,255,255,0.16)',
    };
  } else {
    stateStyle = {
      backgroundColor: '#111113',
      color: '#71717A',
      borderColor: 'rgba(255,255,255,0.08)',
    };
  }

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: "'JetBrains Mono',monospace",
    lineHeight: 1,
    borderRadius: '4px',
    border: '1px solid',
    whiteSpace: 'nowrap',
    cursor: interactive ? 'pointer' : 'default',
    transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
    ...sizeStyle,
    ...stateStyle,
  };

  return (
    <span
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </span>
  );
}
