# jobs.garyhyde.com

Gary Hyde's portfolio site and a home for per-role landing pages. The home page is the public front door. Each job application gets its own dedicated page (for example `jobs.garyhyde.com/vercel/ui-engineer`), and that URL goes on the resume sent for that role. There is no backend to manage and no navigation between landing pages.

## House rules (every file)

- Humanize everything. No tells of AI-generated content. Write like a senior engineer talking to another senior engineer.
- Zero em-dashes in any file. Use hyphens, commas, or parentheses instead.
- No emoji. No invented metrics or claims. If a number is not real, do not use it.
- When producing a Markdown deliverable, also generate a PDF of it.

## Stack and deploy

- Next.js (App Router) and TypeScript. React 19.
- Deployed on Vercel. The GitHub repo is `github.com/ghyde3/jobs-gary-hyde`. Pushing to `main` auto-deploys to production at jobs.garyhyde.com.
- Not a static export: the contact form uses a Server Action plus Resend.
- Local dev: `npm run dev`. Always confirm `npm run build` passes before pushing.

## Design system

This is built on the Gary Hyde Design System (dark zinc-950 with a single amber `#F59E0B` accent; Space Grotesk for display, DM Sans for body, JetBrains Mono for code). The full source and two reference UI kits (portfolio and role_page) live in `DesignSystem/`. The `gary-hyde-design` skill loads it.

- Tokens are copied into `styles/tokens/` and imported from `app/globals.css`. Fonts are wired through `next/font` to the `--font-*` variables.
- Components in `app/components/` are faithful TSX ports of the design system. Match the existing look: 1px white-alpha borders, 4-10px radii, 150-220ms ease-out motion, no decorative gradients except the subtle hero and contact radials.
- Stay on the tokens and existing components. Do not introduce new colors or fonts.

## Structure

```
app/
  layout.tsx, page.tsx, globals.css
  actions.ts            contact Server Action (Resend)
  components/           Button, Badge, Tag, Card, NavBar, Divider
  components/sections/  Hero, Work, ProjectCard, Skills, Models, Notes, About, Contact, Footer
  data/profile.ts       all site content
styles/tokens/          design system token CSS
public/                 logo, favicon, public/projects/ screenshots
DesignSystem/           design system source and reference kits
docs/specs/             design spec
```

All site copy lives in `app/data/profile.ts` (PROJECTS, MODELS, NOTES, SKILLS, STATS, LINKS, PROFILE). The MODELS and NOTES takes are Gary's, edit them there.

## Content conventions

- First person, direct, outcome-focused. Sentence case for UI labels and buttons. Official casing for tech names (TypeScript, Next.js, PostgreSQL).
- Section backgrounds alternate between the page background and the surface-1 band so the page is not flat black.
- Project cards are full width. Live projects get a screenshot preview plus a "Visit live site" link; repo-only projects get "View on GitHub".

## Contact form and Resend

- `app/actions.ts` sends through Resend. Recipient is `CONTACT_TO`, sender is `CONTACT_FROM` (defaults to `onboarding@resend.dev` until a domain is verified). Keys live in `.env` and the Vercel project env. `.env` is gitignored.
- Resend only delivers to the account owner's address until a domain is verified at resend.com/domains. To send to the dedicated inbox, verify `garyhyde.com` and set `CONTACT_FROM` to an address on it.

## Per-role landing pages (the next build)

- Live at `app/[company]/[role]/page.tsx`, driven by data and the `DesignSystem/ui_kits/role_page` kit.
- Lowercase, hyphenated slugs (`ui-engineer`, not `UI Engineer`). Pages are standalone with no link back to the home page.

## Do not

- Commit `.env` or any `*.zip` (both are gitignored).
- Add a backend, a database, or cross-page navigation.
