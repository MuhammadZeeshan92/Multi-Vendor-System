import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products = [], hideVendor = false }) => {
  if (!products.length) {
    return (
      <div className="card p-6 text-center">
        <p className="text-sm font-semibold text-gray-900">No products found</p>
        <p className="text-sm text-gray-600 mt-1">
          Try adjusting your search, filters, or price range.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} {...product} hideVendor={hideVendor} />
      ))}
    </div>
  );
};

export default ProductGrid;

