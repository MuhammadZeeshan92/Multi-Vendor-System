import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import EditProductModal from '../../components/EditProductModal';
import PageHero from '../../components/PageHero';
import Page from '../../components/Page';

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);

  const onProductUpdated = updated => {
    setProducts(p => p.map(x => x._id === updated._id ? updated : x));
  };

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
    return () => { mounted = false; };
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
    <div className="bg-gray-50/50 min-h-screen pb-12">
      <PageHero 
        title="My Products" 
        subtitle={
          <>
            Manage your inventory, curate your collection, and bring your best products to the marketplace.
            <br />
            <span className="text-sm opacity-80 font-medium">
              You have {products.length} products listed in your store.
            </span>
          </>
        }
        gradient="from-indigo-600 via-indigo-700 to-purple-800"
      />

      <Page className="container-mt-8 relative z-10 space-y-6">

        {loading && <div className="text-sm text-gray-500">Loading products...</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length === 0 && (
              <div className="text-sm text-gray-500 py-12 text-center bg-white rounded-2xl border border-gray-100 col-span-full">
                No products yet. Click "Add New Product" to get started!
              </div>
            )}
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all p-4 flex flex-col gap-3 group">
                <div className="h-48 relative bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
                  {product.images && product.images.length > 0 ? (
                    <>
                      <img
                        src={product.images[currentImageIndex[product._id] || 0]}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />

                      {product.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentImageIndex(prev => ({
                                ...prev,
                                [product._id]: (prev[product._id] || 0) - 1 < 0
                                  ? product.images.length - 1
                                  : (prev[product._id] || 0) - 1
                              }))
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-md rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-white z-10 transition-all opacity-0 group-hover:opacity-100"
                          >
                            ‹
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentImageIndex(prev => ({
                                ...prev,
                                [product._id]: ((prev[product._id] || 0) + 1) % product.images.length
                              }))
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-md rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-white z-10 transition-all opacity-0 group-hover:opacity-100"
                          >
                            ›
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                            {product.images.map((_, idx) => (
                              <span
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${currentImageIndex[product._id] === idx ? 'bg-indigo-600 w-3' : 'bg-gray-300'}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="text-gray-400 text-sm flex flex-col items-center gap-2">
                      <span className="text-3xl">📦</span>
                      No image
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <h2 className="font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                  <div className="text-lg font-black text-gray-900">${product.price}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit Product"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Page>
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSaved={onProductUpdated}
        />
      )}
    </div>
  );
};

export default VendorProducts;