import React from 'react';
import { useParams } from 'react-router-dom';

function Level() {
  const { levelId } = useParams(); // Get the levelId from the URL

  return (
    <div>
      <h1>Level {levelId}</h1>
      {/* Implement the logic and UI for the level here */}
    </div>
  );
}

export default Level;
