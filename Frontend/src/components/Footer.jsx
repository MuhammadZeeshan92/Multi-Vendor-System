import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => (
  <footer className="mt-12 border-t border-gray-100 bg-white">
    <div className="container py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-gray-100">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Marketplace Logo" className="h-9 w-auto rounded-xl" />
            <span className="font-semibold text-gray-900 tracking-tight">
              Marketplace
            </span>
          </Link>
          <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
            Shop curated collections from verified independent vendors worldwide.
          </p>
          <div className="space-y-2 text-xs text-gray-500">
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Secure Stripe checkout
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Cookie‑based authentication
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Role‑based access for vendors &amp; admins
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
            Shop
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/products" className="hover:text-gray-900 transition-colors">All Products</Link></li>
            <li><Link to="/products" className="hover:text-gray-900 transition-colors">Top‑rated</Link></li>
            <li><Link to="/products" className="hover:text-gray-900 transition-colors">New Arrivals</Link></li>
            <li><Link to="/products" className="hover:text-gray-900 transition-colors">Categories</Link></li>
            <li><Link to="/cart" className="hover:text-gray-900 transition-colors">Cart</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
            Vendors
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/vendors" className="hover:text-gray-900 transition-colors">Browse Vendors</Link></li>
            <li><Link to="/auth/register" className="hover:text-gray-900 transition-colors">Become a Vendor</Link></li>
            <li><Link to="/vendor/dashboard" className="hover:text-gray-900 transition-colors">Vendor Dashboard</Link></li>
            <li><Link to="/" className="hover:text-gray-900 transition-colors">Commission Info</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
            Company
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-gray-900 transition-colors">About</Link></li>
            <li><Link to="/" className="hover:text-gray-900 transition-colors">Support</Link></li>
            <li><Link to="/" className="hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-gray-900 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Marketplace. All rights reserved.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-gray-500">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          Payments secured by Stripe
        </div>
        <div className="flex gap-4 text-xs text-gray-500">
          <Link to="/" className="hover:text-gray-900 transition-colors">Privacy</Link>
          <Link to="/" className="hover:text-gray-900 transition-colors">Terms</Link>
          <Link to="/" className="hover:text-gray-900 transition-colors">Cookies</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;