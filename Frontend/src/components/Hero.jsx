import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
      {/* soft background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="flex-1 space-y-4">
        <p className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-semibold">
          Multi‑vendor marketplace
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.05] tracking-tight">
          Discover unique products from{' '}
          <span className="text-indigo-600">independent vendors</span>.
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-xl leading-relaxed">
          Shop curated collections, compare sellers, and support verified vendors in one
          modern marketplace experience.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/products"
            className="bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition duration-200 shadow-sm hover:shadow"
          >
            Shop Products
          </Link>
          <Link
            to="/auth/register"
            className="bg-white border border-gray-200 text-gray-800 rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-gray-50 transition duration-200"
          >
            Become a Vendor
          </Link>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 pt-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Secure Stripe checkout
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Cookie‑based authentication
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Role‑based access
          </span>
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="relative rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 text-white p-6 md:p-8 overflow-hidden shadow-lg">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#ffffff_0,_transparent_60%)]" />
          <div className="relative space-y-4">
            <p className="text-sm font-medium uppercase tracking-wide">Trusted Sellers</p>
            <p className="text-3xl font-semibold">+100</p>
            <p className="text-sm text-indigo-100 max-w-xs">
              Real‑time vendor dashboards, commission reporting, and multi‑vendor cart
              checkout out of the box.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-4">
              <div className="bg-white/10 rounded-xl px-3 py-2 border border-white/10">
                <p className="font-semibold">Top‑rated</p>
                <p className="text-indigo-100">4.8 / 5 avg rating</p>
              </div>
              <div className="bg-white/10 rounded-xl px-3 py-2 border border-white/10">
                <p className="font-semibold">Vendors</p>
                <p className="text-indigo-100">Verified &amp; managed</p>
              </div>
              <div className="bg-white/10 rounded-xl px-3 py-2 border border-white/10">
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

