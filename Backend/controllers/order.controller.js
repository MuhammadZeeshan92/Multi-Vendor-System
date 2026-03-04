const Order = require("../models/Order");
const Product = require("../models/Product");

// controllers/orderController.js
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createOrder = async (req, res) => {
  try {
    const { shipping, items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // Validate and compute totals
    let totalCents = 0;
    const formatted = [];

    for (const it of items) {
      const product = await Product.findById(it.productId);
      if (!product) return res.status(404).json({ message: `Product not found: ${it.productId}` });
      if (product.stock < it.quantity) return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      

      formatted.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: it.qty,
        vendor: product.vendor
      });

      totalCents += Math.round(product.price * 100) * it.qty;
    }

    // Create DB order (status Pending)
    const order = await Order.create({
      customer: req.user._id,
      orderItems: formatted,
      totalAmount: totalCents / 100,
      shipping,
      status: "Pending",
    });

    // Stripe line items
    const line_items = formatted.map(fi => ({
      price_data: {
        currency: 'usd',
        product_data: { name: fi.name },
        unit_amount: Math.round(fi.price * 100),
      },
      quantity: fi.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: req.user.email,
      metadata: { orderId: order._id.toString() },
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });

    order.stripeSessionId = session.id;
    await order.save();

    res.status(201).json({ sessionUrl: session.url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// controllers/orderController.js
// const Stripe = require('stripe');
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// exports.createOrder = async (req, res) => {
//   try {
//     const { shipping, items } = req.body;
//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No order items" });
//     }

//     // Validate products and compute total
//     let totalAmount = 0;
//     const formattedItems = [];

//     for (let item of items) {
//       const product = await Product.findById(item.productId);
//       if (!product) {
//         return res.status(404).json({ message: `Product not found: ${item.productId}` });
//       }
//       if (product.stock < item.quantity) {
//         return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
//       }

//       totalAmount += Math.round(product.price * 100) * item.quantity; // cents
//       formattedItems.push({
//         product: product._id,
//         name: product.name,
//         price: product.price,
//         quantity: item.quantity,
//         vendor: product.vendor || null,
//       });
//     }

//     // Create Order in DB with status 'pending'
//     const order = await Order.create({
//       customer: req.user._id,
//       orderItems: formattedItems,
//       totalAmount: totalAmount / 100, // store in dollars if your schema expects that
//       shipping,
//       status: 'pending',
//     });

//     // Build line_items for Stripe Checkout
//     const line_items = formattedItems.map(fi => ({
//       price_data: {
//         currency: 'usd', // customize based on your app/country or product currency
//         product_data: {
//           name: fi.name,
//           // optionally add images: [product.imageUrl]
//         },
//         unit_amount: Math.round(fi.price * 100),
//       },
//       quantity: fi.quantity,
//     }));

//     // Create Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items,
//       mode: 'payment',
//       customer_email: req.user.email, // optional, helpful for receipts
//       metadata: {
//         orderId: order._id.toString(), // attach order id for webhook mapping
//       },
//       success_url: `${process.env.CLIENT_URL}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.CLIENT_URL}/checkout`,
//     });

//     // Save session id to order (optional but helpful)
//     order.stripeSessionId = session.id;
//     await order.save();

//     // Return the session URL to the frontend
//     res.status(201).json({ sessionUrl: session.url });

//   } catch (error) {
//     console.error('createOrder error', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// Create Order
// exports.createOrder = async (req, res) => {
//   try {
//     const { orderItems } = req.body;

//     if (!orderItems || orderItems.length === 0) {
//       return res.status(400).json({ message: "No order items" });
//     }

//     let totalAmount = 0;
//     const formattedItems = [];

//     for (let item of orderItems) {
//       const product = await Product.findById(item.productId);

//       if (!product) {
//         return res.status(404).json({ message: "Product not found" });
//       }

//       if (product.stock < item.quantity) {
//         return res.status(400).json({ message: "Insufficient stock" });
//       }

//       totalAmount += product.price * item.quantity;

//       formattedItems.push({
//         product: product._id,
//         name: product.name,
//         price: product.price,
//         quantity: item.quantity,
//         vendor: product.vendor,
//       });
//     }

//     const order = await Order.create({
//       customer: req.user._id,
//       orderItems: formattedItems,
//       totalAmount,
//     });

//     res.status(201).json(order);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


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
