import type { RoleData } from '../types';

export const ashbyStaffProductEngineer: RoleData = {
  company: 'ashby',
  role: 'staff-product-engineer',
  companyName: 'Ashby',
  roleTitle: 'Staff Product Engineer',

  hero: {
    headline: 'One TypeScript codebase, owned from schema to UI',
    subhead:
      'I build products end to end in a single TypeScript stack: React on the frontend, Node.js and PostgreSQL on the backend, no handoffs. That is how I already work, and it is how Ashby builds.',
  },

  note: [
    'Ashby is the rare team where the way you describe the work matches the way I actually work. ' +
    'One TypeScript codebase, React and Node and GraphQL and PostgreSQL, engineers owning projects ' +
    'from the schema all the way to the UI. I have spent the last several years building products ' +
    'exactly that way, by myself, because that is the only way to ship when you are the whole team.',

    'The Staff Product Engineer role asks for technical leadership expressed through building rather ' +
    'than through meetings, and that fits how I operate. I work async-first, I document decisions in ' +
    'specs and plans that other people can act on without a call, and I raise the quality bar by ' +
    'setting conventions and building the tooling that enforces them. I also lean hard on ' +
    'AI-augmented development with Claude Code and Cursor, not as a novelty but as a real ' +
    'multiplier on how much I can design, build, and review in a day.',

    'What I want to own at Ashby is the part of the product where end-to-end judgment matters most: ' +
    'the data model that has to be right before anything above it can be, and the UI that proves it ' +
    'was. I think my habit of owning the full vertical slice and my investment in review tooling and ' +
    'written conventions are a good match for a staff-level seat on an async team, and I would like ' +
    'the chance to show it.',
  ],

  requirements: [
    {
      requirement:
        'Work across one TypeScript codebase end to end: React on the frontend, Node.js and PostgreSQL on the backend.',
      proof:
        'Every product I ship runs on a single TypeScript stack. TeeTimes, Kora, and Pathara each go ' +
        'from PostgreSQL schema through a Node.js backend to a React and Next.js frontend, all written ' +
        'by me. There is no frontend-versus-backend split in how I work because there was never a ' +
        'second engineer to split it with.',
    },
    {
      requirement:
        'Own projects end to end, from data model and schema through to the shipped UI, with high autonomy.',
      proof:
        'I designed the multi-tenant data model and booking engine for TeeTimes, the payments and ' +
        'review pipeline for Kora, and the full Claude agent pipeline plus results portal for Pathara. ' +
        'Each was scoped, built, and shipped by me without a separate design or backend resource.',
    },
    {
      requirement:
        'Thrive in an async-first, almost-no-meeting culture with high written-communication standards.',
      proof:
        'I have worked independently and remotely for over ten years. My default is to write the spec, ' +
        'the plan, and the decision down so the next person (or the next agent) can act on it without a ' +
        'meeting. I authored a stock-overselling incident report tracing a bug across two systems to ' +
        'root cause, the kind of written artifact an async team actually relies on.',
    },
    {
      requirement:
        'Express staff-level technical leadership through building, raising the quality bar, and mentoring through code and written artifacts.',
      proof:
        'I built automated code review tooling (Cursor Skills) that synthesizes multiple AI models into ' +
        'structured scorecards with Ship, Fix, and No-Ship verdicts, raising the team review standard. ' +
        'I also designed a Git commit convention (Mission Codes) for our Odoo.sh environments to keep a ' +
        'multi-developer workflow traceable. Leadership through tooling and conventions, not status meetings.',
    },
    {
      requirement:
        'Use modern tooling, including AI, to move faster without dropping quality.',
      proof:
        'I treat Claude Code and Cursor as force multipliers, not autocomplete. I introduced ' +
        'AI-augmented workflows on my current team that compressed feature delivery while keeping the ' +
        'documentation and review standards intact, and I built Pathara, an AI product, on the Claude API ' +
        'end to end.',
    },
  ],

  projects: [
    {
      projectTitle: 'Pathara',
      framing:
        'AI product owned end to end: Next.js, TypeScript, Supabase Postgres, and a Claude agent pipeline from intake to finished documents.',
    },
    {
      projectTitle: 'TeeTimes',
      framing:
        'Multi-tenant SaaS from schema up: PostgreSQL data model, Node.js and Express backend, React frontend, BullMQ and Redis jobs, all in TypeScript.',
    },
    {
      projectTitle: 'Kora',
      framing:
        'Direct booking engine owned vertically: PostgreSQL, Node.js, Stripe and Stripe Tax from day one, React frontend.',
    },
  ],

  breadthNote:
    'I have been shipping production code for over a decade, solo for most of it, which is why ' +
    'owning a vertical slice from schema to UI feels normal rather than ambitious. That habit, not ' +
    'the raw count of projects, is what I think maps to a staff seat on an async team.',

  artifacts: {
    resumePdf: '/roles/ashby/staff-product-engineer/resume.pdf',
    coverLetterPdf: '/roles/ashby/staff-product-engineer/cover-letter.pdf',
  },
};
