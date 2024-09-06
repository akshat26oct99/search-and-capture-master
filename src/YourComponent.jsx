import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollButtons from './ScrollButtons';
import './YourComponent.css';

const YourComponent = () => {
  const [currentStage, setCurrentStage] = useState(0);

  const handleScroll = (direction) => {
    if (direction === 'down') {
      setCurrentStage((prevStage) => Math.min(prevStage + 1, 1));
    } else if (direction === 'up') {
      setCurrentStage((prevStage) => Math.max(prevStage - 1, 0));
    }
  };

  return (
    <div className="container">
      <ScrollButtons onScroll={handleScroll} />

      <div className="content">
        <AnimatePresence>
          {currentStage === 0 && (
            <motion.div
              key="stage1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="instructions"
            >
              <h2>1. Please upload a screenshot from Google Search.</h2>
              <ul>
                <li>Search in Google using the keyword "Smallcap.ai".</li>
                <li>Locate the website titled: "Smallcap.ai: AI-Driven Insights for Small-cap Crypto Tokens".</li>
                <li>Take a screenshot once you find it in Google Search and upload it.</li>
              </ul>
            </motion.div>
          )}
          {currentStage === 1 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="instructions"
            >
              <h2>2. Upload a screenshot of the footer of Smallcap.ai Website.</h2>
              <ul>
                <li>Access the website and scroll down to the bottom.</li>
                <li>Take a screenshot of the footer and upload it.</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default YourComponent;
