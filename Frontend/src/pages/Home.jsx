import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../components/Hero';
import TopRatedCarousel from '../components/TopRatedCarousel';
import VendorCarousel from '../components/VendorCarousel';
import { Link } from 'react-router-dom';
import Page from '../components/Page';

const Home = () => {
  return (
    <Page className="container py-8 space-y-10">
      <Helmet>
        <title>Home — Marketplace</title>
        <meta
          name="description"
          content="Discover top‑rated products and featured vendors across multiple categories in the Marketplace."
        />
      </Helmet>
      <Hero />

      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6 min-w-0">
          <TopRatedCarousel />
          <VendorCarousel />
        </div>

        <aside className="card p-5 space-y-4 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900">Shop by category</h2>
          <p className="text-sm text-gray-600">
            Browse curated categories to quickly discover products across different vendors.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Furniture', 'Decor', 'Electronics', 'Fashion', 'Art', 'Essentials'].map((c) => (
              <Link
                key={c}
                to={`/products?category=${encodeURIComponent(c)}`}
                className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-700 hover:bg-gray-200"
              >
                {c}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-900">Are you a vendor?</p>
            <p>
              Create a storefront, manage products, and track sales with the built‑in vendor
              dashboard.
            </p>
            <Link
              to="/auth/register"
              className="inline-flex mt-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              Get started as a seller
            </Link>
          </div>
        </aside>
      </section>

      <section className="card p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Ready to explore the full catalog?
          </h2>
          <p className="text-sm text-gray-600">
            Use advanced filters, vendor chips, and pagination on the products page.
          </p>
        </div>
        <Link
          to="/products"
          className="w-full md:w-auto text-center bg-indigo-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-indigo-700 transition duration-200"
        >
          Explore all products
        </Link>
      </section>
    </Page>
  );
};

export default Home;