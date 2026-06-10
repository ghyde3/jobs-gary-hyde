import { describe, it, expect } from 'vitest';
import { resolveCommand, completions } from '../app/lib/terminal';

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

  it('ask routes the question', () => {
    const r = resolveCommand('ask do you know graphql');
    expect(r.kind).toBe('ask');
    if (r.kind === 'ask') expect(r.question).toBe('do you know graphql');
  });

  it('unknown input falls through to ask with a notice', () => {
    const r = resolveCommand('do you know graphql?');
    expect(r.kind).toBe('ask');
    if (r.kind === 'ask') expect(r.notice).toBeTruthy();
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
