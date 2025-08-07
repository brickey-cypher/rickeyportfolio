// MessageList.jsx
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MessageBubble from './MessageBubble';

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
        minHeight: '180px',
      }}
    >
      {messages.map((msg, i) => (
        <MessageBubble key={i} msg={msg} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isTyping: PropTypes.bool,
    })
  ).isRequired,
};

export default MessageList;
