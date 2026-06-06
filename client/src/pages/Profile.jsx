import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PRODUCTS, ORDERS, inr } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductVisual from '../components/ui/ProductVisual';
import Btn from '../components/ui/Btn';
import Icon from '../components/ui/Icon';

function Field({ label, value, onChange, span = 1 }) {
  return (
    <label style={{ display: 'block', gridColumn: span > 1 ? `span ${span}` : undefined }}>
      <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 6 }}>{label}</div>
      <input value={value} onChange={e => onChange(e.target.value)} style={{
        width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-body)', fontSize: 14, background: 'var(--surface)', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
      }}
        onFocus={e => e.target.style.borderColor = 'var(--ink)'}
        onBlur={e => e.target.style.borderColor = 'var(--line)'}
      />
    </label>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useCart();
  const [tab, setTab] = useState('orders');

  return (
    <div style={{ padding: '40px 32px 120px', maxWidth: 1280, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 500, letterSpacing: '-.02em' }}>
        Hello, {user?.name?.split(' ')[0] || 'friend'}
      </h1>
      <p style={{ color: 'var(--mute)', marginTop: 4 }}>Member since September 2024 · Gold tier</p>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, marginTop: 36 }}>
        <aside style={{ display: 'grid', gap: 4, alignContent: 'start' }}>
          {[
            { id: 'orders',   label: 'Orders',          icon: 'box' },
            { id: 'details',  label: 'Account details',  icon: 'user' },
            { id: 'address',  label: 'Addresses',         icon: 'pin' },
            { id: 'wishlist', label: 'Wishlist',          icon: 'heart' },
            { id: 'logout',   label: 'Sign out',          icon: 'arrow' },
          ].map(t => (
            <button key={t.id} onClick={() => {
              if (t.id === 'wishlist') navigate('/wishlist');
              else if (t.id === 'logout') { setUser(null); navigate('/'); }
              else setTab(t.id);
            }} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              border: 'none', cursor: 'pointer',
              background: tab === t.id ? 'var(--soft)' : 'transparent',
              borderRadius: 'var(--radius)', color: 'var(--ink)',
              fontFamily: 'var(--font-body)', fontSize: 14, textAlign: 'left',
            }}>
              <Icon name={t.icon} size={16} />{t.label}
            </button>
          ))}
        </aside>

        <div>
          {tab === 'orders' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, marginTop: 0 }}>Order history</h2>
              <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
                {ORDERS.slice(0, 6).map(o => (
                  <div key={o.id} style={{ padding: 20, border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--surface)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>#{o.id}</div>
                        <div style={{ fontSize: 12, color: 'var(--mute)', marginTop: 4 }}>{o.date} · {o.pay}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 18, fontFamily: 'var(--font-display)' }}>{inr(o.total)}</div>
                        <span style={{ marginTop: 6, display: 'inline-block', fontSize: 11, padding: '3px 10px', borderRadius: 999, letterSpacing: '.05em', background: o.status === 'Delivered' ? 'var(--soft)' : o.status === 'Cancelled' ? '#F4DDD3' : 'var(--soft)', color: o.status === 'Delivered' ? 'var(--leaf)' : o.status === 'Cancelled' ? 'var(--accent)' : 'var(--ink)' }}>{o.status}</span>
                      </div>
                    </div>
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)', display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                      {o.items.map(it => {
                        const p = PRODUCTS.find(x => x.id === it.p);
                        if (!p) return null;
                        return (
                          <div key={it.p} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <div style={{ width: 40, height: 40 }}><ProductVisual product={p} height={40} /></div>
                            <div style={{ fontSize: 12 }}>{p.name} <span style={{ color: 'var(--mute)' }}>× {it.q}</span></div>
                          </div>
                        );
                      })}
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                        <Btn variant="ghost" size="sm">Track</Btn>
                        <Btn variant="ghost" size="sm">Reorder</Btn>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'details' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, marginTop: 0 }}>Account details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 18, maxWidth: 540 }}>
                <Field label="Full name" value={user?.name || ''} onChange={v => setUser({ ...user, name: v })} />
                <Field label="Phone" value="+91 98765 43210" onChange={() => {}} />
                <Field span={2} label="Email" value={user?.email || ''} onChange={v => setUser({ ...user, email: v })} />
                <Field span={2} label="Date of birth" value="14 March 1992" onChange={() => {}} />
              </div>
              <div style={{ marginTop: 20 }}><Btn variant="primary">Save changes</Btn></div>
            </div>
          )}
          {tab === 'address' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, marginTop: 0 }}>Saved addresses</h2>
              <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
                {[
                  { l: 'Home',   a: 'Flat 4B, Indrayani Apartments, 12 Brook Road, Pune 411001' },
                  { l: 'Office', a: 'WeWork Vaswani Chambers, 264-265 Annie Besant Road, Mumbai 400025' },
                ].map(ad => (
                  <div key={ad.l} style={{ padding: 20, border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--surface)', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{ad.l}</div>
                      <div style={{ fontSize: 13, color: 'var(--mute)', marginTop: 6, maxWidth: 360 }}>{ad.a}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Btn variant="ghost" size="sm" icon="pencil">Edit</Btn>
                      <Btn variant="bare" size="sm" icon="trash">Remove</Btn>
                    </div>
                  </div>
                ))}
                <Btn variant="ghost" icon="plus">Add new address</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
