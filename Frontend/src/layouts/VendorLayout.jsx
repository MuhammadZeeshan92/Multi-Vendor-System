import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const VendorLayout = () => {
  const links = [
    { to: '/vendor/dashboard', label: 'Dashboard' },
    { to: '/vendor/products', label: 'Products' },
    { to: '/vendor/products/add', label: 'Add Product' },
    { to: '/vendor/sales', label: 'Sales' },
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

export default VendorLayout;