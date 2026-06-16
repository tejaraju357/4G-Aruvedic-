import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import Stars from '../../components/ui/Stars';
import api from '../../utils/api';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('All');
  const { products } = useCart();

  const fetchReviews = () => {
    api.get('/reviews')
      .then(res => setReviews(res.data))
      .catch(err => console.error('Failed to load reviews:', err));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const list = filter === 'All' ? reviews : reviews.filter(r => r.status === filter);

  const updateStatus = (id, status) => {
    api.patch(`/reviews/${id}`, { status })
      .then(() => fetchReviews())
      .catch(err => console.error('Failed to update review status:', err));
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 500, margin: '0 0 24px' }}>Reviews</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', width: '100%', maxWidth: '100%', WebkitOverflowScrolling: 'touch', paddingBottom: 4 }}>
        {['All', 'Pending', 'Published', 'Rejected'].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '6px 14px', borderRadius: 999, border: '1px solid ' + (filter === s ? 'var(--ink)' : 'var(--line)'),
            background: filter === s ? 'var(--ink)' : 'transparent', color: filter === s ? 'var(--bg)' : 'var(--ink)',
            fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap'
          }}>{s}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        {list.map(r => {
          const product = products.find(p => p.id === r.product);
          return (
            <div key={r.id} style={{ padding: 20, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
              <div className="admin-review-card">
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                    <Stars rating={r.rating} size={12} />
                    <span style={{ fontSize: 12, color: 'var(--mute)' }}>{r.date}</span>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: r.status === 'Published' ? '#4AE87822' : r.status === 'Pending' ? '#E8A24A22' : '#E84A4A22', color: r.status === 'Published' ? '#2E9E50' : r.status === 'Pending' ? '#C87020' : '#C84040' }}>{r.status}</span>
                  </div>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{r.author} on <em>{product?.name || r.product}</em></div>
                  <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6, color: 'var(--mute)' }}>{r.body}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, marginLeft: 20, flexShrink: 0 }}>
                  {r.status !== 'Published' && (
                    <button onClick={() => updateStatus(r.id, 'Published')} style={{ padding: '6px 14px', background: 'var(--ink)', color: 'var(--bg)', border: 'none', borderRadius: 999, cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-body)' }}>Approve</button>
                  )}
                  {r.status !== 'Rejected' && (
                    <button onClick={() => updateStatus(r.id, 'Rejected')} style={{ padding: '6px 14px', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 999, cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-body)' }}>Reject</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--mute)' }}>No reviews in this category</div>
        )}
      </div>
    </div>
  );
}
