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
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)] bg-gray-50/30">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Inbox</h1>
          <p className="mt-2 text-sm text-gray-500">Manage your conversations with buyers securely.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        {conversations.length === 0 ? (
          <div className="py-20 px-6 text-center text-gray-500 flex flex-col items-center">
             <div className="h-24 w-24 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-sm ring-8 ring-white">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
               </svg>
             </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No messages yet</h3>
            <p className="text-base text-gray-500 max-w-sm">When buyers ask questions or need support, their messages will appear automatically here.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 flex flex-col">
            {conversations.map((conv) => {
              // Find the other participant
              const otherUser = conv.participants.find(
                (p) => p._id !== user._id
              );

              return (
                <Link
                  key={conv._id}
                  to={`/chat/${conv._id}`}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-5 hover:bg-indigo-50/40 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-indigo-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                  
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-100 to-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl flex-shrink-0 relative shadow-sm ring-1 ring-black/5 group-hover:scale-105 transition-transform duration-300">
                       {otherUser?.logo ? (
                         <img src={otherUser.logo} alt="" className="h-full w-full rounded-2xl object-cover" />
                       ) : (
                         <span className="uppercase">{otherUser?.name?.[0] || "?"}</span>
                       )}
                       <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-base font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                          {otherUser?.name || "Unknown User"}
                        </h3>
                        {/* Mobile timestamp */}
                        {conv.lastMessage?.createdAt && (
                          <span className="sm:hidden text-xs font-medium text-gray-400 flex-shrink-0">
                            {new Date(conv.lastMessage.createdAt).toLocaleString([], { month: 'short', day: 'numeric'})}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate group-hover:text-gray-700 transition-colors">
                        {conv.lastMessage?.text || "Started a conversation..."}
                      </p>
                    </div>
                  </div>
                  
                  {/* Desktop timestamp & chevron */}
                  <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                    {conv.lastMessage?.createdAt && (
                      <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 group-hover:bg-white group-hover:border-indigo-100 transition-colors">
                        {new Date(conv.lastMessage.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                      </span>
                    )}
                    <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <div className="h-10 w-10 rounded-full bg-white shadow-sm border border-indigo-100 flex items-center justify-center text-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorInbox;
