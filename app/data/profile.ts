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
  },
  {
    id: 1,
    category: 'SaaS Platform',
    title: 'TeeTimes',
    sub: 'Multi-tenant tee time booking platform for golf clubs',
    desc: 'An OpenTable-style booking SaaS for golf country clubs, built engine-first so every club runs as its own tenant. I designed the data model, the booking engine, and the background job pipeline, with a test-driven task structure and an agent-ready workflow so features land quickly and stay covered.',
    highlights: [
      'Engine-first multi-tenant architecture',
      'Background jobs on BullMQ and Redis',
      'Test-driven, agent-ready build workflow',
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

export const LINKS: Links = {
  email: 'Gary.Robert.Hyde@gmail.com',
  github: '',
  linkedin: '',
};
