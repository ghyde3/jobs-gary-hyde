Inline status label — semantic coloring for availability, project status, tech labels.

```jsx
<Badge variant="success" dot>Available for hire</Badge>
<Badge variant="accent">AI-augmented</Badge>
<Badge variant="neutral">Side project</Badge>
<Badge variant="info">In progress</Badge>
<Badge variant="error">Deprecated</Badge>
```

## Variants
- `neutral` — zinc surface; default, no status implied
- `accent` — amber; brand highlight, special callouts
- `success` — green; available, shipped, active
- `error` — red; unavailable, deprecated, broken
- `warning` — amber; caution, in-progress
- `info` — blue; informational, beta

## Notes
- `dot` prop adds an animated-ready indicator circle; use `success` + dot for "Available for hire"
- Keep labels short (1–3 words); badges are not sentences
- Sizes `sm` (dense/inline) and `md` (default)
