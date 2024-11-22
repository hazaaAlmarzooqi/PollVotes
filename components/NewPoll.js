import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPoll } from '../actions/polls';
import BackToHomeButton from './BackToHomeButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewPoll = () => {
  const [question, setQuestion] = useState('');
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);
  const navigate = useNavigate();

  //save
  useEffect(() => {
    localStorage.setItem('question', question);
    localStorage.setItem('optionOneText', optionOneText);
    localStorage.setItem('optionTwoText', optionTwoText);
  }, [question, optionOneText, optionTwoText]);


  const handleSubmit = () => {
    if (question && optionOneText && optionTwoText) {
      dispatch(
        addPoll({
          author: authedUser,
          question,
          optionOneText,
          optionTwoText,
        })
      ).then(() => {
        toast.success("Your poll has been created!", {
          className: "custom-toast",
        });
        setTimeout(() => navigate('/home'), 1500);
      });

      setQuestion('');
      setOptionOneText('');
      setOptionTwoText('');
      localStorage.removeItem('question');
      localStorage.removeItem('optionOneText');
      localStorage.removeItem('optionTwoText');
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className="newpoll-container">
      <h2>New Poll</h2>
      <input
        type="text"
        placeholder="Enter your question here"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="poll-input"
      />
      <input
        type="text"
        placeholder="Option One"
        value={optionOneText}
        onChange={(e) => setOptionOneText(e.target.value)}
        className="poll-input"
      />
      <input
        type="text"
        placeholder="Option Two"
        value={optionTwoText}
        onChange={(e) => setOptionTwoText(e.target.value)}
        className="poll-input"
      />
      <button onClick={handleSubmit} className="submit-button">Submit</button>
      <ToastContainer position="top-center" autoClose={1500} />
      <div className="back-to-home-container">
        <BackToHomeButton />
      </div>
    </div>
  );
};

export default NewPoll;