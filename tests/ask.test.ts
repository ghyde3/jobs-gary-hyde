import { describe, it, expect } from 'vitest';
import { validateQuestion, buildSystemPrompt, MAX_QUESTION_LENGTH } from '../app/lib/ask';

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
});
