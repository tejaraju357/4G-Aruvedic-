import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/ui/Icon';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home',    path: '/admin/dashboard' },
  { id: 'orders',    label: 'Orders',    icon: 'box',     path: '/admin/orders' },
  { id: 'products',  label: 'Products',  icon: 'bag',     path: '/admin/products' },
  { id: 'customers', label: 'Customers', icon: 'user',    path: '/admin/customers' },
  { id: 'coupons',   label: 'Coupons',   icon: 'tag',     path: '/admin/coupons' },
  { id: 'reviews',   label: 'Reviews',   icon: 'star',    path: '/admin/reviews' },
];

export default function AdminShell({ section, children }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, background: 'var(--ink)', color: 'var(--bg)',
        display: 'flex', flexDirection: 'column', padding: '24px 0',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', flexShrink: 0,
      }}>
        <div style={{ padding: '0 20px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <path d="M12 2 C 7 8, 7 16, 12 22 C 17 16, 17 8, 12 2 Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
            <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>Admin</span>
        </div>

        <nav style={{ flex: 1, padding: '0 12px', display: 'grid', gap: 2, alignContent: 'start' }}>
          {NAV.map(n => (
            <Link key={n.id} to={n.path} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
              borderRadius: 'var(--radius)', textDecoration: 'none',
              background: section === n.id ? 'rgba(255,255,255,.12)' : 'transparent',
              color: section === n.id ? 'var(--bg)' : 'rgba(255,255,255,.6)',
              fontSize: 14, transition: 'all .15s',
            }}
              onMouseEnter={e => { if (section !== n.id) e.currentTarget.style.color = 'var(--bg)'; }}
              onMouseLeave={e => { if (section !== n.id) e.currentTarget.style.color = 'rgba(255,255,255,.6)'; }}
            >
              <Icon name={n.icon} size={16} />{n.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,.1)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,.5)', fontSize: 12, textDecoration: 'none' }}>
            <Icon name="arrow" size={12} style={{ transform: 'rotate(180deg)' }} />
            Back to shop
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '32px 36px', overflowX: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
