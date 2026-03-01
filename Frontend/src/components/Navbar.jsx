import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 text-sm font-medium rounded-full transition-colors ${
        isActive
          ? 'bg-indigo-50 text-indigo-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
  <nav className="bg-white/90 backdrop-blur border-b border-gray-100 sticky top-0 z-40">
      <div className="container flex items-center justify-between py-3">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
            M
          </span>
          <span className="font-semibold text-xl text-gray-900 tracking-tight">
            Marketplace
          </span>
        </NavLink>

        <div className="flex items-center space-x-3">
          {/* Primary discovery links */}
          <NavItem to="/">Shop</NavItem>
          <NavItem to="/products">All Products</NavItem>
          <NavItem to="/vendors">Vendors</NavItem>

          {user ? (
            <>
              {user.role === 'seller' && <NavItem to="/vendor/dashboard">Vendor</NavItem>}
              {user.role === 'admin' && <NavItem to="/admin/dashboard">Admin</NavItem>}
              <NavItem to="/cart">Cart</NavItem>
            </>
          ) : (
            <NavItem to="/auth/login">Login</NavItem>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;