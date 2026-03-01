import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const BuyerLayout = () => {
  const links = [
    { to: '/buyer/dashboard', label: 'Dashboard' },
    { to: '/buyer/orders',    label: 'My Orders' },
    { to: '/buyer/vendors',   label: 'Followed Vendors' },
    { to: '/buyer/settings',  label: 'Settings' },
  ];

  return (
    <div className="flex bg-gray-50">
      <Sidebar links={links} />
      <div className="flex-1 min-h-[calc(100vh-4rem)] px-6 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BuyerLayout;