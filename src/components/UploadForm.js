import React, { useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

// تعيين العنصر الجذر للنافذة المنبثقة
Modal.setAppElement('#root');

const UploadForm = () => {
  const [searchScreenshot, setSearchScreenshot] = useState(null);
  const [websiteScreenshot, setWebsiteScreenshot] = useState(null);
  const [additionalScreenshot1, setAdditionalScreenshot1] = useState(null);
  const [additionalScreenshot2, setAdditionalScreenshot2] = useState(null);
  const [currentStage, setCurrentStage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'searchScreenshot') {
      setSearchScreenshot(files[0]);
    } else if (name === 'websiteScreenshot') {
      setWebsiteScreenshot(files[0]);
    } else if (name === 'additionalScreenshot1') {
      setAdditionalScreenshot1(files[0]);
    } else if (name === 'additionalScreenshot2') {
      setAdditionalScreenshot2(files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStage === 1) {
      if (!searchScreenshot || !websiteScreenshot) {
        toast.error('Error uploading screenshots.', {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }
      setSearchScreenshot(null);
      setWebsiteScreenshot(null);
      toast.success('Screenshots uploaded successfully!', {
        position: "top-center",
        autoClose: 3000,
      });
    } else if (currentStage === 2) {
      if (!additionalScreenshot1 || !additionalScreenshot2) {
        toast.error('Error uploading additional screenshots.', {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }
      setAdditionalScreenshot1(null);
      setAdditionalScreenshot2(null);
      toast.success('Additional screenshots uploaded successfully!', {
        position: "top-center",
        autoClose: 3000,
      });
      setModalIsOpen(true);
      return;
    }
    setCurrentStage(currentStage + 1);
  };

  const prevStage = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  const nextStage = () => {
    if (currentStage < 2) {
      setCurrentStage(currentStage + 1);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getStageInstructions = () => {
    if (currentStage === 1) {
      return (
        <div style={styles.instructions}>
          <h3>1. Please upload a screenshot from Google Search.</h3>
          <ul>
            <li>Search in Google using the keyword "Smallcap.ai".</li>
            <li>Locate the website titled: "Smallcap.ai: AI-Driven Insights for Small-cap Crypto Tokens".</li>
            <li>Take a screenshot once you find it in Google Search and upload it.</li>
          </ul>
        </div>
      );
    } else if (currentStage === 2) {
      return (
        <div style={styles.instructions}>
          <h3>2. Upload a screenshot of the footer of Smallcap.ai Website.</h3>
          <ul>
            <li>Access the website and scroll down to the bottom.</li>
            <li>Take a screenshot of the footer and upload it.</li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div style={styles.pageContainer}>
      <ToastContainer />
      <div style={styles.centerContainer}>
        <h2 style={styles.heading}>Easy Money: Search & Capture!</h2>
        <div style={styles.formContainer}>
          <div style={styles.instructionsContainer}>
            {getStageInstructions()}
          </div>
          {currentStage === 1 && (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Upload Search Screenshot:</label>
                <input
                  type="file"
                  name="searchScreenshot"
                  accept=".png"
                  onChange={handleFileChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Upload Website Screenshot:</label>
                <input
                  type="file"
                  name="websiteScreenshot"
                  accept=".png"
                  onChange={handleFileChange}
                  style={styles.input}
                />
              </div>
              <button type="submit" style={styles.submitButton}>Submit & Proceed</button>
            </form>
          )}
          {currentStage === 2 && (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Upload Additional Screenshot 1:</label>
                <input
                  type="file"
                  name="additionalScreenshot1"
                  accept=".png"
                  onChange={handleFileChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Upload Additional Screenshot 2:</label>
                <input
                  type="file"
                  name="additionalScreenshot2"
                  accept=".png"
                  onChange={handleFileChange}
                  style={styles.input}
                />
              </div>
              <button type="submit" style={styles.submitButton}>Submit</button>
            </form>
          )}
          <div style={styles.thumbnails}>
            {searchScreenshot && <img src={URL.createObjectURL(searchScreenshot)} alt="Search Screenshot" style={styles.thumbnail} />}
            {websiteScreenshot && <img src={URL.createObjectURL(websiteScreenshot)} alt="Website Screenshot" style={styles.thumbnail} />}
            {additionalScreenshot1 && <img src={URL.createObjectURL(additionalScreenshot1)} alt="Additional Screenshot 1" style={styles.thumbnail} />}
            {additionalScreenshot2 && <img src={URL.createObjectURL(additionalScreenshot2)} alt="Additional Screenshot 2" style={styles.thumbnail} />}
          </div>
        </div>
        {/* أزرار التنقل */}
        <div style={styles.navigation}>
          {currentStage > 1 && (
            <button onClick={prevStage} style={styles.navButton}>
              <FaChevronUp />
            </button>
          )}
          {currentStage < 2 && (
            <button onClick={nextStage} style={styles.navButton}>
              <FaChevronDown />
            </button>
          )}
        </div>
        {/* نافذة منبثقة */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <h2>Thank You!</h2>
          <p>Your information has been submitted successfully.</p>
          <button onClick={closeModal} style={styles.modalButton}>Close</button>
        </Modal>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    background: 'url(/ss.gif) no-repeat center center fixed',
    backgroundSize: 'cover',
    padding: '20px',
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    overflowY: 'auto',
  },
  heading: {
    color: '#003366',
    fontWeight: 'bold',
    marginBottom: '20px',
    fontSize: '2rem',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.4)',
    background: 'linear-gradient(45deg, #003366, #007bff)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  formContainer: {
    width: '90%',
    maxWidth: '600px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  instructionsContainer: {
    marginBottom: '20px',
  },
  instructions: {
    marginBottom: '20px',
    fontSize: '1.2rem',
    color: '#333',
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: '15px',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '1rem',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
  thumbnails: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  thumbnail: {
    width: '150px',
    height: 'auto',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  navigation: {
    marginTop: '20px',
  },
  navButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.5rem',
    margin: '0 10px',
  },
  modalButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

export default UploadForm;
