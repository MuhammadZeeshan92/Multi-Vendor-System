import { useEffect, useState } from "react";
import { fetchConversations } from "../../services/chatApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const VendorInbox = () => {
  const { user } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchConversations();
        setConversations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
      </div>

      <div className="bg-white border text-left border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col divide-y divide-gray-100">
        {conversations.length === 0 ? (
          <div className="py-12 px-6 text-center text-gray-500">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-4 text-gray-400">
               <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
             </svg>
            <p className="font-medium text-gray-900">No conversations yet</p>
            <p className="text-sm mt-1 text-gray-500">When buyers contact you, their messages will appear here.</p>
          </div>
        ) : (
          conversations.map((conv) => {
            // Find the other participant
            const otherUser = conv.participants.find(
              (p) => p._id !== user._id
            );

            return (
              <Link
                key={conv._id}
                to={`/chat/${conv._id}`}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg flex-shrink-0 relative">
                   {otherUser?.logo ? (
                     <img src={otherUser.logo} alt="" className="h-full w-full rounded-full object-cover" />
                   ) : (
                     <span className="uppercase">{otherUser?.name?.[0] || "?"}</span>
                   )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {otherUser?.name || "Unknown User"}
                    </h3>
                    {conv.lastMessage?.createdAt && (
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {new Date(conv.lastMessage.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {conv.lastMessage?.text || "Started a conversation"}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VendorInbox;
