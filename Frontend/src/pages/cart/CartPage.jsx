import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQty, removeItem } from '../../features/cart/cartSlice';
import Button from '../../components/Button';
import GroupedCartSummary from '../../components/GroupedCartSummary';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, subtotal } = useSelector((state) => state.cart);
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleQtyChange = (productId, qty, stock) => {
    const newQty = Math.min(stock, Math.max(1, qty));
    dispatch(updateQty({ productId, qty: newQty }));
  };

  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  if (items.length === 0)
    return <div className="container py-6">Your cart is empty.</div>;

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>

      {/* Grouped by vendor summary */}
      <GroupedCartSummary items={items} />

      {/* Editable line items */}
      <section className="card p-4 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Items</h2>
        <div className="space-y-4">
          {items.map((i) => (
            <div
              key={i.productId}
              className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-none"
            >
              <div className="flex items-center gap-4">
                <img
                  src={i.image}
                  alt={i.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{i.name}</p>
                  <p className="text-sm text-gray-600">${i.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={i.qty}
                  min="1"
                  max={i.stock}
                  onChange={(e) =>
                    handleQtyChange(i.productId, +e.target.value, i.stock)
                  }
                  className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm"
                />
                <Button
                  variant="danger"
                  onClick={() => handleRemove(i.productId)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-2 text-right space-y-2">
        <p className="text-xl font-bold text-gray-900">
          Subtotal: ${subtotal.toFixed(2)}
        </p>
        <Button onClick={() => {
          if (!user) {
            navigate('/auth/login', {
              state: { from: '/checkout' }
            })
          } else {
            navigate('/checkout')
          }
        }}>
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;