import { describe, it, expect } from 'vitest';
import { MASTER_PROFILE } from '../app/data/knowledge';

describe('MASTER_PROFILE (public profile)', () => {
  it('contains Gary Hyde and the booking link', () => {
    expect(MASTER_PROFILE).toContain('Gary Hyde');
    expect(MASTER_PROFILE).toContain('https://calendar.app.google/r5fU8RqL8ked3YBq6');
  });

  it('contains no salary dollar amounts', () => {
    expect(MASTER_PROFILE).not.toMatch(/\$\d/);
  });

  it('contains no Fit Scoring rubric', () => {
    expect(MASTER_PROFILE).not.toContain('Fit Scoring');
    expect(MASTER_PROFILE).not.toContain('rubric');
  });

  it('contains no Role Categories agent instructions', () => {
    expect(MASTER_PROFILE).not.toContain('Role Categories');
  });

  it('contains no "Available upon request" placeholders', () => {
    expect(MASTER_PROFILE).not.toContain('Available upon request');
  });
});
