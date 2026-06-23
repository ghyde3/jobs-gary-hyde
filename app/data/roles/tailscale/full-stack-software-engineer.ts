import type { RoleData } from '../types';

export const tailscaleFullStackSoftwareEngineer: RoleData = {
  company: 'tailscale',
  role: 'full-stack-software-engineer',
  companyName: 'Tailscale',
  roleTitle: 'Full Stack Software Engineer',

  hero: {
    headline: 'A full-stack engineer who owns the whole feature, not just a slice of it',
    subhead:
      'React and TypeScript are where I live day to day, and I own backend services from the data model up. I work async and write things down by default, which is how a distributed team is supposed to move.',
  },

  note: [
    'I am writing about the Full Stack Software Engineer role at Tailscale because the shape of ' +
    'the work matches the way I already build. The web app and admin console want someone who is ' +
    'fluent in React and TypeScript and equally comfortable behind the API, and I have shipped ' +
    'full products in exactly that mode: data model, API, and a frontend I would put my name on, ' +
    'all owned by one person who saw the feature through.',

    'The part of the job description that made me want to apply is the culture. Async-first, ' +
    'written-first, meetings that are rare and deliberate, decisions captured in writing so people ' +
    'can act on them later. I have worked remotely for over a decade, and the way I keep that ' +
    'working is by writing: specs before I build, plans a teammate can pick up cold, review ' +
    'summaries detailed enough that nobody needs a call to know what changed and why. That is not a ' +
    'habit I would have to adopt for Tailscale, it is how I already operate.',

    'I want to be straight about the stack. The frontend is squarely in my wheelhouse, and I own ' +
    'backend services in Node.js today, so the full-stack ownership the role asks for is something I ' +
    'do now. Go is the one piece I would be ramping into rather than arriving with. I have built ' +
    'enough backends to know what a well-factored service looks like, and picking up a new ' +
    'backend language is the kind of thing I expect to do well and quickly, with the codebase and a ' +
    'review loop to learn from. I would rather tell you that plainly than oversell it.',
  ],

  requirements: [
    {
      requirement:
        'Strong React and TypeScript for the web application and the admin console.',
      proof:
        'React and TypeScript are my default frontend stack on every project. I built the booking ' +
        'and scheduling UI for Kora, the multi-tenant interfaces for TeeTimes, and the candidate ' +
        'portal for Pathara, all in React and TypeScript with strict typing throughout.',
    },
    {
      requirement:
        'Ability to own a feature full stack, from the backend service through to the frontend.',
      proof:
        'Every project I have shipped was built end to end by me: data model, API, frontend, and ' +
        'deploy. Kora, TeeTimes, and Pathara each went from schema to shipped UI without a separate ' +
        'backend or frontend resource handing work across a boundary.',
    },
    {
      requirement:
        'Comfortable owning backend services and ramping into the Go codebase.',
      proof:
        'I own backend services in Node.js and Express today, with PostgreSQL data models, REST ' +
        'APIs, and background job pipelines on BullMQ and Redis. Go would be a ramp for me, not a ' +
        'language I already ship, and I am confident in picking up a new backend language inside a ' +
        'real codebase with a review loop.',
    },
    {
      requirement:
        'Thrives in an async-first, written-first culture with infrequent, intentional meetings.',
      proof:
        'I have worked remotely for 14+ years and run on writing rather than meetings. My specs, ' +
        'plans, and review summaries are written to the standard a distributed team needs to act on ' +
        'them without scheduling a call.',
    },
    {
      requirement:
        'Records decisions in writing and protects long focus blocks for real work.',
      proof:
        'I document decisions as I make them, from a custom Git commit convention for traceability ' +
        'in a multi-developer ERP setup to a detailed cross-system incident report that traced an ' +
        'overselling bug to its root cause. Writing it down is how I keep deep work moving without ' +
        'constant interruption.',
    },
  ],

  projects: [
    {
      projectTitle: 'Kora',
      framing:
        'Full-stack ownership end to end: React and TypeScript frontend, Node.js and Express backend, PostgreSQL, Stripe and Stripe Tax.',
    },
    {
      projectTitle: 'TeeTimes',
      framing:
        'Multi-tenant SaaS built solo: React and TypeScript UI, Express services, PostgreSQL with Drizzle, background jobs on BullMQ and Redis.',
    },
    {
      projectTitle: 'Pathara',
      framing:
        'Full pipeline from intake to finished documents: React and TypeScript portal, backend agent pipeline, Supabase data and auth.',
    },
  ],

  breadthNote:
    'Beyond these three, I have shipped products across AI, payments, games, and e-commerce, ' +
    'always owning the backend and the frontend together. The habit that carries across all of it ' +
    'is the same one this role rewards: own the whole feature, write down what you decided, and ship.',

  artifacts: {
    resumePdf: '/roles/tailscale/full-stack-software-engineer/resume.pdf',
    coverLetterPdf: '/roles/tailscale/full-stack-software-engineer/cover-letter.pdf',
  },
};
