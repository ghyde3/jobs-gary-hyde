'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '../Badge';
import { Card } from '../Card';
import { Tag } from '../Tag';
import type { Project } from '../../data/profile';

const CATEGORY_VARIANTS: Record<
  string,
  'neutral' | 'accent' | 'success' | 'error' | 'warning' | 'info'
> = {
  'AI Product': 'accent',
  Game: 'info',
  'E-commerce': 'success',
  'SaaS Platform': 'info',
  Payments: 'accent',
  'Custom Plugin': 'neutral',
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const catVariant = CATEGORY_VARIANTS[project.category] ?? 'neutral';
  const hasImage = Boolean(project.image);
  const imageRight = index % 2 === 1;
  const previewUrl = project.liveUrl ?? project.repoUrl;
  const hasFooterLink = Boolean(project.liveUrl || project.repoUrl);

  const mediaInner = hasImage ? (
    <Image
      src={project.image as string}
      alt={project.imageAlt ?? `${project.title} screenshot`}
      fill
      priority={index < 2}
      sizes="(max-width: 820px) 100vw, 50vw"
      style={{ objectFit: 'cover', objectPosition: 'top' }}
    />
  ) : null;

  const media = hasImage ? (
    previewUrl ? (
      <a
        className="pcard__media"
        href={previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
      >
        {mediaInner}
      </a>
    ) : (
      <div className="pcard__media">{mediaInner}</div>
    )
  ) : null;

  return (
    <Card padding="none">
      <style>{`
        .pcard { display: grid; grid-template-columns: 1fr; }
        .pcard--split { grid-template-columns: 1.05fr 1fr; }
        .pcard--rev .pcard__media { order: 2; }
        .pcard--rev .pcard__body { order: 1; }
        .pcard__media {
          position: relative;
          display: block;
          min-height: 320px;
          background: #0c0c0e;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .pcard--rev .pcard__media { border-right: none; border-left: 1px solid rgba(255,255,255,0.08); }
        .pcard__body { padding: 36px; }
        @media (max-width: 820px) {
          .pcard--split { grid-template-columns: 1fr; }
          .pcard__media {
            min-height: 0;
            aspect-ratio: 16 / 10;
            border-right: none;
            border-left: none;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            order: 0 !important;
          }
          .pcard__body { order: 1 !important; padding: 28px; }
        }
      `}</style>

      <div
        className={`pcard${hasImage ? ' pcard--split' : ''}${
          hasImage && imageRight ? ' pcard--rev' : ''
        }`}
      >
        {media}

        <div className="pcard__body">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '16px',
            }}
          >
            <Badge variant={catVariant} size="sm">
              {project.category}
            </Badge>
            {project.liveUrl ? (
              <Badge variant="success" size="sm" dot>
                Live
              </Badge>
            ) : (
              <Badge variant="success" size="sm">
                Shipped
              </Badge>
            )}
          </div>

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '24px',
              color: '#FAFAFA',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '8px',
            }}
          >
            {project.title}
          </div>

          <div
            style={{
              fontSize: '14px',
              color: '#71717A',
              marginBottom: '20px',
              lineHeight: '1.4',
            }}
          >
            {project.sub}
          </div>

          <p
            style={{
              fontSize: '14px',
              color: '#A1A1AA',
              lineHeight: '1.65',
              marginBottom: '20px',
              maxWidth: '620px',
            }}
          >
            {project.desc}
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '24px',
            }}
          >
            {project.highlights.map((h) => (
              <div
                key={h}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '10px',
                  fontSize: '14px',
                  color: '#A1A1AA',
                }}
              >
                <span
                  style={{
                    color: '#F59E0B',
                    fontSize: '13px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  -&gt;
                </span>
                {h}
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap',
              marginBottom: hasFooterLink ? '24px' : 0,
            }}
          >
            {project.stack.map((t) => (
              <Tag key={t} size="sm">
                {t}
              </Tag>
            ))}
          </div>

          {hasFooterLink && (
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#F59E0B',
                    letterSpacing: '0.01em',
                  }}
                >
                  Visit live site
                  <span style={{ fontWeight: 700 }}>-&gt;</span>
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: project.liveUrl ? '#A1A1AA' : '#F59E0B',
                    letterSpacing: '0.01em',
                  }}
                >
                  View on GitHub
                  <span style={{ fontWeight: 700 }}>-&gt;</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
