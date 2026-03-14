// Frontend/src/pages/buyers/FollowedVendors.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBuyerData, unfollowVendor } from '../../features/buyers/buyerSlice';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import api from '../../utils/api';

const FollowedVendors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(s => s.auth.user);
  const buyersStatus = useSelector(s => s.buyers.status);
  const followedIds = useSelector(s => s.buyers.followed);

  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  // categories computed from whatever vendors we currently have
  const categories = ['All'];

  // ensure we have buyer data (stats + followed list)
  useEffect(() => {
    if (user?.role === 'buyer') {
      dispatch(fetchBuyerData());
    } else {
      navigate('/auth/login');
    }
  }, [user, dispatch, navigate]);

  // whenever followedIds change, fetch the vendor objects
  useEffect(() => {
    if (!followedIds?.length) {
      setVendors([]);
      return;
    }
    (async () => {
      try {
        const responses = await Promise.all(
          followedIds.map(id => api.get(`/vendors/${id}`))
        );
        setVendors(responses.map(r => r.data));
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      }
    })();
  }, [followedIds]);

  const handleUnfollow = async id => {
    try {
      await dispatch(unfollowVendor(id)).unwrap();
      // state.buyers.followed is updated; effect above will refetch vendors
    } catch (err) {
      alert(err.response?.data?.message || 'Unfollow failed');
    }
  };

  if (buyersStatus === 'loading') {
    return <div className="py-20"><Spinner /></div>;
  }
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!vendors.length) {
    return <p className="text-center text-gray-500 py-10">
      You are not following any vendors.
    </p>;
  }

  const filtered = vendors.filter(v => {
    const matchCat = cat === 'All' || v.category === cat;
    const matchSearch =
      v.storeName.toLowerCase().includes(search.toLowerCase()) ||
      (v.category || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 500,
                    letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
          Buyer
        </p>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 600, color: '#111827', margin: 0 }}>
          Followed Vendors
        </h1>
        <p style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: 4 }}>
          You follow {filtered.length} vendor{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 22, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search vendors..."
          style={{
            padding: '8px 14px', borderRadius: 8, border: '1px solid #e5e7eb',
            fontSize: '0.8rem', color: '#111827', outline: 'none',
            fontFamily: 'inherit', width: 220
          }}
        />
        <div style={{ display: 'flex', gap: 4 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500,
              background: cat === c ? '#6d4aff' : '#fff',
              color: cat === c ? '#fff' : '#6b7280',
              border: cat === c ? 'none' : '1px solid #e5e7eb',
              transition: 'all 0.15s',
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Vendor grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.map(v => (
          <div key={v._id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #f0f0f5',
                                     boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            {/* Card header */}
            <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
                          padding: '20px 20px 16px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.5rem', boxShadow: '0 2px 8px rgba(109,74,255,0.15)' }}>
                    {v.logo ? <img src={v.logo} alt="" className="w-full h-full rounded"/> : v.storeName[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111827' }}>
                      {v.storeName}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#6d4aff', fontWeight: 500 }}>
                      {v.user?.name}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleUnfollow(v._id)}
                  style={{
                    padding: '5px 12px', borderRadius: 8, border: '1px solid #ddd6fe',
                    background: '#f5f3ff', color: '#6d4aff',
                    fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0
                  }}
                >
                  Unfollow ×
                </button>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '12px 0 0', lineHeight: 1.5 }}>
                {v.bio}
              </p>
            </div>

            {/* Card body */}
            <div style={{ padding: '14px 20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
                {[
                  { label: 'Rating', value: `★ ${v.rating}` },
                  { label: 'Products', value: v.totalProducts },
                  { label: 'Reviews', value: v.totalReviews },
                ].map(m => (
                  <div key={m.label} style={{ background: '#fafafa', borderRadius: 8,
                                              padding: '8px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827' }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#9ca3af', marginTop: 1 }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            fontSize: '0.75rem', color: '#6b7280' }}>
                <span>📍 {v.location || '—'}</span>
                <span style={{ color: '#9ca3af' }}>Following since {v.since || '—'}</span>
              </div>

              {v.orders > 0 && (
                <div style={{ marginTop: 12, padding: '8px 12px', background: '#f5f3ff',
                              borderRadius: 8, display: 'flex', justifyContent: 'space-between',
                              alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: '#6d4aff', fontWeight: 500 }}>
                    {v.orders} order{v.orders > 1 ? 's' : ''} from this vendor
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6d4aff' }}>
                    {v.totalSpent}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af', fontSize: '0.85rem' }}>
          No vendors found.
        </div>
      )}
    </div>
  );
};

export default FollowedVendors;