import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Spinner from './Spinner';

const MoreFromSellerCarousel = ({ vendorId, currentProductId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!vendorId) return;
    let mounted = true;

    const load = async () => {
      try {
        const res = await api.get(`/vendors/${vendorId}/products`, {
          params: { limit: 8 },
        });
        if (!mounted) return;
        let data = Array.isArray(res.data) ? res.data : res.data.products || [];
        if (currentProductId) {
          data = data.filter((p) => p._id !== currentProductId);
        }
        setItems(data);
      } catch (e) {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [vendorId, currentProductId]);

  if (!vendorId) return null;

  if (loading) {
    return (
      <div className="py-4">
        <Spinner />
      </div>
    );
  }

  if (!items.length) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">More from this seller</h2>
        <span className="text-xs text-gray-500">Recommended</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
        {items.map((p) => (
          <Link
            key={p._id}
            to={`/products/${p._id}`}
            className="min-w-[220px] max-w-[220px] card snap-start hover:no-underline group"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50">
              <img
                src={p.images?.[0]}
                alt={p.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="p-3 space-y-1">
              <p className="text-sm font-semibold text-gray-900 line-clamp-1">{p.name}</p>
              <p className="text-sm font-semibold text-gray-900">
                {typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : p.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MoreFromSellerCarousel;

