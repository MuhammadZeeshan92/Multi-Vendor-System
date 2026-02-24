import React from 'react';
import Sidebar from '../components/Sidebar';

const VendorLayout = ({ children }) => {
  const links = [
    { to: '/vendor/dashboard', label: 'Dashboard' },
    { to: '/vendor/products', label: 'Products' },
    { to: '/vendor/products/add', label: 'Add Product' },
    { to: '/vendor/sales', label: 'Sales' },
  ];
  return (
    <div className="flex">
      <Sidebar links={links} />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default VendorLayout;