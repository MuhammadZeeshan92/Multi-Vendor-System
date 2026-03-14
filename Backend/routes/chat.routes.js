const express = require("express");
const router = express.Router();

const {
  createOrGetConversation,
  getMessages,
  getUserConversations,
} = require("../controllers/chat.controller");

const { protect } = require("../middleware/auth.middleware");

/**
 * Get user conversations list
 */
router.get("/conversations", protect, getUserConversations);

/**
 * Create or get conversation
 */
router.post("/conversations", protect, createOrGetConversation);

/**
 * Fetch messages
 */
router.get("/conversations/:id/messages", protect, getMessages);

module.exports = router;