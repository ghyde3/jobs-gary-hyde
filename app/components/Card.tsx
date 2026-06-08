'use client';

import React, { useState } from 'react';

interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  href?: string;
  onClick?: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({
  children,
  padding = 'md',
  hoverable = false,
  href,
  onClick,
  header,
  footer,
}: CardProps) {
  const [hov, setHov] = useState(false);
  const interactive = hoverable || Boolean(href) || Boolean(onClick);

  const pads: Record<'none' | 'sm' | 'md' | 'lg', string> = {
    none: '0',
    sm: '16px',
    md: '24px',
    lg: '32px',
  };

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#111113',
    border: '1px solid',
    borderColor: hov && interactive ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.08)',
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: interactive ? 'pointer' : 'default',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'border-color 150ms ease, transform 220ms ease, box-shadow 150ms ease',
    transform: hov && interactive ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hov && interactive ? '0 10px 20px rgba(0,0,0,0.5)' : 'none',
  };

  const handleMouseEnter = () => setHov(true);
  const handleMouseLeave = () => setHov(false);

  if (href) {
    return (
      <a
        style={style}
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {header && (
          <div style={{ padding: pads[padding], borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
            {header}
          </div>
        )}
        <div style={{ padding: pads[padding], flex: 1 }}>{children}</div>
        {footer && (
          <div style={{ padding: `16px ${pads[padding]}`, borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
            {footer}
          </div>
        )}
      </a>
    );
  }

  return (
    <div
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {header && (
        <div style={{ padding: pads[padding], borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          {header}
        </div>
      )}
      <div style={{ padding: pads[padding], flex: 1 }}>{children}</div>
      {footer && (
        <div style={{ padding: `16px ${pads[padding]}`, borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          {footer}
        </div>
      )}
    </div>
  );
}
