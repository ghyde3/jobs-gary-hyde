import { PROFILE, PROJECTS, heroTags, STATS } from '../data/profile';
import {
  HELP_LINES,
  WHOAMI_LINES,
  PROFILE_SCRIPT_LINES,
  RESUME_LINES,
  EGG_SUDO_LINES,
  EGG_VIM_LINES,
  EGG_VIM_QUIT_LINES,
  EGG_COFFEE_LINES,
  EGG_MATRIX_LINES,
} from '../data/terminal';
import { PITCHES, ROLE_FIT, CONCERNS, INTERVIEW_KIT, FAQ } from '../data/recruiter';

export type CommandResult =
  | { kind: 'text'; lines: string[] }
  | { kind: 'clear' }
  | { kind: 'open'; url: string; lines: string[] }
  | { kind: 'scroll'; target: string; lines: string[] }
  | { kind: 'pulse'; lines: string[]; theme?: 'matrix' }
  | { kind: 'enter-ai'; question?: string };

// Commands offered by tab completion. Easter eggs stay out on purpose.
const COMPLETABLE = [
  'help',
  'whoami',
  'projects',
  'open ',
  'stack',
  'contact',
  'cat resume.pdf',
  'clear',
  'ask ',
];

export function completions(prefix: string): string[] {
  const p = prefix.trimStart().toLowerCase();
  if (!p) return [];
  return COMPLETABLE.filter((c) => c.startsWith(p) && c.trim() !== p);
}

function projectLines(): string[] {
  return [
    ...PROJECTS.map(
      (p) => `${p.title.toLowerCase().padEnd(12)} ${p.sub}`,
    ),
    '',
    "type 'open <name>' to visit one, or scroll down for the full cards.",
  ];
}

export function resolveCommand(raw: string): CommandResult {
  const input = raw.trim();
  if (!input) return { kind: 'text', lines: [] };
  const lower = input.toLowerCase();
  const [head, ...rest] = lower.split(/\s+/);
  const arg = rest.join(' ');

  switch (head) {
    case 'help':
      return { kind: 'text', lines: HELP_LINES };
    case 'whoami':
      return { kind: 'text', lines: WHOAMI_LINES };
    case 'projects':
    case 'ls':
      return { kind: 'text', lines: projectLines() };
    case 'open': {
      const proj = PROJECTS.find((p) =>
        p.title.toLowerCase().includes(arg),
      );
      const url = proj?.liveUrl ?? proj?.repoUrl;
      if (!proj || !url) {
        return {
          kind: 'text',
          lines: [`no project matching '${arg}'. try 'projects'.`],
        };
      }
      return { kind: 'open', url, lines: [`opening ${proj.title.toLowerCase()}...`] };
    }
    case 'stack':
      return {
        kind: 'text',
        lines: [heroTags.join('  '), '', STATS.map((s) => `${s.n} ${s.label.toLowerCase()}`).join(' | ')],
      };
    case 'contact':
      return {
        kind: 'scroll',
        target: '#contact',
        lines: ['taking you to the contact form...'],
      };
    case 'cat':
      if (arg === 'resume.pdf') return { kind: 'text', lines: RESUME_LINES };
      return { kind: 'text', lines: [`cat: ${arg || '?'}: no such file`] };
    case 'clear':
      return { kind: 'clear' };
    case 'gary':
      if (arg === '--profile') {
        return {
          kind: 'text',
          lines: [`${PROFILE.name} | ${PROFILE.title}`, ...PROFILE_SCRIPT_LINES],
        };
      }
      return { kind: 'text', lines: ['usage: gary --profile'] };
    case 'ask':
      if (!arg) return { kind: 'enter-ai' };
      return { kind: 'enter-ai', question: arg };
    case 'sudo':
      if (arg === 'hire gary') return { kind: 'pulse', lines: EGG_SUDO_LINES };
      return { kind: 'text', lines: ['nice try. only one sudo command works here.'] };
    case 'vim':
    case 'vi':
    case 'nano':
    case 'emacs':
      return { kind: 'text', lines: EGG_VIM_LINES };
    case ':q':
    case ':q!':
    case ':wq':
      return { kind: 'text', lines: EGG_VIM_QUIT_LINES };
    case 'coffee':
      return { kind: 'text', lines: EGG_COFFEE_LINES };
    case 'theme':
      if (arg === 'matrix') {
        return { kind: 'pulse', theme: 'matrix', lines: EGG_MATRIX_LINES };
      }
      return { kind: 'text', lines: ['themes: matrix (temporarily)'] };
    case 'pitch': {
      if (arg === '60') return { kind: 'text', lines: [PITCHES.sixty] };
      if (arg === '120') return { kind: 'text', lines: [PITCHES.twoMinutes] };
      return { kind: 'text', lines: [PITCHES.thirty] };
    }
    case 'fit':
      return {
        kind: 'text',
        lines: [
          'strongest fit:',
          ...ROLE_FIT.strongestFit.map((r) => `  - ${r}`),
          '',
          'weaker fit:',
          ...ROLE_FIT.weakerFit.map((r) => `  - ${r}`),
        ],
      };
    case 'concerns':
      return {
        kind: 'text',
        lines: CONCERNS.flatMap((c, i) => [
          ...(i > 0 ? [''] : []),
          `Q: ${c.question}`,
          `A: ${c.answer}`,
        ]),
      };
    case 'interview':
      return {
        kind: 'text',
        lines: Object.entries(INTERVIEW_KIT).flatMap(([section, questions], i) => [
          ...(i > 0 ? [''] : []),
          `[${section}]`,
          ...questions.map((q) => `  - ${q}`),
        ]),
      };
    case 'faq':
      return {
        kind: 'text',
        lines: FAQ.flatMap((f, i) => [
          ...(i > 0 ? [''] : []),
          `Q: ${f.question}`,
          `A: ${f.answer}`,
        ]),
      };
    default:
      return {
        kind: 'text',
        lines: [`command not found: ${head}. try 'help', or 'ask' to talk to gary-ai.`],
      };
  }
}
