# Gary Hyde, Developer Portfolio

A public portfolio site and a home for per-application landing pages. Each role I apply to gets its own simple page that speaks directly to that team, what I would build for them, and why my background fits.

Senior full-stack developer with 10+ years shipping production web applications across React, Next.js, Node.js, and PostgreSQL, with a focus on AI-augmented development. I own work end to end, from data model and API through to a polished frontend.

## What this repo is

This is the public face of my job search. It holds only information that is fine to share openly: project summaries, stack details, and tailored landing pages for individual applications. Anything personal lives elsewhere and is kept out of this repo on purpose.

## How it is organized

Applications are grouped by company, then by role, so a company with several openings stays tidy:

```
/applications
  /<company>/
    index.html          optional company overview, links to each role
    assets/             shared company assets (logo, brand color)
    /<role-slug>/
      index.html        the landing page for that role
      assets/           images or styles specific to this page
```

For example:

```
/applications
  /vercel/
    index.html
    /ai-sdk/
      index.html
    /forward-deployed-engineer/
      index.html
  /calendly/
    /full-stack-engineer-iii/
      index.html
```

The folders map directly to URLs, so this becomes `/applications/vercel/ai-sdk/` on the live site. A single reusable page template lives at the repo root, and each landing page starts from it so they stay consistent and light.

### Conventions

- Lowercase, hyphenated slugs for company and role folders (`ai-sdk`, not `AI SDK`).
- Page-specific assets go in that role's `assets/`; anything shared across a company's roles goes in the company-level `assets/`.

## Focus areas

- Full-stack product engineering on React, Next.js, Node, and PostgreSQL
- AI-native development: building tooling on top of Cursor and Claude Code, not just using them
- E-commerce and SaaS platforms, including WooCommerce, Shopify, and Stripe integrations

## Status

Work in progress. New landing pages are added as applications go out.

## Contact

Open to senior and lead roles. The best way to reach me is through the contact link on the live site.
