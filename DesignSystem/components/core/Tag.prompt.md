Tech-stack chips for listing languages, frameworks, and tools in monospace.

```jsx
// Static list
<Tag>TypeScript</Tag>
<Tag>React</Tag>
<Tag>Next.js</Tag>
<Tag>PostgreSQL</Tag>

// Active/highlighted
<Tag active>Node.js</Tag>

// Interactive filter
<Tag onClick={() => setFilter('react')}>React</Tag>
```

## Notes
- Always use real, official tech names: `TypeScript` not `typescript`, `Next.js` not `NextJS`
- Monospace font is intentional — signals code/technical context
- `active` state turns amber — used for filtered/selected tech stacks
- Keep to a single word or short name; no sentences in Tags
- Pair with a wrapping flex container: `display:flex; flex-wrap:wrap; gap:6px`
