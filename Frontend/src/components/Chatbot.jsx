import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am your Marketplace Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const resp = await api.post('/chat', { messages: [...messages, userMessage].slice(-10) }); // Keep context short
      setMessages((prev) => [...prev, resp.data]);
      setShowSuggestions(false);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (q) => {
    setInput(q);
    setShowSuggestions(false);
  };

  const suggestedQuestions = [
    "can you tell me about the developer?",
    "can you tell me about this platform in detail?",
    "can you provide any dummy credentials to login?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-100 mb-4 flex flex-col overflow-hidden animate-slideUp">
          <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">M</div>
              <span className="font-semibold">Marketplace Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-80">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm break-words ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md' 
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
                }`}>
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {showSuggestions && messages.length <= 1 && (
            <div className="px-4 py-3 border-t border-gray-50 flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm animate-fadeIn">
              <p className="w-full text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Suggested Questions</p>
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(q)}
                  className="text-[11px] sm:text-xs bg-indigo-50/50 border border-indigo-100/50 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-600 hover:text-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left active:scale-95 font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 text-sm border-none focus:ring-0 placeholder-gray-400"
              />
              <button disabled={isLoading} type="submit" className="text-indigo-600 hover:text-indigo-700 disabled:opacity-50">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all hover:scale-110 active:scale-95 group"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-indigo-600 rounded-full animate-pulse"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
