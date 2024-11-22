import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/authedUser';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && users[username]) {
      dispatch(loginUser(username));
      toast.success("Logged in successfully!", {
        className: "custom-toast",
      });
      setTimeout(() => {
        navigate('/home');
      }, 1800); 
    } else {
      toast.error("Invalid username!", {
        className: "custom-toast",
      })
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <select onChange={(e) => setUsername(e.target.value)} value={username}>
        <option value="">Select User</option>
        {Object.keys(users).map((userId) => (
          <option key={userId} value={userId}>
            {users[userId].name}
          </option>
        ))}
      </select>
      <button onClick={handleLogin}>Login</button>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default Login;