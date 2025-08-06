// ChatbotPopup.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/chat.css';

// --- MessageBubble component ---
function MessageBubble({ msg }) {
  return (
    <div
      style={{
        marginBottom: 6,
        textAlign: msg.from === 'user' ? 'right' : 'left',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: '10px 14px',
          borderRadius: '18px',
          backgroundColor: msg.from === 'user' ? '#007acc' : '#f0f0f0',
          color: msg.from === 'user' ? 'white' : 'black',
          maxWidth: '80%',
          wordWrap: 'break-word',
          fontSize: '14px',
          lineHeight: '1.4',
          ...(msg.from === 'user'
            ? { borderBottomRightRadius: '4px' }
            : { borderTopLeftRadius: '4px' }),
        }}
      >
        {msg.text.split('\n').map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
}

// --- MessageList component ---
function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 15px 0 15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      {messages.map((msg, i) => (
        <MessageBubble key={i} msg={msg} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

// --- ChatbotPopup component ---
function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me about my projects or experience.' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [conversationStarters] = useState([
    "What programming languages have you worked with?",
    "Tell me about your skills",
    "What's your experience with cybersecurity?",
    "How did you build this chatbot?"
  ]);
  const [startersVisible, setStartersVisible] = useState(true);

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

  const toggleChat = () => setIsOpen(!isOpen);

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

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <button
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: '#007acc',
          color: 'white',
          border: 'none',
          fontSize: 24,
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '×' : '💬'}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            width: 320,
            height: '60vh', // 🔧 Force fixed height
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            boxShadow: '0 5px 25px rgba(0,0,0,0.2)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 16px',
              background: '#007acc',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Chat with me</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '4px 8px',
                borderRadius: '4px',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
              onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Content Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <MessageList messages={messages} />

            {startersVisible && (
              <div
                style={{
                  padding: '8px 12px 10px',
                  borderTop: '1px solid #eee',
                  backgroundColor: '#f9f9f9',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  overflowY: 'auto',
                }}
              >
                {conversationStarters.map((starter, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(starter)}
                    style={{
                      background: '#e0e0e0',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: 'black',
                    }}
                  >
                    {starter}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              style={{
                padding: '10px 12px 12px',
                borderTop: '1px solid #eee',
                display: 'flex',
                gap: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                style={{
                  background: '#007acc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '0 20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  opacity: isLoading || !input.trim() ? 0.7 : 1,
                  transition: 'opacity 0.2s',
                  whiteSpace: 'nowrap',
                  height: '44px',
                  minWidth: '60px',
                }}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatbotPopup;
