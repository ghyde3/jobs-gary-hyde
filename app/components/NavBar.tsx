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

/** A literal hamburger (the food), not three bars. */
function BurgerIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10c0-3.3 3.6-6 8-6s8 2.7 8 6" />
      <line x1="4" y1="10" x2="20" y2="10" />
      <line x1="8.8" y1="6.9" x2="9.4" y2="6.5" />
      <line x1="11.7" y1="6.3" x2="12.3" y2="6.3" />
      <line x1="14.6" y1="6.9" x2="15.2" y2="6.5" />
      <path d="M4 13.5q2 -1.6 4 0t4 0t4 0t4 0" />
      <path d="M4 16.5h16c0 2.2-1.8 3.5-4 3.5H8c-2.2 0-4-1.3-4-3.5z" />
    </svg>
  );
}

export function NavBar({ logo, links = [], cta }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
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

        {/* Desktop links + CTA */}
        <div
          className="navInline"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginLeft: 'auto',
          }}
        >
          {links.map(({ label, href }, i) => (
            <NavLink key={i} label={label} href={href} />
          ))}
          {cta && <div style={{ marginLeft: '12px' }}>{cta}</div>}
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="navBurger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          style={{
            marginLeft: 'auto',
            background: 'transparent',
            border: 'none',
            color: '#FAFAFA',
            cursor: 'pointer',
            padding: '4px',
            lineHeight: 0,
          }}
        >
          <BurgerIcon />
        </button>
      </nav>

      {/* Slideout drawer */}
      <div
        className={`navBackdrop${menuOpen ? ' open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        className={`navDrawer${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Menu"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '60px',
            padding: '0 18px',
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#A1A1AA',
              cursor: 'pointer',
              padding: '6px',
              lineHeight: 0,
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 18px 24px' }}>
          {links.map(({ label, href }, i) => (
            <a
              key={i}
              href={href}
              onClick={close}
              style={{
                fontFamily: "'DM Sans',system-ui,sans-serif",
                fontSize: '17px',
                color: '#E4E4E7',
                textDecoration: 'none',
                padding: '14px 4px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {label}
            </a>
          ))}
          {cta && (
            <div onClick={close} style={{ marginTop: '20px' }}>
              {cta}
            </div>
          )}
        </div>
      </aside>
    </>
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
