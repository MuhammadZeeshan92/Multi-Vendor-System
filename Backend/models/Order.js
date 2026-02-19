const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  name: String,
  price: Number,
  quantity: Number,
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [orderItemSchema],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Delivered"],
      default: "Pending",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
