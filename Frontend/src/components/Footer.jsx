import React from 'react';

const Footer = () => (
  <footer className="mt-12 border-t border-gray-100 bg-white">
    <div className="container py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-gray-100">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
              M
            </span>
            <span className="font-semibold text-gray-900 tracking-tight">
              Marketplace
            </span>
          </div>
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
            <li><a href="#" className="hover:text-gray-900 hover:no-underline">All Products</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:no-underline">Top‑rated</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:no-underline">New Arrivals</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:no-underline">Categories</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:no-underline">Cart</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
            Vendors
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-gray-900 hover:no-underline">Browse Vendors</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:no-underline">Become a Vendor</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:no-underline">Vendor Dashboard</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:no-underline">Commission Info</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
            Company
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-gray-900 hover:no-underline">About</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:no-underline">Support</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:no-underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:no-underline">Terms of Service</a></li>
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
          <a href="#" className="hover:text-gray-900 hover:no-underline">Privacy</a>
          <a href="#" className="hover:text-gray-900 hover:no-underline">Terms</a>
          <a href="#" className="hover:text-gray-900 hover:no-underline">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;