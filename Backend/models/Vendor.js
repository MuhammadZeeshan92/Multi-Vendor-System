// models/Vendor.js
const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  storeName: { type: String, required: true },
  logo: { type: String },
  banner: { type: String },
  bio: { type: String },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  totalRevenue: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  totalProducts: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);