const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        'Electronics',
        'Fashion',
        'Home & Living',
        'Furniture',
        'Decor',
        'Beauty & Personal Care',
        'Sports & Outdoors',
        'Groceries',
        'Automotive',
        'Books & Stationery',
        'Baby & Kids',
        'Health & Wellness',
        'Pet Supplies'
      ]
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
