Sticky navigation bar — scroll-aware backdrop blur, active link highlighting.

```jsx
<NavBar
  logo={<img src="/assets/logo.svg" width={32} height={32} alt="GH" />}
  links={[
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Writing', href: '/writing' },
  ]}
  cta={<Button variant="primary" size="sm">Get in touch</Button>}
  currentPath="/work"
/>
```

## Notes
- Fixed-position; add `padding-top: var(--nav-height)` to page body
- Background is transparent at top; gains `rgba(9,9,11,0.88)` + blur on scroll
- `currentPath` drives active state — pass `window.location.pathname` or router value
- `onLinkClick` is for SPA routing — call `router.push(href)` and `e.preventDefault()`
- Max 4–5 links; move extras to a footer or dropdown
