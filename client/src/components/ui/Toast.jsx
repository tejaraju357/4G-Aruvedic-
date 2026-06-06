import Icon from './Icon';

export default function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: 'var(--ink)', color: 'var(--bg)', padding: '12px 22px',
      borderRadius: 999, fontSize: 13, letterSpacing: '.02em', zIndex: 1000,
      boxShadow: '0 10px 30px rgba(0,0,0,.15)',
      display: 'flex', alignItems: 'center', gap: 10,
      animation: 'fadeInUp .2s ease',
      whiteSpace: 'nowrap',
    }}>
      <Icon name="check" size={14} />
      {msg}
    </div>
  );
}
