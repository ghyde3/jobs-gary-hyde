export function NavBar({
  logo,
  links = [],
  cta,
  currentPath = '',
  onLinkClick,
  ...props
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 'var(--nav-height)',
    zIndex: 'var(--z-sticky)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 var(--space-6)',
    backgroundColor: scrolled ? 'rgba(9,9,11,0.88)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px) saturate(150%)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(150%)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    transition: 'background-color var(--transition-base), border-color var(--transition-base), backdrop-filter var(--transition-base)',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    textDecoration: 'none',
    color: 'var(--text-1)',
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--weight-bold)',
    fontSize: 'var(--text-base)',
    letterSpacing: 'var(--tracking-snug)',
    flexShrink: 0,
  };

  const linksStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    marginLeft: 'auto',
    marginRight: cta ? 'var(--space-4)' : '0',
  };

  const isActive = (href) => currentPath === href || (href !== '/' && currentPath.startsWith(href));

  const linkStyle = (href) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0 var(--space-3)',
    height: '34px',
    fontSize: 'var(--text-sm)',
    fontFamily: 'var(--font-body)',
    fontWeight: isActive(href) ? 'var(--weight-medium)' : 'var(--weight-normal)',
    color: isActive(href) ? 'var(--text-1)' : 'var(--text-3)',
    textDecoration: 'none',
    borderRadius: 'var(--radius-sm)',
    transition: 'color var(--transition-fast), background-color var(--transition-fast)',
  });

  return React.createElement('nav', { style: navStyle, ...props },
    React.createElement('a', { href: '/', style: logoStyle }, logo || React.createElement('span', null, 'GH')),
    React.createElement('div', { style: linksStyle },
      links.map(({ label, href }, i) =>
        React.createElement('a', {
          key: i,
          href,
          style: linkStyle(href),
          onClick: onLinkClick ? (e) => onLinkClick(e, href) : undefined,
          onMouseEnter: (e) => {
            e.currentTarget.style.color = 'var(--text-1)';
            e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.color = isActive(href) ? 'var(--text-1)' : 'var(--text-3)';
            e.currentTarget.style.backgroundColor = 'transparent';
          },
        }, label)
      )
    ),
    cta && React.createElement('div', null, cta)
  );
}
