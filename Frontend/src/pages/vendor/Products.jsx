import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">My Products</h1>
        <Link to="/vendor/add" className="btn btn-primary">Add Product</Link>
      </div>

      {loading && <div>Loading products...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length === 0 && <div>No products yet.</div>}
          {products.map((product) => (
            <div key={product._id} className="border rounded p-3">
              <div className="h-40 flex items-center justify-center bg-gray-100 mb-3">
                {product.images && product.images[0] ? (
                  <img src={product.images[0]} alt={product.name} className="max-h-40 object-contain" />
                ) : (
                  <div className="text-gray-500">No image</div>
                )}
              </div>
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description?.slice(0, 120)}</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="font-bold">${product.price}</div>
                <div className="flex gap-2">
                  <Link to={`/vendor/products/${product._id}/edit`} className="text-blue-600">Edit</Link>
                  <button onClick={() => handleDelete(product._id)} className="text-red-600">Delete</button>
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