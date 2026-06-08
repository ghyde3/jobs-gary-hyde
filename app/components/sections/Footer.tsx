import React from 'react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '40px 0' }}>
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.svg" width={26} height={26} alt="GH" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#52525B',
            }}
          >
            Gary Hyde · Full-Stack Developer
          </span>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#52525B',
          }}
        >
          {year}
        </div>
      </div>
    </footer>
  );
}
