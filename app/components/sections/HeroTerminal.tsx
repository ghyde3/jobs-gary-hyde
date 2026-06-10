'use client';

import React, { useEffect, useRef, useState } from 'react';
import { resolveCommand, completions, type CommandResult } from '../../lib/terminal';
import { BUSY_LINE, OFFLINE_LINES } from '../../data/terminal';
import { pulseDots } from './HeroDots';

const MAX_SCROLLBACK = 200;
const CHIPS = ['why should we hire gary?', 'pitch 60', 'fit', 'concerns', 'sudo hire gary'];
const BOOT_HINT = 'try: pitch 60, fit, or ask why should we hire gary?';
const BOOT_DELAY_MS = 2500;
const TYPE_MS = 8;

type Props = { boot?: string };

export function HeroTerminal({ boot = 'gary --profile' }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const outRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const userActed = useRef(false);
  const noticeShown = useRef(false);
  const skipType = useRef(false);
  const history = useRef<string[]>([]);
  const histIdx = useRef(-1);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight });
  }, [lines]);

  const push = (...ls: string[]) =>
    setLines((prev) => [...prev, ...ls].slice(-MAX_SCROLLBACK));

  // Typewriter: appends one growing line at a time. Reduced motion or a
  // skip request (Enter while typing) prints instantly.
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

  const streamAsk = async (question: string, notice?: string) => {
    if (notice && !noticeShown.current) { push(notice); noticeShown.current = true; }
    setBusy(true);
    push('gary-ai> ');
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const reader = res.body?.getReader();
      if (!reader) throw new Error('no stream');
      const decoder = new TextDecoder();
      let buf = 'gary-ai> ';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const parts = buf.split('\n');
        setLines((prev) => [...prev.slice(0, -1), ...parts].slice(-MAX_SCROLLBACK));
        buf = parts[parts.length - 1];
      }
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
      case 'ask':
        await streamAsk(r.question, r.notice);
        return;
    }
  };

  const run = async (raw: string) => {
    const input = raw.trim();
    if (!input) return;
    if (busy) { push(`$ ${input}`, BUSY_LINE); return; }
    history.current.push(input);
    histIdx.current = history.current.length;
    push(`$ ${input}`);
    await handleResult(resolveCommand(input));
  };

  // Idle autoplay: the terminal demos itself until the visitor interacts.
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
    if (e.key === 'Enter') {
      skipType.current = true;
      const v = el.value;
      el.value = '';
      void run(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx.current > 0) el.value = history.current[--histIdx.current] ?? '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx.current < history.current.length) {
        el.value = history.current[++histIdx.current] ?? '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const opts = completions(el.value);
      if (opts.length === 1) el.value = opts[0];
      else if (opts.length > 1) push(opts.map((o) => o.trim()).join('  '));
    }
  };

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
          <span style={{ color: '#F59E0B' }} aria-hidden>$</span>
          <input
            ref={inputRef}
            aria-label="Type a terminal command or a question for gary-ai"
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
            key={c}
            type="button"
            onClick={() => { markActed(); void run(c); }}
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
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
