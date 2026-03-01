const express = require("express");
const router = express.Router();

const {
  getVendorProducts,
  updateProduct,
  deleteProduct,
  getTopRatedProducts,
} = require("../controllers/product.controller");

const {
  createProduct,
  getAllProducts,
  getProductById
} = require("../controllers/product.controller.js");

const {
  protect,
  authorizeRoles,
} = require("../middleware/auth.middleware");

router.get("/", getAllProducts);
router.post("/",protect,authorizeRoles("seller"),createProduct);
// Vendor Dashboard Products
router.get("/vendor",protect,authorizeRoles("seller"),getVendorProducts);
router.get('/top-rated',getTopRatedProducts);
router.get('/:id', getProductById);

// Vendor Create

// Vendor Update
router.put("/:id",protect,authorizeRoles("seller"),updateProduct);

// Vendor Delete
router.delete("/:id",protect,authorizeRoles("seller"),deleteProduct);

module.exports = router;
