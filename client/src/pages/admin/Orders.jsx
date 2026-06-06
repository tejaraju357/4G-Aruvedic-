import { useState, useEffect } from 'react';
import { inr } from '../../data/products';
import { useCart } from '../../context/CartContext';
import Icon from '../../components/ui/Icon';
import api from '../../utils/api';

const STATUS_COLORS = { Processing: '#E8A24A', Packed: '#4A7FE8', Shipped: '#8A4AE8', Delivered: '#4AE878', Cancelled: '#E84A4A' };
const ALL_STATUSES = ['All', 'Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const { products } = useCart();

  const fetchOrders = () => {
    api.get(`/orders${filter !== 'All' ? `?status=${filter}` : ''}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error('Failed to load orders:', err));
  };

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const handleUpdateStatus = (id, newStatus) => {
    api.patch(`/orders/${id}`, { status: newStatus })
      .then(() => {
        fetchOrders();
      })
      .catch(err => console.error('Failed to update status:', err));
  };

  const filteredOrders = orders.filter(o => {
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeOrder = selected ? orders.find(o => o.id === selected) : null;

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 500, margin: '0 0 24px' }}>Orders</h1>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative' }}>
          <Icon name="search" size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--mute)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search order ID or customer…" style={{
            paddingLeft: 36, paddingRight: 14, paddingTop: 8, paddingBottom: 8,
            border: '1px solid var(--line)', borderRadius: 999, fontSize: 13,
            fontFamily: 'var(--font-body)', background: 'var(--surface)', color: 'var(--ink)', outline: 'none', width: 260,
          }} />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {ALL_STATUSES.map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '6px 14px', borderRadius: 999, border: '1px solid ' + (filter === s ? 'var(--ink)' : 'var(--line)'),
              background: filter === s ? 'var(--ink)' : 'transparent', color: filter === s ? 'var(--bg)' : 'var(--ink)',
              fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)',
            }}>{s}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: activeOrder ? '1fr 360px' : '1fr', gap: 16 }}>
        {/* Table */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--soft)' }}>
                {['Order ID', 'Customer', 'Date', 'City', 'Total', 'Payment', 'Status', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 500, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(o => (
                <tr key={o.id} style={{ borderTop: '1px solid var(--line)', cursor: 'pointer', background: selected === o.id ? 'var(--soft)' : 'transparent' }}
                  onClick={() => setSelected(selected === o.id ? null : o.id)}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{o.id}</td>
                  <td style={{ padding: '12px 16px' }}>{o.customer}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--mute)' }}>{o.date}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--mute)' }}>{o.city}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 500 }}>{inr(o.total)}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--mute)' }}>{o.pay}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 999, background: (STATUS_COLORS[o.status] || '#888') + '22', color: STATUS_COLORS[o.status] || '#888' }}>{o.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}><Icon name="chev" size={14} color="var(--mute)" /></td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr><td colSpan={8} style={{ padding: 40, textAlign: 'center', color: 'var(--mute)' }}>No orders found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Order detail panel */}
        {activeOrder && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 20, alignSelf: 'start', position: 'sticky', top: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, margin: 0 }}>{activeOrder.id}</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--mute)' }}><Icon name="x" size={16} /></button>
            </div>
            <div style={{ marginTop: 16, display: 'grid', gap: 10, fontSize: 13 }}>
              {[
                ['Customer', activeOrder.customer],
                ['Email', activeOrder.email],
                ['Date', activeOrder.date],
                ['City', activeOrder.city],
                ['Payment', activeOrder.pay],
                ['Status', activeOrder.status],
                ['Total', inr(activeOrder.total)],
              ].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--mute)' }}>{l}</span>
                  <span style={{ fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
              <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 10 }}>Update Status</div>
              <select 
                value={activeOrder.status} 
                onChange={e => handleUpdateStatus(activeOrder.id, e.target.value)}
                style={{
                  width: '100%', padding: '8px 12px', border: '1px solid var(--line)', borderRadius: 'var(--radius)',
                  fontFamily: 'var(--font-body)', fontSize: 13, background: 'var(--surface)', color: 'var(--ink)',
                  outline: 'none', cursor: 'pointer'
                }}
              >
                {ALL_STATUSES.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
              <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 10 }}>Items</div>
              {activeOrder.items.map(it => {
                const p = products.find(x => x.id === it.p);
                return p ? (
                  <div key={it.p} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
                    <span>{p.name} × {it.q}</span>
                    <span>{inr(p.price * it.q)}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
