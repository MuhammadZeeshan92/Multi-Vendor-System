const Product = require("../models/Product");
const Vendor = require("../models/Vendor");
const mongoose = require("mongoose");

// Create Product (Vendor only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price,category, stock, images } = req.body;

    const vendor = await Vendor.findOne({ user: req.user._id });
    if (!vendor) {
      return res.status(403).json({ message: "Only vendors can create products" });
    }

    vendor.totalProducts = (vendor.totalProducts || 0) + 1;
    await vendor.save();

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images,
      vendor: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products (Public)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("vendor", "name email");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Vendor's Own Products
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product (Only Owner)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check ownership
    if (product.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product (Only Owner)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const vendor = await Vendor.findOne({ user: req.user._id });
    if (vendor) {
      vendor.totalProducts = Math.max((vendor.totalProducts || 1) - 1, 0);
      await vendor.save();
    }

    vendor.totalProducts = Math.max((vendor.totalProducts || 1) - 1, 0);
    await vendor.save();

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopRatedProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;

    const products = await Product.find({})
      .sort({ createdAt: -1 }) // newest first (temporary logic)
      .limit(limit);

      console.log('Products:', products.length);

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};