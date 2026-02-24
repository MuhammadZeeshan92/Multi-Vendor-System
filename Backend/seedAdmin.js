const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

require("dotenv").config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = new User({
      name: "Super Admin",
      email: "admin@multivendor.com",
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    await admin.save();

    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();