import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md ${isActive ? 'text-[var(--primary)] font-medium' : 'text-gray-700 hover:text-gray-900'}`
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container flex items-center justify-between py-3">
        <NavLink to="/" className="font-semibold text-2xl text-gray-900">
          Marketplace
        </NavLink>

        <div className="flex items-center space-x-4">
          <NavItem to="/products">Products</NavItem>

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