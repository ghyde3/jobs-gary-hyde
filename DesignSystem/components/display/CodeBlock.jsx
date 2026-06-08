export function CodeBlock({
  children,
  language = '',
  filename,
  showLineNumbers = false,
  ...props
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text = typeof children === 'string' ? children : '';
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const wrapStyle = {
    position: 'relative',
    backgroundColor: 'var(--surface-1)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--leading-relaxed)',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-2) var(--space-4)',
    borderBottom: '1px solid var(--border)',
    backgroundColor: 'var(--surface-2)',
  };

  const langStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-xs)',
    color: 'var(--text-4)',
    letterSpacing: 'var(--tracking-wide)',
  };

  const preStyle = {
    margin: 0,
    padding: 'var(--space-5) var(--space-6)',
    overflowX: 'auto',
    color: 'var(--text-2)',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit',
  };

  const copyBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    padding: '2px var(--space-2)',
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    color: copied ? 'var(--color-success)' : 'var(--text-4)',
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: copied ? 'var(--color-success-border)' : 'var(--border)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'color var(--transition-fast), border-color var(--transition-fast)',
  };

  const showHeader = filename || language;

  return React.createElement('div', { style: wrapStyle, ...props },
    showHeader && React.createElement('div', { style: headerStyle },
      React.createElement('span', { style: langStyle }, filename || language),
      React.createElement('button', { style: copyBtnStyle, onClick: handleCopy },
        copied ? '✓ copied' : 'copy'
      )
    ),
    !showHeader && React.createElement('button', {
      style: { ...copyBtnStyle, position: 'absolute', top: 'var(--space-3)', right: 'var(--space-3)' },
      onClick: handleCopy,
    }, copied ? '✓ copied' : 'copy'),
    React.createElement('pre', { style: preStyle },
      React.createElement('code', null, children)
    )
  );
}
