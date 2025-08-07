import React from 'react';
import PropTypes from 'prop-types';

function ChatInput({
  input,
  onInputChange,
  onKeyPress,
  onSend,
  isLoading,
  inputRef,
}) {
  return (
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
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        placeholder="Type a message..."
        disabled={isLoading}
        style={{
          flex: 1,
          borderRadius: '20px',
          border: '1px solid #ccc',
          padding: '10px 15px',
          fontSize: '14px',
          outline: 'none',
        }}
      />
      <button
        onClick={onSend}
        disabled={isLoading || !input.trim()}
        style={{
          background: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          padding: '0 20px',
          cursor: isLoading || !input.trim() ? 'default' : 'pointer',
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
  );
}

ChatInput.propTypes = {
  input: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

export default ChatInput;
