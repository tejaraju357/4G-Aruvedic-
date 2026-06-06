import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { PRODUCTS as STATIC_PRODUCTS } from '../data/products';
import api from '../utils/api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [products, setProducts]   = useState(STATIC_PRODUCTS);
  const [cart, setCart]           = useState([{ id: 'kumkumadi', qty: 1 }, { id: 'ashwa', qty: 2 }]);
  const [wishlist, setWishlist]   = useState(['bhringraj', 'brahmi']);
  const [user, setUser]           = useState({ name: 'Aanya Sharma', email: 'aanya@gmail.com' });
  const [toast, setToast]         = useState('');
  const [lastOrder, setLastOrder] = useState({ id: 'AR-10429', total: 2284 });

  useEffect(() => {
    api.get('/products')
      .then(res => {
        if (res.data && res.data.products) {
          setProducts(res.data.products);
        }
      })
      .catch(err => console.error('Failed to fetch live products:', err));
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  }, []);

  const addToCart = useCallback((id, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === id);
      if (existing) return prev.map(c => c.id === id ? { ...c, qty: c.qty + qty } : c);
      return [...prev, { id, qty }];
    });
    const p = products.find(p => p.id === id);
    if (p) showToast(`${p.name} added to cart`);
  }, [products, showToast]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(c => c.id !== id));
  }, []);

  const updateCartQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty } : c));
  }, []);

  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const placeOrder = useCallback(async (address, payment) => {
    try {
      const items = cart.map(c => ({ id: c.id, qty: c.qty }));
      const res = await api.post('/orders', {
        items,
        address,
        payment,
        customer: user
      });
      const order = res.data;
      setLastOrder(order);
      setCart([]);
      return order;
    } catch (err) {
      console.error('Failed to place order:', err);
      throw err;
    }
  }, [cart, user]);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <CartContext.Provider value={{
      cart, setCart, addToCart, removeFromCart, updateCartQty,
      wishlist, toggleWishlist,
      user, setUser,
      toast, showToast,
      lastOrder, placeOrder,
      cartCount,
      products,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
