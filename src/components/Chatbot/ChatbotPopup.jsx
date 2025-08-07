// ChatbotPopup.jsx
import React from 'react';
import ChatbotHeader from './Chatbot/ChatbotHeader';
import MessageList from './Chatbot/MessageList';
import ConversationStarters from './Chatbot/ConversationStarters';
import ChatInput from './Chatbot/ChatInput';
import useChatbotLogic from './Chatbot/useChatbotLogic';
import '../styles/chat.css';

function ChatbotPopup() {
  const {
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
  } = useChatbotLogic();

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
            height: '60vh',
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
          <ChatbotHeader onClose={() => setIsOpen(false)} />

          <MessageList messages={messages} />

          {startersVisible && (
            <ConversationStarters
              starters={conversationStarters}
              onSelect={sendMessage}
            />
          )}

          <ChatInput
            input={input}
            onInputChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onSend={() => sendMessage()}
            isLoading={isLoading}
            inputRef={inputRef}
          />
        </div>
      )}
    </div>
  );
}

export default ChatbotPopup;
