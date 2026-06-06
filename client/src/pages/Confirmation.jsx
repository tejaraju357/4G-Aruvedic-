import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { inr } from '../data/products';
import Btn from '../components/ui/Btn';
import Icon from '../components/ui/Icon';

export default function Confirmation() {
  const navigate = useNavigate();
  const { lastOrder } = useCart();
  const orderId = lastOrder?.id || 'AR-10429';
  const total   = lastOrder?.total || 2284;

  return (
    <div style={{ padding: '80px 32px 120px', maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: 999, background: 'var(--soft)', display: 'grid', placeItems: 'center', margin: '0 auto', color: 'var(--leaf)' }}>
        <Icon name="check" size={36} stroke={2} />
      </div>
      <div style={{ fontSize: 11, letterSpacing: '.3em', color: 'var(--accent)', marginTop: 28, textTransform: 'uppercase' }}>Order confirmed</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 500, letterSpacing: '-.02em', margin: '16px 0 0' }}>
        Thank you, Aanya.
      </h1>
      <p style={{ color: 'var(--mute)', fontSize: 16, lineHeight: 1.7, marginTop: 14 }}>
        We've sent a confirmation to your email. Your rituals will be carefully packed in seed-paper and shipped within 24 hours.
      </p>

      <div style={{ marginTop: 40, padding: 28, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', textAlign: 'left' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {[{ l: 'Order', v: `#${orderId}` }, { l: 'Total', v: inr(total) }, { l: 'Arrives by', v: 'Jun 8' }].map(item => (
            <div key={item.l}>
              <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)' }}>{item.l}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginTop: 4 }}>{item.v}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
          <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 16 }}>Tracking</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {[{ l: 'Confirmed', done: true }, { l: 'Packed', done: false }, { l: 'Shipped', done: false }, { l: 'Delivered', done: false }].map((s, i) => (
              <div key={s.l} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 999, margin: '0 auto', background: s.done ? 'var(--ink)' : 'var(--soft)', color: s.done ? 'var(--bg)' : 'var(--mute)', display: 'grid', placeItems: 'center' }}>
                    {s.done ? <Icon name="check" size={14} /> : <span style={{ fontSize: 11 }}>{i + 1}</span>}
                  </div>
                  <div style={{ fontSize: 12, marginTop: 8, color: s.done ? 'var(--ink)' : 'var(--mute)' }}>{s.l}</div>
                </div>
                {i < 3 && <div style={{ height: 1, flex: 1, background: 'var(--line)', marginBottom: 28 }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Btn variant="primary" onClick={() => navigate('/profile')}>View order</Btn>
        <Btn variant="ghost" onClick={() => navigate('/')}>Continue shopping</Btn>
      </div>
    </div>
  );
}
