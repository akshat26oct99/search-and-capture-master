import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AiOutlineArrowRight } from 'react-icons/ai'; // Import an icon from react-icons
import './Modal.css'; // Ensure you create this CSS file

const Modal = ({ message, onClose }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleOkayClick = () => {
    navigate('/upload-screenshot/1'); // Navigate to the first level (or another specific level)
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate to the start page
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="icon" onClick={onClose}>×</div> {/* Close icon */}
        <div className="modal-content">
          <h2>Time's Up!</h2>
          <p>{message}</p>
        </div>
        <div className="modal-buttons">
          <button onClick={handleOkayClick} className="back-button">
            Try again
            <AiOutlineArrowRight size={16} /> {/* React icon */}
          </button>
          <button onClick={handleHomeClick} className="home-button">
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
