// Frontend/src/pages/buyers/Orders.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyOrders } from '../../features/orders/orderSlice';
import Spinner from '../../components/Spinner';

const statusStyle = {
  Delivered:  { bg: '#dcfce7', color: '#15803d' },
  Shipped:    { bg: '#dbeafe', color: '#1d4ed8' },
  Processing: { bg: '#fef9c3', color: '#a16207' },
  Cancelled:  { bg: '#fee2e2', color: '#b91c1c' },
};

const tabs = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const Orders = () => {
  const dispatch = useDispatch();
  const { myOrders = [], status } = useSelector(state => state.orders);

  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  // safe helpers for filtering/rendering
  const extractProduct = o => o.orderItems?.[0]?.name || '';
  const extractVendor = o => {
    const v = o.orderItems?.[0]?.vendor;
    // vendor is just an ObjectId at the moment; you could populate it if you
    // want a real name
    return v ? v.toString() : '';
  };
  const extractAmount = o => o.totalAmount ?? 0;

  const filtered = myOrders.filter(o => {
    const prod = extractProduct(o).toLowerCase();
    const vend = extractVendor(o).toLowerCase();
    const id   = (o._id || '').toLowerCase();
    const matchTab = activeTab === 'All' || o.status === activeTab;
    const matchSearch =
      prod.includes(search.toLowerCase()) ||
      vend.includes(search.toLowerCase()) ||
      id.includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  if (status === 'loading') {
    return <div className="py-20"><Spinner /></div>;
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      <div style={{ marginBottom: 24 }}>
        <p style={{
          fontSize: '0.78rem', color: '#9ca3af', fontWeight: 500,
          letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4
        }}>Buyer</p>
        <h1 style={{
          fontSize: '1.6rem', fontWeight: 600, color: '#111827', margin: 0
        }}>My Orders</h1>
      </div>

      {/* Summary pills */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Orders', value: myOrders.length, color: '#6d4aff' },
          { label: 'Delivered',
            value: myOrders.filter(o => o.status === 'Delivered').length,
            color: '#10b981' },
          { label: 'In Transit',
            value: myOrders.filter(o => o.status === 'Shipped').length,
            color: '#0ea5e9' },
          { label: 'Processing',
            value: myOrders.filter(o => o.status === 'Processing').length,
            color: '#f59e0b' },
        ].map(p => (
          <div key={p.label} style={{
            background: '#fff', border: '1px solid #f0f5f5',
            borderRadius: 10, padding: '10px 18px', display: 'flex',
            alignItems: 'center', gap: 10
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: p.color,
              display: 'block', flexShrink: 0
            }}/>
            <span style={{
              fontSize: '0.8rem', color: '#6b7280', fontWeight: 500
            }}>{p.label}</span>
            <span style={{
              fontSize: '0.9rem', fontWeight: 700, color: '#111827'
            }}>{p.value}</span>
          </div>
        ))}
      </div>

      <div style={{
        background: '#fff', borderRadius: 14, border: '1px solid #f0f0f5',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden'
      }}>
        {/* Filters */}
        <div style={{
          padding: '16px 22px', borderBottom: '1px solid #f5f5fa',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                padding: '6px 14px', borderRadius: 8, border: 'none',
                cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500,
                background: activeTab === t ? '#6d4aff' : 'transparent',
                color: activeTab === t ? '#fff' : '#6b7280',
                transition: 'all 0.15s',
              }}>{t}</button>
            ))}
          </div>
          {/* Search */}
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search orders..."
            style={{
              padding: '7px 14px', borderRadius: 8,
              border: '1px solid #e5e7eb',
              fontSize: '0.8rem', color: '#111827', outline: 'none',
              width: 200, fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.2fr 1fr 1fr 0.8fr 0.6fr',
          gap: 12, padding: '10px 22px', background: '#fafafa',
          borderBottom: '1px solid #f0f0f5'
        }}>
          {['Product', 'Vendor', 'Date', 'Status', 'Amount', ''].map(h => (
            <span key={h} style={{
              fontSize: '0.68rem', fontWeight: 600, color: '#9ca3af',
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div style={{
            padding: 40, textAlign: 'center', color: '#9ca3af',
            fontSize: '0.85rem'
          }}>No orders found.</div>
        ) : filtered.map((o, i) => (
          <div key={o._id} style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1.2fr 1fr 1fr 0.8fr 0.6fr',
            gap: 12, padding: '14px 22px',
            borderBottom: i < filtered.length - 1 ? '1px solid #f9f9fc' : 'none',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9, background: '#f5f3ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', flexShrink: 0
              }}>{extractProduct(o)[0]}</div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111827' }}>
                  {extractProduct(o)}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                  {o._id} · qty {o.orderItems?.[0]?.quantity || 0}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
              {extractVendor(o)}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
              {new Date(o.createdAt).toLocaleDateString()}
            </div>
            <div>
              <span style={{
                fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px',
                borderRadius: 20, background: statusStyle[o.status]?.bg,
                color: statusStyle[o.status]?.color
              }}>
                {o.status}
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827' }}>
              ${extractAmount(o).toFixed(2)}
            </div>
            <div>
              {o.status === 'Delivered' && (
                <button style={{
                  fontSize: '0.7rem', fontWeight: 600, color: '#6d4aff',
                  background: '#f5f3ff', border: 'none', borderRadius: 6,
                  padding: '4px 10px', cursor: 'pointer'
                }}>
                  Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;