import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBuyerData } from '../../features/buyers/buyerSlice';
import api from '../../utils/api';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const buyersStatus = useSelector(state => state.buyers.status);
  const followedIds = useSelector(state => state.buyers.followed);

  const [followedVendors, setFollowedVendors] = useState([]);
  const [vendorError, setVendorError] = useState(null);
  // load stats/followedIds
  useEffect(() => {
    if (user?.role === 'buyer') {
      dispatch(fetchBuyerData());
    }
  }, [user, dispatch]);

  // fetch vendor objects whenever the id list changes
  useEffect(() => {
    if (!followedIds?.length) {
      setFollowedVendors([]);
      return;
    }
    (async () => {
      try {
        const responses = await Promise.all(
          followedIds.map(id => api.get(`/vendors/${id}`))
        );
        setFollowedVendors(responses.map(r => r.data));
      } catch (err) {
        console.error(err);
        setVendorError(err.response?.data?.message || err.message);
      }
    })();
  }, [followedIds]);

  // stats come from the buyer slice rather than the user object
  let totalVendors = followedIds?.length || 0;
  const statsFromSlice = useSelector(state => state.buyers.stats) || {};

  const stats = [
    {
      label: 'Total Orders',
      value: statsFromSlice.totalOrders,
      sub: '3 in progress',
      icon: '🛍️',
      color: '#6d4aff'
    },
    {
      label: 'Total Spent',
      value: statsFromSlice.totalSpent,
      sub: 'Lifetime purchases',
      icon: '💳',
      color: '#0ea5e9'
    },
    {
      label: 'Followed Vendors',
      value: totalVendors,
      sub: '2 new this month',
      icon: '🏪',
      color: '#10b981'
    }
  ];

  // use real recent orders from slice as well
  const recentOrders = statsFromSlice.recent || [];


  const statusStyle = {
    Delivered:  { bg: '#dcfce7', color: '#15803d' },
    Shipped:    { bg: '#dbeafe', color: '#1d4ed8' },
    Processing: { bg: '#fef9c3', color: '#a16207' },
    Cancelled:  { bg: '#fee2e2', color: '#b91c1c' },
  };
  
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="mb-7">
        <p className="text-[0.78rem] text-gray-400 font-medium tracking-[0.06em] uppercase mb-1">
          Welcome back 👋
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: s.color }}
              />
            </div>
            <div className="text-2xl font-bold text-gray-900 leading-none mb-1">
              {s.value}
            </div>
            <div className="text-[0.75rem] font-medium text-gray-500">
              {s.label}
            </div>
            <div className="text-[0.7rem] text-gray-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-w-0">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">
              Recent Orders
            </h2>
            <Link
              to="/buyer/orders"
              className="text-[0.75rem] text-indigo-600 font-medium hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.length > 0 ? (
              recentOrders.map((o) => {
                const item = o.orderItems?.[0] || {};
                const prodName = item.name || 'Product';
                const vendId = item.vendor || 'Vendor';
                const dateStr = o.createdAt
                  ? new Date(o.createdAt).toLocaleDateString()
                  : '';
                const amt = `$${(o.totalAmount ?? 0).toFixed(2)}`;
                const img = prodName.charAt(0) || '🛒';

                return (
                  <div
                    key={o._id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-5 py-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl shrink-0">
                      {img}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[0.82rem] font-semibold text-gray-900 truncate">
                        {prodName}
                      </div>
                      <div className="text-[0.72rem] text-gray-400">
                        {vendId} · {dateStr}
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                      <div className="text-[0.82rem] font-bold text-gray-900">
                        {amt}
                      </div>
                      <span
                        className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: statusStyle[o.status]?.bg,
                          color: statusStyle[o.status]?.color,
                        }}
                      >
                        {o.status}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-sm text-gray-400">
                No recent orders found.
              </div>
            )}
          </div>
        </div>

        {/* Followed Vendors */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-w-0">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">
              Followed Vendors
            </h2>
            <Link
              to="/buyer/vendors"
              className="text-[0.75rem] text-indigo-600 font-medium hover:underline"
            >
              See all →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {vendorError && (
              <div className="text-red-500 p-4 text-xs">{vendorError}</div>
            )}
            {followedVendors.length > 0 ? (
              followedVendors.map((v) => (
                <div
                  key={v._id}
                  className="flex items-center gap-3 px-5 py-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-lg shrink-0">
                    {v.logo ? (
                      <img
                        src={v.logo}
                        alt=""
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      v.storeName?.[0] || 'V'
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.82rem] font-semibold text-gray-900 truncate">
                      {v.storeName}
                    </div>
                    <div className="text-[0.7rem] text-gray-400 truncate">
                      {v.user?.name}
                    </div>
                  </div>
                  <div className="text-[0.75rem] text-amber-500 font-bold shrink-0">
                    ★ {v.rating ?? 0}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-gray-400">
                Not following any vendors yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left transition-all hover:shadow-lg hover:shadow-indigo-500/10">
        <div className="flex-1">
          <div className="text-base sm:text-lg font-bold text-white mb-1">
            Discover new products
          </div>
          <div className="text-[0.8rem] text-indigo-100 opacity-90">
            Browse 500+ curated items from verified vendors across the
            marketplace.
          </div>
        </div>
        <Link
          to="/products"
          className="bg-white text-indigo-600 rounded-xl px-7 py-3 font-bold text-[0.82rem] hover:bg-indigo-50 transition-colors shadow-sm shrink-0 w-full sm:w-auto text-center"
        >
          Shop Now →
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;