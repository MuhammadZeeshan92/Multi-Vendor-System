const ChatMessage = ({ message, currentUser }) => {
  const isMine = message.senderId === currentUser;

  // Format the timestamp if it exists
  const timeString = message.createdAt 
    ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`flex w-full mb-3 ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[80%] sm:max-w-[70%] flex flex-col ${
          isMine ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl shadow-sm text-[15px] leading-relaxed break-words ${
            isMine
              ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-tr-sm border border-indigo-500"
              : "bg-white text-gray-800 rounded-tl-sm border border-gray-100"
          }`}
        >
          {message.text}
        </div>
        
        {/* Timestamp */}
        {timeString && (
          <span className={`text-[11px] text-gray-400 mt-1 select-none ${isMine ? 'pr-1' : 'pl-1'}`}>
            {timeString}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;