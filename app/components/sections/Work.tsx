import React from 'react';
import { PROJECTS } from '../../data/profile';
import { ProjectCard } from './ProjectCard';
import { SectionTexture } from '../SectionTexture';

export function Work() {
  return (
    <section
      className="section"
      id="work"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <SectionTexture variant="radial" corner="bottom-right" size="lg" intensity={0.06} />
      <style>{`
        /* Full-bleed run of bands, each separated by a hairline divider. */
        .work-bands {
          display: flex;
          flex-direction: column;
          margin-top: 64px;
        }
        .work-bands > .band {
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .work-bands > .band:last-child {
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
      `}</style>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-label">SELECTED WORK</div>
        <h2 className="section-heading">Things I have shipped</h2>
        <p
          style={{
            fontSize: '18px',
            color: '#71717A',
            maxWidth: '520px',
            lineHeight: '1.65',
          }}
        >
          A few things I have built and shipped. Two of them are live, so go ahead and click through.
        </p>
      </div>

      <div className="work-bands" style={{ position: 'relative', zIndex: 1 }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
