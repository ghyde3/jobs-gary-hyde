'use client';

import React, { useState, useEffect } from 'react';

interface NavLink {
  label: string;
  href: string;
}

interface NavBarProps {
  logo: React.ReactNode;
  links?: NavLink[];
  cta?: React.ReactNode;
}

export function NavBar({ logo, links = [], cta }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        backgroundColor: scrolled ? 'rgba(9,9,11,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px) saturate(150%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(150%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        transition: 'background-color 220ms ease, border-color 220ms ease',
      }}
    >
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: '#FAFAFA',
          fontFamily: "'Space Grotesk',system-ui,sans-serif",
          fontWeight: 700,
          fontSize: '16px',
          letterSpacing: '-0.02em',
          flexShrink: 0,
        }}
      >
        {logo || 'GH'}
      </a>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginLeft: 'auto',
          marginRight: cta ? '16px' : '0',
        }}
      >
        {links.map(({ label, href }, i) => (
          <NavLink key={i} label={label} href={href} />
        ))}
      </div>
      {cta && <div>{cta}</div>}
    </nav>
  );
}

interface NavLinkProps {
  label: string;
  href: string;
}

function NavLink({ label, href }: NavLinkProps) {
  const [hov, setHov] = useState(false);

  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0 12px',
        height: '34px',
        fontSize: '13px',
        fontFamily: "'DM Sans',system-ui,sans-serif",
        fontWeight: 400,
        color: hov ? '#FAFAFA' : '#71717A',
        textDecoration: 'none',
        borderRadius: '4px',
        backgroundColor: hov ? 'rgba(255,255,255,0.04)' : 'transparent',
        transition: 'color 150ms ease, background-color 150ms ease',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
    </a>
  );
}
