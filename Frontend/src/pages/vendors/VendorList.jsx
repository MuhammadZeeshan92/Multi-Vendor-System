import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPublicVendors } from '../../features/vendors/vendorSlice';
import Spinner from '../../components/Spinner';

const VendorList = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.vendors);

  useEffect(() => {
    dispatch(fetchPublicVendors({ featured: true, limit: 24 }));
  }, [dispatch]);

  if (status === 'loading' && !list.length) {
    return (
      <div className="container py-10">
        <Helmet>
          <title>Vendors — Marketplace</title>
        </Helmet>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Helmet>
        <title>Vendors — Marketplace</title>
        <meta
          name="description"
          content="Browse featured Marketplace vendors and open their storefronts."
        />
      </Helmet>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Featured Vendors</h1>
        <p className="text-gray-600">
          Discover trusted sellers and explore their curated storefronts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((vendor) => (
          console.log(vendor),
          <Link
            key={vendor._id}
            to={`/vendors/${vendor._id}`}
            className="card p-4 flex items-center gap-4 hover:no-underline"
          >
            <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden">
              {vendor.logo ? (
                <img
                  src={vendor.logo}
                  alt={vendor.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-indigo-600 font-semibold text-lg">
                  {vendor.name?.[0] || 'V'}
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{vendor.name}</p>
              {typeof vendor.rating === 'number' && (
                <p className="text-sm text-gray-500">Rating {vendor.rating.toFixed(1)} / 5</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VendorList;

