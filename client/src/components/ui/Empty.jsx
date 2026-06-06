import Icon from './Icon';

export default function Empty({ icon = 'bag', title, sub, action }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
      <div style={{
        width: 64, height: 64, borderRadius: 999, background: 'var(--soft)',
        display: 'grid', placeItems: 'center', margin: '0 auto',
      }}>
        <Icon name={icon} size={26} />
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, marginTop: 20 }}>{title}</h3>
      {sub && <p style={{ color: 'var(--mute)', marginTop: 8, maxWidth: 360, margin: '8px auto 0' }}>{sub}</p>}
      {action && <div style={{ marginTop: 20 }}>{action}</div>}
    </div>
  );
}
