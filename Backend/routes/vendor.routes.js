const express = require('express');
const router = express.Router();

const {
  getVendorProfile,
  getVendorProducts,
  getAllVendorsProfile
} = require('../controllers/vendor.controller');

router.get('/', getAllVendorsProfile);
// Vendor profile
router.get('/:id', getVendorProfile);
// Vendor products
router.get('/:id/products', getVendorProducts);
module.exports = router;