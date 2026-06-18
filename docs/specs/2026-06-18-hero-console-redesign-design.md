# Hero console redesign

Date: 2026-06-18
Status: approved design, pre-implementation

## Goal

Make the AI console the centerpiece of the hero on both the home page and the
per-role landing pages. Today the home hero is a two-column split (bold text
left, console right) and the role pages bury the console in a full-width "Ask me
anything" section lower down. We are unifying these into one console-forward
hero that reads as a single standout piece, presents better on mobile, and uses
a white background with a triadic purple/teal dot grid.

## Decisions (locked with the user)

- Scope: one shared hero used on both home and role pages.
- Layout: centered headline block above a container-width console; identity also
  lives inside the console.
- Background: white, hero section only. The rest of each page stays on the
  current dark theme.
- Dot grid: triadic of the amber accent, purple `#9E0BF5` (large/near cursor)
  morphing to teal `#0BF59E` as dots fade out.
- Accent line: black text on an amber `#F59E0B` highlight (amber text alone
  fails contrast on white).
- Matrix easter egg: keep the green pulse and additionally transition the hero
  background white -> black for the 10s window, then revert.
- Page CTAs: keep a centered secondary CTA row below the console.

## Layout

Single left-aligned column inside `.container`:

1. Name + badge on one row, left-aligned and inline. `Gary Hyde` (display/mono,
   bold) with the `Open to senior and lead roles` pill vertically centered
   beside it. The pill wraps under the name on narrow screens.
2. Accent line, left-aligned: black text on an amber highlight pill. Home shows
   the title (`Senior Full-Stack Developer`); role pages show their role
   headline.
3. Console, container width (replaces the old `1fr / 1.2fr` split), output area
   a touch taller (~340px) so it reads well wide.
4. CTA row, left-aligned, secondary styling. Home: `View my work` (#work) +
   `Get in touch` (#contact). Role: `See why I fit` (#role) + `Get in touch`.

The badge is rendered inline in `HeroConsole` (not the shared `Badge`) with a
more opaque, white-tuned treatment so it reads clearly on white, and flips to a
dark-friendly treatment in Matrix mode.

On mobile the console now sits directly under a compact headline instead of
being pushed below a tall text block.

## Console behavior

The console no longer auto-runs `gary --profile` (that duplicated the header).
The idle autoplay now types an intro instead of running a command:

1. Type the page's intro copy (the existing header subhead) as attention-grabbing
   intro text. Home reuses `PROFILE.summary`; role pages reuse `hero.subhead`.
2. Type a usage hint line, e.g. "pick a button below, type a command (try
   `help`), or just ask me anything." Stored as a constant in `data/terminal.ts`.
3. Show the quick-action buttons (below).

Quick-action buttons live inside the console (a row with a top divider, above
the input), visible on all viewports (previously chips were mobile-only):

- `Chat with Gary.Ai` -> runs `ask` (enters gary-ai mode), amber-accented as the
  primary action.
- `Pitch 60` -> runs `pitch 60`.
- `Commands help` -> runs `help`.

These replace the old `CHIPS` array. The console keeps its existing typing,
history, AI streaming, maximize, and easter-egg behavior unchanged.

## Components

- New `app/components/sections/HeroConsole.tsx`. Props: `headline` (the accent
  line text), `intro` (typed console intro), `ctaPrimary`/`ctaSecondary`
  (`{ label, href }`). Renders the centered headline block, white background,
  `HeroDots`, and `HeroTerminal` (passing `intro` through). Owns the Matrix-mode
  state.
- Delete `app/components/sections/Hero.tsx` and `RoleHero.tsx`.
- `app/page.tsx` (home) renders `HeroConsole` with `PROFILE.title` as the accent,
  `PROFILE.summary` as the intro, and the `View my work` / `Get in touch` CTAs.
- `app/[company]/[role]/page.tsx` renders `HeroConsole` with `data.hero.headline`
  as the accent and `data.hero.subhead` as the intro. The separate `#ask`
  section is removed; the redundant `Ask me` nav link is dropped.
- `app/components/sections/HeroTerminal.tsx` gains an `intro` prop and a
  persistent, always-visible quick-action row; `CHIPS` becomes the three quick
  actions above.
- `app/components/sections/HeroDots.tsx` gets the purple/teal interpolation and
  white-tuned opacity (see below).
- `app/globals.css`: drop `.heroGrid`; add the single-column console-hero layout
  and the always-visible quick-action row styling; keep the mobile rules.

## Color treatment

On the white hero:

- Headline: `#18181B` (near-black).
- Accent line: `#18181B` text on `#F59E0B` amber highlight.
- Subhead paragraph: removed from the header (moved into the console).
- Console: unchanged (stays dark; a dark terminal on white is the standout).
- Badge: success pill, verified for contrast on white.

Matrix mode (10s): hero background transitions to `#09090B`, headline/intro text
flip to light (`#FAFAFA` / zinc), dots go green, then everything reverts. Gated
on non-reduced-motion to stay consistent with `HeroDots` (which skips its pulse
loop under reduced motion).

## Dot grid

In `HeroDots.tsx`, the normal theme interpolates per dot by the existing
influence factor `f` (which already drives size and opacity):

- `f` high (large, near cursor) -> purple `#9E0BF5`.
- `f` low (small, fading out) -> teal `#0BF59E`.
- `color = lerp(teal, purple, f)`.
- Opacity range raised (~0.18 to ~0.9) so both colors read on white; tuned live
  in the preview.

Static render (reduced motion) uses a faint purple/teal. The Matrix theme stays
green, tuned for the black background. Final opacity/size constants are tuned
against the running dev server.

## Mobile navbar (built alongside, not separately spec'd)

Below 768px the inline nav links and the desktop CTA are hidden and replaced by
a toggle button using an actual hamburger-food SVG icon (a literal burger, not
three bars). Tapping it opens a slideout drawer from the right: a dark panel
over a dimmed backdrop, containing the nav links stacked vertically plus the CTA.
Backdrop click and Escape close it; body scroll locks while open. The icon and
panel use the existing dark theme (the navbar sits over the dark strip above the
white hero, so the icon stays light).

## Navbar interaction

`<main>` already has a 60px top offset, so the strip behind
the transparent navbar stays dark (body background) and the white hero begins
below it: navbar reads dark, hero reads white, with a crisp seam. Once scrolled
past 12px the navbar switches to its dark-glass treatment as today.

## Verification

- `npm run build` passes.
- Dev-server preview screenshots: home and a role page, desktop and mobile.
- Trigger the Matrix easter egg (`sudo hire gary` or `theme matrix`) and confirm
  the white -> black transition and revert.
- Confirm the three quick-action buttons run `ask`, `pitch 60`, and `help`.

## Out of scope

- No light theme beyond the hero section.
- No backend, data, or navigation changes beyond removing the role `#ask`
  section and its nav link.
- Console internals (AI streaming, history, maximize) are untouched.
