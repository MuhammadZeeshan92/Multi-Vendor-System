import React, { useState } from 'react';

const vendors = [
  { id: 1, name: 'Clay & Co.',    category: 'Ceramics',       rating: 4.9, reviews: 312, products: 48, location: 'Portland, OR',    avatar: '🏺', since: 'Mar 2024', totalSpent: '$102.00', orders: 3, bio: 'Handcrafted ceramics made with locally sourced clay. Every piece is one of a kind.' },
  { id: 2, name: 'Pure Roots',    category: 'Wellness',       rating: 4.7, reviews: 198, products: 62, location: 'Austin, TX',       avatar: '🌿', since: 'Jan 2025', totalSpent: '$40.50',  orders: 2, bio: 'Organic wellness products crafted from wild-harvested botanicals.' },
  { id: 3, name: 'ThreadWorks',   category: 'Textiles',       rating: 4.8, reviews: 256, products: 34, location: 'Brooklyn, NY',     avatar: '🧵', since: 'Nov 2024', totalSpent: '$90.00',  orders: 2, bio: 'Slow-fashion textile goods woven by hand using heritage techniques.' },
  { id: 4, name: 'Pixel Prints',  category: 'Art & Decor',    rating: 4.6, reviews: 145, products: 89, location: 'Denver, CO',       avatar: '🖼️', since: 'Feb 2025', totalSpent: '$45.00',  orders: 1, bio: 'Limited-edition art prints inspired by the natural world.' },
  { id: 5, name: 'Hive & Home',   category: 'Home Goods',     rating: 4.8, reviews: 203, products: 27, location: 'Asheville, NC',    avatar: '🕯️', since: 'Apr 2025', totalSpent: '$29.00',  orders: 1, bio: 'Beeswax candles and natural home goods for a warmer living space.' },
  { id: 6, name: 'Stone & Salt',  category: 'Jewelry',        rating: 4.9, reviews: 410, products: 73, location: 'Santa Fe, NM',     avatar: '💎', since: 'May 2025', totalSpent: '$0.00',   orders: 0, bio: 'Handmade gemstone jewelry rooted in Southwest traditions.' },
];

const categories = ['All', ...new Set(vendors.map(v => v.category))];

const FollowedVendors = () => {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [followed, setFollowed] = useState(vendors.map(v => v.id));

  const toggle = (id) => setFollowed(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  const filtered = vendors.filter(v => {
    const matchCat = cat === 'All' || v.category === cat;
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Buyer</p>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 600, color: '#111827', margin: 0 }}>Followed Vendors</h1>
        <p style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: 4 }}>You follow {followed.length} vendor{followed.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 22, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search vendors..."
          style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '0.8rem', color: '#111827', outline: 'none', fontFamily: 'inherit', width: 220 }}
        />
        <div style={{ display: 'flex', gap: 4 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500,
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
          <div key={v.id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #f0f0f5', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            {/* Card header */}
            <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', padding: '20px 20px 16px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', boxShadow: '0 2px 8px rgba(109,74,255,0.15)' }}>
                    {v.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111827' }}>{v.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#6d4aff', fontWeight: 500 }}>{v.category}</div>
                  </div>
                </div>
                <button onClick={() => toggle(v.id)} style={{
                  padding: '5px 12px', borderRadius: 8, border: followed.includes(v.id) ? '1px solid #ddd6fe' : '1px solid #6d4aff',
                  background: followed.includes(v.id) ? '#f5f3ff' : '#6d4aff',
                  color: followed.includes(v.id) ? '#6d4aff' : '#fff',
                  fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0,
                }}>
                  {followed.includes(v.id) ? 'Following ✓' : '+ Follow'}
                </button>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '12px 0 0', lineHeight: 1.5 }}>{v.bio}</p>
            </div>

            {/* Card body */}
            <div style={{ padding: '14px 20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
                {[
                  { label: 'Rating',   value: `★ ${v.rating}` },
                  { label: 'Products', value: v.products },
                  { label: 'Reviews',  value: v.reviews },
                ].map(m => (
                  <div key={m.label} style={{ background: '#fafafa', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827' }}>{m.value}</div>
                    <div style={{ fontSize: '0.65rem', color: '#9ca3af', marginTop: 1 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280' }}>
                <span>📍 {v.location}</span>
                <span style={{ color: '#9ca3af' }}>Following since {v.since}</span>
              </div>

              {v.orders > 0 && (
                <div style={{ marginTop: 12, padding: '8px 12px', background: '#f5f3ff', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: '#6d4aff', fontWeight: 500 }}>{v.orders} order{v.orders > 1 ? 's' : ''} from this vendor</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6d4aff' }}>{v.totalSpent}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af', fontSize: '0.85rem' }}>No vendors found.</div>
      )}
    </div>
  );
};

export default FollowedVendors;