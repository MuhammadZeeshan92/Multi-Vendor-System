const express = require("express");
const router = express.Router();

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
router.post(
  "/",
  protect,
  authorizeRoles("customer"),
  createOrder
);

// Customer sees their orders
router.get(
  "/my",
  protect,
  authorizeRoles("customer"),
  getMyOrders
);

// Vendor sees orders containing their products
router.get(
  "/vendor",
  protect,
  authorizeRoles("vendor"),
  getVendorOrders
);

module.exports = router;
