import Icon from './Icon';
import Stars from './Stars';
import ProductVisual from './ProductVisual';
import { inr } from '../../data/products';

export default function ProductCard({ product: p, onOpen, onAdd, onWish, wished, style: cardStyle = 'minimal' }) {
  const discount = Math.round((1 - p.price / p.mrp) * 100);
  const visualH  = cardStyle === 'gallery' ? 320 : 240;

  const wrap = {
    background: cardStyle === 'minimal' ? 'transparent' : 'var(--surface)',
    border: cardStyle === 'bordered' ? '1px solid var(--line)' : 'none',
    borderRadius: 'var(--radius)',
    padding: cardStyle === 'minimal' ? 0 : '16px',
    cursor: 'pointer',
    transition: 'transform .25s ease',
    position: 'relative',
  };

  return (
    <div
      style={wrap}
      onClick={() => onOpen(p.id)}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ position: 'relative' }}>
        <ProductVisual product={p} height={visualH} />
        {discount > 0 && (
          <span style={{
            position: 'absolute', top: 12, left: 12, padding: '4px 10px',
            background: 'var(--ink)', color: 'var(--bg)',
            fontSize: 11, letterSpacing: '.08em', borderRadius: 999, fontWeight: 500,
          }}>−{discount}%</span>
        )}
        <button
          onClick={e => { e.stopPropagation(); onWish(p.id); }}
          style={{
            position: 'absolute', top: 12, right: 12, width: 34, height: 34,
            borderRadius: 999, border: 'none', cursor: 'pointer',
            background: 'var(--surface)', display: 'grid', placeItems: 'center',
            color: wished ? 'var(--accent)' : 'var(--ink)',
          }}
        >
          <Icon name={wished ? 'heartF' : 'heart'} size={16} />
        </button>
      </div>

      <div style={{ paddingTop: 14 }}>
        <div style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>
          {p.sub}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginTop: 4, lineHeight: 1.1 }}>
          {p.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 500 }}>{inr(p.price)}</span>
            {p.mrp > p.price && <span style={{ fontSize: 12, color: 'var(--mute)', textDecoration: 'line-through' }}>{inr(p.mrp)}</span>}
          </div>
          <Stars rating={p.rating} size={11} />
        </div>
        <button
          onClick={e => { e.stopPropagation(); onAdd(p.id); }}
          style={{
            marginTop: 12, width: '100%', padding: '10px 0',
            background: 'transparent', border: '1px solid var(--ink)',
            color: 'var(--ink)', borderRadius: 999, cursor: 'pointer',
            fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase',
            fontFamily: 'var(--font-body)', transition: 'background .15s, color .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--bg)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}
        >
          {p.stock > 0 ? 'Add to cart' : 'Notify me'}
        </button>
      </div>
    </div>
  );
}
