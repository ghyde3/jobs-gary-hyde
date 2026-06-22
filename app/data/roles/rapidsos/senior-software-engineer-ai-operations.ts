import type { RoleData } from '../types';

export const rapidsosSeniorSoftwareEngineerAiOperations: RoleData = {
  company: 'rapidsos',
  role: 'senior-software-engineer-ai-operations',
  companyName: 'RapidSOS',
  roleTitle: 'Senior Software Engineer, AI Operations',

  hero: {
    headline: 'I take an AI idea from intake flow to a deployed agent pipeline, alone',
    subhead:
      'Full-stack TypeScript and Node.js, with a real practice of building AI agents, tools, and ' +
      'internal automations. I work the way this role is written: an idea becomes a production ' +
      'system fast, without waiting on a big team to make it happen.',
  },

  note: [
    'I am applying for the Senior Software Engineer, AI Operations role at RapidSOS. The part ' +
    'that pulled me in is the mandate itself: build the AI agents, tools, and automations that ' +
    'internal teams actually use, in full-stack TypeScript and Node.js, and take an idea to a ' +
    'deployed production system quickly and independently. That is not an aspiration for me, it ' +
    'is the loop I already run every week.',

    'The clearest proof is Pathara, an AI product I built end to end. I took it from the intake ' +
    'flow through a deployed AI agent pipeline that does the research and writing, to a ' +
    'per-candidate results portal with downloads and an application tracker, on Supabase with ' +
    'row-level security and storage throughout. There was no separate backend, frontend, or ' +
    'design resource. The idea, the pipeline, and the production deploy were all mine, which is ' +
    'exactly the shape of work this role describes.',

    'I also live in the kind of tools this role names. AI coding agents are my daily drivers, not novelties ' +
    'I tried once, and on my current team I built internal AI tooling that synthesizes multiple ' +
    'models into structured code-review scorecards with Ship, Fix, and No-Ship verdicts. So when ' +
    'the role asks for someone who can evaluate and adopt agentic coding tools and turn them into ' +
    'leverage for the team, that is a job I have already been doing, and one I would happily own ' +
    'on a small team at RapidSOS.',
  ],

  requirements: [
    {
      requirement:
        'Full-stack TypeScript and Node.js, comfortable across the whole stack.',
      proof:
        'TypeScript and Node are my default front to back. Pathara, Kora, and TeeTimes are all ' +
        'TypeScript on the frontend with Node on the backend, one language across the stack, so I ' +
        'work the data layer, the API, and the UI without a handoff.',
    },
    {
      requirement:
        'Build AI agents, tools, and automations that internal teams actually use.',
      proof:
        'I built internal code-review tooling that runs multiple AI models and synthesizes their ' +
        'output into structured scorecards with Ship, Fix, and No-Ship verdicts, which raised my ' +
        "team's human-in-the-loop review bar. Pathara is the same instinct turned outward: a full " +
        'AI agent pipeline doing real work in production.',
    },
    {
      requirement:
        'Take an idea to a deployed production system quickly and independently.',
      proof:
        'Pathara went from a blank intake form to a live AI agent pipeline and a candidate ' +
        'results portal, built and shipped by me. Kora and Lumi followed the same path, idea to ' +
        'deployed product solo, so working without a big team behind me is the normal case, not ' +
        'the exception.',
    },
    {
      requirement:
        'Evaluate and adopt agentic coding tools.',
      proof:
        'AI coding agents are my daily drivers, and I treat the harness around the model, the ' +
        'tools, verification steps, and context discipline, as the real source of quality. I am ' +
        'already the person who tries a new agentic tool, decides where it earns a place, and wires ' +
        'it into a repeatable workflow.',
    },
    {
      requirement:
        'Thrive on a small team with high autonomy and a bias toward shipping.',
      proof:
        'I have built independently and remotely for over a decade, often as the whole team. That ' +
        'means the autonomy this role asks for is just how I operate: I scope it, build it, ship it, ' +
        'and write the decision down so others can act on it without a meeting.',
    },
  ],

  projects: [
    {
      projectTitle: 'Pathara',
      framing:
        'AI product built end to end: intake flow, deployed AI agent pipeline, candidate results portal, all mine.',
    },
    {
      projectTitle: 'Lumi',
      framing:
        'Full-stack AI app: birth-chart engine, AI reading pipeline, freemium flow, idea to deployed product solo.',
    },
    {
      projectTitle: 'Kora',
      framing:
        'Direct booking engine owned end to end: Node API, PostgreSQL, Stripe and Stripe Tax, finished UI, no handoff.',
    },
  ],

  breadthNote:
    'I have shipped production software independently for over a decade, so the loop this role ' +
    'wants, idea to deployed system without a big team, is muscle memory rather than a stretch.',

  artifacts: {
    resumePdf: '/roles/rapidsos/senior-software-engineer-ai-operations/resume.pdf',
    coverLetterPdf: '/roles/rapidsos/senior-software-engineer-ai-operations/cover-letter.pdf',
  },
};
