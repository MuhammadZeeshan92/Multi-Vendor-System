// backend/models/Buyer.js
const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User', unique:true, required:true },
  followedVendors: [{ type: mongoose.Schema.Types.ObjectId, ref:'Vendor' }],
  stats: {
    totalOrders:{type:Number,default:0},
    totalSpent:{type:Number,default:0},
    // …etc
  },
  // …addresses, wishlist, etc.
}, { timestamps:true });

module.exports = mongoose.model('Buyer', buyerSchema);