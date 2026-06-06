import { useState, useEffect } from 'react';
import { inr } from '../../data/products';
import api from '../../utils/api';

function KPICard({ label, value, delta, up }) {
  return (
    <div style={{ padding: 20, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
      <div style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, marginTop: 8 }}>{value}</div>
      <div style={{ marginTop: 8, fontSize: 12, color: up ? 'var(--leaf)' : 'var(--accent)', fontWeight: 500 }}>{delta} vs prev period</div>
    </div>
  );
}

function MiniBar({ day, revenue, maxR }) {
  const h = Math.round((revenue / maxR) * 100);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
      <div style={{ width: '100%', background: 'var(--soft)', borderRadius: 4, height: 100, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100%', background: 'var(--ink)', borderRadius: '4px 4px 0 0', height: `${h}%`, transition: 'height .4s ease' }} />
      </div>
      <div style={{ fontSize: 10, color: 'var(--mute)', whiteSpace: 'nowrap', transform: 'rotate(-45deg)', transformOrigin: 'top left', marginTop: 14 }}>{day.replace('May ', '')}</div>
    </div>
  );
}

const STATUS_COLORS = { Processing: '#E8A24A', Packed: '#4A7FE8', Shipped: '#8A4AE8', Delivered: '#4AE878', Cancelled: '#E84A4A' };

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard')
      .then(res => setData(res.data))
      .catch(err => console.error('Failed to fetch dashboard data:', err));
  }, []);

  if (!data) {
    return <div style={{ padding: 40, color: 'var(--mute)' }}>Loading dashboard...</div>;
  }

  const maxR = Math.max(...data.sales14d.map(d => d.r));

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 500, margin: '0 0 6px' }}>Dashboard</h1>
      <p style={{ color: 'var(--mute)', marginBottom: 28 }}>Last 14 days · Updated just now</p>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {data.kpis.map(k => (
          <KPICard 
            key={k.label} 
            label={k.label} 
            value={k.label === 'Revenue' || k.label === 'Avg. order' || k.label === 'Refunds' ? inr(k.value) : k.value} 
            delta={k.delta} 
            up={k.up} 
          />
        ))}
      </div>

      {/* Chart + Best sellers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16, marginBottom: 28 }}>
        <div style={{ padding: 24, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, margin: 0 }}>Revenue</h3>
            <div style={{ fontSize: 12, color: 'var(--mute)' }}>May 13 – May 26</div>
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 120 }}>
            {data.sales14d.map(d => <MiniBar key={d.d} day={d.d} revenue={d.r} maxR={maxR} />)}
          </div>
        </div>
        <div style={{ padding: 24, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, margin: '0 0 16px' }}>Best sellers</h3>
          {data.bestSellers.map((p, i) => (
            <div key={p.id || i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < data.bestSellers.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <div style={{ width: 24, height: 24, borderRadius: 999, background: 'var(--soft)', display: 'grid', placeItems: 'center', fontSize: 11, color: 'var(--mute)', fontWeight: 600 }}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--mute)' }}>{p.sold} sold</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{inr(p.revenue)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders + Low stock */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, margin: 0 }}>Recent orders</h3>
            <a href="/admin/orders" style={{ fontSize: 12, color: 'var(--mute)' }}>View all →</a>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--soft)' }}>
                {['Order', 'Customer', 'Date', 'Total', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 500, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map(o => (
                <tr key={o.id} style={{ borderTop: '1px solid var(--line)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500 }}>{o.id}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--mute)' }}>{o.customer}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--mute)' }}>{o.date}</td>
                  <td style={{ padding: '12px 16px' }}>{inr(o.total)}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 999, background: STATUS_COLORS[o.status] + '22', color: STATUS_COLORS[o.status] }}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, margin: 0 }}>Low stock</h3>
          </div>
          {data.lowStock.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid var(--line)' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--mute)' }}>{p.sub}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: p.stock === 0 ? 'var(--accent)' : p.stock < 80 ? '#E8A24A' : 'var(--ink)' }}>
                  {p.stock === 0 ? 'Out of stock' : `${p.stock} left`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
