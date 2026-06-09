import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { HeroMesh } from './HeroMesh';
import { PROFILE } from '../../data/profile';

interface RoleHeroProps {
  headline: string;
  subhead: string;
}

export function RoleHero({ headline, subhead }: RoleHeroProps) {
  return (
    <section
      className="section"
      style={{
        paddingTop: '80px',
        paddingBottom: '96px',
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <HeroMesh />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '680px' }}>
          <div style={{ marginBottom: '24px' }}>
            <Badge variant="success" dot>
              {PROFILE.badge}
            </Badge>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(52px, 7vw, 72px)',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              color: '#FAFAFA',
              marginBottom: '20px',
            }}
          >
            {PROFILE.name}
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(22px, 3vw, 30px)',
              color: '#F59E0B',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '24px',
            }}
          >
            {headline}
          </div>

          <p
            style={{
              fontSize: '18px',
              color: '#A1A1AA',
              lineHeight: '1.65',
              marginBottom: '40px',
              maxWidth: '540px',
            }}
          >
            {subhead}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" href="#role">
              See why I fit
            </Button>
            <Button variant="secondary" size="lg" href="#contact">
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
