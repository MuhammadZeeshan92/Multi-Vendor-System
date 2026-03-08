require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.route.js");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/product.route.js");
const orderRoutes = require("./routes/order.route.js");
const adminRoutes = require("./routes/admin.routes.js");
const cloudinaryRoutes = require("./routes/cloudinary.route.js");
const vendorRoutes = require('./routes/vendor.routes');     
const webhookRouter = require('./routes/webhook');
const buyerRoutes = require('./routes/buyer.routes');






const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(cookieParser());



app.use('/api', webhookRouter); // the webhook uses raw parser internally


app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", cloudinaryRoutes);
app.use("/api/admin", adminRoutes);

app.use('/api/vendors', vendorRoutes);
// …later…
app.use('/api/buyers', buyerRoutes);


// Health Route
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Backend Running Successfully 🚀",
    });
});

// Root Route
app.get("/", (req, res) => {
  res.send("Multi Vendor Backend API");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
