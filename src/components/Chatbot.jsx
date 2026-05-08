import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from '../hooks/useChatbot';
import { MessageSquare, Minus, X } from 'lucide-react';

export function Chatbot({ issData, newsData }) {
  const { messages, isOpen, setIsOpen, isTyping, sendMessage, clearChat } = useChatbot(issData, newsData);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput('');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#ef4444] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-[#fffbeb] rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-[#fef3c7]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/40 border-b border-[#fef3c7]">
        <h3 className="font-extrabold text-lg text-[#1e293b]">AI Assistant</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={clearChat}
            className="px-4 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="p-1 hover:bg-red-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-transparent">
        {messages.map((msg, i) => {
          if (msg.role === 'system') return null;
          const isUser = msg.role === 'user';
          return (
            <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-[13px] font-medium leading-tight ${
                isUser 
                  ? 'bg-[#fee2e2] text-gray-800' 
                  : 'bg-[#e0f2fe] text-gray-800'
              }`}>
                {msg.content}
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-3 bg-[#e0f2fe] rounded-2xl shadow-sm flex gap-1 items-center">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-[#fef3c7] bg-white/20 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask from dashboard data only"
          className="flex-1 bg-white border-2 border-[#3b82f6] rounded-xl px-4 py-2.5 outline-none text-sm placeholder:text-gray-400 font-medium"
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="px-5 py-2.5 bg-[#fffbeb] border border-gray-200 text-gray-800 rounded-full hover:bg-[#fef3c7] disabled:opacity-50 transition-colors text-sm font-bold shadow-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
}
