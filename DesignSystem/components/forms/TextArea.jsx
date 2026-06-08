export function TextArea({
  label,
  hint,
  error,
  id,
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  rows = 4,
  resize = 'vertical',
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
    display: 'flex', alignItems: 'center', gap: 'var(--space-1)',
  };

  const textareaStyle = {
    width: '100%',
    padding: 'var(--space-3) var(--space-4)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-normal)',
    color: disabled ? 'var(--text-4)' : 'var(--text-1)',
    backgroundColor: focused ? 'var(--surface-2)' : 'var(--surface-1)',
    border: '1px solid',
    borderColor: error ? 'var(--color-error-border)' : focused ? 'var(--color-accent-border)' : 'var(--border)',
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    boxShadow: focused && !error ? 'var(--shadow-focus)' : 'none',
    resize,
    transition: 'border-color var(--transition-fast), background-color var(--transition-fast), box-shadow var(--transition-fast)',
    cursor: disabled ? 'not-allowed' : 'text',
    lineHeight: 'var(--leading-relaxed)',
    WebkitFontSmoothing: 'antialiased',
    boxSizing: 'border-box',
  };

  const hintStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xs)',
    color: error ? 'var(--color-error)' : 'var(--text-4)',
  };

  return React.createElement('div', { style: wrapperStyle },
    label && React.createElement('label', { htmlFor: inputId, style: labelStyle },
      label,
      required && React.createElement('span', { style: { color: 'var(--color-accent)' } }, '*')
    ),
    React.createElement('textarea', {
      id: inputId, rows, placeholder, value, onChange, disabled, required,
      style: textareaStyle,
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
      ...props,
    }),
    (hint || error) && React.createElement('span', { style: hintStyle }, error || hint)
  );
}
