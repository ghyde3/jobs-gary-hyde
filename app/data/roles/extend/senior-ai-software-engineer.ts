import type { RoleData } from '../types';

export const extendSeniorAiSoftwareEngineer: RoleData = {
  company: 'extend',
  role: 'senior-ai-software-engineer',
  companyName: 'Extend',
  roleTitle: 'Senior AI Software Engineer',

  hero: {
    headline: 'I build the internal AI tooling that makes a team ship faster',
    subhead:
      'Internal Enablement is the work I already reach for. I have shipped team-facing developer tooling, an AI code-review system that synthesizes multiple models into one verdict, and an agent pipeline in production. AI coding agents are part of how I build every day.',
  },

  note: [
    'I am applying for the Senior AI Software Engineer role on Extend\'s Internal ' +
    'Enablement team because building internal AI tooling that makes other engineers ' +
    'faster is the exact kind of work I gravitate toward without being asked. When my ' +
    'team adopted AI-assisted development, I was the one who built the harness around it, ' +
    'not just the one who used it.',

    'The clearest example is a multi-model AI code-review system I built and run as team ' +
    'tooling. It sends a change out to several models, collects their feedback, and ' +
    'synthesizes the results into a single Ship, Fix, or No-Ship scorecard with a human ' +
    'approval gate before anything lands. I also designed a custom Git commit convention, ' +
    'Mission Codes, that improved traceability across a multi-developer Odoo.sh workflow. ' +
    'Both are internal-enablement projects in spirit: leverage that lifts the whole team, ' +
    'not just one feature.',

    'On the AI side I am hands on with agent work in production. Pathara is a job-search ' +
    'product I built around a managed AI agent pipeline, with per-run cost and token ' +
    'telemetry and per-candidate data isolation. TypeScript and Node are my core stack and ' +
    'AI coding agents are woven into how I work day to day. Python is a working second language for me, used in ' +
    'real integration work rather than a primary, and I would rather tell you that plainly than ' +
    'oversell it. The judgment for what makes a tool worth other engineers trusting is the part ' +
    'I am confident about.',
  ],

  requirements: [
    {
      requirement:
        'Build internal AI tooling that makes other engineers faster (Internal Enablement).',
      proof:
        'I built a multi-model AI code-review system as team tooling: it routes a change to ' +
        'several models, gathers their feedback, and synthesizes one Ship, Fix, or No-Ship ' +
        'scorecard behind a human approval gate. I also designed a custom Git commit ' +
        'convention, Mission Codes, that improved traceability across a multi-developer ' +
        'Odoo.sh workflow. Both exist to make the team faster, not one feature.',
    },
    {
      requirement:
        'Strong in Python or TypeScript/Node.js.',
      proof:
        'TypeScript and Node are my core stack, used across every recent project including ' +
        'Pathara and multi-tenant SaaS work. Python is a working second language I have used ' +
        'for real integration code, including custom Odoo module work and cross-system sync, ' +
        'so I can read and ship in both.',
    },
    {
      requirement:
        'Experience with at least one agent framework.',
      proof:
        'AI coding agents are my primary build environment, and I run an agent pipeline of my ' +
        'own. Pathara runs on managed AI agents that handle research and ' +
        'document generation end to end, with per-run cost and token telemetry and no ' +
        'self-hosted workers to babysit.',
    },
    {
      requirement:
        'Production AWS experience (Lambda, API Gateway, DynamoDB, S3).',
      proof:
        'I architect and operate production cloud services and serverless backends: managed ' +
        'Postgres, object storage, queues, and API layers across Vercel, Supabase, and ' +
        'Railway, with per-tenant data isolation and webhook architecture. The AWS-specific ' +
        'primitives map closely to patterns I already run, and I ramp fast on a new provider.',
    },
    {
      requirement:
        'Familiarity with agent tooling and observability.',
      proof:
        'I work in agent-driven setups daily and treat the harness ' +
        'around the model, including tooling and verification, as where the quality lives. On ' +
        'the observability side I have built per-run cost and token telemetry into Pathara, so ' +
        'instrumenting tooling for traceability is a habit, not a new concept for me.',
    },
  ],

  projects: [
    {
      projectTitle: 'Pathara',
      framing:
        'AI agent pipeline in production: managed AI agents, per-run cost and token telemetry, per-candidate data isolation. TypeScript and Next.js.',
    },
    {
      projectTitle: 'TeeTimes',
      framing:
        'Multi-tenant SaaS backend: PostgreSQL, BullMQ and Redis job pipeline, strict TypeScript throughout. The kind of service architecture internal tooling runs on.',
    },
    {
      projectTitle: 'Multi-Location Inventory for WooCommerce and Odoo',
      framing:
        'Cross-system integration in TypeScript and Python: sync pipeline, custom Odoo module work, and a root-caused multi-location overselling bug spanning two systems.',
    },
  ],

  breadthNote:
    'I have spent 14+ years shipping production software and the last few years building the ' +
    'harness around AI tools rather than just prompting them. Internal enablement is where ' +
    'that habit pays off: the leverage is in the tooling and the process wrapped around the ' +
    'model, and that is the work I most want to own.',

  artifacts: {
    resumePdf: '/roles/extend/senior-ai-software-engineer/resume.pdf',
    coverLetterPdf: '/roles/extend/senior-ai-software-engineer/cover-letter.pdf',
  },
};
