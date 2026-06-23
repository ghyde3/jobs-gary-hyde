import type { RoleData } from '../types';

export const adventhealthProductEngineer: RoleData = {
  company: 'adventhealth',
  role: 'product-engineer',
  companyName: 'AdventHealth',
  roleTitle: 'Product Engineer',

  hero: {
    headline: 'A product engineer who ships AI-powered products end to end',
    subhead:
      'I own digital products from the user problem through the schema, the API, and the React interface to a trustworthy shipped experience, and I build AI into how I work. AdventHealth building AI-powered healthcare platforms, close to home in Orlando, is exactly the work I want to do.',
  },

  note: [
    'I am applying for the Product Engineer role because it is the work I already do. I own products end to end, from a real user problem through design and architecture to a shipped, trustworthy experience, and I have done that for more than ten years, usually as the person responsible for the whole value chain.',

    'The stack lines up cleanly. I work in TypeScript end to end, React and Next.js on the front, Node and PostgreSQL behind it, with Redis where it earns its place, and I move comfortably between UI and UX, API design, data modeling, and systems architecture. I also build AI into what I ship: Pathara is an AI product where an agent pipeline turns a resume into ranked matches with tailored materials, owned end to end from intake to results portal.',

    'Building AI-powered platforms that people rely on, for a mission-driven health system in my own city, is genuinely the work I want. To be straight about fit, I lead with React, Next, and Node rather than Python, and my cloud depth is strongest on Vercel and Supabase rather than AWS or Kubernetes, so I would ramp into your exact infrastructure. The product instinct and the end-to-end ownership are already how I operate.',
  ],

  requirements: [
    {
      requirement:
        'Modern web technologies: TypeScript, React, and Next.js on the frontend, with a scalable server-side backend.',
      proof:
        'I build in one TypeScript stack end to end: React and Next.js 14 App Router on the front, Node and Express behind it. TeeTimes, Kora, and Pathara were each built this way, from schema to UI.',
    },
    {
      requirement:
        'Fluidly move between UI/UX, API design, data modeling, and systems architecture.',
      proof:
        'On every product I have shipped I owned all of those layers myself: the relational schema, the REST API, the data model, and the polished interface, with no separate backend or design resource standing by.',
    },
    {
      requirement:
        'Own the entire product lifecycle: discovery, solution design, development, deployment, and continuous improvement.',
      proof:
        'I took Pathara from a blank intake flow to a deployed AI agent pipeline and a per-user results portal, owning discovery, design, build, and deploy. TeeTimes and Kora followed the same path.',
    },
    {
      requirement:
        'Use AI-assisted development tools and automation to accelerate delivery and improve productivity.',
      proof:
        'I have built AI into my daily workflow since the tools became usable, and I built team-facing AI code-review tooling that fuses multiple models into a Ship/Fix/No-Ship scorecard. Pathara itself is a production AI agent pipeline.',
    },
    {
      requirement:
        'Relational databases and schema design for complex domains, with caching such as Redis.',
      proof:
        'I design PostgreSQL schemas for multi-tenant, data-isolated systems and run Redis-backed background jobs through BullMQ in production, including tenant-scoped models that needed careful constraints.',
    },
    {
      requirement:
        'Ship high-quality software fast while holding performance, reliability, accessibility, and security.',
      proof:
        'I move quickly with AI as a force multiplier but keep the bar high: row-level data isolation in Pathara, idempotent payment webhooks in Kora, and accessible, performant React across every build.',
    },
  ],

  projects: [
    {
      projectTitle: 'Pathara',
      framing:
        'AI product owned end to end: an agent pipeline from intake to finished, tailored documents, with per-user data isolation.',
    },
    {
      projectTitle: 'TeeTimes',
      framing:
        'Multi-tenant SaaS in one TypeScript stack: PostgreSQL schema, Redis jobs, React UI, all owned solo.',
    },
    {
      projectTitle: 'Kora',
      framing:
        'Direct booking engine with payments and a guest experience carried from schema to finished UI.',
    },
  ],

  breadthNote:
    'I started shipping production sites in 2010 and have built across e-commerce, hospitality, SaaS, and AI products since. The throughline is owning a product end to end and caring how it feels to use.',

  artifacts: {
    resumePdf: '/roles/adventhealth/product-engineer/resume.pdf',
    coverLetterPdf: '/roles/adventhealth/product-engineer/cover-letter.pdf',
  },
};
