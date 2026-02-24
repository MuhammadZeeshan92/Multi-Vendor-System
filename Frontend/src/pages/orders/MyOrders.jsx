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
    return <div className="container mx-auto py-6">You have no orders.</div>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
      <ul className="space-y-4">
        {myOrders.map((o) => (
          <li key={o._id} className="border p-4 rounded-lg">
            <p>Order ID: {o._id}</p>
            <p>Status: {o.status}</p>
            {/* more details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;