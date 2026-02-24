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
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">My Sales</h1>
      <ul className="space-y-4">
        {vendorSales.map((o) => (
          <li key={o._id} className="border p-4 rounded-lg">
            <p>Order ID: {o._id}</p>
            <p>Status: {o.status}</p>
            <p>Item Revenue: ${o.itemRevenue}</p>
            <p>Platform Fee: ${o.platformFee}</p>
            <p>Vendor Payout: ${o.vendorPayout}</p>
            <div className="mt-2">
              <select
                value={o.status}
                onChange={(e) =>
                  dispatch(updateOrderStatus({ id: o._id, status: e.target.value }))
                }
                className="border border-gray-300 rounded-md px-2 py-1"
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