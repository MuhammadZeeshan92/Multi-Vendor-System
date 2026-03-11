import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQty, removeItem } from '../../features/cart/cartSlice';
import Button from '../../components/Button';
import GroupedCartSummary from '../../components/GroupedCartSummary';
import { useNavigate } from 'react-router-dom';
import PageHero from '../../components/PageHero';

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

  return (
    <div className="container py-6 space-y-8">
      <PageHero
        title="Your Shopping Cart"
        subtitle={
          items.length > 0
            ? `You have ${items.length} items ready for checkout. Review your selections and proceed to secure payment.`
            : "Your cart is currently empty. Start exploring our marketplace to find amazing products!"
        }
        gradient="from-indigo-600 via-indigo-700 to-purple-800"
      />

      {items.length === 0 ? (
        <div className="card p-12 text-center flex flex-col items-center justify-center space-y-6">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-5xl">
            🛒
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your cart is empty
            </h2>
            <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">
              Looks like you haven't added anything to your cart yet. Start
              browsing our featured products!
            </p>
          </div>
          <Button
            onClick={() => navigate('/products')}
            className="px-8 py-3 rounded-xl shadow-lg shadow-rose-500/20"
          >
            Start Shopping →
          </Button>
        </div>
      ) : (
        <>
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
                  className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 last:border-none gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={i.image}
                      alt={i.name}
                      className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{i.name}</p>
                      <p className="text-sm text-gray-600">
                        ${i.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <input
                      type="number"
                      value={i.qty}
                      min="1"
                      max={i.stock}
                      onChange={(e) =>
                        handleQtyChange(i.productId, +e.target.value, i.stock)
                      }
                      className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm text-center"
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
            <Button
              onClick={() => {
                if (!user) {
                  navigate('/auth/login', {
                    state: { from: '/checkout' },
                  });
                } else {
                  navigate('/checkout');
                }
              }}
              className="px-10 py-3 text-base shadow-lg shadow-indigo-500/10"
            >
              Proceed to checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;