import React from 'react';
import './HomePage.css';

const HomePage = ({ onStart }) => {
  return (
    <div className="home-container">
      <h1>Welcome to the Game</h1>
      <button onClick={onStart} className="start-button">Start Game</button>
    </div>
  );
};

export default HomePage;
