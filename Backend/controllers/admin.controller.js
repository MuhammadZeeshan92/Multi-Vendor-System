const User = require("../models/User");

// ✅ Admin Dashboard Metrics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "buyer" });
    const totalVendors = await User.countDocuments({ role: "seller" });

    const activeUsers = await User.countDocuments({
      role: "buyer",
      isActive: true,
      isBlocked: false,
    });

    const activeVendors = await User.countDocuments({
      role: "seller",
      isActive: true,
      isBlocked: false,
    });

    const blockedUsers = await User.countDocuments({
      isBlocked: true,
    });


    res.json({
      totalUsers,
      totalVendors,
      activeUsers,
      activeVendors,
      blockedUsers,
      revenue: 0,      // placeholder
      commission: 0,   // placeholder
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controllers/adminController.js

exports.getActiveUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const total = await User.countDocuments({
      role: "buyer",
      isActive: true,
      isBlocked: false,
    });

    const users = await User.find({
      role: "buyer",
      isActive: true,
      isBlocked: false,
    })
      .select("-password")
      .skip(skip)
      .limit(limit);

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getActiveSellers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const total = await User.countDocuments({
      role: "seller",
      isActive: true,
      isBlocked: false,
    });

    const sellers = await User.find({
      role: "seller",
      isActive: true,
      isBlocked: false,
    })
      .select("-password")
      .skip(skip)
      .limit(limit);

    res.json({
      sellers,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalSellers: total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Buyers Only
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "buyer" ,isActive: false, isBlocked: false}).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Vendors Only
exports.getVendors = async (req, res) => {
  try {
    const vendors = await User.find({ role: "seller",isActive: false, isBlocked: false }).select("-password");
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Toggle Active / Block
exports.toggleUserStatus = async (req, res) => {
  try {
    const { active } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent admin from being disabled
    if (user.role === "admin") {
      return res.status(400).json({ message: "Admin cannot be modified" });
    }

    user.isActive = active;

    if (!active) {
      user.isBlocked = true;
    } else {
      user.isBlocked = false;
    }

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};