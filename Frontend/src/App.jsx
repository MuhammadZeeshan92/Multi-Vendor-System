import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './features/auth/authSlice';
import { Helmet } from 'react-helmet';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';

// pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home'; // landing / marketing page
import ProductList from './pages/products/ProductList';
import ProductDetail from './pages/products/ProductDetail';
import CartPage from './pages/cart/CartPage';
import Checkout from './pages/checkout/Checkout';
import OrderSuccess from './pages/checkout/OrderSuccess';
import MyOrders from './pages/orders/MyOrders';
import VendorSales from './pages/orders/VendorSales';
import VendorDashboard from './pages/vendor/Dashboard';
import AddProduct from './pages/vendor/AddProduct';
import VendorProducts from './pages/vendor/Products';
import VendorLayout from './layouts/VendorLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminVendors from './pages/admin/AdminVendor';
import Commission from './pages/admin/Commission';
import Forbidden from './pages/misc/Forbidden';
import NotFound from './pages/misc/NotFound';
import VendorStorefront from './pages/vendors/VendorStorefront';
import VendorList from './pages/vendors/VendorList';
import BuyerLayout from './layouts/BuyerLayout';
import BuyerDashboard from './pages/buyers/Dashboard';
import BuyerOrders from './pages/buyers/Orders';
import FollowedVendors from './pages/buyers/FollowedVendors';
// import Wishlist from './pages/buyer/Wishlist';
// import BuyerReviews from './pages/buyer/Reviews';
// import BuyerSettings from './pages/buyers/Settings';
import CreateStore from './pages/vendor/CreateStore';
import CompleteProfile from './pages/buyers/CompleteProfile';

import ChatPage from "./pages/chat/ChatPage";
import VendorInbox from "./pages/vendor/VendorInbox";

function App() {
  const dispatch = useDispatch();

  // restore user on page refresh
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Marketplace</title>
          <meta
            name="description"
            content="Multi‑vendor marketplace where you can discover products from independent sellers with secure checkout."
          />
        </Helmet>
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Landing = Marketing + Discovery (Hero + Featured + Vendors + CTAs) */}
            <Route path="/" element={<Home />} />

            {/* Full product listing with filters & pagination */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            {/* Vendor discovery & storefront */}
            <Route path="/vendors" element={<VendorList />} />
            <Route path="/vendors/:id" element={<VendorStorefront />} />



            <Route element={<ProtectedRoute />}>
            <Route
              path="/chat/:conversationId"
              element={<ChatPage />}
            />
              <Route element={<RoleRoute allowedRoles={['buyer']} />}>
                <Route element={<BuyerLayout />}>
                  <Route path="/buyer/complete-profile" element={<CompleteProfile />} />
                  <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
                  <Route path="/buyer/orders" element={<BuyerOrders />} />
                  <Route path="/buyer/vendors" element={<FollowedVendors />} />
                  {/* <Route path="wishlist" element={<Wishlist />} />
              <Route path="reviews" element={<BuyerReviews />} /> */}
                  {/* <Route path="/buyer/settings" element={<BuyerSettings />} /> */}
                </Route>
              </Route>
            </Route>
            {/* auth */}
            <Route path="/auth">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* protected routes (unchanged business logic) */}
            <Route path="/cart" element={<CartPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/my-orders" element={<MyOrders />} />

              <Route element={<RoleRoute allowedRoles={['seller']} />}>
                <Route element={<VendorLayout />}>
                  <Route
                    path="/vendor/create-store"
                    element={<CreateStore />}
                  />
                  <Route path="/vendor/dashboard" element={<VendorDashboard />} />
                  <Route path="/vendor/messages" element={<VendorInbox />} />
                  <Route path="/vendor/products" element={<VendorProducts />} />
                  <Route path="/vendor/products/add" element={<AddProduct />} />
                  <Route path="/vendor/sales" element={<VendorSales />} />
                </Route>
              </Route>

              <Route element={<RoleRoute allowedRoles={['admin']} />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/commission" element={<Commission />} />
                  <Route path="/admin/vendors" element={<AdminVendors />} />
                </Route>
              </Route>
            </Route>

            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
