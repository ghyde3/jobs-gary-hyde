import React from 'react';
import { MODELS } from '../../data/profile';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { SectionTexture } from '../SectionTexture';

export function Models() {
  return (
    <section
      className="section"
      id="models"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <SectionTexture variant="radial" corner="top-right" size="md" intensity={0.05} />
      <style>{`
        .models-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 980px) {
          .models-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .models-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-label">MODELS</div>
        <h2 className="section-heading">Models I have tested</h2>
        <p
          style={{
            fontSize: '18px',
            color: '#71717A',
            marginBottom: '48px',
            maxWidth: '560px',
            lineHeight: '1.65',
          }}
        >
          I keep a rotation of models and pick the right one for the job. Here is where each one
          earns its place in my workflow.
        </p>
        <div className="models-grid">
          {MODELS.map((m) => (
            <Card key={m.name} padding="lg">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '20px',
                      color: '#FAFAFA',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.2,
                    }}
                  >
                    {m.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: '#52525B',
                      letterSpacing: '0.04em',
                      marginTop: '4px',
                    }}
                  >
                    {m.maker}
                  </div>
                </div>
                <Badge variant="accent" size="sm">
                  {m.tag}
                </Badge>
              </div>
              <p style={{ fontSize: '14px', color: '#A1A1AA', lineHeight: '1.65' }}>{m.take}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
