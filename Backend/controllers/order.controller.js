const Order = require("../models/Order");
const Product = require("../models/Product");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { orderItems } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    let totalAmount = 0;
    const formattedItems = [];

    for (let item of orderItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      totalAmount += product.price * item.quantity;

      formattedItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        vendor: product.vendor,
      });
    }

    const order = await Order.create({
      customer: req.user._id,
      orderItems: formattedItems,
      totalAmount,
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Orders (Customer)
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vendor Sales
exports.getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "orderItems.vendor": req.user._id,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
