export interface Project {
  id: number;
  category: string;
  title: string;
  sub: string;
  desc: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
  imageAlt?: string;
}

export interface Stat {
  n: string;
  label: string;
}

export interface Links {
  email: string;
  github: string;
  linkedin: string;
}

export interface Photo {
  src: string;
  alt: string;
}

export const PROFILE = {
  name: 'Gary Hyde',
  title: 'Senior Full-Stack Developer',
  location: 'Orlando metro, Florida',
  badge: 'Open to senior and lead roles',
  summary:
    'I have spent 10+ years shipping production web applications across React, Next.js, Node.js, and PostgreSQL. I own work end to end, from the data model and API through to a polished, fast frontend, and I build with AI-augmented workflows that compress the cycle without cutting corners.',
} as const;

export const heroTags: string[] = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'AI-augmented',
];

export const PROJECTS: Project[] = [
  {
    id: 7,
    category: 'AI Product',
    title: 'Pathara',
    sub: 'A complete job search service powered by an AI agent pipeline',
    desc: 'Pathara turns a resume and a short questionnaire into a ranked list of real open jobs, each with a tailored resume, cover letter, and interview prep doc. I built the intake flow, the Claude agent pipeline that does the research and writing, and the per-candidate results portal with downloads and an application tracker.',
    highlights: [
      'Claude agent pipeline from intake to finished documents',
      'Per-candidate portal with downloads and an application tracker',
      'Supabase auth, row-level security, and storage end to end',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Claude API', 'Stripe', 'Vercel'],
    liveUrl: 'https://getpathara.com/',
    image: '/projects/pathara.png',
    imageAlt: 'Pathara landing page with the headline "Your job search, handled"',
  },
  {
    id: 4,
    category: 'AI Product',
    title: 'Lumi',
    sub: 'AI astrology app that turns a birth chart into a personal reading',
    desc: 'Lumi calculates a precise natal chart from your birth details using Swiss Ephemeris astronomy, then has an AI write a reading that actually sounds like you instead of a template. I built the chart engine, the freemium product flow, and the AI reading pipeline, and shipped it on Vercel.',
    highlights: [
      'Swiss Ephemeris chart math for observatory-grade accuracy',
      'AI readings generated per person, not from a template',
      'Freemium flow: a free Big Three, a paid full reading',
    ],
    stack: ['Next.js', 'TypeScript', 'OpenAI API', 'Swiss Ephemeris', 'Vercel'],
    liveUrl: 'https://astro-app-tau-gules.vercel.app/',
    image: '/projects/lumi.png',
    imageAlt: 'Lumi home page showing a natal chart and AI reading',
  },
  {
    id: 5,
    category: 'Game',
    title: 'Outlandr.io',
    sub: 'Free browser multiplayer island-settlement strategy game',
    desc: 'A real-time multiplayer settlement game that runs entirely in the browser, with no download and no account needed. I built the Phaser rendering, the real-time multiplayer for two to six players, seeded board generation, fog of war, turn timers, and bot opponents that can fill empty seats.',
    highlights: [
      'Real-time multiplayer for two to six players',
      'Phaser engine rendering hex tiles at 60fps',
      'Bot opponents, fog of war, and seeded boards',
    ],
    stack: ['Next.js', 'TypeScript', 'Phaser', 'WebSockets', 'Vercel'],
    liveUrl: 'https://outlandrio.vercel.app/',
    image: '/projects/outlandr.png',
    imageAlt: 'Outlandr.io landing page showing the island settlement game',
  },
  {
    id: 6,
    category: 'E-commerce',
    title: 'Multi-Location Inventory for WooCommerce and Odoo',
    sub: 'Stock and order sync across locations between WooCommerce and Odoo',
    desc: 'A custom integration that keeps stock and orders in sync across multiple warehouse locations between a WooCommerce storefront and an Odoo ERP. I built the sync pipeline and the custom Odoo module work, and tracked down cross-system inventory bugs at the data layer, including a multi-location overselling issue that spanned both systems.',
    highlights: [
      'Multi-location inventory sync across two systems',
      'Order pipeline between WooCommerce and Odoo',
      'Root-caused a cross-system overselling bug',
    ],
    stack: ['WordPress', 'WooCommerce', 'PHP', 'Odoo 17', 'Python', 'REST APIs'],
    image: '/projects/woo-multilocation.png',
    imageAlt: 'Illustration of three warehouses syncing stock through a central node',
  },
  {
    id: 1,
    category: 'Proof of Concept',
    title: 'TeeTimes',
    sub: 'Demo: multi-tenant tee time booking engine built as a collaboration prototype',
    desc: 'A proof-of-concept booking platform for golf country clubs, built as a demo for a potential collaboration. Not a product being offered. I designed the multi-tenant data model, the booking engine, and the background job pipeline to validate the architecture. The core booking and scheduling patterns from this PoC later shaped Kora.',
    highlights: [
      'Engine-first multi-tenant architecture as a PoC',
      'Background jobs on BullMQ and Redis',
      'Booking patterns that later informed Kora',
    ],
    stack: [
      'Next.js 14',
      'Express',
      'PostgreSQL',
      'Drizzle ORM',
      'Auth.js v5',
      'BullMQ',
      'Redis',
      'Tailwind CSS',
    ],
    liveUrl: 'https://green-arcade.vercel.app/',
    image: '/projects/teetimes.png',
    imageAlt: 'TeeTimes course search and booking page',
  },
  {
    id: 2,
    category: 'Payments',
    title: 'Kora',
    sub: 'Direct booking engine for service businesses',
    desc: 'A direct booking engine that lets service businesses take reservations on their own site instead of handing a marketplace a 20 percent cut. I built the booking and scheduling flow, Stripe payment processing with Stripe Tax scoped from day one, guest communications, and a review pipeline.',
    highlights: [
      'Booking, scheduling, and payments in one engine',
      'Stripe and Stripe Tax scoped from day one',
      'Guest communications and a review pipeline',
    ],
    stack: ['Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'Stripe Tax'],
    liveUrl: 'https://getkora.vercel.app/',
    image: '/projects/kora.png',
    imageAlt: 'Kora direct booking engine landing page',
  },
  {
    id: 3,
    category: 'Custom Plugin',
    title: 'Luma Loop',
    sub: 'Real-time photo capture and projection for a live venue',
    desc: 'A custom WordPress plugin for a live venue client. Staff capture photos on a tablet, the images poll in over AJAX, and a projector display updates in real time. I scoped, documented, and delivered the whole thing end to end for a paying client.',
    highlights: [
      'Tablet capture to projector in real time',
      'AJAX polling refresh loop',
      'Scoped and shipped solo for a paying client',
    ],
    stack: ['WordPress', 'PHP', 'JavaScript', 'AJAX'],
    repoUrl: 'https://github.com/ghyde3/lumaloop',
    image: '/projects/luma-loop.png',
    imageAlt: 'Luma Loop live event photo capture and projection display',
  },
];

export const SKILLS: Record<string, string[]> = {
  Frontend: ['React', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'SASS / SCSS'],
  Backend: ['Node.js', 'Express', 'PostgreSQL', 'Drizzle ORM', 'Redis', 'BullMQ', 'REST APIs'],
  'AI & Tooling': [
    'Cursor IDE',
    'Claude Code',
    'AI code review',
    'Multi-model synthesis',
    'Prompt engineering',
  ],
  'Commerce & CMS': ['WordPress', 'WooCommerce', 'Shopify', 'Stripe', 'Stripe Tax', 'Odoo 17'],
};

export const STATS: Stat[] = [
  { n: '10+', label: 'Years in production' },
  { n: '12+', label: 'Years building independently' },
  { n: '6+', label: 'Projects shipped end to end' },
  { n: 'AI-native', label: 'Cursor + Claude Code workflow' },
];

export interface Model {
  name: string;
  maker: string;
  tag: string;
  take: string;
}

// Honest, first-person takes on the models I keep in rotation. Edit freely.
export const MODELS: Model[] = [
  {
    name: 'Claude',
    maker: 'Anthropic',
    tag: 'Coding + agentic',
    take: 'The model I trust most for real code and long agentic work. It holds a large codebase in context, sticks to a plan, and is the engine behind most of my day-to-day building in Claude Code.',
  },
  {
    name: 'ChatGPT',
    maker: 'OpenAI',
    tag: 'General reasoning',
    take: 'My quick second opinion. I reach for it to rubber-duck a design, draft copy, or reason through a tradeoff before I commit to an approach.',
  },
  {
    name: 'Grok',
    maker: 'xAI',
    tag: 'Fast + current',
    take: 'Good when I want a fast answer with a current view of the web. I use it for speed and recency rather than deep deliberation.',
  },
  {
    name: 'Kimi',
    maker: 'Moonshot',
    tag: 'Long context',
    take: 'My pick when a task needs a huge context window and a strong agentic researcher. It works through large document sets and multi-step research without losing the thread.',
  },
  {
    name: 'Nemotron',
    maker: 'NVIDIA',
    tag: 'Open weight',
    take: 'An open-weight model I have tested for reasoning work. Useful when I want a capable model I can run on my own terms instead of behind a closed API.',
  },
  {
    name: 'Ollama',
    maker: 'Local runtime',
    tag: 'Local + private',
    take: 'How I run models locally when a task should never leave my machine. Great for private codebases, offline work, and cheap iteration with no API bill.',
  },
  {
    name: 'Composer',
    maker: 'Cursor',
    tag: 'In-editor agent',
    take: "Cursor's in-editor agent. I use it for fast, in-context edits while I am already in the flow, where staying inside the editor beats switching tools.",
  },
];

export interface Note {
  title: string;
  blurb: string;
  tags: string[];
}

// Short notes on how I think about AI-assisted development. Edit freely.
export const NOTES: Note[] = [
  {
    title: 'gstack and agent-first workflows',
    blurb: "Garry Tan's gstack reframes the coding agent as a workflow, not a chat box. Skills for planning, review, QA, and ship turn one-off prompts into a repeatable pipeline. The leverage is in the process around the model, not just the model.",
    tags: ['Workflow', 'Agents'],
  },
  {
    title: 'Superpowers: skills as reusable expertise',
    blurb: "Obra's Superpowers packages real engineering discipline (test-driven development, systematic debugging, planning) into skills the agent invokes on its own. It is the difference between an agent that guesses and one that follows a method.",
    tags: ['Skills', 'Discipline'],
  },
  {
    title: 'Harness engineering',
    blurb: 'Most of the quality in AI-assisted work comes from the harness: the tools, verification steps, and context discipline wrapped around the model. I spend as much time building that harness as I do prompting. The model is the engine, the harness is the car.',
    tags: ['Tooling', 'Quality'],
  },
  {
    title: 'Loops and routines',
    blurb: 'Loops and scheduled routines let an agent keep making progress between my check-ins: watching a deploy, sweeping for bugs, iterating until it hits a target. Used with care, they turn a one-shot tool into something that works while I focus elsewhere.',
    tags: ['Automation', 'Agents'],
  },
];

export const PHOTOS: Photo[] = [
  { src: '/photo/gary-01.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-02.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-03.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-04.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-05.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-06.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-07.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-08.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-09.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-10.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-11.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-12.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-13.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-14.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-15.jpg', alt: 'Gary Hyde' },
  { src: '/photo/gary-16.jpg', alt: 'Gary Hyde' },
];

export const LINKS: Links = {
  email: 'gary.robert.hyde@gmail.com',
  github: 'https://github.com/ghyde3',
  linkedin: 'https://www.linkedin.com/in/ghyde3/',
};
