const express = require("express");
const router = express.Router();
const {
  getUsers,
  getVendors,
  toggleUserStatus,
  getDashboardStats,
  getActiveUsers,
  getActiveSellers,
  blockUser,
} = require("../controllers/admin.controller");

const { protect, authorizeRoles } = require("../middleware/auth.middleware");

router.get("/users", protect, authorizeRoles("admin"), getUsers);
router.get("/vendors", protect, authorizeRoles("admin"), getVendors);
router.put("/users/:id", protect, authorizeRoles("admin"), toggleUserStatus);
router.get("/dashboard", protect, authorizeRoles("admin"), getDashboardStats);
// routes/adminRoutes.js

router.get("/active-users", protect, authorizeRoles("admin"), getActiveUsers);
router.get("/active-sellers", protect, authorizeRoles("admin"), getActiveSellers);

router.put("/users/:id/block", protect, authorizeRoles("admin"), blockUser);

module.exports = router;