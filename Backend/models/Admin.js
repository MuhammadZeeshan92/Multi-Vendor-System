const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  revenue: { type: Number, default: 0 },
  commission:[
    {
      date: { type: Date, default: Date.now },
      amount: { type: Number, default: 0 },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);