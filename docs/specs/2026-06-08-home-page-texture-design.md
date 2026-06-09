# Home page texture and depth pass

Date: 2026-06-08
Status: Approved for implementation

## Goal

The home page is a polished dark zinc-950 + amber portfolio, but it reads as large
flat-black areas with little texture. This pass adds subtle, cohesive depth in three
places without changing copy, palette, or the existing component vocabulary:

1. An interactive "mesh wallpaper" behind the hero (futuristic OS desktop feel).
2. The Selected Work card stack becomes full-bleed horizontal bands.
3. A shared, faint texture treatment across the remaining sections so the page
   shares one visual language instead of going flat between sections.

## Non-negotiable constraints

- No new colors or fonts. Amber `#F59E0B` + the zinc scale only, off the existing tokens.
- Stay on existing components (`Card`, `Badge`, `Tag`, `Button`) and section structure.
- No em-dashes anywhere. No emoji. No invented metrics.
- `npm run build` must pass before anything is considered done.
- Everything decorative is `pointer-events: none` and sits behind content (`z-index`).
- All motion respects `prefers-reduced-motion: reduce` (drift + cursor-lean disabled,
  static gradient retained).
- **Intensity = "whisper":** texture and motion are barely perceptible, noticed only
  when the user fidgets. Alpha values below are ceilings, not targets.

## Technical approach

Pure CSS layered radial gradients + a featherweight client component. No WebGL,
no canvas, no new dependencies. All animation is GPU-composited (`transform`/`opacity`
only). Pointer input writes CSS custom properties via a single `requestAnimationFrame`
loop; nothing re-renders React on pointer move.

## Component 1: Hero mesh wallpaper

New client component `app/components/sections/HeroMesh.tsx`, rendered as the first
child of the existing `Hero` `<section>` (replacing the lone radial div at
`Hero.tsx:21-34`, which becomes the base layer of the mesh).

Structure (all absolutely positioned, `inset: 0`, `pointer-events: none`, `z-index: 0`;
hero content stays at `z-index: 1`):

- **Blobs:** 3 amber radial blobs + 1 cool zinc blob (`#3F3F46`-ish) for depth. Each is
  a `div` with a `radial-gradient` background, heavily blurred (`filter: blur(40-60px)`),
  amber alpha ceiling **0.07**, zinc alpha ceiling **0.05**. Each drifts + breathes on an
  independent `@keyframes` loop (18-30s, `ease-in-out`, `alternate`).
- **Cursor-lean / parallax:** a `pointermove` listener (throttled to one `rAF` per frame)
  writes `--mx` and `--my` (range roughly -1..1) on the section. Each blob applies
  `translate(calc(var(--mx) * Npx), calc(var(--my) * Npx))` where `N` differs per blob
  (closer blobs move more, ~6-16px) for parallax depth. The keyframe drift composes via a
  wrapper element so transforms do not fight (drift on inner, lean on outer, or use
  `translate` for lean + `transform` for drift on separate elements).
- **Device tilt (mobile):** `deviceorientation` (gamma/beta, clamped + scaled) feeds the
  same `--mx`/`--my`. Add the listener only on touch/coarse-pointer; never block scroll.
- **Dot grid:** one overlay `div`, `background-image` of a 1px radial dot on a ~28px grid,
  dot color white at alpha ceiling **0.04**, masked with a `radial-gradient`
  `mask-image` so it dissolves toward the edges. Static (no animation).
- **Reduced motion:** under `prefers-reduced-motion: reduce`, drop all listeners and
  keyframes; render a single static amber radial (today's look) + the (static) dot grid.

Acceptance: hero looks calm at rest, blobs perceptibly lean when the mouse moves, copy
is still the clear focal point, no layout shift, no scroll jank, build passes.

## Component 2: Selected Work full-bleed bands

Rework `Work.tsx` + `ProjectCard.tsx` so each project is a full-width horizontal band
instead of a bordered card in a gapped stack.

- The `SELECTED WORK` label, heading, and intro paragraph stay inside the container at the
  top of the `#work` section (unchanged).
- Below that, projects render as a vertical run of **full-bleed bands** (edge-to-edge,
  no outer side gaps), each separated by a hairline divider (`1px solid var(--border)`).
- Within a band: image media on one side bleeding to the viewport edge, text content held
  to the container width on the other side. Alternate image L/R using the existing
  `index % 2` flip. Collapse to stacked (image top, text below) under 820px, matching the
  current responsive breakpoint.
- Alternating band tint: `#09090B` and `#0d0d10` (subtle, within "whisper").
- A large monospace index watermark per band (`01`, `02`, ...) in `var(--font-mono)`,
  zinc at low alpha (~`#27272A` / alpha ~0.5), positioned so it does not collide with text.
- Preserve ALL existing content and behavior: category + Live/Shipped badges, title, sub,
  desc, highlight rows with the amber arrow, stack tags, and the live/repo footer links,
  plus the clickable media linking to the project. Image `priority` for first two stays.

Acceptance: Work section reads as distinct full-width rows that break up the black; all
prior content/links present; responsive collapse works; build passes.

## Component 3: Shared section texture

New component `app/components/SectionTexture.tsx` (can be a server component; pure CSS):

```
<SectionTexture variant="dots" | "radial" anchor? corner? />
```

- Absolutely positioned, `inset: 0`, `pointer-events: none`, behind content.
- `variant="dots"`: the same masked dot-grid used in the hero (alpha ceiling 0.04).
- `variant="radial"`: a single soft amber radial (alpha ceiling 0.05) anchored to a
  configurable corner.
- Reduced-motion irrelevant (these are static), but keep them static regardless.

Apply to the remaining sections, each section made `position: relative; overflow: hidden`
and content lifted to `z-index: 1`:

- **Skills** (`#111113` band): `dots`.
- **Models** (`#09090B`): `radial` anchored top-right.
- **Notes** (`#111113` band): `dots`.
- **About** (`#09090B`): `radial` anchored bottom-left.
- **Contact** (`#111113` band): keep its existing radial; add `dots`. Do not duplicate
  the amber glow.

Acceptance: every section shares the dot/radial vocabulary, nothing competes with text,
contrast/readability unchanged, build passes.

## Files touched

- New: `app/components/sections/HeroMesh.tsx`, `app/components/SectionTexture.tsx`
- Edit: `app/components/sections/Hero.tsx`, `Work.tsx`, `ProjectCard.tsx`,
  `Skills.tsx`, `Models.tsx`, `Notes.tsx`, `About.tsx`, `Contact.tsx`

## Out of scope

- No content/copy changes. No new colors/fonts. No nav, routing, or backend changes.
- No per-role landing page work.

## Verification

- `npm run build` passes.
- Manual review on `npm run dev`: hero lean works and is subtle; Work bands break up the
  black; remaining sections share texture; toggling OS "reduce motion" stops hero motion.
