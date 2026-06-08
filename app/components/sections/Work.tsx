import React from 'react';
import { PROJECTS } from '../../data/profile';
import { ProjectCard } from './ProjectCard';

export function Work() {
  return (
    <section
      className="section"
      id="work"
      style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <style>{`
        .work-stack {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
      `}</style>
      <div className="container">
        <div className="section-label">SELECTED WORK</div>
        <h2 className="section-heading">Things I have shipped</h2>
        <p
          style={{
            fontSize: '18px',
            color: '#71717A',
            marginBottom: '48px',
            maxWidth: '520px',
            lineHeight: '1.65',
          }}
        >
          A few things I have built and shipped. Two of them are live, so go ahead and click through.
        </p>
        <div className="work-stack">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
