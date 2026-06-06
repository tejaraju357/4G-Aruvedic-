import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Toast from './components/ui/Toast.jsx';
import { useCart } from './context/CartContext.jsx';

import Home         from './pages/Home.jsx';
import Listing      from './pages/Listing.jsx';
import Product      from './pages/Product.jsx';
import Cart         from './pages/Cart.jsx';
import Checkout     from './pages/Checkout.jsx';
import Confirmation from './pages/Confirmation.jsx';
import Wishlist     from './pages/Wishlist.jsx';
import Profile      from './pages/Profile.jsx';
import Auth         from './pages/Auth.jsx';

import AdminShell    from './pages/admin/AdminShell.jsx';
import Dashboard     from './pages/admin/Dashboard.jsx';
import AdminOrders   from './pages/admin/Orders.jsx';
import AdminProducts from './pages/admin/Products.jsx';
import AdminCustomers from './pages/admin/Customers.jsx';
import AdminCoupons  from './pages/admin/Coupons.jsx';
import AdminReviews  from './pages/admin/Reviews.jsx';

function StorefrontLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  const { toast } = useCart();
  return (
    <>
      <Toast msg={toast} />
      <Routes>
        {/* Storefront */}
        <Route path="/" element={<StorefrontLayout><Home /></StorefrontLayout>} />
        <Route path="/shop" element={<StorefrontLayout><Listing /></StorefrontLayout>} />
        <Route path="/product/:id" element={<StorefrontLayout><Product /></StorefrontLayout>} />
        <Route path="/cart" element={<StorefrontLayout><Cart /></StorefrontLayout>} />
        <Route path="/checkout" element={<StorefrontLayout><Checkout /></StorefrontLayout>} />
        <Route path="/confirmation" element={<StorefrontLayout><Confirmation /></StorefrontLayout>} />
        <Route path="/wishlist" element={<StorefrontLayout><Wishlist /></StorefrontLayout>} />
        <Route path="/profile" element={<StorefrontLayout><Profile /></StorefrontLayout>} />
        <Route path="/auth" element={<StorefrontLayout><Auth /></StorefrontLayout>} />

        {/* Admin */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminShell section="dashboard"><Dashboard /></AdminShell>} />
        <Route path="/admin/orders" element={<AdminShell section="orders"><AdminOrders /></AdminShell>} />
        <Route path="/admin/products" element={<AdminShell section="products"><AdminProducts /></AdminShell>} />
        <Route path="/admin/customers" element={<AdminShell section="customers"><AdminCustomers /></AdminShell>} />
        <Route path="/admin/coupons" element={<AdminShell section="coupons"><AdminCoupons /></AdminShell>} />
        <Route path="/admin/reviews" element={<AdminShell section="reviews"><AdminReviews /></AdminShell>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
