import type { RoleData } from '../types';

export const grafanaLabsSeniorAiEngineer: RoleData = {
  company: 'grafana-labs',
  role: 'senior-ai-engineer',
  companyName: 'Grafana Labs',
  roleTitle: 'Senior AI Engineer',

  hero: {
    headline: 'I ship AI agents that do real work, not demos',
    subhead:
      'An AI agent pipeline in production, multi-model code review tooling I built and use, and a daily workflow built around AI coding agents. The Senior AI Engineer role at Grafana Labs is the work I am already doing.',
  },

  note: [
    'Grafana Labs is hiring a Senior AI Engineer to build internal multi-agent automation, and that ' +
    'is the most direct match I have found between a job post and what I actually do every day. I have ' +
    'built and shipped an AI agent pipeline in production, I built the multi-model code review tooling ' +
    'my team uses, and AI coding agents are part of how I build, not a side experiment. This is not a ' +
    'stretch into a new area for me. It is the center of my work right now.',

    'Pathara is the clearest proof. It is a job-search product where a candidate submits a resume and a ' +
    'short questionnaire, and an AI agent pipeline does the research and writing, returning ranked ' +
    'job matches each with a tailored resume, cover letter, and interview prep doc, plus an application ' +
    'tracker. I built the whole thing end to end: the intake flow, the agent pipeline from intake to ' +
    'finished documents, the per-candidate portal with downloads, and per-run cost and token telemetry. ' +
    'Lumi is a second AI product, with an LLM reading pipeline and streaming, shipped on Vercel. And the ' +
    'code review tooling I built fuses several models reasoning over a diff into one Ship, Fix, or No-Ship ' +
    'scorecard with a human gate before anything happens. That is multi-agent orchestration in miniature.',

    'I want to be straight about the stack, senior to senior. Node and TypeScript are my core, the language ' +
    'I reach for first and the one all of the above is built in. Python is a working second language for ' +
    'me: I read it, write it, and have shipped it inside the WooCommerce and Odoo integration work, but I ' +
    'would not claim the depth there that I have in TypeScript. The same goes for the agent frameworks. I ' +
    'have built agent systems directly at the protocol level rather than through higher-level frameworks, ' +
    'so I would be learning your exact toolchain, not the underlying ideas. I would ' +
    'rather earn that by shipping than oversell it on a page.',
  ],

  requirements: [
    {
      requirement:
        'Build internal multi-agent automation that does real work, not proofs of concept.',
      proof:
        'I built Pathara, a production AI product where an AI agent pipeline takes a resume and a ' +
        'questionnaire and returns ranked job matches, each with a tailored resume, cover letter, and ' +
        'interview prep doc. I built the intake, the agent pipeline from intake to finished documents, and ' +
        'the results portal, with per-run cost and token telemetry so the automation is observable.',
    },
    {
      requirement:
        'Strong in JavaScript and Node.js, with Python as a working language.',
      proof:
        'Node and TypeScript are my core stack across every product I ship: Pathara, Lumi, TeeTimes, Kora, ' +
        'and more. Python is a working second language for me, used in the WooCommerce and Odoo integration ' +
        'and module work. I am honest that my depth is in TypeScript, and I ramp on Python tooling quickly.',
    },
    {
      requirement:
        'Hands-on with production LLM and multi-agent systems.',
      proof:
        'I build agent systems directly at the protocol level. Pathara is a managed AI agent pipeline ' +
        'that needs no self-hosted workers. I also built multi-model code review tooling that runs a diff ' +
        'through several models, has each reason over the change, and merges their findings into one Ship, ' +
        'Fix, or No-Ship scorecard with a human approval gate. That is multi-agent orchestration with a ' +
        'verification step built in.',
    },
    {
      requirement:
        'Fluent with AI coding agents in daily work.',
      proof:
        'AI coding agents are part of how I build every day, not a novelty but how I work. I introduced ' +
        'AI-augmented workflows on my current team that compressed feature delivery while keeping ' +
        'documentation and review standards intact, and I treat the harness around the model (tools, ' +
        'verification, context discipline) as where most of the quality actually comes from.',
    },
    {
      requirement:
        'Comfortable in a fully remote, async environment, owning automation from design through ship.',
      proof:
        'I have worked independently and remotely for over ten years. I default to writing the spec, the ' +
        'plan, and the decision down so the next person or the next agent can act without a meeting. Every ' +
        'product in my portfolio was scoped, built, and shipped by me end to end, which is the same ' +
        'ownership an internal automation team runs on.',
    },
  ],

  projects: [
    {
      projectTitle: 'Pathara',
      framing:
        'Production AI agent pipeline: an AI agent takes a resume and questionnaire from intake to finished documents, with per-run cost and token telemetry. Built end to end in Next.js and TypeScript on Supabase.',
    },
    {
      projectTitle: 'Lumi',
      framing:
        'A second shipped AI product: an LLM reading pipeline with streaming and a freemium flow, built on Next.js and TypeScript and deployed on Vercel.',
    },
    {
      projectTitle: 'Multi-Location Inventory for WooCommerce and Odoo',
      framing:
        'Where my Python lives in production: a cross-system sync pipeline and custom Odoo module work, including root-causing a multi-location overselling bug that spanned two systems.',
    },
  ],

  breadthNote:
    'The AI agent work is recent, but it sits on more than a decade of shipping production systems solo. ' +
    'That is why building reliable internal automation feels like an extension of how I already work rather ' +
    'than a leap: the agent is new, the discipline of owning a system end to end is not.',

  artifacts: {
    resumePdf: '/roles/grafana-labs/senior-ai-engineer/resume.pdf',
    coverLetterPdf: '/roles/grafana-labs/senior-ai-engineer/cover-letter.pdf',
  },
};
