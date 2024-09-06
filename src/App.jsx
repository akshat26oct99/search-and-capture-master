import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import UploadScreenshot from './components/UploadScreenshot';
import GameCompletedPage from './components/GameCompletedPage';
import Levels from './Levels'; // Ensure Levels component is correctly imported
import Modal from './components/Modal'; // Import the Modal component
import './App.css';

function App() {
  const [showUpload, setShowUpload] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Function to handle the modal close
  const handleModalClose = () => {
    setShowModal(false);
    setShowUpload(false); // Reset to show the start page
  };

  // Function to show the modal
  const showModalWithMessage = (message) => {
    setShowModal(true);
    setModalMessage(message); // Set the modal message
  };

  return (
    <Router>
      <div className="app-container">
        {!showUpload ? (
          <div className="start-card">
            <h1>Welcome to Easy Money: Search & Capture!</h1>
            <button onClick={() => setShowUpload(true)}>Start</button>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Levels />} />
            <Route path="/upload-screenshot/:level" element={<UploadScreenshot />} />
            <Route path="/game-completed" element={<GameCompletedPage points={100} />} />
          </Routes>
        )}

        {showModal && (
          <Modal 
            message="Your time has expired." 
            onClose={handleModalClose} 
          />
        )}
      </div>
    </Router>
  );
}

export default App;
