import { useState, useEffect } from 'react';
import { HfInference } from '@huggingface/inference';
import toast from 'react-hot-toast';

const CHAT_CACHE_KEY = 'orbital_chat_history';

export function useChatbot(issData, newsData) {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const hf = new HfInference(import.meta.env.VITE_AI_TOKEN);

  useEffect(() => {
    const saved = localStorage.getItem(CHAT_CACHE_KEY);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      // Initial greeting
      setMessages([{
        role: 'assistant',
        content: 'Hello! I am your OrbitalHub assistant. I can answer questions about the current ISS location, speed, astronauts, or summarize the latest news. What would you like to know?'
      }]);
    }
  }, []);

  const clearChat = () => {
    const initial = [{
      role: 'assistant',
      content: 'Chat cleared. How can I help you with the dashboard data?'
    }];
    setMessages(initial);
    localStorage.setItem(CHAT_CACHE_KEY, JSON.stringify(initial));
  };

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userMessage }];
    
    // Keep only last 30 messages
    if (newMessages.length > 30) {
      newMessages.splice(0, newMessages.length - 30);
    }
    
    setMessages(newMessages);
    setIsTyping(true);

    try {
      // Prepare Context
      const context = `
You are an AI assistant for a dashboard tracking the ISS and News.
RESTRICTION: You MUST ONLY answer using the provided data below. If the user asks something outside of this data, politely decline and say you only know about the dashboard data. Do not guess. Do not use outside knowledge.

[ISS DATA]
- Location: Lat ${issData?.position?.lat?.toFixed(4) || 'Unknown'}, Lng ${issData?.position?.lng?.toFixed(4) || 'Unknown'}
- Speed: ${Math.round(issData?.currentSpeed || 0)} km/h
- Nearest Place: ${issData?.nearestPlace || 'Unknown'}
- Astronauts in space: ${issData?.people?.number || 0} (${(issData?.people?.names || []).join(', ')})

[NEWS DATA (${newsData?.category || 'general'})]
Total articles shown: ${newsData?.news?.length || 0}
Top Headlines:
${newsData?.news?.map((n, i) => `${i+1}. ${n.title} (Source: ${n.source?.name || 'Unknown'})`).join('\n')}
`;

      const response = await hf.chatCompletion({
        model: 'Qwen/Qwen2.5-Coder-32B-Instruct',
        messages: [
          { role: 'system', content: context },
          ...newMessages.map(m => ({ role: m.role, content: m.content }))
        ],
        max_tokens: 250,
        temperature: 0.1,
      });

      const botReply = response.choices[0].message.content.trim();
      const updatedMessages = [...newMessages, { role: 'assistant', content: botReply }];
      
      setMessages(updatedMessages);
      localStorage.setItem(CHAT_CACHE_KEY, JSON.stringify(updatedMessages));
    } catch (error) {
      console.error(error);
      toast.error('Failed to get AI response');
      const updatedMessages = [...newMessages, { role: 'assistant', content: "Sorry, I'm having trouble connecting to my brain right now. Please try again." }];
      setMessages(updatedMessages);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, isOpen, setIsOpen, isTyping, sendMessage, clearChat };
}
