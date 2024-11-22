import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToHomeButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/home')} className="back-to-home-button">
      Back to Home
    </button>
  );
};

export default BackToHomeButton;