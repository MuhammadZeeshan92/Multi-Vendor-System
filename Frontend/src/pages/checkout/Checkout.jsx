import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../features/orders/orderSlice';
import Button from '../../components/Button';
import GroupedCartSummary from '../../components/GroupedCartSummary';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const { items, subtotal } = useSelector((state) => state.cart);
  const [shipping, setShipping] = useState({ address: '', city: '', postalCode: '' });
  const [status, setStatus] = useState('idle');
  const { user } = useSelector((state) => state.auth)
const navigate = useNavigate()

useEffect(() => {
  if (!user) {
    navigate('/auth/login', {
      state: { from: '/checkout' }
    })
  }
}, [user, navigate])

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await dispatch(createOrder({ shipping, items })).unwrap();
      window.location.href = response.sessionUrl;
    } catch (err) {
      console.error(err);
      setStatus('failed');
    }
  };

  if (items.length === 0) return <div className="container py-6">Cart is empty.</div>;

  return (
    <div className="container py-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
      <section className="space-y-4 max-w-xl">
        <h1 className="text-2xl font-semibold mb-2 text-gray-900">Checkout</h1>
        <form onSubmit={handleSubmit} className="card p-4 space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                name="address"
                placeholder="Address"
                value={shipping.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                name="city"
                placeholder="City"
                value={shipping.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                name="postalCode"
                placeholder="Postal Code"
                value={shipping.postalCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                required
              />
            </div>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              Total: ${subtotal.toFixed(2)}
            </p>
          </div>
          <Button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Please wait...' : 'Pay with Stripe'}
          </Button>
        </form>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>
        <GroupedCartSummary items={items} />
      </section>
    </div>
  );
};

export default Checkout;