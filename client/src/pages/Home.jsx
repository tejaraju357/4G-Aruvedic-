import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CATEGORIES, inr } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';
import ProductVisual from '../components/ui/ProductVisual';
import SectionEyebrow from '../components/ui/SectionEyebrow';
import Btn from '../components/ui/Btn';
import Icon from '../components/ui/Icon';
import Stars from '../components/ui/Stars';

const HEROES = [
  { eyebrow: 'New · Monsoon Collection', title: 'Ritual over routine.', sub: 'Ayurveda distilled to its purest form. Single-origin, third-party tested, and honestly priced.', cta: 'Shop the collection', featured: 'kumkumadi' },
  { eyebrow: 'Bestseller', title: 'Sleep like you deserve.', sub: 'KSM-66 Ashwagandha — the most clinically studied root extract. 600mg per tablet.', cta: 'Discover Ashwagandha', featured: 'ashwa' },
  { eyebrow: 'New · Haircare', title: 'Roots deserve love.', sub: 'Bhringraj, the king of hair herbs. Cold-pressed in sesame, not heat-extracted.', cta: 'See Bhringraj Oil', featured: 'bhringraj' },
];

const REVIEWS_DATA = [
  { name: 'Priya M.', city: 'Bengaluru', rating: 5, body: 'Kumkumadi Tailam gave me a visible glow in two weeks. The saffron is genuine.' },
  { name: 'Rohan S.', city: 'Mumbai', rating: 5, body: "Ashwagandha sleep has been the deepest I've had in years. Worth every rupee." },
  { name: 'Anjali V.', city: 'Pune', rating: 5, body: 'Bhringraj oil is exactly how my grandmother would make it. Highly recommend.' },
];

export default function Home() {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, products } = useCart();
  const [heroIdx, setHeroIdx] = useState(0);
  const hero = HEROES[heroIdx];
  const featuredProduct = products.find(p => p.id === hero.featured);
  const featured4 = products.length >= 6 ? [products[3], products[0], products[2], products[5]] : products.slice(0, 4);

  return (
    <div>
      {/* ── Hero ───────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero-text">
          <div style={{ fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--accent)' }}>{hero.eyebrow}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 6vw, 96px)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-.025em', margin: '18px 0 0' }}>{hero.title}</h1>
          <p style={{ marginTop: 20, fontSize: 16, lineHeight: 1.7, color: 'var(--mute)', maxWidth: 420 }}>{hero.sub}</p>
          <div style={{ marginTop: 36, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Btn variant="primary" size="lg" onClick={() => navigate('/shop')}>{hero.cta}</Btn>
            <Btn variant="ghost" size="lg" onClick={() => navigate('/shop')}>View all products</Btn>
          </div>
          <div style={{ marginTop: 48, display: 'flex', gap: 10 }}>
            {HEROES.map((_, i) => (
              <button key={i} onClick={() => setHeroIdx(i)} style={{
                width: heroIdx === i ? 28 : 8, height: 8, borderRadius: 999,
                background: heroIdx === i ? 'var(--ink)' : 'var(--line)',
                border: 'none', cursor: 'pointer', transition: 'all .3s ease',
              }} />
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', placeItems: 'center', paddingTop: 40, paddingBottom: 40, width: '100%' }}>
          {featuredProduct && (
            <div style={{ width: '100%', maxWidth: 460, cursor: 'pointer' }} onClick={() => navigate(`/product/${featuredProduct.id}`)}>
              <ProductVisual product={featuredProduct} height={400} />
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>{featuredProduct.sub}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginTop: 4 }}>{featuredProduct.name}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24 }}>{inr(featuredProduct.price)}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Category strip ───────────────────────── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '28px 16px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ display: 'flex', gap: 20, maxWidth: 1280, margin: '0 auto' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => navigate(`/shop?cat=${cat.id}`)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              padding: '14px 20px', borderRadius: 'var(--radius)', border: '1px solid var(--line)',
              background: 'transparent', cursor: 'pointer', minWidth: 110, transition: 'background .15s', whiteSpace: 'nowrap',
              flexShrink: 0
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--soft)'; e.currentTarget.style.borderColor = 'var(--ink)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--line)'; }}
            >
              <Icon name="leaf" size={18} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>{cat.label}</span>
              <span style={{ fontSize: 11, color: 'var(--mute)' }}>{cat.sub}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured products ────────────────────── */}
      <section className="page-container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <SectionEyebrow eyebrow="Most loved" title="The essentials." />
          <Btn variant="ghost" onClick={() => navigate('/shop')}>Shop all →</Btn>
        </div>
        <div className="responsive-grid-4col">
          {featured4.map(p => (
            <ProductCard key={p.id} product={p} onOpen={id => navigate(`/product/${id}`)} onAdd={addToCart} onWish={toggleWishlist} wished={wishlist.includes(p.id)} />
          ))}
        </div>
      </section>

      {/* ── Editorial band ───────────────────────── */}
      <section style={{ background: 'var(--soft)', padding: '80px 16px' }}>
        <div className="editorial-band">
          <div>
            <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Our promise</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1.05, fontWeight: 500, letterSpacing: '-.01em' }}>From root<br />to ritual.</h2>
            <p style={{ marginTop: 20, fontSize: 15, lineHeight: 1.75, color: 'var(--mute)', maxWidth: 400 }}>Every ingredient is sourced from certified organic farms across India. We work directly with farmers — no middlemen, no compromises on freshness.</p>
            <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 20 }}>
              {[{ icon: 'leaf', l: 'Organic', s: 'USDA & India Organic' }, { icon: 'check', l: 'Lab tested', s: 'Third-party verified' }, { icon: 'lock', l: 'No fillers', s: 'Pure extracts only' }, { icon: 'truck', l: 'Fast delivery', s: 'Ships within 24h' }].map(f => (
                <div key={f.l} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--surface)', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name={f.icon} size={16} /></div>
                  <div><div style={{ fontSize: 14, fontWeight: 500 }}>{f.l}</div><div style={{ fontSize: 12, color: 'var(--mute)', marginTop: 2 }}>{f.s}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="responsive-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%' }}>
            {products.slice(4, 8).map(p => (
              <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                <ProductVisual product={p} height={200} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────── */}
      <section className="page-container" style={{ paddingBottom: 80 }}>
        <div>
          <SectionEyebrow eyebrow="24,000+ happy rituals" title="What they're saying." align="center" />
          <div className="responsive-grid-3col" style={{ marginTop: 48 }}>
            {REVIEWS_DATA.map((r, i) => (
              <div key={i} style={{ padding: 28, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
                <Stars rating={r.rating} size={14} />
                <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.65, fontStyle: 'italic' }}>"{r.body}"</p>
                <div style={{ marginTop: 18, display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--soft)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontSize: 16 }}>{r.name[0]}</div>
                  <div><div style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div><div style={{ fontSize: 11, color: 'var(--mute)' }}>{r.city}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────── */}
      <section style={{ background: 'var(--ink)', color: 'var(--bg)', padding: '64px 16px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', opacity: .6 }}>Members only</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 500, lineHeight: 1.1, marginTop: 16 }}>10% off your first order.</h2>
          <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.6, opacity: .7 }}>Join 24,000+ people on a wellness journey. Get early access, free doshas guide and member discounts.</p>
          <div className="cta-input-group">
            <input placeholder="your@email.com" style={{ flex: 1, maxWidth: 280, padding: '12px 16px', borderRadius: 999, border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)', color: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none' }} />
            <Btn variant="accent" onClick={() => navigate('/auth')}>Join →</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}
