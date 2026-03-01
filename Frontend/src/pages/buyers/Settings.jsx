import React, { useState } from 'react';

const tabs = ['Profile', 'Addresses', 'Password', 'Notifications'];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({
    orderUpdates: true,
    vendorPosts: true,
    promotions: false,
    reviews: true,
    newsletter: false,
  });
  const [profile, setProfile] = useState({
    firstName: 'Sarah', lastName: 'Johnson',
    email: 'sarah@example.com', phone: '+1 (555) 012-3456',
    bio: 'I love discovering handmade goods from independent vendors.',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Buyer</p>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 600, color: '#111827', margin: 0 }}>Settings</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Sidebar tabs */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #f0f0f5', padding: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: '0.82rem', fontWeight: 500, marginBottom: 2,
              background: activeTab === t ? '#f5f3ff' : 'transparent',
              color: activeTab === t ? '#6d4aff' : '#6b7280',
              transition: 'all 0.15s',
            }}>{t}</button>
          ))}

          {/* Avatar area */}
          <div style={{ marginTop: 16, padding: '16px 12px', borderTop: '1px solid #f0f0f5', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #6d4aff, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto 8px', color: '#fff', fontWeight: 700 }}>
              SJ
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827' }}>Sarah Johnson</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Buyer since Jan 2024</div>
          </div>
        </div>

        {/* Content panel */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #f0f0f5', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid #f5f5fa' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111827', margin: 0 }}>{activeTab}</h2>
          </div>

          <div style={{ padding: '24px' }}>

            {/* PROFILE */}
            {activeTab === 'Profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { label: 'First Name', key: 'firstName' },
                    { label: 'Last Name',  key: 'lastName' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{f.label}</label>
                      <input
                        value={profile[f.key]}
                        onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '0.82rem', color: '#111827', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                      />
                    </div>
                  ))}
                </div>
                {[
                  { label: 'Email Address', key: 'email',  type: 'email' },
                  { label: 'Phone Number',  key: 'phone',  type: 'tel' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={profile[f.key]}
                      onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '0.82rem', color: '#111827', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Short Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                    rows={3}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '0.82rem', color: '#111827', outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            )}

            {/* ADDRESSES */}
            {activeTab === 'Addresses' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Home', address: '142 Maple Street, Portland, OR 97201', default: true },
                  { label: 'Work', address: '880 SW Broadway, Portland, OR 97205', default: false },
                ].map(a => (
                  <div key={a.label} style={{ border: `1.5px solid ${a.default ? '#6d4aff' : '#e5e7eb'}`, borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827' }}>{a.label}</span>
                        {a.default && <span style={{ fontSize: '0.65rem', fontWeight: 600, background: '#f5f3ff', color: '#6d4aff', padding: '2px 8px', borderRadius: 20 }}>Default</span>}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>{a.address}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6d4aff', background: '#f5f3ff', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
                      {!a.default && <button style={{ fontSize: '0.72rem', fontWeight: 600, color: '#ef4444', background: '#fef2f2', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer' }}>Remove</button>}
                    </div>
                  </div>
                ))}
                <button style={{ padding: '10px 18px', borderRadius: 8, border: '1.5px dashed #d1d5db', background: 'transparent', fontSize: '0.8rem', color: '#6b7280', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>
                  + Add New Address
                </button>
              </div>
            )}

            {/* PASSWORD */}
            {activeTab === 'Password' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
                {['Current Password', 'New Password', 'Confirm New Password'].map(l => (
                  <div key={l}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{l}</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '0.82rem', color: '#111827', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                    />
                  </div>
                ))}
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 14px', fontSize: '0.75rem', color: '#92400e' }}>
                  💡 Use at least 8 characters, including a number and a symbol.
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === 'Notifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { key: 'orderUpdates', label: 'Order Updates',   desc: 'Shipping, delivery, and tracking info' },
                  { key: 'vendorPosts',  label: 'Vendor Activity', desc: 'New products from vendors you follow' },
                  { key: 'promotions',   label: 'Promotions',      desc: 'Deals and discount codes' },
                  { key: 'reviews',      label: 'Review Reminders',desc: 'Reminders to review your purchases' },
                  { key: 'newsletter',   label: 'Newsletter',      desc: 'Weekly curated picks' },
                ].map(n => (
                  <div key={n.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px solid #f5f5fa' }}>
                    <div>
                      <div style={{ fontSize: '0.83rem', fontWeight: 600, color: '#111827' }}>{n.label}</div>
                      <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{n.desc}</div>
                    </div>
                    <button
                      onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                      style={{
                        width: 42, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', position: 'relative',
                        background: notifs[n.key] ? '#6d4aff' : '#e5e7eb',
                        transition: 'background 0.2s', flexShrink: 0,
                      }}
                    >
                      <span style={{
                        position: 'absolute', top: 3, left: notifs[n.key] ? 21 : 3,
                        width: 18, height: 18, borderRadius: '50%', background: '#fff',
                        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Save button */}
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={handleSave} style={{
                padding: '10px 24px', borderRadius: 8, border: 'none', background: '#6d4aff',
                color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                Save Changes
              </button>
              {saved && (
                <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 500 }}>✓ Saved successfully</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;