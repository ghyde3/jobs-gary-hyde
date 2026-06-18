'use client';

import React, { useEffect, useRef, useState } from 'react';
import { resolveCommand, completions, type CommandResult } from '../../lib/terminal';
import { BUSY_LINE, OFFLINE_LINES, AI_BANNER_LINES, AI_GOODBYE, WIN_RED_LINE } from '../../data/terminal';
import { type HistoryItem } from '../../lib/ask';
import { pulseDots } from './HeroDots';

const MAX_SCROLLBACK = 200;

// Quick-start buttons inside the console so a visitor can act without typing.
// `ask` enters gary-ai mode; the others run straight as shell commands.
const QUICK_ACTIONS = [
  { label: 'Chat with Gary.Ai', cmd: 'ask', primary: true },
  { label: 'Pitch 60', cmd: 'pitch 60', primary: false },
  { label: 'Commands help', cmd: 'help', primary: false },
];
const BOOT_HINT = 'pick a button below, type a command (try help), or just ask me anything.';
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
type Props = { intro?: string };

export function HeroTerminal({ intro }: Props) {
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

  // Idle autoplay: types an intro until the visitor interacts. No command echo,
  // so it reads as a greeting rather than a duplicate of the header.
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (userActed.current) return;
      const introLines = intro ? [intro, ''] : [];
      await typeLines([...introLines, BOOT_HINT]);
    }, BOOT_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intro]);

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
        height: '248px',
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

        {/* Quick-action buttons: act without typing */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            padding: '12px 14px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            flexShrink: 0,
          }}
        >
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                markActed();
                inputRef.current?.focus();
                void run(a.cmd);
              }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: a.primary ? '#F59E0B' : '#d4d4d8',
                background: a.primary ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.05)',
                border: a.primary
                  ? '1px solid rgba(245,158,11,0.4)'
                  : '1px solid rgba(255,255,255,0.14)',
                borderRadius: '6px',
                padding: '7px 12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {a.primary && (
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
                </svg>
              )}
              {a.label}
            </button>
          ))}
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
    </div>
  );
}
