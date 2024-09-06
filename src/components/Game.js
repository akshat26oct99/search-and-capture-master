// Game.js
import React, { useState } from 'react';
import UploadScreenshot from './UploadScreenshot';
import './Game.css';

const phases = [
  {
    title: "Stage 1: Upload Search Screenshot",
    description: "Search on Google using the keyword 'Smallcap.ai' and upload a screenshot.",
  },
  {
    title: "Stage 2: Upload Footer Screenshot",
    description: "Go to the Smallcap.ai website and upload a screenshot of the footer.",
  },
  // Add more stages as needed
];

function Game() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [score, setScore] = useState(0);

  const handleSuccess = () => {
    setScore(score + 10); // Earn 10 tokens per stage
    setCurrentPhase(currentPhase + 1);
  };

  return (
    <div className="game-container">
      <h1>Game: Upload Screenshots</h1>
      <div className="phase-info">
        <h2>{phases[currentPhase]?.title}</h2>
        <p>{phases[currentPhase]?.description}</p>
      </div>

      {currentPhase < phases.length ? (
        <UploadScreenshot
          phase={currentPhase}
          onSuccess={handleSuccess}
        />
      ) : (
        <div className="completion-message">
          <h2>Congratulations! You've completed all stages.</h2>
          <p>Total Tokens: {score}</p>
        </div>
      )}
    </div>
  );
}

export default Game;
