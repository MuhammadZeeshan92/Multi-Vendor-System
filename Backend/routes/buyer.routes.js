// routes/buyer.routes.js
const express = require('express');
const { protect, authorizeRoles } = require('../middleware/auth.middleware');
const {
  getBuyerDashboard,
  followVendor,
  unfollowVendor,
  getFollowedVendors,
  completeProfile,
} = require('../controllers/buyer.controller');

const router = express.Router();
router.use(protect, authorizeRoles('buyer'));

router.get('/dashboard', getBuyerDashboard);
router.get('/vendors', getFollowedVendors);
router.post('/vendors/:vendorId/follow', followVendor);
router.delete('/vendors/:vendorId/follow', unfollowVendor);
router.put('/profile', completeProfile);

module.exports = router;