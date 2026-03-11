import React from 'react';
import { Link } from 'react-router-dom';

const VendorCardSmall = ({ vendor }) => {
  if (!vendor) return null;

  return (
    <Link
      to={`/vendors/${vendor._id}`}
      className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 hover:no-underline"
    >
      <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
        {vendor.logo ? (
          <img
            src={vendor.logo}
            alt={vendor.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xs font-semibold text-indigo-600">
            {vendor.name?.[0] || 'V'}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1">
        <span className="font-medium truncate max-w-[140px]">{vendor.name}</span>
        {vendor.isVerified && (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-semibold">
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            Verified
          </span>
        )}
      </div>
    </Link>
  );
};

export default VendorCardSmall;

