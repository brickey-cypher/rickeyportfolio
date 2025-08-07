import { useState, useEffect, useRef } from 'react';

export default function useChatbotLogic() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me about my projects or experience.' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [startersVisible, setStartersVisible] = useState(true);

  const [conversationStarters] = useState([
    "What programming languages have you worked with?",
    "Tell me about your skills",
    "What's your experience with cybersecurity?",
    "How did you build this chatbot?"
  ]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => setIsOpen((prev) => !prev);

  async function sendMessage(textOverride) {
    const userMessage = (textOverride || input).trim();
    if (!userMessage || isLoading) return;

    setMessages((prev) => [...prev, { from: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);
    setStartersVisible(false);

    setMessages((prev) => [...prev, { from: 'bot', text: '...', isTyping: true }]);

    try {
      const response = await fetch('/.netlify/functions/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      setMessages((prev) => {
        const withoutTyping = prev.filter((msg) => !msg.isTyping);
        return [
          ...withoutTyping,
          { from: 'bot', text: data.answer || "I'm not sure how to respond to that." },
        ];
      });
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTyping),
        { from: 'bot', text: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isOpen,
    setIsOpen,
    messages,
    input,
    isLoading,
    startersVisible,
    conversationStarters,
    inputRef,
    handleInputChange,
    handleKeyPress,
    sendMessage,
    toggleChat,
    setStartersVisible,
  };
}
