import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="font-semibold text-xl text-gray-900">
          Marketplace
        </Link>
        <div className="space-x-4">
          <Link to="/products" className="text-gray-700 hover:text-gray-900">
            Products
          </Link>
          {user ? (
            <>
              {user.role === 'seller' && (
                <Link
                  to="/vendor/dashboard"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Vendor
                </Link>
              )}
              {user.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Admin
                </Link>
              )}
              <Link
                to="/cart"
                className="text-gray-700 hover:text-gray-900"
              >
                Cart
              </Link>
            </>
          ) : (
            <Link to="/auth/login" className="text-gray-700 hover:text-gray-900">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;