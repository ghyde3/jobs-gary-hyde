export const HELP_LINES = [
  'available commands:',
  '  whoami       about me',
  '  projects     things I have shipped',
  '  open <name>  open a live project',
  '  stack        what I build with',
  '  contact      reach me',
  '  cat resume.pdf',
  '  clear        wipe the screen',
  '  ask          start a conversation with gary-ai (ask <question> to jump in)',
  '',
  'for recruiters:',
  '  pitch        30-second summary (pitch 60, pitch 120 for longer)',
  '  fit          strongest and weaker fit roles',
  '  concerns     common objections, answered',
  '  interview    suggested interview questions',
  '  faq          logistics: location, remote, availability',
  '',
  'there are also a few undocumented commands. happy hunting.',
];

export const WHOAMI_LINES = [
  'Gary Hyde. Senior full-stack developer, Orlando metro.',
  '10+ years shipping production web apps. I own the data',
  'model, the API, and the pixel.',
];

export const PROFILE_SCRIPT_LINES = [
  '> open to senior and lead roles',
  '> 10+ years in production',
  '> react / next.js / typescript / node / postgresql',
  '> ships end to end, AI-augmented workflow',
  '',
  "type 'help' to look around, or just ask me something.",
];

export const RESUME_LINES = [
  'every application gets a resume tailored to the role,',
  "so there is no generic one mounted here. type 'contact'",
  'and Gary will send the right version.',
];

export const EGG_SUDO_LINES = [
  '[sudo] password for recruiter: ********',
  'access granted.',
  'scheduling interview........ done',
  'Good call. Check your calendar.',
];

export const EGG_VIM_LINES = [
  'you are now trapped in vim. just kidding, type :q',
];

export const EGG_VIM_QUIT_LINES = ['phew. that was close.'];

export const EGG_COFFEE_LINES = ["418 I'm a teapot"];

export const EGG_MATRIX_LINES = ['wake up, neo... (10 seconds)'];

// Legacy single-line export kept for reference; the component uses AI_BANNER_LINES.
export const AI_BANNER = "gary-ai interactive. ask anything about gary. type 'exit' to leave.";

// Multi-line entry banner for gary-ai mode (8.4).
// Mascot: a compact 4-line ASCII figure. Wordmark on line 2, hint on line 5.
export const AI_BANNER_LINES = [
  '  _____',
  ' / g-a \\   gary-ai -- recruiter assistant',
  '|  [ ] |   ask me anything about gary.',
  ' \\_____/   i know the resume. i know the work.',
  "           type 'exit' to leave.",
];

export const WIN_RED_LINE = "this terminal stays open. gary needs the work.";

export const AI_GOODBYE = 'gary-ai session ended. back at the shell.';

export const BUSY_LINE = 'one question at a time, please.';

export const OFFLINE_LINES = [
  'gary-ai is offline. the rest of the terminal still works,',
  'or just email gary.',
];
