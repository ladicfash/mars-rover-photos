import React from 'react';

function ItemDisplay({ item, onBanClick }) {
  return (
    <div className="item">
      <img src={item.img_src} alt="Mars Rover" />
      <p>Rover: <span onClick={() => onBanClick(item.rover.name)}>{item.rover.name}</span></p>
      <p>Camera: <span onClick={() => onBanClick(item.camera.name)}>{item.camera.name}</span></p>
      <p>Date Taken: <span onClick={() => onBanClick(item.earth_date)}>{item.earth_date}</span></p>
    </div>
  );
}

export default ItemDisplay;
