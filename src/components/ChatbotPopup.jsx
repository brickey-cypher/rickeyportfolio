// ChatbotPopup.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/chat.css';

// --- MessageBubble component ---
function MessageBubble({ msg }) {
  return (
    <div
      style={{
        marginBottom: 10,
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
            : { borderTopLeftRadius: '4px' })
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
        padding: '15px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minHeight: '200px'
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
  const inputRef = useRef(null);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  async function sendMessage() {
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;
    
    // Add user message
    setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);
    
    // Add typing indicator
    setMessages(prev => [...prev, { from: 'bot', text: '...', isTyping: true }]);
    
    try {
      const response = await fetch('/.netlify/functions/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage }),
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      
      // Remove typing indicator and add bot response
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        return [
          ...withoutTyping,
          { from: 'bot', text: data.answer || "I'm not sure how to respond to that." }
        ];
      });
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev.filter(msg => !msg.isTyping),
        { from: 'bot', text: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Chat Toggle Button */}
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
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '×' : '💬'}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            width: 320,
            maxHeight: '60vh',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            boxShadow: '0 5px 25px rgba(0,0,0,0.2)',
            overflow: 'hidden'
          }}
        >
          {/* Chat Header */}
          <div style={{
            padding: '12px 16px',
            background: '#007acc',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
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
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          
          {/* Messages */}
          <MessageList messages={messages} />
          
          {/* Input Area */}
          <div style={{
            padding: '12px',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '8px',
            backgroundColor: '#f9f9f9'
          }}>
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
              onClick={sendMessage}
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
                opacity: (isLoading || !input.trim()) ? 0.7 : 1,
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap',
                height: '44px',
                minWidth: '60px'
              }}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatbotPopup;
