import React from 'react';
import { useSelector } from 'react-redux';

const VendorProfileCard = ({ vendor }) => {
  const user = useSelector((state) => state.auth.user);
  // const isFollowing = user?.following.includes(vendor._id);

  if (!vendor) return null;

  return (
    <section className="relative w-full rounded-2xl overflow-hidden shadow-md">
      {/* Banner */}
      <div className="h-40 w-full bg-gray-200">
        {vendor.banner ? (
          <img
            src={vendor.banner}
            alt="Vendor Banner"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 text-xl">
            No Banner
          </div>
        )}
      </div>

      {/* Overlay info box */}
      <div className="absolute inset-0 flex items-end p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 w-full md:w-auto">
          {/* Logo */}
          <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden flex-shrink-0 border-4 border-white">
            {vendor.logo ? (
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <span className="text-indigo-600 font-semibold text-2xl">
                {vendor.name?.[0] || 'V'}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:gap-2 justify-center md:justify-start">
              <h1 className="text-2xl font-semibold text-gray-900">{vendor.name}</h1>
              {vendor.isActive && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                  Verified
                </span>
              )}
            </div>

            {vendor.tagline && <p className="text-gray-600 text-sm">{vendor.tagline}</p>}

            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600 mt-2">
              {typeof vendor.rating === 'number' && (
                <span>
                  ⭐ <span className="font-medium">{vendor.rating.toFixed(1)}</span> / 5
                </span>
              )}
              {vendor.totalSales != null && <span>{vendor.totalSales} sales</span>}
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
        </div>
      </div>
    </section>
  );
};

export default VendorProfileCard;

