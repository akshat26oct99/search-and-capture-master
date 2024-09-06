import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaLockOpen } from 'react-icons/fa'; 
import './Levels.css';

function Levels() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = React.useState(true);
  const [showInfo, setShowInfo] = React.useState(false);
  const [loadingLevel, setLoadingLevel] = React.useState(null); // Add loading state

  // Example: Initially locked levels, excluding Level 1
  const [lockedLevels, setLockedLevels] = React.useState([2, 3, 4, 5, 6, 7, 8, 9, 10]);

  // Function to handle level button clicks and navigate to the correct route
  const handleLevelClick = (level) => {
    if (lockedLevels.includes(level)) {
      alert('This level is locked!');
    } else {
      setLoadingLevel(level); // Set the loading level
      // Simulate loading with a timeout (replace with actual loading logic if needed)
      setTimeout(() => {
        setLoadingLevel(null); // Clear loading state
        navigate(`/upload-screenshot/${level}`); // Navigate to the level's instructions page
      }, 1000); // Simulated delay, adjust as needed
    }
  };

  // Function to handle info icon click and show info overlay
  const handleInfoClick = () => {
    setShowInfo(true);
  };

  return (
    <div className="levels-container">
      {/* Popup for initial instructions */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Instructions</h2>
            <p>Welcome to the task! Please choose a level to start the task and earn tokens. Complete tasks accurately to earn better rewards!</p>
            <p><strong>Time Limit:</strong> You have 10 minutes to complete each task.</p>
            <button className="popup-close" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Overlay for additional information */}
      {showInfo && (
        <div className="info-overlay">
          <div className="info-content">
            <h2>How It Works</h2>
            <p><strong>Objective:</strong> Earn tokens by completing tasks.</p>
            <p><strong>How to Earn Tokens:</strong></p>
            <ul className="info-list">
              <li><span className="list-icon">🆗</span>Select a level to begin.</li>
              <li><span className="list-icon">✅</span>Complete the task as specified.</li>
              <li><span className="list-icon">📤</span>Submit the required screenshots.</li>
              <li><span className="list-icon">🏆</span>Earn tokens for valid submissions.</li>
            </ul>
            <p><strong>Time Limit:</strong> You have 10 minutes to complete each task.</p>
            <button className="info-close" onClick={() => setShowInfo(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Loading popup */}
      {loadingLevel !== null && (
        <div className="loading-popup-overlay">
          <div className="loading-popup-content">
            <div className="spinner"></div>
            <p>Loading Level {loadingLevel}...</p>
          </div>
        </div>
      )}

      <h1>Select a Level</h1>

      {/* Grid of level buttons */}
      <div className="levels-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
          <div className="level-item" key={level}>
            <button
              className={`level-button ${lockedLevels.includes(level) ? 'locked' : ''}`}
              onClick={() => handleLevelClick(level)}
              disabled={lockedLevels.includes(level)}
            >
              {`Level ${level}`}
            </button>
            <div className="level-lock">
              {level === 1 ? <FaLockOpen /> : <FaLock />}
            </div>
          </div>
        ))}
      </div>

      {/* Info icon to display additional information */}
      <div className="info-icon" onClick={handleInfoClick}>
        <span role="img" aria-label="info">❓</span>
      </div>
    </div>
  );
}

export default Levels;
