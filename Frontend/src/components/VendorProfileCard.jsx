import React from 'react';
import { useSelector } from 'react-redux';

const VendorProfileCard = ({ vendor }) => {
  const user = useSelector((state) => state.auth.user);
  // const isFollowing = user?.following.includes(vendor._id);

  if (!vendor) return null;

  return (
    <section className="card p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
      <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden">
        {vendor.logo ? (
          <img
            src={vendor.logo}
            alt={vendor.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-indigo-600 font-semibold text-2xl">
            {vendor.name?.[0] || 'V'}
          </span>
        )}
      </div>

      <div className="flex-1 space-y-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center md:gap-2 justify-center md:justify-start">
          <h1 className="text-2xl font-semibold text-gray-900">{vendor.name}</h1>
          {vendor.isActive && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
              Verified
            </span>
          )}
        </div>

        {vendor.tagline && (
          <p className="text-gray-600 text-sm">{vendor.tagline}</p>
        )}

        <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600 mt-2">
          {typeof vendor.rating === 'number' && (
            <span>
              ⭐ <span className="font-medium">{vendor.rating.toFixed(1)}</span> / 5
            </span>
          )}
          {vendor.totalSales != null && (
            <span>{vendor.totalSales} sales</span>
          )}
          {vendor.location && <span>{vendor.location}</span>}
        </div>

        <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
          <button
            type="button"
            className="bg-indigo-600 text-white rounded-lg px-4 py-1.5 text-sm font-medium hover:bg-indigo-700 transition duration-200"
          >
            {user?.role === 'buyer' ? 'Follow Store' : 'View Store'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default VendorProfileCard;

