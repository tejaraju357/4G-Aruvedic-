import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';
import Btn from '../components/ui/Btn';
import Empty from '../components/ui/Empty';

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart, products } = useCart();
  const items = wishlist.map(id => products.find(p => p.id === id)).filter(Boolean);

  if (items.length === 0) {
    return (
      <div className="page-container" style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 500, letterSpacing: '-.02em', marginTop: 0 }}>Wishlist</h1>
        <Empty icon="heart" title="No saved items yet"
          sub="Tap the heart on any product to save it for later."
          action={<Btn variant="primary" onClick={() => navigate('/')}>Browse</Btn>}
        />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: 1280, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 500, letterSpacing: '-.02em', marginTop: 0 }}>Wishlist</h1>
      <p style={{ color: 'var(--mute)', marginTop: 4 }}>{items.length} saved item{items.length > 1 ? 's' : ''}</p>
      <div className="responsive-grid-4col" style={{ marginTop: 36 }}>
        {items.map(p => (
          <ProductCard key={p.id} product={p} style="bordered"
            onOpen={id => navigate(`/product/${id}`)}
            onAdd={addToCart}
            onWish={toggleWishlist}
            wished={true}
          />
        ))}
      </div>
    </div>
  );
}
