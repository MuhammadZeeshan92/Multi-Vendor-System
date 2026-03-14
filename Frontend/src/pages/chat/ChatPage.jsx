import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { connectSocket, getSocket } from "../../services/socketClient";
import { fetchMessages } from "../../services/chatApi";

import ChatMessage from "../../components/ChatMessage";

const ChatPage = () => {
  const { conversationId } = useParams();
  const { user, token } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const messagesEndRef = useRef();

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchMessages(conversationId);
      setMessages(data);
    };

    loadMessages();
  }, [conversationId]);

  useEffect(() => {
    const socket = connectSocket(token);

    socket.emit("join_conversation", conversationId);

    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.disconnect();
  }, [conversationId, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const socket = getSocket();

    socket.emit("message_send", {
      conversationId,
      text,
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-120px)] max-w-4xl mx-auto py-4 px-2 sm:px-4">
      <div className="flex flex-col flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
              C
            </div>
            <div>
              <h2 className="text-gray-900 font-semibold text-lg leading-tight">Conversation</h2>
              <p className="text-gray-500 text-xs">Direct message</p>
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 flex flex-col gap-1">
        {messages.map((msg) => (
          <ChatMessage
            key={msg?._id}
            message={msg}
            currentUser={user?._id}
          />
        ))}
        <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Area */}
        <div className="p-4 sm:p-5 bg-white border-t border-gray-100 flex items-end gap-3 z-10">
          <div className="relative flex-1">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 sm:py-3.5 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white focus:border-indigo-400 transition-all placeholder-gray-400"
              placeholder="Type your message..."
              autoFocus
            />
          </div>
          
          <button
            onClick={sendMessage}
            disabled={!text.trim()}
            className="flex-shrink-0 h-[50px] sm:h-[52px] px-6 sm:px-8 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:active:scale-100 text-white font-medium rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group"
          >
            <span className="hidden sm:inline">Send</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
              <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;