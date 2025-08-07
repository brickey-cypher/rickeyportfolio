import React from 'react';
import PropTypes from 'prop-types';

function ConversationStarters({ starters, onSelect }) {
  return (
    <div
      style={{
        padding: '8px 12px 10px',
        borderTop: '1px solid #eee',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
      }}
    >
      {starters.map((starter, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(starter)}
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
  );
}

ConversationStarters.propTypes = {
  starters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ConversationStarters;
