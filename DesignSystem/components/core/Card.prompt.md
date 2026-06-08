Surface container for projects, experience, and feature content.

```jsx
// Basic card
<Card>
  <h3>AI-Powered Search</h3>
  <p>Replaced Elasticsearch with pgvector + OpenAI embeddings.</p>
</Card>

// Hoverable project card
<Card hoverable href="/projects/search">
  <Tag>Next.js</Tag><Tag>PostgreSQL</Tag>
  <h3>AI-Powered Search</h3>
  <p>Cut search latency from 400ms to 60ms p95.</p>
</Card>

// With header and footer
<Card
  header={<Badge variant="success" dot>Shipped</Badge>}
  footer={<Button variant="ghost" size="sm">Read case study →</Button>}
>
  <p>Content here</p>
</Card>
```

## Notes
- `hoverable` adds `translateY(-2px)` + shadow on hover — use for clickable cards
- `padding` presets: `none` (custom layout), `sm` (dense), `md` (default), `lg` (feature)
- Background is `--surface-1`; nest inside `--bg` for visible elevation
- Avoid deep nesting of Cards — one level is usually enough
