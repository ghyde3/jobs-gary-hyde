// All copy in this file is Gary's to edit. Draft written from Gary_Hyde_Master_Profile.md
// and app/data/profile.ts. No invented metrics or employers.

export const SUGGESTED_QUESTIONS: string[] = [
  'Why should we hire Gary?',
  'What has Gary built end to end?',
  'What are Gary\'s strongest technical skills?',
  'What possible concerns should we think through before hiring Gary?',
  'How does Gary work with AI tools?',
  'What is Gary\'s work style?',
  'What roles is Gary the best fit for?',
  'What roles are a weaker fit?',
  'What should we ask Gary in the interview?',
  'Why is Gary available right now?',
  'How do we reach Gary?',
];

export const PITCHES: { thirty: string; sixty: string; twoMinutes: string } = {
  thirty:
    'Gary is a senior full-stack developer with 10+ years shipping production applications in React, Next.js, Node.js, and PostgreSQL. He owns work end to end and builds with AI-augmented workflows that compress the cycle without cutting quality.',

  sixty:
    'Gary is a senior full-stack developer with 10+ years of production experience across React/Next.js, Node.js, PostgreSQL, and WordPress/WooCommerce. At Forward Thinking Marketing he was the lead developer owning the entire technical stack, including multi-system e-commerce integrations and custom Odoo ERP work. In parallel he has shipped SaaS platforms, a booking engine with Stripe Tax, an AI product, and a browser multiplayer game, all as the sole architect and builder. He is fluent in Cursor IDE and Claude Code and treats AI-augmented workflows as a standard part of how he builds, not a novelty.',

  twoMinutes:
    'Gary Hyde is a senior full-stack developer based in Orlando, Florida, with over ten years of experience building and shipping production web applications. His core stack is React and Next.js on the frontend, Node.js and Express on the backend, and PostgreSQL as his primary database, with deep additional experience in WordPress, WooCommerce, Shopify, and Odoo 17 ERP.\n\nFor the past 2.5 years he was the lead developer at Forward Thinking Marketing, where he owned the full technical stack: WordPress/WooCommerce storefronts, a custom WooCommerce-to-Odoo integration covering multi-location inventory sync and order pipelines, and AI-augmented developer tooling. He tracked down a complex cross-system overselling bug that spanned both platforms and documented it in a detailed incident report.\n\nAlongside that role he has shipped a multi-tenant SaaS booking platform for golf clubs (TeeTimes), a direct booking engine with Stripe Tax integration (Kora), an AI-powered astrology app built on Swiss Ephemeris (Lumi), and a real-time browser multiplayer game (Outlandr.io).\n\nHe works with Cursor IDE and Claude Code as core parts of his day-to-day workflow, not as a shortcut but as force multipliers: he built automated code review tooling that synthesizes multiple AI model outputs into structured scorecards with Ship/Fix/No-Ship verdicts.\n\nGary is open to senior full-stack, senior frontend, senior backend, WordPress lead, AI-augmented developer, e-commerce platform, and technical lead roles. He is remote-first but open to hybrid arrangements in the Orlando metro. He is available now and open to both FTE and contract engagements.',
};

export const WORK_STYLE: Record<string, string> = {
  ownership:
    'Gary takes full ownership of what he builds. He does not wait for a ticket to define every step, he identifies what the problem needs and solves it. He has operated as the sole developer on multiple production systems and is comfortable holding the whole thing in his head.',

  communication:
    'He writes clearly and documents as he goes. At Forward Thinking Marketing he authored a detailed multi-system incident report tracing a critical inventory bug to its root cause. His Git commit convention (Mission Codes) was designed to make traceability easier for the whole team, not just himself.',

  debugging:
    'His debugging default is to follow the data. The WooCommerce-Odoo overselling bug is a clean example: the symptom was in the storefront, the cause was at the data layer where the two systems diverged. He traces it rather than guessing.',

  aiWorkflow:
    'He uses Cursor IDE and Claude Code as the primary tools in his build loop, not as occasional assistants. He built automated review tooling (Cursor Skills) that runs outputs from multiple AI models through a scoring pipeline and returns a Ship/Fix/No-Ship verdict. The result is faster iteration with a higher floor on code quality.',

  idealEnvironment:
    'Remote-first, async-friendly, with room to own a problem end to end. He works well with a clear product direction and light process overhead. He does not need hand-holding on execution, but values tight feedback loops when direction is shifting.',
};

export const ROLE_FIT: { strongestFit: string[]; weakerFit: string[] } = {
  strongestFit: [
    'Senior full-stack developer on a product team (React/Next.js + Node.js/PostgreSQL)',
    'Senior frontend engineer on a design-system-oriented team',
    'Senior backend / API engineer (Node.js, REST, PostgreSQL)',
    'WordPress / WooCommerce lead developer at an agency or e-commerce company',
    'AI-augmented developer or AI engineer on a team building AI-powered products',
    'E-commerce platform engineer (Shopify, WooCommerce, headless commerce)',
    'SaaS platform engineer at a multi-tenant or B2B SaaS company',
    'Technical lead or engineering lead on a small-to-mid team',
    'Senior contract or freelance developer for high-value engagements',
  ],
  weakerFit: [
    'Pure junior or mid-level IC roles (mismatch on scope and autonomy expectations)',
    'Non-technical PM or project coordination roles',
    'Odoo-only or deeply legacy-stack shops with no path to modern tooling',
    'Roles requiring relocation outside Florida or commute-only in-office outside Orlando',
    'Teams that treat AI-augmented workflows as a liability rather than a tool',
  ],
};

export const CONCERNS: { question: string; answer: string }[] = [
  {
    question: 'Is Gary too WordPress-heavy for a modern SaaS role?',
    answer:
      'The WordPress work is real and recent, but it sits alongside multi-tenant SaaS architecture using Next.js 14 App Router, PostgreSQL with Drizzle ORM, BullMQ/Redis background jobs, Auth.js v5, and Stripe. TeeTimes and Kora were built production-architected from day one. The WooCommerce depth is a bonus for e-commerce teams, not a ceiling on what he can do.',
  },
  {
    question: 'Does he rely too much on AI tools?',
    answer:
      'He built the tooling around the AI, which is a different thing. Cursor Skills, his automated review pipeline, synthesizes outputs from multiple models into structured scorecards with Ship/Fix/No-Ship verdicts. That is not leaning on AI, it is engineering a harness around it. He understands what the models are doing and has opinions about when not to trust them.',
  },
  {
    question: 'Has he done modern SaaS? His background looks e-commerce heavy.',
    answer:
      'TeeTimes is a multi-tenant SaaS platform with a per-tenant data architecture, a background job pipeline on BullMQ and Redis, and a test-driven, agent-ready build workflow. Kora is a booking engine with Stripe and Stripe Tax integration from the first commit. Both were built independently, which means he made every architectural call himself.',
  },
  {
    question: 'Can he work in a team or is he used to solo work?',
    answer:
      'He has operated as lead developer in a multi-developer environment at Forward Thinking Marketing, authored shared tooling (Mission Codes commit convention, Cursor Skills) designed to improve the whole team\'s workflow, and written incident documentation that other people can act on. He is comfortable working alone but has built for teams.',
  },
  {
    question: 'What about TypeScript? Is his TS depth real?',
    answer:
      'TeeTimes, Kora, Lumi, Outlandr.io, and this portfolio site are all TypeScript. It is his default for any new project. He uses Zod for runtime validation and has worked with typed ORM layers (Drizzle) throughout.',
  },
];

export const INTERVIEW_KIT: Record<string, string[]> = {
  'senior full-stack': [
    'Walk us through a system you designed end to end. What were the hardest architectural calls?',
    'Describe the WooCommerce-Odoo integration. How did you design the sync and what broke along the way?',
    'How do you decide when to build a custom solution versus reaching for a library or SaaS?',
    'Tell us about the multi-location overselling bug. How did you trace it and what was the fix?',
    'How do you keep code quality consistent when you are moving fast?',
  ],
  'e-commerce': [
    'What is your mental model for a WooCommerce-to-ERP integration? How do you handle eventual consistency?',
    'You built Kora with Stripe Tax scoped from day one. What drove that decision?',
    'How do you handle inventory bugs that span two systems with different data models?',
    'What is your experience with Shopify versus WooCommerce, and when would you recommend each?',
    'Walk us through a custom WooCommerce plugin you built. What was the scope and how did you deliver it?',
  ],
  'ai-augmented': [
    'How does AI actually fit into your day-to-day build workflow, not in theory but in practice?',
    'Describe the Cursor Skills review pipeline you built. How does it work and why did you build it?',
    'How do you know when not to trust what a model produces?',
    'What is the difference between a prompt engineer and someone who engineers a harness around an AI?',
    'Where do you see AI-augmented development going in the next two years and how are you preparing for it?',
  ],
};

export const FAQ: { question: string; answer: string }[] = [
  {
    question: 'Where is Gary located?',
    answer:
      'Winter Garden / Orlando metro, Central Florida. Eastern Time.',
  },
  {
    question: 'Is Gary open to remote roles?',
    answer:
      'Yes, remote-first is his preference. He is also open to hybrid arrangements within the Orlando metro.',
  },
  {
    question: 'Is Gary open to FTE or contract?',
    answer:
      'Both. He is open to full-time employment and contract engagements at the senior level.',
  },
  {
    question: 'How do I reach Gary?',
    answer:
      'Email ghyde03@gmail.com, call +1 (407) 473-7206, or book directly at https://calendar.app.google/r5fU8RqL8ked3YBq6.',
  },
  {
    question: 'Where can I see Gary\'s work?',
    answer:
      'The portfolio at jobs.garyhyde.com has live projects and case notes. Source code for some projects is on GitHub at github.com/ghyde3.',
  },
  {
    question: 'When can Gary start?',
    answer:
      'Right away. He\'s available immediately and has no notice period to work around.',
  },
  {
    question: 'Does Gary need visa sponsorship?',
    answer:
      'No. Gary is a US citizen, no sponsorship or work authorization needed.',
  },
  {
    question: 'What does Gary charge for contract work?',
    answer:
      'Gary takes both full-time and contract roles. Rates depend on scope and length, so email him at ghyde03@gmail.com or book a call at https://calendar.app.google/r5fU8RqL8ked3YBq6 to talk specifics.',
  },
  {
    question: 'Where can I see Gary\'s profiles?',
    answer:
      'LinkedIn: https://www.linkedin.com/in/ghyde3/ and GitHub: https://github.com/ghyde3. Portfolio: https://jobs.garyhyde.com.',
  },
];

export const WHY_AVAILABLE: string =
  "Gary's role at Forward Thinking Marketing concluded in May 2026 after 2.5 years. The company sells hemp-derived products under the 2018 Farm Bill, and a new federal THC rule taking effect in November 2026 closes that market, so the business is winding down its product lines. Gary is now focused on senior full-stack roles.";
