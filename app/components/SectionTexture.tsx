import React from 'react';

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface SectionTextureProps {
  variant: 'dots' | 'iso' | 'lines' | 'radial';
  corner?: Corner;
  // Radial-only: controls the glow diameter and amber alpha. Defaults keep
  // existing radial calls unchanged.
  size?: 'md' | 'lg';
  intensity?: number;
}

// Radial diameters per size. 'md' matches the original 60% ellipse.
const RADIAL_SIZE: Record<'md' | 'lg', string> = {
  md: '60% 60%',
  lg: '80% 80%',
};

const CORNER_POSITION: Record<Corner, string> = {
  'top-left': '0% 0%',
  'top-right': '100% 0%',
  'bottom-left': '0% 100%',
  'bottom-right': '100% 100%',
};

const baseStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 0,
};

// Lighter edge fade than before, so the grid clearly reads in the section body
// and only feathers at the very edges.
const GRID_MASK =
  'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.5) 88%, transparent 100%)';

export function SectionTexture({
  variant,
  corner = 'top-right',
  size = 'md',
  intensity = 0.05,
}: SectionTextureProps) {
  if (variant === 'dots') {
    const dotStyle: React.CSSProperties = {
      ...baseStyle,
      backgroundImage:
        'radial-gradient(rgba(255,255,255,0.045) 1.5px, transparent 1.5px)',
      backgroundSize: '26px 26px',
      WebkitMaskImage: GRID_MASK,
      maskImage: GRID_MASK,
    };
    return <div aria-hidden style={dotStyle} />;
  }

  if (variant === 'iso') {
    // Isometric / diamond lattice: two dot layers, the second offset by half a
    // cell in both axes so the dots stagger into a triangular grid.
    const isoStyle: React.CSSProperties = {
      ...baseStyle,
      backgroundImage:
        'radial-gradient(rgba(255,255,255,0.045) 1.5px, transparent 1.5px), ' +
        'radial-gradient(rgba(255,255,255,0.045) 1.5px, transparent 1.5px)',
      backgroundSize: '28px 28px, 28px 28px',
      backgroundPosition: '0 0, 14px 14px',
      WebkitMaskImage: GRID_MASK,
      maskImage: GRID_MASK,
    };
    return <div aria-hidden style={isoStyle} />;
  }

  if (variant === 'lines') {
    // Regular line grid: vertical + horizontal 1px lines. Slightly lower alpha
    // than the dots since lines cover more area.
    const lineStyle: React.CSSProperties = {
      ...baseStyle,
      backgroundImage:
        'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), ' +
        'linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
      WebkitMaskImage: GRID_MASK,
      maskImage: GRID_MASK,
    };
    return <div aria-hidden style={lineStyle} />;
  }

  const radialStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundImage: `radial-gradient(ellipse ${RADIAL_SIZE[size]} at ${CORNER_POSITION[corner]}, rgba(245,158,11,${intensity}) 0%, transparent 70%)`,
  };
  return <div aria-hidden style={radialStyle} />;
}
