'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * HeroMesh - the decorative background layer for the hero.
 *
 * Composition of two independent motion systems that must not fight:
 *  - Drift + breathe: a CSS @keyframes loop runs on an INNER element of each
 *    blob (translate + scale + opacity), GPU-composited.
 *  - Cursor / tilt lean: a single rAF-throttled pointermove (plus device tilt on
 *    coarse pointers) writes --mx / --my on the root; each blob's OUTER wrapper
 *    leans toward the pointer via translate(calc(var(--mx) * Npx), ...).
 * Outer wrapper owns the lean, inner element owns the drift, so the two
 * transforms compose instead of overwriting each other.
 *
 * prefers-reduced-motion: reduce -> no listeners, no keyframes, a single static
 * amber radial (matching today's calm look).
 */

type Blob = {
  /** radial-gradient color stop */
  color: string;
  /** how far this blob leans toward the pointer, in px (depth cue) */
  lean: number;
  /** keyframe animation name */
  anim: string;
  /** outer wrapper positioning + size */
  style: React.CSSProperties;
};

const BLOBS: Blob[] = [
  {
    // large amber, upper-left, closest -> leans the most (bright, near headline side)
    color: 'rgba(245, 158, 11, 0.18)',
    lean: 70,
    anim: 'heroMeshDriftA',
    style: { top: '-14%', left: '-8%', width: '680px', height: '620px' },
  },
  {
    // amber, lower-right, mid depth
    color: 'rgba(245, 158, 11, 0.15)',
    lean: 55,
    anim: 'heroMeshDriftB',
    style: { top: '32%', left: '50%', width: '620px', height: '580px' },
  },
  {
    // amber, upper-right, farther -> leans less
    color: 'rgba(245, 158, 11, 0.15)',
    lean: 40,
    anim: 'heroMeshDriftC',
    style: { top: '-10%', left: '58%', width: '540px', height: '500px' },
  },
  {
    // cool zinc, lower-left, farthest -> leans the least (depth contrast)
    color: 'rgba(63, 63, 70, 0.10)',
    lean: 30,
    anim: 'heroMeshDriftD',
    style: { top: '46%', left: '2%', width: '600px', height: '560px' },
  },
];

export function HeroMesh() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setReducedMotion(true);
      return; // no listeners, no rAF when the user prefers reduced motion
    }

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const apply = () => {
      frame = 0;
      root.style.setProperty('--mx', targetX.toFixed(3));
      root.style.setProperty('--my', targetY.toFixed(3));
    };

    const schedule = () => {
      if (frame) return; // throttle: one rAF per frame, no React re-render
      frame = window.requestAnimationFrame(apply);
    };

    const clamp = (v: number) => (v < -1 ? -1 : v > 1 ? 1 : v);

    const onPointerMove = (e: PointerEvent) => {
      // map pointer to roughly -1..1 around the viewport center
      targetX = clamp((e.clientX / window.innerWidth) * 2 - 1);
      targetY = clamp((e.clientY / window.innerHeight) * 2 - 1);
      schedule();
    };

    const onOrientation = (e: DeviceOrientationEvent) => {
      // gamma: left/right tilt (-90..90), beta: front/back tilt (-180..180)
      if (e.gamma == null || e.beta == null) return;
      targetX = clamp(e.gamma / 35);
      targetY = clamp((e.beta - 45) / 35);
      schedule();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const coarse = window.matchMedia('(pointer: coarse)');
    const tiltActive = coarse.matches;
    if (tiltActive) {
      // passive listener: never blocks or interferes with scrolling
      window.addEventListener('deviceorientation', onOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (tiltActive) {
        window.removeEventListener('deviceorientation', onOrientation);
      }
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (reducedMotion) {
    return (
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '700px',
            background:
              'radial-gradient(ellipse at 40% 40%, rgba(245,158,11,0.13) 0%, transparent 65%)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="heroMeshRoot"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className="heroMeshLean"
          style={{
            position: 'absolute',
            ...blob.style,
            // OUTER wrapper: cursor / tilt lean only (composes with inner drift)
            transform:
              `translate(calc(var(--mx, 0) * ${blob.lean}px), ` +
              `calc(var(--my, 0) * ${blob.lean}px))`,
          }}
        >
          <div
            className="heroMeshDrift"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: `radial-gradient(circle at 50% 50%, ${blob.color} 0%, transparent 70%)`,
              filter: 'blur(44px)',
              animationName: blob.anim,
            }}
          />
        </div>
      ))}

      {/* dedicated cursor-follow glow: centered in the hero, slides a LARGE
          fraction of the pointer offset so it obviously tracks the mouse.
          Outer wrapper owns the cursor follow, inner element owns a gentle drift. */}
      <div
        className="heroMeshCursor"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '460px',
          height: '460px',
          // OUTER wrapper: center, then translate by a large fraction of pointer offset
          transform:
            'translate(-50%, -50%) ' +
            'translate(calc(var(--mx, 0) * 180px), calc(var(--my, 0) * 130px))',
        }}
      >
        <div
          className="heroMeshDrift"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.11) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animationName: 'heroMeshDriftCursor',
          }}
        />
      </div>

      <style>{`
        .heroMeshLean {
          will-change: transform;
          transition: transform 0.2s ease-out;
        }
        .heroMeshCursor {
          will-change: transform;
          transition: transform 0.2s ease-out;
        }
        .heroMeshDrift {
          will-change: transform, opacity;
          animation-duration: 24s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        @keyframes heroMeshDriftA {
          from { transform: translate(0, 0) scale(1); opacity: 0.8; }
          to   { transform: translate(38px, 26px) scale(1.12); opacity: 1; }
        }
        @keyframes heroMeshDriftB {
          from { transform: translate(0, 0) scale(1.06); opacity: 1; }
          to   { transform: translate(-32px, -24px) scale(0.94); opacity: 0.78; }
        }
        @keyframes heroMeshDriftC {
          from { transform: translate(0, 0) scale(0.96); opacity: 0.78; }
          to   { transform: translate(28px, -30px) scale(1.1); opacity: 1; }
        }
        @keyframes heroMeshDriftD {
          from { transform: translate(0, 0) scale(1); opacity: 0.88; }
          to   { transform: translate(-30px, 24px) scale(1.08); opacity: 1; }
        }
        @keyframes heroMeshDriftCursor {
          from { transform: translate(0, 0) scale(0.98); opacity: 0.85; }
          to   { transform: translate(16px, -14px) scale(1.06); opacity: 1; }
        }
        .heroMeshCursor .heroMeshDrift { animation-duration: 21s; animation-delay: -8s; }

        /* stagger durations + delays so blobs never sync up */
        .heroMeshLean:nth-child(1) .heroMeshDrift { animation-duration: 27s; animation-delay: 0s; }
        .heroMeshLean:nth-child(2) .heroMeshDrift { animation-duration: 22s; animation-delay: -6s; }
        .heroMeshLean:nth-child(3) .heroMeshDrift { animation-duration: 30s; animation-delay: -11s; }
        .heroMeshLean:nth-child(4) .heroMeshDrift { animation-duration: 19s; animation-delay: -3s; }

        @media (prefers-reduced-motion: reduce) {
          .heroMeshLean { transition: none; transform: none !important; }
          .heroMeshCursor { transition: none; transform: translate(-50%, -50%) !important; }
          .heroMeshDrift { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
