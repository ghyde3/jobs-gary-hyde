import React from 'react';
import { Button } from '../Button';
import { STATS, LINKS } from '../../data/profile';
import { SectionTexture } from '../SectionTexture';
import { PhotoSlider } from './PhotoSlider';

export function About() {
  const mailto = `mailto:${LINKS.email}`;

  return (
    <section
      className="section"
      id="about"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <SectionTexture variant="radial" corner="bottom-left" size="lg" intensity={0.055} />
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .about-slider {
          display: flex;
          justify-content: flex-start;
        }
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 64px;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .stats-row {
            grid-template-columns: 1fr 1fr;
            margin-top: 48px;
          }
        }
        @media (max-width: 480px) {
          .stats-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="about-grid">
          <div>
            <div className="section-label">ABOUT</div>
            <h2 className="section-heading">Who I am</h2>

            <p
              style={{
                fontSize: '16px',
                color: '#A1A1AA',
                lineHeight: '1.65',
                marginBottom: '20px',
              }}
            >
              I am a senior full-stack developer based in the Orlando metro, Florida, with 10+ years
              shipping production web applications. I have built multi-tenant SaaS platforms,
              payment and booking infrastructure, e-commerce systems, and custom tooling for
              clients. I own work end to end: from schema design and API through to a polished,
              fast frontend.
            </p>

            <p
              style={{
                fontSize: '16px',
                color: '#A1A1AA',
                lineHeight: '1.65',
                marginBottom: '20px',
              }}
            >
              Over the last two years I have built with AI in the loop as a core part of how I
              work. I use Cursor and Claude Code daily. I also built my own multi-model code review
              tooling that synthesizes output from several models into a single Ship/Fix/No-Ship
              scorecard, which has tightened feedback cycles and caught real bugs before they
              reach production.
            </p>

            <p
              style={{
                fontSize: '16px',
                color: '#A1A1AA',
                lineHeight: '1.65',
                marginBottom: '32px',
              }}
            >
              I work best on small, senior teams where I can own a meaningful surface. I care about
              production quality, approachable codebases, and fast feedback loops. The code I ship
              is the code I would want to read six months later.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" size="sm" href={mailto}>
                Email me
              </Button>
              {LINKS.github ? (
                <Button variant="secondary" size="sm" href={LINKS.github}>
                  GitHub
                </Button>
              ) : null}
              {LINKS.linkedin ? (
                <Button variant="secondary" size="sm" href={LINKS.linkedin}>
                  LinkedIn
                </Button>
              ) : null}
            </div>
          </div>

          <div className="about-slider">
            <PhotoSlider />
          </div>
        </div>

        <div className="stats-row">
          {STATS.map((stat) => (
            <div
              key={stat.n}
              style={{
                padding: '24px',
                background: '#111113',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '2.25rem',
                  color: '#F59E0B',
                  letterSpacing: '-0.03em',
                  marginBottom: '8px',
                }}
              >
                {stat.n}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: '#71717A',
                  lineHeight: '1.35',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
