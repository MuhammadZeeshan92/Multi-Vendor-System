// routes/webhook.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');
// optional: const User = require('../models/User'); // to get vendor emails

// Use raw body for this route only
router.post('/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      const order = await Order.findById(orderId);

      console.log(order.orderItems)
      if (!order) {
        console.warn('Order not found for webhook orderId', orderId);
      } else if (!order.isPaid) {
        // mark paid
        order.isPaid = true;
        order.paidAt = new Date();
        order.status = 'Paid';
        order.paymentResult = {
          id: session.payment_intent || null,
          status: session.payment_status || 'paid',
          email: session.customer_email || null,
        };
        await order.save();



        // Deduct stock
        for (const oi of order.orderItems) {
          await Product.findByIdAndUpdate(oi.product, { $inc: { stock: -oi.quantity }});
        }

        for (const oi of order.orderItems) {
          const vendor = await Vendor.findOne({user: oi.vendor});
          if (vendor) {
            vendor.totalRevenue += oi.price * oi.quantity;
            vendor.totalOrders += 1;
            await vendor.save();
          }
        }

        // Notify vendor(s) - placeholder
        // e.g. notifyVendors(order);
        // You can implement email, push notification, socket.io, etc.
      }
    }
    // Respond success
    res.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error', err);
    res.status(500).send();
  }
});

module.exports = router;