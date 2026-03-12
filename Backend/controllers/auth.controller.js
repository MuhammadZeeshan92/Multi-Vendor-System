const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");
const Buyer = require("../models/Buyer");

async function buildUserPayload(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    if (user.role === 'seller') {
        const vendor = await Vendor.findOne({ user: user._id });
        payload.hasCompletedProfile = !!vendor;
        payload.vendor = vendor;
    }
    if (user.role === 'buyer') {
        const buyer = await Buyer.findOne({ user: user._id });
        payload.hasCompletedProfile = !!buyer;
        payload.buyer = buyer;
    }
    return payload;
}

// Register
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.debug('Login attempt for:', email);
        console.debug('Login attempt for:', password);

        const user = await User.findOne({ email });

        if (!user) {
            console.debug('Login failed: user not found', email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!user.isActive) {
            console.debug('Login failed: account not active for', email);
            return res.status(403).json({ message: "Account not active. Please contact support." });
        }
        if (user.isBlocked) {
            return res.status(403).json({ message: "Account permanently blocked" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.debug('Login failed: invalid password for', email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const userObj = await buildUserPayload(user);

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json(userObj);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({ message: "Logout successful" });
}

// Get current authenticated user
exports.getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies && req.cookies.token;
        if (!token) return res.status(401).json({ message: 'Not authenticated' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await User.findById(decoded.id).select('-password');
        if (!userData) return res.status(404).json({ message: 'User not found' });
        const user = await buildUserPayload(userData);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};