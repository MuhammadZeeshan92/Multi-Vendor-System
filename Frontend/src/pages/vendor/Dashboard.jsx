import React from 'react';

const VendorDashboard = () => {
  // would fetch vendor metrics
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">Vendor Dashboard</h1>
        <p className="text-sm text-gray-600">
          Monitor your sales, payouts, and storefront performance.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Revenue (placeholder)
          </p>
          <p className="text-2xl font-semibold text-gray-900">$0.00</p>
        </div>
        <div className="card p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Orders (placeholder)
          </p>
          <p className="text-2xl font-semibold text-gray-900">0</p>
        </div>
        <div className="card p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Products (placeholder)
          </p>
          <p className="text-2xl font-semibold text-gray-900">0</p>
        </div>
      </div>

      <div className="card p-4 text-sm text-gray-600">
        Revenue, fees, net earnings, and charts can be surfaced here once the backend
        metrics are wired up.
      </div>
    </div>
  );
};

export default VendorDashboard;