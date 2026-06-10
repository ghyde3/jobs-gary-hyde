import { describe, it, expect } from 'vitest';
import { MASTER_PROFILE } from '../app/data/knowledge';

describe('MASTER_PROFILE (public profile)', () => {
  it('contains Gary Hyde and the booking link', () => {
    expect(MASTER_PROFILE).toContain('Gary Hyde');
    expect(MASTER_PROFILE).toContain('https://calendar.app.google/r5fU8RqL8ked3YBq6');
  });

  it('contains no salary-specific dollar amounts', () => {
    expect(MASTER_PROFILE).not.toContain('$120');
    expect(MASTER_PROFILE).not.toContain('$140');
    expect(MASTER_PROFILE).not.toContain('/hr');
    expect(MASTER_PROFILE).not.toContain('per hour');
    expect(MASTER_PROFILE).not.toContain('salary floor');
  });

  it('contains the 750k sales metric', () => {
    expect(MASTER_PROFILE).toContain('750k');
  });

  it('contains Lumi the dog context', () => {
    expect(MASTER_PROFILE).toContain('American Eskimo');
  });

  it('contains Newnan Georgia context', () => {
    expect(MASTER_PROFILE).toContain('Newnan');
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
