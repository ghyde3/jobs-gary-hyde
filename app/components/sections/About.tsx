import React from 'react';
import { Button } from '../Button';
import { STATS, LINKS } from '../../data/profile';

export function About() {
  const mailto = `mailto:${LINKS.email}`;

  return (
    <section
      className="section"
      id="about"
      style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>
      <div className="container">
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

          <div className="stats-grid">
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
      </div>
    </section>
  );
}
