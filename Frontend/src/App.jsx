import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './features/auth/authSlice';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';

// pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
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
import Commission from './pages/admin/Commission';
import Forbidden from './pages/misc/Forbidden';
import NotFound from './pages/misc/NotFound';

function App() {
  const dispatch = useDispatch();

  // restore user on page refresh
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            <Route path="/auth">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute />}>            
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/my-orders" element={<MyOrders />} />

              <Route element={<RoleRoute allowedRoles={[ 'seller' ]} />}>
                <Route
                  element={<VendorLayout />}
                >
                  <Route path="/vendor/dashboard" element={<VendorDashboard />} />
                  <Route path="/vendor/products" element={<VendorProducts />} />
                  <Route path="/vendor/products/add" element={<AddProduct />} />
                  <Route path="/vendor/sales" element={<VendorSales />} />
                </Route>
              </Route>

              <Route element={<RoleRoute allowedRoles={[ 'admin' ]} />}>
                <Route
                  element={<AdminLayout />}
                >
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/commission" element={<Commission />} />
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
