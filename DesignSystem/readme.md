# Gary Hyde — Design System

**Version:** 1.0  
**Last updated:** June 2026  
**Author:** Gary Hyde

---

## About

This design system governs all visual and interactive output for Gary Hyde's professional web presence — the main portfolio site and a series of per-role landing pages. It encodes the brand's color, type, spacing, motion, and component vocabulary so that any design or production artifact can be created quickly, on-brand, and without guesswork.

Gary Hyde is a senior full-stack developer with 10+ years shipping production web applications. The stack is React, Next.js, Node.js, and PostgreSQL, with a focus on AI-augmented development. Every engagement is end-to-end — data model through polished frontend. The public-facing products are:

1. **Portfolio site** — a personal homepage showcasing selected work, skills, and background.  
2. **Role landing pages** — targeted one-pagers, one per job application, speaking directly to a team's context: what Gary would build, why his background fits, concrete examples.

**Sources provided:** No external codebase or Figma file was supplied. This design system was authored from scratch using the written brand brief above. If a GitHub repo or Figma link becomes available, link it here and re-run the system audit.

---

## Content Fundamentals

### Voice & Tone

Gary Hyde writes in the **first person, direct, and outcome-focused**. Copy reads like a senior engineer talking to another senior engineer — no hedging, no corporate fluff.

| Avoid | Prefer |
|---|---|
| "I have experience with…" | "I've shipped X using Y." |
| "I might be able to help with…" | "I can own this end-to-end." |
| "We worked on a project…" | "I built a system that…" |
| "Passionate about…" | "I focus on…" |
| "Results-driven professional" | "I shipped X that reduced latency by 60%." |

**Quantify whenever possible:** include ARR impact, user counts, latency numbers, deploy frequency, team size. A claim without a number is weaker than a claim with one.

### Casing

- **UI labels, buttons, nav:** sentence case ("View work", not "View Work")
- **Section headers in prose:** title case ("Selected Work", "About Me")
- **Tech names:** use the official casing (TypeScript, Next.js, PostgreSQL, OpenAI)
- **Role titles in copy:** sentence case when mid-sentence; title case when standalone

### Pronouns & Perspective

- Always **"I"**, never "we" on personal pages
- Speak to **"you"** (the reader/hiring manager): "what I'd build for your team"
- Role pages speak as if addressing the specific team directly

### Emoji & Special Characters

- **No emoji** — ever. Not in copy, not in UI
- Lucide icons serve all iconographic needs in the UI
- Arrows, bullets, and dashes are standard typographic: →, –, —, ·

### Vibe

Technical credibility paired with human clarity. Not cold or corporate. Not casual or self-deprecating. Like the README of a well-maintained open-source project: clear, considered, and useful.

---

## Visual Foundations

### Colors

**Base palette:** Zinc-950 dark-first with a single warm amber accent.

The neutral system is the Zinc scale (`#09090B` → `#FAFAFA`). One brand accent — amber (`#F59E0B`) — is used for CTAs, links, and interactive affordances. No secondary accent. Semantic colors (green/red/blue) appear only for status signals.

**Accent:** `#F59E0B` (amber-400). On hover: `#FCD34D`. On press: `#D97706`. Amber was chosen because it reads as premium and warm against zinc-950, avoids the overused cyan/teal developer aesthetic, and pairs well with the Space Grotesk letterforms.

### Typography

Three families, each with a distinct role:

| Family | Use | Google Font |
|---|---|---|
| **Space Grotesk** | Display, headings, monogram | `Space Grotesk` |
| **DM Sans** | Body, UI, labels | `DM Sans` |
| **JetBrains Mono** | Code, technical labels | `JetBrains Mono` |

Space Grotesk is slightly quirky and geometric — it gives the brand a distinct typographic voice without being a novelty font. DM Sans is clean and highly readable at small sizes. JetBrains Mono reinforces technical credibility with authentic developer tooling aesthetics.

Headings use tight tracking (`-0.025em`) and a tight line-height (`1.15`). Display sizes lean into negative tracking further. Body copy is comfortable at `1.65` line-height.

### Spacing

4px base unit. The spacing scale (`--space-1` through `--space-64`) covers all layout and component needs.

### Layout

- Max container: `1280px`, centered with auto margins
- Navigation bar: `60px` height, sticky with `backdrop-filter: blur(12px)`
- 12-column grid with `24px` gutters
- Section vertical rhythm: `80–96px` top/bottom padding
- Mobile breakpoint: `768px`

### Backgrounds & Surfaces

Dark-first, zero decorative imagery. No gradients except a very subtle radial on the hero (adds depth without being obvious). Three surface elevations above the page background, achieved by lightening the zinc value:

```
--bg         #09090B   (page)
--surface-1  #111113   (cards, panels)
--surface-2  #18181B   (elevated — modals, dropdowns)
--surface-3  #1F1F23   (highest)
```

Cards use `--surface-1` background, `1px solid rgba(255,255,255,0.08)` border. No box shadow on cards — border handles the separation. Modals and floating panels get `--shadow-lg`.

### Borders

All borders are `1px solid rgba(255,255,255,0.08)` by default — subtle dividers that register without drawing attention. Strong borders (`rgba(255,255,255,0.16)`) on focused inputs and hover-state elements.

### Corner Radii

Clean and sharp. No bubbly interfaces.

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Tags, chips, badges |
| `--radius-md` | 6px | Buttons, inputs, small cards |
| `--radius-lg` | 10px | Cards, panels |
| `--radius-xl` | 14px | Large modals, feature cards |
| `--radius-full` | 9999px | Pill buttons, avatars |

### Shadows

Heavy shadows for dark-mode UI (more contrast needed than light-mode). Ambient shadows at `rgba(0,0,0,0.5)`. Accent glow used sparingly on feature CTAs:

```
--shadow-accent: 0 0 0 1px rgba(245,158,11,0.25), 0 0 24px rgba(245,158,11,0.2)
```

Focus rings: `0 0 0 2px #09090B, 0 0 0 4px #F59E0B`.

### Hover & Press States

- **Buttons:** `background-color` lightens (primary → amber-300), transition `150ms ease-out`
- **Ghost / text links:** opacity `0.8` → `1.0`, or color shifts to `--text-1`
- **Cards:** `border-color` strengthens to `rgba(255,255,255,0.16)`, subtle `translateY(-1px)`
- **Press:** `transform: scale(0.98)`, duration `80ms`
- **Icon buttons:** background fills to `--surface-hover` (4% white)

### Animation

Purposeful and subtle. No decorative infinite loops on main content.

- Default transition: `220ms cubic-bezier(0.16, 1, 0.3, 1)` (snappy ease-out)
- Fast interactions (hover, focus): `150ms`
- Entrance animations: fade + `translateY(8px)` → `translateY(0)`, `350ms ease-out`
- Respect `prefers-reduced-motion` — all durations collapse to `0ms`

### Color Temperature of Imagery

No photography in the base system. If added: dark, moody, high-contrast; cooler tones with subtle grain. Avoid stock photography. Screenshots of actual work are preferred.

---

## Iconography

**System:** [Lucide Icons](https://lucide.dev) via CDN  
**Style:** Stroke-based, 24×24px default, `stroke-width: 1.5`, no fill  
**Color:** Inherits `currentColor` — adapts to context  
**Sizing:** `16px` (inline/dense), `20px` (default UI), `24px` (prominent), `32px` (feature icons)

Lucide is loaded via CDN in all HTML files:
```html
<script src="https://unpkg.com/lucide@latest"></script>
<!-- Then call: lucide.createIcons() -->
```

Or as an ES module:
```js
import { createIcons, ArrowRight, ExternalLink } from 'lucide';
```

**Common icons in use:**

| Icon | Token name | Use |
|---|---|---|
| `arrow-right` | — | CTAs, navigation hints |
| `external-link` | — | Outbound links |
| `github` | — | GitHub link |
| `mail` | — | Contact |
| `terminal` | — | Code / technical context |
| `layers` | — | Full-stack context |
| `cpu` | — | AI/ML context |
| `zap` | — | Performance wins |
| `check` | — | Success state |
| `x` | — | Dismiss, close |
| `menu` | — | Mobile nav |
| `chevron-right` | — | Inline navigation |

**Tech-stack logos:** Use SVG versions from [devicons](https://devicons.github.io/devicon/) or the official brand assets. These are raster-supported (PNG fallback at 32×32px). Stored in `assets/icons/`.

**No emoji as icons.** No hand-rolled SVG illustrations.

---

## Visual Foundations Summary

| Property | Decision |
|---|---|
| Color mode | Dark first |
| Accent | Amber `#F59E0B` (single accent) |
| Neutrals | Zinc scale |
| Display font | Space Grotesk |
| Body font | DM Sans |
| Code font | JetBrains Mono |
| Corner radius | 4–10px (clean) |
| Border style | `1px solid rgba(255,255,255,0.08)` |
| Card style | Surface-1 bg + border, no shadow |
| Animation | 150–220ms ease-out, subtle |
| Gradients | None decorative; hero depth radial only |
| Illustrations | None — real work screenshots only |
| Emoji | Never |
| Icon system | Lucide, stroke 1.5px |

---

## File Index

```
styles.css                    Entry point — @imports only
tokens/
  colors.css                  Color custom properties
  typography.css              Font imports + type scale
  spacing.css                 Spacing, radius, shadow, z-index
  motion.css                  Duration, easing, transition helpers
assets/
  logo.svg                    GH monogram (40×40)
  logo-wordmark.svg           Monogram + name + role (160×40)
  favicon.svg                 Favicon (32×32)
guidelines/
  colors-accent.card.html     Accent amber palette
  colors-neutral.card.html    Zinc neutral scale
  colors-semantic.card.html   Success / error / warning / info
  colors-surfaces.card.html   Surface & border tokens in context
  type-display.card.html      Space Grotesk display specimen
  type-body.card.html         DM Sans body specimen
  type-mono.card.html         JetBrains Mono specimen
  type-scale.card.html        Full size scale ramp
  spacing.card.html           Spacing token blocks
  radius-shadow.card.html     Radii + shadow specimens
  motion.card.html            Duration & easing reference
components/
  core/
    Button.jsx / .d.ts        Primary interactive control
    Badge.jsx / .d.ts         Status + label badges
    Tag.jsx / .d.ts           Tech-stack tags
    Card.jsx / .d.ts          Content card container
    NavBar.jsx / .d.ts        Site navigation bar
    buttons.card.html         Button variants card
    display.card.html         Badge + Tag + Card card
    nav.card.html             NavBar card
  forms/
    Input.jsx / .d.ts         Text input
    TextArea.jsx / .d.ts      Multiline input
    forms.card.html           Form controls card
  display/
    Avatar.jsx / .d.ts        Profile avatar
    CodeBlock.jsx / .d.ts     Code snippet display
    Divider.jsx / .d.ts       Section divider
    display.card.html         Display components card
ui_kits/
  portfolio/
    index.html                Interactive portfolio site
    PortfolioNav.jsx          Navigation bar
    PortfolioHero.jsx         Hero section
    ProjectCard.jsx           Project card
    SkillsSection.jsx         Tech stack grid
    AboutSection.jsx          About + contact
  role_page/
    index.html                Interactive role landing page
    RoleHero.jsx              Role-targeted hero
    WhatIdBuild.jsx           "What I'd build" section
    ExperienceSection.jsx     Relevant experience
readme.md                     This file
SKILL.md                      Agent skill manifest
```

### Components

| Component | File | Description |
|---|---|---|
| `Button` | `components/core/Button.jsx` | Primary interactive control |
| `Badge` | `components/core/Badge.jsx` | Inline status labels |
| `Tag` | `components/core/Tag.jsx` | Tech-stack chips |
| `Card` | `components/core/Card.jsx` | Content card container |
| `NavBar` | `components/core/NavBar.jsx` | Site navigation |
| `Input` | `components/forms/Input.jsx` | Text input |
| `TextArea` | `components/forms/TextArea.jsx` | Multiline input |
| `Avatar` | `components/display/Avatar.jsx` | Profile image |
| `CodeBlock` | `components/display/CodeBlock.jsx` | Code snippet |
| `Divider` | `components/display/Divider.jsx` | Section rule |

### UI Kits

| Product | Path | Description |
|---|---|---|
| Portfolio | `ui_kits/portfolio/index.html` | Main portfolio homepage |
| Role Page | `ui_kits/role_page/index.html` | Per-role landing page |

---

## Caveats

- **Fonts:** Using Google Fonts CDN (Space Grotesk, DM Sans, JetBrains Mono). Self-host for production builds — replace the `@import url(...)` in `tokens/typography.css` with local `@font-face` declarations.
- **No supplied assets:** No codebase, Figma file, or existing brand assets were provided. Design decisions were made fresh from the brief.
- **Logo:** SVG monogram generated here; replace with a professionally designed mark when available.
