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
  ASK_NOTICE,
} from '../data/terminal';

export type CommandResult =
  | { kind: 'text'; lines: string[] }
  | { kind: 'clear' }
  | { kind: 'open'; url: string; lines: string[] }
  | { kind: 'scroll'; target: string; lines: string[] }
  | { kind: 'pulse'; lines: string[]; theme?: 'matrix' }
  | { kind: 'ask'; question: string; notice?: string };

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
      if (!arg) return { kind: 'text', lines: ['usage: ask <question about gary>'] };
      return { kind: 'ask', question: arg };
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
    default:
      // Anything unrecognized becomes a question for gary-ai. The component
      // shows the notice only the first time so the trick stays discoverable.
      return { kind: 'ask', question: input, notice: ASK_NOTICE };
  }
}
