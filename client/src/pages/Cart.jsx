import { useNavigate } from 'react-router-dom';
import { inr } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductVisual from '../components/ui/ProductVisual';
import Btn from '../components/ui/Btn';
import Icon from '../components/ui/Icon';
import Empty from '../components/ui/Empty';

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
      <span style={{ color: 'var(--mute)' }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateCartQty, removeFromCart, products } = useCart();
  const items    = cart.map(c => ({ ...products.find(p => p.id === c.id), qty: c.qty })).filter(x => x.id);
  const sub      = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = sub > 999 || sub === 0 ? 0 : 80;
  const tax      = Math.round(sub * 0.05);
  const total    = sub + shipping + tax;

  const qtyBtnStyle = { width: 28, height: 32, border: 'none', background: 'transparent', cursor: 'pointer', display: 'grid', placeItems: 'center', color: 'var(--ink)' };

  if (items.length === 0) {
    return (
      <div className="page-container" style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 500, letterSpacing: '-.02em', marginBottom: 8, marginTop: 0 }}>Your cart</h1>
        <Empty icon="bag" title="Nothing in here yet"
          sub="Browse the apothecary and add a few essentials."
          action={<Btn variant="primary" onClick={() => navigate('/')}>Shop the apothecary</Btn>}
        />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: 1280, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 500, letterSpacing: '-.02em', marginTop: 0 }}>Your cart</h1>
      <p style={{ color: 'var(--mute)', marginTop: 4 }}>{items.length} item{items.length > 1 ? 's' : ''}</p>

      <div className="responsive-split-skewed" style={{ marginTop: 36 }}>
        {/* Items */}
        <div>
          {items.map(item => (
            <div key={item.id} className="cart-item-row">
              <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${item.id}`)}>
                <ProductVisual product={item} height={120} />
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--mute)' }}>{item.sub}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginTop: 4, cursor: 'pointer' }} onClick={() => navigate(`/product/${item.id}`)}>{item.name}</div>
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 999 }}>
                    <button style={qtyBtnStyle} onClick={() => updateCartQty(item.id, Math.max(1, item.qty - 1))}><Icon name="minus" size={12} /></button>
                    <span style={{ padding: '0 12px', fontSize: 13, minWidth: 26, textAlign: 'center' }}>{item.qty}</span>
                    <button style={qtyBtnStyle} onClick={() => updateCartQty(item.id, item.qty + 1)}><Icon name="plus" size={12} /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--mute)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Icon name="trash" size={13} /> Remove
                  </button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontFamily: 'var(--font-display)' }}>{inr(item.price * item.qty)}</div>
                {item.qty > 1 && <div style={{ fontSize: 11, color: 'var(--mute)' }}>{inr(item.price)} each</div>}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 32, padding: 20, background: 'var(--soft)', borderRadius: 'var(--radius)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Icon name="tag" size={18} />
            <input placeholder="Enter coupon code" style={{ flex: 1, minWidth: 150, border: 'none', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none', color: 'var(--ink)' }} />
            <Btn variant="ghost" size="sm">Apply</Btn>
          </div>
        </div>

        {/* Summary */}
        <div className="product-visual-sticky" style={{ height: 'fit-content' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 28 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, marginTop: 0 }}>Order summary</h3>
            <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
              <Row label="Subtotal" value={inr(sub)} />
              <Row label="Shipping" value={shipping === 0 ? 'Free' : inr(shipping)} />
              <Row label="Tax (5%)" value={inr(tax)} />
              {sub < 999 && sub > 0 && (
                <div style={{ padding: '10px 12px', background: 'var(--soft)', borderRadius: 'var(--radius)', fontSize: 12, color: 'var(--accent)' }}>
                  Add {inr(999 - sub)} more for free shipping
                </div>
              )}
            </div>
            <div style={{ borderTop: '1px solid var(--line)', marginTop: 18, paddingTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 34 }}>{inr(total)}</span>
            </div>
            <div style={{ marginTop: 20 }}>
              <Btn variant="primary" size="lg" full onClick={() => navigate('/checkout')}>Checkout →</Btn>
            </div>
            <div style={{ marginTop: 16, fontSize: 11, color: 'var(--mute)', textAlign: 'center', letterSpacing: '.06em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Icon name="lock" size={11} /> Secure checkout · GST included
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
