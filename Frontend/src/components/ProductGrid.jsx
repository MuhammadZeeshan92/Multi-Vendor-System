import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products = [], hideVendor = false }) => {
  if (!products.length) {
    return <p className="text-gray-600">No products to show.</p>;
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

