import type { RoleData } from '../types';

export const ashbySeniorProductEngineer: RoleData = {
  company: 'ashby',
  role: 'senior-product-engineer',
  companyName: 'Ashby',
  roleTitle: 'Senior Product Engineer',

  hero: {
    headline: 'Full-stack features, schema to UI, in one TypeScript codebase',
    subhead:
      'I built Pathara, an AI product that runs the job search for candidates: an AI agent pipeline that turns a resume into ranked matches with tailored materials. Ashby is all-in-one recruiting software with AI woven through every layer, so I have already built in this exact AI-for-hiring space, just from the candidate side. And I ship features end to end in TypeScript: React on the front, Node on the back, PostgreSQL and Redis underneath, the way Ashby works, async and in writing, with the autonomy to take a feature from data model to deployed UI without waiting on a meeting.',
  },

  note: [
    'Here is the part I want up front: I built Pathara, an AI product that runs the job search for ' +
    'candidates. It is an AI agent pipeline that takes a resume, ranks it against real roles, and ' +
    'generates tailored materials for each match. Ashby is all-in-one recruiting software with AI ' +
    'embedded in every layer, so I have already shipped in exactly this AI-for-hiring space, just ' +
    'from the candidate side of the same problem. That is not a talking point I reverse-engineered ' +
    'from the job post. It is what I was already building.',

    'I am applying for the Senior Product Engineer role at Ashby. What pulled me in is the shape ' +
    'of the work: end-to-end TypeScript, React and Node sharing one language, GraphQL over ' +
    'PostgreSQL with Redis where it earns its place, and senior engineers trusted to own a ' +
    'feature from the schema to the UI. That is already how I build, so the description read ' +
    'less like a wish list and more like a description of my normal week.',

    'I am not pitching myself as someone who needs to run an org to be useful. I am pitching the ' +
    'opposite: drop me on a feature and I will take it the whole distance, the table design, the ' +
    'API, the React, the edge cases, the deploy, without a separate backend or design resource ' +
    'standing by. Every project in my portfolio (TeeTimes, Kora, Pathara) was scoped, built, and ' +
    'shipped that way, by me, in TypeScript on PostgreSQL.',

    'Ashby being async-first and almost meeting-free is a feature for me, not a hurdle. I have ' +
    'worked remotely for over a decade, and the artifacts I leave behind (specs, plans, review ' +
    'notes) are written so a distributed team can act on them without a call. I also build with ' +
    'AI as part of my daily workflow, which means I move faster on the parts that ' +
    'are mechanical and spend the saved time on the parts that actually need judgment.',
  ],

  requirements: [
    {
      requirement:
        'End-to-end TypeScript: React on the frontend, Node.js on the backend, in a single shared language.',
      proof:
        'TypeScript is my default front to back. TeeTimes, Kora, and Pathara are all React or ' +
        'Next.js on the frontend with Node on the backend, one language across the stack, which ' +
        'keeps types honest from the database layer up to the component.',
    },
    {
      requirement:
        'Comfort designing and querying PostgreSQL, with Redis where it fits.',
      proof:
        'I designed the multi-tenant PostgreSQL schema behind TeeTimes (Drizzle ORM, tenant-scoped ' +
        'models) and ran background jobs through BullMQ on Redis. Kora and Pathara are PostgreSQL ' +
        'as well, so the data layer is somewhere I work directly, not behind an abstraction.',
    },
    {
      requirement:
        'Ability to own a feature from schema to UI autonomously, without a separate design or backend handoff.',
      proof:
        'Every project I ship is solo end to end: data model, API, frontend, deploy. Kora went ' +
        'from booking schema through Stripe and Stripe Tax to a finished guest-facing UI without a ' +
        'handoff, and that is the default mode for everything in this portfolio.',
    },
    {
      requirement:
        'Strong API design, including typed contracts between client and server (GraphQL or equivalent).',
      proof:
        'I design typed API contracts on every project: typed server actions and REST endpoints in ' +
        'Next.js, validated with Zod, with the client and server sharing the same types. GraphQL is ' +
        'the same discipline applied to a schema-first contract, which maps cleanly onto how I ' +
        'already work.',
    },
    {
      requirement:
        'Thrives in an async-first, almost-no-meeting culture with high written-communication standards.',
      proof:
        'I have built independently and remotely for 10+ years. My specs, plans, and review ' +
        'summaries are written to a standard a distributed team can act on without a meeting, ' +
        'because for most of my career there was no meeting to fall back on.',
    },
  ],

  projects: [
    {
      projectTitle: 'TeeTimes',
      framing:
        'Multi-tenant SaaS in TypeScript: PostgreSQL with Drizzle, BullMQ on Redis, schema-to-UI ownership.',
    },
    {
      projectTitle: 'Kora',
      framing:
        'Booking engine owned end to end: PostgreSQL schema, Node API, Stripe and Stripe Tax, finished React UI.',
    },
    {
      projectTitle: 'Pathara',
      framing:
        'Full-stack AI product in TypeScript: Postgres data layer, AI agent pipeline, candidate-facing UI, all mine.',
    },
  ],

  breadthNote:
    'I have shipped production code independently for over a decade, which means the habit of ' +
    'taking a feature the whole way, schema to deployed UI, is just muscle memory at this point, ' +
    'not a stretch.',

  artifacts: {
    resumePdf: '/roles/ashby/senior-product-engineer/resume.pdf',
    coverLetterPdf: '/roles/ashby/senior-product-engineer/cover-letter.pdf',
  },
};
