import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBuyerData } from '../features/buyers/buyerSlice';
import { followVendor, unfollowVendor } from '../features/buyers/buyerSlice';
import ChatButton from './ChatButton';

const VendorProfileCard = ({ vendor }) => {
  const user = useSelector((state) => state.auth.user);
  const status = useSelector(state => state.buyers.status);
  const followed = useSelector((state) => state.buyers?.followed || []);
  const dispatch = useDispatch();

  // make sure we have the buyer’s data (stats + followed list)
  useEffect(() => {
    if (user?.role === 'buyer' && followed.length === 0) {
      dispatch(fetchBuyerData());
    }
  }, [user, dispatch, followed.length]);

  const isFollowing = Boolean(vendor && followed.includes(vendor._id));
  const isWorking = status === 'loading';
  const handleButton = () => {

    if (!user) return; // or navigate('/auth/login') if you want
    if (user.role !== 'buyer') return;

    if (isFollowing) {
      dispatch(unfollowVendor(vendor._id));
    } else {
      dispatch(followVendor(vendor._id));
    }
  };
  // const isFollowing = user?.following.includes(vendor._id);

  if (!vendor) return null;

  return (
    <section className="relative w-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Banner */}
      <div className="h-44 md:h-52 w-full bg-gradient-to-r from-indigo-100 via-purple-100 to-emerald-100 relative">
        {vendor.banner ? (
          <img
            src={vendor.banner}
            alt="Vendor Banner"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-500 text-sm font-medium">
            Vendor banner
          </div>
        )}
        {/* subtle overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />
      </div>

      {/* Overlay info box */}
      <div className="absolute inset-0 flex items-end p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-5 w-full md:w-auto border border-white/50 shadow-sm">
          {/* Logo */}
          <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-white flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
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
          <div className="flex-1 space-y-1 text-center md:text-left min-w-0">
            <div className="flex flex-col md:flex-row md:items-center md:gap-2 justify-center md:justify-start">
              <h1 className="text-2xl font-semibold text-gray-900 truncate">{vendor.name}</h1>
              {vendor?.user?.isActive && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Verified
                </span>
              )}
            </div>

            {vendor.tagline && (
              <p className="text-gray-600 text-sm line-clamp-2">{vendor.tagline}</p>
            )}

            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-start text-sm text-gray-600 mt-2">
              {typeof vendor.rating === 'number' && (
                <span>
                  ⭐ <span className="font-medium">{vendor.rating.toFixed(1)}</span> / 5
                </span>
              )}
              {vendor.totalOrders != null && <span>{vendor.totalOrders} Orders</span>}
              {vendor.location && <span>{vendor.location}</span>}
            </div>

            <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
              <button
                type="button"
                disabled={isWorking}
                onClick={handleButton}
                className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  isWorking ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.99]'
                } bg-indigo-600 text-white hover:bg-indigo-700`}
              >
                {user?.role === 'buyer'
                  ? (isFollowing ? 'Unfollow' : 'Follow Store')
                  : 'View Store'}
              </button>

              {user?.role === 'buyer' && (
                <ChatButton vendorId={vendor._id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorProfileCard;