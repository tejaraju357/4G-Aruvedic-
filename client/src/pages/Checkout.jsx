import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { inr } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductVisual from '../components/ui/ProductVisual';
import Btn from '../components/ui/Btn';
import Icon from '../components/ui/Icon';

function Field({ label, value, onChange, span = 1, placeholder, type = 'text' }) {
  return (
    <label style={{ display: 'block', gridColumn: span > 1 ? `span ${span}` : undefined }}>
      <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 6 }}>{label}</div>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
        width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-body)', fontSize: 14, background: 'var(--surface)', color: 'var(--ink)',
        outline: 'none', boxSizing: 'border-box',
      }}
        onFocus={e => e.target.style.borderColor = 'var(--ink)'}
        onBlur={e => e.target.style.borderColor = 'var(--line)'}
      />
    </label>
  );
}

function StepBlock({ n, title, children, open, done }) {
  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', marginBottom: 14, background: open ? 'var(--surface)' : 'transparent', opacity: open ? 1 : .6 }}>
      <div style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 14, borderBottom: open ? '1px solid var(--line)' : 'none' }}>
        <div style={{ width: 26, height: 26, borderRadius: 999, background: done ? 'var(--leaf)' : open ? 'var(--ink)' : 'var(--soft)', color: done || open ? 'var(--bg)' : 'var(--mute)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 600 }}>
          {done ? <Icon name="check" size={14} /> : n}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>{title}</div>
      </div>
      {open && <div style={{ padding: 20 }}>{children}</div>}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
      <span style={{ color: 'var(--mute)' }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, placeOrder, user, products } = useCart();
  const [step, setStep] = useState(1);
  const [pay, setPay] = useState('upi');
  const [upi, setUpi] = useState('');
  const [card, setCard] = useState({ num: '', name: '', exp: '', cvv: '' });
  const [addr, setAddr] = useState({
    name: user?.name || 'Aanya Sharma', phone: '+91 98765 43210',
    line1: 'Flat 4B, Indrayani Apartments', line2: '12 Brook Road',
    city: 'Pune', state: 'Maharashtra', pin: '411001',
  });

  const items = cart.map(c => ({ ...products.find(p => p.id === c.id), qty: c.qty })).filter(x => x.id);
  const sub = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = sub > 999 ? 0 : 80;
  const tax = Math.round(sub * 0.05);
  const total = sub + shipping + tax;

  const handlePlaceOrder = async () => {
    try {
      await placeOrder(addr, pay);
      navigate('/confirmation');
    } catch (err) {
      alert('Failed to place order. Please try again.');
    }
  };

  const payOpts = [
    { id: 'upi',  label: 'UPI',                 sub: 'Pay via any UPI app',     icon: 'sparkle' },
    { id: 'card', label: 'Credit / Debit card',  sub: 'Visa, Mastercard, Rupay', icon: 'lock' },
    { id: 'emi',  label: 'EMI',                  sub: '3 / 6 / 9 month plans',  icon: 'chart' },
    { id: 'cod',  label: 'Cash on delivery',      sub: '₹50 handling fee',        icon: 'box' },
  ];

  return (
    <div style={{ padding: '40px 32px 120px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 500, letterSpacing: '-.02em', margin: 0 }}>Checkout</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[1, 2, 3].map((n, i) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 999, background: step >= n ? 'var(--ink)' : 'var(--soft)', color: step >= n ? 'var(--bg)' : 'var(--mute)', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600 }}>{n}</div>
              {n < 3 && <div style={{ width: 36, height: 1, background: step > n ? 'var(--ink)' : 'var(--line)' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, marginTop: 36 }}>
        <div>
          <StepBlock n={1} title="Delivery address" open={step >= 1} done={step > 1}>
            {step === 1 ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="Full name" value={addr.name} onChange={v => setAddr({ ...addr, name: v })} />
                <Field label="Phone" value={addr.phone} onChange={v => setAddr({ ...addr, phone: v })} />
                <Field span={2} label="Address line 1" value={addr.line1} onChange={v => setAddr({ ...addr, line1: v })} />
                <Field span={2} label="Address line 2 (optional)" value={addr.line2} onChange={v => setAddr({ ...addr, line2: v })} />
                <Field label="City" value={addr.city} onChange={v => setAddr({ ...addr, city: v })} />
                <Field label="State" value={addr.state} onChange={v => setAddr({ ...addr, state: v })} />
                <Field label="PIN code" value={addr.pin} onChange={v => setAddr({ ...addr, pin: v })} />
                <div style={{ gridColumn: 'span 2', marginTop: 8 }}>
                  <Btn variant="primary" onClick={() => setStep(2)}>Continue to payment →</Btn>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 14, color: 'var(--mute)', lineHeight: 1.6 }}>
                <div style={{ color: 'var(--ink)' }}>{addr.name}</div>
                {addr.line1}, {addr.line2}<br />
                {addr.city}, {addr.state} {addr.pin} · {addr.phone}
              </div>
            )}
          </StepBlock>

          <StepBlock n={2} title="Payment" open={step >= 2} done={step > 2}>
            {step === 2 ? (
              <div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {payOpts.map(opt => (
                    <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, border: '1px solid ' + (pay === opt.id ? 'var(--ink)' : 'var(--line)'), borderRadius: 'var(--radius)', cursor: 'pointer', background: pay === opt.id ? 'var(--soft)' : 'var(--surface)' }}>
                      <input type="radio" checked={pay === opt.id} onChange={() => setPay(opt.id)} style={{ accentColor: 'var(--ink)' }} />
                      <Icon name={opt.icon} size={18} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{opt.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--mute)' }}>{opt.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {pay === 'upi' && (
                  <div style={{ marginTop: 16, padding: 18, background: 'var(--soft)', borderRadius: 'var(--radius)' }}>
                    <Field label="UPI ID" value={upi} onChange={setUpi} placeholder="yourname@hdfcbank" />
                    <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
                      {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                        <div key={app} style={{ padding: '8px 14px', background: 'var(--surface)', borderRadius: 999, fontSize: 12, border: '1px solid var(--line)', cursor: 'pointer' }}>{app}</div>
                      ))}
                    </div>
                  </div>
                )}
                {pay === 'card' && (
                  <div style={{ marginTop: 16, padding: 18, background: 'var(--soft)', borderRadius: 'var(--radius)', display: 'grid', gap: 12 }}>
                    <Field label="Card number" value={card.num} onChange={v => setCard({ ...card, num: v })} placeholder="1234 5678 9012 3456" />
                    <Field label="Name on card" value={card.name} onChange={v => setCard({ ...card, name: v })} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <Field label="Expiry" value={card.exp} onChange={v => setCard({ ...card, exp: v })} placeholder="MM / YY" />
                      <Field label="CVV" value={card.cvv} onChange={v => setCard({ ...card, cvv: v })} placeholder="•••" />
                    </div>
                  </div>
                )}
                {pay === 'cod' && (
                  <div style={{ marginTop: 16, padding: 18, background: 'var(--soft)', borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--mute)' }}>
                    Pay {inr(total + 50)} in cash when your order arrives. ₹50 COD handling fee applies.
                  </div>
                )}
                <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
                  <Btn variant="ghost" onClick={() => setStep(1)}>← Back</Btn>
                  <Btn variant="primary" onClick={() => setStep(3)}>Review order →</Btn>
                </div>
              </div>
            ) : step > 2 ? (
              <div style={{ fontSize: 14, color: 'var(--mute)' }}>
                {pay === 'upi' && `UPI · ${upi || 'yourname@hdfcbank'}`}
                {pay === 'card' && `Card ending ${(card.num || '4242424242424242').slice(-4)}`}
                {pay === 'emi' && '3-month no-cost EMI'}
                {pay === 'cod' && 'Cash on delivery'}
              </div>
            ) : null}
          </StepBlock>

          <StepBlock n={3} title="Review & place order" open={step >= 3} done={false}>
            {step === 3 && (
              <div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {items.map(it => (
                    <div key={it.id} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 10, background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}>
                      <div style={{ width: 56, height: 56 }}><ProductVisual product={it} height={56} /></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{it.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--mute)' }}>Qty {it.qty}</div>
                      </div>
                      <div style={{ fontSize: 14 }}>{inr(it.price * it.qty)}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
                  <Btn variant="ghost" onClick={() => setStep(2)}>← Back</Btn>
                  <Btn variant="accent" size="lg" onClick={handlePlaceOrder}>Place order · {inr(total)}</Btn>
                </div>
              </div>
            )}
          </StepBlock>
        </div>

        {/* Sticky summary */}
        <div style={{ position: 'sticky', top: 100, height: 'fit-content' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 28 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, margin: 0 }}>Summary</h3>
            <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
              {items.map(it => (
                <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span>{it.name} <span style={{ color: 'var(--mute)' }}>× {it.qty}</span></span>
                  <span>{inr(it.price * it.qty)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--line)', marginTop: 16, paddingTop: 16, display: 'grid', gap: 8 }}>
              <Row label="Subtotal" value={inr(sub)} />
              <Row label="Shipping" value={shipping === 0 ? 'Free' : inr(shipping)} />
              <Row label="Tax" value={inr(tax)} />
            </div>
            <div style={{ borderTop: '1px solid var(--line)', marginTop: 16, paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>{inr(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
