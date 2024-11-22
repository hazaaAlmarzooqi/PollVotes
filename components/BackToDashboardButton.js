import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToDashboardButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/Dashboard')} className="back-to-dashboard-button">
      Back to Dashboard
    </button>
  );
};

export default BackToDashboardButton;