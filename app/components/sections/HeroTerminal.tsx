'use client';

import React, { useEffect, useRef, useState } from 'react';
import { resolveCommand, completions, type CommandResult } from '../../lib/terminal';
import { BUSY_LINE, OFFLINE_LINES, AI_BANNER_LINES, AI_GOODBYE, WIN_RED_LINE } from '../../data/terminal';
import { type HistoryItem } from '../../lib/ask';
import { pulseDots } from './HeroDots';

const MAX_SCROLLBACK = 200;

// Chips that are questions run `ask <question>` so they enter ai mode.
// Pure commands (pitch 60, fit, etc.) run directly as shell commands.
const CHIPS = [
  { label: 'why should we hire gary?', cmd: 'ask why should we hire gary?' },
  { label: 'pitch 60', cmd: 'pitch 60' },
  { label: 'fit', cmd: 'fit' },
  { label: 'concerns', cmd: 'concerns' },
  { label: 'sudo hire gary', cmd: 'sudo hire gary' },
];
const BOOT_HINT = 'try: pitch 60, fit, or ask why should we hire gary?';
const BOOT_DELAY_MS = 100;
const TYPE_MS = 8;

// Traffic-light colors: muted, low-saturation, comfortable on zinc-950.
const DOT_RED    = '#b85450';
const DOT_YELLOW = '#b8954f';
const DOT_GREEN  = '#4f8f5e';

// Focus ring shared style
const FOCUS_RING: React.CSSProperties = {
  outline: '2px solid #F59E0B',
  outlineOffset: '2px',
};

type Mode = 'shell' | 'ai';
type Props = { boot?: string };

export function HeroTerminal({ boot = 'gary --profile' }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<Mode>('shell');
  const [maximized, setMaximized] = useState(false);
  const outRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const userActed = useRef(false);
  const skipType = useRef(false);
  // Shell command history for up/down recall
  const shellHistory = useRef<string[]>([]);
  const shellHistIdx = useRef(-1);
  // AI session: question history for up/down recall, exchange history for context
  const aiInputHistory = useRef<string[]>([]);
  const aiInputHistIdx = useRef(-1);
  const aiHistory = useRef<HistoryItem[]>([]);
  const reduced = useRef(false);
  // Track mode in a ref for async handlers that close over state
  const modeRef = useRef<Mode>('shell');

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight });
  }, [lines]);

  // Lock body scroll while maximized; release on unmount or restore.
  useEffect(() => {
    if (maximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [maximized]);

  // Escape key restores maximized state.
  useEffect(() => {
    if (!maximized) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMaximized(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [maximized]);

  const push = (...ls: string[]) =>
    setLines((prev) => [...prev, ...ls].slice(-MAX_SCROLLBACK));

  // Typewriter: appends one growing line at a time.
  const typeLines = async (ls: string[]) => {
    if (reduced.current) { push(...ls); return; }
    skipType.current = false;
    for (const line of ls) {
      if (skipType.current) { push(line); continue; }
      push('');
      for (let i = 1; i <= line.length; i++) {
        if (skipType.current) break;
        setLines((prev) => [...prev.slice(0, -1), line.slice(0, i)]);
        await new Promise((r) => setTimeout(r, TYPE_MS));
      }
      setLines((prev) => [...prev.slice(0, -1), line]);
    }
  };

  const enterAiMode = () => {
    modeRef.current = 'ai';
    setMode('ai');
    aiInputHistory.current = [];
    aiInputHistIdx.current = -1;
    aiHistory.current = [];
  };

  const exitAiMode = () => {
    modeRef.current = 'shell';
    setMode('shell');
    aiHistory.current = [];
    aiInputHistory.current = [];
    aiInputHistIdx.current = -1;
  };

  const streamAsk = async (question: string) => {
    setBusy(true);
    push('ai> ');
    let answer = '';
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          history: aiHistory.current.slice(-4),
        }),
      });
      const reader = res.body?.getReader();
      if (!reader) throw new Error('no stream');
      const decoder = new TextDecoder();
      let buf = 'ai> ';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        buf += chunk;
        answer += chunk;
        const parts = buf.split('\n');
        setLines((prev) => [...prev.slice(0, -1), ...parts].slice(-MAX_SCROLLBACK));
        buf = parts[parts.length - 1];
      }
      // Record the exchange in session history
      aiHistory.current = [
        ...aiHistory.current,
        { q: question, a: answer.trim() },
      ].slice(-4);
    } catch {
      setLines((prev) => [...prev.slice(0, -1), ...OFFLINE_LINES]);
    } finally {
      setBusy(false);
    }
  };

  const handleResult = async (r: CommandResult) => {
    switch (r.kind) {
      case 'clear':
        setLines([]);
        return;
      case 'text':
        await typeLines(r.lines);
        return;
      case 'open':
        await typeLines(r.lines);
        window.open(r.url, '_blank', 'noopener');
        return;
      case 'scroll':
        await typeLines(r.lines);
        document.querySelector(r.target)?.scrollIntoView({ behavior: 'smooth' });
        return;
      case 'pulse':
        pulseDots(r.theme);
        await typeLines(r.lines);
        return;
      case 'enter-ai':
        enterAiMode();
        push(...AI_BANNER_LINES);
        if (r.question) {
          push(`ai> ${r.question}`);
          aiInputHistory.current.push(r.question);
          aiInputHistIdx.current = aiInputHistory.current.length;
          await streamAsk(r.question);
        }
        return;
    }
  };

  const runShell = async (raw: string) => {
    const input = raw.trim();
    if (!input) return;
    if (busy) { push(`$ ${input}`, BUSY_LINE); return; }
    shellHistory.current.push(input);
    shellHistIdx.current = shellHistory.current.length;
    push(`$ ${input}`);
    await handleResult(resolveCommand(input));
  };

  const runAi = async (raw: string) => {
    const input = raw.trim();
    if (!input) return;
    const lower = input.toLowerCase();

    if (lower === 'exit' || lower === 'quit' || lower === 'q') {
      push(`ai> ${input}`, AI_GOODBYE);
      exitAiMode();
      return;
    }

    if (lower === 'clear') {
      setLines([]);
      return;
    }

    if (busy) { push(`ai> ${input}`, BUSY_LINE); return; }

    aiInputHistory.current.push(input);
    aiInputHistIdx.current = aiInputHistory.current.length;
    push(`ai> ${input}`);
    await streamAsk(input);
  };

  const run = (raw: string) => {
    if (modeRef.current === 'ai') return runAi(raw);
    return runShell(raw);
  };

  // Idle autoplay: demos itself until the visitor interacts.
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!userActed.current) {
        push(`$ ${boot}`);
        await handleResult(resolveCommand(boot));
        if (!userActed.current) push(BOOT_HINT);
      }
    }, BOOT_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boot]);

  const markActed = () => { userActed.current = true; };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    markActed();
    const el = e.currentTarget;
    const inAi = modeRef.current === 'ai';

    if (e.key === 'Enter') {
      skipType.current = true;
      const v = el.value;
      el.value = '';
      void run(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (inAi) {
        if (aiInputHistIdx.current > 0) {
          el.value = aiInputHistory.current[--aiInputHistIdx.current] ?? '';
        }
      } else {
        if (shellHistIdx.current > 0) el.value = shellHistory.current[--shellHistIdx.current] ?? '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (inAi) {
        if (aiInputHistIdx.current < aiInputHistory.current.length) {
          el.value = aiInputHistory.current[++aiInputHistIdx.current] ?? '';
        }
      } else {
        if (shellHistIdx.current < shellHistory.current.length) {
          el.value = shellHistory.current[++shellHistIdx.current] ?? '';
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (!inAi) {
        const opts = completions(el.value);
        if (opts.length === 1) el.value = opts[0];
        else if (opts.length > 1) push(opts.map((o) => o.trim()).join('  '));
      }
      // Tab does nothing in ai mode
    }
  };

  const promptLabel = mode === 'ai' ? 'ai>' : '$';

  // Window-control handlers
  const onRedDot = () => {
    markActed();
    push(WIN_RED_LINE);
  };
  const onYellowDot = () => {
    markActed();
    setMaximized(false); // no-op when already default
  };
  const onGreenDot = () => {
    markActed();
    setMaximized((v) => !v);
  };

  // The terminal chrome is rendered once; its positioning changes based on maximized.
  const wrapStyle: React.CSSProperties = maximized
    ? {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        height: '85vh',
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(18,18,20,0.98)',
        border: '1px solid rgba(255,255,255,0.13)',
        borderRadius: '10px',
        overflow: 'hidden',
        backdropFilter: 'blur(4px)',
        transition: 'all 200ms ease-out',
      }
    : {
        background: 'rgba(24,24,27,0.88)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        backdropFilter: 'blur(2px)',
        transition: 'all 200ms ease-out',
      };

  const outputStyle: React.CSSProperties = maximized
    ? {
        fontFamily: 'var(--font-mono)',
        fontSize: '13px',
        lineHeight: 1.7,
        color: '#d4d4d8',
        padding: '12px 14px',
        flex: 1,
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }
    : {
        fontFamily: 'var(--font-mono)',
        fontSize: '13px',
        lineHeight: 1.7,
        color: '#d4d4d8',
        padding: '12px 14px',
        height: '280px',
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      };

  // Dot button base style
  const dotBase: React.CSSProperties = {
    width: 9,
    height: 9,
    borderRadius: '50%',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    display: 'inline-block',
    flexShrink: 0,
  };

  return (
    <div className="heroTerminal">
      <div style={wrapStyle} onClick={() => inputRef.current?.focus()}>
        {/* Title bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 12px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            aria-label="Print easter-egg message"
            onClick={(e) => { e.stopPropagation(); onRedDot(); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onRedDot(); } }}
            style={{ ...dotBase, background: DOT_RED }}
            onFocus={(e) => Object.assign(e.currentTarget.style, FOCUS_RING)}
            onBlur={(e) => { e.currentTarget.style.outline = ''; e.currentTarget.style.outlineOffset = ''; }}
          />
          <button
            type="button"
            aria-label="Restore default size"
            onClick={(e) => { e.stopPropagation(); onYellowDot(); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onYellowDot(); } }}
            style={{ ...dotBase, background: DOT_YELLOW }}
            onFocus={(e) => Object.assign(e.currentTarget.style, FOCUS_RING)}
            onBlur={(e) => { e.currentTarget.style.outline = ''; e.currentTarget.style.outlineOffset = ''; }}
          />
          <button
            type="button"
            aria-label={maximized ? 'Restore terminal size' : 'Maximize terminal'}
            onClick={(e) => { e.stopPropagation(); onGreenDot(); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onGreenDot(); } }}
            className="termMaxBtn"
            style={{ ...dotBase, background: DOT_GREEN }}
            onFocus={(e) => Object.assign(e.currentTarget.style, FOCUS_RING)}
            onBlur={(e) => { e.currentTarget.style.outline = ''; e.currentTarget.style.outlineOffset = ''; }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#71717a',
              marginLeft: '8px',
            }}
          >
            gary@jobs.garyhyde.com
          </span>
        </div>

        {/* gary-ai mode strip - visible only while in ai mode */}
        {mode === 'ai' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '4px 12px',
              background: 'rgba(245,158,11,0.08)',
              borderBottom: '1px solid rgba(245,158,11,0.18)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#F59E0B',
              flexShrink: 0,
            }}
          >
            <span>[/] gary-ai</span>
            <span style={{ color: '#a3730a' }}>type exit to leave</span>
          </div>
        )}

        {/* Scrollback output */}
        <div
          ref={outRef}
          role="log"
          aria-live="polite"
          aria-label="Terminal output"
          style={outputStyle}
        >
          {lines.join('\n')}
        </div>

        {/* Input row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            flexShrink: 0,
          }}
        >
          <span style={{ color: '#F59E0B' }} aria-hidden>{promptLabel}</span>
          <input
            ref={inputRef}
            aria-label={mode === 'ai' ? 'Ask gary-ai a question' : 'Type a terminal command'}
            onKeyDown={onKeyDown}
            onFocus={markActed}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            maxLength={280}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#FAFAFA',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              padding: 0,
            }}
          />
        </div>
      </div>

      {/* Chips row */}
      <div className="heroTermChips">
        {CHIPS.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => { markActed(); void run(c.cmd); }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#d4d4d8',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '6px',
              padding: '6px 10px',
              cursor: 'pointer',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
