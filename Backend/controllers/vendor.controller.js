const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');

const Vendor = require("../models/Vendor");

exports.createVendor = async (req, res) => {
  try {
    const { storeName, description, logo, banner, user: userId } = req.body;

    if (!storeName || !userId) return res.status(400).json({ message: "Store name and user required" });

    const existing = await Vendor.findOne({ user: userId });
    if (existing) return res.status(400).json({ message: "Vendor already exists" });

    const vendor = await Vendor.create({ storeName, description, logo, banner, user: userId });

    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/vendors/:id
exports.getVendorProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid vendor id' });
    }

    const vendor = await Vendor.findOne({ user: id }).populate('user', '-password');

    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

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

// PUT /api/vendors/:id
exports.updateVendorProfile = async (req, res) => {
  try {

    const { id } = req.params;

    const vendor = await Vendor.findById(id);

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // only owner
    if (vendor.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { logo, banner, storeName, bio } = req.body;

    if (logo) vendor.logo = logo;
    if (banner) vendor.banner = banner;
    if (storeName) vendor.storeName = storeName;
    if (bio) vendor.bio = bio;

    await vendor.save();

    res.json(vendor);

  } catch (error) {
    console.error('Vendor update error:', error);
    res.status(500).json({ message: error.message });
  }
};

// exports.updateVendorProfile = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const vendor = await Vendor.findById(id);
//     if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

//     // Only owner can update
//     if (vendor.user.toString() !== req.user._id.toString())
//       return res.status(403).json({ message: 'Unauthorized' });

//     // If files exist, upload to Cloudinary
//     if (req.files) {
//       const logoFile = req.files.logo?.[0];
//       const bannerFile = req.files.banner?.[0];

//       if (logoFile) {
//         // upload logoFile.buffer to Cloudinary -> get secure_url
//         vendor.logo = await uploadToCloudinary(logoFile); 
//       }
//       if (bannerFile) {
//         vendor.banner = await uploadToCloudinary(bannerFile);
//       }
//     }

//     // Optional other fields
//     const { storeName, bio } = req.body;
//     if (storeName) vendor.storeName = storeName;
//     if (bio) vendor.bio = bio;

//     await vendor.save();
//     res.json(vendor);

//   } catch (error) {
//     console.error('Vendor update error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };