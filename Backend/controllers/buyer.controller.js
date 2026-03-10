// controllers/buyer.controller.js
const User = require('../models/User');       // or Buyer
const Vendor = require('../models/Vendor');
const Order = require('../models/Order');
const Buyer = require('../models/Buyer');

exports.getBuyerDashboard = async (req, res) => {
    // compute stats and return the five most recent orders
    const allOrders = await Order.find({ customer: req.user._id })
      .sort({ createdAt: -1 }); // newest first

    const totalOrders = allOrders.length;
    const totalSpent = allOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    const recent = allOrders.slice(0, 5); // already sorted

    res.json({ totalOrders, totalSpent, recent });
};

exports.getFollowedVendors = async (req, res) => {
    const buyer = await Buyer.findOne({ user: req.user._id })
        .populate('followedVendors');
    if (!buyer) {
        // no buyer record yet → return empty list
        return res.json([]);
    }
    res.json(buyer.followedVendors);
};

exports.followVendor = async (req, res) => {
  const { vendorId } = req.params;
  await Buyer.findOneAndUpdate(
    { user: req.user._id },
    { $addToSet: { followedVendors: vendorId }, user: req.user._id },
    { upsert: true }
  );
  res.status(204).end();
};

exports.unfollowVendor = async (req, res) => {
  const { vendorId } = req.params;
  await Buyer.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { followedVendors: vendorId } }
  );
  res.status(204).end();
};

exports.completeProfile = async (req, res) => {
    try {
        // e.g. address, phone – whatever fields you collect
        const updates = req.body;
        let buyer = await Buyer.findOneAndUpdate(
            { user: req.user._id },
            { user: req.user._id, ...updates },
            { upsert: true, returnDocument: 'after' }
        );


        // make sure we return the populated user reference
        buyer = await buyer.populate('user');

        res.json(buyer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};