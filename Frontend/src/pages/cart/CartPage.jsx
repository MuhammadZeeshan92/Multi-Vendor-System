import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQty, removeItem } from '../../features/cart/cartSlice';
import Button from '../../components/Button';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, subtotal } = useSelector((state) => state.cart);

  const handleQtyChange = (productId, qty, stock) => {
    const newQty = Math.min(stock, Math.max(1, qty));
    dispatch(updateQty({ productId, qty: newQty }));
  };

  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  if (items.length === 0)
    return <div className="container mx-auto py-6">Your cart is empty.</div>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      <div className="space-y-4">
        {items.map((i) => (
          <div
            key={i.productId}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <img src={i.image} alt={i.name} className="w-20 h-20 object-cover" />
              <div>
                <p className="font-semibold">{i.name}</p>
                <p>${i.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={i.qty}
                min="1"
                max={i.stock}
                onChange={(e) => handleQtyChange(i.productId, +e.target.value, i.stock)}
                className="w-16 border border-gray-300 rounded-md px-2 py-1"
              />
              <Button variant="danger" onClick={() => handleRemove(i.productId)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <p className="text-xl font-bold">Subtotal: ${subtotal.toFixed(2)}</p>
        <Button onClick={() => (window.location.href = '/checkout')}>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default CartPage;