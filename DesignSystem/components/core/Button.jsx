export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  href,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-medium)',
    lineHeight: 1,
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast)',
    width: fullWidth ? '100%' : undefined,
    outline: 'none',
    WebkitFontSmoothing: 'antialiased',
    transform: pressed && !disabled ? 'scale(0.98)' : 'scale(1)',
  };

  const sizes = {
    sm: { padding: '0 var(--space-3)', fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-sm)', height: '30px', letterSpacing: 'var(--tracking-wide)' },
    md: { padding: '0 var(--space-5)', fontSize: 'var(--text-sm)', borderRadius: 'var(--radius-md)', height: '38px' },
    lg: { padding: '0 var(--space-6)', fontSize: 'var(--text-base)', borderRadius: 'var(--radius-md)', height: '46px' },
  };

  const variants = {
    primary: {
      backgroundColor: hovered && !disabled ? 'var(--color-accent-light)' : 'var(--color-accent)',
      color: 'var(--color-accent-fg)',
      borderColor: 'transparent',
      boxShadow: hovered && !disabled ? 'var(--shadow-accent)' : 'none',
    },
    secondary: {
      backgroundColor: hovered && !disabled ? 'var(--surface-3)' : 'var(--surface-2)',
      color: hovered && !disabled ? 'var(--text-1)' : 'var(--text-2)',
      borderColor: hovered && !disabled ? 'var(--border-strong)' : 'var(--border)',
    },
    ghost: {
      backgroundColor: hovered && !disabled ? 'var(--surface-hover)' : 'transparent',
      color: hovered && !disabled ? 'var(--text-1)' : 'var(--text-2)',
      borderColor: 'transparent',
    },
    danger: {
      backgroundColor: hovered && !disabled ? 'rgba(239,68,68,0.18)' : 'var(--color-error-muted)',
      color: 'var(--color-error)',
      borderColor: hovered && !disabled ? 'var(--color-error-border)' : 'rgba(239,68,68,0.15)',
    },
  };

  const style = { ...base, ...sizes[size], ...variants[variant] };
  const Tag = href ? 'a' : 'button';

  return React.createElement(Tag, {
    style,
    href,
    type: href ? undefined : type,
    disabled: href ? undefined : disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setHovered(false); setPressed(false); },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    ...props,
  },
    leftIcon && React.createElement('span', { style: { display: 'flex', alignItems: 'center', flexShrink: 0 } }, leftIcon),
    children,
    rightIcon && React.createElement('span', { style: { display: 'flex', alignItems: 'center', flexShrink: 0 } }, rightIcon)
  );
}
