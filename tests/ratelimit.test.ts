import { describe, it, expect } from 'vitest';
import { dayKey, checkLimits, PER_VISITOR_DAILY, GLOBAL_DAILY, type Counter } from '../app/lib/ratelimit';

function fakeCounter(): Counter & { store: Map<string, number> } {
  const store = new Map<string, number>();
  return {
    store,
    async incr(key: string) {
      const n = (store.get(key) ?? 0) + 1;
      store.set(key, n);
      return n;
    },
    async expire() {},
  };
}

describe('dayKey', () => {
  it('formats as yyyymmdd UTC', () => {
    expect(dayKey(new Date('2026-06-09T03:00:00Z'))).toBe('20260609');
  });
});

describe('checkLimits', () => {
  it('allows under the limit', async () => {
    const c = fakeCounter();
    const r = await checkLimits('abc', c);
    expect(r.ok).toBe(true);
  });

  it('blocks the visitor past PER_VISITOR_DAILY', async () => {
    const c = fakeCounter();
    let r = { ok: true as boolean, message: undefined as string | undefined };
    for (let i = 0; i <= PER_VISITOR_DAILY; i++) r = await checkLimits('abc', c);
    expect(r.ok).toBe(false);
    expect(r.message).toContain('daily');
  });

  it('blocks everyone past GLOBAL_DAILY', async () => {
    const c = fakeCounter();
    c.store.set(`ask:global:${dayKey()}`, GLOBAL_DAILY);
    const r = await checkLimits('fresh-visitor', c);
    expect(r.ok).toBe(false);
    expect(r.message).toContain('recharging');
  });

  it('fails open when the counter throws', async () => {
    const broken: Counter = {
      async incr() { throw new Error('redis down'); },
      async expire() { throw new Error('redis down'); },
    };
    const r = await checkLimits('abc', broken);
    expect(r.ok).toBe(true);
  });
});
