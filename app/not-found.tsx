import React from 'react';
import { NavBar } from './components/NavBar';
import { Button } from './components/Button';
import { Footer } from './components/sections/Footer';

const logoNode = (
  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <img src="/logo.svg" width={26} height={26} alt="GH" />
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '14px',
        letterSpacing: '-0.02em',
        color: 'var(--text-1)',
      }}
    >
      Gary Hyde
    </span>
  </span>
);

export default function NotFound() {
  return (
    <>
      <NavBar logo={logoNode} />
      <main
        style={{
          paddingTop: '60px',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '40px 24px',
            maxWidth: '480px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(80px, 16vw, 120px)',
              lineHeight: 1,
              letterSpacing: '-0.05em',
              color: '#F59E0B',
              marginBottom: '24px',
            }}
          >
            404
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(22px, 4vw, 28px)',
              letterSpacing: '-0.03em',
              color: '#FAFAFA',
              marginBottom: '16px',
            }}
          >
            Page not found
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: '#71717A',
              lineHeight: '1.65',
              marginBottom: '40px',
            }}
          >
            This page does not exist. The link may be wrong or the page may have moved.
          </p>
          <Button variant="primary" size="lg" href="/">
            Go to the homepage
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
