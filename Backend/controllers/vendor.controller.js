const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// GET /api/vendors/:id
exports.getVendorProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid vendor id' });
    }

    const vendor = await User.findById(id).select('-password');

    if (!vendor || vendor.role !== 'seller') {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json(vendor);
  } catch (error) {
    console.error('Vendor profile error:', error);
    res.status(500).json({ message: error.message });
  }
};

// GET /api/vendors
exports.getAllVendorsProfile = async (req, res) => {
  try {
    const vendors = await User.find({ role: 'seller', isActive: true, isBlocked: false }).select('-password');
    res.json(vendors);
  } catch (error) {
    console.error('All vendors profile error:', error);
    res.status(500).json({ message: error.message });
  }
};
// GET /api/vendors/:id/products
exports.getVendorProducts = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid vendor id' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments({ vendor: id });

    const products = await Product.find({ vendor: id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Vendor products error:', error);
    res.status(500).json({ message: error.message });
  }
};