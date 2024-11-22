import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authedUser = useSelector((state) => state.authedUser);
  return authedUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;