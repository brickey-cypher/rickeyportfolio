import React from 'react';
import PropTypes from 'prop-types';

function ChatbotHeader({ onClose }) {
  return (
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
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '18px',
          padding: '4px 8px',
          borderRadius: '4px',
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.background = 'transparent')
        }
        aria-label="Close chat"
      >
        ×
      </button>
    </div>
  );
}

ChatbotHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ChatbotHeader;
