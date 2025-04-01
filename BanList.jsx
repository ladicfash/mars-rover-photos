import React from 'react';

function BanList({ banList, onRemoveBanClick }) {
  return (
    <div className="ban-list">
      <h2>Ban List</h2>
      {banList.map((attribute, index) => (
        <p key={index} onClick={() => onRemoveBanClick(attribute)}>
          {attribute}
        </p>
      ))}
    </div>
  );
}

export default BanList;
