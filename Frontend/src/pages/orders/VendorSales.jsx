import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorSales, updateOrderStatus } from '../../features/orders/orderSlice';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';

const VendorSales = () => {
  const dispatch = useDispatch();
  const { vendorSales, status } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchVendorSales());
  }, [dispatch]);

  if (status === 'loading') return <Spinner />;

  return (
    <div className="container py-6 space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">My Sales</h1>
      <ul className="space-y-3 text-sm text-gray-700">
        {vendorSales.map((o) => (
          <li key={o._id} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900">Order #{o._id}</p>
              <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                {o.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-xs md:text-sm mb-3">
              <p>Item Revenue: ${o.itemRevenue}</p>
              <p>Platform Fee: ${o.platformFee}</p>
              <p>Vendor Payout: ${o.vendorPayout}</p>
            </div>
            <div className="mt-2">
              <select
                value={o.status}
                onChange={(e) =>
                  dispatch(updateOrderStatus({ id: o._id, status: e.target.value }))
                }
                className="border border-gray-300 rounded-md px-2 py-1 text-xs md:text-sm"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorSales;