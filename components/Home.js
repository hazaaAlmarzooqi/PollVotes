import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authedUser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logoutUser());
    toast.error("logged out!", {
      className: "custom-toast",
    })
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="home-container">
      <h2>Welcome to Employee Polls</h2>
      <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      <button onClick={() => navigate('/leaderboard')}>Leaderboard</button>
      <button onClick={() => navigate('/new')}>New Poll</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;