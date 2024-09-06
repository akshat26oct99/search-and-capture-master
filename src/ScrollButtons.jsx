import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ScrollButtons = ({ onScroll }) => {
  return (
    <div className="arrow-buttons">
      <button className="arrow-button" onClick={() => onScroll('up')}>
        <FaArrowUp />
      </button>
      <button className="arrow-button" onClick={() => onScroll('down')}>
        <FaArrowDown />
      </button>
    </div>
  );
};

export default ScrollButtons;
