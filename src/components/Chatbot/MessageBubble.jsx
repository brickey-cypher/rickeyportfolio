// src/components/Chatbot/MessageBubble.jsx
import React from 'react';
import PropTypes from 'prop-types';

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

MessageBubble.propTypes = {
  msg: PropTypes.shape({
    from: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default MessageBubble;
