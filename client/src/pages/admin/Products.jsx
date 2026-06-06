import { PRODUCTS, CATEGORIES, inr } from '../../data/products';
import { useState } from 'react';
import Icon from '../../components/ui/Icon';

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');

  const list = PRODUCTS.filter(p => {
    if (cat !== 'all' && p.cat !== cat) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 500, margin: 0 }}>Products</h1>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: 'var(--ink)', color: 'var(--bg)', border: 'none', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-body)' }}>
          <Icon name="plus" size={14} /> Add product
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative' }}>
          <Icon name="search" size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--mute)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" style={{ paddingLeft: 36, paddingRight: 14, paddingTop: 8, paddingBottom: 8, border: '1px solid var(--line)', borderRadius: 999, fontSize: 13, fontFamily: 'var(--font-body)', background: 'var(--surface)', color: 'var(--ink)', outline: 'none', width: 240 }} />
        </div>
        <select value={cat} onChange={e => setCat(e.target.value)} style={{ padding: '8px 14px', border: '1px solid var(--line)', borderRadius: 999, background: 'var(--surface)', fontSize: 13, fontFamily: 'var(--font-body)', color: 'var(--ink)', cursor: 'pointer' }}>
          <option value="all">All categories</option>
          {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--soft)' }}>
              {['Product', 'Category', 'Price', 'MRP', 'Stock', 'Rating', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 500, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map(p => (
              <tr key={p.id} style={{ borderTop: '1px solid var(--line)' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: p.swatch + '22', display: 'grid', placeItems: 'center' }}>
                      <div style={{ width: 16, height: 16, borderRadius: 999, background: p.swatch }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--mute)' }}>{p.sub}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--mute)', textTransform: 'capitalize' }}>{p.cat}</td>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{inr(p.price)}</td>
                <td style={{ padding: '12px 16px', color: 'var(--mute)', textDecoration: 'line-through' }}>{inr(p.mrp)}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ color: p.stock === 0 ? 'var(--accent)' : p.stock < 80 ? '#E8A24A' : 'var(--leaf)', fontWeight: 500 }}>
                    {p.stock === 0 ? 'Out of stock' : p.stock}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--mute)' }}>⭐ {p.rating}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ background: 'transparent', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '4px 8px', cursor: 'pointer', color: 'var(--ink)', fontSize: 12 }}>Edit</button>
                    <button style={{ background: 'transparent', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '4px 8px', cursor: 'pointer', color: 'var(--accent)', fontSize: 12 }}>Delete</button>
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
