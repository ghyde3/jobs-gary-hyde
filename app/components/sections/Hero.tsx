import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Tag } from '../Tag';
import { HeroDots } from './HeroDots';
import { HeroTerminal } from './HeroTerminal';
import { PROFILE, heroTags } from '../../data/profile';

export function Hero() {
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
      <HeroDots />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="heroGrid">
          <div>
            <div style={{ marginBottom: '24px' }}>
              <Badge variant="success" dot>
                {PROFILE.badge}
              </Badge>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(44px, 5.5vw, 64px)',
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
                fontSize: 'clamp(20px, 2.5vw, 26px)',
                color: '#F59E0B',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: '24px',
              }}
            >
              {PROFILE.title}
            </div>

            <p
              style={{
                fontSize: '17px',
                color: '#A1A1AA',
                lineHeight: '1.65',
                marginBottom: '32px',
                maxWidth: '480px',
              }}
            >
              {PROFILE.summary}
            </p>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                marginBottom: '32px',
              }}
            >
              <Button variant="primary" size="lg" href="#work">
                View my work
              </Button>
              <Button variant="secondary" size="lg" href="#contact">
                Get in touch
              </Button>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {heroTags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>

          <HeroTerminal />
        </div>
      </div>
    </section>
  );
}
