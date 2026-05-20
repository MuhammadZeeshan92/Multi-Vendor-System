require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const http = require("http");
const { Server } = require("socket.io");
const { initChatSocket } = require("./sockets/chatSocket");

const authRoutes = require("./routes/auth.route.js");
const productRoutes = require("./routes/product.route.js");
const orderRoutes = require("./routes/order.route.js");
const adminRoutes = require("./routes/admin.routes.js");
const cloudinaryRoutes = require("./routes/cloudinary.route.js");
const vendorRoutes = require('./routes/vendor.routes');
const webhookRouter = require('./routes/webhook');
const buyerRoutes = require('./routes/buyer.routes');
const chatbotRoutes = require('./routes/chatbot.route');
const chatRoutes = require('./routes/chat.routes');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      process.env.CLIENT_URL,
      "https://multi-vendor-system-beta.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  },
});

initChatSocket(io);


// Connect Database
connectDB();

app.use(cors(
    {
        origin: [
            "http://localhost:5173", // local development
            "https://multi-vendor-system-beta.vercel.app",
            "https://multi-vendor-system-sigma.vercel.app" // production frontend
        ],
        credentials: true,
    }
));

// Middlewares
app.use(cookieParser());

app.use('/api', webhookRouter); // the webhook uses raw parser internally

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", cloudinaryRoutes);
app.use("/api/admin", adminRoutes);

app.use('/api/vendors', vendorRoutes);
// …later…
app.use('/api/buyers', buyerRoutes);
app.use('/api/chat', chatbotRoutes);
app.use('/api', chatRoutes);



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

server.listen(PORT, () => {
    console.log("Socket Server running on port", PORT);
    console.log(`🚀 Server running on port ${PORT}`);
});
