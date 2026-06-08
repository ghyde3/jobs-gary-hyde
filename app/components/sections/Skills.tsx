import React from 'react';
import { SKILLS } from '../../data/profile';

export function Skills() {
  return (
    <section
      className="section"
      style={{
        background: '#111113',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }
        @media (max-width: 480px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="container">
        <div className="section-label">SKILLS</div>
        <h2 className="section-heading">The stack</h2>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([group, tags]) => (
            <div key={group}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#F59E0B',
                  letterSpacing: '0.05em',
                  marginBottom: '16px',
                  fontWeight: 500,
                }}
              >
                {group}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {tags.map((t) => (
                  <div
                    key={t}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      color: '#A1A1AA',
                      padding: '6px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
