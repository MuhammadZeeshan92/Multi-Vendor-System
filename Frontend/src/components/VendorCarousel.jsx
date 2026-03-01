import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPublicVendors } from '../features/vendors/vendorSlice';
import Spinner from './Spinner';

const VendorCarousel = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.vendors);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPublicVendors({ featured: true, limit: 12 }));
    }
  }, [dispatch, status]);

  if (status === 'loading' && !list.length) {
    return (
      <div className="py-4">
        <Spinner />
      </div>
    );
  }

  if (!list.length) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Featured vendors</h2>
        <Link
          to="/vendors"
          className="text-xs text-indigo-600 font-medium hover:text-indigo-700"
        >
          Browse all
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {list.map((v) => (
          <Link
            key={v._id}
            to={`/vendors/${v._id}`}
            className="min-w-[220px] max-w-[220px] card p-4 flex items-center gap-3 hover:no-underline"
          >
            <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden">
              {v.logo ? (
                <img
                  src={v.logo}
                  alt={v.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm font-semibold text-indigo-600">
                  {v.name?.[0] || 'V'}
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 line-clamp-1">{v.name}</p>
              {typeof v.rating === 'number' && (
                <p className="text-xs text-gray-500">
                  ⭐ {v.rating.toFixed(1)} / 5
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default VendorCarousel;

