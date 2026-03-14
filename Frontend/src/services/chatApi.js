import axios from "../utils/api";

/**
 * Create or fetch conversation
 */
export const createConversation = async (buyerId, vendorId) => {
  const res = await axios.post("/conversations", {
    buyerId,
    vendorId,
  });

  return res.data;
};

/**
 * Get messages
 */
export const fetchMessages = async (conversationId) => {
  const res = await axios.get(`/conversations/${conversationId}/messages`);

  return res.data.messages;
};

/**
 * Fetch all conversations for the logged in user
 */
export const fetchConversations = async () => {
  const res = await axios.get("/conversations");
  return res.data.conversations;
};