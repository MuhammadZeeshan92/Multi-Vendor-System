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
router.get("/vendor",protect,authorizeRoles("seller"),getVendorProducts);

// Vendor Create
router.post("/",protect,authorizeRoles("seller"),createProduct);

// Vendor Update
router.put("/:id",protect,authorizeRoles("seller"),updateProduct);

// Vendor Delete
router.delete("/:id",protect,authorizeRoles("seller"),deleteProduct);

module.exports = router;
