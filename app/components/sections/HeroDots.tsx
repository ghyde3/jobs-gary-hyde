'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Cursor-reactive dot field behind the hero. One canvas, one rAF loop,
 * no React state per frame. Terminal commands talk to it via the
 * 'hero-dots-pulse' window event (see pulseDots below).
 *
 * Normal theme: dots near the cursor swell purple (#9E0BF5) and morph to teal
 * (#0BF59E) as they shrink and fade out (the triadic pair of the amber accent).
 * Tuned for the white hero background.
 *
 * Matrix easter egg: green dots, paired with HeroConsole flipping the section to
 * black. Reduced motion: a single static render, no loop, no listeners.
 *
 * Cross-handler state (theme, burst, pointer) lives in refs, not effect-local
 * variables, so the pulse/move listeners and the draw loop always share one
 * source of truth even under React's dev double-invoke.
 */

export function pulseDots(theme?: 'matrix') {
  window.dispatchEvent(new CustomEvent('hero-dots-pulse', { detail: { theme } }));
}

const SPACING = 27;
const INFLUENCE = 130;
const PURPLE = [158, 11, 245] as const; // #9E0BF5 - large / near cursor
const TEAL = [11, 245, 158] as const; // #0BF59E - small / fading out
const MATRIX = [74, 222, 128] as const; // green easter egg (on black)

const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

export function HeroDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<'normal' | 'matrix'>('normal');
  const burstRef = useRef(0);
  const mouse = useRef({ x: -9999, y: -9999 });

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
      // Ambient (fading) state leans teal, with a touch of purple so it stays
      // visible on white.
      const r = lerp(TEAL[0], PURPLE[0], 0.3);
      const g = lerp(TEAL[1], PURPLE[1], 0.3);
      const b = lerp(TEAL[2], PURPLE[2], 0.3);
      cx.fillStyle = `rgba(${r},${g},${b},0.42)`;
      for (const p of pts) {
        cx.beginPath();
        cx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
        cx.fill();
      }
    };

    if (reduced) {
      drawStatic();
      const onResize = () => { size(); drawStatic(); };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    let t = 0;
    let themeTimer: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    const onPulse = (e: Event) => {
      burstRef.current = 1.6;
      const detail = (e as CustomEvent).detail as { theme?: 'matrix' } | undefined;
      if (detail?.theme === 'matrix') {
        themeRef.current = 'matrix';
        clearTimeout(themeTimer);
        themeTimer = setTimeout(() => { themeRef.current = 'normal'; }, 10000);
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
      if (burstRef.current > 0) burstRef.current -= 0.012;
      const burst = burstRef.current;
      const matrix = themeRef.current === 'matrix';
      const { x: mx, y: my } = mouse.current;
      cx.clearRect(0, 0, W, H);
      // No pointer yet (or touch device): a slow attractor keeps it alive.
      const ax = mx < -1000 ? W * 0.35 + Math.cos(t) * W * 0.25 : mx;
      const ay = my < -1000 ? H * 0.5 + Math.sin(t * 1.3) * H * 0.3 : my;
      for (const p of pts) {
        const dx = p.x - ax;
        const dy = p.y - ay;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = Math.max(0, 1 - d / INFLUENCE) + Math.max(0, burst) * 0.5;
        const push = Math.min(f, 1) * 10;
        const tt = Math.min(1, f); // color/size lerp factor

        let r: number;
        let g: number;
        let b: number;
        let radius: number;
        let op: number;
        if (matrix) {
          [r, g, b] = MATRIX;
          radius = 1.3 + f * 1.8;
          op = Math.min(0.85, 0.1 + f * 0.72);
        } else {
          r = lerp(TEAL[0], PURPLE[0], tt);
          g = lerp(TEAL[1], PURPLE[1], tt);
          b = lerp(TEAL[2], PURPLE[2], tt);
          radius = 1.6 + tt * 2.8;
          op = Math.min(0.95, 0.34 + f * 0.6);
        }

        cx.beginPath();
        cx.arc(p.x + (dx / d) * push, p.y + (dy / d) * push, radius, 0, Math.PI * 2);
        cx.fillStyle = `rgba(${r},${g},${b},${op})`;
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
