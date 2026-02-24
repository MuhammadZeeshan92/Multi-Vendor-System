import React from 'react';
import ProductList from './products/ProductList';

const Home = () => (
  <div className="container mx-auto py-12">
    <section className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Marketplace</h1>
      <p className="text-lg text-gray-700">
        Discover products from multiple vendors all in one place.
      </p>
    </section>

    {/* embed product list here for quick browsing */}
    <ProductList />
  </div>
);

export default Home;