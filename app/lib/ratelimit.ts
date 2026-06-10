import { Redis } from '@upstash/redis';

export const PER_VISITOR_DAILY = 50;
export const GLOBAL_DAILY = 500;

const DAY_TTL_SECONDS = 90000; // a day plus slack, counters self-clean

export interface Counter {
  incr(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<unknown>;
}

export function dayKey(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10).replaceAll('-', '');
}

// Null when Upstash env vars are absent: the route then leans on the cookie
// counter alone (degraded mode per the spec), it never hard-fails.
function defaultCounter(): Counter | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function checkLimits(
  visitorId: string,
  counter: Counter | null = defaultCounter(),
): Promise<{ ok: boolean; message?: string }> {
  if (!counter) return { ok: true };
  try {
    const day = dayKey();

    const globalCount = await counter.incr(`ask:global:${day}`);
    if (globalCount === 1) await counter.expire(`ask:global:${day}`, DAY_TTL_SECONDS);
    if (globalCount > GLOBAL_DAILY) {
      return { ok: false, message: 'gary-ai is recharging. try again tomorrow.' };
    }

    const visitorCount = await counter.incr(`ask:v:${visitorId}:${day}`);
    if (visitorCount === 1) await counter.expire(`ask:v:${visitorId}:${day}`, DAY_TTL_SECONDS);
    if (visitorCount > PER_VISITOR_DAILY) {
      return {
        ok: false,
        message: 'daily question limit reached. email gary instead, he answers faster than the bot.',
      };
    }

    return { ok: true };
  } catch (err) {
    console.warn('rate limiter unavailable, failing open:', err);
    return { ok: true };
  }
}
