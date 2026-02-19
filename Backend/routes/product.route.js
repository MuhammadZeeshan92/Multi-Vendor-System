const express = require("express");
const router = express.Router();

const {
  getVendorProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const {
  createProduct,
  getAllProducts,
} = require("../controllers/product.controller.js");

const {
  protect,
  authorizeRoles,
} = require("../middleware/auth.middleware");

router.get("/", getAllProducts);

// Vendor Dashboard Products
router.get(
  "/vendor",
  protect,
  authorizeRoles("vendor"),
  getVendorProducts
);

// Vendor Create
router.post(
  "/",
  protect,
  authorizeRoles("vendor"),
  createProduct
);

// Vendor Update
router.put(
  "/:id",
  protect,
  authorizeRoles("vendor"),
  updateProduct
);

// Vendor Delete
router.delete(
  "/:id",
  protect,
  authorizeRoles("vendor"),
  deleteProduct
);



// Public
router.get("/", getAllProducts);

// Vendor Only
router.post(
  "/",
  protect,
  authorizeRoles("vendor"),
  createProduct
);

module.exports = router;
