export function Card({
  children,
  padding = 'md',
  hoverable = false,
  href,
  onClick,
  header,
  footer,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const interactive = hoverable || Boolean(href) || Boolean(onClick);

  const paddings = {
    none: '0',
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)',
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--surface-1)',
    border: '1px solid',
    borderColor: hovered && interactive ? 'var(--border-strong)' : 'var(--border)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    cursor: interactive ? (href ? 'pointer' : onClick ? 'pointer' : 'default') : 'default',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'border-color var(--transition-fast), transform var(--transition-base), box-shadow var(--transition-fast)',
    transform: hovered && interactive ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hovered && interactive ? 'var(--shadow-md)' : 'none',
  };

  const headerStyle = {
    padding: paddings[padding],
    borderBottom: '1px solid var(--border)',
    flexShrink: 0,
  };

  const bodyStyle = {
    padding: paddings[padding],
    flex: 1,
  };

  const footerStyle = {
    padding: `var(--space-4) ${paddings[padding]}`,
    borderTop: '1px solid var(--border)',
    flexShrink: 0,
  };

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick,
  };

  const Tag = href ? 'a' : 'div';

  return React.createElement(Tag, { style, href, ...handlers, ...props },
    header && React.createElement('div', { style: headerStyle }, header),
    React.createElement('div', { style: bodyStyle }, children),
    footer && React.createElement('div', { style: footerStyle }, footer)
  );
}
