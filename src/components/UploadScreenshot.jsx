import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UploadScreenshot.css';
import Modal from './Modal'; // Import the Modal component
import exampleImage1 from './ss1.png';
import exampleImage2 from './2.png';
import exampleImage3 from './3.png';
import exampleImage4 from './4.png';
import exampleImage5 from './5.png';
import exampleImage6 from './ss.png';
import exampleImage7 from './s.png';
import exampleImage8 from './2.png';
import exampleImage9 from './3.png';
import exampleImage10 from './4.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowUp, FaArrowDown, FaDesktop, FaMobileAlt } from 'react-icons/fa';

const TOTAL_TOKENS = 100;
const LEVELS = 10;
const GROWTH_RATE = 1.2; // Growth rate between levels

const calculateTokens = (level) => {
  return Math.round(TOTAL_TOKENS / ((1 / GROWTH_RATE) * (Math.pow(GROWTH_RATE, LEVELS) - 1) / (GROWTH_RATE - 1)) * Math.pow(GROWTH_RATE, level - 1));
};

const tokensPerLevel = [];
for (let i = 1; i <= LEVELS; i++) {
  tokensPerLevel.push(calculateTokens(i));
}

const UploadScreenshot = () => {
  const { level } = useParams();
  const [currentStage, setCurrentStage] = useState(parseInt(level, 10) || 1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadType, setUploadType] = useState('desktop');
  const [timer, setTimer] = useState(10); // 10 minutes in seconds
  const [timerExpired, setTimerExpired] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  const levels = [
    { query: "Upload a screenshot of the article: 'Trusted by world-class companies, Scale delivers high-quality training data for AI applications such as self-driving cars, mapping, AR/VR, and robotics.'", exampleImage: exampleImage1 },
    { query: "Upload a screenshot of the article: '1 billion members | Manage your professional identity. Build and engage with your professional network. Access knowledge, insights, and opportunities.'", exampleImage: exampleImage2 },
    { query: "Upload a screenshot of the article: 'Smallcap.ai provides comprehensive, AI-driven insights into small-cap crypto tokens. Get detailed profiles, risk assessments, and market sentiment analysis.'", exampleImage: exampleImage3 },
    { query: "Upload a screenshot of the article: 'The Blockchain Lab team has considerable experience working with new technologies and specifications, including technologies still undergoing change.'", exampleImage: exampleImage4 },
    { query: "Upload a screenshot of the article: 'RoboAI combines the expertise of Satakunta University of Applied Sciences and Tampere University.'", exampleImage: exampleImage5 },
    { query: "Upload a screenshot of the article: 'New AI advancements are rapidly evolving in the tech industry. Stay updated with the latest breakthroughs.'", exampleImage: exampleImage6 },
    { query: "Upload a screenshot of the article: 'Decentralized finance (DeFi) platforms offer innovative solutions for financial transactions and investments.'", exampleImage: exampleImage7 },
    { query: "Upload a screenshot of the article: 'Machine learning algorithms are transforming industries by enhancing predictive analytics and automation.'", exampleImage: exampleImage8 },
    { query: "Upload a screenshot of the article: 'Blockchain technology is revolutionizing supply chain management with its transparency and security features.'", exampleImage: exampleImage9 },
    { query: "Upload a screenshot of the article: 'AI-powered chatbots are improving customer service by providing instant and personalized support.'", exampleImage: exampleImage10 }
  ];

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(timerInterval);
          setTimerExpired(true); // Set timerExpired to true when timer reaches 0
          setPopupVisible(true); // Show popup when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval); // Clear interval on component unmount
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputClick = () => {
    document.getElementById('file-upload').click();
  };

  const handleSubmit = () => {
    if (timerExpired) {
      toast.error('Time is up! Please try again.', {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (selectedImage) {
      const keywordMatch = true; // Simulating keyword match

      if (keywordMatch) {
        toast.success(
          `Upload Successful! Keyword Match Confirmed. Congratulations! You have earned ${tokensPerLevel[currentStage - 1]} tokens for this level.`,
          {
            position: "top-center",
            autoClose: 5000,
            style: { fontSize: '16px', textAlign: 'center' }
          }
        );
      } else {
        toast.error('Upload failed. Keyword not found.', {
          position: "top-center",
          autoClose: 3000,
        });
      }

      if (currentStage < LEVELS) {
        setCurrentStage(currentStage + 1);
      } else {
        toast.success('All levels completed!', {
          position: "top-center",
          autoClose: 3000,
        });
        navigate('/game-completed');
      }

      setSelectedImage(null);
    } else {
      toast.error('No image uploaded.', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleScroll = (direction) => {
    if (direction === 'up' && currentStage > 1) {
      setCurrentStage(currentStage - 1);
    } else if (direction === 'down' && currentStage < LEVELS) {
      setCurrentStage(currentStage + 1);
    }
  };

  const getStageInstructions = () => {
    const level = levels[currentStage - 1];
    return (
      <div className="instructions">
        <div className="timer-container">
          <div className="timer">
            {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
          </div>
        </div>
        <div className="instructions-text">
          <h3>Level {currentStage}: Please upload a screenshot as described below.</h3>
          <p>Text to be Searched: {level.query}</p>
          <p><strong>Time Limit:</strong> You have 10 minutes to complete this task.</p>
          <ul>
            <li>Search on Google using the query text provided.</li>
            <li>Take a screenshot and upload it here.</li>
          </ul>
          <div className="example-image">
            <img src={level.exampleImage} alt="Example Screenshot" />
            <div className="watermark-container">
              <div className="watermark">Example</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (currentStage > LEVELS) {
      navigate('/game-completed');
    }
  }, [currentStage, navigate]);

  const handleCloseModal = () => {
    setPopupVisible(false);
    navigate('/game-restart'); // Redirect or restart the game
  };

  return (
    <div className="page-container">
      {popupVisible && (
        <Modal 
          message="The time limit for this level has expired. You need to restart the level." 
          onClose={handleCloseModal} 
        />
      )}
      <div className="upload-screenshot-container">
        <main className={`content ${currentStage <= 2 ? 'stage-1' : 'stage-2'}`}>
          {getStageInstructions()}

          <div className="upload-type-selector">
            <button
              className={`upload-type-button ${uploadType === 'desktop' ? 'active' : ''}`}
              onClick={() => {
                setUploadType('desktop');
                handleFileInputClick();
              }}
            >
              <FaDesktop size={24} /> Computer
            </button>
            <button
              className={`upload-type-button ${uploadType === 'mobile' ? 'active' : ''}`}
              onClick={() => {
                setUploadType('mobile');
                handleFileInputClick();
              }}
            >
              <FaMobileAlt size={24} /> Mobile
            </button>
          </div>

          <div className="upload-section">
            {selectedImage ? (
              <div className="uploaded-image">
                <img src={selectedImage} alt="Uploaded" />
              </div>
            ) : (
              <div className="upload-placeholder" onClick={handleFileInputClick}>
                Click to upload screenshot
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
          </div>

          <div className="scroll-buttons">
            <button
              className="scroll-button"
              onClick={() => handleScroll('up')}
              disabled={currentStage <= 1}
            >
              <FaArrowUp size={24} />
            </button>
            <button
              className="scroll-button"
              onClick={() => handleScroll('down')}
              disabled={currentStage >= LEVELS}
            >
              <FaArrowDown size={24} />
            </button>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UploadScreenshot;
