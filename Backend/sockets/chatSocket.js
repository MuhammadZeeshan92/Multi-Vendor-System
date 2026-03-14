const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

function initChatSocket(io) {
  io.use((socket, next) => {
    try {
      // The frontend might pass token in auth.token or query.token depending on setup
      let token = socket.handshake.auth.token || socket.handshake.query.token;

      if (!token) {
        // Look inside cookies if possible
        if (socket.handshake.headers.cookie) {
          const cookies = socket.handshake.headers.cookie.split(';');
          const tokenCookie = cookies.find(c => c.trim().startsWith('token='));
          if (tokenCookie) {
            token = tokenCookie.split('=')[1];
          }
        }
      }

      if (!token) {
        console.error("Socket authentication error: No token provided in handshake.");
        return next(new Error("Authentication error"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      console.error("Socket authentication catch error:", err.message);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.id);

    socket.on("join_conversation", async (conversationId) => {
      socket.join(`chat:${conversationId}`);
    });

    socket.on("message_send", async (data) => {
      try {
        console.log("message_send event triggered with data:", data);
        const { conversationId, text } = data;

        const conversation = await Conversation.findById(conversationId);
        
        if (!conversation) {
           console.log("Conversation not found for ID:", conversationId);
           return;
        }

        console.log("Conversation found! Participants:", conversation.participants);

        // find the participant that is NOT the sender
        const receiverId = conversation.participants.find(
          (p) => p.toString() !== socket.user.id
        );

        console.log("Sender:", socket.user.id, "Receiver:", receiverId);

        const message = await Message.create({
          conversationId,
          senderId: socket.user.id,
          receiverId,
          text,
        });

        console.log("Message created successfully in DB!", message._id);

        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: {
            text,
            senderId: socket.user.id,
            createdAt: new Date(),
          },
        });

        io.to(`chat:${conversationId}`).emit("message", message);
        console.log("Emitted message to room: chat:" + conversationId);
      } catch (error) {
        console.error("Error inside message_send event:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = { initChatSocket };