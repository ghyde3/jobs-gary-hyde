'use client';

import React, { useEffect, useState } from 'react';
import { HeroDots } from './HeroDots';
import { HeroTerminal } from './HeroTerminal';
import { PROFILE } from '../../data/profile';

interface CTA {
  label: string;
  href: string;
}

interface HeroConsoleProps {
  /** The amber-highlight accent line under the name. */
  headline: string;
  /** Typed out inside the console as the intro greeting. */
  intro: string;
  ctaPrimary: CTA;
  ctaSecondary: CTA;
}

/**
 * Console-forward hero shared by the home page and the per-role landing pages.
 * White background with a purple/teal dot grid; the dark console is the
 * centerpiece. The `theme matrix` easter egg flips the whole section to black
 * for 10s (in sync with HeroDots going green), then reverts.
 */
export function HeroConsole({ headline, intro, ctaPrimary, ctaSecondary }: HeroConsoleProps) {
  const [matrix, setMatrix] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail as { theme?: 'matrix' } | undefined;
      if (detail?.theme === 'matrix') {
        setMatrix(true);
        clearTimeout(timer);
        timer = setTimeout(() => setMatrix(false), 10000);
      }
    };
    window.addEventListener('hero-dots-pulse', onPulse);
    return () => {
      window.removeEventListener('hero-dots-pulse', onPulse);
      clearTimeout(timer);
    };
  }, []);

  const nameColor = matrix ? '#FAFAFA' : '#18181B';
  const ctaSecondaryColor = matrix ? '#FAFAFA' : '#18181B';
  const ctaSecondaryBorder = matrix ? 'rgba(255,255,255,0.25)' : 'rgba(24,24,27,0.25)';

  // Badge: opaque enough to read on white, flipped for the dark matrix state.
  const badgeStyle: React.CSSProperties = matrix
    ? {
        background: 'rgba(34,197,94,0.16)',
        borderColor: 'rgba(74,222,128,0.4)',
        color: '#4ADE80',
      }
    : {
        background: 'rgba(34,197,94,0.2)',
        borderColor: 'rgba(21,128,61,0.45)',
        color: '#15803D',
      };

  return (
    <section
      className="section"
      style={{
        paddingTop: '40px',
        paddingBottom: '48px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: matrix ? '#09090B' : '#FFFFFF',
        transition: 'background-color 600ms ease',
      }}
    >
      <HeroDots />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%' }}>
          {/* Name + badge, inline and left-aligned */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '14px',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(44px, 5.5vw, 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: nameColor,
                margin: 0,
                transition: 'color 600ms ease',
              }}
            >
              {PROFILE.name}
            </h1>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '13px',
                lineHeight: 1,
                padding: '6px 12px',
                borderRadius: '9999px',
                border: '1px solid',
                whiteSpace: 'nowrap',
                transition: 'background-color 600ms ease, border-color 600ms ease, color 600ms ease',
                ...badgeStyle,
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#22C55E',
                  flexShrink: 0,
                }}
              />
              {PROFILE.badge}
            </span>
          </div>

          {/* Accent line: black text on amber highlight */}
          <div style={{ marginBottom: '30px' }}>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(18px, 2.4vw, 26px)',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
                background: '#F59E0B',
                color: '#18181B',
                padding: '5px 13px',
                borderRadius: '6px',
              }}
            >
              {headline}
            </span>
          </div>

          {/* The console is the centerpiece */}
          <HeroTerminal intro={intro} />

          {/* Secondary CTA row */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '28px' }}>
            <a
              href={ctaPrimary.href}
              className="heroCtaPrimary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '46px',
                padding: '0 24px',
                borderRadius: '6px',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '16px',
                background: '#F59E0B',
                color: '#09090B',
                textDecoration: 'none',
              }}
            >
              {ctaPrimary.label}
            </a>
            <a
              href={ctaSecondary.href}
              className="heroCtaSecondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '46px',
                padding: '0 24px',
                borderRadius: '6px',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '16px',
                background: 'transparent',
                color: ctaSecondaryColor,
                border: `1px solid ${ctaSecondaryBorder}`,
                textDecoration: 'none',
                transition: 'color 600ms ease, border-color 600ms ease',
              }}
            >
              {ctaSecondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
