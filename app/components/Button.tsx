'use client';

import React, { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  href,
  leftIcon,
  rightIcon,
  onClick,
  fullWidth = false,
}: ButtonProps) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: "'DM Sans',system-ui,sans-serif",
    fontWeight: 500,
    lineHeight: 1,
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    WebkitFontSmoothing: 'antialiased',
    transform: pressed && !disabled ? 'scale(0.98)' : 'scale(1)',
    transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
    width: fullWidth ? '100%' : undefined,
  };

  const sizes: Record<'sm' | 'md' | 'lg', React.CSSProperties> = {
    sm: { padding: '0 12px', fontSize: '11px', borderRadius: '4px', height: '30px', letterSpacing: '0.04em' },
    md: { padding: '0 20px', fontSize: '13px', borderRadius: '6px', height: '38px' },
    lg: { padding: '0 24px', fontSize: '16px', borderRadius: '6px', height: '46px' },
  };

  const variants: Record<'primary' | 'secondary' | 'ghost' | 'danger', React.CSSProperties> = {
    primary: {
      backgroundColor: hov && !disabled ? '#FCD34D' : '#F59E0B',
      color: '#09090B',
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: hov && !disabled ? '#1F1F23' : '#18181B',
      color: hov ? '#FAFAFA' : '#A1A1AA',
      borderColor: hov ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.08)',
    },
    ghost: {
      backgroundColor: hov && !disabled ? 'rgba(255,255,255,0.06)' : 'transparent',
      color: hov ? '#FAFAFA' : '#A1A1AA',
      borderColor: 'transparent',
    },
    danger: {
      backgroundColor: hov && !disabled ? 'rgba(239,68,68,0.18)' : 'rgba(239,68,68,0.12)',
      color: '#EF4444',
      borderColor: 'rgba(239,68,68,0.25)',
    },
  };

  const style: React.CSSProperties = { ...base, ...sizes[size], ...variants[variant] };

  const handleMouseEnter = () => setHov(true);
  const handleMouseLeave = () => { setHov(false); setPressed(false); };
  const handleMouseDown = () => setPressed(true);
  const handleMouseUp = () => setPressed(false);

  if (href) {
    return (
      <a
        style={style}
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {leftIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{leftIcon}</span>}
        {children}
        {rightIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{rightIcon}</span>}
      </a>
    );
  }

  return (
    <button
      type="button"
      style={style}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {leftIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{leftIcon}</span>}
      {children}
      {rightIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{rightIcon}</span>}
    </button>
  );
}
