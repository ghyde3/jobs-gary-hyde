'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '../Badge';
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
  // Alternating "whisper" tint between bands.
  const bandBg = index % 2 === 0 ? '#09090B' : '#0d0d10';
  const indexLabel = String(index + 1).padStart(2, '0');

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
        className="band__media"
        href={previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
      >
        {mediaInner}
      </a>
    ) : (
      <div className="band__media">{mediaInner}</div>
    )
  ) : null;

  return (
    <div
      className={`band${hasImage ? ' band--split' : ''}${
        hasImage && imageRight ? ' band--rev' : ''
      }`}
      style={{ background: bandBg }}
    >
      <style>{`
        /* Gutter that lines the text up with the page container. */
        .band {
          --band-gutter: max(40px, calc((100vw - var(--container-xl)) / 2));
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
        }
        .band--split { grid-template-columns: 1fr 1fr; }
        .band--rev .band__media { order: 2; }
        .band--rev .band__body { order: 1; }

        /* Media bleeds to the viewport edge on its side. */
        .band__media {
          position: relative;
          display: block;
          min-height: 420px;
          background: #0c0c0e;
          overflow: hidden;
        }

        /* Body holds text to the container gutter so it lines up with the heading. */
        .band__body {
          position: relative;
          padding: 64px var(--band-gutter) 64px 64px;
        }
        .band--rev .band__body {
          padding: 64px 64px 64px var(--band-gutter);
        }

        /* Large monospace index watermark, kept subtle and behind the content. */
        .band__index {
          position: absolute;
          top: 24px;
          right: 28px;
          font-family: var(--font-mono);
          font-size: 120px;
          font-weight: 700;
          line-height: 1;
          color: rgba(39, 39, 42, 0.5);
          letter-spacing: -0.04em;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .band--rev .band__index { right: auto; left: 28px; }
        .band__content { position: relative; z-index: 1; }

        @media (max-width: 1280px) {
          .band__body { padding-right: 40px; }
          .band--rev .band__body { padding-left: 40px; }
        }
        @media (max-width: 820px) {
          .band--split { grid-template-columns: 1fr; }
          .band__media {
            min-height: 0;
            aspect-ratio: 16 / 10;
            order: 0 !important;
          }
          .band__body {
            order: 1 !important;
            padding: 40px var(--band-gutter) !important;
          }
          .band__index { font-size: 88px; top: 16px; right: 20px; }
          .band--rev .band__index { left: 20px; }
        }
      `}</style>

      <span className="band__index" aria-hidden="true">
        {indexLabel}
      </span>

      {media}

      <div className="band__body">
        <div className="band__content">
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
    </div>
  );
}
