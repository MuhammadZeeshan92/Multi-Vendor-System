const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/auth.middleware').authorizeRoles;

const {
  getVendorProfile,
  getVendorProducts,
  getAllVendorsProfile,
  createVendor,
  updateVendorProfile
} = require('../controllers/vendor.controller');

router.post('/create', protect,authorizeRoles("seller"), createVendor);

router.get('/', getAllVendorsProfile);
// Vendor profile
router.get('/:id', getVendorProfile);
// Vendor products
router.get('/:id/products', getVendorProducts);

const upload = multer({ storage: multer.memoryStorage() }); // or diskStorage

// Single file upload example: logo and banner
router.put('/:id', protect, upload.fields([{ name: 'logo' }, { name: 'banner' }]), updateVendorProfile);
module.exports = router;