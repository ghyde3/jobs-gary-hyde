import type { RoleData } from '../types';

export const prairieLearnFullStackSoftwareEngineer: RoleData = {
  company: 'prairielearn',
  role: 'full-stack-software-engineer',
  companyName: 'PrairieLearn',
  roleTitle: 'Full-Stack Software Engineer',

  hero: {
    headline: 'Node.js, TypeScript, PostgreSQL, and React, owned end to end',
    subhead:
      'Your stack is the stack I already build on every day, and I have been adding LLM and agent tooling to it the whole time. I own products from the schema through the React UI, and I work best on small teams that ship without heavy process.',
  },

  note: [
    'PrairieLearn caught my attention because the stack reads like a description of how I already work. ' +
    'Node.js and TypeScript on the server, PostgreSQL underneath, React on the frontend, AWS for ' +
    'infrastructure, and now LLM and agent tooling woven through it. I have been building on exactly ' +
    'this foundation for years, and I have spent the last stretch of it adding AI to the same stack ' +
    'rather than treating it as a separate discipline.',

    'The part of the role I care about most is the shape of the team: small, bootstrapped, profitable, ' +
    'flexible hours, a lot of autonomy. That is the environment where I do my best work. I own projects ' +
    'end to end because that is the only way I have ever shipped, from the PostgreSQL data model up ' +
    'through the Node.js backend to a React frontend, with no handoffs and no waiting on a separate ' +
    'design or backend resource. Education technology is also work I want to do, where the product ' +
    'actually helps the people using it learn.',

    'What I want to bring to PrairieLearn is the combination that this stack now demands: a senior ' +
    'full-stack engineer who is genuinely fluent in Node.js, TypeScript, PostgreSQL, and React, and ' +
    'who also builds with LLM and agent tooling as a real part of the product and a real part of the ' +
    'workflow. I built an AI agent product end to end, I built multi-model code-review tooling for my ' +
    'current team, and I work in Claude Code and Cursor every day. I would like the chance to show how ' +
    'much that adds up to on a small, autonomous team.',
  ],

  requirements: [
    {
      requirement:
        'Strong Node.js and TypeScript across the backend, with PostgreSQL as the data layer.',
      proof:
        'Node.js, TypeScript, and PostgreSQL are my default backend on every project. TeeTimes runs a ' +
        'multi-tenant PostgreSQL data model behind a Node.js and Express backend, Kora runs a Node.js ' +
        'booking and payments engine on PostgreSQL, and both are written in TypeScript end to end. The ' +
        'schema being right before anything above it could be has always been my problem to solve.',
    },
    {
      requirement:
        'React on the frontend, owned in the same codebase as the backend.',
      proof:
        'Every product I ship pairs that Node.js and PostgreSQL backend with a React and Next.js ' +
        'frontend that I build myself. TeeTimes, Kora, and Pathara each go from schema to React UI in ' +
        'one TypeScript codebase, so there is no frontend-versus-backend split in how I work.',
    },
    {
      requirement:
        'LLM and agent tooling, both inside the product and in how the team builds.',
      proof:
        'I built Pathara, an AI product, end to end on the Claude API: an agent pipeline that takes a ' +
        'resume and questionnaire and returns ranked job matches with a tailored resume, cover letter, ' +
        'and interview prep per match. On my current team I built automated code-review tooling that ' +
        'synthesizes multiple AI models into structured Ship, Fix, and No-Ship scorecards, and I work ' +
        'in Claude Code and Cursor every day.',
    },
    {
      requirement:
        'Comfort owning features end to end on AWS or similar cloud infrastructure.',
      proof:
        'I scope, build, deploy, and run my projects myself, including the cloud setup. I have shipped ' +
        'production apps on Vercel and Railway and run a Supabase Postgres backend with row-level ' +
        'security and storage for Pathara. Owning the full vertical slice, infrastructure included, is ' +
        'how I have always worked.',
    },
    {
      requirement:
        'Thrive on a small, autonomous team that ships without heavy process.',
      proof:
        'I have worked independently and remotely for over ten years, scoping and shipping products ' +
        'solo because there was never a second engineer to hand work to. I write the spec, the plan, ' +
        'and the decision down so the work moves without a meeting, and I move fastest exactly when the ' +
        'process is light and the autonomy is high.',
    },
  ],

  projects: [
    {
      projectTitle: 'Pathara',
      framing:
        'AI agent product owned end to end: Next.js and TypeScript frontend, Supabase Postgres backend, and a Claude agent pipeline from intake to finished documents.',
    },
    {
      projectTitle: 'TeeTimes',
      framing:
        'Multi-tenant SaaS from the schema up: PostgreSQL data model, Node.js and Express backend, React frontend, all in one TypeScript codebase.',
    },
    {
      projectTitle: 'Kora',
      framing:
        'Direct booking engine owned vertically: Node.js on PostgreSQL, Stripe and Stripe Tax from day one, React frontend.',
    },
  ],

  breadthNote:
    'I have been shipping production code for over a decade, solo for most of it, which is why owning ' +
    'a full Node.js, PostgreSQL, and React slice feels normal rather than ambitious. That habit, plus ' +
    'the LLM and agent tooling I have layered on top of it, is what I think maps to this seat.',

  artifacts: {
    resumePdf: '/roles/prairielearn/full-stack-software-engineer/resume.pdf',
    coverLetterPdf: '/roles/prairielearn/full-stack-software-engineer/cover-letter.pdf',
  },
};
