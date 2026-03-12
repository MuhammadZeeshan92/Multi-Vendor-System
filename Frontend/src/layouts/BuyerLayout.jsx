import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';

const BuyerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const links = [
    { to: '/buyer/dashboard', label: 'Dashboard' },
    { to: '/buyer/orders',    label: 'My Orders' },
    { to: '/buyer/vendors',   label: 'Followed Vendors' },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen relative">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar links={links} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 w-full lg:min-h-0 lg:overflow-visible">
        {/* Top bar for mobile toggle */}
        <div className="lg:hidden flex items-center px-4 py-3 bg-white border-b border-gray-100 sticky top-16 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:text-indigo-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="ml-2 font-semibold text-gray-900">Buyer Panel</span>
        </div>

        <div className="px-4 py-6 md:px-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <Page>
              <Outlet />
            </Page>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerLayout;