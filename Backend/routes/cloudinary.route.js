const express = require('express');
const router = express.Router();
const { getSignature } = require('../controllers/cloudinary.controller');
const { protect, authorizeRoles } = require('../middleware/auth.middleware');

// Only authenticated vendors should request signatures for product uploads
router.get('/cloudinary-signature', protect, authorizeRoles('seller'), getSignature);

module.exports = router;
