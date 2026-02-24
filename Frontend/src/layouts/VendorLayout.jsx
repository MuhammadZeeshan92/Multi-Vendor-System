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
    <div className="flex">
      <Sidebar links={links} />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default VendorLayout;