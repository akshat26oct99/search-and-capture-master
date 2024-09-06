import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameCompletedPage.css';

const GameCompletedPage = ({ points }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const shareOnTwitter = () => {
    const tweet = encodeURIComponent(`I completed all the levels and earned ${points} points!`);
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank');
  };

  const shareOnTelegram = () => {
    const message = encodeURIComponent(`I completed all the levels and earned ${points} points!`);
    window.open(`https://t.me/share/url?url=${message}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`I completed all the levels and earned ${points} points!`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="game-completed-container">
      <div className="game-completed-content">
        <h1 className="game-completed-title">Task Completed!</h1>
        <p className="game-completed-message">You completed all the levels</p>
        <p className="game-completed-points">Your total points: {points}</p>
        <div className="share-section">
          <h2 className="share-title">Share Your Achievement</h2>
          <div className="share-buttons-container">
            <div className="share-buttons">
              <button onClick={shareOnTwitter} className="share-button twitter">Twitter</button>
              <button onClick={shareOnTelegram} className="share-button telegram">Telegram</button>
              <button onClick={shareOnWhatsApp} className="share-button whatsapp">WhatsApp</button>
            </div>
          </div>
        </div>
        <button onClick={handleGoHome} className="go-home-button">Go to Home</button>
      </div>
    </div>
  );
};

export default GameCompletedPage;
