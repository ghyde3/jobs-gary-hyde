export function Tag({
  children,
  size = 'md',
  active = false,
  onClick,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const interactive = Boolean(onClick);

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-1-5)',
    fontFamily: 'var(--font-mono)',
    fontWeight: 'var(--weight-normal)',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    border: '1px solid',
    whiteSpace: 'nowrap',
    WebkitFontSmoothing: 'antialiased',
    cursor: interactive ? 'pointer' : 'default',
    transition: 'background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast)',
    ...(size === 'sm'
      ? { padding: '2px 7px', fontSize: '10px' }
      : { padding: '3px 9px', fontSize: 'var(--text-xs)' }),
    ...(active
      ? {
          backgroundColor: 'var(--color-accent-muted)',
          color: 'var(--color-accent)',
          borderColor: 'var(--color-accent-border)',
        }
      : hovered && interactive
      ? {
          backgroundColor: 'var(--surface-3)',
          color: 'var(--text-1)',
          borderColor: 'var(--border-strong)',
        }
      : {
          backgroundColor: 'var(--surface-1)',
          color: 'var(--text-3)',
          borderColor: 'var(--border)',
        }),
  };

  return React.createElement('span', {
    style,
    onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    role: interactive ? 'button' : undefined,
    tabIndex: interactive ? 0 : undefined,
    ...props,
  }, children);
}
