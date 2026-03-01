import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1 space-y-4">
        <p className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-medium">
          Multi‑vendor marketplace
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
          Discover unique products from{' '}
          <span className="text-indigo-600">independent vendors</span>.
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-xl">
          Shop curated collections, compare sellers, and support verified vendors in one
          modern marketplace experience.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/products"
            className="bg-indigo-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-indigo-700 transition duration-200"
          >
            Shop Products
          </Link>
          <Link
            to="/auth/register"
            className="bg-white border border-gray-200 text-gray-800 rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition duration-200"
          >
            Become a Vendor
          </Link>
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-gray-500 pt-2">
          <span>Secure Stripe checkout</span>
          <span>Cookie‑based authentication</span>
          <span>Role‑based access for vendors &amp; admins</span>
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="relative rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 text-white p-6 md:p-8 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#ffffff_0,_transparent_60%)]" />
          <div className="relative space-y-4">
            <p className="text-sm font-medium uppercase tracking-wide">Trusted Sellers</p>
            <p className="text-3xl font-semibold">+100</p>
            <p className="text-sm text-indigo-100 max-w-xs">
              Real‑time vendor dashboards, commission reporting, and multi‑vendor cart
              checkout out of the box.
            </p>
            <div className="grid grid-cols-3 gap-3 text-xs mt-4">
              <div className="bg-white/10 rounded-lg px-3 py-2">
                <p className="font-semibold">Top‑rated</p>
                <p className="text-indigo-100">4.8 / 5 avg rating</p>
              </div>
              <div className="bg-white/10 rounded-lg px-3 py-2">
                <p className="font-semibold">Vendors</p>
                <p className="text-indigo-100">Verified &amp; managed</p>
              </div>
              <div className="bg-white/10 rounded-lg px-3 py-2">
                <p className="font-semibold">Payouts</p>
                <p className="text-indigo-100">Commission ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

