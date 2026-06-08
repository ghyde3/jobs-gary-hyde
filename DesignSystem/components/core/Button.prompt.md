Primary interactive control — buttons, links, and form submissions.

```jsx
// Primary CTA
<Button variant="primary" size="lg">View my work</Button>

// Secondary with icon
<Button variant="secondary" leftIcon={<ArrowRight size={16} />}>Read case study</Button>

// Ghost nav link
<Button variant="ghost" href="/contact">Get in touch</Button>

// Danger action
<Button variant="danger" size="sm">Remove</Button>
```

## Variants
- `primary` — filled amber; use for the single most important action per view
- `secondary` — muted surface with border; secondary actions
- `ghost` — transparent; nav links, tertiary actions, icon buttons
- `danger` — red-tinted; destructive or irreversible actions

## Sizes
- `sm` — 30px height, 11px label, `SMALL` tracking; inline / dense UI
- `md` (default) — 38px height, 13px label; standard use
- `lg` — 46px height, 16px label; hero / feature CTAs

## Notes
- One `primary` button per screen region — not multiple
- `leftIcon` / `rightIcon` accept any ReactNode; Lucide at 16px fits sm/md
- `fullWidth` for mobile-first forms and stacked layouts
