import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminLayout = ({ children }) => {
  const links = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/commission', label: 'Commission' },
  ];
  return (
    <div className="flex">
      <Sidebar links={links} />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default AdminLayout;