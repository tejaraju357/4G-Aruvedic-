import Icon from './Icon';

export default function Stars({ rating, size = 12, showNum }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: 'var(--accent)' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Icon key={i} name={i <= Math.round(rating) ? 'starF' : 'star'} size={size} />
      ))}
      {showNum && <span style={{ color: 'var(--mute)', fontSize: size + 1, marginLeft: 4 }}>{rating}</span>}
    </span>
  );
}
