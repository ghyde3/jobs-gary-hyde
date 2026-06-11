'use client';

import React, { useEffect, useState } from 'react';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          'auto-rotate'?: boolean;
          'auto-rotate-delay'?: number;
          'rotation-per-second'?: string;
          'camera-controls'?: boolean;
          'disable-zoom'?: boolean;
          'disable-pan'?: boolean;
          'interaction-prompt'?: string;
          'shadow-intensity'?: string;
          exposure?: string;
          loading?: string;
        },
        HTMLElement
      >;
    }
  }
}

export function Logo3D({ size = 120 }: { size?: number }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return;

    let cancelled = false;
    import('@google/model-viewer').then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return null;

  return (
    <div style={{ width: `${size}px`, height: `${size}px` }} aria-hidden="true">
      {ready && (
        <model-viewer
          src="/gh-logo.glb"
          alt="GH logo"
          auto-rotate
          auto-rotate-delay={0}
          rotation-per-second="25deg"
          camera-controls
          disable-zoom
          disable-pan
          interaction-prompt="none"
          shadow-intensity="0"
          exposure="1.1"
          loading="eager"
          style={{ width: '100%', height: '100%', '--poster-color': 'transparent' } as React.CSSProperties}
        />
      )}
    </div>
  );
}
