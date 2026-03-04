import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
          `http://localhost:5000/api/orders/success?session_id=${sessionId}`
        );

        setOrder(data.order);
        console.log("Fetched order:", data.order);
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

  if (loading) return <p className="text-center mt-10">Loading order...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="container mx-auto py-6 text-center">
      <h1 className="text-2xl font-semibold mb-4">
        Order Successful 🎉
      </h1>

      <p className="mb-4">
        Order ID: <strong>{order._id}</strong>
      </p>

      <p className="mb-4">
        Total Amount: <strong>Rs {order.totalPrice}</strong>
      </p>

      <div className="mt-6 text-left max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-2">Items:</h2>
        {order.orderItems.map((item) => (
          <div key={item._id} className="border-b py-2">
            <p>{item.product.name}</p>
            <p>
              {item.qty} × Rs {item.totalAmount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSuccess;