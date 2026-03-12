import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const OrderSuccess = () => {
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const sessionId = params.get("session_id");

        if (!sessionId) {
          setError("Session ID missing");
          return;
        }

        const { data } = await axios.get(
          `${process.env.VITE_API_URL}/orders/success?session_id=${sessionId}`
        );

        setOrder(data.order);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch order"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6">
          <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-8 max-w-md">{error}</p>
        <Link to="/" className="btn-primary">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 md:py-20 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Main Success Card */}
          <div className="card shadow-xl shadow-indigo-500/5 overflow-visible relative">
            {/* Header / Icon */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
              <div className="bg-emerald-500 text-white p-4 rounded-full shadow-lg shadow-emerald-500/20 animate-bounce">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="pt-12 pb-8 px-6 md:px-10 text-center border-b border-gray-100">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
              <p className="text-gray-500">
                Thank you for your purchase. We've received your order and are processing it now.
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50/50 p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                  <p className="text-sm font-mono text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg inline-block shadow-sm">
                    {order._id}
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Paid</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    Rs {order.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-50 pb-3">Order Items</h2>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="flex justify-between items-center group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-500 font-bold text-xs ring-1 ring-inset ring-indigo-500/10">
                          {item.quantity}x
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Rs {item.price.toLocaleString()} per unit
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        Rs {(item.quantity * item.price).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="p-8 text-center flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/products"
                className="btn-primary flex items-center justify-center gap-2 group py-3 px-8"
              >
                Continue Shopping
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                to="/buyer/orders"
                className="btn-ghost py-3 px-8 flex items-center justify-center"
              >
                View My Orders
              </Link>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-500">
            A confirmation email will be sent to your registered account shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
