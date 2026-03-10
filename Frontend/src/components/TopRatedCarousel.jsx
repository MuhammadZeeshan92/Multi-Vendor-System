import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Spinner from './Spinner';

const TopRatedCarousel = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await api.get('/products/top-rated', { params: { limit: 8 } });
        if (!mounted) return;
        const data = Array.isArray(res.data) ? res.data : res.data.products || [];
        setItems(data);
      } catch (e) {
        // silently fail to keep landing resilient
        console.log(e);
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

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
        <h2 className="text-lg font-semibold text-gray-900">Top‑rated products</h2>
        <Link
          to="/products"
          className="text-xs text-indigo-600 font-medium hover:text-indigo-700"
        >
          View all
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((p) => (
          <Link
            key={p._id}
            to={`/products/${p._id}`}
            className="min-w-[220px] max-w-[220px] card"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={p.images?.[0]}
                alt={p.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3 space-y-1">
              <p className="text-sm font-medium text-gray-900 line-clamp-1">{p.name}</p>
              {typeof p.rating === 'number' && (
                <p className="text-xs text-gray-500">
                  ⭐ {p.rating.toFixed(1)} · {p.numReviews || 0} reviews
                </p>
              )}
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

export default TopRatedCarousel;

