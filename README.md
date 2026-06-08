# Gary Hyde, Developer Portfolio

A public portfolio site and a home for per-application landing pages. Each role I apply to gets its own page that speaks directly to that team, what I would build for them, and why my background fits. The URL for that page goes on the resume I send for the role, for example `jobs.garyhyde.com/vercel/ui-engineer`. The home page at the root is there for anyone who trims the URL back.

Senior full-stack developer with 10+ years shipping production web applications across React, Next.js, Node.js, and PostgreSQL, with a focus on AI-augmented development. I own work end to end, from data model and API through to a polished frontend.

## Stack

- Next.js (App Router) and TypeScript.
- Deployed on Vercel.
- The Gary Hyde Design System (dark zinc-950 with an amber accent, Space Grotesk / DM Sans / JetBrains Mono). The system source lives in `DesignSystem/`.
- Fonts are loaded with `next/font` (no CDN import in production).
- The contact form posts to a Next.js Server Action that sends mail through [Resend](https://resend.com). No standalone server to run.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in RESEND_API_KEY
npm run dev            # http://localhost:3000
```

### Environment variables

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | API key for sending contact form mail through Resend |
| `CONTACT_TO` | Where contact form submissions are delivered (defaults to the project inbox) |

`.env` is gitignored. Never commit it. Use `.env.example` as the template, and set the same variables in the Vercel project settings for deploys.

## Project structure

```
app/
  layout.tsx            fonts, metadata, global token import
  page.tsx              home page composition
  globals.css           token imports, resets, shared utility classes
  actions.ts            "use server" contact action (Resend)
  components/           Button, Badge, Tag, Card, NavBar, Divider
  components/sections/  Hero, Work, Skills, About, Contact, Footer
  data/profile.ts       site content (projects, skills, stats, links)
styles/tokens/          design system token CSS (colors, type, spacing, motion)
public/                 logo, wordmark, favicon
DesignSystem/           the full design system source and reference UI kits
docs/specs/             design spec for the home page
```

## Per-role landing pages (next)

Role pages will live at `app/[company]/[role]/page.tsx`, driven by a data file and the design system role-page kit, so a folder like `vercel/ui-engineer` maps straight to `jobs.garyhyde.com/vercel/ui-engineer`. Pages are standalone with no navigation between them. This is the next piece of work and is not built yet.

### Conventions

- Lowercase, hyphenated slugs for company and role segments (`ui-engineer`, not `UI Engineer`).
- First person, direct, outcome-focused copy. No invented metrics. No emoji. No em-dashes.

## Deploy

Push to the connected Vercel project, or run `vercel` / `vercel --prod` from this directory. Set `RESEND_API_KEY` (and optionally `CONTACT_TO`) in the Vercel environment first. The custom domain `jobs.garyhyde.com` is configured in Vercel.

## Contact

Open to senior and lead roles. The best way to reach me is the contact form on the live site.
