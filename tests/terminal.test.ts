import { describe, it, expect } from 'vitest';
import { resolveCommand, completions } from '../app/lib/terminal';
import { PITCHES, ROLE_FIT, CONCERNS, INTERVIEW_KIT, FAQ } from '../app/data/recruiter';

describe('resolveCommand', () => {
  it('returns help text', () => {
    const r = resolveCommand('help');
    expect(r.kind).toBe('text');
    if (r.kind === 'text') expect(r.lines.join(' ')).toContain('whoami');
  });

  it('is case and whitespace tolerant', () => {
    expect(resolveCommand('  HELP  ').kind).toBe('text');
  });

  it('lists projects', () => {
    const r = resolveCommand('projects');
    if (r.kind !== 'text') throw new Error('expected text');
    expect(r.lines.join(' ').toLowerCase()).toContain('lumi');
  });

  it('opens a known project by name', () => {
    const r = resolveCommand('open lumi');
    expect(r.kind).toBe('open');
    if (r.kind === 'open') expect(r.url).toMatch(/^https:/);
  });

  it('errors on unknown project', () => {
    const r = resolveCommand('open nonsense');
    expect(r.kind).toBe('text');
  });

  it('clears', () => {
    expect(resolveCommand('clear').kind).toBe('clear');
  });

  it('contact scrolls to the contact section', () => {
    const r = resolveCommand('contact');
    expect(r.kind).toBe('scroll');
    if (r.kind === 'scroll') expect(r.target).toBe('#contact');
  });

  it('sudo hire gary pulses the dots', () => {
    const r = resolveCommand('sudo hire gary');
    expect(r.kind).toBe('pulse');
  });

  it('theme matrix pulses with the matrix theme', () => {
    const r = resolveCommand('theme matrix');
    expect(r.kind).toBe('pulse');
    if (r.kind === 'pulse') expect(r.theme).toBe('matrix');
  });

  it('ask with no arg enters ai mode without a question', () => {
    const r = resolveCommand('ask');
    expect(r.kind).toBe('enter-ai');
    if (r.kind === 'enter-ai') expect(r.question).toBeUndefined();
  });

  it('ask with a question enters ai mode and carries the question', () => {
    const r = resolveCommand('ask do you know graphql');
    expect(r.kind).toBe('enter-ai');
    if (r.kind === 'enter-ai') expect(r.question).toBe('do you know graphql');
  });

  it('unknown command prints not-found text', () => {
    const r = resolveCommand('do you know graphql?');
    expect(r.kind).toBe('text');
    if (r.kind === 'text') {
      const out = r.lines.join(' ');
      expect(out).toContain('command not found');
      expect(out).toContain('ask');
    }
  });

  it('unknown command includes the command name in the error', () => {
    const r = resolveCommand('frobnicate');
    expect(r.kind).toBe('text');
    if (r.kind === 'text') expect(r.lines[0]).toContain('frobnicate');
  });
});

describe('completions', () => {
  it('completes pro to projects', () => {
    expect(completions('pro')).toContain('projects');
  });
  it('returns nothing for no match', () => {
    expect(completions('zzz')).toEqual([]);
  });
});

describe('recruiter commands', () => {
  it('pitch returns the 30-second pitch by default', () => {
    const r = resolveCommand('pitch');
    expect(r.kind).toBe('text');
    if (r.kind === 'text') expect(r.lines.join(' ')).toContain(PITCHES.thirty);
  });

  it('pitch 60 returns the 60-second pitch', () => {
    const r = resolveCommand('pitch 60');
    expect(r.kind).toBe('text');
    if (r.kind === 'text') expect(r.lines.join(' ')).toContain(PITCHES.sixty);
  });

  it('pitch 120 returns the two-minute pitch', () => {
    const r = resolveCommand('pitch 120');
    expect(r.kind).toBe('text');
    if (r.kind === 'text') expect(r.lines.join(' ')).toContain(PITCHES.twoMinutes);
  });

  it('fit lists strongest fit roles', () => {
    const r = resolveCommand('fit');
    expect(r.kind).toBe('text');
    if (r.kind === 'text') {
      const out = r.lines.join('\n');
      expect(out).toContain('strongest fit');
      expect(out).toContain('weaker fit');
      expect(out).toContain(ROLE_FIT.strongestFit[0]);
      expect(out).toContain(ROLE_FIT.weakerFit[0]);
    }
  });

  it('concerns prints each Q&A pair', () => {
    const r = resolveCommand('concerns');
    expect(r.kind).toBe('text');
    if (r.kind === 'text') {
      const out = r.lines.join('\n');
      expect(out).toContain(CONCERNS[0].question);
      expect(out).toContain(CONCERNS[0].answer);
    }
  });

  it('interview prints section headers and questions', () => {
    const r = resolveCommand('interview');
    expect(r.kind).toBe('text');
    if (r.kind === 'text') {
      const out = r.lines.join('\n');
      const firstSection = Object.keys(INTERVIEW_KIT)[0];
      expect(out).toContain(firstSection);
      expect(out).toContain(Object.values(INTERVIEW_KIT)[0][0]);
    }
  });

  it('faq prints each FAQ Q&A pair', () => {
    const r = resolveCommand('faq');
    expect(r.kind).toBe('text');
    if (r.kind === 'text') {
      const out = r.lines.join('\n');
      expect(out).toContain(FAQ[0].question);
      expect(out).toContain(FAQ[0].answer);
    }
  });
});
