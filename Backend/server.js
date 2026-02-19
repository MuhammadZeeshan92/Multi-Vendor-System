require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.route.js");
const cookieParser = require("cookie-parser");




const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);

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
