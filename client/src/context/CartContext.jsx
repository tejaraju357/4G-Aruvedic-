import { createContext, useContext, useState, useCallback } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart]           = useState([{ id: 'kumkumadi', qty: 1 }, { id: 'ashwa', qty: 2 }]);
  const [wishlist, setWishlist]   = useState(['bhringraj', 'brahmi']);
  const [user, setUser]           = useState({ name: 'Aanya Sharma', email: 'aanya@gmail.com' });
  const [toast, setToast]         = useState('');
  const [lastOrder, setLastOrder] = useState({ id: 'AR-10429', total: 2284 });

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
    const p = PRODUCTS.find(p => p.id === id);
    if (p) showToast(`${p.name} added to cart`);
  }, [showToast]);

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

  const placeOrder = useCallback((address, payment) => {
    const items = cart.map(c => ({ ...PRODUCTS.find(p => p.id === c.id), qty: c.qty })).filter(x => x.id);
    const sub = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = sub > 999 ? 0 : 80;
    const tax = Math.round(sub * 0.05);
    const total = sub + shipping + tax;
    const newId = 'AR-' + Math.floor(10430 + Math.random() * 100);
    setLastOrder({ id: newId, total });
    setCart([]);
    return { id: newId, total };
  }, [cart]);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <CartContext.Provider value={{
      cart, setCart, addToCart, removeFromCart, updateCartQty,
      wishlist, toggleWishlist,
      user, setUser,
      toast, showToast,
      lastOrder, placeOrder,
      cartCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
