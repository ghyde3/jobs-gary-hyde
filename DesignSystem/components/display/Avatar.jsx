export function Avatar({
  src,
  alt = '',
  name,
  size = 'md',
  shape = 'circle',
  ...props
}) {
  const [imgError, setImgError] = React.useState(false);

  const sizes = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80, '2xl': 112 };
  const fontSizes = { xs: '9px', sm: '11px', md: '14px', lg: '20px', xl: '28px', '2xl': '40px' };
  const px = sizes[size];

  const initials = name
    ? name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
    : '?';

  const baseStyle = {
    width: `${px}px`,
    height: `${px}px`,
    borderRadius: shape === 'circle' ? '50%' : shape === 'rounded' ? 'var(--radius-md)' : 'var(--radius-sm)',
    overflow: 'hidden',
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-accent-muted)',
    border: '1px solid var(--border)',
    fontFamily: 'var(--font-display)',
    fontSize: fontSizes[size],
    fontWeight: 'var(--weight-bold)',
    color: 'var(--color-accent)',
    letterSpacing: 'var(--tracking-tight)',
    userSelect: 'none',
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  const showImage = src && !imgError;

  return React.createElement('div', { style: baseStyle, title: name, ...props },
    showImage
      ? React.createElement('img', { src, alt: alt || name, style: imgStyle, onError: () => setImgError(true) })
      : React.createElement('span', { 'aria-label': name }, initials)
  );
}
