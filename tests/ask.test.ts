import { describe, it, expect } from 'vitest';
import {
  validateQuestion,
  validateHistory,
  buildSystemPrompt,
  MAX_QUESTION_LENGTH,
  MAX_HISTORY_ITEMS,
  MAX_HISTORY_Q_LENGTH,
  MAX_HISTORY_A_LENGTH,
} from '../app/lib/ask';
import { WHY_AVAILABLE } from '../app/data/recruiter';

describe('validateQuestion', () => {
  it('accepts a normal question', () => {
    const r = validateQuestion({ question: 'do you know graphql?' });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.question).toBe('do you know graphql?');
  });

  it('trims whitespace', () => {
    const r = validateQuestion({ question: '  hi  ' });
    if (!r.ok) throw new Error('expected ok');
    expect(r.question).toBe('hi');
  });

  it('rejects non-object bodies', () => {
    expect(validateQuestion(null).ok).toBe(false);
    expect(validateQuestion('hi').ok).toBe(false);
  });

  it('rejects missing or non-string question', () => {
    expect(validateQuestion({}).ok).toBe(false);
    expect(validateQuestion({ question: 42 }).ok).toBe(false);
  });

  it('rejects empty and over-length questions', () => {
    expect(validateQuestion({ question: '   ' }).ok).toBe(false);
    expect(validateQuestion({ question: 'x'.repeat(MAX_QUESTION_LENGTH + 1) }).ok).toBe(false);
  });

  it('returns empty history when history is absent', () => {
    const r = validateQuestion({ question: 'hi' });
    if (!r.ok) throw new Error('expected ok');
    expect(r.history).toEqual([]);
  });

  it('passes valid history through', () => {
    const history = [
      { q: 'what has gary shipped?', a: 'Lumi, jobseek site, and several client apps.' },
      { q: 'which used postgresql?', a: 'Lumi uses PostgreSQL for its data layer.' },
    ];
    const r = validateQuestion({ question: 'follow-up', history });
    if (!r.ok) throw new Error('expected ok');
    expect(r.history).toEqual(history);
  });
});

describe('validateHistory', () => {
  it('accepts an empty array', () => {
    expect(validateHistory([])).toEqual([]);
  });

  it('accepts up to MAX_HISTORY_ITEMS valid items', () => {
    const items = Array.from({ length: MAX_HISTORY_ITEMS }, (_, i) => ({
      q: `question ${i}`,
      a: `answer ${i}`,
    }));
    expect(validateHistory(items)).toEqual(items);
  });

  it('drops the entire history when more than MAX_HISTORY_ITEMS are provided', () => {
    const items = Array.from({ length: MAX_HISTORY_ITEMS + 1 }, (_, i) => ({
      q: `question ${i}`,
      a: `answer ${i}`,
    }));
    expect(validateHistory(items)).toEqual([]);
  });

  it('drops individual items where q exceeds MAX_HISTORY_Q_LENGTH', () => {
    const items = [
      { q: 'x'.repeat(MAX_HISTORY_Q_LENGTH + 1), a: 'fine answer' },
    ];
    expect(validateHistory(items)).toEqual([]);
  });

  it('drops individual items where a exceeds MAX_HISTORY_A_LENGTH', () => {
    const items = [
      { q: 'fine question', a: 'x'.repeat(MAX_HISTORY_A_LENGTH + 1) },
    ];
    expect(validateHistory(items)).toEqual([]);
  });

  it('drops individual items with missing or wrong-typed fields', () => {
    expect(validateHistory([{ q: 'only q' }])).toEqual([]);
    expect(validateHistory([{ a: 'only a' }])).toEqual([]);
    expect(validateHistory([{ q: 123, a: 'fine' }])).toEqual([]);
    expect(validateHistory(['not an object'])).toEqual([]);
    expect(validateHistory([null])).toEqual([]);
  });

  it('drops individual items with empty strings', () => {
    expect(validateHistory([{ q: '', a: 'fine' }])).toEqual([]);
    expect(validateHistory([{ q: 'fine', a: '' }])).toEqual([]);
  });

  it('returns empty array for non-array input', () => {
    expect(validateHistory(null)).toEqual([]);
    expect(validateHistory(undefined)).toEqual([]);
    expect(validateHistory('string')).toEqual([]);
    expect(validateHistory(42)).toEqual([]);
  });

  it('keeps valid items and drops invalid ones in a mixed array', () => {
    const items = [
      { q: 'valid question', a: 'valid answer' },
      { q: 'also valid', a: 'also valid answer' },
      { q: 'x'.repeat(MAX_HISTORY_Q_LENGTH + 1), a: 'fine' },
    ];
    // 3 items total but one is invalid -- only valid items pass, and the count
    // stays under MAX_HISTORY_ITEMS so the array is not dropped.
    expect(validateHistory(items)).toEqual([items[0], items[1]]);
  });
});

describe('buildSystemPrompt', () => {
  it('contains the profile, voice rules, and project data', () => {
    const s = buildSystemPrompt();
    expect(s).toContain('Gary Hyde');
    expect(s.toLowerCase()).toContain('lumi');
    expect(s).toContain('1 to 4 short lines');
  });

  it('is deterministic so prompt caching works', () => {
    expect(buildSystemPrompt()).toBe(buildSystemPrompt());
  });

  it('contains the booking link', () => {
    const s = buildSystemPrompt();
    expect(s).toContain('https://calendar.app.google/r5fU8RqL8ked3YBq6');
  });

  it('contains the WHY_AVAILABLE scripted line', () => {
    const s = buildSystemPrompt();
    expect(s).toContain(WHY_AVAILABLE);
  });

  it('contains no dollar amounts followed by digits', () => {
    const s = buildSystemPrompt();
    expect(s).not.toMatch(/\$\d/);
  });

  it('contains compensation and injection policy rules', () => {
    const s = buildSystemPrompt();
    expect(s).toContain('COMPENSATION');
    expect(s).toContain('INJECTION RESISTANCE');
  });
});
