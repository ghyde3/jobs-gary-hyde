'use client';

import React, { useEffect, useRef, useState } from 'react';
import { resolveCommand, completions, type CommandResult } from '../../lib/terminal';
import { BUSY_LINE, OFFLINE_LINES, AI_BANNER, AI_GOODBYE } from '../../data/terminal';
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

type Mode = 'shell' | 'ai';
type Props = { boot?: string };

export function HeroTerminal({ boot = 'gary --profile' }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<Mode>('shell');
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
        push(AI_BANNER);
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

  return (
    <div className="heroTerminal">
      <div
        style={{
          background: 'rgba(24,24,27,0.88)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '10px',
          overflow: 'hidden',
          backdropFilter: 'blur(2px)',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 12px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ width: 9, height: 9, borderRadius: '50%', background: '#3f3f46', display: 'inline-block' }}
            />
          ))}
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
        <div
          ref={outRef}
          role="log"
          aria-live="polite"
          aria-label="Terminal output"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            lineHeight: 1.7,
            color: '#d4d4d8',
            padding: '12px 14px',
            height: '280px',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {lines.join('\n')}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
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
