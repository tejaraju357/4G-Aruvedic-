import { useState } from 'react';
import { COUPONS } from '../../data/products';
import Icon from '../../components/ui/Icon';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState(COUPONS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', off: '', cap: '' });

  const addCoupon = () => {
    if (!form.code) return;
    setCoupons(prev => [...prev, { id: 'c-' + Date.now(), ...form, uses: 0, status: 'Active' }]);
    setForm({ code: '', off: '', cap: '' });
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c));
  };

  const deleteCoupon = (id) => setCoupons(prev => prev.filter(c => c.id !== id));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 500, margin: 0 }}>Coupons</h1>
        <button onClick={() => setShowForm(s => !s)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: 'var(--ink)', color: 'var(--bg)', border: 'none', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-body)' }}>
          <Icon name="plus" size={14} /> New coupon
        </button>
      </div>

      {showForm && (
        <div style={{ marginBottom: 20, padding: 24, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 12, alignItems: 'end' }}>
          {[['Code', 'code', 'WELCOME10'], ['Discount', 'off', '15% or ₹150'], ['Cap', 'cap', '₹400']].map(([l, k, ph]) => (
            <label key={k} style={{ display: 'block' }}>
              <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 6 }}>{l}</div>
              <input value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder={ph} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontSize: 13, background: 'var(--bg)', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box' }} />
            </label>
          ))}
          <button onClick={addCoupon} style={{ padding: '10px 20px', background: 'var(--ink)', color: 'var(--bg)', border: 'none', borderRadius: 'var(--radius)', cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-body)', height: 40 }}>Create</button>
        </div>
      )}

      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--soft)' }}>
              {['Code', 'Discount', 'Cap', 'Uses', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 500, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.id} style={{ borderTop: '1px solid var(--line)' }}>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: 600, letterSpacing: '.08em' }}>{c.code}</td>
                <td style={{ padding: '12px 16px', fontWeight: 500, color: 'var(--accent)' }}>{c.off}</td>
                <td style={{ padding: '12px 16px', color: 'var(--mute)' }}>{c.cap}</td>
                <td style={{ padding: '12px 16px' }}>{c.uses.toLocaleString()}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 999, background: c.status === 'Active' ? '#4AE87822' : '#88888822', color: c.status === 'Active' ? '#2E9E50' : '#888' }}>{c.status}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => toggleStatus(c.id)} style={{ background: 'transparent', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '4px 8px', cursor: 'pointer', color: 'var(--ink)', fontSize: 12 }}>
                      {c.status === 'Active' ? 'Pause' : 'Activate'}
                    </button>
                    <button onClick={() => deleteCoupon(c.id)} style={{ background: 'transparent', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '4px 8px', cursor: 'pointer', color: 'var(--accent)', fontSize: 12 }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
