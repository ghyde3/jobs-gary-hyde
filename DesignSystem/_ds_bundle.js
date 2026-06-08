/* @ds-bundle: {"format":3,"namespace":"GaryHydeDesignSystem_f38a16","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"NavBar","sourcePath":"components/core/NavBar.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"CodeBlock","sourcePath":"components/display/CodeBlock.jsx"},{"name":"Divider","sourcePath":"components/display/Divider.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"TextArea","sourcePath":"components/forms/TextArea.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"a1be9544a07c","components/core/Button.jsx":"52c0ba149b42","components/core/Card.jsx":"3ec269478579","components/core/NavBar.jsx":"2e5df8910633","components/core/Tag.jsx":"6228b6c53344","components/display/Avatar.jsx":"38c570fe6723","components/display/CodeBlock.jsx":"ab231da3d22e","components/display/Divider.jsx":"e3b92c2bbb4a","components/forms/Input.jsx":"8506e1fbcf9b","components/forms/TextArea.jsx":"2325e6e23237"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GaryHydeDesignSystem_f38a16 = window.GaryHydeDesignSystem_f38a16 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
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
    WebkitFontSmoothing: 'antialiased'
  };
  const sizes = {
    sm: {
      padding: '2px 8px',
      fontSize: '10px',
      letterSpacing: '0.03em'
    },
    md: {
      padding: '3px 10px',
      fontSize: 'var(--text-xs)',
      letterSpacing: '0.02em'
    }
  };
  const variants = {
    neutral: {
      backgroundColor: 'var(--surface-3)',
      color: 'var(--text-2)',
      borderColor: 'var(--border)'
    },
    accent: {
      backgroundColor: 'var(--color-accent-muted)',
      color: 'var(--color-accent)',
      borderColor: 'var(--color-accent-border)'
    },
    success: {
      backgroundColor: 'var(--color-success-muted)',
      color: 'var(--color-success)',
      borderColor: 'var(--color-success-border)'
    },
    error: {
      backgroundColor: 'var(--color-error-muted)',
      color: 'var(--color-error)',
      borderColor: 'var(--color-error-border)'
    },
    warning: {
      backgroundColor: 'var(--color-warning-muted)',
      color: 'var(--color-warning)',
      borderColor: 'var(--color-accent-border)'
    },
    info: {
      backgroundColor: 'var(--color-info-muted)',
      color: 'var(--color-info)',
      borderColor: 'var(--color-info-border)'
    }
  };
  const dotColors = {
    neutral: 'var(--text-3)',
    accent: 'var(--color-accent)',
    success: 'var(--color-success)',
    error: 'var(--color-error)',
    warning: 'var(--color-warning)',
    info: 'var(--color-info)'
  };
  const style = {
    ...base,
    ...sizes[size],
    ...variants[variant]
  };
  return React.createElement('span', {
    style,
    ...props
  }, dot && React.createElement('span', {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: dotColors[variant],
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
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
    transform: pressed && !disabled ? 'scale(0.98)' : 'scale(1)'
  };
  const sizes = {
    sm: {
      padding: '0 var(--space-3)',
      fontSize: 'var(--text-xs)',
      borderRadius: 'var(--radius-sm)',
      height: '30px',
      letterSpacing: 'var(--tracking-wide)'
    },
    md: {
      padding: '0 var(--space-5)',
      fontSize: 'var(--text-sm)',
      borderRadius: 'var(--radius-md)',
      height: '38px'
    },
    lg: {
      padding: '0 var(--space-6)',
      fontSize: 'var(--text-base)',
      borderRadius: 'var(--radius-md)',
      height: '46px'
    }
  };
  const variants = {
    primary: {
      backgroundColor: hovered && !disabled ? 'var(--color-accent-light)' : 'var(--color-accent)',
      color: 'var(--color-accent-fg)',
      borderColor: 'transparent',
      boxShadow: hovered && !disabled ? 'var(--shadow-accent)' : 'none'
    },
    secondary: {
      backgroundColor: hovered && !disabled ? 'var(--surface-3)' : 'var(--surface-2)',
      color: hovered && !disabled ? 'var(--text-1)' : 'var(--text-2)',
      borderColor: hovered && !disabled ? 'var(--border-strong)' : 'var(--border)'
    },
    ghost: {
      backgroundColor: hovered && !disabled ? 'var(--surface-hover)' : 'transparent',
      color: hovered && !disabled ? 'var(--text-1)' : 'var(--text-2)',
      borderColor: 'transparent'
    },
    danger: {
      backgroundColor: hovered && !disabled ? 'rgba(239,68,68,0.18)' : 'var(--color-error-muted)',
      color: 'var(--color-error)',
      borderColor: hovered && !disabled ? 'var(--color-error-border)' : 'rgba(239,68,68,0.15)'
    }
  };
  const style = {
    ...base,
    ...sizes[size],
    ...variants[variant]
  };
  const Tag = href ? 'a' : 'button';
  return React.createElement(Tag, {
    style,
    href,
    type: href ? undefined : type,
    disabled: href ? undefined : disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    ...props
  }, leftIcon && React.createElement('span', {
    style: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    }
  }, leftIcon), children, rightIcon && React.createElement('span', {
    style: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    }
  }, rightIcon));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
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
    lg: 'var(--space-8)'
  };
  const style = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--surface-1)',
    border: '1px solid',
    borderColor: hovered && interactive ? 'var(--border-strong)' : 'var(--border)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    cursor: interactive ? href ? 'pointer' : onClick ? 'pointer' : 'default' : 'default',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'border-color var(--transition-fast), transform var(--transition-base), box-shadow var(--transition-fast)',
    transform: hovered && interactive ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hovered && interactive ? 'var(--shadow-md)' : 'none'
  };
  const headerStyle = {
    padding: paddings[padding],
    borderBottom: '1px solid var(--border)',
    flexShrink: 0
  };
  const bodyStyle = {
    padding: paddings[padding],
    flex: 1
  };
  const footerStyle = {
    padding: `var(--space-4) ${paddings[padding]}`,
    borderTop: '1px solid var(--border)',
    flexShrink: 0
  };
  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick
  };
  const Tag = href ? 'a' : 'div';
  return React.createElement(Tag, {
    style,
    href,
    ...handlers,
    ...props
  }, header && React.createElement('div', {
    style: headerStyle
  }, header), React.createElement('div', {
    style: bodyStyle
  }, children), footer && React.createElement('div', {
    style: footerStyle
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/NavBar.jsx
try { (() => {
function NavBar({
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
    window.addEventListener('scroll', handler, {
      passive: true
    });
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
    transition: 'background-color var(--transition-base), border-color var(--transition-base), backdrop-filter var(--transition-base)'
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
    flexShrink: 0
  };
  const linksStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    marginLeft: 'auto',
    marginRight: cta ? 'var(--space-4)' : '0'
  };
  const isActive = href => currentPath === href || href !== '/' && currentPath.startsWith(href);
  const linkStyle = href => ({
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
    transition: 'color var(--transition-fast), background-color var(--transition-fast)'
  });
  return React.createElement('nav', {
    style: navStyle,
    ...props
  }, React.createElement('a', {
    href: '/',
    style: logoStyle
  }, logo || React.createElement('span', null, 'GH')), React.createElement('div', {
    style: linksStyle
  }, links.map(({
    label,
    href
  }, i) => React.createElement('a', {
    key: i,
    href,
    style: linkStyle(href),
    onClick: onLinkClick ? e => onLinkClick(e, href) : undefined,
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--text-1)';
      e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = isActive(href) ? 'var(--text-1)' : 'var(--text-3)';
      e.currentTarget.style.backgroundColor = 'transparent';
    }
  }, label))), cta && React.createElement('div', null, cta));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
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
    ...(size === 'sm' ? {
      padding: '2px 7px',
      fontSize: '10px'
    } : {
      padding: '3px 9px',
      fontSize: 'var(--text-xs)'
    }),
    ...(active ? {
      backgroundColor: 'var(--color-accent-muted)',
      color: 'var(--color-accent)',
      borderColor: 'var(--color-accent-border)'
    } : hovered && interactive ? {
      backgroundColor: 'var(--surface-3)',
      color: 'var(--text-1)',
      borderColor: 'var(--border-strong)'
    } : {
      backgroundColor: 'var(--surface-1)',
      color: 'var(--text-3)',
      borderColor: 'var(--border)'
    })
  };
  return React.createElement('span', {
    style,
    onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    role: interactive ? 'button' : undefined,
    tabIndex: interactive ? 0 : undefined,
    ...props
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
function Avatar({
  src,
  alt = '',
  name,
  size = 'md',
  shape = 'circle',
  ...props
}) {
  const [imgError, setImgError] = React.useState(false);
  const sizes = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
    '2xl': 112
  };
  const fontSizes = {
    xs: '9px',
    sm: '11px',
    md: '14px',
    lg: '20px',
    xl: '28px',
    '2xl': '40px'
  };
  const px = sizes[size];
  const initials = name ? name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() : '?';
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
    userSelect: 'none'
  };
  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  };
  const showImage = src && !imgError;
  return React.createElement('div', {
    style: baseStyle,
    title: name,
    ...props
  }, showImage ? React.createElement('img', {
    src,
    alt: alt || name,
    style: imgStyle,
    onError: () => setImgError(true)
  }) : React.createElement('span', {
    'aria-label': name
  }, initials));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/CodeBlock.jsx
try { (() => {
function CodeBlock({
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
    lineHeight: 'var(--leading-relaxed)'
  };
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-2) var(--space-4)',
    borderBottom: '1px solid var(--border)',
    backgroundColor: 'var(--surface-2)'
  };
  const langStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-xs)',
    color: 'var(--text-4)',
    letterSpacing: 'var(--tracking-wide)'
  };
  const preStyle = {
    margin: 0,
    padding: 'var(--space-5) var(--space-6)',
    overflowX: 'auto',
    color: 'var(--text-2)',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit'
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
    transition: 'color var(--transition-fast), border-color var(--transition-fast)'
  };
  const showHeader = filename || language;
  return React.createElement('div', {
    style: wrapStyle,
    ...props
  }, showHeader && React.createElement('div', {
    style: headerStyle
  }, React.createElement('span', {
    style: langStyle
  }, filename || language), React.createElement('button', {
    style: copyBtnStyle,
    onClick: handleCopy
  }, copied ? '✓ copied' : 'copy')), !showHeader && React.createElement('button', {
    style: {
      ...copyBtnStyle,
      position: 'absolute',
      top: 'var(--space-3)',
      right: 'var(--space-3)'
    },
    onClick: handleCopy
  }, copied ? '✓ copied' : 'copy'), React.createElement('pre', {
    style: preStyle
  }, React.createElement('code', null, children)));
}
Object.assign(__ds_scope, { CodeBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/CodeBlock.jsx", error: String((e && e.message) || e) }); }

// components/display/Divider.jsx
try { (() => {
function Divider({
  label,
  spacing = 'md',
  subtle = false,
  ...props
}) {
  const spacings = {
    sm: 'var(--space-6)',
    md: 'var(--space-10)',
    lg: 'var(--space-16)'
  };
  const wrapStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
    margin: `${spacings[spacing]} 0`,
    width: '100%'
  };
  const lineStyle = {
    flex: 1,
    height: '1px',
    backgroundColor: subtle ? 'rgba(255,255,255,0.04)' : 'var(--border)'
  };
  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-xs)',
    color: 'var(--text-4)',
    letterSpacing: 'var(--tracking-wider)',
    flexShrink: 0,
    whiteSpace: 'nowrap'
  };
  if (!label) {
    return React.createElement('hr', {
      style: {
        border: 'none',
        borderTop: `1px solid ${subtle ? 'rgba(255,255,255,0.04)' : 'var(--border)'}`,
        margin: `${spacings[spacing]} 0`,
        width: '100%'
      },
      ...props
    });
  }
  return React.createElement('div', {
    style: wrapStyle,
    ...props
  }, React.createElement('div', {
    style: lineStyle
  }), React.createElement('span', {
    style: labelStyle
  }, label), React.createElement('div', {
    style: lineStyle
  }));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Divider.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
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
  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1-5)',
    width: '100%'
  };
  const labelStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-medium)',
    color: error ? 'var(--color-error)' : 'var(--text-2)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)'
  };
  const inputWrapStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };
  const heights = {
    sm: '32px',
    md: '40px',
    lg: '48px'
  };
  const fontSizes = {
    sm: 'var(--text-xs)',
    md: 'var(--text-sm)',
    lg: 'var(--text-base)'
  };
  const paddings = {
    sm: 'var(--space-3)',
    md: 'var(--space-4)',
    lg: 'var(--space-5)'
  };
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
    WebkitFontSmoothing: 'antialiased'
  };
  const iconStyle = {
    position: 'absolute',
    left: 'var(--space-3)',
    color: 'var(--text-4)',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center'
  };
  const hintStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xs)',
    color: error ? 'var(--color-error)' : 'var(--text-4)'
  };
  return React.createElement('div', {
    style: wrapperStyle
  }, label && React.createElement('label', {
    htmlFor: inputId,
    style: labelStyle
  }, label, required && React.createElement('span', {
    style: {
      color: 'var(--color-accent)',
      lineHeight: 1
    }
  }, '*')), React.createElement('div', {
    style: inputWrapStyle
  }, leftIcon && React.createElement('span', {
    style: iconStyle
  }, leftIcon), React.createElement('input', {
    id: inputId,
    type,
    placeholder,
    value,
    onChange,
    disabled,
    required,
    style: inputStyle,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    ...props
  })), (hint || error) && React.createElement('span', {
    style: hintStyle
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextArea.jsx
try { (() => {
function TextArea({
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
  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1-5)',
    width: '100%'
  };
  const labelStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-medium)',
    color: error ? 'var(--color-error)' : 'var(--text-2)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)'
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
    boxSizing: 'border-box'
  };
  const hintStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xs)',
    color: error ? 'var(--color-error)' : 'var(--text-4)'
  };
  return React.createElement('div', {
    style: wrapperStyle
  }, label && React.createElement('label', {
    htmlFor: inputId,
    style: labelStyle
  }, label, required && React.createElement('span', {
    style: {
      color: 'var(--color-accent)'
    }
  }, '*')), React.createElement('textarea', {
    id: inputId,
    rows,
    placeholder,
    value,
    onChange,
    disabled,
    required,
    style: textareaStyle,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    ...props
  }), (hint || error) && React.createElement('span', {
    style: hintStyle
  }, error || hint));
}
Object.assign(__ds_scope, { TextArea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextArea.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.CodeBlock = __ds_scope.CodeBlock;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.TextArea = __ds_scope.TextArea;

})();
