import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../../features/orders/orderSlice';
import Spinner from '../../components/Spinner';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { myOrders, status } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (status === 'loading') return <Spinner />;

  if (myOrders.length === 0)
    return (
      <div className="container py-6 text-sm text-gray-600">
        You have no orders.
      </div>
    );

  return (
    <div className="container py-6 space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
      <ul className="space-y-3">
        {myOrders.map((o) => (
          <li key={o._id} className="card p-4 text-sm text-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900">Order #{o._id}</p>
              <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                {o.status}
              </span>
            </div>
            {/* more details can be displayed here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;