import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import NewPoll from './components/NewPoll';
import Login from './components/Login';
import Home from './components/Home';
import Poll from './components/Poll'; // Import Poll component
import ProtectedRoute from './components/ProtectedRoute';
import { fetchUsers } from './actions/users';
import { fetchPolls } from './actions/polls';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPolls());
  }, [dispatch]);

  return (
    <Router>
      {authedUser && window.location.pathname !== '/login' && window.location.pathname !== '/home'}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/new" element={<ProtectedRoute><NewPoll /></ProtectedRoute>} />
        <Route path="/poll/:id" element={<ProtectedRoute><Poll /></ProtectedRoute>} /> {/* Poll route */}
      </Routes>
    </Router>
  );
};

export default App;
