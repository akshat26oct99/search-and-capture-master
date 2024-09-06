// src/pages/CompletionPage.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import './CompletionPage.css'; // تأكد من وجود التنسيق المناسب

function CompletionPage() {
  const history = useHistory();

  const handleClose = () => {
    history.push('/'); // العودة إلى الصفحة الرئيسية أو إلى أي صفحة أخرى
  };

  return (
    <div className="completion-page">
      <div className="modal">
        <h2>Thank you!</h2>
        <p>You have completed all tasks. Well done!</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default CompletionPage;
