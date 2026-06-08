# jobs.garyhyde.com - Home Page Design Spec

**Date:** 2026-06-08
**Author:** Gary Hyde (with Claude)
**Status:** Approved, in build

## Goal

Stand up a Next.js project for `jobs.garyhyde.com` and build the public home page. The site is the front door for a job search. Each role Gary applies to will later get its own dedicated landing page (for example `jobs.garyhyde.com/vercel/ui-engineer`), and that URL goes on the resume for that role. The home page exists so that anyone who trims the URL back to the root still lands somewhere polished.

This spec covers the home page only. The project is structured so per-role pages can be added later without rework.

## Constraints

- No traditional backend to run. The one server-side piece is a Vercel-managed Server Action for the contact form.
- No navigation between pages. Role pages are standalone one-pagers with no link back to the home page.
- Every authored file contains zero em-dashes and reads as human-written.
- Faithful to the Gary Hyde Design System.

## Stack

- Next.js (App Router) and TypeScript.
- Deployed on Vercel. Not a static export, because the contact form posts to a Server Action.
- Fonts via `next/font` (Space Grotesk, DM Sans, JetBrains Mono), wired to the design system `--font-*` variables. This replaces the Google Fonts CDN import for production, which the design system readme recommends.
- Contact form delivery via Resend. The `RESEND_API_KEY` lives in `.env` (gitignored). Form mail is sent to `Gary.Robert.Hyde@gmail.com`.

## Design system application

The build copies the design system source of truth in directly rather than reinterpreting it:

- Token CSS (`colors.css`, `typography.css`, `spacing.css`, `motion.css`) copied into `styles/tokens/` and imported from `globals.css`. The typography token file is adjusted so the font families resolve to the `next/font` variables instead of the CDN import.
- Brand assets (`logo.svg`, `logo-wordmark.svg`, `favicon.svg`) copied into `public/`.
- Components (Button, Badge, Tag, Card, NavBar, Divider) ported to TSX from the reference kit at `DesignSystem/ui_kits/portfolio/index.html`, keeping the exact look, hover and press states, and motion. Interactive components are client components; static sections are server components.

## Home page sections

Same rhythm as the reference portfolio kit, populated with Gary's real material from the Master Profile.

1. **Hero** - name, "Senior Full-Stack Developer", an "open to senior roles" status badge, the professional summary, primary and secondary buttons, and a row of stack tags.
2. **Selected Work** - three cards from real projects: TeeTimes (multi-tenant golf booking SaaS), the Direct Booking Platform for short-term rental hosts, and the Live Event Photo System (custom WordPress plugin). Honest copy with no invented metrics.
3. **Skills** - four groups: Frontend, Backend, AI and Tooling, Commerce and CMS.
4. **About** - the senior builder and AI-native positioning, four honest stat tiles, and external links.
5. **Contact** - a working form wired to the Resend Server Action, with a mailto fallback to the project email.
6. **Footer** - monogram and year.

## Project structure

```
jobs-gary-hyde/
  app/
    layout.tsx            fonts, metadata, global token import
    page.tsx              home page composition
    globals.css           token imports, resets, shared utility classes
    actions.ts            "use server" contact action (Resend)
    components/           Button, Badge, Tag, Card, NavBar, Divider
    components/sections/  Hero, Work, Skills, About, Contact, Footer
    data/profile.ts       real content (projects, skills, stats, links)
  styles/tokens/          copied design system token CSS
  public/                 logo, wordmark, favicon
  next.config.ts, tsconfig.json, package.json, .env.example, .gitignore, README
```

Per-role pages will later live at `app/[company]/[role]/page.tsx`, driven by a data file and the design system role-page kit. Out of scope for this spec.

## Content rules

- First person, direct, outcome-focused, quantified only where a real number exists.
- No emoji. Lucide icons only where icons are needed.
- No fabricated metrics. Where the reference kit used placeholder numbers, use truthful descriptive copy instead.
