Text input field with label, states, and icon support.

```jsx
// Basic
<Input label="Your name" placeholder="Jane Smith" />

// With validation
<Input
  label="Email"
  type="email"
  required
  placeholder="jane@example.com"
  error="Please enter a valid email"
/>

// With icon (Lucide)
<Input
  label="Search"
  leftIcon={<Search size={15} />}
  placeholder="Filter projects..."
  size="sm"
/>
```

## States
- **Default** — `--surface-1` bg, `--border` border
- **Focused** — `--surface-2` bg, amber border, amber focus ring
- **Error** — red border, red hint text
- **Disabled** — dimmed, not-allowed cursor

## Notes
- `label` auto-generates `id` from text if not provided
- `required` shows amber asterisk on label
- Pair with `TextArea` for multi-line fields (contact forms)
