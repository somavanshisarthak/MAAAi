import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
};

const AiChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I am MAAAi Health Assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newUserMsg: Message = {
      id: messages.length + 1,
      text: userText,
      sender: 'user',
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");

    // Mock AI response
    setTimeout(() => {
      const lowerText = userText.toLowerCase();
      let aiResponse = "I am your health assistant. Please consult your doctor for medical advice.";
      
      if (lowerText.includes("diet") || lowerText.includes("food")) {
        aiResponse = "During pregnancy, maintain a balanced diet including fruits, vegetables, iron-rich foods, and sufficient hydration.";
      } else if (lowerText.includes("exercise")) {
        aiResponse = "Light exercises such as walking and prenatal yoga can help maintain health during pregnancy.";
      }

      const newAiMsg: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
      };
      setMessages(prev => [...prev, newAiMsg]);
    }, 600);
  };

  return (
    <>
      {/* Expanding Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-teal-600 p-4 pb-3 flex items-start justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg leading-tight">MAAAi Health Assistant</h3>
              <p className="text-teal-100 text-xs mt-0.5">Ask about pregnancy care</p>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 bg-slate-50 overflow-y-auto min-h-[250px] max-h-[350px] space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-4 py-2 text-sm rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-teal-600 text-white rounded-tr-sm' 
                      : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-all hover:scale-105 active:scale-95 z-50 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-teal-600/20"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </>
  );
};

export default AiChatBubble;
