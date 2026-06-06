import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES, inr } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';
import TabPills from '../components/ui/TabPills';
import Icon from '../components/ui/Icon';
import Btn from '../components/ui/Btn';

const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-low',  label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
];

export default function Listing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const { addToCart, toggleWishlist, wishlist } = useCart();

  const activeCat = searchParams.get('cat') || 'all';
  const searchQ   = searchParams.get('q')   || '';
  const catTabs   = [{ value: 'all', label: 'All' }, ...CATEGORIES.map(c => ({ value: c.id, label: c.label }))];

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (activeCat !== 'all') list = list.filter(p => p.cat === activeCat);
    if (searchQ) list = list.filter(p =>
      p.name.toLowerCase().includes(searchQ.toLowerCase()) ||
      p.sub.toLowerCase().includes(searchQ.toLowerCase())
    );
    if (sort === 'price-low')  return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating')     return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCat, sort, searchQ]);

  const activeCatLabel = CATEGORIES.find(c => c.id === activeCat)?.label || 'All Products';

  return (
    <div style={{ padding: '40px 32px 120px', maxWidth: 1280, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 500, letterSpacing: '-.02em', marginBottom: 8 }}>
        {searchQ ? `"${searchQ}"` : activeCatLabel}
      </h1>
      <p style={{ color: 'var(--mute)', marginBottom: 32 }}>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>

      {/* Filter & sort bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, gap: 16, flexWrap: 'wrap' }}>
        <div style={{ overflowX: 'auto' }}>
          <TabPills tabs={catTabs} value={activeCat} onChange={v => navigate(v === 'all' ? '/shop' : `/shop?cat=${v}`)} />
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '8px 14px', border: '1px solid var(--line)', borderRadius: 999, background: 'var(--surface)', fontSize: 13, fontFamily: 'var(--font-body)', color: 'var(--ink)', cursor: 'pointer' }}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button onClick={() => setViewMode('grid')} style={{ width: 36, height: 36, border: '1px solid ' + (viewMode === 'grid' ? 'var(--ink)' : 'var(--line)'), borderRadius: 'var(--radius)', background: 'transparent', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon name="grid" size={14} /></button>
          <button onClick={() => setViewMode('list')} style={{ width: 36, height: 36, border: '1px solid ' + (viewMode === 'list' ? 'var(--ink)' : 'var(--line)'), borderRadius: 'var(--radius)', background: 'transparent', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon name="list" size={14} /></button>
        </div>
      </div>

      {/* Grid / List */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--mute)' }}>
          <Icon name="search" size={32} style={{ margin: '0 auto 16px' }} />
          <p>No products found. <span style={{ color: 'var(--ink)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/shop')}>Clear filters</span></p>
        </div>
      ) : viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 28 }}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onOpen={id => navigate(`/product/${id}`)} onAdd={addToCart} onWish={toggleWishlist} wished={wishlist.includes(p.id)} />
          ))}
        </div>
      ) : (
        <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          {filtered.map(p => {
            const discount = Math.round((1 - p.price / p.mrp) * 100);
            return (
              <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 20, padding: '20px 24px', background: 'var(--surface)', borderBottom: '1px solid var(--line)', cursor: 'pointer', transition: 'background .15s' }}
                onClick={() => navigate(`/product/${p.id}`)}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--soft)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
              >
                <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--soft)', display: 'grid', placeItems: 'center', height: 80 }}>
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: 80 }}>
                    <circle cx="50" cy="50" r="45" fill={p.swatch} fillOpacity=".2" />
                    <path d="M50 10 C 35 35, 35 65, 50 90 C 65 65, 65 35, 50 10Z" fill="none" stroke={p.swatch} strokeWidth="1" opacity=".5" />
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
                  <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--mute)' }}>{p.sub}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--mute)', marginTop: 2 }}>{p.blurb}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>{inr(p.price)}</div>
                  {discount > 0 && <span style={{ fontSize: 11, color: 'var(--accent)' }}>−{discount}% off</span>}
                  <Btn variant="ghost" size="sm" onClick={e => { e.stopPropagation(); addToCart(p.id); }}>Add to cart</Btn>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
