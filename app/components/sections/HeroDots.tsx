'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Cursor-reactive amber dot field behind the hero. One canvas, one rAF loop,
 * no React state per frame. Terminal commands talk to it via the
 * 'hero-dots-pulse' window event (see pulseDots below).
 * Reduced motion: a single static render, no loop, no listeners.
 */

export function pulseDots(theme?: 'matrix') {
  window.dispatchEvent(new CustomEvent('hero-dots-pulse', { detail: { theme } }));
}

const SPACING = 27;
const INFLUENCE = 130;
const AMBER = [245, 158, 11] as const;
const MATRIX = [74, 222, 128] as const;

export function HeroDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const cx = canvas.getContext('2d');
    if (!cx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let pts: { x: number; y: number }[] = [];

    const size = () => {
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      for (let y = 14; y < H; y += SPACING)
        for (let x = 14; x < W; x += SPACING) pts.push({ x, y });
    };
    size();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const drawStatic = () => {
      cx.clearRect(0, 0, W, H);
      cx.fillStyle = `rgba(${AMBER.join(',')},0.12)`;
      for (const p of pts) {
        cx.beginPath();
        cx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        cx.fill();
      }
    };

    if (reduced) {
      drawStatic();
      const onResize = () => { size(); drawStatic(); };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    let mx = -9999;
    let my = -9999;
    let t = 0;
    let burst = 0;
    let theme: 'amber' | 'matrix' = 'amber';
    let themeTimer: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => { mx = -9999; my = -9999; };
    const onPulse = (e: Event) => {
      burst = 1.6;
      const detail = (e as CustomEvent).detail as { theme?: 'matrix' } | undefined;
      if (detail?.theme === 'matrix') {
        theme = 'matrix';
        clearTimeout(themeTimer);
        themeTimer = setTimeout(() => { theme = 'amber'; }, 10000);
      }
    };
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(size, 150);
    };

    parent.addEventListener('pointermove', onMove, { passive: true });
    parent.addEventListener('pointerleave', onLeave);
    window.addEventListener('hero-dots-pulse', onPulse);
    window.addEventListener('resize', onResize);

    const draw = () => {
      t += 0.01;
      if (burst > 0) burst -= 0.012;
      cx.clearRect(0, 0, W, H);
      const color = theme === 'matrix' ? MATRIX : AMBER;
      // No pointer yet (or touch device): a slow attractor keeps it alive.
      const ax = mx < -1000 ? W * 0.35 + Math.cos(t) * W * 0.25 : mx;
      const ay = my < -1000 ? H * 0.5 + Math.sin(t * 1.3) * H * 0.3 : my;
      for (const p of pts) {
        const dx = p.x - ax;
        const dy = p.y - ay;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = Math.max(0, 1 - d / INFLUENCE) + Math.max(0, burst) * 0.5;
        const push = Math.min(f, 1) * 10;
        cx.beginPath();
        cx.arc(p.x + (dx / d) * push, p.y + (dy / d) * push, 1.3 + f * 1.8, 0, Math.PI * 2);
        cx.fillStyle = `rgba(${color.join(',')},${Math.min(0.85, 0.1 + f * 0.65)})`;
        cx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(themeTimer);
      clearTimeout(resizeTimer);
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('hero-dots-pulse', onPulse);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
