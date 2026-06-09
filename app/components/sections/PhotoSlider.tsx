'use client';

import React from 'react';
import Image from 'next/image';
import { PHOTOS } from '../../data/profile';

const AUTO_ADVANCE_MS = 4500;
const SWIPE_THRESHOLD = 40;

export function PhotoSlider() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const pointerStartX = React.useRef<number | null>(null);
  const count = PHOTOS.length;

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  React.useEffect(() => {
    if (paused || reducedMotion || count <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, count]);

  const goTo = React.useCallback(
    (i: number) => {
      setActive(((i % count) + count) % count);
    },
    [count]
  );

  const next = React.useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = React.useCallback(() => goTo(active - 1), [active, goTo]);

  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const dx = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) next();
    else prev();
  };

  if (count === 0) return null;

  return (
    <div className="photoslider">
      <style>{`
        .photoslider {
          width: 100%;
          max-width: 480px;
        }
        .photoslider__frame {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #0c0c0e;
          border: 1px solid var(--border, rgba(255, 255, 255, 0.08));
          border-radius: 10px;
          overflow: hidden;
          touch-action: pan-y;
        }
        .photoslider__slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 600ms ease;
        }
        .photoslider__slide--active {
          opacity: 1;
        }
        .photoslider__dots {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: 14px;
        }
        .photoslider__dot {
          width: 8px;
          height: 8px;
          padding: 0;
          border: 0;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.18);
          cursor: pointer;
          transition: background 180ms ease, transform 180ms ease;
        }
        .photoslider__dot:hover {
          background: rgba(255, 255, 255, 0.32);
        }
        .photoslider__dot--active {
          background: #F59E0B;
          transform: scale(1.15);
        }
        .photoslider__dot--active:hover {
          background: #F59E0B;
        }
        @media (prefers-reduced-motion: reduce) {
          .photoslider__slide {
            transition: none;
          }
        }
      `}</style>

      <div
        className="photoslider__frame"
        aria-roledescription="carousel"
        aria-label="Photos of Gary Hyde"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {PHOTOS.map((photo, i) => {
          const isActive = i === active;
          return (
            <div
              key={photo.src}
              className={`photoslider__slide${isActive ? ' photoslider__slide--active' : ''}`}
              aria-hidden={!isActive}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : 'lazy'}
                sizes="(max-width: 768px) 100vw, 480px"
                style={{ objectFit: 'cover' }}
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      <div className="photoslider__dots" role="tablist" aria-label="Choose photo">
        {PHOTOS.map((photo, i) => {
          const isActive = i === active;
          return (
            <button
              key={photo.src}
              type="button"
              className={`photoslider__dot${isActive ? ' photoslider__dot--active' : ''}`}
              aria-label={`Show photo ${i + 1}`}
              aria-selected={isActive}
              role="tab"
              onClick={() => goTo(i)}
            />
          );
        })}
      </div>
    </div>
  );
}
