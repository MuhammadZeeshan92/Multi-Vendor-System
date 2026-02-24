import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../features/orders/orderSlice';
import Button from '../../components/Button';

const Checkout = () => {
  const dispatch = useDispatch();
  const { items, subtotal } = useSelector((state) => state.cart);
  const [shipping, setShipping] = useState({ address: '', city: '', postalCode: '' });
  const [status, setStatus] = useState('idle');

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

  if (items.length === 0) return <div className="container mx-auto py-6">Cart is empty.</div>;

  return (
    <div className="container mx-auto py-6 max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="address"
          placeholder="Address"
          value={shipping.address}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
        <input
          name="city"
          placeholder="City"
          value={shipping.city}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
        <input
          name="postalCode"
          placeholder="Postal Code"
          value={shipping.postalCode}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
        <div className="text-right">
          <p className="text-lg font-bold">Total: ${subtotal.toFixed(2)}</p>
        </div>
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Please wait...' : 'Pay with Stripe'}
        </Button>
      </form>
    </div>
  );
};

export default Checkout;