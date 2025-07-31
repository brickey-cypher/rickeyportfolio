import React, { useState } from 'react';

export default function ChatbotTest() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = React.useRef(null);
  
  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    console.log('Input changed:', newValue); // Debug log
    setInput(newValue);
  };
  
  const handleSend = () => {
    const userMessage = input.trim();
    if (!userMessage) return;
    
    console.log('Sending message:', userMessage); // Debug log
    
    // Add user message
    setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
    setInput(''); // Clear input after sending
    
    // Simulate typing indicator
    setMessages(prev => [...prev, { from: 'bot', text: '...', isTyping: true }]);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages(prev => {
        // Remove typing indicator and add bot response
        return prev
          .filter(msg => !msg.isTyping)
          .concat({
            from: 'bot',
            text: `I received: "${userMessage}". This is a test response.`
          });
      });
    }, 1000);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 20, 
      right: 20, 
      zIndex: 1000,
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
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
          marginLeft: 'auto'
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '×' : '💬'}
      </button>
      
      {/* Chat Popup */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: 0,
          width: '320px',
          maxHeight: '500px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 5px 25px rgba(0,0,0,0.2)',
          border: '1px solid #ddd',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Chat Header */}
          <div style={{
            padding: '15px',
            background: '#007acc',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Chat with us</span>
          </div>
          
          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            minHeight: '200px' // Ensure messages area has minimum height
          }}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                style={{
                  alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.from === 'user' ? '#007acc' : '#f0f0f0',
                  color: msg.from === 'user' ? 'white' : 'black',
                  padding: '8px 12px',
                  borderRadius: '18px',
                  maxWidth: '80%',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  ...(msg.from === 'user' 
                    ? { borderBottomRightRadius: '4px' }
                    : { borderTopLeftRadius: '4px' }),
                  opacity: msg.isTyping ? 0.7 : 1,
                  fontStyle: msg.isTyping ? 'italic' : 'normal'
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div style={{
            padding: '12px',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '2px solid #007acc',
                borderRadius: '24px',
                outline: 'none',
                fontSize: '14px',
                backgroundColor: '#fff',
                color: '#000',
                boxSizing: 'border-box',
                height: '44px',
                fontFamily: 'inherit',
                lineHeight: '1.5',
                margin: 0
              }}
              // Inline styles for focus state
              onFocus={(e) => {
                e.target.style.borderColor = '#007acc';
                e.target.style.boxShadow = '0 0 0 2px rgba(0,122,204,0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: '#007acc',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '0 20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
