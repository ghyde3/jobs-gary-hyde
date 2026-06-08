export function Input({
  label,
  hint,
  error,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  leftIcon,
  size = 'md',
  ...props
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const wrapperStyle = { display: 'flex', flexDirection: 'column', gap: 'var(--space-1-5)', width: '100%' };

  const labelStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-medium)',
    color: error ? 'var(--color-error)' : 'var(--text-2)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
  };

  const inputWrapStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const heights = { sm: '32px', md: '40px', lg: '48px' };
  const fontSizes = { sm: 'var(--text-xs)', md: 'var(--text-sm)', lg: 'var(--text-base)' };
  const paddings = { sm: 'var(--space-3)', md: 'var(--space-4)', lg: 'var(--space-5)' };

  const inputStyle = {
    width: '100%',
    height: heights[size],
    paddingLeft: leftIcon ? 'var(--space-10)' : paddings[size],
    paddingRight: paddings[size],
    fontFamily: 'var(--font-body)',
    fontSize: fontSizes[size],
    fontWeight: 'var(--weight-normal)',
    color: disabled ? 'var(--text-4)' : 'var(--text-1)',
    backgroundColor: disabled ? 'var(--surface-1)' : focused ? 'var(--surface-2)' : 'var(--surface-1)',
    border: '1px solid',
    borderColor: error ? 'var(--color-error-border)' : focused ? 'var(--color-accent-border)' : 'var(--border)',
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    boxShadow: focused && !error ? 'var(--shadow-focus)' : 'none',
    transition: 'border-color var(--transition-fast), background-color var(--transition-fast), box-shadow var(--transition-fast)',
    cursor: disabled ? 'not-allowed' : 'text',
    WebkitFontSmoothing: 'antialiased',
  };

  const iconStyle = {
    position: 'absolute', left: 'var(--space-3)',
    color: 'var(--text-4)', pointerEvents: 'none',
    display: 'flex', alignItems: 'center',
  };

  const hintStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xs)',
    color: error ? 'var(--color-error)' : 'var(--text-4)',
  };

  return React.createElement('div', { style: wrapperStyle },
    label && React.createElement('label', { htmlFor: inputId, style: labelStyle },
      label,
      required && React.createElement('span', { style: { color: 'var(--color-accent)', lineHeight: 1 } }, '*')
    ),
    React.createElement('div', { style: inputWrapStyle },
      leftIcon && React.createElement('span', { style: iconStyle }, leftIcon),
      React.createElement('input', {
        id: inputId, type, placeholder, value, onChange, disabled, required,
        style: inputStyle,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        ...props,
      })
    ),
    (hint || error) && React.createElement('span', { style: hintStyle }, error || hint)
  );
}
