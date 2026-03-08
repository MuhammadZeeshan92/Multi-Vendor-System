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

  let totalVendors = followedIds?.length || 0;
  const stats = [
    {
      label: 'Total Orders',
      value: user.buyer.stats?.totalOrders,
      sub: '3 in progress',
      icon: '🛍️',
      color: '#6d4aff'
    },
    {
      label: 'Total Spent',
      value: user.buyer.stats?.totalSpent,
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

  const recentOrders = [
    { id: '#ORD-1045', product: 'Handmade Ceramic Mug', vendor: 'Clay & Co.', date: 'May 28, 2025', status: 'Delivered', amount: '$34.00', img: '🫙' },
    { id: '#ORD-1044', product: 'Organic Lavender Soap', vendor: 'Pure Roots', date: 'May 24, 2025', status: 'Shipped', amount: '$18.50', img: '🧼' },
    { id: '#ORD-1043', product: 'Linen Tote Bag', vendor: 'ThreadWorks', date: 'May 19, 2025', status: 'Processing', amount: '$52.00', img: '👜' },
  ];

  const statusStyle = {
    Delivered:  { bg: '#dcfce7', color: '#15803d' },
    Shipped:    { bg: '#dbeafe', color: '#1d4ed8' },
    Processing: { bg: '#fef9c3', color: '#a16207' },
    Cancelled:  { bg: '#fee2e2', color: '#b91c1c' },
  };
  
 return (
  <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

    {/* Header */}
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
        Welcome back 👋
      </p>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 600, color: '#111827', margin: 0 }}>{user.name}</h1>
    </div>

    {/* Stat cards */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
      {stats.map(s => (
        <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', border: '1px solid #f0f0f5', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, display: 'block' }} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 600, color: '#111827', lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#6b7280' }}>{s.label}</div>
          <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: 2 }}>{s.sub}</div>
        </div>
      ))}
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
      {/* Recent Orders */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #f0f0f5', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid #f5f5fa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827', margin: 0 }}>Recent Orders</h2>
          <Link to="/buyer/orders" style={{ fontSize: '0.75rem', color: '#6d4aff', textDecoration: 'none', fontWeight: 500 }}>View all →</Link>
        </div>
        <div>
          {recentOrders.map((o, i) => (
            <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', borderBottom: i < recentOrders.length - 1 ? '1px solid #f9f9fc' : 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                {o.img}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.product}</div>
                <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{o.vendor} · {o.date}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111827' }}>{o.amount}</div>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: statusStyle[o.status]?.bg, color: statusStyle[o.status]?.color }}>
                  {o.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Followed Vendors */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #f0f0f5', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid #f5f3fa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827', margin: 0 }}>Followed Vendors</h2>
            <Link to="/buyer/vendors" style={{ fontSize: '0.75rem', color: '#6d4aff', textDecoration: 'none', fontWeight: 500 }}>See all →</Link>
          </div>
          <div>
            {vendorError && (
              <div className="text-red-500 p-4">{vendorError}</div>
            )}
            {followedVendors.map((v, i) => (
              <div key={v._id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 22px', borderBottom: i < followedVendors.length - 1 ? '1px solid #f9f9fc' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                  {v.logo ? <img src={v.logo} alt="" className="w-full h-full rounded"/> : v.storeName[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111827' }}>{v.storeName}</div>
                  <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{v.user?.name}</div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600 }}>★ {v.rating ?? 0}</div>
              </div>
            ))}
          </div>
        </div>
    </div>

    {/* Quick actions */}
    <div style={{ marginTop: 20, background: 'linear-gradient(135deg, #6d4aff 0%, #a78bfa 100%)', borderRadius: 14, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 4 }}>Discover new products</div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)' }}>Browse 500+ curated items from verified vendors</div>
      </div>
      <Link to="/products" style={{ background: '#fff', color: '#6d4aff', borderRadius: 8, padding: '10px 22px', fontWeight: 600, fontSize: '0.82rem', textDecoration: 'none', flexShrink: 0 }}>
        Shop Now →
      </Link>
    </div>
  </div>
  );
};

export default Dashboard;