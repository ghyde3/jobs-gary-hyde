import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createHmac, createHash } from 'node:crypto';
import { validateQuestion, buildSystemPrompt } from '../../lib/ask';
import { checkLimits, dayKey, PER_VISITOR_DAILY } from '../../lib/ratelimit';

export const runtime = 'nodejs';

const COOKIE = 'gaq';
const SECRET = process.env.ANTHROPIC_API_KEY ?? process.env.CLAUDE_API_KEY ?? 'dev-secret';

function sign(payload: string): string {
  return createHmac('sha256', SECRET).update(payload).digest('hex').slice(0, 16);
}

function readCookieCount(req: NextRequest, day: string): number {
  const raw = req.cookies.get(COOKIE)?.value;
  if (!raw) return 0;
  const [d, n, sig] = raw.split('.');
  if (d !== day || sign(`${d}.${n}`) !== sig) return 0; // new day or tampered
  return Number(n) || 0;
}

function cookieHeader(day: string, count: number): string {
  const payload = `${day}.${count}`;
  return `${COOKIE}=${payload}.${sign(payload)}; Path=/api/ask; Max-Age=90000; HttpOnly; SameSite=Strict; Secure`;
}

function terminalError(message: string, status: number, extraHeaders: Record<string, string> = {}) {
  return new Response(message, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', ...extraHeaders },
  });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return terminalError('bad request.', 400);
  }
  const v = validateQuestion(body);
  if (!v.ok) return terminalError(v.error, 400);

  const day = dayKey();

  // Layer 1a: signed cookie counter (works even with no Redis configured).
  const cookieCount = readCookieCount(req, day);
  if (cookieCount >= PER_VISITOR_DAILY) {
    return terminalError(
      'daily question limit reached. email gary instead, he answers faster than the bot.',
      429,
    );
  }

  // Layer 1b + 2: Redis per-visitor and global counters, fail open.
  const ip = (req.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim();
  const visitorId = createHash('sha256').update(`${ip}.${SECRET}`).digest('hex').slice(0, 24);
  const limit = await checkLimits(visitorId);
  if (!limit.ok) return terminalError(limit.message ?? 'limit reached.', 429);

  const setCookie = cookieHeader(day, cookieCount + 1);

  // Vercel may store the key under the legacy CLAUDE_API_KEY name
  const apiKey = process.env.ANTHROPIC_API_KEY ?? process.env.CLAUDE_API_KEY;
  const client = new Anthropic({ apiKey });
  // Map validated history to alternating user/assistant messages before the
  // new question so the model has conversational context.
  type MessageParam = { role: 'user' | 'assistant'; content: string };
  const historyMessages: MessageParam[] = v.history.flatMap((h) => [
    { role: 'user' as const, content: h.q },
    { role: 'assistant' as const, content: h.a },
  ]);

  const stream = client.messages.stream(
    {
      model: 'claude-haiku-4-5',
      max_tokens: 300,
      system: [
        {
          type: 'text',
          text: buildSystemPrompt(),
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [...historyMessages, { role: 'user', content: v.question }],
    },
    { timeout: 30000 },
  );

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error('ask stream failed:', err);
        controller.enqueue(
          encoder.encode('gary-ai is offline. the rest of the terminal still works, or just email gary.'),
        );
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'Set-Cookie': setCookie,
    },
  });
}
