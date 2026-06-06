import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { PRODUCTS, inr } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductVisual from '../components/ui/ProductVisual';
import ProductCard from '../components/ui/ProductCard';
import Btn from '../components/ui/Btn';
import Icon from '../components/ui/Icon';
import Stars from '../components/ui/Stars';
import TabPills from '../components/ui/TabPills';

const PACK_OPTIONS = [
  { label: '1 pack', multiplier: 1 },
  { label: '2 packs', multiplier: 2, badge: 'Save 5%' },
  { label: '3 packs', multiplier: 3, badge: 'Save 10%' },
];

const PRODUCT_REVIEWS = [
  { author: 'Priya M.', rating: 5, body: 'Absolutely transformed my routine. Will repurchase.', date: 'May 2026' },
  { author: 'Rohan S.', rating: 4, body: 'Good quality, shipping was fast. Slight earthy taste.', date: 'Apr 2026' },
  { author: 'Karthik I.', rating: 5, body: 'Authentic, no artificial smell. Highly recommend.', date: 'Apr 2026' },
];

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, showToast } = useCart();
  const [qty, setQty] = useState(1);
  const [pack, setPack] = useState(0);
  const [tab, setTab] = useState('how');

  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return (
    <div style={{ padding: '80px 32px', textAlign: 'center' }}>
      <p>Product not found. <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/shop')}>Browse shop</span></p>
    </div>
  );

  const p = product;
  const discount = Math.round((1 - p.price / p.mrp) * 100);
  const packMult = PACK_OPTIONS[pack].multiplier;
  const packDisc = pack === 1 ? 0.05 : pack === 2 ? 0.10 : 0;
  const effectivePrice = Math.round(p.price * packMult * (1 - packDisc));
  const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);

  const cartQtyBtn = {
    width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer',
    display: 'grid', placeItems: 'center', color: 'var(--ink)',
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '0 32px 24px', maxWidth: 1280, margin: '0 auto', fontSize: 12, color: 'var(--mute)' }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
        {' / '}
        <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/shop?cat=${p.cat}`)}>
          {p.cat.charAt(0).toUpperCase() + p.cat.slice(1)}
        </span>
        {' / '}
        <span style={{ color: 'var(--ink)' }}>{p.name}</span>
      </div>

      {/* Main product section */}
      <div style={{ padding: '0 32px', maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
        {/* Left: visuals */}
        <div style={{ position: 'sticky', top: 100 }}>
          <ProductVisual product={p} height={520} />
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: i === 0 ? '2px solid var(--ink)' : '1px solid var(--line)', cursor: 'pointer' }}>
                <ProductVisual product={p} height={80} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: info */}
        <div>
          <div style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>{p.sub}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 500, lineHeight: 1.0, letterSpacing: '-.02em', marginTop: 8 }}>{p.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
            <Stars rating={p.rating} size={14} showNum />
            <span style={{ fontSize: 12, color: 'var(--mute)' }}>{p.reviews.toLocaleString('en-IN')} reviews</span>
          </div>

          <p style={{ marginTop: 18, fontSize: 15, lineHeight: 1.7, color: 'var(--mute)' }}>{p.blurb}</p>

          {p.benefits && (
            <ul style={{ marginTop: 14, paddingLeft: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
              {p.benefits.map(b => (
                <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                  <Icon name="check" size={14} color="var(--leaf)" />
                  {b}
                </li>
              ))}
            </ul>
          )}

          {/* Price */}
          <div style={{ marginTop: 28, display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 40 }}>{inr(effectivePrice)}</span>
            {p.mrp > p.price && (
              <>
                <span style={{ fontSize: 16, color: 'var(--mute)', textDecoration: 'line-through' }}>{inr(p.mrp * packMult)}</span>
                {discount > 0 && <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500 }}>{discount + Math.round(packDisc * 100)}% off</span>}
              </>
            )}
          </div>

          {/* Pack selector */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 10 }}>Pack size</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {PACK_OPTIONS.map((opt, i) => (
                <button key={i} onClick={() => setPack(i)} style={{
                  padding: '10px 16px', borderRadius: 'var(--radius)',
                  border: '1px solid ' + (pack === i ? 'var(--ink)' : 'var(--line)'),
                  background: pack === i ? 'var(--soft)' : 'var(--surface)',
                  cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-body)',
                  position: 'relative',
                }}>
                  {opt.label}
                  {opt.badge && (
                    <span style={{ position: 'absolute', top: -8, right: -4, fontSize: 9, padding: '2px 6px', background: 'var(--leaf)', color: 'white', borderRadius: 999 }}>
                      {opt.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add to cart */}
          <div style={{ marginTop: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 999 }}>
              <button style={cartQtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}><Icon name="minus" size={14} /></button>
              <span style={{ padding: '0 14px', fontSize: 15, minWidth: 32, textAlign: 'center' }}>{qty}</span>
              <button style={cartQtyBtn} onClick={() => setQty(q => q + 1)}><Icon name="plus" size={14} /></button>
            </div>
            <Btn variant="primary" size="lg" style={{ flex: 1 }} onClick={() => { addToCart(p.id, qty); }}>
              {p.stock > 0 ? 'Add to cart' : 'Notify me when available'}
            </Btn>
            <button
              onClick={() => toggleWishlist(p.id)}
              style={{ width: 48, height: 48, borderRadius: 999, border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', display: 'grid', placeItems: 'center', color: wishlist.includes(p.id) ? 'var(--accent)' : 'var(--ink)' }}
            >
              <Icon name={wishlist.includes(p.id) ? 'heartF' : 'heart'} size={18} />
            </button>
          </div>

          {p.stock === 0 && (
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--accent)' }}>Currently out of stock</div>
          )}

          {/* Trust badges */}
          <div style={{ marginTop: 24, padding: '14px 16px', background: 'var(--soft)', borderRadius: 'var(--radius)', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { icon: 'truck', text: 'Free shipping above ₹999' },
              { icon: 'leaf',  text: 'Organic certified' },
              { icon: 'check', text: 'Lab verified' },
            ].map(b => (
              <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--mute)' }}>
                <Icon name={b.icon} size={13} />
                {b.text}
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ marginTop: 36 }}>
            <TabPills
              tabs={[{ value: 'how', label: 'How to use' }, { value: 'ingredients', label: 'Ingredients' }, { value: 'reviews', label: `Reviews (${p.reviews})` }]}
              value={tab}
              onChange={setTab}
            />
            <div style={{ marginTop: 20, fontSize: 14, lineHeight: 1.7, color: 'var(--mute)' }}>
              {tab === 'how' && <p>{p.use}</p>}
              {tab === 'ingredients' && <p>{p.ingredients}</p>}
              {tab === 'reviews' && (
                <div style={{ display: 'grid', gap: 16 }}>
                  {PRODUCT_REVIEWS.map((r, i) => (
                    <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--ink)' }}>{r.author}</div>
                        <span style={{ fontSize: 11, color: 'var(--mute)' }}>{r.date}</span>
                      </div>
                      <div style={{ marginTop: 4 }}><Stars rating={r.rating} size={11} /></div>
                      <p style={{ marginTop: 8, fontSize: 13, color: 'var(--ink)' }}>{r.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ padding: '80px 32px 0', maxWidth: 1280, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 500, marginBottom: 32 }}>You may also like</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 24 }}>
            {related.map(rp => (
              <ProductCard
                key={rp.id} product={rp}
                onOpen={id => navigate(`/product/${id}`)}
                onAdd={addToCart}
                onWish={toggleWishlist}
                wished={wishlist.includes(rp.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
