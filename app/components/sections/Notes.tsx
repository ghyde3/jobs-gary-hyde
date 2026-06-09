import React from 'react';
import { NOTES } from '../../data/profile';
import { Card } from '../Card';
import { Tag } from '../Tag';
import { SectionTexture } from '../SectionTexture';

export function Notes() {
  return (
    <section
      className="section"
      id="notes"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#111113',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <SectionTexture variant="dots" />
      <style>{`
        .notes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 760px) {
          .notes-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-label">NOTES</div>
        <h2 className="section-heading">On AI-assisted development</h2>
        <p
          style={{
            fontSize: '18px',
            color: '#71717A',
            marginBottom: '48px',
            maxWidth: '600px',
            lineHeight: '1.65',
          }}
        >
          Short notes on how I actually work with these tools. I treat AI as a force multiplier,
          not a replacement for judgment, and most of the leverage lives in the workflow around the
          model.
        </p>
        <div className="notes-grid">
          {NOTES.map((n, i) => (
            <Card key={n.title} padding="lg">
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#F59E0B',
                  letterSpacing: '0.1em',
                  marginBottom: '16px',
                }}
              >
                NOTE {String(i + 1).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '20px',
                  color: '#FAFAFA',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.25,
                  marginBottom: '12px',
                }}
              >
                {n.title}
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: '#A1A1AA',
                  lineHeight: '1.65',
                  marginBottom: '20px',
                }}
              >
                {n.blurb}
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {n.tags.map((t) => (
                  <Tag key={t} size="sm">
                    {t}
                  </Tag>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
