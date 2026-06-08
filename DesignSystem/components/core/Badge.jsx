export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  ...props
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-1-5)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-medium)',
    lineHeight: 1,
    borderRadius: 'var(--radius-full)',
    border: '1px solid transparent',
    whiteSpace: 'nowrap',
    WebkitFontSmoothing: 'antialiased',
  };

  const sizes = {
    sm: { padding: '2px 8px', fontSize: '10px', letterSpacing: '0.03em' },
    md: { padding: '3px 10px', fontSize: 'var(--text-xs)', letterSpacing: '0.02em' },
  };

  const variants = {
    neutral: {
      backgroundColor: 'var(--surface-3)',
      color: 'var(--text-2)',
      borderColor: 'var(--border)',
    },
    accent: {
      backgroundColor: 'var(--color-accent-muted)',
      color: 'var(--color-accent)',
      borderColor: 'var(--color-accent-border)',
    },
    success: {
      backgroundColor: 'var(--color-success-muted)',
      color: 'var(--color-success)',
      borderColor: 'var(--color-success-border)',
    },
    error: {
      backgroundColor: 'var(--color-error-muted)',
      color: 'var(--color-error)',
      borderColor: 'var(--color-error-border)',
    },
    warning: {
      backgroundColor: 'var(--color-warning-muted)',
      color: 'var(--color-warning)',
      borderColor: 'var(--color-accent-border)',
    },
    info: {
      backgroundColor: 'var(--color-info-muted)',
      color: 'var(--color-info)',
      borderColor: 'var(--color-info-border)',
    },
  };

  const dotColors = {
    neutral: 'var(--text-3)',
    accent: 'var(--color-accent)',
    success: 'var(--color-success)',
    error: 'var(--color-error)',
    warning: 'var(--color-warning)',
    info: 'var(--color-info)',
  };

  const style = { ...base, ...sizes[size], ...variants[variant] };

  return React.createElement('span', { style, ...props },
    dot && React.createElement('span', {
      style: {
        width: '6px', height: '6px', borderRadius: '50%',
        backgroundColor: dotColors[variant], flexShrink: 0,
      }
    }),
    children
  );
}
