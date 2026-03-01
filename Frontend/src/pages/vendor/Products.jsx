import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get('/products/vendor');
        if (!mounted) return;
        setProducts(res.data || []);
      } catch (err) {
        console.error('Failed to load vendor products', err);
        setError(err.response?.data?.message || err.message || 'Failed to load products');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Products</h1>
          <p className="text-sm text-gray-600">
            Manage the products available on your storefront.
          </p>
        </div>
        <Link
          to="/vendor/add"
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-indigo-700"
        >
          Add Product
        </Link>
      </div>

      {loading && <div className="text-sm text-gray-500">Loading products...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length === 0 && (
            <div className="text-sm text-gray-500">No products yet.</div>
          )}
          {products.map((product) => (
            <div key={product._id} className="card p-3 flex flex-col gap-2">
              <div className="h-40 relative bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                  <>
                    <img
                      src={product.images[currentImageIndex[product._id] || 0]}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />

                    {product.images.length > 1 && (
                      <>
                        {/* Prev button */}
                        <button
                          onClick={() => setCurrentImageIndex(prev => ({
                            ...prev,
                            [product._id]: (prev[product._id] || 0) - 1 < 0
                              ? product.images.length - 1
                              : (prev[product._id] || 0) - 1
                          }))}
                          className="absolute left-1 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-gray-300 z-10"
                        >
                          ‹
                        </button>

                        {/* Next button */}
                        <button
                          onClick={() => setCurrentImageIndex(prev => ({
                            ...prev,
                            [product._id]: ((prev[product._id] || 0) + 1) % product.images.length
                          }))}
                          className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-gray-300 z-10"
                        >
                          ›
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                          {product.images.map((_, idx) => (
                            <span
                              key={idx}
                              className={`w-2 h-2 rounded-full ${currentImageIndex[product._id] === idx ? 'bg-indigo-600' : 'bg-gray-300'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-gray-400 text-sm">No image</div>
                )}
              </div>
              <h2 className="font-semibold text-sm text-gray-900 line-clamp-2">
                {product.name}
              </h2>
              <p className="text-xs text-gray-600 line-clamp-2">
                {product.description?.slice(0, 120)}
              </p>
              <div className="mt-1 flex items-center justify-between text-sm">
                <div className="font-semibold text-gray-900">${product.price}</div>
                <div className="flex gap-3">
                  <Link
                    to={`/vendor/products/${product._id}/edit`}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorProducts;