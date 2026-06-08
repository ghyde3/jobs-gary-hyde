export function Divider({
  label,
  spacing = 'md',
  subtle = false,
  ...props
}) {
  const spacings = { sm: 'var(--space-6)', md: 'var(--space-10)', lg: 'var(--space-16)' };

  const wrapStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
    margin: `${spacings[spacing]} 0`,
    width: '100%',
  };

  const lineStyle = {
    flex: 1,
    height: '1px',
    backgroundColor: subtle ? 'rgba(255,255,255,0.04)' : 'var(--border)',
  };

  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-xs)',
    color: 'var(--text-4)',
    letterSpacing: 'var(--tracking-wider)',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  };

  if (!label) {
    return React.createElement('hr', {
      style: {
        border: 'none',
        borderTop: `1px solid ${subtle ? 'rgba(255,255,255,0.04)' : 'var(--border)'}`,
        margin: `${spacings[spacing]} 0`,
        width: '100%',
      },
      ...props,
    });
  }

  return React.createElement('div', { style: wrapStyle, ...props },
    React.createElement('div', { style: lineStyle }),
    React.createElement('span', { style: labelStyle }, label),
    React.createElement('div', { style: lineStyle })
  );
}
