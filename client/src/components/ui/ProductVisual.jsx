export default function ProductVisual({ product: p, height = 280 }) {
  return (
    <div style={{
      width: '100%', height, background: 'var(--soft)',
      borderRadius: 'var(--radius)', overflow: 'hidden',
      display: 'grid', placeItems: 'center', position: 'relative',
    }}>
      <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id={`g-${p.id}`} cx="50%" cy="40%">
            <stop offset="0%" stopColor={p.swatch} stopOpacity=".55" />
            <stop offset="100%" stopColor={p.swatch} stopOpacity=".05" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill={`url(#g-${p.id})`} />
        <path d="M100 30 C 70 70, 70 130, 100 170 C 130 130, 130 70, 100 30 Z"
          fill="none" stroke={p.swatch} strokeWidth="1" opacity=".4" />
        <path d="M100 30 V 170" stroke={p.swatch} strokeWidth=".7" opacity=".3" />
        <path d="M100 70 L 130 80 M100 90 L 130 100 M100 110 L 130 120 M100 130 L 130 140"
          stroke={p.swatch} strokeWidth=".7" opacity=".3" />
        <path d="M100 70 L 70 80 M100 90 L 70 100 M100 110 L 70 120 M100 130 L 70 140"
          stroke={p.swatch} strokeWidth=".7" opacity=".3" />
      </svg>
    </div>
  );
}
