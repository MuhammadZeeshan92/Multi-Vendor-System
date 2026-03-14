const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Vendor = require("../models/Vendor");

/**
 * Create or get conversation between buyer and vendor
 */
exports.createOrGetConversation = async (req, res) => {
  try {
    const { vendorId } = req.body;
    const buyerId = req.user._id.toString();

    if (!vendorId) {
      return res.status(400).json({
        message: "vendorId required",
      });
    }

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    const vendorUserId = vendor.user.toString();

    if (buyerId === vendorUserId) {
      return res.status(400).json({
        message: "You cannot start a conversation with yourself.",
      });
    }

    const participants = [buyerId, vendorUserId].sort();

    let conversation = await Conversation.findOne({
      participants: { $all: participants, $size: 2 },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants,
      });
      await conversation.save();
    }

    res.status(200).json({
      conversationId: conversation._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

/**
 * Fetch messages of a conversation
 */
exports.getMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;

    const messages = await Message.find({
      conversationId: id,
    })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

/**
 * Fetch all conversations of a user
 */
exports.getUserConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log(userId);

    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "name email role logo")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      conversations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};