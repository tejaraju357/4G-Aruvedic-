import Icon from './Icon';

export default function Btn({ children, variant = 'primary', size = 'md', icon, onClick, full, type = 'button', style: extraStyle }) {
  const sizes = {
    sm: { padding: '6px 12px', fontSize: 13, height: 32 },
    md: { padding: '10px 18px', fontSize: 14, height: 40 },
    lg: { padding: '14px 24px', fontSize: 15, height: 48 },
  };
  const variants = {
    primary: { background: 'var(--ink)', color: 'var(--bg)', border: '1px solid var(--ink)' },
    accent:  { background: 'var(--accent)', color: 'var(--accent-ink)', border: '1px solid var(--accent)' },
    ghost:   { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)' },
    bare:    { background: 'transparent', color: 'var(--ink)', border: 'none' },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        ...sizes[size], ...variants[variant],
        display: 'inline-flex', alignItems: 'center', gap: 8,
        borderRadius: 999, cursor: 'pointer', fontFamily: 'var(--font-body)',
        letterSpacing: '.02em', fontWeight: 500,
        width: full ? '100%' : undefined,
        justifyContent: full ? 'center' : undefined,
        transition: 'opacity .15s, transform .15s',
        ...extraStyle,
      }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(.98)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
    </button>
  );
}
