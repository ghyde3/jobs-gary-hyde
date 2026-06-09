import type { RoleData } from '../types';

/**
 * ILLUSTRATIVE COPY - Gary Hyde must review and replace before use.
 * All claims must be accurate and verifiable from the master profile.
 * No em-dashes. No emoji. Quantified claims only. First-person, direct voice.
 */
export const vercelUiEngineer: RoleData = {
  company: 'vercel',
  role: 'ui-engineer',
  companyName: 'Vercel',
  roleTitle: 'UI Engineer',

  hero: {
    headline: 'Shipping performant Next.js UIs since before Vercel was Vercel',
    subhead:
      'I build on Next.js and TypeScript every day, deploy to Vercel for every project, and care about the same things your product org cares about: fast cold starts, composable components, and a frontend that earns trust.',
  },

  note: [
    'I have been following Vercel closely since the Zeit days, and the move to Next.js 13 App ' +
    'Router cemented something I already believed: the best developer tools are built by people ' +
    'who ship on them every day. Every project in my current portfolio runs on Next.js and ' +
    'deploys to Vercel. That is not a talking point, it is just how I work.',

    'The skills listed below are the same ones I use in production. I shipped four Next.js ' +
    'applications using the App Router, worked with Server Components and streaming in real ' +
    'products, and built a design system from tokens up to documented component patterns. ' +
    'I am comfortable owning a feature from design input through to the Vercel deploy, and I ' +
    'have done exactly that on every project I have shipped.',

    'What I want to own at Vercel is the part of the product that other engineers see first. ' +
    'The component primitives, the dashboard interactions, the pieces that set the quality bar ' +
    'for everything downstream. I think my end-to-end ownership habit and my investment in ' +
    'design-system craft fit the way Vercel builds, and I would like the chance to prove that.',
  ],

  requirements: [
    {
      requirement:
        'Deep experience with React and Next.js App Router, including Server Components and streaming.',
      proof:
        'I have shipped four Next.js applications using the App Router, including a multi-tenant SaaS ' +
        'and an AI product. All are on Vercel. I have worked with Server Components, server actions, ' +
        'and streaming responses in production.',
    },
    {
      requirement:
        'Strong TypeScript across the full stack, including complex generic types and strict mode.',
      proof:
        'TypeScript is my default on every project. I use strict mode, write typed server actions, ' +
        'and have dealt with generic type complexity in the multi-tenant booking engine (TeeTimes) ' +
        'where tenant-scoped data models needed careful generic constraints.',
    },
    {
      requirement:
        'Experience building and maintaining design system components or component libraries.',
      proof:
        'This portfolio site runs on a custom design system I authored from scratch: tokens, ' +
        'components (Button, Badge, Tag, Card, Divider, NavBar), and documented usage patterns. ' +
        'Every component is a faithful TSX port with design-token compliance.',
    },
    {
      requirement:
        'Ability to own features end to end, from design input through to shipped production code.',
      proof:
        'Every project in my portfolio was built end to end by me: data model, API, frontend, deploy. ' +
        'TeeTimes, Kora, Lumi, and Outlandr.io were each scoped, designed, built, and shipped without ' +
        'a separate design or backend resource.',
    },
    {
      requirement:
        'Comfort working in an async, remote-first environment with high written-communication standards.',
      proof:
        'I have worked independently and remotely for 10+ years. My planning and communication ' +
        'artifacts (specs, plans, review summaries) are written to the standard a distributed team ' +
        'needs to act on them without a meeting.',
    },
  ],

  projects: [
    {
      projectTitle: 'Lumi',
      framing:
        'Full-stack AI product: Next.js App Router, OpenAI streaming, freemium payment flow, deployed on Vercel.',
    },
    {
      projectTitle: 'TeeTimes',
      framing:
        'Multi-tenant SaaS: Next.js 14, PostgreSQL, BullMQ, strict TypeScript throughout.',
    },
    {
      projectTitle: 'Kora',
      framing:
        'Booking engine with Stripe and Stripe Tax: Next.js, Node.js, PostgreSQL, end-to-end ownership.',
    },
  ],

  breadthNote:
    'I started shipping client websites in 2010, while still in college, and built over 100 ' +
    'production sites on WordPress and WooCommerce through an agency and freelance run. ' +
    'That volume is not what makes me right for this role, but the habit of shipping ' +
    'production code at scale is.',

  artifacts: {
    resumePdf: '/roles/vercel/ui-engineer/resume.pdf',
    coverLetterPdf: '/roles/vercel/ui-engineer/cover-letter.pdf',
  },
};
