import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Icon from '../ui/Icon';

function Logo({ size = 22 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2 C 7 8, 7 16, 12 22 C 17 16, 17 8, 12 2 Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
        <path d="M12 3 V 21" stroke="currentColor" strokeWidth="1" opacity=".5"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      </svg>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: size * .95, fontWeight: 500, letterSpacing: '.02em' }}>
        Aruvedic
      </span>
    </div>
  );
}

function IconBtn({ name, onClick, badge }) {
  return (
    <button onClick={onClick} style={{
      width: 38, height: 38, borderRadius: 999, border: 'none', background: 'transparent',
      cursor: 'pointer', display: 'grid', placeItems: 'center', color: 'var(--ink)', position: 'relative',
    }}>
      <Icon name={name} size={18} />
      {badge > 0 && (
        <span style={{
          position: 'absolute', top: 4, right: 4,
          background: 'var(--accent)', color: 'var(--accent-ink)',
          fontSize: 10, minWidth: 16, height: 16, borderRadius: 999,
          display: 'grid', placeItems: 'center', padding: '0 4px', fontWeight: 600,
        }}>{badge}</span>
      )}
    </button>
  );
}

const navLinkStyle = (active) => ({
  cursor: 'pointer', position: 'relative', paddingBottom: 3,
  borderBottom: active ? '1px solid var(--ink)' : '1px solid transparent',
  textDecoration: 'none', color: 'inherit',
  transition: 'opacity .15s',
});

export { Logo };

export default function Header() {
  const navigate = useNavigate();
  const { cartCount, wishlist, user } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const loc = window.location.pathname;

  return (
    <header style={{
      borderBottom: '1px solid var(--line)',
      background: 'var(--bg)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      {/* Announcement bar */}
      <div style={{
        padding: '8px 16px', borderBottom: '1px solid var(--line)',
        textAlign: 'center', fontSize: 11, letterSpacing: '.16em',
        textTransform: 'uppercase', color: 'var(--mute)',
      }}>
        Free shipping over ₹999 · Use code <strong style={{ color: 'var(--ink)' }}>AYUR20</strong> for 20% off
      </div>

      {/* Main nav */}
      <div className="header-main-nav">
        {/* Left section: Desktop nav or Mobile hamburger */}
        <div className="desktop-only">
          <nav style={{ display: 'flex', gap: 24, fontSize: 13, letterSpacing: '.05em' }}>
            <Link to="/" style={navLinkStyle(loc === '/')}>Shop</Link>
            <Link to="/shop" style={navLinkStyle(loc === '/shop')}>All Products</Link>
            <Link to="/shop?cat=skincare" style={navLinkStyle(false)}>Skincare</Link>
            <Link to="/shop?cat=supplements" style={navLinkStyle(false)}>Wellness</Link>
          </nav>
        </div>
        <div className="mobile-only">
          <button onClick={() => setDrawerOpen(true)} style={{
            width: 38, height: 38, borderRadius: 999, border: 'none', background: 'transparent',
            cursor: 'pointer', display: 'grid', placeItems: 'center', color: 'var(--ink)'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Center section: Logo */}
        <Link to="/" style={{ cursor: 'pointer', color: 'inherit', display: 'flex', justifyContent: 'center' }}>
          <Logo size={26} />
        </Link>

        {/* Right section: Icons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, alignItems: 'center' }}>
          <IconBtn name="search" onClick={() => setShowSearch(s => !s)} />
          <IconBtn name="user" onClick={() => navigate(user ? '/profile' : '/auth')} />
          <IconBtn name="heart" badge={wishlist.length} onClick={() => navigate('/wishlist')} />
          <IconBtn name="bag" badge={cartCount} onClick={() => navigate('/cart')} />
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div style={{ padding: '12px 16px 16px', borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
          <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
            <Icon name="search" size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--mute)' }} />
            <input
              autoFocus
              placeholder="Search Ashwagandha, Face Oil, Teas…"
              onKeyDown={e => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  navigate(`/shop?q=${encodeURIComponent(e.target.value.trim())}`);
                  setShowSearch(false);
                }
                if (e.key === 'Escape') setShowSearch(false);
              }}
              style={{
                width: '100%', padding: '12px 14px 12px 42px',
                border: '1px solid var(--line)', borderRadius: 999,
                fontFamily: 'var(--font-body)', fontSize: 14,
                background: 'var(--bg)', color: 'var(--ink)', outline: 'none',
              }}
            />
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setDrawerOpen(false)} />
      )}
      <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Logo size={22} />
          <button onClick={() => setDrawerOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--ink)', display: 'grid', placeItems: 'center' }}>
            <Icon name="x" size={20} />
          </button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 16, letterSpacing: '.05em', marginTop: 20 }}>
          <Link to="/" onClick={() => setDrawerOpen(false)} style={navLinkStyle(loc === '/')}>Shop</Link>
          <Link to="/shop" onClick={() => setDrawerOpen(false)} style={navLinkStyle(loc === '/shop')}>All Products</Link>
          <Link to="/shop?cat=skincare" onClick={() => setDrawerOpen(false)} style={navLinkStyle(false)}>Skincare</Link>
          <Link to="/shop?cat=supplements" onClick={() => setDrawerOpen(false)} style={navLinkStyle(false)}>Wellness</Link>
        </nav>
      </div>
    </header>
  );
}
