import { useState, useEffect } from 'react';
import { inr } from '../../data/products';
import api from '../../utils/api';

const TIER_COLORS = { Gold: '#C5A028', Silver: '#888FA8', Bronze: '#A0724A' };

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api.get('/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.error('Failed to load customers:', err));
  }, []);

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 500, margin: '0 0 24px' }}>Customers</h1>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--soft)' }}>
              {['ID', 'Name', 'Email', 'Orders', 'Total spent', 'Joined', 'Tier'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 500, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} style={{ borderTop: '1px solid var(--line)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--mute)', fontSize: 11 }}>{c.id}</td>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{c.name}</td>
                <td style={{ padding: '12px 16px', color: 'var(--mute)' }}>{c.email}</td>
                <td style={{ padding: '12px 16px' }}>{c.orders}</td>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{inr(c.spent)}</td>
                <td style={{ padding: '12px 16px', color: 'var(--mute)' }}>{c.joined}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: TIER_COLORS[c.tier] + '22', color: TIER_COLORS[c.tier], fontWeight: 600 }}>{c.tier}</span>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: 'var(--mute)' }}>No customers found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
