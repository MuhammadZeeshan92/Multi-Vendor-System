const express = require("express");
const router = express.Router();
const Order = require('../models/Order');

const {
  createOrder,
  getMyOrders,
  getVendorOrders,
} = require("../controllers/order.controller");

const {
  protect,
  authorizeRoles,
} = require("../middleware/auth.middleware");

// Customer creates order
router.post("/", protect, authorizeRoles("buyer"), createOrder);

// Customer sees their orders
router.get("/my", protect, authorizeRoles("buyer"), getMyOrders);

// Vendor sees orders containing their products
router.get("/vendor", protect, authorizeRoles("seller"), getVendorOrders);

// routes/orders.js (or controllers/orders)

router.get('/success', async (req, res) => {
  const { session_id } = req.query;

  if (!session_id)
    return res.status(400).json({ message: 'session_id required' });

  const order = await Order.findOne({
    stripeSessionId: session_id,
  }).populate('orderItems.product');

  if (!order)
    return res.status(404).json({ message: 'Order not found' });

  res.json({ order });
});

module.exports = router;
